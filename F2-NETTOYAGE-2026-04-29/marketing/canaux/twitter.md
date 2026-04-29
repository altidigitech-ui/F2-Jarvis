# Canal Twitter — façade fondateurs F + R + F2

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Façade fondateurs + cross-engage
> Hérite de : `../strategie.md` + `../objectifs.md` + `../../la-toile/la-toile.md`

---

## 1. Rôle dans la toile

Twitter est un **canal façade fondateurs**, pas un canal d'acquisition principal. Les merchants Shopify ne sont pas sur Twitter à scroller pour acheter. Ils y vont pour suivre des builders, des marketeurs, ou pour se tenir au courant.

**Ce que Twitter fait pour StoreMD** :
- **Crédibilité** : un compte fondateur actif avec audience qualifiée donne du sérieux à l'entreprise. Un VC, un partenaire, un journaliste qui Googleise F ou R doit voir un compte vivant et expert.
- **Cross-référence** : les conversions issues de Twitter remontent dans le dashboard admin via `utm_source=twitter`. Faible volume mais qualifié.
- **Capture de l'audience builder/SaaS** : indiehackers, autres founders, qui peuvent eux-mêmes connaître des merchants.

**Ce que Twitter ne fait PAS** :
- Pas d'acquisition merchant Shopify directe (ils ne sont pas là).
- Pas de cadence quotidienne haute. Volume bas mais constant.
- Pas de pitch agressif. C'est de la façade, pas de la vente.

---

## 2. Les 3 comptes

| Compte | Persona | Angle | Langue | Cadence standard | UTM |
|---|---|---|---|---|---|
| **@FabGangi** | F (Fabrice) | **Builder** — code, infra, observations techniques | EN | 3 posts/sem | F17 (bio), F16 (reply lien) |
| **@delgado_ro72224** | R (Romain) | **Growth marketeur** — conversion, ad spend, observations e-com | EN | 3 posts/sem | F17 (bio), F16 (reply lien) |
| **@foundrytwo** | F2 (studio) | Vitrine studio, build in public minimal, launches | EN | 5 posts/sem | F17 (bio), F16 (reply lien) |

**Capacités réelles** : F et R ont les mêmes capacités techniques. La séparation builder/growth est une **image publique** sur Twitter/LinkedIn, pas une vraie séparation des rôles.

---

## 3. Algorithme Twitter/X 2026 — ce qui rank

Source détaillée : `../../growth-marketing/twitter/algo.md` (286 lignes, code open-source X github.com/xai-org/x-algorithm). Synthèse des points clés ci-dessous — pour les détails, lire le fichier source.

### 3.1 Pipeline en 3 étapes

| Étape | Ce qui se passe |
|---|---|
| **Candidate Sourcing** | L'algo pioche ~1 500 candidats parmi 500M+ tweets/jour. 50% in-network (suivis), 50% out-of-network (Phoenix/Grok Retrieval). |
| **Neural Network Ranking** | Réseau de ~48M paramètres prédit la probabilité d'engagement. Score composite. |
| **Filtering & Mixing** | Filtrage spam/NSFW/déjà-vu. Mixage avec ads, Spaces, trending. |

5 milliards de décisions de ranking/jour, < 1.5 seconde chacune.

### 3.2 Changement majeur janvier 2026

X a remplacé l'ancien ranking par un **modèle Grok (transformer)** qui lit sémantiquement chaque post + regarde chaque vidéo. Conséquences :
- L'algo comprend le SENS du contenu, pas juste les mots-clés. Hashtags inutiles pour le routage.
- Catégorisation via **SimClusters** (145K topics).
- Analyse du **sentiment** : contenu positif/constructif → boost. Combatif/négatif → réduit (même si engagement élevé).

### 3.3 Poids des interactions — la table de la loi

| Action | Poids vs Like | Implication concrète |
|---|---|---|
| **Reply engagée par l'auteur** (quelqu'un reply + l'auteur répond) | **150×** | LE signal roi. Répondre à CHAQUE reply = non-négociable. |
| **Reply simple** | **27×** | Provoquer des replies > récolter des likes. |
| **Quote tweet** | **25×** | Quand quelqu'un quote = jackpot. |
| **Clic profil + like/reply** | **24×** | La bio doit convertir vers le site. |
| **Clic conversation + reply** | **22×** | Threads génèrent ce signal naturellement. |
| **Dwell time 2+ min** | **20×** | Contenu long si les gens restent. |
| **Bookmark** | **20×** | Boost silencieux. Provoquer avec frameworks/data/checklists. |
| **Retweet/Repost** | 2-40× | Variable selon les sources. |
| **Like** | 1× | Signal le plus faible. |
| **Vidéo vue 50%+** | ~0× | Négligeable en scoring direct. |
| **Action négative** (block, mute, "not interested", report) | **-148×** | DÉVASTATEUR. 1 block annule des dizaines d'engagements positifs. |

**Conséquence** : 1 conversation (reply + réponse de l'auteur) = 150 likes. Notre stratégie engagement doit être **provocation utile + réponse systématique**.

### 3.4 Les 2 feeds

| Feed | Fonctionnement | Notre cible |
|---|---|---|
| **For You** | Algorithmique. Mix in-network + out-of-network. Feed par défaut. | ✅ Là où on veut apparaître |
| **Following** | Depuis nov 2025, Grok trie par engagement prédit (option chrono possible). | Secondaire |

---

## 4. Cadence StoreMD

### 4.1 Mode standard (Couche A seule)

| Compte | Posts/sem | Replies cross-engage | Total interactions/sem |
|---|---|---|---|
| @FabGangi (F) | 3 | 14 (replies aux posts R + F2) | ~17 |
| @delgado_ro72224 (R) | 3 | 14 (replies aux posts F + F2) | ~17 |
| @foundrytwo (F2) | 5 | 0 (F2 ne reply pas, F2 reçoit) | 5 |
| **Total** | **11 posts/sem** | **28 replies/sem** | **39 interactions** |

### 4.2 Mode double-couche (Couche A + Couche B en parallèle)

Référence : `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2.1.

| Compte | Couche A | Couche B | Total posts/sem |
|---|---|---|---|
| @FabGangi (F) | 3 | 3 | 6 |
| @delgado_ro72224 (R) | 5 | 3 | 8 |
| @foundrytwo (F2) | 5 (dont 2 threads) | 3 | 8 |
| **Total écosystème** | 13 | 9 | **~22 tweets/sem** (~26 si threads comptés) |

### 4.3 Schedule

- **Dimanche soir** : R schedule la semaine entière sur les 3 comptes via outil tiers (Buffer/Typefully/Hypefury, à choisir si pas déjà actif). F valide.
- **Du lundi au samedi** : exécution automatique. Cross-engage manuel < 30 min après chaque post.
- **Heures de publication** : à calibrer avec les vrais résultats. Repère général : 7h30-8h CET (peak EU + early US East), 13h-14h CET (lunch), 16h-17h CET (après-midi US matin).

---

## 5. Format 2-blocs — règle absolue Twitter

Source : `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2 + `../../growth-marketing/twitter/algo.md` §6.3.

**Lien dans le corps du tweet = -1700% reach**. A/B test documenté.

### 5.1 Format obligatoire pour tout post avec CTA lien

```markdown
## POST (À PUBLIER)

[Texte du tweet SANS URL. CTA se termine par la phrase d'accroche seule.
Exemple : "Free scan, 60 seconds."]

[VIDEO ou THREAD indicator si applicable]

---

## REPLY (À PUBLIER MANUELLEMENT APRÈS PUBLICATION DU POST)

[URL UTM tagué + phrase courte d'accompagnement.
Exemple : "https://storemd.vercel.app/?utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta"]
```

### 5.2 Pour les threads

La reply URL s'attache au **dernier tweet** du thread, pas au premier. Le texte du dernier tweet ne contient pas l'URL.

### 5.3 Posts sans CTA lien

Si le post est purement engagement (observation, question, opinion), pas de reply lien. Format simple, un seul tweet. C'est OK.

---

## 6. Couche A et Couche B sur Twitter

### 6.1 Couche A — Vente directe (façade fondateurs)

| Format | Angle | Compte | UTM (reply lien) |
|---|---|---|---|
| Tweet observation technique | F observe un problème StoreMD résout sur une boutique | @FabGangi | F16 — `utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta` |
| Tweet observation growth | R partage une donnée terrain merchant | @delgado_ro72224 | F16 |
| Tweet vitrine studio | F2 annonce une feature StoreMD ou un milestone | @foundrytwo | F16 |
| Thread "How we built X" | F2 ou F détaille une découverte technique/data | @foundrytwo ou @FabGangi | F18 — `utm_campaign=thread&utm_content=thread_cta` |

### 6.2 Couche B — Recrutement beta

| Format | Angle | Compte |
|---|---|---|
| Tweet beta call | "Looking for 10 Shopify merchants to test StoreMD before App Store launch. DM if interested." | @foundrytwo principalement, @FabGangi/@delgado_ro72224 occasionnellement |
| Thread beta details | Détaille ce que la beta apporte au merchant | @foundrytwo |

**UTM Couche B** : variante `utm_campaign=couche_b_beta` à ajouter au `UTM_TRACKING_LINKS.md`. Pas d'invention.

---

## 7. Format des tweets

### 7.1 Tweet observation (Couche A)

```
[Affirmation choc en 1 ligne]

[Développement 2-3 lignes : pourquoi, données, expérience]

[Question ouverte ou statement provoquant]
```

**Exemple type @FabGangi (technique)** :
```
Most "Shopify speed apps" make your store slower.

The reason : they inject 200-500KB of JS each, including the ones that promise to "optimize" your speed. I scanned 30 stores last week. The slowest 5 had the most "speed apps" installed.

Counterintuitive but consistent.
```

**Exemple type @delgado_ro72224 (growth)** :
```
71% of chargebacks are friendly fraud. Not real fraud — customers who got the product, kept it, then disputed.

Most merchants don't know this. They eat the loss because fighting feels useless.

Mastercard data 2025.
```

### 7.2 Thread (Couche A — typiquement F2)

```
Tweet 1 : Hook + promesse (lis ce thread parce que…)
Tweet 2-6 : 1 idée par tweet, données concrètes, observations
Tweet 7 : Conclusion / takeaway
Tweet 8 : Reply automatique avec lien UTM (F18)
```

### 7.3 Tweet pure engagement (sans CTA lien)

```
[Observation pointue 1-2 phrases]

[Question ouverte ou retournement]
```

Pas de reply URL pour ce format. Pas obligatoire de mettre un lien à chaque tweet.

### 7.4 Tweet beta call (Couche B)

```
Looking for 10 Shopify merchants to test StoreMD before App Store launch.

It scans your store for [problèmes spécifiques] in 60 seconds.

Free, hors store install (special link).
DM if interested.
```

(reply lien Couche B en suivi)

---

## 8. Cross-engage F + R + F2

**Règle 30 minutes (cf. `../../la-toile/la-toile.md` §5)** : tout post Twitter doit être engagé par les autres comptes du studio dans les 30 min.

| Quand | Qui | Quoi |
|---|---|---|
| F poste | R reply < 30 min avec angle GROWTH | Signal "reply engagée par auteur" si F répond ensuite = 150× |
| R poste | F reply < 30 min avec angle TECHNIQUE | Idem |
| F2 poste | F + R reply < 30 min, chacun avec son angle | Double signal d'engagement croisé |

**Format reply cross-engage** : pas un like vide. Une vraie reply qui apporte un angle complémentaire (cf. `../../romain/twitter/cross-replies.md` et `../../fabrice/twitter/cross-replies.md` si existent).

JARVIS aide : F poste → mention dans le chat ("posté @FabGangi") → JARVIS notifie R + propose un angle de reply.

---

## 9. UTM tagging — récap

Tous depuis `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` Section 1.

| Placement | UTM exact |
|---|---|
| Bio @FabGangi / @delgado_ro72224 / @foundrytwo | `utm_source=twitter&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| Reply après tweet (format 2-blocs) | `utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta` |
| Thread (lien dans dernier tweet) | `utm_source=twitter&utm_medium=organic&utm_campaign=thread&utm_content=thread_cta` |
| Post de feature drop | `utm_source=twitter&utm_medium=organic&utm_campaign=feature_launch&utm_content=post` |
| DM Twitter (cold outreach) | À ajouter au `UTM_TRACKING_LINKS.md` (placement non listé) |
| Ads Twitter | `utm_medium=paid&utm_campaign=ads_traffic` ou `ads_install` (pas activé pour l'instant) |

---

## 10. Bio Twitter

Chaque compte a un lien permanent dans la bio vers `storemd.vercel.app` avec UTM bio.

| Compte | Bio cible (à finaliser par F+R) |
|---|---|
| @FabGangi | "Building StoreMD. Auditing 50+ Shopify stores/month. Sharing what I find. → [lien UTM bio]" |
| @delgado_ro72224 | "Growth + conversion for Shopify merchants. Founder StoreMD. → [lien UTM bio]" |
| @foundrytwo | "We build SaaS for Shopify merchants. StoreMD live, ProfitPilot next. → [lien UTM bio]" |

**Règle bio (cf. `../../la-toile/la-toile.md` §7)** : aucune bio sans lien vers le centre. Compte sans lien = trou dans la toile.

---

## 11. Génération de contenu (via JARVIS)

Workflow standard :
1. Vendredi/samedi soir : F+R brainstorm angles de la semaine
2. Dimanche : JARVIS génère le batch (3 posts F + 3 posts R + 5 posts F2 + 1-2 threads + replies cross-engage)
3. F+R relisent, valident, schedulent dans Buffer/Typefully/Hypefury
4. Pendant la semaine : exécution automatique + cross-engage manuel < 30 min

**Template batch** : `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` (référence obligatoire).

**Voix par persona** :
- @FabGangi : technique, analytique, observations chiffrées, builder
- @delgado_ro72224 : business, growth, conversion, observations terrain
- @foundrytwo : "we" pluriel, studio, vocabulaire forge dosé, neutre

**JARVIS génère, F+R valident**. Tout draft passe par le filtre anti-IA (`../../ANTI-IA.md` + `../../romain/VOIX.md` / `../../fabrice/VOIX.md` §RÈGLE #0). JAMAIS publier le draft brut.

---

## 12. Réponses aux replies entrantes

Workflow :
1. F ou R reçoit notification reply sur un de ses tweets
2. **Règle critique algo** : reply engagée par l'auteur = 150× like. Donc on REPLY à chaque reply qui mérite (pas les bots, pas les "lol").
3. Screenshot reply envoyée à JARVIS si besoin d'aide rédaction
4. JARVIS propose 2 variantes dans la voix de la persona
5. F ou R publie

**Cas particuliers** :
- Reply provocatrice / négative : répondre calmement, factuellement. Ne pas escalader. Le sentiment négatif est down-rankés (cf. §3.2).
- Reply qui demande info / démo : on bascule en DM si pertinent, on envoie un scan boutique sur mesure (levier 3 cf. `../strategie.md`).
- Reply spam / bot : block sans hésiter. **Block ne pénalise pas notre compte** ; mais nous protège du sentiment négatif si on engage.

---

## 13. Métriques à suivre

### 13.1 Stats natives X (à récupérer hebdo)

| Métrique | Source |
|---|---|
| Impressions par post | X Analytics |
| Engagement rate (likes + replies + RT) | X Analytics |
| Replies (signal le plus fort) | X Analytics |
| Quote tweets | X Analytics |
| Bookmarks | X Analytics (signal silencieux puissant) |
| Profile visits | X Analytics — funnel post → profil |
| Bio link clicks | X Analytics — funnel profil → site |
| Followers gagnés | X Analytics |

### 13.2 Conversions (dashboard admin StoreMD)

| Métrique | Source |
|---|---|
| Visites depuis Twitter | Dashboard admin → Traffic by Source → `twitter` |
| Visites par campagne (post / thread / reply / feature_launch) | Dashboard admin → Traffic by Campaign |
| Installs depuis Twitter | Dashboard admin → Recent Merchants → `utm_source=twitter` |

### 13.3 Top et flop hebdo

JARVIS sort chaque vendredi :
- Top 3 tweets par engagement Twitter natif
- Top 3 tweets par installs (depuis dashboard admin)
- Compte qui convertit le mieux (F vs R vs F2)
- Format gagnant (post simple vs thread)
- Replies engagées par l'auteur — taux de conversion (combien de conversations 150× déclenchées)

---

## 14. Anti-patterns

### 14.1 Anti-patterns spécifiques Twitter

- **Lien dans le corps du tweet**. -1700% reach. TOUJOURS format 2-blocs (post sans URL + reply avec URL).
- **Hashtags**. Zéro, jamais. Cf. `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §3.
- **Pas répondre aux replies entrantes**. Tu rates le signal 150×.
- **Engager dans des thread combatifs / négatifs**. Sentiment négatif down-rankés.
- **Tweet > 280 caractères forcé en threads de 2-3 tweets**. Si une idée tient en 280 caractères, faire 1 tweet. Si elle nécessite un thread, faire 5+ tweets.
- **Cross-engage faible (juste un like)**. Vraie reply avec angle complémentaire = 150× signal.
- **Cross-engage > 30 min après publication**. La fenêtre golden hour est passée.
- **Mention de "bot" ou outil d'automatisation visible**. Signal spam.

### 14.2 Anti-patterns IA (filtre anti-IA obligatoire avant publication)

- **Em-dash "—"** comme pivot de phrase. Pattern IA #1.
- **Structure "Not X, it's Y"**. Pattern IA détecté instantanément.
- **"Here's the thing"**, **"At the end of the day"**, **"Which means"**, **"However,"**, **"Furthermore,"**. Tous patterns IA bannis.
- **Listes numérotées dans les tweets**. À éviter sur Twitter (style trop formel pour la plateforme).
- **Formes longues en anglais** ("do not", "will not", "I have"). Utiliser les contractions ("don't", "won't", "I've").

Tous les drafts JARVIS DOIVENT passer par le filtre anti-IA `../../ANTI-IA.md` + voix persona avant publication. JAMAIS publier le draft brut.

### 14.3 Anti-patterns intégrité données

- **Inventer MRR, revenue, nombre de clients payants**. Ligne rouge BIBLE §3.
- **Inventer testimonials verbatim**. Ligne rouge.
- **Mentionner Altistone** ou la Toile dans le contenu public. Ligne rouge.
- **Claims produit non vérifiables** sur storemd.vercel.app. Ligne rouge.

---

## 15. Documents liés

- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons
- `linkedin.md` — canal jumeau (façade fondateurs aussi)
- `../jarvis/reponses-commentaires.md` — protocole réponses replies
- `../../growth-marketing/twitter/algo.md` — **algo Twitter détaillé (286 lignes, source open-source X)**
- `../../la-toile/la-toile.md` — schéma global, fils F16-F18 (Twitter)
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source UTM officielle (Section 1)
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — couches A + B + format 2-blocs obligatoire
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../romain/VOIX.md` + `../../fabrice/VOIX.md` — voix de chaque persona
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- Fichiers existants : `../../romain/twitter/`, `../../fabrice/twitter/`, `../../f2/twitter/`
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
