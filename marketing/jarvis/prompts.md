# Prompts JARVIS — cookbook marketing

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Cookbook de prompts opérationnels
> Hérite de : `../../JARVIS.md` (manuel complet) + `../strategie.md` + `../canaux/*.md`

---

## 1. Pourquoi ce fichier

JARVIS comprend **35 patterns naturels** (cf. `../../JARVIS.md` §"Ce que JARVIS comprend automatiquement"). Pas besoin de prompts compliqués pour les actions courantes — on parle naturellement.

Mais pour les **workflows marketing récurrents** (batch hebdo, scripts vidéo, drafts posts, cold outreach, analyse threads, rapport hebdo), avoir des prompts type bien formulés permet de :
- Gagner du temps (pas réinventer la formulation à chaque fois)
- Obtenir des résultats consistants (mêmes inputs = mêmes types de sorties)
- Éviter d'oublier des contraintes (UTM, voix persona, anti-IA, sources de chiffres)

Ce fichier est un **cookbook de prompts** à copier-adapter selon le besoin. Pas une référence des patterns natifs JARVIS — pour ça, voir `../../JARVIS.md` directement.

---

## 2. Règles communes à tous les prompts marketing

### 2.1 Toujours fournir le contexte minimum

| Information | Pourquoi |
|---|---|
| **Plateforme cible** | TikTok, Insta, Twitter, LinkedIn, Reddit, FB, etc. — détermine la voix et le format |
| **Compte qui poste** | @storemd, F (FabGangi), R (delgado_ro72224) — détermine la voix |
| **Couche A ou Couche B** | Vente directe ou recrutement beta — détermine l'angle |
| **Sujet ou angle précis** | Sinon JARVIS doit deviner et la qualité chute |

### 2.2 Toujours appliquer après génération

1. **Filtre anti-IA** (cf. `../../ANTI-IA.md` + `../../romain/VOIX.md` / `../../fabrice/VOIX.md` §RÈGLE #0). JAMAIS publier le draft brut.
2. **Vérifier les chiffres** : sources autorisées uniquement (cf. `../contenu/formats.md` §11).
3. **Vérifier les UTM** : depuis `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` officiel.
4. **Vérifier les lignes rouges BIBLE §3** : pas de fake MRR, pas d'Altistone public, pas de claims non-vérifiables.

### 2.3 Persona JARVIS active

Si tu es loggé en tant que persona Romain (vert) ou Fabrice (violet), la voix par défaut est celle de la persona.

---

## 3. Prompts — génération batch hebdo (dimanche)

Le batch hebdo génère le contenu de la semaine entière à partir des inputs F+R du brainstorm vendredi/samedi.

### 3.1 Génération complète batch (mode standard)

```
Génère le batch S[X] complet pour la semaine du [date lundi] au [date samedi].

Contexte :
- Couche A active : [angle] (ex: "vente directe StoreMD scan + résultats")
- Couche B active : [angle] (ex: "recrutement beta — 10 places")
- Sujets prioritaires inputs F+R : [liste 3-5 angles]
- Apprentissages semaine précédente : [top/flop résumé]

Sortie attendue :
- 6 scripts vidéo TikTok @storemd (4 Couche A + 2 Couche B)
- 3 posts Twitter @FabGangi
- 3 posts Twitter @delgado_ro72224
- 1 post IndieHackers FoundryTwo (voix du SaaS promu)
- 2 posts LinkedIn Fabrice Gangitano
- 2 posts LinkedIn Romain Delgado
- Briefs cross-engage F↔R par jour
- Templates cold outreach scan boutique

Tous les scripts vidéo doivent inclure les briefs visuels Claude Design.
Tous les posts Twitter avec CTA lien doivent être en format 2-blocs.
Tous les liens UTM viennent de UTM_TRACKING_LINKS.md officiel.
Sortie en fichier markdown : BATCH-S[X]-[date].md
```

### 3.2 Génération batch double-couche

Si Couche A + Couche B en parallèle, mêmes prompts mais avec volumes doublés selon `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2.

```
Génère le batch S[X] DOUBLE-COUCHE.

Couche A : [angle]
Couche B : [angle]

Volumes selon TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md §2 :
- Twitter total ~26 posts/sem
- LinkedIn total ~12-13 posts/sem
- Vidéos TikTok 6/sem (4 A + 2 B)

Créneaux horaires séparés A vs B (cf. §3 du template).
```

### 3.3 Régénérer un batch existant

```
Refais le batch S[X] avec ces ajustements :
- [changement 1]
- [changement 2]
```

JARVIS lit le batch précédent, applique les changements, propose `create_file` en remplacement.

---

## 4. Prompts — génération scripts vidéo (TikTok / Reels / FB)

### 4.1 Script vidéo individuel

```
Génère un script vidéo TikTok @storemd, [Couche A vente / Couche B beta], durée 15-45s.

Sujet : [angle précis, ex: "chargeback friendly fraud"]
Hook angle : [ex: "71% des chargebacks sont du friendly fraud"]
Données disponibles : [chiffre + source MUTATIONS.md ou scan réel]

Sortie attendue :
- Hook 0-3s
- Mise en contexte 3-10s
- Démo/résultats 10-25s
- CTA 25-30s
- Briefs visuels Claude Design (palette FoundryTwo)
- Caption TikTok + Insta + FB (UTM tagué)
- Voix off : [TTS / R-F muet / autre]
- Sous-titres style StoreMD

Voix compte produit @storemd (neutre, pas de "I" / "we").
```

### 4.2 Génération à partir d'un finding scan réel

```
J'ai scanné [boutique URL] et trouvé :
- [Finding 1 chiffré]
- [Finding 2 chiffré]
- [Finding 3 chiffré]

Génère un script vidéo TikTok 30s qui utilise ces findings (anonymisé).
Couche A vente. Hook qui frappe.
```

### 4.3 Variantes hook pour A/B test

```
Pour le script [VID-S6-04] sur [sujet], propose 3 hooks alternatifs (0-3s) à tester.
Chaque hook doit être :
- 1 phrase max
- Choc / contre-intuitif / chiffre
- Provocateur sans être clickbait
- Pas de patterns IA (em-dash, "Here's the thing", etc.)
```

---

## 5. Prompts — posts Twitter

### 5.1 Tweet simple (avec CTA lien — format 2-blocs)

```
Génère un tweet [@FabGangi / @delgado_ro72224] sur [sujet].
Couche [A / B].

Format 2-blocs OBLIGATOIRE :
- Bloc POST : tweet sans URL, max 280 chars
- Bloc REPLY : URL UTM tagué + phrase courte

Voix : [F technique builder / R growth marketeur]
UTM depuis UTM_TRACKING_LINKS.md Section 1 (reply_cta).

Pas de hashtags. Pas de patterns IA.
```

### 5.2 Thread Twitter

```
Génère un thread Twitter [@FabGangi / @delgado_ro72224] sur [sujet].

5-8 tweets typique :
- Tweet 1 : Hook + promesse
- Tweets 2-6 : 1 idée par tweet, données concrètes
- Tweet final : Conclusion + reply auto avec lien UTM thread (F18)

Voix [persona]. Pas de hashtags. Format 2-blocs (lien dans dernier tweet).
```

### 5.3 Tweet pure engagement (sans CTA lien)

```
Génère un tweet [@FabGangi / @delgado_ro72224] pur engagement sur [observation].
Pas de CTA lien. Format simple.
Provoque les replies (signal 27× / 150× si auteur reply).
```

### 5.4 Cross-reply F↔R Twitter

```
[Screenshot du tweet de F ou R]

Génère ma reply pour cross-engager (voix [autre persona]).
Angle complémentaire (si F technique → moi growth, ou inverse).
< 280 chars. Substantif (15+ mots).
```

---

## 6. Prompts — posts LinkedIn

### 6.1 Post LinkedIn long (800-1300 caractères)

```
Génère un post LinkedIn [Fabrice Gangitano / Romain Delgado] sur [sujet].
Couche [A / B].

Structure :
- Hook 1-2 lignes (contre-intuitif ou claim chiffré)
- Développement 5-10 lignes (contexte, observations, data)
- Bullets ou listes courtes (tirets simples, pas markdown 1. 2. 3.)
- Conclusion ou question ouverte
- CTA + lien UTM (F19 cta_post)

Longueur : 800-1300 caractères (sweet spot Depth Score).
Voix : [F builder / R growth].
Lien dans le corps OK (pas de format 2-blocs sur LinkedIn).
Pas de hashtags. Pas de patterns IA.
```

### 6.2 Article LinkedIn long format

```
Génère un article LinkedIn (long format) [Fabrice / Romain] sur [sujet deep-dive].
1500-3000 mots. CTA en fin avec lien UTM (F23 article_cta).

Structure :
- Titre accrocheur
- Intro avec hook + promesse
- 3-5 sections principales
- Conclusion + CTA
```

### 6.3 Cross-comment LinkedIn

```
[Screenshot du post LinkedIn de F ou R]

Génère mon commentaire de cross-engage (voix [autre persona]).
15+ mots minimum (signal substantif 2.5× LinkedIn).
Angle complémentaire. Provoque potentiellement un thread (signal 5.2×).
```

---

## 7. Prompts — posts Reddit

### 7.1 Post original storytelling

```
Génère un post Reddit pour [r/shopify / r/ecommerce / r/entrepreneur].
Compte : [F / R perso].
Couche A (pas de pitch direct).

Format storytelling first-person :
- Titre : question ou claim qui pique (pas clickbait)
- "I've been auditing X stores..." → premier paragraphe
- 2-4 observations chiffrées avec contexte
- Conclusion ou question ouverte
- Optionnel : "Happy to take a look at your store URL if you want a 2nd opinion"

UTM depuis Section 3 du fichier UTM officiel selon le sub.
```

### 7.2 Commentaire de valeur (sans mention StoreMD)

```
[Screenshot du thread r/shopify]

Génère mon commentaire de valeur (compte F ou R perso).
Règle 80% : PAS de mention StoreMD. Pure valeur.

Structure :
- Reformulation du problème
- Observation basée expérience/data
- 2-3 actions concrètes
- Question ouverte

First-person ("I scanned 30 stores..."). Pas de "we".
```

### 7.3 Commentaire avec mention StoreMD (20% des cas)

```
[Screenshot du thread r/shopify]

Le merchant décrit EXACTEMENT [problème StoreMD résout].

Génère mon commentaire avec mention contextuelle StoreMD :
- 80% du commentaire = pure valeur (réponse complète au problème)
- 20% = mention en P.S. ou dernière phrase + lien UTM (Section 3 selon sub)
```

### 7.4 Post Couche B beta (uniquement après 4-6 sem karma)

```
Génère un post Reddit Couche B beta sur [r/shopify / r/ecommerce].

Format :
- Titre : "Building a tool for [problème], looking for 10 beta testers"
- Contexte (pourquoi je build)
- Ce que ça fait (3-4 bullets)
- Conditions beta (free, install hors store, feedback)
- Lien UTM beta (variante couche-b à ajouter au fichier UTM officiel si pas encore présente)
- "Drop URL or DM if interested"
```

---

## 8. Prompts — cold outreach scan + DM

### 8.1 DM avec scan boutique (le levier le plus convertissant)

```
J'ai scanné [boutique URL] pour cold outreach.
Findings :
- [Finding 1 chiffré]
- [Finding 2 chiffré]
- [Finding 3 chiffré]

Génère le DM [plateforme : Reddit / FB Messenger / Insta / LinkedIn / Twitter] pour [@user].
Compte qui envoie : [F ou R perso].

Format :
- 4-6 phrases max
- Référence visible au post du merchant
- 3 findings concrets avec chiffres
- Lien UTM tagué (depuis UTM_TRACKING_LINKS.md Section [appropriée])
- Pas de pitch agressif
- Soft CTA ("happy to share full report if useful")
```

### 8.2 Liste cibles cold outreach (depuis Grok / ChatGPT / scan listing)

```
[Screenshot ou liste de profils]

Parse cette liste et propose de queue les cibles (action queue_cold_targets).
Pour chaque cible : @handle + plateforme + boutique URL si visible.
```

(Pattern JARVIS natif — cf. `../../JARVIS.md` §"Listes de cibles")

### 8.3 Follow-up DM (1 seule fois si pas de réponse)

```
[Screenshot DM précédent envoyé il y a 3+ jours sans réponse]

Pas de relance. Logger comme "no reply, lâché" et passer au suivant.
```

(Règle absolue — cf. `engagement-reddit-fb.md` §7.1 et `../canaux/reddit.md` §7.3)

---

## 9. Prompts — analyse de threads pour engagement

### 9.1 Filtrer plusieurs threads candidats

```
[Screenshot 5-10 threads Reddit / FB groupes candidats]

Filtre : lesquels valent un comment selon les critères de engagement-reddit-fb.md §4 ?
Pour chaque thread retenu :
- Pertinence (Couche A vente / Couche B beta / pas pertinent)
- Angle de réponse (80% valeur / 20% mention)
- Cold outreach scan possible (URL boutique visible ?)
- Variante de comment dans la voix [F / R]
```

### 9.2 Analyse thread spécifique pour engagement

```
[Screenshot d'un thread spécifique]

Analyse ce thread :
- Quel problème le merchant décrit ?
- StoreMD résout ce problème (oui / non / partiellement) ?
- 80% valeur ou 20% mention ?
- 2 variantes de comment dans la voix [F / R]
- Si URL boutique visible → cold outreach scan recommandé ?
```

---

## 10. Prompts — réponses aux commentaires entrants

Référence détaillée : `reponses-commentaires.md`.

### 10.1 Répondre à une reply Twitter / LinkedIn

```
[Screenshot reply entrante]

Génère 2 variantes de réponse (voix [persona] selon compte) :
- Variante 1 substantielle (15+ mots, provoque thread)
- Variante 2 concise (factuelle, courte)
```

(Pattern JARVIS natif — cf. `../../JARVIS.md` §"Screenshots")

### 10.2 Répondre à un commentaire compte produit @storemd

```
[Screenshot commentaire TikTok / Insta / FB Page sur vidéo @storemd]

Génère 2 variantes de réponse voix @storemd (compte produit) :
- Pas de "I" / "we"
- Factuel, axé résultats
- 2-3 phrases max
- Lien UTM si pertinent (bio_link)
```

### 10.3 Répondre à une critique du produit

```
[Screenshot commentaire critique]

Réponse voix @storemd (ou voix F/R selon compte) :
- Remerciement sincère
- Demande de précision sur la critique
- Proposer follow-up concret
- JAMAIS défensif
```

---

## 11. Prompts — rapport hebdo vendredi

### 11.1 Génération rapport hebdo complet

```
Génère le rapport hebdo S[X] pour le brainstorm vendredi.

Inclure :
1. Volumes activité réalisés vs cibles (Couche A + Couche B séparément)
   - Vidéos TikTok / Reels / FB Page (publiées)
   - Posts Twitter / LinkedIn par compte
   - Engagements Reddit + FB groupes (par sub/groupe)
   - Cold outreach + scan + DM
   - Cross-engage F↔R

2. KPIs business StoreMD (depuis dashboard admin /dashboard/admin)
   - MRR
   - Paid conversions
   - Installs
   - Funnel 30j (landing → CTA → install start → install complete → paid)
   - Email leads

3. Métriques de compréhension
   - Top 3 contenus par installs (croisement plateformes natives + dashboard)
   - Flop 3 contenus (drop-off, pourquoi)
   - Top 3 sources UTM (visits + installs)
   - Top 3 angles cold outreach qui ont eu des réponses

4. Conversations privées en cours (DM, threads en discussion)
   - Liste merchants en discussion
   - Statut (intéressé / scan envoyé / silence / convertis)

5. Alertes Ouroboros
   - Incohérences détectées
   - Risques identifiés
   - Opportunités proposées

6. Recommandations pour S[X+1]
   - Quels angles pousser
   - Quels arrêter
   - Cibles cold à prioriser
   - Volumes à ajuster
```

### 11.2 Bilan rapide quotidien

```
Bilan / résumé / où j'en suis ?
```

(Pattern JARVIS natif — cf. `../../JARVIS.md` §"Bilan")

JARVIS sort : compteurs du jour + timeline + historique récent → synthèse.

---

## 12. Prompts — génération de fichiers stratégiques

### 12.1 Création/modification d'un fichier markdown

```
Crée le fichier [chemin/nom.md] avec ce contenu : [...]

ou

Modifie [chemin/nom.md] : [changement à appliquer]
```

JARVIS appelle l'action `create_file` (cf. `../../JARVIS.md` §"Types d'actions"). Une carte ACTION PROPOSÉE apparaît dans le chat. Tu valides (✓) pour commit.

### 12.2 Plan hebdomadaire

```
Crée le plan-hebdo S[X] pour [F / R].

Inclure :
- Posts schedulés par jour
- Cross-engage prévu
- Cold outreach quotidien cible
- Engagement quotidien cible
- Rappels brainstorm vendredi/samedi
```

---

## 13. Prompts — recherche dans la mémoire

### 13.1 Recherche MemPalace globale

```
/search [ta question]
```

(Cherche dans toutes les wings)

### 13.2 Recherche dans une wing spécifique

```
/wing storemd pricing
/wing romain twitter
/wing fabrice tech
/wing marketing strategie
```

### 13.3 Récupérer un drawer pour contexte

Dans MemPalace UI : trouver le drawer + cliquer "Envoyer à JARVIS" → injecté comme contexte du chat courant.

---

## 14. Bonnes pratiques

### 14.1 Briefer JARVIS efficacement

✅ **Bon brief** :
```
Génère 3 angles de tweets @FabGangi pour la semaine S6.
Couche A vente. Sujets : speed apps, chargeback fraud, app bloat.
Voix F technique builder. 280 chars max. Format 2-blocs.
```

❌ **Mauvais brief** :
```
Tweets pour cette semaine.
```

JARVIS doit tout deviner si pas de contexte → qualité chute.

### 14.2 Itérer rapidement

```
[JARVIS génère draft 1]

"Parfait sur l'angle, mais raccourcis le hook + change le 2e tweet pour pousser plus sur le ROI."

[JARVIS génère draft 2]
```

Plusieurs itérations courtes > 1 brief géant qui essaye de tout cadrer.

### 14.3 Toujours valider l'output

| Vérification | Comment |
|---|---|
| Voix persona cohérente ? | Comparer à `romain/VOIX.md` ou `fabrice/VOIX.md` |
| Patterns IA absents ? | Filtre anti-IA `../../ANTI-IA.md` §RÈGLE #0 |
| Chiffres vérifiables ? | Source = MUTATIONS.md ou scan réel |
| UTM correct ? | Depuis `UTM_TRACKING_LINKS.md` officiel |
| Format respecté ? | 2-blocs Twitter / 800-1300 chars LinkedIn / 15-45s vidéo |
| Hashtags = ZÉRO ? | Vérifier |

### 14.4 Logger après publication

Une fois publié :
- "j'ai posté [sujet]" → JARVIS log
- "envoyée" / "posté" après contenu généré → JARVIS log

Patterns natifs JARVIS — automatique.

---

## 15. Limites et anti-patterns

### 15.1 Ce que JARVIS NE peut pas faire (cf. `../../JARVIS.md` §"Limites")

- Modifier du code source directement
- Pousser sur GitHub sans validation
- Accéder aux APIs externes en écriture (Twitter, LinkedIn, Stripe)
- **Répondre à la place de F ou R sur les réseaux**
- Contourner les kill-switches
- Modifier ses fichiers de config

### 15.2 Ce que JARVIS NE doit JAMAIS produire (cf. `../../JARVIS.md` §"Ce que JARVIS ne doit JAMAIS produire")

- Faux MRR, faux clients, testimonials inventés
- Mention Altistone ou la Toile dans contenu public
- Hashtags
- Em-dash comme pivot de phrase
- "Here's the thing", "At the end of the day", "Which means", "However,", "Furthermore,"
- Listes numérotées dans les commentaires Reddit/Twitter
- Formes longues anglaises (utiliser contractions : don't, won't, I've)

### 15.3 Anti-patterns prompts

- **Prompt trop générique** ("écris-moi un post")
- **Prompt sans persona** (JARVIS doit deviner la voix)
- **Prompt sans plateforme** (chaque plateforme a ses règles)
- **Prompt avec contexte hallucinatoire** ("on a 1000 clients" → JARVIS produira du contenu basé sur ce mensonge)
- **Pas de validation après génération** (publier le draft brut = patterns IA détectés)

---

## 16. Documents liés

- `../../JARVIS.md` — manuel d'utilisation JARVIS complet (35 patterns natifs, outils, Ouroboros, MemPalace)
- `reponses-commentaires.md` — protocole réponses commentaires
- `engagement-reddit-fb.md` — protocole engagement actif communautés
- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons, rapport hebdo
- `../contenu/formats.md` — formats par plateforme + voix par persona
- `../contenu/pipeline-video.md` — pipeline vidéo Phase 1 + 2
- `../canaux/*.md` — détails par canal
- `../../romain/VOIX.md` + `../../fabrice/VOIX.md` — voix par persona (filtre anti-IA RÈGLE #0)
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- `../../produits/MUTATIONS.md` — sources chiffrées StoreMD
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — UTM officiels
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — couches A + B
- Fichiers prompts existants pour outils externes : `../../romain/engagement/`, `../../romain/cold/`, `../../romain/claude-code-prompts.md`
- JARVIS : `https://f2-jarvis.vercel.app`
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
