import express from "express";
import cors from "cors";
import { chatRoute } from "./routes/chat.js";
import { contextRoute } from "./routes/context.js";
import { actionRoute } from "./routes/action.js";
import { graphRoute } from "./routes/graph.js";
import { fileRoute } from "./routes/file.js";

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
app.get("/context", contextRoute);
app.post("/action", actionRoute);
app.get("/graph", graphRoute);
app.get("/file", fileRoute);

app.listen(PORT, () => {
  console.log(`JARVIS backend on port ${PORT}`);
});
