import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Cylinder, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// --- Physics Constants ---
// Stiffness (k): How fast it snaps to target (Higher = Snappier)
// Damping (c): How much it resists motion (Lower = More wobble/overshoot)
const SPRING_CONFIG = {
    idle: { stiffness: 80, damping: 10 },    // Soft, relaxed
    wave: { stiffness: 150, damping: 12 },   // Energetic, slight wobble
    thumbs: { stiffness: 120, damping: 15 }, // Confident, firm snap
    yes: { stiffness: 100, damping: 10 },    // Gentle nod
    no: { stiffness: 120, damping: 12 },
    peace: { stiffness: 140, damping: 12 },
    heart: { stiffness: 130, damping: 14 },
};

// Helper for Spring Physics State
class SpringValue {
    current: number;
    target: number;
    velocity: number;

    constructor(initial: number) {
        this.current = initial;
        this.target = initial;
        this.velocity = 0;
    }

    update(stiffness: number, damping: number, delta: number) {
        // Semi-Implicit Euler Integration (Hooke's Law)
        // F = -k(x - target) - c(v)
        // a = F / m (assuming mass = 1)
        const force = -stiffness * (this.current - this.target) - damping * this.velocity;

        this.velocity += force * delta;
        this.current += this.velocity * delta;
        return this.current;
    }
}

type SignLanguageAvatarProps = {
    gesture?: string;
    /** Sequence of sign tokens (e.g., ['MEDICINE','EAT','AFTER','TAKE']). */
    signSequence?: string[];
    isSpeaking?: boolean;
};

const SignLanguageAvatar = ({ gesture = "idle", signSequence, isSpeaking = false }: SignLanguageAvatarProps) => {
    const group = useRef<THREE.Group>(null);
    const leftUpperArm = useRef<THREE.Mesh>(null);
    const leftForeArm = useRef<THREE.Mesh>(null);
    const leftHand = useRef<THREE.Mesh>(null);
    const rightUpperArm = useRef<THREE.Mesh>(null);
    const rightForeArm = useRef<THREE.Mesh>(null);
    const rightHand = useRef<THREE.Mesh>(null);
    const head = useRef<THREE.Group>(null);
    const mouth = useRef<THREE.Mesh>(null);

    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [sequenceGesture, setSequenceGesture] = useState<string>('idle');

    useEffect(() => {
        setSequenceIndex(0);
    }, [signSequence]);

    useEffect(() => {
        if (!signSequence || signSequence.length === 0) {
            setSequenceGesture('idle');
            return;
        }

        const token = (signSequence[sequenceIndex] || 'idle').toUpperCase();
        // Temporary fallback mapping: until GLB sign animations are added.
        // Keeps the pipeline stable and demo-able without crashing on missing assets.
        const tokenToGesture: Record<string, string> = {
            YOU: 'yes',
            WHERE: 'no',
            PAIN: 'heart',
            FEVER: 'thumbs',
            MEDICINE: 'thumbs',
            EAT: 'wave',
            AFTER: 'yes',
            TAKE: 'thumbs',
            EMERGENCY: 'no',
            GO: 'wave',
            NOW: 'yes',
        };

        setSequenceGesture(tokenToGesture[token] || 'idle');
    }, [signSequence, sequenceIndex]);

    useEffect(() => {
        if (!signSequence || signSequence.length === 0) return;
        // Advance signs at a fixed cadence (MVP). Real signing will be clip-duration driven.
        const id = window.setInterval(() => {
            setSequenceIndex((i) => {
                const next = i + 1;
                return next >= signSequence.length ? 0 : next;
            });
        }, 900);
        return () => window.clearInterval(id);
    }, [signSequence]);

    const skinMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color('#f2c6b3'),
                roughness: 0.6,
                metalness: 0.0,
            }),
        []
    );

    const clothMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color('#1f8a8c'),
                roughness: 0.85,
                metalness: 0.05,
            }),
        []
    );

    const hairMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color('#1f2937'),
                roughness: 0.8,
                metalness: 0.0,
            }),
        []
    );

    const invalidate = useThree((s) => s.invalidate);

    useEffect(() => {
        // Reduce GPU/CPU heat by rendering at a capped FPS.
        // When idle and not speaking, render slower.
        const activeGesture = (signSequence && signSequence.length > 0 ? sequenceGesture : gesture);
        const g = activeGesture.toLowerCase();
        const isIdle = g.includes('idle') || g.includes('standing by');
        const fps = isIdle && !isSpeaking ? 12 : 30;
        const intervalMs = Math.round(1000 / fps);
        const id = window.setInterval(() => invalidate(), intervalMs);
        return () => window.clearInterval(id);
    }, [gesture, signSequence, sequenceGesture, isSpeaking, invalidate]);

    // Initialize Physics State
    const physics = useRef({
        left: {
            shoulderZ: new SpringValue(0.2),
            shoulderX: new SpringValue(0.0),
            elbowX: new SpringValue(0.0),
            wristZ: new SpringValue(0.0),
        },
        right: {
            shoulderZ: new SpringValue(-0.2),
            shoulderX: new SpringValue(0.0),
            elbowX: new SpringValue(0.0),
            wristZ: new SpringValue(0.0),
        },
        head: { x: new SpringValue(0), y: new SpringValue(0), z: new SpringValue(0) },
        mouth: { y: new SpringValue(0.1) }
    }).current;

    useFrame((state, delta) => {
        // Clamp delta to prevent explosion on tab switch
        const dt = Math.min(delta, 0.1);
        const t = state.clock.getElapsedTime();
        const activeGesture = (signSequence && signSequence.length > 0 ? sequenceGesture : gesture);
        const g = activeGesture.toLowerCase();

        // 1. Determine Parameters based on Gesture
        let config = SPRING_CONFIG.idle;
        if (g.includes("wave")) config = SPRING_CONFIG.wave;
        else if (g.includes("thumbs")) config = SPRING_CONFIG.thumbs;
        else if (g.includes("yes")) config = SPRING_CONFIG.yes;
        else if (g.includes("no")) config = SPRING_CONFIG.no;
        else if (g.includes("peace")) config = SPRING_CONFIG.peace;
        else if (g.includes("heart")) config = SPRING_CONFIG.heart;

        // 2. Set Targets based on Intent
        if (g.includes('hello') || g.includes('wave')) {
            // Right-hand wave
            physics.right.shoulderZ.target = 1.8;
            physics.right.shoulderX.target = -0.4;
            physics.right.elbowX.target = -0.8;
            physics.right.wristZ.target = Math.sin(t * 10) * 0.8;

            physics.left.shoulderZ.target = 0.3;
            physics.left.shoulderX.target = 0.05;
            physics.left.elbowX.target = -0.1;
            physics.left.wristZ.target = 0;

            physics.head.x.target = -0.08;
            physics.head.z.target = 0.04;
        } else if (g.includes('yes')) {
            // Gentle nod + hands near torso
            physics.head.x.target = Math.sin(t * 8) * 0.18;
            physics.head.z.target = 0;

            physics.right.shoulderZ.target = 0.35;
            physics.right.shoulderX.target = 0.1;
            physics.right.elbowX.target = -0.3;
            physics.right.wristZ.target = 0.2;

            physics.left.shoulderZ.target = -0.35;
            physics.left.shoulderX.target = 0.1;
            physics.left.elbowX.target = -0.3;
            physics.left.wristZ.target = -0.2;
        } else if (g.includes('no')) {
            // Head shake + hands down
            physics.head.x.target = 0;
            physics.head.z.target = Math.sin(t * 10) * 0.22;

            physics.right.shoulderZ.target = 0.05;
            physics.right.shoulderX.target = 0.0;
            physics.right.elbowX.target = 0.05;
            physics.right.wristZ.target = 0;

            physics.left.shoulderZ.target = -0.05;
            physics.left.shoulderX.target = 0.0;
            physics.left.elbowX.target = 0.05;
            physics.left.wristZ.target = 0;
        } else if (g.includes('thumbs')) {
            // Thumbs-up (both hands up)
            physics.right.shoulderZ.target = 1.2;
            physics.right.shoulderX.target = -0.2;
            physics.right.elbowX.target = -0.7;
            physics.right.wristZ.target = 0.4;

            physics.left.shoulderZ.target = -1.2;
            physics.left.shoulderX.target = -0.2;
            physics.left.elbowX.target = -0.7;
            physics.left.wristZ.target = -0.4;

            physics.head.x.target = 0;
            physics.head.z.target = 0;
        } else if (g.includes('peace')) {
            // Peace sign pose (right hand up)
            physics.right.shoulderZ.target = 1.6;
            physics.right.shoulderX.target = -0.3;
            physics.right.elbowX.target = -1.0;
            physics.right.wristZ.target = 0.6;

            physics.left.shoulderZ.target = 0.2;
            physics.left.shoulderX.target = 0;
            physics.left.elbowX.target = -0.2;
            physics.left.wristZ.target = 0;

            physics.head.x.target = -0.05;
            physics.head.z.target = 0.05;
        } else if (g.includes('heart')) {
            // Hands together in front (approx)
            physics.right.shoulderZ.target = 0.9;
            physics.right.shoulderX.target = 0.2;
            physics.right.elbowX.target = -0.9;
            physics.right.wristZ.target = -0.25;

            physics.left.shoulderZ.target = -0.9;
            physics.left.shoulderX.target = 0.2;
            physics.left.elbowX.target = -0.9;
            physics.left.wristZ.target = 0.25;

            physics.head.x.target = -0.03;
            physics.head.z.target = 0;
        } else {
            // Idle / listening
            physics.left.shoulderZ.target = -0.25;
            physics.left.shoulderX.target = 0.05;
            physics.left.elbowX.target = -0.15;
            physics.left.wristZ.target = 0;

            physics.right.shoulderZ.target = 0.25;
            physics.right.shoulderX.target = 0.05;
            physics.right.elbowX.target = -0.15;
            physics.right.wristZ.target = 0;

            physics.head.x.target = 0;
            physics.head.z.target = 0;
        }

        // Breathing / Organic Noise
        const breath = Math.sin(t * 1) * 0.05 + Math.sin(t * 2.3) * 0.02;
        const microJitter = Math.sin(t * 10) * 0.002;

        if (group.current) {
            group.current.position.y = -1 + breath * 0.5;
            group.current.rotation.z = Math.sin(t * 0.5) * 0.02;
        }

        // 3. Solve Physics (arms)
        const lShoulderZ = physics.left.shoulderZ.update(config.stiffness, config.damping, dt);
        const lShoulderX = physics.left.shoulderX.update(config.stiffness, config.damping, dt);
        const lElbowX = physics.left.elbowX.update(config.stiffness, config.damping, dt);
        const lWristZ = physics.left.wristZ.update(config.stiffness, config.damping, dt);

        const rShoulderZ = physics.right.shoulderZ.update(config.stiffness, config.damping, dt);
        const rShoulderX = physics.right.shoulderX.update(config.stiffness, config.damping, dt);
        const rElbowX = physics.right.elbowX.update(config.stiffness, config.damping, dt);
        const rWristZ = physics.right.wristZ.update(config.stiffness, config.damping, dt);

        if (leftUpperArm.current) {
            leftUpperArm.current.rotation.z = lShoulderZ + breath * 0.08;
            leftUpperArm.current.rotation.x = lShoulderX;
        }
        if (leftForeArm.current) {
            leftForeArm.current.rotation.x = lElbowX;
        }
        if (leftHand.current) {
            leftHand.current.rotation.z = lWristZ;
        }

        if (rightUpperArm.current) {
            rightUpperArm.current.rotation.z = rShoulderZ - breath * 0.08;
            rightUpperArm.current.rotation.x = rShoulderX;
        }
        if (rightForeArm.current) {
            rightForeArm.current.rotation.x = rElbowX;
        }
        if (rightHand.current) {
            rightHand.current.rotation.z = rWristZ;
        }

        if (head.current) {
            const rotX = physics.head.x.update(config.stiffness, config.damping, dt);
            const rotZ = physics.head.z.update(config.stiffness, config.damping, dt);
            head.current.rotation.x = rotX + microJitter;
            head.current.rotation.z = rotZ;
            head.current.rotation.y = Math.sin(t * 0.3) * 0.08;
        }

        // 4. Mouth Physics
        if (mouth.current) {
            if (isSpeaking) {
                physics.mouth.y.target = Math.sin(t * 25) * 0.3 + 0.4;
                mouth.current.scale.y = physics.mouth.y.update(300, 15, dt);
            } else {
                physics.mouth.y.target = 0.1;
                mouth.current.scale.y = physics.mouth.y.update(100, 15, dt);
            }
        }
    });

    return (
        <group ref={group} position={[0, -1, 0]}>
            {/* Head + Face */}
            <group ref={head} position={[0, 1.85, 0]}>
                {/* Head Mesh */}
                <Sphere args={[0.6, 16, 16]}>
                    <primitive attach="material" object={skinMaterial} />
                </Sphere>
                {/* Hair cap */}
                <Sphere args={[0.62, 16, 16]} position={[0, 0.08, -0.02]}>
                    <primitive attach="material" object={hairMaterial} />
                </Sphere>
                {/* Eyes */}
                <Sphere args={[0.06, 12, 12]} position={[-0.2, 0.1, 0.52]}>
                    <meshStandardMaterial color="#111827" roughness={0.25} />
                </Sphere>
                <Sphere args={[0.06, 12, 12]} position={[0.2, 0.1, 0.52]}>
                    <meshStandardMaterial color="#111827" roughness={0.25} />
                </Sphere>
                {/* Mouth */}
                <group position={[0, -0.2, 0.58]}>
                    <mesh ref={mouth}>
                        <sphereGeometry args={[0.07, 10, 10]} />
                        <meshStandardMaterial color="#B91C1C" roughness={0.35} />
                    </mesh>
                </group>
            </group>

            {/* Neck */}
            <Cylinder args={[0.18, 0.2, 0.25, 14]} position={[0, 1.33, 0]}>
                <primitive attach="material" object={skinMaterial} />
            </Cylinder>

            {/* Torso */}
            <RoundedBox args={[1.25, 1.55, 0.75]} radius={0.22} smoothness={4} position={[0, 0.55, 0]}>
                <primitive attach="material" object={clothMaterial} />
            </RoundedBox>

            {/* Hips */}
            <RoundedBox args={[1.05, 0.55, 0.7]} radius={0.18} smoothness={4} position={[0, -0.25, 0]}>
                <meshStandardMaterial color="#0f766e" roughness={0.9} />
            </RoundedBox>

            {/* Left Arm (shoulder -> elbow -> hand) */}
            <group position={[-0.78, 1.2, 0.05]}>
                <mesh ref={leftUpperArm} position={[0, -0.35, 0]}>
                    <cylinderGeometry args={[0.12, 0.14, 0.8, 12]} />
                    <primitive attach="material" object={skinMaterial} />
                </mesh>
                <group position={[0, -0.75, 0]}>
                    <mesh ref={leftForeArm} position={[0, -0.32, 0]}>
                        <cylinderGeometry args={[0.11, 0.11, 0.7, 12]} />
                        <primitive attach="material" object={skinMaterial} />
                    </mesh>
                    <group position={[0, -0.7, 0.05]}>
                        <RoundedBox ref={leftHand} args={[0.25, 0.18, 0.3]} radius={0.05} smoothness={4}>
                            <primitive attach="material" object={skinMaterial} />
                        </RoundedBox>
                    </group>
                </group>
            </group>

            {/* Right Arm */}
            <group position={[0.78, 1.2, 0.05]}>
                <mesh ref={rightUpperArm} position={[0, -0.35, 0]}>
                    <cylinderGeometry args={[0.12, 0.14, 0.8, 12]} />
                    <primitive attach="material" object={skinMaterial} />
                </mesh>
                <group position={[0, -0.75, 0]}>
                    <mesh ref={rightForeArm} position={[0, -0.32, 0]}>
                        <cylinderGeometry args={[0.11, 0.11, 0.7, 12]} />
                        <primitive attach="material" object={skinMaterial} />
                    </mesh>
                    <group position={[0, -0.7, 0.05]}>
                        <RoundedBox ref={rightHand} args={[0.25, 0.18, 0.3]} radius={0.05} smoothness={4}>
                            <primitive attach="material" object={skinMaterial} />
                        </RoundedBox>
                    </group>
                </group>
            </group>
        </group>
    );
};

export default SignLanguageAvatar;
