import { inflateRawSync } from "node:zlib";
import { randomUUID } from "node:crypto";

interface ZipEntry {
  filename: string;
  content: string | null;
}
interface ZipStore {
  filename: string;
  entries: ZipEntry[];
  expiresAt: number;
}

const store = new Map<string, ZipStore>();

setInterval(() => {
  const now = Date.now();
  for (const [id, s] of store) if (s.expiresAt < now) store.delete(id);
}, 30 * 60 * 1000).unref();

const TTL = 2 * 60 * 60 * 1000;
const MAX_FILES = 120;
const SKIP = ["node_modules/", ".git/", "dist/", ".next/", "__pycache__/"];
const TEXT = [".ts",".tsx",".js",".jsx",".json",".md",".txt",".yaml",".yml",".env",".sh",".py",".css",".html",".sql",".toml",".xml",".csv"];

const isText = (n: string) => TEXT.some(e => n.toLowerCase().endsWith(e));
const skip   = (n: string) => SKIP.some(d => n.includes(d));

function parseZip(buf: Buffer): ZipEntry[] {
  const entries: ZipEntry[] = [];
  let i = 0;
  while (i < buf.length - 4) {
    if (buf.readUInt32LE(i) !== 0x04034b50) { i++; continue; }
    const compression  = buf.readUInt16LE(i + 8);
    const compSize     = buf.readUInt32LE(i + 18);
    const fnLen        = buf.readUInt16LE(i + 26);
    const extraLen     = buf.readUInt16LE(i + 28);
    const filename     = buf.subarray(i + 30, i + 30 + fnLen).toString("utf8");
    const dataStart    = i + 30 + fnLen + extraLen;
    i = dataStart + compSize;
    if (filename.endsWith("/") || skip(filename) || entries.length >= MAX_FILES) continue;
    try {
      const raw = buf.subarray(dataStart, dataStart + compSize);
      if (!isText(filename)) { entries.push({ filename, content: null }); continue; }
      const content = compression === 0
        ? raw.toString("utf8")
        : compression === 8
          ? inflateRawSync(raw).toString("utf8")
          : null;
      entries.push({ filename, content });
    } catch { entries.push({ filename, content: null }); }
  }
  return entries;
}

export function storeZip(filename: string, base64data: string): { zip_id: string; files: string[]; count: number } {
  const entries = parseZip(Buffer.from(base64data, "base64"));
  const zip_id  = `zip_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
  store.set(zip_id, { filename, entries, expiresAt: Date.now() + TTL });
  return { zip_id, files: entries.map(e => e.filename), count: entries.length };
}

export function readZipFile(zip_id: string, path: string): string | null {
  const s = store.get(zip_id);
  if (!s || s.expiresAt < Date.now()) return null;
  const e = s.entries.find(e => e.filename === path)
         ?? s.entries.find(e => e.filename.endsWith("/" + path) || e.filename.includes(path));
  if (!e) return null;
  return e.content ?? `[Binary file — cannot display: ${e.filename}]`;
}

export function listZipFiles(zip_id: string): string[] | null {
  const s = store.get(zip_id);
  if (!s || s.expiresAt < Date.now()) return null;
  return s.entries.map(e => e.filename);
}

export function getZipMeta(zip_id: string): { filename: string; count: number } | null {
  const s = store.get(zip_id);
  if (!s || s.expiresAt < Date.now()) return null;
  return { filename: s.filename, count: s.entries.length };
}
