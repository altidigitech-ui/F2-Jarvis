# STOREMD — CONTEXTE PRODUIT, COLD & PUBLICATION

**Date :** 21/05/2026
**Statut :** Live (lancé 14/04/2026) — App Shopify NON approuvée sur l'App Store
**URL landing :** storemd.vercel.app (storemd.com DNS pending)
**Backend :** storemd-api-production.up.railway.app
**Cold templates :** `cold/cold-templates.md` (même dossier)
**Voix R :** `../../../romain/VOIX.md` | **Voix F :** `../../../fabrice/VOIX.md`

---

## 1. CE QUE C'EST

AI agent qui scanne la santé d'un store Shopify en 60 secondes. 43 features, 5 modules. Pas un dashboard passif — un agent qui tourne, détecte les problèmes et recommande des actions concrètes.

---

## 2. MODULES ET FEATURES

| Module | Features clés | Douleur résolue |
|--------|--------------|----------------|
| **Store Health** | App Impact Scanner, Code Weight Scanner, Bot Traffic Filter, Uninstall Residue Detector, Ghost Billing Detector, Speed diagnostic | Les apps installées ralentissent le store, facturent après désinstallation, laissent du code mort |
| **Listings** | Catalogue Scan (/100 par listing), Bulk Rewrite, SEO Engine, Dead Listing Detector, Image Optimizer, Multi-langue | Listings mal optimisés, descriptions manquantes, SEO absent |
| **Agentic Readiness** | Score de préparation pour le commerce IA (ChatGPT Shopping, Perplexity), AI Crawler Monitor | Les stores ne sont pas visibles pour les agents IA qui recommandent des produits |
| **Compliance** | Accessibility scan, GDPR check, security monitor | Non-conformité légale, failles de sécurité |
| **Browser Automation** | Scan automatisé du store comme un vrai utilisateur | Détection de problèmes invisibles côté serveur |

---

## 3. PRICING

| Plan | Prix | Inclus |
|------|------|--------|
| **Free** | $0 | 1 audit ponctuel, 5 analyses listings, Score Agentic Readiness |
| **Starter** | $29/mois | 1 store, scan hebdo, 100 produits, Accessibility scan |
| **Pro** | $79/mois | Scan quotidien, benchmark, bot filter, 1000 produits, bulk ops, tous les modules |
| **Agency** | $199/mois | 10 stores, white-label, API, illimité, tous les modules + API |

Comparaison marché : agences audit = $500-$2000 one-shot. StoreMD = monitoring continu pour $29/mois. Market Clarity recommande $149-199/mois pour le bot blocking seul.

---

## 4. CONTRAINTE BETA

L'app N'EST PAS sur le Shopify App Store. Les merchants ne peuvent pas la trouver et l'installer eux-mêmes.

**Workflow d'installation :**
1. Le merchant contacte en DM ou répond à un post
2. On envoie le lien d'installation direct (Partner Dashboard)
3. Le merchant installe via le lien

**Lien d'installation :**
```
https://storemd-api-production.up.railway.app/api/v1/auth/install
```

**Règles :**
- Ne PAS mettre le lien dans les posts publics
- Ne PAS blaster le lien à des stores non qualifiés
- Le lien va en DM uniquement, après qualification
- Flow : landing page → CTA → DM → lien personnalisé

---

## 5. CIBLES ET CRITÈRES DE QUALIFICATION

### Cible unique : merchants avec une boutique Shopify

Pas de boutique Shopify = pas dans le scope = jamais un beta tester = jamais un client. StoreMD est un produit niché à Shopify. Il ne fonctionne pas sur WooCommerce, Magento, Wix, ou autre.

### Profils cibles

| Profil | Pourquoi |
|--------|----------|
| Merchant solo / petite équipe | 6-14 apps installées, pas de dev interne, besoin d'audit automatisé |
| Merchant $10-500K/an CA | Assez gros pour avoir des problèmes d'apps, assez petit pour ne pas avoir d'agence |
| Merchant $500K+/an CA | Stack apps complexe, ghost billing probable, budget pour Pro/Agency |
| Agency owner Shopify | Gère 5-50+ stores, besoin multi-stores, plan Agency $199/mois |

### Hors scope (NE PAS contacter)

- Développeurs / SaaS builders / indie hackers
- CEO / marketeurs généralistes (pas de boutique Shopify)
- Merchants sur WooCommerce, Wix, Magento, BigCommerce
- Influenceurs / créateurs sans boutique Shopify
- Consultants e-com sans stores actifs

### Critères de qualification (avant de DM)

- Le merchant a une boutique Shopify visible (lien dans bio, mention Shopify, "Powered by Shopify" en footer)
- Le compte est actif (posts récents, pas abandonné)
- Le merchant semble gérer activement son store (publications produits, promos, questions dans des groupes)

---

## 6. HOOKS COLD PAR DOULEUR

| Douleur | Hook | Data |
|---------|------|------|
| **Vitesse** | Chaque seconde de load time coûte 7% de conversion | Store moyen = 3.2s, sweet spot = <2.5s |
| **App bloat** | Le store moyen a 14 apps = 2.8-7s de load time en plus | 6-10 apps = +2-3 secondes, chaque app = +200-500ms |
| **Ghost billing** | Des apps désinstallées continuent de facturer | Privy : 40+ reviews confirmant la facturation fantôme post-désinstallation |
| **Code résiduel** | Les apps laissent du code mort après désinstallation | Avada, PageFly, Shogun, Privy : 380+ reviews confirmant |
| **Perte de revenus** | Chaque app inutile ajoute 200-500ms de load time. Entre ghost billing, app bloat et subscriptions oubliées, un store 10-30K$/mois perd $3,000-8,000/an en coûts invisibles | Privy facture $29/mois après désinstall (40+ reviews). 3 apps inutiles = 600ms-1.5s de load time en plus. Source MUTATIONS.md (APPWRK 2026, Market Clarity, Reddit) |
| **Bot traffic** | Les faux profils faussent les métriques et gâchent les audiences Google Ads | Cas Reddit : 3 millions de hits bots en 30 jours sur 2 pages |
| **Listings** | 80% des produits génèrent 0 trafic | Thread Reddit : "I have 500 products, 80% get zero traffic" |
| **IA readiness** | Les crawlers IA accèdent aux blogs mais PAS aux pages produits | Les stores sont invisibles pour ChatGPT Shopping et Perplexity |

---

## 7. CONCURRENTS

| Concurrent | Faiblesse vs StoreMD |
|-----------|---------------------|
| StoreScan ($9.99-$49.99, 0 reviews) | 9 scanners passifs, rapport PDF. StoreMD = agent continu 24/7. |
| Speed optimizers (TinyIMG, Thunder) | Compriment les images. Ne diagnostiquent pas POURQUOI le store est lent. |
| Overlays accessibilité (accessiBe) | Widget cosmétique par-dessus le code. StoreMD diagnostique au niveau du code et donne les corrections à appliquer. |
| Agences audit ($500-$2000) | One-shot. StoreMD = monitoring continu à $29/mois. |

Aucun concurrent ne combine : App Impact Scanner + Ghost Billing + Bot Filter + Agentic Readiness + Browser Automation dans un seul produit.

---

## 8. MOAT

- **Data accumulation** — 6 mois d'historique = irremplaçable, le merchant ne peut pas partir
- **Bot filter exclusif** — Sépare trafic humain vs bots, aucun concurrent ne le fait
- **Agentic Readiness** — First mover, aucun concurrent ne mesure la compatibilité IA
- **Browser Automation** — Aucun concurrent ne scanne comme un vrai utilisateur
- **Cross-Store Intelligence** — Plus de stores scannés = meilleurs benchmarks

---

## 9. COLD — OBJECTIF ET STRATÉGIE

Trouver des gens qui ont une boutique Shopify et les contacter.

**Phase beta (actuelle : app pas sur App Store) :** ces gens sont des beta testers.
**Phase post-approbation (futur) :** ces mêmes gens deviennent des clients.

Le cold ne s'arrête pas à l'approbation de l'app. Il continue. Seul le statut du merchant change. La cible reste la même : merchants Shopify.

La transition est fluide. On ne cherche pas deux types de personnes. On cherche des merchants Shopify, et leur statut évolue avec celui de l'app.

---

## 10. COLD — COMPTES, PLATEFORMES ET VOLUMES

| Plateforme | Compte | Type de DM | Volume |
|-----------|--------|-----------|--------|
| TikTok | StoreMD | DM direct | 10/jour (partagé R+F) |
| Instagram | StoreMD | DM direct | 10/jour (partagé R+F) |
| Twitter | R perso (@delgado_ro72224) | DM direct | 10/jour |
| Twitter | F perso (@FabGangi) | DM direct | 10/jour |
| LinkedIn | R perso (Romain Delgado) | Connexion + DM | 10/jour |
| LinkedIn | F perso (Fabrice Gangitano) | Connexion + DM | 10/jour |
| Facebook | R perso | DM direct (cibles groupes) | 10/jour |
| Facebook | F perso | DM direct (cibles groupes) | 10/jour |

**Total : 80 DMs/jour** (BIBLE §4).

### Mécaniques par plateforme

**Twitter :** DM direct. Trouver des merchants via Grok (recherche). DM personnalisé avec hook + lien landing page.

**LinkedIn :** Demande de connexion ciblée. 3 notes personnalisées/mois sur compte gratuit. DM quand la connexion est acceptée.

**Facebook :** Trouver des merchants dans les groupes Shopify. DM direct. Référencer le groupe ou le post source dans le DM.

**Instagram :** DM depuis le compte StoreMD. Trouver des merchants via Claude Chrome (recherche). Référencer le contenu du merchant (post, reel, bio).

**TikTok :** DM depuis le compte StoreMD. Trouver des merchants via Claude Chrome. Référencer une vidéo du merchant.

### Publication (comptes StoreMD)

| Plateforme | Compte | Fréquence |
|-----------|--------|-----------|
| TikTok | StoreMD | 7/7 |
| Instagram | StoreMD (recyclé TikTok) | 7/7 |
| Facebook | StoreMD (recyclé TikTok) | 7/7 |
| Twitter | StoreMD | 1/jour lun-ven |
| IH | FoundryTwo | 1/sem mercredi |

Pour fréquence, horaires précis et règles de recyclage détaillées, voir `../../contenu/batch-semaine/batch-template.md` §1 (horaires fixés) + §7 (recyclage).

---

## 11. PUBLICATION — COMPTES STOREMD

### Source et recyclage — modèle TikTok-first

TikTok est la source unique du contenu vidéo. UNE vidéo TikTok par jour alimente TOUS les comptes du jour. Seuls les textes diffèrent entre plateformes pour respecter les contraintes de format et de voix.

Production amont (samedi) :
1. Créer le contenu natif TikTok (Remotion, CapCut, ou recyclage du catalogue `asset-brand/storemd/videos/V1/`)
2. Exporter le fichier master : 1080×1920, 9:16, MP4, aucun watermark, aucune incrustation autre plateforme
3. Re-exporter une version 1080×1350 (4:5) pour Instagram si nécessaire

Recyclage par compte (mapping S10) :

| Compte | Vidéo | Texte |
|--------|-------|-------|
| TikTok StoreMD | Vidéo source du jour | Caption native (source) |
| Instagram StoreMD | Vidéo source identique | Caption identique TikTok (recyclage 100%) |
| Facebook StoreMD | Vidéo source identique | Caption identique TikTok (recyclage 100%) |
| Twitter StoreMD | Vidéo source recyclée | Texte adapté Twitter (100-280 car., format 2-blocs si lien) |
| Twitter R perso | Vidéo source recyclée | Texte voix R adapté ("I", angle business/growth) |
| Twitter F perso | Vidéo source recyclée | Texte voix F adapté ("I", angle technique accessible) |
| LinkedIn R perso (mar+jeu) | Vidéo source recyclée | Texte long-form voix R (800-1300 car., 1 phrase/ligne) |
| LinkedIn F perso (mer+ven) | Vidéo source recyclée | Texte long-form voix F |
| IH FoundryTwo (mer) | PAS de vidéo | Texte long-form focus produit + screenshot optionnel |

Stats hebdo : 7 vidéos uniques alimentent 41 publications. Travail de rédaction = 27 textes uniques (les captions IG et FB dupliquent celle de TikTok).

Règles de cohérence :
- Le texte d'un post doit COLLER avec ce que la vidéo montre. Si la vidéo parle de ghost billing, le texte parle de ghost billing.
- Le prompt source de chaque vidéo est noté dans le champ "Notes" du post au batch (ref : `asset-brand/storemd/videos/V1/MAPPING_VIDEOS_V1.md`).
- Le recyclage Instagram/Facebook = vidéo + caption strictement identiques à TikTok. Pas d'adaptation.
- Le recyclage Twitter (StoreMD/R/F) et LinkedIn (R/F) = même vidéo, texte adapté par compte selon contraintes plateforme et voix.
- IH ne reçoit pas la vidéo (format texte produit long-form), peut intégrer un screenshot du site ou du dashboard si pertinent.

Tout est batché le samedi et schedulé. En semaine on ne rédige pas.
Template batch : `publication/batch-semaine.md`
Batch central : `../../contenu/batch-semaine/batch-semaine.md`
Règles complètes recyclage + sélection vidéo : `../../contenu/batch-semaine/batch-template.md` §4.7 + §7.

### Cadence

| Plateforme | Compte | Fréquence | Format principal |
|-----------|--------|-----------|-----------------|
| TikTok | StoreMD | 7/7 | Vidéo 15-45s (source unique du jour) |
| Instagram | StoreMD | 7/7 | Reel recyclé TikTok identique (vidéo + caption) |
| Facebook | StoreMD | 7/7 | Reel recyclé TikTok identique (vidéo + caption) |
| Twitter | StoreMD | 1/jour lun-ven | Vidéo TikTok recyclée + texte adapté (format 2-blocs si lien) |
| IH | FoundryTwo | 1/sem mercredi | Texte long-form focus produit + screenshot optionnel |

Source de vérité fréquence + horaires + règles recyclage : `../../contenu/batch-semaine/batch-template.md` §1 + §7.

### Ton et règles

> Voix complète des comptes StoreMD → `VOIX.md` (même dossier).

- Ton neutre produit. Le produit parle de lui-même. Pas de "I", pas de "we".
- ANTI-IA appliqué sans exception (`../../../ANTI-IA.md`).
- Hashtags : 0 sur TikTok et Twitter. 5 max niche sur Instagram. 2-3 max sur Facebook.
- Lien : jamais dans le corps du tweet (-1700% reach). Format 2-blocs sur Twitter. Lien en bio ou commentaire sur LinkedIn/Facebook.
- Audio original > sound trending sur TikTok.
- Pas de watermark d'autre plateforme (Originality Score pénalise).

### UTM publication

Source de vérité unique : `../../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`

Ne JAMAIS copier un UTM de mémoire. Toujours ouvrir le fichier UTM et copier-coller le lien exact pour le placement concerné (bio, post, reply, DM, ads, etc.).

### Hashtags

Source de vérité unique : `../hashtags.md`

Ne JAMAIS inventer de hashtags. Toujours copier-coller depuis le fichier hashtags.

### Détail par plateforme

Pour les règles algo, formats, timing détaillés → `../../canaux/[plateforme]/context.md`

---

## 12. COLD — RÈGLES

### Lien

- **Lien landing page (storemd.vercel.app) : OUI dans le premier DM.** C'est la présentation du produit. Le merchant peut regarder ce que c'est.
- **Lien d'installation beta : APRÈS réponse seulement.** Quand le merchant répond qu'il veut tester, on envoie le lien d'installation (Partner Dashboard). Jamais dans le premier DM.

### Personnalisation

- CHAQUE DM doit référencer quelque chose de spécifique au merchant (store, produit, niche, problème visible, post récent).
- JAMAIS de template copié-collé identique. Même framework, contenu unique.
- Le merchant doit sentir que le DM a été écrit pour lui, pas blasted à 500 personnes.

### Volume et cadence

- 10 cold/jour par plateforme par personne (ou par compte produit partagé).
- Pas de blast. Espacement naturel entre les DMs.
- Répondre dans les 2h à chaque merchant qui répond.

### Anti-IA (comptes perso)

- Contractions obligatoires.
- Structures imparfaites.
- Pas de patterns IA détectables.
- Voir `../../../ANTI-IA.md` et `../../../romain/VOIX.md` ou `../../../fabrice/VOIX.md`.

### Ton (comptes StoreMD)

- Ton neutre produit. Pas de "I", pas de "we".
- Le produit parle de lui-même.
- Naturel mais pas familier.

### Suivi

- Si le merchant répond → répondre dans les 2h, envoyer le lien d'installation si demandé.
- Si le merchant ne répond pas → pas de relance. Un seul DM par merchant par plateforme.
- Si le merchant dit non → respecter. Pas de deuxième tentative.

---

## 13. COLD — ANTI-PATTERNS

1. Contacter des gens sans boutique Shopify
2. Blaster le même message à 50 personnes
3. Mettre le lien d'installation dans le premier DM
4. Relancer un merchant qui n'a pas répondu
5. Relancer un merchant qui a dit non
6. Cibler des devs, SaaS builders, indie hackers
7. Cibler des merchants sur WooCommerce/Wix/Magento
8. Envoyer des DMs sans personnalisation
9. Utiliser des structures IA détectables (comptes perso)
10. Inventer des chiffres ou du social proof

---

## 14. COLD — SOURCES DE CIBLES

| Outil | Plateforme | Ce qu'il trouve |
|-------|-----------|----------------|
| Claude Chrome | Instagram | Merchants Shopify (bio, hashtags, contenu) |
| Claude Chrome | TikTok | Merchants Shopify (vidéos, bio) |
| Claude Chrome | Facebook | Merchants dans les groupes Shopify |
| Claude Chrome | LinkedIn | Merchants / agency owners Shopify |
| Grok | Twitter | Merchants Shopify (tweets, bio, conversations) |

Les résultats de recherche vont dans `../recherche/cold/[outil]/[plateforme]/recherche-log.md`.

---

## 15. MÉTRIQUES CANON

> NE PAS inventer de chiffres. NE PAS utiliser de métriques dans les posts si les fichiers ci-dessous ne sont pas à jour.

**Métriques produit (admin dashboard) :**
`../../../tracking/metrics/storemd-admin.md`
→ Source : page admin StoreMD (`/dashboard/admin`)
→ Mise à jour : chaque samedi par R avant le batch

**Métriques réseaux sociaux :**
`../../../tracking/metrics/[plateforme].md`
→ Mise à jour : chaque samedi par R avant le batch

---

## 16. CROSS-SELL

| Produit complémentaire | Logique |
|-----------------------|---------|
| **ProfitPilot** (backlog) | StoreMD = santé technique, ProfitPilot = santé financière. Cross-sell naturel. |

---

## 17. SCALABILITÉ

Ce fichier est spécifique à StoreMD. Quand ProfitPilot (ou un autre SaaS app Shopify) arrive :
- Créer un nouveau dossier `saas-app-shopify/profitpilot/`
- Créer un `context.md` dans ce dossier (même structure que celui-ci)
- Créer `cold/cold-templates.md` avec les hooks propres au produit
- Les comptes perso R/F cold pour les deux produits depuis les mêmes comptes
- Les comptes produit sont distincts (StoreMD ≠ ProfitPilot)
- Voir `strategie/PLAYBOOK-DISTRIBUTION.md` §8 pour la checklist d'intégration

---

## 18. SOURCES DE VÉRITÉ

| Document | Chemin |
|----------|--------|
| Cold templates | `cold/cold-templates.md` (même dossier storemd/) |
| Prompts recherche Chrome/Grok | `../recherche/cold/[outil]/[plateforme]/prompt-recherche.md` |
| Recherche-logs | `../recherche/cold/[outil]/[plateforme]/recherche-log.md` |
| Cold-logs StoreMD (Instagram, TikTok) | `cold/cold-log-instagram.md`, `cold/cold-log-tiktok.md` |
| Cold-logs R perso | `../../../romain/cold/cold-log-[plateforme].md` |
| Cold-logs F perso | `../../../fabrice/cold/cold-log-[plateforme].md` |
| Pipeline conversion | `pipeline-conversion.md` (à confirmer) |
| Batch-semaine StoreMD | `publication/batch-semaine.md` |
| BIBLE | `../../../BIBLE.md` |
| ANTI-IA | `../../../ANTI-IA.md` |
| Voix R | `../../../romain/VOIX.md` |
| Voix F | `../../../fabrice/VOIX.md` |
| Stratégie globale | `../../../strategie/CONTEXT.md` |
| Playbook distribution | `../../../strategie/PLAYBOOK-DISTRIBUTION.md` |
