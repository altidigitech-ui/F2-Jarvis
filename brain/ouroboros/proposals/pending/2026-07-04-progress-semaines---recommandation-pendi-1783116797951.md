---
date: "2026-07-04"
timestamp: "2026-07-03T22:13:17.952Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Progress-semaines — recommandation PENDING 27/06 obsolète : corriger S16→S17

**Contexte:** Le PENDING "Progress-semaines — skip S15, créer directement header S16 (29/06 → 05/07)" date du 27/06 et recommande de créer un header S16. Or S16 est **maintenant terminée** (J5 = 03/07). Suivre cette recommandation aujourd'hui serait incorrect : créer un header S16 pour une semaine déjà écoulée n'a pas de sens. Les deux fichiers concernés (`fabrice/tracking/progress-semaines.md` et `romain/tracking/progress-semaines.md`) affichent encore le header S11 (25/05).

**Recommandation:** Lors de l'action sur les progress-semaines, ignorer la recommandation S16 du PENDING existant. La cible correcte est : **skip S11, S12, S13, S14, S15, S16 → créer header S17 (06/07 → 12/07)** pour les deux personas.
**Action:**
- Fichier: `fabrice/tracking/progress-semaines.md`
  - Modifier ligne 1 : `# PROGRESS SEMAINE F — Semaine du 25/05/2026 au 31/05/2026` → `# PROGRESS SEMAINE F — Semaine du 06/07/2026 au 12/07/2026`
  - Modifier ligne 4 : `**Contexte :** SEMAINE 11 — [À COMPLÉTER]` → `**Contexte :** SEMAINE 17 — Acquisition beta testers StoreMD`
- Fichier: `romain/tracking/progress-semaines.md`
  - Même corrections (S11→S17, dates 25/05→06/07)
**Risques si ignoré:** Si Fabrice exécute l'ancien PENDING, il crée un header S16 pour une semaine morte. Les progress-semaines restent désynchronisés et les compteurs du dashboard continuent d'être faux.
