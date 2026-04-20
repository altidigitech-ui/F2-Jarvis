"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

export type GraphNode = {
  id: string;
  name: string;
  wing: string;
  size: number;
  val: number;
  // react-force-graph-3d adds x/y/z after layout
  x?: number;
  y?: number;
  z?: number;
};

export type GraphLink = {
  source: string | GraphNode;
  target: string | GraphNode;
  type: "wikilink" | "folder";
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export const WING_COLORS: Record<string, string> = {
  "f2-core":          "#00ffb4",
  "strategie":        "#5eb5f0",
  "produits":         "#f095c6",
  "f2-compte":        "#97C459",
  "romain":           "#00ffcc",
  "fabrice":          "#9b8fff",
  "growth-marketing": "#EF9F27",
  "distribution":     "#F09595",
  "marketing":        "#ffeb70",
  "saas":             "#b3a8ff",
  "la-toile":         "#6d5fe0",
  "patterns":         "#00b890",
  "claude-config":    "#888888",
  "default":          "#334455",
};

// Client-side graph cache to avoid refetching
let _cachedData: GraphData | null = null;
let _fetchingPromise: Promise<GraphData> | null = null;

const FALLBACK: GraphData = {
  nodes: Object.keys(WING_COLORS).slice(0, 13).map((wing) => ({
    id: wing, name: wing.replace(/-/g, " "), wing, size: 1000, val: 3,
  })),
  links: [],
};

export async function fetchGraph(): Promise<GraphData> {
  if (_cachedData) return _cachedData;
  if (_fetchingPromise) return _fetchingPromise;
  _fetchingPromise = fetch("/api/graph")
    .then((r) => r.json())
    .then((d) => { _cachedData = d; _fetchingPromise = null; return d; })
    .catch(() => { _fetchingPromise = null; return FALLBACK; });
  return _fetchingPromise;
}

// Loaded lazily — browser-only (uses WebGL)
const ForceGraph3D = dynamic(
  () => import("react-force-graph-3d").then((m) => (m as { default: unknown }).default as React.ComponentType<Record<string, unknown>>),
  { ssr: false }
);

type Props = {
  persona: "romain" | "fabrice";
  mode: "normal" | "f2";
  onExpand?: () => void;
};

export default function RepoGraph3D({ persona, mode, onExpand }: Props) {
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const accentColor =
    mode === "f2" ? "#97C459" : persona === "romain" ? "#00ffb4" : "#9b8fff";

  useEffect(() => {
    fetchGraph().then((d) => { setData(d); setReady(true); });
  }, []);

  const nodeColor = useCallback(
    (node: object) => WING_COLORS[(node as GraphNode).wing] ?? WING_COLORS.default,
    []
  );
  const nodeVal = useCallback(
    (node: object) => Math.max(0.4, (node as GraphNode).val * 0.55),
    []
  );
  const linkColor = useCallback(() => "rgba(255,255,255,0.05)", []);
  const linkWidth = useCallback(
    (link: object) => ((link as GraphLink).type === "wikilink" ? 0.8 : 0.2),
    []
  );

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group"
      onClick={onExpand}
      ref={containerRef}
    >
      <div
        style={{
          width: "175px",
          height: "175px",
          overflow: "hidden",
          borderRadius: "6px",
          // Absorb pointer events so OrbitControls doesn't hijack sidebar clicks
          pointerEvents: "none",
        }}
      >
        {ready && (
          <ForceGraph3D
            graphData={data}
            width={175}
            height={175}
            backgroundColor="#020612"
            nodeColor={nodeColor}
            nodeVal={nodeVal}
            linkColor={linkColor}
            linkWidth={linkWidth}
            showNavInfo={false}
            enableNodeDrag={false}
            cooldownTime={2500}
          />
        )}
      </div>

      <div
        className="text-[9px] font-mono tracking-widest opacity-40 group-hover:opacity-90 transition-opacity mt-1"
        style={{ color: accentColor }}
      >
        ◉ EXPAND GRAPH
      </div>
    </div>
  );
}
