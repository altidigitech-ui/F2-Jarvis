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
