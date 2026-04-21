export const JARVIS_REPO_UPDATED = "jarvis:repo-updated";

export type RepoUpdatedDetail = {
  actionType?: string;
  paths?: string[];
};

export function emitRepoUpdated(detail: RepoUpdatedDetail = {}): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<RepoUpdatedDetail>(JARVIS_REPO_UPDATED, { detail }));
}

export function onRepoUpdated(handler: (detail: RepoUpdatedDetail) => void): () => void {
  if (typeof window === "undefined") return () => { /* no-op */ };
  const listener = (e: Event) => {
    const ce = e as CustomEvent<RepoUpdatedDetail>;
    handler(ce.detail || {});
  };
  window.addEventListener(JARVIS_REPO_UPDATED, listener);
  return () => window.removeEventListener(JARVIS_REPO_UPDATED, listener);
}

export const JARVIS_SEND_TO_CHAT = "jarvis:send-to-chat";

export type SendToChatDetail = { text: string };

export function emitSendToChat(text: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<SendToChatDetail>(JARVIS_SEND_TO_CHAT, { detail: { text } }));
}

export function onSendToChat(handler: (text: string) => void): () => void {
  if (typeof window === "undefined") return () => { /* no-op */ };
  const listener = (e: Event) => {
    const ce = e as CustomEvent<SendToChatDetail>;
    if (ce.detail?.text) handler(ce.detail.text);
  };
  window.addEventListener(JARVIS_SEND_TO_CHAT, listener);
  return () => window.removeEventListener(JARVIS_SEND_TO_CHAT, listener);
}
