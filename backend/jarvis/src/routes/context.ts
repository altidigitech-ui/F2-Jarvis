import { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import type { TimelineItem, CounterData, AlertItem } from "../lib/context-types.js";

const REPO_ROOT = process.env.REPO_ROOT || path.resolve(process.cwd(), "../..");

async function readRepo(relPath: string): Promise<string> {
  try {
    return await readFile(path.join(REPO_ROOT, relPath), "utf-8");
  } catch {
    return "";
  }
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
    if (!active && line.includes(title)) { active = true; continue; }
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
  if (t.includes("F2")) return "F2";
  return "Unknown";
}

function parseTimeline(planHebdo: string, today: string, dayName: string, publishedBy: string): TimelineItem[] {
  if (!planHebdo) return [];
  const items: TimelineItem[] = [];
  const sectionRegex = /^##\s+\d+\.\s*(POSTS\s+\w+.*)/gm;
  let match;
  while ((match = sectionRegex.exec(planHebdo)) !== null) {
    const title = match[1];
    const startIdx = match.index + match[0].length;
    const nextMatch = /^##\s/m.exec(planHebdo.slice(startIdx));
    const endIdx = nextMatch ? startIdx + nextMatch.index : planHebdo.length;
    const sectionContent = planHebdo.slice(startIdx, endIdx);
    const rows = tableRows(sectionContent);
    for (const row of rows) {
      if (row.length < 2) continue;
      const dayCell = row[0].replace(/\*\*/g, "").toLowerCase();
      if (!dayCell.includes(today) && !dayCell.includes(dayName)) continue;
      const subject = row[2] || row[1] || "";
      const statusCell = row[row.length - 1] || "";
      const timeMatch = statusCell.match(/(\d{1,2})h/);
      items.push({
        time: timeMatch ? `${timeMatch[1].padStart(2, "0")}:00` : "",
        title: subject || row[1],
        platform: platformOf(title),
        status: statusOf(statusCell),
        publishedBy,
      });
    }
  }
  return items;
}

function countTodayInSection(content: string, sectionTitle: string, today: string): number {
  if (!content) return 0;
  return tableRows(section(content, sectionTitle)).filter((r) => r[0]?.includes(today)).length;
}

function countTodayAny(content: string, today: string): number {
  if (!content) return 0;
  return tableRows(content).filter((r) => r[0]?.includes(today)).length;
}

function countCrossToday(crossTracker: string, today: string, weekday: string): number {
  if (!crossTracker) return 0;
  const sec = section(crossTracker, `${weekday} ${today}`) || section(crossTracker, today);
  if (!sec) return 0;
  return tableRows(sec).filter((r) => {
    const replyCell = r[3] || r[4] || "";
    return replyCell.includes("✅");
  }).length;
}

function parseAlerts(progress: string): AlertItem[] {
  if (!progress) return [];
  const alerts: AlertItem[] = [];
  const eventSection = section(progress, "ÉVÉNEMENTS NOTABLES") || section(progress, "EVENEMENTS NOTABLES");
  const rows = tableRows(eventSection);
  const criticalKeywords = ["SUSPENDU", "INCIDENT", "BLOQUÉ", "bloqué", "inaccessible", "DNS non configuré"];
  const warningKeywords = ["En attente", "⏳", "pending", "En cours", "BLOQUÉ"];
  const seen = new Set<string>();
  for (const row of rows) {
    const full = row.join(" ");
    const event = row[1] || "";
    const action = row[4] || row[3] || "";
    if (!event || seen.has(event.slice(0, 40))) continue;
    seen.add(event.slice(0, 40));
    const isCritical = criticalKeywords.some((kw) => full.includes(kw));
    const isWarning = warningKeywords.some((kw) => full.includes(kw));
    if (isCritical || isWarning) {
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

function parseF2Planning(f2PlanHebdo: string, publishedBy: string): TimelineItem[] {
  if (!f2PlanHebdo) return [];
  const items: TimelineItem[] = [];
  const sectionRegex = /^##\s+\d+\.\s*(POSTS\s+\w+.*)/gm;
  let match;
  while ((match = sectionRegex.exec(f2PlanHebdo)) !== null) {
    const title = match[1];
    const startIdx = match.index + match[0].length;
    const nextMatch = /^##\s/m.exec(f2PlanHebdo.slice(startIdx));
    const endIdx = nextMatch ? startIdx + nextMatch.index : f2PlanHebdo.length;
    const sectionContent = f2PlanHebdo.slice(startIdx, endIdx);
    for (const row of tableRows(sectionContent)) {
      if (row.length < 2) continue;
      const dayCell = row[0].replace(/\*\*/g, "").replace(/🔴/g, "").trim();
      const subject = row[2] || row[1] || "";
      const statusCell = row[row.length - 1] || "";
      const timeMatch = statusCell.match(/(\d{1,2})h/);
      items.push({
        time: timeMatch ? `${timeMatch[1].padStart(2, "0")}:00` : "",
        title: `${dayCell} — ${subject}`,
        platform: platformOf(title),
        status: statusOf(statusCell),
        publishedBy,
      });
    }
  }
  return items;
}

export async function contextRoute(req: Request, res: Response): Promise<void> {
  const persona = (req.query.persona as string || "romain") as "romain" | "fabrice";
  const mode = req.query.mode as string || "normal";

  const { day: today, dayName, weekday } = getToday();

  const [planHebdo, coldLog, engagementLog, crossTracker, progressSemaine, f2PlanHebdo] =
    await Promise.all([
      readRepo(`${persona}/plan-hebdo.md`),
      readRepo(`${persona}/cold/cold-outreach-log.md`),
      readRepo(`${persona}/engagement/engagement-log.md`),
      readRepo(`${persona}/cross-engagement-tracker.md`),
      readRepo(`${persona}/progress-semaine.md`),
      mode === "f2" ? readRepo("f2/plan-hebdo.md") : Promise.resolve(""),
    ]);

  const publishedBy = persona === "romain" ? "R" : "F";
  const timeline = parseTimeline(planHebdo, today, dayName, publishedBy);
  const cold = countTodayAny(coldLog, today);
  const twEng = countTodayInSection(engagementLog, "TWITTER", today);
  const liCom = countTodayInSection(engagementLog, "LINKEDIN", today);
  const ihPh =
    countTodayInSection(engagementLog, "IH", today) +
    countTodayInSection(engagementLog, "PH", today) +
    countTodayInSection(engagementLog, "INDIEHA", today);
  const cross = countCrossToday(crossTracker, today, weekday);
  const counters: CounterData = {
    cold, repliesIn: 0, twEng, liCom, cross, ihPh, total: cold + twEng + liCom + ihPh + cross,
  };
  const alerts = parseAlerts(progressSemaine);
  const weekPlanningF2 = mode === "f2" ? parseF2Planning(f2PlanHebdo, "F2") : [];

  res.json({ timeline, counters, alerts, weekPlanningF2 });
}
