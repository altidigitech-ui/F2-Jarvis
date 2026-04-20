import { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import Fuse from "fuse.js";

const REPO_ROOT = process.env.REPO_ROOT || path.resolve(process.cwd(), "../..");
const CONCEPTS_PATH = path.join(REPO_ROOT, "graphify-out/concepts.json");
const CACHE_TTL = 10 * 60 * 1000;

export type ConceptNode = {
  id: string;
  label: string;
  type: string;
  wing: string;
  description: string;
  weight: number;
};

export type ConceptEdge = {
  source: string;
  target: string;
  relation: string;
  weight: number;
};

type ConceptsData = {
  version: string;
  generated: string;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
};

type GraphifyResponse =
  | { initialized: false }
  | { initialized: true; nodes: ConceptNode[]; edges: ConceptEdge[] };

let _cache: { data: ConceptsData; ts: number } | null = null;

async function loadConcepts(): Promise<ConceptsData | null> {
  if (_cache && Date.now() - _cache.ts < CACHE_TTL) return _cache.data;
  try {
    const raw = await readFile(CONCEPTS_PATH, "utf-8");
    const data = JSON.parse(raw) as ConceptsData;
    _cache = { data, ts: Date.now() };
    return data;
  } catch {
    return null;
  }
}

function getNeighbors(nodeId: string, edges: ConceptEdge[], nodes: ConceptNode[], depth: number): ConceptNode[] {
  const visited = new Set<string>([nodeId]);
  let frontier = [nodeId];

  for (let d = 0; d < depth; d++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const e of edges) {
        if (e.source === id && !visited.has(e.target)) {
          visited.add(e.target);
          next.push(e.target);
        }
        if (e.target === id && !visited.has(e.source)) {
          visited.add(e.source);
          next.push(e.source);
        }
      }
    }
    frontier = next;
    if (next.length === 0) break;
  }

  visited.delete(nodeId);
  return nodes.filter((n) => visited.has(n.id));
}

export async function graphifyRoute(_req: Request, res: Response): Promise<void> {
  const data = await loadConcepts();
  if (!data) {
    res.json({ initialized: false } satisfies GraphifyResponse);
    return;
  }
  res.json({ initialized: true, nodes: data.nodes, edges: data.edges } satisfies GraphifyResponse);
}

export async function graphifyNodeRoute(req: Request, res: Response): Promise<void> {
  const data = await loadConcepts();
  if (!data) { res.status(404).json({ error: "Not initialized" }); return; }

  const node = data.nodes.find((n) => n.id === req.params.id);
  if (!node) { res.status(404).json({ error: "Node not found" }); return; }

  const neighbors = getNeighbors(node.id, data.edges, data.nodes, 1);
  const edges = data.edges.filter((e) => e.source === node.id || e.target === node.id);
  res.json({ node, neighbors, edges });
}

export async function graphifySearchRoute(req: Request, res: Response): Promise<void> {
  const q = String(req.query.q ?? "").trim();
  if (!q) { res.json({ results: [] }); return; }

  const data = await loadConcepts();
  if (!data) { res.json({ results: [] }); return; }

  const fuse = new Fuse(data.nodes, {
    keys: ["label", "description", "type", "wing"],
    threshold: 0.4,
    includeScore: true,
  });

  const hits = fuse.search(q, { limit: 10 });
  res.json({ results: hits.map((h) => ({ ...h.item, score: h.score ?? 1 })) });
}

export async function graphifyRelatedRoute(req: Request, res: Response): Promise<void> {
  const from = String(req.query.from ?? "");
  const depth = Math.min(Number(req.query.depth ?? 2), 3);

  const data = await loadConcepts();
  if (!data) { res.json({ nodes: [], edges: [] }); return; }

  const node = data.nodes.find((n) => n.id === from);
  if (!node) { res.status(404).json({ error: "Node not found" }); return; }

  const related = getNeighbors(from, data.edges, data.nodes, depth);
  const relatedIds = new Set([from, ...related.map((n) => n.id)]);
  const relevantEdges = data.edges.filter((e) => relatedIds.has(e.source) && relatedIds.has(e.target));

  res.json({ root: node, nodes: related, edges: relevantEdges });
}

export async function buildGraphifyContext(message: string): Promise<string> {
  const data = await loadConcepts();
  if (!data) return "";

  const fuse = new Fuse(data.nodes, {
    keys: ["label", "description", "type", "wing"],
    threshold: 0.35,
    includeScore: true,
  });

  const hits = fuse.search(message, { limit: 4 });
  if (hits.length === 0) return "";

  const lines: string[] = ["\n---\n\n## Graphify — concepts pertinents\n"];
  for (const h of hits) {
    const node = h.item;
    const neighbors = getNeighbors(node.id, data.edges, data.nodes, 1);
    const neighborList = neighbors
      .slice(0, 4)
      .map((n) => {
        const edge = data.edges.find(
          (e) => (e.source === node.id && e.target === n.id) || (e.target === node.id && e.source === n.id)
        );
        return `${n.label} (${n.type}, poids ${edge?.weight ?? "?"})`;
      })
      .join(", ");

    lines.push(
      `**Concept: ${node.label}** [G:${node.id}] (${node.type}, ${node.wing})`,
      `Description: ${node.description}`,
      neighborList ? `Lié à: ${neighborList}` : "",
      ""
    );
  }

  lines.push(
    "Si tu utilises un concept Graphify pour répondre, cite-le ainsi : [G:concept-id] (ex: [G:hook-technique]). Ces citations seront affichées visuellement dans l'interface."
  );

  return lines.filter((l) => l !== "").join("\n");
}
