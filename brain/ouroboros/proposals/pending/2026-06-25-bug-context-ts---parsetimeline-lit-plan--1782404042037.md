---
date: "2026-06-25"
timestamp: "2026-06-25T16:14:02.038Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Bug context.ts — parseTimeline lit plan-hebdo.md (mauvais fichier + regex cassé) → timeline toujours vide
**Contexte:** `context.ts` ligne 245 charge `${persona}/planning/plan-hebdo.md` comme source de la timeline. La fonction `parseTimeline()` ligne 116 y cherche des sections via le regex `/^##\s+\d+[A-Za-z]?\.\s*(POSTS\s+\w+.*)/gm` (format attendu: `## 1A. POSTS TWITTER 13h00`). Or plan-hebdo.md contient `## 1. PUBLICATION — COMPTES PERSO F` → aucun match possible, 0 post en timeline. De surcroît, le contenu réel S15 dispatché vit dans `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` — ces fichiers ne sont JAMAIS lus par context.ts. Confirmé : les deux batch-semaine.md ont bien les 5 jours S15 (22→26/06) mais la timeline JARVIS les ignore totalement.
**Recommandation:** Dans `backend/jarvis/src/routes/context.ts`, ajouter la lecture de `${persona}/publication/batch-semaine.md` dans le `Promise.all()` (ligne ~240) et écrire une fonction `parseBatchTimeline(batchContent, today, publishedBy)` qui extrait les posts via le format `#### {ID} — {Persona} — {Platform} — {Date} {Heure}`. Inclure le résultat dans le `timeline` final avant le `.sort()`.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Ajouter dans le `Promise.all` (après ligne 254) : `readRepo(\`${persona}/publication/batch-semaine.md\`)`
- Ajouter fonction `parseBatchTimeline(content, today, publishedBy)` qui matche `/^####\s+\w+-\w+-S\d+-\d+\s+—\s+.+—\s+(.+)\s+—\s+\w+\s+(\d{2}\/\d{2})\s+(\d{1,2}h\d{2})/gm`
- Injecter dans la `timeline` finale : `[...timelinePosts, ...batchTimelinePosts, ...otherTimelinePosts, ...]`
**Risques si ignoré:** La timeline JARVIS n'affichera jamais aucun post programmé. Les posts S15 J4 et J5 (25-26/06) restent invisibles dans le dashboard. L'outil est aveugle à 100% du contenu de publication.
