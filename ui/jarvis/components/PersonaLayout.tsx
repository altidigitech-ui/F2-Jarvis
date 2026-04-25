"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useRef } from "react";
import { Chat } from "./Chat";
import { OuroborosPanel } from "./OuroborosPanel";
import { BatchCard } from "./BatchCard";
import { MobileNav, type MobilePanel } from "./MobileNav";

const RepoGraph3D = dynamic(() => import("./RepoGraph3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: "185px" }}>
      <div className="w-12 h-12 rounded-full border border-white/10 animate-pulse" />
    </div>
  ),
});

const RepoGraph3DFullscreen = dynamic(() => import("./RepoGraph3DFullscreen"), { ssr: false });
const GraphifyFullscreen = dynamic(() => import("./GraphifyFullscreen"), { ssr: false });
const MemPalaceView = dynamic(
  () => import("./MemPalaceView").then((m) => ({ default: m.MemPalaceView })),
  { ssr: false }
);
import { ErrorBoundary } from "./ErrorBoundary";
import { TimelineColumn } from "./TimelineColumn";
import { QuickAccessSidebar } from "./QuickAccessSidebar";
import { FileViewerModal } from "./FileViewerModal";
import { PromptsModal } from "./PromptsModal";
import { CounterTile } from "./CounterTile";
import { onRepoUpdated } from "@/lib/jarvisEvents";
import type { ContextData } from "@/lib/context-types";

type Persona = "romain" | "fabrice";

const PERSONA_STATIC = {
  romain: { label: "Romain", role: "Growth · FoundryTwo", color: "#00ffb4", colorDim: "#00b890" },
  fabrice: { label: "Fabrice", role: "Builder · FoundryTwo", color: "#9b8fff", colorDim: "#6d5fe0" },
} as const;

interface PersonaTargets {
  cold: number;
  twEng: number;
  liCom: number;
  reddit: number;
  facebook: number;
  cross: number;
  ph: number;
  ih: number;
  ihPh: number;
  engTarget: number;
  platforms: string[];
  hasIhPh: boolean;
  hasPh: boolean;
  hasIh: boolean;
}

// Fallback targets used when the /targets fetch fails
const TARGETS_FALLBACK: Record<string, PersonaTargets> = {
  romain:  { cold: 10, twEng: 10, liCom: 10, reddit: 8, facebook: 6, cross: 4, ph: 0, ih: 0, ihPh: 0, engTarget: 48, platforms: ["TWITTER","LINKEDIN","REDDIT","FACEBOOK"], hasIhPh: false, hasPh: false, hasIh: false },
  fabrice: { cold: 10, twEng: 15, liCom: 15, reddit: 8, facebook: 6, cross: 4, ph: 0, ih: 0, ihPh: 0, engTarget: 58, platforms: ["TWITTER","LINKEDIN","REDDIT","FACEBOOK"], hasIhPh: false, hasPh: false, hasIh: false },
  f2:      { cold: 0,  twEng: 0,  liCom: 0,  reddit: 0, facebook: 0, cross: 0, ph: 0, ih: 10, ihPh: 10, engTarget: 10, platforms: ["IH"],                              hasIhPh: true,  hasPh: false, hasIh: true  },
};

const EMPTY_CONTEXT: ContextData = {
  timeline: [],
  counters: { cold: 0, repliesIn: 0, twEng: 0, liCom: 0, reddit: 0, facebook: 0, cross: 0, ihPh: 0, ph: 0, ih: 0, total: 0 },
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
      <div className="text-[11px] text-slate-500 capitalize" suppressHydrationWarning>
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
        <span className="text-[12px] text-slate-400">{label}</span>
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


type AlertRowProps = {
  alert: { title: string; description?: string; level: string };
  persona: Persona;
  mode: "normal" | "f2";
  onResolved: () => void;
};

function AlertRow({ alert, persona, mode, onResolved }: AlertRowProps) {
  const [state, setState] = useState<"idle" | "resolving" | "done" | "error">("idle");

  async function resolve() {
    if (state !== "idle") return;
    setState("resolving");
    try {
      const proposeRes = await fetch("/api/action/propose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          mode,
          action_type: "resolve_alert",
          params: { keyword: alert.title.slice(0, 60) },
          preview: `Résoudre alerte: ${alert.title}`,
        }),
      });
      const proposeData = (await proposeRes.json()) as {
        ok?: boolean;
        action?: { id: string };
        error?: string;
      };
      if (!proposeRes.ok || !proposeData.ok || !proposeData.action?.id) {
        throw new Error(proposeData.error || "propose failed");
      }
      const execRes = await fetch("/api/action/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action_id: proposeData.action.id }),
      });
      const execData = (await execRes.json()) as { ok?: boolean; error?: string };
      if (!execRes.ok || !execData.ok) {
        throw new Error(execData.error || "execute failed");
      }
      setState("done");
      onResolved();
    } catch (err) {
      console.error("[AlertRow] resolve failed:", err);
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  const isCritical = alert.level === "critical";
  return (
    <div
      className="flex items-start gap-2 mb-2 text-[12px] p-2 rounded"
      style={{
        background: isCritical ? "rgba(240,100,100,0.06)" : "rgba(239,159,39,0.06)",
        border: `1px solid ${isCritical ? "rgba(240,100,100,0.15)" : "rgba(239,159,39,0.15)"}`,
        color: isCritical ? "#F06464" : "#EF9F27",
        opacity: state === "done" ? 0.4 : 1,
      }}
    >
      <span className="mt-0.5 flex-none">{isCritical ? "⚠" : "·"}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{alert.title}</div>
        {alert.description && (
          <div className="mt-0.5 opacity-70 leading-relaxed">{alert.description}</div>
        )}
      </div>
      <button
        onClick={resolve}
        disabled={state !== "idle"}
        className="flex-none w-5 h-5 rounded-full flex items-center justify-center transition-opacity hover:opacity-100"
        style={{
          background: "rgba(255,255,255,0.05)",
          color: "#94a3b8",
          fontSize: "10px",
          opacity: state === "idle" ? 0.6 : 0.3,
          cursor: state === "idle" ? "pointer" : "default",
        }}
        title={
          state === "idle"
            ? "Résoudre (commit resolve_alert)"
            : state === "resolving"
            ? "Résolution en cours…"
            : state === "done"
            ? "Résolu"
            : "Erreur, réessaye"
        }
      >
        {state === "resolving" ? "…" : state === "done" ? "✓" : state === "error" ? "!" : "✕"}
      </button>
    </div>
  );
}

function F2Banner() {
  const [expanded, setExpanded] = useState(false);
  const rules = [
    "Pronom : we / our / the studio (jamais I)",
    "Data-driven, neutre, transparent sur les échecs",
    "Pas de revolutionary, game-changing, 🚀🔥",
    "Pas d'em-dash comme pivot, pas de Not X it's Y",
    "Contractions obligatoires en anglais",
    "Zéro fake stats, zéro fake testimonials",
  ];
  return (
    <div
      className="absolute left-0 right-0 z-30 text-center text-[11px] font-mono tracking-widest"
      style={{
        top: "100%",
        background: "rgba(151,196,89,0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(151,196,89,0.35)",
        color: "#1a2e0a",
      }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full py-1 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
      >
        <span className="font-semibold">◈ MODE F2 ACTIF — @foundrytwo</span>
        <span className="opacity-70 text-[10px]">{expanded ? "▲" : "▼"}</span>
      </button>
      {expanded && (
        <div
          className="px-6 py-3 text-left"
          style={{ background: "rgba(120,180,60,0.15)" }}
        >
          <div className="text-[10px] font-mono uppercase opacity-70 mb-2" style={{ color: "#1a2e0a" }}>
            Règles voix F2 (checklist avant publication)
          </div>
          <ul className="space-y-1">
            {rules.map((r, i) => (
              <li
                key={i}
                className="text-[11px] font-mono flex gap-2 opacity-90"
                style={{ color: "#1a2e0a" }}
              >
                <span>✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type Props = {
  persona: Persona;
  showF2Toggle?: boolean;
};

export function PersonaLayout({ persona, showF2Toggle = false }: Props) {
  const cfg = PERSONA_STATIC[persona];
  const lsKey = `jarvis_f2mode_${persona}`;

  const [targets, setTargets] = useState<PersonaTargets>(TARGETS_FALLBACK[persona] as PersonaTargets);
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [f2Mode, setF2ModeState] = useState(false);
  const [brainExpanded, setBrainExpanded] = useState(false);
  const [graphifyExpanded, setGraphifyExpanded] = useState(false);
  const [graphifyPrefill, setGraphifyPrefill] = useState<string | null>(null);
  const [mempalaceExpanded, setMempalaceExpanded] = useState(false);
  const [openFilePath, setOpenFilePath] = useState<string | null>(null);
  const [promptsOpen, setPromptsOpen] = useState(false);
  const [fileContext, setFileContext] = useState<{ name: string; content: string } | null>(null);
  const [ctx, setCtx] = useState<ContextData>(EMPTY_CONTEXT);
  const [loading, setLoading] = useState(true);
  const [pendingOps, setPendingOps] = useState(0);
  const [batchLabel, setBatchLabel] = useState("--:--");
  const [batchCountdown, setBatchCountdown] = useState("");
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>(null);
  const pendingOpsRef = useRef(0);

  const todayKey = new Date().toISOString().slice(0, 10);
  const doneItemsKey = `jarvis_done_${persona}_${f2Mode ? "f2" : "normal"}_${todayKey}`;

  const [doneItems, setDoneItems] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = window.localStorage.getItem(doneItemsKey);
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(doneItemsKey);
      setDoneItems(stored ? new Set(JSON.parse(stored) as string[]) : new Set());
    } catch {
      setDoneItems(new Set());
    }
  }, [doneItemsKey]);

  useEffect(() => {
    if (doneItems.size > 0) {
      try {
        window.localStorage.setItem(doneItemsKey, JSON.stringify([...doneItems]));
      } catch {
        /* quota or private mode */
      }
    }
  }, [doneItems, doneItemsKey]);

  const markTimelineItemDone = useCallback((itemTitle: string) => {
    setDoneItems((prev) => {
      if (prev.has(itemTitle)) return prev;
      const next = new Set(prev);
      next.add(itemTitle);
      return next;
    });
  }, []);

  // Restore f2Mode from localStorage (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(lsKey);
      if (stored === "true") setF2ModeState(true);
    } catch { /* SSR or private mode */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch dynamic targets from batch
  useEffect(() => {
    fetch("/api/config/targets")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          const targetKey = f2Mode ? "f2" : persona;
          if (data[targetKey]) {
            setTargets(data[targetKey] as PersonaTargets);
          }
          setWeekNumber(data.weekNumber ?? 1);
        }
      })
      .catch(() => { /* keep fallback */ });
  }, [persona, f2Mode]);

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
    const id = setInterval(fetchContext, 30_000);
    return () => clearInterval(id);
  }, [fetchContext]);

  useEffect(() => {
    const unsubscribe = onRepoUpdated(() => {
      setTimeout(() => fetchContext(), 2000);
      setTimeout(() => fetchContext(), 5000);
    });
    return unsubscribe;
  }, [fetchContext]);

  // Called by Chat when an action completes
  const handleAction = useCallback(() => {
    pendingOpsRef.current += 1;
    setPendingOps(pendingOpsRef.current);
    // Refresh counters immediately
    fetchContext();
  }, [fetchContext]);

  const { counters, alerts } = ctx;
  const rawTimeline = f2Mode ? ctx.weekPlanningF2 : ctx.timeline;
  const timeline = rawTimeline.map((item) =>
    doneItems.has(item.title) ? { ...item, status: "done" as const } : item
  );

  const utmPath = "tracking/utm/StoreMD/UTM_TRACKING_LINKS.md";

  const filePaths = f2Mode
    ? {
        planHebdo: "f2/plan-hebdo.md",
        postsBatch: "BATCH-SEMAINE-6.md",
        crossEng: `${persona}/cross-engagement-tracker.md`,
        cold: `${persona}/cold/cold-outreach-log.md`,
        progress: "f2/progress-semaine.md",
      }
    : {
        planHebdo: `${persona}/plan-hebdo.md`,
        postsBatch: "BATCH-SEMAINE-6.md",
        crossEng: `${persona}/cross-engagement-tracker.md`,
        cold: `${persona}/cold/cold-outreach-log.md`,
        progress: `${persona}/progress-semaine.md`,
      };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col z-10">
      {brainExpanded && (
        <ErrorBoundary>
          <RepoGraph3DFullscreen
            persona={persona}
            mode={mode as "normal" | "f2"}
            onClose={() => setBrainExpanded(false)}
            onLoadFile={(name, content) => setFileContext({ name, content })}
          />
        </ErrorBoundary>
      )}
      {graphifyExpanded && (
        <ErrorBoundary>
          <GraphifyFullscreen
            accentColor={accentColor}
            onClose={() => setGraphifyExpanded(false)}
            onSendToJarvis={(text) => {
              setGraphifyPrefill(text);
              setGraphifyExpanded(false);
            }}
          />
        </ErrorBoundary>
      )}
      {mempalaceExpanded && (
        <ErrorBoundary>
          <MemPalaceView
            accentColor={accentColor}
            onClose={() => setMempalaceExpanded(false)}
            onSendToJarvis={(text) => {
              setGraphifyPrefill(text);
              setMempalaceExpanded(false);
            }}
          />
        </ErrorBoundary>
      )}
      <FileViewerModal
        filePath={openFilePath}
        accentColor={accentColor}
        onClose={() => setOpenFilePath(null)}
        persona={persona}
        mode={mode}
      />
      {promptsOpen && (
        <PromptsModal
          persona={persona}
          accentColor={accentColor}
          onClose={() => setPromptsOpen(false)}
        />
      )}
      {/* Top bar */}
      {f2Mode && (
        <div className="fixed top-0 left-0 right-0 z-30">
          <F2Banner />
        </div>
      )}
      <header
        className={`glass flex items-center justify-between px-6 py-3 sticky top-0 z-20 ${f2Mode ? "mt-8" : ""}`}
        style={{ borderBottom: `1px solid ${accentColor}20` }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[12px] font-mono text-slate-500 hover:text-slate-300 transition-colors tracking-widest uppercase"
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
                className={`text-[12px] font-mono px-2 py-1 rounded transition-all ${
                  !f2Mode ? "text-slate-200 bg-white/10" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                ROMAIN
              </button>
              <button
                onClick={() => setF2Mode(true)}
                className={`text-[12px] font-mono px-2 py-1 rounded transition-all ${
                  f2Mode ? "text-[#97C459] bg-[#97C459]/10" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                F2
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <LiveClock color={accentColor} />
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="text-[10px] font-mono text-slate-600 hover:text-red-400 transition-colors px-2 py-1 rounded border border-transparent hover:border-red-400/20"
            title="Déconnexion"
          >
            ⏻
          </button>
        </div>
      </header>

      {/* Mobile overlays */}
      {mobilePanel === "timeline" && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col"
          style={{ background: "#020612" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span className="text-[12px] font-mono text-slate-400 uppercase tracking-widest">Timeline</span>
            <button onClick={() => setMobilePanel(null)} className="text-slate-500 hover:text-slate-300 text-lg leading-none">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TimelineColumn
              items={timeline}
              accentColor={accentColor}
              loading={loading}
              persona={persona}
              onItemDone={markTimelineItemDone}
            />
          </div>
        </div>
      )}
      {mobilePanel === "counters" && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col"
          style={{ background: "#020612" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span className="text-[12px] font-mono text-slate-400 uppercase tracking-widest">Compteurs du jour</span>
            <button onClick={() => setMobilePanel(null)} className="text-slate-500 hover:text-slate-300 text-lg leading-none">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2">
              {targets.cold > 0 && (
                <CounterTile label="Cold" value={counters.cold} target={targets.cold} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
              )}
              {targets.platforms.includes("TWITTER") && (
                <CounterTile label="TW eng." value={counters.twEng} target={targets.twEng} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
              )}
              {targets.platforms.includes("LINKEDIN") && (
                <CounterTile label="LI com." value={counters.liCom} target={targets.liCom} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
              )}
              {targets.platforms.includes("REDDIT") && (
                <CounterTile label="Reddit" value={counters.reddit} target={targets.reddit} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
              )}
              {targets.hasIhPh && (
                <CounterTile label="IH + PH" value={counters.ihPh} target={targets.ihPh} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
              )}
              {targets.cross > 0 && (
                <CounterTile label="Cross" value={counters.cross} target={targets.cross} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
              )}
              <CounterTile label="Total" value={counters.total} target={targets.engTarget} accentColor={accentColor} onClick={() => setMobilePanel(null)} />
            </div>
          </div>
        </div>
      )}
      {mobilePanel === "menu" && (
        <div
          className="fixed inset-0 z-50 md:hidden flex"
          onClick={() => setMobilePanel(null)}
        >
          <div
            className="w-72 flex flex-col overflow-y-auto"
            style={{ background: "#020612", borderRight: `1px solid ${accentColor}20` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-[12px] font-mono text-slate-400 uppercase tracking-widest">Menu</span>
              <button onClick={() => setMobilePanel(null)} className="text-slate-500 hover:text-slate-300 text-lg leading-none">✕</button>
            </div>
            <div className="p-3 flex flex-col gap-2">
              <button
                onClick={() => { setGraphifyExpanded(true); setMobilePanel(null); }}
                className="w-full flex items-center gap-2 px-2 py-2 rounded text-[12px] font-mono hover:bg-white/5 min-h-[32px]"
                style={{ border: `1px solid ${accentColor}20`, color: accentColor, background: `${accentColor}08` }}
              >
                <span>⬡</span><span>Graphify</span>
              </button>
              <button
                onClick={() => { setMempalaceExpanded(true); setMobilePanel(null); }}
                className="w-full flex items-center gap-2 px-2 py-2 rounded text-[12px] font-mono hover:bg-white/5 min-h-[32px]"
                style={{ border: `1px solid ${accentColor}20`, color: accentColor, background: `${accentColor}08` }}
              >
                <span>🏛</span><span>MemPalace</span>
              </button>
            </div>
            <QuickAccessSidebar
              persona={persona}
              accentColor={accentColor}
              weekNumber={weekNumber}
              onOpenPlanHebdo={() => { setOpenFilePath(filePaths.planHebdo); setMobilePanel(null); }}
              onOpenPostsBatch={() => { setOpenFilePath(filePaths.postsBatch); setMobilePanel(null); }}
              onOpenCrossEngagement={() => { setOpenFilePath(filePaths.crossEng); setMobilePanel(null); }}
              onOpenColdOutreach={() => { setOpenFilePath(filePaths.cold); setMobilePanel(null); }}
              onOpenProgress={() => { setOpenFilePath(filePaths.progress); setMobilePanel(null); }}
              onOpenPrompts={() => { setPromptsOpen(true); setMobilePanel(null); }}
              onOpenUtmLinks={() => { setOpenFilePath(utmPath); setMobilePanel(null); }}
            />
            <BatchCard accentColor={accentColor} persona={persona} mode={mode} />
            <OuroborosPanel accentColor={accentColor} persona={persona} />
          </div>
          <div className="flex-1" />
        </div>
      )}

      {/* 4-column layout */}
      <div className="flex flex-1 overflow-hidden pb-14 md:pb-0">
        {/* Sidebar gauche — 200px, cachée sur mobile */}
        <aside
          className="hidden md:flex w-[200px] flex-none flex-col border-r overflow-y-auto"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="p-3">
            <RepoGraph3D
              persona={persona}
              mode={mode as "normal" | "f2"}
              onExpand={() => setBrainExpanded(true)}
            />
          </div>

          {/* Graphify button */}
          <div className="px-3 pb-1">
            <button
              onClick={() => setGraphifyExpanded(true)}
              className="w-full flex items-center gap-2 px-2 py-2 rounded text-[12px] font-mono transition-all hover:bg-white/5 min-h-[32px]"
              style={{
                border: `1px solid ${accentColor}20`,
                color: accentColor,
                background: `${accentColor}08`,
              }}
            >
              <span>⬡</span>
              <span>Graphify</span>
              <span className="ml-auto text-[10px] opacity-50">concepts</span>
            </button>
          </div>

          {/* MemPalace button */}
          <div className="px-3 pb-2">
            <button
              onClick={() => setMempalaceExpanded(true)}
              className="w-full flex items-center gap-2 px-2 py-2 rounded text-[12px] font-mono transition-all hover:bg-white/5 min-h-[32px]"
              style={{
                border: `1px solid ${accentColor}20`,
                color: accentColor,
                background: `${accentColor}08`,
              }}
            >
              <span>🏛</span>
              <span>MemPalace</span>
              <span className="ml-auto text-[10px] opacity-50">drawers</span>
            </button>
          </div>

          <QuickAccessSidebar
            persona={persona}
            accentColor={accentColor}
            weekNumber={weekNumber}
            onOpenPlanHebdo={() => setOpenFilePath(filePaths.planHebdo)}
            onOpenPostsBatch={() => setOpenFilePath(filePaths.postsBatch)}
            onOpenCrossEngagement={() => setOpenFilePath(filePaths.crossEng)}
            onOpenColdOutreach={() => setOpenFilePath(filePaths.cold)}
            onOpenProgress={() => setOpenFilePath(filePaths.progress)}
            onOpenPrompts={() => setPromptsOpen(true)}
            onOpenUtmLinks={() => setOpenFilePath(utmPath)}
          />
        </aside>

        <div className="hidden md:flex h-full overflow-hidden">
          <TimelineColumn
            items={timeline}
            accentColor={accentColor}
            loading={loading}
            persona={persona}
            onItemDone={markTimelineItemDone}
          />
        </div>

        {/* Centre — flex-1 */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Chat area */}
          <div className="flex-1 overflow-hidden">
            <Chat
              persona={persona}
              mode={mode}
              onAction={handleAction}
              fileContext={fileContext}
              onFileContextClear={() => setFileContext(null)}
              graphifyPrefill={graphifyPrefill}
              onGraphifyPrefillClear={() => setGraphifyPrefill(null)}
            />
          </div>
        </main>

        {/* Sidebar droite — 290px, cachée sur mobile */}
        <aside
          className="hidden md:flex w-[290px] flex-none flex-col border-l overflow-y-auto"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Compteurs — grille dynamique selon persona */}
          <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="text-[12px] font-semibold text-slate-500 mb-3">
              Compteurs du jour
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {targets.cold > 0 && (
              <CounterTile
                label="Cold"
                value={counters.cold}
                target={targets.cold}
                accentColor={accentColor}
                onClick={() => setOpenFilePath(filePaths.cold)}
              />
              )}
              {targets.platforms.includes("TWITTER") && (
                <CounterTile
                  label="TW eng."
                  value={counters.twEng}
                  target={targets.twEng}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.platforms.includes("LINKEDIN") && (
                <CounterTile
                  label="LI com."
                  value={counters.liCom}
                  target={targets.liCom}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.platforms.includes("REDDIT") && (
                <CounterTile
                  label="Reddit"
                  value={counters.reddit}
                  target={targets.reddit}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.platforms.includes("FACEBOOK") && (
                <CounterTile
                  label="Facebook"
                  value={counters.facebook}
                  target={targets.facebook}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.hasIh && targets.hasPh && (
                <CounterTile
                  label="IH + PH"
                  value={counters.ihPh}
                  target={targets.ihPh}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.hasIh && !targets.hasPh && (
                <CounterTile
                  label="IH"
                  value={counters.ih ?? counters.ihPh}
                  target={targets.ih}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.hasPh && !targets.hasIh && (
                <CounterTile
                  label="PH"
                  value={counters.ph ?? counters.ihPh}
                  target={targets.ph}
                  accentColor={accentColor}
                  onClick={() => setOpenFilePath(`${persona}/engagement/engagement-log.md`)}
                />
              )}
              {targets.cross > 0 && (
              <CounterTile
                label="Cross"
                value={counters.cross}
                target={targets.cross}
                accentColor={accentColor}
                onClick={() => setOpenFilePath(filePaths.crossEng)}
              />
              )}
              <CounterTile
                label="Total"
                value={counters.total}
                target={targets.engTarget}
                accentColor={accentColor}
                onClick={() => setOpenFilePath(filePaths.progress)}
              />
            </div>
          </div>

          {/* Alertes — dismissibles via resolve_alert */}
          <div className="p-4">
            <div className="text-[12px] font-semibold text-slate-500 mb-3">
              Alertes
            </div>
            {alerts.length === 0 ? (
              <div className="text-[12px] text-slate-500">
                {loading ? "Chargement…" : "Aucune alerte active"}
              </div>
            ) : (
              alerts.map((alert, i) => (
                <AlertRow
                  key={`${alert.title}-${i}`}
                  alert={alert}
                  persona={persona}
                  mode={mode}
                  onResolved={() => fetchContext()}
                />
              ))
            )}
          </div>

          {/* Batch S{N+1} card */}
          <BatchCard accentColor={accentColor} persona={persona} mode={mode} />

          {/* Ouroboros panel */}
          <OuroborosPanel accentColor={accentColor} persona={persona} />

          {/* Auto-commit status */}
          <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="text-[12px] font-semibold text-slate-500 mb-2">
              Commits automatiques
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12px] text-slate-400">
                <span>Prochain batch</span>
                <span className="font-mono" style={{ color: accentColor }}>{batchLabel}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] text-slate-400">
                <span>Temps restant</span>
                <span className="font-mono" suppressHydrationWarning>{batchCountdown}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] text-slate-400">
                <span>Actions en attente</span>
                <span className="font-mono" style={{ color: pendingOps > 0 ? accentColor : undefined }}>
                  {pendingOps}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom navigation — mobile only */}
      <MobileNav
        accentColor={accentColor}
        activePanel={mobilePanel}
        onToggle={setMobilePanel}
      />
    </div>
  );
}
