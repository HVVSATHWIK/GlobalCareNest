import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { decodeWebRtcMessage } from './messages';

type SessionDescriptionJson = { type: RTCSdpType; sdp: string };
type IceCandidateJson = RTCIceCandidateInit;

export type WebRtcRole = 'caller' | 'callee';
export type WebRtcStatus = 'idle' | 'ready' | 'connecting' | 'connected' | 'ended' | 'error';

export type UseWebRtcCallOptions = {
  currentUserId: string | null;
  onRemoteChatText?: (text: string) => void;
  onRemoteSignTokens?: (payload: {
    tokens: string[];
    intentAction?: string;
    backTranslation?: string;
    sourceText?: string;
  }) => void;
};

export function useWebRtcCall(options: UseWebRtcCallOptions) {
  const { currentUserId, onRemoteChatText, onRemoteSignTokens } = options;

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const unsubscribersRef = useRef<Array<() => void>>([]);

  const [status, setStatus] = useState<WebRtcStatus>('idle');
  const [role, setRole] = useState<WebRtcRole | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [dataChannelReady, setDataChannelReady] = useState(false);

  const iceServers = useMemo<RTCConfiguration>(() => {
    return {
      iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
    };
  }, []);

  const cleanupSnapshots = useCallback(() => {
    unsubscribersRef.current.forEach((u) => {
      try {
        u();
      } catch {
        // ignore
      }
    });
    unsubscribersRef.current = [];
  }, []);

  const stopMedia = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    setLocalStream(null);

    remoteStreamRef.current?.getTracks().forEach((t) => t.stop());
    remoteStreamRef.current = null;
    setRemoteStream(null);
  }, []);

  const closePeer = useCallback(() => {
    setDataChannelReady(false);
    const dc = dataChannelRef.current;
    try {
      dc?.close();
    } catch {
      // ignore
    }
    dataChannelRef.current = null;

    const pc = pcRef.current;
    try {
      pc?.close();
    } catch {
      // ignore
    }
    pcRef.current = null;
  }, []);

  const ensureLocalMedia = useCallback(async () => {
    if (localStreamRef.current) return localStreamRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    setLocalStream(stream);
    return stream;
  }, []);

  const wireDataChannel = useCallback(
    (dc: RTCDataChannel) => {
      dataChannelRef.current = dc;
      dc.onopen = () => setDataChannelReady(true);
      dc.onclose = () => setDataChannelReady(false);
      dc.onerror = () => setDataChannelReady(false);
      dc.onmessage = (e) => {
        const decoded = typeof e.data === 'string' ? decodeWebRtcMessage(e.data) : null;
        if (!decoded) return;
        if (decoded.type === 'chat.text') onRemoteChatText?.(decoded.text);
        if (decoded.type === 'asl.signTokens') {
          onRemoteSignTokens?.({
            tokens: decoded.tokens,
            intentAction: decoded.intentAction,
            backTranslation: decoded.backTranslation,
            sourceText: decoded.sourceText,
          });
        }
      };
    },
    [onRemoteChatText, onRemoteSignTokens]
  );

  const createPeerConnection = useCallback(async () => {
    const pc = new RTCPeerConnection(iceServers);
    pcRef.current = pc;

    const remote = new MediaStream();
    remoteStreamRef.current = remote;
    setRemoteStream(remote);

    pc.ontrack = (event) => {
      event.streams[0]?.getTracks().forEach((t) => remote.addTrack(t));
    };

    pc.ondatachannel = (event) => {
      wireDataChannel(event.channel);
    };

    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      if (s === 'connected') setStatus('connected');
      if (s === 'failed' || s === 'disconnected') setStatus('error');
      if (s === 'closed') setStatus('ended');
    };

    const local = await ensureLocalMedia();
    local.getTracks().forEach((track) => pc.addTrack(track, local));

    return pc;
  }, [ensureLocalMedia, iceServers, wireDataChannel]);

  const createRoom = useCallback(async () => {
    if (!currentUserId) {
      setError('Sign in required to start a call.');
      setStatus('error');
      return null;
    }

    setError(null);
    setStatus('connecting');
    setRole('caller');

    const pc = await createPeerConnection();
    const dc = pc.createDataChannel('asl');
    wireDataChannel(dc);

    const roomRef = doc(collection(db, 'webrtcRooms'));
    await setDoc(roomRef, {
      createdAt: serverTimestamp(),
      createdBy: currentUserId,
    });
    setRoomId(roomRef.id);

    const callerCandidates = collection(roomRef, 'callerCandidates');
    pc.onicecandidate = async (event) => {
      if (!event.candidate) return;
      await addDoc(callerCandidates, event.candidate.toJSON() as IceCandidateJson);
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await updateDoc(roomRef, {
      offer: { type: offer.type, sdp: offer.sdp } as SessionDescriptionJson,
    });

    unsubscribersRef.current.push(
      onSnapshot(roomRef, async (snap) => {
        const data = snap.data() as { answer?: SessionDescriptionJson } | undefined;
        const answer = data?.answer;
        if (!answer) return;
        if (pc.currentRemoteDescription) return;
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      })
    );

    unsubscribersRef.current.push(
      onSnapshot(collection(roomRef, 'calleeCandidates'), (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type !== 'added') return;
          const data = change.doc.data() as IceCandidateJson;
          void pc.addIceCandidate(new RTCIceCandidate(data));
        });
      })
    );

    setStatus('ready');
    return roomRef.id;
  }, [createPeerConnection, currentUserId, wireDataChannel]);

  const joinRoom = useCallback(
    async (id: string) => {
      if (!currentUserId) {
        setError('Sign in required to join a call.');
        setStatus('error');
        return false;
      }

      setError(null);
      setStatus('connecting');
      setRole('callee');
      setRoomId(id);

      const roomRef = doc(db, 'webrtcRooms', id);
      const snap = await getDoc(roomRef);
      if (!snap.exists()) {
        setError('Room not found.');
        setStatus('error');
        return false;
      }

      const data = snap.data() as { offer?: SessionDescriptionJson };
      if (!data.offer?.sdp) {
        setError('Room has no offer yet.');
        setStatus('error');
        return false;
      }

      const pc = await createPeerConnection();
      pc.onicecandidate = async (event) => {
        if (!event.candidate) return;
        await addDoc(collection(roomRef, 'calleeCandidates'), event.candidate.toJSON() as IceCandidateJson);
      };

      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await updateDoc(roomRef, {
        answer: { type: answer.type, sdp: answer.sdp } as SessionDescriptionJson,
        answeredAt: serverTimestamp(),
        answeredBy: currentUserId,
      });

      unsubscribersRef.current.push(
        onSnapshot(collection(roomRef, 'callerCandidates'), (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type !== 'added') return;
            const c = change.doc.data() as IceCandidateJson;
            void pc.addIceCandidate(new RTCIceCandidate(c));
          });
        })
      );

      setStatus('ready');
      return true;
    },
    [createPeerConnection, currentUserId]
  );

  const hangUp = useCallback(
    async (opts?: { deleteRoom?: boolean }) => {
      cleanupSnapshots();
      closePeer();
      stopMedia();
      setStatus('ended');
      setDataChannelReady(false);

      const id = roomId;
      setRoomId(null);
      setRole(null);
      if (opts?.deleteRoom && id) {
        try {
          await deleteDoc(doc(db, 'webrtcRooms', id));
        } catch {
          // best effort
        }
      }
    },
    [cleanupSnapshots, closePeer, stopMedia, roomId]
  );

  useEffect(() => {
    return () => {
      void hangUp();
    };
  }, [hangUp]);

  return {
    status,
    role,
    roomId,
    error,
    localStream,
    remoteStream,
    dataChannel: dataChannelRef.current,
    dataChannelReady,
    ensureLocalMedia,
    createRoom,
    joinRoom,
    hangUp,
  };
}
