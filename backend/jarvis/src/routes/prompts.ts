import { Request, Response } from "express";
import { ghRead, ghList } from "../lib/github.js";

interface PromptItem {
  category: string;
  tool: string;
  vertical: string;
  path: string;
  content: string;
}

export async function promptsRoute(req: Request, res: Response): Promise<void> {
  const persona = (req.query.persona as string) || "fabrice";

  const categories = ["cold", "engagement", "publication"];
  const tools = ["grok", "chrome", "claude"];
  const prompts: PromptItem[] = [];

  for (const cat of categories) {
    for (const tool of tools) {
      const dir = `${persona}/${cat}/${tool}`;
      try {
        const entries = await ghList(dir);
        const mdFiles = entries.filter(
          (f: { type: string; name: string }) =>
            f.type === "file" && (f.name.endsWith(".md") || f.name.endsWith(".txt"))
        );
        for (const file of mdFiles) {
          try {
            const data = await ghRead(`${dir}/${file.name}`);
            if (!data) continue;
            const vertical = file.name
              .replace(/-prompt\.md$/, "")
              .replace(/\.md$/, "")
              .replace(/\.txt$/, "")
              .replace(/^prompt$/, "general")
              .replace(/^prompt-/, "")
              .toUpperCase();
            prompts.push({
              category: cat,
              tool,
              vertical,
              path: `${dir}/${file.name}`,
              content: data.content,
            });
          } catch { /* skip unreadable file */ }
        }
      } catch { /* dir doesn't exist */ }
    }
  }

  res.json({ persona, prompts });
}
