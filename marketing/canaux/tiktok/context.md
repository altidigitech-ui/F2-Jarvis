# CONTEXT TIKTOK — Compte StoreMD

**Dernière mise à jour :** 05/05/2026
**Hérite de :** `BIBLE.md` + `ANTI-IA.md` + `marketing/strategie.md`
**S'appuie sur :** `marketing/canaux/tiktok/algo.md` (données algorithmiques objectives)
**Ce fichier contient :** stratégie, usage, cold, publication, production, hooks, formats, métriques TikTok.

---

## 1. RÔLE DE TIKTOK DANS L'ÉCOSYSTÈME

TikTok est le **canal acquisition principal** de StoreMD. C'est la source de contenu vidéo — tous les autres canaux (Instagram, Facebook) recyclent le contenu TikTok.

Priorité TikTok dans le stack cold : 1ère position.

**Pourquoi TikTok #1** :
- 70-80% du For You Page vient de comptes que l'utilisateur ne suit pas. Le follower count n'est pas un facteur direct de ranking. Une vidéo bien faite peut faire 50K vues sans audience préalable.
- 52% des acheteurs B2B 25-45 ans sont actifs sur TikTok chaque semaine. Les merchants Shopify y sont, ils postent du contenu, ils consomment du contenu e-com.
- TikTok = search engine pour 40% Gen Z. Les keywords dans les captions, on-screen text et audio sont indexés.

---

## 2. COMPTE ET USAGE

**Compte** : `@storemd` (compte produit **Business Account**). Pas de compte perso R ou F sur TikTok. On est le produit, on communique à travers le produit, on vend le produit. R et F ont tous les deux accès au compte StoreMD.

**Cible** : merchants Shopify qui scrollent leur téléphone. Pas des devs. Pas des indie hackers.

**Contrainte beta** : StoreMD n'est pas encore sur le Shopify App Store. Les merchants doivent DM le compte et on leur donne le lien d'installation manuellement.

### Business Account vs Creator Account

| Critère | Business Account (notre choix) | Creator Account |
|---------|-------------------------------|-----------------|
| Bibliothèque audio | Limitée — Commercial Music Library (~1M sons) | Complète — tous les sons trending |
| Duet/Stitch | Restreint sur audio non-commercial | Complet |
| Lien bio | Immédiat — pas besoin de 1000 followers | Seulement après 1000 followers |
| Analytics | Avancées — marketing-focused, conversions, funnels | Basiques |
| TikTok Ads Manager | Oui — campagnes complètes, Spark Ads | Non — seulement "Promote" |
| Business Creative Hub | Oui — trending videos, best practices | Non |
| API tiers / schedulers | Oui | Non |
| TikTok Shop | Oui — catalogue produits | Non |
| DMs | Peut DM n'importe qui + automated responses | Limité |
| Reach organique | Pas pénalisé vs Creator (confirmé TikTok) | Identique |

**Pourquoi Business** : le lien bio immédiat est critique pour driver du trafic dès le jour 1. La limitation audio est compensable avec du voiceover original et la Commercial Music Library.

### Usage principal : Cold

TikTok est un vivier de merchants Shopify qui postent du contenu autour de leur boutique. Le travail principal = trouver ces merchants via Claude Chrome et les contacter en cold DM. Recherche via `saas-app-shopify/recherche/cold/chrome/tiktok/`.

### Usage secondaire : Publication

Vidéos et carousels photos pour faire vivre la page, nourrir l'algo, et établir la présence StoreMD. Un prospect coldé ira regarder le profil avant de répondre — il faut que le profil soit actif et professionnel.

---

## 3. COLD — 10 DMs/JOUR (compte StoreMD)

### Cible

Merchants qui ont une boutique Shopify. Uniquement. BIBLE §5 : ciblage logique par produit.

### Source de cibles

Claude Chrome. Prompt de recherche : `saas-app-shopify/recherche/cold/chrome/tiktok/prompt-recherche.md`. Résultats dans `recherche-log.md`.

**Note TikTok web dégradé** : TikTok sur navigateur est limité (pas de For You exploitable, recherche bridée). Chrome navigue la version web mais les résultats sont moins riches que sur l'app mobile. La recherche cible les profils (Users tab), pas le For You.

### Templates

Templates cold dans `saas-app-shopify/storemd/cold/cold-templates.md`.

### Règles

- Tout en DM direct.
- Lien landing page (storemd.vercel.app) OK dans le premier DM.
- Lien d'installation beta = APRÈS réponse du merchant seulement.
- 1 seul DM initial. Pas de relance si pas de réponse.
- Logger dans `saas-app-shopify/storemd/cold/cold-log-tiktok.md`

### Contrainte lien bio

Le lien en bio nécessite **1000+ followers** sur Creator Account. Avec Business Account = lien immédiat, pas de minimum.

---

## 4. PUBLICATION — 1/JOUR LUN-VEN

### Cadence

| Format | Fréquence |
|--------|-----------|
| Vidéos (Reels) | 5/sem (1/jour lun-ven) |
| Carousel (Photo Mode) | 0-1/sem optionnel |

### Process

Tout est batché le samedi et schedulé. En semaine on ne rédige pas.

**Recyclage immédiat** : chaque vidéo TikTok est recyclée sur Instagram Reels (12-24h après) et Facebook page. Re-export depuis Remotion (PAS download depuis TikTok avec watermark).

### Règles de publication

- Pas de lien cliquable dans les vidéos. Lien en bio uniquement.
- **ZÉRO hashtag** dans nos posts. Le ranking 2026 passe par les keywords dans la caption/audio/text overlay, pas par les hashtags.
- Pas de pitch direct produit dans chaque vidéo. Le contenu doit avoir de la valeur standalone.
- Contractions obligatoires en anglais.
- ANTI-IA appliqué sans exception.
- Audio original > sound trending (bonus algo 2026).
- Ton neutre produit. Le produit parle de lui-même. Pas de "I" (R) ni de "we" (F2).
- Poster nativement dans l'app (+20-50% distribution vs API/scheduler).

### Content mix optimal SaaS B2B

| Pilier | % | Description |
|--------|---|-------------|
| **Micro-Tutorials** | 40% | 30-60 sec, walkthrough d'un seul feature |
| **Pain Point Storytelling** | 25% | Frustration relatable → solution en temps réel |
| **Before/After** | 15% | Store avant vs après |
| **Social Proof** | 10% | Screen recordings vrais utilisateurs, réactions |
| **Industry Hot Takes** | 10% | Contenu d'opinion, drive commentaires et shares |

---

## 5. ALGO TIKTOK 2026

Sources : Sprout Social, Buffer, PostEverywhere, ToolsBear, Darkroom Agency, TikTok Transparency Center.

### Hiérarchie des signaux

| Signal | Poids | Implication |
|--------|-------|-------------|
| **Watch time + completion rate** | ~40-50% | Barre passée à 70%+ en 2025-2026 (vs ~50% en 2024) |
| **Shares (notamment via DM)** | Très fort | Plus fort que likes. Share DM = "je veux que mon ami voit ça" |
| **Saves** | Très fort | Signal de valeur durable. Provoquer avec du contenu "à garder" |
| **Comments (qualité + profondeur)** | Fort | Commentaires longs > "🔥". Conversations multi-replies > likes |
| **Likes** | Faible | Signal de surface, loin derrière watch time/shares/saves |
| **Audio original** | Bonus | TikTok 2026 favorise l'originalité |
| **Search keywords** | Bonus | Captions, on-screen text, words spoken sont indexés |
| **Follower count** | Pas un facteur direct | Compte à zéro peut percer si le contenu performe |

### Mécaniques de distribution 2026

- **Follower-first testing** (fin 2025) : la vidéo est d'abord montrée à un échantillon de tes followers. Si le watch time tient, push broader.
- **Originality Score** : pénalise les vidéos avec watermark ré-uploadées ou les recycles évidents. Ne JAMAIS upload avec watermark.
- **3-second drop-off** : 50% des viewers swipe avant 3 secondes si le hook ne marche pas.
- **"Qualified Views"** = views > 5 secondes. C'est la métrique réelle, pas le compteur brut.
- **Engagement bait pénalisé** : "Comment 'yes' if you agree" = down-ranked en 2026.
- **AI content labels** : TikTok identifie et déprioritise le contenu généré par AI en 2026. Screen recordings et motion design (Remotion) sont safe. Talking head face caméra = le plus safe.
- **Consistance récompensée** : poster à la même heure chaque jour = 40% de croissance en plus vs aléatoire.

---

## 6. HOOKS — DATA ET TYPES

Source : OpusClip, analyse de 34 635 clips, Q1 2026.

L'algo prend sa première décision en ~1.5 secondes. Si le hook échoue, la vidéo entre dans un cold start dont elle ne s'échappe presque jamais.

### Les 5 types qui performent

**1. Product/Outcome Showcase** (6 037 vues moyennes — le plus performant)
Montrer le résultat en premier. La transformation. Le chiffre. Le before/after.

**2. Expert Explainer Setup**
Signal d'autorité → curiosité → promesse de payoff.

**3. Contrarian Open**
Rejeter une croyance commune dans la première phrase.

**4. Specific Number**
Les chiffres spécifiques signalent l'authenticité. Les nombres impairs (pas ronds) performent mieux.

**5. Imperative Command**
Le plus agressif, le plus divisif. À utiliser avec parcimonie.

### Hooks StoreMD spécifiques (à tester, à mesurer)

- "Cette boutique Shopify perd $4 200/mois sans le savoir"
- "94% des stores Shopify ont des apps zombies qui leur coûtent de l'argent"
- "J'ai scanné 50 boutiques Shopify cette semaine — voici ce que j'ai trouvé"
- "3 millions de hits bots en 30 jours sur cette boutique. Le merchant n'a rien vu."
- "Cette app a SUPPRIMÉ les collections de 200 boutiques. Voici comment"

Sources hooks réels : `produits/MUTATIONS.md` §StoreMD (12 threads validés terrain, 600+ commentaires).

### Hooks qui ne marchent plus

- "Let me tell you about the time..." (demande de la confiance pas encore gagnée)
- "Hi everyone, today we're going to talk about..." (format YouTube, pas TikTok)
- "Okay so..." (gaspille les 2 premières secondes)
- "Have you ever wondered..." (force le viewer dans un travail mental avant d'avoir gagné son attention)

---

## 7. FORMAT VIDÉO

### Durée

- **15-45 secondes** = sweet spot (assez pour montrer un scan, assez court pour completion rate 70%+)
- 60-90s acceptable pour démos détaillées. Au-delà : drop-off explose.
- Reels < 90 secondes pour la discovery.

### Structure

```
[0-3s : HOOK] — Affirmation choc, problème évident, ou résultat surprenant
[3-10s : MISE EN CONTEXTE] — De quoi on parle, sur quelle boutique
[10-30s : DÉMO/RÉSULTATS] — On scanne, on montre ce qu'on trouve, en chiffres
[30-45s : CTA] — "Lien en bio pour scanner ta boutique"
```

### Formats qui performent (SaaS B2B)

| Format | Performance | Raison |
|--------|-------------|--------|
| Screen recording avec curseur + voiceover | 55-65% watch time | Montre le produit en action |
| Talking head face caméra | Fort pour la confiance | Construit la relation parasociale |
| Side-by-side avant/après | Très visuel | Contraste instantanément compréhensible |
| "I didn't know it could do this" | Fort pour la découverte | Format surprise retient l'attention |
| Trending audio + product demo | +20-40% FYP reach | Son trending booste la distribution |
| Countdown/liste | Fort engagement | Structure claire, facilement rewatchable |

### Formats qui ne marchent PAS

- Vidéos de marque polies avec logos et musique corporate
- Talking head qui lit un script sans montrer le produit
- Clips de webinar repurposés >90s sans re-editing
- Contenu "culture d'équipe" pas lié à un pain point
- Ads surproduites qui ressemblent à des ads

### Captions

- 80-150 caractères max
- Mot-clé principal au début (ex: "Shopify chargebacks", "store losing money")
- CTA bref en fin ("link in bio")
- ANTI-IA strict (pas d'em-dash, pas de "Here's the thing")

### On-screen text

TikTok lit le texte affiché et l'utilise pour le ranking search. Toujours afficher le hook en gros au début. CTA visuel ("Link in bio") à la fin.

### Audio

- Audio original > sound trending en 2026
- Voix off + montage Remotion = audio original
- Si sound trending : en background discret, pas comme moteur principal
- Compte Business : Commercial Music Library uniquement (royalty-free)
- Audio original = toujours safe + bonus algo

### Carousel (Photo Mode)

Jusqu'à 35 images swipables. Les slides peuvent être générées programmatiquement (Remotion). Format optionnel pour du contenu checklist, data, comparatif.

---

## 8. TIMING & FRÉQUENCE

### Meilleurs horaires B2B (merchants Shopify US/EU)

Sources : Sprout Social (2B engagements, 307K profils), Buffer (7.1M posts).

| Jour | Horaire optimal |
|------|----------------|
| Mardi | 10-11h EST / 16-17h CEST |
| Mercredi | 11h-13h EST / 17-19h CEST |
| Jeudi | 14-17h EST / 20-23h CEST |
| Lundi | 12-13h EST / 18-19h CEST |
| Vendredi | 16-17h EST / 22-23h CEST |

**Règle du pré-pic** : poster 30-60 minutes AVANT le pic d'activité. L'algo a besoin de ce temps pour tester la vidéo sur le premier batch.

### Fenêtre critique

- **3-second drop-off** : 50% des viewers swipe si le hook ne marche pas
- **Qualified Views** = views > 5 secondes = la métrique réelle
- **Premières heures** : engagement velocity détermine la trajectoire
- Répondre à CHAQUE commentaire rapidement booste le ranking

### Ce qui ne marche pas

- Poster à 18h local = moment le plus populaire (concurrence maximale)
- Poster le week-end = engagement plus bas pour le B2B
- Poster 5x/jour sans qualité = l'algo downgrade les vidéos faibles du même compte
- Pauses prolongées = l'algo 2026 punit l'inactivité

### Cadence par phase

| Phase | Fréquence | Volume |
|-------|-----------|--------|
| Warming (J1-14) | 1-3/jour | Contenu safe, tips, pain points. AUCUN pitch. |
| Test (J15-45) | 1/jour | Tester les formats, analyser la rétention. |
| Scale (J46+) | 1-2/jour | Doubler sur le format qui marche. |
| Maintenance | 3-5/semaine | Minimum pour maintenir la distribution algo. |

---

## 9. COMMUNITYTOKS — RECHERCHE ET CONSOMMATION

Les CommunityToks sont des communautés de niche identifiées par leur contenu. On les utilise pour la **recherche de cibles** et la **consommation** (comprendre ce que les merchants postent), PAS pour tagger nos posts.

### Communautés pertinentes

- **#ShopifyTok** : merchants Shopify qui partagent tips, résultats, problèmes
- **#EcomTok** : communauté e-commerce plus large
- **#SmallBusinessTok** : entrepreneurs, souvent des merchants e-com
- **#SaaSTok** : fondateurs SaaS, product demos
- **#MoneyTok** : finances, business, investissement
- **#MarketingTok** : marketeurs, growth, ads

### Comment les utiliser

1. Suivre les comptes populaires de chaque communauté (l'algo apprend la niche par le comportement de consommation)
2. Identifier les merchants qui montrent leur store (cibles potentielles pour le cold)
3. Observer les contenus qui performent dans la niche (inspiration pour nos vidéos)

**Rappel : ZÉRO hashtag dans NOS posts.** Les CommunityToks sont pour la veille, pas pour le tagging.

---

## 10. DUETS & STITCHES

### Données

- Duets et Stitches augmentent le taux d'interaction de 27% chez les 18-24 ans (Q1 2026)
- Campagnes Duet avec CTA clair : 2.4 millions d'impressions supplémentaires en moyenne
- Vidéos réaction sponsorisées : 3.2x plus de recall et 48% de lift en purchase intent vs ads In-Feed

### Fonctionnement

- **Duet** : écran split — ta vidéo à côté de l'originale. Les followers du créateur original voient le duet.
- **Stitch** : clipper les 5 premières secondes d'une vidéo existante, puis enchaîner avec son propre contenu.

### Stratégie "10-100x"

Identifier des créateurs avec 10x à 100x ses followers dans la niche. Duet ou Stitch leurs vidéos les plus populaires en ajoutant un insight complémentaire. Leurs followers découvrent le compte.

### Ratio content mix

70% contenu original, 20% interactif (Duets, Stitches), 10% promo directe. Ne jamais dépasser 10% de promo.

### Limitation Business Account

Duet/Stitch restreint sur les vidéos avec audio non-commercial. Contournable avec audio original.

---

## 11. PRODUCTION

### Specs techniques

| Élément | Spec |
|---------|------|
| Format | Vertical 9:16, 1080x1920 |
| Durée | Sweet spot 15-45s, max 90s pour discovery |
| Codec | MP4 H.264 |
| Watermark | JAMAIS de watermark d'autre plateforme |
| Captions | Auto-captions (CapCut) |

### Stack production

| Outil | Usage | Coût |
|-------|-------|------|
| CapCut | Montage natif, auto-captions, effets | $0 |
| Remotion | Vidéos programmatiques batch, compositions réutilisables | Déjà payé |
| Higgsfield | UGC, vidéos marketing | Forfait 50€ |
| Smartphone | Talking head, screen recording | $0 |
| Ring light | Éclairage basique | $20 one-time |

### Batch production

Enregistrer 5-10 "yaps" (talking head) en une session. Chaque yap = 1 sujet, 20-30 secondes. Couper dans CapCut. Ajouter les captions. Le batch du samedi couvre la semaine.

### Repurposing cross-plateforme

1. Créer le contenu natif TikTok (dans l'app ou fichier master clean sans watermark)
2. Exporter un fichier master : 1080x1920, 9:16, MP4 H.264, aucun watermark
3. Poster sur TikTok : upload dans l'app, son natif, captions/stickers in-app
4. Poster sur Instagram Reels : upload le fichier master 12-24h après. Adapter la caption.
5. Poster sur Facebook : upload le fichier master. Adapter la caption.

**Pièges repurposing** :
- NE JAMAIS poster avec un watermark d'une autre plateforme (déprioritisé)
- NE PAS copier-coller la même caption (chaque plateforme a ses règles)
- NE PAS poster simultanément. TikTok d'abord, puis Reels 12-24h après.
- L'algo favorise le posting natif de 20-50% vs les posts via API/scheduler
- 78% des vidéos qui performent sur TikTok performent aussi sur Reels

### Pipeline production vidéo

- **Phase actuelle** : Remotion + Claude design (scripts générés par Jarvis, montage Remotion par F). Voix off anonyme (pas d'identité fondateur).
- **Phase future** : pipeline AI vidéo génération + montage automatisé end-to-end (en construction par F). Si fonctionnel : réduit le temps de production à quasi-zéro.

---

## 12. PROFIL & BIO LINK

### Lien bio

- Business Account = lien cliquable immédiat (pas de minimum followers)
- 1 seul lien autorisé dans la bio — les liens dans les captions/commentaires ne sont PAS cliquables
- Le lien doit inclure "https://" pour être cliquable

### Landing page

- URL dédiée (ex: `storemd.com/tiktok`) pour isoler le trafic
- Mobile-first obligatoire (100% du trafic TikTok est mobile)
- Single CTA, pas de Linktree avec 6 options
- Matching visuel avec l'énergie TikTok (rapide, direct, pas corporate)

### Le "5 minute rule"

Les leads contactés dans les 5 premières minutes après le signup sont 9x plus susceptibles de convertir que ceux contactés 30 minutes plus tard.

---

## 13. RÉPONSES (workflow Jarvis)

1. F ou R reçoit notification commentaire sur une vidéo `@storemd`
2. Screenshot du commentaire envoyé à Jarvis
3. Jarvis propose 2 variantes dans la voix `@storemd` (neutre, factuel)
4. F ou R valide, publie
5. Jarvis log automatique

**Voix `@storemd`** : neutre, factuelle, axée résultats. Pas de "we", pas de "I". Format compte produit. Concise.

**Cas particuliers** :
- Commentaire critique → réponse honnête + invitation à essayer (lien bio)
- Commentaire question technique → réponse précise, pas de pitch
- Commentaire "interested" / "DM me" → basculer en DM avec scan boutique sur mesure

---

## 14. TIKTOK LIVE

### Prérequis

- Minimum **1000 followers** pour accéder au LIVE
- L'algo favorise les LIVEs avec watch time élevé, commentaires substantifs, completion rate fort

### Application possible

"Live Store Audit" — scanner un store en direct, répondre aux questions en temps réel. Format démonstratif qui montre StoreMD en action. Pas accessible au lancement, focus contenu vidéo classique d'abord.

---

## 15. UTM TAGGING

| Placement | UTM |
|-----------|-----|
| Bio link | `utm_source=tiktok&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| Vidéo caption | `utm_source=tiktok&utm_medium=organic&utm_campaign=video&utm_content=video_cta` |
| DM TikTok | `utm_source=tiktok&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

Pour tout placement non listé dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, l'ajouter d'abord au fichier officiel.

---

## 16. MÉTRIQUES

### Stats natives TikTok (hebdo)

| Métrique | Pourquoi |
|----------|----------|
| Vues totales | Reach |
| Watch time moyen + completion rate | Indicateur #1 algo. Cible : 70%+ sur les meilleures. |
| Shares (notamment DM) | Signal le plus fort de valeur perçue |
| Saves | Signal de valeur durable |
| Comments + longueur | Qualité conversation |
| Profile visits | Funnel : viewers → profil |
| Bio link clicks | Funnel : profil → site |
| Followers gagnés | Audience accumulée |

### Conversions (dashboard admin StoreMD)

| Métrique | Source |
|----------|--------|
| Visites depuis TikTok | Dashboard admin → Traffic by Source → `tiktok` |
| Visites par campagne (vidéo vs bio) | Dashboard admin → Traffic by Campaign |
| Installs depuis TikTok | Dashboard admin → Recent Merchants → `utm_source=tiktok` |
| Conversion rate TikTok | Calcul : installs TikTok / visites TikTok |

### Top et flop hebdo

Jarvis sort chaque vendredi :
- Top 3 vidéos TikTok (par installs, secondaire = engagement)
- Flop 3 (à analyser : pourquoi)
- Hooks qui ont marché (pour répliquer)
- Comparatif TikTok vs Instagram Reels (quel contenu performe où)

---

## 17. CREATIVE CENTER — OUTIL DE RECHERCHE GRATUIT

Hub d'intelligence officiel TikTok pour les annonceurs et créateurs. Gratuit, accessible sans compte.

| Feature | Usage |
|---------|-------|
| Trend Discovery | Hashtags, sons, créateurs et vidéos qui montent. Filtrable par pays, industrie, période. |
| Top Ads Dashboard | Ads les plus performantes par industrie. Filtrer par objectif. |
| Keyword Insights | Mots-clés cherchés par les audiences. Filtrer par CTR. |
| Top Products | Produits trending sur TikTok Shopping par catégorie et région. |
| Symphony Assistant | AI qui résume les tendances, rédige des scripts, brainstorme des concepts. |

Workflow : checker 2-3x/semaine, identifier les sons rising + high fit pour la niche e-com, regarder les Top Ads catégorie "Software Tools", valider les mots-clés captions via Keyword Insights.

---

## 18. FONCTIONNALITÉS AVANCÉES

### TikTok Ads (pas prioritaire)

**Spark Ads** : booster un post organique existant comme une ad. Garde ses likes, commentaires, shares = social proof. Surpasse les In-Feed classiques de 20-40% en CTR. Stratégie : poster organiquement, identifier les vidéos qui performent (>40% watch time, bons saves/shares), puis amplifier en Spark Ads.

**Search Ads** : résultats de recherche TikTok, labelés "Sponsored". Convertissent à 2-3x le taux des feed ads (intention déjà exprimée).

**Lead Gen Forms** : formulaires in-app pré-remplis. 30-50% de CPL en moins vs traffic-to-landing-page.

| Métrique | Benchmark 2026 |
|----------|---------------|
| CPM moyen | $2.60-$6.60 (vs Meta $9-$15) |
| CPC moyen | $0.50-$1.50 |
| CTR In-Feed | 1.5-3% |
| CTR Spark Ads | 10-15% plus élevé que In-Feed |
| CPL Lead Gen Forms B2B | $30-$80 |

**Attribution** : TikTok délivre 10.7x plus de valeur que le last-click ROI suggère. La plupart des conversions passent par : voir vidéo → Google le nom du produit 24-72h plus tard → convertir via search. Fix : "How did you hear about us?" dans le signup flow.

### UGC & Micro-influenceurs

86% des marketeurs US travaillent avec des influenceurs. Micro-influenceurs (1K-10K) : 8.2% de taux d'engagement sur TikTok vs 5.3% pour les macro.

**Modèle "Scan & Share"** :
1. Scanner le store d'un créateur Shopify → lui envoyer le rapport gratuitement
2. Lui proposer de filmer sa réaction face caméra
3. Republier la vidéo comme Duet/Stitch + Spark Ad si elle performe
4. Coût : $0 (le scan est gratuit, le créateur obtient de la valeur)

**Modèle ambassadeur long-terme** :
- Scan gratuit pour eux + leurs followers
- Code promo personnalisé (track par créateur)
- Commission 20-30% sur chaque signup
- Coût : $0 upfront, pay-per-performance

### Creator Rewards Program

- Eligibilité : 10 000+ followers, 100 000+ vues en 30 jours, vidéos originales 60+ secondes
- RPM : $0.50-$2.00 pour 1000 vues qualifiées
- Pertinence : faible pour un SaaS. L'objectif c'est le pipeline de signups, pas la monétisation des vues.

### Comparatif TikTok vs Instagram Reels vs YouTube Shorts

| Critère | TikTok | Instagram Reels | YouTube Shorts |
|---------|--------|----------------|----------------|
| Algo | Interest graph (contenu-first) | Social graph (relationship-first) | Hybrid (search + recommendation) |
| Reach organique | Le plus fort | En déclin (Meta pousse le paid) | Fort via Shorts shelf + Search |
| Engagement rate | 2.80-5.75% | 0.50-5.53% | 0.40-5.91% |
| Durée de vie contenu | 24-48h peak | 24-48h peak | Semaines/mois (search-driven) |
| Audience | 16-34 core, 25-34 segment le plus large | 25-44, plus haut revenu | 13-65+, le plus large |
| Bio link | Business = immédiat, perso = 1000 followers | Toujours disponible | Pas dans Shorts |
| CPM ads | $2.60-$6.60 | $9-$15 | Variable |

### Legal & Compliance

- Contenu sponsorisé : labelé "#ad" ou "Paid Partnership" (FTC US + EU transparency)
- AI content labels : TikTok identifie et déprioritise le contenu généré par AI. Screen recordings et Remotion = safe. Talking head = le plus safe.
- Copyright audio : Business Account = Commercial Music Library uniquement. Audio original = toujours safe.
- GDPR : si collecte d'emails via bio link → consentement explicite requis (EU), politique de confidentialité, droit de suppression.

---

## 19. ANTI-PATTERNS

| Interdit | Pourquoi |
|----------|----------|
| Personal branding (R ou F en avant) | Compte produit, pas de visage fondateur |
| Build in public | Le merchant s'en fout |
| Hashtags | ZÉRO, jamais, aucune exception |
| Watermark d'autre plateforme | Originality Score = pénalité |
| Engagement bait ("comment 'yes'") | Pénalisé par l'algo 2026 |
| Sound trending comme moteur principal | Audio original > recycled trending sound |
| Vidéos > 90 secondes | Drop-off explose sauf format démo exceptionnel |
| Engagement avec bots / fake comments | Détecté et pénalisé |
| Réponses commentaires mode pitch agressif | Concise, factuelle, utile |
| Inventer des chiffres | BIBLE §3. Tous les chiffres de scans réels |
| Poster du contenu produit sur un compte neuf | 2 semaines de warming d'abord |
| Format YouTube ("Hi everyone, today we're going to...") | Scroll immédiat |
| Scheduler API au lieu de poster nativement | 20-50% de distribution en moins |
| Poster dans plusieurs niches non-reliées | Jusqu'à 45% de drop |
| Attendre la perfection | "Good-enough published consistently beats perfect sporadically" |
| Mesurer en last-click | TikTok drive 10.7x plus que le last-click montre |
| Lien bio vers la homepage | Toujours une landing page dédiée avec un seul CTA |
| Pauses prolongées | L'algo 2026 punit l'inactivité |
| Musique de fond trop forte | Réduit le watch time |
| Poster trop tard le soir | Premières heures gaspillées si l'audience dort |
| Em-dash, "Here's the thing", "At the end of the day" | Détecté IA. Cf. `ANTI-IA.md` |

---

## 20. DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Algo TikTok | `marketing/canaux/tiktok/algo.md` |
| Algo et context Instagram (recycle TikTok) | `marketing/canaux/instagram/` |
| Algo et context Facebook (recycle TikTok) | `marketing/canaux/facebook/` |
| Stratégie marketing globale | `marketing/strategie.md` |
| Objectifs et KPIs | `marketing/objectifs.md` |
| Pipeline vidéo | `marketing/contenu/pipeline-video.md` |
| Réponses commentaires Jarvis | `marketing/jarvis/reponses-commentaires.md` |
| Prompt Chrome recherche | `saas-app-shopify/recherche/cold/chrome/tiktok/prompt-recherche.md` |
| Recherche-log | `saas-app-shopify/recherche/cold/chrome/tiktok/recherche-log.md` |
| Cold-log TikTok | `saas-app-shopify/storemd/cold/cold-log-tiktok.md` |
| Cold templates | `saas-app-shopify/storemd/cold/cold-templates.md` |
| Context StoreMD | `saas-app-shopify/storemd/context.md` |
| Hashtags | `saas-app-shopify/hashtags.md` |
| UTM tracking | `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` |
| ANTI-IA | `ANTI-IA.md` |
| BIBLE | `BIBLE.md` |
