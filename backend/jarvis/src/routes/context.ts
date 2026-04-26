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
      // 4-col (Jour|Vidéo|Sujet|Statut) → row[2]; 3-col (Jour|Sujet|Statut) → row[1]
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

function countTodayInSection(content: string, sectionTitle: string, today: string): number {
  if (!content) return 0;
  return tableRows(section(content, sectionTitle)).filter((r) => r[0]?.includes(today)).length;
}

function countTodayAny(content: string, today: string): number {
  if (!content) return 0;
  return tableRows(content).filter((r) => r[0]?.includes(today)).length;
}

function countCrossFromExecutionLog(executionLog: string, today: string): number {
  if (!executionLog) return 0;
  const rows = tableRows(executionLog);
  return rows.filter(r => {
    const dayCell = r[1] || "";
    const statusCell = r[5] || r[4] || "";
    return dayCell.includes(today) && statusCell.includes("✅");
  }).length;
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

  const engSection = section(planHebdo, "ENGAGEMENT");
  const engTargetMatch = engSection ? engSection.match(/(\d+)\s*interactions?\/jour/i) : null;
  const engTotalTarget = engTargetMatch ? parseInt(engTargetMatch[1], 10) : 30;
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

function parseCrossItemsFromLog(
  crossExecutionLog: string,
  today: string,
  publishedBy: string,
): TimelineItem[] {
  if (!crossExecutionLog) return [];
  const items: TimelineItem[] = [];
  const rows = tableRows(crossExecutionLog);
  for (const row of rows) {
    if (row.length < 5) continue;
    const ref = (row[0] || "").trim();
    const dayCell = (row[1] || "").trim();
    const post = (row[2] || "").trim();
    const heureCible = (row[3] || "").trim();
    const statusCell = (row[5] || row[4] || "").trim();

    if (!dayCell.includes(today)) continue;
    if (!ref || /^ref$/i.test(ref)) continue;

    const done = statusCell.includes("✅");
    const hourMatch = heureCible.match(/(\d{1,2})h(\d{2})?/);
    const timeStr = hourMatch
      ? `${hourMatch[1].padStart(2, "0")}:${hourMatch[2] || "00"}`
      : "";

    items.push({
      time: timeStr,
      title: `Cross ${ref} — ${post.slice(0, 50)}`,
      platform: "CROSS",
      status: done ? "done" : "todo",
      publishedBy,
    });
  }
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
    if (/^spot$/i.test(spotCell)) return false; // skip header row
    const dateCell = (r[3] || "").trim();
    return /\d/.test(dateCell); // a real date contains at least one digit
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
  const mode = req.query.mode as string || "normal";
  const isF2 = mode === "f2";
  // In F2 mode, the "active" files come from f2/, not romain/
  const activePrefix = isF2 ? "f2" : persona;

  const { day: today, dayName, weekday } = getToday();

  const otherPersona = persona === "fabrice" ? "romain" : "fabrice";
  const [planHebdo, coldLog, engagementLog, crossTracker, progressSemaine, f2PlanHebdo, crossExecutionLog, otherPlanHebdo, pipelineConversion] =
    await Promise.all([
      readRepo(`${activePrefix}/plan-hebdo.md`),
      readRepo(`${activePrefix}/cold/cold-outreach-log.md`),
      readRepo(`${activePrefix}/engagement/engagement-log.md`),
      readRepo(`${activePrefix}/cross-engagement-tracker.md`),
      readRepo(`${activePrefix}/progress-semaine.md`),
      readRepo("f2/plan-hebdo.md"),
      readRepo(`${activePrefix}/engagement/cross-execution-log.md`),
      isF2
        ? readRepo(`fabrice/plan-hebdo.md`)
        : readRepo(`${otherPersona}/plan-hebdo.md`),
      persona === "fabrice" && !isF2
        ? readRepo("fabrice/pipeline-conversion.md")
        : Promise.resolve(""),
    ]);

  const publishedBy = isF2 ? "F2" : (persona === "romain" ? "R" : "F");
  const timelinePosts = parseTimeline(planHebdo, today, dayName, publishedBy);
  let otherTimelinePosts: TimelineItem[];
  if (isF2) {
    const fabricePosts = parseTimeline(otherPlanHebdo, today, dayName, "F");
    const romainPlanHebdo = await readRepo("romain/plan-hebdo.md");
    const romainPosts = parseTimeline(romainPlanHebdo, today, dayName, "R");
    otherTimelinePosts = [...fabricePosts, ...romainPosts];
  } else {
    const otherPublishedBy = persona === "fabrice" ? "R" : "F";
    otherTimelinePosts = parseTimeline(otherPlanHebdo, today, dayName, otherPublishedBy);
  }
  const f2TimelinePosts = isF2 ? [] : parseTimeline(f2PlanHebdo, today, dayName, "F2");
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
  const cross = countCrossFromExecutionLog(crossExecutionLog, today) || countCrossToday(crossTracker, today, weekday);
  const pipelineScans = parsePipelineScansToday(pipelineConversion, today);
  const pipelineBetas = parsePipelineBetas(pipelineConversion);
  const pipelineConvos = parsePipelineConvos(pipelineConversion);
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
    pipelineScans,
    pipelineBetas,
    pipelineConvos,
  };

  const objectives = parseObjectiveItems(planHebdo, { cold, twEng, liCom, reddit, facebook, ihPh: ih + ph, cross }, publishedBy);
  const crossItemsFromLog = parseCrossItemsFromLog(crossExecutionLog, today, publishedBy);
  const crossItems = crossItemsFromLog.length > 0
    ? crossItemsFromLog
    : parseCrossItemsToday(crossTracker, today, weekday, publishedBy);

  const pipelineObjectives: TimelineItem[] = [];
  if (persona === "fabrice" && !isF2 && pipelineConversion) {
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
    ...f2TimelinePosts,
    ...crossItems,
    ...objectives,
    ...pipelineObjectives,
  ].sort((a, b) => {
    if (a.platform === "OBJECTIF" && b.platform !== "OBJECTIF") return 1;
    if (b.platform === "OBJECTIF" && a.platform !== "OBJECTIF") return -1;
    return (a.time || "99:99").localeCompare(b.time || "99:99");
  });

  const alerts = parseAlerts(progressSemaine);
  const weekPlanningF2 = mode === "f2" ? parseF2Planning(f2PlanHebdo, "F2") : [];

  res.json({ timeline, counters, alerts, weekPlanningF2 });
}
