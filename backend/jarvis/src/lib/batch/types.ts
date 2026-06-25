// Types partagés du pipeline de génération de batch hebdomadaire.
// Le batch est généré dans le worker BullMQ (queue "batch"), hors du flux /chat,
// pour échapper au plafond de durée du transport HTTP synchrone.

export interface BatchJobData {
  /** Conversation Jarvis à laquelle rattacher l'action create_file proposée. */
  conversationId: string;
  /** Persona courante (détermine VOIX + dossiers persona). */
  persona: "romain" | "fabrice";
  /** Mode de la conversation. */
  mode: "normal" | "f2";
  /** Numéro de semaine du batch à générer (fourni explicitement, jamais auto-résolu). */
  weekNumber: number;
  /** Cadrage éditorial de la semaine (ex. "offre de lancement terminée le 21/06 à minuit"). */
  framing: string;
  /** Produit cible (défaut: storemd). Clé du registre des sources. */
  product?: string;
}

// Données d'un job de DISPATCH : éclate le batch central S{weekNumber} en 3 fichiers
// de publication (R / F / StoreMD) par EXTRACTION (aucune génération créative — les
// posts existent déjà dans le batch central avec leurs IDs et textes finaux).
// Tourne dans le worker BullMQ (queue "batch", nom de job "dispatch"), hors du flux
// /chat, pour échapper au plafond de durée du transport HTTP synchrone.
export interface DispatchJobData {
  /** Conversation Jarvis à laquelle rattacher les 3 actions create_file proposées. */
  conversationId: string;
  /** Persona courante (cohérence avec le pattern batch ; n'affecte pas les chemins cibles). */
  persona: "romain" | "fabrice";
  /** Mode de la conversation. */
  mode: "normal" | "f2";
  /** Numéro de semaine du batch central à dispatcher (fourni explicitement). */
  weekNumber: number;
  /** Produit cible (défaut: storemd). Réservé à une future extension multi-produit. */
  product?: string;
}
