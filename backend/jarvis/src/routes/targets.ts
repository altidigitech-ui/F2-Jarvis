import { Request, Response } from "express";
import { ghRead } from "../lib/github.js";
import { resolveCurrentBatchNumber } from "../lib/batch-number.js";

// Cache 30 min — batch changes rarely during the day
let _cache: { weekNumber: number; data: TargetsResponse; expiresAt: number } | null = null;

export interface PersonaTargets {
  cold: number;
  twEng: number;
  liCom: number;
  reddit: number;
  facebook: number;
  cross: number;
  ph: number;
  ih: number;
  ihPh: number;
  engTarget: number;
  platforms: string[];
  hasIhPh: boolean;
  hasPh: boolean;
  hasIh: boolean;
}

export interface TargetsResponse {
  weekNumber: number;
  batchFile: string;
  fabrice: PersonaTargets;
  romain: PersonaTargets;
  f2: PersonaTargets;
}

const DEFAULTS: Record<"fabrice" | "romain" | "f2", PersonaTargets> = {
  fabrice: {
    cold: 10, twEng: 15, liCom: 15, reddit: 8, facebook: 6, cross: 4,
    ph: 0, ih: 0, ihPh: 0, engTarget: 30,
    platforms: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK"],
    hasIhPh: false, hasPh: false, hasIh: false,
  },
  romain: {
    cold: 10, twEng: 10, liCom: 10, reddit: 8, facebook: 6, cross: 4,
    ph: 0, ih: 0, ihPh: 0, engTarget: 48,
    platforms: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK"],
    hasIhPh: false, hasPh: false, hasIh: false,
  },
  f2: {
    cold: 0, twEng: 10, liCom: 10, reddit: 0, facebook: 0, cross: 4,
    ph: 0, ih: 10, ihPh: 10, engTarget: 34,
    platforms: ["TWITTER", "LINKEDIN", "IH"],
    hasIhPh: true, hasPh: false, hasIh: true,
  },
};

function parseBatch(md: string): { fabrice: Partial<PersonaTargets>; romain: Partial<PersonaTargets>; f2: Partial<PersonaTargets> } {
  const fabrice: Partial<PersonaTargets> = {};
  const romain: Partial<PersonaTargets> = {};
  const f2: Partial<PersonaTargets> = {};

  const fPlatforms = new Set<string>();
  const rPlatforms = new Set<string>();

  let sectionNum = 0;
  let fabriceCold = 0;
  let romainCold = 0;
  // Prevent double-counting the Twitter cascade in section 9
  let fabriceTweetColdSet = false;

  for (const line of md.split("\n")) {
    const raw = line.trim();

    // ── ## N. Section header ──────────────────────────────────────────
    const sec = /^##\s+(\d+)\.\s+(.+)$/.exec(raw);
    if (sec) {
      sectionNum = parseInt(sec[1], 10);
      const title = sec[2].toUpperCase();
      const inFab = sectionNum >= 5 && sectionNum <= 6;
      const inRom = sectionNum >= 3 && sectionNum <= 4;
      const inF2  = sectionNum >= 7 && sectionNum <= 8;
      if (title.includes("TWITTER"))            { if (inFab || (!inRom && !inF2)) fPlatforms.add("TWITTER");  if (inRom || (!inFab && !inF2)) rPlatforms.add("TWITTER"); }
      if (title.includes("LINKEDIN"))           { if (inFab || (!inRom && !inF2)) fPlatforms.add("LINKEDIN"); if (inRom || (!inFab && !inF2)) rPlatforms.add("LINKEDIN"); }
      if (title.includes("REDDIT"))             { if (inFab || (!inRom && !inF2)) fPlatforms.add("REDDIT");   if (inRom || (!inFab && !inF2)) rPlatforms.add("REDDIT"); }
      if (title.includes("FACEBOOK") || title.includes("FB")) { if (inFab || (!inRom && !inF2)) fPlatforms.add("FACEBOOK"); if (inRom || (!inFab && !inF2)) rPlatforms.add("FACEBOOK"); }
      if (title.includes("IH") || title.includes("INDIEHACKER")) { if (inRom || (!inFab && !inF2)) rPlatforms.add("IH"); }
      if (title.includes("PH") || title.includes("PRODUCTHUNT")) { if (inFab || (!inRom && !inF2)) fPlatforms.add("PH"); if (inRom || (!inFab && !inF2)) rPlatforms.add("PH"); }
      continue;
    }

    // ── ### N.N Sub-section header — cold outreach per persona ────────
    // Matches: "### 10.1 Romain LinkedIn DM — 50/semaine (10/jour)"
    // Skips:   "### 10.2 Fabrice Twitter DM — 15/semaine (5/j × 3j)"  (only 3 days)
    const sub = /^###\s+\d+\.\d+\s+(.+)$/.exec(raw);
    if (sub) {
      const subTitle = sub[1];
      const isRomain  = /romain/i.test(subTitle);
      const isFabrice = /fabrice/i.test(subTitle);
      // Only capture strictly (N/jour) — not (N/j × Nj)
      const jourMatch = subTitle.match(/\((\d+)\/jour\)/i);
      if (jourMatch) {
        const num = parseInt(jourMatch[1], 10);
        if (num > 0 && num <= 50) {
          if (isRomain)  romainCold  += num;
          if (isFabrice) fabriceCold += num;
        }
      }
      continue;
    }

    // ── Section 2 — "Volume publication" table: cross-eng per persona ─
    if (sectionNum === 2 && raw.includes("|")) {
      const cells = raw.split("|").map(c => c.trim()).filter(Boolean);
      if (cells.length >= 3) {
        const account   = cells[0];
        const crossCell = cells[2];
        if (/^Twitter F\b/.test(account)) {
          // "12 cross-eng + **70 cold replies/semaine**" → weekly 12
          const m = crossCell.match(/^(\d+)/);
          if (m) fabrice.cross = Math.ceil(parseInt(m[1], 10) / 5);
        }
        if (/^Twitter R\b/.test(account)) {
          // "13 (voir tracker R)" → weekly 13
          const m = crossCell.match(/^(\d+)/);
          if (m) romain.cross = Math.ceil(parseInt(m[1], 10) / 5);
        }
      }
    }

    // ── Section 9 — Replies cascade Twitter F → Fabrice cold ──────────
    // "**Volume cible : 70 replies/semaine** (14/jour × 5 jours, 0 weekend)"
    if (sectionNum === 9 && !raw.includes("|") && !fabriceTweetColdSet) {
      const m = raw.match(/(\d+)\/jour/i);
      if (m) {
        const num = parseInt(m[1], 10);
        if (num > 0 && num <= 50) {
          fabriceCold += num;
          fabriceTweetColdSet = true;
        }
      }
    }
  }

  if (fabriceCold > 0) fabrice.cold = fabriceCold;
  if (romainCold  > 0) romain.cold  = romainCold;
  if (fPlatforms.size > 0) fabrice.platforms = Array.from(fPlatforms);
  if (rPlatforms.size > 0) romain.platforms  = Array.from(rPlatforms);

  return { fabrice, romain, f2 };
}

function buildPersonaTargets(base: PersonaTargets, overrides: Partial<PersonaTargets>): PersonaTargets {
  const basePlatforms = new Set(base.platforms);
  if (overrides.platforms) {
    for (const p of overrides.platforms) basePlatforms.add(p);
  }
  const platforms = Array.from(basePlatforms);
  const hasIh = platforms.includes("IH");
  const hasPh = platforms.includes("PH");
  const hasIhPh = hasIh || hasPh;
  const ih = hasIh ? (overrides.ih ?? base.ih) : 0;
  const ph = hasPh ? (overrides.ph ?? base.ph) : 0;
  const cold = overrides.cold ?? base.cold;
  const twEng = overrides.twEng ?? base.twEng;
  const liCom = overrides.liCom ?? base.liCom;
  const reddit = overrides.reddit ?? base.reddit;
  const facebook = overrides.facebook ?? base.facebook;
  const cross = Math.max(base.cross, overrides.cross ?? base.cross);
  return {
    cold,
    twEng,
    liCom,
    reddit,
    facebook,
    cross,
    ph,
    ih,
    ihPh: ih + ph,
    engTarget: cold + twEng + liCom + reddit + facebook + ih + ph + cross,
    platforms,
    hasIhPh,
    hasPh,
    hasIh,
  };
}

export async function targetsRoute(_req: Request, res: Response): Promise<void> {
  let weekNumber = _cache?.data.weekNumber ?? 1;
  try {
    weekNumber = await resolveCurrentBatchNumber();

    if (_cache && _cache.weekNumber === weekNumber && Date.now() < _cache.expiresAt) {
      res.json(_cache.data);
      return;
    }

    let batchContent: string | null = null;
    let batchFile = `BATCH-SEMAINE-${weekNumber}.md`;

    const primary = await ghRead(batchFile);
    if (primary) {
      batchContent = primary.content;
    } else {
      const fallback = `BATCH-SEMAINE-${weekNumber - 1}.md`;
      const fallbackFile = await ghRead(fallback);
      if (fallbackFile) {
        batchContent = fallbackFile.content;
        batchFile = fallback;
      }
    }

    let overrides: { fabrice: Partial<PersonaTargets>; romain: Partial<PersonaTargets>; f2: Partial<PersonaTargets> } = { fabrice: {}, romain: {}, f2: {} };
    if (batchContent) {
      try {
        overrides = parseBatch(batchContent);
      } catch (parseErr) {
        console.warn("[targets] batch parse error:", parseErr);
      }
    }

    const response: TargetsResponse = {
      weekNumber,
      batchFile,
      fabrice: buildPersonaTargets(DEFAULTS.fabrice, overrides.fabrice),
      romain: buildPersonaTargets(DEFAULTS.romain, overrides.romain),
      f2: buildPersonaTargets(DEFAULTS.f2, overrides.f2),
    };

    _cache = { weekNumber, data: response, expiresAt: Date.now() + 30 * 60 * 1000 };
    res.json(response);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/targets]", err);
    // Return defaults on error so the UI doesn't break
    res.json({
      weekNumber,
      batchFile: `BATCH-SEMAINE-${weekNumber}.md`,
      fabrice: DEFAULTS.fabrice,
      romain: DEFAULTS.romain,
      f2: DEFAULTS.f2,
    });
  }
}
