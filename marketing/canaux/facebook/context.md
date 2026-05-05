# CONTEXT FACEBOOK — Comptes R perso + F perso + StoreMD

**Dernière mise à jour :** 05/05/2026
**Hérite de :** `BIBLE.md` + `ANTI-IA.md` + `marketing/strategie.md`
**S'appuie sur :** `marketing/canaux/facebook/algo.md` (données algorithmiques objectives)
**Ce fichier contient :** stratégie, usage, cold, engagement groupes, publication, production, métriques Facebook.

---

## 1. RÔLE DE FACEBOOK DANS L'ÉCOSYSTÈME

Facebook est un canal d'**acquisition** à double levier :
1. **Cold DM** aux merchants Shopify identifiés dans les groupes (comptes perso R+F)
2. **Engagement dans les groupes Shopify** pour construire la crédibilité et identifier les cibles (comptes perso R+F)

Et un canal de **publication** via le compte StoreMD (Reels recyclés TikTok).

Priorité Facebook dans le stack cold : 3ème position (après TikTok et Instagram).

**Avantage unique Facebook** : les groupes Shopify sont les seuls espaces sur les réseaux sociaux où les merchants sont **auto-identifiés et pré-qualifiés**. Pas besoin de deviner si quelqu'un a une boutique Shopify — ils postent leurs problèmes, leurs questions, leurs URLs. Le reach dans les groupes (40-50% des membres) écrase le reach des Pages (1.37-2%).

---

## 2. COMPTES ET USAGE

| Compte | Type | Cold | Engagement groupes | Publication | Republication StoreMD |
|--------|------|------|-------------------|-------------|----------------------|
| **R** (Romain Delgado) | Profil perso | ✅ 10 DMs/jour | ✅ Groupes Shopify | ❌ Pas de contenu original | ✅ Republication posts StoreMD |
| **F** (Fabrice Gangitano) | Profil perso | ✅ 10 DMs/jour | ✅ Groupes Shopify | ❌ Pas de contenu original | ✅ Republication posts StoreMD |
| **StoreMD** | Page produit | ❌ Pas de cold | ❌ Pas dans les groupes | ✅ 1/jour lun-ven | — |

**R et F ne créent PAS de contenu original sur Facebook.** Ils republiant le contenu de la page StoreMD sur leurs profils perso. Leur activité propre se fait dans les groupes (engagement + cold DM).

**Contrainte beta** : StoreMD n'est pas encore sur le Shopify App Store. Les merchants doivent DM et on donne le lien d'installation manuellement.

---

## 3. COLD — 10 DMs/JOUR PAR PERSONNE (comptes perso R+F)

### Cible

Merchants qui ont une boutique Shopify. Identifiés dans les groupes Shopify. BIBLE §5 : ciblage logique par produit.

### Source de cibles

Claude Chrome. Prompt de recherche : `saas-app-shopify/recherche/cold/chrome/facebook/prompt-recherche.md`. Résultats dans `recherche-log.md`. Les groupes Shopify sont le vivier principal — les merchants y postent leurs problèmes et leurs URLs.

### Templates

Templates cold dans `saas-app-shopify/storemd/cold/cold-templates.md`.

### Workflow cold Messenger (SCAN AVANT DM)

Le cold Facebook est le plus puissant de tous les canaux parce qu'on peut **scanner la boutique du merchant AVANT de le contacter**. Les merchants postent leurs URLs dans les groupes. On scanne, on envoie de VRAIS résultats. Pas un pitch générique.

1. Identifier un merchant dans un groupe Shopify (post avec problème ou URL)
2. Scanner sa boutique avec StoreMD
3. DM Messenger avec les résultats réels du scan

Format DM type :
```
Hey [prénom], saw your post in [nom du groupe] about [problème exact].
I ran a quick scan on [boutique URL] — found these 3 things that might help:
- [Finding 1 avec chiffre]
- [Finding 2 avec chiffre]
- [Finding 3 avec chiffre]

Happy to share the full report (free) if useful. Lmk.
```

### Règles cold

- Toujours scanner la boutique AVANT d'envoyer le DM. Vrais résultats, pas de pitch générique.
- Lien landing page (storemd.vercel.app) OK dans le premier DM.
- Lien d'installation beta = APRÈS réponse du merchant seulement.
- 1 seul DM initial. Pas de relance si pas de réponse après J+3.
- Logger dans `romain/cold/cold-log-facebook.md` (R) ou `fabrice/cold/cold-log-facebook.md` (F).

---

## 4. ENGAGEMENT GROUPES — COMPTES PERSO R+F

L'engagement dans les groupes Shopify fait partie du pipeline d'acquisition. Ce n'est PAS du "engagement proactif" comme sur Twitter/LinkedIn. C'est le travail de terrain : être présent, apporter de la valeur, identifier les merchants, construire la crédibilité pour que les cold DMs soient accueillis favorablement.

### Règle 80/20

- **80% engagement de pure valeur** : réponses utiles, observations, questions, partage d'expérience SANS mentionner StoreMD
- **20% mentions contextuelles** : uniquement quand un merchant décrit EXACTEMENT un problème que StoreMD résout, et toujours après avoir donné de la valeur d'abord

### Format commentaire de valeur (sans mention StoreMD)

```
Same here. I audited ~40 stores last month and the #1 issue was actually [problème].
The fix that worked best: [solution actionnable].
What's worked for you?
```

### Format commentaire avec mention StoreMD (uniquement si problème exact évoqué)

```
That sounds like [problème spécifique]. I scanned a store with the same symptoms last week — turned out to be [diagnostic précis].
Worth checking these 3 things: [...].
If you want a free scan to identify exactly where it's coming from, I'm building a tool that does this: [lien]
```

### Ce qu'il faut repérer dans les groupes

Les posts qui mentionnent des problèmes = cibles premium pour StoreMD :
- "Why is my store slow?"
- "Which apps should I remove?"
- "My checkout conversion dropped"
- "How do I find broken links?"
- "Has anyone experienced ghost billing from apps?"

### Voix dans les groupes

Ce sont R et F en tant qu'humains, pas le compte produit.
- **Voix R** : business, growth, conversion ("here's what I see from the data...")
- **Voix F** : technique, analytique, builder ("here's what I see in the code...")

---

## 5. PUBLICATION — 1/JOUR LUN-VEN (page StoreMD)

### Cadence page StoreMD

| Format | Fréquence | Quand |
|--------|-----------|-------|
| Reels (recyclés TikTok) | 3-5/sem | Lun-ven, même jour ou jour suivant la TikTok |
| Posts photo/lien | 0-2/sem | Quand visuel statique pertinent (résultat scan, citation data) |
| Stories Facebook | 0-2/sem | Optionnel, moins prioritaire qu'Insta Stories |

Total : ~5 publications/semaine sur la page StoreMD.

### Republication sur les profils perso R+F

R et F republiant les posts de la page StoreMD sur leurs profils personnels. Ils ne créent PAS de contenu original pour Facebook. La republication donne de la visibilité au contenu StoreMD auprès du réseau perso de R et F (amis, contacts groupes).

### Recyclage TikTok → Facebook (page StoreMD)

1. Vidéo TikTok produite et publiée
2. Re-export depuis Remotion (PAS download depuis TikTok avec watermark — Originality Score pénalise)
3. Caption adaptée Facebook (peut être plus longue, 200-500 caractères, ton narratif accepté)
4. Lien OK dans le corps du post (Facebook pénalise moins que Twitter/LinkedIn mais les posts sans lien performent mieux)
5. Hashtags : 2-3 max, pertinents, pas de génériques
6. Publication sur la page `@storemd`

### Process

Tout est batché le samedi et schedulé. En semaine on ne rédige pas.

### Ton

Page StoreMD = ton neutre produit. Le produit parle de lui-même. Pas de "I" (R) ni de "we" (F2).

---

## 6. ALGO FACEBOOK 2026

Sources : recherche web avril 2026 (SocialBee, Metricool, RecurPost, Omnichat, EurosHub, WordStream, Meta Newsroom).

### Pipeline de ranking (4 étapes)

| Étape | Ce qui se passe |
|-------|----------------|
| **Inventory** | Facebook collecte les posts disponibles (amis, pages suivies, groupes, recommandations) |
| **Signals** | Qui a posté, quand, type de contenu, comportement utilisateur |
| **Predictions** | L'algo prédit la probabilité de like, comment, partage, watch complet |
| **Relevance score** | Score final qui détermine la position dans le Feed |

### Hiérarchie des signaux 2026

| Signal | Poids | Implication |
|--------|-------|-------------|
| **Private shares (Messenger/WhatsApp)** | #1 confirmé | "J'ai envoyé ça à un ami" = signal de valeur exceptionnel |
| **Saves** | Très fort | Signal de valeur durable |
| **Comments substantifs (back-and-forth)** | Fort | 20 commentaires de qualité > 200 likes |
| **Watch time + completion rate (Reels)** | Très fort | Ranking vidéo shifté de view counts vers completion rate (juillet 2025) |
| **Reactions (likes)** | Faible | Vanity metric en 2026 |

### Mécaniques clés 2026

- **Jusqu'à 50% du Feed = recommended content** (non-followers). Bon pour démarrer à zéro.
- **Reels = format dominant** : +135% reach vs photos. Toutes les vidéos uploadées = automatiquement des Reels.
- **Organic reach Pages = ~1.65-2%** en moyenne. Très bas. C'est pourquoi les groupes sont la goldmine.
- **Groups = 1.8 milliards d'utilisateurs mensuels**, distribution organique bien supérieure aux Pages.
- **6 premières heures critiques** : engagement précoce détermine 80% du potentiel viral.
- **Originality Score** : Reels avec watermark TikTok pénalisés.
- **Engagement bait pénalisé** : "Comment YES if you agree", "Like and share" = down-ranked.
- **Thematic consistency** : l'algo scanne les 9-12 derniers posts pour définir le "tag" du compte. `@storemd` = thème unique = bon signal.
- **98% des posts viraux n'ont PAS de liens externes** — Facebook déprioritise les liens. Lien en commentaire si nécessaire.

---

## 7. PAGES VS GROUPS VS PROFIL PERSO

| Surface | Reach organique | Engagement | Discovery | Usage pour nous |
|---------|----------------|------------|-----------|----------------|
| **Page** | 1.37-2% | Faible | Via Reels uniquement | Page StoreMD : publication |
| **Group** | 40-50% | Élevé (+30-50% vs Pages) | Dans le Feed des membres | Cold + engagement R+F |
| **Profil perso** | Plus élevé que Pages | Fort (amis réels) | Limité aux amis d'amis | Republication + groupes |

Le profil perso de R et F dans les groupes = le canal d'engagement et de cold principal.

### Double reach effect

Le contenu posté dans un groupe ranke dans le groupe ET peut spillover dans le Feed principal des membres. Un post de valeur dans un groupe Shopify touche potentiellement 40-50% des membres.

---

## 8. GROUPES SHOPIFY — LISTE

### Groupes actifs

| Groupe | Cible | Notes |
|--------|-------|-------|
| Shopify Entrepreneurs | Merchants Shopify généralistes | Groupe principal (~100K) |
| Shopify Newbies | Débutants Shopify | Audience moins qualifiée mais besoin éducatif fort (~100K) |
| Ecommerce Entrepreneurs | E-commerçants tous shops | Audience plus large (~50K) |
| Digital Distillery | Marketing digital | Haute activité (~148K) |
| Ecommerce Marketing (Privy) | Marketing e-com | (~20K) |
| Marketing Solved | Marketing | (~30K) |
| Superstar SEO | SEO | (~76K) |

### Groupes francophones

| Groupe | Cible |
|--------|-------|
| Shopify France | Merchants Shopify FR |
| E-commerce France | E-commerçants FR |
| Shopify Francophone | Communauté FR |
| Entrepreneurs Shopify | Communauté FR |

### Règle pour ajouter un groupe

Le groupe doit avoir une activité quotidienne réelle (5+ posts/jour) et des modérateurs raisonnables (pas de no-promo absolu). Tester en lecture pendant 1 semaine avant de poster.

---

## 9. FORMATS — DONNÉES PERFORMANCE 2026

### Content mix optimal

| Format | % | Rôle |
|--------|---|------|
| Reels + short video | 60-70% | Discovery, reach, non-followers |
| Carrousels + photos | 20-25% | Engagement Feed, dwell time |
| Texte + link posts | 10-15% | Conversations (reach limité) |

### Reels

- Format dominant : +135% reach vs photos
- Reels avec watch-through rate > 72% : 2.3x plus de distribution
- Page Reels surperforment les Page posts de 5-10x en reach
- Vertical 9:16, jusqu'à 90 secondes (3 min certains créateurs)
- Pas de watermark d'autres plateformes

### Carrousels

Sous-utilisés sur Facebook = opportunité. Formats pertinents pour StoreMD :
- Comparison : "Avant StoreMD vs Après StoreMD"
- Checklist : "10 leaks que StoreMD trouve"
- Tear-down visuel : screenshots commentés
- Data infographie

### Facebook Live

- Reach organique le plus élevé de tous les formats : 10-15% des followers
- Génère 10x plus de conversions que les posts réguliers
- Utilisé par seulement 12% des brands = sous-exploité
- L'algo donne un boost de notification (followers reçoivent une alerte)
- Pas de minimum de followers pour les Lives (contrairement à TikTok)
- Application possible : "Live Store Audit" — scanner un store en direct dans un groupe

---

## 10. TIMING & FRÉQUENCE

### Fenêtre critique

- **60 premières minutes** : engagement velocity détermine la trajectoire
- Répondre à CHAQUE commentaire dans la première heure
- First-hour engagement = 80% du potentiel viral du post

### Meilleurs créneaux B2B (audience US/EU)

| Créneau | Horaire |
|---------|---------|
| Weekday mornings | 8-10h EST / 14-16h CEST |
| Weekday evenings | 19-21h EST / 01-03h CEST |

Poster 30-60 minutes avant le pic d'activité.

### Cadence

- 1-2 posts/jour sur la page (sweet spot)
- 3-5 Reels/semaine minimum pour capitaliser sur le discovery engine
- Consistance > volume — l'algo récompense la régularité

---

## 11. PRODUCTION

### Specs techniques

| Élément | Spec |
|---------|------|
| Reels | Vertical 9:16, jusqu'à 90 secondes |
| Captions | 200-500 caractères (Facebook tolère plus long) |
| Hashtags | 2-3 max, pertinents |
| Liens | OK dans le corps mais performent mieux sans |

### Repurposing TikTok → Facebook

- Fichier master clean (sans watermark)
- Poster sur TikTok d'abord, puis Facebook 12-24h après
- Adapter la caption (Facebook tolère plus long et plus narratif)

### Stack production

| Outil | Usage |
|-------|-------|
| CapCut | Montage, auto-captions, effets |
| Remotion | Vidéos programmatiques batch |
| Higgsfield | UGC, vidéos marketing (forfait 50€) |
| Smartphone | Talking head, screen recording |

---

## 12. RÉPONSES

### Sur la page StoreMD

On répond :
- Aux commentaires sur NOS posts (page StoreMD)
- Aux DMs reçus sur la page
- Délai max : 2h (dans la première heure booste l'algo significativement)

Workflow Jarvis :
1. Screenshot du commentaire envoyé à Jarvis
2. Jarvis propose 2 variantes dans la voix `@storemd` (neutre, factuel)
3. R ou F valide, publie
4. Jarvis log automatique

### Sur les groupes (comptes perso)

Voix R ou F en tant qu'humain, pas le compte produit.
1. Screenshot du thread envoyé à Jarvis
2. Jarvis propose une réponse dans la voix de R ou F
3. R ou F valide, publie
4. Jarvis log

### Cas DM merchant intéressé

Si un merchant DM en demandant une démo ou en posant une question → scanner sa boutique, envoyer les vrais résultats, inclure le lien d'installation beta.

---

## 13. UTM TAGGING

| Placement | UTM |
|-----------|-----|
| Page about / link | `utm_source=facebook&utm_medium=bio&utm_campaign=page&utm_content=about_link` |
| Post organique page (Reel + photo + texte) | `utm_source=facebook&utm_medium=organic&utm_campaign=post&utm_content=post_cta` |
| Post dans groupe Shopify | `utm_source=facebook&utm_medium=organic&utm_campaign=group_shopify&utm_content=group_post` |
| Post dans groupe Ecommerce | `utm_source=facebook&utm_medium=organic&utm_campaign=group_ecommerce&utm_content=group_post` |
| DM Messenger | `utm_source=facebook&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

Pour tout placement non listé dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, l'ajouter d'abord au fichier officiel.

---

## 14. MÉTRIQUES

### Page StoreMD (stats natives + dashboard admin)

| Métrique | Source |
|----------|--------|
| Page reach (Reels + posts) | Facebook Page Insights |
| Watch time + completion rate Reels | Facebook Page Insights |
| Private shares (Messenger/WhatsApp) | Facebook Page Insights — signal #1 |
| Saves | Facebook Page Insights |
| Comments + longueur | Facebook Page Insights |
| Likes page | Facebook Page Insights |
| Visites depuis Facebook | Dashboard admin → Traffic by Source → `facebook` |
| Installs depuis Facebook | Dashboard admin → Recent Merchants → `utm_source=facebook` |

### Groupes Shopify (logs Jarvis)

| Métrique | Source |
|----------|--------|
| Engagements quotidiens dans groupes | Logs Jarvis |
| Posts originaux dans groupes | Logs Jarvis |
| Réponses reçues (DM ou comments) | Logs Jarvis |
| Conversions par groupe | Dashboard admin → `utm_campaign=group_shopify` ou `group_ecommerce` |

### Comparaison Page vs Groupes

Jarvis sort chaque vendredi :
- Conversions page vs conversions groupes (UTM campaign distinct)
- Top 3 groupes par conversions
- Threads qui ont déclenché le plus de DM entrants

---

## 15. FONCTIONNALITÉS AVANCÉES

### Facebook Ads (pas prioritaire)

- Organic d'abord, paid ensuite quand base de contenu établie
- Meta AI-optimized campaigns : 31% mieux que les campagnes manuelles (Meta Advantage+ 2026)
- Reels Ads : CPM le plus bas ($6.20), CTR le plus élevé (1.35%)
- Les Reels les plus performants organiquement peuvent être boostés en Spark-style ads

### Content Monetization Program (CMP)

- Revenue share In-Stream Ads : Meta garde 45%, créateur garde 55%
- Eligibility In-Stream : 10 000 followers + 600 000 minutes vues en 60 jours
- Facebook Stars : 500 followers
- Pertinence pour nous : faible à court terme. L'objectif c'est le pipeline cold.

### Professional Mode

- Analytics avancées, outils monétisation, éligibilité recommandations Feed
- Requirements : compte 90+ jours, 10 000+ followers pour In-Stream
- À activer quand les followers augmentent

### Creator Fast Track (mars 2026)

- Programme Meta pour attirer les créateurs d'autres plateformes (100K+ followers)
- Pas applicable pour l'instant

---

## 16. ANTI-PATTERNS

### Page StoreMD

| Interdit | Pourquoi |
|----------|----------|
| Personal branding (R ou F en avant) | Compte produit pur |
| Watermark TikTok sur Reels recyclés | Originality Score = pénalité |
| Engagement bait ("Like and share!") | Pénalisé par l'algo 2026 |
| Cadence excessive faible qualité | Facebook 2026 favorise la qualité |

### Groupes Shopify (comptes perso)

| Interdit | Pourquoi |
|----------|----------|
| Pitch direct StoreMD dès le premier commentaire | Ban garanti |
| Mass commenting copy-paste sur 50 threads | Pattern spam détecté par les modérateurs |
| Copy-paste du même post dans plusieurs groupes le même jour | Cross-post detection Facebook |
| Mentionner StoreMD sans contexte de problème évoqué | Test 80/20 : 80% valeur sans mention |
| Liens DM en commentaire public ("DM me for the link") | Considéré spam |
| Persister après silence du merchant | Si pas de réponse après J+3, on lâche |
| Faux comptes / multi-accounting | Facebook détecte et ban tous les comptes liés |

### Règles communes

| Interdit | Pourquoi |
|----------|----------|
| Em-dash, "Here's the thing", "Not X — it's Y" | Détecté IA. Cf. `ANTI-IA.md` |
| Inventer des chiffres / résultats | Tout vient de scans réels. BIBLE §3 |
| Tagger d'autres comptes au hasard | Signal spam |
| Hashtags excessifs | Signal spam. 2-3 max |
| Gaps de publication 2+ semaines | Recovery window longue en 2026 |

---

## 17. DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Algo Facebook | `marketing/canaux/facebook/algo.md` |
| Algo et context TikTok (source vidéo) | `marketing/canaux/tiktok/` |
| Algo et context Instagram (canal jumeau) | `marketing/canaux/instagram/` |
| Stratégie marketing globale | `marketing/strategie.md` |
| Objectifs et KPIs | `marketing/objectifs.md` |
| Pipeline vidéo | `marketing/contenu/pipeline-video.md` |
| Réponses commentaires Jarvis | `marketing/jarvis/reponses-commentaires.md` |
| Prompt Chrome recherche | `saas-app-shopify/recherche/cold/chrome/facebook/prompt-recherche.md` |
| Recherche-log | `saas-app-shopify/recherche/cold/chrome/facebook/recherche-log.md` |
| Cold-log R | `romain/cold/cold-log-facebook.md` |
| Cold-log F | `fabrice/cold/cold-log-facebook.md` |
| Cold templates | `saas-app-shopify/storemd/cold/cold-templates.md` |
| Context StoreMD | `saas-app-shopify/storemd/context.md` |
| UTM tracking | `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` |
| ANTI-IA | `ANTI-IA.md` |
| BIBLE | `BIBLE.md` |
