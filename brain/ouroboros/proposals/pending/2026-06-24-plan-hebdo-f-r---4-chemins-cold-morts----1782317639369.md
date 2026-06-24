---
date: "2026-06-24"
timestamp: "2026-06-24T16:13:59.369Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Plan-hebdo F+R — 4 chemins cold morts à corriger (extension de PENDING #45)

**Contexte:** PENDING #45 couvre le chemin publication mort (`saas-app-shopify/storemd/publication/`). Mais les deux plan-hebdo contiennent aussi des chemins dead pour les ressources cold, non couverts par aucun PENDING actuel. Lu aujourd'hui (24/06) dans les deux fichiers :
- `fabrice/planning/plan-hebdo.md` ligne Templates : `saas-app-shopify/storemd/cold/[cold-templates.md]` → **MORT**
- `fabrice/planning/plan-hebdo.md` ligne Cibles : `saas-app-shopify/recherche/cold/` → **MORT**
- `romain/planning/plan-hebdo.md` ligne Templates : `saas-app-shopify/storemd/cold/cold-templates.md` → **MORT**
- `romain/planning/plan-hebdo.md` ligne Cibles : `saas-app-shopify/recherche/cold/` → **MORT**

Confirmé : le fichier réel existe à `marketing/saas-app-shopify/storemd/cold/cold-templates.md` (lu aujourd'hui, 10KB, non vide).

**Recommandation:** Corriger les 4 lignes simultanément lors du fix de PENDING #45 (même commit, même PR). Le préfixe à substituer est systématique : `saas-app-shopify/` → `marketing/saas-app-shopify/`.

**Action:**
- Fichier : `fabrice/planning/plan-hebdo.md`
  - Ligne Templates : `saas-app-shopify/storemd/cold/[cold-templates.md](http://cold-templates.md)` → `marketing/saas-app-shopify/storemd/cold/cold-templates.md`
  - Ligne Cibles : `saas-app-shopify/recherche/cold/` → `marketing/saas-app-shopify/recherche/cold/`
- Fichier : `romain/planning/plan-hebdo.md`
  - Ligne Templates : `saas-app-shopify/storemd/cold/cold-templates.md` → `marketing/saas-app-shopify/storemd/cold/cold-templates.md`
  - Ligne Cibles : `saas-app-shopify/recherche/cold/` → `marketing/saas-app-shopify/recherche/cold/`

**Risques si ignoré:** Quand le cold redémarrera, F/R chercheront les templates via le mauvais chemin et devront chercher manuellement le fichier. Friction inutile à J-0 d'une reprise d'activité.
