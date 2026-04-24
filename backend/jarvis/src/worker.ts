// Point d'entrée du worker Railway (process séparé du web server)
import { Worker } from "bullmq";
import { getRedis } from "./lib/redis.js";
import { runOuroborosCycle } from "./lib/ouroboros-cycle.js";
import {
  ingestToMemPalaceBatch,
  archiveAllDailyConversations,
} from "./lib/mempalace-ingest.js";

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

console.log("[worker] JARVIS worker started, waiting for jobs...");
