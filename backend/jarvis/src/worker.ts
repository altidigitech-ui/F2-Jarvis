// Point d'entrée du worker Railway (process séparé du web server)
import { Worker } from "bullmq";
import { getRedis } from "./lib/redis.js";
import { runOuroborosCycle } from "./lib/ouroboros-cycle.js";
import { ingestToMemPalace } from "./lib/mempalace-ingest.js";

new Worker(
  "ouroboros-cycle",
  async (job) => {
    console.log(`[worker] ouroboros cycle ${job.id} started`);
    await runOuroborosCycle();
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
