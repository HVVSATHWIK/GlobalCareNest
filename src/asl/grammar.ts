import type { MedicalIntent } from './intents';

export type SignToken =
  | 'PAIN'
  | 'WHERE'
  | 'YOU'
  | 'FEVER'
  | 'MEDICINE'
  | 'EAT'
  | 'AFTER'
  | 'TAKE'
  | 'EMERGENCY'
  | 'GO'
  | 'NOW';

export function intentToAslSigns(intent: MedicalIntent): SignToken[] {
  switch (intent.action) {
    case 'ASK_PAIN':
      // Rough ASL-ish concept order for an MVP demo: YOU PAIN?
      return ['YOU', 'PAIN'];
    case 'ASK_PAIN_LOCATION':
      // WHERE PAIN?
      return ['WHERE', 'PAIN'];
    case 'ASK_FEVER':
      // YOU FEVER?
      return ['YOU', 'FEVER'];
    case 'INSTRUCT_TAKE_MEDICINE_AFTER_EATING':
      // MEDICINE EAT AFTER TAKE
      return ['MEDICINE', 'EAT', 'AFTER', 'TAKE'];
    case 'INSTRUCT_GO_ER':
      // EMERGENCY GO NOW
      return ['EMERGENCY', 'GO', 'NOW'];
    default:
      return ['YOU', 'PAIN'];
  }
}
