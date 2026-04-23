import { Redis } from "ioredis";

let _connection: Redis | null = null;

export function getRedis(): Redis {
  if (_connection) return _connection;
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL not set");
  _connection = new Redis(url, { maxRetriesPerRequest: null });
  _connection.on("error", (err: Error) => console.error("[redis] connection error:", err));
  return _connection;
}
