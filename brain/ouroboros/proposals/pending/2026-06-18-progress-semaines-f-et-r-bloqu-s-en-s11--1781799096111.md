---
date: "2026-06-18"
timestamp: "2026-06-18T16:11:36.111Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Progress-semaines F et R bloqués en S11 (25/05) — 3 semaines de retard
**Contexte:** `fabrice/tracking/progress-semaines.md` et `romain/tracking/progress-semaines.md` affichent tous les deux "Semaine du 25/05/2026 au 31/05/2026 — SEMAINE 11" avec tous les compteurs à 0. On est le 18/06/2026 en semaine S14. Le batch-log confirme que JARVIS était hors ligne du 19/05 au 15/06 (26 jours de silence). Depuis la reprise du 15/06, les fichiers progress-semaines n'ont pas été rotatés pour S12, S13, ni S14. Le système de compteurs JARVIS lit ces fichiers pour construire les widgets du dashboard — tant qu'ils restent en S11, les compteurs affichés seront faux.
**Recommandation:** Créer les progress-semaines pour S14 (16→22/06/2026) pour les deux personas, ou mettre à jour les fichiers existants avec la semaine courante. Renseigner les événements notables des 3 premiers jours de S14 (15, 16, 17 juin) si disponibles.
**Action:**
- Fichier: `fabrice/tracking/progress-semaines.md` → remplacer l'en-tête "Semaine du 25/05" par "Semaine du 16/06/2026 au 22/06/2026 — SEMAINE 14" + remettre les compteurs à 0 pour S14
- Fichier: `romain/tracking/progress-semaines.md` → même opération
**Risques si ignoré:** Le dashboard JARVIS reste bloqué sur une semaine fantôme. Les compteurs cold, PH, publications restent à 0 même si du travail est fait — perte de visibilité opérationnelle totale.
