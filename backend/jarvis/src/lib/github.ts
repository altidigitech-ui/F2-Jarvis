import { cacheGet, cacheSet, cacheInvalidate } from "./cache.js";

const OWNER = "altidigitech-ui";
const REPO = "F2-Jarvis";
const BRANCH = "main";

function apiUrl(p: string) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/${p}`;
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
  const cached = cacheGet(filePath);
  if (cached) return cached;

  const res = await fetch(apiUrl(`contents/${filePath}?ref=${BRANCH}`), {
    headers: headers(),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { content: string; sha: string };
  const file = {
    content: Buffer.from(data.content, "base64").toString("utf-8"),
    sha: data.sha,
  };

  cacheSet(filePath, file.content, file.sha);
  return file;
}

export async function ghWrite(
  filePath: string,
  content: string,
  sha: string,
  commitMessage: string
): Promise<void> {
  const res = await fetch(apiUrl(`contents/${filePath}`), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(`GitHub write failed: ${err.message || res.status}`);
  }
  cacheInvalidate(filePath);
}

export async function ghUpdate(
  filePath: string,
  modify: (content: string) => string,
  commitMessage: string
): Promise<void> {
  const file = await ghRead(filePath);
  if (!file) throw new Error(`File not found: ${filePath}`);
  const updated = modify(file.content);
  if (updated === file.content) return;
  await ghWrite(filePath, updated, file.sha, commitMessage);
}

export interface GitHubDirEntry {
  name: string;
  path: string;
  type: "file" | "dir";
  sha: string;
  size: number;
}

export async function ghList(dirPath: string): Promise<GitHubDirEntry[]> {
  const res = await fetch(apiUrl(`contents/${dirPath}?ref=${BRANCH}`), {
    headers: headers(),
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub list failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data as GitHubDirEntry[];
}

export async function ghCreate(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<void> {
  const res = await fetch(apiUrl(`contents/${filePath}`), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content).toString("base64"),
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(`GitHub create failed: ${err.message || res.status}`);
  }
  cacheInvalidate(filePath);
}

export async function ghDelete(
  filePath: string,
  sha: string,
  commitMessage: string
): Promise<void> {
  const res = await fetch(apiUrl(`contents/${filePath}`), {
    method: "DELETE",
    headers: headers(),
    body: JSON.stringify({
      message: commitMessage,
      sha,
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(`GitHub delete failed: ${err.message || res.status}`);
  }
  cacheInvalidate(filePath);
}
