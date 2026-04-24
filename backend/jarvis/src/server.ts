import express from "express";
import cors from "cors";
import { chatRoute } from "./routes/chat.js";
import { chatHistoryRoute } from "./routes/chat-history.js";
import { contextRoute } from "./routes/context.js";
import { actionRoute } from "./routes/action.js";
import { actionProposeRoute } from "./routes/action-propose.js";
import { actionExecuteRoute } from "./routes/action-execute.js";
import { actionRejectRoute } from "./routes/action-reject.js";
import { actionDetailsRoute } from "./routes/action-details.js";
import { graphRoute } from "./routes/graph.js";
import { fileRoute } from "./routes/file.js";
import { searchRoute } from "./routes/search.js";
import {
  graphifyRoute,
  graphifyNodeRoute,
  graphifySearchRoute,
  graphifyRelatedRoute,
} from "./routes/graphify.js";
import {
  mempalaceWingsRoute,
  mempalaceWingRoute,
  mempalaceDrawerRoute,
  mempalaceStatsRoute,
} from "./routes/mempalace.js";
import { targetsRoute } from "./routes/targets.js";
import { actionExecuteBatchRoute } from "./routes/action-execute-batch.js";
import { batchStatusRoute, batchUploadRoute } from "./routes/batch.js";
import {
  ouroborosStatus,
  ouroborosProposals,
  ouroborosProposal,
  ouroborosAction,
  ouroborosTrigger,
  ouroborosKillSwitch,
  ouroborosDiary,
  ouroborosInitialize,
  ouroborosPurgeDuplicates,
} from "./routes/ouroboros.js";

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://f2-jarvis.vercel.app";

app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "X-JARVIS-AUTH", "X-USER-ID"],
}));
app.use(express.json({ limit: "25mb" }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((req: any, res: any, next: any) => {
  if (req.path === "/health") return next();
  const secret = process.env.BACKEND_SHARED_SECRET;
  if (!secret) return next();
  const provided = req.headers["x-jarvis-auth"];
  if (provided !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", chatRoute);
app.get("/chat/history", chatHistoryRoute);
app.post("/search", searchRoute);
app.get("/context", contextRoute);
app.post("/action", actionRoute);
app.post("/action/propose", actionProposeRoute);
app.post("/action/execute", actionExecuteRoute);
app.post("/action/reject", actionRejectRoute);
app.get("/action/:id", actionDetailsRoute);
app.get("/graph", graphRoute);
app.get("/file", fileRoute);
app.get("/graphify", graphifyRoute);
app.get("/graphify/search", graphifySearchRoute);
app.get("/graphify/related", graphifyRelatedRoute);
app.get("/graphify/node/:id", graphifyNodeRoute);

app.get("/mempalace/wings", mempalaceWingsRoute);
app.get("/mempalace/stats", mempalaceStatsRoute);
app.get("/mempalace/wing/:id", mempalaceWingRoute);
app.get("/mempalace/drawer/:wing/:filename", mempalaceDrawerRoute);

app.get("/targets", targetsRoute);
app.post("/action/execute-batch", actionExecuteBatchRoute);
app.get("/batch/status", batchStatusRoute);
app.post("/batch/upload", batchUploadRoute);

app.get("/ouroboros/status", ouroborosStatus);
app.get("/ouroboros/proposals", ouroborosProposals);
app.get("/ouroboros/proposal/:id", ouroborosProposal);
app.post("/ouroboros/action", ouroborosAction);
app.post("/ouroboros/trigger", ouroborosTrigger);
app.post("/ouroboros/kill-switch", ouroborosKillSwitch);
app.get("/ouroboros/diary", ouroborosDiary);
app.post("/ouroboros/initialize", ouroborosInitialize);
app.post("/ouroboros/purge-duplicates", ouroborosPurgeDuplicates);

app.listen(PORT, () => {
  console.log(`JARVIS backend on port ${PORT}`);
  scheduleOuroborosCycle().catch((err) =>
    console.warn("[server] ouroboros init error:", err instanceof Error ? err.message : err)
  );
});

async function scheduleOuroborosCycle() {
  try {
    const { ouroborosQueue } = await import("./lib/queues.js");
    await ouroborosQueue.upsertJobScheduler(
      "ouroboros-repeat",
      { every: 7_200_000 },
      { name: "ouroboros-cycle" }
    );
    console.log("[server] ouroboros repeat job scheduled (every 2h)");
  } catch (err) {
    console.warn("[server] ouroboros scheduling skipped:", err instanceof Error ? err.message : err);
  }
}
