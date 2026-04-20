"use client";

import { useState, useEffect, useCallback } from "react";
import { OuroborosProposalsModal } from "./OuroborosProposalsModal";

interface OuroborosStatus {
  lastCycle: { id: number; date: string; duration: string } | null;
  nextCycle: string;
  proposalsPending: number;
  budgetUsed: number;
  budgetRemaining: number;
  budgetCap: number;
  killSwitchActive: boolean;
  initialized: boolean;
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return "jamais";
  const diff = Date.now() - new Date(dateStr).getTime();
  if (diff < 0) return "à l'instant";
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}j ago`;
}

function timeUntil(dateStr: string): string {
  if (!dateStr) return "--";
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "bientôt";
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}min`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h${String(Math.floor(mins % 60)).padStart(2, "0")}`;
}

type Props = {
  accentColor: string;
  persona: string;
};

export function OuroborosPanel({ accentColor, persona }: Props) {
  const [status, setStatus] = useState<OuroborosStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposals, setShowProposals] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [killConfirm, setKillConfirm] = useState(false);
  const [triggerConfirm, setTriggerConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/ouroboros/status");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: OuroborosStatus = await res.json();
      setStatus(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, 120_000);
    return () => clearInterval(id);
  }, [fetchStatus]);

  async function handleKillSwitch(active: boolean) {
    setActionLoading(true);
    try {
      await fetch("/api/ouroboros/kill-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      await fetchStatus();
    } finally {
      setActionLoading(false);
      setKillConfirm(false);
    }
  }

  async function handleTrigger() {
    setActionLoading(true);
    try {
      await fetch("/api/ouroboros/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona }),
      });
      await fetchStatus();
    } finally {
      setActionLoading(false);
      setTriggerConfirm(false);
    }
  }

  async function handleInitialize() {
    setInitLoading(true);
    try {
      await fetch("/api/ouroboros/initialize", { method: "POST" });
      await fetchStatus();
    } finally {
      setInitLoading(false);
    }
  }

  const killActive = status?.killSwitchActive ?? false;
  const budgetPct = status
    ? Math.min((status.budgetUsed / Math.max(status.budgetCap, 0.01)) * 100, 100)
    : 0;

  return (
    <>
      <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
              Ouroboros
            </span>
            {!loading && status && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: killActive
                    ? "#f06464"
                    : status.initialized
                    ? accentColor
                    : "rgba(255,255,255,0.2)",
                  boxShadow: killActive ? "0 0 4px #f06464" : status.initialized ? `0 0 4px ${accentColor}` : "none",
                }}
              />
            )}
          </div>
          {loading && (
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: accentColor, opacity: 0.4 }} />
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="text-[10px] font-mono text-red-400/70 mb-2">{error}</div>
        )}

        {/* Not initialized */}
        {!loading && status && !status.initialized && (
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-600">
              Pas encore initialisé
            </div>
            <button
              onClick={handleInitialize}
              disabled={initLoading}
              className="w-full text-[10px] font-mono py-1.5 rounded transition-all disabled:opacity-40"
              style={{
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
                color: accentColor,
              }}
            >
              {initLoading ? "INIT…" : "INITIALISER"}
            </button>
          </div>
        )}

        {/* Initialized status */}
        {!loading && status && status.initialized && (
          <div className="space-y-1.5">
            {/* Stats */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>DERNIER CYCLE</span>
                <span style={{ color: accentColor }}>
                  {status.lastCycle ? timeAgo(status.lastCycle.date) : "jamais"}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>PROCHAIN</span>
                <span>{timeUntil(status.nextCycle)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>PROPOSITIONS</span>
                <span
                  style={{
                    color: status.proposalsPending > 0 ? accentColor : undefined,
                    fontWeight: status.proposalsPending > 0 ? 600 : undefined,
                  }}
                >
                  {status.proposalsPending} pending
                </span>
              </div>
            </div>

            {/* Budget bar */}
            <div className="pt-1">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[9px] text-slate-700 uppercase tracking-wider font-mono">Budget</span>
                <span className="text-[10px] font-mono" style={{ color: budgetPct > 80 ? "#f06464" : accentColor }}>
                  {status.budgetUsed.toFixed(2)}€ / {status.budgetCap}€
                </span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${budgetPct}%`,
                    background: budgetPct > 80 ? "#f06464" : accentColor,
                  }}
                />
              </div>
            </div>

            {/* Kill switch */}
            <div className="pt-1">
              {!killConfirm ? (
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-700 uppercase tracking-wider">Kill-switch</span>
                  <button
                    onClick={() => {
                      if (killActive) {
                        handleKillSwitch(false);
                      } else {
                        setKillConfirm(true);
                      }
                    }}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded transition-all disabled:opacity-40"
                    style={{
                      background: killActive ? "rgba(240,100,100,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${killActive ? "rgba(240,100,100,0.3)" : "rgba(255,255,255,0.08)"}`,
                      color: killActive ? "#f06464" : "#64748b",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: killActive ? "#f06464" : "#334155" }}
                    />
                    {killActive ? "ON" : "OFF"}
                  </button>
                </div>
              ) : (
                <div
                  className="p-2 rounded text-[10px] font-mono space-y-2"
                  style={{ background: "rgba(240,100,100,0.06)", border: "1px solid rgba(240,100,100,0.2)" }}
                >
                  <div className="text-red-400">Arrêter Ouroboros ?</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleKillSwitch(true)}
                      disabled={actionLoading}
                      className="flex-1 py-1 rounded text-red-400 transition-all disabled:opacity-40"
                      style={{ background: "rgba(240,100,100,0.15)", border: "1px solid rgba(240,100,100,0.3)" }}
                    >
                      {actionLoading ? "…" : "OUI"}
                    </button>
                    <button
                      onClick={() => setKillConfirm(false)}
                      className="flex-1 py-1 rounded text-slate-500 transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      NON
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="pt-1 space-y-1.5">
              {status.proposalsPending > 0 && (
                <button
                  onClick={() => setShowProposals(true)}
                  className="w-full text-[10px] font-mono py-1.5 rounded transition-all"
                  style={{
                    background: `${accentColor}15`,
                    border: `1px solid ${accentColor}30`,
                    color: accentColor,
                  }}
                >
                  VOIR PROPOSITIONS ({status.proposalsPending})
                </button>
              )}
              {status.proposalsPending === 0 && (
                <button
                  onClick={() => setShowProposals(true)}
                  className="w-full text-[10px] font-mono py-1.5 rounded transition-all text-slate-600 hover:text-slate-400"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  PROPOSITIONS (0)
                </button>
              )}

              {!triggerConfirm ? (
                <button
                  onClick={() => setTriggerConfirm(true)}
                  disabled={actionLoading || killActive}
                  className="w-full text-[10px] font-mono py-1.5 rounded transition-all text-slate-600 hover:text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  CYCLE MANUEL
                </button>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    onClick={handleTrigger}
                    disabled={actionLoading}
                    className="flex-1 text-[10px] font-mono py-1.5 rounded transition-all disabled:opacity-40"
                    style={{
                      background: `${accentColor}15`,
                      border: `1px solid ${accentColor}30`,
                      color: accentColor,
                    }}
                  >
                    {actionLoading ? "…" : "LANCER"}
                  </button>
                  <button
                    onClick={() => setTriggerConfirm(false)}
                    className="flex-1 text-[10px] font-mono py-1.5 rounded text-slate-600 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    ANNULER
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowDiary(true)}
                className="w-full text-[10px] font-mono py-1.5 rounded transition-all text-slate-600 hover:text-slate-400"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                JOURNAL
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-[10px] font-mono text-slate-700">Chargement…</div>
        )}
      </div>

      {/* Proposals modal */}
      {showProposals && (
        <OuroborosProposalsModal
          accentColor={accentColor}
          persona={persona}
          mode="proposals"
          onClose={() => {
            setShowProposals(false);
            fetchStatus();
          }}
        />
      )}

      {/* Diary modal */}
      {showDiary && (
        <OuroborosProposalsModal
          accentColor={accentColor}
          persona={persona}
          mode="diary"
          onClose={() => setShowDiary(false)}
        />
      )}
    </>
  );
}
