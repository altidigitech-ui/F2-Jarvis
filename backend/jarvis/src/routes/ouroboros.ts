import { Request, Response } from "express";
import { ghRead, ghList, ghCreate, ghDelete, ghDeleteMultiple, GitHubDirEntry } from "../lib/github.js";

const STATE_PATH = "brain/ouroboros/state.json";
const DIARY_PATH = "brain/ouroboros/diary";
const PROPOSALS_PENDING = "brain/ouroboros/proposals/pending";
const PROPOSALS_ACCEPTED = "brain/ouroboros/proposals/accepted";
const PROPOSALS_REJECTED = "brain/ouroboros/proposals/rejected";
const PROPOSALS_IGNORED = "brain/ouroboros/proposals/ignored";
const KILL_SWITCH_PATH = "ops/kill-switches/ouroboros.flag";
const TRIGGERS_DIR = "brain/ouroboros/triggers";

type Priority = "critical" | "high" | "medium" | "low";

interface ProposalMeta {
  id: string;
  filename: string;
  type: string;
  priority: Priority;
  wing: string;
  title: string;
  preview: string;
  timestamp: string;
  cycle: string;
  fullContent: string;
}

// Safe wrappers — never throw, always return null/[] on any error
async function safeRead(path: string): Promise<string | null> {
  try {
    const file = await ghRead(path);
    return file ? file.content : null;
  } catch {
    return null;
  }
}

async function safeReadFull(path: string): Promise<{ content: string; sha: string } | null> {
  try {
    return await ghRead(path);
  } catch {
    return null;
  }
}

async function safeList(path: string): Promise<GitHubDirEntry[]> {
  try {
    return await ghList(path);
  } catch {
    return [];
  }
}

async function safeCreate(path: string, content: string, msg: string): Promise<boolean> {
  try {
    const existing = await safeRead(path);
    if (existing !== null) return false;
    await ghCreate(path, content, msg);
    return true;
  } catch {
    return false;
  }
}

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (fmMatch) {
    const meta: Record<string, string> = {};
    for (const line of fmMatch[1].split(/\r?\n/)) {
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const rawVal = line.slice(colonIdx + 1).trim();
        meta[line.slice(0, colonIdx).trim()] = rawVal.replace(/^["']|["']$/g, "");
      }
    }
    return { meta, body: fmMatch[2] };
  }

  // Fallback: parse **Key** : value bold fields (actual template format)
  const meta: Record<string, string> = {};
  const boldRegex = /\*\*([^*]+)\*\*\s*:\s*(.+)/g;
  let match;
  while ((match = boldRegex.exec(content)) !== null) {
    meta[match[1].trim().toLowerCase()] = match[2].trim();
  }
  return { meta, body: content };
}

function mapPriority(raw: string): Priority {
  const p = (raw || "").toLowerCase();
  if (p === "critique" || p === "critical") return "critical";
  if (p === "haute" || p === "high") return "high";
  if (p === "faible" || p === "low") return "low";
  return "medium";
}

function extractTitle(body: string): string {
  // Handles **Titre:** (colon inside) and **Titre :** (French spacing) and **Titre** : (colon outside)
  const boldMatch =
    body.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) ||
    body.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i);
  if (boldMatch) return boldMatch[1].trim();
  // Standard markdown heading
  const headingMatch = body.match(/^#\s+(.+)$/m);
  if (headingMatch) return headingMatch[1].trim();
  // Last resort: first non-empty, non-frontmatter line up to 60 chars
  const firstMeaningful = body.trim().split(/\r?\n/).find(l => l.trim() && !l.startsWith("**") && !l.startsWith("---"));
  return firstMeaningful ? firstMeaningful.trim().slice(0, 60) : "Sans titre";
}

function extractPriority(meta: Record<string, string>, body: string): string {
  if (meta.priority) return meta.priority;
  if (meta["priorité"]) return meta["priorité"];
  const bodyMatch = body.match(/\*\*Priorit[ée]:\*\*\s*(.+)/i);
  return bodyMatch ? bodyMatch[1].trim() : "medium";
}

function extractTimestampFromFilename(filename: string): string {
  // Filenames: 2026-04-23-some-title-1776975062108.md
  // The epoch timestamp is the last numeric segment before .md
  const match = filename.match(/-(\d{13,})\.md$/);
  if (match) {
    return new Date(parseInt(match[1], 10)).toISOString();
  }
  return "";
}

function parseProposal(filename: string, content: string): ProposalMeta {
  const { meta, body } = parseFrontmatter(content);
  const id = meta.id || filename.replace(/\.md$/, "");
  const title = extractTitle(body);
  const bodyText = body.replace(/^#.+$/m, "").trim();
  const preview = bodyText.slice(0, 120) + (bodyText.length > 120 ? "…" : "");

  return {
    id,
    filename,
    type: meta.type || "",
    priority: mapPriority(extractPriority(meta, body)),
    wing: meta.wing || "f2-core",
    title,
    preview,
    timestamp: meta.timestamp || extractTimestampFromFilename(filename) || meta.date || "",
    cycle: meta.cycle || "",
    fullContent: content,
  };
}

const PRIORITY_ORDER: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };

// GET /ouroboros/status
export async function ouroborosStatus(req: Request, res: Response): Promise<void> {
  try {
    const stateContent = await safeRead(STATE_PATH);

    // Not initialized — return early, no more API calls
    if (!stateContent) {
      res.json({ initialized: false });
      return;
    }

    let state: Record<string, unknown> = {};
    try { state = JSON.parse(stateContent); } catch { /* use defaults */ }

    const [pendingFiles, killContent, diaryFiles] = await Promise.all([
      safeList(PROPOSALS_PENDING),
      safeRead(KILL_SWITCH_PATH),
      safeList(DIARY_PATH),
    ]);

    const proposalsPending = pendingFiles.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_")
    ).length;

    const diaryMdFiles = diaryFiles
      .filter(f => f.type === "file" && f.name.endsWith(".md"))
      .sort((a, b) => b.name.localeCompare(a.name));
    const diaryCount = diaryMdFiles.length;
    const lastDiaryDate = diaryMdFiles.length > 0 ? diaryMdFiles[0].name.replace(".md", "") : null;

    let cycleRunning = false;
    let workerOnline = false;
    try {
      const { ouroborosQueue } = await import("../lib/queues.js");
      cycleRunning = (await ouroborosQueue.getActiveCount()) > 0;
      workerOnline = true;
    } catch { /* Redis unavailable */ }

    const budgetCap = (state.budgetCap as number) || 10;
    const budgetUsed = (state.budgetUsed as number) || 0;

    const now = new Date();
    const nextCycle = new Date(now);
    nextCycle.setUTCDate(nextCycle.getUTCDate() + 1);
    nextCycle.setUTCHours(2, 0, 0, 0);

    res.json({
      initialized: true,
      lastCycle: (state.lastCycle as object | null) || null,
      nextCycle: nextCycle.toISOString(),
      proposalsPending,
      diaryCount,
      lastDiaryDate,
      cycleRunning,
      workerOnline,
      budgetUsed,
      budgetRemaining: Math.max(0, budgetCap - budgetUsed),
      budgetCap,
      killSwitchActive: killContent !== null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/status]", err);
    res.status(500).json({ error: msg });
  }
}

// GET /ouroboros/proposals
export async function ouroborosProposals(req: Request, res: Response): Promise<void> {
  try {
    const files = await safeList(PROPOSALS_PENDING);
    const mdFiles = files.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_")
    );

    const proposals: ProposalMeta[] = [];
    for (const file of mdFiles) {
      const content = await safeRead(`${PROPOSALS_PENDING}/${file.name}`);
      if (content) {
        proposals.push(parseProposal(file.name, content));
      }
    }

    proposals.sort((a, b) => {
      const pa = PRIORITY_ORDER[a.priority] ?? 99;
      const pb = PRIORITY_ORDER[b.priority] ?? 99;
      return pa !== pb ? pa - pb : a.timestamp.localeCompare(b.timestamp);
    });

    res.json(proposals);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/proposals]", err);
    res.status(500).json({ error: msg });
  }
}

// GET /ouroboros/proposal/:id
export async function ouroborosProposal(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const filename = id.endsWith(".md") ? id : `${id}.md`;
    const content = await safeRead(`${PROPOSALS_PENDING}/${filename}`);
    if (!content) {
      res.status(404).json({ error: "Proposition introuvable" });
      return;
    }
    res.json(parseProposal(filename, content));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/action
export async function ouroborosAction(req: Request, res: Response): Promise<void> {
  try {
    const { proposalId, action, comment, persona } = req.body as {
      proposalId: string;
      action: "accept" | "reject" | "ignore";
      comment?: string;
      persona?: string;
    };

    if (!proposalId || !action) {
      res.status(400).json({ error: "proposalId et action sont requis" });
      return;
    }

    const destinations: Record<string, string> = {
      accept: PROPOSALS_ACCEPTED,
      reject: PROPOSALS_REJECTED,
      ignore: PROPOSALS_IGNORED,
    };

    const dest = destinations[action];
    if (!dest) {
      res.status(400).json({ error: "Action invalide" });
      return;
    }

    const filename = proposalId.endsWith(".md") ? proposalId : `${proposalId}.md`;
    const id = filename.replace(/\.md$/, "");

    const file = await safeReadFull(`${PROPOSALS_PENDING}/${filename}`);
    if (!file) {
      res.status(404).json({ error: "Proposition introuvable dans pending" });
      return;
    }

    let content = file.content;
    if (comment) {
      const by = persona || "JARVIS";
      content += `\n\n---\n**Action ${action} par ${by}** : ${comment}\n`;
    }

    const by = persona ? ` by ${persona}` : "";
    const commitMsg = `chore(ouroboros): ${action} proposal ${id}${by}`;

    await ghCreate(`${dest}/${filename}`, content, commitMsg);
    await ghDelete(`${PROPOSALS_PENDING}/${filename}`, file.sha, commitMsg);

    let chatMessage: string | undefined;
    if (action === "accept") {
      const rawContent = file.content;
      const recommMatch = rawContent.match(
        /\*\*Recommandation[^*]*\*\*\s*:\s*([\s\S]*?)(?=\*\*Risques|\*\*Action|\*\*Pr[io]|\n---|\n##|$)/i
      ) || rawContent.match(
        /\*\*Recommandation\s*:\s*\*\*\s*([\s\S]*?)(?=\*\*Risques|\*\*Action|\*\*Pr[io]|\n---|\n##|$)/i
      );
      const recommendation = recommMatch ? recommMatch[1].trim() : rawContent.slice(0, 500);
      const titleMatch =
        rawContent.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) ||
        rawContent.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) ||
        rawContent.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : id;
      chatMessage = `[OUROBOROS] ${title}\n\n${recommendation}${comment ? `\n\nContexte: ${comment}` : ""}\n\nExécute cette recommandation.`;
    }

    res.json({
      ok: true,
      action,
      proposalId: id,
      ...(chatMessage !== undefined ? { chatMessage } : {}),
      ...(action === "accept" ? { proposalFilename: filename } : {}),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/action]", err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/trigger
export async function ouroborosTrigger(req: Request, res: Response): Promise<void> {
  try {
    const { ouroborosQueue } = await import("../lib/queues.js");
    const job = await ouroborosQueue.add("manual", {}, { priority: 1 });
    res.json({ triggered: true, jobId: job.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/trigger]", err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/kill-switch
export async function ouroborosKillSwitch(req: Request, res: Response): Promise<void> {
  try {
    const { active } = req.body as { active: boolean };

    if (active) {
      const existing = await safeRead(KILL_SWITCH_PATH);
      if (!existing) {
        const content = `Kill-switch activé via JARVIS le ${new Date().toISOString()}\n`;
        await ghCreate(KILL_SWITCH_PATH, content, "chore(ouroboros): activate kill-switch via JARVIS");
      }
    } else {
      const file = await safeReadFull(KILL_SWITCH_PATH);
      if (file) {
        await ghDelete(KILL_SWITCH_PATH, file.sha, "chore(ouroboros): deactivate kill-switch via JARVIS");
      }
    }

    res.json({ ok: true, active });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/kill-switch]", err);
    res.status(500).json({ error: msg });
  }
}

// GET /ouroboros/diary
export async function ouroborosDiary(req: Request, res: Response): Promise<void> {
  try {
    const diaryDir = await safeList("brain/ouroboros/diary");
    const mdFiles = diaryDir.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_")
    );

    if (mdFiles.length === 0) {
      res.json({ entries: [] });
      return;
    }

    mdFiles.sort((a, b) => b.name.localeCompare(a.name));

    const entries = [];
    for (const file of mdFiles.slice(0, 10)) {
      const content = await safeRead(`brain/ouroboros/diary/${file.name}`);
      if (content) {
        entries.push({ filename: file.name, content });
      }
    }

    res.json({ entries });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/diary]", err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/purge-duplicates
export async function ouroborosPurgeDuplicates(req: Request, res: Response): Promise<void> {
  try {
    const files = await safeList(PROPOSALS_PENDING);
    const mdFiles = files.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_") && !f.name.startsWith(".")
    );

    const proposals: Array<{ filename: string; title: string; subject: string; timestamp: number }> = [];

    for (const file of mdFiles) {
      const content = await safeRead(`${PROPOSALS_PENDING}/${file.name}`);
      if (!content) continue;

      const titleMatch =
        content.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) ||
        content.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) ||
        content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : file.name;

      const epochMatch = file.name.match(/-(\d{13,})\.md$/);
      const timestamp = epochMatch ? parseInt(epochMatch[1], 10) : 0;

      let subject = title.toLowerCase()
        .replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2700}-\u{27BF}❓❌✅⏳🔴🟠🟡🟢⚠️]/gu, "")
        .replace(/s\d+/g, "").replace(/j\d+/g, "")
        .replace(/\d+[%€$hk]/g, "").replace(/\d+\/\d+/g, "").replace(/\d+/g, "")
        .replace(/[—–\-:=()\/\[\].,;!?'"«»]/g, " ")
        .replace(/\b(le|la|les|du|de|des|un|une|en|à|au|aux|et|ou|non|pas|pour|sur|par|ce|cette|ces|qui|que|est|sont|a|ont)\b/g, " ")
        .replace(/\b(the|a|an|in|on|at|to|for|of|is|are|not|no|and|or|but|with)\b/g, " ")
        .replace(/\s+/g, " ").trim();

      proposals.push({ filename: file.name, title, subject, timestamp });
    }

    const kept: Set<string> = new Set();
    const purged: Array<{ filename: string; title: string; reason: string }> = [];

    const now = Date.now();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    // Phase 1: purge everything older than 24h
    const recent = [];
    for (const p of proposals) {
      if (now - p.timestamp > TWENTY_FOUR_HOURS) {
        purged.push({ filename: p.filename, title: p.title, reason: "Older than 24h" });
      } else {
        recent.push(p);
      }
    }

    // Phase 2: dedup among recent proposals (keep newest)
    recent.sort((a, b) => b.timestamp - a.timestamp);
    for (const p of recent) {
      const words = new Set(p.subject.split(" ").filter(w => w.length > 2));
      let isDup = false;
      for (const keptFilename of kept) {
        const keptProposal = recent.find(x => x.filename === keptFilename);
        if (!keptProposal) continue;
        const keptWords = new Set(keptProposal.subject.split(" ").filter(w => w.length > 2));
        let shared = 0;
        for (const w of words) { if (keptWords.has(w)) shared++; }
        const minSize = Math.min(words.size, keptWords.size);
        if (minSize > 0 && shared / minSize >= 0.35) {
          isDup = true;
          purged.push({ filename: p.filename, title: p.title, reason: `Duplicate of: ${keptProposal.title}` });
          break;
        }
      }
      if (!isDup) kept.add(p.filename);
    }

    const pathsToDelete = purged
      .map(p => `${PROPOSALS_PENDING}/${p.filename}`)
      .filter(Boolean);

    if (pathsToDelete.length > 0) {
      await ghDeleteMultiple(
        pathsToDelete,
        `chore(ouroboros): purge ${pathsToDelete.length} duplicate proposals`
      );
    }

    res.json({
      ok: true,
      total: proposals.length,
      kept: kept.size,
      purged: pathsToDelete.length,
      details: purged.map(p => ({ filename: p.filename, title: p.title, reason: p.reason })),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/purge-duplicates]", err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/initialize
export async function ouroborosInitialize(req: Request, res: Response): Promise<void> {
  try {
    const created: string[] = [];
    const skipped: string[] = [];

    // Create state.json
    const stateContent = JSON.stringify({
      version: 1,
      initializedAt: new Date().toISOString(),
      lastCycle: null,
      budgetUsed: 0,
      budgetCap: 10,
      totalCycles: 0,
    }, null, 2);
    const stateCreated = await safeCreate(
      STATE_PATH,
      stateContent,
      "chore(ouroboros): initialize state.json via JARVIS"
    );
    (stateCreated ? created : skipped).push(STATE_PATH);

    // Create proposal subdirectories
    for (const dir of [PROPOSALS_PENDING, PROPOSALS_ACCEPTED, PROPOSALS_REJECTED, PROPOSALS_IGNORED]) {
      const gitkeep = `${dir}/.gitkeep`;
      const ok = await safeCreate(gitkeep, "", `chore(ouroboros): init ${dir.split("/").pop()} dir`);
      (ok ? created : skipped).push(dir);
    }

    // Create triggers directory
    const triggerOk = await safeCreate(
      `${TRIGGERS_DIR}/.gitkeep`,
      "",
      "chore(ouroboros): init triggers dir"
    );
    (triggerOk ? created : skipped).push(TRIGGERS_DIR);

    // Create MemPalace f2 wing
    const f2DrawersGitkeep = "brain/mempalace/wings/f2/drawers/.gitkeep";
    const f2Ok = await safeCreate(f2DrawersGitkeep, "", "chore: init mempalace f2 wing");
    (f2Ok ? created : skipped).push("brain/mempalace/wings/f2");

    res.json({ ok: true, created, skipped });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/initialize]", err);
    res.status(500).json({ error: msg });
  }
}
