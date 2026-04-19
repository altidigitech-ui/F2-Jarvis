"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrainSVG } from "./BrainSVG";

type Persona = "romain" | "fabrice";

const PERSONA_CONFIG = {
  romain: {
    label: "Romain",
    role: "Growth · FoundryTwo",
    color: "#00ffb4",
    colorDim: "#00b890",
    colorBg: "rgba(0,255,180,0.06)",
    colorBorder: "rgba(0,255,180,0.15)",
    channels: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH", "F2"],
    counters: {
      interactions: { value: 0, target: 30, label: "Interactions" },
      posts: { value: 0, target: 7, label: "Posts/sem" },
      cold: { value: 0, target: 10, label: "Cold/jour" },
    },
    timeline: [
      { time: "09:00", label: "LinkedIn — post du matin", done: false },
      { time: "10:30", label: "Twitter — 5 interactions", done: false },
      { time: "14:00", label: "Reddit — thread SaaS", done: false },
      { time: "17:00", label: "Cold outreach x10", done: false },
    ],
    alerts: [
      { level: "amber", text: "0/7 posts publiés cette semaine" },
      { level: "amber", text: "Plan-hebdo à démarrer" },
    ],
  },
  fabrice: {
    label: "Fabrice",
    role: "Builder · FoundryTwo",
    color: "#9b8fff",
    colorDim: "#6d5fe0",
    colorBg: "rgba(155,143,255,0.06)",
    colorBorder: "rgba(155,143,255,0.15)",
    channels: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH"],
    counters: {
      interactions: { value: 0, target: 30, label: "Interactions" },
      posts: { value: 0, target: 5, label: "Posts/sem" },
      cold: { value: 0, target: 10, label: "Cold/jour" },
    },
    timeline: [
      { time: "09:00", label: "Twitter — thread technique", done: false },
      { time: "11:00", label: "LinkedIn — build in public", done: false },
      { time: "14:00", label: "IndieHackers — engagement", done: false },
      { time: "16:00", label: "Cold outreach x10", done: false },
    ],
    alerts: [
      { level: "amber", text: "0/5 posts publiés cette semaine" },
      { level: "red", text: "JARVIS V1 — en cours de build" },
    ],
  },
} as const;

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
      <div
        className="text-sm font-mono font-semibold"
        style={{ color }}
        suppressHydrationWarning
      >
        {time} CEST
      </div>
      <div className="text-[10px] text-slate-600 capitalize" suppressHydrationWarning>
        {date}
      </div>
    </div>
  );
}

function Counter({
  value,
  target,
  label,
  color,
}: {
  value: number;
  target: number;
  label: string;
  color: string;
}) {
  const pct = Math.min((value / target) * 100, 100);
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

type Props = {
  persona: Persona;
  children: React.ReactNode;
  showF2Toggle?: boolean;
};

export function PersonaLayout({ persona, children, showF2Toggle = false }: Props) {
  const cfg = PERSONA_CONFIG[persona];
  const [f2Mode, setF2Mode] = useState(false);

  const accentColor = f2Mode ? "#97C459" : cfg.color;

  return (
    <div className="relative min-h-screen flex flex-col z-10">
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
                  !f2Mode
                    ? "text-slate-200 bg-white/10"
                    : "text-slate-600 hover:text-slate-400"
                }`}
              >
                ROMAIN
              </button>
              <button
                onClick={() => setF2Mode(true)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-all ${
                  f2Mode
                    ? "text-[#97C459] bg-[#97C459]/10"
                    : "text-slate-600 hover:text-slate-400"
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
          {/* Brain SVG */}
          <div className="p-3">
            <BrainSVG color={accentColor} />
          </div>

          {/* Nav rapide */}
          <nav className="flex-1 px-3 pb-4">
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2 px-1">
              Canaux
            </div>
            {cfg.channels.map((ch) => (
              <div
                key={ch}
                className="text-[10px] font-mono px-2 py-1.5 rounded mb-0.5 text-slate-500 hover:text-slate-300 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2"
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: accentColor, opacity: 0.5 }}
                />
                {ch}
              </div>
            ))}

            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2 px-1 mt-4">
              Liens
            </div>
            {[
              { label: "Plan hebdo", href: "#" },
              { label: "Progress", href: "#" },
              { label: "Tracking", href: "#" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-[10px] font-mono px-2 py-1.5 rounded mb-0.5 text-slate-500 hover:text-slate-300 hover:bg-white/5 cursor-pointer transition-colors"
              >
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Centre — flex-1 */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Timeline */}
          <div
            className="px-6 py-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2">
              Aujourd&apos;hui
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {cfg.timeline.map((item, i) => (
                <div
                  key={i}
                  className="flex-none flex items-center gap-2 text-[10px] font-mono px-3 py-1.5 rounded-full"
                  style={{
                    background: item.done ? `${accentColor}15` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${item.done ? accentColor + "30" : "rgba(255,255,255,0.06)"}`,
                    color: item.done ? accentColor : "#64748b",
                  }}
                >
                  <span>{item.time}</span>
                  <span>·</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-hidden">{children}</div>
        </main>

        {/* Sidebar droite — 290px */}
        <aside
          className="w-[290px] flex-none flex flex-col border-l"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Compteurs */}
          <div
            className="p-4 border-b"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-3">
              Compteurs
            </div>
            <Counter
              {...cfg.counters.interactions}
              color={accentColor}
            />
            <Counter {...cfg.counters.posts} color={accentColor} />
            <Counter {...cfg.counters.cold} color={accentColor} />
          </div>

          {/* Alertes */}
          <div className="p-4">
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-3">
              Alertes
            </div>
            {cfg.alerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-2 mb-2 text-[10px] p-2 rounded"
                style={{
                  background:
                    alert.level === "red"
                      ? "rgba(240,149,149,0.06)"
                      : "rgba(239,159,39,0.06)",
                  border: `1px solid ${alert.level === "red" ? "rgba(240,149,149,0.15)" : "rgba(239,159,39,0.15)"}`,
                  color:
                    alert.level === "red" ? "#F09595" : "#EF9F27",
                }}
              >
                <span className="mt-0.5">⚠</span>
                <span>{alert.text}</span>
              </div>
            ))}
          </div>

          {/* Auto-commit status */}
          <div className="mt-auto p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2">
              Auto-commit
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              Désactivé — Phase 2
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
