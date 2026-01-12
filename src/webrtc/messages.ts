import type { SignToken } from '../asl/grammar';

export type WebRtcDataMessage =
  | {
      type: 'asl.signTokens';
      tokens: SignToken[];
      /** Optional timestamp so receivers can align playback. */
      startedAtMs?: number;
      /** Optional cadence hint (ms per token) for MVP players. */
      cadenceMs?: number;
      /** Optional: intent string for UI/debug (do not treat as source of truth). */
      intentAction?: string;
      /** Optional: plain-English verification text (must not add new medical facts). */
      backTranslation?: string;
      /** Optional: original source text that was translated. */
      sourceText?: string;
    }
  | {
      type: 'chat.text';
      text: string;
    };

export function encodeWebRtcMessage(message: WebRtcDataMessage): string {
  return JSON.stringify(message);
}

export function decodeWebRtcMessage(raw: string): WebRtcDataMessage | null {
  try {
    const parsed = JSON.parse(raw) as { type?: unknown };
    const type = String(parsed.type || '');
    if (type === 'asl.signTokens') {
      const msg = parsed as {
        type: 'asl.signTokens';
        tokens?: unknown;
        startedAtMs?: unknown;
        cadenceMs?: unknown;
        intentAction?: unknown;
      };
      if (!Array.isArray(msg.tokens)) return null;
      return {
        type: 'asl.signTokens',
        tokens: msg.tokens.map((t) => String(t)) as SignToken[],
        startedAtMs: typeof msg.startedAtMs === 'number' ? msg.startedAtMs : undefined,
        cadenceMs: typeof msg.cadenceMs === 'number' ? msg.cadenceMs : undefined,
        intentAction: typeof msg.intentAction === 'string' ? msg.intentAction : undefined,
        backTranslation: typeof (msg as { backTranslation?: unknown }).backTranslation === 'string'
          ? String((msg as { backTranslation?: unknown }).backTranslation)
          : undefined,
        sourceText: typeof (msg as { sourceText?: unknown }).sourceText === 'string'
          ? String((msg as { sourceText?: unknown }).sourceText)
          : undefined,
      };
    }

    if (type === 'chat.text') {
      const msg = parsed as { type: 'chat.text'; text?: unknown };
      const text = typeof msg.text === 'string' ? msg.text : '';
      if (!text) return null;
      return { type: 'chat.text', text };
    }

    return null;
  } catch {
    return null;
  }
}

export function sendSignTokens(
  channel: RTCDataChannel,
  params: {
    tokens: SignToken[];
    startedAtMs?: number;
    cadenceMs?: number;
    intentAction?: string;
    backTranslation?: string;
    sourceText?: string;
  }
): void {
  if (channel.readyState !== 'open') return;
  const payload: WebRtcDataMessage = {
    type: 'asl.signTokens',
    tokens: params.tokens,
    startedAtMs: params.startedAtMs,
    cadenceMs: params.cadenceMs,
    intentAction: params.intentAction,
    backTranslation: params.backTranslation,
    sourceText: params.sourceText,
  };
  channel.send(encodeWebRtcMessage(payload));
}

export function sendChatText(channel: RTCDataChannel, text: string): void {
  if (channel.readyState !== 'open') return;
  const payload: WebRtcDataMessage = { type: 'chat.text', text };
  channel.send(encodeWebRtcMessage(payload));
}
