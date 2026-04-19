# ROADMAP SAAS — Pipeline produits FoundryTwo

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `saas/context.md` (conventions portefeuille, règles communes, structure sous-dossiers)
**Se synchronise avec :** `growth-marketing/roadmap.md` (coordination marketing cross-plateforme), `marketing/roadmap.md` (vision semestrielle), `produits/STATUS.md` (source de vérité produits)
**Ce fichier contient :** le pipeline des SaaS dans le temps — quand chaque produit lance, les dépendances, les actions à chaque lancement, l'évolution du portefeuille.

---

## 1. VUE D'ENSEMBLE

| # | Produit | Vertical | Mois cible | Statut saas/ | Statut produits/ |
|---|---------|----------|------------|-----------|------------|
| 0 | **Leak Detector** | (remplacé par StoreMD) | Historique | ARCHIVED | ARCHIVED |
| 1 | **StoreMD** (43 features, 5 modules) | E-commerce | Mois 1 | ✅ Créé | En développement |
| 2 | **ProfitPilot** (41 features, 4 modules) | E-commerce | Mois 1 | ✅ Créé | Planifié |
| 3 | **ClientPulse** | Agences/Freelancers | Mois 2 | ✅ Créé | Features validées |
| 4 | **AdAudit** | Agences | Mois 2 | ✅ Créé | Features validées |
| 5 | **CreatorSuite** | Creators | Mois 3 | ✅ Créé | Features validées |
| 6 | **LeadQuiz** (12 features) | E-com + Coaches | Mois 3 | ✅ Créé | Features validées |
| - | **Wildcard** | À déterminer | Mois 3 | ⏳ À créer | À définir |

> **Fusion 08/04/2026 :** ListingLab → module Listings de StoreMD. ChargebackShield → module Anti-Fraude de ProfitPilot. Total Shopify : 96 features, 3 apps au lieu de 5.

**Cadence cible :** 2 SaaS/mois. F code avec Claude Code. R distribue sur Twitter/LinkedIn et gère les lancements IH/PH. Distribution terrain Reddit/Facebook gérée dans `../romain/reddit/`, `../romain/facebook/`, `../fabrice/reddit/`, `../fabrice/facebook/`.

---

## 2. LEAK DETECTOR — SaaS #0 (LIVE)

### 2.1 État actuel (post-pivot)

| Aspect | Détail |
|--------|--------|
| **URL** | leakdetector.tech |
| **Lancement** | 16/03/2026 |
| **Résultats** | ~8 signups, 0€ MRR après 3 semaines |
| **Diagnostic** | Cible dev = mauvaise. Le produit marche mais le marché ne paie pas. |
| **Décision** | Mutation vers StoreMD (cible merchants Shopify). Les features LD sont intégrées dans StoreMD comme module d'audit. |
| **Stack** | FastAPI + Celery + Redis / Next.js 14 + TS / Supabase / Claude API / Playwright / Railway + Vercel |
| **Pricing** | Free (3/mois) / Pro €29/mois (50/mois) / Agency €99/mois (200/mois) |

### 2.2 Roadmap produit post-lancement

| Phase | Période | Focus | Statut |
|-------|---------|-------|--------|
| **Phase 1 — MVP** | Lancement (16/03) | Valider le product-market fit | ✅ Livré |
| **Phase 2 — Rétention** | M1 → M3 | Engagement + réduire le churn | ⚠️ À RÉÉVALUER après mutation StoreMD |
| **Phase 3 — Croissance** | M3 → M6 | Scaler l'acquisition et le revenu | ⚠️ À RÉÉVALUER |
| **Phase 4 — Intelligence** | M6+ | Créer un moat via la data et l'IA | ⚠️ À RÉÉVALUER |

**Note :** Les Phases 2-4 du roadmap original LD sont À RÉÉVALUER après la mutation StoreMD. Les prochaines itérations de LD intègrent les features StoreMD définies dans `../produits/MUTATIONS.md`.

### 2.3 Métriques cibles (ajustées post-pivot)

Les projections originales (100 signups M1, €145 MRR M1) étaient basées sur une cible dev et se sont révélées irréalistes.

| Métrique | Réel (16/03 → 04/04) | Cible post-pivot |
|----------|----------------------|------------------|
| Signups | ~8 | Le focus passe à StoreMD |
| MRR | €0 | StoreMD reprend les objectifs MRR |
| Analyses/semaine | Faible | LD continue comme module dans StoreMD |

**North Star :** Transférée à StoreMD. LD reste actif en attendant la mutation complète.

---

## 3. PAYLOADDIFF — RETIRÉ

PayloadDiff a été retiré du pipeline lors du pivot du 03/04/2026. Le slot avril 2026 est maintenant occupé par **StoreMD et ProfitPilot** (vertical e-commerce). Fusion 08/04 : ListingLab → module Listings de StoreMD, ChargebackShield → module Anti-Fraude de ProfitPilot.

---

## 4. LES 7 SaaS

### Mois 1 — E-commerce (avril 2026)

**StoreMD** (43 features, 5 modules) — Agent IA qui diagnostique et optimise les stores Shopify (vitesse, conversion, SEO). Intègre les features Leak Detector (audit) + module Listings (ex-ListingLab).
- Vertical : E-commerce Shopify
- Détails : voir `../produits/MUTATIONS.md`
- Actions au lancement : créer `saas/storemd/`, remplir context.md, uploader dans projets Claude R+F, adapter prompts Grok ECOM, posts launch F2+R+F

**ProfitPilot** (41 features, 4 modules) — Agent IA qui optimise les marges et le pricing pour les stores e-com. Intègre le module Anti-Fraude (ex-ChargebackShield).
- Vertical : E-commerce Shopify
- Détails : voir `../produits/NOUVEAUX.md`
- Actions au lancement : créer `saas/profitpilot/`, adapter prompts Grok ECOM

### Mois 2 — Agences + E-com (mai 2026)

**ClientPulse** — Agent IA qui automatise le reporting client pour agences et freelancers.
- Vertical : Agences/Freelancers marketing
- Douleur : 15h/mois de reporting manuel, $20K+/an d'outils
- Détails : voir `../produits/NOUVEAUX.md`
- Actions au lancement : créer `saas/clientpulse/`, adapter prompts Grok AGENCY

**AdAudit** — Agent IA qui audite les campagnes ads (Google, Meta, TikTok) pour agences.
- Vertical : Agences marketing
- Détails : voir `../produits/NOUVEAUX.md`
- Actions au lancement : créer `saas/adaudit/`, adapter prompts Grok AGENCY

### Mois 3 — Creators + E-com (juin 2026)

**CreatorSuite** — Agent IA qui automatise le repurposing et le workflow multi-plateforme pour creators.
- Vertical : Content Creators (YouTube, TikTok, podcast)
- Douleur : 8h d'editing + 8h de repurposing par vidéo
- Détails : voir `../produits/NOUVEAUX.md`
- Actions au lancement : créer `saas/creatorsuite/`, adapter prompts Grok CREATOR

**LeadQuiz** — Agent IA qui crée des quiz de qualification et capture de leads.
- Vertical : E-com + Coaches
- Détails : voir `../produits/NOUVEAUX.md`
- Actions au lancement : créer `saas/leadquiz/`, adapter prompts Grok ECOM

**Wildcard** — À déterminer en fonction des données terrain et du feedback des 6 premiers SaaS.
- Vertical : À déterminer
- Détails : voir `../produits/NOUVEAUX.md`
- Actions au lancement : process standard (saas/context.md §5.2)

---

## 5. PROCESS RÉPÉTABLE À CHAQUE LANCEMENT

Chaque lancement suit le même process. Les actions deviennent plus rapides car :
- Les templates (prompts Grok par vertical, UTM, context.md) sont rodés
- Le karma PH est accumulé
- La communauté grandit → chaque lancement a plus de portée
- Le cross-sell s'amplifie par vertical (3+ produits e-com → offre complète)
- Le warming terrain (Reddit/Facebook) pré-qualifie l'audience

### Ce qui évolue avec chaque nouveau SaaS

| Aspect | 1 produit (LD) | 3 produits (Mois 1 e-com) | 6+ produits (cross-vertical) |
|--------|---------------|--------------------------|------------------------------|
| **Cold outreach** | 1 angle, 1 outil | Arsenal e-com. Chaque merchant reçoit l'outil le plus pertinent. | Arsenal multi-vertical. Chaque cible reçoit la solution de son vertical. |
| **Contenu** | Insights mono-produit | Patterns e-com cross-produit | Autorité studio multi-vertical. |
| **Positionnement R** | Expert growth (1 preuve) | Expert e-com growth (3 preuves) | Expert growth multi-vertical (données massives). |
| **Positionnement F** | Builder AI SaaS (1 construction) | Builder AI agents e-com (3 constructions) | Builder AI agents multi-vertical (patterns techniques). |
| **Positionnement F2** | Studio qui construit en public | "The studio that ships 3 AI agents/month for e-com" | "The studio that ships AI agents for merchants, agencies, and creators" |
| **Cross-sell** | — | Vertical bundle (StoreMD + ProfitPilot) | Cross-vertical + vertical bundles |

---

## 6. RISQUES PORTEFEUILLE

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| **Cadence glisse** (2/mois trop ambitieux) | Moins de SaaS livrés que prévu. | La cadence est 2/mois CIBLE. Si un SaaS demande plus de temps, il prend plus de temps. La qualité prime. Claude Code accélère mais ne garantit pas. |
| **Un produit ne trouve pas son marché** | MRR stagne. Temps investi perdu. | Validation terrain (warming Reddit/Facebook) réduit ce risque. Seuil : si 0 conversion payante après 30 jours de distribution → pivoter ou couper. |
| **Coûts LLM explosent avec le volume** | Marge brute se réduit. | Cache résultats, Haiku fallback, limites strictes par plan. Monitorer le coût/analyse hebdomadairement. |
| **Cross-sell cannibalise** (les produits se volent des clients) | MRR total ne croît pas malgré les lancements. | Les produits du même vertical résolvent des problèmes DIFFÉRENTS (santé technique ≠ santé financière). Fusion 08/04 réduit ce risque : 3 apps au lieu de 5. |
| **Désynchronisation entre brand et distribution** | Le messaging public contredit les specs produit. | Règle #9 (context.md racine) : si produits/ est modifié un produit → mettre à jour les fichiers saas/ impactés. Check hebdo vendredi. |

---

## 7. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Rôle |
|----------|-------------|------|
| saas/context.md | saas/ | Conventions portefeuille, structure sous-dossiers |
| saas/leak-detector/context.md | saas/leak-detector/ | Détails produit LD (LIVE) |
| marketing/context.md §2 | marketing/ | Pipeline SaaS, modèle usine |
| marketing/roadmap.md | marketing/ | Vision semestrielle, cadence |
| growth-marketing/roadmap.md | growth-marketing/ | Coordination marketing cross-plateforme par phase |
| la-toile/context.md | la-toile/ | Architecture de visibilité, nœuds produits |
| `produits/STATUS.md` | Racine du repo | **Source de vérité pipeline** (statut de chaque SaaS) |
| `produits/MUTATIONS.md` | Racine du repo | Mutations LD → StoreMD |
| `produits/NOUVEAUX.md` | Racine du repo | Specs des 8 nouveaux SaaS |
