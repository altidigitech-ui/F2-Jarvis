export type ParsedActionPending = {
  id: string;
  index: number;
};

export type ParsedContentBlock = {
  type: string;
  content: string;
  contentFr?: string;
  index: number;
};

export type ParsedTag = {
  label: string;
};

export type ParsedResponse = {
  cleanText: string;
  actions: ParsedActionPending[];
  contents: ParsedContentBlock[];
  tags: ParsedTag[];
};

const ACTION_RE = /\[ACTION_PENDING:([0-9a-f-]+)\]/gi;
const CONTENT_RE = /\[CONTENT:([a-zA-Z0-9_-]+)\]([\s\S]*?)\[\/CONTENT\]/g;
const CONTENT_FR_RE = /\[CONTENT-FR\]([\s\S]*?)\[\/CONTENT-FR\]/g;
const TAG_RE = /\[TAG:([^\]\n]+)\]/g;

export function parseJarvisMarkers(text: string): ParsedResponse {
  if (!text) {
    return { cleanText: "", actions: [], contents: [], tags: [] };
  }

  const actions: ParsedActionPending[] = [];
  const contents: ParsedContentBlock[] = [];
  const tags: ParsedTag[] = [];

  const contentMatches = [...text.matchAll(CONTENT_RE)];
  const frMatches = [...text.matchAll(CONTENT_FR_RE)];

  for (const m of contentMatches) {
    const type = m[1];
    const content = m[2].trim();
    const index = m.index ?? 0;
    const contentEndIdx = index + m[0].length;
    // Attach FR block if it starts within 120 chars after this CONTENT block ends
    const fr = frMatches.find((f) => {
      const fIdx = f.index ?? 0;
      return fIdx >= contentEndIdx && fIdx - contentEndIdx < 120;
    });
    contents.push({
      type,
      content,
      contentFr: fr ? fr[1].trim() : undefined,
      index,
    });
  }

  for (const m of [...text.matchAll(ACTION_RE)]) {
    actions.push({ id: m[1], index: m.index ?? 0 });
  }

  for (const m of [...text.matchAll(TAG_RE)]) {
    const label = m[1].trim();
    if (label.length > 0 && label.length <= 60) {
      tags.push({ label });
    }
  }

  let cleanText = text
    .replace(ACTION_RE, "")
    .replace(CONTENT_RE, "")
    .replace(CONTENT_FR_RE, "")
    .replace(TAG_RE, "");

  cleanText = cleanText.replace(/\n{3,}/g, "\n\n").trim();

  return { cleanText, actions, contents, tags };
}
