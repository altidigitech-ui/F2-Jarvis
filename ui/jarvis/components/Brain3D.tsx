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

// Multi-octave sine noise → gyri (brain folds) effect on hemisphere surface
function createHemiGeo(phase: number): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(0.5, 52, 40);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const r = Math.sqrt(x * x + y * y + z * z);
    if (r < 0.001) continue;
    const n = (
      Math.sin(x * 13 + y * 7  + phase)        * 0.40 +
      Math.sin(y * 11 + z * 9  + phase * 0.80) * 0.35 +
      Math.cos(z * 15 + x * 6  + phase * 1.20) * 0.30 +
      Math.sin((x + z) * 19    + phase * 0.60) * 0.15 +
      Math.cos((y - z) * 23    + phase * 1.50) * 0.10
    ) * 0.068;
    pos.setXYZ(i, x + (x / r) * n, y + (y / r) * n, z + (z / r) * n);
  }
  geo.computeVertexNormals();
  return geo;
}

// Dense fine grooves → cerebellum texture
function createCerebellumGeo(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(0.28, 36, 28);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const r = Math.sqrt(x * x + y * y + z * z);
    if (r < 0.001) continue;
    const n = (
      Math.sin(y * 30)             * 0.38 +
      Math.sin(y * 24 + x * 9)    * 0.28 +
      Math.cos(x * 18 + z * 12)   * 0.18
    ) * 0.052;
    pos.setXYZ(i, x + (x / r) * n, y + (y / r) * n, z + (z / r) * n);
  }
  geo.computeVertexNormals();
  return geo;
}

export function BrainCore({
  color,
  rotateSpeed = 0.4,
}: {
  color: string;
  rotateSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const leftGeo       = useMemo(() => createHemiGeo(0),    []);
  const rightGeo      = useMemo(() => createHemiGeo(1.73), []);
  const cerebellumGeo = useMemo(() => createCerebellumGeo(), []);

  useEffect(
    () => () => { leftGeo.dispose(); rightGeo.dispose(); cerebellumGeo.dispose(); },
    [leftGeo, rightGeo, cerebellumGeo]
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotateSpeed;
    // Subtle breathing pulse
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.018;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef} rotation={[0.14, 0, 0]}>

      {/* ── LEFT HEMISPHERE ── */}
      <group position={[-0.19, 0.04, 0]} scale={[1, 0.93, 0.87]}>
        <mesh geometry={leftGeo}>
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.55}
            wireframe transparent opacity={0.82}
          />
        </mesh>
        <mesh geometry={leftGeo}>
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.25}
            transparent opacity={0.14}
          />
        </mesh>
      </group>

      {/* ── RIGHT HEMISPHERE ── */}
      <group position={[0.19, 0.04, 0]} scale={[1, 0.93, 0.87]}>
        <mesh geometry={rightGeo}>
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.55}
            wireframe transparent opacity={0.82}
          />
        </mesh>
        <mesh geometry={rightGeo}>
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.25}
            transparent opacity={0.14}
          />
        </mesh>
      </group>

      {/* ── CORPUS CALLOSUM glow (connection between hemispheres) ── */}
      <mesh scale={[0.48, 0.14, 0.48]}>
        <sphereGeometry args={[0.42, 8, 6]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={1.8}
          transparent opacity={0.055}
        />
      </mesh>

      {/* ── CEREBELLUM (back-bottom, fine grooves) ── */}
      <group position={[0, -0.38, -0.37]} scale={[0.92, 0.67, 0.72]}>
        <mesh geometry={cerebellumGeo}>
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.50}
            wireframe transparent opacity={0.72}
          />
        </mesh>
        <mesh geometry={cerebellumGeo}>
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.20}
            transparent opacity={0.12}
          />
        </mesh>
      </group>

      {/* ── BRAINSTEM ── */}
      <mesh position={[0, -0.56, 0.03]} rotation={[0.18, 0, 0]}>
        <cylinderGeometry args={[0.10, 0.16, 0.30, 14]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={0.40}
          wireframe transparent opacity={0.55}
        />
      </mesh>

      {/* ── AMBIENT HALO ── */}
      <mesh>
        <sphereGeometry args={[0.90, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={0.028} side={THREE.BackSide} />
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
          <ambientLight intensity={0.45} />
          <pointLight position={[2, 2, 2]}    intensity={1.6} color={colors.core} />
          <pointLight position={[-2, -1, -2]} intensity={0.6} color={colors.core} />
          <pointLight position={[0, 3, 1]}    intensity={0.4} color={colors.glow} />
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
