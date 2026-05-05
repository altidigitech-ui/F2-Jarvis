# FONCTIONNEMENT PRODUCT HUNT — 2026

**Dernière mise à jour :** 04 avril 2026
**Sources :** Product Hunt officiel (Launch Guide, FAQ, CEO Rajiv Ayyangar), Mike Kerzhner (CTO PH — confirmation système de points), Awesome Directories (étude 387 lancements, 156 fondateurs), Flowjam (playbook 2025), Flo Merian/Hackmamba (guide 2026), Flexprice (retour #1 POTD), Demand Curve (14 hunters interviewés), Market Clarity (100+ entrepreneurs), Waitlister (100+ lancements), Lachlan Chavasse (post-mortem lancement Oct 2025).
**Ce fichier contient :** la mécanique de la plateforme et du système de ranking. Pas de stratégie — les tactiques sont dans `ph/context.md`.

**Note importante :** Product Hunt n'est PAS un réseau social comme Twitter ou LinkedIn. C'est une **plateforme de lancement et de découverte de produits**. On n'y "publie" pas quotidiennement — on y LANCE un produit. Chaque lancement est un événement unique avec une fenêtre de 24h. Ce document est structuré autour de cette mécanique d'événement, pas de publication continue.

---

## 1. ARCHITECTURE — COMMENT PH FONCTIONNE

### 1.1 Le cycle quotidien

Product Hunt réinitialise le leaderboard chaque jour à **00:00 Pacific Time (PT)** = **09:00 CET**. Chaque produit lancé ce jour-là a 24h pour accumuler des points et monter dans le classement. À la fin des 24h, le top 5 reçoit un badge (Product of the Day #1 à #5).

### 1.2 Featured vs All

Depuis le changement d'algorithme de janvier 2024, PH a deux onglets :

| Onglet | Contenu | Visibilité |
|--------|---------|-----------|
| **Featured** | Produits sélectionnés MANUELLEMENT par l'équipe PH | C'est la homepage par défaut. 90% des visiteurs voient cet onglet. Newsletter quotidienne PH. App mobile. |
| **All** | Tous les produits lancés ce jour-là | Quasi-invisible. Il faut cliquer manuellement sur l'onglet. Pas dans la newsletter. |

**La réalité brutale :** Si tu n'es pas featured, tu es invisible. Tout le trafic que tu envoies vers PH bénéficie à la plateforme (engagement, ads) mais pas à toi.

### 1.3 Taux de featuring

| Période | Produits featured/jour | Taux de featuring |
|---------|----------------------|-------------------|
| Avant sept 2023 | ~47/jour | 60-98% |
| Janvier 2024 | Baisse brutale | ~25% |
| Septembre 2024 | ~16/jour | ~10% |
| 2025-2026 | ~11-16/jour | ~10% |

Le CEO de PH (Rajiv Ayyangar) a expliqué ce changement : "We can't just feature everyone's AI wrapper. Expect our bar to rise, not lower. There are more talented makers than ever before, and AI is enabling even more people to make software."

### 1.4 Les 4 critères de featuring

L'équipe PH évalue manuellement chaque produit selon 4 critères :

| Critère | Description |
|---------|-------------|
| **Useful** | Le produit résout un vrai problème de manière pratique |
| **Well-made** | La qualité de craft est visible (UX, design, finition) |
| **Creative** | L'approche est originale ou différente |
| **Novel** | Le produit apporte quelque chose de nouveau au marché |

Un produit n'a PAS besoin d'exceller sur les 4 critères. Le poids entre les critères n'est pas divulgué et semble varier. Des produits avec un craft exceptionnel mais peu créatifs sont featured, et inversement.

---

## 2. SYSTÈME DE POINTS — COMMENT LE RANKING FONCTIONNE

### 2.1 Points ≠ Upvotes

C'est le point le plus important à comprendre. Le CTO de PH (Mike Kerzhner) l'a confirmé publiquement : **le ranking est basé sur des POINTS, pas sur le nombre d'upvotes.** Chaque upvote contribue un nombre de points différent selon le poids du compte qui vote.

Un produit avec 300 upvotes de comptes établis peut être classé PLUS HAUT qu'un produit avec 400 upvotes de comptes moyens.

### 2.2 Poids des comptes

| Type de compte | Poids | Détail |
|----------------|-------|--------|
| **Compte avec streak 365 jours** | ★★★★★ (~10x) | Rapporté par plusieurs launchers expérimentés. Non confirmé officiellement mais convergent. |
| **Compte vérifié, actif, avec historique** | ★★★★☆ | Commentaires réguliers, upvotes fréquents, karma élevé. |
| **Badge Notable (gold/silver)** | ★★★★☆ | 5+ karma points minimum. Signal de membre actif de la communauté. |
| **Compte actif moyen** | ★★★☆☆ | Quelques mois d'activité, quelques commentaires. |
| **Compte récent avec peu d'activité** | ★☆☆☆☆ | Peu ou pas de points. Peut même déclencher un filtrage anti-manipulation. |
| **Compte nouveau créé pour l'occasion** | ❌ | Quasi-zéro points. L'algo filtre activement les comptes créés en masse. |

### 2.3 Détection anti-manipulation

L'algo PH détecte et pénalise activement :

| Manipulation | Détection | Conséquence |
|-------------|-----------|-------------|
| **Upvotes achetés** | Analyse des patterns de comptes (création récente, pas d'historique, activité coordonnée) | Points supprimés, produit potentiellement unfeatured |
| **Campagnes d'upvotes coordonnées** | Spike soudain depuis des comptes à faible karma | Points throttlés (un launcher a rapporté un ratio 2:1 upvotes/points) |
| **Demandes directes d'upvotes** | L'équipe PH monitore Twitter pour le "vote fishing" | Pénalité de ranking |
| **Comptes créés en masse** | Pattern-matching sur les nouveaux comptes | Upvotes ignorés ou négatifs |

**Règle officielle PH :** Ne jamais demander des upvotes. Demander des visites et des commentaires est OK.

### 2.4 Recalibrage fin de journée

À la fin des 24h, PH recalibre les rankings en supprimant les votes suspectés de bot ou de comptes nouveaux. Les classements peuvent changer significativement après ce recalibrage. Un produit #3 à 23h peut être #5 le lendemain matin après nettoyage.

---

## 3. POIDS DES INTERACTIONS

### 3.1 Commentaires vs Upvotes

**1 commentaire de qualité ≈ 40-50 upvotes en poids algorithmique.**

C'est le signal le plus sous-estimé. Les données convergent :
- Dub.co : 210 commentaires + 1085 upvotes = #1 Product of Day/Week/Month
- Les produits avec 50+ commentaires substantifs surclassent systématiquement les produits avec seulement des upvotes

### 3.2 Hiérarchie des signaux

| Signal | Poids | Détail |
|--------|-------|--------|
| **Commentaire substantif** (questions sur features, use cases, technique) | ★★★★★ | ≈ 40-50 upvotes. Le signal le plus puissant après la vélocité. |
| **Réponse du maker aux commentaires** | ★★★★★ | Crée un thread = signale une discussion active. L'algo maintient le produit visible plus longtemps. |
| **Upvote d'un compte à haute karma** | ★★★★☆ | Poids 5-10x un upvote de compte moyen. |
| **Upvote d'un compte moyen** | ★★☆☆☆ | Contribue au ranking mais poids limité. |
| **Share / partage externe** | ★★★☆☆ | Amène du trafic qui peut générer des upvotes de haute qualité (si PH users organiques). |
| **"Congrats on launch!" / "Great product!"** | ★☆☆☆☆ | Commentaire vide. Pas de poids significatif. PH identifie les commentaires low-effort. |
| **Upvote d'un compte nouveau** | ❌ | Quasi-zéro. Peut même déclencher un filtrage. |

### 3.3 Commentaires de qualité vs low-effort

| ✅ Qualité (poids fort) | ❌ Low-effort (poids faible) |
|-------------------------|---------------------------|
| "How does the scoring engine handle pages with dynamic content? I'm curious about the JS rendering approach." | "Great product!" |
| "I tested this on our Shopify store. The app conflict detection was spot on — we removed 3 apps and cut 2 seconds off load time." | "Congrats on the launch!" |
| "What's your pricing model going to look like? I'd pay for this if it integrates with our CI/CD pipeline." | "Looks interesting, will check it out." |

---

## 4. LES 4 PREMIÈRES HEURES — PHASE CRITIQUE

### 4.1 Ce qui se passe

Pendant les **2-4 premières heures** après le reset de 00:00 PT :
- Les upvote counts sont **cachés** du public
- Les produits sont **aléatoirement rotés** dans le top 5 de la page Featured
- L'algo mesure la **vélocité** (upvotes/minute, commentaires/minute) pendant cette période
- C'est pendant cette fenêtre que l'algo détermine quels produits ont un intérêt AUTHENTIQUE vs manipulation

### 4.2 Pourquoi c'est critique

Les premières heures déterminent le positionnement pour les 20 heures restantes. Un produit qui entre dans le top 4 après les 4 premières heures a beaucoup plus de chances d'y rester (effet boule de neige : meilleur positionnement → plus de visibilité → plus d'upvotes → meilleur positionnement).

### 4.3 Vélocité

Donnée clé : **les upvotes de la première heure pèsent 4x plus** que les upvotes tardifs dans le calcul de ranking.

Le timing est direct : pour chaque heure PLUS TÔT que tu lances, attends-toi à **8.7% de plus d'upvotes totaux** (analyse de Kartik Mandeville). C'est pourquoi la quasi-totalité des lancements sérieux se font à **00:01 PT** (09:01 CET).

---

## 5. TIMING — QUAND LANCER

### 5.1 Heure de lancement

| Heure PT | Heure CET | Recommandation |
|----------|-----------|----------------|
| **00:01 PT** | **09:01 CET** | ✅ Standard. Full 24h d'exposition. La majorité des lancements sérieux. |
| 06:00 PT | 15:00 CET | ⚠️ Perd 6h de vélocité. 35%+ d'upvotes en moins. |
| 12:00 PT | 21:00 CET | ❌ Perd la moitié de la journée. |

**Règle :** Lancer à **00:01 PT (09:01 CET)** sauf raison exceptionnelle.

### 5.2 Jour de lancement

| Objectif | Meilleur jour | Pourquoi |
|----------|-------------|----------|
| **Badge #1 Product of Day** (plus facile) | Samedi ou dimanche | Moins de concurrence. 400-600 upvotes suffisent pour le #1 vs 700-1000+ en semaine. |
| **Maximum de trafic et conversions** | Mardi, mercredi, jeudi | Plus de visiteurs actifs sur PH. Plus de trafic vers ton produit. Mais concurrence maximale. |
| **Classement hebdomadaire** | Lundi ou mardi | Plus de jours dans la semaine pour cumuler des upvotes vers le ranking weekly. |
| **Classement mensuel** | Début de mois | Plus de temps pour cumuler. |

### 5.3 Trafic attendu

| Position | Visiteurs uniques/jour (estimés) |
|----------|--------------------------------|
| #1 Product of Day | 5 000 - 40 000 |
| Top 5 | 1 000 - 3 000 |
| Featured (hors top 5) | 200 - 1 000 |
| Not featured (onglet All) | Quasi-zéro |

---

## 6. BADGES ET CLASSEMENTS

### 6.1 Types de badges

| Badge | Condition | Visibilité |
|-------|-----------|-----------|
| **#1 Product of the Day** | Meilleur score de la journée | Homepage PH (section "Yesterday's Top 5") + newsletter + badge permanent |
| **#2-#5 Product of the Day** | Top 5 du jour | Homepage PH + newsletter + badge permanent |
| **#1 Product of the Week** | Meilleur score de la semaine | Homepage PH (section "Last Week's Top 5") + badge permanent. Typiquement 1500+ upvotes. |
| **#1 Product of the Month** | Meilleur score du mois | Homepage PH (section "Last Month's Top 5") + badge permanent. Typiquement 2000+ upvotes. |
| **Pas de badge (#6+)** | Position 6 et au-delà | Pas de badge. Disparaît du feed rapidement. |

### 6.2 Valeur des badges

Les badges sont des **assets de crédibilité permanents**. La plupart des produits affichent leur badge PH sur leur landing page comme preuve sociale. Un badge "#1 Product of the Day" est un signal de confiance reconnu par les SaaS buyers, investisseurs, et journalistes tech.

### 6.3 Structure de la homepage

La homepage PH affiche 4 classements de haut en bas :
1. Today's New Products (le leaderboard actif)
2. Yesterday's Top 5
3. Last Week's Top 5
4. Last Month's Top 5

Être dans le top 5 à n'importe quel niveau = exposition prolongée au-delà des 24h de lancement.

---

## 7. PROFIL PRODUIT — CE QUI COMPTE

### 7.1 Éléments du listing

| Élément | Impact | Recommandation |
|---------|--------|----------------|
| **Tagline** | ★★★★★ | 60 caractères max. Claire, spécifique, pas de hype. "AI agents that fix your biggest business problems while you sleep" > "Revolutionary AI solution for growth". |
| **Gallery (images/GIFs/vidéo)** | ★★★★★ | 3-5 GIFs montrant le produit en action. Le "aha moment" doit être visible. Hero image + before/after + features clés + social proof + pricing. |
| **Maker comment** | ★★★★★ | Premier commentaire posté par le maker. Story personnelle + pourquoi + pour qui + features + pricing/offre PH + questions de feedback. C'est le post le plus important du lancement. |
| **Description** | ★★★★☆ | 260 caractères max. Complémente la tagline avec les bénéfices principaux. |
| **Topics/tags** | ★★★☆☆ | Catégories pertinentes. Aide au classement dans les catégories thématiques. |
| **Liens sociaux** | ★★☆☆☆ | Twitter, LinkedIn, site. Complétude du profil = signal de sérieux. |
| **Vidéo démo** | ★★★★☆ | 3-5 min, authentique (Loom > production pro). Montrer le problème puis la solution. Conversationnel, pas scripté. |

### 7.2 Maker comment — structure recommandée

```
Hi PH! I'm [nom], co-founder of [produit] at FoundryTwo.

We built [produit] for [cible] who struggle with [problème].

What you can do today:
→ [Feature 1 en 5-7 mots]
→ [Feature 2]
→ [Feature 3]

What's different: [angle unique en 1-2 phrases]

Pricing: [gratuit/payant/free tier]
🎁 PH-only offer: [deal exclusif]

I'd love your feedback on:
1. [Question spécifique #1]
2. [Question spécifique #2]

Try it here: [lien]
```

Les questions de feedback en fin de maker comment sont critiques — elles déclenchent les commentaires substantifs qui pèsent 40-50x un upvote.

---

## 8. HUNTERS — ÉTAT DES LIEUX 2026

### 8.1 Ce qui a changé

Historiquement, avoir un hunter célèbre (avec beaucoup de followers) donnait un avantage massif : ses followers recevaient une notification email. **Ce n'est plus le cas.** PH a supprimé les notifications automatiques aux followers des hunters.

### 8.2 État actuel

| Aspect | 2022-2023 | 2025-2026 |
|--------|-----------|-----------|
| Notification aux followers du hunter | ✅ Oui | ❌ Supprimée |
| Avantage ranking d'un big hunter | Fort | Faible |
| Self-hunting (le maker soumet lui-même) | Possible mais désavantagé | ✅ Complètement viable et encouragé par PH |
| Valeur résiduelle d'un hunter connu | Distribution + crédibilité | Crédibilité + karma élevé (son upvote/commentaire pèse plus) |

### 8.3 Recommandation

Self-hunting est la norme en 2026. Un hunter externe n'est utile QUE s'il est un expert reconnu dans ta niche et qu'il va ACTIVEMENT engager le jour du lancement (commenter, répondre aux questions). Son karma et son engagement comptent plus que son nombre de followers.

---

## 9. RELANCE ET LANCEMENTS MULTIPLES

### 9.1 Règle de PH

Tu peux relancer un produit sur PH **après 6 mois**, et uniquement pour des **itérations significatives** (refonte majeure, pas un simple bug fix). Tu ne peux pas relancer le même produit tel quel.

### 9.2 Avec la cadence multi-SaaS

Chaque nouveau SaaS est un NOUVEAU produit sur PH — pas une relance. Chaque SaaS du portfolio (StoreMD, StoreMD module Listings, ProfitPilot, etc.) est un lancement indépendant. FoundryTwo peut lancer plusieurs produits par mois sur PH sans aucune restriction.

L'avantage : chaque lancement bénéficie de la communauté PH construite par les lancements précédents. Les gens qui ont commenté sur le lancement de LD seront notifiés si ils suivent le profil maker et reviendront pour PD.

---

## 10. ANTI-PATTERNS — CE QUI TUE UN LANCEMENT

| Interdit | Impact | Détail |
|----------|--------|--------|
| **Demander des upvotes** | Pénalité de ranking + potentiel unfeaturing | PH monitore Twitter. Demander des "visits and comments" est OK. |
| **Acheter des upvotes** | Suppression de points, potentiel ban | L'algo détecte les spikes depuis des comptes à faible karma. |
| **Mobiliser des comptes nouveaux** | Points throttlés | Les comptes créés pour l'occasion pèsent quasi-rien et déclenchent le filtre anti-manipulation. |
| **Lancer sans être featured** | Invisibilité totale | Si tu n'es pas featured, tout le trafic que tu envoies bénéficie à PH pas à toi. |
| **Lancer un produit "thin" (juste une landing page, pas de produit)** | Rejet au featuring | PH a durci ses critères. Un produit fonctionnel est requis. |
| **Lancer un simple "AI wrapper" sans valeur ajoutée** | Rejet au featuring | Le CEO l'a dit explicitement. |
| **Ne pas répondre aux commentaires** | Perte de vélocité + signal d'abandon | Chaque réponse du maker crée un thread = signal fort. |
| **Lancer après 00:01 PT** | -8.7% upvotes par heure de retard | Chaque heure perdue = vélocité réduite. |
| **Vidéo de lancement trop produite** | Perçue comme corporate, pas maker | Un Loom authentique surperforme une vidéo à $10K. PH valorise l'authenticité. |

---

## 11. MÉTRIQUES DE RÉFÉRENCE

### 11.1 Upvotes nécessaires pour le ranking

| Position | Semaine (lun-ven) | Weekend (sam-dim) |
|----------|-------------------|-------------------|
| #1 Product of Day | 600-1000+ upvotes | 400-600 upvotes |
| Top 5 | 150-300 en 6h | 100-200 en 6h |
| #1 Product of Week | 1500+ upvotes | — |
| #1 Product of Month | 2000+ upvotes | — |

### 11.2 Conversions attendues

| Métrique | Fourchette | Source |
|----------|-----------|--------|
| Visiteurs uniques (top 5) | 5 000 - 40 000 | SimilarWeb + retours launchers |
| Signups (B2B SaaS, bonne conversion) | 50 - 500 | Retours multiples |
| Signups (B2C, bonne conversion) | 500 - 1 500 | Retours multiples |
| Conversion visite → signup | ~8% (bonne landing page) | Market Clarity |
| Conversion signup → paying | Variable (1-20%) | Dépend du produit/pricing |

### 11.3 Trafic PH global

| Donnée | Valeur |
|--------|--------|
| Visiteurs mensuels PH | 3.2-8.3M (selon les sources) |
| Géographie principale | US 72%, UK, Canada |
| Desktop vs mobile | ~80% desktop |
| Audience | Early adopters, tech enthusiasts, makers, investisseurs |

---

## 12. RÉSUMÉ — LES 10 RÈGLES DE PH

| # | Règle | Impact |
|---|-------|--------|
| 1 | **Être featured est la condition de survie.** Si tu n'es pas featured, tu es invisible. Produit fonctionnel + craft + originalité = featured. | Critique |
| 2 | **Points ≠ Upvotes.** Le ranking est basé sur des points pondérés par la qualité du compte. 300 upvotes de comptes établis > 400 upvotes de comptes nouveaux. | Critique |
| 3 | **1 commentaire de qualité ≈ 40-50 upvotes.** Optimiser pour les commentaires substantifs, pas les upvotes. | Critique |
| 4 | **Les 4 premières heures sont la fenêtre de vie ou de mort.** Upvotes cachés, rotation aléatoire, vélocité mesurée. Tout se joue ici. | Critique |
| 5 | **Lancer à 00:01 PT (09:01 CET).** Chaque heure de retard = -8.7% upvotes. Full 24h d'exposition. | Sévère |
| 6 | **Le maker comment est le post le plus important.** Story + features + offre PH + questions de feedback = déclenche les commentaires à fort poids. | Sévère |
| 7 | **Répondre à CHAQUE commentaire en < 5 min.** Crée des threads, signale une discussion active, maintient le produit visible. | Fort |
| 8 | **Jamais demander des upvotes.** Demander des visites et des commentaires. PH monitore et pénalise le vote fishing. | Fort |
| 9 | **Self-hunting est la norme.** Un hunter externe n'apporte plus de notification aux followers. Utile uniquement si expert de ta niche avec haute karma. | Modéré |
| 10 | **Chaque SaaS = un nouveau lancement.** Avec 2 SaaS/mois, FoundryTwo lance potentiellement plusieurs fois/mois sur PH. Chaque lancement bénéficie de la communauté construite par les précédents. | Structurel |

---

## 13. DIFFÉRENCES CLÉS PH vs TWITTER vs LINKEDIN vs IH

| Aspect | PH | Twitter | LinkedIn | IH |
|--------|-----|---------|----------|-----|
| **Type** | Plateforme de lancement | Réseau social | Réseau professionnel | Forum communautaire |
| **Mécanique** | Événement 24h avec ranking | Publication continue | Publication continue | Publication continue |
| **Fréquence** | 1x par produit (relance après 6 mois) | Quotidien | 3-4x/semaine | 1x/semaine |
| **Signal #1** | Vélocité upvotes (premières 4h) + commentaires | Reply auteur (150x) | Dwell time + commentaires | Commentaires + upvotes |
| **Système de points** | Pondéré par karma du compte | Pas de karma visible | Pas de karma | Pas de karma |
| **Featured/curation** | ✅ Manuel (10% featured) | ❌ Algo automatique | ❌ Algo automatique | ❌ Pas de curation |
| **Liens externes** | ✅ Encouragés (c'est le but) | ❌ Pénalisé | ❌ Pénalisé (-60%) | ✅ Autorisés |
| **Audience** | Early adopters, tech enthusiasts | Mixte | Professionnels B2B | 100% fondateurs/builders |
| **ROI** | Spike unique (5K-40K visites en 24h) | Croissance progressive | Croissance progressive | Croissance progressive + 23.1% conversion |
| **Préparation** | 4-12 semaines avant le lancement | Continue | Continue | Continue |

---

## 14. SOURCES

| Source | Type | Données | Date |
|--------|------|---------|------|
| Product Hunt officiel (Launch Guide, FAQ) | Source primaire | Règles, critères featuring, guidelines | Continu |
| Rajiv Ayyangar (CEO PH) | Déclaration officielle | Explication du changement featuring, critères | Oct 2024 |
| Mike Kerzhner (CTO PH) | Confirmation publique | Système de points ≠ upvotes, poids des comptes | 2025 |
| Awesome Directories | Étude comparative | 387 lancements, changement algo, taux featuring | Nov 2025 |
| Flowjam | Playbook | Données vélocité, poids commentaires, timing | 2025 |
| Flo Merian / Hackmamba | Guide technique | Mécanique ranking, premières 4h, stratégie dev tools | 2026 |
| Flexprice | Retour #1 POTD | 500+ upvotes, 50+ signups, pas de communauté préexistante | Fév 2026 |
| Demand Curve | Guide (14 hunters interviewés) | Front page mechanics, seed audience, hunters | Dec 2023 (toujours valide) |
| Market Clarity | Feedback 100+ entrepreneurs | Karma, vidéo démo, pre-launch, conversions | Oct 2025 |
| Waitlister | Données 100+ lancements | Waitlist impact, timing, featured rate | Dec 2025 |
| Lachlan Chavasse | Post-mortem lancement raté | Throttling, ratio upvotes/points, algorithme pénalisant | Oct 2025 |
| Kartik Mandeville | Analyse timing | 8.7% upvotes en plus par heure plus tôt | 2024 |
| David Kim (Medium) | Guide complet | Upvotes nécessaires par position, structure homepage | Dec 2024 |
