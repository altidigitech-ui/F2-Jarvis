import { readFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";
import type { TimelineItem, CounterData, AlertItem } from "@/lib/context-types";

export { type TimelineItem, type CounterData, type AlertItem };
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPO_ROOT = path.resolve(process.cwd(), "../..");

async function readRepo(relPath: string): Promise<string> {
  try {
    return await readFile(path.join(REPO_ROOT, relPath), "utf-8");
  } catch {
    return "";
  }
}

function getToday(): { day: string; dayName: string; weekday: string } {
  const now = new Date();
  const day = now.toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
  }); // "20/04"
  const dayName = now.toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
  }).toLowerCase(); // "lundi"
  const weekday = dayName.toUpperCase(); // "LUNDI"
  return { day, dayName, weekday };
}

// Parse all table rows from a markdown string
function tableRows(content: string): string[][] {
  const rows: string[][] = [];
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.some((c) => /^-+$/.test(c))) continue; // separator row
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

// Extract section between ## headings
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

// Parse today's posts from plan-hebdo.md
function parseTimeline(planHebdo: string, today: string, dayName: string, publishedBy: string): TimelineItem[] {
  if (!planHebdo) return [];
  const items: TimelineItem[] = [];

  // Find all ## sections in the file
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
      // Extract scheduled time from status cell if present (e.g. "⏳ Schedulé 13h")
      const timeMatch = statusCell.match(/(\d{1,2})h/);
      const time = timeMatch ? `${timeMatch[1].padStart(2, "0")}:00` : "";

      items.push({
        time,
        title: subject || row[1],
        platform: platformOf(title),
        status: statusOf(statusCell),
        publishedBy,
      });
    }
  }

  return items;
}

// Count today's entries in a specific section of a log file
function countTodayInSection(content: string, sectionTitle: string, today: string): number {
  if (!content) return 0;
  const sec = section(content, sectionTitle);
  return tableRows(sec).filter((r) => r[0]?.includes(today)).length;
}

// Count all today's entries in a log file (any section)
function countTodayAny(content: string, today: string): number {
  if (!content) return 0;
  return tableRows(content).filter((r) => r[0]?.includes(today)).length;
}

// Count done cross-engagements for today
function countCrossToday(crossTracker: string, today: string, weekday: string): number {
  if (!crossTracker) return 0;
  // Find section for today (e.g. "## LUNDI 20/04")
  const sec = section(crossTracker, `${weekday} ${today}`) || section(crossTracker, today);
  if (!sec) return 0;
  return tableRows(sec).filter((r) => {
    // "R a reply ?" column — index varies, look for ✅ in any cell except last
    const replyCell = r[3] || r[4] || "";
    return replyCell.includes("✅");
  }).length;
}

// Extract open incidents from progress-semaine.md
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
    const platform = row[2] || "";
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

// Parse f2 week planning
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

export async function GET(req: NextRequest) {
  const persona = (req.nextUrl.searchParams.get("persona") || "romain") as "romain" | "fabrice";
  const mode = req.nextUrl.searchParams.get("mode") || "normal";

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

  // Timeline: today's posts
  const timeline = parseTimeline(planHebdo, today, dayName, publishedBy);

  // Counters
  const cold = countTodayAny(coldLog, today);
  const twEng = countTodayInSection(engagementLog, "TWITTER", today);
  const liCom = countTodayInSection(engagementLog, "LINKEDIN", today);
  const ihPh =
    countTodayInSection(engagementLog, "IH", today) +
    countTodayInSection(engagementLog, "PH", today) +
    countTodayInSection(engagementLog, "INDIEHA", today);
  const cross = countCrossToday(crossTracker, today, weekday);
  const total = cold + twEng + liCom + ihPh + cross;

  const counters: CounterData = {
    cold,
    repliesIn: 0, // TODO: not parseable from current logs
    twEng,
    liCom,
    cross,
    ihPh,
    total,
  };

  // Alerts
  const alerts = parseAlerts(progressSemaine);

  // F2 planning (only in f2 mode)
  const weekPlanningF2 = mode === "f2" ? parseF2Planning(f2PlanHebdo, "F2") : [];

  return Response.json({ timeline, counters, alerts, weekPlanningF2 });
}
