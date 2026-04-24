import { Request, Response } from "express";
import { ghUpdate } from "../lib/github.js";
import { cacheInvalidateAll } from "../lib/cache.js";
import {
  appendDecision, appendProgressEvent, resolveProgressEvent,
  appendColdLog, appendEngagementLog, markPlanPublished, markCrossPublished,
} from "../lib/markdown.js";

type Persona = "romain" | "fabrice";
type Platform = "TWITTER" | "LINKEDIN" | "IH" | "PH";

type ActionBody = {
  persona: Persona;
  action: "mark_published" | "mark_cross_published" | "log_decision" | "incident_resolved" | "log_cold" | "log_interaction" | "patch_file";
  payload: Record<string, string>;
};

export async function actionRoute(req: Request, res: Response): Promise<void> {
  const body = req.body as ActionBody;
  const { persona, action, payload } = body;

  if (!persona || !action) {
    res.status(400).json({ error: "Missing persona or action" });
    return;
  }

  try {
    switch (action) {
      case "mark_published": {
        const title = payload.title || "";
        await ghUpdate(
          `${persona}/plan-hebdo.md`,
          (md) => markPlanPublished(md, title),
          `[JARVIS] ✅ Published: ${title.slice(0, 60)}`,
        );
        if (payload.crossReply) {
          await ghUpdate(
            `${persona}/cross-engagement-tracker.md`,
            (md) => markCrossPublished(md, title, payload.crossReply),
            `[JARVIS] ✅ Cross published: ${title.slice(0, 50)}`,
          );
        }
        break;
      }
      case "mark_cross_published": {
        const post = payload.post || payload.title || "";
        const crossId = payload.cross_id || "";
        const reply = payload.reply || "";
        const time = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

        await ghUpdate(
          `${persona}/engagement/cross-execution-log.md`,
          (md) => {
            const lines = md.split("\n");
            let matched = false;
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              if (!line.startsWith("|") || line.startsWith("|---") || line.startsWith("|ID")) continue;
              const cells = line.split("|").map(c => c.trim());
              const cellId = (cells[1] || "").trim();
              const cellPost = (cells[3] || "").toLowerCase();

              const idMatch = crossId && cellId.toLowerCase() === crossId.toLowerCase();
              const postAsId = /^[AB]\d{1,2}$/i.test(post) && cellId.toLowerCase() === post.toLowerCase();
              const postWords = post.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
              const contentMatch = !idMatch && !postAsId && postWords.length > 0 &&
                postWords.filter((w: string) => cellPost.includes(w)).length >= Math.ceil(postWords.length * 0.4);

              if (idMatch || postAsId || contentMatch) {
                if (cells.length >= 7) {
                  cells[5] = cells[5] === "—" ? `~${time}` : cells[5];
                  cells[6] = "✅ Fait";
                  if (cells.length >= 8) cells[7] = reply ? reply.slice(0, 50) : `Confirmé ${time}`;
                  lines[i] = "|" + cells.slice(1).join("|") + "|";
                  matched = true;
                  break;
                }
              }
            }
            if (!matched) {
              console.warn(`[action] mark_cross_published: no match for cross_id="${crossId}" post="${post}"`);
            }
            return lines.join("\n");
          },
          `[JARVIS] ✅ Cross: ${post.slice(0, 60)}`,
        );

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
          `${persona}/progress-semaine.md`,
          (md) => resolveProgressEvent(md, keyword),
          `[JARVIS] ✅ Resolved: ${keyword.slice(0, 60)}`,
        );
        break;
      }
      case "log_cold": {
        const platform = ((payload.platform || "TWITTER").toUpperCase()) as "TWITTER" | "LINKEDIN";
        await ghUpdate(
          `${persona}/cold/cold-outreach-log.md`,
          (md) => appendColdLog(md, platform, payload.target || "", payload.vertical || "", payload.insight || "", payload.type || "DM"),
          `[JARVIS] 📨 Cold: ${payload.target || ""}`,
        );
        break;
      }
      case "log_interaction": {
        const platform = ((payload.platform || "TWITTER").toUpperCase()) as Platform;
        await ghUpdate(
          `${persona}/engagement/engagement-log.md`,
          (md) => appendEngagementLog(md, platform, payload.post || "", payload.reply || ""),
          `[JARVIS] 💬 Interaction: ${platform}`,
        );
        if (payload.event) {
          await ghUpdate(
            `${persona}/progress-semaine.md`,
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
