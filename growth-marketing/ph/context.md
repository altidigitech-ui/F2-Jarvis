# CONTEXT PRODUCT HUNT — @foundrytwo

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `growth-marketing/context.md` (stratégie globale, piliers, matrice cross-plateforme, Build My Community §1.1)
**S'appuie sur :** `ph/algo.md` (mécanique de la plateforme, système de points, featuring, timing)
**Implémenté par :** `ph/f2/context.md`, `ph/f2/roadmap.md`
**Ce fichier contient :** la stratégie Product Hunt commune — positionnement, pre-launch, launch day, post-launch, adaptation multi-produit.

**Note fondamentale :** Product Hunt n'est PAS un canal de publication continue comme Twitter, LinkedIn ou IH. C'est une **plateforme de lancement**. On n'y "poste" pas chaque semaine — on y LANCE un produit. Chaque lancement est un événement unique de 24h qui se prépare en 4-8 semaines. Avec la cadence 2 SaaS/mois, FoundryTwo peut lancer plusieurs fois/mois sur PH — ou grouper les lancements par vertical.

---

## 1. RÔLE DE PH DANS L'ÉCOSYSTÈME

### 1.1 Positionnement

Product Hunt est le **canal de lancement** de FoundryTwo. C'est le seul canal du repo qui fonctionne en mode événement (24h) et pas en mode continu. Chaque SaaS du portfolio a droit à 1 lancement PH. Avec 6 SaaS planifiés, PH devient un rendez-vous récurrent.

### 1.2 Le modèle

```
PRE-LAUNCH (4-8 semaines avant)          LAUNCH DAY (24h)              POST-LAUNCH (48h-1 semaine)
─────────────────────────────────        ─────────────────              ──────────────────────────
Construire la communauté PH              09:01 CET : go live           Répondre aux derniers commentaires
Préparer les assets (gallery,            Maker comment posté           Exporter les contacts
 tagline, maker comment, vidéo)          Activer le réseau             Onboarder les nouveaux signups
Activer la waitlist                      Répondre à CHAQUE comment     Publier le retour d'expérience
Engager avec la communauté PH            en < 5 min pendant 16h        sur IH/Twitter/LinkedIn
(upvoter, commenter d'autres produits)   Coordonner les vagues
                                          de communication externe
```

### 1.3 Comptes et rôles

| Compte | Handle | Qui gère | Rôle |
|--------|--------|----------|------|
| **F2 (studio)** | @foundrytwo | R | Lancement de chaque SaaS. Maker comment. Réponses aux commentaires. |
| **R (perso)** | Profil PH personnel de R | R | Supporter, commenter, amplifier le lancement F2. Upvote de haute karma. |
| **F (perso)** | Profil PH personnel de F | F | Supporter, commenter angle technique. Upvote de haute karma. |

**Les profils personnels R et F sur PH ne sont PAS des comptes de publication.** Ils ne lancent rien, ne publient rien. Ils existent pour 2 raisons uniquement :
1. **Karma farming :** en upvotant et commentant des produits d'autres makers régulièrement, R et F construisent un karma élevé sur leurs comptes.
2. **Support launch day :** le jour du lancement F2, les upvotes et commentaires de R et F pèsent 5-10x plus dans l'algo grâce à leur karma accumulé.

Tout le contenu, tous les lancements passent par @foundrytwo. R et F sont listés comme "makers" sur chaque listing @foundrytwo.

---

## 2. STRATÉGIE DE KARMA — AVANT LE PREMIER LANCEMENT

Le système de points PH pondère les interactions par le karma du compte (cf. algo.md §2.2). Un compte à haute karma = upvotes et commentaires qui pèsent 5-10x plus. Construire du karma AVANT de lancer est critique.

### 2.1 Actions karma pour R et F

| Action | Fréquence | Quand commencer | Qui |
|--------|-----------|----------------|-----|
| Upvoter des produits pertinents sur PH | 5-10/semaine | Dès maintenant (J-30 minimum) | R + F |
| Commenter des lancements dans notre niche (e-com tools, marketing tools, AI tools, creator tools) | 2-3/semaine | Dès maintenant | R + F |
| Participer aux discussions (répondre aux maker comments, poser des questions) | 1-2/semaine | Dès maintenant | R (angle growth), F (angle tech) |

### 2.2 Règles des commentaires PH (pré-lancement)

Les commentaires sur les produits d'autres makers doivent être **substantifs** (cf. algo.md §3.3) :

| ✅ Commentaire de qualité | ❌ Low-effort |
|--------------------------|--------------|
| "How does this handle app conflicts on Shopify? We're building something similar and the JS injection detection was our biggest challenge." | "Great product!" |
| "I tested this on our Shopify store. The app conflict detection was spot on — we removed 3 apps and cut 2 seconds off load time." | "Congrats on the launch!" |
| "The pricing model is interesting. Have you considered a per-store model instead of monthly? For small merchants doing < $10K/month, $29/mo feels steep." | "Looks interesting." |

### 2.3 Objectif karma

| Compte | Objectif minimum avant le 1er lancement |
|--------|---------------------------------------|
| R (profil PH) | 5+ karma points, historique de commentaires substantifs sur 10+ produits |
| F (profil PH) | 5+ karma points, historique de commentaires techniques sur 5+ produits |
| @foundrytwo | Profil complet, ship page active |

---

## 3. PRE-LAUNCH — 4-8 SEMAINES AVANT CHAQUE LANCEMENT

### 3.0 Historique — Lancement #1 (Leak Detector, 16/03/2026)

Lancement #1 fait sans pre-launch complet. Leçons tirées :
- Karma R et F encore faible au moment du lancement
- "Notify me" insuffisant (pas assez de temps de promotion ship page)
- Performance PH probablement inférieure au potentiel

**Ces leçons s'appliquent à TOUS les lancements suivants.** Le full process 4-8 semaines s'applique à partir de StoreMD et tous les SaaS suivants du portfolio. Le karma se construit petit à petit — chaque semaine d'activité sur PH renforce les comptes R et F pour le prochain lancement.

### 3.1 Checklist pre-launch (universelle, s'applique à chaque SaaS)

| Semaine | Action | Qui | Détail |
|---------|--------|-----|--------|
| **S-8 à S-4** | Construire du karma (§2) | R + F | Upvotes + commentaires réguliers sur PH |
| **S-4** | Créer la ship page (page "Coming Soon") sur PH | R | Titre, description courte, logo. Les gens peuvent cliquer "Notify me". |
| **S-4 à S-2** | Promouvoir la ship page | R | Mentionner la ship page dans les posts Twitter, LinkedIn, IH. Objectif : 200-500 "Notify me". |
| **S-2** | Préparer les assets du listing | R | Tagline, description, gallery (3-5 GIFs), vidéo démo (Loom 3-5 min), topics/tags. |
| **S-2** | Rédiger le maker comment | R | Cf. §4.2. Le maker comment est le post le plus important du lancement. |
| **S-2** | Préparer les templates de communication externe | R | Emails waitlist, tweets, posts LinkedIn, post IH, messages Slack/Discord. |
| **S-1** | Identifier les supporters clés | R | 20-30 personnes à haute karma PH dans le réseau (makers, hunters, communauté). PAS des comptes nouveaux. |
| **S-1** | Briefer les supporters | R | Leur dire la date, leur demander de VISITER et COMMENTER (jamais demander des upvotes). |
| **S-1** | Préparer les réponses aux FAQ | R + F | Anticiper les questions techniques (F) et business (R). Templates de réponse prêts. |
| **J-1** | Vérification finale | R | Listing complet, assets uploadés, maker comment prêt, vidéo testée, landing page fonctionnelle, analytics en place. |

### 3.2 Assets du listing

| Asset | Spécifications | Qui produit |
|-------|---------------|-------------|
| **Tagline** | 60 caractères max. Claire, spécifique, pas de hype. | R |
| **Description** | 260 caractères max. Complémente la tagline. | R |
| **Gallery** | 3-5 GIFs/images. Hero image + produit en action + features clés + social proof (si disponible) + pricing. Format 2400x1200px, PNG < 500KB. GIFs < 3MB. | R (Canva Pro) |
| **Vidéo démo** | 3-5 min. Loom (authentique > production pro). Problème (15s) → solution (2-3 min) → features (1-2 min). Conversationnel. | R |
| **Maker comment** | Cf. §4.2 | R |
| **Topics/tags** | Catégories PH pertinentes (ex: "E-Commerce", "Marketing", "Artificial Intelligence") | R |
| **Liens sociaux** | Twitter @foundrytwo, LinkedIn FoundryTwo, foundrytwo.com | R |

---

## 4. LAUNCH DAY — LE PROTOCOLE 24H

### 4.1 Timeline

Toutes les heures en CET (Marseille). Reset PH = 00:00 PT = **09:00 CET**.

| Heure CET | Heure PT | Action | Qui |
|-----------|----------|--------|-----|
| **09:01** | 00:01 | **GO LIVE.** Le listing est publié. Maker comment posté immédiatement. | R |
| **09:05** | 00:05 | R (profil perso) upvote + commentaire angle growth/business. F (profil perso) upvote + commentaire angle technique. | R + F |
| **09:10** | 00:10 | **Vague 1 — Email waitlist.** Un seul CTA : "Visit and share your feedback." Pas "upvote". | R |
| **09:15-10:00** | 00:15-01:00 | Répondre à CHAQUE commentaire en < 5 min. Chaque réponse crée un thread = signal fort pour l'algo. | R (business), F (technique) |
| **10:00-13:00** | 01:00-04:00 | **Les 4 premières heures.** Upvotes cachés, rotation aléatoire. L'algo mesure la vélocité. Continuer à répondre. | R + F |
| **13:00** | 04:00 | **Fin de la phase critique.** Les rankings se stabilisent. Évaluer la position. | R |
| **15:00** | 06:00 | **Vague 2 — LinkedIn.** Post texte + thumbnail. Demander du feedback honnête, pas des upvotes. | R |
| **17:00-18:00** | 08:00-09:00 | **Pic matinal US.** Engagement organique US commence. Continuer à répondre à chaque commentaire. | R |
| **21:00** | 12:00 | **Vague 3 — Twitter Space AMA** (optionnel). 15 min. Pin le lien PH. | R |
| **09:01-09:00+1** | 00:01-00:00+1 | **Toute la journée : répondre, répondre, répondre.** Chaque commentaire = engagement = signal algo. Pas de pause > 30 min. | R (principal) + F (technique, quand dispo) |

### 4.2 Le maker comment — Template générique par SaaS

Le maker comment est posté à 09:01 CET, immédiatement après le go live. C'est le commentaire le plus important du lancement.

**Structure adaptée FoundryTwo :**

```
Hey PH! 👋 [Prénom] here, co-founder of FoundryTwo.

We're a studio building AI agents that solve real problems 
for [vertical cible — merchants/agencies/creators].

[NOM DU SAAS] is our [Xème] product. It [one-liner du produit].

Why we built it:
We spent [X] weeks in [communautés] listening to 
[merchants/freelancers/creators]. The same problem kept coming up: 
[douleur spécifique + chiffre terrain].

How it works:
→ [Feature 1]
→ [Feature 2]
→ [Feature 3]

What makes it different:
It's not just a tool — it's an agent. It [détecte/analyse/agit/apprend] 
while you sleep.

Launch offer:
🎁 PH-only: [deal exclusif — ex: 3 mois Pro gratuit, 50% first year]

We ship AI agents that solve real problems. This is product #[X] from our portfolio of 6 across 3 verticals. Friday studio updates when we have meaningful product data to share.

Would love your feedback:
1. [Question spécifique liée au produit]
2. [Question spécifique liée à l'usage]

Try it free: [lien]
```

**Règles du maker comment :**
- Posté dans les 60 SECONDES après le go live
- Authentique et personnel (pas corporate)
- Inclut un deal exclusif PH (les makers qui offrent un incentive génèrent plus d'engagement)
- Se termine par 2 questions spécifiques (déclenchent les commentaires substantifs = 40-50x un upvote)
- Mentionne FoundryTwo comme studio et le numéro du produit (renforce le positionnement multi-produit)

### 4.3 Communication externe — Ce qu'on dit vs ne dit PAS

| ✅ Dire | ❌ Ne JAMAIS dire |
|---------|------------------|
| "We just launched on Product Hunt. Would love your feedback!" | "Please upvote us on Product Hunt!" |
| "Check out our Product Hunt page and share your thoughts." | "We need your upvote to hit #1!" |
| "I'd appreciate a comment on our launch — what feature would you use most?" | "Go upvote and comment!" |
| Partager le lien PH avec contexte et valeur | Spammer le lien PH partout sans contexte |

**Règle PH officielle :** Demander des VISITES et des COMMENTAIRES est OK. Demander des UPVOTES est interdit et détecté.

### 4.4 Répartition R et F le jour du lancement

| Action | R | F |
|--------|---|---|
| Publier le listing + maker comment | ✅ | ❌ |
| Répondre aux commentaires business/growth/pricing | ✅ | ❌ |
| Répondre aux commentaires techniques/stack/architecture | ❌ | ✅ |
| Communication externe (email, LinkedIn, Twitter) | ✅ | Amplifie depuis ses comptes perso |
| Upvote + commentaire depuis profil perso PH | ✅ | ✅ |
| Monitoring du ranking et de la vélocité | ✅ | ❌ |

R et F sont full-time. Le launch day commence à 09:01 CET. R est disponible toute la journée. F contribue selon ses disponibilités.

---

## 5. POST-LAUNCH — 48H À 1 SEMAINE APRÈS

### 5.1 Actions immédiates (24-48h)

| Action | Qui | Détail |
|--------|-----|--------|
| Répondre aux derniers commentaires PH | R + F | Certains commentaires arrivent le lendemain. Toujours répondre. |
| Exporter les contacts (commentateurs, upvoteurs si possible) | R | Les commentateurs sont des leads chauds. Drip email personnalisé. |
| Onboarder les nouveaux signups | R | Email de bienvenue, guide d'utilisation, offre PH-only rappelée. |
| Publier le retour d'expérience sur IH | R | "How we launched [produit] on Product Hunt — real numbers." Format build in public. |
| Post Twitter R : résultats du lancement | R | Chiffres réels : position, upvotes, signups, learnings. |
| Post LinkedIn R : résultats du lancement | R | Version développée avec insights et données. |

### 5.2 Actions semaine 1

| Action | Qui | Détail |
|--------|-----|--------|
| Analyser les données PH (trafic, conversions, commentaires) | R | Identifier les points forts et faibles pour le prochain lancement. |
| Documenter les learnings | R | Qu'est-ce qui a marché ? Qu'est-ce qu'on ferait différemment ? Stocké pour le lancement suivant. |
| Remercier les supporters | R | Message personnalisé aux commentateurs les plus engagés. Build community. |
| Mettre le badge PH sur la landing page | R | Si top 5 : afficher le badge "#X Product of the Day" comme social proof. |

---

## 6. CADENCE MULTI-PRODUIT — LANCEMENTS PH

### 6.1 Le calendrier

Avec la cadence 2 SaaS/mois, FoundryTwo a potentiellement 2 lancements PH/mois — ou peut grouper les lancements par vertical pour maximiser l'impact.

**Stratégie de lancement :** Espacer les lancements PH d'au moins 1-2 semaines pour maximiser le karma accumulation et la communauté entre chaque lancement. Ne pas lancer 2 produits la même semaine.

### 6.2 Ce qui s'améliore avec chaque lancement

| Élément | Lancement #1 | Lancement #3+ | Lancement #6+ |
|---------|-------------|---------------|---------------|
| Karma R et F sur PH | Faible | Fort (2+ lancements + karma cumulé) | Très fort |
| Communauté PH | 0 | Communauté croissante qui attend le prochain produit | Communauté fidèle |
| "Notify me" sur la ship page | Construit from scratch | Boosté par la communauté existante | Chaque lancement alimente le suivant |
| Maker comment | "Hey PH, we built..." | "Product #3. Same studio, new problem solved." | Série reconnue |
| Qualité des assets | Premier essai | Process rodé, templates réutilisables | Process < 2h |

### 6.3 Le positionnement studio sur PH

À partir du lancement #2, le maker comment mentionne systématiquement :
- Le numéro du produit ("Product #[X]")
- Le studio ("FoundryTwo — we're shipping 6 AI agents")
- Le portefeuille existant ("We've already shipped [X] products. Here's the next one.")

Ce positionnement est le même que sur IH — la cadence de production EST le contenu et le différenciateur.

---

## 7. PROFIL PH @FOUNDRYTWO

### 7.1 Configuration

| Champ | Valeur |
|-------|--------|
| **Handle** | @foundrytwo |
| **Nom** | FoundryTwo |
| **Avatar** | Logo F2 sur enclume |
| **Tagline profil** | SaaS studio. Two builders shipping 6 AI agents for e-com, agencies, and creators — in public. |
| **Website** | foundrytwo.com |
| **Twitter** | @foundrytwo |
| **Products** | Chaque SaaS est listé ici après son lancement |

### 7.2 Évolution du profil

| Milestone | Mise à jour |
|-----------|-------------|
| Chaque nouveau SaaS lancé | Ajouté dans Products. Tagline : "[X] AI agents shipped." |
| Badge PH obtenu | Afficher sur la landing page du produit |
| foundrytwo.com hub live | Vérifier que le lien website pointe vers foundrytwo.com |

---

## 8. CE QUE PH N'EST PAS — ANTI-PATTERNS

| Interdit | Pourquoi | Alternative |
|----------|----------|-------------|
| Utiliser PH comme canal de publication régulière | PH est un événement de lancement, pas un réseau social | Twitter/LinkedIn/IH pour la publication continue |
| Lancer un produit non fonctionnel (juste une landing page) | PH a durci les critères de featuring. Un produit fonctionnel est requis. | Attendre que le MVP soit live et stable |
| Demander des upvotes | PH monitore et pénalise. | Demander des visites et des commentaires |
| Mobiliser des comptes PH nouveaux | Quasi-zéro points dans l'algo. Peut déclencher le filtre anti-manipulation. | Mobiliser des comptes à haute karma |
| Ne pas répondre aux commentaires | Perte de vélocité + signal d'abandon | Répondre à CHAQUE commentaire en < 5 min |
| Lancer après 09:01 CET | -8.7% upvotes par heure de retard | Toujours lancer à 09:01 CET |
| Faire une vidéo trop "corporate" | PH valorise l'authenticité maker | Loom de 3-5 min, conversationnel |
| Lancer sans pre-launch | Pas de supporters → pas de vélocité → pas de featuring | 4-8 semaines de pre-launch minimum |
| Relancer le même produit < 6 mois | Interdit par PH sauf refonte majeure | Chaque SaaS = un nouveau lancement |

---

## 9. ALLOCATION DU TEMPS

PH n'a PAS d'allocation quotidienne comme les autres canaux. Le temps est concentré sur 3 périodes :

| Période | Durée | Temps R/semaine | Temps F/semaine |
|---------|-------|----------------|----------------|
| **Karma farming (continu)** | Continu entre les lancements | 15-20 min/semaine (upvotes + commentaires) | 10 min/semaine |
| **Pre-launch (S-4 à S-1)** | 4 semaines | 2-3h/semaine (assets, ship page, supporters, templates) | 30 min/semaine (inputs techniques) |
| **Launch day** | 1 jour | **Journée entière** (16h de disponibilité pour répondre aux commentaires) | Selon disponibilité F |
| **Post-launch (J+1 à J+7)** | 1 semaine | 1-2h (export contacts, retour d'expérience, onboarding) | 15 min (réponses techniques restantes) |

**Launch day est non-négociable.** R doit être disponible toute la journée. C'est le seul jour où PH prend la priorité sur tout le reste.

---

## 10. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Rôle | Statut |
|----------|-------------|------|--------|
| algo.md | growth-marketing/ph/ | Mécanique plateforme, points, featuring, timing | ✅ |
| growth-marketing/context.md | growth-marketing/ | Stratégie globale, matrice cross-plateforme, Build My Community | ✅ |
| marketing/context.md | marketing/ | Cold outreach process, planning R/F, funnel, comptes | ✅ |
| FOUNDRYTWO-BRAND-BIBLE.md | asset-brand/ | Identité, storytelling | ✅ |
| f2/context.md | growth-marketing/ph/f2/ | Configuration compte @foundrytwo PH | ✅ |
| f2/roadmap.md | growth-marketing/ph/f2/ | Planning PH par lancement | ✅ |
