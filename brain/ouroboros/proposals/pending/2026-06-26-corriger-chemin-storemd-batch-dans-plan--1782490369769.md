---
date: "2026-06-26"
timestamp: "2026-06-26T16:12:49.769Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Corriger chemin StoreMD batch dans plan-hebdo F et R (préfixe `marketing/` manquant)
**Contexte:** `fabrice/planning/plan-hebdo.md` (ligne 36) et `romain/planning/plan-hebdo.md` (ligne 36) référencent toutes les deux : `saas-app-shopify/storemd/publication/batch-semaine.md`. Ce chemin n'existe pas à la racine du repo. Le vrai chemin est `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`. Quiconque suit ce lien dans plan-hebdo obtient "File not found".
**Recommandation:** Corriger la référence dans les deux fichiers.
**Action:**
- Fichier: `fabrice/planning/plan-hebdo.md`
- Modifier ligne 36 : `` `saas-app-shopify/storemd/publication/[batch-semaine.md](http://batch-semaine.md)` `` → `` `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` ``
- Fichier: `romain/planning/plan-hebdo.md`
- Modifier ligne 36 : `` `saas-app-shopify/storemd/publication/batch-semaine.md` `` → `` `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` ``
**Risques si ignoré:** Navigation cassée dans les deux plan-hebdo. Doublon silencieux si quelqu'un tente de créer `saas-app-shopify/` à la racine en croyant que le dossier manque.
