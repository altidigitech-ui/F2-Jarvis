"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useRef } from "react";
import { Chat } from "./Chat";

const RepoGraph3D = dynamic(() => import("./RepoGraph3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: "185px" }}>
      <div className="w-12 h-12 rounded-full border border-white/10 animate-pulse" />
    </div>
  ),
});

const RepoGraph3DFullscreen = dynamic(() => import("./RepoGraph3DFullscreen"), { ssr: false });
import type { TimelineItem, CounterData, AlertItem, ContextData } from "@/lib/context-types";

type Persona = "romain" | "fabrice";

const PERSONA_CONFIG = {
  romain: {
    label: "Romain",
    role: "Growth · FoundryTwo",
    color: "#00ffb4",
    colorDim: "#00b890",
    channels: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH", "F2"],
    coldTarget: 10,
    engTarget: 30,
  },
  fabrice: {
    label: "Fabrice",
    role: "Builder · FoundryTwo",
    color: "#9b8fff",
    colorDim: "#6d5fe0",
    channels: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH"],
    coldTarget: 10,
    engTarget: 30,
  },
} as const;

const EMPTY_CONTEXT: ContextData = {
  timeline: [],
  counters: { cold: 0, repliesIn: 0, twEng: 0, liCom: 0, cross: 0, ihPh: 0, total: 0 },
  alerts: [],
  weekPlanningF2: [],
};

// Compute next batch time (12h, 18h, 22h CEST) and countdown
function getNextBatch(): { label: string; secsUntil: number } {
  const now = new Date();
  const paris = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const h = paris.getHours();
  const m = paris.getMinutes();
  const s = paris.getSeconds();
  const currentSecs = h * 3600 + m * 60 + s;
  const batches = [12 * 3600, 18 * 3600, 22 * 3600];

  for (const b of batches) {
    if (currentSecs < b) {
      const diff = b - currentSecs;
      const bh = Math.floor(b / 3600);
      return { label: `${String(bh).padStart(2, "0")}:00`, secsUntil: diff };
    }
  }
  // After 22h: next batch is 12h tomorrow
  const diff = 24 * 3600 - currentSecs + 12 * 3600;
  return { label: "12:00", secsUntil: diff };
}

function formatCountdown(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function LiveClock({ color }: { color: string }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setDate(
        now.toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-right">
      <div className="text-sm font-mono font-semibold" style={{ color }} suppressHydrationWarning>
        {time} CEST
      </div>
      <div className="text-[10px] text-slate-600 capitalize" suppressHydrationWarning>
        {date}
      </div>
    </div>
  );
}

function Bar({ value, target, label, color }: { value: number; target: number; label: string; color: string }) {
  const pct = Math.min((value / Math.max(target, 1)) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>
          {value}/{target}
        </span>
      </div>
      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function TimelineChip({
  item,
  accentColor,
}: {
  item: TimelineItem;
  accentColor: string;
}) {
  const isDone = item.status === "done";
  const isBlocked = item.status === "blocked";
  const statusIcon = isDone ? "✓" : isBlocked ? "⊘" : "·";

  return (
    <div
      className="flex-none flex items-center gap-2 text-[10px] font-mono px-3 py-1.5 rounded-full"
      style={{
        background: isDone
          ? `${accentColor}15`
          : isBlocked
          ? "rgba(240,100,100,0.08)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          isDone
            ? accentColor + "30"
            : isBlocked
            ? "rgba(240,100,100,0.2)"
            : "rgba(255,255,255,0.06)"
        }`,
        color: isDone ? accentColor : isBlocked ? "#f06464" : "#64748b",
      }}
    >
      {item.time && <span>{item.time}</span>}
      {item.time && <span>·</span>}
      <span className="opacity-60">[{item.platform}]</span>
      <span>{item.title.slice(0, 40)}{item.title.length > 40 ? "…" : ""}</span>
      <span className="opacity-60">{statusIcon}</span>
    </div>
  );
}

type Props = {
  persona: Persona;
  showF2Toggle?: boolean;
};

export function PersonaLayout({ persona, showF2Toggle = false }: Props) {
  const cfg = PERSONA_CONFIG[persona];
  const lsKey = `jarvis_f2mode_${persona}`;

  const [f2Mode, setF2ModeState] = useState(false);
  const [brainExpanded, setBrainExpanded] = useState(false);
  const [fileContext, setFileContext] = useState<{ name: string; content: string } | null>(null);
  const [ctx, setCtx] = useState<ContextData>(EMPTY_CONTEXT);
  const [loading, setLoading] = useState(true);
  const [pendingOps, setPendingOps] = useState(0);
  const [batchLabel, setBatchLabel] = useState("--:--");
  const [batchCountdown, setBatchCountdown] = useState("");
  const pendingOpsRef = useRef(0);

  // Restore f2Mode from localStorage (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(lsKey);
      if (stored === "true") setF2ModeState(true);
    } catch { /* SSR or private mode */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setF2Mode = useCallback((val: boolean) => {
    setF2ModeState(val);
    try { localStorage.setItem(lsKey, String(val)); } catch { /* ignore */ }
  }, [lsKey]);

  const accentColor = f2Mode ? "#97C459" : cfg.color;
  const mode = f2Mode ? "f2" : "normal";

  // Batch countdown ticker
  useEffect(() => {
    const tick = () => {
      const { label, secsUntil } = getNextBatch();
      setBatchLabel(label);
      setBatchCountdown(formatCountdown(secsUntil));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fetchContext = useCallback(async () => {
    try {
      const res = await fetch(`/api/context?persona=${persona}&mode=${mode}`);
      if (res.ok) {
        const data: ContextData = await res.json();
        setCtx(data);
      }
    } catch {
      // silently keep previous data on network error
    } finally {
      setLoading(false);
    }
  }, [persona, mode]);

  useEffect(() => {
    setLoading(true);
    fetchContext();
    const id = setInterval(fetchContext, 60_000);
    return () => clearInterval(id);
  }, [fetchContext]);

  // Called by Chat when an action completes
  const handleAction = useCallback(() => {
    pendingOpsRef.current += 1;
    setPendingOps(pendingOpsRef.current);
    // Refresh counters immediately
    fetchContext();
  }, [fetchContext]);

  const { counters, alerts } = ctx;
  const timeline = f2Mode ? ctx.weekPlanningF2 : ctx.timeline;

  return (
    <div className="relative min-h-screen flex flex-col z-10">
      {brainExpanded && (
        <RepoGraph3DFullscreen
          persona={persona}
          mode={mode as "normal" | "f2"}
          onClose={() => setBrainExpanded(false)}
          onLoadFile={(name, content) => setFileContext({ name, content })}
        />
      )}
      {/* F2 mode banner */}
      {f2Mode && (
        <div
          className="text-center text-[10px] font-mono py-1 tracking-widest"
          style={{
            background: "rgba(151,196,89,0.12)",
            borderBottom: "1px solid rgba(151,196,89,0.25)",
            color: "#97C459",
          }}
        >
          ◈ MODE F2 ACTIF — @foundrytwo
        </div>
      )}

      {/* Top bar */}
      <header
        className="glass flex items-center justify-between px-6 py-3 sticky top-0 z-20"
        style={{ borderBottom: `1px solid ${accentColor}20` }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[10px] font-mono text-slate-600 hover:text-slate-400 transition-colors tracking-widest uppercase"
          >
            ← JARVIS
          </Link>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: `${accentColor}20`,
                border: `1px solid ${accentColor}30`,
                color: accentColor,
              }}
            >
              {cfg.label[0]}
            </div>
            <span className="text-sm font-medium text-slate-300">{cfg.label}</span>
            <span className="text-[10px] text-slate-600">{cfg.role}</span>
          </div>

          {showF2Toggle && (
            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={() => setF2Mode(false)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-all ${
                  !f2Mode ? "text-slate-200 bg-white/10" : "text-slate-600 hover:text-slate-400"
                }`}
              >
                ROMAIN
              </button>
              <button
                onClick={() => setF2Mode(true)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-all ${
                  f2Mode ? "text-[#97C459] bg-[#97C459]/10" : "text-slate-600 hover:text-slate-400"
                }`}
              >
                F2
              </button>
            </div>
          )}
        </div>

        <LiveClock color={accentColor} />
      </header>

      {/* 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar gauche — 190px */}
        <aside
          className="w-[190px] flex-none flex flex-col border-r"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="p-3">
            <RepoGraph3D
              persona={persona}
              mode={mode as "normal" | "f2"}
              onExpand={() => setBrainExpanded(true)}
            />
          </div>

          <nav className="flex-1 px-3 pb-4">
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2 px-1">
              Canaux
            </div>
            {cfg.channels.map((ch) => (
              <div
                key={ch}
                className="text-[10px] font-mono px-2 py-1.5 rounded mb-0.5 text-slate-500 hover:text-slate-300 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full" style={{ background: accentColor, opacity: 0.5 }} />
                {ch}
              </div>
            ))}

            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2 px-1 mt-4">
              Liens
            </div>
            {["Plan hebdo", "Progress", "Tracking"].map((item) => (
              <div
                key={item}
                className="text-[10px] font-mono px-2 py-1.5 rounded mb-0.5 text-slate-500 hover:text-slate-300 hover:bg-white/5 cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        {/* Centre — flex-1 */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Timeline */}
          <div className="px-6 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
                {f2Mode ? "Planning F2 semaine" : "Aujourd'hui"}
              </div>
              {loading && (
                <div
                  className="w-1 h-1 rounded-full animate-pulse"
                  style={{ background: accentColor, opacity: 0.5 }}
                />
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {timeline.length === 0 ? (
                <div className="text-[10px] font-mono text-slate-700 px-2 py-1.5">
                  {loading ? "Chargement…" : "Aucun post planifié aujourd'hui"}
                </div>
              ) : (
                timeline.map((item, i) => (
                  <TimelineChip key={i} item={item} accentColor={accentColor} />
                ))
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-hidden">
            <Chat
              persona={persona}
              mode={mode}
              onAction={handleAction}
              fileContext={fileContext}
              onFileContextClear={() => setFileContext(null)}
            />
          </div>
        </main>

        {/* Sidebar droite — 290px */}
        <aside
          className="w-[290px] flex-none flex flex-col border-l"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Compteurs */}
          <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-3">
              Compteurs du jour
            </div>
            <Bar value={counters.cold} target={cfg.coldTarget} label="Cold DM" color={accentColor} />
            <Bar value={counters.twEng} target={10} label="TW Eng" color={accentColor} />
            <Bar value={counters.liCom} target={10} label="LI Com" color={accentColor} />
            <Bar value={counters.cross} target={2} label="Cross" color={accentColor} />
            <Bar value={counters.ihPh} target={5} label="IH+PH" color={accentColor} />
            <div
              className="mt-3 pt-3 border-t flex justify-between items-baseline"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <span className="text-[10px] text-slate-600 uppercase tracking-wider">Total</span>
              <span className="text-sm font-mono font-semibold" style={{ color: accentColor }}>
                {counters.total}/{cfg.engTarget}
              </span>
            </div>
          </div>

          {/* Alertes */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-3">
              Alertes
            </div>
            {alerts.length === 0 ? (
              <div className="text-[10px] font-mono text-slate-700">
                {loading ? "Chargement…" : "Aucune alerte active"}
              </div>
            ) : (
              alerts.map((alert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 mb-2 text-[10px] p-2 rounded"
                  style={{
                    background:
                      alert.level === "critical"
                        ? "rgba(240,100,100,0.06)"
                        : "rgba(239,159,39,0.06)",
                    border: `1px solid ${
                      alert.level === "critical"
                        ? "rgba(240,100,100,0.15)"
                        : "rgba(239,159,39,0.15)"
                    }`,
                    color: alert.level === "critical" ? "#F06464" : "#EF9F27",
                  }}
                >
                  <span className="mt-0.5 flex-none">
                    {alert.level === "critical" ? "⚠" : "·"}
                  </span>
                  <div>
                    <div className="font-semibold">{alert.title}</div>
                    {alert.description && (
                      <div className="mt-0.5 opacity-70 leading-relaxed">{alert.description}</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Auto-commit status */}
          <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2">
              Auto-commit
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>NEXT BATCH</span>
                <span style={{ color: accentColor }}>{batchLabel}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>DANS</span>
                <span suppressHydrationWarning>{batchCountdown}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>PENDING OPS</span>
                <span style={{ color: pendingOps > 0 ? accentColor : undefined }}>
                  {pendingOps}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
