---
date: "2026-05-14"
timestamp: "2026-05-14T08:13:55.107Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** plan-hebdo F+R S9 — fichiers toujours vides (templates [DATE]) à J4 jeudi

**Contexte:** Lu `fabrice/planning/plan-hebdo.md` et `romain/planning/plan-hebdo.md`. Les deux fichiers contiennent uniquement le template générique : `Semaine du [DATE] au [DATE]`, tableaux vides, priorités `[À remplir]`. Aucune donnée S9 n'a été saisie. Romain a logué dans son progress-semaine que 28 posts sont schedulés pour S9 (13-17/05), mais ce travail n'est pas reporté dans le plan-hebdo. Aujourd'hui = J4. La semaine se termine vendredi. Passer S9 entière sans plan-hebdo rempli signifie que le bilan de fin de semaine sera incomplet.

**Recommandation:** Remplir les 2 plan-hebdo avec les données S9 connues (jours, horaires schedulés, objectifs cold) avant le recap de vendredi. Le batch Romain du 13/05 contient l'information nécessaire (28 posts schedulés, plateformes, horaires).

**Action:**
- Fichier: `fabrice/planning/plan-hebdo.md` — remplacer les `[DATE]` et remplir les tableaux publication/cold/PH avec les données S9 réelles
- Fichier: `romain/planning/plan-hebdo.md` — idem

**Risques si ignoré:** Bilan S9 vendredi impossible à produire proprement. Semaine 10 sans point de comparaison. Metrics fin de semaine dans progress-semaines.md resteront vides.
