import express from "express";
import cors from "cors";
import { chatRoute } from "./routes/chat.js";
import { contextRoute } from "./routes/context.js";
import { actionRoute } from "./routes/action.js";
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
import {
  ouroborosStatus,
  ouroborosProposals,
  ouroborosProposal,
  ouroborosAction,
  ouroborosTrigger,
  ouroborosKillSwitch,
  ouroborosDiary,
  ouroborosInitialize,
} from "./routes/ouroboros.js";

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://f2-jarvis.vercel.app";

app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", chatRoute);
app.post("/search", searchRoute);
app.get("/context", contextRoute);
app.post("/action", actionRoute);
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

app.get("/ouroboros/status", ouroborosStatus);
app.get("/ouroboros/proposals", ouroborosProposals);
app.get("/ouroboros/proposal/:id", ouroborosProposal);
app.post("/ouroboros/action", ouroborosAction);
app.post("/ouroboros/trigger", ouroborosTrigger);
app.post("/ouroboros/kill-switch", ouroborosKillSwitch);
app.get("/ouroboros/diary", ouroborosDiary);
app.post("/ouroboros/initialize", ouroborosInitialize);

app.listen(PORT, () => {
  console.log(`JARVIS backend on port ${PORT}`);
});
