import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import { SIGN_ASSETS } from '../../asl/lexicon';
import type { SignToken } from '../../asl/grammar';

type AslSignClipPlayerProps = {
  signSequence: SignToken[];
  /** When false, pauses on current sign. */
  playing?: boolean;
  /** Loop the sequence. Default true. */
  loop?: boolean;
};

function Clip({ url, clipName, onFinished }: { url: string; clipName?: string; onFinished: () => void }) {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(url) as GLTF;
  const { actions, mixer, names } = useAnimations(gltf.animations, group);

  const resolvedClip = useMemo(() => {
    if (clipName && names.includes(clipName)) return clipName;
    return names[0];
  }, [clipName, names]);

  useEffect(() => {
    if (!resolvedClip) return;
    const action = actions[resolvedClip];
    if (!action) return;

    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();

    const handleFinished = (e: THREE.Event) => {
      const event = e as THREE.Event & { action?: THREE.AnimationAction };
      if (event.action !== action) return;
      onFinished();
    };

    mixer.addEventListener('finished', handleFinished);
    return () => {
      mixer.removeEventListener('finished', handleFinished);
      action.stop();
    };
  }, [actions, mixer, onFinished, resolvedClip]);

  // Ensure animation mixers update.
  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function AslSignClipPlayer({ signSequence, playing = true, loop = true }: AslSignClipPlayerProps) {
  const tokens = signSequence;
  const [index, setIndex] = useState(0);

  const tokenKey = useMemo(() => tokens.join('|'), [tokens]);

  useEffect(() => {
    setIndex(0);
  }, [tokenKey]);

  useEffect(() => {
    // Best-effort preload for smoother playback.
    tokens.forEach((t) => {
      const asset = SIGN_ASSETS[t];
      if (asset?.url) useGLTF.preload(asset.url);
    });
  }, [tokens]);

  const token = tokens[index];
  const asset = token ? SIGN_ASSETS[token] : undefined;

  const advance = () => {
    if (!playing) return;
    setIndex((i) => {
      const next = i + 1;
      if (next < tokens.length) return next;
      return loop ? 0 : i;
    });
  };

  if (!asset?.url || tokens.length === 0) return null;

  return (
    <Suspense fallback={null}>
      <Clip url={asset.url} clipName={asset.clip} onFinished={advance} />
    </Suspense>
  );
}
