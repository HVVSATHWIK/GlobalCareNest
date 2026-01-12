import { GoogleGenerativeAI } from '@google/generative-ai';

type GeminiAction = 'analyzeSymptoms' | 'interpretGesture';

type Body = {
  action?: GeminiAction;
  symptoms?: string;
  age?: string;
  gender?: string;
  imageBase64?: string;
};

type VercelRequestLike = {
  method?: string;
  body?: unknown;
};

type VercelResponseLike = {
  status: (code: number) => VercelResponseLike;
  send: (body: unknown) => void;
  json: (body: unknown) => void;
};

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const apiKey = process.env.GEMINI_API_TOKEN;
  if (!apiKey) {
    res
      .status(500)
      .send('Missing GEMINI_API_TOKEN. Set it in Vercel Project → Settings → Environment Variables.');
    return;
  }

  let body: Body = {};
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body) as Body;
    } catch {
      res.status(400).send('Invalid JSON body');
      return;
    }
  } else {
    body = (req.body || {}) as Body;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (body.action === 'analyzeSymptoms') {
      const prompt = `
Act as a medical AI assistant. The user has the following details:
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
      res.status(200).json({ text: response.text() });
      return;
    }

    if (body.action === 'interpretGesture') {
      const prompt =
        "Describe the hand gesture or sign language in this image in 1-5 words. If no specific gesture is clear, say 'Standing By'. Focus on standard signs like 'Hello', 'Thumbs Up', 'Yes', 'No', 'Peace', 'Heart'.";

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
      res.status(200).json({ text: response.text() });
      return;
    }

    res.status(400).send('Missing/invalid action');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gemini request failed';
    res.status(500).send(message);
  }
}
