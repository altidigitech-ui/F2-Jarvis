# CONTEXT SAAS — Portefeuille produits FoundryTwo

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `marketing/context.md` (pipeline §2, funnel §3, comptes §5)
**Hérite de :** `la-toile/context.md` (architecture de visibilité, nœuds produits)
**Ce fichier contient :** les conventions du portefeuille SaaS — comment chaque sous-dossier est structuré, ce que chaque fichier contient, les règles communes, le pipeline.
**Ce fichier ne contient PAS :** les détails de chaque produit (features, pricing, concurrents, données marché = voir `produits/`).

---

## 1. MODÈLE STUDIO

FoundryTwo est un **studio SaaS** qui construit et lance des outils SaaS propulsés par l'IA à une cadence cible de **2 SaaS/mois** (e-commerce, agences/freelancers, content creators).

Chaque SaaS est un **agent IA** (pas un outil) et une **PWA** (Progressive Web App, installable, notifications push, offline).

Détails produits (features, pricing, concurrents) = voir **`produits/`** à la racine. Ce dossier contient uniquement le positionnement public et le messaging pour le brand building Twitter/LinkedIn.

| Principe | Détail |
|----------|--------|
| **Modèle usine** | F code les SaaS avec Claude Code pendant que R distribue sur Twitter/LinkedIn et gère les lancements IH/PH. Distribution terrain Reddit/Facebook gérée dans `../romain/reddit/`, `../fabrice/reddit/`, etc. |
| **Cadence cible** | 2 SaaS/mois. La vélocité est un avantage compétitif — Claude Code rend la complexité technique un moat, pas un frein. |
| **Chaque produit est indépendant** | Son propre domaine, son propre repo, son propre sous-dossier marketing, ses propres métriques. |
| **Chaque produit bénéficie des précédents** | La base users, l'audience, le karma PH, la communauté, les learnings, le warming terrain — tout s'accumule. |
| **Cross-sell par vertical** | Les produits du même vertical se complètent. "Also from FoundryTwo" sur chaque site. |
| **Cible non-dev** | Les produits ciblent des merchants Shopify, freelancers marketing, content creators. Pas des développeurs. |

---

## 2. PIPELINE

| # | Produit | Vertical | Mois | Statut | Sous-dossier saas/ |
|---|---------|----------|------|--------|-----------------|
| 0 | **Leak Detector** | (remplacé par StoreMD) | Historique | ARCHIVED | `saas/leak-detector/` |
| 1 | **StoreMD** (43 features, 5 modules) | E-commerce | Mois 1 | En développement | `saas/storemd/` |
| 2 | **ProfitPilot** (41 features, 4 modules) | E-commerce | Mois 1 | Planifié | `saas/profitpilot/` |
| 3 | **ClientPulse** | Agences/Freelancers | Mois 2 | Planifié | `saas/clientpulse/` |
| 4 | **AdAudit** | Agences | Mois 2 | Planifié | `saas/adaudit/` |
| 5 | **CreatorSuite** | Creators | Mois 3 | Planifié | `saas/creatorsuite/` |
| 6 | **LeadQuiz** (12 features) | E-com + Coaches | Mois 3 | Planifié | `saas/leadquiz/` |
| - | **Wildcard** | À déterminer | Mois 3 | Planifié | À créer |

> **Fusion 08/04/2026 :** ListingLab → module Listings de StoreMD. ChargebackShield → module Anti-Fraude de ProfitPilot. Total Shopify : 96 features, 3 apps au lieu de 5.

**Règle :** Les sous-dossiers sont créés QUAND le produit entre en phase de distribution Twitter/LinkedIn. Avant ça, les détails restent dans `produits/` uniquement.

---

## 3. STRUCTURE DE CHAQUE SOUS-DOSSIER

Chaque produit a le même squelette :

```
saas/[nom-produit]/
├── context.md      ← Positionnement public, personas Twitter/LinkedIn, messaging par vertical, référence produits/
├── metrics.md      ← Template métriques : signups, MRR, conversion, analyses, NPS (rempli au fil du temps)
├── README.md       ← Navigation du dossier
└── asset-brand/    ← Assets visuels du produit (logo, screenshots, etc.)
```

### 3.1 Ce que context.md contient pour chaque produit

| Section | Ce qu'elle couvre |
|---------|------------------|
| **Référence produits/** | Pointer vers `produits/NOUVEAUX.md` ou `produits/MUTATIONS.md` pour les specs détaillées (features, pricing, concurrents, données marché) |
| **Positionnement public** | Ce que c'est, ce que ce n'est pas, différenciateur principal, URL |
| **Personas Twitter/LinkedIn** | Les personas POUR LE BRAND BUILDING — comment en parler sur Twitter/LinkedIn pour chaque vertical cible. Pas les personas utilisateur détaillés (qui sont dans produits/). |
| **Messaging par vertical** | Comment parler de ce SaaS à chaque vertical. Hooks, angles, vocabulaire. |
| **Lien studio** | Hiérarchie de communication F2 ↔ produit, règles d'articulation, cross-sell |
| **Inputs cold outreach** | Ce que R et F donnent à Claude pour le cold outreach basé sur ce produit |
| **Inputs publication** | Ce que R et F donnent à Claude pour les posts basés sur les données produit |

### 3.2 Ce que metrics.md contient pour chaque produit

| Section | Ce qu'elle couvre |
|---------|------------------|
| **North Star** | La métrique principale du produit |
| **KPIs par mois** | Signups, conversion, MRR, NPS |
| **Objectifs par phase** | Cibles M1, M3, M6, M12 |
| **Historique** | Données réelles remplies au fil du temps |

---

## 4. RÈGLES COMMUNES À TOUS LES PRODUITS

| Règle | Détail |
|-------|--------|
| **Langue** | Toute communication produit en anglais. Marché cible international (US/EU). |
| **Zéro faux témoignage** | Les scores, les chiffres, les témoignages — tout est réel. |
| **Vocabulaire** | Vocabulaire adapté au vertical cible (e-com, agences, creators). Pas de jargon dev. Pas le vocabulaire forge du studio (forged, anvil = F2 uniquement). |
| **Pricing transparent** | Les prix sont publics. Pas de "contactez-nous pour un devis" sur les plans standard. |
| **Free tier = acquisition** | Chaque produit a un tier gratuit qui fait goûter la valeur et incite à l'upgrade. |
| **Stack publique vs interne** | On partage le stack (FastAPI, Next.js, Supabase, Claude API) dans le build in public. On ne partage JAMAIS les prompts, la logique métier, ni les métriques business détaillées (sauf décision délibérée). |
| **Cross-sell** | Dès 2+ produits live, chaque produit mentionne les autres. "Also from FoundryTwo" sur chaque site. |
| **UTM par produit** | Chaque produit a son propre fichier UTM dans tracking/utm/[nom-produit]/. |
| **Cible non-dev** | Les produits ciblent des merchants, freelancers, creators. Le contenu technique (stack, architecture) est l'angle de F pour le build-in-public, pas le messaging produit. |
| **Agent IA + PWA** | Chaque produit a un cerveau LLM qui détecte, analyse, agit et apprend. C'est un différenciateur à communiquer. PWA installable avec notifications push. |

---

## 5. RÔLE DANS L'ÉCOSYSTÈME MARKETING

### 5.1 Qui utilise les fichiers saas/

| Qui | Ce qu'il utilise | Pourquoi |
|-----|-----------------|----------|
| **Projet Claude R** | `saas/[produit]/context.md` comme fichier de connaissance | R rédige les posts R + F2. Il utilise les context.md pour le messaging produit. |
| **Projet Claude F** | `saas/[produit]/context.md` comme fichier de connaissance | F rédige ses propres posts. Il utilise les context.md pour le messaging produit. |
| **R au batch** | `saas/[produit]/context.md` pour les données | Personas, messaging, USP pour calibrer les angles des posts |
| **R à la revue vendredi** | `saas/[produit]/metrics.md` | Métriques de la semaine |

### 5.2 Quand ajouter un nouveau produit

| Étape | Action |
|-------|--------|
| 1 | Créer le sous-dossier `saas/[nom-produit]/` avec context.md + metrics.md + README.md |
| 2 | Remplir context.md avec le positionnement public (adapté depuis `produits/NOUVEAUX.md` ou `produits/MUTATIONS.md`) |
| 3 | Uploader `saas/[nom-produit]/context.md` dans les projets Claude R et F |
| 4 | Ajouter le SaaS aux prompts Grok existants du vertical concerné (ECOM-prompt.md, AGENCY-prompt.md, ou CREATOR-prompt.md) — OU créer un nouveau prompt si le vertical est nouveau |
| 5 | Mettre à jour les bios et profils (Twitter, LinkedIn, IH, PH) — "Currently building: [produit]" |
| 6 | Ajouter le produit dans le pipeline §2 de ce fichier |

---

## 6. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Rôle |
|----------|-------------|------|
| saas/context.md | saas/ | Conventions portefeuille, structure sous-dossiers |
| saas/leak-detector/context.md | saas/leak-detector/ | Détails produit LD (LIVE) |
| marketing/context.md §2 | marketing/ | Pipeline SaaS, modèle usine |
| marketing/roadmap.md | marketing/ | Vision semestrielle, cadence |
| growth-marketing/roadmap.md | growth-marketing/ | Coordination marketing cross-plateforme par phase |
| la-toile/context.md | la-toile/ | Architecture de visibilité, nœuds produits |
| `produits/` | Racine du repo | **Source de vérité produits** (features, pricing, concurrents, données marché) |
