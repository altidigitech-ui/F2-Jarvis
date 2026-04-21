"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { emitRepoUpdated } from "@/lib/jarvisEvents";

type Props = {
  actionId: string;
  accentColor: string;
  onExecuted?: (actionId: string) => void;
};

type Status = "idle" | "executing" | "done" | "rejected" | "error";

export function ActionCard({ actionId, accentColor, onExecuted }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function validate() {
    if (status !== "idle") return;
    setStatus("executing");
    setError(null);
    try {
      const res = await fetch("/api/action/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action_id: actionId }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        action?: { action_type?: string };
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus("done");
      emitRepoUpdated({ actionType: data.action?.action_type });
      onExecuted?.(actionId);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function reject() {
    if (status !== "idle") return;
    setStatus("executing");
    setError(null);
    try {
      const res = await fetch("/api/action/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action_id: actionId }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus("rejected");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

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
        {error && (
          <div className="text-[10px] font-mono mt-1" style={{ color: "#F06464" }}>
            {error}
          </div>
        )}
      </div>

      {status === "idle" && (
        <div className="flex items-center gap-1.5 flex-none">
          <button
            onClick={validate}
            className="text-[11px] font-mono px-3 py-1.5 rounded-lg transition-all hover:opacity-90 flex items-center gap-1.5"
            style={{
              background: accentColor,
              color: "#000",
              fontWeight: 600,
            }}
          >
            <Check size={12} />
            Valider
          </button>
          <button
            onClick={reject}
            className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
            }}
            title="Rejeter"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {status === "executing" && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 flex-none">
          <Loader2 size={12} className="animate-spin" />
          Commit…
        </div>
      )}

      {status === "done" && (
        <div
          className="text-[11px] font-mono flex items-center gap-1.5 flex-none"
          style={{ color: accentColor }}
        >
          <Check size={12} />
          Committed ✓
        </div>
      )}

      {status === "rejected" && (
        <div className="text-[11px] font-mono text-slate-600 flex-none">Rejetée</div>
      )}

      {status === "error" && (
        <button
          onClick={validate}
          className="text-[11px] font-mono px-2.5 py-1 rounded-lg flex-none"
          style={{
            background: "rgba(240,100,100,0.1)",
            border: "1px solid rgba(240,100,100,0.3)",
            color: "#F06464",
          }}
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
