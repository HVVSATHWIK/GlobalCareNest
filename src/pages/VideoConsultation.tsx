import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Loader2, MessageSquare, PhoneOff, User } from 'lucide-react';
import SignLanguageAvatar from '../components/Three/SignLanguageAvatar';
import AslSignClipPlayer from '../components/Three/AslSignClipPlayer';
import { doctorTextToIntent } from '../services/ai/gemini';
import { intentToAslSigns } from '../asl/grammar';
import { SIGN_ASSETS } from '../asl/lexicon';
import type { MedicalIntent } from '../asl/intents';
import { useCareContext } from '../contexts/useCareContext';
import { useAssetsExist } from '../hooks/useAssetsExist';
import { setAiTranslationConsent } from '../services/consent';
import { useWebRtcCall } from '../webrtc/useWebRtcCall';
import { sendChatText, sendSignTokens } from '../webrtc/messages';

const VideoConsultation = () => {
  const { authUser, profile, consent, refresh } = useCareContext();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [roomInput, setRoomInput] = useState('');
  const [sharedSignSequence, setSharedSignSequence] = useState<ReturnType<typeof intentToAslSigns>>([]);
  const [sharedBackTranslation, setSharedBackTranslation] = useState('');
  const [incomingPeerText, setIncomingPeerText] = useState('');

  const [transcript, setTranscript] = useState('Type a supported clinical phrase and I will sign it in ASL (MVP set).');
  const [intent, setIntent] = useState<MedicalIntent | null>(null);
  const [signSequence, setSignSequence] = useState<ReturnType<typeof intentToAslSigns>>([]);
  const [backTranslation, setBackTranslation] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const aiConsentEnabled = Boolean(consent?.aiTranslation);

  const call = useWebRtcCall({
    currentUserId: authUser?.uid ?? null,
    onRemoteChatText: (text) => {
      setIncomingPeerText(text);
      setTranscript(`Remote: ${text}`);
    },
    onRemoteSignTokens: (payload) => {
      setSharedSignSequence(payload.tokens as ReturnType<typeof intentToAslSigns>);
      setSharedBackTranslation(payload.backTranslation || '');
      if (payload.sourceText) setTranscript(`Remote: ${payload.sourceText}`);
    },
  });

  useEffect(() => {
    // In this MVP, the room joiner (callee) performs AI translation locally
    // so that patient identity + consent remain enforced.
    if (call.role !== 'callee') return;
    if (!incomingPeerText) return;

    if (!aiConsentEnabled) {
      setTranscript('Received text, but AI translation consent is not enabled on this device.');
      return;
    }

    void (async () => {
      setLoading(true);
      try {
        const extracted = await doctorTextToIntent(incomingPeerText);
        const normalized: MedicalIntent = {
          action: extracted.intent.action,
          ...(extracted.intent.details ? { details: extracted.intent.details } : {}),
        };
        setIntent(normalized);
        setBackTranslation(extracted.backTranslation);

        const seq = intentToAslSigns(normalized);
        setSignSequence(seq);
        setSharedSignSequence(seq);
        setSharedBackTranslation(extracted.backTranslation);

        const channel = call.dataChannel;
        if (channel && call.dataChannelReady) {
          sendSignTokens(channel, {
            tokens: seq,
            intentAction: normalized.action,
            backTranslation: extracted.backTranslation,
            sourceText: incomingPeerText,
            startedAtMs: Date.now(),
            cadenceMs: 900,
          });
        }

        setIsSpeaking(true);
        window.setTimeout(() => setIsSpeaking(false), Math.max(1500, seq.length * 900));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to translate remote text';
        setTranscript(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [aiConsentEnabled, call.dataChannel, call.dataChannelReady, call.role, incomingPeerText]);

  useEffect(() => {
    if (localVideoRef.current && call.localStream) {
      localVideoRef.current.srcObject = call.localStream;
    }
  }, [call.localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && call.remoteStream) {
      remoteVideoRef.current.srcObject = call.remoteStream;
    }
  }, [call.remoteStream]);

  const activeSignSequence = sharedSignSequence.length > 0 ? sharedSignSequence : signSequence;

  const signUrls = useMemo(() => activeSignSequence.map((t) => SIGN_ASSETS[t]?.url).filter(Boolean) as string[], [activeSignSequence]);
  const { ready: assetsReady, allExist: allAssetsExist } = useAssetsExist(signUrls);
  const useRealClips = assetsReady && allAssetsExist && activeSignSequence.length > 0;

  const doctorLabel = useMemo(() => {
    const name = profile?.name || authUser?.displayName;
    return name ? `Dr. ${name}` : 'Doctor';
  }, [profile?.name, authUser?.displayName]);

  const speakText = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem('message') as HTMLInputElement;
    const message = input.value.trim();
    if (!message) return;

    // In-call MVP: the caller (doctor/hearing) sends text over the DataChannel.
    if (call.role === 'caller' && call.dataChannel && call.dataChannelReady) {
      setTranscript(`${doctorLabel}: ${message}`);
      sendChatText(call.dataChannel, message);
      input.value = '';
      return;
    }

    if (!aiConsentEnabled) {
      setTranscript('AI translation consent is required before sending text for intent extraction.');
      return;
    }

    setLoading(true);
    setTranscript(`${doctorLabel}: ${message}`);

    try {
      const extracted = await doctorTextToIntent(message);
      const normalized: MedicalIntent = {
        action: extracted.intent.action,
        ...(extracted.intent.details ? { details: extracted.intent.details } : {}),
      };
      setIntent(normalized);
      setBackTranslation(extracted.backTranslation);

      const seq = intentToAslSigns(normalized);
      setSignSequence(seq);
      setSharedSignSequence(seq);
      setSharedBackTranslation(extracted.backTranslation);

      // Optional: share tokens in-call so both sides render the same local avatar.
      if (call.dataChannel && call.dataChannelReady) {
        sendSignTokens(call.dataChannel, {
          tokens: seq,
          intentAction: normalized.action,
          backTranslation: extracted.backTranslation,
          sourceText: message,
          startedAtMs: Date.now(),
          cadenceMs: 900,
        });
      }

      speakText('Signing now.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to extract intent';
      setIntent(null);
      setSignSequence([]);
      setBackTranslation('');
      setSharedSignSequence([]);
      setSharedBackTranslation('');
      setTranscript(msg);
    } finally {
      setLoading(false);
      input.value = '';
    }
  };

  const handleToggleConsent = async (enabled: boolean) => {
    if (!authUser) return;
    setLoading(true);
    try {
      await setAiTranslationConsent(authUser.uid, enabled);
      await refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update consent';
      setTranscript(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-900 flex flex-col md:flex-row p-4 gap-4">
      {/* Simulation of Remote Doctor */}
      <div className="flex-1 bg-gray-800 rounded-2xl overflow-hidden relative shadow-2xl border border-gray-700">
        <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded-full text-white flex items-center gap-2">
          <User className="h-4 w-4 text-teal-400" />
          <span>{doctorLabel} (Remote)</span>
        </div>

        {/* WebRTC Video Surface */}
        <div className="w-full h-full bg-black relative">
          {call.remoteStream ? (
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                <p className="text-gray-300">Waiting for remote video…</p>
              </div>
            </div>
          )}

          {call.localStream && (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute top-4 right-4 w-36 h-24 md:w-44 md:h-28 object-cover rounded-lg border border-gray-600"
            />
          )}
        </div>

        {/* 3D Avatar Overlay */}
        <div className="absolute bottom-4 right-4 w-48 h-64 md:w-64 md:h-80 bg-black/30 backdrop-blur-md rounded-xl border border-teal-500/30 overflow-hidden shadow-lg">
          <div className="absolute top-2 left-2 z-10">
            <span className="text-xs font-bold text-teal-300 bg-black/50 px-2 py-0.5 rounded">ASL Avatar (MVP)</span>
          </div>
          <Canvas frameloop={useRealClips ? 'always' : 'demand'} dpr={[1, 1]} gl={{ antialias: false, powerPreference: 'low-power' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <ambientLight intensity={0.45} />
            <directionalLight position={[3, 4, 5]} intensity={0.95} />
            <directionalLight position={[-3, 2, 4]} intensity={0.35} />
            {useRealClips ? (
              <AslSignClipPlayer signSequence={activeSignSequence} playing={isSpeaking || loading} />
            ) : (
              <SignLanguageAvatar signSequence={activeSignSequence} isSpeaking={isSpeaking} />
            )}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>

        {/* Transcript / Captions */}
        <div className="absolute bottom-4 left-4 right-4 md:right-72 bg-black/60 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-teal-300 text-sm font-semibold mb-1">ASL Signing (MVP)</p>
          <p className="text-white text-lg">{transcript}</p>
          {intent && (
            <div className="mt-2 space-y-1">
              <p className="text-teal-200 text-xs">Intent: {intent.action} · Signs: {activeSignSequence.join(' ')}</p>
              {(sharedBackTranslation || backTranslation) && (
                <p className="text-gray-200 text-xs">
                  Safety check (AI back-translation): {sharedBackTranslation || backTranslation}
                </p>
              )}
            </div>
          )}
          {!intent && sharedSignSequence.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-teal-200 text-xs">Signs: {activeSignSequence.join(' ')}</p>
              {sharedBackTranslation && (
                <p className="text-gray-200 text-xs">Safety check (AI back-translation): {sharedBackTranslation}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Input */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="bg-gray-800 p-2 rounded-xl">
          <div className="px-2 pb-2 border-b border-gray-700">
            <p className="text-sm font-semibold text-white">WebRTC Call (1:1 MVP)</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Audio/video stay P2P over WebRTC. Signaling uses Firestore. ASL tokens go over a DataChannel.
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Status: <span className="text-gray-200">{call.status}</span>
              {call.role ? <span className="text-gray-400"> · Role: {call.role}</span> : null}
            </p>
            {call.error && <p className="text-[11px] text-red-300 mt-1">{call.error}</p>}
            {call.roomId && (
              <p className="text-[11px] text-teal-200 mt-1">Room ID: {call.roomId}</p>
            )}

            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-xs disabled:opacity-60"
                disabled={!authUser || loading}
                onClick={() => void call.createRoom()}
              >
                Create Room
              </button>
              <button
                type="button"
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-xs disabled:opacity-60"
                disabled={!authUser || loading || roomInput.trim().length === 0}
                onClick={() => void call.joinRoom(roomInput.trim())}
              >
                Join Room
              </button>
            </div>

            <input
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              placeholder="Paste Room ID to join"
              className="mt-2 w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              disabled={loading}
            />

            <button
              type="button"
              className="mt-2 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs disabled:opacity-60"
              disabled={loading || call.status === 'idle'}
              onClick={() => void call.hangUp()}
            >
              Hang Up
            </button>
          </div>

          <div className="px-2 pb-2">
            {call.role === 'callee' ? (
              <>
                <label className="flex items-center gap-2 text-xs text-gray-200 select-none">
                  <input
                    type="checkbox"
                    checked={aiConsentEnabled}
                    onChange={(e) => void handleToggleConsent(e.target.checked)}
                    disabled={!authUser || loading}
                  />
                  I consent to send received text to AI for ASL translation (required)
                </label>
                <p className="text-[11px] text-gray-400 mt-1">No audio/video is sent to AI. Only text is sent.</p>
              </>
            ) : (
              <p className="text-[11px] text-gray-400 mt-1">
                Caller mode: your text is sent to the peer. The peer device performs AI translation (consent enforced).
              </p>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              name="message"
              type="text"
              placeholder="Doctor text (e.g., 'Do you have fever?')"
              className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              disabled={loading || (call.role !== 'caller' && !aiConsentEnabled)}
            />
            <button
              type="submit"
              className="p-2 bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-60"
              disabled={loading || (call.role !== 'caller' && !aiConsentEnabled)}
              aria-label="Send"
            >
              {loading ? <Loader2 className="h-4 w-4 text-white animate-spin" /> : <MessageSquare className="h-4 w-4 text-white" />}
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 flex-1 flex flex-col items-center justify-center gap-6 shadow-lg border border-gray-700">
          <button
            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-red-500/20"
            onClick={() => void call.hangUp()}
          >
            <PhoneOff className="h-5 w-5" />
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;
