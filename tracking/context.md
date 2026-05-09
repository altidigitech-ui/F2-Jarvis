# CONTEXT TRACKING — Infrastructure de suivi

> Ce dossier contient les données de suivi TRANSVERSALES — pas spécifiques à un business ou une personne.
> Les données spécifiques vivent dans les dossiers des personnes (romain/, fabrice/) et des business (saas-app-shopify/storemd/).
> Hérite de : `../BIBLE.md`, `../strategie/CONTEXT.md`
> Dernière mise à jour : 08/05/2026

---

## 1. CE QUE CE DOSSIER CONTIENT

| Fichier | Rôle |
|---------|------|
| `context.md` | CE FICHIER — porte d'entrée, infrastructure de tracking |
| `suivi-comptes.md` | Carte d'identité de TOUS les comptes (R, F, business) |
| `dashboard-hebdo.md` | Métriques consolidées de la semaine |
| `decisions-log.md` | Log historique des décisions stratégiques |
| `batch-log.md` | Log des cycles automatiques Jarvis |
| `utm/` | Liens UTM par business (1 dossier par business) |

---

## 2. OÙ VIVENT LES DONNÉES — CARTE COMPLÈTE

### Tracking central (ce dossier)

| Type de donnée | Fichier | Fréquence de mise à jour |
|---------------|---------|-------------------------|
| Comptes écosystème | `suivi-comptes.md` | Quand un compte est créé/modifié |
| Dashboard hebdo | `dashboard-hebdo.md` | Fin de semaine |
| Décisions | `decisions-log.md` | À chaque décision stratégique |
| UTM StoreMD | `utm/StoreMD/UTM_TRACKING_LINKS.md` | À chaque nouveau lien créé |

### Tracking par personne

| Type de donnée | Romain | Fabrice |
|---------------|--------|--------|
| Progress terrain | `romain/tracking/progress.md` | `fabrice/tracking/progress.md` |
| Comptes et groupes rejoints | `romain/tracking/comptes-groupes.md` | `fabrice/tracking/comptes-groupes.md` |
| Douleurs observées | `romain/tracking/douleurs-observees.md` | `fabrice/tracking/douleurs-observees.md` |
| Cold-logs Twitter | `romain/cold/cold-log-twitter.md` | `fabrice/cold/cold-log-twitter.md` |
| Cold-logs LinkedIn | `romain/cold/cold-log-linkedin.md` | `fabrice/cold/cold-log-linkedin.md` |
| Cold-logs Facebook | `romain/cold/cold-log-facebook.md` | `fabrice/cold/cold-log-facebook.md` |
| Engagement Reddit | `romain/engagement/reddit/engagement-log.md` | `fabrice/engagement/reddit/engagement-log.md` |
| Engagement PH | `romain/engagement/ph/engagement-log.md` | `fabrice/engagement/ph/engagement-log.md` |

### Tracking par business

Les données trackées dépendent du type de business. SaaS = cold-logs, pipeline-conversion, scans. Boutique = commandes, panier, revenue, trafic. Les fichiers spécifiques vivent dans le dossier du business.

**SaaS (StoreMD, ProfitPilot quand live)**

| Type de donnée | StoreMD | Futur SaaS |
|---------------|---------|------------|
| Cold-logs Instagram | `saas-app-shopify/storemd/cold/cold-log-instagram.md` | `[dossier business]/cold/cold-log-[plateforme].md` |
| Cold-logs TikTok | `saas-app-shopify/storemd/cold/cold-log-tiktok.md` | Idem |
| Pipeline conversion | `saas-app-shopify/storemd/pipeline-conversion.md` | `[dossier business]/pipeline-conversion.md` |
| Batch dispatch | `saas-app-shopify/storemd/publication/batch-semaine.md` | `[dossier business]/publication/batch-semaine.md` |

**Boutique (høkuno quand live)**

| Type de donnée | høkuno | Futur boutique |
|---------------|--------|---------------|
| Commandes / panier / revenue | `boutique/hokuno/tracking/` (à créer) | `[dossier business]/tracking/` |
| Publication (7/7) | `boutique/hokuno/publication/batch-semaine.md` (à créer) | `[dossier business]/publication/batch-semaine.md` |
| Pas de cold-logs | — | — |
| Pas de pipeline-conversion | — | — |

### Batch centralisé

| Type de donnée | Fichier |
|---------------|---------|
| Batch central (tous les posts, tous les comptes) | `marketing/contenu/batch-semaine/batch-semaine.md` |
| Template batch (mode d'emploi) | `marketing/contenu/batch-semaine/batch-template.md` |
| Dispatch R | `romain/publication/batch-semaine.md` |
| Dispatch F | `fabrice/publication/batch-semaine.md` |
| Dispatch StoreMD | `saas-app-shopify/storemd/publication/batch-semaine.md` |

---

## 3. CONVENTIONS UTM

### Format standard

```
[domaine-produit]?utm_source=[plateforme]&utm_medium=[type]&utm_campaign=[campagne]&utm_content=[detail]
```

### Organisation

- 1 dossier utm/ par business : `utm/StoreMD/`, `utm/hokuno/` (quand créé), `utm/profitpilot/` (quand créé)
- Chaque dossier contient le fichier UTM complet du business
- Référence actuelle : `utm/StoreMD/UTM_TRACKING_LINKS.md`

### Règles

- Chaque lien publié = UTM obligatoire. Aucun lien nu.
- UTM différent selon le type : bio, cold, publication, reply
- UTM différent selon la plateforme
- Voir le fichier UTM du business concerné pour les liens exacts

---

## 4. PROCESS DE REVUE — FIN DE SEMAINE

R et F revoient les données de la semaine :

### Données à collecter

**SaaS (StoreMD) :**

| Source | Ce qu'on regarde |
|--------|-----------------|
| Cold-logs (romain/cold/, fabrice/cold/, storemd/cold/) | Combien envoyés, taux réponse par plateforme |
| Pipeline-conversion (saas-app-shopify/storemd/) | Conversations actives, beta spots claimed, conversions |
| Progress.md (romain/tracking/, fabrice/tracking/) | Observations terrain, insights, patterns |
| Analytics plateformes (Twitter, LinkedIn, TikTok, Instagram) | Impressions, engagement rate, followers, meilleur/pire post |
| Dashboard produit (StoreMD admin) | Installs, scans, MRR |

**Boutique (høkuno quand live) :**

| Source | Ce qu'on regarde |
|--------|-----------------|
| Shopify admin (høkuno) | Commandes, panier moyen, revenue, trafic, taux conversion |
| Analytics plateformes (Instagram, TikTok, Pinterest) | Impressions, engagement, followers, meilleur/pire post |
| Progress.md (romain/tracking/, fabrice/tracking/) | Observations terrain |
| Pas de cold-logs | — |

### Où consolider

- Métriques chiffrées → `dashboard-hebdo.md` (ce dossier)
- Décisions prises → `decisions-log.md` (ce dossier)
- Observations terrain → `progress.md` (par personne)

### Questions clés

| Question | Si négatif |
|----------|-----------|
| Combien de cold envoyés vs objectif (80/jour) ? | Identifier le blocage par plateforme |
| Quel taux de réponse par plateforme ? | Réallouer le volume vers les plateformes qui convertissent |
| Combien de beta spots pris cette semaine ? | Revoir les hooks, les templates, la qualification |
| Quels posts ont le mieux marché ? | Reproduire le format/angle qui fonctionne |
| Quels posts ont floppé ? | Comprendre pourquoi, ne pas reproduire |

---

## 5. SCALABILITÉ

Quand un nouveau business arrive :

1. Créer `utm/[business]/` avec le fichier UTM du business
2. Ajouter une section dans `dashboard-hebdo.md` pour les métriques du business
3. Les données spécifiques vivent dans le dossier du business
4. Le process de revue reste le même — on ajoute juste les sources du nouveau business

### Ce qui change selon le type de business

| | SaaS | Boutique |
|---|------|---------|
| Cold-logs | Oui (dans le dossier du business) | Non |
| Pipeline-conversion | Oui (scan → beta → payant) | Non (panier → commande) |
| Publication | Lun-ven | 7/7 |
| Métriques clés | DMs envoyés, taux réponse, installs, MRR | Commandes, panier moyen, revenue, trafic |
| Comptes perso R+F | Cold + publication | Republication + partage lien uniquement |

Le reste de l'infrastructure ne change pas.
