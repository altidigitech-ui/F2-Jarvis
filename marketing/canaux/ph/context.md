# CONTEXT PRODUCT HUNT — Profils R + F

**Dernière mise à jour :** 05/05/2026
**Hérite de :** `BIBLE.md` + `ANTI-IA.md` + `marketing/strategie.md`
**S'appuie sur :** `marketing/canaux/ph/algo.md` (mécanique plateforme, système de points, featuring, timing)
**Ce fichier contient :** stratégie Product Hunt — karma farming, pre-launch, launch day, post-launch.

**Note fondamentale :** Product Hunt n'est PAS un canal de publication continue. C'est une **plateforme de lancement**. On n'y "poste" pas chaque semaine — on y LANCE un produit. Chaque lancement est un événement unique de 24h qui se prépare en 4-8 semaines.

**Note comptes PH :** les company accounts sur PH ne peuvent PAS poster, voter ou commenter. Tous les lancements et toute l'activité passent par les profils personnels R et F.

---

## 1. RÔLE DE PH DANS L'ÉCOSYSTÈME

### Positionnement

Product Hunt est le **canal de lancement** du studio. C'est le seul canal qui fonctionne en mode événement (24h) et pas en mode continu. Chaque produit (StoreMD, ProfitPilot, futurs SaaS) a droit à 1 lancement PH.

L'audience PH est très orientée devs/tech/builders. Ce n'est pas là où se trouvent nos merchants Shopify cibles. Mais c'est un canal de visibilité supplémentaire et un outil de social proof (badge "Product of the Day").

Priorité PH dans le stack : BASSE. On farme le karma quotidiennement (5 upvotes + 1 commentaire) pour que le jour où on lance, nos comptes pèsent dans l'algo.

### Le modèle

```
KARMA FARMING (quotidien)                LAUNCH DAY (24h)              POST-LAUNCH (48h-1 semaine)
───────────────────────────              ─────────────────              ──────────────────────────
5 upvotes + 1 commentaire/jour           09:01 CET : go live           Répondre aux derniers commentaires
sur des produits pertinents              Maker comment posté           Exporter les contacts
Construire le karma R et F              Répondre à CHAQUE comment     Onboarder les nouveaux signups
                                         en < 5 min pendant 16h
```

### Comptes et rôles

| Compte | Type | Qui gère | Rôle |
|--------|------|----------|------|
| **R** (Romain Delgado) | Profil perso PH | R | Karma farming quotidien. Maker sur les lancements. Commentaires angle business. |
| **F** (Fabrice Gangitano) | Profil perso PH | F | Karma farming quotidien. Maker sur les lancements. Commentaires angle technique. |

Pas de compte company PH. Les company accounts ne peuvent pas poster, voter ou commenter. Tout passe par les profils personnels.

---

## 2. KARMA FARMING — ROUTINE QUOTIDIENNE

Le système de points PH pondère les interactions par le karma du compte (cf. algo.md §2.2). Un compte à haute karma = upvotes et commentaires qui pèsent 5-10x plus. Construire du karma AVANT de lancer est critique.

### Actions karma quotidiennes

| Action | Fréquence | Qui |
|--------|-----------|-----|
| Upvoter des produits pertinents (e-com tools, AI tools, Shopify tools) | 5/jour | R + F |
| Commenter un lancement dans notre niche avec un commentaire substantif | 1/jour | R + F |

Intégré dans la routine quotidienne (bloc midi, cf. daily-checklist.md).

### Règles des commentaires PH

Les commentaires doivent être **substantifs** (cf. algo.md §3.3) :

| Commentaire de qualité | Low-effort (pas de poids) |
|------------------------|--------------------------|
| "How does this handle app conflicts on Shopify? The JS injection detection is a pain point we see a lot with merchants." | "Great product!" |
| "I tested this on a Shopify store. The speed improvement was noticeable — 2 seconds off load time by removing 3 conflicting apps." | "Congrats on the launch!" |
| "The pricing model is interesting. For small merchants doing < $10K/month, $29/mo feels steep. Have you considered a usage-based model?" | "Looks interesting." |

### Objectif karma

| Compte | Objectif minimum avant chaque lancement |
|--------|---------------------------------------|
| R | 5+ karma points, historique de commentaires substantifs sur 10+ produits |
| F | 5+ karma points, historique de commentaires techniques sur 5+ produits |

---

## 3. PRE-LAUNCH — 4-8 SEMAINES AVANT CHAQUE LANCEMENT

### Historique — Lancement #1 (Leak Detector, 16/03/2026)

Lancement #1 fait sans pre-launch complet. Lecons tirées :
- Karma R et F encore faible au moment du lancement
- "Notify me" insuffisant (pas assez de temps de promotion ship page)
- Performance PH probablement inférieure au potentiel

Ces lecons s'appliquent à TOUS les lancements suivants. Le full process 4-8 semaines s'applique à partir du prochain lancement.

### Checklist pre-launch

| Semaine | Action | Qui |
|---------|--------|-----|
| **S-8 à S-4** | Construire du karma (§2) | R + F |
| **S-4** | Créer la ship page ("Coming Soon") sur PH. Les gens peuvent cliquer "Notify me". | R |
| **S-4 à S-2** | Promouvoir la ship page dans les posts Twitter, LinkedIn, IH. Objectif : 200-500 "Notify me". | R |
| **S-2** | Préparer les assets du listing (tagline, description, gallery 3-5 GIFs, vidéo démo Loom 3-5 min, topics/tags) | R |
| **S-2** | Rédiger le maker comment (cf. §5.2) | R |
| **S-2** | Préparer les templates de communication externe (emails, tweets, posts LinkedIn, post IH) | R |
| **S-1** | Identifier 20-30 supporters clés à haute karma PH. PAS des comptes nouveaux. | R |
| **S-1** | Briefer les supporters : date, demander de VISITER et COMMENTER (jamais demander des upvotes) | R |
| **S-1** | Préparer les réponses aux FAQ (F = technique, R = business). Templates prêts. | R + F |
| **J-1** | Vérification finale : listing complet, assets uploadés, maker comment prêt, vidéo testée, landing page fonctionnelle, analytics en place | R |

### Assets du listing

| Asset | Spécifications |
|-------|---------------|
| **Tagline** | 60 caractères max. Claire, spécifique, pas de hype. |
| **Description** | 260 caractères max. Complémente la tagline. |
| **Gallery** | 3-5 GIFs/images. Hero image + produit en action + features clés + social proof + pricing. 2400x1200px, PNG < 500KB. GIFs < 3MB. |
| **Vidéo démo** | 3-5 min. Loom (authentique > production pro). Problème (15s) → solution (2-3 min) → features (1-2 min). |
| **Maker comment** | Cf. §5.2. Le post le plus important du lancement. |
| **Topics/tags** | Catégories PH pertinentes (ex: "E-Commerce", "Shopify", "Artificial Intelligence") |

---

## 4. LAUNCH DAY — PROTOCOLE 24H

### Timeline

Toutes les heures en CET (Marseille). Reset PH = 00:00 PT = **09:00 CET**.

| Heure CET | Heure PT | Action | Qui |
|-----------|----------|--------|-----|
| **09:01** | 00:01 | **GO LIVE.** Listing publié. Maker comment posté immédiatement. | R |
| **09:05** | 00:05 | R upvote + commentaire angle business. F upvote + commentaire angle technique. | R + F |
| **09:10** | 00:10 | **Vague 1 — Email waitlist.** Un seul CTA : "Visit and share your feedback." Pas "upvote". | R |
| **09:15-10:00** | 00:15-01:00 | Répondre à CHAQUE commentaire en < 5 min. Chaque réponse crée un thread = signal fort. | R (business) + F (technique) |
| **10:00-13:00** | 01:00-04:00 | **Les 4 premières heures.** Upvotes cachés, rotation aléatoire. L'algo mesure la vélocité. Continuer à répondre. | R + F |
| **13:00** | 04:00 | **Fin de la phase critique.** Rankings se stabilisent. Évaluer la position. | R |
| **15:00** | 06:00 | **Vague 2 — LinkedIn.** Post R + post F. Demander du feedback honnête, pas des upvotes. | R + F |
| **17:00-18:00** | 08:00-09:00 | **Pic matinal US.** Engagement organique US commence. Continuer à répondre. | R |
| **21:00** | 12:00 | **Vague 3 — Twitter** (optionnel). Pin le lien PH. | R |
| **09:01-09:00+1** | 00:01-00:00+1 | **Toute la journée : répondre, répondre, répondre.** Pas de pause > 30 min. | R (principal) + F (quand dispo) |

### Maker comment — Template

Posté à 09:01 CET, immédiatement après le go live.

```
Hey PH! [Prénom] here, co-founder of FoundryTwo.

[NOM DU SAAS] [one-liner du produit].

Why we built it:
We spent [X] weeks talking to [merchants/users cibles].
The same problem kept coming up: [douleur spécifique + chiffre terrain si disponible].

How it works:
→ [Feature 1]
→ [Feature 2]
→ [Feature 3]

What makes it different:
[Différenciateur clé]

Launch offer:
🎁 PH-only: [deal exclusif — ex: 3 mois Pro gratuit, 50% first year]

Would love your feedback:
1. [Question spécifique liée au produit]
2. [Question spécifique liée à l'usage]

Try it free: [lien]
```

**Règles maker comment :**
- Posté dans les 60 SECONDES après le go live
- Authentique et personnel (pas corporate)
- Inclut un deal exclusif PH (les makers qui offrent un incentive génèrent plus d'engagement)
- Se termine par 2 questions spécifiques (déclenchent les commentaires substantifs = 40-50x un upvote)
- FoundryTwo mentionné comme studio (le studio existe, c'est le nom de la boîte)

### Communication externe — Ce qu'on dit vs ne dit PAS

| Dire | Ne JAMAIS dire |
|------|---------------|
| "We just launched on Product Hunt. Would love your feedback!" | "Please upvote us on Product Hunt!" |
| "Check out our Product Hunt page and share your thoughts." | "We need your upvote to hit #1!" |
| "I'd appreciate a comment on our launch — what feature would you use most?" | "Go upvote and comment!" |
| Partager le lien PH avec contexte et valeur | Spammer le lien PH partout sans contexte |

**Règle PH officielle :** demander des VISITES et des COMMENTAIRES est OK. Demander des UPVOTES est interdit et détecté.

### Répartition R et F le jour du lancement

| Action | R | F |
|--------|---|---|
| Publier le listing + maker comment | ✅ | ❌ |
| Répondre aux commentaires business/growth/pricing | ✅ | ❌ |
| Répondre aux commentaires techniques/stack/architecture | ❌ | ✅ |
| Communication externe (email, LinkedIn, Twitter) | ✅ | Amplifie depuis ses comptes perso |
| Upvote + commentaire depuis profil perso PH | ✅ | ✅ |
| Monitoring du ranking et de la vélocité | ✅ | ❌ |

R est full-time le launch day. F contribue selon ses disponibilités. Le launch day commence à 09:01 CET. **Launch day est non-négociable.** C'est le seul jour où PH prend la priorité sur tout le reste (y compris le cold).

---

## 5. COORDINATION CROSS-PLATEFORME JOUR J

Le launch PH ne se fait pas en isolation. Les autres canaux amplifient.

| Heure CET | Plateforme | Action | Qui |
|-----------|------------|--------|-----|
| 09:05 | PH | Maker comment + upvotes R+F | R + F |
| 09:10 | Email | Vague 1 waitlist : "Visit and share your feedback" | R |
| 09:15 | IH | Post Show IH simultané (ou +1 jour) | R |
| 15:00 | LinkedIn | Post R + post F avec lien PH | R + F |
| 21:00 | Twitter | Tweet R + tweet F avec lien PH (format 2-blocs, lien en reply) | R + F |
| J+1 | Twitter + LinkedIn + IH | Posts résultats du lancement (chiffres réels) | R |
| J+30 | Twitter + LinkedIn | Retour sur les chiffres 30 jours après | R |

---

## 6. POST-LAUNCH — 48H À 1 SEMAINE

### Actions immédiates (24-48h)

| Action | Qui |
|--------|-----|
| Répondre aux derniers commentaires PH (certains arrivent le lendemain) | R + F |
| Exporter les contacts (commentateurs = leads chauds) | R |
| Onboarder les nouveaux signups (email bienvenue, guide, offre PH rappelée) | R |
| Post IH : résultats du lancement (chiffres réels) | R |
| Post Twitter R + F : résultats du lancement | R + F |
| Post LinkedIn R + F : version développée avec insights | R + F |

### Actions semaine 1

| Action | Qui |
|--------|-----|
| Analyser les données PH (trafic, conversions, commentaires) | R |
| Documenter les learnings (qu'est-ce qui a marché, qu'est-ce qu'on ferait différemment) | R |
| Remercier les supporters (message personnalisé aux commentateurs les plus engagés) | R |
| Mettre le badge PH sur la landing page (si top 5) | R |

---

## 7. LANCEMENTS FUTURS

Chaque produit du studio a droit à 1 lancement PH. Espacer les lancements d'au moins 4-6 semaines pour maximiser le karma entre chaque.

**Règle PH :** relancer le même produit < 6 mois est interdit sauf refonte majeure.

### Ce qui s'améliore avec chaque lancement

| Élément | Lancement #1 | Lancements suivants |
|---------|-------------|---------------------|
| Karma R et F | Faible | Fort (karma cumulé quotidien) |
| Communauté PH | 0 | Communauté croissante |
| "Notify me" ship page | Construit from scratch | Boosté par la communauté existante |
| Qualité des assets | Premier essai | Process rodé, templates réutilisables |

---

## 8. ALLOCATION DU TEMPS

| Période | Durée | Temps R | Temps F |
|---------|-------|---------|---------|
| **Karma farming (quotidien)** | Tous les jours | 10 min/jour | 10 min/jour |
| **Pre-launch (S-4 à S-1)** | 4 semaines | 2-3h/semaine | 30 min/semaine |
| **Launch day** | 1 jour | **Journée entière** (16h) | Selon disponibilité |
| **Post-launch (J+1 à J+7)** | 1 semaine | 1-2h | 15 min |

---

## 9. UTM TAGGING

| Placement | UTM |
|-----------|-----|
| Listing PH (lien site) | `utm_source=producthunt&utm_medium=referral&utm_campaign=launch_day&utm_content=ph_listing` |
| Maker comment (premier commentaire) | `utm_source=producthunt&utm_medium=referral&utm_campaign=launch_day&utm_content=ph_maker_comment` |
| Post-launch gallery (visiteurs après le launch day) | `utm_source=producthunt&utm_medium=referral&utm_campaign=post_launch&utm_content=ph_gallery` |

Pour tout placement non listé dans `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, l'ajouter d'abord au fichier officiel.

---

## 10. ANTI-PATTERNS

| Interdit | Pourquoi |
|----------|----------|
| Demander des upvotes | Pénalité ranking + potentiel unfeaturing. PH monitore Twitter. |
| Acheter des upvotes | Suppression de points, potentiel ban |
| Mobiliser des comptes nouveaux | Quasi-zéro points. Peut déclencher filtre anti-manipulation. |
| Lancer sans être featured | Invisibilité totale. Tout le trafic envoyé bénéficie à PH pas à toi. |
| Lancer sans produit fonctionnel | PH a durci les critères de featuring. |
| Lancer un "AI wrapper" sans valeur ajoutée | Le CEO PH l'a dit explicitement. |
| Ne pas répondre aux commentaires | Perte de vélocité + signal d'abandon |
| Lancer après 09:01 CET | -8.7% upvotes par heure de retard |
| Vidéo trop produite/corporate | PH valorise l'authenticité maker. Loom > vidéo $10K. |
| Lancer sans pre-launch | Pas de supporters → pas de vélocité → pas de featuring |
| Relancer le même produit < 6 mois | Interdit par PH sauf refonte majeure |
| Engagement pods PH | Détecté, downrank |
| Fake reviews / fake hunters | Ban du compte |
| Em-dash, "Here's the thing" | Détecté IA. Cf. `ANTI-IA.md` |
| Inventer des chiffres / résultats | BIBLE §3 |

---

## 11. DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Algo PH | `marketing/canaux/ph/algo.md` |
| Stratégie marketing globale | `marketing/strategie.md` |
| Objectifs et KPIs | `marketing/objectifs.md` |
| Context StoreMD | `saas-app-shopify/storemd/context.md` |
| Context IH (launch simultané) | `marketing/canaux/ih/context.md` |
| Voix R | `romain/VOIX.md` |
| Voix F | `fabrice/VOIX.md` |
| UTM tracking | `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` |
| ANTI-IA | `ANTI-IA.md` |
| BIBLE | `BIBLE.md` |
