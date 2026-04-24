// Point d'entrée du worker Railway (process séparé du web server)
import { Worker } from "bullmq";
import { getRedis } from "./lib/redis.js";
import { runOuroborosCycle } from "./lib/ouroboros-cycle.js";
import { ingestToMemPalace, archiveDailyConversation } from "./lib/mempalace-ingest.js";

new Worker(
  "ouroboros-cycle",
  async (job) => {
    console.log(`[worker] ouroboros cycle ${job.id} started`);
    await runOuroborosCycle();
    // Archivage journalier — idempotent, safe to run every cycle
    try {
      await archiveDailyConversation("fabrice");
      await archiveDailyConversation("romain");
    } catch (err) {
      console.warn("[worker] daily archive failed:", err);
    }
    console.log(`[worker] ouroboros cycle ${job.id} done`);
  },
  { connection: getRedis(), concurrency: 1 }
);

new Worker(
  "mempalace-ingest",
  async (job) => {
    const { persona, userMessage, assistantResponse } = job.data as {
      persona: "romain" | "fabrice";
      userMessage: string;
      assistantResponse: string;
    };
    await ingestToMemPalace(persona, userMessage, assistantResponse);
  },
  { connection: getRedis(), concurrency: 2 }
);

console.log("[worker] JARVIS worker started, waiting for jobs...");
