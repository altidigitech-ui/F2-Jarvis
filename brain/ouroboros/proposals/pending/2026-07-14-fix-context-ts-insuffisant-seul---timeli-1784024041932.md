---
date: "2026-07-14"
timestamp: "2026-07-14T10:14:01.932Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts insuffisant seul — timeline restera vide tant que dates dispatch sont S15 (22-26/06)
**Contexte:** Le PENDING "Bug context.ts — parseTimeline lit plan-hebdo.md → timeline toujours vide" documente le bug technique. Ce cycle révèle un second blocage en série : `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` ont des dates de publication codées en dur à "Lun 22/06", "Mar 23/06", etc. Même si `context.ts` était corrigé pour lire le bon fichier, il ne trouverait aucun post pour la semaine du 13-19/07 — les dates sont 3 semaines dans le passé. La timeline serait encore vide.
**Recommandation:** Le fix est à deux étapes séquentielles, pas une :
1. Corriger `context.ts` pour lire `{persona}/publication/batch-semaine.md` (bug existant)
2. Mettre à jour les dates dans les dispatch files F et R pour la semaine S19 (Mar 15/07 → Ven 18/07) — soit via re-dispatch depuis le batch central, soit en éditant directement les headers de planning dans les fichiers dispatch
Sans l'étape 2, l'étape 1 ne change rien à l'expérience utilisateur.
**Action:**
- Fichier 1: `backend/jarvis/src/routes/context.ts` — corriger parseTimeline (bug existant)
- Fichier 2: `fabrice/publication/batch-semaine.md` — mettre à jour les 5 jours (lignes "═══ LUNDI 22/06 ═══" → "═══ MARDI 15/07 ═══", etc.)
- Fichier 3: `romain/publication/batch-semaine.md` — même opération
**Risques si ignoré:** La timeline reste vide toute la semaine S19 même après le fix technique, bloquant la visibilité de JARVIS sur les posts à venir.
