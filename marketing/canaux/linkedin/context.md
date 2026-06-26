# CONTEXT LINKEDIN — Comptes perso R + F

**Dernière mise à jour :** 05/05/2026
**Hérite de :** `BIBLE.md` + `ANTI-IA.md` + `marketing/strategie.md`
**S'appuie sur :** `marketing/canaux/linkedin/algo.md` (données algorithmiques objectives, 332 lignes, 15+ sources)
**Ce fichier contient :** stratégie, usage, cold, publication, format posts, profils, métriques LinkedIn.

---

## 1. RÔLE DE LINKEDIN DANS L'ÉCOSYSTÈME

LinkedIn est un canal d'**acquisition** (cold connexion+DM aux merchants Shopify) et de **publication** (posts focus produit). Les merchants Shopify ne sont pas massivement sur LinkedIn comme sur TikTok/Instagram, mais les founders/CEOs de petites marques DTC y sont. LinkedIn apporte aussi la crédibilité corporate (profils riches = test de premier coup d'oeil pour partenaires, journalistes, investisseurs).

Priorité LinkedIn dans le stack cold : R = 4ème position, F = 5ème position. Les plateformes cold prioritaires sont TikTok, Instagram, Facebook.

**Particularité LinkedIn** : les profils perso ont **561% de reach en plus** vs pages company. Les profils R et F sont les SEULS canaux de distribution.

---

## 2. COMPTES ET USAGE

| Compte | Profil | Cold | Publication | Engagement proactif |
|--------|--------|------|-------------|---------------------|
| **R** | Romain Delgado | ✅ 10 connexions+DMs/jour | ✅ mardi, jeudi | ❌ Zéro |
| **F** | Fabrice Gangitano | ✅ 10 connexions+DMs/jour | ✅ mercredi, vendredi | ❌ Zéro |

**Pas de compte StoreMD sur LinkedIn.** Pas de page company FoundryTwo. R et F publient en leur nom propre, focus produit. La séparation builder (F) / growth (R) est une image publique.

**Langue** : 100% anglais.

**Contrainte beta** : StoreMD n'est pas encore sur le Shopify App Store. Les merchants doivent DM et on donne le lien d'installation manuellement.

---

## 3. COLD — 10 CONNEXIONS+DMs/JOUR PAR PERSONNE

### Cible

Merchants qui ont une boutique Shopify. Uniquement. Pas de devs, pas d'agencies, pas de Shopify Partners/Experts, pas de consultants. BIBLE §5 : ciblage logique par produit.

Le piège LinkedIn : beaucoup de résultats pour "Shopify" sont des Shopify DEVELOPERS, PARTNERS, EXPERTS, agencies. Le filtrage NOT dans les recherches booléennes est critique.

### Source de cibles

Apify.

### Commercial Use Limit (compte gratuit)

LinkedIn impose ~250-350 recherches/mois. Chaque requête booléenne = 1 recherche consommée. Reset le 1er de chaque mois. Pas de compteur visible. Suivre la consommation dans le recherche-log.

**Alternative si limite approche** : Google X-Ray : `site:linkedin.com/in "Shopify" AND ("store owner" OR "brand founder") -developer -agency`

### Méthode cold

LinkedIn = connexion d'abord, DM ensuite. Pas de DM direct comme Twitter/Instagram.

1. Envoyer une demande de connexion (avec note personnalisée si possible — **5 notes/mois gratuites**, 200 caractères max)
2. Si accepté → DM avec le template cold (voir `saas-app-shopify/storemd/cold/cold-templates.md`)
3. Lien landing page (storemd.vercel.app) OK dans le premier DM
4. Lien d'installation beta = APRÈS réponse du merchant seulement
5. 1 seul DM initial. Pas de relance si pas de réponse.

### Format DM type

```
Hey [prénom], saw your [post/profile] about [problème ou boutique spécifique].

I scanned [boutique URL] using a tool I'm building — found [3 findings concrets]:
- [Finding 1 chiffré]
- [Finding 2 chiffré]
- [Finding 3 chiffré]

Happy to share the full report if useful. No agenda.
```

### Limites compte gratuit

| Limite | Seuil safe |
|--------|-----------|
| Connexions/semaine | ~100 (safe : 80) |
| Notes personnalisées/mois | 5 (200 caractères) |
| Messages gratuits aux membres de groupes | 10/semaine (sans InMail) |
| Profils consultables/jour | ~500 (safe : 250) |
| Taux d'acceptation minimum safe | 30%+ |

### Logs

Logger dans `romain/cold/cold-log-linkedin.md` (R) ou `fabrice/cold/cold-log-linkedin.md` (F).

---

## 4. PUBLICATION — 2/SEMAINE PAR PERSONNE

### Calendrier

- **R** : mardi et jeudi
- **F** : mercredi et vendredi

### Process

Tout est batché le samedi et schedulé. En semaine on ne rédige pas. On vérifie que les posts sont bien publiés.

### Règles de publication

- **PAS de lien dans le corps du post.** Pénalité algo -45 à -60% de reach. Si lien nécessaire → en commentaire (mais même ça pénalise -10-15% en 2026). Idéalement : pas de lien du tout, lien en bio Featured.
- Pas de hashtag (ou 1-3 max niche). Pas de génériques (#Marketing, #Ecommerce). >5 = signal spam. L'algo 2026 utilise LLM embeddings sémantiques, les hashtags sont quasi-obsolètes.
- Pas de pitch direct produit dans chaque post. Le contenu doit avoir de la valeur standalone.
- Pas d'engagement bait ("Comment YES if you agree", "Like if you relate").
- Contractions obligatoires en anglais.
- ANTI-IA appliqué sans exception. Le contenu AI formulaique est déprioritisé (360Brew classifier NLP).

### Voix

- **R** : "I", angle business, growth, conversion, observations terrain. Détail dans `romain/VOIX.md`.
- **F** : "I", angle technique accessible pour merchants (pas pour devs). Détail dans `fabrice/VOIX.md`.

---

## 5. ALGO LINKEDIN 2026

Source détaillée : `marketing/canaux/linkedin/algo.md`. Synthèse ci-dessous.

### Pipeline en 3 étapes

| Étape | Ce qui se passe |
|-------|----------------|
| **1. Filtre qualité** | Post classé instantanément : spam / low quality / high quality. Pattern-matching 93% précision. Si spam ou low quality → distribution quasi-nulle. |
| **2. Test golden hour** | Post montré à 2-5% du réseau 1er degré. L'algo mesure 60 min : engagement rate, qualité commentaires, dwell time, saves. Si fort → étape 3. Si faible → post mort. Seulement 5% des posts qui échouent récupèrent. |
| **3. Distribution élargie** | Push aux 95-98% restants, puis 2e et 3e degrés, puis feeds thématiques. Distribution continue tant que l'engagement se maintient. |

### Depth Score (changement majeur 2025-2026)

LinkedIn est passé d'un algo "engagement quantitatif" (likes, volume) à "engagement qualitatif" (dwell time, profondeur commentaires, saves, pertinence).

Conséquences mesurées (van der Blom, 1.8M posts analysés) :
- Reach organique : -50% vs année précédente
- Engagement global : -25%
- Croissance followers : -59%
- Taux de conversion (reach → action business) : stable

Traduction : moins de gens voient le contenu, mais ceux qui le voient sont plus pertinents. Less reach, same conversion.

### LLM Embeddings + Knowledge Graph Validation (octobre 2025)

LinkedIn comprend le contenu sémantiquement. Croise avec le profil de l'auteur :
- F poste sur du technique Shopify → cohérent avec son profil → algo amplifie
- R poste sur growth/conversion → cohérent → algo amplifie
- Si décalage soudain (F poste sur le quantum computing) → distribution limitée

Les profils F et R doivent être cohérents et stables sur leur niche. Bios + About + posts récents doivent envoyer le même signal.

### Hiérarchie des signaux d'engagement

| Signal | Poids | Implication |
|--------|-------|-------------|
| **Commentaire substantif (15+ mots)** | ★★★★★ | 2.5x plus de poids qu'un commentaire court |
| **Thread de conversation (replies sous replies)** | ★★★★★ | 5.2x amplification vs commentaires isolés |
| **Save** | ★★★★☆ | Nouveau signal mesuré fin 2025. Provoquer avec frameworks/checklists/data. |
| **Send (DM privé)** | ★★★★☆ | Quelqu'un envoie ton post à un collègue = preuve de valeur |
| **Dwell time** | ★★★★☆ | Posts 61+ sec dwell = 15.6% engagement rate. Posts < 3 sec = 1.2%. Impossible à tricher. |
| **Clic "See more"** | ★★★☆☆ | Indique intérêt à lire la suite |
| **Share avec commentaire** | ★★★☆☆ | Plus fort qu'un repost simple |
| **Visite profil après lecture** | ★★★☆☆ | Mène au follow / connexion |
| **Repost (sans commentaire)** | ★★☆☆☆ | Signal faible |
| **Réaction (Like, Insightful, Love)** | ★★☆☆☆ | 1 commentaire = 15x 1 like |

### Cadence optimale

2-3 posts/semaine de qualité > 5+ posts de faible qualité. Notre cadence (2/sem par personne) est dans le sweet spot.

---

## 6. FORMAT POSTS LINKEDIN

### Structure type

```
[Hook accrocheur 1-2 lignes — contre-intuitif ou claim chiffré]

[Saut de ligne]

[Développement 5-10 lignes : contexte, observations, données, exemples concrets]

[Saut de ligne]

[3-5 points pour la lisibilité — tirets simples, pas de listes numérotées]

[Saut de ligne]

[Conclusion ou question ouverte qui provoque les commentaires]

[Saut de ligne]

[Optionnel : "Free scan if you want to check yours — link in my Featured"]
```

### Longueur

- **Sweet spot : 800-1300 caractères** (van der Blom 2026)
- Les 210 premiers caractères = le hook avant "see more"
- < 400 caractères = pas perçu comme expert content
- > 2000 caractères = drop-off lecture, dwell time chute

### Visuels

- Posts avec image carrée 1080x1080 = +30% reach moyen
- Document posts (PDF carrousels) = format roi pour les saves. Engagement le plus élevé.
- Vidéo native < 90 secondes, vertical 9:16, captions obligatoires

### Exemple post Fabrice (angle technique)

```
Most Shopify "speed optimization" apps make your store slower.

I scanned 30 stores last week to verify a hunch. The slowest 5 had the most "speed apps" installed.

Why this happens:
- Each "speed" app injects 200-500KB of JavaScript
- These apps fight each other (caching collisions, render-blocking)
- One claims to compress images while another rewrites the URLs, breaking lazy loading
- Most don't clean up after themselves when uninstalled (residual code stays)

The real fix isn't installing more tools. It's auditing what's already there.

What apps have you removed and gained noticeable speed?
```

### Exemple post Romain (angle growth)

```
71% of Shopify chargebacks are friendly fraud, not real fraud.

Customers who got the product, kept it, and disputed anyway.

Mastercard data 2025. Most merchants don't know this number.

What it means in practice:
- Merchants who don't fight chargebacks lose ~$800/month average
- Merchants who fight win 60% with proper evidence (vs 20% without)
- The "evidence dossier" — tracking, communication, GPS data — is the difference

I've been observing how merchants handle this in Shopify communities for months. The pattern is consistent: the ones who track everything and respond fast win. The ones who eat the loss bleed slowly.

What's your current chargeback rate, and are you fighting them?
```

**Note exemples** : ces posts ne contiennent PAS de lien dans le corps. Le lien est dans le Featured du profil.

---

## 7. PROFILS — ÉLÉMENTS STRATÉGIQUES

### Featured link (lien permanent vers le centre)

Chaque profil R et F a un Featured link en haut du profil pointant vers `storemd.vercel.app` avec UTM bio.

| Profil | Featured link |
|--------|--------------|
| Fabrice Gangitano | "StoreMD — Shopify store health monitoring (free scan)" |
| Romain Delgado | "StoreMD — diagnose what's killing your Shopify conversions" |

### Headline (1 ligne sous le nom)

| Profil | Headline |
|--------|----------|
| Fabrice Gangitano | "Building StoreMD · Auditing Shopify stores · Sharing what I find" |
| Romain Delgado | "Growth + conversion for Shopify merchants · Co-founder StoreMD" |

### About section

5-8 phrases qui :
- Expliquent ce que tu fais (cohérent avec le Knowledge Graph LinkedIn)
- Donnent ton angle (builder ou growth)
- Lien vers storemd.vercel.app avec UTM bio (au moins une fois)
- Pas de mention Altistone / La Toile

### Knowledge Graph cohérence

Les Bios + About + posts récents doivent envoyer le même signal de niche. F = technique Shopify. R = growth e-com. Si le signal est incohérent, l'algo limite la distribution.

---

## 8. RÉPONSES

On répond :
- Aux commentaires sur NOS posts (R, F)
- Aux DMs reçus (merchants qui acceptent la connexion et répondent, ou qui nous contactent)
- Délai max : 2h
- Répondre dans les 2 premières heures = +30% engagement sur le lifecycle du post

On ne fait PAS :
- D'engagement proactif (commenter les posts des autres)
- De likes/réactions stratégiques
- De participation active dans les groupes LinkedIn (faible utilité, groupes quasi-morts)

### Workflow Jarvis

1. Notification commentaire sur un post R ou F
2. Si commentaire substantif → réponse substantive (15+ mots, ajout de valeur)
3. Si question → réponse + offre scan boutique si pertinent
4. Si spam → ignorer
5. Jarvis log

### Threads

Si un commenter important répond à notre réponse → on re-répond. Threads de 3-5 réponses = amplification 5.2x. C'est la mécanique principale du Depth Score.

### Cas DM merchant intéressé

Si un merchant DM en demandant une démo ou en posant une question → scanner sa boutique, envoyer les vrais résultats, inclure le lien d'installation beta.

---

## 9. UTM TAGGING

| Placement | UTM |
|-----------|-----|
| Bio (Featured link) R ou F | `utm_source=linkedin&utm_medium=bio&utm_campaign=profile&utm_content=featured` |
| Post organique (en commentaire, pas dans le corps) | `utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post` |
| Article LinkedIn (CTA en fin) | `utm_source=linkedin&utm_medium=organic&utm_campaign=article&utm_content=article_cta` |
| DM outreach | `utm_source=linkedin&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

Pour tout placement non listé dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, l'ajouter d'abord au fichier officiel.

---

## 10. MÉTRIQUES

### Stats natives LinkedIn (hebdo)

| Métrique | Pourquoi |
|----------|----------|
| Impressions par post | Reach |
| Dwell time moyen | Signal silencieux le plus puissant |
| Commentaires (longueur + qualité) | Signal #1 engagement |
| Saves | Nouveau signal 2025, valeur durable |
| Sends DM | Preuve de valeur |
| Profile views | Funnel : post → profil |
| Featured link clicks | Funnel : profil → site |
| Connexions gagnées | Réseau qui grandit |
| Connexions 2e/3e degré atteintes | Signal de distribution élargie |

### Conversions (dashboard admin StoreMD)

| Métrique | Source |
|----------|--------|
| Visites depuis LinkedIn | Dashboard admin → Traffic by Source → `linkedin` |
| Visites par campagne | Dashboard admin → Traffic by Campaign |
| Installs depuis LinkedIn | Dashboard admin → Recent Merchants → `utm_source=linkedin` |

---

## 11. ANTI-PATTERNS

### Spécifiques LinkedIn

| Interdit | Pourquoi |
|----------|----------|
| Lien dans le corps du post | -45 à -60% de reach. Lien en commentaire si nécessaire, idéalement en Featured uniquement. |
| Hashtags génériques (#Marketing, #Ecommerce) | Signal spam. >5 = pénalité. LLM embeddings rendent les hashtags quasi-obsolètes. |
| Engagement pods automatisés | Détectés à 97% et pénalisés |
| Posts sans cohérence avec le profil | Knowledge Graph Validation rejette si décalage |
| Posts trop courts (< 400 caractères) | Pas perçu comme expert content |
| Engagement bait ("Comment YES") | Pénalisé |
| Polls | 0.07% engagement, catégorisé low-effort par l'algo |
| Surposting (> 4 posts/sem par personne) | Saturation, l'algo limite la distribution |
| Actions en rafale (profils visités trop vite) | Détection bot, CAPTCHA, restriction |
| Cibler des devs, Shopify Partners/Experts, agencies | BIBLE §5 ciblage logique |

### Règles communes

| Interdit | Pourquoi |
|----------|----------|
| Em-dash, "Here's the thing", "Not X — it's Y" | Détecté IA. Cf. `ANTI-IA.md`. Contenu AI formulaique déprioritisé (360Brew classifier NLP). |
| Inventer des chiffres / résultats | BIBLE §3 |
| Mentionner Altistone / La Toile | BIBLE §2 |
| Personal branding / influence | On vend le produit, pas les fondateurs |
| Build in public | Le merchant s'en fout |

---

## 12. DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Algo LinkedIn | `marketing/canaux/linkedin/algo.md` |
| Stratégie marketing globale | `marketing/strategie.md` |
| Objectifs et KPIs | `marketing/objectifs.md` |
| Réponses commentaires Jarvis | `marketing/jarvis/reponses-commentaires.md` |
| Cold-log R | `romain/cold/cold-log-linkedin.md` |
| Cold-log F | `fabrice/cold/cold-log-linkedin.md` |
| Cold templates | `saas-app-shopify/storemd/cold/cold-templates.md` |
| Context StoreMD | `saas-app-shopify/storemd/context.md` |
| Voix R | `romain/VOIX.md` |
| Voix F | `fabrice/VOIX.md` |
| UTM tracking | `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` |
| ANTI-IA | `ANTI-IA.md` |
| BIBLE | `BIBLE.md` |
