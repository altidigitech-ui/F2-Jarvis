"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WingInfo {
  id: string;
  name: string;
  drawerCount: number;
  lastUpdate: string;
}

interface DrawerSummary {
  id: string;
  filename: string;
  title: string;
  preview: string;
  tags: string[];
  date: string;
  source: string;
  size: number;
}

interface DrawerFull {
  wing: string;
  filename: string;
  frontMatter: { tags: string[]; date: string; source: string };
  content: string;
  wikiLinks: string[];
}

interface MemPalaceStats {
  totalDrawers: number;
  totalWings: number;
  byWing: Record<string, number>;
  lastUpdate: string;
  oldestDrawer: string;
  newestDrawer: string;
}

// ─── Wing colour palette ───────────────────────────────────────────────────────

const WING_COLORS: Record<string, string> = {
  "f2-core": "#00ffb4",
  "f2-ops-hub": "#00ffb4",
  "f2-studio": "#00ffb4",
  romain: "#00ffb4",
  fabrice: "#9b8fff",
  marketing: "#f0a500",
  "leak-detector": "#ff6b6b",
  storemd: "#4ecdc4",
  payloaddiff: "#45b7d1",
  contentforge: "#96ceb4",
};

function wingColor(id: string): string {
  return WING_COLORS[id] ?? "#64748b";
}

// ─── Markdown renderer (minimal) ─────────────────────────────────────────────

function renderMarkdown(md: string): string {
  return md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 class="text-[11px] font-mono font-bold text-slate-300 mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-[12px] font-mono font-bold text-slate-200 mt-4 mb-1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-[13px] font-mono font-bold text-slate-100 mt-4 mb-2">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-200">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-[10px] font-mono text-slate-300">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-3 text-slate-400 text-[11px] list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-3 text-slate-400 text-[11px] list-decimal">$2</li>')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="text-cyan-400 cursor-pointer hover:underline wiki-link" data-target="$1">[[$1]]</span>');
}

// ─── DrawerPopup ──────────────────────────────────────────────────────────────

function DrawerPopup({
  drawer,
  accentColor,
  onClose,
  onSendToJarvis,
  onNavigate,
}: {
  drawer: DrawerFull;
  accentColor: string;
  onClose: () => void;
  onSendToJarvis: (text: string) => void;
  onNavigate: (wing: string, filename: string) => void;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(drawer.content).catch(() => {});
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("wiki-link")) {
      const ref = target.dataset.target ?? "";
      const parts = ref.split("/");
      if (parts.length === 2) {
        onNavigate(parts[0], parts[1]);
      }
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ghUrl = `https://github.com/altidigitech-ui/F2-Jarvis/blob/main/brain/mempalace/wings/${drawer.wing}/drawers/${drawer.filename}.md`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-xl overflow-hidden"
        style={{
          width: "min(780px, 95vw)",
          maxHeight: "85vh",
          background: "rgba(10,12,20,0.98)",
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 0 60px ${accentColor}12`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: `${accentColor}15` }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded"
              style={{ background: `${wingColor(drawer.wing)}18`, color: wingColor(drawer.wing), border: `1px solid ${wingColor(drawer.wing)}30` }}
            >
              {drawer.wing}
            </span>
            <span className="text-[12px] font-mono text-slate-300 truncate">{drawer.filename}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-300 transition-colors text-lg leading-none flex-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 px-5 py-2 border-b flex-wrap" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          {drawer.frontMatter.date && (
            <span className="text-[10px] font-mono text-slate-600">{drawer.frontMatter.date}</span>
          )}
          {drawer.frontMatter.source && (
            <span className="text-[10px] font-mono text-slate-600">src: {drawer.frontMatter.source}</span>
          )}
          {drawer.frontMatter.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}20` }}
            >
              {t}
            </span>
          ))}
          {drawer.wikiLinks.length > 0 && (
            <span className="text-[10px] font-mono text-slate-700 ml-auto">
              {drawer.wikiLinks.length} wiki-link{drawer.wikiLinks.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 text-[11px] text-slate-400 leading-relaxed"
          style={{ fontFamily: "ui-monospace, monospace" }}
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: `<p class="mb-2">${renderMarkdown(drawer.content)}</p>` }}
        />

        {/* Footer actions */}
        <div
          className="flex items-center gap-2 px-5 py-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <button
            onClick={() => onSendToJarvis(`[${drawer.wing}/${drawer.filename}]\n\n${drawer.content}`)}
            className="text-[10px] font-mono px-3 py-1.5 rounded transition-all hover:opacity-80 flex items-center gap-1.5"
            style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}30` }}
          >
            ↗ Envoyer à JARVIS
          </button>
          <a
            href={ghUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono px-3 py-1.5 rounded transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.05)", color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            ⎋ Voir dans repo
          </a>
          <button
            onClick={handleCopy}
            className="text-[10px] font-mono px-3 py-1.5 rounded transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.05)", color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            ⧉ Copier
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DrawerCard ───────────────────────────────────────────────────────────────

function DrawerCard({
  drawer,
  accentColor,
  view,
  onClick,
}: {
  drawer: DrawerSummary;
  accentColor: string;
  view: "grid" | "list";
  onClick: () => void;
}) {
  if (view === "list") {
    return (
      <button
        onClick={onClick}
        className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded transition-all hover:bg-white/5 group"
        style={{ border: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-[11px] font-mono text-slate-300 truncate group-hover:text-slate-100 transition-colors">
              {drawer.title}
            </span>
            {drawer.date && (
              <span className="text-[9px] font-mono text-slate-700 flex-none">{drawer.date}</span>
            )}
          </div>
          {drawer.preview && (
            <p className="text-[10px] text-slate-600 truncate">{drawer.preview}</p>
          )}
        </div>
        <div className="flex items-center gap-1 flex-none">
          {drawer.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[8px] font-mono px-1 py-0.5 rounded"
              style={{ background: `${accentColor}10`, color: accentColor }}
            >
              {t}
            </span>
          ))}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="text-left flex flex-col gap-1.5 p-3 rounded-lg transition-all hover:bg-white/5 group"
      style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
    >
      <div className="text-[11px] font-mono text-slate-300 leading-tight line-clamp-2 group-hover:text-slate-100 transition-colors">
        {drawer.title}
      </div>
      {drawer.preview && (
        <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed">{drawer.preview}</p>
      )}
      <div className="flex items-center gap-1.5 mt-auto flex-wrap">
        {drawer.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}15` }}
          >
            {t}
          </span>
        ))}
        {drawer.date && (
          <span className="text-[9px] font-mono text-slate-700 ml-auto">{drawer.date}</span>
        )}
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MemPalaceView({
  accentColor,
  onClose,
  onSendToJarvis,
}: {
  accentColor: string;
  onClose: () => void;
  onSendToJarvis: (text: string) => void;
}) {
  const [wings, setWings] = useState<WingInfo[]>([]);
  const [stats, setStats] = useState<MemPalaceStats | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loadingWings, setLoadingWings] = useState(true);

  const [selectedWing, setSelectedWing] = useState<string | null>(null);
  const [drawers, setDrawers] = useState<DrawerSummary[]>([]);
  const [loadingDrawers, setLoadingDrawers] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [openDrawer, setOpenDrawer] = useState<DrawerFull | null>(null);
  const [loadingDrawer, setLoadingDrawer] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  // Close on ESC (unless drawer popup is open)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !openDrawer) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, openDrawer]);

  // Load wings + stats on mount
  useEffect(() => {
    const load = async () => {
      setLoadingWings(true);
      try {
        const [wRes, sRes] = await Promise.all([
          fetch("/api/mempalace/wings"),
          fetch("/api/mempalace/stats"),
        ]);
        const wData = await wRes.json();
        const sData = await sRes.json();

        if (Array.isArray(wData) && wData.length > 0) {
          setWings(wData);
          setIsEmpty(false);
        } else if (wData.empty) {
          setIsEmpty(true);
        } else {
          setWings(wData.wings ?? []);
          setIsEmpty((wData.wings ?? []).length === 0);
        }
        setStats(sData);
      } catch {
        setIsEmpty(true);
      } finally {
        setLoadingWings(false);
      }
    };
    load();
  }, []);

  // Load drawers when wing selected
  const loadWingDrawers = useCallback(async (wingId: string | null) => {
    setDrawers([]);
    setSearch("");
    setFilterTag("");
    if (!wingId) return;
    setLoadingDrawers(true);
    try {
      const res = await fetch(`/api/mempalace/wing/${encodeURIComponent(wingId)}`);
      const data = await res.json();
      setDrawers(data.drawers ?? []);
    } catch {
      setDrawers([]);
    } finally {
      setLoadingDrawers(false);
    }
  }, []);

  const handleSelectWing = useCallback((id: string | null) => {
    setSelectedWing(id);
    loadWingDrawers(id);
    searchRef.current?.focus();
  }, [loadWingDrawers]);

  // Open a drawer
  const handleOpenDrawer = useCallback(async (wing: string, filename: string) => {
    setLoadingDrawer(true);
    try {
      const res = await fetch(`/api/mempalace/drawer/${encodeURIComponent(wing)}/${encodeURIComponent(filename)}`);
      if (!res.ok) return;
      const data: DrawerFull = await res.json();
      setOpenDrawer(data);
    } catch {
      // silently fail
    } finally {
      setLoadingDrawer(false);
    }
  }, []);

  // Navigate to a wiki-link drawer
  const handleNavigate = useCallback((wing: string, filename: string) => {
    setOpenDrawer(null);
    handleOpenDrawer(wing, filename);
  }, [handleOpenDrawer]);

  // Collect all unique tags for filter
  const allTags = Array.from(new Set(drawers.flatMap((d) => d.tags))).sort();

  // Filter drawers
  const filtered = drawers.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.preview.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q)) ||
      d.filename.toLowerCase().includes(q);
    const matchTag = !filterTag || d.tags.includes(filterTag);
    return matchSearch && matchTag;
  });

  // ── Render ──

  return (
    <div
      className="fixed inset-0 z-[150] flex flex-col"
      style={{ background: "rgba(4,6,14,0.97)" }}
      role="dialog"
      aria-modal="true"
      aria-label="MemPalace"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b flex-none"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-mono font-semibold" style={{ color: accentColor }}>
            🏛 MEMPALACE
          </span>
          {stats && stats.totalDrawers > 0 && (
            <span className="text-[10px] font-mono text-slate-600">
              {stats.totalDrawers.toLocaleString()} drawers · {stats.totalWings} wings
            </span>
          )}
          {loadingWings && (
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: accentColor }}
            />
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-300 transition-colors text-base font-mono"
          aria-label="Fermer MemPalace"
        >
          ✕ ESC
        </button>
      </div>

      {/* Empty state */}
      {!loadingWings && isEmpty && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
          <div className="text-4xl">🏛</div>
          <div className="text-[14px] font-mono text-slate-400">MemPalace pas encore peuplé</div>
          <p className="text-[11px] text-slate-600 text-center max-w-sm leading-relaxed">
            Les drawers sont extraits des conversations passées. Ils apparaîtront ici au fur et à mesure.
          </p>
          <a
            href="https://github.com/altidigitech-ui/F2-Jarvis/tree/main/brain/mempalace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono px-4 py-2 rounded transition-all hover:opacity-80"
            style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}30` }}
          >
            INITIALISER MEMPALACE
          </a>
        </div>
      )}

      {/* Main layout */}
      {!isEmpty && (
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Wings sidebar */}
          <aside
            className="w-[200px] flex-none flex flex-col border-r overflow-y-auto"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div className="px-3 pt-3 pb-1">
              <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2 px-1">
                Wings
              </div>
              {/* All wings */}
              <button
                onClick={() => handleSelectWing(null)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded mb-0.5 text-[10px] font-mono transition-all ${
                  selectedWing === null
                    ? "text-slate-200 bg-white/8"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/4"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-none" />
                <span className="flex-1 text-left">Toutes</span>
                {stats && (
                  <span className="text-[9px] text-slate-700">{stats.totalDrawers}</span>
                )}
              </button>

              {loadingWings && (
                <div className="space-y-1 mt-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 rounded animate-pulse"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    />
                  ))}
                </div>
              )}

              {wings.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleSelectWing(w.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded mb-0.5 text-[10px] font-mono transition-all ${
                    selectedWing === w.id
                      ? "bg-white/8 text-slate-200"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/4"
                  }`}
                  style={selectedWing === w.id ? { color: wingColor(w.id) } : {}}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-none"
                    style={{ background: wingColor(w.id), opacity: selectedWing === w.id ? 1 : 0.4 }}
                  />
                  <span className="flex-1 text-left truncate">{w.name}</span>
                  <span
                    className="text-[9px] flex-none"
                    style={{ color: selectedWing === w.id ? wingColor(w.id) : "#475569" }}
                  >
                    {w.drawerCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Stats footer */}
            {stats && stats.lastUpdate && (
              <div className="mt-auto px-3 pb-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="text-[9px] font-mono text-slate-700">
                  Dernière MAJ : {stats.lastUpdate}
                </div>
              </div>
            )}
          </aside>

          {/* Right: Drawers panel */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b flex-none"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={selectedWing ? `Rechercher dans ${selectedWing}…` : "Rechercher dans tous les drawers…"}
                className="flex-1 bg-white/5 border border-white/8 rounded px-3 py-1.5 text-[11px] font-mono text-slate-300 placeholder-slate-700 focus:outline-none focus:border-white/20 transition-colors"
              />

              {allTags.length > 0 && (
                <select
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="bg-white/5 border border-white/8 rounded px-2 py-1.5 text-[10px] font-mono text-slate-500 focus:outline-none cursor-pointer"
                >
                  <option value="">Tous les tags</option>
                  {allTags.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              )}

              {(search || filterTag) && (
                <button
                  onClick={() => { setSearch(""); setFilterTag(""); }}
                  className="text-[10px] font-mono text-slate-600 hover:text-slate-400 transition-colors px-2"
                >
                  ✕ Effacer
                </button>
              )}

              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded text-[10px] transition-colors ${view === "grid" ? "text-slate-200 bg-white/10" : "text-slate-600 hover:text-slate-400"}`}
                  title="Vue grille"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded text-[10px] transition-colors ${view === "list" ? "text-slate-200 bg-white/10" : "text-slate-600 hover:text-slate-400"}`}
                  title="Vue liste"
                >
                  ≡
                </button>
              </div>
            </div>

            {/* Drawer count / state */}
            <div
              className="px-4 py-1.5 border-b flex items-center gap-2"
              style={{ borderColor: "rgba(255,255,255,0.03)" }}
            >
              {loadingDrawers ? (
                <span className="text-[9px] font-mono text-slate-700 animate-pulse">Chargement…</span>
              ) : selectedWing === null && drawers.length === 0 ? (
                <span className="text-[9px] font-mono text-slate-700">
                  Sélectionner une wing pour explorer ses drawers
                </span>
              ) : (
                <span className="text-[9px] font-mono text-slate-700">
                  {filtered.length} drawer{filtered.length !== 1 ? "s" : ""}
                  {search || filterTag ? ` (filtrés sur ${drawers.length})` : ""}
                </span>
              )}
              {loadingDrawer && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse ml-auto"
                  style={{ background: accentColor }}
                />
              )}
            </div>

            {/* Drawers grid/list */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectedWing === null && !loadingDrawers && (
                <AllDrawersView
                  wings={wings}
                  accentColor={accentColor}
                  view={view}
                  onOpenDrawer={handleOpenDrawer}
                  search={search}
                />
              )}

              {selectedWing !== null && !loadingDrawers && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <span className="text-[11px] font-mono text-slate-700">
                    {search || filterTag ? "Aucun résultat pour ce filtre" : "Wing vide"}
                  </span>
                </div>
              )}

              {selectedWing !== null && (
                <div
                  className={
                    view === "grid"
                      ? "grid gap-3"
                      : "flex flex-col gap-1"
                  }
                  style={view === "grid" ? { gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" } : {}}
                >
                  {filtered.map((d) => (
                    <DrawerCard
                      key={d.id}
                      drawer={d}
                      accentColor={accentColor}
                      view={view}
                      onClick={() => handleOpenDrawer(selectedWing, d.filename)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* Drawer popup */}
      {openDrawer && (
        <DrawerPopup
          drawer={openDrawer}
          accentColor={accentColor}
          onClose={() => setOpenDrawer(null)}
          onSendToJarvis={(text) => {
            onSendToJarvis(text);
            onClose();
          }}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

// ─── AllDrawersView (lazy-loaded per wing) ────────────────────────────────────

function AllDrawersView({
  wings,
  accentColor,
  view,
  onOpenDrawer,
  search,
}: {
  wings: WingInfo[];
  accentColor: string;
  view: "grid" | "list";
  onOpenDrawer: (wing: string, filename: string) => void;
  search: string;
}) {
  const [byWing, setByWing] = useState<Record<string, DrawerSummary[]>>({});
  const [loaded, setLoaded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadAll = async () => {
      const results: Record<string, DrawerSummary[]> = {};
      await Promise.all(
        wings.map(async (w) => {
          try {
            const res = await fetch(`/api/mempalace/wing/${encodeURIComponent(w.id)}`);
            const data = await res.json();
            results[w.id] = data.drawers ?? [];
          } catch {
            results[w.id] = [];
          }
        })
      );
      setByWing(results);
      setLoaded(new Set(wings.map((w) => w.id)));
    };
    if (wings.length > 0) loadAll();
  }, [wings]);

  const q = search.toLowerCase();

  return (
    <div className="space-y-6">
      {wings.map((w) => {
        const wDrawers = (byWing[w.id] ?? []).filter((d) => {
          if (!q) return true;
          return (
            d.title.toLowerCase().includes(q) ||
            d.preview.toLowerCase().includes(q) ||
            d.tags.some((t) => t.toLowerCase().includes(q))
          );
        });

        if (!loaded.has(w.id)) {
          return (
            <div key={w.id}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: wingColor(w.id) }} />
                <span className="text-[10px] font-mono animate-pulse" style={{ color: wingColor(w.id) }}>{w.name}</span>
              </div>
              <div className="h-16 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />
            </div>
          );
        }

        if (wDrawers.length === 0) return null;

        return (
          <div key={w.id}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: wingColor(w.id) }} />
              <span className="text-[10px] font-mono font-semibold" style={{ color: wingColor(w.id) }}>{w.name}</span>
              <span className="text-[9px] font-mono text-slate-700">{wDrawers.length}</span>
            </div>
            <div
              className={view === "grid" ? "grid gap-2" : "flex flex-col gap-1"}
              style={view === "grid" ? { gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" } : {}}
            >
              {wDrawers.slice(0, 20).map((d) => (
                <DrawerCard
                  key={d.id}
                  drawer={d}
                  accentColor={accentColor}
                  view={view}
                  onClick={() => onOpenDrawer(w.id, d.filename)}
                />
              ))}
              {wDrawers.length > 20 && (
                <div className="text-[9px] font-mono text-slate-700 px-2 py-1">
                  +{wDrawers.length - 20} autres — sélectionner la wing pour tout voir
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
