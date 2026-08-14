'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Config ──────────────────────────────────────────────────────────────────
const CONFIG = {
  nodeCount: 70,
  spread: { x: 18, y: 12, z: 10 },
  connectionThreshold: 3.8,
  nodeColor: '#6366f1',
  lineColor: '#6366f1',
  icoColor: '#f59e0b',
  rotationSpeed: 0.025,
  floatSpeed: 0.35,
};

// ─── Node Network ─────────────────────────────────────────────────────────────
function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null!);

  const { nodePositions, linePositions } = useMemo(() => {
    const vecs: THREE.Vector3[] = [];
    const nodePos: number[] = [];

    for (let i = 0; i < CONFIG.nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * CONFIG.spread.x,
        (Math.random() - 0.5) * CONFIG.spread.y,
        (Math.random() - 0.5) * CONFIG.spread.z
      );
      vecs.push(v);
      nodePos.push(v.x, v.y, v.z);
    }

    const lines: number[] = [];
    for (let i = 0; i < CONFIG.nodeCount; i++) {
      for (let j = i + 1; j < CONFIG.nodeCount; j++) {
        if (vecs[i].distanceTo(vecs[j]) < CONFIG.connectionThreshold) {
          lines.push(vecs[i].x, vecs[i].y, vecs[i].z, vecs[j].x, vecs[j].y, vecs[j].z);
        }
      }
    }

    return {
      nodePositions: new Float32Array(nodePos),
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * CONFIG.rotationSpeed;
    groupRef.current.rotation.x = Math.sin(t * 0.012) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Node dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={CONFIG.nodeColor}
          size={0.055}
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={CONFIG.lineColor} transparent opacity={0.09} />
      </lineSegments>
    </group>
  );
}

// ─── Floating Icosahedron (ETH / Blockchain reference) ───────────────────────
function FloatingIco({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.26;
    ref.current.position.y = position[1] + Math.sin(t * CONFIG.floatSpeed) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshBasicMaterial color={CONFIG.icoColor} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

// ─── Secondary floating orb ───────────────────────────────────────────────────
function FloatingOctahedron({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.z = t * 0.09;
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + 1.5) * 0.25;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.9, 0]} />
      <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.14} />
    </mesh>
  );
}

// ─── Exported Canvas Scene ───────────────────────────────────────────────────
export function NodeNetwork3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 58 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <NodeNetwork />
      <FloatingIco position={[4.5, 0.5, -1.5]} />
      <FloatingOctahedron position={[-4.2, -1.2, -0.5]} />
    </Canvas>
  );
}
