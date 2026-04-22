import { Request, Response } from "express";
import { ghRead } from "../lib/github.js";

// Week 1 = 6 April 2026 (Monday)
const WEEK_EPOCH = new Date("2026-04-06T00:00:00+02:00").getTime();
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

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
}

const DEFAULTS: Record<"fabrice" | "romain", PersonaTargets> = {
  fabrice: {
    cold: 10, twEng: 15, liCom: 15, reddit: 8, facebook: 6, cross: 2,
    ph: 0, ih: 0, ihPh: 0, engTarget: 30,
    platforms: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK"],
    hasIhPh: false, hasPh: false, hasIh: false,
  },
  romain: {
    cold: 10, twEng: 10, liCom: 10, reddit: 8, facebook: 6, cross: 2,
    ph: 5, ih: 5, ihPh: 5, engTarget: 30,
    platforms: ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "IH", "PH"],
    hasIhPh: true, hasPh: true, hasIh: true,
  },
};

function currentWeekNumber(): number {
  const now = Date.now();
  return Math.max(1, Math.floor((now - WEEK_EPOCH) / WEEK_MS) + 1);
}

function extractNumber(text: string): number | null {
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function parseBatch(md: string): { fabrice: Partial<PersonaTargets>; romain: Partial<PersonaTargets> } {
  const fabrice: Partial<PersonaTargets> = {};
  const romain: Partial<PersonaTargets> = {};

  const lines = md.split("\n");
  let currentSection = "";

  for (const line of lines) {
    const secMatch = /^##\s+\d+\.\s+(.+)$/.exec(line.trim());
    if (secMatch) {
      currentSection = secMatch[1].toUpperCase();
      continue;
    }

    // Detect platforms from section headers (## POSTS TWITTER, ## POSTS LINKEDIN etc.)
    if (currentSection.includes("POSTS TWITTER")) {
      if (line.includes("FABRICE") || line.toLowerCase().includes("fabrice")) fabrice.platforms = [...(fabrice.platforms || []), "TWITTER"];
      if (line.includes("ROMAIN") || line.toLowerCase().includes("romain")) romain.platforms = [...(romain.platforms || []), "TWITTER"];
    }

    // Cold outreach target
    if (currentSection.includes("COLD") && (line.toLowerCase().includes("/jour") || line.toLowerCase().includes("par jour"))) {
      const num = extractNumber(line);
      if (num !== null) {
        fabrice.cold = num;
        romain.cold = num;
      }
    }
  }

  // Detect active platforms from section names
  const fPlatforms: Set<string> = new Set();
  const rPlatforms: Set<string> = new Set();

  let currentSectionName = "";
  let inFabriceSection = false;
  let inRomainSection = false;
  let inF2Section = false;

  for (const line of lines) {
    const secMatch = /^##\s+(\d+)\.\s+(.+)$/.exec(line.trim());
    if (secMatch) {
      const secNum = parseInt(secMatch[1], 10);
      const secTitle = secMatch[2].toUpperCase();
      currentSectionName = secTitle;

      // Sections 5-6 are Fabrice, 3-4 are Romain, 7-8 are F2 (based on batch structure)
      inFabriceSection = secNum >= 5 && secNum <= 6;
      inRomainSection = secNum >= 3 && secNum <= 4;
      inF2Section = secNum >= 7 && secNum <= 8;

      if (secTitle.includes("TWITTER")) {
        if (inFabriceSection || (!inRomainSection && !inF2Section)) fPlatforms.add("TWITTER");
        if (inRomainSection || (!inFabriceSection && !inF2Section)) rPlatforms.add("TWITTER");
      }
      if (secTitle.includes("LINKEDIN")) {
        if (inFabriceSection || (!inRomainSection && !inF2Section)) fPlatforms.add("LINKEDIN");
        if (inRomainSection || (!inFabriceSection && !inF2Section)) rPlatforms.add("LINKEDIN");
      }
      if (secTitle.includes("REDDIT")) {
        if (inFabriceSection || (!inRomainSection && !inF2Section)) fPlatforms.add("REDDIT");
        if (inRomainSection || (!inFabriceSection && !inF2Section)) rPlatforms.add("REDDIT");
      }
      if (secTitle.includes("FACEBOOK") || secTitle.includes("FB")) {
        if (inFabriceSection || (!inRomainSection && !inF2Section)) fPlatforms.add("FACEBOOK");
        if (inRomainSection || (!inFabriceSection && !inF2Section)) rPlatforms.add("FACEBOOK");
      }
      if (secTitle.includes("IH") || secTitle.includes("INDIEHACKER")) {
        if (inRomainSection || (!inFabriceSection && !inF2Section)) rPlatforms.add("IH");
      }
      if (secTitle.includes("PH") || secTitle.includes("PRODUCTHUNT")) {
        if (inFabriceSection || (!inRomainSection && !inF2Section)) fPlatforms.add("PH");
        if (inRomainSection || (!inFabriceSection && !inF2Section)) rPlatforms.add("PH");
      }
      continue;
    }

    // Parse cold target from table rows
    if (currentSectionName.includes("COLD")) {
      if (line.includes("|") && (line.toLowerCase().includes("par jour") || line.toLowerCase().includes("/jour"))) {
        const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
        for (const cell of cells) {
          const num = extractNumber(cell);
          if (num !== null && num > 0 && num <= 50) {
            fabrice.cold = num;
            romain.cold = num;
            break;
          }
        }
      }
    }

    // Parse cross target
    if (currentSectionName.includes("CROSS")) {
      if (line.includes("|") && line.toLowerCase().includes("par jour")) {
        const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
        for (const cell of cells) {
          const num = extractNumber(cell);
          if (num !== null && num > 0 && num <= 20) {
            fabrice.cross = num;
            romain.cross = num;
            break;
          }
        }
      }
    }

    // Parse engagement targets per platform
    if (currentSectionName.includes("ENGAGEMENT") || currentSectionName.includes("ENG")) {
      if (line.includes("Twitter") || line.includes("TWITTER")) {
        const num = extractNumber(line);
        if (num !== null && num > 0) {
          if (inFabriceSection) fabrice.twEng = num;
          if (inRomainSection) romain.twEng = num;
        }
      }
      if (line.includes("LinkedIn") || line.includes("LINKEDIN")) {
        const num = extractNumber(line);
        if (num !== null && num > 0) {
          if (inFabriceSection) fabrice.liCom = num;
          if (inRomainSection) romain.liCom = num;
        }
      }
    }
  }

  if (fPlatforms.size > 0) fabrice.platforms = Array.from(fPlatforms);
  if (rPlatforms.size > 0) romain.platforms = Array.from(rPlatforms);

  return { fabrice, romain };
}

function buildPersonaTargets(base: PersonaTargets, overrides: Partial<PersonaTargets>): PersonaTargets {
  const platforms = overrides.platforms ?? base.platforms;
  const hasIh = platforms.includes("IH");
  const hasPh = platforms.includes("PH");
  const hasIhPh = hasIh || hasPh;
  const ih = hasIh ? (overrides.ih ?? base.ih) : 0;
  const ph = hasPh ? (overrides.ph ?? base.ph) : 0;
  return {
    cold: overrides.cold ?? base.cold,
    twEng: overrides.twEng ?? base.twEng,
    liCom: overrides.liCom ?? base.liCom,
    reddit: overrides.reddit ?? base.reddit,
    facebook: overrides.facebook ?? base.facebook,
    cross: overrides.cross ?? base.cross,
    ph,
    ih,
    ihPh: ih + ph,
    engTarget: overrides.engTarget ?? base.engTarget,
    platforms,
    hasIhPh,
    hasPh,
    hasIh,
  };
}

export async function targetsRoute(_req: Request, res: Response): Promise<void> {
  try {
    const weekNumber = currentWeekNumber();

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

    let overrides: { fabrice: Partial<PersonaTargets>; romain: Partial<PersonaTargets> } = { fabrice: {}, romain: {} };
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
    };

    _cache = { weekNumber, data: response, expiresAt: Date.now() + 30 * 60 * 1000 };
    res.json(response);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/targets]", err);
    // Return defaults on error so the UI doesn't break
    const weekNumber = currentWeekNumber();
    res.json({
      weekNumber,
      batchFile: `BATCH-SEMAINE-${weekNumber}.md`,
      fabrice: DEFAULTS.fabrice,
      romain: DEFAULTS.romain,
    });
  }
}
