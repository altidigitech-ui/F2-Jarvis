import { Request, Response } from "express";
import { ghUpdate } from "../lib/github.js";
import { cacheInvalidateAll } from "../lib/cache.js";
import {
  appendDecision, appendProgressEvent, resolveProgressEvent,
  appendColdLog, appendEngagementLog, markPlanPublished,
} from "../lib/markdown.js";
import { applySideEffects } from "../lib/action-executor.js";

type Persona = "romain" | "fabrice";
type Platform = "TWITTER" | "LINKEDIN" | "IH" | "PH";

type ActionBody = {
  persona: Persona;
  mode?: "normal" | "f2";
  action: "mark_published" | "log_decision" | "incident_resolved" | "log_cold" | "log_interaction" | "patch_file";
  payload: Record<string, string>;
};

export async function actionRoute(req: Request, res: Response): Promise<void> {
  const body = req.body as ActionBody;
  const { persona, action, payload } = body;
  const prefix = persona;

  if (!persona || !action) {
    res.status(400).json({ error: "Missing persona or action" });
    return;
  }

  try {
    switch (action) {
      case "mark_published": {
        const title = payload.title || "";
        await ghUpdate(
          `${prefix}/planning/plan-hebdo.md`,
          (md) => markPlanPublished(md, title),
          `[JARVIS] ✅ Published: ${title.slice(0, 60)}`,
        );
        cacheInvalidateAll();
        await applySideEffects("mark_published", { title, _persona_prefix: prefix }, persona);
        break;
      }
      case "log_decision": {
        const decision = payload.decision || "";
        await ghUpdate(
          "tracking/decisions-log.md",
          (md) => appendDecision(md, decision, payload.rationale || "", payload.result),
          `[JARVIS] 📋 Decision: ${decision.slice(0, 60)}`,
        );
        break;
      }
      case "incident_resolved": {
        const keyword = payload.keyword || "";
        await ghUpdate(
          `${prefix}/tracking/progress-semaines.md`,
          (md) => resolveProgressEvent(md, keyword),
          `[JARVIS] ✅ Resolved: ${keyword.slice(0, 60)}`,
        );
        break;
      }
      case "log_cold": {
        const platform = ((payload.platform || "TWITTER").toUpperCase()) as "TWITTER" | "LINKEDIN" | "FACEBOOK" | "TIKTOK" | "INSTAGRAM";
        const coldFile = `cold-log-${platform.toLowerCase()}.md`;
        const coldPath = (platform === "TIKTOK" || platform === "INSTAGRAM")
          ? `marketing/saas-app-shopify/storemd/cold/${coldFile}`
          : `${prefix}/cold/${coldFile}`;
        const operator = persona === "romain" ? "R" : "F";
        await ghUpdate(
          coldPath,
          (md) => appendColdLog(md, platform, {
            target: payload.target || "",
            storeUrl: payload.store_url || "",
            message: payload.message || "",
            status: payload.status,
            vertical: payload.vertical || "",
            insight: payload.insight || "",
            notes: payload.notes,
            groupSource: payload.group_source || "",
            operator,
          }),
          `[JARVIS] 📨 Cold ${platform}: ${payload.target || ""}`,
        );
        cacheInvalidateAll();
        await applySideEffects("log_cold", {
          platform,
          target: payload.target || "",
          targets: [{ target: payload.target || "" }],
          _persona_prefix: prefix,
        }, persona);
        break;
      }
      case "log_interaction": {
        const platform = ((payload.platform || "TWITTER").toUpperCase()) as Platform;
        await ghUpdate(
          `${prefix}/engagement/engagement-log.md`,
          (md) => appendEngagementLog(md, platform, payload.post || "", payload.reply || ""),
          `[JARVIS] 💬 Interaction: ${platform}`,
        );
        if (payload.event) {
          await ghUpdate(
            `${prefix}/tracking/progress-semaines.md`,
            (md) => appendProgressEvent(md, payload.event, platform, payload.activity || "", payload.action_taken || ""),
            `[JARVIS] 📋 Event: ${payload.event.slice(0, 50)}`,
          );
        }
        break;
      }
      case "patch_file": {
        const filePath = payload.path || "";
        const patches = JSON.parse(payload.patches || "[]") as Array<{ search: string; replace: string }>;
        await ghUpdate(
          filePath,
          (md) => {
            let result = md;
            for (const patch of patches) {
              if (patch.search && result.includes(patch.search)) {
                result = result.replace(patch.search, patch.replace);
              }
            }
            return result;
          },
          `[JARVIS] patch: ${filePath.split("/").pop()}`,
        );
        break;
      }
      default:
        res.status(400).json({ error: "Unknown action" });
        return;
    }
    cacheInvalidateAll();
    res.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/action]", action, err);
    res.status(500).json({ error: msg });
  }
}
