import { Request, Response } from "express";
import { ghRead, ghWrite, ghList, ghCreate, ghDelete } from "../lib/github.js";

const STATE_PATH = "brain/ouroboros/state.json";
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

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  // Try YAML frontmatter first
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (fmMatch) {
    const meta: Record<string, string> = {};
    for (const line of fmMatch[1].split(/\r?\n/)) {
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        meta[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
      }
    }
    return { meta, body: fmMatch[2] };
  }

  // Fallback: parse **Key** : value bold fields
  const meta: Record<string, string> = {};
  const boldRegex = /\*\*([^*]+)\*\*\s*:\s*(.+)/g;
  let match;
  while ((match = boldRegex.exec(content)) !== null) {
    meta[match[1].trim().toLowerCase()] = match[2].trim();
  }
  return { meta, body: content };
}

function mapPriority(raw: string): Priority {
  const p = raw.toLowerCase();
  if (p === "critique" || p === "critical") return "critical";
  if (p === "haute" || p === "high") return "high";
  if (p === "faible" || p === "low") return "low";
  return "medium";
}

function extractTitle(body: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Sans titre";
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
    type: meta.type || "pattern",
    priority: mapPriority(meta.priority || meta["priorité"] || "medium"),
    wing: meta.wing || "f2-core",
    title,
    preview,
    timestamp: meta.timestamp || meta.date || "",
    cycle: meta.cycle || "",
    fullContent: content,
  };
}

const PRIORITY_ORDER: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };

// GET /ouroboros/status
export async function ouroborosStatus(req: Request, res: Response): Promise<void> {
  try {
    let lastCycle = null;
    let budgetUsed = 0;
    let budgetCap = 10;

    const stateFile = await ghRead(STATE_PATH);
    if (stateFile) {
      try {
        const state = JSON.parse(stateFile.content);
        lastCycle = state.lastCycle || null;
        budgetUsed = state.budgetUsed || 0;
        budgetCap = state.budgetCap || 10;
      } catch { /* ignore parse errors */ }
    }

    const pendingFiles = await ghList(PROPOSALS_PENDING);
    const proposalsPending = pendingFiles.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_")
    ).length;

    const killFile = await ghRead(KILL_SWITCH_PATH);
    const killSwitchActive = killFile !== null;

    // Next cycle: 3 AM CEST (1 AM UTC in winter, 2 AM UTC in summer — approximate)
    const now = new Date();
    const nextCycle = new Date(now);
    nextCycle.setUTCDate(nextCycle.getUTCDate() + 1);
    nextCycle.setUTCHours(2, 0, 0, 0);

    res.json({
      lastCycle,
      nextCycle: nextCycle.toISOString(),
      proposalsPending,
      budgetUsed,
      budgetRemaining: Math.max(0, budgetCap - budgetUsed),
      budgetCap,
      killSwitchActive,
      initialized: stateFile !== null || proposalsPending > 0,
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
    const files = await ghList(PROPOSALS_PENDING);
    const mdFiles = files.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_")
    );

    const proposals: ProposalMeta[] = [];
    for (const file of mdFiles) {
      const content = await ghRead(`${PROPOSALS_PENDING}/${file.name}`);
      if (content) {
        proposals.push(parseProposal(file.name, content.content));
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
    const content = await ghRead(`${PROPOSALS_PENDING}/${filename}`);
    if (!content) {
      res.status(404).json({ error: "Proposition introuvable" });
      return;
    }
    res.json(parseProposal(filename, content.content));
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

    const file = await ghRead(`${PROPOSALS_PENDING}/${filename}`);
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

    res.json({ ok: true, action, proposalId: id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/action]", err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/trigger
export async function ouroborosTrigger(req: Request, res: Response): Promise<void> {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const triggerPath = `${TRIGGERS_DIR}/manual-${timestamp}.trigger`;
    const content = `Manual cycle triggered via JARVIS at ${new Date().toISOString()}\n`;

    await ghCreate(triggerPath, content, "chore(ouroboros): manual cycle trigger via JARVIS");

    const estimatedStart = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    res.json({ triggered: true, estimatedStart, triggerPath });
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
      const existing = await ghRead(KILL_SWITCH_PATH);
      if (!existing) {
        const content = `Kill-switch activé via JARVIS le ${new Date().toISOString()}\n`;
        await ghCreate(KILL_SWITCH_PATH, content, "chore(ouroboros): activate kill-switch via JARVIS");
      }
    } else {
      const file = await ghRead(KILL_SWITCH_PATH);
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
    const diaryDir = await ghList("brain/ouroboros/diary");
    const mdFiles = diaryDir.filter(
      f => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_")
    );

    if (mdFiles.length === 0) {
      res.json({ entries: [] });
      return;
    }

    mdFiles.sort((a, b) => b.name.localeCompare(a.name));
    const recentFiles = mdFiles.slice(0, 10);

    const entries = [];
    for (const file of recentFiles) {
      const content = await ghRead(`brain/ouroboros/diary/${file.name}`);
      if (content) {
        entries.push({ filename: file.name, content: content.content });
      }
    }

    res.json({ entries });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/diary]", err);
    res.status(500).json({ error: msg });
  }
}

// POST /ouroboros/initialize
export async function ouroborosInitialize(req: Request, res: Response): Promise<void> {
  try {
    const created: string[] = [];

    const stateExists = await ghRead(STATE_PATH);
    if (!stateExists) {
      const state = JSON.stringify({
        lastCycle: null,
        budgetUsed: 0,
        budgetCap: 10,
        initializedAt: new Date().toISOString(),
      }, null, 2);
      await ghCreate(STATE_PATH, state, "chore(ouroboros): initialize state via JARVIS");
      created.push(STATE_PATH);
    }

    for (const dir of [PROPOSALS_PENDING, PROPOSALS_ACCEPTED, PROPOSALS_REJECTED, PROPOSALS_IGNORED]) {
      const entries = await ghList(dir);
      if (entries.length === 0) {
        await ghCreate(`${dir}/.gitkeep`, "", `chore(ouroboros): init ${dir.split("/").pop()} dir`);
        created.push(dir);
      }
    }

    res.json({ ok: true, created });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/ouroboros/initialize]", err);
    res.status(500).json({ error: msg });
  }
}
