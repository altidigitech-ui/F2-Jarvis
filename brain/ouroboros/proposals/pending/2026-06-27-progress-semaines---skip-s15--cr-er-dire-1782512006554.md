---
date: "2026-06-27"
timestamp: "2026-06-26T22:13:26.555Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Progress-semaines — skip S15, créer directement header S16 (29/06 → 05/07)
**Contexte:** La PENDING "Rotation progress-semaines" (créée 26/06) recommandait de mettre à jour les headers vers "Semaine du 22/06/2026 au 28/06/2026 — SEMAINE 15" avec la note "À faire maintenant (J5 vendredi)". J5 (vendredi 26/06) est passé. Aujourd'hui est samedi 27/06 — dernier jour de S15. Appliquer l'action recommandée maintenant = 1 seul jour de tracking avant que le fichier soit obsolète dès lundi. C'est inutile.

Données directes : `fabrice/tracking/progress-semaines.md` et `romain/tracking/progress-semaines.md` portent toujours "Semaine du 25/05/2026 au 31/05/2026 — SEMAINE 11". S16 démarre lundi 29/06 dans 2 jours.
**Recommandation:** Skip S15. Mettre à jour les deux progress-semaines directement pour S16 (29/06–05/07) aujourd'hui — ce sera le fichier actif pour toute la semaine prochaine. La PENDING existante a une action devenue suboptimale.
**Action:**
- Fichier : `fabrice/tracking/progress-semaines.md`
  - Ligne 1 → `# PROGRESS SEMAINE F — Semaine du 29/06/2026 au 05/07/2026`
  - Ligne 4 → `**Contexte :** SEMAINE 16 — Batch S16 à créer. Objectifs : cold 50/jour × 5j, PH 6/jour, 1 post Twitter/jour, 2 LinkedIn.`
- Fichier : `romain/tracking/progress-semaines.md`
  - Ligne 1 → `# PROGRESS SEMAINE R — Semaine du 29/06/2026 au 05/07/2026`
  - Ligne 4 → `**Contexte :** SEMAINE 16 — idem F, coordonner dispatch StoreMD.`
**Risques si ignoré:** S16 démarre lundi avec tracking bloqué à S11. 5 semaines de drift de tracking continu. Impossible de mesurer cold/PH/publications sur la semaine.
