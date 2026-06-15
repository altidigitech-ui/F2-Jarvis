// Notification opérateur (Phase 5 : prospect "interested" → notif).
// Best-effort : POST JSON sur COLD_NOTIFY_WEBHOOK si défini (Slack/Discord/
// webhook maison). No-op si non configuré — la notif "dure" reste la ligne
// "intéressé" dans cold-log-email.md + l'entrée pipeline-conversion.md.

export async function notify(text: string): Promise<void> {
  const url = process.env.COLD_NOTIFY_WEBHOOK;
  console.log(`[cold/notify] ${text}`);
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch (err) {
    console.error("[cold/notify] webhook échec:", err instanceof Error ? err.message : err);
  }
}
