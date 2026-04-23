import { ghList } from "./github.js";

const BATCH_RE = /^BATCH-SEMAINE-(\d+)\.md$/;
const CACHE_MS = 30 * 60 * 1000;

let _cache: { number: number; expiresAt: number } | null = null;

export async function resolveCurrentBatchNumber(): Promise<number> {
  if (_cache && Date.now() < _cache.expiresAt) {
    return _cache.number;
  }

  try {
    const entries = await ghList("");
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
