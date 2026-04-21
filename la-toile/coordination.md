# TOILE-COORDINATION.md — Plan de Coordination Opérationnel

> Dernière mise à jour : 05 avril 2026
> Version : 4.0 — Pivot distribution-first
> Dépend de : TOILE-CONTEXT.md + TOILE-ASSOCIES.md

---

## 1. RÔLES ET RESPONSABILITÉS

### 1.1 R (Romain) — Growth & Coordination Contenu

**R rédige les posts R perso + F2 studio. F rédige ses propres posts. Chacun publie aux horaires optimaux.** R garde la vue d'ensemble et s'assure que chaque branche dit la bonne chose au bon moment sans se marcher dessus.

**Possède** :
- La rédaction des posts F2 (Twitter, LinkedIn, TikTok, YouTube), ses posts R perso, les posts produits (marketing), ALTI
- La publication des comptes F2, ses comptes perso, les comptes produits (marketing), ALTI
- Les visuels, branding, logos (Canva, outils IA)
- La newsletter Forge Log (rédaction + envoi)
- Le support client (premier contact)
- La préparation des assets de chaque nouveau produit (pendant que F code)
- La distribution quotidienne (30 interactions + 10 outreach)
- Le growth (IH, PH, Reddit)

**Ne fait PAS** :
- Le code, le déploiement, la config technique
- La maintenance infra (Railway, Vercel, Supabase)
- La config Brevo (technique), le Google Sheet UTM, les analytics (installation)
- La facturation Henrri
- La rédaction des posts de F

### 1.2 F (Fabrice) — Builder & Distribution

**Possède** :
- 100% du code et du déploiement de tous les produits
- L'infrastructure : Railway, Vercel, Supabase, Stripe, Brevo (config technique)
- Le Google Sheet UTM (création et maintenance)
- Les analytics Plausible/Umami (installation, lecture, rapport vendredi)
- La config technique Brevo (séquences, webhooks)
- Les repos GitHub
- Le brief produit pour R (context.md du repo)
- La facturation Henrri
- La rédaction et publication de ses propres posts (F perso LinkedIn, Twitter)
- Les posts techniques des comptes produits
- La distribution quotidienne (30 interactions + 10 outreach)

**Contribue à** :
- Les inputs techniques pour le contenu F2 (données, screenshots, insights → R les transforme en posts F2)
- La relecture de la newsletter (lundi soir)

**Ne fait PAS** :
- La rédaction des posts F2 (c'est R)
- Les visuels
- La gestion des comptes TikTok/YouTube
- Le support client (sauf escalade technique)

### 1.3 Résumé : qui rédige, qui publie

| Compte | Rédigé par | Publié par | Heure de publication |
|---|---|---|---|
| F2 Twitter | R | R | 7h30-8h00 |
| F2 LinkedIn | R | R | 8h00-8h15 |
| F2 TikTok | R | R | ⏸ SUSPENDU — pipeline vidéo en construction (cf. f2/tiktok/context.md) |
| F LinkedIn perso | F | F | Flexible (horaire optimal FR) |
| F Twitter perso | F | F | Flexible (horaire optimal US) |
| R LinkedIn perso | R | R | Flexible (horaire optimal FR) |
| R Twitter perso | R | R | Flexible |
| Produit Twitter (marketing) | R | R | Flexible |
| Produit Twitter (technique) | F | F | Flexible |
| ALTI LinkedIn | R | R | Jeudi |
| Newsletter Forge Log | R (F relit lundi soir) | R | Mardi 8h00-10h00 |
| Emails transactionnels | Automatique (Brevo) | Auto | Auto |

---

## 2. LE CYCLE HEBDOMADAIRE

### 2.1 Vendredi soir — RÉUNION (ensemble, en personne, 18h-22h+)

**Étape 1 — Revue de la semaine (45 min)**

| Action | Responsable | Détail |
|---|---|---|
| Présenter les analytics | F | Plausible/Umami : visiteurs, signups, sources, UTM |
| Présenter les métriques sociales | R | Followers, engagement, top posts |
| Présenter le support | R | Nombre tickets, types, tendances |
| Présenter l'avancement dev | F | Où en est le SaaS en cours de code |
| Présenter l'avancement assets | R | Où en est la préparation du prochain lancement |
| Décision commune | F + R | Doubler sur ce qui marche, arrêter ce qui ne marche pas |

**Étape 2 — Décisions (30 min)**

- Ajustements contenu (quels angles marchent)
- Cadence comptes produits anciens (cas par cas selon résultats)
- Priorités produit (features, bugs, roadmap)
- Pricing si à ajuster
- Budget / dépenses à valider

**Étape 3 — Planning semaine suivante (15 min)**

- Événements source pour le contenu
- Deadlines assets R pour le prochain produit
- Urgences à traiter
- Alignement des angles F / R / F2 pour la semaine

**Étape 4 — Début du batch (1h+)**

F et R batchent le contenu de la semaine en parallèle :
- R rédige les posts F2 + ses posts R perso + posts produits marketing
- F rédige ses posts F perso + posts produits technique
- F fournit ses inputs techniques pour F2 (features buildées, données, screenshots)
- R transforme les inputs F en posts F2

---

### 2.2 Samedi soir — BATCH (ensemble, même pièce, 18h-21h)

| Heure | Durée | Activité | Qui |
|---|---|---|---|
| 18h00 | 1h30 | **FINALISER TOUS LES POSTS** | En parallèle |
| | | R : finit la rédaction posts F2 + ses posts R + posts produits marketing | R |
| | | F : finit ses posts F perso + posts produits technique + prépare les liens UTM | F |
| 19h30 | 30 min | **RELECTURE CROISÉE** | F + R |
| | | F relit les posts F2 pour l'exactitude technique | F |
| | | R relit les posts F pour la cohérence avec la stratégie globale | R |
| | | Ajustements si nécessaire | F + R |
| 20h00 | 30 min | **VISUELS + NEWSLETTER** | En parallèle |
| | | R : finalise tous les visuels (Canva, IA) | R |
| | | R : rédige le Forge Log | R |
| | | F : vérifie les liens UTM, met à jour le Sheet | F |
| 20h30 | 15 min | **VALIDATION FINALE** | F + R |
| | | TOUT le contenu de la semaine est prêt ? | |
| | | Liens UTM corrects ? | |
| | | Visuels prêts ? | |
| | | Newsletter prête à envoyer mardi 8h ? | |

**Livrable du samedi soir** : un dossier (Notion, Google Doc, ou simple note) avec TOUS les posts de la semaine, organisés par jour et par branche. F et R n'ont plus qu'à copier-coller toute la semaine.

---

### 2.3 Lundi à Jeudi — EXÉCUTION (copier-coller + engagement + distribution)

#### Calendrier semaine type

| Jour | R publie (F2 matin) | R publie (F2 LinkedIn) | R publie (R perso) | F publie (F perso) | R publie (produit/soir) | TikTok (⏸ SUSPENDU) |
|---|---|---|---|---|---|---|
| **Lundi** | F2 Twitter : build | F2 LinkedIn : build long | R LinkedIn : growth | F LinkedIn + F Twitter | Produit Twitter : tips | — |
| **Mardi** | F2 Twitter : engage/hot take | — | — | F LinkedIn + F Twitter | R Twitter : growth | ⏸ suspendu |
| **Mercredi** | F2 Twitter : insight | F2 LinkedIn : insight | R LinkedIn : growth | F LinkedIn + F Twitter | Produit Twitter : changelog | — |
| **Jeudi** | F2 Twitter : engage | — | R LinkedIn : growth | F LinkedIn + F Twitter | ALTI repost + Produit data | ⏸ suspendu |
| **Vendredi** | F2 Twitter : récap | F2 LinkedIn : récap | — | F LinkedIn : récap | — | — |
| **Samedi** | F2 Twitter : Forge Log | — | — | — | — | ⏸ suspendu |

**"Engage"** dans la colonne = liker + commenter les posts de l'autre branche. Pas juste un like. Un vrai commentaire de 1-2 lignes.

#### Horaires de publication — POURQUOI ces créneaux

| Créneau | Qui | Pourquoi |
|---|---|---|
| 7h30-8h30 CET | R | LinkedIn/Twitter : les pros scrollent au réveil. Meilleur reach. |
| Flexible (matin/midi) | F | F publie ses posts quand il est le plus efficace. Horaire optimal FR/US. |
| 18h-19h CET | R | TikTok : consommation mobile after-work. |
| Mardi 8h00-10h00 CET | R | Newsletter : meilleur taux d'ouverture email B2B. |

---

## 3. PROTOCOLE D'AMPLIFICATION

### 3.1 Quand F2 poste (7h30-8h, par R)

| Étape | Délai | Qui | Action |
|---|---|---|---|
| 1 | 7h30-8h | R | Publie le post F2 Twitter (+ LinkedIn si c'est le jour) |
| 2 | < 30 min | F | Like + commentaire substantiel (angle tech) sur le post F2 |
| 3 | < 30 min | R | Like + commentaire depuis son compte perso (angle marketing) |
| 4 | Dans l'heure | F + R | Répondre aux commentaires tiers sur le post F2 |

**Full-time = amplification quasi-immédiate.** Pas de délai CDI/job. F et R sont disponibles pour engager dans les 30 minutes.

### 3.2 Quand F poste

| Étape | Délai | Qui | Action |
|---|---|---|---|
| 1 | — | F | Publie (copier-coller du batch) |
| 2 | < 30 min | R | Like + commentaire (angle business/growth) |
| 3 | Dans l'heure | F + R | Répondre aux commentaires |

### 3.3 Quand R poste ses posts perso

| Étape | Délai | Qui | Action |
|---|---|---|---|
| 1 | — | R | Publication |
| 2 | < 30 min | F | Like + commentaire (angle tech) |

### 3.4 Quand le compte Produit poste

| Étape | Délai | Qui | Action |
|---|---|---|---|
| 1 | — | R (marketing) ou F (technique) | Publie le post produit |
| 2 | < 15 min | F2 | R retweet/repost depuis F2 |
| 3 | < 30 min | L'autre | Like + commentaire perso si pertinent |

### 3.5 Règles de commentaire

Un bon commentaire d'amplification :
- Ajoute une info ou un angle que le post n'a pas
- Fait au moins 1-2 phrases
- Pose une question ou invite au débat (l'algo aime les threads)
- Ne répète PAS le contenu du post

---

## 4. WORKFLOW DE CRÉATION DE CONTENU

### Le pipeline complet

```
ÉTAPE 1 — CAPTURE (lundi-jeudi, en continu)
├── F note chaque décision technique, bug résolu, feature shippée, donnée intéressante
├── R note chaque résultat marketing, feedback user, idée de contenu, tendance
├── Les deux envoient leurs notes dans le canal tracé (WhatsApp) ou gardent en note perso
└── Objectif : ne jamais perdre un événement source

ÉTAPE 2 — INPUT (vendredi soir, pendant la réunion)
├── F expose ses inputs techniques de la semaine à R
├── R identifie les 3-5 événements source les plus intéressants
└── F et R décident ensemble quels angles pour chaque branche

ÉTAPE 3 — RÉDACTION (vendredi soir + samedi soir = batch)
├── R rédige les posts F2 + ses posts R perso + posts produits marketing
├── F rédige ses posts F perso + posts produits technique
├── R crée les visuels
├── R prépare la newsletter
├── F fournit les derniers screenshots/données
└── Relecture croisée (F valide technique F2, R valide cohérence F)

ÉTAPE 4 — PUBLICATION (lundi-samedi, copier-coller)
├── R publie : F2 Twitter, F2 LinkedIn, R perso, produits marketing, TikTok, ALTI
├── F publie : F perso LinkedIn, F perso Twitter, produits technique
└── Engagement croisé dans les 30 min après chaque publication

ÉTAPE 5 — MESURE (vendredi soir suivant)
├── F présente les analytics
├── R présente les métriques sociales
└── Ajustement de la stratégie
```

### 4.1 Le dossier batch

Après chaque batch (samedi soir), il existe un document/note avec :

```
SEMAINE DU [date] AU [date]

=== LUNDI ===

F2 TWITTER (R publie 7h30) :
[texte exact du post]
[visuel : nom du fichier]
[lien UTM : copié du Sheet]

F2 LINKEDIN (R publie 8h00) :
[texte exact du post]
COMMENTAIRE #1 (R poste immédiatement) : [lien UTM]

R LINKEDIN (R publie, horaire optimal) :
[texte exact du post]

F LINKEDIN (F publie, horaire optimal) :
[texte exact du post]
COMMENTAIRE #1 (F poste immédiatement) : [lien UTM]

F TWITTER (F publie, horaire optimal) :
[texte exact du tweet]

PRODUIT TWITTER (R publie, marketing) :
[texte exact du tweet]

=== MARDI ===
[...]

=== NEWSLETTER (R envoie mardi 8h00) ===
Objet : "Forge Log #[X] — [titre]"
[texte complet]
```

F et R n'ont plus qu'à ouvrir ce document chaque jour et copier-coller. Zéro réflexion en semaine. Toute la réflexion a eu lieu vendredi/samedi.

### 4.2 Comment F fournit ses inputs à R

Pendant la réunion du vendredi, F donne à R :

| Type d'input | Exemple |
|---|---|
| Feature buildée | "J'ai terminé ProfitPilot cette semaine — analyse de rentabilité automatisée" |
| Données techniques | "StoreMD fait 47 audits/jour, le temps moyen est de 38s" |
| Architecture | "J'ai migré la queue Celery vers Redis Streams, voici pourquoi" |
| Bug résolu intéressant | "Un race condition sur les analyses concurrentes, voici comment j'ai fix" |
| Screenshot / screencast | Envoie les fichiers à R |
| Opinion technique tranchée | "Les agents IA sont overhyped pour l'e-com, voici pourquoi" |

R prend ces inputs et les transforme en posts F2 :
- Input "ProfitPilot terminé" → Post F2 "We shipped ProfitPilot — automated profitability analysis for e-com"
- Input "opinion agents IA" → Tweet F2 hot take

F prend ces mêmes inputs et rédige ses propres posts :
- Input "ProfitPilot terminé" → Post F LinkedIn "Comment j'ai architecturé l'analyse de rentabilité automatisée"
- Input "opinion agents IA" → Tweet F "AI agents in e-com — here's what actually works"

---

## 5. FORMAT DE CONTENU PAR PLATEFORME

### Twitter (tous comptes)

| Élément | Règle |
|---|---|
| Longueur | 1-3 tweets max. Thread rare (lancements). |
| Première ligne | = le hook. |
| Hashtags | 1-2 max. #buildinpublic #indiehackers #SaaS |
| Visuels | Screenshot > image > texte seul |
| Liens | En reply (Twitter pénalise les liens dans le tweet principal) |
| CTA | "Link in reply" ou implicite (bio → lien) |

### LinkedIn (tous comptes)

| Élément | Règle |
|---|---|
| Longueur | 800-1500 caractères. |
| Première ligne | = le hook (seules les 2 premières lignes sont visibles). |
| Format | Sauts de ligne fréquents. Phrases courtes. |
| Visuels | Carousel (PDF) > image > vidéo > texte seul |
| Liens | JAMAIS dans le post. Commentaire #1. |
| Hashtags | 3-5 en fin de post |
| F (FR) | Tonalité technique, première personne, "je" |
| R (FR/EN) | Tonalité stratégique, résultats, chiffres |
| F2 (EN) | Tonalité studio, "we", vocabulaire forge dosé |

### TikTok (F2)

| Élément | Règle |
|---|---|
| Durée | 30-60s |
| Format | Vertical. Face caméra OU screencast + voix off OU avatar animé. |
| Hook | 3 premières secondes décident tout |
| Sous-titres | OBLIGATOIRES |
| CTA | "Follow @foundrytwo" ou "Link in bio" |

### Newsletter (Forge Log)

| Élément | Règle |
|---|---|
| Fréquence | Hebdo, mardi 8h00 |
| Longueur | < 500 mots |
| Structure | 1) Ce qu'on a build 2) Une leçon 3) Un lien utile 4) CTA produit |
| From | hello@foundrytwo.com |
| Objet | "Forge Log #[X] — [titre accrocheur]" |

---

## 6. GESTION DES PROFILS ET BIOS

### Checklist liens croisés par profil

| Profil | Lien principal (bio) | Mentions textuelles |
|---|---|---|
| F2 Twitter | foundrytwo.com OU produit du moment (UTM) | @FabGangi + @[R] dans pinned tweet |
| F2 LinkedIn | foundrytwo.com | Produits dans description |
| F2 TikTok | foundrytwo.com OU produit du moment (UTM) | "AI SaaS studio" |
| F LinkedIn | altidigitech.com OU foundrytwo.com (UTM) | "Co-fondateur @FoundryTwo" + Malt en services |
| F Twitter | foundrytwo.com (UTM) | "@foundrytwo co-founder" |
| R LinkedIn | foundrytwo.com (UTM) | "Co-fondateur @FoundryTwo" |
| R Twitter | foundrytwo.com (UTM) | "@foundrytwo co-founder" |
| Produit Twitter | [produit].tech (UTM) | "Built by @foundrytwo" |
| ALTI LinkedIn | altidigitech.com | Mention F2 + produits |
| Malt | altidigitech.com | Mention F2, produits en portfolio |

---

## 7. GESTION DES UTM

### Structure du Google Sheet

| Colonne | Exemple |
|---|---|
| Source (nœud qui poste) | F2 Twitter |
| Destination | storemd.io |
| utm_source | twitter |
| utm_medium | social |
| utm_campaign | launch |
| utm_content | f2_post |
| Lien complet | storemd.io?utm_source=twitter&utm_medium=social&utm_campaign=launch&utm_content=f2_post |

### Processus

1. F crée tous les liens UTM dans le Sheet
2. Pendant le batch, R et F copient les bons liens depuis le Sheet pour chaque post
3. Les liens sont intégrés dans le dossier batch de la semaine
4. F et R copient les liens directement depuis le dossier batch (pas besoin de retourner au Sheet en semaine)

---

## 8. GESTION DE L'EMAIL

### Séquence type par SaaS (automatique)

> Séquence LD ci-dessous — à adapter pour chaque nouveau SaaS. Voir `../produits/` pour les specs des 6 SaaS.

| Email | Timing | Objet | CTA |
|---|---|---|---|
| Bienvenue | Immédiat | "Welcome to [Produit]" | "Start using [feature principale]" |
| Tips | J+3 | "3 [problème cible] most [audience] have" | "Try [Produit] now" |
| Upgrade | J+7 | "You've used X of your Y free [unité]" | "Upgrade to Pro" |
| Forge Log | J+14 + hebdo | "Forge Log #X — [titre]" | Produit + F2 |

### Newsletter Forge Log

| Étape | Qui | Quand |
|---|---|---|
| Sélectionner le contenu | R | Vendredi soir (réunion) |
| Rédiger | R | Samedi soir (batch) |
| F relit (exactitude technique) | F | Lundi soir |
| Charger dans Brevo + vérifier liens | R | Lundi soir ou mardi matin |
| Envoyer | R | Mardi 8h00 |

---

## 9. PROTOCOLE DE LANCEMENT D'UN NOUVEAU PRODUIT

Chaque SaaS suit le même playbook. Chacun rédige et publie ses propres posts.

### Pré-lancement (1-2 semaines avant)

| Jour | Action | Responsable |
|---|---|---|
| J-14 | Réserver handles Twitter + LinkedIn | R |
| J-14 | Acheter le nom de domaine | F |
| J-14 | Créer les liens UTM dans le Sheet | F |
| J-12 | Créer logo + visuels de marque | R |
| J-10 | Configurer séquence email Brevo | F |
| J-10 | Ajouter cross-sell sur les produits existants | F |
| J-7 | Remplir profils sociaux du produit | R |
| J-7 | Teasing F2 : "Something's coming..." (R rédige, R publie) | R |
| J-5 | Teasing perso : F rédige et publie le sien, R rédige et publie le sien | F + R |
| J-3 | Batcher TOUT le contenu de lancement | F + R (chacun ses posts) |
| J-1 | "Tomorrow." (F2 + F + R, chacun rédige et publie) | F + R |
| J-1 | Vérification finale technique | F |

### Exemples teasing par vertical

| Vertical | Teasing F2 | Teasing F | Teasing R |
|---|---|---|---|
| M1 E-com | "E-com founders lose $X/month to chargebacks. We built something about it." | "J'ai codé un système de détection de chargebacks en 10 jours. Voici l'archi." | "Les chargebacks coûtent $X/an aux e-commerçants. Demain on lance la solution." |
| M2 Agencies | "Agencies track client ROI in spreadsheets. That ends next week." | "J'ai automatisé le reporting client pour les agences. Stack technique inside." | "Les agences perdent 5h/semaine en reporting manuel. On a une meilleure idée." |
| M3 Creators | "Creators need leads, not just followers. We're building the bridge." | "Quiz funnels pour creators — voici comment j'ai architecturé LeadQuiz." | "Les creators avec 100K followers et 0 leads. On change ça." |

### Post-lancement

Voir TOILE-ROADMAP.md.

---

## 10. PROCESSUS MALT

### Après chaque mission

| Étape | Délai | Action |
|---|---|---|
| 1 | Jour livraison | F demande un avis 5★ |
| 2 | J+3 | F rédige un post "étude de cas" pour F LinkedIn |
| 3 | J+3 | F publie le post |
| 4 | J+5 | R adapte en post F2 Twitter (EN) si pertinent |
| 5 | J+7 | R intègre dans la newsletter si pertinent |

---

## 11. GESTION DES INCIDENTS

| Situation | Action |
|---|---|
| F ou R indisponible temporairement | L'autre prend en charge les publications critiques (F2 minimum). Les posts perso sautent. |
| Les deux indisponibles | Les posts pré-batchés peuvent être programmés via un outil de scheduling si nécessaire. Sinon silence (mieux que du mauvais contenu). |
| Bug critique jour de lancement | F fixe en priorité. R continue le contenu social normalement. F2 post transparent "We're fixing an issue." |
| R surchargé par le support | Mettre en place FAQ + chatbot. F prend temporairement les posts techniques des comptes produits. |

---

## 12. REVUE HEBDOMADAIRE — TEMPLATE (vendredi soir)

```
REVUE SEMAINE [DATE]

MÉTRIQUES :
- Visiteurs par site : [par produit]
- Signups : [par produit] (sem. précédente : [Y])
- Clients payants : [X]
- Top source UTM : [source] ([X] visiteurs)
- Followers gagnés : LinkedIn F [X], LinkedIn R [X], Twitter F2 [X], TikTok F2 [X]
- Newsletter : [X] inscrits, ouverture [X]%
- Distribution : interactions F [X], interactions R [X], outreach F [X], outreach R [X]

TOP CONTENU :
- Meilleur post F2 : [lien] ([X] impressions)
- Meilleur post F : [lien]
- Meilleur post R : [lien]

SUPPORT :
- Tickets cette semaine : [X]
- Bugs remontés : [X]
- Feature requests : [X]

DEV :
- SaaS en cours : [nom] — avancement [X]%
- Bugs fixés : [X]
- Vertical en cours : [M1/M2/M3]

ASSETS PROCHAIN PRODUIT :
- Branding : [done/en cours/pas commencé]
- Copy landing : [done/en cours/pas commencé]
- Product Hunt : [done/en cours/pas commencé]

DÉCISIONS :
- Doubler sur : [...]
- Arrêter : [...]
- Tester : [...]

ÉVÉNEMENTS SOURCE POUR LA SEMAINE :
1. [...]
2. [...]
3. [...]
```

---

## 13. LE PREMIER MOIS — MISE EN PLACE

Le premier mois sera plus lent. C'est normal. Le système se met en place. Voici ce qui sera rodé et ce qui prendra du temps :

| Ce qui sera fluide dès le début | Ce qui prendra 2-3 semaines à roder |
|---|---|
| Les publications copier-coller | F trouver son rythme de rédaction perso |
| L'engagement croisé | Le format du dossier batch (trouver ce qui est pratique) |
| La réunion du vendredi | Le timing exact de chaque tâche |
| La distribution (30+10) | Les bons angles par personne par branche |
| La coordination F2 / F / R | L'estimation du temps pour les visuels |

**Règle** : le premier mois, on accepte que tout ne soit pas parfait. On ajuste chaque vendredi. À la fin du mois 1, le système tourne comme une montre suisse.

---

## 14. GLOSSAIRE

| Terme | Définition |
|---|---|
| Batch | Session de préparation de contenu (vendredi/samedi soir). TOUT est créé à l'avance. |
| Dossier batch | Le document qui contient TOUS les posts de la semaine, prêts à copier-coller. |
| Amplification | Engagement croisé (like, commentaire, repost) entre les nœuds. |
| Événement source | Quelque chose qui se passe et qui devient du contenu. |
| Input technique | Données, screenshots, explications que F fournit à R pour qu'il rédige les posts F2. |
| Distribution | 30 interactions + 10 outreach par jour par personne. Volumes cibles. |
| Nœud | Un point de la toile (compte social, site, produit, canal). |
| UTM | Paramètres de tracking dans les liens. |
| Forge Log | Newsletter hebdomadaire F2. |
| Cross-sell | Mention d'un autre produit F2 depuis un premier produit. |
| Advocacy | Transformation d'un user satisfait en ambassadeur. |
| Hook | Première ligne d'un post. |
| CTA | Call to action. |
| Vertical | Groupe de 3 SaaS ciblant le même marché (M1 E-com, M2 Agencies, M3 Creators). |
| `produits/` | Dossier racine contenant STATUS.md, NOUVEAUX.md, MUTATIONS.md — source de vérité produits. |
| `strategie/` | Dossier racine contenant CONTEXT.md, PLAYBOOK-DISTRIBUTION.md, WARMING-FARMING.md, verticals/ — source de vérité stratégique post-pivot. |
