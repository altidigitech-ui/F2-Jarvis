---
date: "2026-04-24"
timestamp: "2026-04-24T12:24:14.678Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Titre:** Protocole "blackout minimal" à définir dans S7 — éviter que construction système = arrêt total marketing
**Contexte:** S6 a établi un précédent clair : une semaine de construction intense (JARVIS) = J1-J3 de marketing à zéro. Ce n'est pas une faiblesse ponctuelle — c'est un pattern qui se reproduira à chaque chantier système majeur (nouvelles features StoreMD, pivots JARVIS, etc.). Il n'existe actuellement aucun protocole documenté pour les semaines de construction.
**Recommandation:** Dans le batch S7 (ou dans un document stratégie), définir le "minimum vital blackout" : pendant une semaine de construction intensive, la règle est (a) posts schedulés = non négociables (déjà en place), (b) cross-engagement = 5 min/jour minimum même en construction (A/B le même jour, c'est 2 clicks), (c) cold = 3/jour minimum au lieu de 10 (30 min vs 1h). Ce protocole aurait récupéré ~30 cold et 6 crosses supplémentaires en S6. Le rédiger une fois = applicable à toutes les semaines futures avec chantier.
**Risques si ignoré:** Chaque sprint technique (et il y en aura) remet les compteurs à zéro sur le marketing. Sur 12 mois avec 4-6 semaines de construction, cela représente potentiellement 200-300 cold perdus et des dizaines de crosses manqués.
