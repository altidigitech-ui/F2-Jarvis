# Leak Detector — SaaS #0

**Statut :** LIVE — lancement 16/03/2026 — ⚠️ EN MUTATION VERS STOREMD (pivot 03/04/2026)
**URL :** `leakdetector.tech`
**Repo produit :** `github.com/altidigitech-ui/leak-detector`

---

## Fichiers de ce dossier

| Fichier | Rôle | Mis à jour |
|---------|------|-----------|
| `context.md` | Fichier principal — positionnement, 8 catégories, personas (historiques, cible dev), USP/messaging, pricing, unit economics, paysage concurrentiel, stack publique/interne, lien studio, inputs cold outreach et publication. **Uploadé dans les projets Claude R et F.** | Au lancement + quand le produit évolue. ⚠️ Les personas seront remplacés par StoreMD. |
| `metrics.md` | Métriques produit — North Star, objectifs par phase (pré-pivot), seuils de décision, template hebdomadaire, historique mensuel. | Chaque vendredi (métriques semaine) + chaque fin de mois (historique) |
| `README.md` | Ce fichier. Navigation du dossier. | Quand la structure du dossier change |
| `asset-brand/` | Assets visuels LD (logo, screenshots, visuels PH). | Quand les assets sont créés ou mis à jour |

---

## Qui utilise ces fichiers

| Qui | Fichier | Pourquoi |
|-----|---------|----------|
| Projet Claude R | `context.md` | Cold outreach + posts R + posts F2 basés sur les données LD |
| Projet Claude F | `context.md` | Cold outreach technique + posts F |
| R au batch | `context.md` | Personas, messaging, USP pour calibrer les angles |
| R à la revue vendredi | `metrics.md` | Métriques produit de la semaine |
| R + F revue mensuelle | `metrics.md` §4 | Historique mensuel, tendances, décisions |

---

## Liens vers les fichiers associés dans le repo

| Fichier | Emplacement | Relation avec ce dossier |
|---------|-------------|------------------------|
| `saas/context.md` | `saas/` | Parent — conventions portefeuille, structure des sous-dossiers |
| `saas/roadmap.md` | `saas/` | Pipeline SaaS, roadmap produit LD post-lancement, métriques cibles |
| `tracking/utm/leak-detector/` | `tracking/utm/` | Fichier UTM dédié à LD |
| `romain/cold/grok/ECOM-context.md` | `romain/cold/grok/` | Contexte Grok cold outreach e-com (R) — inclut LD/StoreMD |
| `romain/cold/grok/ECOM-prompt.md` | `romain/cold/grok/` | Prompt Grok cold outreach e-com (R) |
| `fabrice/cold/grok/ECOM-context.md` | `fabrice/cold/grok/` | Contexte Grok cold outreach e-com (F) — inclut LD/StoreMD |
| `fabrice/cold/grok/ECOM-prompt.md` | `fabrice/cold/grok/` | Prompt Grok cold outreach e-com (F) |
| `produits/MUTATIONS.md` | Racine du repo | Specs mutation LD → StoreMD |

---

## Quand mettre à jour ce dossier

| Événement | Action |
|-----------|--------|
| Mutation StoreMD complète | Créer `saas/storemd/`, migrer le contenu pertinent, marquer LD comme "muté" |
| Nouveau pricing ou nouveau plan | Mettre à jour `context.md` §5 + re-uploader dans les projets Claude R et F |
| Feature majeure | Mettre à jour `context.md` §1 et §7 si la feature est mentionnable publiquement |
| Pivot messaging | Mettre à jour `context.md` §4 + re-uploader dans les projets Claude R et F |
| Nouveau concurrent direct | Mettre à jour `context.md` §6 |
| Changement de stack publique | Mettre à jour `context.md` §7 |
| Chaque vendredi | Remplir `metrics.md` §3 |
| Chaque fin de mois | Remplir `metrics.md` §4 |
