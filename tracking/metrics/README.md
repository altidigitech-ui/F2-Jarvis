# Métriques — Guide de collecte

## Quand

Chaque **samedi**, AVANT de commencer la rédaction du batch.

## Sources par metric

| Dossier / Fichier | Source | Compte(s) | Format collecte |
|-------------------|--------|-----------|-----------------|
| `storemd-admin/` | `storemd.vercel.app/dashboard/admin` | StoreMD (produit) | Manuel (capture dashboard) |
| `tiktok/` | TikTok Analytics (Business Account) | StoreMD (`@storeemd`) | Export ZIP (Overview, Content, Followers, Viewers) |
| `instagram/` | Instagram Insights (Business Account) | StoreMD | Manuel (pas d'export natif) |
| `facebook/` | Facebook Business Suite → Statistiques | StoreMD Page | Manuel (capture dashboard) |
| `twitter/storemd.md` | Twitter Analytics (CSV) | StoreMD (`@StoreMd_off`) | Export CSV (account overview, content, video overview) |
| `twitter/romain.md` | Twitter Analytics (CSV) | R (`@delgado_ro72224`) | Export CSV |
| `twitter/fabrice.md` | Twitter Analytics (CSV) | F (`@FabGangi`) | Export CSV |
| `linkedin/romain.md` | LinkedIn Analytics (XLSX) | R (Romain Delgado) | Export XLSX `AggregateAnalytics_[Nom]_[dates].xlsx` |
| `linkedin/fabrice.md` | LinkedIn Analytics (XLSX) | F (Fabrice Gangitano) | Export XLSX |
| `ph/romain.md` | `producthunt.com/@romain_delgado` | R (Product Hunt) | Manuel (copier-coller onglets About/Activity/Upvotes) |
| `ph/fabrice.md` | `producthunt.com/@fabrice` | F (Product Hunt) | Manuel |
| `ih/foundrytwo.md` | `indiehackers.com/@foundrytwo` | FoundryTwo (IH) | Manuel |
| `foundrytwo-analytics.md` | Page hub `foundrytwo.com` (tracking interne) | Domaine | À définir (analytics pas encore en place) |
| `hokuno-admin.md` | Dashboard Hokuno (Shopify Admin) | Hokuno boutique | À définir (lancement 25/05) |

## Règles transversales

- **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
- **Libellés strictement identiques aux sources natives** (anglais, français, casse exacte selon la plateforme). Pas de francisation des libellés EN, pas d'anglicisation des libellés FR.
- **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.
- **Format date strict :** `JJ/MM/AAAA` partout (même si l'export source affiche `Mon, May 11, 2026` ou `10 mai`).
- **Sections vides à 0 followers** (démographie audience, etc.) : mettre `0` dans les cellules, ne pas supprimer la structure.
- Chaque snapshot porte sa propre plage de dates et sa date de prise — pas de convention universelle, on s'adapte à ce que la source fournit.

## Qui utilise ces données

- Le batch template (`marketing/contenu/batch-semaine/batch-template.md`) les référence en §0 RED LINES et §2 PRÉPARER.
- Le context StoreMD (`saas-app-shopify/storemd/context.md`) les référence en §15 MÉTRIQUES CANON.
- Jarvis et tous les agents de publication (lecture seule pour informer les décisions de rédaction du batch).

## À faire ultérieurement

- **foundrytwo-analytics** : migrer en dossier `foundrytwo-analytics/` avec data + template quand le tracking sera en place (post-lancement page hub, S10).
- **hokuno-admin** : migrer en dossier `hokuno-admin/` avec data + template après lancement Hokuno (25/05/2026).
