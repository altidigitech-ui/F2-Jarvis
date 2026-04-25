import { getSupabase } from "./supabase.js";
import { ghCreate, ghDelete, ghRead, ghUpdate, ghWrite } from "./github.js";
import { cacheInvalidateAll } from "./cache.js";
import {
  appendAnalyticsRow,
  appendColdLog,
  appendColdQueue,
  appendDecision,
  appendEngagementLog,
  appendProgressEvent,
  incrementCurrentCounter,
  markPlanPublished,
  resolveProgressEvent,
  updateColdReply,
} from "./markdown.js";

type Persona = "fabrice" | "romain";
type Platform = "TWITTER" | "LINKEDIN" | "REDDIT" | "FACEBOOK" | "IH" | "PH";

// ---------------------------------------------------------------------------
// create_file security guards
// ---------------------------------------------------------------------------

/** Max content size allowed for create_file actions (500 KB). */
const CREATE_FILE_MAX_BYTES = 500 * 1024;

/** File extensions allowed for create_file (whitelisted, safer path). */
const CREATE_FILE_ALLOWED_EXTENSIONS = new Set([
  ".md",
  ".txt",
  ".json",
  ".yml",
  ".yaml",
  ".csv",
]);

/**
 * Path prefixes allowed for create_file.
 * Anything under backend/, ui/, supabase-migrations/, brain/mempalace/ is REFUSED
 * to prevent JARVIS from overwriting code, migrations, or the verbatim archive.
 * Racine allowed if filename starts with BATCH-, PLAN-, HANDOFF-, or CHANGELOG-.
 */
const CREATE_FILE_ALLOWED_PREFIXES = [
  "f2/",
  "fabrice/",
  "romain/",
  "strategie/",
  "patterns/",
  "tracking/",
  "archives/",
  "distribution/",
  "growth-marketing/",
  "saas/",
  "produits/",
  "ops/",
  "marketing/",
  "brain/jarvis-workspace/",
  ".claude/agents/",
];

/** Exact filenames allowed at repo root (in addition to prefixes). */
const CREATE_FILE_ALLOWED_ROOT_PATTERNS: RegExp[] = [
  /^BATCH-SEMAINE-\d+\.md$/,
  /^PLAN-[\w-]+\.md$/,
  /^HANDOFF(-[\w-]+)?\.md$/,
  /^CHANGELOG(-[\w-]+)?\.md$/,
  /^REVUE-[\w-]+\.md$/,
  /^ARCH\.md$/,
  /^README\.md$/,
  /^ENTRYPOINT\.md$/,
  /^AUDIT\.md$/,
  /^JARVIS([-\w]+)?\.md$/,
  /^TEMPLATE-[\w-]+\.md$/,
  /^ANTI-IA\.md$/,
  /^VISUELS\.md$/,
];

function validateCreateFilePath(path: string): void {
  if (!path || typeof path !== "string") {
    throw new Error("create_file: path is required");
  }
  // No traversal
  if (path.includes("..") || path.startsWith("/") || path.includes("\\")) {
    throw new Error(`create_file: illegal path "${path}" (no traversal, no absolute, no backslash)`);
  }
  // Extension whitelist
  const lastDot = path.lastIndexOf(".");
  if (lastDot < 0) {
    throw new Error(`create_file: path "${path}" has no extension`);
  }
  const ext = path.slice(lastDot).toLowerCase();
  if (!CREATE_FILE_ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(
      `create_file: extension "${ext}" not allowed. Allowed: ${[...CREATE_FILE_ALLOWED_EXTENSIONS].join(", ")}`
    );
  }
  // Prefix OR root pattern
  const hasPrefix = CREATE_FILE_ALLOWED_PREFIXES.some((p) => path.startsWith(p));
  const hasRootPattern = CREATE_FILE_ALLOWED_ROOT_PATTERNS.some((re) => re.test(path));
  if (!hasPrefix && !hasRootPattern) {
    throw new Error(
      `create_file: path "${path}" not allowed. Must start with one of ${CREATE_FILE_ALLOWED_PREFIXES.join(", ")} OR match a root pattern (BATCH-SEMAINE-N.md, PLAN-*.md, HANDOFF*.md, CHANGELOG*.md, REVUE-*.md)`
    );
  }
}

const PATCH_FILE_ALLOWED_PREFIXES = [
  ...CREATE_FILE_ALLOWED_PREFIXES,
  "backend/jarvis/src/",
  "ui/jarvis/",
  ".claude/skills/",
];

function validatePatchFilePath(path: string): void {
  if (!path || typeof path !== "string") {
    throw new Error("patch_file: path is required");
  }
  if (path.includes("..") || path.startsWith("/") || path.includes("\\")) {
    throw new Error(`patch_file: illegal path "${path}" (no traversal, no absolute, no backslash)`);
  }
  const lastDot = path.lastIndexOf(".");
  if (lastDot < 0) {
    throw new Error(`patch_file: path "${path}" has no extension`);
  }
  const ext = path.slice(lastDot).toLowerCase();
  const patchAllowedExts = new Set([...CREATE_FILE_ALLOWED_EXTENSIONS, ".ts", ".tsx"]);
  if (!patchAllowedExts.has(ext)) {
    throw new Error(
      `patch_file: extension "${ext}" not allowed. Allowed: ${[...patchAllowedExts].join(", ")}`
    );
  }
  const hasPrefix = PATCH_FILE_ALLOWED_PREFIXES.some((p) => path.startsWith(p));
  const hasRootPattern = CREATE_FILE_ALLOWED_ROOT_PATTERNS.some((re) => re.test(path));
  if (!hasPrefix && !hasRootPattern) {
    throw new Error(
      `patch_file: path "${path}" not allowed. Must start with one of: ${PATCH_FILE_ALLOWED_PREFIXES.join(", ")}`
    );
  }
}

function validateCreateFileContent(content: string): void {
  if (typeof content !== "string") {
    throw new Error("create_file: content must be a string");
  }
  const byteSize = Buffer.byteLength(content, "utf-8");
  if (byteSize > CREATE_FILE_MAX_BYTES) {
    throw new Error(
      `create_file: content too large (${byteSize} bytes, max ${CREATE_FILE_MAX_BYTES})`
    );
  }
  if (content.length === 0) {
    throw new Error("create_file: content cannot be empty");
  }
}

export interface PendingAction {
  id: string;
  conversation_id: string;
  action_type: string;
  params: Record<string, unknown>;
  preview: string;
  status: string;
}

export function resolveFilePath(
  actionType: string,
  persona: Persona,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _params: Record<string, unknown>
): { path: string; commitPrefix: string } {
  switch (actionType) {
    case "mark_published":
      return { path: `${persona}/plan-hebdo.md`, commitPrefix: `${persona}: ✅ published` };
    case "log_cold":
    case "batch_cold":
    case "queue_cold_targets":
    case "update_cold_reply":
      return { path: `${persona}/cold/cold-outreach-log.md`, commitPrefix: `${persona}: cold` };
    case "log_engagement":
      return {
        path: `${persona}/engagement/engagement-log.md`,
        commitPrefix: `${persona}: engagement`,
      };
    case "log_interaction":
    case "resolve_alert":
      return { path: `${persona}/progress-semaine.md`, commitPrefix: `${persona}: progress` };
    case "mark_cross_published":
      return {
        path: `${persona}/engagement/cross-execution-log.md`,
        commitPrefix: `${persona}: cross published`,
      };
    case "log_analytics":
      return { path: `${persona}/progress-semaine.md`, commitPrefix: `${persona}: analytics` };
    case "log_decision":
      return { path: `tracking/decisions-log.md`, commitPrefix: `decision` };
    case "create_file": {
      const path = String(_params.path || "");
      validateCreateFilePath(path);
      return {
        path,
        commitPrefix: `create`,
      };
    }
    case "patch_file": {
      const path = String(_params.path || "");
      validatePatchFilePath(path);
      return { path, commitPrefix: "patch" };
    }
    case "move_file": {
      const fromPath = String(_params.from || "");
      validateCreateFilePath(fromPath);
      return { path: fromPath, commitPrefix: "move" };
    }
    case "delete_file": {
      const delPath = String(_params.path || "");
      validateCreateFilePath(delPath);
      return { path: delPath, commitPrefix: "delete" };
    }
    default:
      throw new Error(`Unknown action_type: ${actionType}`);
  }
}

export function applyTransform(
  actionType: string,
  params: Record<string, unknown>,
  md: string
): string {
  switch (actionType) {
    case "mark_published":
      return markPlanPublished(md, String(params.title || ""));

    case "log_cold":
      return appendColdLog(
        md,
        (String(params.platform || "TWITTER").toUpperCase() as "TWITTER" | "LINKEDIN"),
        String(params.target || ""),
        String(params.vertical || ""),
        String(params.insight || ""),
        String(params.type || "reply")
      );

    case "batch_cold": {
      const targets = (params.targets as Array<Record<string, string>>) || [];
      const platform = (String(params.platform || "TWITTER").toUpperCase() as
        | "TWITTER"
        | "LINKEDIN");
      let out = md;
      for (const t of targets) {
        out = appendColdLog(
          out,
          platform,
          t.target || "",
          t.vertical || String(params.vertical || ""),
          t.insight || String(params.insight || ""),
          t.type || "reply"
        );
      }
      return out;
    }

    case "queue_cold_targets": {
      const platform = (String(params.platform || "TWITTER").toUpperCase() as
        | "TWITTER"
        | "LINKEDIN");
      const targets =
        (params.targets as Array<{
          target: string;
          vertical?: string;
          insight?: string;
          notes?: string;
        }>) || [];
      return appendColdQueue(md, platform, targets);
    }

    case "update_cold_reply":
      return updateColdReply(
        md,
        String(params.target || ""),
        String(params.reply_status || "✅"),
        params.notes ? String(params.notes) : undefined
      );

    case "log_engagement":
      return appendEngagementLog(
        md,
        (String(params.platform || "TWITTER").toUpperCase() as Platform),
        String(params.post || ""),
        String(params.reply || "")
      );

    case "log_interaction":
      return appendProgressEvent(
        md,
        String(params.event || ""),
        String(params.platform || ""),
        String(params.activity || ""),
        String(params.action || "")
      );

    case "mark_cross_published": {
      const post = String(params.post || "");
      const crossId = String(params.cross_id || "");
      const reply = String(params.reply || "");
      const time = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

      const lines = md.split("\n");
      let matched = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.startsWith("|") || line.startsWith("|---") || line.startsWith("|ID")) continue;

        const cells = line.split("|").map(c => c.trim());
        const cellId = (cells[1] || "").trim();
        const cellPost = (cells[3] || "").toLowerCase();

        // Priority 1: match by explicit cross_id (B6, A12)
        const idMatch = crossId && cellId.toLowerCase() === crossId.toLowerCase();
        // Priority 2: match by ID if post looks like an ID (B6, A12)
        const postAsId = /^[AB]\d{1,2}$/i.test(post) && cellId.toLowerCase() === post.toLowerCase();
        // Priority 3: match by content — check if cellPost contains key words from post
        const postWords = post.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const contentMatch = !idMatch && !postAsId && postWords.length > 0 &&
          postWords.filter(w => cellPost.includes(w)).length >= Math.ceil(postWords.length * 0.4);

        if (idMatch || postAsId || contentMatch) {
          if (cells.length >= 7) {
            cells[5] = cells[5] === "—" ? `~${time}` : cells[5];
            cells[6] = "✅ Fait";
            if (cells.length >= 8) {
              cells[7] = reply ? reply.slice(0, 50) : `Confirmé ${time}`;
            }
            lines[i] = "|" + cells.slice(1).join("|") + "|";
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        console.warn(`[action-executor] mark_cross_published: no match for cross_id="${crossId}" post="${post}"`);
      }

      return lines.join("\n");
    }

    case "resolve_alert":
      return resolveProgressEvent(md, String(params.keyword || ""));

    case "log_analytics": {
      const day = String(params.day || "");
      const platform = params.platform ? String(params.platform) : null;
      const impressions = String(params.impressions || "");
      const engRate = String(params.eng_rate || "");
      const replies = String(params.replies || "");
      const newFollows = String(params.new_follows || "");
      const section = String(params.section || "ANALYTICS");
      const row = platform
        ? [day, platform, impressions, engRate, replies, newFollows]
        : [day, impressions, engRate, replies, newFollows];
      return appendAnalyticsRow(md, row, section);
    }

    case "log_decision":
      return appendDecision(
        md,
        String(params.decision || ""),
        String(params.rationale || ""),
        params.result ? String(params.result) : "En cours"
      );

    case "patch_file": {
      const patches = (params.patches as Array<{ search: string; replace: string }>) || [];
      let result = md;
      const applied: string[] = [];
      const failed: string[] = [];

      for (const patch of patches) {
        if (!patch.search) {
          // Empty search = full overwrite (used for new file creation)
          result = patch.replace;
          applied.push("(create/overwrite)");
        } else if (result.includes(patch.search)) {
          result = result.replace(patch.search, patch.replace);
          applied.push(patch.search.slice(0, 40));
        } else {
          failed.push(patch.search.slice(0, 40));
        }
      }

      if (failed.length > 0) {
        console.warn(`[action-executor] patch_file: ${failed.length} patches not found:`, failed);
      }
      if (applied.length === 0 && patches.length > 0) {
        throw new Error(
          `patch_file: aucun patch appliqué (${patches.length} tentatives). Chaînes non trouvées: ${failed.slice(0, 3).map(s => `"${s}"`).join(', ')}`
        );
      }

      return result;
    }

    default:
      throw new Error(`Unknown action_type: ${actionType}`);
  }
}

/**
 * After the primary action is committed, apply side-effects to other files.
 * Each side-effect is a separate commit (best-effort, non-blocking).
 */
export async function applySideEffects(
  actionType: string,
  params: Record<string, unknown>,
  persona: Persona
): Promise<void> {
  const time = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

  try {
    switch (actionType) {

      case "mark_published": {
        const title = String(params.title || "");
        const platform = title.toLowerCase().includes("linkedin") ? "LinkedIn" : "Twitter";
        await ghUpdate(
          `${persona}/progress-semaine.md`,
          (md) => appendProgressEvent(
            md,
            `${platform} post publié — "${title.slice(0, 50)}"`,
            platform,
            `Post publié ${time}`,
            "Monitorer impressions + replies"
          ),
          `[JARVIS] ${persona}: progress — published "${title.slice(0, 30)}"`
        ).catch((err) => {
          console.error(`[action-executor] side-effect mark_published failed:`, err instanceof Error ? err.message : err);
        });
        break;
      }

      case "mark_cross_published": {
        const post = String(params.post || "");

        // Seul side-effect : log in progress-semaine.md
        await ghUpdate(
          `${persona}/progress-semaine.md`,
          (md) => appendProgressEvent(
            md,
            `Cross-engagement exécuté — ${post.slice(0, 50)}`,
            "Cross",
            `Reply ${time}`,
            "✅"
          ),
          `[JARVIS] ${persona}: progress — cross ${post.slice(0, 30)}`
        ).catch((err) => {
          console.error(`[action-executor] side-effect mark_cross progress failed:`, err instanceof Error ? err.message : err);
        });
        break;
      }

      case "log_cold":
      case "batch_cold": {
        const platform = String(params.platform || "Twitter");
        const target = String(params.target || "");
        const count = actionType === "batch_cold"
          ? ((params.targets as unknown[]) || []).length
          : 1;
        await ghUpdate(
          `${persona}/progress-semaine.md`,
          (md) => {
            const updated = incrementCurrentCounter(md, "Cold envoyés", count);
            return appendProgressEvent(
              updated,
              `Cold ${platform} x${count}${target ? ` (${target.slice(0, 30)})` : ""}`,
              platform,
              `Cold outreach ${time}`,
              "Suivre les réponses"
            );
          },
          `[JARVIS] ${persona}: progress — cold +${count}`
        ).catch((err) => {
          console.error(`[action-executor] side-effect cold failed:`, err instanceof Error ? err.message : err);
        });
        break;
      }

      case "log_engagement": {
        await ghUpdate(
          `${persona}/progress-semaine.md`,
          (md) => incrementCurrentCounter(md, "Engagements", 1),
          `[JARVIS] ${persona}: progress — engagement`
        ).catch((err) => {
          console.error(`[action-executor] side-effect log_engagement failed:`, err instanceof Error ? err.message : err);
        });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.warn(`[action-executor] side-effect failed for ${actionType}:`, err);
  }
}

/**
 * Executes a pending action: reads the action row, commits the change to the repo,
 * updates status to 'executed', or 'failed' with error message.
 */
export async function executeAction(actionId: string): Promise<PendingAction> {
  const sb = getSupabase();

  const { data: row, error: readErr } = await sb
    .from("jarvis_pending_actions")
    .select("*, jarvis_conversations!inner(persona)")
    .eq("id", actionId)
    .single();

  if (readErr || !row) {
    throw new Error(`[action-executor] pending not found: ${readErr?.message || actionId}`);
  }

  const action = row as PendingAction & { jarvis_conversations: { persona: Persona } };

  if (action.status === "executed") {
    return action;
  }

  if (action.status !== "pending" && action.status !== "validated") {
    throw new Error(`[action-executor] action ${actionId} status=${action.status}, cannot execute`);
  }

  const persona = action.jarvis_conversations.persona;
  const effectivePersona = (action.params._persona_prefix as Persona) || persona;

  try {
    const { path, commitPrefix } = resolveFilePath(action.action_type, effectivePersona, action.params);
    const previewShort = action.preview.slice(0, 60).replace(/\n/g, " ");

    if (action.action_type === "create_file") {
      // Dedicated path: create new file OR overwrite existing one (no transform).
      const content = String((action.params as Record<string, unknown>).content || "");
      const userCommitMsg = String((action.params as Record<string, unknown>).commit_message || "");
      validateCreateFileContent(content);

      // TypeScript pre-commit validation for .ts/.tsx files
      if (path.endsWith(".ts") || path.endsWith(".tsx")) {
        try {
          const { execSync } = await import("child_process");
          const fs = await import("fs/promises");
          const fullPath = `/app/${path}`;

          let original: string | null = null;
          try {
            original = await fs.readFile(fullPath, "utf-8");
          } catch { /* new file */ }

          const dir = fullPath.split("/").slice(0, -1).join("/");
          await fs.mkdir(dir, { recursive: true }).catch(() => {});
          await fs.writeFile(fullPath, content, "utf-8");

          try {
            execSync("npx tsc --noEmit 2>&1", { cwd: "/app", timeout: 30_000 });
          } catch (tscErr) {
            const output = (tscErr as { stdout?: string }).stdout || "";
            const errors = output.split("\n").filter((l: string) => l.includes("error TS")).slice(0, 10);
            if (original !== null) await fs.writeFile(fullPath, original, "utf-8");
            else await fs.unlink(fullPath).catch(() => {});
            throw new Error(`TypeScript compilation failed — file NOT committed:\n${errors.join("\n")}`);
          } finally {
            if (original !== null) await fs.writeFile(fullPath, original, "utf-8");
            else await fs.unlink(fullPath).catch(() => {});
          }
        } catch (err) {
          if ((err as Error).message.includes("TypeScript compilation failed")) {
            throw err;
          }
          // tsc not found or timeout — log but don't block
          console.warn("[action-executor] TypeScript check skipped:", err);
        }
      }

      const existing = await ghRead(path).catch(() => null);
      const finalCommitMsg =
        userCommitMsg && userCommitMsg.length < 200
          ? `[JARVIS] ${userCommitMsg}`
          : `[JARVIS] ${commitPrefix} ${path}: ${previewShort}`;

      if (existing) {
        // Overwrite with fresh SHA
        await ghWrite(path, content, existing.sha, finalCommitMsg);
      } else {
        await ghCreate(path, content, finalCommitMsg);
      }
    } else if (action.action_type === "patch_file") {
      const userCommitMsg = String((action.params as Record<string, unknown>).commit_message || "");
      const finalMsg = userCommitMsg && userCommitMsg.length < 200
        ? `[JARVIS] ${userCommitMsg}`
        : `[JARVIS] ${commitPrefix}: ${previewShort}`;
      const existingFile = await ghRead(path).catch(() => null);
      const currentContent = existingFile?.content ?? "";
      const newContent = applyTransform("patch_file", action.params, currentContent);
      if (existingFile) {
        if (newContent !== currentContent) await ghWrite(path, newContent, existingFile.sha, finalMsg);
      } else {
        await ghCreate(path, newContent, finalMsg);
      }
    } else if (action.action_type === "move_file") {
      const fromPath = String(action.params.from || "");
      const toPath = String(action.params.to || "");
      validateCreateFilePath(fromPath);
      validateCreateFilePath(toPath);
      const moveMsg = `[JARVIS] ${String(action.params.commit_message || `move ${fromPath} → ${toPath}`).slice(0, 180)}`;
      const sourceFile = await ghRead(fromPath);
      if (!sourceFile) throw new Error(`move_file: source not found: ${fromPath}`);
      const destFile = await ghRead(toPath).catch(() => null);
      if (destFile) {
        await ghWrite(toPath, sourceFile.content, destFile.sha, moveMsg);
      } else {
        await ghCreate(toPath, sourceFile.content, moveMsg);
      }
      await ghDelete(fromPath, sourceFile.sha, moveMsg);
    } else if (action.action_type === "delete_file") {
      const delPath = String(action.params.path || "");
      validateCreateFilePath(delPath);
      const delMsg = `[JARVIS] ${String(action.params.commit_message || `delete ${delPath}`).slice(0, 180)}`;
      const fileToDelete = await ghRead(delPath);
      if (!fileToDelete) throw new Error(`delete_file: file not found: ${delPath}`);
      await ghDelete(delPath, fileToDelete.sha, delMsg);
    } else {
      // Existing generic path: apply transform on top of current file content
      await ghUpdate(
        path,
        (md) => applyTransform(action.action_type, action.params, md),
        `[JARVIS] ${commitPrefix}: ${previewShort}`
      );
    }

    // Invalidate cache BEFORE side-effects so they read fresh data
    cacheInvalidateAll();

    // Apply side-effects to other files (non-blocking)
    await applySideEffects(action.action_type, action.params, effectivePersona);

    const { data: updated, error: updateErr } = await sb
      .from("jarvis_pending_actions")
      .update({
        status: "executed",
        resolved_at: new Date().toISOString(),
      })
      .eq("id", actionId)
      .select("*")
      .single();

    if (updateErr || !updated) {
      console.error(`[action-executor] failed to update status to executed:`, updateErr);
    }

    return (updated || action) as PendingAction;
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[action-executor] execute ${actionId} failed:`, errMsg);
    await sb
      .from("jarvis_pending_actions")
      .update({
        status: "failed",
        error: errMsg,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", actionId);
    throw new Error(errMsg);
  }
}

/**
 * Marks an accepted Ouroboros proposal as fully executed.
 * Appends a completion note to the accepted proposal file.
 */
export async function markProposalExecuted(proposalFilename: string, actionSummary: string): Promise<void> {
  const path = `brain/ouroboros/proposals/accepted/${proposalFilename}`;
  try {
    const file = await ghRead(path);
    if (!file) return;

    const now = new Date().toISOString();
    const updatedContent = file.content + `\n\n---\n**Exécuté le ${now}**\nActions réalisées : ${actionSummary}\n`;

    await ghWrite(path, updatedContent, file.sha, `chore(ouroboros): mark proposal executed — ${proposalFilename}`);
    console.log(`[action-executor] marked proposal executed: ${proposalFilename}`);
  } catch (err) {
    console.warn(`[action-executor] failed to mark proposal executed:`, err);
    // Non-bloquant — l'action a déjà été exécutée
  }
}

/**
 * Marks a pending action as rejected (user said no).
 */
export async function rejectAction(actionId: string): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb
    .from("jarvis_pending_actions")
    .update({ status: "rejected", resolved_at: new Date().toISOString() })
    .eq("id", actionId);
  if (error) throw new Error(`[action-executor] reject: ${error.message}`);
}
