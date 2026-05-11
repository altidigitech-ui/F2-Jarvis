# BATCH TEMPLATE — Mode d'emploi

> Ce fichier explique comment produire le batch de la semaine. Jarvis ou toute IA qui lit ce fichier doit suivre CHAQUE étape dans l'ordre.
> Le batch est produit le SAMEDI. En semaine on ne rédige pas — on exécute (copier-coller + publier).
> Source de vérité principes : `../../BIBLE.md` + `../../ANTI-IA.md`
> Dernière mise à jour : 10/05/2026

---

## 1. HORAIRES FIXÉS

Ces horaires ne changent pas sauf décision explicite de R ou F.

### Comptes StoreMD — 7/7

| Plateforme | Horaire CET | Horaire EST | Jours |
|-----------|------------|------------|-------|
| TikTok StoreMD | 14h00 | 8h00 | 7/7 |
| Instagram StoreMD | 18h00 | 12h00 | 7/7 (recyclé TikTok même jour) |
| Facebook StoreMD | 18h30 | 12h30 | 7/7 (recyclé TikTok même jour) |

### Comptes StoreMD — Lun-ven

| Plateforme | Horaire CET | Horaire EST | Jours |
|-----------|------------|------------|-------|
| Twitter StoreMD | 15h00 | 9h00 | Lun-ven |
| IH StoreMD | 15h00 | 9h00 | Mercredi uniquement |

### Comptes perso — Lun-ven

| Plateforme | Compte | Horaire CET | Horaire EST | Jours |
|-----------|--------|------------|------------|-------|
| Twitter | F (@FabGangi) | 13h00 | 7h00 | Lun-ven |
| Twitter | R (@delgado_ro72224) | 14h00 | 8h00 | Lun-ven |
| LinkedIn | R (Romain Delgado) | 15h30 | 9h30 | Mardi |
| LinkedIn | R (Romain Delgado) | 18h00 | 12h00 | Jeudi |
| LinkedIn | F (Fabrice Gangitano) | 18h00 | 12h00 | Mercredi |
| LinkedIn | F (Fabrice Gangitano) | 15h30 | 9h30 | Vendredi |

### Reddit
Restrictions en cours. Warming/karma si le temps le permet. Pas de publication schedulée.

---

## 2. PRÉPARER — Données à collecter AVANT de produire

Jarvis ou l'IA qui produit le batch DOIT collecter TOUTES ces données et les présenter à R pour validation AVANT de rédiger un seul post.

### 2.1 Métriques semaine écoulée

| Source | Chemin | Ce qu'on cherche |
|--------|--------|-----------------|
| Cold-logs R | `romain/cold/cold-log-*.md` | Volume envoyé, taux réponse par plateforme |
| Cold-logs F | `fabrice/cold/cold-log-*.md` | Idem |
| Cold-logs StoreMD | `saas-app-shopify/storemd/cold/cold-log-*.md` | Idem |
| Pipeline conversion | `saas-app-shopify/storemd/pipeline-conversion.md` | Conversations actives, beta spots, conversions |
| Dashboard hebdo | `tracking/dashboard-hebdo.md` | Métriques consolidées |
| Analytics plateformes | Données manuelles R+F | Impressions, engagement rate, meilleur/pire post |

### 2.2 Observations terrain

| Source | Chemin | Ce qu'on cherche |
|--------|--------|-----------------|
| Progress R | `romain/tracking/progress.md` | Insights, patterns, observations |
| Progress F | `fabrice/tracking/progress.md` | Idem |
| Douleurs R | `romain/tracking/douleurs-observees.md` | Nouvelles douleurs = matière à posts |
| Douleurs F | `fabrice/tracking/douleurs-observees.md` | Idem |
| Pain points Reddit | `saas-app-shopify/recherche/engagement/reddit/recherche-log.md` | Douleurs centralisées |

### 2.3 Contexte produit

| Source | Chemin | Ce qu'on cherche |
|--------|--------|-----------------|
| Context StoreMD | `saas-app-shopify/storemd/context.md` | Nouvelles features, évolution produit, métriques canon |
| Cold templates | `saas-app-shopify/storemd/cold/cold-templates.md` | Hooks par douleur (§6 context StoreMD) |

### 2.4 Assets disponibles

| Source | Chemin | Ce qu'on cherche |
|--------|--------|-----------------|
| Vidéos TikTok V2 | `asset-brand/storemd/videos/STOREMD_TIKTOK_10_VIDEOS_V2.md` | 10 vidéos avec prompts |
| Vidéos TikTok V3 | `asset-brand/storemd/videos/STOREMD_TIKTOK_10_VIDEOS_V3.md` | 10 vidéos avec prompts |
| Carrousels | `asset-brand/storemd/caroussel/` | 4 sets de carrousels avec prompts |

Avant de sélectionner une vidéo, LIRE SON PROMPT dans le fichier source. Comprendre ce que la vidéo montre. Ne jamais choisir une vidéo sans savoir ce qu'elle contient.

#### Catalogue complet — V1 (13 vidéos)

| Nom V1 | Ce que la vidéo montre |
|--------|----------------------|
| `store-md-horror-slow-store` | 14+ apps, store lent, billing après désinstallation, $300/mo de bleed |
| `store-md-money-visitors` | $189/mois d'apps désinstallées, billing invisible |
| `store-md-money-daily` | Argent perdu par jour |
| `store-md-horror-ghost-apps` | Ghost apps, facturation fantôme |
| `store-md-before-after-billing` | Before/after billing |
| `store-md-before-after-ai` | Before/after AI readiness |
| `store-md-list-hidden` | Listings cachés |
| `store-md-tier-apps-danger` | Apps dangereuses par tier |
| `store-md-stats` | Agency 8 stores scannés, $1,400/mo ghost billing combiné |
| `store-md-myth-apps-fine` | Mythe "mes apps vont bien" |
| `store-md-beta-10-spots` | Beta 10 spots, workaround OAuth |
| `store-md-scan-demo-agency` | Démo scan pour agency |
| `store-md-scan-cta` | CTA scan |

#### Catalogue complet — V2 (10 vidéos) — `asset-brand/storemd/videos/STOREMD_TIKTOK_10_VIDEOS_V2.md`

| # | Titre | Ce que la vidéo montre | CTA |
|---|-------|----------------------|-----|
| V1 | "43 Features. One App. Nobody Comes Close." | 5 modules, 43 features, domination chiffres | Free beta. Link in bio. |
| V2 | "We Scraped Every Competitor" | Origin story, reverse-engineering marché | Free beta → Link in bio |
| V3 | "4 Features Nobody Has" | AI Scanner, Visual Test, Customer Simulation, Accessibility | Join the beta → Link in bio |
| V4 | "We Don't Send Reports. We Fix Your Store." | Agent vs rapport, code fantôme supprimé en 1 clic | Beta |
| V5 | "Built From 530+ Reviews of Your Current Apps" | 3 patterns, social proof technique | Beta |
| V6 | "Kills Your SEO App. Kills Your Speed App. Kills Your..." | Chaque module tue un concurrent | Free → storemd.vercel.app |
| V7 | "Your Store Is Invisible to ChatGPT" | FOMO IA, nouveau canal | Beta |
| V8 | "We Open Your Store Like a Customer" | Browser automation, visual proof | Beta |
| V9 | "They Find Issues. We Fix Them." | One-Click Fix Engine, killer feature | Beta |
| V10 | "43 Features. Here's the List." | Liste complète des 43 features en 25s | Free → storemd.vercel.app |

#### Catalogue complet — V3 (10 vidéos) — `asset-brand/storemd/videos/STOREMD_TIKTOK_10_VIDEOS_V3.md`

| # | Titre | Ce que la vidéo montre | CTA |
|---|-------|----------------------|-----|
| V11 | "POV: An App Has Been Charging You 8 Months After Uninstall" | Ghost billing POV merchant, révélation chiffrée | Vente live |
| V12 | "POV: ChatGPT Just Refused to Recommend Your Store" | FOMO IA, révélation visuelle | Beta offer |
| V13 | "Watch a Real Scan. Sound On." | Screen recording scan réel, 18 apps, ghost billing | Beta offer |
| V14 | "12 Issues Fixed in 22 Seconds. ASMR." | Satisfaction visuelle, cleanup video | Vente live |
| V15 | "While You Watched This, Your Store Lost $0.72" | Counter live de pertes | Beta offer |
| V16 | "The Code Graveyard Inside Your Store" | Horror code mort, révélation technique | Vente live |
| V17 | "Same Store. 47 Days Apart. Nobody Told Them." | Timelapse dégradation silencieuse | Vente live |
| V18 | "530 Reviews. One Wall. Sound Up." | Mur de plaintes réelles, validation collective | Beta offer |
| V19 | "We Don't Read Your Store. We Use It." | Métaphore Playwright, robot qui shoppe | Vente live |
| V20 | "Your Health Score Has 20 Invisible Questions" | Curiosité diagnostique, démystification | Beta offer |

#### Catalogue complet — Carrousels (4 sets) — `asset-brand/storemd/caroussel/`

| Nom | Dossier | Slides | Ce que le carrousel montre | Prompt |
|-----|---------|--------|--------------------------|--------|
| Général | caroussel-général/ | 6 | Présentation StoreMD — c'est quoi | PROMPT_CAROUSSEL_0.md |
| Installation beta | caroussel-installation-beta/ | 7 | Process beta en 5 étapes (DM → install → scan → résultats) | PROMPT_CAROUSSEL_1.md |
| Agressif | caroussel-agressif/ | 6 | 5 problèmes que personne ne scanne | PROMPT_CAROUSSEL_2.md |
| Gains potentiels | caroussel-gains-potentiels/ | 6 | Speed Tax, App Bloat, Time Tax, What Nobody Scans, Solution | PROMPT_CAROUSSEL_3.md |

### 2.5 Ressentis R et F

Demander à R et F AVANT de produire :
- Ce qu'ils veulent mettre en avant cette semaine
- Ce qu'ils ont observé sur le terrain
- Ce qui a marché / floppé la semaine passée
- Un angle ou un sujet qu'ils veulent tester

### 2.6 Règles

| Source | Chemin | Ce qu'on vérifie |
|--------|--------|-----------------|
| BIBLE | `../../BIBLE.md` | Principes non-négociables (§3 intégrité, §5 ciblage, §8 voix) |
| ANTI-IA | `../../ANTI-IA.md` | Patterns interdits |
| VISUELS | `../../VISUELS.md` | Algo type de post → visuel + templates prompts |
| Voix R | `romain/VOIX.md` | Registres, expressions, anti-patterns R |
| Voix F | `fabrice/VOIX.md` | Registres, expressions, anti-patterns F |

---

## 3. FORMAT D'UN POST

Chaque post dans le batch DOIT suivre ce format exact. C'est ce qui permet le copier-coller rapide en semaine.

```markdown
---

#### [ID] — [COMPTE] — [PLATEFORME] — [JOUR DATE] [HORAIRE]

**Vidéo/Carrousel :** `[nom exact du fichier ou "aucun"]`
**Registre :** [type selon VISUELS.md §1 : feature produit / pain point / résultat scan / data drop / question / tip / carrousel / vidéo produit]
**Statut :** ⏳

**TEXTE (ANGLAIS — À PUBLIER) :**
```
[Le texte exact à copier-coller. Prêt à publier tel quel.]
```

**REPLY (si lien) :**
```
[Lien UTM en reply — format 2-blocs pour Twitter. Lien en commentaire pour LinkedIn/Facebook. Rien si pas de lien.]
```

**TRADUCTION (FRANÇAIS — POUR VALIDATION R) :**
> [Traduction française du post pour que R valide le sens avant publication]

**Notes :**
- Douleur : [quelle douleur de context.md §6]
- Hook : [quel hook utilisé]
- Prompt vidéo : [référence au prompt dans le fichier vidéo si applicable]
- UTM : [le lien UTM complet utilisé, ref tracking/utm/StoreMD/]
```

### Règles du format

- Le TEXTE est en anglais, prêt à copier-coller. AUCUNE modification en semaine.
- Le lien n'est JAMAIS dans le corps du texte pour Twitter et LinkedIn. Toujours en REPLY ou commentaire.
- La TRADUCTION est pour validation uniquement — on ne la publie pas.
- Chaque post a son ID unique : `[COMPTE]-[PLATEFORME]-[SEMAINE]-[NUMÉRO]` (ex: STOREMD-TW-S9-01)
- Les posts sont regroupés par COMPTE dans le batch, pas par jour.

---

## 4. PRODUIRE — Règles de rédaction

### 4.1 Par compte

| Compte | Voix | Pronom | Réf voix |
|--------|------|--------|---------|
| R perso | Business, chiffres, conversion, "ton argent brûle" | "I" | `romain/VOIX.md` |
| F perso | Technique accessible, "sous le capot" | "I" | `fabrice/VOIX.md` |
| StoreMD | Neutre produit, le scan parle de lui-même | Aucun ("I"/"we" interdits) | `saas-app-shopify/storemd/context.md` §11 |

### 4.2 Par plateforme

| Plateforme | Longueur | Format lien | Hashtags | Spécificité |
|-----------|---------|------------|---------|------------|
| Twitter | 100-280 car. | REPLY (format 2-blocs) | 0 | Thread possible (5 tweets max) |
| LinkedIn | 800-1300 car., 1 phrase/ligne | Commentaire ou Featured bio | 0-3 niche | Carrousel possible |
| TikTok | Caption courte | Lien bio | 0 (keywords caption/audio/overlay) | VIDÉO obligatoire, natif |
| Instagram | Caption moyenne | Lien bio | 5 max niche | Reel (recyclé TikTok) ou carrousel |
| Facebook | Caption moyenne | Commentaire | 2-3 max | Reel (recyclé TikTok) |
| IH | Long-form | Dans le corps | 0 | Focus produit |

### 4.3 UTM

Chaque lien publié = UTM obligatoire. **Ne JAMAIS écrire un lien de mémoire** — toujours copier-coller depuis la source de vérité : `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`

Format URL obligatoire : `https://storemd.vercel.app/?utm_source=...` (avec `https://` et `/` avant `?`)

| Placement | UTM complet |
|-----------|------------|
| Twitter — post organique (lien en self-reply) | `utm_source=twitter&utm_medium=organic&utm_campaign=feature_launch&utm_content=post` |
| Twitter — reply engagement (tweet de quelqu'un d'autre) | `utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta` |
| Twitter — thread | `utm_source=twitter&utm_medium=organic&utm_campaign=thread&utm_content=thread_cta` |
| Twitter — bio | `utm_source=twitter&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| LinkedIn — post organique (lien en commentaire) | `utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post` |
| LinkedIn — article | `utm_source=linkedin&utm_medium=organic&utm_campaign=article&utm_content=article_cta` |
| TikTok — bio | `utm_source=tiktok&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| TikTok — vidéo CTA | `utm_source=tiktok&utm_medium=organic&utm_campaign=video&utm_content=video_cta` |
| Instagram — bio | `utm_source=instagram&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| Facebook — post page StoreMD | `utm_source=facebook&utm_medium=organic&utm_campaign=post&utm_content=post_cta` |
| IH — post | `utm_source=indiehackers&utm_medium=organic&utm_campaign=post&utm_content=post_cta` |

Pour tout autre placement (DM cold, ads, bio par compte), consulter le fichier UTM de référence.

### 4.4 ANTI-IA (obligatoire)

Avant de livrer un post, vérifier :
- Pas d'em-dash ( — ) comme pivot de phrase
- Pas de "Not X — it's Y" ou variantes
- Pas de cadence fixe contexte → solution → question ouverte
- Pas de listes numérotées dans les posts
- Pas de "Here's the thing:", "The reality is", "At the end of the day", "So,", "Look,", "Honestly,"
- Contractions obligatoires (don't, won't, I've, it's) pour les comptes perso
- Phrases de longueurs variées, jamais 5 d'affilée de même longueur

### 4.5 Cohérence texte/vidéo

Si un post a une vidéo associée :
- Lire le PROMPT de la vidéo (dans asset-brand/storemd/videos/ ou le fichier carrousel)
- Le texte du post doit COLLER avec ce que la vidéo montre
- Le prompt de la vidéo est noté dans le champ "Notes" du post
- Ne jamais écrire un texte qui contredit ce que la vidéo montre

### 4.6 Intégrité données (BIBLE §3)

- JAMAIS de faux MRR, faux nombre de clients, faux testimonials
- Métriques canon StoreMD : voir `saas-app-shopify/storemd/context.md` §15
- Statistiques agrégées e-com OK (marges marketing)
- Scénarios illustratifs OK (pas de noms réels)

### 4.7 Sélection des vidéos

Chaque jour de la semaine a un THÈME. Le thème est défini par la vidéo/carrousel TikTok StoreMD du jour. Tous les posts du jour doivent être cohérents avec ce thème.

**Process de sélection :**

1. Choisir la vidéo TikTok StoreMD du jour EN PREMIER — c'est elle qui définit le thème
2. Lire le PROMPT complet de la vidéo dans le fichier source (V2 ou V3) pour comprendre ce qu'elle montre
3. Choisir une vidéo V1 pour le tweet F — cohérente avec le thème, angle technique
4. Choisir une vidéo V1 pour le tweet R — cohérente avec le thème, angle business
5. La vidéo V1 de F et R PEUT être la même si c'est cohérent (angles différents, même sujet)
6. La vidéo StoreMD Twitter PEUT recycler la même vidéo que TikTok si c'est cohérent (même compte StoreMD)
7. Instagram et Facebook recyclent TOUJOURS la vidéo/carrousel TikTok du jour (re-export sans watermark)

**Règles de nommage dans le batch :**

- V1 : toujours le nom exact `store-md-[nom]` (ex: `store-md-horror-slow-store`)
- V2 : toujours `VIDÉO N — "Titre complet"` + chemin fichier source (ex: `VIDÉO 1 — "43 Features. One App. Nobody Comes Close."`)
- V3 : idem format V2 (ex: `VIDÉO 13 — "Watch a Real Scan. Sound On."`)
- Carrousels : nom du dossier + nombre de slides (ex: `Carrousel "Gains Potentiels" — 6 slides`)
- Recyclage : toujours préciser "(recyclé TikTok, re-export sans watermark)"
- Ne JAMAIS écrire "aucun (texte seul)" si une vidéo V1 cohérente avec le thème existe

**Cohérence texte/vidéo :**

- Le texte du post doit COLLER avec ce que la vidéo montre
- Si la vidéo montre du ghost billing, le texte parle de ghost billing
- Si la vidéo montre une démo scan, le texte parle du scan
- Ne jamais écrire un texte qui contredit ou ignore ce que la vidéo montre
- Le prompt de la vidéo est noté dans le champ "Notes" de chaque post

---

## 5. DISPATCHER

Une fois le batch central validé par R :

| Section du batch central | Destination |
|------------------------|------------|
| Posts comptes perso R | `romain/publication/batch-semaine.md` |
| Posts comptes perso F | `fabrice/publication/batch-semaine.md` |
| Posts comptes StoreMD | `saas-app-shopify/storemd/publication/batch-semaine.md` |

Chaque fichier dispatch contient UNIQUEMENT les posts du compte concerné. Même format que le batch central.

### Process dispatch

1. Batch central validé par R → "go"
2. Copier les posts R → romain/publication/batch-semaine.md
3. Copier les posts F → fabrice/publication/batch-semaine.md
4. Copier les posts StoreMD → saas-app-shopify/storemd/publication/batch-semaine.md
5. Confirmer à R que le dispatch est fait

Jamais de dispatch sans validation du batch central.

---

## 6. ARCHIVER (fin de semaine)

Quand la semaine est terminée (vendredi soir ou samedi avant le nouveau batch) :

1. Copier le batch central dans `archives/batches/batch-semaine-S[N].md`
2. Vider le contenu des 3 fichiers dispatch (garder les headers/tableaux vides)
3. Vider le batch central (garder le header, prêt pour le nouveau batch)
4. Les fichiers dispatch ne sont PAS archivés — le batch central contient tout

Cette étape sera automatisée via la commande `/archivage` (Phase 6).

---

## 7. NOMBRE DE POSTS PAR SEMAINE

### Total hebdomadaire

| Compte | Plateforme | Fréquence | Posts/sem |
|--------|-----------|-----------|---------|
| StoreMD | TikTok | 7/7 | 7 |
| StoreMD | Instagram | 7/7 | 7 |
| StoreMD | Facebook | 7/7 | 7 |
| StoreMD | Twitter | Lun-ven | 5 |
| StoreMD | IH | Mercredi | 1 |
| R perso | Twitter | Lun-ven | 5 |
| R perso | LinkedIn | Mar + jeu | 2 |
| F perso | Twitter | Lun-ven | 5 |
| F perso | LinkedIn | Mer + ven | 2 |
| **TOTAL** | | | **41** |

### Recyclage

- TikTok = source vidéo
- Instagram = recyclé TikTok (re-export sans watermark, même jour à 18h)
- Facebook = recyclé TikTok (même jour à 18h30)
- Twitter StoreMD = texte seul (pas de recyclage vidéo)
- IH = texte long-form (pas de recyclage vidéo)

Donc en RÉDACTION réelle :
- 7 vidéos/captions TikTok (recyclées sur Insta + FB = 21 posts pour 7 rédactions)
- 5 tweets StoreMD
- 1 post IH
- 5 tweets R + 2 LinkedIn R
- 5 tweets F + 2 LinkedIn F
- **Total rédaction : 27 posts uniques pour 41 publications**

---

## 9. SCALABILITÉ

Quand un nouveau business arrive (høkuno, ProfitPilot) :
1. Ajouter ses horaires dans §1
2. Ajouter ses sources dans §2
3. Ajouter ses comptes dans §7
4. Ajouter une section dans le batch central
5. Créer un fichier dispatch dans le dossier du business
6. Le format du post (§3) et les règles (§4) restent les mêmes

---

## 8. CHECKLIST VALIDATION UTM — AVANT LIVRAISON DU BATCH

Vérifier CHAQUE lien UTM du batch avant de soumettre à R pour validation :

1. Le lien existe à l'identique dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`
2. Format URL : `https://storemd.vercel.app/?utm_source=...` (avec `https://` et `/` avant `?`)
3. Twitter posts organiques = `feature_launch` / `post` — PAS `reply` (réservé à l'engagement sur les tweets des autres)
4. LinkedIn posts organiques = `post` / `cta_post` — PAS `post_cta`
5. En cas de doute → ouvrir le fichier UTM de référence et chercher le placement exact

Le mapping complet est en section 4.3.
