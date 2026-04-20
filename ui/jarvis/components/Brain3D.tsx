"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export const BRAIN_COLORS = {
  romain: { core: "#00ffb4", glow: "#00b890", wings: "#00ffcc" },
  fabrice: { core: "#9b8fff", glow: "#6d5fe0", wings: "#b3a8ff" },
  f2: { core: "#97C459", glow: "#6f9a39", wings: "#aed873" },
} as const;

export type ColorKey = keyof typeof BRAIN_COLORS;

export function fibSpherePos(n: number, radius: number): [number, number, number][] {
  const phi = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length: n }, (_, i) => {
    const theta = Math.acos(1 - 2 * (i + 0.5) / n);
    const angle = (2 * Math.PI * i) / phi;
    return [
      radius * Math.sin(theta) * Math.cos(angle),
      radius * Math.sin(theta) * Math.sin(angle),
      radius * Math.cos(theta),
    ] as [number, number, number];
  });
}

export function BrainCore({
  color,
  rotateSpeed = 0.4,
}: {
  color: string;
  rotateSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * rotateSpeed;
  });

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.68, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

export function CenterLine({
  to,
  color,
  opacity = 0.15,
}: {
  to: [number, number, number];
  color: string;
  opacity?: number;
}) {
  const x = to[0], y = to[1], z = to[2];

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]);
    return g;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, z]);

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    [color, opacity]
  );

  const line = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat]
  );

  return <primitive object={line} />;
}

function WingOrbit({ color, count }: { color: string; count: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibSpherePos(count, 1.4), [count]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.055, 8, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </mesh>
          <CenterLine to={pos} color={color} opacity={0.15} />
        </group>
      ))}
    </group>
  );
}

type Props = {
  persona: "romain" | "fabrice";
  mode: "normal" | "f2";
  onClick?: () => void;
};

export function Brain3D({ persona, mode, onClick }: Props) {
  const colorKey: ColorKey = mode === "f2" ? "f2" : persona;
  const colors = BRAIN_COLORS[colorKey];

  return (
    <div
      className="relative w-full flex flex-col items-center py-2 cursor-pointer group"
      onClick={onClick}
    >
      <div style={{ width: "100%", height: "160px" }}>
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={1.5} color={colors.core} />
          <pointLight position={[-2, -1, -2]} intensity={0.5} color={colors.core} />
          <Suspense fallback={null}>
            <BrainCore color={colors.core} />
            <WingOrbit color={colors.wings} count={6} />
          </Suspense>
        </Canvas>
      </div>
      <div
        className="text-[9px] font-mono tracking-widest opacity-40 group-hover:opacity-90 transition-opacity mt-0.5"
        style={{ color: colors.core }}
      >
        ◉ EXPAND 3D
      </div>
    </div>
  );
}
