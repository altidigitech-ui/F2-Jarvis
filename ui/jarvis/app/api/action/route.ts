import { NextRequest } from "next/server";
import { ghUpdate } from "@/lib/github-writer";
import {
  appendDecision,
  appendProgressEvent,
  resolveProgressEvent,
  appendColdLog,
  appendEngagementLog,
  markPlanPublished,
  markCrossPublished,
} from "@/lib/markdown-writer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Persona = "romain" | "fabrice";
type Platform = "TWITTER" | "LINKEDIN" | "IH" | "PH";

type ActionBody = {
  persona: Persona;
  action: "mark_published" | "log_decision" | "incident_resolved" | "log_cold" | "log_interaction";
  payload: Record<string, string>;
};

export async function POST(req: NextRequest) {
  let body: ActionBody;
  try {
    body = await req.json() as ActionBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { persona, action, payload } = body;
  if (!persona || !action) {
    return Response.json({ error: "Missing persona or action" }, { status: 400 });
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

      default:
        return Response.json({ error: "Unknown action" }, { status: 400 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/action]", action, err);
    return Response.json({ error: msg }, { status: 500 });
  }
}
