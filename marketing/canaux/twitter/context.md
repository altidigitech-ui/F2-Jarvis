# CONTEXT TWITTER/X — Comptes R perso + F perso + StoreMD

**Dernière mise à jour :** 05/05/2026
**Hérite de :** `BIBLE.md` + `ANTI-IA.md` + `marketing/strategie.md`
**S'appuie sur :** `marketing/canaux/twitter/algo.md` (mécanique algorithmique, code open-source X, 286 lignes)
**Ce fichier contient :** stratégie, usage, cold, publication, format tweets, profils, métriques Twitter.

---

## 1. RÔLE DE TWITTER DANS L'ÉCOSYSTÈME

Twitter est un canal d'**acquisition** (cold DM aux merchants Shopify) et de **publication** (posts focus produit depuis 3 comptes). Ce n'est pas le canal cold le plus rentable — les merchants Shopify sont davantage sur TikTok, Instagram et Facebook — mais on le maintient comme canal d'acquisition supplémentaire et de visibilité.

Priorité Twitter dans le stack cold : R = 5ème position, F = 4ème position.

Twitter sert aussi la **crédibilité** : un VC, un partenaire, un journaliste qui Google F ou R doit voir un compte vivant et expert.

---

## 2. COMPTES ET USAGE

| Compte | Handle | Cold | Publication | Engagement proactif |
|--------|--------|------|-------------|---------------------|
| **R** | @delgado_ro72224 | ✅ 10 DMs/jour | ✅ 1/jour lun-ven | ❌ Zéro |
| **F** | @FabGangi | ✅ 10 DMs/jour | ✅ 1/jour lun-ven | ❌ Zéro |
| **StoreMD** | @[handle StoreMD] | ❌ Pas de cold | ✅ 1/jour lun-ven | ❌ Zéro |

**Pas de compte @foundrytwo.** F2 comme voix séparée n'existe plus (BIBLE v3.0 §8).

**Capacités réelles** : F et R ont les mêmes capacités techniques. La séparation builder (F) / growth (R) est une image publique, pas une vraie séparation des rôles.

**Langue** : 100% anglais.

---

## 3. COLD — 10 DMs/JOUR PAR PERSONNE (comptes perso R+F)

### Cible

Merchants qui ont une boutique Shopify. Uniquement. BIBLE §5 : ciblage logique par produit.

### Source de cibles

**Grok**. Prompt de recherche : `saas-app-shopify/recherche/cold/grok/twitter/prompt-recherche.md`. Résultats dans `recherche-log.md`.

**Grok peut halluciner des handles.** Vérifier chaque handle manuellement sur x.com avant d'envoyer le DM.

### Templates

Templates cold dans `saas-app-shopify/storemd/cold/cold-templates.md`. Section R (angle business) et section F (angle technique accessible).

### Règles

- Tout en DM direct. Pas de reply publique cold.
- Lien landing page (storemd.vercel.app) OK dans le premier DM.
- Lien d'installation beta = APRÈS réponse du merchant seulement.
- 1 seul DM initial. Pas de relance si pas de réponse.
- Logger dans `romain/cold/cold-log-twitter.md` (R) ou `fabrice/cold/cold-log-twitter.md` (F).

---

## 4. PUBLICATION — 1/JOUR LUN-VEN × 3 COMPTES

### Cadence

| Compte | Fréquence | Total/sem |
|--------|-----------|-----------|
| R (@delgado_ro72224) | 1/jour lun-ven | 5 |
| F (@FabGangi) | 1/jour lun-ven | 5 |
| StoreMD | 1/jour lun-ven | 5 |
| **Total** | | **15 posts/sem** |

### Process

Tout est batché le samedi et schedulé. En semaine on ne rédige pas. Horaires différents par compte pour ne pas publier en même temps.

### Voix

- **R** (@delgado_ro72224) : "I", angle business, growth, conversion, observations terrain. Détail dans `romain/VOIX.md`.
- **F** (@FabGangi) : "I", angle technique accessible pour merchants (pas pour devs). Détail dans `fabrice/VOIX.md`.
- **StoreMD** : ton neutre produit. Le produit parle de lui-même. Pas de "I" ni de "we".

### Règles de publication

- **JAMAIS de lien dans le corps du tweet.** Lien en reply uniquement (format 2-blocs, cf. §5).
- Pas de hashtag. ZÉRO. Grok catégorise sémantiquement, les hashtags sont obsolètes pour le routage.
- Pas de pitch direct dans chaque post. Le contenu doit avoir de la valeur standalone.
- Contractions obligatoires en anglais (don't, won't, I've, it's).
- ANTI-IA appliqué sans exception.
- Ton constructif. Grok analyse le sentiment — contenu négatif/combatif = réduit même si engagement élevé.

---

## 5. FORMAT 2-BLOCS — RÈGLE ABSOLUE

**Lien dans le corps du tweet = -1700% de reach.** A/B test documenté.

### Structure obligatoire pour tout post avec CTA lien

**BLOC 1 — POST (à publier / scheduler)** :
```
[Texte du tweet SANS URL. CTA se termine par la phrase d'accroche seule.
Exemple : "Free scan, 60 seconds."]
```

**BLOC 2 — REPLY (à publier MANUELLEMENT après publication du post)** :
```
[URL UTM tagué + phrase courte]
Exemple : "Scan your store here: https://storemd.vercel.app/?utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta"
```

### Threads

La reply URL s'attache au **dernier tweet** du thread, pas au premier.

### Posts sans CTA lien

Si le post est purement engagement (observation, question, opinion), pas de reply lien. Format simple, un seul tweet.

---

## 6. FORMAT TWEETS

### Tweet observation (format principal)

```
[Affirmation choc en 1 ligne]

[Développement 2-3 lignes : pourquoi, données, expérience]

[Question ouverte ou statement provoquant]
```

100-260 caractères. Pas plus sauf threads.

### Exemple @FabGangi (angle technique)

```
Most "Shopify speed apps" make your store slower.

The reason: they inject 200-500KB of JS each, including the ones that promise to "optimize" your speed. I scanned 30 stores last week. The slowest 5 had the most "speed apps" installed.

Counterintuitive but consistent.
```

### Exemple @delgado_ro72224 (angle growth)

```
71% of chargebacks are friendly fraud. Not real fraud — customers who got the product, kept it, then disputed.

Most merchants don't know this. They eat the loss because fighting feels useless.

Mastercard data 2025.
```

### Thread (4-8 tweets)

```
Tweet 1 : Hook + promesse
Tweet 2-6 : 1 idée par tweet, données concrètes
Tweet 7 : Conclusion / takeaway
Tweet 8 : Reply avec lien UTM (format 2-blocs)
```

Les threads génèrent 3x l'engagement d'un tweet solo. Chaque reply bumpe le score et mitige le time decay.

### Tweet pure engagement (sans CTA lien)

```
[Observation pointue 1-2 phrases]

[Question ouverte ou retournement]
```

Pas de reply URL. Pas obligatoire de mettre un lien à chaque tweet.

---

## 7. PREMIUM — OBLIGATOIRE

Premium à 8$/mois est le ticket d'entrée sur Twitter. Sans Premium :
- Les posts avec liens sont invisibles (0% engagement pour les comptes free)
- Le reach organique est quasi nul (~100 impressions vs ~600 avec Premium)
- Les replies sont enterrées sous celles des comptes vérifiés

Premium = multiplicateur 2-4x, pas générateur. Le contenu doit être bon.

**Les 3 comptes (R, F, StoreMD) doivent être Premium.**

---

## 8. BIO ET PROFILS

Chaque compte a un lien permanent dans la bio vers `storemd.vercel.app` avec UTM bio.

| Compte | Bio |
|--------|-----|
| @FabGangi | "Building StoreMD. Auditing Shopify stores. Sharing what I find." + lien UTM bio |
| @delgado_ro72224 | "Growth + conversion for Shopify merchants. Co-founder StoreMD." + lien UTM bio |
| StoreMD | "AI agent that scans Shopify store health in 60 seconds. 43 checks, 5 modules. Free tier." + lien UTM bio |

Le lien bio est le seul lien permanent visible. La bio doit convertir les profile visits en clics vers le site.

---

## 9. RÉPONSES

**Reply engagée par l'auteur = 150x un like.** C'est LE signal algorithmique le plus puissant sur Twitter.

On répond :
- À CHAQUE reply sur nos tweets (R, F, StoreMD) qui mérite une réponse (pas les bots, pas les "lol")
- Aux DMs reçus (merchants qui répondent au cold ou qui nous contactent)
- Délai : le plus vite possible. Rester actif 60 min après chaque post.

On ne fait PAS :
- D'engagement proactif (commenter les tweets des autres)
- De likes/retweets stratégiques
- De cross-engagement entre comptes R/F/StoreMD

### Workflow Jarvis

1. Notification reply sur un tweet
2. Screenshot envoyé à Jarvis si besoin
3. Jarvis propose 2 variantes dans la voix de la persona
4. R ou F publie

### Cas particuliers

- Reply provocatrice/négative → répondre calmement, factuellement. Ne pas escalader. Le sentiment négatif est down-ranked par Grok.
- Reply qui demande info/démo → basculer en DM si pertinent, envoyer un scan boutique sur mesure.
- Reply spam/bot → block sans hésiter. Block ne pénalise pas notre compte.

---

## 10. UTM TAGGING

| Placement | UTM |
|-----------|-----|
| Bio R / F / StoreMD | `utm_source=twitter&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| Reply après tweet (format 2-blocs) | `utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta` |
| Thread (lien dans dernier tweet) | `utm_source=twitter&utm_medium=organic&utm_campaign=thread&utm_content=thread_cta` |
| DM cold outreach | `utm_source=twitter&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

Pour tout placement non listé dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, l'ajouter d'abord au fichier officiel.

---

## 11. MÉTRIQUES

### Stats natives X (hebdo)

| Métrique | Pourquoi |
|----------|----------|
| Impressions par post | Reach |
| Engagement rate (likes + replies + RT) | Performance globale |
| Replies | Signal le plus fort (27x like, 150x si répondu) |
| Quote tweets | 25x like |
| Bookmarks | Signal silencieux puissant (20x like) |
| Profile visits | Funnel : post → profil |
| Bio link clicks | Funnel : profil → site |
| Followers gagnés | Réseau qui grandit |

### Conversions (dashboard admin StoreMD)

| Métrique | Source |
|----------|--------|
| Visites depuis Twitter | Dashboard admin → Traffic by Source → `twitter` |
| Visites par campagne (reply / thread / dm) | Dashboard admin → Traffic by Campaign |
| Installs depuis Twitter | Dashboard admin → Recent Merchants → `utm_source=twitter` |

---

## 12. ANTI-PATTERNS

### Spécifiques Twitter

| Interdit | Pourquoi |
|----------|----------|
| Lien dans le corps du tweet | -1700% reach. TOUJOURS format 2-blocs. |
| Hashtags | ZÉRO. Grok catégorise sémantiquement. 3+ = -40% reach. |
| Ne pas répondre aux replies | On rate le signal 150x. |
| Engager dans des threads combatifs/négatifs | Sentiment négatif down-ranked par Grok. |
| Tweet > 280 chars forcé en thread de 2-3 tweets | Si 1 idée tient en 280 chars = 1 tweet. Si thread = 5+ tweets. |
| Mention de bot/automatisation visible | Signal spam. |
| Surposting (10 tweets en 5 min) | Spam detection, diminishing returns. |
| Supprimer et reposter le même contenu | Trigger spam detection. |
| Mass-follow/unfollow | Détruit le TweepCred. |

### Règles communes

| Interdit | Pourquoi |
|----------|----------|
| Em-dash, "Here's the thing", "Not X — it's Y" | Pattern IA #1. Cf. `ANTI-IA.md` |
| "At the end of the day", "Which means", "However,", "Furthermore," | Patterns IA bannis |
| Formes longues en anglais ("do not", "will not") | Utiliser contractions ("don't", "won't") |
| Listes numérotées dans les tweets | Style trop formel pour Twitter |
| Inventer des chiffres / résultats | BIBLE §3 |
| Mentionner Altistone / La Toile | BIBLE §2 |
| Cibler des devs, SaaS builders, indie hackers | BIBLE §5 |

---

## 13. DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Algo Twitter | `marketing/canaux/twitter/algo.md` |
| Stratégie marketing globale | `marketing/strategie.md` |
| Objectifs et KPIs | `marketing/objectifs.md` |
| Réponses commentaires Jarvis | `marketing/jarvis/reponses-commentaires.md` |
| Prompt Grok recherche | `saas-app-shopify/recherche/cold/grok/twitter/prompt-recherche.md` |
| Recherche-log | `saas-app-shopify/recherche/cold/grok/twitter/recherche-log.md` |
| Cold-log R | `romain/cold/cold-log-twitter.md` |
| Cold-log F | `fabrice/cold/cold-log-twitter.md` |
| Cold templates | `saas-app-shopify/storemd/cold/cold-templates.md` |
| Context StoreMD | `saas-app-shopify/storemd/context.md` |
| Voix R | `romain/VOIX.md` |
| Voix F | `fabrice/VOIX.md` |
| UTM tracking | `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` |
| ANTI-IA | `ANTI-IA.md` |
| BIBLE | `BIBLE.md` |
