# ALGORITHME LINKEDIN — 2026

**Dernière mise à jour :** 04 avril 2026
**Sources :** 15+ sources croisées — Richard van der Blom (Algorithm InSights Report 2025, 1.8M posts analysés), AuthoredUp (621K+ posts), Hootsuite, Sprout Social, SocialBee, MeetEdgar, Growth Terminal, Dataslayer (300 posts testés), designACE, Agorapulse, Botdog, Brixon Group, ContentIn, LinkedIn Engineering Blog, LinkedIn Marketing Solutions Blog.
**Ce fichier contient :** la mécanique algorithmique pure. Pas de stratégie — les tactiques sont dans `linkedin/context.md`.

---

## 1. ARCHITECTURE — COMMENT L'ALGO FONCTIONNE

### 1.1 Le pipeline en 3 étapes

| Étape | Nom | Ce qui se passe |
|-------|-----|-----------------|
| **1** | Filtre qualité | Le post est classé instantanément : spam, low quality, ou high quality. L'IA scanne le texte, les images, l'historique du compte. Pattern-matching avec 93% de précision. Si classé spam ou low quality → distribution quasi-nulle. |
| **2** | Test d'audience | Le post est montré à 2-5% du réseau (connexions de 1er degré). L'algo mesure l'engagement dans les 60 premières minutes ("golden hour"). Si l'engagement est fort → étape 3. Si faible → le post meurt. Seulement 5% des posts qui échouent à cette étape récupèrent. |
| **3** | Distribution élargie | Le post est poussé au reste du réseau de 1er degré, puis aux connexions de 2e et 3e degré, puis aux feeds thématiques. Distribution continue tant que l'engagement se maintient — peut durer des jours, parfois des semaines. |

### 1.2 Le changement majeur de 2025-2026

LinkedIn est passé d'un algo basé sur l'**engagement quantitatif** (likes, shares, volume) à un algo basé sur l'**engagement qualitatif** (dwell time, profondeur des commentaires, saves, pertinence). Le nouveau système s'appelle **"Depth Score"** — il mesure la VALEUR du temps passé sur le contenu, pas le nombre d'interactions.

Conséquences mesurées (rapport van der Blom, 1.8M posts) :
- Reach organique : **-50%** vs année précédente
- Engagement global : **-25%**
- Croissance followers : **-59%**
- MAIS : taux de conversion (reach → action business) = **stable**

Traduction : moins de gens voient ton contenu, mais ceux qui le voient sont plus pertinents. Less reach, same conversion.

### 1.3 L'IA derrière l'algo (mise à jour octobre 2025)

LinkedIn utilise désormais des **LLM embeddings** pour comprendre le contenu sémantiquement. L'algo ne regarde plus les mots-clés ou les hashtags — il comprend le SENS du post. Il réduit ~300 millions de posts à ~2000 candidats par utilisateur via un système de **cohort-based embedding retrieval** : il apprend quels segments professionnels engagent avec quel type de contenu et réplique la distribution vers des profils similaires.

L'algo croise aussi le contenu du post avec le profil de l'auteur (**Knowledge Graph Validation**). Si un graphiste poste sur le quantum computing, l'algo voit un décalage et limite la distribution. Si un CTO poste sur le quantum computing, l'algo valide l'expertise et amplifie.

---

## 2. POIDS DES INTERACTIONS — HIÉRARCHIE

### 2.1 Classement des signaux d'engagement

| Signal | Poids relatif | Pourquoi |
|--------|--------------|----------|
| **Commentaire substantif (15+ mots)** | ★★★★★ | Signal le plus puissant. Un commentaire de 15+ mots reçoit 2.5x plus de poids algorithmique qu'un commentaire court. |
| **Thread de conversation (replies sous replies)** | ★★★★★ | Un post avec des échanges entre plusieurs participants reçoit 5.2x plus d'amplification qu'un post avec des commentaires isolés. |
| **Save (enregistrement)** | ★★★★☆ | Signal fort de valeur durable. Nouveau signal mesuré depuis fin 2025. Indique que le contenu est utile à long terme. |
| **Send (envoi privé en DM)** | ★★★★☆ | Signal très fort. Quelqu'un envoie ton post à un collègue = preuve de valeur. |
| **Dwell time (temps passé)** | ★★★★☆ | Signal silencieux mais puissant. Posts avec 61+ secondes de dwell time = 15.6% engagement rate. Posts < 3 secondes = 1.2% engagement rate. |
| **Clic "See more"** | ★★★☆☆ | Preuve d'intérêt — le post était assez intéressant pour que l'utilisateur veuille lire la suite. |
| **Share avec commentaire** | ★★★☆☆ | Plus fort qu'un simple repost car l'auteur du share ajoute sa perspective. |
| **Repost (sans commentaire)** | ★★☆☆☆ | Signal faible. Mieux que rien mais pas de valeur ajoutée. |
| **Réaction (Like, Insightful, Love...)** | ★★☆☆☆ | Signal faible. Un commentaire vaut 15x un like. Les différentes réactions (Insightful, Love, Celebrate) ont des poids légèrement différents mais tous restent faibles. |
| **Visite de profil après lecture** | ★★★☆☆ | Signal fort d'intérêt pour l'auteur. Mène au follow ou à la connexion. |

### 2.2 Ce que ce classement nous dit

- **Optimiser pour les commentaires substantifs**, pas les likes. Un post avec 50 commentaires bat un post avec 500 likes.
- **Les saves et sends sont les nouveaux signaux clés.** LinkedIn les a ajoutés aux analytics fin 2025 — c'est un message clair sur ce qu'ils valorisent.
- **Le dwell time est impossible à tricher.** Pas de bot qui peut simuler 60 secondes de lecture. Le seul moyen de l'obtenir = du contenu qui mérite d'être lu.

### 2.3 Engagement d'experts vs engagement random

L'engagement n'est pas égal selon QUI engage :
- Un commentaire d'un **expert reconnu dans ta niche** pèse **5-7x plus** qu'un commentaire d'une connexion random hors de ton industrie.
- L'algo identifie les "clusters" professionnels et booste la distribution quand des membres pertinents engagent.
- Les engagement pods sont détectés avec **97% de précision** et pénalisés.

---

## 3. VÉLOCITÉ D'ENGAGEMENT — LES 60 PREMIÈRES MINUTES

### 3.1 Le mécanisme de distribution

1. Post publié → montré à **2-5% de ton réseau** de 1er degré.
2. L'algo mesure pendant **60 minutes** (certaines sources disent 60-90 min) : engagement rate, qualité des commentaires, dwell time, saves.
3. Si le test est positif → distribution aux 95-98% restants du réseau, puis 2e et 3e degrés.
4. Si le test échoue → le post plafonne. **Seulement 5% des posts qui échouent à cette étape récupèrent.**

### 3.2 La longue traîne (nouveau 2025-2026)

Contrairement à Twitter où un tweet meurt en 6h, **un post LinkedIn peut rester actif des jours, voire des semaines**. LinkedIn surface des posts de 2-3 semaines s'ils sont pertinents pour l'utilisateur. Le contenu evergreen a une durée de vie beaucoup plus longue qu'avant.

### 3.3 Implications pour nous

- **Être actif dans les 60 min après publication.** Répondre à chaque commentaire rapidement = crée des threads = signal 5.2x.
- **Engager sur 5-10 posts d'autres personnes AVANT de publier** (même logique de halo que Twitter, cf. twitter/algo.md §3.3).
- **Ne pas republier trop vite.** Un nouveau post peut couper la distribution du précédent. Attendre que l'engagement du post précédent ralentisse (minimum 24h, idéalement quand les impressions plafonnent).

---

## 4. PROFILS PERSONNELS vs PAGES ENTREPRISE — LE GOUFFRE

### 4.1 Les chiffres

| Métrique | Profil personnel | Page entreprise |
|----------|-----------------|-----------------|
| Reach organique (% des followers qui voient le post) | ~10-15% | ~1.6% |
| Part du feed LinkedIn | ~87% (créateurs + individus) | ~2% (contenu organique company) |
| Engagement comparé (même contenu) | 5x plus | Baseline |
| Impressions comparées | 2.75x plus | Baseline |
| Avantage reach global | **561% de plus** | — |

### 4.2 Ce que ça signifie pour nous

**Les profils personnels de R et F sont les véhicules de distribution.** La page company FoundryTwo sur LinkedIn ne sera jamais le moteur de reach — c'est un support de crédibilité, pas un canal d'acquisition.

### 4.3 Le modèle qui fonctionne en 2026

Les marques qui réussissent sur LinkedIn en 2026 mettent leurs fondateurs/employés en avant. La page company sert de hub (logo, about, produits) mais le contenu visible passe par les profils personnels. C'est exactement notre modèle R + F → F2.

---

## 5. FORMATS DE CONTENU — CLASSEMENT PAR PERFORMANCE

### 5.1 Tableau comparatif

| Format | Engagement rate moyen | Dwell time | Reach | Notre usage |
|--------|----------------------|------------|-------|-------------|
| **Document / Carousel (PDF)** | 6.6% (le plus haut) | ★★★★★ (chaque slide = interaction) | Très fort | R : frameworks growth e-com/marketing, guides conversion. F : diagnostics techniques, step-by-step automatisation. |
| **Vidéo native (verticale, < 60s)** | Variable | ★★★★☆ (si rétention haute) | Fort (+69% YoY views) | Pas prioritaire Phase 1. Évaluer Phase 2. |
| **Texte + image (photo perso)** | ~5% | ★★★☆☆ | Bon | Photos perso = +50% engagement vs stock photos. |
| **Texte long (1000-1300 caractères)** | ~4% | ★★★★☆ (si bien structuré) | Bon | Format par défaut pour R et F. |
| **Texte court (< 500 caractères)** | ~2-3% | ★★☆☆☆ | Moyen | Utiliser ponctuellement pour les hot takes. |
| **Image simple** | ~4.85% | ★★☆☆☆ | Moyen | Sous-performe le texte seul de 30% en 2026. |
| **Poll (sondage)** | Variable | ★★☆☆☆ | Bon (le poll reste visible longtemps) | 7 jours optimal. 3 options max. 1 jour = -70% engagement. |
| **Texte seul (page company)** | 0.28x multiplier | ★☆☆☆☆ | Très faible | À éviter pour F2. |

### 5.2 Règles clés par format

**Documents / Carousels :**
- PDF uploadé (les carousels natifs ont été supprimés fin 2023, le PDF est le workaround).
- **6-9 slides optimal.** Au-delà, le completion rate chute et l'algo pénalise.
- L'algo mesure le **taux de complétion** : un carousel de 5 slides vu intégralement bat un carousel de 15 slides dont seules 3 sont vues.
- Texte lisible, gros caractères, 1 idée par slide. Mobile first.

**Vidéo native :**
- Verticale, sous-titrée (beaucoup regardent sans le son).
- < 60 secondes pour le meilleur ratio reach/rétention.
- Hook dans les 3 premières secondes. Pas d'intro type "Salut, aujourd'hui je vais parler de..."
- Le **watch-through rate** (% de la vidéo regardée) est le signal clé, pas le nombre de vues.

**Texte long :**
- Sweet spot : **800-1300 caractères**.
- Structuré : 1 phrase = 1 ligne. Aéré. Pas de murs de texte.
- Le hook (2 premières lignes avant "See more") est critique — 7 secondes pour convaincre sur mobile.
- 72% de l'activité LinkedIn est sur mobile.

**Polls :**
- **7 jours de durée** = meilleure performance (1 jour = -70% engagement).
- **3 options** performent mieux que 4.
- Suivre le poll avec un post d'analyse des résultats = double contenu.

---

## 6. PÉNALITÉS — CE QUI TUE LA DISTRIBUTION

### 6.1 Pénalités sévères

| Action | Impact | Détail |
|--------|--------|--------|
| **Liens externes dans le corps du post** | **-60% reach** | LinkedIn veut garder les utilisateurs sur la plateforme. Chaque lien externe = un signal de sortie. |
| **"Lien en premier commentaire"** | **Aussi pénalisé** (début 2026) | L'ancien hack ne fonctionne plus. La pénalité est réduite vs corps du post mais toujours significative. |
| **Engagement bait** ("Like if you agree", "Comment YES") | **Suppression active** | LinkedIn a déclaré que 60% des posts à haut engagement en 2025 utilisaient ces tactiques. Changements de ranking pour les pénaliser. |
| **Engagement pods** | **Détection 97%, pénalité sévère** | L'algo identifie les patterns d'engagement coordonné. Peut entraîner une restriction de distribution à l'échelle du compte. |
| **Contenu promotionnel agressif** | **Jusqu'à -70% reach** | Si l'algo détecte de la vente directe sans valeur ajoutée. |
| **Contenu recyclé / dupliqué** | **-84% reach** | L'algo détecte les patterns de similarité même avec du texte reformulé. |
| **Contenu IA détectable** | **Signalé comme spam** | Le ton "overly AI-sounding" est un déclencheur de filtre qualité en 2026. |

### 6.2 Pénalités modérées

| Action | Impact | Détail |
|--------|--------|--------|
| **5+ hashtags** | **Déclenche le filtre spam** | Même 3+ hashtags = -70% reach selon certaines études. |
| **Poster plusieurs fois en < 24h** | **Auto-concurrence** | Ton nouveau post cannibalise le reach du précédent. |
| **Mass tagging (> 5 personnes)** | **Pénalité de confiance** | Perçu comme spam. Tagger uniquement quand c'est pertinent. |
| **Images stock génériques** | **-30% vs texte seul** | En 2026, une image simple sous-performe un post texte pur. |
| **Changement brusque de thématique** | **~43 jours d'ajustement** | Si tu postes sur le growth e-com pendant 3 mois et tu switch sur la cuisine, l'algo a besoin de temps pour recalibrer. |
| **Commentaires courts de l'auteur** | **Risque de pénalité si > 50% des commentaires sont les tiens** | Répondre aux autres = bien. Commenter ses propres posts sans interaction extérieure = signal suspect. |

### 6.3 Règle des liens en 2026

Les liens externes sont le piège principal. Voici la hiérarchie de la moins pénalisante à la plus pénalisante :

1. **Pas de lien du tout** — 0% pénalité. Post de valeur pure.
2. **Lien ajouté APRÈS que l'engagement démarre** — Pénalité minimale (publier le post sans lien, laisser l'engagement monter, puis éditer pour ajouter le lien).
3. **Lien en premier commentaire** — Pénalité réduite mais présente depuis début 2026.
4. **Lien dans le corps du post** — -60% reach.
5. **Lien dans le corps + preview card** — Pire cas. Supprimer le preview card si lien obligatoire.

---

## 7. "TOPIC DNA" — AUTORITÉ THÉMATIQUE

### 7.1 Ce que c'est

LinkedIn attribue à chaque compte un **"Topic DNA"** — un profil thématique basé sur :
- Le contenu publié (sujets récurrents)
- L'engagement reçu (qui engage, sur quels sujets)
- Le profil (titre, skills, expérience)
- Les hashtags suivis et les groupes

L'algo utilise ce Topic DNA pour distribuer le contenu vers des audiences thématiquement pertinentes, même hors du réseau direct.

### 7.2 Implications pour nous

- **R doit rester dans le growth/e-com/marketing.** Chaque post hors sujet dilue le Topic DNA.
- **F doit rester dans le tech/e-com/creators.** Même logique.
- **Ne jamais changer de thématique brutalement** — 43 jours d'ajustement algorithmique si le shift est trop radical.
- **Les 2-4 premiers mois sont critiques** pour établir le Topic DNA. L'algo apprend les patterns et récompense la cohérence.

---

## 8. PROFIL OPTIMISÉ — IMPACT SUR LA DISTRIBUTION

Un profil complet augmente le baseline reach de TOUT ce que tu publies. LinkedIn traite les profils complets comme des contributeurs de confiance.

| Élément profil | Impact |
|---------------|--------|
| **Photo professionnelle** | Posts avec photo d'auteur reçoivent plus de confiance. Photo perso > logo. |
| **Headline optimisée** | L'algo la lit pour catégoriser tes posts. "Growth / E-com & Marketing @ FoundryTwo" > "Entrepreneur". |
| **About section remplie** | Renforce le Topic DNA. Mots-clés pertinents = meilleure catégorisation. |
| **Expérience + Skills** | L'algo croise avec le contenu pour valider l'expertise (Knowledge Graph). |
| **Creator Mode activé** | Distribution basée sur les followers (pas seulement les connexions). Choisir 5 hashtags d'expertise. |

---

## 9. HORAIRES OPTIMAUX

### 9.1 Données globales

| Créneau | Performance |
|---------|-------------|
| **Mardi, Mercredi, Jeudi** | Meilleurs jours. Activité maximale. |
| **8h-10h** (heure locale de l'audience) | Pic matinal — scroll pré-réunion. |
| **12h-14h** | Pic déjeuner. |
| **15h-17h** | Pic fin de journée. |
| **Lundi** | Correct mais moins bon que mar-jeu. |
| **Vendredi** | Engagement en baisse après 14h. |
| **Weekend** | Faible pour le B2B. Dimanche soir peut fonctionner pour le long-form. |

### 9.2 Pour notre audience (e-com/marketing, principalement US EST)

Depuis Marseille (CET, UTC+1) vers US EST (UTC-5) :

| Créneau Marseille | Heure US EST | Moment audience |
|-------------------|-------------|-----------------|
| **14h-15h CET** | 8h-9h EST | Pic matinal US. Meilleur créneau. |
| **18h-19h CET** | 12h-13h EST | Pause déjeuner US. |
| **21h-22h CET** | 15h-16h EST | Fin d'après-midi US. |

### 9.3 Fréquence de publication

| Fréquence | Recommandation |
|-----------|---------------|
| **Profils personnels** | 3-5x/semaine optimal. Quotidien acceptable si la qualité tient. |
| **Pages company** | 3-5x/semaine max. Au-delà, les posts s'auto-cannibalisent. |
| **Minimum 24h entre 2 posts** | Publier trop rapproché = le nouveau post tue le précédent. |
| **Consistance > fréquence** | 3x/semaine pendant 3 mois bat 7x/semaine pendant 3 semaines. |

---

## 10. HASHTAGS EN 2026

L'algo de LinkedIn utilise désormais le NLP (Natural Language Processing) pour comprendre le sujet du post directement à partir du texte. Les hashtags ne sont plus nécessaires pour la catégorisation.

| Quantité | Impact |
|----------|--------|
| **0 hashtag** | OK. L'algo comprend le sujet sans. |
| **1-2 hashtags** | Marginal. Aide à la catégorisation mais pas critique. |
| **3 hashtags** | Maximum acceptable. Au-delà = signal spam. |
| **3+ hashtags** | **-70% reach** selon plusieurs études. Déclenche le filtre spam. |

**Règle :** 0-2 hashtags, très spécifiques et pertinents. Jamais génériques (#business, #marketing). Si le post est bien écrit, l'algo n'a pas besoin de hashtags pour le catégoriser.

---

## 11. RÉSUMÉ — LES 10 RÈGLES DE L'ALGO LINKEDIN

| # | Règle | Impact |
|---|-------|--------|
| 1 | **Profil personnel > page company.** Les profils personnels ont 561% plus de reach. Le contenu passe par R et F, pas par la page F2. | Structurel |
| 2 | **Les commentaires sont rois.** Un commentaire substantif (15+ mots) vaut 15x un like. Optimiser pour les conversations, pas les réactions. | Critique |
| 3 | **Dwell time = signal #1 silencieux.** 61+ secondes = 15.6% engagement. < 3 secondes = 1.2%. Écrire du contenu qui MÉRITE d'être lu. | Critique |
| 4 | **Gagner les 60 premières minutes.** 2-5% du réseau voit le post initialement. L'engagement dans cette fenêtre détermine tout. Être actif, répondre, engager avant de poster. | Critique |
| 5 | **Zéro lien externe dans le post.** -60% reach. Le "lien en commentaire" est aussi pénalisé en 2026. Valeur d'abord, lien ensuite si nécessaire. | Sévère |
| 6 | **Documents/carousels = format roi.** 6.6% engagement, 2-3x plus de dwell time. 6-9 slides, taux de complétion > quantité de slides. | Fort |
| 7 | **Rester dans sa niche.** Le Topic DNA récompense la cohérence thématique. Chaque post hors sujet dilue l'autorité. | Fort |
| 8 | **0-2 hashtags max.** L'algo comprend le contenu sémantiquement. 3+ hashtags = -70% reach. | Modéré |
| 9 | **Pas de contenu recyclé.** -84% reach sur du contenu dupliqué même reformulé. Même sujet OK, angle et formulation différents obligatoires. | Sévère |
| 10 | **Saves et sends = nouveaux signaux clés.** LinkedIn les a ajoutés aux analytics fin 2025. Créer du contenu que les gens veulent garder (frameworks, guides, checklists). | Fort |

---

## 12. DIFFÉRENCES CLÉS LINKEDIN vs TWITTER

| Aspect | LinkedIn | Twitter |
|--------|----------|---------|
| **Durée de vie d'un post** | Jours à semaines | 6 heures (50% decay) |
| **Signal #1** | Dwell time + commentaires substantifs | Reply auteur (150x) |
| **Format dominant** | Document/carousel PDF | Texte pur + threads |
| **Liens externes** | -60% reach (très puni) | -30 à -90% reach (puni aussi) |
| **Hashtags** | 0-2 (3+ = spam) | 0-1 (3+ = -40%) |
| **Pages entreprise** | ~2% du feed (quasi-invisible) | Pas de distinction structurelle |
| **Engagement pods** | Détection 97%, pénalité compte | Détection automatisée, pénalité |
| **Algo anti-viral** | OUI — conçu pour empêcher la viralité, favorise la pertinence | NON — favorise la viralité |
| **Audience cible** | Professionnels B2B, décideurs | Tous publics, tech/startup heavy |
| **Ton attendu** | Professionnel décontracté, data-driven | Direct, concis, provocateur |
| **Cross-engagement** | Moins codifié, mais réciproque = boost mutuel | Protocole strict 15 min (notre système) |
| **Longueur optimale** | 800-1300 caractères | 100-260 caractères |

---

## 13. SOURCES

| Source | Type | Taille données | Date |
|--------|------|---------------|------|
| Richard van der Blom — Algorithm InSights Report 2025 | Recherche indépendante | 1.8M posts | 2025 |
| AuthoredUp | Dataset propriétaire | 621K+ posts | Dec 2025 |
| Dataslayer | Tests internes | 300 posts Jan-Oct 2026 | Fév 2026 |
| Hootsuite | Guide expert | — | Juil 2025 |
| MeetEdgar | Guide 2026 | — | Jan 2026 |
| SocialBee | Guide 2026 | — | Dec 2025 |
| Growth Terminal | Guide 2026 | — | Dec 2025 |
| designACE | Analyse 2026 | — | Fév 2026 |
| Agorapulse | Étude + données propriétaires | — | Fév 2026 |
| Botdog / Just Connecting | Recap rapport van der Blom | — | Juin 2025 |
| Brixon Group | Analyse B2B | — | Sept 2025 |
| ContentIn | Guide formats 2025 | — | 2025 |
| LinkedIn Engineering Blog | Source officielle | — | Continu |
| LinkedIn Marketing Solutions Blog | Source officielle | — | Continu |
| UpGrowth (360Brew analysis) | Analyse détaillée | — | Mars 2026 |
