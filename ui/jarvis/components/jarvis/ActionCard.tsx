"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2 } from "lucide-react";

type Props = {
  actionId: string;
  accentColor: string;
  selected?: boolean;
  onToggle?: (id: string, selected: boolean) => void;
  committed?: boolean;
};

type ActionDetails = {
  action_type: string;
  preview: string;
  status: string;
};

const ACTION_ICONS: Record<string, string> = {
  mark_published: "✅",
  log_cold: "📤",
  batch_cold: "📤",
  queue_cold_targets: "🎯",
  update_cold_reply: "💬",
  log_engagement: "💬",
  log_interaction: "📊",
  mark_cross_published: "🔁",
  resolve_alert: "🔧",
  log_decision: "📋",
  create_file: "📄",
};

export function ActionCard({ actionId, accentColor, selected = false, onToggle, committed = false }: Props) {
  const [details, setDetails] = useState<ActionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/action/${actionId}`);
        if (!res.ok) return;
        const data = await res.json() as ActionDetails;
        if (!cancelled) setDetails(data);
      } catch {
        // silent — fall back to ID display
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchDetails();
    return () => { cancelled = true; };
  }, [actionId]);

  const icon = details ? (ACTION_ICONS[details.action_type] || "✏️") : "✏️";
  const label = details
    ? `${icon} ${details.action_type} — ${details.preview.slice(0, 60)}${details.preview.length > 60 ? "…" : ""}`
    : loading
    ? "Chargement…"
    : `ID: ${actionId.slice(0, 8)}…`;

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
            {label}
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
        <div className="text-[11px] font-mono text-slate-400 truncate flex items-center gap-1">
          {loading && <Loader2 size={10} className="animate-spin flex-none" />}
          <span className="truncate">{label}</span>
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
