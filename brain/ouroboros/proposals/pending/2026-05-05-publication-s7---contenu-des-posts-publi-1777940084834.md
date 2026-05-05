---
date: "2026-05-05"
timestamp: "2026-05-05T00:14:44.835Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Publication S7 — Contenu des posts publiés absent du repo (F et R)
**Contexte:** `fabrice/publication/twitter/` et `romain/publication/twitter/` ne contiennent que `semaine-6/`. Pourtant, progress-semaine F confirme 7 posts publiés en S7 (Lun 27/04, Mar 28/04, Jeu 30/04 — Twitter A, B, LinkedIn A, B, TikTok V1/V2, Instagram V1/V2). Tous les titres dans progress-semaine sont tronqués à ~50 chars ("Twitter A — 3 things Shopify dashboard won't tell ..."). Le contenu complet n'est pas récupérable depuis le repo.
**Recommandation:** Décider formellement si le modèle de publication a changé en S7 : soit créer rétrospectivement `semaine-7/` avec les posts (à récupérer depuis l'historique JARVIS ou Twitter directement), soit documenter que le modèle "fichier statique" est abandonné et que progress-semaine est le seul log. Sans cette décision, l'incohérence persistera en S8.
**Action:**
- Fichier: fabrice/publication/twitter/ → créer `semaine-7/` OU
- Fichier: fabrice/publication/README.md → documenter "S7+ : posts via JARVIS direct, pas de fichier statique"
- Même chose pour romain/publication/twitter/
**Risques si ignoré:** Impossible de repurposer les posts S7 qui ont performé. Si analytics arrivent (impressions, ER) pour les posts S7, il n'y a pas de contenu associé pour analyser ce qui a fonctionné. Debt de contenu qui s'accumule en S8.
