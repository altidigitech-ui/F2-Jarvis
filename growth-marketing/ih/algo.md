# FONCTIONNEMENT INDIEHACKERS — 2026

**Dernière mise à jour :** 04 avril 2026
**Sources :** IndieHackers (post officiel sur le classement), étude de 500 posts IH (scottPlusPlus/Medium), Awesome Directories (étude 2025, 387 lancements, 156 fondateurs), retours d'expérience de créateurs IH, structure observable du site.
**Ce fichier contient :** la mécanique de la plateforme. Pas de stratégie — les tactiques sont dans `ih/context.md`.

**Note importante :** IndieHackers n'est PAS un réseau social avec un algorithme de recommandation sophistiqué comme Twitter ou LinkedIn. C'est un **forum communautaire**. Le classement est basique : commentaires + upvotes + récence. Il n'y a pas de dwell time, pas de Topic DNA, pas de golden hour, pas de signaux silencieux. Ce document est volontairement plus court que twitter/algo.md ou linkedin/algo.md — la plateforme est plus simple.

---

## 1. ARCHITECTURE — COMMENT IH FONCTIONNE

### 1.1 Ce que c'est

IndieHackers est un forum communautaire pour les fondateurs indépendants (indie hackers, bootstrappers, solopreneurs). Racheté par Stripe en 2017. L'objectif de la plateforme : permettre aux builders de partager leurs parcours, s'entraider, et apprendre les uns des autres.

**Ce n'est PAS :**
- Un réseau social avec followers et feed personnalisé par IA
- Une plateforme de lancement (c'est Product Hunt)
- Un réseau professionnel (c'est LinkedIn)

**Ce que c'est :**
- Un forum avec des posts, des commentaires, et des upvotes
- Une communauté de builders qui valorise la transparence, les chiffres réels, et l'entraide
- Un espace où la valeur du contenu prime sur l'identité de l'auteur

### 1.2 Structure du site

| Section | Contenu | Utilité pour nous |
|---------|---------|------------------|
| **Feed principal** | Posts de la communauté, triables par Popular / Newest | C'est là que nos posts apparaissent |
| **Leaderboard quotidien** | Posts "build in public" les plus engagés du jour | Objectif : y apparaître avec nos updates |
| **Interviews** | Interviews de fondateurs par IH (contenu éditorial) | Pas actionnable directement — c'est du contenu IH, pas communautaire |
| **Products** | Annuaire de produits listés par les fondateurs | Les SaaS FoundryTwo doivent y être listés au fur et à mesure des lancements |
| **Jobs** | Offres d'emploi | Pas pertinent pour nous |
| **Co-founders** | Recherche de co-fondateurs | Pas pertinent pour nous |
| **Top posts** | Filtrable par semaine, mois, all-time | Analyser ce qui marche pour calibrer notre contenu |

### 1.3 Les feeds disponibles

| Feed | Classement | Usage |
|------|-----------|-------|
| **Popular** (défaut) | Combinaison de upvotes + commentaires + récence. Les posts les plus engagés remontent. | C'est le feed que 90% des utilisateurs voient. Notre cible. |
| **Newest** | Chronologique pur. Les derniers posts en premier. | Visibilité initiale de chaque post avant qu'il soit classé par Popular. |
| **Top (semaine/mois/all-time)** | Classement par engagement cumulé sur la période. | Référence pour analyser les patterns de contenu qui fonctionnent. |

---

## 2. CLASSEMENT — COMMENT LES POSTS MONTENT

### 2.1 Ce qu'IH a confirmé officiellement

Citation directe d'un post officiel IndieHackers sur le classement :

> "Our ranking algorithm rewards posts that generate discussion and have more comments."

C'est la règle #1. **Les commentaires sont le signal principal.** Les upvotes comptent aussi mais les commentaires pèsent plus lourd dans le classement.

### 2.2 Les signaux de classement

| Signal | Poids | Détail |
|--------|-------|--------|
| **Nombre de commentaires** | ★★★★★ | Signal le plus puissant. Un post avec 30 commentaires bat un post avec 100 upvotes et 5 commentaires. |
| **Upvotes** | ★★★☆☆ | Compte mais moins que les commentaires. Signal de validation rapide. |
| **Récence** | ★★★☆☆ | Les posts récents sont favorisés dans le feed Popular. Un post de 3 jours avec peu d'engagement disparaît. |
| **Qualité du profil auteur** | ★☆☆☆☆ | Pas de système de réputation sophistiqué. Le contenu prime sur l'auteur. |

### 2.3 Ce qui n'existe PAS sur IH (contrairement à Twitter/LinkedIn)

| Concept | Twitter/LinkedIn | IH |
|---------|-----------------|-----|
| Dwell time | ✅ Signal majeur | ❌ N'existe pas |
| Topic DNA / autorité thématique | ✅ L'algo catégorise l'auteur | ❌ N'existe pas |
| Golden hour (15-60 min critiques) | ✅ Détermine la distribution | ❌ Pas de mécanisme équivalent |
| Feed personnalisé par IA | ✅ Chaque utilisateur voit un feed unique | ❌ Tout le monde voit le même feed |
| Pénalité liens externes | ✅ -60% reach (LinkedIn), -30 à -90% (Twitter) | ❌ Les liens sont normaux et attendus |
| Followers / réseau | ✅ Distribution basée sur le réseau | ❌ Pas de followers, pas de réseau |
| Engagement pods détectés | ✅ Pénalité sévère | ❌ Pas de détection connue |

---

## 3. CE QUI FONCTIONNE — DONNÉES

### 3.1 Étude de 500 posts IH (scottPlusPlus, 2024)

Analyse de 500 articles de la page d'accueil d'IH sur une année. Top 50 vs Bottom 50 en popularité (combinaison likes, bookmarks, commentaires).

**Titre :**
- Longueur optimale : **~51 caractères**
- Les titres des top posts sont concis et promettent un insight actionnable
- Les titres des worst posts sont vagues ou sont des annonces

**Jour de publication :**
- **Jeudi = meilleur jour.** 2x plus de top posts que de bottom posts publiés un jeudi.
- **Mardi = pire jour.** 76% des posts publiés un mardi finissent dans le bottom 50.
- Weekend = moins de posts mais pas d'impact négatif significatif.

**Type de contenu — Top 50 :**

| Type | % des top 50 | Pourquoi ça marche |
|------|-------------|-------------------|
| **Success stories avec chiffres** | Dominant | "How I hit $10K MRR" — les gens veulent apprendre des parcours concrets |
| **Guides actionnables** | Fort | Surtout hors marketing (peu de concurrence). Techniques, méthodes, step-by-step. |
| **Post-mortems / échecs honnêtes** | Fort | La transparence sur les échecs génère plus d'engagement que les success stories pures |
| **Questions ouvertes (Ask IH)** | Modéré | Quand la question est spécifique et invite des réponses de qualité |

**Type de contenu — Bottom 50 :**

| Type | % des bottom 50 | Pourquoi ça échoue |
|------|-----------------|-------------------|
| **Annonces** ("My app just launched on PH") | **20% des bottom 50, 0% des top 50** | Aucune valeur pour le lecteur. "I launched" ≠ insight. |
| **Posts génériques sans données** | Fort | "Tips for startups" sans chiffres ni expérience personnelle |
| **Autopromotion directe** | Fort | Poster un lien vers son blog sans contexte = downvoté |

### 3.2 Données de conversion (Awesome Directories, 2025)

Étude de 387 lancements de produits et 156 fondateurs.

| Métrique | IH | Product Hunt |
|----------|-----|-------------|
| **Taux de conversion par post engagé** | **23.1%** | 3.1% |
| **Fondateurs qui recommenceraient** | Élevé | 11% seulement (89% ne relanceraient pas sur PH) |

**Pourquoi IH convertit mieux :**
- L'audience est ultra-ciblée (100% fondateurs/builders)
- Les posts longs avec des détails créent de la confiance
- La communauté est en mode "apprendre et acheter les outils d'autres builders"
- Il n'y a pas de touristes — chaque lecteur est un client potentiel

### 3.3 Stratégie 90/10 validée

Un fondateur a documenté publiquement sa stratégie IH (Pratham Naik, 2024) :
- **1 200 visiteurs ciblés en 6 semaines** avec 0$ de budget
- **15-20 min/jour** d'engagement
- **Ratio : 90% valeur pure / 10% mentions subtiles du produit**
- **Le profil fait le travail** — pas les liens dans les posts. Les gens qui aiment un commentaire cliquent sur le profil de l'auteur.

---

## 4. PÉNALITÉS — CE QUI TUE UN POST

### 4.1 Pénalités sévères

| Action | Impact | Détail |
|--------|--------|--------|
| **Annonce pure sans valeur** | Post ignoré / downvoté | "My app just launched" sans insight = 0% des top posts dans l'étude de 500 |
| **Autopromotion directe** | Downvoté + potentiellement signalé comme spam | Poster un lien vers son produit sans contexte ni valeur ajoutée |
| **Poster juste un lien vers un blog externe** | Faible engagement | IH confirme : "If you're just posting links to your blog, you won't find a lot of success" |
| **Contenu générique sans données** | Ignoré | "10 tips for startups" sans expérience personnelle ni chiffres = invisible |

### 4.2 Pénalités modérées

| Action | Impact | Détail |
|--------|--------|--------|
| **Titre trop long (> 80 caractères)** | Moins de clics | Le titre optimal est ~51 caractères |
| **Poster le mardi** | Moins de visibilité | 76% des posts du mardi finissent dans le bottom 50 |
| **Ne pas répondre aux commentaires** | Conversation morte | L'algo récompense les discussions — sans réponse de l'auteur, le post stagne |
| **Posts récurrents sans nouveauté** | Perçu comme spam | Poster le même type de contenu chaque semaine sans évolution |

### 4.3 Ce qui est autorisé (et même encouragé)

| Action | Détail |
|--------|--------|
| **Liens vers son produit** | Autorisé si intégré dans un post de valeur. Le lien doit être un complément, pas le centre du post. |
| **Mentions de son MRR / chiffres** | Très encouragé. Les chiffres réels sont le cœur de la communauté IH. |
| **Demander du feedback** | Encouragé via le format "Ask IH" ou "Show IH". Mais poser une VRAIE question, pas "what do you think of my product?". |
| **Partager ses échecs** | Très valorisé. Les post-mortems honnêtes génèrent plus d'engagement que les success stories. |

---

## 5. PROFIL IH — IMPACT SUR LA VISIBILITÉ

IH n'a pas de système de réputation sophistiqué, mais le profil est visible quand quelqu'un clique sur l'auteur d'un post ou d'un commentaire.

| Élément profil | Impact |
|---------------|--------|
| **Nom + bio** | Première impression. Doit être clair sur ce que tu fais. |
| **Produit listé** | IH a un champ "Product" dans le profil. Le SaaS le plus récent doit y être. C'est le lien le plus naturel vers le produit. |
| **Revenue (si partagée)** | IH permet d'afficher son MRR. Le partager crédibilise le profil et le contenu. |
| **Historique de posts** | Visible sur le profil. Un historique de posts de qualité renforce la crédibilité. |
| **Lien website** | Pointé vers le produit ou le studio. C'est le funnel naturel. |

---

## 6. FORMATS DE CONTENU — CLASSEMENT PAR PERFORMANCE

| Format | Performance | Pourquoi |
|--------|------------|----------|
| **Success story avec chiffres MRR** | ★★★★★ | Le format roi d'IH. "$10K MRR in 6 months — here's how" génère 30-50+ commentaires. |
| **Post-mortem / échec honnête** | ★★★★★ | Surperforme les success stories pures. La vulnérabilité crée de l'engagement. |
| **Guide actionnable** | ★★★★☆ | Step-by-step, techniques concrètes. Surtout efficace hors marketing (peu de concurrence). |
| **Ask IH (question spécifique)** | ★★★☆☆ | Dépend de la spécificité de la question. "How do you handle X?" > "Any tips?". |
| **Show IH (présentation produit)** | ★★★☆☆ | Fonctionne si structuré comme un story + learnings, pas comme une annonce. |
| **Build in public update** | ★★★☆☆ | Fonctionne si accompagné de chiffres réels et de learnings. Un simple "Week 3 update" sans données = ignoré. |
| **Annonce pure** | ★☆☆☆☆ | 0% des top 50, 20% des bottom 50. Ne jamais poster une annonce sans contexte. |
| **Lien vers blog externe** | ★☆☆☆☆ | IH n'est pas un agrégateur de liens. Le contenu doit être dans le post. |

---

## 7. HORAIRES OPTIMAUX

| Jour | Performance | Source |
|------|------------|--------|
| **Jeudi** | ★★★★★ Meilleur jour | Étude 500 posts : 2x plus de top posts le jeudi |
| **Mercredi** | ★★★★☆ Bon | — |
| **Lundi** | ★★★☆☆ Correct | — |
| **Vendredi** | ★★★☆☆ Correct | — |
| **Mardi** | ★☆☆☆☆ Pire jour | 76% des posts du mardi dans le bottom 50 |
| **Weekend** | ★★☆☆☆ Moins de posts, impact neutre | Volume réduit mais pas de pénalité |

**Heure de publication :** Pas de données précises sur IH (le site n'affiche pas l'heure des posts, seulement la date). L'audience est principalement US (73% du trafic) donc poster pendant les heures de bureau US EST (8h-17h EST = 14h-23h CET) est logique.

---

## 8. AUDIENCE IH — DONNÉES

| Donnée | Valeur | Source |
|--------|--------|--------|
| Audience principale | Fondateurs indépendants, bootstrappers, solopreneurs | IH |
| Géographie | 73% US | SimilarWeb |
| Genre | 73% hommes, 27% femmes | SimilarWeb |
| Tranche d'âge dominante | 25-34 ans | SimilarWeb |
| Trafic mensuel | ~2-3M visits (en baisse -16% récemment) | SimilarWeb |
| Source trafic #1 | Direct (46%) | SimilarWeb |
| Source trafic #2 | Organic Search (42%) | SimilarWeb |
| Sites similaires | Product Hunt, Hacker News, Medium | SimilarWeb |

**Ce que ces données nous disent :**
- L'audience IH inclut des builders et entrepreneurs. Notre contenu cible aussi les merchants, freelancers et creators qui fréquentent IH.
- 73% US = poster en anglais est obligatoire
- Le trafic est en baisse mais l'engagement par post reste fort (niche concentrée)
- Les visiteurs viennent en direct ou via Google — ce sont des gens qui CHERCHENT la communauté, pas des passants

---

## 9. RÉSUMÉ — LES 8 RÈGLES D'IH

| # | Règle | Impact |
|---|-------|--------|
| 1 | **Les commentaires sont le signal #1.** Un post avec beaucoup de commentaires monte. Écrire du contenu qui provoque des réponses. | Critique |
| 2 | **Valeur d'abord, produit ensuite.** 90% valeur, 10% mention subtile. Le profil fait le travail de conversion. | Critique |
| 3 | **Les chiffres réels sont la monnaie d'IH.** MRR, signups, taux de conversion, coûts — les données concrètes génèrent l'engagement. | Critique |
| 4 | **Les annonces pures = mort.** 0% des top posts. Toujours accompagner d'un insight, d'un learning, d'une histoire. | Sévère |
| 5 | **Poster le jeudi.** 2x plus de chances d'être dans le top. Éviter le mardi. | Fort |
| 6 | **Le titre fait 80% du travail.** ~51 caractères, promesse d'insight actionnable, pas de clickbait vide. | Fort |
| 7 | **Répondre à TOUS les commentaires.** L'algo récompense la discussion. Un post sans réponse de l'auteur meurt. | Fort |
| 8 | **Pas de lien blog sans contenu.** Le post IH doit se suffire à lui-même. Le lien est un bonus, pas le post. | Modéré |

---

## 10. DIFFÉRENCES CLÉS IH vs TWITTER vs LINKEDIN

| Aspect | IH | Twitter | LinkedIn |
|--------|-----|---------|----------|
| **Type de plateforme** | Forum communautaire | Réseau social | Réseau professionnel |
| **Algo de classement** | Commentaires + upvotes + récence | 300+ signaux IA, reply auteur 150x | 300+ signaux IA, dwell time, Depth Score |
| **Feed personnalisé** | Non — même feed pour tous | Oui — For You personnalisé | Oui — feed personnalisé |
| **Durée de vie d'un post** | Quelques jours (feed Popular) | 6 heures (Twitter), semaines si relancé | Jours à semaines |
| **Signal #1** | Commentaires | Reply auteur (150x) | Dwell time + commentaires substantifs |
| **Liens externes** | ✅ Autorisés et normaux | ❌ Pénalisé (-30 à -90%) | ❌ Pénalisé (-60%) |
| **Audience** | 100% fondateurs/builders | Mixte (tech, startup, grand public) | Professionnels B2B |
| **Format dominant** | Post long-form avec données | Tweet court + threads | Texte long + carousels PDF |
| **Ton attendu** | Pair-à-pair, honnête, vulnérable | Direct, provocateur, concis | Professionnel décontracté, data-driven |
| **Autopromotion** | Tolérée si accompagnée de valeur (90/10) | Pénalisée si directe | Pénalisée si directe (-70%) |
| **Followers / réseau** | Pas de followers | Followers + For You | Connexions + followers |
| **Meilleur jour** | Jeudi | Mercredi | Mardi-Jeudi |

---

## 11. SOURCES

| Source | Type | Données | Date |
|--------|------|---------|------|
| IndieHackers — post officiel sur le classement | Source primaire (la plateforme elle-même) | Confirmation : commentaires = signal principal | 2020 (toujours valide) |
| scottPlusPlus (Medium) — étude 500 posts IH | Analyse data-driven | 500 posts, top 50 vs bottom 50, timing, formats, titres | 2024 |
| Awesome Directories — IH Launch Strategy 2025 | Étude comparative | 387 lancements, 156 fondateurs, IH vs PH | Dec 2025 |
| Pratham Naik — stratégie communautaire documentée | Retour d'expérience | 1 200 visiteurs, 6 semaines, 15-20 min/jour, ratio 90/10 | Oct 2024 |
| SimilarWeb — indiehackers.com analytics | Données trafic | Audience, géographie, sources, tendances | 2025 |
| Wannabe Entrepreneur — guide IH | Retour d'expérience | 725 users/mois depuis IH | 2024 |
| peterthaleikis.com — Getting Started on IH | Guide communautaire | Bonnes pratiques, étiquette, engagement | 2023 |
