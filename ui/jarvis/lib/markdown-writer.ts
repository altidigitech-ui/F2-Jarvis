// Pure functions — read, modify, return new string. No side effects.

export function cestNow(): string {
  return new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).replace(",", "");
}

export function cestDate(): string {
  return new Date().toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Escape pipe chars inside a cell value
function cell(v: string) {
  return v.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

// Append a row to the first markdown table found in the given section
function appendTableRow(markdown: string, sectionTitle: string, row: string[]): string {
  const lines = markdown.split("\n");
  let inSection = false;
  let lastTableRowIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inSection && line.includes(sectionTitle)) {
      inSection = true;
      continue;
    }
    if (inSection && /^##\s/.test(line)) break;
    if (inSection && /^\|/.test(line.trim())) {
      lastTableRowIdx = i;
    }
  }

  if (lastTableRowIdx === -1) return markdown;

  const newRow = `| ${row.map(cell).join(" | ")} |`;
  lines.splice(lastTableRowIdx + 1, 0, newRow);
  return lines.join("\n");
}

// --- decisions-log.md ---
// Format: | Date | Décision | Rationale | Résultat |
export function appendDecision(
  markdown: string,
  decision: string,
  rationale: string,
  result = "En cours"
): string {
  const row = [cestDate(), decision, rationale, result];
  // decisions-log.md has a single table at the top
  const lines = markdown.split("\n");
  let lastTableIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\|/.test(lines[i].trim())) lastTableIdx = i;
  }
  if (lastTableIdx === -1) return markdown;
  lines.splice(lastTableIdx + 1, 0, `| ${row.map(cell).join(" | ")} |`);
  return lines.join("\n");
}

// --- progress-semaine.md ---
// Append to "ÉVÉNEMENTS NOTABLES" table
// Cols: Date | Événement | Plateforme | Activité | Action prise / à prendre
export function appendProgressEvent(
  markdown: string,
  event: string,
  platform: string,
  activity: string,
  action: string
): string {
  return appendTableRow(markdown, "ÉVÉNEMENTS NOTABLES", [
    cestDate(),
    event,
    platform,
    activity,
    action,
  ]);
}

// Mark an incident as resolved by appending "→ RÉSOLU [timestamp]" to the action cell
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

// --- cold-outreach-log.md ---
// Append to the LINKEDIN or TWITTER section
// Cols: Date | Heure | Cible | Vertical | Insight | Type | Réponse | Suite
export function appendColdLog(
  markdown: string,
  platform: "TWITTER" | "LINKEDIN",
  target: string,
  vertical: string,
  insight: string,
  type: string
): string {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
  return appendTableRow(markdown, platform, [
    cestDate(),
    time,
    target,
    vertical,
    insight,
    type,
    "⏳",
    "",
  ]);
}

// --- engagement-log.md ---
// Append to TWITTER or LINKEDIN section
// Cols: Date | Heure | Post original | Reply R | Likes reçus | Replies reçues
export function appendEngagementLog(
  markdown: string,
  platform: "TWITTER" | "LINKEDIN" | "IH" | "PH",
  postSummary: string,
  reply: string
): string {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
  return appendTableRow(markdown, platform, [cestDate(), time, postSummary, reply, "", ""]);
}

// --- cross-engagement-tracker.md ---
// Mark a row as published (R a reply ? → ✅)
export function markCrossPublished(
  markdown: string,
  postSummary: string,
  replyContent: string
): string {
  const suffix = ` → PUBLIÉ ${cestNow()} CEST`;
  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(postSummary.toLowerCase()) && /^\|/.test(lines[i].trim())) {
      // Replace the "R a reply ?" cell (index 3) with ✅
      const cells = lines[i].split("|");
      if (cells.length > 4 && !cells[4].includes("✅")) {
        cells[4] = ` ✅ `;
        cells[5] = ` ${cestNow()} CEST `;
        lines[i] = cells.join("|");
      }
    }
  }
  // If no matching row, append the reply content as a note
  const suffix2 = `\n\n**Reply R publiée (${cestNow()} CEST) :**\n\n\`\`\`\n${replyContent}\n\`\`\`\n`;
  return lines.join("\n") + (postSummary ? "" : suffix2);
}

// --- plan-hebdo.md ---
// Mark a post as published (Statut cell → ✅ Publié HH:MM)
export function markPlanPublished(markdown: string, postTitle: string): string {
  const time = new Date().toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit",
  });
  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(postTitle.toLowerCase()) && /^\|/.test(lines[i].trim())) {
      lines[i] = lines[i].replace(/⏳[^|]*/, `✅ Publié ${time}`);
    }
  }
  return lines.join("\n");
}
