# Objectifs Marketing FoundryTwo

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Focus StoreMD
> Hérite de : `strategie.md`

---

## 1. Objectif principal

**Faire de l'argent avec StoreMD le plus vite possible.**

Tout le reste (followers, vues, engagement, impressions, betas) est une donnée qui sert à comprendre ce qui marche, pas une fin en soi. Si on fait 1 000 followers TikTok mais zéro payeur, c'est un échec. Si on fait 50 followers et 5 payeurs, c'est un succès.

**Priorités, dans l'ordre** :
1. App acceptée Shopify
2. Premiers payeurs StoreMD
3. 10 beta-testeurs (pour signal et feedback). Si on n'arrive pas à 10, tant pis. On ne sacrifie pas la chasse aux payeurs pour la chasse aux betas.

---

## 2. Stratégie en 2 couches parallèles

On tourne en **double-couche** dès maintenant (cf. `../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`) :

| Couche | Angle | Période d'activation | Funnel |
|---|---|---|---|
| **Couche A — Vente directe** | "StoreMD trouve $X de leaks en 60 secondes sur votre store." Démo, résultats, signup. | Active maintenant à intensité moyenne. Vitesse supérieure dès acceptation Shopify. | Acquisition → installation payante |
| **Couche B — Recrutement beta** | "Beta dispo via lien spécial — install hors store." | Active maintenant. Se ferme dès qu'on a 10 betas qualifiés. Pas de pression hebdo. | Recrutement beta-testeurs |

**Lien spécial install hors store Shopify** : permet aux beta-testeurs d'installer StoreMD avant l'acceptation officielle.

Dès que l'app est acceptée Shopify : Couche B se réduit ou se ferme, Couche A monte en intensité maximale.

**Règle priorité** : si Couche B (beta) cannibalise Couche A (payeurs), on baisse l'intensité B sans hésiter. Les payeurs passent avant les betas.

---

## 3. Jalons (dans l'ordre)

| # | Jalon | Cible | Délai estimé |
|---|---|---|---|
| 1 | Première conversation privée avec un merchant qui montre intérêt | 1 conversation | Semaine 1 (post nettoyage repo) |
| 2 | Premier beta-testeur installé via lien spécial | 1 beta | Semaine 1-3 |
| 3 | StoreMD accepté sur Shopify App Store | App live store | En attente Shopify (en parallèle, indépendant) |
| 4 | **Premier payeur StoreMD** (post-acceptation, pricing public Shopify) | 1 payeur | Semaine 4-8 post-acceptation |
| 5 | 10 beta-testeurs StoreMD installés (objectif total, pas hebdo) | 10 betas | Quand ça vient — pas critique |
| 6 | 5 payeurs StoreMD (~150-300€ MRR selon plan) | 5 payeurs | Semaine 8-12 post-acceptation |
| 7 | ProfitPilot accepté Shopify (en parallèle) | App live | Semaine 3-4 post-soumission |
| 8 | 10 payeurs combinés StoreMD + ProfitPilot | 10 payeurs | Mois 3-4 |
| 9 | 500€ MRR portfolio | — | Mois 3-5 |
| 10 | 1 000€ MRR portfolio | — | Mois 5-7 |

**Estimations délais à recalibrer chaque semaine** au brainstorm vendredi/samedi en fonction des résultats réels.

---

## 4. KPIs d'activité hebdo (ce qu'on FAIT)

Mesurés chaque dimanche par JARVIS. Logs automatiques pendant la semaine.

| Action | Cible hebdo | Total semaine F+R |
|---|---:|---:|
| Vidéos TikTok publiées (recyclées Insta + FB) | 6 | 6 |
| Engagements groupes Facebook Shopify | 70/personne | 140 |
| Engagements Reddit groupes Shopify | 70/personne | 140 |
| Scans boutique + cold DM/commentaire avec résultats | 35/personne | 70 |
| Cold outreach Reddit/DM ciblés (problèmes réels) | 35-70/personne | 70-140 |
| Posts Twitter schedulés (façade fondateurs, double-couche A+B) | Variable selon couche active | ~20-26 |
| Posts LinkedIn schedulés (façade fondateurs, double-couche A+B) | Variable selon couche active | ~10-13 |
| Cross-engage Twitter/LinkedIn (F↔R, doublé en mode A+B) | 5/jour × 7 = 35 | 35-56 |

**Volumes Twitter/LinkedIn double-couche** : référence détaillée dans `../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2.1 et §2.2.

**Règle** : si on est à <70% des cibles d'activité 2 semaines de suite, on identifie le blocage au brainstorm vendredi et on ajuste — soit le volume cible (irréaliste ?) soit l'organisation.

---

## 5. KPIs de résultat (ce qu'on OBTIENT)

### 5.1 Sources de tracking

**Tout est centralisé dans le dashboard admin StoreMD** : `https://storemd.vercel.app/dashboard/admin` (visible uniquement par altidigitech@gmail.com).

Pipeline d'attribution end-to-end (cf. `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` §"Où ça atterrit") :
- **Capture** : `frontend/src/app/layout.tsx` charge le tracker `/tracking/pageview` avec `utm_*` en query params
- **Persistance** : `backend/app/api/routes/tracking.py` écrit dans `page_views`
- **Install attribution** : `backend/app/api/routes/auth.py` copie les UTM du state Redis vers `merchants.utm_*` au callback OAuth
- **Agrégation** : `backend/app/api/routes/admin.py::admin_analytics` produit `visits_by_source`, `visits_by_campaign`, et le funnel
- **Affichage** : `frontend/src/app/(dashboard)/dashboard/admin/analytics/page.tsx`

### 5.2 KPIs business — disponibles dans le dashboard admin

Mesurés en continu par le dashboard. JARVIS lit ces valeurs pour le rapport hebdo.

**Cartes KPI principales :**
- Total Merchants
- Total Scans (today / this week)
- Active Subscriptions (avg health score)
- **MRR (€)**
- Visits Today / This Week / This Month
- Unique Visitors Today
- Installs Today
- Conversion Rate (installs / unique visitors today)
- Email Leads (total / today / this week)

**Funnel (last 30 days) :**
1. Landing visits
2. CTA clicks
3. Install starts
4. Install completes
5. **Paid conversions**

**Tables détaillées :**
- Traffic by Source (30d) — visits + installs par `utm_source`
- Traffic by Campaign (30d) — visits + installs par `utm_campaign`
- Recent Merchants — email, plan, **utm_source**, domain, last score, created
- Recent Scans — domain, score, status, duration
- Preview Leads — email captured + score + issues
- Errors — webhook events

### 5.3 Cibles chiffrées StoreMD

| Métrique | Mois 1 | Mois 2 | Mois 3 | Source |
|---|---:|---:|---:|---|
| Landing visits | 200-500 | 800-2 000 | 2 000-5 000 | Dashboard admin / Funnel |
| Unique visitors | 150-400 | 600-1 500 | 1 500-3 500 | Dashboard admin |
| CTA clicks | 30-100 | 120-400 | 300-1 000 | Dashboard admin / Funnel |
| Install starts | 5-20 | 20-80 | 50-200 | Dashboard admin / Funnel |
| Install completes (= total merchants) | 1-10 | 5-25 | 15-50 | Dashboard admin |
| **Paid conversions** | 0 | 1-5 | 3-10 | Dashboard admin / Funnel |
| **MRR (€)** | 0 | 39-300 | 150-700 | Dashboard admin |
| Conversion rate (visits → install) | 0.5-2% | 1-4% | 2-5% | Dashboard admin |
| Email leads (preview captures) | 5-30 | 30-100 | 80-250 | Dashboard admin |
| Beta-testeurs via lien spécial (cumul, plafond 10) | 1-3 | 4-8 | 8-10 max | Dashboard admin (utm_source dédié) |

**Note** : ces fourchettes sont des hypothèses de démarrage à zéro audience. À recalibrer après 4 semaines avec les vrais chiffres.

### 5.4 Compte produit `@storemd` — métriques natives plateformes

Pas dans le dashboard StoreMD (ce sont les stats natives TikTok/Insta/FB). À récupérer manuellement ou via export.

| Métrique | Mois 1 | Mois 2 | Mois 3 | Source |
|---|---:|---:|---:|---|
| Followers TikTok | 100-300 | 500-1 000 | 1 500-3 000 | TikTok native |
| Followers Instagram | 50-150 | 200-500 | 500-1 200 | Instagram native |
| Likes page Facebook | 30-100 | 100-300 | 300-700 | Facebook Page Insights |

**Note** : les conversions de ces canaux remontent dans le dashboard admin StoreMD via `utm_source=tiktok`, `utm_source=instagram`, `utm_source=facebook` (cf. §6.1).

### 5.5 Façade fondateurs (LinkedIn / Twitter)

Volume bas, donc pas d'objectifs followers agressifs. On track juste pour vérifier que la façade tient.

| Métrique | Mois 3 | Pourquoi on track |
|---|---:|---|
| Followers Twitter F (@FabGangi) | 100-300 | Crédibilité builder |
| Followers Twitter R (@delgado_ro72224) | 100-300 | Crédibilité growth |
| Connexions LinkedIn F | 200-500 | Crédibilité builder |
| Connexions LinkedIn R | 200-500 | Crédibilité growth |

Les conversions de ces canaux remontent dans le dashboard admin via `utm_source=twitter` et `utm_source=linkedin`.

---

## 6. Métriques de compréhension (analytics et angles)

**Pas des objectifs. Des données qu'on track pour comprendre ce qui marche et ajuster les angles chaque semaine.**

JARVIS sort tout ça dans le rapport hebdo vendredi en croisant : dashboard admin StoreMD + stats natives plateformes + logs activité F+R.

### 6.1 Liens UTM — référence officielle

**Source de vérité unique** : `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` (12 sections, valeurs canoniques figées).

**Règle** :
1. Tout lien vers StoreMD utilise un lien du fichier UTM_TRACKING_LINKS.md.
2. Si un placement n'est pas listé dans le fichier → ajouter d'abord la ligne dans UTM_TRACKING_LINKS.md, puis utiliser.
3. Convention : `lowercase_snake_case` strict. Pas d'espaces, pas d'accents, pas de majuscules.
4. Valeurs canoniques fermées pour `utm_source`, `utm_medium`, `utm_campaign` (cf. §"Convention de nommage" du fichier UTM).

**Plateformes couvertes** : Twitter, LinkedIn, Reddit, TikTok, YouTube, Instagram, Facebook, Email, Product Hunt, Communautés (Shopify Community, IndieHackers, Hacker News, Dev.to), QR Code, Signature email.

**Génération de liens UTM par JARVIS** : à la demande dans le chat. JARVIS lit `UTM_TRACKING_LINKS.md` et fournit le lien exact pour le placement demandé.

### 6.2 Par vidéo TikTok / Insta / Facebook (stats natives plateforme)

| Métrique | Pourquoi on la regarde |
|---|---|
| Impressions / vues | Mesure du reach. Permet de voir si le hook fonctionne. |
| Vue moyenne (% de la vidéo regardée) | Indicateur clé : vidéo regardée à 80%+ = format qui marche |
| Likes, commentaires, partages | Engagement. Identifie les sujets qui font réagir. |
| Saves (TikTok/Insta) | Signal de valeur perçue. Très fort sur l'algorithme. |
| DM reçus suite à la vidéo | Signal de conversion qualifiée. À logger via JARVIS. |
| Profil → bio → clic lien | Funnel d'acquisition principal — visible dans dashboard admin StoreMD via `utm_medium=bio` |
| Clics description vidéo | Visible dans dashboard admin via `utm_medium=organic` + `utm_campaign=video` (TikTok) ou `utm_campaign=reels` (Insta) |

### 6.3 Par post Twitter / LinkedIn (stats natives plateforme)

| Métrique | Pourquoi on la regarde |
|---|---|
| Impressions | Visibilité du post (couche A vs couche B comparée) |
| Engagement rate (likes + replies + RT) | Quel angle fait réagir |
| Replies engagées par l'auteur (Twitter) | Signal le plus fort de l'algo. Pousse à répondre vite. |
| Clics lien | Visible dans dashboard admin via `utm_source=twitter`/`linkedin` + utm_campaign approprié |
| Saves / sends DM (LinkedIn) | Signal de valeur fort, sous-tracké |

### 6.4 Top et flop hebdo

JARVIS sort chaque vendredi (dashboard admin + stats natives plateformes) :
- **Top 3 contenus** de la semaine (toutes plateformes confondues, métrique principale = installs/paid_conversions, secondaire = engagement)
- **Flop 3 contenus** de la semaine (à analyser : pourquoi a foiré, format à abandonner ?)
- **Top 3 angles cold outreach** qui ont eu des réponses (logs JARVIS)
- **Top 3 sources UTM** (par visits ET par installs — dashboard admin tables `visits_by_source` et `visits_by_campaign`)

---

## 7. Comment on suit ça

### Logging continu

**Côté StoreMD (automatique, déjà en prod)** :
- `page_views` table : chaque visite avec UTM
- `merchants.utm_*` : UTM de l'install à l'OAuth callback
- Funnel agrégé 30j calculé en continu par admin_analytics
- Visible en temps réel sur `/dashboard/admin`

**Côté activité F+R (JARVIS, automatique sur mention chat)** :
- Cold outreach envoyés
- Engagements faits
- Publications
- Cross-engage
- Conversations privées qui avancent (via screenshot ou mention)
- Beta-testeurs qui installent via lien spécial (à intégrer dans JARVIS via pattern dédié)

**Côté plateformes sociales (manuel ou export)** :
- Stats natives TikTok / Instagram / Facebook / Twitter / LinkedIn
- À récupérer hebdo par F ou R, à fournir à JARVIS pour le rapport

### Rapport hebdo (vendredi, JARVIS génère)

JARVIS sort le rapport au début du brainstorm vendredi soir avec :
- **Volumes d'activité réalisés vs cibles** (couche A et couche B séparément, depuis logs JARVIS)
- **KPIs business StoreMD** (depuis dashboard admin) : MRR, paid conversions, installs, funnel 30j
- **Sources UTM gagnantes** (depuis dashboard admin tables `visits_by_source` et `visits_by_campaign`)
- **Métriques natives plateformes** (top/flop vidéos, posts engagement)
- **Conversations privées en cours**
- **Alertes Ouroboros** (incohérences, risques, opportunités détectées)

### Décisions au brainstorm

À partir du rapport, F+R décident :
- Quels angles vidéo on pousse / on arrête
- Quelles cibles cold outreach on priorise
- Si Couche B (beta) doit s'intensifier, se réduire, ou se fermer (10 betas atteints OU décision d'abandonner)
- Si Couche A (vente) doit monter en intensité (acceptation Shopify imminente ?)
- Si les volumes cibles sont à ajuster
- Si une source UTM sous-performe → arrêter d'y investir du temps
- Si une source UTM surperforme → doubler

---

## 8. Seuils de pivot — quand changer de cap

**Pas de jusqu'au-boutisme.** Si quelque chose ne marche pas, on l'identifie tôt et on bascule.

| Situation | Délai d'évaluation | Action si ça ne marche pas |
|---|---|---|
| Vidéos TikTok < 100 vues moyenne | 4 semaines (24 vidéos) | Changer le format, le ton, le hook. Brainstorm dédié. |
| 0 conversation privée qualifiée après 3 semaines | 3 semaines | Audit cold outreach. Le message ne déclenche rien → revoir les angles. |
| 0 beta-testeur installé après 6 semaines de Couche B active | 6 semaines | Question de fond : la cible répond-elle au beta ? Si non, fermer Couche B et tout sur Couche A vente directe. |
| 0 paid conversion (dashboard admin) après 12 semaines post-acceptation Shopify | 12 semaines | Question pricing. Question valeur perçue. Question fit produit/marché. Discussion sérieuse F+R. |
| Volume hebdo réalisé < 50% de la cible 3 semaines de suite | 3 semaines | Cibles trop ambitieuses ou organisation à revoir. Diviser par 2 si nécessaire. |
| Brainstorm vendredi devient un rituel vide | 4 semaines | Le système ne génère pas assez de signal. Augmenter le volume ou changer les canaux. |
| Couche B (beta) cannibalise Couche A (paid conversions) | 2 semaines après lancement A+B | Réduire l'intensité B. Les payeurs passent avant. |
| 10 betas atteints | — | Fermer Couche B. Tout sur Couche A. |
| Source UTM avec 0 visits après 4 semaines d'utilisation | 4 semaines | Abandonner ce canal. Pas la peine de continuer à tagger un canal qui ne convertit pas. |
| Conversion rate dashboard < 0.5% pendant 4 semaines | 4 semaines | Problème landing page. Audit conversion (CTA, copy, friction install). |

**Règle Buffett** : un échec rapide identifié vaut mieux qu'un succès théorique poursuivi pendant 6 mois.

---

## 9. Ce qu'on n'optimise PAS comme objectif final

Pour ne pas se disperser en métriques vanity. **On les TRACK** (cf. §6) mais on ne les fait pas grimper pour elles-mêmes.

- **Pas d'objectif "X impressions/semaine" comme but**. Les impressions servent à comprendre, pas à valider.
- **Pas d'objectif engagement rate sur Twitter/LinkedIn**. Canal de façade.
- **Pas d'objectif followers absolu** comme but en soi. Followers = moyen pour conversions, pas une fin.
- **Pas d'objectif sur IH/PH** hors launch days.
- **Pas d'objectif beta hebdo**. 10 au total quand ça vient. On ne sacrifie pas la chasse aux payeurs pour la chasse aux betas.
- **Pas d'objectif "scans totaux"**. Un scan sans install est juste un scan. Ce qui compte : install_completes et paid_conversions.

---

## Documents liés

- `strategie.md` — la stratégie qui produit ces objectifs
- `canaux/*.md` — détail par canal des actions qui alimentent les volumes
- `jarvis/*.md` — comment JARVIS log et produit le rapport hebdo
- `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — **source de vérité des liens UTM (officiel)**
- `../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — système couche A + couche B
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin` (altidigitech@gmail.com)
