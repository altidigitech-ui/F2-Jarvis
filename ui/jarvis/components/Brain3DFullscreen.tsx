"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useState } from "react";
import { BrainCore, CenterLine, BRAIN_COLORS, fibSpherePos, type ColorKey } from "./Brain3D";

export const MEMPALACE_WINGS = [
  { id: "f2-core", name: "F2 Core", drawers: 287 },
  { id: "strategie", name: "Stratégie", drawers: 412 },
  { id: "produits", name: "Produits", drawers: 198 },
  { id: "f2-compte", name: "F2 Compte", drawers: 156 },
  { id: "romain", name: "Romain", drawers: 324 },
  { id: "fabrice", name: "Fabrice", drawers: 289 },
  { id: "growth-marketing", name: "Growth Marketing", drawers: 367 },
  { id: "distribution", name: "Distribution", drawers: 245 },
  { id: "marketing", name: "Marketing", drawers: 189 },
  { id: "saas", name: "SaaS", drawers: 412 },
  { id: "la-toile", name: "La Toile", drawers: 178 },
  { id: "patterns", name: "Patterns", drawers: 134 },
  { id: "claude-config", name: "Claude Config", drawers: 138 },
];

type WingsSphereProps = {
  wingColor: string;
  activeWing: string | null;
  onHover: (id: string | null) => void;
};

function WingsSphere({ wingColor, activeWing, onHover }: WingsSphereProps) {
  const positions = useMemo(() => fibSpherePos(13, 2.5), []);

  return (
    <group>
      {MEMPALACE_WINGS.map((wing, i) => {
        const pos = positions[i];
        const active = activeWing === wing.id;
        return (
          <group key={wing.id}>
            <mesh
              position={pos}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHover(wing.id);
              }}
              onPointerOut={() => onHover(null)}
            >
              <sphereGeometry args={[active ? 0.11 : 0.07, 12, 10]} />
              <meshStandardMaterial
                color={wingColor}
                emissive={wingColor}
                emissiveIntensity={active ? 1.8 : 0.9}
              />
            </mesh>
            <CenterLine to={pos} color={wingColor} opacity={active ? 0.3 : 0.1} />
          </group>
        );
      })}
    </group>
  );
}

type Props = {
  persona: "romain" | "fabrice";
  mode: "normal" | "f2";
  onClose: () => void;
};

export function Brain3DFullscreen({ persona, mode, onClose }: Props) {
  const colorKey: ColorKey = mode === "f2" ? "f2" : persona;
  const colors = BRAIN_COLORS[colorKey];
  const [hoveredWing, setHoveredWing] = useState<string | null>(null);
  const [selectedWing, setSelectedWing] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeWing = hoveredWing || selectedWing;
  const hoveredWingData = MEMPALACE_WINGS.find((w) => w.id === activeWing);
  const totalDrawers = MEMPALACE_WINGS.reduce((s, w) => s + w.drawers, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(2,6,18,0.93)" }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
        <div
          className="text-[10px] font-mono tracking-widest"
          style={{ color: colors.core, opacity: 0.7 }}
        >
          ◈ MEMPALACE — 13 WINGS
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white text-lg font-mono transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Main content */}
      <div className="flex gap-4 px-6" style={{ width: "100%", height: "82vh", maxWidth: "1400px" }}>
        {/* 3D Canvas */}
        <div
          className="relative rounded-lg overflow-hidden flex-1"
          style={{ border: `1px solid ${colors.core}18`, background: "rgba(0,0,0,0.2)" }}
          onPointerMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        >
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
            performance={{ min: 0.5 }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={2} color={colors.core} />
            <pointLight position={[-5, -3, -5]} intensity={0.8} color={colors.core} />
            <Suspense fallback={null}>
              <BrainCore color={colors.core} rotateSpeed={0.1} />
              <WingsSphere wingColor={colors.wings} activeWing={activeWing} onHover={setHoveredWing} />
            </Suspense>
            <OrbitControls enableZoom enablePan={false} minDistance={3} maxDistance={14} />
          </Canvas>

          {/* Hover tooltip */}
          {hoveredWing && hoveredWingData && (
            <div
              className="fixed pointer-events-none z-50 text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap"
              style={{
                left: mousePos.x + 14,
                top: mousePos.y - 10,
                background: "rgba(2,6,18,0.88)",
                border: `1px solid ${colors.core}35`,
                color: colors.core,
              }}
            >
              {hoveredWingData.name} · {hoveredWingData.drawers} drawers
            </div>
          )}

          <div
            className="absolute bottom-3 left-0 right-0 flex justify-center text-[9px] font-mono tracking-widest pointer-events-none"
            style={{ color: colors.core, opacity: 0.3 }}
          >
            drag to rotate · scroll to zoom
          </div>
        </div>

        {/* Side panel */}
        <div
          className="flex flex-col rounded-lg overflow-hidden flex-shrink-0"
          style={{
            width: "220px",
            border: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <div className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
              MemPalace Wings
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {MEMPALACE_WINGS.map((wing) => {
              const isSelected = selectedWing === wing.id;
              const isHovered = hoveredWing === wing.id;
              return (
                <button
                  key={wing.id}
                  className="w-full text-left px-2 py-1.5 rounded mb-0.5 transition-all"
                  style={{
                    background: isSelected
                      ? `${colors.wings}15`
                      : isHovered
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                    border: `1px solid ${isSelected ? colors.wings + "28" : "transparent"}`,
                    color: isSelected ? colors.wings : isHovered ? "#cbd5e1" : "#475569",
                  }}
                  onClick={() => setSelectedWing(isSelected ? null : wing.id)}
                  onMouseEnter={() => setHoveredWing(wing.id)}
                  onMouseLeave={() => setHoveredWing(null)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono truncate">{wing.name}</span>
                    <span className="text-[9px] opacity-50 font-mono flex-shrink-0">{wing.drawers}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="text-[9px] font-mono text-slate-700">
              Total{" "}
              <span style={{ color: colors.core }}>{totalDrawers.toLocaleString("fr-FR")}</span>
              {" "}drawers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
