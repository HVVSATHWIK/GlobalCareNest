type GeminiAction = 'analyzeSymptoms' | 'interpretGesture' | 'doctorIntent';

const FUNCTION_URL = '/api/gemini';

import { auth } from '../../config/firebase';

async function callGeminiFunction(payload: Record<string, unknown> & { action: GeminiAction }): Promise<string> {
    const token = await auth.currentUser?.getIdToken();

    const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Gemini function error (${res.status})`);
    }

    const data = (await res.json()) as { text?: string };
    return (data.text || '').toString();
}

async function callGeminiFunctionJson<T>(payload: Record<string, unknown> & { action: GeminiAction }): Promise<T> {
    const token = await auth.currentUser?.getIdToken();

    const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Gemini function error (${res.status})`);
    }

    return (await res.json()) as T;
}

export const analyzeSymptoms = async (
    symptoms: string,
    age: string,
    gender: string
): Promise<string> => {
    try {
        return await callGeminiFunction({ action: 'analyzeSymptoms', symptoms, age, gender });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to generate diagnosis.';
        throw new Error(
            `${message}\n\nIf you're running locally, start the Netlify function with "netlify dev" and set GEMINI_API_KEY + FIREBASE_SERVICE_ACCOUNT in your Netlify environment variables.`
        );
    }
};

export const interpretGesture = async (imageBase64: string): Promise<string> => {
    try {
        return await callGeminiFunction({ action: 'interpretGesture', imageBase64, experimental: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to interpret gesture.';
        throw new Error(
            `${message}\n\nIf you're running locally, start the Netlify function with "netlify dev" and set GEMINI_API_KEY + FIREBASE_SERVICE_ACCOUNT in your Netlify environment variables.`
        );
    }
};

export type DoctorIntentResponse = {
    intent: {
        action: 'ASK_PAIN' | 'ASK_FEVER' | 'ASK_PAIN_LOCATION' | 'INSTRUCT_TAKE_MEDICINE_AFTER_EATING' | 'INSTRUCT_GO_ER';
        details?: { medicationName?: string };
    };
    backTranslation: string;
};

export const doctorTextToIntent = async (doctorText: string): Promise<DoctorIntentResponse> => {
    return await callGeminiFunctionJson<DoctorIntentResponse>({ action: 'doctorIntent', doctorText });
};
