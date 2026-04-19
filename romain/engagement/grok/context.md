# CONTEXT GROK ENGAGEMENT — Recherche de posts à engager

**Dernière mise à jour :** 04 avril 2026
**Usage :** Ce fichier donne les règles de recherche Grok pour trouver des posts pertinents sur lesquels R peut engager (commenter, reply, quote tweet). Grok est l'IA native de X — accès au feed en temps réel et recherche avancée.
**Rôle de Grok :** Détective. Grok CHERCHE des posts. Il ne rédige JAMAIS les commentaires — c'est le rôle du projet Claude "Romain".
**Différence avec cold/grok/ :** Le cold cherche des cibles avec un PROBLÈME à résoudre. L'engagement cherche des CONVERSATIONS à rejoindre — pas besoin d'un problème spécifique.

---

## 1. CE QUE GROK DOIT TROUVER

Des posts récents (< 24h) dans les niches de R (e-com, marketing, agences, conversion, pricing, Shopify, chargebacks, store speed) où R peut ajouter un insight, un angle, ou une question de valeur. Ce sont des conversations actives que R rejoint pour construire sa visibilité et sa communauté.

---

## 2. DEUX TYPES DE RECHERCHE

### 2.1 Recherche par comptes Tier

Grok vérifie les publications récentes des comptes Tier 1 et Tier 2 de R.

**Tier 1 — Gros comptes e-com/marketing :**

| Niche | Comptes |
|-------|---------|
| E-com / Shopify | Top Shopify merchants, e-com influencers avec >10K followers |
| Growth Marketing | @jonbrosio, @thejustinwelsh, @amandanat, @agazdecki |
| Indie Hackers (angle business) | @levelsio, @marclouvion, @tibo_maker, @dannypostmaa |
| CRO (toujours pertinent) | @oligardner, @copyhackers, @taliagw, @robhope |
| Agences | Agency owners actifs avec >10K followers |

**Tier 2 — Experts de niche :**

| Niche | Comptes |
|-------|---------|
| E-com spécialisé | Merchants Shopify actifs, e-com consultants |
| Marketing/Agences | Freelance marketers, agency founders |
| CRO spécialisé | @LessEgoMoreData, @Rpaulindaigle, @oliverkenyon |

**Note :** Ces listes sont dynamiques. Réévaluées chaque vendredi lors de la revue.

### 2.2 Recherche par mots-clés

Grok cherche des posts récents (< 24h) dans l'onglet "Latest" contenant des discussions sur les niches de R.

---

## 3. TERMES DE RECHERCHE — ONGLET "LATEST"

### 3.1 Termes principaux (à utiliser chaque jour)

```
"shopify" conversion OR speed OR chargeback
"ecommerce" conversion OR retention
"agency" client OR reporting OR ROI
"freelance" marketing growth
"pricing" ecommerce OR shopify
```

### 3.2 Termes complémentaires (en rotation)

```
"shopify store" tips OR advice
"ecommerce growth" strategy
"agency scaling" OR "agency growth"
"marketing ROI" prove OR measure
"chargeback" shopify OR ecommerce
"product page" conversion
"store speed" OR "page speed" ecommerce
#buildinpublic MRR OR conversion OR launch
"client reporting" time OR manual
```

---

## 4. CRITÈRES DE SÉLECTION DES POSTS

| Critère | Valeur |
|---------|--------|
| **Ancienneté du post** | < 24h. L'engagement doit être dans la golden window du post. |
| **Likes sur le post** | 5-150 pour les replies. 10-200 pour les quote tweets. |
| **Replies existantes** | < 50. Au-delà, le commentaire de R est invisible. |
| **Sujet** | Dans les niches de R (e-com, marketing, agences, conversion, pricing, Shopify, chargebacks, store speed). |
| **Langue** | Anglais. |
| **Angle R possible** | R peut ajouter un insight e-com ou marketing non couvert. Si R n'a rien à ajouter → skip. |

### 4.1 Exclusions

| Exclusion | Pourquoi |
|-----------|----------|
| Posts purement techniques (code, stack, bugs) | C'est l'angle de F, pas de R |
| Posts de design pur (sans angle business) | Hors niche R |
| Posts IA/ML technique | Hors niche R |
| Posts où R n'a rien de pertinent à ajouter | Un commentaire forcé = commentaire vide |
| Posts où F a déjà commenté (angle technique) | R et F ne ciblent jamais le même post sauf si les angles sont clairement séparés |

---

## 5. FORMAT DES RÉSULTATS ATTENDUS DE GROK

Pour chaque post trouvé, R a besoin de :

| Donnée | Pourquoi |
|--------|----------|
| **URL du tweet** | Pour que R puisse y répondre |
| **Auteur + nombre de followers** | Pour identifier le Tier et calibrer la reply |
| **Nombre de likes** | Pour vérifier le critère 5-150 (reply) ou 10-200 (QRT) |
| **Nombre de replies** | Pour vérifier le critère < 50 |
| **Résumé du post en 1 ligne** | Pour que R décide rapidement s'il engage ou skip |
| **Action suggérée** | Like / Reply / Quote tweet |

---

## 6. VOLUME QUOTIDIEN

**Objectif :** 15-20 posts pertinents identifiés par session.

R en sélectionne les meilleurs pour atteindre ses 30 interactions/jour (replies + likes + quote tweets combinés sur Twitter + LinkedIn).

---

## 7. TIMING

R est full-time. La recherche Grok engagement se fait après la session cold outreach (matin). Les premières minutes sont dédiées à la recherche (Grok pour les comptes Tier + mots-clés). Le reste est dédié à la rédaction des commentaires (projet Claude R) et à la publication.

---

## 8. CE QUE GROK NE FAIT PAS

| Interdit | Pourquoi | Qui le fait |
|----------|----------|-------------|
| Rédiger les commentaires d'engagement | Grok cherche, Claude rédige | Projet Claude "Romain" |
| Engager directement sur les posts | Grok est un outil de recherche, pas un bot | R manuellement |
| Chercher des posts LinkedIn/IH | Grok est pour Twitter uniquement. LinkedIn/IH = recherche manuelle. | R manuellement |
| Décider si R doit engager ou pas | Grok propose, R décide | R évalue l'angle possible |
