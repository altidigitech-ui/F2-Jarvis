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

// Hemisphere with gyri/sulci via vertex displacement
function createHemisphereGeo(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(0.72, 48, 36);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const ox = pos.getX(i);
    const oy = pos.getY(i);
    const oz = pos.getZ(i);
    const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 0.001;
    const nx = ox / len, ny = oy / len, nz = oz / len;

    // Layer 1 — main lobes (frontal / parietal / occipital / temporal)
    const major =
      Math.sin(nx * 4.2 + nz * 3.5 + 1.1) * 0.11 +
      Math.sin(ny * 3.8 + nx * 3.0 + 2.3) * 0.09 +
      Math.sin(nz * 4.5 + ny * 3.2 + 0.7) * 0.08;

    // Layer 2 — secondary gyri (main wrinkles)
    const gyri =
      Math.sin(nx * 9.5 + nz * 8.2 + 0.4) * 0.062 +
      Math.sin(ny * 8.8 + nx * 7.1 + 2.0) * 0.052 +
      Math.sin(nz * 10.3 + ny * 7.8 + 3.5) * 0.047;

    // Layer 3 — fine sulci
    const sulci =
      Math.sin(nx * 16 + ny * 13 + nz * 14.5 + 1.0) * 0.022 +
      Math.sin(nx * 21 + nz * 18 + 2.7) * 0.013;

    const r = 1 + major + gyri + sulci;

    // Brain proportions: wider X, flatter Y
    pos.setXYZ(i, ox * r * 1.08, oy * r * 0.78, oz * r);
  }

  geo.computeVertexNormals();
  return geo;
}

// Cerebellum: flat ellipsoid with horizontal folia ridges
function createCerebellumGeo(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(0.28, 32, 24);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const ox = pos.getX(i);
    const oy = pos.getY(i);
    const oz = pos.getZ(i);
    const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 0.001;
    const ny = oy / len;

    // Horizontal folia — characteristic cerebellum texture
    const folia = Math.sin(ny * 22) * 0.07 + Math.sin(ny * 40) * 0.03;
    const r = 1 + folia;

    pos.setXYZ(i, ox * r * 1.6, oy * r * 0.55, oz * r);
  }

  geo.computeVertexNormals();
  return geo;
}

// Two-hemisphere anatomical brain, exported for fullscreen too
export function BrainAnatomical({
  color,
  rotateSpeed = 0.35,
}: {
  color: string;
  rotateSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const hemiGeo = useMemo(() => createHemisphereGeo(), []);
  const cereGeo = useMemo(() => createCerebellumGeo(), []);

  useEffect(
    () => () => {
      hemiGeo.dispose();
      cereGeo.dispose();
    },
    [hemiGeo, cereGeo]
  );

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotateSpeed;
    // Subtle breathing
    const breathe = 1 + Math.sin(clock.getElapsedTime() * 0.9) * 0.012;
    groupRef.current.scale.setScalar(breathe);
  });

  return (
    <group ref={groupRef}>
      {/* Left hemisphere — wireframe holographic */}
      <mesh geometry={hemiGeo} position={[-0.28, 0.04, 0]} rotation={[0.05, 0.08, 0.06]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.58}
          wireframe
          transparent
          opacity={0.78}
        />
      </mesh>
      {/* Left hemisphere — soft glow fill */}
      <mesh geometry={hemiGeo} position={[-0.28, 0.04, 0]} rotation={[0.05, 0.08, 0.06]} scale={0.97}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.22}
          transparent
          opacity={0.11}
        />
      </mesh>

      {/* Right hemisphere — wireframe holographic */}
      <mesh geometry={hemiGeo} position={[0.28, 0.04, 0]} rotation={[0.05, -0.08, -0.06]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.58}
          wireframe
          transparent
          opacity={0.78}
        />
      </mesh>
      {/* Right hemisphere — soft glow fill */}
      <mesh geometry={hemiGeo} position={[0.28, 0.04, 0]} rotation={[0.05, -0.08, -0.06]} scale={0.97}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.22}
          transparent
          opacity={0.11}
        />
      </mesh>

      {/* Cerebellum — back bottom */}
      <mesh geometry={cereGeo} position={[0, -0.4, -0.52]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.48}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
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
  const [x, y, z] = to;

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
    () => () => { geo.dispose(); mat.dispose(); },
    [geo, mat]
  );

  return <primitive object={line} />;
}

function WingOrbit({ color, count }: { color: string; count: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibSpherePos(count, 1.55), [count]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.055, 8, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </mesh>
          <CenterLine to={pos} color={color} opacity={0.12} />
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
          camera={{ position: [0, 0.1, 3.6], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={2} color={colors.core} />
          <pointLight position={[-2, 1, -2]} intensity={0.7} color={colors.core} />
          <Suspense fallback={null}>
            <BrainAnatomical color={colors.core} />
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
