import { Queue } from "bullmq";
import { getRedis } from "./redis.js";

export const ouroborosQueue = new Queue("ouroboros-cycle", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 20,
    attempts: 1,
  },
});

export const mempalaceQueue = new Queue("mempalace-ingest", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 20,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
});
