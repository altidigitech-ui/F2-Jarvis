import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Brain } from "./components/Brain";
import { DropZone } from "./components/DropZone";
import { SidePanel } from "./components/SidePanel";
import { useBrainStore } from "./lib/store";

export default function App() {
  const hoveredRegion = useBrainStore((s) => s.hoveredRegion);

  return (
    <div className="relative w-full h-screen bg-neutral-950 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-xl font-bold tracking-tight">F2-JARVIS Brain</h1>
          <p className="text-xs text-neutral-400 font-mono">
            {hoveredRegion ?? "drag-drop files · click a region"}
          </p>
        </div>
        <nav className="flex gap-2 pointer-events-auto text-sm">
          <a
            href="http://localhost:3000"
            className="px-3 py-1.5 rounded border border-neutral-700 hover:bg-neutral-900 transition"
          >
            Dashboard
          </a>
          <a
            href="/flat"
            className="px-3 py-1.5 rounded border border-neutral-700 hover:bg-neutral-900 transition"
          >
            2D view
          </a>
        </nav>
      </header>

      {/* 3D Canvas */}
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#3b4fd8" />

        {/* Environment HDRI pour reflets */}
        <Environment preset="city" />

        {/* Le cerveau */}
        <Brain />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={12}
          autoRotate={false}
        />
      </Canvas>

      {/* Overlays */}
      <DropZone />
      <SidePanel />

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-3 text-xs text-neutral-500 font-mono pointer-events-none text-center">
        <p>F2-JARVIS · Brain 3D · drag-drop to file · click region to explore</p>
      </footer>
    </div>
  );
}
