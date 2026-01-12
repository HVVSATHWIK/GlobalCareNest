import { GoogleGenerativeAI } from '@google/generative-ai';
import { createHash } from 'node:crypto';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

type NetlifyFunctionEvent = {
  httpMethod?: string;
  body?: string | null;
  headers?: Record<string, string | undefined>;
};

type NetlifyFunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const apiKey = process.env.GEMINI_API_KEY;

const RATE_LIMITS: Record<string, { windowMs: number; max: number }> = {
  analyzeSymptoms: { windowMs: 60_000, max: 10 },
  interpretGesture: { windowMs: 60_000, max: 20 },
  doctorIntent: { windowMs: 60_000, max: 15 },
};

const ACTION_REQUIRES_AI_CONSENT = new Set(['analyzeSymptoms', 'interpretGesture', 'doctorIntent']);

const rateLimitBuckets = new Map<string, number[]>();

function json(statusCode: number, payload: unknown): NetlifyFunctionResponse {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  };
}

function initAdmin() {
  if (getApps().length) return;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    throw new Error(
      'Missing FIREBASE_SERVICE_ACCOUNT. Set it to a JSON service account (stringified) with permission to verify Firebase ID tokens.'
    );
  }

  const serviceAccount = JSON.parse(serviceAccountJson) as {
    project_id: string;
    client_email: string;
    private_key: string;
  };

  initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });
}

async function verifyRequest(event: NetlifyFunctionEvent): Promise<{ uid: string } | null> {
  const header = event.headers?.authorization || event.headers?.Authorization;
  if (!header) return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1];
  if (!token) return null;

  initAdmin();
  const decoded = await getAuth().verifyIdToken(token);
  return { uid: decoded.uid };
}

async function ensureAiConsent(uid: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  initAdmin();
  const db = getFirestore();
  const snap = await db.doc(`userConsents/${uid}`).get();
  const data = snap.exists ? snap.data() : null;
  const enabled = Boolean(data?.aiTranslation);
  if (!enabled) {
    return { ok: false, reason: 'AI translation consent is required for this action.' };
  }
  return { ok: true };
}

function checkRateLimit(uid: string, action: string): boolean {
  const limit = RATE_LIMITS[action];
  if (!limit) return true;

  const key = `${uid}:${action}`;
  const now = Date.now();
  const timestamps = rateLimitBuckets.get(key) ?? [];
  const fresh = timestamps.filter((t) => now - t < limit.windowMs);
  fresh.push(now);
  rateLimitBuckets.set(key, fresh);
  return fresh.length <= limit.max;
}

function anonymizeUid(uid: string): string {
  return createHash('sha256').update(uid).digest('hex').slice(0, 12);
}

export const handler = async (event: NetlifyFunctionEvent): Promise<NetlifyFunctionResponse> => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return json(500, { error: 'Missing GEMINI_API_KEY. Set it in Netlify environment variables.' });
  }

  let authUser: { uid: string } | null = null;
  try {
    authUser = await verifyRequest(event);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to verify authentication token';
    return json(401, { error: message });
  }

  if (!authUser) {
    return json(401, { error: 'Missing/invalid Authorization header. Please sign in again.' });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const body = payload as {
    action?: 'analyzeSymptoms' | 'interpretGesture' | 'doctorIntent';
    symptoms?: string;
    age?: string;
    gender?: string;
    imageBase64?: string;
    doctorText?: string;
    experimental?: boolean;
  };

  if (!body.action) {
    return json(400, { error: 'Missing/invalid action' });
  }

  if (!checkRateLimit(authUser.uid, body.action)) {
    return json(429, {
      error: 'Rate limit exceeded. Please wait a moment and try again.',
    });
  }

  const anonUserId = anonymizeUid(authUser.uid);

  if (ACTION_REQUIRES_AI_CONSENT.has(body.action)) {
    try {
      const consent = await ensureAiConsent(authUser.uid);
      if (!consent.ok) return json(403, { error: consent.reason });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to check consent.';
      return json(500, { error: message });
    }
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    if (body.action === 'doctorIntent') {
      const doctorText = String(body.doctorText || '').trim();
      if (!doctorText) {
        return json(400, { error: 'Missing doctorText' });
      }

      const prompt = `
You are a clinical intent extraction engine for a Deaf-access healthcare app.

Return ONLY valid JSON with this schema:
{
  "action": "ASK_PAIN" | "ASK_FEVER" | "ASK_PAIN_LOCATION" | "INSTRUCT_TAKE_MEDICINE_AFTER_EATING" | "INSTRUCT_GO_ER",
  "details"?: { "medicationName"?: string },
  "backTranslation": string
}

Rules:
- Only choose one action.
- If the input doesn't match any supported action, choose the closest safe question action (ASK_PAIN).
- backTranslation MUST be a short, plain-English sentence that matches the intent exactly.
- Do not include any keys beyond action/details/backTranslation.
- Do not add new medical facts, diagnoses, or advice.

User (anonymized): ${anonUserId}
Doctor text: ${doctorText}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const raw = response.text();

      const start = raw.indexOf('{');
      const end = raw.lastIndexOf('}');
      if (start < 0 || end <= start) {
        return json(502, { error: 'Model did not return JSON' });
      }

      let intent: unknown;
      try {
        intent = JSON.parse(raw.slice(start, end + 1));
      } catch {
        return json(502, { error: 'Invalid JSON returned by model' });
      }

      const obj = intent as { action?: unknown; details?: unknown };
      const bt = intent as { backTranslation?: unknown };
      const action = String(obj.action || '');
      const allowed = new Set([
        'ASK_PAIN',
        'ASK_FEVER',
        'ASK_PAIN_LOCATION',
        'INSTRUCT_TAKE_MEDICINE_AFTER_EATING',
        'INSTRUCT_GO_ER',
      ]);
      if (!allowed.has(action)) {
        return json(502, { error: 'Unsupported intent action returned by model' });
      }

      const backTranslation = String(bt.backTranslation || '').trim();
      if (!backTranslation) {
        return json(502, { error: 'Missing backTranslation returned by model' });
      }

      return json(200, {
        intent: {
          action,
          ...(obj.details && typeof obj.details === 'object' ? { details: obj.details } : {}),
        },
        backTranslation,
      });
    }

    if (body.action === 'analyzeSymptoms') {
      const prompt = `
Act as a medical AI assistant. The user has the following details:
- User (anonymized): ${anonUserId}
- Age: ${body.age || ''}
- Gender: ${body.gender || ''}
- Symptoms: ${body.symptoms || ''}

Provide a preliminary analysis including:
1. Possible conditions (ranked by probability)
2. Recommended immediate actions
3. Clear warnings about when to seek professional medical help

IMPORTANT: behavior should be empathetic but professional.
ALWAYS start with a disclaimer that you are an AI and this is not a professional diagnosis.
Format the response in cleanly structured Markdown.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: response.text() }),
      };
    }

    if (body.action === 'interpretGesture') {
      if (body.experimental !== true) {
        return json(400, {
          error:
            'interpretGesture is experimental and must be explicitly enabled. This project does not claim camera-based sign language recognition.',
        });
      }

      const prompt =
        `You are an accessibility assistant.
User (anonymized): ${anonUserId}
Describe the hand gesture or sign language in this image in 1-5 words. If no specific gesture is clear, say 'Standing By'. Focus on standard signs like 'Hello', 'Thumbs Up', 'Yes', 'No', 'Peace', 'Heart'.`;

      const imageBase64 = String(body.imageBase64 || '');
      const match = imageBase64.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
      const mimeType = match?.[1] ? `image/${match[1] === 'jpg' ? 'jpeg' : match[1]}` : 'image/jpeg';
      const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

      const imagePart = {
        inlineData: {
          data: cleanBase64,
          mimeType,
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: response.text() }),
      };
    }

    return json(400, { error: 'Missing/invalid action' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gemini request failed';
    return json(500, { error: message });
  }
};
