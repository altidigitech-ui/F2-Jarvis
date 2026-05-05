# ALGORITHME REDDIT 2026

**Date de recherche :** 02/05/2026
**Sources :** UpvoteMax, GlowifyDesigns, Conbersa, Redaccs, Medium/AmirSalihefendic (open source), Upvote.net, Watsspace, Readability, Signals.sh, ReddiReach, Multilogin, Reddifier, FansGurus, AuditSocials, NerdBot, TechTimes, RedShip, ReplyAgent, MediaFast, KarmaGuy, OnlineModeration, MarketingLTB, StackMatix, Benly, Recho, ALMCorp, AbeTheAgency, SingleGrain, SocialPlug, RedSocial, RedditWiki

---

## 1. STRUCTURE — 6 MODES DE TRI

Reddit offre 6 modes de tri, chacun avec sa propre logique de ranking :

| Sort | Logique |
|---|---|
| **Hot** | Le défaut. Balance score (upvotes - downvotes) × time decay. Les votes récents pèsent exponentiellement plus. |
| **Best** | Personnalisé. Mélange posts de subreddits abonnés + recommandations basées sur les intérêts. |
| **New** | Chronologique pur. Pas algorithmique. Mais c'est ici que les posts gagnent leur première traction. |
| **Top** | Classement par score brut (upvotes - downvotes) sur une période (heure, jour, semaine, mois, année, all time). |
| **Rising** | Posts récents qui accumulent des upvotes et comments rapidement. Le tremplin vers Hot. |
| **Controversial** | Posts avec ratio upvotes/downvotes proche de 50/50 mais engagement total élevé. |

### L'algo est open source

Reddit est une des rares plateformes dont le code de ranking a été open-sourcé (2009). Les concepts fondamentaux restent les mêmes : **logarithmic scaling** pour les votes et **time decay** pour la fraîcheur.

---

## 2. ALGO HOT — LE WORKHORSE

### La formule

```
Hot Score = log10(max(|score|, 1)) × sign(score) + (timestamp / 45000)
```

- Chaque **10x augmentation de votes** n'ajoute que **1 point** au ranking
- Mais chaque **12.5 heures** d'âge **soustrait 1 point complet**

### Implications

- Un post de 12h a besoin de **~10x plus d'upvotes** qu'un post neuf pour tenir le même rang
- Après 24h : il faut **100x** plus d'upvotes
- Après 36h : le post est **essentiellement mort**
- Le front page se renouvelle constamment — l'algo est conçu pour tuer le vieux contenu

### Les premiers votes pèsent MASSIVEMENT plus

- Les **10 premiers upvotes** ont le même poids que les **100 suivants**
- Les **100 premiers** ont le même poids que les **1 000 suivants**
- Logarithmic scaling = les early votes sont exponentiellement plus importants

### Les downvotes comptent

Score = upvotes MINUS downvotes. Les posts controversés (beaucoup d'upvotes ET de downvotes) reçoivent un score plus bas que les posts uniquement upvotés.

---

## 3. ALGO COMMENTS — WILSON SCORE INTERVAL

Les commentaires n'utilisent PAS l'algo Hot. Ils utilisent le **Wilson Score Interval** (inventé en 1927).

### Le principe

Le Wilson score traite le vote count comme un **échantillon statistique** d'un vote hypothétique complet. Il mesure la **confiance** qu'un commentaire est bon, pas juste le score brut.

- Un commentaire avec 1 upvote et 0 downvotes (100% positif) reste en bas → pas assez de données
- Un commentaire avec 10 upvotes et 1 downvote peut ranker AU-DESSUS d'un commentaire avec 40 upvotes et 20 downvotes → taux d'approbation plus fiable

### Avantage clé

Le **temps de soumission est IRRELEVANT** pour le ranking des commentaires. Les commentaires sont rankés par confiance statistique, pas par ancienneté.

---

## 4. LES 6 SIGNAUX CORE

Sources cross-vérifiées : UpvoteMax, Conbersa, Signals.sh, GlowifyDesigns.

| Signal | Poids | Détail |
|---|---|---|
| **Upvote-to-Downvote Ratio** | Le plus fort | % de votes positifs vs négatifs. Ratio 90%+ pèse plus que le nombre brut. |
| **Engagement Velocity** | Critique | Vitesse d'accumulation upvotes + comments dans les premières heures. 50 upvotes en 1h >>> 200 upvotes en 24h. |
| **Comment Quality & Depth** | Fort | Longueur des commentaires, threads de discussion, conversations back-and-forth. |
| **Account Trust Score** | Fort | Comptes établis avec historique de posting diversifié et bon karma = plus de poids. |
| **Subreddit Activity Patterns** | Fort | Chaque subreddit a ses propres baselines d'engagement. L'algo ajuste en fonction. |
| **Content Freshness** | Fort | Posts récents priorisés via time decay exponentiel. |

### Signal #1 : Engagement Velocity

**La fenêtre critique : 2-3 heures.** Un post a typiquement 2-3 heures pour prouver sa valeur.

### Formule velocity simplifiée (UpvoteMax)

```
Velocity Score = (Upvotes × 1.0 + Comments × 1.5 + Awards × 2.0) / Time_Hours^1.8
```

Le time multiplier décroît exponentiellement — posts >6h font face à des pénalités de velocity significatives, contenu <2h reçoit des boosts substantiels.

---

## 5. POIDS DES VOTES — TOUS LES VOTES NE SONT PAS ÉGAUX

### Account weight

Un vote d'un **compte de 3+ ans avec 10K+ karma** pèse plus algorithmiquement qu'un vote d'un compte récent.

### IP filtering

Les votes de la **même IP ou range IP étroit** sont discountés ou ignorés.

### Pattern detection

Si un compte **ne fait que upvoter** les posts d'un seul utilisateur, Reddit flag cette relation et dévalue ces votes.

### Vote-to-engagement ratio

Un post avec 200 upvotes et **0 commentaires** = suspect. Reddit pèse le ratio votes/autres signaux.

### Vote fuzzing

Reddit ajoute intentionnellement des **faux upvotes et downvotes** à chaque post affiché. Le score net reste approximativement correct mais les nombres individuels sont brouillés. Rend la manipulation plus difficile.

---

## 6. PARCOURS D'UN POST — NEW → RISING → HOT → r/ALL

### Le pipeline

1. **New** — apparition chronologique dans la queue "New" du subreddit
2. **Rising** — si accumulation rapide d'upvotes et comments dans New
3. **Hot** — si la velocity continue, atteint le feed Hot du subreddit
4. **r/all** — si performance suffisante pour dépasser les posts de TOUS les subreddits

### En chiffres

- Si un post ne reçoit aucun engagement dans les **15 premières minutes** dans New, il est essentiellement mort
- **94% des posts échouent** à sortir de New (Signals.sh)
- L'algo assume que le bon contenu attirera naturellement de l'engagement précoce

### Subreddit size impact sur le time decay

| Taille subreddit | Durée de visibilité |
|---|---|
| Large (1M+ members) | Hot turn over rapide. Post peut mourir en 2-3h. |
| Mid-size (100K-1M) | Decay modéré. Posts compétitifs 3-6h avec engagement steady. |
| Small (<100K) | Decay lent. 20-30 upvotes peut rester visible 24h+. |

---

## 7. COMMENTS — SIGNAL INDIRECT

Les comments ne sont PAS directement dans la formule de ranking du post. MAIS influence indirecte via 2 mécanismes :

1. **Visibility amplification** — posts avec threads actifs apparaissent dans "Trending" indépendamment de l'algo Hot
2. **Behavioral signals** — nombre élevé de comments augmente le click-through rate → plus d'upvotes potentiels

### Règle comments vs upvotes

Un post avec **15 upvotes et 8 comments** dans la première heure surperformera un post avec **40 upvotes et 0 comments**.

### Comment depth

50 comments one-line signalent MOINS d'engagement que 30 comments avec threads multi-reply back-and-forth. Conversations profondes = intérêt authentique.

---

## 8. KARMA

### Structure

- **Post karma** : upvotes sur les posts
- **Comment karma** : upvotes sur les commentaires
- Karma total = post + comment
- Karma est PUBLIC sur chaque profil

### Fonctionnement réel

- Pas un ratio 1:1 avec les upvotes (même principe logarithmique)
- Les pertes de karma par downvotes sont plafonnées

### Impact algorithmique

- Plus de karma = plus de confiance algorithmique
- Posts de comptes à haut karma = moins filtrés par AutoMod
- Votes de comptes à haut karma = plus de poids dans le ranking
- Beaucoup de subreddits exigent un **karma minimum** (souvent 100+)

### Account age

- Signal de confiance séparé du karma
- Comptes neufs (<30 jours) = traités avec suspicion
- **Les 30 premiers jours** = phase de trust-building, pas de growth

---

## 9. CONTRIBUTOR QUALITY SCORE (CQS) — SCORE CACHÉ

Score interne assigné à chaque compte, reflète qualité et trustworthiness. Dynamique et caché (contrairement au karma public et cumulatif).

### Les 5 tiers

| Tier | Signification |
|---|---|
| Highest | Contributeur confiance maximale |
| High | Bon contributeur |
| Medium | Contributeur standard |
| Low | Signaux qualité faible |
| Lowest | Probable spam / manipulation |

### Impact

- CQS bas = risque accru de shadowban
- CQS bas = plus de filtrages AutoMod
- Réévalué en continu basé sur les patterns de posting

---

## 10. SHADOWBAN

Un shadowban rend **toutes les contributions invisibles** pour les autres sans notification. Le compte peut continuer à poster normalement — mais personne ne voit rien.

### Triggers (2026, principalement automatisés)

| Trigger | Détail |
|---|---|
| Rapid posting | Rythme qui trigger la spam detection |
| Link patterns | Liens répétitifs vers le même domaine |
| Account age + activity mismatch | Comptes neufs qui postent à haut volume immédiatement |
| IP association | IP déjà utilisée par des comptes bannis/spam |
| VPN/proxy | Certains exit nodes flaggés |
| Automated behavior | Intervalles exacts, formatting identique, patterns bot-like |
| Vote manipulation | Autres comptes pour upvoter ses propres posts |
| Cross-posting massif | Même contenu dans 5+ subreddits en courte fenêtre |
| Comments copier-collés | Même commentaire dans plusieurs threads |

### Diagnostic

- Profil en fenêtre incognito : si ne charge pas → shadowban probable
- Poster dans r/ShadowBan — bot automatique répond
- 0 upvotes consistant, personne ne répond, karma ne bouge plus → probable

### Recovery

- Appeal via reddit.com/appeal (3-7 jours)
- Ne PAS poster pendant l'attente
- Ne PAS créer un nouveau compte → ban evasion detection sophistiquée

### Stats

- 340 tentatives marketing startup : **89% bannis dans les 30 jours**, 7% shadowbannis (ReddiReach)
- Warm-up recommandé : semaine 1 observer/upvoter, semaine 2 commenter sans liens, semaine 3 premier text post

---

## 11. AUTOMOD — MODÉRATION PAR SUBREDDIT

AutoModerator est configuré par les modérateurs de chaque subreddit. Filtre ou supprime automatiquement les posts selon des règles prédéfinies :

- **Karma minimum** — souvent 100+
- **Age minimum du compte** — prévient le spam
- **Keywords** — certains mots déclenchent le filtrage
- **Link domains** — certains domaines blacklistés
- **Post format** — flair, titre, longueur requis
- **Fréquence de posting** — limite le spam

### Crowd Control

Feature séparée : collapse automatiquement les commentaires de comptes à faible confiance (karma dans le subreddit spécifique, âge du compte, historique de participation).

---

## 12. SIGNAUX COMPORTEMENTAUX ML (2026)

L'algo Reddit 2026 utilise du machine learning pour corréler comportements et qualité :

- **Scroll depth / Read ratio** — les gens lisent-ils le post en entier ou scrollent past
- **Dwell time** — temps passé sur le post
- **Saves** — signal de valeur
- **Click-through rate** — taux de clic depuis le feed
- **Return visits** — les utilisateurs reviennent-ils pour les nouveaux commentaires

### Ce que l'algo ne voit PAS

- **Le trafic externe ne compte PAS.** Vues depuis un lien Twitter ne boostent pas le ranking Reddit.
- **Le format du post est traité identiquement** dans la formule (texte, lien, image, vidéo, poll).

---

## 13. HOME FEED PERSONNALISÉ 2026

Le Home feed pour les users connectés mélange :
- Posts de subreddits abonnés (pondérés par fréquence d'interaction)
- Posts recommandés de subreddits non-suivis (inférés des intérêts et comportements)
- Posts performants qui matchent le profil de goûts

### Signaux de personnalisation

- Historique d'interaction (upvotes, comments, dwell time)
- Actions hide/report
- Engagement dans des communautés similaires
- Intérêts inférés du comportement

---

## 14. REDDIT SEARCH & SEO

- Reddit est un résultat Google majeur — "reddit" est ajouté à de nombreuses recherches Google
- Les posts bien indexés drivent du trafic pendant des mois/années via Google Search
- Les titres sont indexés par Google → titres descriptifs avec keywords = SEO long-terme
- Le search interne Reddit reste inférieur à Google pour trouver du contenu Reddit

---

## 15. AWARDS — IMPACT ALGO INDIRECT

### Système actuel (depuis mai 2024)

Reddit Gold comme monnaie unique. Achat à partir de $1.99 pour 100 Gold. Dépense 15-50 Gold par award.

### Impact algorithmique

Les awards ne sont **PAS un input algorithmique direct**. MAIS effet indirect puissant :

1. **Visual attention** — badges rendent les posts visuellement proéminents
2. **Social proof** — argent réel dépensé → seuil d'engagement plus bas
3. **Extended visibility** — engagement plus long, contrebalance le time decay
4. **Snowball effect** — awards dans les 30 premières minutes = **+340% de probabilité d'atteindre le front page** vs upvotes seuls (SingleGrain)

### Data

- Maîtrise des awards : **40-60% de taux d'engagement plus élevé**
- ROI : **3-4x meilleur engagement rate per dollar** vs paid social traditionnel

---

## 16. ML DÉTECTION QUALITÉ 2026

Le système ML priorise les réponses non-toxiques et insightful, downranke :

- **Spam** — patterns de posting répétitifs, liens commerciaux déguisés
- **Generic statements** — commentaires vides de substance
- **AI-detected low-value content** — contenu détecté comme généré par AI sans valeur ajoutée
- **Off-topic content** — contenu non-pertinent au subreddit

### Ce que l'ML récompense

- Threads avec interactions équilibrées
- Strong user behavior signals (dwell time, saves, return visits)
- Participation active et genuine
- Les threads sains sont un **ranking factor officiel** en 2026

---

## 17. r/POPULAR & r/ALL — RANKING SPÉCIFIQUE

### r/all

Agrège les posts les plus performants de tous les subreddits. Compétition massive. Les subreddits peuvent opt-out.

### r/popular

Similaire mais filtre NSFW et les plus controversés. Les users non-connectés voient r/popular par défaut.

### Normalisation

L'algo normalise les scores par la taille du subreddit. Un post avec 100 upvotes dans un subreddit de 5K members peut ranker plus haut sur r/all qu'un post avec 500 upvotes dans un subreddit de 5M members.
