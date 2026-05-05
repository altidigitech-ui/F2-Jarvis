# Canal LinkedIn — façade fondateurs F + R + page F2

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Façade fondateurs + cross-engage
> Hérite de : `../strategie.md` + `../objectifs.md` + `../../la-toile/la-toile.md`

---

## 1. Rôle dans la toile

LinkedIn est un **canal façade fondateurs**, comme Twitter. Pas un canal d'acquisition merchant Shopify direct (les merchants Shopify ne sont pas sur LinkedIn pour acheter des outils). Mais c'est là que la crédibilité se construit pour les futurs partenaires, B2B éventuels, et VC.

**Ce que LinkedIn fait pour StoreMD** :
- **Crédibilité corporate** : profils LinkedIn riches = test de premier coup d'œil pour journalistes, partenaires, investisseurs.
- **Cross-référence** : les conversions issues de LinkedIn remontent dans le dashboard admin via `utm_source=linkedin`. Volume bas mais qualifié.
- **Audience growth/SaaS B2B** : agences marketing, SaaS founders, freelancers — qui peuvent eux-mêmes connaître des merchants ou devenir clients des SaaS M2 (ClientPulse, AdAudit) plus tard.

**Ce que LinkedIn ne fait PAS** :
- Pas d'acquisition merchant Shopify directe.
- Pas de cadence quotidienne. Volume bas.
- Pas de pitch agressif.

**Particularité LinkedIn vs Twitter** : LinkedIn donne **561% de reach en plus aux profils perso vs pages company**. Donc les profils F + R sont les SEULS canaux de distribution. La page F2 est une vitrine statique, pas un canal.

---

## 2. Les 3 comptes

| Compte | Type | Persona | Angle | Cadence standard |
|---|---|---|---|---|
| **Fabrice Gangitano** | Profil perso | F | **Builder** — observations techniques, infra, code | 2 posts/sem |
| **Romain Delgado** | Profil perso | R | **Growth marketeur** — conversion, ad spend, observations e-com | 2 posts/sem |
| **FoundryTwo** | Company page | F2 | Vitrine corporate (logo, about, produits, liens) | 0-1 post/sem MAX (repost de F ou R) |

**Capacités réelles** : F et R ont les mêmes capacités techniques. La séparation builder/growth est une **image publique**, pas une vraie séparation des rôles.

**Langue** : 100% anglais (cohérent avec Twitter et la décision studio).

---

## 3. Algorithme LinkedIn 2026 — ce qui rank

Source détaillée : `../../growth-marketing/linkedin/algo.md` (332 lignes, 15+ sources croisées dont Richard van der Blom 1.8M posts analysés). Synthèse ci-dessous.

### 3.1 Pipeline en 3 étapes

| Étape | Ce qui se passe |
|---|---|
| **1. Filtre qualité** | Post classé instantanément : spam / low quality / high quality. Pattern-matching 93% précision. Si spam ou low quality → distribution quasi-nulle. |
| **2. Test golden hour** | Post montré à 2-5% du réseau de 1er degré. L'algo mesure 60 min : engagement rate, qualité des commentaires, dwell time, saves. Si fort → étape 3. Si faible → post mort. **Seulement 5% des posts qui échouent récupèrent.** |
| **3. Distribution élargie** | Push aux 95-98% restants du réseau, puis 2e et 3e degrés, puis feeds thématiques. Distribution continue tant que l'engagement se maintient — peut durer des jours. |

### 3.2 Changement majeur 2025-2026 — Depth Score

LinkedIn est passé d'un algo "engagement quantitatif" (likes, volume) à un algo "engagement qualitatif" (dwell time, profondeur des commentaires, saves, pertinence). Nouveau système : **Depth Score** mesure la VALEUR du temps passé.

Conséquences mesurées (rapport van der Blom, 1.8M posts) :
- Reach organique : **-50%** vs année précédente
- Engagement global : **-25%**
- Croissance followers : **-59%**
- Taux de conversion (reach → action business) : **stable**

Traduction : moins de gens voient le contenu, mais ceux qui le voient sont plus pertinents. **Less reach, same conversion.**

### 3.3 LLM embeddings + Knowledge Graph Validation (oct 2025)

LinkedIn comprend le contenu sémantiquement (pas mots-clés ou hashtags). Croise avec le profil de l'auteur :
- F poste sur du code/infra Shopify → cohérent avec son profil → algo amplifie.
- R poste sur growth/conversion → cohérent → algo amplifie.
- Si soudainement F poste sur le quantum computing → décalage Knowledge Graph → distribution limitée.

**Implication** : nos profils F et R doivent être cohérents et stables sur leur niche. Les Bios + About + posts récents doivent envoyer le même signal.

### 3.4 Hiérarchie des signaux d'engagement

| Signal | Poids | Implication |
|---|---|---|
| **Commentaire substantif (15+ mots)** | ★★★★★ | 2.5× plus de poids qu'un commentaire court. Optimiser pour ça. |
| **Thread de conversation (replies sous replies)** | ★★★★★ | Un post avec échanges multi-participants = 5.2× amplification vs commentaires isolés. |
| **Save** | ★★★★☆ | Nouveau signal mesuré fin 2025. Provoquer avec frameworks/checklists/data. |
| **Send (DM privé)** | ★★★★☆ | Quelqu'un envoie ton post à un collègue = preuve de valeur. |
| **Dwell time** | ★★★★☆ | Posts avec 61+ sec dwell = 15.6% engagement rate. Posts < 3 sec = 1.2%. Impossible à tricher. |
| **Clic "See more"** | ★★★☆☆ | Indique intérêt à lire la suite. |
| **Share avec commentaire** | ★★★☆☆ | Plus fort qu'un repost simple. |
| **Visite profil après lecture** | ★★★☆☆ | Mène au follow / connexion. |
| **Repost (sans commentaire)** | ★★☆☆☆ | Signal faible. |
| **Réaction (Like, Insightful, Love)** | ★★☆☆☆ | 1 commentaire = 15× 1 like. |

**Engagement d'experts > random** : commentaire d'un expert reconnu dans la niche pèse 5-7× plus qu'un random. Notre cross-engage F↔R doit avoir l'air d'une conversation entre experts, pas d'un like vide.

**Engagement pods détectés à 97% et pénalisés.** Ne pas faire de groupes d'engagement automatisés.

### 3.5 Cadence optimale

2-3 posts/semaine de qualité > 5+ posts de faible qualité. La cadence StoreMD (2/sem par personne) est calibrée pour rester dans le sweet spot.

---

## 4. Cadence StoreMD

### 4.1 Mode standard (Couche A seule)

| Compte | Posts/sem | Commentaires cross-engage F↔R | Total interactions/sem |
|---|---|---|---|
| Fabrice Gangitano | 2 | 4 (commentaires sur posts R) | 6 |
| Romain Delgado | 2 | 4 (commentaires sur posts F) | 6 |
| Page FoundryTwo | 0-1 (repost) | 0 | 0-1 |
| **Total** | **4-5 posts/sem** | **8 commentaires/sem** | **~13 interactions** |

### 4.2 Mode double-couche (Couche A + Couche B)

Référence : `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2.2.

| Compte | Couche A | Couche B | Total/sem |
|---|---|---|---|
| Fabrice Gangitano | 3 | 2 | 5 |
| Romain Delgado | 3 | 3 | 6 |
| Page FoundryTwo | 1 | 1 (optionnel) | 1-2 |
| **Total écosystème** | 7 | 5-6 | **~12-13 posts/sem** |

### 4.3 Schedule

- **Dimanche soir** : R schedule la semaine sur les profils F et R via outil tiers (LinkedIn natif scheduling ou Buffer/Hypefury). F valide.
- **Du lundi au samedi** : exécution automatique. Cross-engage manuel < 60 min après chaque post (golden hour critique).
- **Heures de publication optimales** : 7h-9h CET (early EU), 12h-13h CET (lunch break), 17h-18h CET (fin de journée). À calibrer avec les vrais résultats.

### 4.4 Engagement quotidien (à valeur, sur posts d'autres)

15 interactions/jour par personne sur des posts d'experts dans la niche (autres builders Shopify, growth marketers e-com, founders SaaS B2B). Commentaires substantifs (15+ mots), pas de "great post 🔥". Cf. `../../growth-marketing/linkedin/context.md` §3 pour la méthode complète.

**Note** : ces 15 interactions/jour LinkedIn sont distinctes des 10/jour engagement Facebook groupes Shopify et 10/jour Reddit. Si bande passante limitée, l'engagement Facebook + Reddit reste prioritaire (audience plus directement cible : merchants Shopify).

---

## 5. Couche A et Couche B sur LinkedIn

### 5.1 Couche A — Vente directe (façade fondateurs)

| Format | Angle | Compte | UTM lien |
|---|---|---|---|
| Post observation technique | F observe un problème StoreMD résout sur une boutique scannée | Fabrice Gangitano | F19 — `utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post` |
| Post observation growth | R partage une donnée terrain merchant | Romain Delgado | F19 |
| Article LinkedIn long format | Deep dive sur un problème e-com avec data | F ou R | F23 — `utm_source=linkedin&utm_medium=organic&utm_campaign=article&utm_content=article_cta` |
| Repost page F2 | F2 reposte un post de F ou R avec ajout de valeur | Page FoundryTwo | F19 |

### 5.2 Couche B — Recrutement beta

| Format | Angle | Compte |
|---|---|---|
| Post beta call | "Looking for 10 Shopify merchants to test StoreMD before App Store launch. Comment or DM if interested." | F + R |
| Article beta launch | Article qui détaille la beta + conditions + lien d'inscription | F ou R |

**UTM Couche B** : `utm_campaign=couche_b_beta` (cf. UTM_TRACKING_LINKS.md Section 2).

---

## 6. Format des posts LinkedIn

### 6.1 Différence fondamentale vs Twitter

**LinkedIn n'utilise PAS le format 2-blocs.** Le lien dans le corps du post est OK (algo LinkedIn différent, pas de pénalité reach équivalente au -1700% Twitter). Référence : `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2 — règle LinkedIn différente.

### 6.2 Structure type d'un post LinkedIn (Couche A)

```
[Hook accrocheur en 1-2 lignes — généralement contre-intuitif ou claim chiffré]

[Saut de ligne]

[Développement 5-10 lignes : contexte, observations, données, exemples concrets]

[Saut de ligne]

[3-5 bullets ou listes courtes pour la lisibilité — NE PAS utiliser format markdown listes numérotées 1. 2. 3., utiliser tirets simples]

[Saut de ligne]

[Conclusion ou question ouverte qui provoque les commentaires]

[Saut de ligne]

[CTA optionnel + lien UTM — ex: "Free Shopify scan if you want to check yours: [lien]"]
```

### 6.3 Longueur

- 800-1300 caractères = sweet spot 2026 selon van der Blom
- Trop court (< 400 caractères) = pas perçu comme "expert content"
- Trop long (> 2000 caractères) = drop-off lecture, dwell time chute

### 6.4 Visuels

- Posts avec image carrée 1080×1080 = +30% reach moyen
- Carousels (PDF documents) = excellents pour saves
- Vidéos = OK mais pas obligatoires (algo LinkedIn pas dominé par vidéo comme TikTok/Insta)

### 6.5 Hashtags

**ZÉRO hashtag.** Cf. `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §3 et `../../BIBLE.md` §8. L'algo LinkedIn 2026 fonctionne sur LLM embeddings sémantiques — les hashtags sont obsolètes pour le routage.

### 6.6 Exemple type post Fabrice (Couche A — observation technique)

```
Most Shopify "speed optimization" apps make your store slower.

I scanned 30 stores last week to verify a hunch. The slowest 5 had the most "speed apps" installed.

Why this happens:
- Each "speed" app injects 200-500KB of JavaScript
- These apps fight each other (caching collisions, render-blocking)
- One claims to compress images while another rewrites the URLs, breaking lazy loading
- Most don't clean up after themselves when uninstalled (residual code stays)

The real fix isn't installing more tools. It's auditing what's already there.

I built StoreMD partly to automate this audit. If you want a free scan to see which apps are actually slowing your store down: https://storemd.vercel.app/?utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post

What apps have you removed and gained noticeable speed?
```

### 6.7 Exemple type post Romain (Couche A — observation growth)

```
71% of Shopify chargebacks are friendly fraud, not real fraud.

Customers who got the product, kept it, and disputed anyway.

Mastercard data 2025. Most merchants don't know this number.

What it means in practice:
- Merchants who don't fight chargebacks lose ~$800/month average
- Merchants who fight win 60% with proper evidence (vs 20% without)
- The "evidence dossier" — tracking, communication, GPS data — is the difference

I've been observing how merchants handle this in Shopify communities for months. The pattern is consistent: the ones who track everything and respond fast win. The ones who eat the loss bleed slowly.

If you're a merchant losing money to chargebacks and want to see your actual exposure: https://storemd.vercel.app/?utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post

What's your current chargeback rate, and are you fighting them?
```

---

## 7. Cross-engage F + R (règle golden hour)

**Règle 60 minutes (golden hour LinkedIn)** : tout post LinkedIn doit être engagé par l'autre fondateur dans les 60 minutes (idéalement 15-30 min).

| Quand | Qui | Quoi |
|---|---|---|
| F poste | R commente < 60 min avec angle GROWTH (15+ mots, signal max) | Le commentaire doit ajouter une perspective complémentaire, pas répéter |
| R poste | F commente < 60 min avec angle TECHNIQUE (15+ mots) | Idem |

**Format type cross-comment** :
- Apporte un angle complémentaire (R growth/conversion, F technique/data)
- 15+ mots minimum (signal substantif)
- Pas de "great post" / "💯" / "this resonates"
- Engager une vraie conversation (souvent F ou R va re-commenter le commentaire = thread → signal 5.2× amplification)

JARVIS aide : F poste → mention dans le chat → JARVIS notifie R + propose un angle de commentaire.

---

## 8. UTM tagging — récap

Tous depuis `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` Section 2.

| Placement | UTM exact |
|---|---|
| Bio (Featured link) Fabrice ou Romain | `utm_source=linkedin&utm_medium=bio&utm_campaign=profile&utm_content=featured` |
| Post organique (corps du post) | `utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post` |
| Article LinkedIn (CTA en fin) | `utm_source=linkedin&utm_medium=organic&utm_campaign=article&utm_content=article_cta` |
| Commentaire (sur post d'un merchant ou thread) | `utm_source=linkedin&utm_medium=organic&utm_campaign=comment&utm_content=comment_cta` |
| DM outreach 1-to-1 | `utm_source=linkedin&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

---

## 9. Profils — éléments stratégiques

### 9.1 Featured link (le lien permanent vers le centre)

Chaque profil F et R a un Featured link en haut du profil pointant vers `storemd.vercel.app` avec UTM bio.

| Profil | Featured link cible |
|---|---|
| Fabrice Gangitano | "StoreMD — Shopify store health monitoring (free scan)" → `[lien UTM bio]` |
| Romain Delgado | "StoreMD — diagnose what's killing your Shopify conversions" → `[lien UTM bio]` |

### 9.2 Headline (1 ligne sous le nom)

| Profil | Headline cible (à finaliser) |
|---|---|
| Fabrice Gangitano | "Building StoreMD · Auditing Shopify stores · Sharing what I find" |
| Romain Delgado | "Growth + conversion for Shopify merchants · Co-founder StoreMD" |

### 9.3 About section

Bloc 5-8 phrases qui :
- Explique ce que tu fais (cohérent avec le Knowledge Graph LinkedIn)
- Donne ton angle (builder ou growth)
- Lien vers storemd.vercel.app avec UTM bio (au moins une fois dans le About)
- Pas de mention Altistone, La Toile, F2/FoundryTwo public pas obligatoire (mention OK mais pas le sujet principal)

### 9.4 Page company FoundryTwo (vitrine statique)

| Élément | Contenu |
|---|---|
| Logo, banner | Selon brand bible (`../../asset-brand/`) |
| About | 2-3 phrases : "FoundryTwo is a SaaS studio building tools for Shopify merchants. Our first products: StoreMD, ProfitPilot." |
| Produits listés | StoreMD (publié), ProfitPilot (à venir) |
| Site web | `foundrytwo.com` ou `storemd.vercel.app` selon disponibilité |
| Cadence posts | 0-1/semaine MAX (repost de F ou R uniquement) |

---

## 10. DM outreach LinkedIn

Pour les cibles très qualifiées (founder Shopify identifié, agency owner, etc.) :

### 10.1 Workflow

1. Identifier la cible via : posts engagés sur les sujets pertinents, commentaires sur threads, recommandations LinkedIn.
2. Connexion request avec note personnalisée (pas de copy-paste).
3. Une fois connectés, attendre 3-7 jours avant le DM (laisser le timeline se construire).
4. DM avec valeur d'abord (observation, scan boutique si pertinent), pas de pitch direct.

### 10.2 Format DM type

```
Hey [prénom], saw your post about [problème spécifique].

I scanned [boutique URL trouvée dans son profil] using a tool I'm building — found [3 findings concrets].

Happy to share the full report if useful. No agenda, just curious if it matches what you're seeing on your end.

Lmk: [lien UTM dm]
```

**Règle absolue** : on scanne avant de DMer. Vrais résultats, pas pitch générique. Cf. `../strategie.md` §4 levier 3.

---

## 11. Génération de contenu (via JARVIS)

Workflow standard :
1. Vendredi/samedi soir : F+R brainstorm angles de la semaine
2. Dimanche : JARVIS génère le batch (2 posts F + 2 posts R + cross-comments + 1 article si applicable)
3. F+R relisent, valident, schedulent
4. Pendant la semaine : exécution automatique + cross-engage manuel < 60 min

**Voix par persona** :
- Fabrice Gangitano : technique, analytique, observations chiffrées, builder
- Romain Delgado : business, growth, conversion, observations terrain
- Page FoundryTwo : "we" pluriel, studio, neutre (rare, repost essentiellement)

**JARVIS génère, F+R valident**. Tout draft passe par le filtre anti-IA (`../../ANTI-IA.md` + `../../romain/VOIX.md` / `../../fabrice/VOIX.md` §RÈGLE #0). JAMAIS publier le draft brut.

---

## 12. Réponses aux commentaires entrants

LinkedIn = **commentaires substantifs sont le signal #1** (cf. §3.4). Donc on RÉPOND à chaque commentaire qui mérite (pas les "great post"), et on engage souvent une conversation à plusieurs réponses (signal thread 5.2×).

### 12.1 Workflow

1. F ou R reçoit notification commentaire
2. Si commentaire substantif → on répond avec un commentaire substantif aussi (15+ mots, ajout de valeur)
3. Si commentaire question / demande info → réponse + offre scan boutique si pertinent
4. Si commentaire spam / random → ignorer (pas répondre, ne pas signaler — laisser mourir)
5. JARVIS log (pattern "engagement fait sur post LinkedIn")

### 12.2 Règle thread

Si un commenter important répond à notre réponse → on re-répond. Threads de 3-5 réponses = amplification 5.2× (cf. §3.4). C'est la mécanique principale du Depth Score.

---

## 13. Métriques à suivre

### 13.1 Stats natives LinkedIn (à récupérer hebdo)

| Métrique | Source |
|---|---|
| Impressions par post | LinkedIn Analytics |
| Dwell time moyen | LinkedIn Analytics (signal silencieux le plus puissant) |
| Commentaires (longueur + qualité) | LinkedIn Analytics |
| Saves | LinkedIn Analytics (nouveau signal 2025) |
| Sends DM | LinkedIn Analytics |
| Profile views | LinkedIn Analytics — funnel post → profil |
| Featured link clicks | LinkedIn Analytics — funnel profil → site |
| Connexions gagnées | LinkedIn Analytics |
| Connexions de 2e/3e degré atteintes | LinkedIn Analytics (signal de distribution élargie) |

### 13.2 Conversions (dashboard admin StoreMD)

| Métrique | Source |
|---|---|
| Visites depuis LinkedIn | Dashboard admin → Traffic by Source → `linkedin` |
| Visites par campagne (post / article / comment / dm) | Dashboard admin → Traffic by Campaign |
| Installs depuis LinkedIn | Dashboard admin → Recent Merchants → `utm_source=linkedin` |

### 13.3 Top et flop hebdo

JARVIS sort chaque vendredi :
- Top 3 posts LinkedIn par engagement (commentaires substantifs + saves)
- Top 3 posts LinkedIn par installs (depuis dashboard admin)
- Compte qui convertit le mieux (F vs R)
- Format gagnant (post simple vs article)
- Threads de conversation déclenchés (signal 5.2×)

---

## 14. Anti-patterns

### 14.1 Anti-patterns spécifiques LinkedIn

- **Hashtags**. Zéro, jamais. L'algo 2026 utilise LLM embeddings, hashtags obsolètes.
- **Engagement pods automatisés**. Détectés à 97% et pénalisés.
- **Posts sans cohérence avec le profil** (Knowledge Graph Validation rejette si décalage).
- **Posts trop courts (< 400 caractères)**. Pas perçus comme "expert content".
- **Réactions vides en cross-engage** (juste un like). Commentaire substantif obligatoire.
- **Cross-engage > 60 min après publication**. Golden hour ratée.
- **Posts personnels life events sur compte builder/growth**. Décalage Knowledge Graph.
- **Listes numérotées format markdown** (`1.` `2.` `3.`). Préférer tirets simples ou structure narrative.
- **Surposting**. > 4 posts/sem par personne = saturation, l'algo limite la distribution.

### 14.2 Anti-patterns IA (filtre obligatoire avant publication)

- **Em-dash "—"** comme pivot de phrase. Pattern IA #1.
- **Structure "Not X, it's Y"**.
- **"Here's the thing"**, **"At the end of the day"**, **"Which means"**, **"However,"**, **"Furthermore,"**.
- **Phrases trop "balancées" / parfaites**. Casser la structure, varier les longueurs.

Tous les drafts JARVIS passent par le filtre anti-IA `../../ANTI-IA.md` + voix persona avant publication. JAMAIS publier le draft brut.

### 14.3 Anti-patterns intégrité données

- **Inventer MRR / clients / testimonials**. Ligne rouge BIBLE §3.
- **Mentionner Altistone / La Toile** dans le contenu public. Ligne rouge.
- **Claims produit non vérifiables** sur storemd.vercel.app. Ligne rouge.

---

## 15. Documents liés

- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons
- `twitter.md` — canal jumeau (façade fondateurs aussi)
- `../jarvis/reponses-commentaires.md` — protocole réponses commentaires
- `../../growth-marketing/linkedin/algo.md` — **algo LinkedIn détaillé (332 lignes, 15+ sources)**
- `../../growth-marketing/linkedin/context.md` — règles communes existantes (à réviser progressivement)
- `../../la-toile/la-toile.md` — schéma global, fils F19-F23 (LinkedIn)
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source UTM officielle (Section 2)
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — couches A + B + cadence double-couche LinkedIn
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../romain/VOIX.md` + `../../fabrice/VOIX.md` — voix de chaque persona
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- Fichiers existants : `../../romain/linkedin/`, `../../fabrice/linkedin/`
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
