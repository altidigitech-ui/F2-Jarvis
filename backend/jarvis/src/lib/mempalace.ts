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
