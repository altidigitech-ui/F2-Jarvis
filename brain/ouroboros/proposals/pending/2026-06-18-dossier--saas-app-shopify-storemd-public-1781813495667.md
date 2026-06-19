---
date: "2026-06-18"
timestamp: "2026-06-18T20:11:35.668Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Dossier `saas-app-shopify/storemd/publication/` absent — les deux plan-hebdo pointent vers un chemin mort
**Contexte:** Les plan-hebdo F et R (section 2) référencent `saas-app-shopify/storemd/publication/batch-semaine.md` pour les détails de publication StoreMD. Ce chemin retourne "File not found". Un repo_search sur "batch semaine publication" renvoie 0 résultats — aucun batch n'existe dans aucun sous-dossier. De plus, le lien markdown est malformé (`[batch-semaine.md](http://batch-semaine.md)`) — l'href pointe vers une URL fictive au lieu d'un chemin relatif. Le workflow publication StoreMD n'a jamais été initialisé dans le repo.
**Recommandation:** (1) Créer le dossier `saas-app-shopify/storemd/publication/`. (2) Y placer un `batch-S15-16juin.md` pour la semaine en cours. (3) Corriger les deux plan-hebdo pour pointer vers ce chemin avec un lien relatif valide.
**Action:**
- Créer : `saas-app-shopify/storemd/publication/batch-S15-16juin.md` (template batch semaine)
- Fichier : `fabrice/planning/plan-hebdo.md` — corriger la ligne : `[batch-semaine.md](http://batch-semaine.md)` → `[batch-S15-16juin.md](../../saas-app-shopify/storemd/publication/batch-S15-16juin.md)`
- Idem : `romain/planning/plan-hebdo.md`
**Risques si ignoré:** Le workflow publication reste structurellement absent. Les postes StoreMD (Twitter, Facebook, TikTok, Instagram, IH) ne peuvent pas être batché ni tracké — ce qui explique le 0 publication sur toutes les plateformes depuis le début.
