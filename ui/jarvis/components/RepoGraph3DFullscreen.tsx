"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { WING_COLORS, type GraphData, type GraphNode, type GraphLink, fetchGraph } from "./RepoGraph3D";

const ForceGraph3D = dynamic(
  () => import("react-force-graph-3d").then((m) => (m as { default: unknown }).default as React.ComponentType<Record<string, unknown>>),
  { ssr: false }
);

type FilePreview = { path: string; content: string } | null;

type Props = {
  persona: "romain" | "fabrice";
  mode: "normal" | "f2";
  onClose: () => void;
  onLoadFile?: (name: string, content: string) => void;
};

const WING_LABELS: Record<string, string> = {
  "f2-core":          "F2 Core",
  "strategie":        "Stratégie",
  "produits":         "Produits",
  "f2-compte":        "F2 Compte",
  "romain":           "Romain",
  "fabrice":          "Fabrice",
  "growth-marketing": "Growth Mkt",
  "distribution":     "Distribution",
  "marketing":        "Marketing",
  "saas":             "SaaS",
  "la-toile":         "La Toile",
  "patterns":         "Patterns",
  "claude-config":    "Claude Config",
  "default":          "Autre",
};

export default function RepoGraph3DFullscreen({ persona, mode, onClose, onLoadFile }: Props) {
  const accentColor =
    mode === "f2" ? "#97C459" : persona === "romain" ? "#00ffb4" : "#9b8fff";

  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [search, setSearch] = useState("");
  const [activeWings, setActiveWings] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview>(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const graphRef = useRef<{ cameraPosition: (pos: object, target?: object, ms?: number) => void } | null>(null);

  useEffect(() => {
    setDims({ w: window.innerWidth - 280, h: window.innerHeight });
    fetchGraph().then(setData);
  }, []);

  // All wings present in the data
  const wings = useMemo(() => {
    const s = new Set<string>();
    data.nodes.forEach((n) => s.add(n.wing));
    return [...s].sort();
  }, [data.nodes]);

  // Filtered graph data
  const filteredData = useMemo((): GraphData => {
    if (!search && activeWings.size === 0) return data;

    const lcSearch = search.toLowerCase();
    const filteredNodes = data.nodes.filter((n) => {
      const matchSearch = !search || n.name.toLowerCase().includes(lcSearch) || n.id.toLowerCase().includes(lcSearch);
      const matchWing = activeWings.size === 0 || activeWings.has(n.wing);
      return matchSearch && matchWing;
    });

    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = data.links.filter((l) => {
      const src = typeof l.source === "string" ? l.source : l.source.id;
      const tgt = typeof l.target === "string" ? l.target : l.target.id;
      return nodeIds.has(src) && nodeIds.has(tgt);
    });

    return { nodes: filteredNodes, links: filteredLinks };
  }, [data, search, activeWings]);

  const toggleWing = useCallback((wing: string) => {
    setActiveWings((prev) => {
      const next = new Set(prev);
      if (next.has(wing)) next.delete(wing);
      else next.add(wing);
      return next;
    });
  }, []);

  const nodeColor = useCallback(
    (node: object) => WING_COLORS[(node as GraphNode).wing] ?? WING_COLORS.default,
    []
  );
  const nodeVal = useCallback(
    (node: object) => Math.max(0.5, (node as GraphNode).val),
    []
  );
  const linkColor = useCallback(
    (link: object) => ((link as GraphLink).type === "wikilink" ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.03)"),
    []
  );
  const linkWidth = useCallback(
    (link: object) => ((link as GraphLink).type === "wikilink" ? 0.8 : 0.2),
    []
  );
  const nodeLabel = useCallback(
    (node: object) => {
      const n = node as GraphNode;
      const color = WING_COLORS[n.wing] ?? "#888";
      return `<div style="background:rgba(2,6,18,0.92);border:1px solid ${color}30;padding:4px 8px;border-radius:4px;font-family:monospace;font-size:11px;color:${color}">
        <div style="font-weight:600">${n.name}</div>
        <div style="opacity:0.6;font-size:9px">${n.id}</div>
        <div style="opacity:0.5;font-size:9px">${WING_LABELS[n.wing] ?? n.wing} · ${Math.round(n.size / 1024)}KB</div>
      </div>`;
    },
    []
  );

  const handleNodeClick = useCallback(async (node: object) => {
    const n = node as GraphNode;
    setSelectedNode(n);
    setFilePreview(null);
    setLoadingFile(true);

    // Center camera on the clicked node
    if (graphRef.current && n.x != null) {
      graphRef.current.cameraPosition(
        { x: n.x! * 1.2, y: n.y! * 1.2, z: n.z! + 120 },
        { x: n.x!, y: n.y!, z: n.z! },
        800
      );
    }

    try {
      const res = await fetch(`/api/file?path=${encodeURIComponent(n.id)}`);
      if (res.ok) {
        const { content } = await res.json();
        setFilePreview({ path: n.id, content });
      }
    } catch { /* ignore */ } finally {
      setLoadingFile(false);
    }
  }, []);

  const handleNodeHover = useCallback((node: object | null) => {
    setHoveredNode(node ? (node as GraphNode) : null);
  }, []);

  const handleLoadFile = useCallback(() => {
    if (!filePreview || !selectedNode) return;
    const excerpt = filePreview.content.slice(0, 3000);
    onLoadFile?.(selectedNode.name, excerpt);
    onClose();
  }, [filePreview, selectedNode, onLoadFile, onClose]);

  const totalLinks = data.links.filter((l) => (l as GraphLink).type === "wikilink").length;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#020612" }}
      onPointerMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b flex-none"
        style={{ borderColor: `${accentColor}18` }}
      >
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono tracking-widest" style={{ color: accentColor, opacity: 0.7 }}>
            ◈ REPO GRAPH — F2-JARVIS
          </div>
          <div className="text-[9px] font-mono text-slate-700">
            {data.nodes.length} nodes · {totalLinks} wiki-links
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white text-sm font-mono transition-colors px-2"
        >
          ✕
        </button>
      </div>

      {/* Main: graph + sidebar */}
      <div className="flex flex-1 overflow-hidden">

        {/* 3D Graph */}
        <div className="relative flex-1 overflow-hidden">
          {data.nodes.length > 0 && (
            <ForceGraph3D
              ref={graphRef}
              graphData={filteredData}
              width={dims.w}
              height={dims.h - 48}
              backgroundColor="#020612"
              nodeColor={nodeColor}
              nodeVal={nodeVal}
              nodeLabel={nodeLabel}
              linkColor={linkColor}
              linkWidth={linkWidth}
              showNavInfo={false}
              enableNodeDrag={false}
              cooldownTime={3000}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
            />
          )}

          {/* Hover indicator */}
          {hoveredNode && (
            <div
              className="fixed pointer-events-none z-50 text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap"
              style={{
                left: mousePos.x + 14,
                top: mousePos.y - 10,
                background: "rgba(2,6,18,0.90)",
                border: `1px solid ${WING_COLORS[hoveredNode.wing] ?? "#888"}30`,
                color: WING_COLORS[hoveredNode.wing] ?? "#888",
              }}
            >
              {hoveredNode.name}
            </div>
          )}

          <div
            className="absolute bottom-3 left-0 right-0 flex justify-center text-[9px] font-mono tracking-widest pointer-events-none"
            style={{ color: accentColor, opacity: 0.2 }}
          >
            drag to rotate · scroll to zoom · click a node to preview
          </div>
        </div>

        {/* Right sidebar */}
        <div
          className="w-[280px] flex-none flex flex-col border-l overflow-hidden"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Search */}
          <div className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher un fichier…"
              className="w-full bg-transparent text-[11px] font-mono text-slate-300 placeholder-slate-700 outline-none"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                padding: "5px 8px",
              }}
            />
            {search && (
              <div className="text-[9px] font-mono text-slate-700 mt-1">
                {filteredData.nodes.length} résultats
              </div>
            )}
          </div>

          {/* Wing legend / filter */}
          <div className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2">
              Wings
            </div>
            <div className="flex flex-wrap gap-1">
              {wings.map((wing) => {
                const active = activeWings.has(wing);
                const color = WING_COLORS[wing] ?? WING_COLORS.default;
                const count = data.nodes.filter((n) => n.wing === wing).length;
                return (
                  <button
                    key={wing}
                    onClick={() => toggleWing(wing)}
                    className="text-[9px] font-mono px-2 py-0.5 rounded-full transition-all"
                    style={{
                      background: active ? `${color}22` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? color + "50" : "rgba(255,255,255,0.07)"}`,
                      color: active ? color : "#475569",
                    }}
                  >
                    ● {WING_LABELS[wing] ?? wing} <span style={{ opacity: 0.5 }}>{count}</span>
                  </button>
                );
              })}
            </div>
            {activeWings.size > 0 && (
              <button
                onClick={() => setActiveWings(new Set())}
                className="text-[9px] font-mono text-slate-600 hover:text-slate-400 mt-1 transition-colors"
              >
                Effacer filtre
              </button>
            )}
          </div>

          {/* Node list */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mb-2 px-1">
              {search || activeWings.size > 0 ? "Résultats filtrés" : "Tous les fichiers"}
            </div>
            {filteredData.nodes.slice(0, 200).map((node) => {
              const color = WING_COLORS[node.wing] ?? WING_COLORS.default;
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  className="w-full text-left px-2 py-1 rounded mb-0.5 transition-all text-[10px] font-mono"
                  style={{
                    background: isSelected ? `${color}15` : "transparent",
                    border: `1px solid ${isSelected ? color + "30" : "transparent"}`,
                    color: isSelected ? color : "#475569",
                  }}
                  onClick={() => handleNodeClick(node)}
                >
                  <span style={{ color: `${color}80` }}>●</span>{" "}
                  <span className="truncate">{node.name}</span>
                </button>
              );
            })}
            {filteredData.nodes.length > 200 && (
              <div className="text-[9px] font-mono text-slate-700 px-2 py-1">
                +{filteredData.nodes.length - 200} autres (affiner le filtre)
              </div>
            )}
          </div>

          {/* File preview */}
          {(selectedNode || loadingFile) && (
            <div
              className="border-t p-3 flex-none"
              style={{ borderColor: "rgba(255,255,255,0.06)", maxHeight: "220px", overflowY: "auto" }}
            >
              {loadingFile ? (
                <div className="text-[10px] font-mono text-slate-600 animate-pulse">Chargement…</div>
              ) : filePreview ? (
                <>
                  <div className="text-[9px] font-mono text-slate-600 mb-1 truncate">
                    📄 {filePreview.path}
                  </div>
                  <pre
                    className="text-[9px] font-mono text-slate-400 whitespace-pre-wrap break-all leading-relaxed"
                    style={{ maxHeight: "120px", overflow: "hidden" }}
                  >
                    {filePreview.content.slice(0, 600)}
                    {filePreview.content.length > 600 ? "…" : ""}
                  </pre>
                  <div className="flex gap-2 mt-2">
                    {onLoadFile && (
                      <button
                        onClick={handleLoadFile}
                        className="text-[9px] font-mono px-2 py-1 rounded transition-all"
                        style={{
                          background: `${accentColor}20`,
                          border: `1px solid ${accentColor}40`,
                          color: accentColor,
                        }}
                      >
                        Charger dans JARVIS
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(filePreview.content.slice(0, 3000));
                      }}
                      className="text-[9px] font-mono px-2 py-1 rounded transition-all text-slate-600 hover:text-slate-400"
                      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      Copier
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-[10px] font-mono text-slate-700">Fichier indisponible</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
