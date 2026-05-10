---
date: "2026-05-10"
timestamp: "2026-05-10T06:12:50.512Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Clore 2 proposals PENDING résolues silencieusement — publication/ dirs + progress.md S9
**Contexte:** Deux proposals de la liste PENDING sont désormais obsolètes et alourdissent le backlog inutilement :
(1) "Créer fabrice/publication/ — répertoire absent" → `fabrice/publication/` EXISTE avec `batch-semaine.md` (921 chars). Idem `romain/publication/` (1KB).
(2) "Créer S8 progress-semaine.md F+R — pollution imminente des données S7" → `fabrice/tracking/progress.md` et `romain/tracking/progress.md` EXISTENT, datés S9 (11/05-17/05), structure complète avec compteurs, analytics et métriques.
Ces deux problèmes ont été résolus silencieusement sans passer par `/review-proposals`.
**Recommandation:** Marquer RESOLVED dans le gestionnaire de proposals : "Créer fabrice/publication/" et "Créer S8 progress-semaine.md F+R". La liste PENDING passe de 50 à 48.
**Risques si ignoré:** La liste PENDING à 50 items dilue l'attention. Les vrais problèmes urgents (batch, cold) se noient dans des faux-positifs déjà résolus.
