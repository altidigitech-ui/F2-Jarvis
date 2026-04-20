"use client";

import { X } from "lucide-react";
import dynamic from "next/dynamic";

const GraphifyView = dynamic(() => import("./GraphifyView"), { ssr: false });

type Props = {
  accentColor: string;
  onClose: () => void;
  onSendToJarvis?: (text: string) => void;
};

export default function GraphifyFullscreen({ accentColor, onClose, onSendToJarvis }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#020612" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b flex-none"
        style={{ borderColor: `${accentColor}20` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono" style={{ color: accentColor }}>
            ⬡ GRAPHIFY
          </span>
          <span className="text-[9px] font-mono text-slate-600">
            Concepts sémantiques F2 · FoundryTwo
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <X size={13} />
        </button>
      </div>

      {/* Graph */}
      <GraphifyView
        accentColor={accentColor}
        onSendToJarvis={onSendToJarvis}
        onClose={onClose}
      />
    </div>
  );
}
