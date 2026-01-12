import { db } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type UserConsent = {
  /** Consent to send text to AI for translation/intent extraction. */
  aiTranslation: boolean;
  updatedAt?: unknown;
};

const consentDoc = (userId: string) => doc(db, 'userConsents', userId);

export async function getUserConsent(userId: string): Promise<UserConsent | null> {
  const snap = await getDoc(consentDoc(userId));
  return snap.exists() ? (snap.data() as UserConsent) : null;
}

export async function setAiTranslationConsent(userId: string, enabled: boolean): Promise<void> {
  await setDoc(
    consentDoc(userId),
    {
      aiTranslation: enabled,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
