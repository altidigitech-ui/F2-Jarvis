import { Request, Response } from "express";

const OWNER = "altidigitech-ui";
const REPO  = "F2-Jarvis";
const REF   = "main";

type GraphNode = { id: string; name: string; wing: string; size: number; val: number };
type GraphLink = { source: string; target: string; type: "wikilink" | "folder" };
type GraphData = { nodes: GraphNode[]; links: GraphLink[] };

let _cache: { data: GraphData; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

const SKIP_PREFIXES = [
  "node_modules/",
  "ui/jarvis/node_modules/",
  "backend/jarvis/node_modules/",
  "ui/jarvis/.next/",
  "ui/jarvis/dist/",
  ".git/",
  "backend/jarvis/dist/",
];

const WING_MAP: Record<string, string> = {
  "f2":               "f2-core",
  "strategie":        "strategie",
  "produits":         "produits",
  "f2-compte":        "f2-compte",
  "romain":           "romain",
  "fabrice":          "fabrice",
  "growth-marketing": "growth-marketing",
  "growth":           "growth-marketing",
  "distribution":     "distribution",
  "marketing":        "marketing",
  "saas":             "saas",
  "la-toile":         "la-toile",
  "patterns":         "patterns",
  ".claude":          "claude-config",
  "brain":            "f2-core",
  "ops":              "f2-core",
  "tracking":         "f2-core",
  "asset-brand":      "f2-core",
  "archives":         "f2-core",
  "raw":              "f2-core",
  "ouroboros":        "f2-core",
  "mempalace":        "f2-core",
};

function detectWing(filePath: string): string {
  return WING_MAP[filePath.split("/")[0]] ?? "default";
}

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const h: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

type TreeEntry = { path?: string; type?: string; size?: number; sha?: string };

async function fetchRepoTree(): Promise<TreeEntry[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${REF}?recursive=1`;
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub tree API ${res.status}: ${body.slice(0, 200)}`);
  }
  const json = await res.json() as { tree: TreeEntry[]; truncated?: boolean };
  if (json.truncated) {
    console.warn("[graph] GitHub tree truncated — some files may be missing");
  }
  return json.tree;
}

async function buildGraph(): Promise<GraphData> {
  const tree = await fetchRepoTree();

  const mdFiles = tree.filter((e) => {
    if (e.type !== "blob") return false;
    const p = e.path ?? "";
    if (!p.endsWith(".md")) return false;
    return !SKIP_PREFIXES.some((prefix) => p.startsWith(prefix));
  });

  const nodes: GraphNode[] = mdFiles.map((e) => {
    const id = e.path!;
    const size = e.size ?? 0;
    return {
      id,
      name: id.split("/").pop()!.replace(/\.md$/, ""),
      wing: detectWing(id),
      size,
      val: Math.max(0.5, Math.log10(size + 10) * 1.8),
    };
  });

  // Folder links — chain pattern: file[i] → file[i+1] within the same folder
  const byFolder = new Map<string, string[]>();
  for (const n of nodes) {
    const folder = n.id.includes("/") ? n.id.split("/").slice(0, -1).join("/") : ".";
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder)!.push(n.id);
  }

  const links: GraphLink[] = [];
  for (const [, files] of byFolder) {
    if (files.length < 2) continue;
    for (let i = 0; i < files.length - 1; i++) {
      links.push({ source: files[i], target: files[i + 1], type: "folder" });
    }
  }

  console.log(`[graph] ${nodes.length} nodes, ${links.length} folder links`);
  return { nodes, links };
}

export async function graphRoute(_req: Request, res: Response): Promise<void> {
  if (_cache && Date.now() - _cache.ts < CACHE_TTL) {
    res.json(_cache.data);
    return;
  }
  try {
    const data = await buildGraph();
    _cache = { data, ts: Date.now() };
    res.json(data);
  } catch (err) {
    console.error("[graph] build failed:", err);
    res.status(500).json({
      error: "Graph build failed — check GITHUB_TOKEN and Railway logs",
      nodes: [],
      links: [],
    });
  }
}
