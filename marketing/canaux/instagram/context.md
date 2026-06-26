# CONTEXT INSTAGRAM — Compte StoreMD

**Dernière mise à jour :** 05/05/2026
**Hérite de :** `BIBLE.md` + `ANTI-IA.md` + `marketing/strategie.md`
**S'appuie sur :** `marketing/canaux/instagram/algo.md` (données algorithmiques objectives)
**Ce fichier contient :** stratégie, usage, cold, publication, production, métriques Instagram.

---

## 1. RÔLE D'INSTAGRAM DANS L'ÉCOSYSTÈME

Instagram est un canal d'**acquisition** (cold DM aux merchants Shopify) et de **publication** (Reels recyclés depuis TikTok + carrousels). Ce n'est pas le canal prioritaire — TikTok est la source de contenu vidéo, Instagram recycle.

Priorité Instagram dans le stack cold : 2ème position (après TikTok, avant Facebook).

**Pourquoi recycler depuis TikTok** : économie de temps, cohérence du message, et l'audience Instagram chevauche partiellement l'audience TikTok mais pas complètement (skew légèrement plus âgé, plus visuel, plus orienté "save pour plus tard").

---

## 2. COMPTE ET USAGE

**Compte** : `@storemd` (compte produit Business). Pas de personal branding. R et F n'apparaissent pas en tant que fondateurs. R et F ont tous les deux accès au compte StoreMD.

**Cible** : merchants Shopify qui scrollent Instagram. Public légèrement plus âgé que TikTok, plus orienté "inspiration visuelle" et "save pour plus tard". Recherche via hashtags (#shopifystore, #smallbusinessowner, #packingorders), comptes similaires, et exploration.

**Contrainte beta** : StoreMD n'est pas encore sur le Shopify App Store. Les merchants ne peuvent pas la télécharger directement. Ils doivent DM le compte et on leur donne le lien d'installation manuellement.

### Usage principal : Cold

Instagram est un vivier de merchants Shopify qui postent du contenu autour de leur boutique. Le travail principal = trouver ces merchants via Apify et les contacter en cold DM.

### Usage secondaire : Publication

Reels, carrousels et posts pour faire vivre la page, nourrir l'algo, et établir la crédibilité StoreMD. Un prospect coldé ira vérifier le profil avant de répondre — il faut que le profil soit actif et professionnel.

---

## 3. COLD — 10 DMs/JOUR (compte StoreMD)

### Cible

Merchants qui ont une boutique Shopify. Uniquement. Pas de devs, pas d'agencies, pas de gurus. BIBLE §5 : ciblage logique par produit.

### Source de cibles

Apify.

### Templates

Templates cold dans `saas-app-shopify/storemd/cold/cold-templates.md`.

### Règles

- Tout en DM direct. Pas de commentaire cold sur les posts des merchants.
- Lien landing page (storemd.vercel.app) OK dans le premier DM.
- Lien d'installation beta = APRÈS réponse du merchant seulement.
- 1 seul DM initial. Pas de relance si pas de réponse.
- Logger dans `saas-app-shopify/storemd/cold/cold-log-instagram.md`

### Limites Instagram DM

- Pas de mass DM. Les bots et le mass outreach Instagram = compte banni ou shadow-ban garanti.
- Espacer les DMs de quelques minutes.
- DM personnalisé obligatoire (mentionner le produit/la boutique du merchant).

---

## 4. PUBLICATION — 1/JOUR LUN-VEN

### Cadence

| Format | Fréquence | Quand |
|--------|-----------|-------|
| Reels | 3-4/sem (recyclés depuis TikTok) | Lun-ven, même jour ou jour suivant la TikTok |
| Carrousels | 1-2/sem | Si format pertinent (checklist, comparison, before/after) |
| Stories | 3-5/sem | Résultats, tease d'un Reel, urgence beta |
| Posts photo statiques | 0-1/sem | Optionnel — visuels graphiques, infographies |

Total : ~5 publications/semaine sur le feed (Reels + carrousels). Stories en complément.

### Content mix optimal 2026

- **60-70% Reels** (découverte, reach, unconnected audience)
- **20-30% Carrousels** (engagement, saves, autorité)
- **~10% Images/culture posts** (humanisation, grille)

### Process

Tout est batché le samedi et schedulé pour la semaine. En semaine on ne rédige pas.

**Recyclage TikTok → Insta** :
1. Vidéo TikTok produite et publiée
2. Re-export depuis Remotion (PAS download depuis TikTok avec watermark — Originality Score pénalise)
3. Caption adaptée Instagram (plus longue, plus narrative que TikTok)
4. Hashtags : 5 max par post (enforced par Instagram depuis décembre 2025). Sets validés dans `saas-app-shopify/hashtags.md`
5. Publication Reel sur `@storemd` le même jour ou jour suivant

### Règles de publication

- Pas de lien cliquable dans les posts/Reels. Lien en bio et dans les Stories uniquement.
- 5 hashtags max par post. Sets validés dans `saas-app-shopify/hashtags.md`.
- Pas de pitch direct produit dans chaque post. Le contenu doit avoir de la valeur standalone.
- Contractions obligatoires en anglais.
- ANTI-IA appliqué sans exception.
- Pas de watermark TikTok. Toujours utiliser le fichier master clean.
- Poster sur TikTok d'abord, puis Reels 12-24h après.
- Ton neutre produit. Le produit parle de lui-même. Pas de "I" (R) ni de "we" (F2).

---

## 5. ALGO INSTAGRAM 2026

Sources : recherche web avril 2026 (Buffer, Later, Hootsuite, Sprout Social, EarnifyHub, TrueFutureMedia, Mosseri statements janvier 2025).

### 4 systèmes distincts

| Surface | Signal principal | Implication StoreMD |
|---------|-----------------|---------------------|
| **Reels** | Watch time + shares (DM) + saves | Notre format principal |
| **Feed** | Affinité (qui tu suis, avec qui tu interagis) + relevance | Secondaire pour `@storemd` |
| **Stories** | Closeness (relation forte) + viewing history | Usage tactique urgence beta |
| **Explore** | Topic clusters + niche authority | Là où les non-followers découvrent le compte |

### Hiérarchie des signaux Reels

| Signal | Poids | Implication |
|--------|-------|-------------|
| **Watch time** | #1 ranking factor (confirmé Mosseri) | Vidéo regardée à 80%+ = format qui marche |
| **Sends DM (shares en privé)** | Top 3 (confirmé Mosseri) | Le signal le plus puissant pour atteindre de nouvelles audiences |
| **Saves** | Très fort | Signal de valeur durable |
| **Comments (qualité)** | Fort | Conversations > réactions courtes |
| **Likes** | Faible | Vanity metric en 2026 |

### Mécaniques clés 2026

- **94% de la distribution = AI recommendations** (vs followers existants). Compte zéro = pas un blocage.
- **3-second retention threshold** : si l'utilisateur skip avant 3 secondes, l'algo ne pousse pas.
- **Originality Score** : pénalise les Reels avec watermark TikTok ou reposts non-transformés. Re-export depuis Remotion obligatoire.
- **Trial Reels** : possibilité de tester un Reel auprès de non-followers uniquement avant de le publier officiellement.
- **Reels < 90 secondes** pour la discovery. Au-delà, inéligible aux recommandations. Sweet spot : 30-90 secondes.
- **Business accounts** : 7-12% base organic reach rate (vs 10-20% personal accounts). Le gap se réduit avec un bon engagement rate.
- **"Interested followers"** : interagissent activement, reçoivent 8-12x plus de distribution que les passifs.

---

## 6. FORMATS — DONNÉES PERFORMANCE 2026

### Engagement rate par format

| Format | Engagement rate moyen | Source |
|--------|----------------------|--------|
| Carrousels mixtes (image + vidéo) | 2.33% | SocialInsider 2026 |
| Carrousels | 1.92% | SocialInsider 2026 |
| Reels | 0.50% - 2.46% | SocialInsider / Sprout Social 2026 |
| Images simples | 0.45% | SocialInsider 2026 |

### Carrousels — avantage unique

- Seul format avec **double exposition** : si un follower ne swipe pas, l'algo re-montre le carrousel avec une slide différente
- Jusqu'à **20 slides** (augmenté de 10 en août 2024)
- Carrousels 7-10 slides : +23% d'engagement vs <4 slides
- Carrousels 10 slides : 2.07% engagement (le plus élevé par nombre de slides)
- Carrousels vs images : +114% engagement, +55% reach, +70% saves
- Carrousels vs Reels : +12% engagement (Buffer 2026)
- Ajouter de la musique à un carrousel le fait apparaître dans le Reels tab (boost gratuit)

Formats carrousels pertinents pour StoreMD :
- **Comparison** : "Avant StoreMD vs Après StoreMD" sur une boutique scannée
- **Checklist** : "10 leaks que StoreMD trouve sur 90% des boutiques Shopify"
- **Tear-down visuel** : screenshots commentés d'une boutique scannée
- **Data infographie** : stats e-com sourcées

### Reels — avantage unique

- Moteur de découverte (unconnected reach)
- 60-70% du contenu devrait être des Reels pour un compte en croissance
- Reels avec musique = bonus de distribution via le Reels tab
- Reels jusqu'à 3 minutes éligibles Explore (2026)
- Audio original > sounds trending (règle 2026)

### Reels Remix

L'équivalent Instagram du Duet TikTok. Écran split side-by-side avec le Reel original.
- Hérite du contexte algorithmique du Reel original → distribué aux audiences intéressées par le contenu source
- Les Remixes qui ajoutent de la valeur réelle performent significativement mieux que les passifs
- Format sous-utilisé par les marques B2B → opportunité

---

## 7. TIMING & FRÉQUENCE

### Fenêtre critique

- **Premières 30-60 minutes** : engagement velocity détermine la trajectoire du post
- Répondre à CHAQUE commentaire dans les 30 premières minutes
- Répondre aux DMs rapidement — la vitesse de réponse est un signal algorithmique

### Best posting times B2B (merchants Shopify US/EU)

| Jour | Horaire optimal |
|------|----------------|
| Mardi-Jeudi | 10h-13h EST / 16h-19h CEST |
| Lundi | 12h EST / 18h CEST |
| Vendredi | 16h EST / 22h CEST |

Poster **30-60 minutes avant le pic** d'activité de l'audience.

### Rendements décroissants

- Plus de 10 posts/semaine : fatigue audience, l'algo peut pénaliser
- Gaps de 2+ semaines : le prochain post ne reprend PAS au reach précédent. Recovery window plus longue en 2026.

---

## 8. PRODUCTION

### Specs techniques

| Élément | Spec |
|---------|------|
| Reels | 1080x1920 (9:16), 1080p minimum (720p déprioritisé) |
| Carrousels | 1080x1350 (4:5), 1080p minimum |
| Captions | 2 200 caractères max |
| Hashtags | 5 max par post (enforced décembre 2025) |
| Mentions/Tags | 20 max par post |
| Reels durée | 3 minutes max (sweet spot 30-90s pour discovery) |
| Carrousels slides | 20 slides max |

### Repurposing TikTok → Instagram

- Toujours utiliser le fichier master clean (pas le download TikTok avec watermark — 40-70% de reach perdu)
- Poster sur TikTok d'abord, puis Reels 12-24h après
- Adapter la caption (Instagram tolère plus long et plus narratif que TikTok)
- 78% des vidéos qui performent sur TikTok performent aussi sur Reels

### Captions Instagram vs TikTok

| Aspect | TikTok | Instagram Reel |
|--------|--------|----------------|
| Longueur | 80-150 caractères | 100-300 caractères (Insta tolère plus long) |
| Ton | Direct, factuel | Légèrement plus narratif autorisé |
| Lien | "Link in bio" | "Link in bio" (liens dans captions pas cliquables) |
| Hashtags | ZÉRO | 5 max (sets validés dans hashtags.md) |
| Mots-clés | Au début | Au début (Instagram indexe aussi) |

### Stack production

| Outil | Usage |
|-------|-------|
| CapCut | Montage, auto-captions, effets |
| Remotion | Vidéos programmatiques batch, compositions réutilisables |
| Higgsfield | UGC, vidéos marketing (forfait 50€) |
| Smartphone | Talking head, screen recording |
| Canva Pro | Carrousels, visuels graphiques |

---

## 9. PROFIL & BIO

### Bio

- Le name field est indexé par le search Instagram → inclure des keywords (pas juste le nom)
- Le bio est une "conversion page" en 2026, pas une bio sociale
- Business Account = lien cliquable immédiat dans la bio
- 1 seul lien dans la bio — les liens dans les captions ne sont PAS cliquables

### Pinned posts

- Les 3 premiers pinned posts fonctionnent comme une **landing page**
- Un visiteur doit pouvoir répondre en moins de 10 secondes : qui tu es, c'est pour qui, pourquoi follow
- Pas de boost algorithmique direct mais augmentent le follow conversion rate

### Highlights

Les Highlights répondent aux questions de confiance : reviews, services, pricing, process, résultats.

### Profile clicks

- Profile clicks corrèlent avec le follow conversion rate
- L'algo 2026 récompense les posts qui drivent des visites de profil
- Instagram Insights montre DM shares, saves ET profile clicks par post

### Landing page

- URL dédiée (ex: `storemd.com/instagram`) pour isoler le trafic
- Mobile-first obligatoire
- Single CTA
- Matching visuel avec le profil Instagram

---

## 10. STORIES — USAGE TACTIQUE

Les Stories ne sont pas faites pour la discovery (algo Stories = closeness, pas relevance). Mais elles servent pour l'urgence beta et les updates rapides.

### Cadence Stories

3-5/semaine. Peut monter à 1-2/jour en phase push beta intensif. Sweet spot : 6-13 par jour (pas de limite officielle).

### Types de Stories

- Résultats d'un scan StoreMD (chiffres réels)
- Tease d'un Reel à venir
- Annonce beta ("X places dispo")
- Sticker link → site directement (disparaît après 24h = scarcity naturelle)

### Sticker link

Les Stories avec sticker link permettent des conversions directes. À utiliser systématiquement quand pertinent.

---

## 11. RÉPONSES

On répond :
- Aux commentaires sur NOS posts (compte StoreMD)
- Aux DMs reçus (merchants qui répondent au cold ou qui nous contactent)
- Délai max : 2h (dans les 30 premières minutes booste l'algo significativement)

On ne fait PAS :
- D'engagement proactif (commenter les posts des autres)
- De likes/follows stratégiques
- De DM bots

### Cas DM merchant intéressé

Si un merchant DM en demandant une démo ou en posant une question → on scanne sa boutique, on lui envoie les vrais chiffres, on inclut le lien d'installation beta.

### Workflow réponses Jarvis

1. Screenshot du commentaire/DM envoyé à Jarvis
2. Jarvis propose 2 variantes de réponse dans la voix `@storemd` (compte produit)
3. R ou F valide, ajuste, publie
4. Jarvis log automatique

---

## 12. UTM TAGGING

| Placement | UTM |
|-----------|-----|
| Bio (link-in-bio) | `utm_source=instagram&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| Reel — caption | `utm_source=instagram&utm_medium=organic&utm_campaign=reels&utm_content=caption_cta` |
| Story — sticker link | `utm_source=instagram&utm_medium=organic&utm_campaign=story&utm_content=story_sticker` |
| DM Instagram | `utm_source=instagram&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

Pour tout placement non listé dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, l'ajouter d'abord au fichier officiel puis utiliser.

---

## 13. MÉTRIQUES

### Stats natives Instagram (récupérer hebdo)

| Métrique | Pourquoi |
|----------|----------|
| Reach (Reel) | Combien de comptes uniques ont vu |
| Watch time + completion rate | Indicateur algo #1 |
| Sends DM | Signal le plus fort 2026 |
| Saves | Signal valeur durable |
| Comments | Engagement qualitatif |
| Profile visits | Funnel : Reel → profil |
| Bio link clicks | Funnel : profil → site |
| Followers gagnés | Audience accumulée |
| Stories — taps forward, taps back, exits | Quels Stories tiennent l'attention |
| Stories — sticker link clicks | Conversions directes |

### Conversions (dashboard admin StoreMD)

| Métrique | Source |
|----------|--------|
| Visites depuis Instagram | Dashboard admin → Traffic by Source → `instagram` |
| Visites par campagne | Dashboard admin → Traffic by Campaign |
| Installs depuis Instagram | Dashboard admin → Recent Merchants → `utm_source=instagram` |

### Comparaison TikTok vs Instagram

Jarvis sort chaque vendredi un comparatif :
- Reels qui ont mieux marché sur Insta que sur TikTok (et inverse)
- Format gagnant par plateforme (durée, hook, on-screen text)
- Conversion rate par plateforme (installs/visites)

---

## 14. FONCTIONNALITÉS AVANCÉES

### Broadcast Channels

- Disponibles pour les comptes 5K+ followers
- Messages one-to-many, update hebdomadaire
- Signal indirect de loyauté pour l'algo

### Close Friends

- Close Friends Stories apparaissent en PREMIER dans le Story tray
- Le contenu du créateur est priorisé dans le Feed de ces utilisateurs
- Contenu exclusif crée rareté et FOMO

### Threads (cross-posting)

- 200M+ MAU, a dépassé X en daily mobile users (141.5M vs 125M, janvier 2026)
- Ne PAS poster sur Instagram et Threads au même moment exact — stagger par quelques heures
- Adapter la caption : Threads favorise le texte conversationnel, Instagram favorise le visuel
- Comptes actifs sur les deux plateformes grandissent 15% plus vite
- Reach rates Threads 8-12% pour comptes <10K (vs 4-6.5% sur Instagram)

### Location tags

- Posts avec location tags : +79% d'engagement vs posts sans (Sprout Social 2026)
- Pour un SaaS B2B international : utilité limitée, mais boost gratuit si pertinent

---

## 15. ANTI-PATTERNS

| Interdit | Pourquoi |
|----------|----------|
| Personal branding (R ou F en avant) | Compte produit, pas de visage fondateur |
| Build in public | Le merchant s'en fout |
| Plus de 5 hashtags | Enforced par Instagram depuis décembre 2025 |
| Watermark TikTok sur les Reels | Originality Score = 40-70% de reach perdu |
| Reposting brut d'autres comptes | Idem Originality Score |
| Engagement bait ("Comment YES", "Tag a friend") | ~50% du reach perdu, pénalisé par l'algo |
| "Follow for part 2" | Supprimé depuis 2024 |
| "Comment X to receive [link/DM]" | Le plus pénalisé sur Reels |
| DM bots / mass outreach | Compte banni ou shadow-ban garanti |
| Réponses commentaires mode pitch agressif | Concise, factuelle, utile |
| Stories sans lien sticker quand pertinent | Trou dans le funnel |
| Carousels statiques de citations marketing | Sans valeur, faible engagement |
| Tagger des comptes au hasard pour reach | Signal spam |
| Mots restreints ("money", "income", "free", "guarantee") | Déclenchent les filtres anti-spam, réduisent la distribution |
| Em-dash, "Here's the thing", "At the end of the day" | Détecté IA. Cf. `ANTI-IA.md` |

---

## 16. DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Algo Instagram | `marketing/canaux/instagram/algo.md` |
| Algo et context TikTok (source vidéo) | `marketing/canaux/tiktok/` |
| Stratégie marketing globale | `marketing/strategie.md` |
| Objectifs et KPIs | `marketing/objectifs.md` |
| Pipeline vidéo | `marketing/contenu/pipeline-video.md` |
| Réponses commentaires Jarvis | `marketing/jarvis/reponses-commentaires.md` |
| Hashtags validés | `saas-app-shopify/hashtags.md` |
| Cold-log Instagram | `saas-app-shopify/storemd/cold/cold-log-instagram.md` |
| Cold templates | `saas-app-shopify/storemd/cold/cold-templates.md` |
| Context StoreMD | `saas-app-shopify/storemd/context.md` |
| UTM tracking | `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` |
| ANTI-IA | `ANTI-IA.md` |
| BIBLE | `BIBLE.md` |
