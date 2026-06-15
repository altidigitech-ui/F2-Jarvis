// Séquence des touches cold : J0 (initial) → J3 → J7 → J15 (finale), puis stop.
// La planification vit dans cold_targets (next_touch_at + touch_count) ; un cron
// (job "sequence-tick") envoie les touches dues.

const DAY_MS = 24 * 60 * 60 * 1000;

// Jours cumulés depuis la 1ère touche : index = numéro de touche - 1.
// [0, 3, 7, 15] → 4 touches au total.
export const SEQUENCE_OFFSETS_DAYS = [0, 3, 7, 15];
export const MAX_TOUCHES = SEQUENCE_OFFSETS_DAYS.length;

// Après avoir envoyé la touche `touchCount` (1-indexée), renvoie la date ISO de
// la prochaine touche, ou null si la séquence est terminée (stop).
export function nextTouchAfter(touchCount: number, now: number = Date.now()): string | null {
  if (touchCount >= MAX_TOUCHES) return null;
  // Espacement relatif entre la touche envoyée et la suivante.
  const gapDays = SEQUENCE_OFFSETS_DAYS[touchCount] - SEQUENCE_OFFSETS_DAYS[touchCount - 1];
  return new Date(now + gapDays * DAY_MS).toISOString();
}

export function isSequenceComplete(touchCount: number): boolean {
  return touchCount >= MAX_TOUCHES;
}
