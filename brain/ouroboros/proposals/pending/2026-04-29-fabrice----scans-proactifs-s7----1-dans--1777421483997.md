---
date: "2026-04-29"
timestamp: "2026-04-29T00:11:23.998Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Fabrice — "Scans proactifs S7" = 1 dans progress-semaine, mais 2 scans réels loggés
**Contexte:** Le compteur `Scans proactifs S7` dans `fabrice/progress-semaine.md` (section COMPTEURS COURANTS) affiche 1. Pourtant, deux scans sont tracés dans les événements : 27/04 — scan @0foxShop (score 69/100) et 28/04 — scan thelunarjeweler.com (score 72/100). Le compteur n'a pas été mis à jour après le second scan du 28/04.
**Recommandation:** Corriger la valeur de 1 → 2 dans la table COMPTEURS COURANTS.
**Action:**
- Fichier: `fabrice/progress-semaine.md`
- Modifier: `| Scans proactifs S7 | 1 |` → `| Scans proactifs S7 | 2 |`
**Risques si ignoré:** Le dashboard et les bilans de semaine sous-comptent les scans proactifs, ce qui masque l'activité réelle et fausse le suivi du canon S7 (6 scans/jour objectif).
