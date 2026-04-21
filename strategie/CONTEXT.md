# CONTEXT — Distribution-First Method (V2)

> **SOURCE DE VÉRITÉ PARENT DU REPO.**
> Ce fichier prime sur tout autre document stratégique en cas de contradiction.
> Hérite de `BIBLE.md` (principes non-négociables) et `ANTI-IA.md` (règle #0).

**Source de vérité** pour la stratégie FoundryTwo.
**Dernière mise à jour :** 21 avril 2026
**Utilisé par :** F (Fabrice), R (Romain), Claude
**Statut :** ACTIF — remplace TOUT ce qui précède

---

## 1. POURQUOI CE PIVOT

### Ce qui n'a pas marché

Approche précédente : trouver une idée → coder → chercher où vendre.
Résultats Leak Detector après 3 semaines : ~8 signups, 0€ MRR, cible dev qui DIY tout.

### Ce qui change

1. **Distribution-first** : on ne build rien sans validation communauté
2. **Cible non-dev** : e-commerce sellers, agences marketing, freelancers, content creators
3. **Full-time** : F et R au chômage = 100% dédié
4. **Pas de limite de build** : Claude Code + IA = la complexité technique est un MOAT, pas un frein
5. **Volume × Constance** : le moteur de la distribution

---

## 2. LE LOOP

```
COMMUNAUTÉ → DOULEUR → VALIDATION → BUILD → DISTRIBUTION (VOLUME × CONSTANCE) → REPEAT
```

Chaque produit naît d'une communauté. Chaque décision est filtrée par ce loop.

---

## 3. PRINCIPES FONDAMENTAUX

### La complexité = le moat

Avec Claude Code et les agents IA, tout est codable. La question n'est pas "est-ce qu'on peut le construire ?" mais "est-ce que le problème vaut assez cher pour justifier un produit complexe ?". Plus c'est dur à reproduire, moins il y a de concurrence. On ne cherche pas les quick wins faciles — on cherche les problèmes à 10K$/an que personne ne résout bien.

### Volume × Constance = non-négociable

| Métrique | F minimum/jour | R minimum/jour |
|----------|---------------|---------------|
| Interactions communautés | 30 | 30 |
| Cold outreach (phase distrib) | 10 | 20 |
| Posts contenu | 1 (5/sem) | 1 (7/sem) |

En dessous → le loop ne tourne pas assez vite.

### Chaque SaaS = un AGENT, pas un outil

Un outil, tu l'ouvres, tu fais un truc, tu fermes. Un agent travaille pour toi même quand tu n'es pas devant l'écran. Chaque SaaS FoundryTwo a un cerveau LLM (Claude API) qui DÉTECTE (webhooks, cron jobs), ANALYSE (interprète, compare, diagnostique), AGIT (notification push + recommandation 1-clic), et APPREND (feedback loop → amélioration continue).

Le moat : un outil tu le quittes en 5 minutes. Un agent calibré sur TES données depuis 6 mois, tu ne le quittes plus jamais.

### PWA sur tout

Chaque SaaS est une Progressive Web App (Next.js + service worker + manifest.json). Installable Android (Chrome) + iOS (écran d'accueil). Notifications push. Offline pour les rapports. Même code que le web — zéro app native, zéro maintenance double.

### La Toile = avantage structurel

3 comptes (R, F, F2) = 3 portes d'entrée, 1 destination. Le cross-engagement R↔F amplifie la visibilité de chaque interaction. Un solo founder a 1 voix. On en a 3.

---

## 4. L'ÉQUIPE

| | Romain (R) | Fabrice (F) |
|---|---|---|
| **Rôle** | Growth/Distribution lead | CTO/Builder + Distribution |
| **Temps/jour** | 7-10h | 7-10h |
| **Dans ce repo** | Distribution full-time | Distribution full-time |
| **Angle communautés** | Growth, conversion, acquisition, pricing | Technique, automatisation, stack, workflow |
| **Comptes** | @delgado_ro72224 (perso) | @FabGangi (perso) |
| **Studio** | Gère @foundrytwo | — |

---

## 5. VERTICALS CIBLES & SPLIT

### Stratégie de split

| Vertical | Warming (solo) | Distribution (duo) | Lead warming |
|----------|---------------|-------------------|-------------|
| **E-commerce** (base commune) | R+F ensemble dès J1 | R+F ensemble | R+F |
| **Agences/Freelancers** | R solo dès S3 (J15) | R lead + F rejoint M2 | R |
| **Content Creators** | F solo dès S3 (J15) | F lead + R rejoint M2 | F |

Principe : le warming se fait en solo (vitesse), la distribution se fait en duo (densité + cross-engagement).

### Timeline par mois

| Mois | R | F |
|------|---|---|
| **Mois 1 (avril)** | 80% e-com warming + 20% lurk agences (dès S3) | 80% e-com warming + 20% lurk creators (dès S3) |
| **Mois 2 (mai)** | 40% distribution e-com + 60% agences (warming→distrib) | 40% distribution e-com + 60% creators (warming→distrib) |
| **Mois 3 (juin)** | Scale ce qui marche. R+F dans les 3 verticals. | Scale ce qui marche. R+F dans les 3 verticals. |

### Communautés par vertical

**E-commerce (base commune R+F) :**
- Reddit : r/shopify (340K), r/ecommerce (100K), r/FulfillmentByAmazon (50K)
- Facebook : Shopify Entrepreneurs (100K), Shopify Newbies (100K), Ecommerce Entrepreneurs (50K)

**Agences/Freelancers (R lead, F rejoint M2) :**
- Reddit : r/digital_marketing (200K), r/freelance (200K), r/SEO (200K), r/PPC (50K)
- Facebook : Digital Distillery (148K), Superstar SEO (76K), Marketing Solved (30K)

**Content Creators (F lead, R rejoint M2) :**
- Reddit : r/NewTubers (579K), r/youtubers (262K), r/ContentCreators, r/podcasting (100K)
- Facebook : YouTube Creators Hub (50K)

### Verticals BACKLOG
Coaches/course creators (25/41), restaurants (22/41), real estate (20/41).

---

## 6. PORTEFEUILLE PRODUITS

### 6.1 Portefeuille actuel (6 SaaS, post-fusion 08/04/2026)

| Produit | Features | Modules | Cible | Score | Mois |
|---------|----------|---------|-------|-------|------|
| **StoreMD** — Médecin IA permanent (incl. module Listings ex-ListingLab) | 43 | 5 (Health+Listings+Agentic+Compliance+Browser) | E-commerce | 38/41 | Mois 1 |
| **ProfitPilot** — Santé financière complète (incl. module Anti-Fraude ex-ChargebackShield) | 41 | 4 (Profit+Anti-Fraude+Intelligence+Tarifs) | E-commerce | 39/41 | Mois 1 |
| **ClientPulse** — Hub IA du freelancer (prospect→propose→deliver→report→bill→retain) | 6 modules | 6 | Agences/Freelancers | 36/41 | Mois 2 |
| **AdAudit** — Audit publicitaire IA (Meta + Google Ads) | 10 | — | Agences | 30/41 | Mois 2 |
| **CreatorSuite** — Studio IA tout-en-un (transcribe→repurpose→clip→thumbnail→schedule→analytics) | 14 | — | Creators | 31/41 | Mois 3 |
| **LeadQuiz** — Quiz lead gen connecté catalogue (incl. 5 features concurrence) | 12 | 2 (Core+Concurrence) | E-com + Coaches | 30/41 | Mois 3 |

### 6.2 SaaS KILL

| Produit | Raison |
|---------|--------|
| PayloadDiff | Cible dev = contraire à la stratégie |
| DevToolsAPI | Idem |
| Leak Detector (tel quel) | Remplacé par StoreMD |
| FicheProduitAI (tel quel) | Fusionné dans StoreMD (module Listings) |
| QuizForge SCORM | Remplacé par LeadQuiz |
| ListingLab (autonome) | Fusionné dans StoreMD (module Listings) — 08/04/2026 |
| ChargebackShield (autonome) | Fusionné dans ProfitPilot (module Anti-Fraude) — 08/04/2026 |

---

## 7. CADENCE PRODUITS — 6 SaaS en 3 mois

### Plan 3 mois

| Mois | Produits (F build) | Vertical | Distribution |
|------|-------------------|----------|-------------|
| **Mois 1 (avril)** | StoreMD (43 features, 5 modules incl. Listings), ProfitPilot (41 features, 4 modules incl. Anti-Fraude) | E-commerce | R+F ensemble dans e-com |
| **Mois 2 (mai)** | ClientPulse, AdAudit | Agences + E-com | R lead agences, F lead creators. Les deux distribuent e-com. |
| **Mois 3 (juin)** | CreatorSuite, LeadQuiz (12 features), [wildcard] | Creators + Cross-sell | R+F dans les 3 verticals. Scale ce qui marche. |

### Cycle par produit
Le build se fait dans des projets Claude séparés. Ce repo ne gère que la distribution.

| Étape | Durée | Responsable |
|-------|-------|-------------|
| Build | 2-5 jours | F (projet Claude dédié) |
| Distribution + validation | 1-2 semaines | R + F (ce repo) |
| Décision GO/KILL | 48h test | R + F |
| Scale ou next | Continu | R + F |

### Objectifs
- Mois 1 : 3 SaaS live, audience e-com chaude, warming secondaire lancé
- Mois 2 : 6 SaaS live, 2 verticals actives, premiers MRR
- Mois 3 : 6 SaaS live, 3 verticals actives, identification du winner

### Suivi
Le statut de chaque produit est dans produits/STATUS.md.
Quand F finit un build → il met à jour STATUS.md → R commence la distribution.

---

## 8. CONTRAINTES HARD (inchangées)

| Contrainte | Seuil |
|------------|-------|
| Budget total | ≤ 200€ par SaaS pour lancer |
| Revenue M1 | > 0€ réaliste |
| Stack | FastAPI + Next.js 14 + Supabase + Stripe + Claude API |
| Automatisable | ≥ 90% sans intervention humaine |
| Légal clean | Pas de données réglementées |

### Contraintes distribution-first

| Contrainte | Seuil |
|------------|-------|
| Cible NON-dev | Obligatoire |
| Communauté active identifiée | ≥ 1 communauté > 5K membres actifs |
| Willingness-to-pay prouvée | Les gens paient déjà pour des solutions |
| Validation 48h | 10+ signups avant tout build |

### Contraintes RETIRÉES
| Ancienne contrainte | Pourquoi retirée |
|--------------------|-----------------|
| Time-to-market ≤ 4 semaines | Claude Code = build en 2-5 jours. Plus de limite. |
| 1 SaaS/mois | Cadence accélérée : 2 SaaS/mois. Le search algorithm est 2x plus rapide. |

---

## 9. WARMING & FARMING

Comptes Reddit et Facebook partent de ZÉRO. Plan 30 jours :

| Phase | Jours | Reddit | Facebook |
|-------|-------|--------|----------|
| Cold start | J1-J3 | Browse + upvote. ZERO commentaire. | Setup profil. 1-2 groupes perso. |
| Premiers commentaires | J4-J8 | 3-5 comments/jour subs faciles (r/AskReddit, etc.) | Liker + commenter amis. 1 groupe business/jour. |
| Subs mid-size | J9-J14 | Comments subs cibles (r/ecommerce, r/freelance). Objectif 200-300 karma. | Premiers commentaires dans FB Groups business. |
| Subs majeurs | J15-J21 | Comments r/shopify, r/digital_marketing. Premier post. 500+ karma. | Premiers posts dans FB Groups. Cross-engagement R↔F. |
| Opérationnel | J22-J30 | Posts valeur + audits gratuits + cold DMs. 1000+ karma. | Posts + audits + DMs + mention subtile produit. |

Détails complets dans WARMING-FARMING.md.

---

## 10. MÉTRIQUES

### Phase warming (S1-S3)

| Métrique | Seuil /semaine |
|----------|---------------|
| Interactions communautés (R+F) | 200+ |
| Douleurs documentées | 10+ |
| Karma Reddit (progression) | +150/semaine |

### Phase validation (S4)

| Métrique | Seuil GO |
|----------|----------|
| Signups en 48h | ≥ 10 |
| "Combien ça coûte ?" spontané | ≥ 2 |

### Phase distribution (S5+)

| Métrique | Seuil /semaine |
|----------|---------------|
| Cold outreach (R+F) | 150+ |
| Signups | 20+ |
| Trial → Paid | > 5% |

### Décision KILL vs CONTINUE

| Signal | Action |
|--------|--------|
| 0 signups après 2 semaines de distribution active | KILL le produit |
| > 5 clients payants à M1 | CONTINUE + volume |
| MRR > 500€ à M2 | INVEST |
| MRR > 2000€ + croissance > 20%/mois | DOUBLE DOWN |

---

## 11. CE DOCUMENT REMPLACE

- L'ancien framework de scoring (foundrytwo_saas_research_framework.md) pour les DÉCISIONS PRODUIT
- Le pipeline PayloadDiff → FicheProduitAI → QuizForge → DevToolsAPI
- L'approche build-first
- La cible dev
- La limite time-to-market de 4 semaines
- La cadence 1 SaaS/mois (remplacée par 2 SaaS/mois)
- Le suivi du build dans ce repo (le build est dans des projets Claude séparés)

Le framework de scoring /35 reste utilisable pour évaluer de nouvelles idées, mais les contraintes distribution-first et le scoring bonus distribution (+6 max) s'ajoutent obligatoirement.

---

## 12. DÉCISIONS PRISES

| Date | Décision | Rationale |
|------|----------|-----------|
| 03/04/2026 | Pivot distribution-first | 3 semaines LD : 0€ MRR |
| 03/04/2026 | Abandon cible dev | Pire marché pour bootstrap |
| 03/04/2026 | Volume × Constance non-négociable | Delta 10x entre plan et exécution sur LD |
| 03/04/2026 | Full-time F + R | Chômage = runway limité, temps illimité |
| 03/04/2026 | Validation 48h obligatoire | Plus jamais de build sans preuve de demande |
| 03/04/2026 | Complexité = moat | Claude Code = pas de limite. On build ce qui est DUR. |
| 03/04/2026 | KILL PayloadDiff + DevToolsAPI | Cible dev = hors stratégie |
| 03/04/2026 | LD → StoreMD, FPA → ListingLab, QF → LeadQuiz | Mutations profondes, pas des pivots cosmétiques |
| 03/04/2026 | Nouveaux produits : ClientPulse (36), ChargebackShield (35), ProfitPilot (33) | Problèmes à 10-25K$/an, moat data, scoring top |
| 03/04/2026 | Cadence 2 SaaS/mois | Claude Code = build en 2-5j. La distribution est le bottleneck. |
| 03/04/2026 | Ce repo = distribution uniquement | Le build se fait dans des projets Claude séparés |
| 08/04/2026 | Fusion 9→6 SaaS : ListingLab→StoreMD, ChargebackShield→ProfitPilot | Anti-app-bloat, plus de valeur par produit, 96 features Shopify totales |
| 21/04/2026 | Ajout couche beta testers mid-S6 | Sales agressif produisait attention sans conversion. Beta + cold scan = pipeline de conversations actives |
| 21/04/2026 | Système batch double-couche validé | 2 stratégies parallèles sur même semaine, template + rules consolidés |

---

## 13. MÉCANISME DE CONVERSION MID-FUNNEL (validé S6)

### Pattern : Beta Testers + Cold Scan Proactif

Stratégie de conversion mid-funnel testée et validée semaine 6 (20-26/04/2026). Superpose une couche d'acquisition directe sur le sales mode existant.

5 mécaniques :
1. Recrutement beta testers — 10 accès Pro, quota réel, premier arrivé premier servi
2. Analyses gratuites sur demande — DM + comment, rapport commenté par R/F
3. Cold scan proactif — 5 stores/jour/personne, rapport envoyé en DM non-sollicité
4. Test Pro ciblé — 2-3 stores stratégiques/jour, scan Pro complet
5. Prospection conversion beta → client — cadence J0/J7/J14/J30

Détail complet : `strategie/STRATEGIE-MID-S6-BETA-TESTERS.md`

Ce pattern est réutilisable sur tout SaaS du portfolio (pas spécifique StoreMD). Il peut être activé/désactivé par semaine via le système de batch double-couche (`TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`).
