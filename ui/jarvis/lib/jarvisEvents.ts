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

export const JARVIS_ACTION_TOGGLED = "jarvis:action-toggled";

export type ActionToggledDetail = { id: string; selected: boolean };

export function emitActionToggled(id: string, selected: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ActionToggledDetail>(JARVIS_ACTION_TOGGLED, { detail: { id, selected } }));
}

export function onActionToggled(handler: (detail: ActionToggledDetail) => void): () => void {
  if (typeof window === "undefined") return () => { /* no-op */ };
  const listener = (e: Event) => {
    const ce = e as CustomEvent<ActionToggledDetail>;
    if (ce.detail) handler(ce.detail);
  };
  window.addEventListener(JARVIS_ACTION_TOGGLED, listener);
  return () => window.removeEventListener(JARVIS_ACTION_TOGGLED, listener);
}

export const JARVIS_ACTIONS_BATCH_COMMITTED = "jarvis:actions-batch-committed";

export type BatchCommittedDetail = { committedIds: string[]; rejectedIds: string[] };

export function emitBatchCommitted(committedIds: string[], rejectedIds: string[]): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<BatchCommittedDetail>(JARVIS_ACTIONS_BATCH_COMMITTED, { detail: { committedIds, rejectedIds } }));
}

export function onBatchCommitted(handler: (detail: BatchCommittedDetail) => void): () => void {
  if (typeof window === "undefined") return () => { /* no-op */ };
  const listener = (e: Event) => {
    const ce = e as CustomEvent<BatchCommittedDetail>;
    if (ce.detail) handler(ce.detail);
  };
  window.addEventListener(JARVIS_ACTIONS_BATCH_COMMITTED, listener);
  return () => window.removeEventListener(JARVIS_ACTIONS_BATCH_COMMITTED, listener);
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
