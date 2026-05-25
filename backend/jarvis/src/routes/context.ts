import { Request, Response } from "express";
import type { TimelineItem, CounterData, AlertItem } from "../lib/context-types.js";
import { ghRead } from "../lib/github.js";

const COLD_TARGETS = { tiktok: 10, instagram: 10, facebook: 5, twitter: 5, linkedin: 5 };
const PH_TARGET = 6;

async function readRepo(relPath: string): Promise<string> {
  try {
    const file = await ghRead(relPath);
    if (!file) return "";
    return file.content;
  } catch (err) {
    console.error(`[context] ghRead failed for ${relPath}:`, err);
    return "";
  }
}

function getWeekStart(): Date {
  const now = new Date();
  const parisNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const day = parisNow.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(parisNow);
  monday.setDate(parisNow.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function parseDateDDMM(s: string): Date | null {
  const m = s.match(/(\d{2})\/(\d{2})/);
  if (!m) return null;
  const year = new Date().getFullYear();
  const d = new Date(year, parseInt(m[2], 10) - 1, parseInt(m[1], 10));
  d.setHours(0, 0, 0, 0);
  return d;
}

function getToday(): { day: string; dayName: string; weekday: string } {
  const now = new Date();
  const day = now.toLocaleDateString("fr-FR", { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit" });
  const dayName = now.toLocaleDateString("fr-FR", { timeZone: "Europe/Paris", weekday: "long" }).toLowerCase();
  return { day, dayName, weekday: dayName.toUpperCase() };
}

function tableRows(content: string): string[][] {
  const rows: string[][] = [];
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.some((c) => /^-+$/.test(c))) continue;
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

function section(markdown: string, title: string): string {
  const lines = markdown.split("\n");
  let active = false;
  const out: string[] = [];
  for (const line of lines) {
    if (!active && /^#+\s/.test(line) && line.includes(title)) { active = true; continue; }
    if (active && /^##\s/.test(line)) break;
    if (active) out.push(line);
  }
  return out.join("\n");
}

function statusOf(cell: string): "done" | "blocked" | "todo" {
  if (cell.includes("✅")) return "done";
  if (cell.includes("⊘") || cell.toLowerCase().includes("bloqué")) return "blocked";
  return "todo";
}

function platformOf(sectionTitle: string): string {
  const t = sectionTitle.toUpperCase();
  if (t.includes("TWITTER")) return "Twitter";
  if (t.includes("LINKEDIN")) return "LinkedIn";
  if (t.includes("REDDIT")) return "Reddit";
  if (t.includes("IH")) return "IH";
  if (t.includes("PH")) return "PH";
  return "Unknown";
}

function parseTimeline(planHebdo: string, today: string, dayName: string, publishedBy: string): TimelineItem[] {
  if (!planHebdo) return [];
  const items: TimelineItem[] = [];
  const sectionRegex = /^##\s+\d+[A-Za-z]?\.\s*(POSTS\s+\w+.*)/gm;
  let match;
  while ((match = sectionRegex.exec(planHebdo)) !== null) {
    const title = match[1];
    const sectionTimeMatch = title.match(/(\d{1,2})h(\d{2})/);
    const sectionTime = sectionTimeMatch
      ? `${sectionTimeMatch[1].padStart(2, "0")}:${sectionTimeMatch[2]}`
      : "13:00";
    const coucheMatch = title.match(/COUCHE\s+([AB])/i);
    const coucheLabel = coucheMatch ? `[${coucheMatch[1]}] ` : "";
    const startIdx = match.index + match[0].length;
    const nextMatch = /^##\s/m.exec(planHebdo.slice(startIdx));
    const endIdx = nextMatch ? startIdx + nextMatch.index : planHebdo.length;
    const sectionContent = planHebdo.slice(startIdx, endIdx);
    const rows = tableRows(sectionContent);
    for (const row of rows) {
      if (row.length < 2) continue;
      const dayCell = row[0].replace(/\*\*/g, "").toLowerCase();
      const dayAbbr = dayName.slice(0, 3);
      const datePart = dayCell.match(/\d{2}\/\d{2}/)?.[0];
      if (datePart) {
        if (datePart !== today) continue;
      } else {
        if (!dayCell.includes(dayName) && !dayCell.includes(dayAbbr)) continue;
      }
      const subject = row.length >= 4 ? (row[2] || row[1]) : row[1];
      const statusCell = row[row.length - 1] || "";
      const timeMatch = statusCell.match(/(\d{1,2})h/);
      items.push({
        time: timeMatch ? `${timeMatch[1].padStart(2, "0")}:00` : sectionTime,
        title: `${coucheLabel}${subject || row[1]}`,
        platform: platformOf(title),
        status: statusOf(statusCell),
        publishedBy,
      });
    }
  }
  return items;
}

function countToday(content: string, today: string): number {
  if (!content) return 0;
  return tableRows(content).filter((r) => r[0]?.includes(today)).length;
}

function countTodayByOperator(content: string, today: string, operator: string): number {
  if (!content) return 0;
  // Format StoreMD : Date | Handle | Store URL | Message | Statut | Envoyé par (R/F) | Notes → opérateur = col index 5
  return tableRows(content).filter((r) => r[0]?.includes(today) && (r[5] || "").trim() === operator).length;
}

function parseAlerts(progress: string): AlertItem[] {
  if (!progress) return [];
  const alerts: AlertItem[] = [];
  const eventSection = section(progress, "ÉVÉNEMENTS NOTABLES") || section(progress, "EVENEMENTS NOTABLES");
  const rows = tableRows(eventSection);
  const criticalKeywords = ["SUSPENDU", "INCIDENT", "BLOQUÉ", "bloqué", "inaccessible", "DNS non configuré"];
  const warningKeywords = ["En attente", "⏳", "pending", "En cours"];
  const weekStart = getWeekStart();
  const seen = new Set<string>();
  for (const row of rows) {
    const full = row.join(" ");
    const dateCell = row[0] || "";
    const rowDate = parseDateDDMM(dateCell);
    if (rowDate && rowDate < weekStart) continue;
    const event = row[1] || "";
    const action = row[4] || row[3] || "";
    if (!event || seen.has(event.slice(0, 40))) continue;
    seen.add(event.slice(0, 40));
    const isCritical = criticalKeywords.some((kw) => full.includes(kw));
    const isWarning = warningKeywords.some((kw) => full.includes(kw));
    if (isCritical || isWarning) {
      if (full.includes("RÉSOLU")) continue;
      alerts.push({
        level: isCritical ? "critical" : "warning",
        title: event.replace(/🔴|⚠|❌/g, "").trim().slice(0, 60),
        description: action.trim().slice(0, 120),
      });
    }
    if (alerts.length >= 5) break;
  }
  return alerts;
}

function buildObjectives(totalCold: number, ph: number, publishedBy: string): TimelineItem[] {
  const mk = (label: string, done: number, target: number): TimelineItem => ({
    time: "",
    title: `${label}: ${done}/${target} aujourd'hui`,
    platform: "OBJECTIF",
    status: done >= target ? "done" : "todo",
    publishedBy,
  });
  return [mk("Cold", totalCold, 35), mk("PH", ph, PH_TARGET)];
}

function parsePipelineScansToday(pipelineContent: string, today: string): number {
  if (!pipelineContent) return 0;
  const sec = section(pipelineContent, "LOG SCANS PROACTIFS");
  return tableRows(sec).filter((r) => r[1]?.includes(today)).length;
}

function parsePipelineBetas(pipelineContent: string): number {
  if (!pipelineContent) return 0;
  const sec = section(pipelineContent, "BETA SPOTS");
  return tableRows(sec).filter((r) => {
    const spotCell = (r[0] || "").trim();
    if (/^spot$/i.test(spotCell)) return false;
    const dateCell = (r[3] || "").trim();
    return /\d/.test(dateCell);
  }).length;
}

function parsePipelineConvos(pipelineContent: string): number {
  if (!pipelineContent) return 0;
  const sec = section(pipelineContent, "PIPELINE ACTIF");
  return tableRows(sec).filter((r) => {
    const full = r.join(" ");
    return full.includes("💬") || full.includes("🎯") || full.includes("🔄");
  }).length;
}

export async function contextRoute(req: Request, res: Response): Promise<void> {
  const persona = (req.query.persona as string || "romain") as "romain" | "fabrice";
  const operator = persona === "romain" ? "R" : "F";
  const otherPersona = persona === "fabrice" ? "romain" : "fabrice";
  const { day: today, dayName } = getToday();

  const [
    planHebdo, progressSemaine,
    twActive, liActive, fbActive, phActive, redditActive,
    twOther, liOther, fbOther, phOther,
    tiktokLog, instagramLog,
    otherPlanHebdo, pipelineConversion,
  ] = await Promise.all([
    readRepo(`${persona}/planning/plan-hebdo.md`),
    readRepo(`${persona}/tracking/progress-semaines.md`),
    readRepo(`${persona}/cold/cold-log-twitter.md`),
    readRepo(`${persona}/cold/cold-log-linkedin.md`),
    readRepo(`${persona}/cold/cold-log-facebook.md`),
    readRepo(`${persona}/engagement/ph/engagement-log.md`),
    readRepo(`${persona}/engagement/reddit/engagement-log.md`),
    readRepo(`${otherPersona}/cold/cold-log-twitter.md`),
    readRepo(`${otherPersona}/cold/cold-log-linkedin.md`),
    readRepo(`${otherPersona}/cold/cold-log-facebook.md`),
    readRepo(`${otherPersona}/engagement/ph/engagement-log.md`),
    readRepo("marketing/saas-app-shopify/storemd/cold/cold-log-tiktok.md"),
    readRepo("marketing/saas-app-shopify/storemd/cold/cold-log-instagram.md"),
    readRepo(`${otherPersona}/planning/plan-hebdo.md`),
    persona === "fabrice" ? readRepo("fabrice/pipeline-conversion.md") : Promise.resolve(""),
  ]);

  const publishedBy = persona === "romain" ? "R" : "F";

  // Compteurs par persona (interface active)
  const coldTwitter = countToday(twActive, today);
  const coldLinkedin = countToday(liActive, today);
  const coldFacebook = countToday(fbActive, today);
  const coldTiktok = countTodayByOperator(tiktokLog, today, operator);
  const coldInstagram = countTodayByOperator(instagramLog, today, operator);
  const ph = countToday(phActive, today);
  const reddit = countToday(redditActive, today);
  const totalCold = coldTwitter + coldLinkedin + coldFacebook + coldTiktok + coldInstagram;
  const totalPersona = totalCold + ph;

  // Général (R + F) : perso = somme des 2 personas ; StoreMD = toutes les lignes (les 2 opérateurs)
  const generalCold =
    countToday(twActive, today) + countToday(liActive, today) + countToday(fbActive, today) +
    countToday(twOther, today) + countToday(liOther, today) + countToday(fbOther, today) +
    countToday(tiktokLog, today) + countToday(instagramLog, today);
  const generalPh = countToday(phActive, today) + countToday(phOther, today);
  const general = generalCold + generalPh;

  const pipelineScans = parsePipelineScansToday(pipelineConversion, today);
  const pipelineBetas = parsePipelineBetas(pipelineConversion);
  const pipelineConvos = parsePipelineConvos(pipelineConversion);

  const counters: CounterData = {
    coldTiktok, coldInstagram, coldFacebook, coldTwitter, coldLinkedin,
    ph, reddit, totalPersona, general,
    pipelineScans, pipelineBetas, pipelineConvos,
  };

  const timelinePosts = parseTimeline(planHebdo, today, dayName, publishedBy);
  const otherPublishedBy = persona === "fabrice" ? "R" : "F";
  const otherTimelinePosts = parseTimeline(otherPlanHebdo, today, dayName, otherPublishedBy);
  const objectives = buildObjectives(totalCold, ph, publishedBy);

  const pipelineObjectives: TimelineItem[] = [];
  if (persona === "fabrice" && pipelineConversion) {
    pipelineObjectives.push({
      time: "",
      title: `Scans proactifs: ${pipelineScans}/6 aujourd'hui`,
      platform: "OBJECTIF",
      status: pipelineScans >= 6 ? "done" : "todo",
      publishedBy,
    });
    if (pipelineBetas > 0) {
      pipelineObjectives.push({
        time: "",
        title: `Beta spots: ${pipelineBetas}/8 claimed`,
        platform: "OBJECTIF",
        status: pipelineBetas >= 8 ? "done" : "todo",
        publishedBy,
      });
    }
  }

  const timeline = [
    ...timelinePosts,
    ...otherTimelinePosts,
    ...objectives,
    ...pipelineObjectives,
  ].sort((a, b) => {
    if (a.platform === "OBJECTIF" && b.platform !== "OBJECTIF") return 1;
    if (b.platform === "OBJECTIF" && a.platform !== "OBJECTIF") return -1;
    return (a.time || "99:99").localeCompare(b.time || "99:99");
  });

  const alerts = parseAlerts(progressSemaine);

  res.json({ timeline, counters, alerts });
}
