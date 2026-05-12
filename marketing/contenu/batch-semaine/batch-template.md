# BATCH TEMPLATE — Mode d'emploi

> Ce fichier explique comment produire le batch de la semaine. Jarvis ou toute IA qui lit ce fichier doit suivre CHAQUE étape dans l'ordre.
> Le batch est produit le SAMEDI. En semaine on ne rédige pas — on exécute (copier-coller + publier).
> Source de vérité principes : `../../BIBLE.md` + `../../ANTI-IA.md`
> Dernière mise à jour : 10/05/2026

---

## 0. RED LINES — À LIRE EN PREMIER

Ces règles sont NON-NÉGOCIABLES. Un post qui en viole une = post bloqué.

**Zéro donnée inventée.** Pas de faux nombre de scans, pas de faux montants, pas de faux clients, pas de faux résultats de scan. Si le chiffre n'est pas dans le context StoreMD §6 (hooks sourcés) ou dans `tracking/metrics/storemd-admin.md` (métriques produit), il n'existe pas.

**Zéro feature vendue qui n'est pas live.** Décrire ce que le produit fait MAINTENANT en production. Pas ce qu'il fera un jour.

**Zéro "real scan" / "real store" / "real numbers" sur du contenu fictif.** Si le scan n'a pas vraiment eu lieu et n'est pas documenté dans l'admin, ne pas écrire "real".

**Marketing ≠ mensonge.** Tu peux et tu dois vendre fort. Exemples :

- ✅ "Privy facture $29/mois après désinstall" → vrai, 40+ reviews le confirment
- ✅ "Chaque app inutile ajoute 200-500ms" → vrai, sourcé MUTATIONS.md
- ✅ "3 apps fantômes = 600ms-1.5s de load time gaspillé" → calcul basé sur des données réelles
- ❌ "Scanné 8 stores pour une agence, trouvé $1,400 de ghost billing" → fiction présentée comme un fait vécu
- ❌ "68 stores scannés, $12,400 de leaks" → faux chiffres présentés comme "real numbers"

La règle : chaque chiffre doit pouvoir être retracé jusqu'à une source (reviews, research, admin dashboard, MUTATIONS.md). Si tu ne peux pas pointer la source, tu ne publies pas le chiffre. Être subtil c'est combiner des données réelles pour créer un impact marketing. Mentir c'est inventer des résultats.

---

## 0.1 STYLE OBLIGATOIRE

**Emojis :** minimum 1 par post, maximum 3. Positionnés en fin de ligne ou en tête de bloc. Jamais en milieu de phrase.

**Variété de structure :** interdiction de faire 5 posts consécutifs avec le même rythme (problème → feature → CTA). Alterner les angles d'attaque : data-drop, question, comparaison, démonstration, provocation.

**Hashtags :** copier-coller UNIQUEMENT depuis `saas-app-shopify/hashtags.md`. Ne JAMAIS inventer de hashtags. Si un hashtag n'est pas dans le fichier, il n'est pas utilisé.

**Pas de listes numérotées** dans les posts Facebook et Reddit (pattern IA détectable, ANTI-IA.md).

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

### Métriques à jour (OBLIGATOIRE avant de rédiger)

- Métriques produit : ouvrir `/dashboard/admin` et mettre à jour `tracking/metrics/storemd-admin.md`
- Métriques réseaux sociaux : collecter les stats de chaque plateforme et mettre à jour `tracking/metrics/[plateforme].md`
- Context StoreMD §6 hooks : vérifier que les chiffres utilisés dans les posts sont dans le tableau hooks avec leur source

Sans ces mises à jour, ne pas commencer la rédaction du batch.

---

## 3. FORMAT D'UN POST

### 3.1 Header (metadata)

Chaque post du batch suit EXACTEMENT ce format. Rien de plus, rien de moins.

**Twitter (pas de hashtags) :**

#### ID — Compte (@handle) — Twitter — Jour JJ/MM HHhMM

**Vidéo :** nom exact de l'asset (ou rien si texte seul)
**UTM :** `lien complet copié depuis tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`

**Instagram (hashtags + UTM bio) :**

#### ID — StoreMD — Instagram — Jour JJ/MM HHhMM

**Vidéo :** nom exact de l'asset (+ format si recyclé : re-export sans watermark, 1080×1350)
**Hashtags :** copiés depuis `saas-app-shopify/hashtags.md`
**UTM bio :** `lien complet copié depuis tracking/utm/`

**TikTok (pas de hashtags, UTM bio) :**

#### ID — StoreMD — TikTok — Jour JJ/MM HHhMM

**Vidéo :** nom exact de l'asset (ou **Carrousel :** nom exact + nombre de slides + fichier prompt)
**UTM bio :** `lien complet copié depuis tracking/utm/`

**Facebook (hashtags + UTM post) :**

#### ID — StoreMD — Facebook — Jour JJ/MM HHhMM

**Vidéo :** nom exact de l'asset (+ format si recyclé)
**Hashtags :** copiés depuis `saas-app-shopify/hashtags.md`
**UTM :** `lien complet copié depuis tracking/utm/`

**LinkedIn (pas de hashtags) :**

#### ID — Compte (Prénom Nom) — LinkedIn — Jour JJ/MM HHhMM

**Vidéo :** nom exact de l'asset (ou rien si texte seul)
**UTM :** `lien complet copié depuis tracking/utm/`

**IH (pas de hashtags) :**

#### ID — StoreMD — IndieHackers — Jour JJ/MM HHhMM

**UTM :** `lien complet copié depuis tracking/utm/`

**NE PAS ajouter :** Registre, Douleur, Cohérence jour, Hook ref, Statut, Notes, ou tout autre champ. Le header est minimal. Le texte parle de lui-même.

### 3.2 Format du texte

**Sauts de ligne :** aller à la ligne à chaque changement d'idée. Pas de pavé. Ligne vide entre chaque bloc logique.

**Emojis :** minimum 1 par post, maximum 3. En fin de ligne ou en fin de bloc. Jamais en milieu de phrase.

**Emphase :** majuscule sur UN mot pour insister (ex: "And that's ONE app"). Jamais de phrases entièrement en majuscules.

**CTA :** toujours sur sa propre ligne en fin de post.

**Règle 2-blocs (Twitter UNIQUEMENT) :** le texte dans un bloc, le lien reply dans un bloc séparé. Le lien n'est JAMAIS dans le corps du tweet.

**LinkedIn, Facebook, TikTok, Instagram, IH :** le lien UTM est intégré en fin de post, dans le texte. Pas de bloc séparé, pas de commentaire séparé.

**Traduction :** traduction française obligatoire après chaque texte, pour validation par R avant publication.

### 3.3 Exemples de mise en forme — À REPRODUIRE

Le fichier `batch-semaine-S9.md` (batch S9 corrigé) est le modèle de référence. Chaque batch doit reproduire le même niveau de mise en forme.

❌ NE PAS FAIRE :

43 features. 5 modules. 60 seconds 🔍 Speed issues, ghost billing, dead code, broken listings, AI readiness. Problems ranked by priority. Fixes included. Free beta access open.

✅ FAIRE :

43 features. 5 modules. 60 seconds 🔍

Speed issues, ghost billing, dead code, broken listings, AI readiness.

Problems ranked by priority. Fixes included.

Free beta access open.

---

❌ NE PAS FAIRE :

43 checks across 5 modules. Speed, billing, SEO, AI readiness, accessibility 🔍 One scan. 60 seconds. Every problem ranked by priority. Free beta in bio.

✅ FAIRE :

43 checks across 5 modules.

Speed
billing
SEO
AI readiness
accessibility 🔍

One scan. 60 seconds.
Every problem ranked by priority.

Free beta in bio.

---

Règles extraites de ces exemples :

- Chaque changement d'idée = saut de ligne
- Chaque bloc logique séparé par une ligne vide
- Chiffres clés ou features listés = chacun sur sa propre ligne, sans tirets ni puces
- Emoji sur le dernier élément d'un bloc, pas au milieu
- Deux phrases courtes complémentaires = groupées sur le même bloc
- CTA toujours isolé sur sa propre ligne en bas du post
- Pas de pavé. Si ça ressemble à un paragraphe, c'est mal formaté.

Ne touche à rien d'autre dans le fichier.

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

## 8. CHECKLIST VALIDATION — AVANT LIVRAISON DU BATCH

Vérifier CHAQUE lien UTM du batch avant de soumettre à R pour validation :

1. Le lien existe à l'identique dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`
2. Format URL : `https://storemd.vercel.app/?utm_source=...` (avec `https://` et `/` avant `?`)
3. Twitter posts organiques = `feature_launch` / `post` — PAS `reply` (réservé à l'engagement sur les tweets des autres)
4. LinkedIn posts organiques = `post` / `cta_post` — PAS `post_cta`
5. En cas de doute → ouvrir le fichier UTM de référence et chercher le placement exact

**Contenu :**

6. Chaque chiffre cité dans un post existe dans le repo avec une source traçable (§6 hooks, MUTATIONS.md, tracking/metrics/)
7. Chaque feature décrite est live en production actuellement
8. Au moins 1 emoji par post, max 3
9. Hashtags copiés depuis `saas-app-shopify/hashtags.md` (aucun hashtag inventé)
10. Au moins 3 structures d'attaque différentes dans le batch (pas 5x le même rythme)
11. Aucun post ne contient "real scan" / "real store" / "real numbers" sans scan réel documenté dans l'admin
12. Aucune donnée inventée (scans, montants, clients, résultats) — voir section 0 RED LINES

Le mapping UTM complet reste en section 4.3.
