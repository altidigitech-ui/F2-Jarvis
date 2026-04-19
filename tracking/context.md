# CONTEXT TRACKING — Infrastructure de suivi FoundryTwo

**Dernière mise à jour :** 05 avril 2026
**Ce fichier contient :** l'infrastructure de tracking (quoi tracker, dans quels outils, conventions UTM, process de revue). Ce fichier est la RÉFÉRENCE CENTRALE pour le suivi des métriques.
**Ce fichier ne duplique PAS :** les conventions UTM par plateforme (growth-marketing/context.md §13), le process de revue détaillé (growth-marketing/context.md §14), le suivi cold outreach (marketing/context.md §8.6).

---

## 1. OUTILS DE TRACKING

| Outil | Emplacement | Ce qu'il contient | Fréquence de mise à jour |
|-------|-------------|-------------------|-------------------------|
| **FoundryTwo-Growth-Tracker.xlsx** | `tracking/` | Suivi global : cold outreach (date, plateforme, URL, score, lien post, réaction, client payant), signups, MRR, conversion | Quotidien (cold outreach) + vendredi (métriques globales) |
| **UTM-Tracking-FoundryTwo.xlsx** | `tracking/utm/leak-detector/` | Liens UTM par plateforme et campagne pour LD | À chaque nouveau lien créé |
| **Twitter Analytics** | twitter.com/analytics | Impressions, engagement rate, profile visits, followers, top tweets | Vendredi à la revue |
| **LinkedIn Analytics** | linkedin.com (section analytics) | Impressions, commentaires, profile visits, connexions | Vendredi à la revue |
| **IH Dashboard** | indiehackers.com | Views, comments, upvotes sur les posts @foundrytwo | Vendredi à la revue |
| **PH Dashboard** | producthunt.com | Upvotes, comments, ranking par lancement | Jour J + J+1 + vendredi |

---

## 2. CONVENTIONS UTM

### 2.1 Format standard

```
[domaine-produit]?utm_source=[plateforme]&utm_medium=[type]&utm_campaign=[campagne]
```

### 2.2 Table par plateforme (référence : growth-marketing/context.md §13)

| Plateforme | utm_source | utm_medium | utm_campaign |
|-----------|-----------|-----------|-------------|
| Twitter cold outreach | twitter | coldoutreach | postlaunch |
| Twitter contenu organique | twitter | organic | postlaunch |
| LinkedIn | linkedin | organic | postlaunch |
| Reddit cold outreach | reddit | coldoutreach | postlaunch |
| Reddit contenu | reddit | organic | postlaunch |
| IH cold outreach | indiehackers | coldoutreach | postlaunch |
| IH contenu | indiehackers | organic | postlaunch |
| Product Hunt | producthunt | launch | ph-launch |

### 2.3 Règles UTM

| Règle | Détail |
|-------|--------|
| **Chaque lien publié = UTM obligatoire** | Aucun lien nu. Même les liens en reply sous un cold outreach. |
| **1 fichier UTM par SaaS** | LD dans `tracking/utm/leak-detector/`. PD dans `tracking/utm/saas-2/`. Etc. |
| **utm_campaign évolue par phase** | `prelaunch` avant le lancement, `postlaunch` après, `ph-launch` pour PH. |
| **Revue chaque vendredi** | Quels canaux génèrent du trafic ? Quels utm_medium convertissent ? |

---

## 3. COLONNES DU GROWTH TRACKER (référence : marketing/context.md §8.6)

| Colonne | Ce qu'elle contient |
|---------|--------------------|
| **Date** | Date de l'outreach ou de l'action |
| **Plateforme** | Twitter, Reddit, IH, LinkedIn, PH |
| **Compte** | R, F, ou F2 |
| **Vertical** | E-com / Agences / Creators |
| **Insight partagé** | L'insight terrain partagé dans le cold outreach |
| **Lien du post/tweet** | L'URL du post public contenant l'outreach |
| **Réponse envoyée** | Oui/Non — la cible a-t-elle répondu ? |
| **Réaction** | Positive / Négative / Ignorée |
| **Click UTM** | Oui/Non — la cible a-t-elle cliqué sur le lien ? |
| **Signup** | Oui/Non — la cible s'est-elle inscrite ? |
| **Client payant** | Oui/Non — la cible a-t-elle payé ? |

---

## 4. PROCESS DE REVUE (vendredi soir, R + F)

La revue vendredi est documentée en détail dans les playbooks (romain/playbook-semaine.md §1, fabrice/playbook-semaine.md §1, f2/playbook-semaine.md §1). Ce qui suit est le volet TRACKING de la revue.

### 4.1 Données à relever

| Catégorie | Métriques | Source |
|-----------|----------|--------|
| **Cold outreach** | Outreachs réalisés, taux de réponse, clicks UTM, signups, clients payants, taux de conversion | Growth Tracker |
| **Twitter R** | Impressions, replies, engagement rate, profile visits, followers, meilleur/pire post | Twitter Analytics |
| **Twitter F** | Idem | Twitter Analytics |
| **Twitter F2** | Idem | Twitter Analytics |
| **LinkedIn R** | Impressions, commentaires, profile visits, connexions | LinkedIn Analytics |
| **LinkedIn F** | Idem | LinkedIn Analytics |
| **IH** | Views, comments, upvotes | IH Dashboard |
| **UTM** | Quels canaux génèrent du trafic, quel utm_medium convertit le mieux | UTM Tracker |
| **Produit** | Signups totaux, MRR, conversion rate, top pages auditées | Dashboard produit |

### 4.2 Questions clés (référence : growth-marketing/context.md §14)

| Question | Si la réponse est négative |
|----------|---------------------------|
| Le cold outreach convertit ? (clicks → signups → clients) | Revoir les templates, le CTA, la page de destination |
| Quel canal convertit le mieux en signups ? | Réallouer le temps vers le canal le plus performant |
| Le temps investi hors Twitter est rentable ? | Si IH/Reddit ne convertit pas → réduire et réallouer à Twitter |
| Les métriques de la semaine sont meilleures que la semaine précédente ? | Identifier ce qui a changé. Corriger. |

---

## 5. SCALABILITÉ — MULTI-PRODUIT

| Événement | Impact sur le tracking |
|-----------|----------------------|
| **Lancement de chaque nouveau SaaS** | Créer `tracking/utm/[nom-saas]/UTM-Tracking-[NomSaaS].xlsx`. Ajouter les colonnes du nouveau SaaS au Growth Tracker. Les UTM utilisent le domaine du SaaS concerné. |
| **3+ produits** | Le Growth Tracker a une vue PORTEFEUILLE (MRR total, signups totaux) en plus des vues par produit. |

Le format UTM et les colonnes du Growth Tracker restent les mêmes pour chaque produit. Seuls le domaine et le fichier UTM changent.

---

## 6. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Rôle |
|----------|-------------|------|
| growth-marketing/context.md §13 | growth-marketing/ | Table UTM complète par plateforme |
| growth-marketing/context.md §14 | growth-marketing/ | Process de revue hebdomadaire détaillé |
| marketing/context.md §8.6 | marketing/ | Colonnes du Growth Tracker, suivi cold outreach |
| marketing/context.md §9.5 | marketing/ | Règle UTM obligatoire |
| romain/playbook-semaine.md §1 | romain/ | Revue vendredi R (volet opérationnel) |
| romain/progress-semaine.md §3 | romain/ | Métriques vendredi R |
| fabrice/playbook-semaine.md §1 | fabrice/ | Revue vendredi F (volet opérationnel) |
| fabrice/progress-semaine.md §3 | fabrice/ | Métriques vendredi F |
| f2/playbook-semaine.md §1 | f2/ | Revue vendredi F2 (volet opérationnel) |
| f2/progress-semaine.md §3 | f2/ | Métriques vendredi F2 |
