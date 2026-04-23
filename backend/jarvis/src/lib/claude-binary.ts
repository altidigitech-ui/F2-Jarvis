import { access, constants } from "fs/promises";
import path from "path";

async function fileExecutable(p: string): Promise<boolean> {
  try {
    await access(p, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export async function resolveClaudeBinary(): Promise<string | undefined> {
  const candidates = [
    process.env.CLAUDE_CODE_EXECUTABLE,
    "/app/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude",
    "/app/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64-musl/claude",
    "/usr/local/bin/claude",
    path.join(process.cwd(), "node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude"),
  ].filter(Boolean) as string[];

  for (const p of candidates) {
    if (await fileExecutable(p)) {
      console.log(`[claude-binary] found: ${p}`);
      return p;
    }
  }
  console.warn("[claude-binary] no executable binary found");
  return undefined;
}
