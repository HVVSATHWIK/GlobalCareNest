export type MedicalIntentAction =
  | 'ASK_PAIN'
  | 'ASK_FEVER'
  | 'ASK_PAIN_LOCATION'
  | 'INSTRUCT_TAKE_MEDICINE_AFTER_EATING'
  | 'INSTRUCT_GO_ER';

export type MedicalIntent = {
  action: MedicalIntentAction;
  details?: {
    medicationName?: string;
  };
};

export const SUPPORTED_INTENTS: readonly MedicalIntentAction[] = [
  'ASK_PAIN',
  'ASK_FEVER',
  'ASK_PAIN_LOCATION',
  'INSTRUCT_TAKE_MEDICINE_AFTER_EATING',
  'INSTRUCT_GO_ER',
] as const;
