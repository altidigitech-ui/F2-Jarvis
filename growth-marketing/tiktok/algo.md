# ALGORITHME TIKTOK 2026

**Date de recherche :** 28/04/2026
**Sources :** Sprout Social, PostEverywhere, TokPortal, OpusClip, Conbersa, TikTok Transparency Center, TikTok Newsroom, New York Times (leaked algo doc), Buffer, DarkRoom Agency, DataSlayer, SocialInsider, GTR Socials, MiraFlow, Fanpage Karma, CapCut (ByteDance), ToolsBear, MarketingAgent Blog, Second Brain

---

## 1. PRINCIPE FONDAMENTAL

TikTok utilise un **interest graph**, pas un social graph. Il montre du contenu basé sur ce qu'il prédit que tu vas regarder, pas sur qui tu suis. Un compte avec 0 followers peut toucher des millions de personnes si le contenu engage.

---

## 2. FOLLOWER-FIRST TESTING (nouveau 2026)

Les nouvelles vidéos sont d'abord testées sur les followers existants pendant les premiers jours. Si ça performe avec eux (complétion, saves, shares), l'algo pousse aux non-followers. Les vidéos ne touchent plus automatiquement un large public dès le départ.

**Implication :** les premiers followers sont critiques. Un compte sans base de followers engagés reste dans le "200-view jail".

---

## 3. SYSTÈME DE SCORING PAR POINTS

Source : document interne TikTok authentifié par un porte-parole (New York Times, Ben Smith).

**Équation simplifiée :**
`Score = Plike × Vlike + Pcomment × Vcomment + Eplaytime × Vplaytime + Pplay × Vplay`
(P = probabilité de l'action, V = valeur assignée, E = temps attendu. L'équation réelle est "much more complicated".)

**Valeurs par interaction (confirmé par TikTok 2025) :**

| Interaction | Points | Raison |
|---|---|---|
| Like | 1 point | Action la plus facile, signal le plus faible |
| Commentaire | 2 points | Effort supérieur, signal d'engagement réel |
| Share | 3 points | Le viewer estime le contenu assez bon pour l'envoyer |
| Full Watch (complétion) | 4 points | Signal que le contenu retient l'attention du début à la fin |
| Rewatch/Loop | 5 points | Signal le plus fort — le viewer VEUT revoir le contenu |

**Seuil critique :** chaque vidéo est testée sur ~300 viewers initiaux. Il faut accumuler **50 points minimum** dans cette phase de test pour passer au pool suivant.

---

## 4. GATE SYSTEM — DISTRIBUTION PROGRESSIVE

| Gate | Pool de viewers | Critère pour passer |
|---|---|---|
| Gate 0 | Followers existants (nouveau 2026) | Complétion + engagement de base |
| Gate 1 | 200-500 non-followers | 50+ points, completion rate + shares/saves > seuil |
| Gate 2 | 1K-10K viewers | Maintenir les métriques + comments substantifs |
| Gate 3 | 10K-100K | Maintenir + shares qui génèrent des chains |
| Gate 4 | 100K-1M+ | Viralité — l'algo pousse massivement |

Chaque gate requiert que la vidéo **maintienne** la qualité des signaux. Une vidéo qui passe Gate 2 mais dont le completion rate baisse avec l'audience élargie se fait stopper. Le "cliff" de vues (fort début puis arrêt brutal) = la vidéo a passé un gate mais a échoué au suivant.

---

## 5. NICHE CONSISTENCY SCORE (nouveau 2026)

L'algo attribue un "niche consistency score" au niveau du compte. Les créateurs qui postent dans 3+ niches non-reliées voient **45% de baisse de distribution**. L'algo récompense l'autorité topicale — un compte qui poste exclusivement dans une niche sera distribué plus agressivement dans cette niche qu'un compte qui alterne entre sujets non-reliés.

---

## 6. LENGTH-ADJUSTED COMPLETION RATE (nouveau 2026)

L'ancien algo pénalisait les vidéos longues (taux de complétion structurellement plus bas). En 2026, l'algo évalue si les viewers ont regardé une **proportion proportionnelle** de la vidéo, pas le taux brut. Une vidéo de 90 sec avec 60% de complétion est évaluée aussi favorablement qu'une de 15 sec avec 85%.

**Sweet spot durée :** glissement de 15-30 sec (2023) vers **45-75 sec** (2026).

---

## 7. LES 4 FEEDS — LOGIQUE DE RANKING PAR FEED

Chaque surface utilise les mêmes 3 catégories de signaux (User Interactions, Content Info, Device/Account) mais avec des **poids différents**.

### For You Page (FYP)

- 70-80% de contenu de comptes NON suivis (discovery)
- 20-30% de comptes suivis (retention)
- Full recommendation pipeline — c'est ici que le gate system opère
- En 2026 : follower-first testing avant distribution aux non-followers
- Optimisé pour : watch time, completion rate, shares, saves

### Following feed

- Uniquement des comptes suivis
- Ordre influencé par récence + intérêt prédit (pas chronologique pur)
- Si tu ne regardes jamais les vidéos d'un compte que tu suis, il descend progressivement
- Même deux personnes suivant les mêmes comptes ont des Following feeds différents

### Friends tab

- Followers mutuels (tu suis + ils te suivent) + comptes suggérés
- Pondéré par likes et commentaires sur les vidéos du friend
- Poids des contacts téléphoniques (avec permission)
- Chaque Friends tab est unique par utilisateur

### LIVE feed

- Signaux temps réel : viewers actuels, activité du chat, clics produits, conversions
- Completion rate du LIVE (% qui regarde la majorité)
- Qualité des commentaires (questions substantives > émojis)
- Product interaction diversity (2025+)
- Le LIVE donne un algorithmic promotion bonus aux créateurs actifs

### Search

- Fonctionne comme un moteur de recherche classique
- 40% de la Gen Z préfère chercher sur TikTok plutôt que Google
- Signaux : keywords caption, hashtags, on-screen text (OCR), spoken audio (ASR)
- En 2026, la recherche est un "direct ranking metric"

---

## 8. SIGNAUX POSITIFS — POIDS ESTIMÉS

Sources croisées : PostEverywhere, Sprout Social, Buffer, DarkRoom Agency, DataSlayer, SocialInsider, GTR Socials, ToolsBear, MarketingAgent Blog, Second Brain.

| Signal | Poids estimé |
|---|---|
| Watch time + completion rate | ~40-50% |
| Shares (DM shares = le plus lourd) | Très fort (3-5x likes) |
| Saves | Très fort (~3x likes) |
| Comments (pondéré qualité/longueur) | Fort |
| Likes | Modéré (signal le plus faible des interactions actives) |
| Rewatch/Loop | Le plus fort (5x likes dans le système de points) |
| Content classification match | Fort (catégorisation) |
| Device/Account settings | Faible |

**Citation TikTok officielle :** "A strong indicator of interest, such as whether a user finishes watching a longer video from beginning to end, would receive greater weight than a weak indicator."

**Engagement TikTok vs autres plateformes :** TikTok engagement rate = 5-8x plus élevé qu'Instagram, Facebook, ou X (PostEverywhere, 2026).

---

## 9. SIGNAUX NÉGATIFS — SUPPRESSEURS

| Signal négatif | Impact | Portée |
|---|---|---|
| Swipe-away dans les 1-2 premières secondes | Le plus destructeur — signal que le hook a échoué | Par vidéo |
| "Not interested" tap (long press → Not interested) | Filtrage quasi-instantané, effet durable | Par vidéo + par créateur |
| Hide a creator's content | Bloque TOUT contenu futur de ce créateur pour cet utilisateur | Par compte créateur |
| Report | Signal négatif lourd, impact vidéo ET compte | Par vidéo + par compte |
| Unfollow after viewing | Signal que le contenu a dégradé la relation follower | Par compte créateur |
| Scroll past sans interaction (passive skip) | Signal faible mais cumulatif | Par vidéo |

**Feedback speed :** les signaux négatifs sont traités quasi instantanément. TikTok ajuste le feed d'un viewer en temps réel pendant la session.

---

## 10. CLUSTERING D'AUDIENCE

### Collaborative filtering (confirmé par TikTok officiel)

Si User A aime vidéos 1, 2, 3 et User B aime vidéos 1, 2, 3, 4, 5 → l'algo prédit que User A aimera aussi vidéos 4 et 5. Ce mécanisme distribue du contenu à des audiences qui n'ont jamais vu le créateur.

### Classification multi-modale (pré-distribution)

Avant le test initial, l'algo classifie la vidéo via :
- **Visual recognition** : analyse des éléments visuels
- **Audio fingerprinting** : identification des sons, musique, voix
- **Text analysis** : caption, hashtags, mots-clés
- **On-screen text OCR** : texte visible dans la vidéo
- **Spoken word ASR** : transcription automatique des mots prononcés

Cette classification détermine quels interest clusters reçoivent la vidéo dans le test initial. Une vidéo mal classifiée atterrit devant la mauvaise audience → completion rate bas → mort au Gate 1.

### Transformer embeddings (2026)

Les modèles de recommandation 2026 utilisent des transformer embeddings pour inférer le sujet depuis le contenu lui-même. Les hashtags seuls ne suffisent plus — l'algo comprend de quoi parle la vidéo indépendamment des métadonnées.

---

## 11. CONTENT AUDITING — FILTRE PRÉ-DISTRIBUTION

Avant le test initial sur les premiers viewers, chaque vidéo passe par un audit automatique :

1. **AI Vision Engine** : scanne les éléments visuels pour détecter du contenu interdit
2. **Copyright check** : comparaison audio/visuelle avec la base de contenu protégé
3. **Duplicate detection** : perceptual hashing pour détecter les reposts et le contenu dupliqué
4. **Watermark detection** : les vidéos avec watermark d'une autre plateforme sont déprioritisées ou supprimées
5. **AI-generated content detection** : en 2026, le contenu détecté comme généré par AI reçoit un label et une distribution réduite

Les vidéos qui échouent à l'audit ne passent JAMAIS au test initial.

---

## 12. DECAY CURVE & RÉSURGENCE

- **Peak distribution** : les premières 24-48h après publication (la majorité des vues arrivent ici)
- **Decay** : après le peak, la distribution décroît progressivement sauf si de nouveaux signaux d'engagement apparaissent
- **Long tail** : certaines vidéos continuent de recevoir des vues pendant des semaines/mois via la recherche TikTok
- **Résurgence** : les anciennes vidéos peuvent resurgir quand un sujet, un son, ou une niche redevient populaire. L'algo n'oublie pas les vidéos — il les réactive si elles deviennent pertinentes.
- **Recency bias côté viewer** : les sessions récentes (24-72h) pèsent beaucoup plus que l'historique ancien pour les recommandations.

---

## 13. TIKTOK SEO — INDEXATION MULTI-MODALE

L'algo lit, écoute et regarde. Il ne suffit plus de mettre des hashtags — les mots-clés doivent apparaître dans les 5 couches simultanément :

1. **Caption** (texte sous la vidéo) — pondération la plus forte pour le ranking search
2. **On-screen text** (overlays texte) — OCR scanne tout le texte visible. +400% de ranking vs vidéos sans on-screen text
3. **Voiceover/audio** (mots prononcés) — ASR transcrit chaque mot et l'indexe
4. **Hashtags** — classifient le sujet/catégorie, complémentaires à la caption
5. **Nom du fichier** — TikTok lit le filename comme signal contextuel initial

**Semantic search (2026) :** TikTok utilise du NLP pour comprendre l'intention, pas juste les mots exacts.

### Specs captions 2026

- Limite technique : 4 000 caractères (augmentée de 2 200 en 2022)
- Visible avant truncation : ~90-150 caractères dans le feed
- Longueur optimale : 150-300 caractères pour du contenu éducatif/searchable
- Captions >1000 caractères : chute significative d'engagement sauf contenu spécifiquement searchable
- Les hashtags comptent dans la limite des 4 000 caractères
- Limite hashtags : 5 maximum par post (2026)

### Structure caption optimale

1. Mot-clé principal dans les 4 premiers mots (front-loaded avant le "see more")
2. Value proposition en une phrase
3. CTA d'engagement en fin de caption
4. 3-5 hashtags pertinents

### Pinned comment

Le créateur poste un commentaire avec des mots-clés supplémentaires puis le pin en haut. Ce commentaire fonctionne comme une deuxième caption indexable et contribue au metric "commentaires".

### Topic clusters

Créer un cluster de 5-10 vidéos autour du même topic avec des angles différents. L'algo voit le compte comme une autorité sur le sujet → ranking 300-500% plus haut que des vidéos isolées. Le compounding fonctionne sur 6-12 mois.

---

## 14. VIEW VELOCITY (nouveau signal 2026)

TikTok a réorienté son algo vers la "view velocity" — la vitesse à laquelle une vidéo accumule des signaux d'engagement dans les **30 premières minutes** de distribution.

Les vidéos qui accumulaient des vues lentement sur 24-48h ne sont plus récompensées comme avant. Maintenant : exploser dans les 30 premières minutes ou mourir.

### Signaux de velocity mesurés

1. Vues dans les 30 premières minutes
2. Taux de complétion sur le premier batch de viewers
3. Saves dans la première heure
4. Shares dans la première heure
5. Profile visits générés par la vidéo
6. Ratio "not interested"

---

## 15. RÉTENTION — COURBES ET BENCHMARKS

TikTok est la seule plateforme majeure qui montre une courbe de rétention seconde par seconde.

### Lecture de la courbe

- Chute 0-3 secondes : le hook est cassé
- Cliff au milieu : un moment spécifique fait partir les gens (identifier le timestamp exact)
- Spike de rétention (courbe remonte) : le meilleur moment, ce que les viewers rewatchent
- Finish rate : signal #1 de l'algo

### Benchmarks rétention 2026

| Durée vidéo | Rétention moyenne | Bonne | Excellente (virale) |
|---|---|---|---|
| <15 secondes | 60-70% | >75% | >85% (replay) |
| 15-30 secondes | 50-60% | >65% | >75% |
| 30-60 secondes | 40-50% | >55% | >65% |
| 1-3 minutes | 30-40% | >45% | >55% |

### Checkpoints critiques de l'algo

- **3 secondes** : première décision. 70%+ de rétention nécessaire pour espérer du FYP.
- **8 secondes** : deuxième checkpoint. L'algo teste si l'attention est maintenue.
- **15 secondes** : 60%+ nécessaire pour distribution continue.
- **30 secondes** : 50%+ nécessaire pour distribution soutenue.

### Pattern interrupt

Changer quelque chose à l'écran toutes les 3-5 secondes : text overlay, changement de plan, zoom, B-roll, son. Les vidéos statiques perdent l'attention beaucoup plus vite.

### End-screen hook

Les dernières 3-5 secondes fonctionnent comme un deuxième hook. Finir avec un CTA, une déclaration contrariante, ou un reveal partiel → augmente le finish rate + le rewatch.

---

## 16. ENGAGEMENT — POIDS ALGORITHMIQUE

### Règle de la première heure

Répondre à chaque commentaire dans la première heure après publication. Chaque réponse = une interaction supplémentaire qui boost la velocity du post.

### Comment chains

Un commentaire qui déclenche 5-10 réponses d'autres viewers crée une "comment chain" que l'algo récompense fortement. L'algo mesure la profondeur de l'engagement (threads > likes isolés).

### Video replies

Le format "video reply" (répondre à un commentaire avec une vidéo) augmente le taux d'engagement de 30% sur 2 mois d'utilisation constante.

### Engagement sortant

Commenter 10-20 vidéos par jour dans sa niche. L'algo voit cette activité comme un signal de créateur engagé et actif.

---

## 17. SHADOWBAN

### Déclencheurs

1. Contenu qui viole les Community Guidelines (même borderline)
2. Posting bursts — publier 5-10 vidéos d'un coup après des jours d'inactivité
3. Scaling soudain sans warming
4. Hashtags bannis (TikTok ne publie pas la liste)
5. Contenu dupliqué (perceptual hashing)
6. Watermarks d'autres plateformes
7. Musique non-licensée sur un compte Business
8. IP instable

### Durées

- **24-72h** (léger) : un seul contenu borderline
- **7-14 jours** (comportemental) : patterns de posting suspects
- **2-4 semaines** (modéré) : violations répétées
- **Indéfini** : comportement problématique persistant

### Détection

1. Traffic source "For You" = 0 sur plusieurs vidéos récentes dans TikTok Analytics
2. Vidéo invisible depuis un autre compte (non-follower) via les hashtags
3. Comparaison performance compte principal vs compte test avec le même contenu

### Prévention

- Phase warming (14 jours de consommation avant de poster)
- Espacer les posts de 2-4 heures minimum
- Poster nativement (pas via API/scheduler) : 20-50% de distribution en moins via API
- Nommer les fichiers vidéo avec des mots-clés
- Engager 10-15 minutes avant de poster

---

## 18. CAROUSEL (PHOTO MODE) — DONNÉES ALGO

TikTok Photo Mode : jusqu'à 35 images swipables, le viewer swipe à son rythme. L'algo mesure le swipe-through rate, le dwell time, les saves et les shares.

### Performance vs vidéo (data TikTok + Fanpage Karma)

- 2.9x plus de commentaires
- 1.9x plus de likes
- 2.6x plus de shares
- 81% plus d'engagement total

Chaque swipe est un micro-engagement actif que l'algo enregistre. La vidéo est de la consommation passive, le carousel est de la consommation active. L'algo récompense l'action.

### Specs techniques

- Format : 1080×1920 pixels (9:16 vertical obligatoire)
- Nombre de slides : 4-35 (optimal 5-10 pour l'engagement)
- Fichiers : JPG ou PNG
- Taille max : 500MB total, 100KB recommandé par image
- Safe zone : éviter le top 150px (username) et bottom 250px (caption, boutons)
- Audio : musique ou voiceover possible

---

## 19. DEAL ORACLE/US — IMPACT ALGO

### Structure (janvier 2026)

- Oracle, Silver Lake, MGX contrôlent ~80% de "TikTok USDS Joint Venture LLC"
- ByteDance retient 19.9%
- L'algo américain est licencié de ByteDance puis réentraîné sur des données US uniquement sur les serveurs Oracle
- ByteDance n'a plus accès aux données US ni au contrôle de l'algo américain

### Impact

- **Phase de transition (Q1-Q2 2026)** : fluctuations de performance. L'algo perd temporairement la précision construite sur des années de données globales.
- **RPM volatilité** : certains créateurs reportent des baisses de RPM depuis janvier 2026
- **Contenu brand-safe favorisé** : l'algo pourrait prioriser du contenu qui attire des annonceurs premium
- **Fondamentaux inchangés** : les signaux de ranking de base (watch time, completion, shares, saves) survivent à tout changement d'algo

---

## 20. DONNÉES OFFICIELLES TIKTOK

### Les 3 piliers confirmés (inchangés depuis 2020, toujours valides 2026)

1. **User Interactions** (poids le plus fort) : vidéos regardées, finies, likées, partagées, sauvegardées, skippées. Comptes suivis. Commentaires postés. Contenu créé. "Not interested" taps.
2. **Content Information** (poids moyen) : captions, hashtags, sons, effets, texte à l'écran. L'algo utilise ces signaux pour catégoriser le contenu, pas pour le ranker directement.
3. **Device & Account Settings** (poids le plus faible) : pays, langue, type de device, timezone. Citation TikTok : "These receive a lower weight in the recommendation system since users don't actively express these as preferences."

### Ce que l'algo ne considère PAS

- Le nombre de followers (confirmé par TikTok)
- Les performances de vidéos précédentes
- Même un compte neuf avec 0 followers peut percer

### Citation TikTok Newsroom

"The system recommends content by ranking videos based on a combination of factors — starting from interests you express as a new user and adjusting for things you indicate you're not interested in, too."
