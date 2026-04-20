import { NextRequest } from "next/server";
import { cestNow } from "@/lib/markdown-writer";
import { ghUpdate } from "@/lib/github-writer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const now = cestNow();
  const hour = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(",", "");

  // Append a batch timestamp entry to the batch log
  try {
    await ghUpdate(
      "tracking/batch-log.md",
      (md) => {
        const entry = `| ${now} CEST | Batch ${hour} | Auto-cycle JARVIS |`;
        if (!md || md.trim() === "") {
          return `# Batch Log\n\n| Timestamp | Cycle | Note |\n|-----------|-------|------|\n${entry}\n`;
        }
        const lines = md.split("\n");
        let lastTableIdx = -1;
        for (let i = 0; i < lines.length; i++) {
          if (/^\|/.test(lines[i].trim())) lastTableIdx = i;
        }
        if (lastTableIdx === -1) return md + "\n" + entry;
        lines.splice(lastTableIdx + 1, 0, entry);
        return lines.join("\n");
      },
      `[BATCH ${hour}] JARVIS auto-cycle`,
    );
  } catch {
    // batch log write failure is non-fatal
  }

  return Response.json({ ok: true, timestamp: now });
}
