// Point d'entrée du worker Railway (process séparé du web server)
import { Worker } from "bullmq";
import { getRedis } from "./lib/redis.js";
import { runOuroborosCycle } from "./lib/ouroboros-cycle.js";
import {
  ingestToMemPalaceBatch,
  archiveAllDailyConversations,
} from "./lib/mempalace-ingest.js";
import { getSupabase } from "./lib/supabase.js";
import { enqueueCold } from "./lib/queues.js";
import {
  jobQualify,
  jobEnrich,
  jobScan,
  jobCompose,
  jobPush,
  jobSequenceTick,
  jobImapPoll,
  jobSourceTick,
} from "./lib/cold/jobs.js";
import type { ColdJobName, ColdJobData } from "./lib/cold/types.js";

new Worker(
  "ouroboros-cycle",
  async (job) => {
    console.log(`[worker] ouroboros cycle ${job.id} started`);
    await runOuroborosCycle();
    // Archivage journalier — idempotent, safe to run every cycle
    try {
      await archiveAllDailyConversations();
    } catch (err) {
      console.warn("[worker] daily archive failed:", err);
    }
    console.log(`[worker] ouroboros cycle ${job.id} done`);
  },
  { connection: getRedis(), concurrency: 1 }
);

// Buffer pour accumuler les messages par persona avant de flush vers GitHub
const messageBuffers = new Map<
  string,
  Array<{ userMessage: string; assistantResponse: string; timestamp: string }>
>();
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

async function flushBuffers() {
  if (messageBuffers.size === 0) return;
  const snapshot = new Map(messageBuffers);
  messageBuffers.clear();
  for (const [persona, messages] of snapshot) {
    if (messages.length === 0) continue;
    try {
      await ingestToMemPalaceBatch(
        persona as "romain" | "fabrice" | "f2",
        messages
      );
    } catch (err) {
      console.error(`[worker] mempalace batch flush failed for ${persona}:`, err);
    }
  }
}

new Worker(
  "mempalace-ingest",
  async (job) => {
    const { persona, userMessage, assistantResponse } = job.data as {
      persona: "romain" | "fabrice" | "f2";
      userMessage: string;
      assistantResponse: string;
    };

    if (!messageBuffers.has(persona)) messageBuffers.set(persona, []);
    messageBuffers.get(persona)!.push({
      userMessage,
      assistantResponse,
      timestamp: new Date().toISOString(),
    });

    // Reset 3-minute idle timer on each new message
    if (flushTimeout) clearTimeout(flushTimeout);
    flushTimeout = setTimeout(() => {
      flushTimeout = null;
      flushBuffers().catch((err) =>
        console.error("[worker] scheduled flush failed:", err)
      );
    }, 3 * 60 * 1000);

    // Force flush when any persona buffer reaches 10 messages
    if (messageBuffers.get(persona)!.length >= 10) {
      if (flushTimeout) {
        clearTimeout(flushTimeout);
        flushTimeout = null;
      }
      await flushBuffers();
    }
  },
  { connection: getRedis(), concurrency: 1 }
);

// ───────────────────────────────────────────────────────────────────────────
// Cold pipeline worker — qualify · enrich · scan(stub) · compose · push + crons
// ───────────────────────────────────────────────────────────────────────────

// Enchaînement déterministe : qualify → enrich → scan → compose → push.
async function chainAfter(targetId: string, step: ColdJobName): Promise<void> {
  const { data } = await getSupabase()
    .from("cold_targets")
    .select("status")
    .eq("id", targetId)
    .single();
  const status = (data as { status?: string } | null)?.status;
  if (step === "qualify" && status === "qualified") {
    await enqueueCold("enrich", { targetId });
  } else if (step === "enrich" && status === "enriched") {
    await enqueueCold("scan", { targetId });
  } else if (step === "scan" && status === "scanned") {
    await enqueueCold("compose", { targetId });
  } else if (step === "compose" && status === "composed") {
    await enqueueCold("push", { targetId });
  }
}

new Worker(
  "cold",
  async (job) => {
    const name = job.name as ColdJobName;
    const { targetId } = (job.data || {}) as ColdJobData;

    switch (name) {
      case "qualify":
        if (!targetId) throw new Error("[worker] cold qualify sans targetId");
        await jobQualify(targetId);
        await chainAfter(targetId, "qualify");
        break;
      case "enrich":
        if (!targetId) throw new Error("[worker] cold enrich sans targetId");
        await jobEnrich(targetId);
        await chainAfter(targetId, "enrich");
        break;
      case "scan":
        if (!targetId) throw new Error("[worker] cold scan sans targetId");
        await jobScan(targetId);
        await chainAfter(targetId, "scan");
        break;
      case "compose":
        if (!targetId) throw new Error("[worker] cold compose sans targetId");
        await jobCompose(targetId);
        await chainAfter(targetId, "compose");
        break;
      case "push":
        if (!targetId) throw new Error("[worker] cold push sans targetId");
        await jobPush(targetId);
        break;
      case "sequence-tick": {
        const r = await jobSequenceTick();
        if (r.sent) console.log(`[worker] cold sequence-tick: ${r.sent} relances envoyées`);
        break;
      }
      case "imap-poll": {
        const r = await jobImapPoll();
        if (r.matched || r.bounced)
          console.log(`[worker] cold imap-poll: ${r.matched} réponses, ${r.bounced} bounces`);
        break;
      }
      case "source-tick": {
        const count = (job.data as ColdJobData)?.count ?? Number(process.env.COLD_SOURCE_DAILY_COUNT || 25);
        const r = await jobSourceTick(count);
        console.log(`[worker] cold source-tick: kw=${r.keyword} insérés=${r.inserted} qualify=${r.qualifyEnqueued}`);
        break;
      }
      default:
        throw new Error(`[worker] cold job inconnu: ${name}`);
    }
  },
  { connection: getRedis(), concurrency: Number(process.env.COLD_WORKER_CONCURRENCY || 5) }
);

console.log("[worker] JARVIS worker started, waiting for jobs...");
