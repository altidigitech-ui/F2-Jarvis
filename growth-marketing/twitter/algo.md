# ALGO TWITTER/X — Fonctionnement de l'Algorithme (2026)

**Dernière mise à jour :** 04 avril 2026
**Sources :** Code open-source X (github.com/xai-org/x-algorithm, janvier 2026), étude Buffer (18.8M posts, 71K comptes), analyses Sprout Social, OpenTweet, PostEverywhere, TweetArchivist, SocialMediaToday, recherche Grok native.
**Ce fichier est la référence technique.** Le context.md Twitter traduit ces règles en tactiques pour FoundryTwo.

---

## 1. ARCHITECTURE — COMMENT L'ALGO FONCTIONNE

### 1.1 Le pipeline en 3 étapes

Chaque tweet publié passe par :

1. **Candidate Sourcing** — L'algo pioche ~1 500 candidats parmi 500M+ tweets/jour. 50% viennent de comptes suivis (Thunder), 50% de comptes non suivis (Phoenix/Grok Retrieval).
2. **Neural Network Ranking** — Un réseau de ~48M paramètres prédit la probabilité d'engagement de l'utilisateur (like, reply, RT, bookmark, clic profil, dwell time). Chaque prédiction est multipliée par un poids, le tout donne un score composite.
3. **Filtering & Mixing** — Filtrage spam/NSFW/déjà-vu/comptes bloqués. Le feed final mixe tweets rankés, ads, Spaces, trending, suggestions de follow.

**5 milliards de décisions de ranking par jour, chacune en < 1.5 seconde.**

### 1.2 Le changement majeur de janvier 2026

X a remplacé l'ancien système de ranking par un **modèle Grok (transformer)** qui lit sémantiquement chaque post et regarde chaque vidéo. Conséquences :

- L'algo comprend le SENS du contenu, pas juste les mots-clés. "Bootstrapping a SaaS" est routé vers les bons utilisateurs sans hashtag.
- Les hashtags ne servent plus au routage — Grok catégorise tout seul via **SimClusters** (145K clusters thématiques).
- L'algo analyse le **sentiment** du post. Contenu positif/constructif → plus de distribution. Contenu négatif/combatif → réduit même si l'engagement est élevé.

### 1.3 Les 2 feeds

| Feed | Fonctionnement | Notre cible |
|------|---------------|-------------|
| **For You** | Algorithmique. Mix in-network (suivis) + out-of-network (découverte). Feed par défaut. | ✅ C'est ici qu'on veut apparaître |
| **Following** | Anciennement chronologique. Depuis nov. 2025, Grok trie par engagement prédit (option retour chrono). | Secondaire |

---

## 2. POIDS DES INTERACTIONS — LA TABLE DE LA LOI

Données issues du code open-source, confirmées dans les releases 2023 et janvier 2026.

### 2.1 Score simplifié

| Action | Poids | Ratio vs Like | Ce que ça signifie pour nous |
|--------|-------|---------------|------------------------------|
| **Reply engagée par l'auteur** (quelqu'un reply + l'auteur répond) | +75 | **150x** | LE signal roi. Répondre à CHAQUE reply = non négociable |
| **Reply simple** (quelqu'un reply) | +13.5 | **27x** | Provoquer des replies > récolter des likes |
| **Quote tweet** | +12.5 | **25x** | Quand quelqu'un quote notre tweet = jackpot |
| **Clic profil + like/reply** | +12 | **24x** | Un bon tweet pousse au clic profil → la bio doit convertir |
| **Clic conversation + reply/like** | +11 | **22x** | Les threads génèrent naturellement ce signal |
| **Dwell time 2+ min** | +10 | **20x** | Contenu long = signal fort si les gens restent |
| **Bookmark** | +10 | **20x** | Contenu "à sauvegarder" (frameworks, data, checklists) = boost silencieux |
| **Retweet/Repost** | +1 à +20 | **2-40x** | Variable selon les sources. Signal fort mais moins que reply |
| **Like** | +0.5 | **1x** | Le signal le plus faible. Un like = quasi rien |
| **Vidéo vue 50%+** | +0.005 | **~0x** | Négligeable en scoring direct |
| **Action négative** (block, mute, "not interested", report) | **-74** | **-148x** | DÉVASTATEUR. 1 block annule des dizaines d'engagements positifs |

### 2.2 Ce que ce tableau nous dit

**1 conversation (reply + réponse de l'auteur) = 150 likes.**

Concrètement : si un tweet reçoit 5 replies et qu'on répond aux 5, le score algorithmique équivaut à 750 likes. C'est pourquoi notre stratégie d'engagement (répondre à tout, poser des questions de suivi) est le levier #1.

Les bookmarks sont le "like silencieux" — poids 20x le like. Créer du contenu que les gens veulent sauvegarder (frameworks, données, checklists) booste massivement sans qu'on le voie dans les métriques de surface.

Les likes sont du bruit. Ne jamais optimiser pour les likes.

---

## 3. VÉLOCITÉ D'ENGAGEMENT — LES 60 PREMIÈRES MINUTES

### 3.1 Le mécanisme de distribution

1. **Publication** → L'algo montre le tweet à **5-15% des followers** (test audience).
2. **0-15 min** → Fenêtre critique ("golden hour"). L'algo mesure la vélocité d'engagement.
3. **15-60 min** → Si le score initial dépasse un seuil → expansion aux autres followers, puis aux non-followers via For You.
4. **Après 60 min** → Le tweet est "classé". Score figé sauf si un gros compte engage dessus (réamplification ponctuelle).

### 3.2 Time decay

Un tweet perd **50% de son score de visibilité toutes les 6 heures**. Après 24h, la distribution algorithmique est quasi nulle.

Exception : les threads ont une fenêtre plus longue car chaque nouvelle reply bumpe le score.

### 3.3 Implications pour nous

- **Poster quand les followers sont en ligne** — sinon le tweet meurt avant d'être vu par le test audience.
- **Cross-engagement R↔F↔F2 dans les 15 premières minutes** — chaque reply mutuelle = signal 150x.
- **Ne jamais poster et disparaître** — rester actif dans l'heure qui suit pour répondre aux replies.
- **"Halo Effect"** — engager sur des comptes officiels/influents juste avant de poster crée un boost de visibilité 2-3x.

---

## 4. PREMIUM VS FREE — LE MUR DE PÉAGE

### 4.1 Les chiffres

| Métrique | Compte Free | Compte Premium (8$/mois) | Premium+ (40$/mois) |
|----------|-------------|--------------------------|----------------------|
| Reach médian par post | ~100 impressions | ~600 impressions | ~1200 impressions |
| Multiplicateur de distribution | 1x | 2-4x (followers), 2x (non-followers) | 4-8x |
| Engagement médian sur posts avec lien | **0%** (depuis mars 2025) | 0.25-0.3% | Légèrement supérieur |
| Priorité dans les replies | Aucune | Replies affichées en haut des threads | Boost maximum |
| Engagement rate médian | **0%** | ~0.49% | ~0.53% |

Source : étude Buffer, 18.8M posts, 71K comptes.

### 4.2 Verdict

**Premium à 8$/mois est obligatoire.** C'est le ticket d'entrée, pas un luxe. Sans Premium :
- Les posts avec liens sont invisibles (0% engagement).
- Le reach organique est quasi nul.
- Les replies sont enterrées sous celles des comptes vérifiés.

L'écart free/Premium sur X est **le plus grand de toutes les plateformes sociales**.

### 4.3 ⚠️ Ce que Premium ne fait PAS

Premium amplifie le contenu de qualité. Il ne sauve pas le contenu médiocre. Un compte Premium qui poste du contenu faible avec peu d'engagement → résultats faibles malgré l'abonnement. Premium = multiplicateur, pas générateur.

---

## 5. BOOST FACTORS — CE QUI EST AMPLIFIÉ

### 5.1 Formats de contenu (classés par boost algorithmique)

| Format | Boost | Pourquoi | Notre usage |
|--------|-------|----------|-------------|
| **Threads (4-8 tweets)** | ✅✅✅ | 3x l'engagement d'un tweet solo. Chaque reply bumpe le score. Mitige le time decay. | Data threads hebdo, audits détaillés |
| **Vidéo native (< 2min20)** | ✅✅✅ | Plus fort boost média. 10x vs texte selon Grok. Completion rate pesé lourd. | Vidéos de diagnostic store/workflow (quand prêts) |
| **Images/carrousels** | ✅✅ | Augmente le dwell time et le scroll-stop. Jusqu'à 4 images. | Screenshots d'audits, before/after |
| **Polls** | ✅✅ | Interaction low-friction → replies et discussions. | "What kills conversion the most?" |
| **Texte pur** | ✅ | Baseline, pas de bonus spécial. MAIS surperforme la vidéo de 30% en engagement sur X (seule plateforme). | Hot takes, provocations, questions |
| **Long-form (Articles X)** | ✅ | Dwell time 2+ min = signal +10. Premium only (25K caractères). | Thought leadership e-com/marketing (Phase 2+) |

### 5.2 Autres facteurs de boost

- **Originalité** — Contenu unique score plus haut que le contenu recyclé/dupliqué.
- **Timing trending** — Posts sur des sujets en tendance reçoivent un boost de momentum.
- **Ratio engagement/followers** — Un petit compte avec un engagement rate élevé surperforme un gros compte passif. L'algo regarde le ratio, pas les nombres absolus.
- **Ton constructif** — Grok analyse le sentiment. Positif/constructif → plus de distribution.

---

## 6. PENALTY FACTORS — CE QUI EST PUNI

### 6.1 Pénalités sévères

| Action | Pénalité | Sévérité |
|--------|----------|----------|
| **Liens externes dans le corps du tweet** | 30-90% de réduction de reach. 0% engagement pour les comptes free. | 🔴 CRITIQUE |
| **Engagement bait** ("Like if you agree", "RT if...") | Détecté comme low-quality, supprimé pour large audience. | 🔴 CRITIQUE |
| **Actions négatives reçues** (block, mute, "not interested") | -74 par action. 1 block annule ~150 likes. | 🔴 CRITIQUE |
| **Contenu offensant/combatif** | -80% de reach même si engagement élevé. | 🔴 CRITIQUE |

### 6.2 Pénalités modérées

| Action | Pénalité | Sévérité |
|--------|----------|----------|
| **3+ hashtags** | -40% reach. Signale du spam. | 🟡 MODÉRÉ |
| **Posting rapide** (10 tweets en 5 min) | Détection spam. Diminishing returns. | 🟡 MODÉRÉ |
| **Contenu répétitif/dupliqué** | Supprimé des candidats. | 🟡 MODÉRÉ |
| **Copy-paste cross-plateforme** | Détecté comme duplicate. | 🟡 MODÉRÉ |
| **Tweets sans engagement** récurrents | L'algo apprend vite que le contenu underperform → montre les prochains à moins de monde. | 🟡 MODÉRÉ |
| **Supprimer et reposter** le même contenu | Trigger spam detection. | 🟡 MODÉRÉ |

### 6.3 Règles liens

**JAMAIS de lien dans le corps du tweet.** Toujours en reply.

Un A/B test documenté montre **+1700% de reach** en retirant un lien du corps d'un tweet identique.

---

## 7. TWEEP CRED — SCORE DE RÉPUTATION

Chaque compte X a un score TweepCred de 0 à 100, calculé par un algorithme type PageRank.

**Facteurs :**
- Âge du compte
- Ratio followers/following
- Qualité de l'engagement (interactions avec des comptes high-quality)
- Patterns d'activité

**Seuil critique : 65.** En dessous, seulement 3 tweets sont considérés pour la distribution algorithmique. Au-dessus, tous les tweets sont éligibles.

**Comment monter son TweepCred :**
- Engager avec des comptes de qualité (pas des bots, pas du mass-follow)
- Maintenir un ratio followers/following sain
- Avoir un taux d'engagement régulier
- Éviter les actions négatives (blocks reçus)

---

## 8. PETITS COMPTES (< 1000 FOLLOWERS)

### 8.1 La bonne nouvelle

L'algo 2026 favorise explicitement les petits comptes avec un bon engagement rate. Un compte de 500 followers engagés surperforme un compte de 50K followers passifs. L'algo regarde le **ratio**, pas les **nombres absolus**.

Mise à jour 2025-2026 : les petits comptes ont reçu un **boost de visibilité 2x** dans le For You feed.

### 8.2 Ce qui marche pour les petits comptes

1. **Premium** (8$/mois) — Non négociable. Multiplie le reach 2-4x.
2. **Reply stratégique** — Répondre à 5-10 posts niche AVANT de poster son propre contenu. Réchauffe l'audience.
3. **Threads** — 3x l'engagement d'un tweet solo.
4. **Poster 2-5x/jour** aux heures de pointe.
5. **Répondre à ses propres replies** — Signal 150x.
6. **Contenu original et niche** — L'algo route vers les SimClusters pertinents.
7. **Ton constructif** — Grok récompense la positivité.

### 8.3 Ce qui ne marche PAS

- Mass-follow/unfollow → détruit le TweepCred.
- Acheter des followers → engagement rate s'effondre → algo punit.
- Poster sans engager → broadcaster mode = invisible.
- Hashtag stuffing → pénalisé.

---

## 9. HORAIRES OPTIMAUX

### 9.1 Données globales

| Créneau | Engagement |
|---------|-----------|
| **Mercredi 9h** | Pic d'engagement le plus élevé de la semaine |
| **Lundi-Vendredi 8h-11h** | Forte activité |
| **Lundi-Vendredi 15h** | Second pic |
| **Week-end après-midi** | Engagement modéré |

Fuseau de référence : EST (UTC-5). Pour notre audience e-com/marketing (US-centric), poster entre **14h-17h heure de Marseille** pour capter le matin US EST, et **20h-23h** pour capter l'après-midi US.

### 9.2 Stratégie de timing

Poster QUAND les followers les plus engagés sont en ligne > poster aux "meilleurs horaires" génériques. Après 2 semaines de publication, analyser les Twitter Analytics pour identifier les pics spécifiques de NOTRE audience.

---

## 10. HASHTAGS EN 2026

Grok rend les hashtags quasi inutiles pour le routage algorithmique. L'IA comprend le sujet sans hashtag.

| Nombre | Effet |
|--------|-------|
| 0 | ✅ Aucune pénalité |
| 1 ciblé | ✅ Peut augmenter l'engagement de ~21% |
| 2 max | ⚠️ Limite acceptable |
| 3+ | 🔴 Pénalisé (-40%). Signale du spam |

**Règle : 0 à 1 hashtag par tweet. Maximum absolu : 2.** Jamais de hashtags génériques (#business #success #motivation).

Le seul usage légitime : se rattacher à une conversation existante (#buildinpublic) ou un événement (#ProductHunt).

---

## 11. RÉSUMÉ — LES 10 RÈGLES DE L'ALGO

| # | Règle | Poids algorithmique |
|---|-------|-------------------|
| 1 | **Répondre à CHAQUE reply** sur nos tweets | 150x par conversation |
| 2 | **Zéro lien dans le corps du tweet** — toujours en reply | Évite -30 à -90% reach |
| 3 | **Engager AVANT de poster** — 5-10 replies niche | Halo effect 2-3x |
| 4 | **Poster aux heures de notre audience** + rester actif 60 min après | Vélocité = signal #1 |
| 5 | **Premium obligatoire** sur tous les comptes actifs | 2-10x reach |
| 6 | **Provoquer des replies, pas des likes** | Reply = 27x like |
| 7 | **Créer du contenu bookmarkable** (data, frameworks, checklists) | Bookmark = 20x like |
| 8 | **0-1 hashtag max** | 3+ = -40% reach |
| 9 | **Ton constructif même dans la provocation** | Grok pénalise le négatif |
| 10 | **Cross-engagement R↔F↔F2 dans les 15 premières minutes** | Vélocité artificielle légitime |

---

## 12. SOURCES

| Source | Type | Date |
|--------|------|------|
| github.com/xai-org/x-algorithm | Code open-source officiel X | Janvier 2026 |
| Buffer — Analyse 18.8M posts, 71K comptes | Étude indépendante | 2025-2026 |
| Sprout Social — Twitter Algorithm 2026 | Guide analytique | Février 2026 |
| OpenTweet — Complete Breakdown | Analyse technique | Février 2026 |
| PostEverywhere — Algorithm Guide | Analyse croisée | Janvier 2026 |
| TweetArchivist — Technical Breakdown | Analyse code source | Janvier 2026 |
| SocialMediaToday — X Algorithm Ranking Factors | Analyse officielle | Septembre 2025 |
| Grok (recherche native X) | IA native de la plateforme | Mars 2026 |
