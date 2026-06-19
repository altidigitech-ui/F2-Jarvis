---
date: "2026-06-19"
timestamp: "2026-06-19T08:13:57.497Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** `fabrice/publication/batch-semaine.md` — chemin réel trouvé, à corriger dans plan-hebdo (complète proposal #9)
**Contexte:** La proposal pending #9 identifie que le plan-hebdo pointe vers `saas-app-shopify/storemd/publication/batch-semaine.md` (chemin mort). Nouvelle donnée : le dossier `saas-app-shopify/` n'existe pas du tout à la racine du repo. Le vrai fichier de dispatch Fabrice est à `fabrice/publication/batch-semaine.md` (11KB, S14 complet). Le contenu StoreMD partagé est dans `produits/saas/storemd/` (sans dossier publication). Les plan-hebdo des deux personas référencent donc non seulement un dossier absent, mais une arborescence entière inexistante.
**Recommandation:** Mettre à jour les deux plan-hebdo : remplacer la ligne `saas-app-shopify/storemd/publication/[batch-semaine.md]` par `fabrice/publication/batch-semaine.md` (et vérifier qu'un équivalent `romain/publication/batch-semaine.md` existe ou doit être créé).
**Action:**
- Fichier: `fabrice/planning/plan-hebdo.md`
- Modifier: `Voir \`saas-app-shopify/storemd/publication/[batch-semaine.md](http://batch-semaine.md)\`` → `Voir \`fabrice/publication/batch-semaine.md\``
- Fichier: `romain/planning/plan-hebdo.md`
- Modifier: `Voir \`saas-app-shopify/storemd/publication/batch-semaine.md\`` → `Voir \`romain/publication/batch-semaine.md\` (à créer si inexistant)`
**Risques si ignoré:** Chaque batch dispatch via JARVIS continue de référencer un chemin mort. La navigation dans le repo reste incohérente pour quiconque cherche le contenu de publication.
