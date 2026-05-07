# CONTEXT STRATÉGIQUE — Vision globale

> **SOURCE DE VÉRITÉ — PRINCIPES & VISION.**
> Hérite de `[BIBLE.md](http://BIBLE.md)` (principes non-négociables) et `[ANTI-IA.md](http://ANTI-IA.md)` (règle #0).
> Ce fichier pose la stratégie GLOBALE. La stratégie spécifique de chaque business est dans son dossier dédié.

**Dernière mise à jour :** 06 mai 2026 (BIBLE v3.1, multi-business, suppression FoundryTwo)
**Utilisé par :** R (Romain), F (Fabrice), Jarvis (tous les agents)
**Statut :** ACTIF — principes parents.

---

## 1. QUI SOMMES-NOUS

R (Romain Delgado) et F (Fabrice Gangitano) construisent et vendent des produits digitaux. Pas un studio, pas une marque corporate, pas des influenceurs. Deux fondateurs qui lancent des business et les poussent jusqu'à ce qu'ils génèrent du revenu.

R et F sont les humains derrière les produits. Leurs comptes perso servent à prouver qu'il y a des vraies personnes derrière chaque business. On ne fait PAS de personal branding — on pousse la marque ou le produit, jamais la personne.

---

## 2. MULTI-BUSINESS — COMMENT ÇA S'ORGANISE

### Chaque business est indépendant

Chaque business a :
- Son propre dossier dans le repo (ex: `saas-app-shopify/storemd/`, `boutique/hokuno/`)
- Ses propres comptes sociaux
- Sa propre voix produit (fichier VOIX dédié)
- Sa propre stratégie de communication (dans son dossier)
- Ses propres métriques et cold-logs

### R et F ne sont PAS cloisonnés

R et F peuvent parler de TOUS les business depuis leurs comptes perso. R peut republier un post de høkuno. F peut republier un post de StoreMD. Rien ne les empêche de mentionner ou promouvoir n'importe quel business depuis leurs comptes perso. Ils restent focus produit — ils poussent la marque, pas eux-mêmes.

### SaaS ≠ Boutique

Vendre un SaaS et vendre des vêtements sont deux métiers complètement différents :

| | SaaS (StoreMD) | Boutique (høkuno) |
|---|---|---|
| **Acquisition** | Cold DM avec scan personnalisé | Marketing produit mode, pas de cold |
| **Cible** | Merchants Shopify (B2B) | Acheteurs de mode (B2C) |
| **Conversion** | Scan gratuit → beta → payant | Panier → commande |
| **Canaux prioritaires** | TikTok, Instagram, Facebook, LinkedIn, Twitter | Instagram, TikTok, Pinterest (à définir) |
| **Voix** | Technique/business, ton neutre produit | Lifestyle/mode (à définir) |
| **Cold** | 80 DMs/jour (BIBLE §4) | 0 cold DM |

La stratégie détaillée de chaque business est dans son dossier. Ce fichier ne rentre PAS dans le détail.

---

## 3. POURQUOI ON EN EST LÀ

### Phase 1 — mars 2026
Approche : trouver une idée → coder → chercher où vendre.
Résultat : Leak Detector après 3 semaines = ~8 signups, 0€ MRR, cible dev qui DIY tout.

### Phase 2 — avril 2026
Approche : distribution-first, build in public, engagement proactif.
Résultat : visibilité mais pas de conversion. L'engagement consomme du temps sans convertir. La cible "communauté builders/devs" n'achète pas nos produits Shopify. Erreur de ciblage.

### Phase 3 — mai 2026 (actuelle)
1. **Full acquisition** : cold DMs aux clients potentiels directement. Plus d'engagement proactif.
2. **Cible recentrée** : ciblage logique par produit (BIBLE §5). Merchants Shopify pour StoreMD, acheteurs mode pour høkuno.
3. **Multi-business** : chaque business a son dossier, sa voix, sa stratégie. Jarvis gère tout.
4. **R et F full-time** : 7-10h/jour chacun.
5. **Volume × Constance** : volumes non-négociables (BIBLE §4).

---

## 4. LE LOOP (s'applique à chaque business SaaS)

```
CIBLE LOGIQUE → COLD DM → CONVERSATION → BETA TEST → FEEDBACK → AMÉLIORATION → SCALE
```

Le cold DM personnalisé est le moteur d'acquisition pour les SaaS. La publication maintient la visibilité mais ne génère pas directement les clients. Pour la boutique, le loop sera différent (marketing produit, pas cold).

---

## 5. PRINCIPES FONDAMENTAUX

### La complexité = le moat
Avec Claude Code et les agents IA, tout est codable. Plus c'est dur à reproduire, moins il y a de concurrence. On cherche les problèmes que personne ne résout bien.

### Volume × Constance = non-négociable
Volumes actuels pour StoreMD (BIBLE §4) :

| Métrique | Volume |
|----------|--------|
| Cold DMs StoreMD (TikTok + Instagram, partagés R+F) | 20/jour |
| Cold DMs perso R (Twitter + LinkedIn + Facebook) | 30/jour |
| Cold DMs perso F (Twitter + LinkedIn + Facebook) | 30/jour |
| Total cold | 80/jour |
| Publication | Schedulée (batch samedi) |
| Engagement proactif | 0 |
| PH karma farming | 6 interactions/jour |
| Réponses DMs/commentaires | Toutes, < 2h |

Les volumes seront adaptés quand de nouveaux business seront actifs.

### Chaque SaaS = un AGENT, pas un outil
Un outil, tu l'ouvres, tu fais un truc, tu fermes. Un agent travaille pour toi même quand tu n'es pas devant l'écran. Chaque SaaS a un cerveau LLM (Claude API) qui DÉTECTE (webhooks, cron jobs), ANALYSE (interprète, compare, diagnostique), AGIT (notification push + recommandation 1-clic), et APPREND (feedback loop → amélioration continue).

Le moat : un outil tu le quittes en 5 minutes. Un agent calibré sur TES données depuis 6 mois, tu ne le quittes plus jamais.

### PWA sur tout
Chaque SaaS est une Progressive Web App (Next.js + service worker + manifest.json). Installable Android + iOS. Notifications push. Offline pour les rapports. Même code que le web.

---

## 6. R ET F — PRÉSENCE SOCIALE

| | Romain (R) | Fabrice (F) |
|---|---|---|
| **Rôle** | Growth/Distribution lead | CTO/Builder + Distribution |
| **Angle** | Business, vente, conversion | Technique accessible pour les clients |
| **Comptes perso** | @delgado_ro72224 (Twitter), Romain Delgado (LinkedIn), profil perso (Facebook, Reddit, PH) | @FabGangi (Twitter), Fabrice Gangitano (LinkedIn), profil perso (Facebook, Reddit, PH) |
| **Peut parler de** | Tous les business | Tous les business |
| **Personal branding** | NON — on pousse le produit | NON — on pousse le produit |

R et F ont un pouvoir de validation égal (BIBLE §10). Pas de hiérarchie.

Les comptes perso servent à :
- Cold DM (pour les SaaS uniquement, pas pour la boutique)
- Publier du contenu focus produit (pour n'importe quel business)
- Republier du contenu des comptes produit
- Prouver qu'il y a des humains derrière les business

---

## 7. BUSINESS ACTIFS ET PRÉVUS

### Focus actuel

| Business | Type | Statut | Dossier repo | Priorité |
|----------|------|--------|-------------|----------|
| **StoreMD** | SaaS Shopify (scan santé store) | Post-launch, acquisition beta testers | `saas-app-shopify/storemd/` | PRIORITÉ ABSOLUE |
| **høkuno** | Boutique Shopify (marque mode) | Planifié | `boutique/hokuno/` (à créer) | SUIT STOREMD |
| **ProfitPilot** | SaaS Shopify (santé financière) | Prévu | `saas-app-shopify/profitpilot/` (à créer) | SUIT HOKUNO |

høkuno servira aussi de terrain de test pour ProfitPilot — R et F seront leurs propres premiers beta testers.

### Backlog

| Business | Type | Statut |
|----------|------|--------|
| ClientPulse | SaaS Agences/Freelancers | Backlog |
| AdAudit | SaaS Agences | Backlog |
| CreatorSuite | SaaS Creators | Backlog |
| LeadQuiz | SaaS E-com + Coaches | Backlog |

### Historique KILL

| Produit | Raison |
|---------|--------|
| PayloadDiff | Cible dev = contraire à la stratégie |
| DevToolsAPI | Idem |
| Leak Detector | Remplacé par StoreMD |
| FicheProduitAI | Fusionné dans StoreMD (module Listings) |
| QuizForge SCORM | Remplacé par LeadQuiz |
| ListingLab | Fusionné dans StoreMD (module Listings) — 08/04/2026 |
| ChargebackShield | Fusionné dans ProfitPilot (module Anti-Fraude) — 08/04/2026 |

---

## 8. CONTRAINTES

| Contrainte | Seuil |
|------------|-------|
| Budget total | ≤ 200€ par produit pour lancer |
| Revenue M1 | > 0€ réaliste |
| Stack SaaS | FastAPI + Next.js 14 + Supabase + Stripe + Claude API |
| Automatisable | ≥ 90% sans intervention humaine |
| Légal clean | Pas de données réglementées |
| Ciblage logique | Obligatoire (BIBLE §5) |
| Communauté active identifiée | ≥ 1 communauté > 5K membres actifs |
| Willingness-to-pay prouvée | Les gens paient déjà pour des solutions |
| Validation 48h | 10+ signups avant tout build |

---

## 9. MÉTRIQUES GLOBALES

Les métriques spécifiques à chaque business sont dans le dossier du business. Ici les métriques transversales.

### Décision KILL vs CONTINUE (s'applique à tout produit)

| Signal | Action |
|--------|--------|
| 0 beta testers après 2 semaines de cold actif | Revoir la stratégie cold ou le produit |
| > 5 beta testers installés | CONTINUE + volume |
| Premiers clients payants | SCALE |
| MRR > 500€ | INVEST |
| MRR > 2000€ + croissance > 20%/mois | DOUBLE DOWN |

---

## 10. DÉCISIONS PRISES

| Date | Décision |
|------|----------|
| 03/04/2026 | Pivot distribution-first (3 semaines LD : 0€ MRR) |
| 03/04/2026 | Abandon cible dev |
| 03/04/2026 | Volume × Constance non-négociable |
| 03/04/2026 | Full-time R + F |
| 03/04/2026 | Validation 48h obligatoire |
| 03/04/2026 | Complexité = moat |
| 03/04/2026 | KILL PayloadDiff + DevToolsAPI |
| 03/04/2026 | LD → StoreMD, FPA → ListingLab, QF → LeadQuiz |
| 03/04/2026 | Nouveaux produits : ClientPulse, ChargebackShield, ProfitPilot |
| 08/04/2026 | Fusion 9→6 SaaS : ListingLab→StoreMD, ChargebackShield→ProfitPilot |
| 14/04/2026 | Lancement StoreMD |
| 05/05/2026 | Virage full acquisition — cold DM uniquement |
| 05/05/2026 | Suppression voix F2 / FoundryTwo comme identité |
| 05/05/2026 | 0 engagement proactif |
| 05/05/2026 | Comptes produit par business (pas de compte studio) |
| 05/05/2026 | Cross-engagement supprimé |
| 06/05/2026 | BIBLE v3.1 — Jarvis défini, agents multi-business, høkuno ajouté |
| 06/05/2026 | Stratégie multi-business : chaque business a son dossier, sa voix, sa stratégie |
| 06/05/2026 | R et F peuvent parler de tous les business — pas de cloisonnement |

---

## 11. OÙ TROUVER QUOI

| Quoi | Où |
|------|-----|
| Principes non-négociables | `[BIBLE.md](http://BIBLE.md)` |
| Anti-IA | `[ANTI-IA.md](http://ANTI-IA.md)` |
| Stratégie StoreMD | `saas-app-shopify/storemd/[context.md](http://context.md)` |
| Stratégie høkuno | `boutique/hokuno/` (à créer) |
| Canaux par plateforme | `marketing/canaux/[plateforme]/[context.md](http://context.md)` |
| Playbook distribution | `strategie/[PLAYBOOK-DISTRIBUTION.md](http://PLAYBOOK-DISTRIBUTION.md)` |
| Warming Reddit/Facebook | `strategie/[WARMING-FARMING.md](http://WARMING-FARMING.md)` |
| Verticals | `strategie/verticals/` |
| Voix R | `romain/[VOIX.md](http://VOIX.md)` |
| Voix F | `fabrice/[VOIX.md](http://VOIX.md)` |
| Voix StoreMD | `saas-app-shopify/storemd/[VOIX.md](http://VOIX.md)` (à créer) |

---

## 12. CE DOCUMENT REMPLACE

- L'ancien framework de scoring (reste utilisable pour évaluer de nouvelles idées)
- L'approche build-first
- La cible dev
- L'approche engagement proactif / build in public
- La stratégie 3 verticals simultanés
- La cadence 2 SaaS/mois comme objectif
- Le cross-engagement R↔F↔F2
- FoundryTwo comme identité studio
- Le suivi du build dans ce repo (le build est dans des projets Claude séparés)
