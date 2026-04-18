import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { BrainRegion } from "../lib/zones";
import { useBrainStore } from "../lib/store";

type Props = {
  region: BrainRegion;
};

/**
 * Une région du cerveau représentée par une sphère semi-transparente.
 * V1 minimaliste — V2 pourra charger un vrai modèle GLB anatomique découpé.
 */
export function Region({ region }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  const setHoveredRegion = useBrainStore((s) => s.setHoveredRegion);
  const setSelectedRegion = useBrainStore((s) => s.setSelectedRegion);
  const activity = useBrainStore((s) => s.activity[region.id] ?? 0);

  // Pulse animation basée sur l'activité
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pulse = activity > 0 ? Math.sin(t * 2) * 0.05 * activity : 0;
    const baseScale = localHover ? 1.15 : 1;
    meshRef.current.scale.setScalar(baseScale + pulse);
  });

  return (
    <group position={region.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setLocalHover(true);
          setHoveredRegion(region.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setLocalHover(false);
          setHoveredRegion(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedRegion(region);
        }}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={region.color}
          transparent
          opacity={localHover ? 0.85 : 0.55}
          emissive={region.color}
          emissiveIntensity={localHover ? 0.4 : 0.15}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Label HTML overlay quand hover */}
      {localHover && (
        <Html center distanceFactor={8} className="pointer-events-none">
          <div className="bg-neutral-900/90 backdrop-blur border border-neutral-700 rounded px-2 py-1 text-xs whitespace-nowrap">
            <div className="font-semibold text-white">{region.labelShort}</div>
            <div className="text-neutral-400 font-mono text-[10px]">
              {region.folder}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
