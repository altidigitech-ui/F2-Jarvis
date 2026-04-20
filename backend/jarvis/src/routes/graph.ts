import { Request, Response } from "express";
import { readdir, readFile, stat } from "fs/promises";
import path from "path";

const REPO_ROOT = process.env.REPO_ROOT || path.resolve(process.cwd(), "../..");

type GraphNode = { id: string; name: string; wing: string; size: number; val: number };
type GraphLink = { source: string; target: string; type: "wikilink" | "folder" };
type GraphData = { nodes: GraphNode[]; links: GraphLink[] };

let _cache: { data: GraphData; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

const IGNORE = new Set([".git", "node_modules", "dist", ".next", ".vercel"]);

const WING_MAP: Record<string, string> = {
  "f2":               "f2-core",
  "strategie":        "strategie",
  "produits":         "produits",
  "f2-compte":        "f2-compte",
  "romain":           "romain",
  "fabrice":          "fabrice",
  "growth-marketing": "growth-marketing",
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
};

function detectWing(relPath: string): string {
  return WING_MAP[relPath.split("/")[0]] ?? "default";
}

async function walkMd(dir: string, depth = 0): Promise<string[]> {
  if (depth > 8) return [];
  const out: string[] = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (IGNORE.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walkMd(full, depth + 1));
    else if (e.isFile() && e.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function extractLinks(content: string, allIds: Set<string>, fileDir: string): string[] {
  const targets: string[] = [];

  // [[wiki-links]] with optional [[file|alias]]
  for (const m of content.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?]]/g)) {
    const ref = m[1].trim();
    for (const id of allIds) {
      if (path.basename(id, ".md") === ref || id === ref || id.endsWith(`/${ref}.md`)) {
        targets.push(id);
        break;
      }
    }
  }

  // [text](relative-path.md)
  for (const m of content.matchAll(/\[[^\]]*]\(([^)]+\.md)\)/g)) {
    const rel = m[1];
    if (rel.startsWith("http")) continue;
    const abs = path.normalize(path.join(fileDir, rel));
    const relId = path.relative(REPO_ROOT, abs).replace(/\\/g, "/");
    if (allIds.has(relId)) targets.push(relId);
  }

  return [...new Set(targets)];
}

async function buildGraph(): Promise<GraphData> {
  const allPaths = await walkMd(REPO_ROOT);
  const allIds = new Set(allPaths.map(p => path.relative(REPO_ROOT, p).replace(/\\/g, "/")));
  const nodes: GraphNode[] = [];

  for (const fp of allPaths) {
    const id = path.relative(REPO_ROOT, fp).replace(/\\/g, "/");
    let size = 0;
    try { size = (await stat(fp)).size; } catch { /* ignore */ }
    nodes.push({
      id,
      name: path.basename(id, ".md"),
      wing: detectWing(id),
      size,
      val: Math.max(0.5, Math.log10(size + 10) * 1.8),
    });
  }

  const links: GraphLink[] = [];
  const seen = new Set<string>();

  for (const fp of allPaths) {
    const id = path.relative(REPO_ROOT, fp).replace(/\\/g, "/");
    let content = "";
    try { content = await readFile(fp, "utf-8"); } catch { continue; }

    for (const target of extractLinks(content, allIds, path.dirname(fp))) {
      if (target === id) continue;
      const key = [id, target].sort().join("→");
      if (!seen.has(key)) {
        seen.add(key);
        links.push({ source: id, target, type: "wikilink" });
      }
    }
  }

  // Folder links: star topology, max 4 siblings per folder
  const byDir = new Map<string, string[]>();
  for (const n of nodes) {
    const d = path.dirname(n.id);
    if (!byDir.has(d)) byDir.set(d, []);
    byDir.get(d)!.push(n.id);
  }
  for (const [, files] of byDir) {
    if (files.length < 2) continue;
    const anchor = files[0];
    for (let i = 1; i < Math.min(files.length, 5); i++) {
      const key = [anchor, files[i]].sort().join("→");
      if (!seen.has(key)) {
        seen.add(key);
        links.push({ source: anchor, target: files[i], type: "folder" });
      }
    }
  }

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
    console.error("graph error:", err);
    res.json({ nodes: [], links: [] });
  }
}
