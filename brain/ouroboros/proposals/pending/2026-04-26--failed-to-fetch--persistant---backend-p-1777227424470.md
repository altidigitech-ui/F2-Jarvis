---
date: "2026-04-26"
timestamp: "2026-04-26T18:17:04.471Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** "Failed to fetch" persistant — backend propre, auditer Chat.tsx stream error recovery
**Contexte:** Le bug a ré-émergé à 20h09 le 26/04, 4 min après confirmation des 2 patches backend. Audit de chat.ts : keepalive 8s ✅, flush sur chaque write ✅, X-Accel-Buffering:no ✅. Audit du proxy route.ts : maxDuration=300s ✅, signal forwarding ✅, body streamé sans bufferisation ✅. Ni le backend ni le proxy ne sont en cause. Hypothèse : dans Chat.tsx, le gestionnaire du stream (`reader.read()` loop) ne reset pas correctement l'état React quand le stream se coupe brutalement (Railway restart ou blip réseau) — UI figée en "loading" jusqu'au refresh.
**Recommandation:** En priorité lors de la première session S7, lire `ui/jarvis/components/Chat.tsx`. Localiser le bloc try/catch/finally autour du reader loop. Vérifier : (1) `isLoading` (ou équivalent) est bien reset dans le `finally`, (2) l'AbortController est `abort()`ed et nullifié en cas d'erreur, (3) aucun stream précédent n'est laissé ouvert. Si le catch ne couvre pas toutes les sorties d'erreur → `propose_action(patch_file)` immédiatement.
**Action:**
- Fichier : `ui/jarvis/components/Chat.tsx`
- Lire : le gestionnaire fetch/stream, les blocs `catch` et `finally`
- Chercher : reset de `isLoading`, nettoyage du `reader`/`controller`, absence de state corrompu entre deux requêtes
- Si bug confirmé → `patch_file` avec les corrections précises
**Risques si ignoré:** Bug reproductible à chaque turbulence réseau ou restart Railway. L'utilisateur doit refresher — dégrade la confiance en JARVIS à chaque session intense (20-30 tool calls).
