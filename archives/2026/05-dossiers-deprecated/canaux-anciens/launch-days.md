# Canal Launch Days — IndieHackers + Product Hunt + autres

> Dernière mise à jour : 29 avril 2026
> Statut : ARCHIVÉ — Splitté entre marketing/canaux/ih/ et marketing/canaux/ph/ depuis 29/04/2026
> Hérite de : `../strategie.md` + `../objectifs.md` + `../../la-toile/la-toile.md`

---

## 1. Rôle dans la toile

Les "launch days" sont des **événements ponctuels** qui activent ces canaux :
- Product Hunt (PH)
- IndieHackers (IH)
- Hacker News (HN — Show HN, optionnel)
- Shopify Community Forums (opportuniste)
- Dev.to (technical articles, opportuniste)

**Règle absolue** : aucune cadence continue sur ces canaux. On y va **uniquement aux launches**, puis on revient au silence. Pourquoi : le ROI temps de la cadence continue sur ces plateformes pour StoreMD = nul. Notre cible (merchants Shopify) n'est pas leur audience principale.

**Quand on active un launch day** :

| Trigger | Plateformes activées |
|---|---|
| StoreMD accepté Shopify App Store | Launch PH + Launch IH (post Show IH) |
| ProfitPilot accepté Shopify | Launch PH + Launch IH |
| ClientPulse / AdAudit / etc. accepté store ou sortis publiquement | Launch PH + Launch IH |
| Milestone significatif (1 000 merchants, 10K€ MRR, feature majeure) | Post IH milestone (sans nouveau PH launch) |
| Article tech-deep insightful sur architecture / scaling / data finding | Dev.to ou HN Show selon la profondeur (rare) |

**Hors launch days** : tous ces canaux dorment. Pas de présence quotidienne.

---

## 2. Le compte qui poste : @foundrytwo

Tous les launches partent du compte F2 / FoundryTwo (pas comptes perso F ou R). C'est l'identité studio qui lance le produit.

| Plateforme | Compte qui poste |
|---|---|
| Product Hunt | Maker = F2 (avec hunters externes invités si possible) |
| IndieHackers | @foundrytwo |
| Hacker News | Compte HN F2 (à créer si pas déjà fait) — ou compte perso F si Show HN technique |
| Shopify Community | Compte F2 ou compte perso F+R selon le forum |
| Dev.to | @foundrytwo ou compte perso F (selon profondeur tech) |

---

## 3. Product Hunt — protocole launch day

Source détaillée : `../../growth-marketing/ph/algo.md` (381 lignes) + `../../growth-marketing/ph/context.md` (330 lignes). Synthèse actionnable ci-dessous.

### 3.1 La règle de base PH 2026

| Fait | Implication |
|---|---|
| ~10-16 produits featured/jour (taux ~10% des soumissions) | Si pas featured → invisible. Préparation = critique. |
| 4 critères featuring : Useful, Well-made, Creative, Novel | StoreMD = ✅ Useful + Well-made requis. Creative + Novel à pousser dans le pitch. |
| Ranking par POINTS (pas upvotes bruts) | Upvotes de comptes établis pèsent + lourd qu'upvotes nouveaux comptes. |
| Reset quotidien 00:00 PT = 09:00 CET | Lancer le produit dès 00:00 PT pour avoir 24h complètes. |
| Top 5 = badge POTD (Product of the Day) | Top 1 = jackpot. Top 5 = encore très bon. Hors top 5 = retombée rapide. |

### 3.2 Préparation pré-launch (4-6 semaines avant)

| T-6 sem | Action |
|---|---|
| Identifier 1-2 hunters externes établis (haut ranking PH) qui veulent hunter le produit |
| Préparer toutes les visuals (logo 240×240, gallery 1270×760, screenshots, démo vidéo 60s) |
| Brouillon de la maker note (le commentaire #1 du maker) |
| Ouvrir un compte PH F2 si pas déjà fait, faire grandir karma avec engagement régulier sur d'autres lancements (4-6 sem) |
| Constituer une "newsletter d'amis" — connexions LinkedIn/Twitter qui ont accepté de upvoter le jour J |

| T-2 sem | Action |
|---|---|
| Soumettre le produit à PH (en draft schedulé) |
| Envoyer demandes hunter à 2-3 hunters identifiés |
| Préparer post Twitter F2 + posts Twitter F + R + LinkedIn F + R + post page F2 LinkedIn pour le jour J |
| Préparer post IH simultané (Show IH le même jour) |
| Préparer email de notification aux beta-testeurs et email leads StoreMD existants |

| T-3 jours | Action |
|---|---|
| Confirmer le hunter |
| Tous les visuals finaux uploadés sur le draft PH |
| Maker note finalisée et copiée dans un brouillon prêt à poster |
| Schedule des posts Twitter/LinkedIn pour le jour J via Buffer/Hypefury |

### 3.3 Le launch day (24h)

```
00:00 PT (09:00 CET) — Lancement officiel sur PH
00:05 PT — Maker comment publié (premier commentaire du fil PH par F2) — UTM F29
00:15 PT — Tweet F2 + tweets F + R annonçant le launch (format 2-blocs, lien dans reply) — UTM F28
00:30 PT — Posts LinkedIn F + R + page F2 (lien dans corps) — UTM F28
00:45 PT — Post IH Show IH (lancement simultané) — UTM F30
01:00 PT — Email aux beta-testeurs + email leads — UTM email launch
01:00-08:00 PT — F + R répondent à TOUS les commentaires PH dans les 30 min (signal d'engagement critique)
08:00 PT — Push social (re-amplification : retweet F2, repost LinkedIn, second wave Reddit r/shopify si pertinent en commentaire SUR un thread relevant)
12:00 PT — Mid-day update : post statut sur Twitter ("we're at #X on PH right now, thanks team")
20:00 PT — Final push : email final, dernières vagues sociales
23:59 PT — Fin de la fenêtre 24h
```

**Règle d'or** : F + R répondent à **chaque commentaire PH dans les 30 min** sur la durée 24h. Le signal d'engagement créateur ↔ commenter pèse plus que l'upvote brut.

### 3.4 UTM Product Hunt

| Placement | UTM exact |
|---|---|
| Page produit PH (lien depuis la listing → site) | F28 — `utm_source=producthunt&utm_medium=referral&utm_campaign=launch_day&utm_content=ph_listing` |
| Maker comment (premier commentaire du fil) | F29 — `utm_source=producthunt&utm_medium=referral&utm_campaign=launch_day&utm_content=ph_maker_comment` |
| Post-launch — gallery (visiteurs PH après le launch day) | `utm_source=producthunt&utm_medium=referral&utm_campaign=post_launch&utm_content=ph_gallery` |

### 3.5 Post-launch (J+1 à J+30)

- J+1 : poster sur Twitter et LinkedIn le résultat ("Top X on PH yesterday, here's what we learned")
- J+2 à J+7 : reply aux nouveaux commentaires PH (long tail). Continuer à répondre.
- J+30 : retour sur les chiffres dans un post Twitter/LinkedIn ("30 days after PH launch, here's what happened")

**Résultats attendus PH 2026** (référence `../../growth-marketing/ph/context.md`) :
- Top 5 PH = 500-2000 visites jour J + 100-400 visites long tail sur 30 jours
- Hors top 5 = 50-200 visites totales (faible)
- Conversion PH → install = 0.5-2% selon la qualité de la cible
- ROI temps : seulement justifié si on prépare bien (sinon temps perdu)

---

## 4. IndieHackers — protocole launch + milestones

Source détaillée : `../../growth-marketing/ih/algo.md` (280 lignes) + `../../growth-marketing/ih/context.md` (376 lignes).

### 4.1 La règle de base IH 2026

| Fait | Implication |
|---|---|
| Audience IH = founders solo / petits équipes / SaaS makers | Cible secondaire pour StoreMD (pas les merchants Shopify directement, mais des founders qui peuvent connaître des merchants ou être influenceurs dans la niche). |
| Format dominant : Show IH (lancement) + Milestone posts (revenue, growth) | Show IH = équivalent Show HN. Milestone = poste régulier de progrès. |
| Algorithme : engagement + recency + niche fit | Premier-heure critique, comme Reddit. |
| Cadence continue déconseillée pour StoreMD | Les founders IH sont eux-mêmes saturés de "build in public". Présence ponctuelle = mieux. |

### 4.2 Le launch IH (jour J avec PH)

```
À publier le même jour que le PH launch (ou +1 jour si PH déjà saturé)

Format : Show IH post

Titre : "I built [product] for [audience] — [unique angle]"
Exemple : "I built StoreMD to find what's silently killing Shopify stores"

Corps :
- Pourquoi j'ai construit ça
- Le problème que je résous (avec données)
- Ce que ça fait concrètement
- Ce que j'ai appris en construisant
- Lien (UTM F30) — `utm_source=indiehackers&utm_medium=organic&utm_campaign=post&utm_content=post_cta`
- Question ouverte à la communauté
```

### 4.3 Posts milestones (post-launch)

Quand un milestone est atteint, on poste sur IH dans la section "Milestones" :

| Milestone qui justifie un post IH | UTM |
|---|---|
| Premier payeur | `utm_source=indiehackers&utm_medium=organic&utm_campaign=milestone&utm_content=milestone_cta` |
| 10 payeurs | Idem |
| 100€ MRR | Idem |
| 1 000€ MRR | Idem |
| 10 000€ MRR | Idem |

**Format milestone post** :
```
Titre : "Hit [milestone] with [product]"
Corps :
- Le chiffre + ce que ça représente
- 2-3 leçons apprises
- Ce qu'on prévoit ensuite
- Lien UTM milestone
```

**Cadence milestones** : 1 post tous les 2-4 semaines maximum si milestone réel atteint. Pas de fake milestones. Pas de "we're growing" sans chiffres.

### 4.4 UTM IndieHackers

| Placement | UTM exact |
|---|---|
| Post Show IH | F30 — `utm_source=indiehackers&utm_medium=organic&utm_campaign=post&utm_content=post_cta` |
| Post milestone | `utm_source=indiehackers&utm_medium=organic&utm_campaign=milestone&utm_content=milestone_cta` |

### 4.5 Engagement IH hors launch

**Quasi nul.** On répond à 100% des commentaires sur nos posts (premier-heure + long tail). On n'engage pas activement sur les posts d'autres founders.

Exception : si un founder IH publie un post directement pertinent (ex: "How do I find Shopify merchants for my SaaS"), on commente avec valeur. Mais pas plus de 2-3 commentaires/sem sur le forum hors launch days.

---

## 5. Hacker News — Show HN (optionnel, rare)

### 5.1 Quand activer

Show HN n'est activé que si :
- Le produit a une vraie composante technique discutable (architecture intéressante, performance, data, AI)
- StoreMD pourrait passer (système de scan + détection à grande échelle), mais c'est secondaire (HN audience = devs, pas merchants)
- ProfitPilot probablement non (trop classique pour HN)

**Verdict pour StoreMD** : Show HN optionnel, pas prioritaire. Si on a du temps de prépa supplémentaire au launch PH/IH, faire un Show HN simultané. Sinon skip.

### 5.2 Format Show HN

```
Titre : "Show HN: [Product] — [one-line value prop]"
Exemple : "Show HN: StoreMD — scans Shopify stores for hidden revenue leaks"

Corps :
- Lien direct (UTM HN show)
- Un paragraphe technique (qu'est-ce que c'est, pourquoi maintenant)
- Stack utilisé (les devs HN aiment savoir)
- Ce qu'on a appris en construisant
- Open question à la communauté

Premier commentaire du maker : détails techniques approfondis (les commenters HN posent des questions techniques pointues — anticiper)
```

### 5.3 UTM Hacker News

| Placement | UTM exact |
|---|---|
| Show HN post | `utm_source=hackernews&utm_medium=organic&utm_campaign=show_hn&utm_content=hn_post` |
| Commentaire HN | `utm_source=hackernews&utm_medium=organic&utm_campaign=comment&utm_content=hn_comment` |

### 5.4 Anti-pattern HN

**Pas de promotion répétée sur HN.** L'audience HN est très anti-marketing. Une seule Show HN par produit max. Pas de "we just hit X MRR" posts. Pas de spam des threads avec liens.

---

## 6. Shopify Community Forums (opportuniste)

### 6.1 Rôle

Les forums officiels Shopify ([community.shopify.com](https://community.shopify.com)) ont des merchants qui posent des questions concrètes — c'est plus directement notre cible que IH ou HN.

### 6.2 Cadence

Pas de cadence régulière. Engagement opportuniste lorsqu'un merchant pose une question StoreMD résout ET que le forum permet de mentionner des outils (vérifier les règles spécifiques de chaque sub-forum).

### 6.3 Format

Réponses utiles à des questions merchants, mention contextuelle StoreMD si très pertinent. Toujours après avoir donné de la valeur (règle 80/20, comme Reddit).

### 6.4 UTM Shopify Community

| Placement | UTM exact |
|---|---|
| Forum post avec lien | `utm_source=shopify_community&utm_medium=organic&utm_campaign=forum_post&utm_content=post_cta` |

**Règle** : si on engage régulièrement sur Shopify Community → ce canal mérite son propre fichier dédié. Pour l'instant : opportuniste.

---

## 7. Dev.to (opportuniste, technique uniquement)

### 7.1 Rôle

Dev.to = communauté de devs. Pas notre cible directe (merchants Shopify pas là), mais articles techniques peuvent générer du SEO long terme et de la crédibilité.

### 7.2 Cadence

Très rare. 0-2 articles/an pour StoreMD si une découverte technique pertinente émerge (ex: "How we audit 1 000 Shopify stores in parallel without rate limits").

### 7.3 UTM Dev.to

| Placement | UTM exact |
|---|---|
| Article Dev.to (CTA en fin d'article) | `utm_source=devto&utm_medium=organic&utm_campaign=article&utm_content=article_cta` |
| Commentaire Dev.to | `utm_source=devto&utm_medium=organic&utm_campaign=comment&utm_content=comment_cta` |

---

## 8. Quand prévoir un launch day

| Calendrier StoreMD | Launch days associés |
|---|---|
| Acceptation Shopify App Store | Launch PH + Launch IH simultanés |
| 1er payeur StoreMD | Post milestone IH |
| 1 000€ MRR portfolio | Post milestone IH + tweet F2 |
| Lancement ProfitPilot | Launch PH + Launch IH simultanés |
| Lancements ClientPulse / AdAudit / etc. | Idem (PH + IH par produit) |

**Cadence portfolio** : ~1 launch PH/IH par mois en pic d'activité (cohérent avec le modèle usine 1 SaaS/mois).

**Risque burnout PH/IH** : si on lance trop souvent, l'audience PH/IH se lasse. Espacer min 3 sem entre 2 launches studio.

---

## 9. Métriques post-launch

### 9.1 Stats natives plateforme

| Plateforme | Métriques |
|---|---|
| Product Hunt | Upvotes, position finale (top X), commentaires + leur engagement, views fiche produit |
| IndieHackers | Upvotes, commentaires, position dans les "trending" / "top of week" |
| Hacker News | Karma gagné, commentaires + score, position front page (rare) |
| Shopify Community | Vues thread, replies, helpful votes |
| Dev.to | Reactions, commentaires, reading time |

### 9.2 Conversions (dashboard admin StoreMD)

| Métrique | Source |
|---|---|
| Visites depuis PH | Dashboard admin → Traffic by Source → `producthunt` |
| Visites depuis IH | Dashboard admin → Traffic by Source → `indiehackers` |
| Visites depuis HN | Dashboard admin → Traffic by Source → `hackernews` |
| Visites depuis Shopify Community | Dashboard admin → Traffic by Source → `shopify_community` |
| Visites depuis Dev.to | Dashboard admin → Traffic by Source → `devto` |
| Installs par source de launch | Dashboard admin → Recent Merchants → `utm_source` filtré |
| Conversion rate par plateforme launch | Calcul : installs / visites par source |

### 9.3 Rapport post-launch (J+7 et J+30)

JARVIS sort un rapport post-launch :
- J+7 : visites/installs par plateforme, top commentaires, leçons apprises, actions correctives
- J+30 : retombées long tail, conversion rate finale, ROI temps de la prépa

---

## 10. Anti-patterns

### 10.1 Anti-patterns PH

- **Lancer sans prépa de 4-6 semaines**. Échec quasi-garanti.
- **Engagement pods PH** ("liste d'amis qui upvote contre"). Détecté, downrank.
- **Lancer hors top 5 sans plan post-launch**. Le badge POTD est tout.
- **Fake reviews / fake hunters**. Ban du compte.
- **Re-launch du même produit sur PH dans les 6 mois**. Politique stricte PH.

### 10.2 Anti-patterns IH

- **Cadence continue posts/milestones**. L'audience IH se lasse.
- **Fake milestones** ("we're growing fast" sans chiffres). Communauté détecte.
- **Ne pas répondre aux commentaires**. Premier-heure + long tail importants.
- **Crosspost identique IH + PH + HN**. Adapter le message à chaque audience.

### 10.3 Anti-patterns HN

- **Show HN promotionnel pur** (sans aspect technique discutable). Downvoted en masse.
- **Pas répondre aux questions techniques pointues**. Audience HN punit.
- **Multiple Show HN par an pour le même produit**. Pas autorisé.
- **Comments avec liens promotionnels**. Ban.

### 10.4 Anti-patterns transversaux

- **Em-dash, "Here's the thing", structure "Not X, it's Y"**. Pattern IA. Cf. `../../ANTI-IA.md`.
- **Inventer chiffres / résultats**. Lignes rouges BIBLE §3.
- **Mention Altistone / La Toile** dans le contenu public.
- **Cadence régulière sur ces canaux**. Pas d'acquisition merchant Shopify, ROI temps insuffisant pour cadence.

---

## 11. Documents liés

- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons (acceptation Shopify, MRR)
- `../../growth-marketing/ph/algo.md` — **algo PH détaillé (381 lignes)**
- `../../growth-marketing/ph/context.md` — règles + tactiques PH (330 lignes)
- `../../growth-marketing/ih/algo.md` — **algo IH détaillé (280 lignes)**
- `../../growth-marketing/ih/context.md` — règles + tactiques IH (376 lignes)
- `../../la-toile/la-toile.md` — schéma global, fils F28-F30 (PH + IH)
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source UTM officielle (Sections 9 + 10)
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — règles transverses
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
