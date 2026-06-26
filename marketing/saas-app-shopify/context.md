# CONTEXT — Apps Shopify (SaaS)

> Ce dossier contient toutes les apps Shopify (SaaS) de R et F.
> Chaque app a son propre sous-dossier avec son context, ses cold-logs, ses templates, sa publication.
> Hérite de : `../../BIBLE.md`, `../../strategie/CONTEXT.md`, `../../ANTI-IA.md`

**Dernière mise à jour :** 21/05/2026

---

## 1. CE QUE C'EST

Ce dossier regroupe tout ce qui concerne les apps Shopify vendues par R et F. Chaque app est un SaaS installé sur les boutiques Shopify des merchants. La recherche de cibles est partiellement mutualisée (engagement, warming), partiellement spécifique à chaque produit (cold).

---

## 2. ORGANISATION

```
saas-app-shopify/
├── context.md                  ← CE FICHIER (porte d'entrée)
├── hashtags.md                 ← Hashtags par plateforme (partagé)
├── recherche/                  ← PARTAGÉ entre tous les produits
│   ├── cold/                   ← Recherche de cibles pour le cold
│   │   └── grok/               ← Via Grok (Twitter)
│   │       └── twitter/        ← prompt-recherche.md + recherche-log.md + template-reprise.md
│   └── engagement/             ← Warming et karma farming (pas lié à un produit)
│       └── reddit/             ← recherche-log.md (pain points centralisé)
└── storemd/                    ← SPÉCIFIQUE à StoreMD
    ├── context.md              ← Contexte produit complet (produit + cold + publication)
    ├── cold/
    │   ├── cold-templates.md   ← Frameworks DM par voix (R, F, StoreMD)
    │   ├── cold-log-instagram.md
    │   └── cold-log-tiktok.md
    └── publication/
        └── batch-semaine.md    ← Posts StoreMD de la semaine (dispatch du batch central)
```

### Partagé vs Spécifique

- **recherche/** = partagé. Les prompts Apify/Grok, les logs de recherche, les templates de reprise servent à trouver des merchants Shopify. Les cibles trouvées alimentent le cold de n'importe quel produit.
- **recherche/engagement/** = partagé. Reddit pain points et PH karma farming ne sont pas liés à un produit spécifique.
- **[produit]/** = spécifique. Context, cold-logs, cold-templates, publication — chaque produit est autonome.

**Note :** actuellement les prompts recherche cold sont à la racine de recherche/ car StoreMD est le seul produit. Quand un nouveau produit arrive avec des cibles différentes, la recherche cold sera séparée par produit (soit dans recherche/cold/[produit]/, soit dans [produit]/recherche/cold/). À définir au moment de l'intégration.

---

## 3. PRODUITS

| Produit | Type | Statut | Dossier |
|---------|------|--------|---------|
| **StoreMD** | AI agent santé Shopify (43 features, 5 modules) | Live (free scan public) — app Shopify en attente de validation App Store | `storemd/` |
| **ProfitPilot** | Santé financière Shopify | Prévu — pas encore codé | `profitpilot/` (à créer) |

---

## 4. AJOUTER UN NOUVEAU PRODUIT

Reproduire exactement la même structure que StoreMD :

1. Créer le dossier `saas-app-shopify/[produit]/`
2. Créer `context.md` (même structure que `storemd/context.md` : produit + cibles + cold + publication)
3. Créer `cold/cold-templates.md` (frameworks DM adaptés au nouveau produit)
4. Créer `cold/cold-log-[plateforme].md` pour chaque plateforme cold du produit
5. Créer `publication/batch-semaine.md` (dispatch du batch central)
6. Si les cibles cold sont différentes de StoreMD : séparer la recherche cold (prompts + logs spécifiques au produit)
7. La recherche engagement (Reddit, PH) reste partagée — pas besoin de dupliquer

Voir `../../strategie/PLAYBOOK-DISTRIBUTION.md` §8 pour la checklist complète d'intégration d'un nouveau business.

---

## 5. NAVIGATION

| Document | Chemin |
|----------|--------|
| Context StoreMD (produit + cold + publication) | `storemd/context.md` |
| Cold templates StoreMD | `storemd/cold/cold-templates.md` |
| Cold-logs StoreMD | `storemd/cold/cold-log-instagram.md`, `cold-log-tiktok.md` |
| Batch-semaine StoreMD | `storemd/publication/batch-semaine.md` |
| Recherche-logs | `recherche/cold/[outil]/[plateforme]/recherche-log.md` |
| Pain points Reddit | `recherche/engagement/reddit/recherche-log.md` |
| BIBLE | `../../BIBLE.md` |
| Stratégie globale | `../../strategie/CONTEXT.md` |
| Playbook distribution | `../../strategie/PLAYBOOK-DISTRIBUTION.md` |
| Context par plateforme | `../canaux/[plateforme]/context.md` |
