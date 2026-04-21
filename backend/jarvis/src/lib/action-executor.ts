import { getSupabase } from "./supabase.js";
import { ghUpdate } from "./github.js";
import {
  appendColdLog,
  appendColdQueue,
  appendDecision,
  appendEngagementLog,
  appendProgressEvent,
  markCrossPublished,
  markPlanPublished,
  resolveProgressEvent,
  updateColdReply,
} from "./markdown.js";

type Persona = "fabrice" | "romain";
type Platform = "TWITTER" | "LINKEDIN" | "REDDIT" | "FACEBOOK" | "IH" | "PH";

export interface PendingAction {
  id: string;
  conversation_id: string;
  action_type: string;
  params: Record<string, unknown>;
  preview: string;
  status: string;
}

function resolveFilePath(
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
        path: `${persona}/cross-engagement-tracker.md`,
        commitPrefix: `${persona}: cross published`,
      };
    case "log_decision":
      return { path: `tracking/decisions-log.md`, commitPrefix: `decision` };
    default:
      throw new Error(`Unknown action_type: ${actionType}`);
  }
}

function applyTransform(
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

    case "mark_cross_published":
      return markCrossPublished(md, String(params.post || ""), String(params.reply || ""));

    case "resolve_alert":
      return resolveProgressEvent(md, String(params.keyword || ""));

    case "log_decision":
      return appendDecision(
        md,
        String(params.decision || ""),
        String(params.rationale || ""),
        params.result ? String(params.result) : "En cours"
      );

    default:
      throw new Error(`Unknown action_type: ${actionType}`);
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

  try {
    const { path, commitPrefix } = resolveFilePath(action.action_type, persona, action.params);
    const previewShort = action.preview.slice(0, 60).replace(/\n/g, " ");

    await ghUpdate(
      path,
      (md) => applyTransform(action.action_type, action.params, md),
      `[JARVIS] ${commitPrefix}: ${previewShort}`
    );

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
