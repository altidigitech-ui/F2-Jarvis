import { Request, Response } from "express";
import { loadOrCreateConversation, loadMessages } from "../lib/jarvis-memory.js";

type Persona = "fabrice" | "romain";
type Mode = "normal" | "f2";

export async function chatHistoryRoute(req: Request, res: Response): Promise<void> {
  const persona = (req.query.persona as string) as Persona;
  const mode = ((req.query.mode as string) || "normal") as Mode;
  const userId = (req.headers["x-user-id"] as string | undefined) || "";

  if (!persona || (persona !== "fabrice" && persona !== "romain")) {
    res.status(400).json({ error: "Invalid persona" });
    return;
  }

  if (!userId) {
    res.json({ messages: [], conversation_id: null });
    return;
  }

  try {
    const conv = await loadOrCreateConversation(userId, persona, mode);
    const msgs = await loadMessages(conv.id, 50);
    res.json({
      conversation_id: conv.id,
      messages: msgs.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        image_media_type: m.image_media_type,
        image_data: m.image_data,
        created_at: m.created_at,
      })),
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[/chat/history]", err);
    res.status(500).json({ error: errMsg });
  }
}
