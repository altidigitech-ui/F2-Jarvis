"use client";

import { useState } from "react";
import type { TimelineItem } from "../lib/context-types";
import { emitSendToChat, emitRepoUpdated } from "@/lib/jarvisEvents";

type Props = {
  items: TimelineItem[];
  accentColor: string;
  loading?: boolean;
  persona?: string;
};

export function TimelineColumn({ items, accentColor, loading, persona }: Props) {
  return (
    <aside
      className="w-[260px] flex-none flex flex-col border-r overflow-y-auto"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="px-4 pt-4 pb-2">
        <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
          Planning du jour
        </div>
      </div>

      <div className="flex-1 px-3 pb-4 space-y-2">
        {loading && items.length === 0 && (
          <div className="text-[12px] text-slate-500 px-2 py-4">Chargement…</div>
        )}
        {!loading && items.length === 0 && (
          <div className="text-[12px] text-slate-500 px-2 py-4">
            Aucun post planifié aujourd'hui
          </div>
        )}
        {items.map((item, i) => (
          <TimelineCard key={i} item={item} accentColor={accentColor} persona={persona} />
        ))}
      </div>
    </aside>
  );
}

const publishedByMap: Record<string, string> = { F: "fabrice", R: "romain", F2: "f2" };

function TimelineCard({ item, accentColor, persona }: { item: TimelineItem; accentColor: string; persona?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localDone, setLocalDone] = useState(false);

  const isOwnPost =
    publishedByMap[item.publishedBy] === persona ||
    (item.publishedBy === "F2" && persona === "romain");

  const effectiveStatus = localDone ? "done" : item.status;
  const isDone = effectiveStatus === "done";
  const isBlocked = !isDone && item.status === "blocked";

  const actionLabel = (() => {
    if (item.platform === "OBJECTIF") return "";
    if (item.platform === "CROSS") return "→ Reply à poster dans les 5 min";
    if (isDone) return "✅ Publié";
    if (isOwnPost) return item.time ? `→ Publier à ${item.time}` : "→ À publier";
    return `→ Post de ${item.publishedBy} — cross à faire dessus`;
  })();

  const tag = isDone
    ? { text: "PUBLIÉ", color: accentColor, bg: `${accentColor}18` }
    : isBlocked
    ? { text: "BLOQUÉ", color: "#f06464", bg: "rgba(240,100,100,0.12)" }
    : { text: "À FAIRE", color: "#e8b84a", bg: "rgba(232,184,74,0.10)" };

  const borderColor = isDone
    ? `${accentColor}40`
    : isBlocked
    ? "rgba(240,100,100,0.25)"
    : "rgba(255,255,255,0.08)";

  const bgColor = isDone
    ? `${accentColor}08`
    : isBlocked
    ? "rgba(240,100,100,0.04)"
    : "rgba(255,255,255,0.02)";

  async function copyTitle() {
    try {
      await navigator.clipboard.writeText(item.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
    setMenuOpen(false);
  }

  async function markPublished() {
    setMenuOpen(false);
    setLocalDone(true);

    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          action: "mark_published",
          payload: { title: item.title },
        }),
      });
      if (res.ok) {
        emitRepoUpdated({ actionType: "mark_published" });
      } else {
        setLocalDone(false);
      }
    } catch {
      setLocalDone(false);
      emitSendToChat(`j'ai posté ${item.title}`);
    }
  }

  function adjust() {
    emitSendToChat(`ajuster le post "${item.title}"`);
    setMenuOpen(false);
  }

  return (
    <div
      className="relative rounded-lg p-3 transition-colors hover:bg-white/[0.04]"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        {item.time && (
          <span className="text-[11px] font-mono text-slate-400">{item.time}</span>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <span
            className="text-[9px] font-mono font-semibold tracking-wider px-1.5 py-0.5 rounded"
            style={{ color: tag.color, background: tag.bg }}
          >
            {tag.text}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            className="text-[11px] text-slate-600 hover:text-slate-300 transition-colors w-5 h-5 flex items-center justify-center rounded"
            title="Actions"
          >
            ⋯
          </button>
        </div>
      </div>
      <div className="text-[12px] text-slate-300 leading-snug mb-1.5">
        {item.title}
      </div>
      {actionLabel && (
        <div className="text-[10px] font-mono text-amber-500/70 mb-1.5">
          {actionLabel}
        </div>
      )}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        <span className="font-mono">[{item.platform}]</span>
        {item.publishedBy && <span>· {item.publishedBy}</span>}
      </div>

      {menuOpen && (
        <div
          className="absolute right-1 top-8 z-30 rounded-lg py-1 min-w-[160px] shadow-xl"
          style={{
            background: "#1a1f2e",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={copyTitle}
            className="w-full text-left px-3 py-1.5 text-[11px] font-mono text-slate-300 hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            {copied ? "✓ Copié" : "Copier titre"}
          </button>
          {isOwnPost ? (
            <button
              onClick={markPublished}
              className="w-full text-left px-3 py-1.5 text-[11px] font-mono text-slate-300 hover:bg-white/5 transition-colors"
            >
              Marquer publié
            </button>
          ) : (
            <button
              onClick={() => {
                emitSendToChat(`cross fait sur ${item.title}`);
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-[11px] font-mono text-slate-300 hover:bg-white/5 transition-colors"
            >
              Cross fait
            </button>
          )}
          <button
            onClick={adjust}
            className="w-full text-left px-3 py-1.5 text-[11px] font-mono text-slate-300 hover:bg-white/5 transition-colors"
          >
            Ajuster
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono text-slate-600 hover:bg-white/5 transition-colors border-t"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
