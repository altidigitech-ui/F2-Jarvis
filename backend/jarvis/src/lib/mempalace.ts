import Fuse from "fuse.js";

const OWNER = "altidigitech-ui";
const REPO = "F2-Jarvis";
const BRANCH = "main";
const CACHE_TTL = 10 * 60 * 1000; // 10 min
const FETCH_CONCURRENCY = 10;

export interface Drawer {
  wing: string;
  filename: string;
  path: string;
  tags: string[];
  date: string;
  source: string;
  content: string;
}

export interface SearchResult extends Drawer {
  score: number;
}

interface Cache {
  drawers: Drawer[];
  index: Fuse<Drawer> | null;
  expiresAt: number;
}

let _cache: Cache = { drawers: [], index: null, expiresAt: 0 };

function githubHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  const h: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

type TreeEntry = { path?: string; type?: string };

async function fetchDrawerPaths(): Promise<string[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) throw new Error(`GitHub tree API ${res.status}`);
  const json = await res.json() as { tree: TreeEntry[] };
  return json.tree
    .filter((e) => e.type === "blob" && e.path?.startsWith("brain/mempalace/wings/") && e.path.endsWith(".md"))
    .map((e) => e.path!);
}

async function fetchFile(filePath: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: githubHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json() as { content: string };
  return Buffer.from(data.content, "base64").toString("utf-8");
}

function parseFrontMatter(raw: string): { meta: Record<string, string | string[]>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };
  const meta: Record<string, string | string[]> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    // Handle inline YAML arrays: [a, b, c]
    if (val.startsWith("[") && val.endsWith("]")) {
      meta[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      meta[key] = val.replace(/^['"]|['"]$/g, "");
    }
  }
  return { meta, body: match[2].trim() };
}

function pathToDrawer(filePath: string, rawContent: string): Drawer | null {
  // Expected: brain/mempalace/wings/<wing>/drawers/<filename>.md
  const parts = filePath.split("/");
  // parts: ["brain", "mempalace", "wings", "<wing>", "drawers", "<filename>.md"]
  if (parts.length < 6) return null;
  const wingIdx = parts.indexOf("wings");
  if (wingIdx === -1) return null;
  const wing = parts[wingIdx + 1];
  const filename = parts[parts.length - 1].replace(/\.md$/, "");

  const { meta, body } = parseFrontMatter(rawContent);
  return {
    wing,
    filename,
    path: filePath,
    tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags as string] : []),
    date: (meta.date as string) || "",
    source: (meta.source as string) || "",
    content: body,
  };
}

async function fetchInBatches(paths: string[]): Promise<(string | null)[]> {
  const results: (string | null)[] = [];
  for (let i = 0; i < paths.length; i += FETCH_CONCURRENCY) {
    const batch = paths.slice(i, i + FETCH_CONCURRENCY);
    const settled = await Promise.all(batch.map((p) => fetchFile(p)));
    results.push(...settled);
  }
  return results;
}

async function buildIndex(): Promise<Cache> {
  let paths: string[];
  try {
    paths = await fetchDrawerPaths();
  } catch (err) {
    console.warn("[mempalace] Failed to fetch drawer paths:", err);
    return { drawers: [], index: null, expiresAt: Date.now() + CACHE_TTL };
  }

  if (paths.length === 0) {
    console.log("[mempalace] No drawers found — MemPalace is empty");
    return { drawers: [], index: null, expiresAt: Date.now() + CACHE_TTL };
  }

  console.log(`[mempalace] Indexing ${paths.length} drawers…`);
  const contents = await fetchInBatches(paths);

  const drawers: Drawer[] = [];
  for (let i = 0; i < paths.length; i++) {
    const raw = contents[i];
    if (!raw) continue;
    const drawer = pathToDrawer(paths[i], raw);
    if (drawer) drawers.push(drawer);
  }

  const index = new Fuse(drawers, {
    keys: [
      { name: "content", weight: 0.6 },
      { name: "filename", weight: 0.2 },
      { name: "tags", weight: 0.15 },
      { name: "wing", weight: 0.05 },
    ],
    threshold: 0.5,
    includeScore: true,
    minMatchCharLength: 2,
  });

  console.log(`[mempalace] Index ready — ${drawers.length} drawers`);
  return { drawers, index, expiresAt: Date.now() + CACHE_TTL };
}

async function getIndex(): Promise<Cache> {
  if (Date.now() < _cache.expiresAt && (_cache.index || _cache.drawers.length === 0)) {
    return _cache;
  }
  _cache = await buildIndex();
  return _cache;
}

export async function searchDrawers(
  query: string,
  options: { wing?: string; limit?: number } = {}
): Promise<SearchResult[]> {
  const { wing, limit = 5 } = options;
  try {
    const { index, drawers } = await getIndex();
    if (!index || drawers.length === 0) return [];

    let pool = drawers;
    if (wing) {
      pool = drawers.filter((d) => d.wing === wing);
      if (pool.length === 0) return [];
      const wingIndex = new Fuse(pool, {
        keys: [
          { name: "content", weight: 0.6 },
          { name: "filename", weight: 0.2 },
          { name: "tags", weight: 0.15 },
        ],
        threshold: 0.5,
        includeScore: true,
        minMatchCharLength: 2,
      });
      return wingIndex.search(query, { limit }).map((r) => ({ ...r.item, score: r.score ?? 1 }));
    }

    return index.search(query, { limit }).map((r) => ({ ...r.item, score: r.score ?? 1 }));
  } catch (err) {
    console.error("[mempalace] searchDrawers error:", err);
    return [];
  }
}

export async function getDrawerCount(): Promise<number> {
  try {
    const { drawers } = await getIndex();
    return drawers.length;
  } catch {
    return 0;
  }
}

export interface WingInfo {
  id: string;
  name: string;
  drawerCount: number;
  lastUpdate: string;
}

export interface DrawerSummary {
  id: string;
  filename: string;
  title: string;
  preview: string;
  tags: string[];
  date: string;
  source: string;
  size: number;
}

export interface DrawerFull {
  wing: string;
  filename: string;
  frontMatter: { tags: string[]; date: string; source: string };
  content: string;
  wikiLinks: string[];
}

export interface MemPalaceStats {
  totalDrawers: number;
  totalWings: number;
  byWing: Record<string, number>;
  lastUpdate: string;
  oldestDrawer: string;
  newestDrawer: string;
}

function extractTitle(content: string, filename: string): string {
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return filename.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function wingIdToName(id: string): string {
  return id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function getWings(): Promise<WingInfo[]> {
  const { drawers } = await getIndex();
  const map = new Map<string, { count: number; dates: string[] }>();
  for (const d of drawers) {
    if (!map.has(d.wing)) map.set(d.wing, { count: 0, dates: [] });
    const entry = map.get(d.wing)!;
    entry.count++;
    if (d.date) entry.dates.push(d.date);
  }
  return Array.from(map.entries()).map(([id, { count, dates }]) => ({
    id,
    name: wingIdToName(id),
    drawerCount: count,
    lastUpdate: dates.sort().pop() || "",
  }));
}

export async function getWingDrawers(wingId: string): Promise<DrawerSummary[]> {
  const { drawers } = await getIndex();
  return drawers
    .filter((d) => d.wing === wingId)
    .map((d) => ({
      id: d.filename,
      filename: d.filename,
      title: extractTitle(d.content, d.filename),
      preview: d.content.replace(/^#.*$/m, "").trim().slice(0, 100),
      tags: d.tags,
      date: d.date,
      source: d.source,
      size: d.content.length,
    }));
}

export async function getDrawerFull(wing: string, filename: string): Promise<DrawerFull | null> {
  const { drawers } = await getIndex();
  const d = drawers.find((x) => x.wing === wing && x.filename === filename);
  if (!d) return null;
  const wikiLinks = [...d.content.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[0]);
  return {
    wing: d.wing,
    filename: d.filename,
    frontMatter: { tags: d.tags, date: d.date, source: d.source },
    content: d.content,
    wikiLinks,
  };
}

export function invalidateMempalaceCache(): void {
  _cache.expiresAt = 0;
}

export async function getStats(): Promise<MemPalaceStats> {
  const { drawers } = await getIndex();
  const byWing: Record<string, number> = {};
  const dates: string[] = [];
  for (const d of drawers) {
    byWing[d.wing] = (byWing[d.wing] || 0) + 1;
    if (d.date) dates.push(d.date);
  }
  dates.sort();
  return {
    totalDrawers: drawers.length,
    totalWings: Object.keys(byWing).length,
    byWing,
    lastUpdate: dates[dates.length - 1] || "",
    oldestDrawer: dates[0] || "",
    newestDrawer: dates[dates.length - 1] || "",
  };
}
