---
date: "2026-06-20"
timestamp: "2026-06-20T04:14:53.536Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** PENDING #15 diagnostic erroné — storemd/publication TROUVÉ à `marketing/` — correction de chemin précise disponible

**Contexte:** PENDING #15 diagnostiquait `saas-app-shopify/storemd/publication/` comme "absent". C'est incorrect : le fichier existe à `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` (27KB, contenu S14 complet confirmé). Le vrai problème : les deux plan-hebdo référencent le chemin sans le préfixe `marketing/`. De plus, `fabrice/planning/plan-hebdo.md` utilise une syntaxe markdown cassée : `` `saas-app-shopify/storemd/publication/[batch-semaine.md](http://batch-semaine.md)` `` (backtic wrappant un lien markdown — le `http://batch-semaine.md` est une fausse URL, vraisemblablement générée par Notion).

**Recommandation:** Corriger les deux références dans les plan-hebdo. Ne PAS créer de nouveau dossier — il existe déjà.

**Action:**
- Fichier: `fabrice/planning/plan-hebdo.md` — section 2 ligne ~36
  - Remplacer : `` `saas-app-shopify/storemd/publication/[batch-semaine.md](http://batch-semaine.md)` ``
  - Par : `` `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` ``
- Fichier: `romain/planning/plan-hebdo.md` — section 2 ligne ~35
  - Remplacer : `saas-app-shopify/storemd/publication/batch-semaine.md`
  - Par : `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`

**Risques si ignoré:** Si PENDING #15 est implémenté sans cette correction, il créerait un dossier `saas-app-shopify/storemd/publication/` dupliqué alors que le vrai fichier est sous `marketing/`. Les plan-hebdo continueraient à pointer vers un chemin mort.
