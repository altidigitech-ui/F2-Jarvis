---
date: "2026-06-26"
timestamp: "2026-06-25T22:12:00.196Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Rotation progress-semaines F et R — fichiers bloqués à S11 (25 mai) depuis 4 semaines
**Contexte:** Les fichiers `fabrice/tracking/progress-semaines.md` et `romain/tracking/progress-semaines.md` portent l'en-tête "Semaine du 25/05/2026 au 31/05/2026" avec "SEMAINE 11" et tous compteurs à 0. On est au dernier jour de S15 (26/06/2026). Les semaines S12, S13, S14 et S15 n'ont aucun fichier de tracking : 4 semaines d'activité complètement non tracées (publications dispatch, cold, PH, Reddit). Le fichier actuel est le stale template S11 qui n'a jamais été roté.
**Recommandation:** Créer un nouveau fichier `progress-semaines.md` pour chacun des deux personas daté "Semaine du 22/06/2026 au 28/06/2026 — SEMAINE 15", avec les compteurs remis à 0 pour S15. À faire maintenant (J5) pour pouvoir tracker les 3 posts du jour, et servir de base propre pour S16 lundi.
**Action:**
- Fichier: `fabrice/tracking/progress-semaines.md`
- Modifier: ligne 1 → `# PROGRESS SEMAINE F — Semaine du 22/06/2026 au 28/06/2026`
- Modifier: ligne 4 → `**Contexte :** SEMAINE 15 — Batch S15 dispatch confirmé (22-26/06), lancement StoreMD offre standard`
- Idem pour: `romain/tracking/progress-semaines.md` en remplaçant F par R
**Risques si ignoré:** Toute la S16 continuera sur un template S11. Les compteurs, analytics et bilans hebdo restent vides. Impossible de savoir si les objectifs cold/PH/publications sont tenus.
