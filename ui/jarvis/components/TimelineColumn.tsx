"use client";
import type { TimelineItem } from "../lib/context-types";

type Props = {
  items: TimelineItem[];
  accentColor: string;
  loading?: boolean;
};

export function TimelineColumn({ items, accentColor, loading }: Props) {
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
          <TimelineCard key={i} item={item} accentColor={accentColor} />
        ))}
      </div>
    </aside>
  );
}

function TimelineCard({ item, accentColor }: { item: TimelineItem; accentColor: string }) {
  const isDone = item.status === "done";
  const isBlocked = item.status === "blocked";

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

  return (
    <div
      className="rounded-lg p-3 transition-colors hover:bg-white/[0.04] cursor-pointer"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        {item.time && (
          <span className="text-[11px] font-mono text-slate-400">{item.time}</span>
        )}
        <span
          className="text-[9px] font-mono font-semibold tracking-wider px-1.5 py-0.5 rounded"
          style={{ color: tag.color, background: tag.bg }}
        >
          {tag.text}
        </span>
      </div>
      <div className="text-[12px] text-slate-300 leading-snug mb-1.5">
        {item.title}
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        <span className="font-mono">[{item.platform}]</span>
        {item.publishedBy && <span>· {item.publishedBy}</span>}
      </div>
    </div>
  );
}
