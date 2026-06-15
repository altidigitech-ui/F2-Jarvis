import { Queue } from "bullmq";
import { getRedis } from "./redis.js";
import type { ColdJobName, ColdJobData } from "./cold/types.js";
import type { SocialJobName, SocialJobData } from "./social/types.js";

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

// Queue du moteur réseaux (social-generate · social-publish). Voir lib/social/jobs.ts.
export const socialQueue = new Queue("social", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 2,
    backoff: { type: "exponential", delay: 15000 },
  },
});

export function enqueueSocial(name: SocialJobName, data: SocialJobData = {}) {
  return socialQueue.add(name, data);
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
