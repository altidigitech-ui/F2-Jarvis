"use client";

import { Check, X, Loader2 } from "lucide-react";

type Props = {
  actionId: string;
  accentColor: string;
  selected?: boolean;
  onToggle?: (id: string, selected: boolean) => void;
  committed?: boolean;
};

export function ActionCard({ actionId, accentColor, selected = false, onToggle, committed = false }: Props) {
  if (committed) {
    return (
      <div
        className="mt-2 rounded-xl px-3 py-2.5 flex items-center gap-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accentColor}30`,
        }}
      >
        <div className="flex-1 min-w-0">
          <div
            className="text-[10px] font-mono uppercase tracking-wider mb-0.5"
            style={{ color: accentColor, opacity: 0.7 }}
          >
            Action proposée
          </div>
          <div className="text-[11px] font-mono text-slate-400 truncate">
            ID: {actionId.slice(0, 8)}…
          </div>
        </div>
        <div
          className="text-[11px] font-mono flex items-center gap-1.5 flex-none"
          style={{ color: accentColor }}
        >
          <Check size={12} />
          Committed ✓
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-2 rounded-xl px-3 py-2.5 flex items-center gap-3 transition-all"
      style={{
        background: selected ? `${accentColor}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${selected ? accentColor + "50" : accentColor + "30"}`,
      }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-mono uppercase tracking-wider mb-0.5"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          Action proposée
        </div>
        <div className="text-[11px] font-mono text-slate-400 truncate">
          ID: {actionId.slice(0, 8)}…
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-none">
        <button
          onClick={() => onToggle?.(actionId, !selected)}
          className="text-[11px] font-mono px-3 py-1.5 rounded-lg transition-all hover:opacity-90 flex items-center gap-1.5"
          style={
            selected
              ? { background: accentColor, color: "#000", fontWeight: 600 }
              : {
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${accentColor}40`,
                  color: accentColor,
                }
          }
          title={selected ? "Désélectionner" : "Sélectionner pour commit"}
        >
          <Check size={12} />
          {selected ? "Sélectionnée" : "Valider"}
        </button>
        {selected && (
          <button
            onClick={() => onToggle?.(actionId, false)}
            className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
            }}
            title="Désélectionner"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
