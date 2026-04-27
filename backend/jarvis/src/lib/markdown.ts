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
    if (!inSection && /^#+\s/.test(line) && line.includes(sectionTitle)) { inSection = true; continue; }
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

export function appendEngagementLog(markdown: string, platform: "TWITTER" | "LINKEDIN" | "REDDIT" | "FACEBOOK" | "IH" | "PH", postSummary: string, reply: string): string {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
  return appendTableRow(markdown, platform, [cestDate(), time, postSummary, reply, "", ""]);
}

/** @deprecated — never called externally. Logic fully handled in action-executor.ts applyTransform (mark_cross_published case). Remove in next cleanup. */
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
  return lines.join("\n") + (replyContent ? suffix2 : "");
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

/**
 * Queue a list of cold targets without an actual outreach (status ⏳ = à contacter).
 * Appends N rows to the correct platform section.
 * Used by action_type "queue_cold_targets".
 */
export function appendColdQueue(
  markdown: string,
  platform: "TWITTER" | "LINKEDIN",
  targets: Array<{ target: string; vertical?: string; insight?: string; notes?: string }>
): string {
  let out = markdown;
  const date = cestDate();
  for (const t of targets) {
    out = appendTableRow(out, platform, [
      date,
      "",
      t.target,
      t.vertical || "",
      t.insight || "",
      "Queued",
      "⏳",
      t.notes || "",
    ]);
  }
  return out;
}

/**
 * Update the reply status cell for a matching target row.
 * Finds the row containing the target handle (case-insensitive) and replaces
 * the first cell containing ⏳ with the new replyStatus.
 */
export function updateColdReply(
  markdown: string,
  target: string,
  replyStatus: string,
  notes?: string
): string {
  const needle = target.toLowerCase().replace(/^@/, "");
  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/^\|/.test(line.trim())) continue;
    if (!line.toLowerCase().includes(needle)) continue;
    if (/^\s*\|\s*(date|#|cible)/i.test(line)) continue;
    const cells = line.split("|");
    let updated = false;
    for (let j = 1; j < cells.length - 1; j++) {
      if (cells[j].includes("⏳")) {
        cells[j] = ` ${replyStatus} `;
        updated = true;
        break;
      }
    }
    if (updated && notes) {
      cells[cells.length - 2] = ` ${cells[cells.length - 2].trim()} — ${notes} `;
    }
    if (updated) lines[i] = cells.join("|");
  }
  return lines.join("\n");
}

/**
 * Append a row to an analytics section of progress-semaine.md.
 * The caller builds the row array matching the table columns.
 * sectionTitle defaults to "ANALYTICS" — matches both "ANALYTICS" and "ANALYTICS TWITTER".
 */
export function appendAnalyticsRow(
  markdown: string,
  row: string[],
  sectionTitle = "ANALYTICS"
): string {
  return appendTableRow(markdown, sectionTitle, row);
}

/**
 * Increment a named counter in the ## COMPTEURS COURANTS section.
 * Finds the row whose first column contains `metricName` (case-insensitive)
 * and increments the numeric value in the second column by `increment`.
 */
export function incrementCurrentCounter(markdown: string, metricName: string, increment = 1): string {
  const lines = markdown.split("\n");
  let inSection = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inSection && line.includes("COMPTEURS COURANTS")) { inSection = true; continue; }
    if (inSection && /^##\s/.test(line)) break;
    if (inSection && /^\|/.test(line.trim()) && line.toLowerCase().includes(metricName.toLowerCase())) {
      const cells = line.split("|");
      for (let j = 1; j < cells.length - 1; j++) {
        const trimmed = cells[j].trim();
        const numMatch = trimmed.match(/^(\d+)(?:\s*\/\s*(\d+))?$/);
        if (numMatch) {
          const newVal = parseInt(numMatch[1], 10) + increment;
          cells[j] = numMatch[2] ? ` ${newVal} / ${numMatch[2]} ` : ` ${newVal} `;
          lines[i] = cells.join("|");
          break;
        }
      }
      break;
    }
  }
  return lines.join("\n");
}
