# TEMPLATE BATCH DOUBLE-COUCHE + RULES BATCH INTÉGRÉES

> **Fichier unique consolidé** pour la génération de tout nouveau batch hebdomadaire double-couche.
> **Dernière mise à jour :** 21 avril 2026.
> **Usage :** lire la PARTIE 1 (règles générales) avant de remplir la PARTIE 2 (structure du batch).

---

## STRUCTURE DU FICHIER

Ce fichier regroupe deux ressources complémentaires pour la création de batchs hebdomadaires :

**PARTIE 1 — RULES BATCH** (règles générales applicables à TOUS les batchs, simple ou double-couche)
- Source : ex-`RULES-BATCH.md`
- 9 sections couvrant URL produit, format 2-blocs Twitter, hashtags, lignes rouges BIBLE §3 v2.1, chiffres locked canon, structure fichier post, cross-engagement, checklist pré-dispatch, intégration repo
- Référence obligatoire pour Claude Code, agents (`f2-marketer`), et rédacteurs humains

**PARTIE 2 — TEMPLATE BATCH DOUBLE-COUCHE** (structure de batch pour 2 stratégies parallèles sur la même semaine)
- Source : ex-`TEMPLATE-BATCH-DOUBLE-COUCHE.md`
- 11 sections + annexe guide d'utilisation
- À utiliser quand 2 stratégies cohabitent sur la même semaine (exemple S6 : sales mode + beta testers)

---

## ORDRE DE LECTURE RECOMMANDÉ

1. **Lire PARTIE 1 (règles batch) en entier** — comprendre les règles générales qui s'appliquent à tout post produit
2. **Identifier que le push de la semaine justifie un double-couche** (2 stratégies parallèles, pas un simple ajustement)
3. **Créer les 2 fichiers stratégie distincts** (ou 1 fichier qui définit les 2 couches)
4. **Copier PARTIE 2 (template double-couche)** dans un nouveau fichier `BATCH-SX-DOUBLE-COUCHE.md`
5. **Remplir les placeholders** de la PARTIE 2 en appliquant les règles de la PARTIE 1
6. **Passer la checklist** avant dispatch

---

═══════════════════════════════════════════════════════════════════════════════

# ═══════════ PARTIE 1 — RULES BATCH ═══════════

═══════════════════════════════════════════════════════════════════════════════

# RULES BATCH — Règles à appliquer automatiquement pour tous les batch semaine

> **Usage :** Ce fichier est la référence obligatoire pour la génération de tout nouveau batch hebdomadaire (S7 et suivants).
> **Lecture obligatoire :** par Claude Code, Jarvis (`f2-marketer`), et tout rédacteur humain qui ouvre un batch.
> **Dernière mise à jour :** 21 avril 2026 (S6 → S7 transition).
> **Hérite de :** `BIBLE.md` v2.1 + `ANTI-IA.md` + `CLAUDE.md`.

---

## 1. URL DU PRODUIT — `https://storemd.vercel.app/`

**Jusqu'à résolution DNS côté Shopify, l'URL StoreMD est :** `https://storemd.vercel.app/`

- `storemd.com` n'est pas opérationnel. Ne JAMAIS l'utiliser dans un post, un reply, un cold outreach, un commentaire.
- Vérification automatique : tout batch doit passer un `grep -ri "storemd.com"` retournant 0 résultat avant dispatch.
- Cette règle saute automatiquement dès que le DNS `.com` est pointé. Ce fichier sera mis à jour à ce moment-là.

---

## 2. FORMAT 2-BLOCS — Twitter uniquement

**Algorithmique Twitter** : lien dans le corps du tweet = **-1700 % reach** (A/B test documenté dans `growth-marketing/twitter/algo.md` §6.3).

**Règle Twitter pour tout post avec CTA lien :**

Chaque fichier de post Twitter doit contenir **2 blocs distincts** :

```markdown
## POST (ANGLAIS — À PUBLIER)

[Texte du tweet SANS URL. CTA se termine par la phrase d'accroche seule.
Exemple : "Free scan, 60 seconds."]

[VIDEO ou THREAD indicator]

---

## REPLY (À PUBLIER MANUELLEMENT APRÈS PUBLICATION DU POST)

[URL + phrase courte d'accompagnement.
Exemple : "https://storemd.vercel.app/"]
```

**Pour les threads Twitter :** la reply URL s'attache au **dernier tweet** du thread, pas au premier. Le texte du dernier tweet ne contient pas l'URL.

**Règle LinkedIn différente :** sur LinkedIn, le lien reste dans le corps du post (algo LinkedIn différent de Twitter, pas de pénalité équivalente aux -1700 %). Ne pas appliquer le format 2-blocs sur LinkedIn.

**Règle autres plateformes :**
- **Reddit, Facebook, IH :** lien dans le corps du post OK (algo différent, pertinent au contexte communautaire).
- **PH :** maker comment contient le lien direct dans la maker note PH (format natif).

---

## 3. HASHTAGS — ZÉRO partout

Aucun hashtag. Aucune plateforme. Aucune exception.

Rappel BIBLE §8 voix séparées + règle transversale repo : `#Shopify`, `#DTC`, `#SaaS`, `#Ecommerce`, `#FoundryTwo`, `#StoreMD` → INTERDIT.

Vérification automatique : tout batch doit passer un `grep -rn "^#[A-Z]\|^[^A-Z]#[A-Z]"` sur les posts LinkedIn retournant 0 résultat avant dispatch (les lignes `# Titre` en markdown ne sont pas concernées).

---

## 4. LIGNES ROUGES BIBLE §3 v2.1 — jamais franchies

**Interdits dans tout post, reply, cold outreach, doc public :**

- **Faux MRR, faux revenue, faux nombre de clients payants, faux ARR.** Aucun chiffre business studio (MRR StoreMD, revenue FoundryTwo, installs payantes) inventé ou gonflé. Vérifiable par des tiers → ban + Shopify rejection.
- **Testimonials directs verbatim inventés.** Aucune citation entre guillemets attribuée à un client/agency/merchant non reçue verbatim. `"Agency owner DM: 'You built the tool I've been missing for 3 years'"` = INTERDIT. Reformulation OK : "Agency feedback this week: they're finding leaks their audits missed."
- **Noms d'entreprises clientes fictives.** Pas de "Nike uses StoreMD", "Gymshark is our client", même en hypothèse.
- **Faux claims produit / features inflation.** Le claim produit = vérifiable sur `storemd.vercel.app`. Si le post dit "43 checks in 60s across 5 modules", le produit doit effectivement faire ça.

**Marge marketing acceptable (sales mode produit) :**

- Statistiques agrégées e-com génériques ("94% of Shopify stores have X", "$189/mo avg ghost billing").
- Scenarios illustratifs ("a $40k/mo DTC brand", "an agency charging $1,800/mo").
- Volumes narratifs ("I scanned 47 stores this month") tant qu'ils ne constituent pas un claim business studio vérifiable.

**Distinction build-in-public ≠ sales-mode :** les marges marketing ne s'appliquent **jamais** au build-in-public (updates studio, recaps hebdo, MRR transparent). Règle stricte pour tout contenu meta-studio.

---

## 5. CHIFFRES LOCKED — Cohérence inter-semaines

**Principe :** les chiffres publiés semaine N deviennent canon. Semaine N+1 doit progresser à partir de cette base, jamais contredire, jamais reset.

**Règle de batch :** chaque nouveau batch hebdomadaire doit contenir une **section "CHIFFRES LOCKED SX"** en bas de fichier qui liste :

- Volume scans cumul fin de semaine (progression depuis cumul semaine précédente)
- Volume scans daily (lun à dim)
- Cumul $ leaks détectés
- Nombre d'agencies onboardées (cumul)
- Stats patterns agrégées utilisées (94% / 78% / 67% / 42% / $189 etc.) — **LOCKED, ne jamais modifier entre semaines**
- Scenarios illustratifs utilisés (ex : "$80k/mo DTC brand avec $2,646 sur 14 mois") — **ne jamais réutiliser avec chiffres modifiés en SX+1, créer nouveaux scenarios**
- Revenue/MRR studio : **LOCKED à $0 ou non-mentionné** (ligne rouge)

**Canon S6 de référence (verrouillé le 24/04/2026) :**

| Métrique | Valeur S6 | Règle S7+ |
|---|---|---|
| Cumul stores scannés fin S6 | 68 | S7 démarre >68, progression 20-30/sem max crédible |
| Daily breakdown S6 (lun-ven) | 8, 11, 14, 13, 22 | S7 doit avoir sa propre courbe croissante |
| Cumul $ leaks S6 | $12,400 | S7 démarre >$12,400 |
| Agencies onboardées S6 | 4 | S7 incrémente cohérent |
| Pattern "% stores with ghost app" | 94% | LOCKED — ne jamais changer |
| Pattern "$ avg ghost billing/mo" | $189 | LOCKED — ne jamais changer |
| Pattern "% below 60/100 AI readiness" | 78% | LOCKED — ne jamais changer |
| Pattern "% with 4+ sec load mobile" | 67% | LOCKED — ne jamais changer |
| Pattern "% theme code breaks LLM" | 42% | LOCKED — ne jamais changer |
| Scenario "$80k/mo DTC, $2,646/14mo" | R mardi 21/04 | Ne pas réutiliser |
| Scenario "$40k/mo store, $97/mo × 6mo" | F mercredi 22/04 thread | Ne pas réutiliser |
| MRR studio | $0 / non-mentionné | LOCKED — ligne rouge |

**Cette section 5 doit être mise à jour à chaque nouveau batch avec le canon consolidé semaine par semaine.**

---

## 6. STRUCTURE DE FICHIER POST — Twitter standard

Chaque `.md` de post Twitter dans `{compte}/publication/twitter/semaine-X/` doit suivre ce template :

```markdown
# [Titre court du post]

**Date :** [Jour JJ/MM]
**Heure :** [HHhMM CEST]
**Compte :** [R / F / F2]
**Plateforme :** Twitter
**Format :** [Tweet single / Thread N tweets]
**Vidéo :** [nom_fichier OU "aucune"]
**Statut :** ⏳ À publier | ✅ Publié | 🗑️ Killed

---

## POST (ANGLAIS — À PUBLIER)

[Texte du tweet SANS URL, SANS hashtag]

[Pour un thread : chaque tweet préfixé N/M, séparateur `---` entre chaque]

[Mention `[VIDEO]` si vidéo attachée]

---

## REPLY (À PUBLIER MANUELLEMENT APRÈS LE POST PRINCIPAL)

[CTA + URL https://storemd.vercel.app/]

Exemple : "Free scan, 60s: https://storemd.vercel.app/"

---

## NOTES

- Placeholders : [lister si applicable, source tracking]
- Traduction française : voir BATCH-SEMAINE-X.md
- Ne jamais publier la traduction
- Cross-engagement : R/F reply dans les 5 min si post F/F2 dans écosystème
```

**LinkedIn / Reddit / Facebook / IH / PH :** format natif à la plateforme, pas de bloc REPLY séparé.

---

## 7. CROSS-ENGAGEMENT ÉCOSYSTÈME — Obligatoire à chaque batch

Tout batch hebdomadaire doit inclure en section dédiée un **cross-engagement tracker prérempli** avec :

- Pour R : toutes les publications F + F2 de la semaine (heure + sujet + vidéo associée) en attente de reply
- Pour F : toutes les publications R + F2 de la semaine en attente de reply
- Pour F2 : généralement aucune reply proactive (F2 publie et reçoit, voir `f2/context.md` §1)

Règle non-négociable : **reply dans les 5 minutes après publication**. Signal Twitter = 150x par conversation (auteur reply + co-fondateur reply).

Fichier modèle : `romain/cross-engagement-tracker.md` (et équivalent F à créer si séparation souhaitée).

---

## 8. CHECKLIST DE VALIDATION PRÉ-DISPATCH BATCH

Avant qu'un batch hebdomadaire soit dispatché dans le repo par Claude Code, vérifier que tous ces points sont OK :

- [ ] 0 occurrence de `storemd.com` (toutes remplacées par `https://storemd.vercel.app/`)
- [ ] 0 hashtag dans les posts LinkedIn (grep sur `#[A-Z]`)
- [ ] Posts Twitter : format 2-blocs POST + REPLY appliqué
- [ ] Posts Twitter threads : URL en reply au dernier tweet, pas dans le thread lui-même
- [ ] Aucun testimonial verbatim inventé entre guillemets
- [ ] Aucun chiffre MRR / revenue studio / clients payants mentionné
- [ ] Section "CHIFFRES LOCKED SX" présente en fin de batch
- [ ] Chiffres cohérents avec canon SX-1 (progression, pas reset ni contradiction)
- [ ] Scenarios illustratifs = nouveaux, pas recyclés de SX-1 avec chiffres modifiés
- [ ] Cross-engagement tracker R + F prérempli avec tous les horaires de publication
- [ ] BIBLE.md v2.1 §3 respectée (lignes rouges vs marges marketing)
- [ ] ANTI-IA.md filtre passé sur chaque post (pas d'em-dash pivot, pas de "Not X it's Y", etc.)

Si un seul point échoue → batch non-dispatché, corriger d'abord.

---

## 9. INTÉGRATION ULTÉRIEURE DANS LE REPO

Ce fichier doit être référencé ultérieurement depuis :

- `CLAUDE.md` §6 (règles transversales) — ajouter ligne "voir RULES-BATCH.md pour génération batch hebdo"
- `romain/progress-semaine.md`, `fabrice/progress-semaine.md`, `f2/progress-semaine.md` — chaque fin de semaine, rappeler le canon CHIFFRES LOCKED et l'ajouter à la section tracking
- `.claude/agents/f2-marketer.md` — ajouter "lecture obligatoire : RULES-BATCH.md avant toute génération de post ou batch"

À faire une fois le fichier validé et placé en racine du repo.

---

*Fichier créé le 21/04/2026 — référence obligatoire pour batch S7+.*

═══════════════════════════════════════════════════════════════════════════════

# ═════════ PARTIE 2 — TEMPLATE BATCH DOUBLE-COUCHE ═════════

═══════════════════════════════════════════════════════════════════════════════

**Note lecteur :** la PARTIE 2 ci-dessous reprend intégralement le contenu du fichier `TEMPLATE-BATCH-DOUBLE-COUCHE.md`. Les références "§X" dans cette section renvoient à la numérotation interne du template (§1 à §11 + Annexe A). Lors de l'utilisation, copier uniquement cette PARTIE 2 dans un nouveau fichier `BATCH-SX-DOUBLE-COUCHE.md` et remplir les placeholders, tout en vérifiant la conformité avec les règles de la PARTIE 1 ci-dessus.

# BATCH DOUBLE-COUCHE — [SX | période]

**Période d'application :** lundi [JJ/MM] → dimanche [JJ/MM] ([SX])
**Créé le :** [date création]
**Mode :** DOUBLE-COUCHE — 2 stratégies parallèles, volume doublé par compte
**Statut :** en validation R

---

## NOTE CLÉS — Ce que c'est, ce que ce n'est pas

**Un batch double-couche exécute 2 stratégies distinctes simultanément sur la même semaine**, chacune avec son propre volume complet, chacune avec ses propres mécaniques, chacune avec ses propres créneaux horaires.

Ce n'est PAS :
- Un batch standard augmenté avec quelques posts en plus
- Un batch avec des posts qui mélangent plusieurs angles
- Une campagne où une couche remplace l'autre à mi-semaine

C'est :
- **2 batchs complets qui tournent en parallèle** sur la même période
- **Chaque post appartient clairement à une seule couche** (Couche A ou Couche B)
- **Les horaires de publication sont séparés** pour que les 2 couches ne se cannibalisent pas
- **Les mécaniques des 2 couches peuvent se compléter** (top-of-funnel + mid-funnel, acquisition + conversion) mais ne se contredisent jamais

---

## SOMMAIRE

1. Les 2 couches de ce batch
2. Volume total par compte (tableau récapitulatif)
3. Répartition horaires par couche
4. Matrice mécaniques × posts (A et B)
5. Couche A — [NOM COUCHE A] — tous les posts
6. Couche B — [NOM COUCHE B] — tous les posts
7. Briefs vidéos Remotion (séparés A et B)
8. Planning global chronologique
9. Cohérence inter-couches (non-contradiction)
10. Checklist validation pré-dispatch
11. Articulation avec dispatch repo

---

## 1. LES 2 COUCHES DE CE BATCH

### 1.1 Couche A — [NOM COUCHE A, ex: SALES AGRESSIF CLAIM + SOCIAL PROOF]

**Référence stratégie :** `[FICHIER-STRATEGIE-COUCHE-A].md`
**Angle narratif :** [phrase qui résume, ex: "StoreMD finds in 60 seconds what your agency missed in 6 months."]
**Type de funnel :** [top-of-funnel attention / mid-funnel conversion / bottom-funnel closing]
**Tonalité :** [agressif / pédagogique / communautaire / urgence / autre]
**Mécaniques principales :** [M1, M2, M3...] — détaillées dans `[FICHIER-STRATEGIE-COUCHE-A].md` §2
**Créneau horaire dédié :** cf. §3 — horaires fixes par compte et par couche

### 1.2 Couche B — [NOM COUCHE B, ex: BETA TESTERS ACQUISITION DIRECTE]

**Référence stratégie :** `[FICHIER-STRATEGIE-COUCHE-B].md`
**Angle narratif :** [phrase qui résume, ex: "10 Pro beta spots open this week — claim yours."]
**Type de funnel :** [doit être différent ou complémentaire de Couche A]
**Tonalité :** [même agressivité que A mais levier différent / ton complémentaire]
**Mécaniques principales :** [M1, M2, M3...] — détaillées dans `[FICHIER-STRATEGIE-COUCHE-B].md` §2
**Créneau horaire dédié :** cf. §3 — horaires fixes par compte et par couche

### 1.3 Règle de cohabitation (non-contradiction)

Les deux couches exécutent des angles différents mais doivent être **alignés stratégiquement** :
- Pas de message qui contredit l'autre (si A dit "we're already scanning 50 stores", B ne peut pas dire "we haven't started yet")
- Pas de mécanique qui cannibalise l'autre (si A annonce "20 agencies onboarded", B ne peut pas dire "we want our first agency")
- Les deux couches convergent sur le même produit, le même positionnement, les mêmes lignes rouges BIBLE
- Les chiffres utilisés dans les 2 couches respectent le même canon §17 (cohérence inter-semaines)

---

## 2. VOLUME TOTAL PAR COMPTE

**Principe :** chaque compte publie 2× son volume habituel dans un batch double-couche. La Couche A porte le volume "standard", la Couche B porte un volume équivalent sur ses propres créneaux.

### 2.1 Volume Twitter par compte

| Compte | Couche A (posts) | Couche B (posts) | **Total semaine** |
|---|---|---|---|
| R | [N posts A, ex: 5 lun-ven] | [N posts B, ex: 3 mer-ven ou 5 lun-ven] | [NA+NB] |
| F | [N posts A + threads] | [N posts B] | [NA+NB] |
| F2 | [N posts A] | [N posts B] | [NA+NB] |

**Exemple concret rempli (S6 si appliqué en double-couche) :**
- R : 5 TW Couche A + 3 TW Couche B = **8 tweets R sur semaine**
- F : 7 TW Couche A (dont 2 threads) + 3 TW Couche B = **10 tweets F**
- F2 : 5 TW Couche A + 3 TW Couche B = **8 tweets F2**
- **Total écosystème Twitter : 26 posts sur la semaine** (double du batch standard)

### 2.2 Volume LinkedIn par compte

| Compte | Couche A (posts) | Couche B (posts) | **Total semaine** |
|---|---|---|---|
| R | [N posts A] | [N posts B, refaits ou nouveaux] | [NA+NB] |
| F | [N posts A] | [N posts B] | [NA+NB] |
| F2 | [N posts A, si applicable] | [N posts B, si applicable] | [NA+NB] |

**Exemple concret (S6 double-couche) :**
- R : 3 LI Couche A + 3 LI Couche B = **6 posts LinkedIn R** (refonte complète OU 2 fois 3 jours différents)
- F : 3 LI Couche A + 2 LI Couche B = **5 posts LinkedIn F**
- F2 : 1 LI Couche A + 1 LI Couche B (optionnel) = **1 à 2 posts LinkedIn F2**

### 2.3 Volume IH + PH

| Compte | Couche A | Couche B |
|---|---|---|
| F2 IH | 1 post A (typiquement mercredi) | 1 post B (jour différent ou même jour jour si horaires distincts) |
| F2 PH | Selon launch en cours | Selon launch en cours |

### 2.4 Cold outreach — reste régulier, pas doublé

**Important :** le cold outreach R/F LinkedIn + F Twitter replies **ne double pas**. Le volume BIBLE §4 reste :
- R : 10 cold/jour toutes plateformes confondues
- F : 10 cold/jour + 14 replies Twitter/jour

Les 2 couches utilisent **les mêmes canaux cold**. La Couche B peut simplement réorienter 30-40% du cold vers son angle (ex: beta testers) pendant la semaine, le reste garde l'angle Couche A.

### 2.5 Cross-engagement — doublé proportionnellement

Avec 2× plus de posts publiés, R et F ont **2× plus de posts à reply** en cross-engagement.

Exemple S6 double-couche :
- R reply sur posts F + F2 : 14 replies Couche A + 14 replies Couche B = **28 replies R semaine**
- F reply sur posts R + F2 : 14 replies Couche A + 14 replies Couche B = **28 replies F semaine**

Règle timing 5 min après publication reste absolue des 2 côtés.

---

## 3. RÉPARTITION HORAIRES PAR COUCHE

**Principe de non-cannibalisation :** les 2 couches ne publient jamais au même créneau sur le même compte.

### 3.1 Horaires Twitter — Ordre F → R → F2 (ne change jamais)

| Couche | F | R | F2 |
|---|---|---|---|
| **A** | 13h00 | 14h00 | 15h00 |
| **B** | 18h00 | 19h00 | 20h00 |

Cross-engagement Twitter (5 min max après publication) :
- F publie → R reply à +5 min
- R publie → F reply à +5 min
- F2 publie → R + F reply à +5 min
- F2 ne cross-engage jamais

Jours Twitter : lundi-samedi (dimanche OFF)

### 3.2 Horaires LinkedIn — Ordre R → F (ne change jamais)

| Couche | R | F |
|---|---|---|
| **A** | 17h00 | 17h30 |
| **B** | 20h30 | 21h00 |

LinkedIn F2 company (Couche A uniquement, pas de double couche) :
- Mardi : 17h45
- Jeudi : 17h45

Cross-engagement LinkedIn (5 min max après publication) :
- R publie → F commente à +5 min
- F publie → R commente à +5 min
- F2 publie → R + F commentent à +5 min
- F2 ne cross-engage jamais

Jours LinkedIn R + F : lundi + mardi + jeudi

### 3.3 Horaires IH — F2 uniquement

- Jour : jeudi
- Heure : 17h15 CEST
- Aucun cross-engagement

### 3.4 Règle d'écart minimum

**Entre 2 publications du même compte même jour : minimum 3 heures d'écart.** Sinon l'algo Twitter/LinkedIn pénalise (comportement spammy) et les 2 posts se cannibalisent en engagement.

Les horaires sont fixés en §3. Pas de variation par semaine.

---

## 4. MATRICE MÉCANIQUES × POSTS (A et B)

### 4.1 Couche A — Mécaniques distribuées

| Mécanique A | Posts qui l'activent |
|---|---|
| **A1 — [nom]** | [liste posts Couche A, ex: R TW lun · F TW lun · F2 TW lun] |
| **A2 — [nom]** | [liste posts] |
| **A3 — [nom]** | [liste posts] |
| **A4 — [nom]** | [liste posts] |
| **A5 — [nom]** | [liste posts] |

### 4.2 Couche B — Mécaniques distribuées

| Mécanique B | Posts qui l'activent |
|---|---|
| **B1 — [nom]** | [liste posts Couche B, ex: R TW mer · F TW mer · F2 TW mer · R LI mar · F LI mer · F2 IH mer] |
| **B2 — [nom]** | [liste posts] |
| **B3 — [nom]** | [liste posts] |
| **B4 — [nom]** | [liste posts] |
| **B5 — [nom]** | [liste posts] |

### 4.3 Règle de séparation

**Un post ne peut pas mélanger une mécanique A avec une mécanique B.** Si c'est tentant, c'est un signe qu'il faut créer 2 posts distincts (un A, un B) à 2 créneaux différents.

---

## 5. COUCHE A — [NOM COUCHE A] — TOUS LES POSTS

**Rappel :** tous les posts de cette section utilisent le créneau horaire dédié Couche A (§3).

### 5.1 Posts Twitter R — Couche A — [N] posts

#### 5.1.1 [Jour JJ/MM] — [A#] [Angle court]

**Vidéo :** `[nom-video-A]` OU aucune
**Heure :** [HHhMM] CEST (créneau Couche A)
**Registre R :** [diagnostic / framework / retour d'expérience / provocateur / question qui tue / data-drop]
**Alternance :** vérifier registre ≠ post R Couche A précédent

**POST (ANGLAIS — À PUBLIER) :**

```
[Texte tweet voix R, 100-260 car, angle Couche A]
[ANTI-IA appliqué, pas d'em-dash pivot, contractions]
[Pas d'URL dans le corps]
[`[VIDEO]` si vidéo attachée]
```

**REPLY :**

```
https://storemd.vercel.app/
```

**TRADUCTION :**

> [FR]

**Notes :**
- Couche A — Mécanique [A#]
- Registre alterné vs post R Couche A précédent (indépendant de l'alternance Couche B)
- [Points d'attention]

---

#### 5.1.2 [Jour JJ/MM] — [A#]

[Même structure pour chaque post Twitter R Couche A]

---

### 5.2 Posts Twitter F — Couche A — [N] posts

#### 5.2.1 [Jour JJ/MM] — [A#]

**Vidéo :** `[nom-video]`
**Heure :** [HHhMM] CEST (créneau A)
**Registre F :** [step-by-step / pourquoi technique / builder story / quick fix / comparatif honnête / debugging]

**POST (ANGLAIS) :**

```
[Texte voix F technique, angle Couche A]
```

**REPLY :**

```
https://storemd.vercel.app/
```

**TRADUCTION :**

> [FR]

**Notes :**
- Couche A — Mécanique [A#]
- Voix F différenciée de R et F2
- Registre alterné vs post F Couche A précédent

---

#### 5.2.2 [Jour JJ/MM] — [A#]

[Même structure]

---

#### 5.2.X Thread si applicable — [Jour JJ/MM] — [A#]

**Vidéo tête :** `[nom-video]`
**Heure :** [HHhMM] CEST

**THREAD (ANGLAIS) :**

```
1/N 🧵 [Hook thread]

[Contenu tweet 1]

[VIDEO]

---

2/N [Contenu tweet 2]

---

[...]

---

N/N [Dernier tweet sans URL dans le corps]
```

**REPLY (sous tweet N/N) :**

```
https://storemd.vercel.app/
```

**TRADUCTION :**

> [FR résumée par tweet]

**Notes :**
- URL en reply au DERNIER tweet du thread, jamais dans les tweets du thread

---

### 5.3 Posts Twitter F2 — Couche A — [N] posts

#### 5.3.1 [Jour JJ/MM] — [A#]

**Vidéo :** `[nom-video]`
**Heure :** [HHhMM] CEST (créneau A)

**POST (ANGLAIS) :**

```
[Texte voix F2 "we" studio neutre, angle Couche A]
```

**REPLY :**

```
https://storemd.vercel.app/
```

**TRADUCTION :**

> [FR]

**Notes :**
- Couche A — Mécanique [A#]
- Voix F2 : "we" systématique
- Ligne rouge BIBLE §3 v2.1 : pas de faux MRR/revenue

---

[Répéter pour chaque post Twitter F2 Couche A]

---

### 5.4 Posts LinkedIn R — Couche A — [N] posts

#### 5.4.1 [Jour JJ/MM] — [A#]

**Heure :** [HHhMM] CEST · **Vidéo :** aucune
**Fichier :** `romain/publication/linkedin/semaine-[X]/[jour-JJ-MM-angle].md`

**POST (ANGLAIS — À PUBLIER) :**

```
**[Hook bold 1ère ligne]**

—

[Corps 800-1300 car, 1 phrase par ligne, format aéré]

[URL `https://storemd.vercel.app/` OK dans le corps LinkedIn]
```

**TRADUCTION :**

> [FR]

**Notes :**
- Couche A — Mécanique [A#]
- Pas de hashtags (BIBLE §8)
- Voix R sur LinkedIn : professionnel direct, argumenté

---

### 5.5 Posts LinkedIn F — Couche A — [N] posts

[Même structure, voix F technique]

---

### 5.6 Posts LinkedIn F2 — Couche A — [N posts si applicable]

[Même structure, voix F2 studio]

---

### 5.7 Post IH F2 — Couche A

[Si applicable, format long-form IH]

---

## 6. COUCHE B — [NOM COUCHE B] — TOUS LES POSTS

**Rappel :** tous les posts de cette section utilisent le créneau horaire dédié Couche B (§3), distinct de Couche A.

### 6.1 Posts Twitter R — Couche B — [N] posts

#### 6.1.1 [Jour JJ/MM] — [B#] [Angle court Couche B]

**Vidéo :** `[nom-video-B]` (vidéos Couche B distinctes des vidéos Couche A, voir §7)
**Heure :** [HHhMM] CEST (créneau Couche B)
**Registre R :** [alternance indépendante de la Couche A]

**POST (ANGLAIS — À PUBLIER) :**

```
[Texte voix R, angle Couche B]
[Mécanique B# clairement distincte des mécaniques A]
```

**REPLY :**

```
https://storemd.vercel.app/
```

**TRADUCTION :**

> [FR]

**Notes :**
- Couche B — Mécanique [B#]
- Registre alterné vs post R Couche B précédent
- Angle Couche B ≠ angle Couche A du même jour (pas de dilution message)

---

#### 6.1.2 [Jour JJ/MM] — [B#]

[Même structure]

---

### 6.2 Posts Twitter F — Couche B — [N] posts

[Même structure que 5.2, angle Couche B]

---

### 6.3 Posts Twitter F2 — Couche B — [N] posts

[Même structure que 5.3, angle Couche B]

---

### 6.4 Posts LinkedIn R — Couche B — [N] posts

[Même structure que 5.4, angle Couche B]

---

### 6.5 Posts LinkedIn F — Couche B — [N] posts

[Même structure que 5.5, angle Couche B]

---

### 6.6 Posts LinkedIn F2 — Couche B — [N si applicable]

[Même structure]

---

### 6.7 Post IH F2 — Couche B

[Si applicable]

---

## 7. BRIEFS VIDÉOS REMOTION (SÉPARÉS A ET B)

### 7.1 Vidéos Couche A

| # | Fichier | Durée | Usage (posts) | Style | Priorité |
|---|---|---|---|---|---|
| A1 | `[nom-A1]` | [Xs] | [R TW lun + F TW lun etc] | [R/F/F2 style] | max |
| A2 | `[nom-A2]` | [Ys] | [...] | [...] | 2 |
| [...] | | | | | |

**Briefs détaillés :**

**A1 — `[nom-A1]`**
- Concept : [description]
- Texte animé frame-by-frame : [...]
- Style : [palette compte]
- URL end card : `https://storemd.vercel.app/`

[Même détail pour chaque vidéo Couche A]

---

### 7.2 Vidéos Couche B

| # | Fichier | Durée | Usage (posts) | Style | Priorité |
|---|---|---|---|---|---|
| B1 | `[nom-B1]` | [Xs] | [...] | [...] | max |
| [...] | | | | | |

[Même détail pour chaque vidéo Couche B]

---

### 7.3 Mutualisation vidéos entre comptes

Une vidéo peut être **mutualisée** entre R/F/F2 **si elle est neutre visuellement** (pas de signature compte). Exemple : `store-md-beta-10-spots` utilisable par les 3 comptes le même jour si style adapté.

Règle : **jamais de mutualisation entre Couche A et Couche B.** Chaque couche a ses propres vidéos.

### 7.4 Contrainte globale vidéos double-couche

- Toutes affichent `https://storemd.vercel.app/` en end card (règle URL RULES-BATCH)
- Produire Couche A en priorité si capacité F limitée (c'est le volume standard)
- Fallback Couche B : text-only si vidéos B pas prêtes
- Durée max 30s (attention span plateformes)

---

## 8. PLANNING GLOBAL CHRONOLOGIQUE

### 8.1 Tableau complet semaine

| Jour | Compte | Plateforme | Couche | Post (§X.Y.Z) | Heure CEST | Statut |
|---|---|---|---|---|---|---|
| Lundi [JJ/MM] | R | Twitter | A | §5.1.1 [titre] | [HHhMM] | ⏳ |
| Lundi [JJ/MM] | R | Twitter | B | §6.1.1 [titre] | [HHhMM] | ⏳ |
| Lundi [JJ/MM] | F | Twitter | A | §5.2.1 [titre] | [HHhMM] | ⏳ |
| Lundi [JJ/MM] | F | Twitter | B | §6.2.1 [titre] | [HHhMM] | ⏳ |
| Lundi [JJ/MM] | F2 | Twitter | A | §5.3.1 [titre] | [HHhMM] | ⏳ |
| Lundi [JJ/MM] | F2 | Twitter | B | §6.3.1 [titre] | [HHhMM] | ⏳ |
| Mardi [JJ/MM] | ... | ... | ... | ... | ... | ⏳ |

[Continuer jour par jour pour toute la semaine]

### 8.2 Visualisation densité publication par jour

**Total posts écosystème par jour :**
- Lundi : [N posts] (A: [x], B: [y])
- Mardi : [N posts] (A: [x], B: [y])
- Mercredi : [N posts]
- Jeudi : [N posts]
- Vendredi : [N posts]
- Samedi : [N posts] (généralement moins, F seul si threads)
- Dimanche : [N posts] (généralement moins)

**Total semaine écosystème : [N] posts toutes plateformes confondues.**

---

## 9. COHÉRENCE INTER-COUCHES (NON-CONTRADICTION)

### 9.1 Règles de non-contradiction

Les 2 couches doivent respecter les règles suivantes pour éviter qu'un lecteur qui voit les 2 perçoive une incohérence :

1. **Chiffres partagés** : les 2 couches utilisent le même canon §17 du batch principal. Si A dit "68 scans cumul", B ne peut pas dire "we're starting from zero".
2. **Positionnement produit** : les 2 couches positionnent StoreMD de la même façon (outil de scan Shopify, 43 checks, 5 modules). B ne peut pas dire "we're pivoting to agency analytics".
3. **Statut business** : les 2 couches affichent le même statut (MRR non-mentionné, X agencies onboardées, etc.). Pas de "we have 20 paying customers" dans A et "looking for first customer" dans B.
4. **Lignes rouges BIBLE §3 v2.1** s'appliquent aux 2 couches identiquement.
5. **Canon §17** : tout nouveau scenario illustratif créé par Couche A ou B est ajouté au canon pour ne pas être recyclé.

### 9.2 Test de cohabitation

Avant de valider le batch, simuler le parcours d'un lecteur qui voit :
- Les posts Couche A commencent à 13h00 (F), les posts Couche B à 18h00 (F) — cf. §3 pour le dispatch complet par compte.
- Sur le même compte, le même jour

→ Est-ce que le lecteur perçoit une incohérence ? Si oui → refaire un des 2 posts.

### 9.3 Gestion des conflits narratifs

Si 2 posts A et B du même jour même compte créent un conflit narratif (ex: A "I scanned 47 stores this month", B "I'm just opening beta for the first time"), 2 options :
- **Séparer dans le temps :** décaler B d'un jour (lundi A, mardi B)
- **Retravailler le narratif :** ajuster B pour qu'il enchaîne sur A naturellement (ex: "After 47 scans this month showing the pattern, I'm opening 10 Pro beta spots")

---

## 10. CHECKLIST VALIDATION PRÉ-DISPATCH

**Règles techniques (identiques pour les 2 couches) :**

- [ ] URL `https://storemd.vercel.app/` partout, 0 occurrence de `storemd.com`
- [ ] Format 2-blocs Twitter (POST + REPLY) sur tous les tweets (Couche A + Couche B)
- [ ] Lien dans le corps OK pour LinkedIn + IH (Couche A + Couche B)
- [ ] Zéro hashtag sur tous les posts LinkedIn + IH

**BIBLE §3 v2.1 :**

- [ ] Aucun faux testimonial verbatim entre guillemets (Couche A + B)
- [ ] Aucun nom d'entreprise cliente fictive
- [ ] Aucun faux MRR, faux revenue studio, faux nombre de clients payants
- [ ] Aucun faux claim produit
- [ ] Marge marketing appliquée dans les limites §3

**ANTI-IA (appliqué aux deux couches) :**

- [ ] Pas d'em-dash pivot
- [ ] Pas de "Not X it's Y" ni variantes
- [ ] Contractions obligatoires
- [ ] Phrases de longueurs inégales
- [ ] Pas de cadence fixe
- [ ] Pas de formulations IA interdites en ouverture

**Voix séparées (par compte, sur les 2 couches) :**

- [ ] R "I" systématique
- [ ] F voix builder technique
- [ ] F2 "we" systématique
- [ ] Registres alternés dans Couche A (indépendamment de B)
- [ ] Registres alternés dans Couche B (indépendamment de A)

**Stratégie double-couche :**

- [ ] Mécaniques Couche A distribuées sur les posts Couche A
- [ ] Mécaniques Couche B distribuées sur les posts Couche B
- [ ] Aucun post ne porte à la fois une mécanique A et une B (séparation stricte)
- [ ] Créneaux horaires Couche A ≠ Couche B, écart min 3h sur le même compte
- [ ] Cohérence inter-couches vérifiée (règles §9.1)
- [ ] Test de cohabitation effectué (règle §9.2)

**Vidéos :**

- [ ] Briefs vidéos Couche A définis
- [ ] Briefs vidéos Couche B définis (séparés, pas de mutualisation A-B)
- [ ] URL `vercel.app` en end card partout
- [ ] Fallback text-only prévu pour chaque couche séparément

**Cross-engagement :**

- [ ] Trackers R + F préparés pour les 2 couches (2× le volume de cross-eng)
- [ ] Règle timing 5 min maintenue (s'applique aux posts des 2 couches)

**Points à valider par R / F avant publication :**

- [ ] Capacité F pour produire les vidéos des 2 couches avant lundi
- [ ] Engagement exécution mécaniques Couche A (si impliquent action manuelle)
- [ ] Engagement exécution mécaniques Couche B (si impliquent action manuelle)
- [ ] Bande passante R pour gérer 2× les DMs/cross-eng potentiels

---

## 11. ARTICULATION AVEC DISPATCH REPO

Une fois validé par R :

**Fichiers à créer Couche A :**
- `[chemin/fichier].md` → contenu §5.X.Y
- [...]

**Fichiers à créer Couche B :**
- `[chemin/fichier].md` → contenu §6.X.Y
- [...]

**Fichiers à remplacer (si certains posts Couche B réécrivent des posts existants) :**
- `[chemin/fichier-existing].md` → contenu §6.X.Y
- [...]

**Prompt Claude Code dispatch** sera produit séparément (livrable suivant) avec commit structuré qui sépare les 2 couches pour traçabilité.

---

*Batch double-couche créé le [date] — en attente validation R.*

---

## ANNEXE A — Guide d'utilisation du template double-couche

### Quand utiliser ce template

Utiliser quand :
- Deux stratégies parallèles sont décidées pour la même semaine (exemple S6 : sales agressif + beta testers)
- Le volume d'audience justifie 2× les posts sans saturer (audiences R/F/F2 suffisamment grandes pour absorber)
- Les 2 couches ont des objectifs funnel différents ou complémentaires (pas 2 campagnes qui se cannibalisent)

**Ne pas utiliser** si :
- Une seule stratégie avec quelques ajustements (utiliser le template simple)
- Les 2 couches ont le même objectif funnel (risque cannibalisation)
- La capacité de production vidéos/cold outreach ne suit pas le doublement

### Avant de remplir

1. **Créer 2 fichiers stratégie distincts** (ou 1 fichier stratégie qui définit les 2 couches avec leurs mécaniques propres)
2. **Validation R sur les 2 stratégies ET leur cohabitation**
3. **Vérifier que les canons §17 sont compatibles** entre Couche A et Couche B
4. **Confirmer la capacité exécution** (vidéos 2×, cross-eng 2×, cold outreach split)

### Mécaniques de remplissage

- **Couche A = couche principale.** Celle qui porte le volume habituel + l'angle "continuation".
- **Couche B = couche additionnelle.** Celle qui apporte le nouvel angle pour cette semaine spécifique.
- **Séparer strictement** : chaque post appartient à une seule couche, jamais les deux.
- **Créneaux horaires** : A matin/midi, B soir. Écart min 3h sur le même compte.

### Pièges à éviter

1. **Surcharger l'audience** : 2× les posts = 2× le risque de fatigue audience. Si engagement baisse en semaine 1 double-couche → revenir au single-layer en semaine 2.
2. **Contradiction narrative** : si A et B racontent des histoires incompatibles, toute la semaine perd crédibilité.
3. **Cannibalisation mécaniques** : si A dit "DM me your URL" ET B dit "DM me your URL pour autre chose", les merchants confus ne DM rien.
4. **Mauvaise séparation horaire** : si A et B publient à 1h d'écart, l'algo détecte spam et pénalise les 2.
5. **Vidéos non-prêtes** : produire 2× les vidéos = 2× le risque de délai. Prévoir fallback text-only pour Couche B par défaut.

### Évolution après semaine double-couche

En fin de semaine :
- **Mesurer indépendamment** les KPIs de Couche A et Couche B
- **Consolider les chiffres** dans le canon §17 du batch principal (les deux couches contribuent à la progression)
- **Décider pour la semaine suivante** : revenir au single-layer, maintenir le double-layer, pivot sur une des 2 couches qui a mieux performé

### Règles de cohérence long terme

- Le canon §17 doit intégrer les chiffres des 2 couches (scans, agencies, revenue non-mentionné)
- Les nouveaux scenarios illustratifs créés par Couche B s'ajoutent à la liste des scenarios à ne pas réutiliser en S+1
- Si une mécanique de Couche B performe particulièrement, documenter dans `strategie/PLAYBOOK-DISTRIBUTION.md` pour réutilisation structurée

---

*Template double-couche v1 — 21 avril 2026. À adapter à chaque nouveau push double-stratégie.*

═══════════════════════════════════════════════════════════════════════════════

# ═════ FIN DU FICHIER TEMPLATE + RULES CONSOLIDÉ ═════

═══════════════════════════════════════════════════════════════════════════════

**Ce fichier fusionne intégralement :**
- `RULES-BATCH.md` (212 lignes, PARTIE 1 — règles générales batch)
- `TEMPLATE-BATCH-DOUBLE-COUCHE.md` (725 lignes, PARTIE 2 — structure template double-couche)

**Aucun contenu des 2 fichiers d'origine n'a été supprimé ou modifié. Seuls ont été ajoutés :**
- L'en-tête unifié en haut de ce fichier (explication de la structure, ordre de lecture recommandé)
- Les séparateurs visuels entre PARTIE 1 et PARTIE 2
- La note lecteur au début de la PARTIE 2
- Ce footer consolidé

**Logique de regroupement :**

Les règles batch (PARTIE 1) définissent les contraintes applicables à TOUT post de TOUT batch. Le template double-couche (PARTIE 2) définit la structure d'un batch à 2 stratégies parallèles. Les deux sont complémentaires et indissociables : on ne peut pas remplir correctement le template sans appliquer les règles, et les règles sont vides de sens sans une structure de batch pour les appliquer.

Fusionner les deux dans un fichier unique évite deux problèmes opérationnels :
- Un utilisateur qui copie le template sans consulter les règles produit un batch non-conforme.
- Un utilisateur qui lit les règles sans avoir la structure produit du contenu qui ne se range pas proprement dans un batch existant.

Un seul fichier = une seule lecture = un seul copier-coller pour créer un nouveau batch.

---

*Fichier fusion créé le 21 avril 2026.*
