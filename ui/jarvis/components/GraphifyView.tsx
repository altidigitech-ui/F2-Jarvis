"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { X, Search, ChevronRight } from "lucide-react";

export type ConceptNode = {
  id: string;
  label: string;
  type: string;
  wing: string;
  description: string;
  weight: number;
  x?: number;
  y?: number;
  z?: number;
};

export type ConceptEdge = {
  source: string | ConceptNode;
  target: string | ConceptNode;
  relation: string;
  weight: number;
};

export type ConceptsData = {
  initialized: boolean;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
};

export const TYPE_COLORS: Record<string, string> = {
  principle: "#f06464",
  strategy:  "#5eb5f0",
  pattern:   "#00ffb4",
  technique: "#EF9F27",
  concept:   "#9b8fff",
  channel:   "#00d4aa",
  product:   "#f095c6",
  persona:   "#97C459",
  example:   "#ffeb70",
};

const TYPE_LABELS: Record<string, string> = {
  principle: "Principe",
  strategy:  "Stratégie",
  pattern:   "Pattern",
  technique: "Technique",
  concept:   "Concept",
  channel:   "Canal",
  product:   "Produit",
  persona:   "Persona",
  example:   "Exemple",
};

let _cachedData: ConceptsData | null = null;
let _fetchingPromise: Promise<ConceptsData> | null = null;

export async function fetchConcepts(): Promise<ConceptsData> {
  if (_cachedData) return _cachedData;
  if (_fetchingPromise) return _fetchingPromise;
  _fetchingPromise = fetch("/api/graphify")
    .then((r) => r.json())
    .then((d) => { _cachedData = d; _fetchingPromise = null; return d; })
    .catch(() => { _fetchingPromise = null; return { initialized: false, nodes: [], edges: [] }; });
  return _fetchingPromise;
}

const ForceGraph3D = dynamic(
  async () => {
    const mod = await import("react-force-graph-3d");
    return mod.default;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center text-slate-600 text-[10px] font-mono">
        Chargement du graph 3D…
      </div>
    ),
  }
);

type NodeDetailProps = {
  node: ConceptNode;
  edges: ConceptEdge[];
  allNodes: ConceptNode[];
  accentColor: string;
  onClose: () => void;
  onSendToJarvis: (label: string) => void;
  onSelectNeighbor: (id: string) => void;
};

function NodeDetail({ node, edges, allNodes, accentColor, onClose, onSendToJarvis, onSelectNeighbor }: NodeDetailProps) {
  const nodeColor = TYPE_COLORS[node.type] ?? "#888";
  const neighbors = edges
    .filter((e) => {
      const { src, tgt } = getEdgeIds(e);
      return src === node.id || tgt === node.id;
    })
    .map((e) => {
      const { src, tgt } = getEdgeIds(e);
      const neighborId = src === node.id ? tgt : src;
      const neighborNode = allNodes.find((n) => n.id === neighborId);
      const direction = src === node.id ? "→" : "←";
      return { neighborNode, edge: e, direction };
    })
    .filter((x) => x.neighborNode != null);

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-72 flex flex-col overflow-hidden z-10"
      style={{
        background: "rgba(5, 8, 18, 0.97)",
        borderLeft: `1px solid ${nodeColor}30`,
        boxShadow: `-20px 0 40px rgba(0,0,0,0.5)`,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b flex-none"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: `${nodeColor}20`, color: nodeColor, border: `1px solid ${nodeColor}30` }}
          >
            {TYPE_LABELS[node.type] ?? node.type}
          </span>
          <span className="text-[9px] font-mono text-slate-600">{node.wing}</span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <X size={11} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <h3 className="text-sm font-semibold text-slate-100 mb-3 leading-snug">{node.label}</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{node.description}</p>

          <button
            onClick={() => onSendToJarvis(node.label)}
            className="w-full text-[10px] font-mono py-2 rounded-lg transition-all mb-5"
            style={{
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              color: accentColor,
            }}
          >
            → Envoyer à JARVIS
          </button>

          {neighbors.length > 0 && (
            <>
              <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2">
                Connecté à ({neighbors.length})
              </div>
              <div className="space-y-1">
                {neighbors.map(({ neighborNode, edge, direction }, i) => {
                  if (!neighborNode) return null;
                  const nc = TYPE_COLORS[neighborNode.type] ?? "#888";
                  const rel = typeof edge.relation === "string" ? edge.relation : "";
                  return (
                    <button
                      key={i}
                      onClick={() => onSelectNeighbor(neighborNode.id)}
                      className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-[9px] font-mono text-slate-700">{direction}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-none"
                        style={{ background: nc }}
                      />
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors flex-1 truncate">
                        {neighborNode.label}
                      </span>
                      {rel && (
                        <span className="text-[8px] font-mono text-slate-700 flex-none">{rel}</span>
                      )}
                      <ChevronRight size={10} className="text-slate-700 flex-none" />
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getEdgeIds(e: ConceptEdge): { src: string; tgt: string } {
  const src = typeof e.source === "string" ? e.source : ((e.source as ConceptNode)?.id ?? "");
  const tgt = typeof e.target === "string" ? e.target : ((e.target as ConceptNode)?.id ?? "");
  return { src, tgt };
}

type Props = {
  accentColor: string;
  onSendToJarvis?: (text: string) => void;
  onClose?: () => void;
};

export default function GraphifyView({ accentColor, onSendToJarvis, onClose }: Props) {
  const [data, setData] = useState<ConceptsData>({ initialized: false, nodes: [], edges: [] });
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [selectedNodeEdges, setSelectedNodeEdges] = useState<ConceptEdge[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });

  useEffect(() => {
    fetchConcepts().then((d) => { setData(d); setReady(true); });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    setDims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const nodeColor = useCallback(
    (node: object) => {
      const n = node as ConceptNode;
      const base = TYPE_COLORS[n.type] ?? "#888888";
      if (search) {
        const q = search.toLowerCase();
        const matches = n.label.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
        return matches ? base : "rgba(255,255,255,0.08)";
      }
      if (selectedType && n.type !== selectedType) return "rgba(255,255,255,0.08)";
      return base;
    },
    [search, selectedType]
  );

  const nodeVal = useCallback(
    (node: object) => Math.max(0.5, (node as ConceptNode).weight * 0.7),
    []
  );

  const nodeLabel = useCallback(
    (node: object) => (node as ConceptNode).label,
    []
  );

  const linkColor = useCallback(() => "rgba(255,255,255,0.08)", []);
  const linkWidth = useCallback(
    (link: object) => (link as ConceptEdge).weight * 0.5,
    []
  );

  const handleNodeClick = useCallback(
    (node: object) => {
      const n = node as ConceptNode;
      setSelectedNode(n);
      const edges = (data.edges ?? []).filter((e) => {
        const { src, tgt } = getEdgeIds(e);
        return src === n.id || tgt === n.id;
      });
      setSelectedNodeEdges(edges);
    },
    [data.edges]
  );

  const handleSelectNeighbor = useCallback(
    (id: string) => {
      const n = data.nodes.find((x) => x.id === id);
      if (!n) return;
      handleNodeClick(n);
    },
    [data.nodes, handleNodeClick]
  );

  const handleSendToJarvis = useCallback(
    (label: string) => {
      onSendToJarvis?.(`Explique-moi le concept "${label}" dans le contexte F2/FoundryTwo.`);
      onClose?.();
    },
    [onSendToJarvis, onClose]
  );

  const linksForGraph = useMemo(
    () =>
      data.edges.map((e) => {
        const { src, tgt } = getEdgeIds(e);
        return { source: src, target: tgt, relation: e.relation, weight: e.weight };
      }),
    [data.edges]
  );

  const types = [...new Set(data.nodes.map((n) => n.type))].sort();

  if (!data.initialized && ready) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="text-[11px] font-mono text-slate-600 text-center max-w-xs leading-relaxed">
          Graphify n&apos;est pas initialisé. Lance{" "}
          <code className="text-slate-400">graphify update .</code> dans le repo pour générer le
          graph sémantique F2.
        </div>
        <button
          className="text-[10px] font-mono px-4 py-2 rounded-lg transition-all"
          style={{
            background: `${accentColor}15`,
            border: `1px solid ${accentColor}30`,
            color: accentColor,
          }}
          onClick={() => {
            _cachedData = null;
            fetchConcepts().then((d) => { setData(d); });
          }}
        >
          RÉESSAYER
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b flex-none"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Search size={12} className="text-slate-600 flex-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un concept…"
            className="flex-1 bg-transparent text-[11px] font-mono text-slate-300 placeholder-slate-700 outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              <X size={11} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 flex-none">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(selectedType === t ? null : t)}
              className="text-[8px] font-mono px-1.5 py-1 rounded transition-all"
              style={{
                background: selectedType === t ? `${TYPE_COLORS[t] ?? "#888"}20` : "transparent",
                border: `1px solid ${selectedType === t ? (TYPE_COLORS[t] ?? "#888") + "40" : "rgba(255,255,255,0.06)"}`,
                color: selectedType === t ? (TYPE_COLORS[t] ?? "#888") : "#475569",
              }}
            >
              {TYPE_LABELS[t] ?? t}
            </button>
          ))}
        </div>

        <div className="text-[9px] font-mono text-slate-700 flex-none">
          {data.nodes.length} nodes · {data.edges.length} edges
        </div>
      </div>

      {/* Graph + panel */}
      <div className="flex-1 relative overflow-hidden" ref={containerRef}>
        {ready && data.initialized && data.nodes.length > 0 && (
          <ForceGraph3D
            graphData={{ nodes: data.nodes, links: linksForGraph }}
            width={selectedNode ? dims.w - 288 : dims.w}
            height={dims.h}
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
          />
        )}

        {selectedNode && (
          <NodeDetail
            node={selectedNode}
            edges={selectedNodeEdges}
            allNodes={data.nodes}
            accentColor={accentColor}
            onClose={() => setSelectedNode(null)}
            onSendToJarvis={handleSendToJarvis}
            onSelectNeighbor={handleSelectNeighbor}
          />
        )}
      </div>

      {/* Legend */}
      <div
        className="flex items-center gap-3 px-4 py-2 border-t flex-none overflow-x-auto"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 flex-none">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[8px] font-mono text-slate-600">{TYPE_LABELS[type] ?? type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
