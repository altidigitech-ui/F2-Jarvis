import { Queue } from "bullmq";
import { getRedis } from "./redis.js";
import type { ColdJobName, ColdJobData } from "./cold/types.js";

export const ouroborosQueue = new Queue("ouroboros-cycle", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 20,
    attempts: 1,
  },
});

// Queue du pipeline cold email (qualify · enrich · scan · compose · push) +
// ticks cron (sequence-tick · imap-poll). Voir lib/cold/jobs.ts.
export const coldQueue = new Queue("cold", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 200,
    removeOnFail: 50,
    attempts: 3,
    backoff: { type: "exponential", delay: 10000 },
  },
});

// Enqueue un job cold pour une cible donnée.
export function enqueueCold(name: ColdJobName, data: ColdJobData = {}) {
  return coldQueue.add(name, data);
}

export const mempalaceQueue = new Queue("mempalace-ingest", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 20,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
});
