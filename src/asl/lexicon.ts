import type { SignToken } from './grammar';

export type SignAsset = {
  token: SignToken;
  /** Public URL under /public */
  url: string;
  /** Optional: which animation clip inside the GLB to play. */
  clip?: string;
};

/**
 * MVP lexicon. Add real ASL animation assets to /public/asl/signs and update URLs.
 */
export const SIGN_ASSETS: Record<SignToken, SignAsset> = {
  PAIN: { token: 'PAIN', url: '/asl/signs/PAIN.glb' },
  WHERE: { token: 'WHERE', url: '/asl/signs/WHERE.glb' },
  YOU: { token: 'YOU', url: '/asl/signs/YOU.glb' },
  FEVER: { token: 'FEVER', url: '/asl/signs/FEVER.glb' },
  MEDICINE: { token: 'MEDICINE', url: '/asl/signs/MEDICINE.glb' },
  EAT: { token: 'EAT', url: '/asl/signs/EAT.glb' },
  AFTER: { token: 'AFTER', url: '/asl/signs/AFTER.glb' },
  TAKE: { token: 'TAKE', url: '/asl/signs/TAKE.glb' },
  EMERGENCY: { token: 'EMERGENCY', url: '/asl/signs/EMERGENCY.glb' },
  GO: { token: 'GO', url: '/asl/signs/GO.glb' },
  NOW: { token: 'NOW', url: '/asl/signs/NOW.glb' },
};
