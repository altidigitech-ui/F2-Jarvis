import { Request, Response } from "express";
import type { TimelineItem, CounterData, AlertItem } from "../lib/context-types.js";
import { ghRead } from "../lib/github.js";

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
  const sectionRegex = /^##\s+\d+[A-Za-z]?\.\s*(POSTS\s+\w+.*)/gm;
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
      const dayAbbr = dayName.slice(0, 3);
      if (!dayCell.includes(today) && !dayCell.includes(dayName) && !dayCell.includes(dayAbbr)) continue;
      // 4-col (Jour|Vidéo|Sujet|Statut) → row[2]; 3-col (Jour|Sujet|Statut) → row[1]
      const subject = row.length >= 4 ? (row[2] || row[1]) : row[1];
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

function parseObjectiveItems(
  planHebdo: string,
  counters: { cold: number; twEng: number; liCom: number; reddit: number; facebook: number; ihPh: number; cross: number },
  publishedBy: string,
): TimelineItem[] {
  if (!planHebdo) return [];
  const items: TimelineItem[] = [];

  const coldSection = section(planHebdo, "COLD OUTREACH");
  const coldRows = tableRows(coldSection);
  const coldDailyTarget = (() => {
    for (const row of coldRows) {
      const label = (row[0] || "").toLowerCase();
      const val = row[1] || "";
      if (label.includes("/jour") || label.includes("par jour") || label.includes("jour")) {
        const m = val.match(/(\d+)/);
        if (m) return parseInt(m[1], 10);
      }
    }
    return 10;
  })();
  if (coldDailyTarget > 0) {
    const done = counters.cold;
    items.push({
      time: "",
      title: `Cold outreach: ${done}/${coldDailyTarget} aujourd'hui`,
      platform: "OBJECTIF",
      status: done >= coldDailyTarget ? "done" : "todo",
      publishedBy,
    });
  }

  const engTotalTarget = 30;
  const engDone = counters.twEng + counters.liCom + counters.reddit + counters.facebook + counters.ihPh;
  items.push({
    time: "",
    title: `Engagement: ${engDone}/${engTotalTarget} interactions aujourd'hui`,
    platform: "OBJECTIF",
    status: engDone >= engTotalTarget ? "done" : "todo",
    publishedBy,
  });

  return items;
}

function parseCrossItemsToday(
  crossTracker: string,
  today: string,
  weekday: string,
  publishedBy: string,
): TimelineItem[] {
  if (!crossTracker) return [];
  const items: TimelineItem[] = [];
  const sec = section(crossTracker, `${weekday} ${today}`) || section(crossTracker, today);
  if (!sec) return items;
  const rows = tableRows(sec);
  for (const row of rows) {
    if (row.length < 2) continue;
    const post = (row[0] || "").trim();
    if (!post || post.startsWith("---")) continue;

    // Skip table header row (e.g. |Post|Heure pub.|Sujet|...|)
    if (/^post$/i.test(post)) continue;

    // Skip separator rows (e.g. |---|----|---|)
    if (/^[-: ]+$/.test(post)) continue;

    // Skip rows where every cell is empty or whitespace (empty template rows)
    const allEmpty = row.every((c) => !c.trim());
    if (allEmpty) continue;

    const hour = (row[1] || "").trim();
    const subject = (row[2] || "").trim();
    const replyCell = row[3] || row[4] || "";
    const done = replyCell.includes("✅");
    const timeMatch = hour.match(/(\d{1,2})h/);
    items.push({
      time: timeMatch ? `${timeMatch[1].padStart(2, "0")}:00` : "",
      title: `Cross: ${post}${subject ? " — " + subject.slice(0, 40) : ""}`,
      platform: "CROSS",
      status: done ? "done" : "todo",
      publishedBy,
    });
  }
  return items;
}

function parseF2Planning(f2PlanHebdo: string, publishedBy: string): TimelineItem[] {
  if (!f2PlanHebdo) return [];
  const items: TimelineItem[] = [];
  const sectionRegex = /^##\s+\d+[A-Za-z]?\.\s*(POSTS\s+\w+.*)/gm;
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
      // 4-col (Jour|Vidéo|Sujet|Statut) → row[2]; 3-col (Jour|Sujet|Statut) → row[1]
      const subject = row.length >= 4 ? (row[2] || row[1]) : row[1];
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
  const timelinePosts = parseTimeline(planHebdo, today, dayName, publishedBy);
  const cold = countTodayAny(coldLog, today);
  const twEng = countTodayInSection(engagementLog, "TWITTER", today);
  const liCom = countTodayInSection(engagementLog, "LINKEDIN", today);
  const reddit = countTodayInSection(engagementLog, "REDDIT", today);
  const facebook =
    countTodayInSection(engagementLog, "FACEBOOK", today) +
    countTodayInSection(engagementLog, "FB", today);
  const ih =
    countTodayInSection(engagementLog, "IH", today) +
    countTodayInSection(engagementLog, "INDIEHA", today);
  const ph = countTodayInSection(engagementLog, "PH", today);
  const ihPh = ih + ph;
  const cross = countCrossToday(crossTracker, today, weekday);
  const counters: CounterData = {
    cold,
    repliesIn: 0,
    twEng,
    liCom,
    reddit,
    facebook,
    cross,
    ih,
    ph,
    ihPh,
    total: cold + twEng + liCom + reddit + facebook + ihPh + cross,
  };

  const objectives = parseObjectiveItems(planHebdo, { cold, twEng, liCom, reddit, facebook, ihPh: ih + ph, cross }, publishedBy);
  const crossItems = parseCrossItemsToday(crossTracker, today, weekday, publishedBy);
  const timeline = [...timelinePosts, ...crossItems, ...objectives];

  const alerts = parseAlerts(progressSemaine);
  const weekPlanningF2 = mode === "f2" ? parseF2Planning(f2PlanHebdo, "F2") : [];

  res.json({ timeline, counters, alerts, weekPlanningF2 });
}
