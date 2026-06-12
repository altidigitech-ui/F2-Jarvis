import { ghList } from "./github.js";

const BATCH_DIR = "marketing/contenu/batch-semaine";
const BATCH_RE = /^batch-semaine-S(\d+)\.md$/i;
const CACHE_MS = 30 * 60 * 1000;

let _cache: { number: number; expiresAt: number } | null = null;

export async function resolveCurrentBatchNumber(): Promise<number> {
  if (_cache && Date.now() < _cache.expiresAt) {
    return _cache.number;
  }

  try {
    const entries = await ghList(BATCH_DIR);
    let max = 0;
    for (const entry of entries) {
      const m = BATCH_RE.exec(entry.name);
      if (m) {
        const n = parseInt(m[1], 10);
        if (n > max) max = n;
      }
    }
    const number = max > 0 ? max : 1;
    _cache = { number, expiresAt: Date.now() + CACHE_MS };
    return number;
  } catch {
    return _cache?.number ?? 1;
  }
}
