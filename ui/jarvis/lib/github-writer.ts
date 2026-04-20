const OWNER = "altidigitech-ui";
const REPO = "F2-Jarvis";
const BRANCH = "main";

function apiUrl(path: string) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/${path}`;
}

function headers() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set in environment");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

export interface GitHubFile {
  content: string;
  sha: string;
}

export async function ghRead(filePath: string): Promise<GitHubFile | null> {
  const res = await fetch(apiUrl(`contents/${filePath}?ref=${BRANCH}`), {
    headers: headers(),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  const data = await res.json() as { content: string; sha: string };
  return {
    content: Buffer.from(data.content, "base64").toString("utf-8"),
    sha: data.sha,
  };
}

export async function ghWrite(
  filePath: string,
  content: string,
  sha: string,
  commitMessage: string
): Promise<void> {
  const body = {
    message: commitMessage,
    content: Buffer.from(content).toString("base64"),
    sha,
    branch: BRANCH,
  };

  const res = await fetch(apiUrl(`contents/${filePath}`), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json() as { message?: string };
    throw new Error(`GitHub write failed: ${err.message || res.status}`);
  }
}

// Read + modify + write in one atomic call (with retry on 409 conflict)
export async function ghUpdate(
  filePath: string,
  modify: (content: string) => string,
  commitMessage: string
): Promise<void> {
  const file = await ghRead(filePath);
  if (!file) throw new Error(`File not found: ${filePath}`);
  const updated = modify(file.content);
  if (updated === file.content) return; // no-op
  await ghWrite(filePath, updated, file.sha, commitMessage);
}
