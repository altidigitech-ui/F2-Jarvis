---
date: "2026-04-26"
timestamp: "2026-04-26T00:13:53.246Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Streaming JARVIS — augmenter maxTurns 80 → 120 pour prévenir arrêts sur sessions multi-patches
**Contexte:** Le [USER 01:47] "Alors ? tu recommences" survient 4 minutes après le lancement de 6 patches en parallèle à 01:43. Le keepalive a été patchés de 15s → 8s (chat.ts ligne 520), ce qui corrige les proxy timeouts. Mais la vraie limite risque d'être `maxTurns: 80` (ligne 547) : une session de 6 patches nécessite ~18 tool calls minimum (repo_read + code_check + propose_action × 6) = ~36 tours base, plus diagnostics initiaux et réponses intermédiaires. Total réaliste : 70-100 tours pour une session d'auto-chirurgie complexe, soit au-dessus du plafond actuel.
**Recommandation:** Augmenter `maxTurns` de 80 à 120 dans `backend/jarvis/src/routes/chat.ts`.
**Action:**
- Fichier: `backend/jarvis/src/routes/chat.ts`
- Modifier ligne 547 : `maxTurns: 80,` → `maxTurns: 120,`
**Impact:** Les sessions multi-patches et auto-audits complets ne seront plus interrompues prématurément. Coût API marginal (turns supplémentaires uniquement si effectivement nécessaires).
**Risques si ignoré:** JARVIS continue de s'arrêter à mi-chemin sur les sessions longues. Fabrice doit relancer manuellement. Chaque relance repart de zéro sans mémoire de ce qui était en cours.
