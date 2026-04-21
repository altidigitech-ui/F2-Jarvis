# CONTEXT TWITTER/X — Règles Communes F2, R, F

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `growth-marketing/context.md` (stratégie globale, piliers, frameworks, phases)
**S'appuie sur :** `twitter/algo.md` (mécanique algorithmique, poids, pénalités, boost)
**Implémenté par :** `twitter/f2/context.md`, `twitter/fabrice/context.md`, `twitter/romain/context.md`
**Ce fichier contient :** les règles Twitter communes aux 3 comptes. Ce qui est propre à un seul compte va dans son dossier.

---

## 1. RÔLE DE CHAQUE COMPTE SUR TWITTER

### 1.1 Le modèle funnel

```
R (perso) ──────┐
                 ├──→ F2 (hub studio) ──→ produits FoundryTwo (StoreMD, StoreMD module Listings, etc.)
F (perso) ──────┘
```

R et F sont les points d'entrée. Ils engagent avec la communauté, génèrent de la confiance individuelle, et redirigent naturellement vers F2. F2 est le hub : il reçoit le cross-engagement de R et F, publie le contenu studio, et porte les liens produit.

### 1.2 Rôles spécifiques

| Compte | Handle | Rôle Twitter | Publie | Engage proactivement | Cold outreach |
|--------|--------|-------------|--------|---------------------|---------------|
| **F2** | @foundrytwo | Hub studio. Portfolio build in public, données terrain, annonces produits. | ✅ 5j/semaine (R gère) | ❌ Jamais | ❌ Jamais |
| **R** | @delgado_ro72224 | Voix growth e-com & agences. Insights business, douleurs merchants, ROI agences. | ✅ 1+/jour (30 interactions/j + 10 cold/j + 1+ post/j) | ✅ Prioritaire | ✅ Prioritaire |
| **F** | @FabGangi | Voix technique e-com & creators. Insights techniques accessibles, automatisation, workflow. | ✅ 1+/jour (30 interactions/j + 10 cold/j + 1+ post/j) | ✅ Prioritaire | ✅ Prioritaire |

### 1.3 Règle absolue

**F2 ne reply JAMAIS à un post externe, ne lance JAMAIS de conversation, ne fait JAMAIS de cold outreach.** F2 publie et reçoit. C'est un compte studio, pas une personne. Seuls R et F interagissent avec la communauté.

---

## 2. PROTOCOLE DE CROSS-ENGAGEMENT

Le cross-engagement entre R, F et F2 est le levier algorithmique le plus puissant à notre disposition. Une reply de l'auteur à une reply = 150x un like (cf. algo.md §2.1).

### 2.1 Séquence post F2

Quand F2 publie un post :

| Timing | Qui | Action |
|--------|-----|--------|
| T+0 | R | Publie le post F2 |
| T+0 à T+2 min | R | Reply depuis le compte R (commentaire de valeur, pas juste "great post") |
| T+2 à T+5 min | F | Reply depuis le compte F (angle technique complémentaire) |
| T+5 à T+10 min | R (via F2) | F2 répond aux replies de R et F (signal 150x activé) |
| T+10 à T+15 min | R et F | Like + RT les replies de l'autre |

### 2.2 Séquence post R

Quand R publie un post :

| Timing | Qui | Action |
|--------|-----|--------|
| T+0 | R | Publie son post |
| T+2 à T+5 min | F | Reply depuis le compte F |
| T+5 à T+10 min | R | Répond à F (signal 150x) |
| T+5 à T+10 min | F2 | RT le post de R (amplifie vers l'audience F2) |

### 2.3 Séquence post F

Quand F publie un post :

| Timing | Qui | Action |
|--------|-----|--------|
| T+0 | F | Publie son post |
| T+2 à T+5 min | R | Reply depuis le compte R |
| T+5 à T+10 min | F | Répond à R (signal 150x) |
| T+5 à T+10 min | F2 | RT le post de F (amplifie vers l'audience F2) |

### 2.4 Règles du cross-engagement

1. **15 minutes max.** L'algo juge la vélocité dans les 15-60 premières minutes (cf. algo.md §3.1). Le cross-engagement doit être terminé en 15 min.
2. **Replies de substance.** Jamais "nice post" ou "so true". Toujours un complément, un angle, une question. L'algo pèse la qualité via Grok.
3. **Pas de patterns robotiques.** Varier l'ordre, le timing, le type de reply. L'algo détecte les patterns automatisés.
4. **Chaque reply = unique.** Jamais de copier-coller entre les séquences.
5. **Si l'un des deux (R ou F) n'est pas disponible dans les 15 min**, l'autre fait le cross-engagement seul. Un seul reply + réponse de l'auteur = déjà 150x. Mieux que zéro.

---

## 3. RÈGLES DE PUBLICATION TWITTER

### 3.1 Fréquence

| Compte | Posts/jour | Espacement minimum | Batch |
|--------|-----------|-------------------|-------|
| F2 | 1 (5j/semaine, lun-ven) | — | Samedi (R rédige) |
| R | 1+ post/jour (7j/sem) | 2h entre chaque post | Samedi soir |
| F | 1 post/jour (5j/sem) | 2h entre chaque post | Batch à son rythme |

Volumes fixes. Ne jamais sacrifier la qualité pour le volume — l'algo punit les tweets sans engagement (cf. algo.md §6.2).

### 3.2 Règles absolues de publication

| Règle | Pourquoi | Référence algo |
|-------|----------|----------------|
| **Lien toujours en reply, JAMAIS dans le corps du tweet** | -30 à -90% reach. 0% engagement pour comptes free. | algo.md §6.3 |
| **0 à 1 hashtag par tweet. Max absolu : 2.** | 3+ = -40% reach. Grok catégorise sans hashtag. | algo.md §10 |
| **Ne jamais supprimer et reposter** le même tweet | Trigger spam detection. | algo.md §6.2 |
| **Espacement minimum 2h entre les posts** du même compte | Posting rapide = spam detection. | algo.md §6.2 |
| **Ne jamais cross-poster mot pour mot** entre comptes | Contenu dupliqué = pénalisé. | algo.md §6.2 |
| **Rester actif 60 min après publication** | La fenêtre de vélocité est critique. | algo.md §3.1 |
| **Ton constructif même dans la provocation** | Grok pénalise le négatif/combatif. | algo.md §1.2 |
| **Jamais d'engagement bait** ("Like if you agree", "RT if...") | Détecté et supprimé. | algo.md §6.1 |

### 3.3 Format du lien en reply

Quand un post nécessite un lien (vers [produit].tech, foundrytwo.com, un article, un outil) :

```
[Post principal — contenu de valeur, pas de lien]

↳ Reply du même compte (T+1 min) :
"Link: [URL avec UTM]"
ou
"Full breakdown here: [URL avec UTM]"
```

Le post principal capte l'engagement. Le lien en reply est visible pour ceux qui cliquent sur la conversation, sans pénaliser la distribution du post principal.

---

## 4. TIMING DE PUBLICATION

### 4.1 Audience cible

Notre audience e-com/marketing est principalement US (EST, UTC-5). Les créneaux doivent capter le matin et l'après-midi US.

| Créneau Marseille (CET/CEST) | Heure US EST | Moment audience | Priorité |
|-------------------------------|-------------|-----------------|----------|
| **14h00 - 15h00** | 8h - 9h | Matin US, pic d'activité | 🔴 Prioritaire |
| **17h00 - 18h00** | 11h - 12h | Fin de matinée US | 🟡 Bon |
| **21h00 - 22h00** | 15h - 16h | Après-midi US, second pic | 🔴 Prioritaire |

### 4.2 Horaires de publication R et F

R et F sont full-time flexible sur FoundryTwo. Publication aux horaires optimaux algo :

| Qui | Créneaux de publication |
|-----|------------------------|
| **R** | Horaires optimaux algo : 8h, 13h30, 17h CET. Flexible selon le contenu et le cross-engagement. |
| **F** | Horaires optimaux algo : 8h, 13h30, 17h CET. Flexible selon le contenu et le cross-engagement. |
| **F2** | R gère. Planification en batch samedi. 14h-15h CET (8h-9h EST — pic d'activité US). Programmé via scheduler. |

### 4.3 Règle de la fenêtre de cross-engagement

Le post de chaque compte doit être programmé à un moment où **les deux** (R et F) sont disponibles pour le cross-engagement dans les 15 minutes. Si un seul est dispo, le cross-engagement est partiel — toujours mieux que rien.

### 4.4 Mercredi = jour prioritaire

L'algo montre un pic d'engagement le mercredi (cf. algo.md §9.1). Réserver le meilleur contenu de la semaine pour le mercredi. Le data thread hebdomadaire tombe idéalement le mercredi.

### 4.5 Déplacements & fuseaux horaires

Si R ou F est temporairement dans un fuseau différent, les créneaux ci-dessus sont recalculés selon les règles définies dans growth-marketing/context.md §9.1. Les ajustements sont documentés dans le dossier personnel de l'associé concerné (romain/ ou fabrice/).

---

## 5. ROUTINE D'ENGAGEMENT PRÉ-POST

### 5.1 Le "Halo Effect"

Engager sur des posts d'autres comptes AVANT de publier son propre tweet crée un boost de visibilité 2-3x (cf. algo.md §3.3). L'algo voit que le compte est actif et "réchauffe" la distribution du prochain tweet.

### 5.2 Routine quotidienne par compte

**R :**

| Étape | Action |
|-------|--------|
| 1 | 15 interactions Twitter/jour (mix Tier 1, 2, 3 — replies de valeur) |
| 2 | 5 cold outreach/jour |
| 3 | 1+ post/jour (bénéficie du halo) |
| 4 | Cross-engagement sur posts F et F2 + répondre aux replies |

Total : 30 interactions/j + 10 cold/j + 1+ post/j.

**F :**

| Étape | Action |
|-------|--------|
| 1 | 15 interactions Twitter/jour (mix Tier 1, 2, 3 — replies de valeur, angle technique) |
| 2 | 5 cold outreach/jour |
| 3 | 1+ post/jour (bénéficie du halo) |
| 4 | Cross-engagement sur posts R et F2 + répondre aux replies |

Total : 30 interactions/j + 10 cold/j + 1+ post/j.

### 5.3 Comptes Tier — Critères de sélection

Cf. `growth-marketing/context.md` §5.3 pour la définition complète des Tiers, les critères de sélection, et la gestion dynamique des listes.

### 5.4 Comment écrire une reply qui se fait remarquer

Cf. growth-marketing/context.md §5.2 pour les exemples. Sur Twitter spécifiquement :

1. **Tenir en 280 caractères** — une reply longue est souvent coupée. Aller droit au point.
2. **Ajouter un angle non couvert** par le post original — pas juste valider.
3. **Question de suivi optionnelle** — force une conversation (signal 150x si l'auteur répond).
4. **Jamais de lien dans une reply** sur le post de quelqu'un d'autre — c'est du spam. Exception : si la personne demande explicitement une ressource.

---

## 6. FORMATS TWITTER-SPÉCIFIQUES

Les formats de contenu sont définis dans growth-marketing/context.md §7. Ici on précise les **contraintes Twitter** pour chaque format.

### 6.1 Tweet solo (hot take, question ouverte)

- **Longueur optimale :** 71-100 caractères = +17% engagement. 240-259 caractères = max de likes.
- **Notre règle :** viser 100-260 caractères. Assez court pour être lu en 2 secondes, assez long pour avoir de la substance.
- **Fin du tweet :** terminer par une question ouverte ou une prise de position tranchée — provoquer la reply.
- **Exemples d'angles :** store speed, chargebacks, client reporting pour agences, workflow e-com, automatisation.

### 6.2 Thread (data thread, données terrain)

- **Ce qu'est un thread :** 1 tweet principal + plusieurs tweets en chaîne postés en même temps par le même compte. Ce ne sont PAS des tweets séparés publiés à des moments différents.
- **Manipulation exacte :** Rédiger le tweet 1 → cliquer sur le bouton "+" en bas de l'éditeur → rédiger le tweet 2 → "+" → tweet 3, etc. → cliquer "Publier tout" (ou "Post all"). Les tweets sortent tous en même temps, reliés verticalement. Le tweet 1 apparaît dans le feed, les suivants sont visibles en déroulant la conversation.
- **Longueur optimale :** 4-8 tweets. Au-delà, le drop-off est massif.
- **Tweet 1 :** le hook. Doit se suffire à lui-même. Inclure "🧵" pour signaler le thread.
- **Chaque tweet :** auto-suffisant (même lu seul, il a de la valeur).
- **Dernier tweet :** récap + question ouverte + lien en reply sous ce dernier tweet.
- **Fréquence :** 1 thread/semaine max par compte. Trop de threads dilue l'engagement.
- **Contenu idéal :** données terrain (before/after stores, métriques réelles, patterns observés sur les Shopify merchants / agency owners / creators — collectées via la distribution Reddit/Facebook).

### 6.3 Post avec image

- **Jusqu'à 4 images** par tweet (carrousel). Augmente le dwell time.
- **Screenshots de données terrain, before/after stores** = format idéal. Métriques, problèmes identifiés, résultats.
- **Texte sur l'image :** lisible en mobile, contraste fort, pas de texte petit.

### 6.4 Poll

- **Durée :** 24h (par défaut). Pas plus — l'engagement se concentre dans les premières heures.
- **2-4 options max.** Questions binaires (2 options) génèrent plus de débat en replies.
- **Poser une question qui n'a pas de réponse évidente** — sinon les gens votent sans commenter.

### 6.5 Quote tweet

- **Ce qu'est un quote tweet :** Partager le tweet de quelqu'un d'autre en ajoutant son propre commentaire au-dessus. Le tweet original apparaît encadré sous le commentaire, formant un nouveau post dans le feed du quoteur.
- **Manipulation exacte :** Cliquer l'icône retweet sous un tweet → choisir "Quote" (au lieu de "Repost") → rédiger son commentaire → publier. Les followers voient le commentaire + le tweet original.
- **Poids algo :** ~25x un like (cf. algo.md §2.1). Quand quelqu'un quote notre tweet = jackpot. Le quote génère son propre engagement (replies, likes) + booste le tweet original.
- **Quand on quote :** ajouter un angle fort, pas juste "this 👆". Un bon quote tweet est un post à part entière qui génère son propre engagement.

---

## 7. TWEEP CRED — STRATÉGIE POUR LES 3 COMPTES

Le TweepCred est un score de réputation 0-100. En dessous de 65, seulement 3 tweets sont considérés pour la distribution (cf. algo.md §7).

### 7.1 Actions qui montent le TweepCred

| Action | Impact | Fréquence |
|--------|--------|-----------|
| Engager avec des comptes high-quality (Tier 1-2) | Fort | Quotidien |
| Recevoir des replies de comptes crédibles | Fort | Conséquence du point ci-dessus |
| Maintenir un ratio followers/following sain (> 1.0) | Moyen | Continu |
| Publier régulièrement avec engagement | Moyen | Quotidien |
| Avoir un profil complet (bio, photo, banner, lien) | Faible mais nécessaire | Une fois |

### 7.2 Actions qui détruisent le TweepCred

| Action | Ce que c'est | Impact | Éviter |
|--------|-------------|--------|--------|
| Recevoir des **blocks** | Un utilisateur te bloque = il ne voit plus tes tweets, tu ne vois plus les siens. Signal : "je ne veux plus jamais voir ce compte." | -74 par block. Dévastateur. | Ton constructif, jamais agressif |
| Recevoir des **mutes** | Un utilisateur te mute = il ne voit plus tes tweets MAIS tu ne le sais pas. Invisible, même poids négatif. | -74 par mute. Dévastateur. | Ne pas spammer, ne pas tag sans raison |
| Recevoir des **"Not interested"** | Un utilisateur voit ton tweet dans son feed et clique "Not interested in this post". | Signal négatif fort. | Contenu pertinent pour l'audience cible |
| **Mass-follow/unfollow** | Follow en masse puis unfollow pour gonfler le ratio. | Dévastateur pour le TweepCred. | Toujours |
| **Interagir avec des bots/spammeurs** | Reply ou RT de comptes suspects. | Modéré. Dégrade la qualité du réseau. | Ne pas reply aux comptes suspects |
| **Achat de followers** | Followers inactifs = engagement rate s'effondre = algo punit. | Dévastateur. | Toujours |

### 7.3 Stratégie de follow

- **Ne follow que les comptes avec lesquels on interagit réellement.** Chaque follow inutile dégrade le ratio.
- **Ne jamais follow pour être follow-back.** Follow uniquement les comptes dont le contenu nourrit notre veille et notre engagement.
- **Cible ratio followers/following :** > 1.5 à 3 mois, > 2.0 à 6 mois.

---

## 8. MÉTRIQUES TWITTER PAR PHASE

### 8.1 Phase 1 — Mois 1 (fondation, 3 verticales actives)

| Métrique | Cible | Pourquoi |
|----------|-------|----------|
| Impressions/semaine (par compte) | 1K-5K | Baseline. Établir la présence. |
| Replies reçues/semaine (R+F) | 5-10 | Preuve que le contenu provoque des réactions. |
| Followers gagnés/semaine (R) | 10-20 | Croissance organique initiale. |
| Followers gagnés/semaine (F) | 10-20 | Même volumes que R. |
| Followers F2 | 20-50 total | Croissance lente — normal. |
| Cross-engagement complété | > 80% des posts | Le protocole doit devenir un réflexe. |

### 8.2 Phase 2 — Mois 2 (accélération, 3 verticales)

| Métrique | Cible | Pourquoi |
|----------|-------|----------|
| Impressions/semaine (par compte) | 5K-25K | Accélération via replies et threads. |
| Replies reçues/semaine (R+F) | 20-50 | Conversations réelles, pas juste des likes. |
| Ratio replies/impressions | > 1% | Seuil de contenu "engageant". |
| Followers R | 200-500 total | |
| Followers F | 200-500 total | |
| Followers F2 | 100-300 total | |
| Bookmarks/semaine | 5-10 | Preuve de contenu "savable". |
| Profile visits/semaine (R+F) | 50+ | Preuve que les replies poussent au clic profil. |

### 8.3 Phase 3 — Mois 3 (distribution, 3 verticales matures)

| Métrique | Cible | Pourquoi |
|----------|-------|----------|
| Impressions/semaine (par compte) | 25K-100K | Distribution For You active. |
| Replies reçues/semaine (R+F) | 50-100+ | Communauté engagée. |
| Ratio replies/impressions | > 2% | Métrique nord star (cf. growth-marketing/context.md §1). |
| Followers R | 500-1500 | |
| Followers F | 500-1500 | |
| Followers F2 | 300-1000 | |
| DMs entrants/semaine | 5-10 | Leads organiques. |
| Clicks UTM vers produits portfolio | 50-100/semaine | Conversion réelle. |

### 8.4 Où regarder

Twitter Analytics (natif) pour impressions, replies, profile visits. UTM tracking dans notre outil de suivi (cf. tracking/) pour les clics produit. Revue chaque vendredi (cf. growth-marketing/context.md §14).

---

## 9. PREMIUM — CONFIGURATION OBLIGATOIRE

### 9.1 Comptes à passer Premium

| Compte | Premium requis | Priorité | Justification |
|--------|---------------|----------|---------------|
| @foundrytwo (F2) | ✅ Oui | 🔴 Immédiat | Hub studio. Le compte qui porte les liens produit — sans Premium, liens invisibles. |
| @delgado_ro72224 (R) | ✅ Oui | 🔴 Immédiat | Cold outreach + engagement. Sans Premium, replies enterrées. |
| @FabGangi (F) | ✅ Oui | 🔴 Immédiat | Même volumes que R — Premium nécessaire dès le départ. |

**Comptes produits :** des comptes Twitter dédiés aux produits du portfolio (ex: @storemd, @listinglab) seront créés au fur et à mesure des besoins. Premium sur ces comptes sera évalué au cas par cas selon la stratégie de chaque vertical.

### 9.2 Coût

3 comptes Premium × 8$/mois = **24$/mois**. ROI évident : 10x reach sur chaque compte, replies visibles en haut des threads, liens fonctionnels.

---

## 10. ANTI-PATTERNS SPÉCIFIQUES TWITTER

Les anti-patterns généraux sont dans growth-marketing/context.md §11. Voici ceux qui sont **spécifiques à Twitter** :

| Interdit | Pourquoi | Alternative |
|----------|----------|-------------|
| Répondre "Check out @foundrytwo" sur les posts d'autres comptes | Spam, génère des blocks (-74 par block) | Apporter de la valeur dans la reply, laisser la curiosité faire le travail |
| Thread de 15+ tweets | Drop-off massif après le tweet 8 | 4-8 tweets max |
| Poster un thread et ne pas répondre aux replies | Perd le signal 150x, tue la vélocité | Rester 60 min minimum après un thread |
| Mettre des émojis dans chaque tweet | Détecté comme pattern marketing generic | Max 1-2 émojis, naturel |
| RT massif sans quote ni reply | L'algo pèse les RT beaucoup moins que les replies | Toujours ajouter un commentaire via quote ou reply |
| Engager uniquement avec les "gros" comptes | Pas de réciprocité, pas de communauté | Mix Tier 1 + Tier 2 + Tier 3 |
| Poster le même contenu sur R et F2 | Duplicate content = pénalisé | Même sujet OK, mais angle et formulation différents |
| Utiliser les trending topics non liés à notre niche | Audience non qualifiée, détruit le SimCluster | Uniquement les tendances dans notre domaine |

---

## 11. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Contenu | Statut |
|----------|-------------|---------|--------|
| algo.md | growth-marketing/twitter/ | Mécanique algorithmique, poids, pénalités | ✅ |
| f2/context.md | f2/twitter/ | Voix F2, contenu, cibles spécifiques | ✅ |
| f2/roadmap.md | f2/twitter/ | Planning Twitter F2 | ✅ |
| fabrice/context.md | fabrice/twitter/ | Voix F, contenu tech/builder | ✅ |
| fabrice/roadmap.md | fabrice/twitter/ | Planning Twitter F | ✅ |
| romain/context.md | romain/twitter/ | Voix R, contenu growth/CRO | ✅ |
| romain/roadmap.md | romain/twitter/ | Planning Twitter R | ✅ |
| growth-marketing/context.md | growth-marketing/ | Stratégie globale, piliers, frameworks, phases | ✅ |
| marketing/context.md | marketing/ | Cold outreach, planning R/F, funnel, comptes | ✅ |
