# PRODUITS — README

> Point d'entrée du dossier `produits/`.
> **Dernière mise à jour :** 21/05/2026

---

## 1. Rôle du dossier

`produits/` est la **source de vérité du catalogue produits** FoundryTwo : **le QUOI on construit** (specs, features, modules, pricing, concurrents, données marché).

Distinction avec les dossiers voisins :

| Dossier | Répond à | Contient |
|---------|----------|----------|
| **`produits/`** | Le **QUOI** on construit | Specs produits, features, pricing, concurrents |
| **`strategie/verticals/`** | **QUI** on cible | Fiches verticales (cibles, scores, douleurs, angles) |
| **`marketing/`** | **COMMENT** on vend | Cold, publication, recherche, contenu (distribution) |

Quand un produit est modifié ici, les fichiers de distribution (`marketing/`) et les sous-dossiers `produits/saas/[produit]/` impactés doivent être mis à jour en cohérence.

---

## 2. Fichiers transverses

Ces 4 fichiers couvrent l'ensemble du portefeuille (vue catalogue) :

| Fichier | Rôle |
|---------|------|
| **`STATUS.md`** | Catalogue / pipeline : statut de chaque produit, mois cible, vertical, nombre de features et modules, où c'est distribué. Trace aussi les décisions de fusion (08/04/2026) et de mutation (14/04/2026). C'est la photo d'ensemble du portefeuille. |
| **`MUTATIONS.md`** | SaaS existants transformés en agents IA. Décrit l'architecture commune (agent 4 couches DÉTECTER/ANALYSER/AGIR/APPRENDRE, Mem0, Ouroboros, LangGraph, PWA), puis le détail de StoreMD (5 modules) et LeadQuiz, plus le cross-sell e-com. |
| **`NOUVEAUX.md`** | SaaS créés from scratch : ProfitPilot (4 modules), ClientPulse, AdAudit, CreatorSuite, Wildcard. Contient la cross-sell matrix et le résumé des données terrain (scraping Reddit, reviews concurrents). |
| **`PRINCIPES-ANTI-CONCURRENTS.md`** | Les 10 principes non-négociables (consentement, zéro résidu, pricing transparent, données fiables, agent proactif, optimisations au merchant, support direct, créations au client, stabilité, annulation instantanée), appliqués à tous les SaaS. Issus de l'analyse de 530+ reviews 1-3★ de concurrents. |

---

## 3. Dossier `saas/`

Specs et conventions du portefeuille SaaS.

**Fichiers à la racine de `saas/` :**

| Fichier | Rôle |
|---------|------|
| `saas/context.md` | Conventions du portefeuille SaaS : structure des sous-dossiers, règles communes, pipeline, rôle dans l'écosystème marketing. |
| `saas/roadmap.md` | Pipeline des SaaS dans le temps : quand chaque produit lance, dépendances, actions à chaque lancement, risques portefeuille. |

**Sous-dossiers SaaS (6 actifs) :**

`storemd/`, `profitpilot/`, `clientpulse/`, `adaudit/`, `creatorsuite/`, `leadquiz/`

Squelette type de chaque sous-dossier :

```
produits/saas/[produit]/
├── context.md      ← Positionnement public, personas, messaging par vertical
├── metrics.md      ← Template métriques (signups, MRR, conversion, NPS)
└── README.md       ← Navigation du dossier
```

`storemd/` contient en plus `beta-config.md`.

---

## 4. Dossier `boutiques/` — structure à venir

**Pas encore créé.** Prévu en Action 3 de la Phase 5C-bis (voir `ROADMAP-IMPLEMENTATION.md`), en préparation du lancement Hokuno.

Logique : symétrie avec `saas/`. `produits/` aura alors deux catégories de produits — `saas/` (les SaaS) et `boutiques/` (les boutiques e-commerce, ex : Hokuno). Les boutiques ne sont pas des SaaS : pas de cold outreach, présentation produit + partenaires/influenceurs.

---

## 5. Navigation rapide

| Je cherche... | Fichier |
|---------------|---------|
| L'état d'un produit (live, backlog, mois) | `STATUS.md` |
| Les specs détaillées de StoreMD ou LeadQuiz | `MUTATIONS.md` |
| Les specs détaillées de ProfitPilot, ClientPulse, AdAudit, CreatorSuite | `NOUVEAUX.md` |
| Les règles produit non-négociables | `PRINCIPES-ANTI-CONCURRENTS.md` |
| Les conventions du portefeuille SaaS | `saas/context.md` |
| Le pipeline temporel des SaaS | `saas/roadmap.md` |
| Le positionnement / messaging d'un produit | `saas/[produit]/context.md` |
| Les métriques d'un produit | `saas/[produit]/metrics.md` |

---

*Point d'entrée du dossier produits/. Source de vérité produits du repo F2-Jarvis.*
