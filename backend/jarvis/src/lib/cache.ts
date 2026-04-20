/**
 * Simple in-memory cache for ghRead.
 * TTL: 5 min. Invalidation: manual via invalidate(path) after any commit.
 * Process-local — resets on Railway restart (acceptable).
 */

type CacheEntry = { content: string; sha: string; expiresAt: number };

const CACHE_TTL = 5 * 60 * 1000;
const _cache = new Map<string, CacheEntry>();

export function cacheGet(path: string): { content: string; sha: string } | null {
  const entry = _cache.get(path);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    _cache.delete(path);
    return null;
  }
  return { content: entry.content, sha: entry.sha };
}

export function cacheSet(path: string, content: string, sha: string): void {
  _cache.set(path, { content, sha, expiresAt: Date.now() + CACHE_TTL });
}

export function cacheInvalidate(path: string): void {
  _cache.delete(path);
}

export function cacheInvalidateAll(): void {
  _cache.clear();
}

export function cacheStats(): { size: number; paths: string[] } {
  return { size: _cache.size, paths: Array.from(_cache.keys()) };
}
