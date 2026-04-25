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

  const responseBody = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new Error(`GitHub write failed: ${(responseBody as { message?: string }).message || res.status}`);
  }

  const newSha = (responseBody as { content?: { sha?: string } })?.content?.sha || sha;
  cacheSet(filePath, content, newSha);
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

export async function ghCreateFromBase64(
  filePath: string,
  base64Content: string,
  commitMessage: string
): Promise<void> {
  const res = await fetch(apiUrl(`contents/${filePath}`), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: commitMessage,
      content: base64Content,
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(`GitHub create failed: ${err.message || res.status}`);
  }
  cacheInvalidate(filePath);
}

export async function ghCreateMultiple(
  files: Array<{ path: string; content: string }>,
  commitMessage: string
): Promise<void> {
  if (files.length === 0) return;

  const hdrs = headers();

  // 1. GET /git/ref/heads/main → SHA du dernier commit
  const refRes = await fetch(apiUrl(`git/ref/heads/${BRANCH}`), { headers: hdrs });
  if (!refRes.ok) throw new Error(`GitHub get ref failed: ${refRes.status} ${await refRes.text()}`);
  const refData = (await refRes.json()) as { object: { sha: string } };
  const latestCommitSha = refData.object.sha;

  // 2. GET /git/commits/{sha} → tree SHA
  const commitRes = await fetch(apiUrl(`git/commits/${latestCommitSha}`), { headers: hdrs });
  if (!commitRes.ok) throw new Error(`GitHub get commit failed: ${commitRes.status} ${await commitRes.text()}`);
  const commitData = (await commitRes.json()) as { tree: { sha: string } };
  const treeSha = commitData.tree.sha;

  // 3. POST /git/trees avec tous les fichiers
  const treeRes = await fetch(apiUrl(`git/trees`), {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({
      base_tree: treeSha,
      tree: files.map((f) => ({
        path: f.path,
        mode: "100644",
        type: "blob",
        content: f.content,
      })),
    }),
  });
  if (!treeRes.ok) throw new Error(`GitHub create tree failed: ${treeRes.status} ${await treeRes.text()}`);
  const treeData = (await treeRes.json()) as { sha: string };

  // 4. POST /git/commits avec le nouveau tree
  const newCommitRes = await fetch(apiUrl(`git/commits`), {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({
      message: commitMessage,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  });
  if (!newCommitRes.ok) throw new Error(`GitHub create commit failed: ${newCommitRes.status} ${await newCommitRes.text()}`);
  const newCommitData = (await newCommitRes.json()) as { sha: string };

  // 5. PATCH /git/refs/heads/main → pointer vers le nouveau commit
  const updateRefRes = await fetch(apiUrl(`git/refs/heads/${BRANCH}`), {
    method: "PATCH",
    headers: hdrs,
    body: JSON.stringify({ sha: newCommitData.sha }),
  });
  if (!updateRefRes.ok) throw new Error(`GitHub update ref failed: ${updateRefRes.status} ${await updateRefRes.text()}`);

  for (const f of files) {
    cacheInvalidate(f.path);
  }
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

export async function ghDeleteMultiple(
  paths: string[],
  commitMessage: string
): Promise<{ deleted: number; failed: number }> {
  if (paths.length === 0) return { deleted: 0, failed: 0 };

  const hdrs = headers();

  const refRes = await fetch(apiUrl(`git/ref/heads/${BRANCH}`), { headers: hdrs });
  if (!refRes.ok) {
    const body = await refRes.text();
    console.error(`[ghDeleteMultiple] get ref failed ${refRes.status}:`, body);
    throw new Error(`GitHub get ref failed: ${refRes.status} ${body}`);
  }
  const refData = (await refRes.json()) as { object: { sha: string } };
  const latestCommitSha = refData.object.sha;

  const commitRes = await fetch(apiUrl(`git/commits/${latestCommitSha}`), { headers: hdrs });
  if (!commitRes.ok) {
    const body = await commitRes.text();
    console.error(`[ghDeleteMultiple] get commit failed ${commitRes.status}:`, body);
    throw new Error(`GitHub get commit failed: ${commitRes.status} ${body}`);
  }
  const commitData = (await commitRes.json()) as { tree: { sha: string } };
  const treeSha = commitData.tree.sha;

  const treeNodes: Array<{ path: string; mode: string; type: string; sha: string | null }> =
    paths.map((p) => ({ path: p, mode: "100644", type: "blob", sha: null }));

  const treeRes = await fetch(apiUrl(`git/trees`), {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({ base_tree: treeSha, tree: treeNodes }),
  });
  if (!treeRes.ok) {
    const body = await treeRes.text();
    console.error(`[ghDeleteMultiple] create tree failed ${treeRes.status}:`, body);
    throw new Error(`GitHub create tree failed: ${treeRes.status} ${body}`);
  }
  const treeData = (await treeRes.json()) as { sha: string };

  const newCommitRes = await fetch(apiUrl(`git/commits`), {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({ message: commitMessage, tree: treeData.sha, parents: [latestCommitSha] }),
  });
  if (!newCommitRes.ok) {
    const body = await newCommitRes.text();
    console.error(`[ghDeleteMultiple] create commit failed ${newCommitRes.status}:`, body);
    throw new Error(`GitHub create commit failed: ${newCommitRes.status} ${body}`);
  }
  const newCommitData = (await newCommitRes.json()) as { sha: string };

  const updateRefRes = await fetch(apiUrl(`git/refs/heads/${BRANCH}`), {
    method: "PATCH",
    headers: hdrs,
    body: JSON.stringify({ sha: newCommitData.sha }),
  });
  if (!updateRefRes.ok) {
    const body = await updateRefRes.text();
    console.error(`[ghDeleteMultiple] update ref failed ${updateRefRes.status}:`, body);
    throw new Error(`GitHub update ref failed: ${updateRefRes.status} ${body}`);
  }

  for (const p of paths) {
    cacheInvalidate(p);
  }

  return { deleted: paths.length, failed: 0 };
}

export async function ghReadExternal(
  owner: string,
  repo: string,
  filePath: string,
  branch = "main"
): Promise<{ content: string; sha: string } | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`ghReadExternal failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { content: string; sha: string };
  return {
    content: Buffer.from(data.content, "base64").toString("utf-8"),
    sha: data.sha,
  };
}

export async function ghListExternal(
  owner: string,
  repo: string,
  dirPath = "",
  branch = "main"
): Promise<GitHubDirEntry[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`ghListExternal failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data as GitHubDirEntry[];
}
