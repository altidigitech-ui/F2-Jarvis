export function cestNow(): string {
  return new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).replace(",", "");
}

export function cestDate(): string {
  return new Date().toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "numeric",
  });
}

function cell(v: string) {
  return v.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function appendTableRow(markdown: string, sectionTitle: string, row: string[]): string {
  const lines = markdown.split("\n");
  let inSection = false;
  let lastTableRowIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inSection && line.includes(sectionTitle)) { inSection = true; continue; }
    if (inSection && /^##\s/.test(line)) break;
    if (inSection && /^\|/.test(line.trim())) lastTableRowIdx = i;
  }
  if (lastTableRowIdx === -1) return markdown;
  lines.splice(lastTableRowIdx + 1, 0, `| ${row.map(cell).join(" | ")} |`);
  return lines.join("\n");
}

export function appendDecision(markdown: string, decision: string, rationale: string, result = "En cours"): string {
  const row = [cestDate(), decision, rationale, result];
  const lines = markdown.split("\n");
  let lastTableIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\|/.test(lines[i].trim())) lastTableIdx = i;
  }
  if (lastTableIdx === -1) return markdown;
  lines.splice(lastTableIdx + 1, 0, `| ${row.map(cell).join(" | ")} |`);
  return lines.join("\n");
}

export function appendProgressEvent(markdown: string, event: string, platform: string, activity: string, action: string): string {
  return appendTableRow(markdown, "ÉVÉNEMENTS NOTABLES", [cestDate(), event, platform, activity, action]);
}

export function resolveProgressEvent(markdown: string, eventKeyword: string): string {
  const suffix = ` → RÉSOLU ${cestNow()} CEST`;
  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(eventKeyword.toLowerCase()) && /^\|/.test(lines[i].trim())) {
      if (!lines[i].includes("RÉSOLU")) {
        lines[i] = lines[i].replace(/\|([^|]*)$/, `|$1${suffix}|`).replace(/\|\s*\|$/, `|${suffix}|`);
      }
    }
  }
  return lines.join("\n");
}

export function appendColdLog(markdown: string, platform: "TWITTER" | "LINKEDIN", target: string, vertical: string, insight: string, type: string): string {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
  return appendTableRow(markdown, platform, [cestDate(), time, target, vertical, insight, type, "⏳", ""]);
}

export function appendEngagementLog(markdown: string, platform: "TWITTER" | "LINKEDIN" | "IH" | "PH", postSummary: string, reply: string): string {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
  return appendTableRow(markdown, platform, [cestDate(), time, postSummary, reply, "", ""]);
}

export function markCrossPublished(markdown: string, postSummary: string, replyContent: string): string {
  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(postSummary.toLowerCase()) && /^\|/.test(lines[i].trim())) {
      const cells = lines[i].split("|");
      if (cells.length > 4 && !cells[4].includes("✅")) {
        cells[4] = ` ✅ `;
        cells[5] = ` ${cestNow()} CEST `;
        lines[i] = cells.join("|");
      }
    }
  }
  const suffix2 = `\n\n**Reply R publiée (${cestNow()} CEST) :**\n\n\`\`\`\n${replyContent}\n\`\`\`\n`;
  return lines.join("\n") + (postSummary ? "" : suffix2);
}

export function markPlanPublished(markdown: string, postTitle: string): string {
  const time = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(postTitle.toLowerCase()) && /^\|/.test(lines[i].trim())) {
      lines[i] = lines[i].replace(/⏳[^|]*/, `✅ Publié ${time}`);
    }
  }
  return lines.join("\n");
}
