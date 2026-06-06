# Marketing 

> Dernière mise à jour : 21/05/2026
> Statut : ACTIF
> Cible : merchants Shopify

---

## Qu'est-ce que ce dossier

Ce dossier contient **toute la stratégie marketing FoundryTwo** : qui fait quoi, sur quelle plateforme, avec quelle voix, à quelle cadence, et comment on mesure.

**Source de vérité unique** par sujet. Si tu trouves de la contradiction entre 2 fichiers, c'est qu'on a manqué le nettoyage. Signaler en revue hebdo.

**Cible client unique** : merchants Shopify. Tout le reste (cible, message, plateforme) découle de ça.

---

## Comment lire ce dossier

### Si tu découvres la structure (lecture séquentielle suggérée)

1. `strategie.md` — la stratégie globale (cible, levier, cadence, voix). Lecture obligatoire.
2. `objectifs.md` — KPIs, jalons, seuils de pivot. Comment on mesure.
3. `../la-toile/la-toile.md` — le schéma global qui réunit tout (33 fils détaillés avec UTM par fil).
4. Puis selon ton besoin opérationnel :
   - Tu vas poster sur une plateforme → `canaux/[plateforme]/context.md` (+ `algo.md` pour l'algorithme)
   - Tu produis du contenu → `contenu/pipeline-video.md` + `contenu/formats.md`
   - Tu prépares le batch hebdo → `contenu/batch-semaine/`
   - Tu travailles la distribution Shopify (cold, recherche, publication) → `saas-app-shopify/`
   - Tu utilises JARVIS → `jarvis/*.md`

### Si tu cherches une info précise

| Question | Fichier |
|---|---|
| "Quelle cadence sur TikTok ?" | `canaux/tiktok/context.md` |
| "Comment marche l'algo TikTok ?" | `canaux/tiktok/algo.md` |
| "Quel UTM mettre sur ce post ?" | `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` (officiel) |
| "Comment briefer JARVIS pour un batch ?" | `jarvis/prompts.md` |
| "Quel format pour ce commentaire ?" | `contenu/formats.md` |
| "Couche A et Couche B c'est quoi ?" | `strategie.md` §2 + `objectifs.md` §2 |
| "Quand activer un launch PH ?" | `canaux/ph/context.md` |
| "Quand activer IH ?" | `canaux/ih/context.md` |
| "Comment répondre à une critique du produit ?" | `jarvis/reponses-commentaires.md` |
| "Quelle voix utiliser pour @storemd ?" | `contenu/formats.md` |
| "Liste des objectifs et jalons" | `objectifs.md` |
| "Cold / recherche / publication StoreMD" | `saas-app-shopify/storemd/` |
| "Pipeline produits 2026" | `../la-toile/la-toile.md` |

---

## Arborescence

```
marketing/
├── README.md                           # ← ce fichier
├── strategie.md                        # stratégie globale
├── objectifs.md                        # KPIs, jalons, seuils de pivot
│
├── canaux/                             # détail opérationnel par canal (1 dossier/canal)
│   ├── facebook/                       # page produit @storemd + groupes Shopify perso F+R
│   │   ├── algo.md                     # algorithme de la plateforme
│   │   └── context.md                  # stratégie, usage, cadence, hooks, formats
│   ├── ih/                             # Indie Hackers (launch + posts milestones)
│   │   ├── algo.md
│   │   └── context.md
│   ├── instagram/                      # recyclage TikTok (compte produit @storemd)
│   │   ├── algo.md
│   │   └── context.md
│   ├── linkedin/                       # façade fondateurs F + R
│   │   ├── algo.md
│   │   └── context.md
│   ├── ph/                             # Product Hunt (launch days)
│   │   ├── algo.md
│   │   └── context.md
│   ├── reddit/                         # engagement perso F+R sur subreddits Shopify
│   │   ├── algo.md
│   │   └── context.md
│   ├── tiktok/                         # canal #1 acquisition (compte produit @storemd)
│   │   ├── algo.md
│   │   └── context.md
│   └── twitter/                        # façade fondateurs F + R + F2
│       ├── algo.md
│       └── context.md
│
├── contenu/                            # production de contenu
│   ├── batch-semaine/                  # batch hebdo (semaine courante + template)
│   │   ├── batch-semaine-S10.md
│   │   └── batch-template.md
│   ├── formats.md                      # référence transverse (matrice formats × canaux + voix par persona)
│   └── pipeline-video.md               # JARVIS + Claude Design + Remotion
│
├── jarvis/                             # protocoles d'utilisation JARVIS
│   ├── engagement-reddit-fb.md         # engagement actif sur posts d'AUTRES (Reddit + FB groupes)
│   ├── prompts.md                      # cookbook de prompts marketing
│   └── reponses-commentaires.md        # réponses aux commentaires sur NOS posts
│
├── saas-app-shopify/                   # distribution Shopify par produit (cold, recherche, publication)
│   ├── context.md                      # cadre du dossier
│   ├── hashtags.md                     # banque de hashtags
│   ├── recherche/                      # recherche de cibles (Chrome + Grok) + engagement
│   └── storemd/                        # cold, contexte, pipeline-conversion, publication StoreMD
│
└── archives/                           # archives vivantes des productions marketing hebdo
    ├── README.md                       # agent local archives
    └── batch-semaine/                  # batchs hebdo passés (S6, S7, S9)
```

---

## Description rapide de chaque fichier

### `strategie.md`

La stratégie globale. **Cible unique : merchants Shopify**. Trois leviers :
1. Compte produit `@storemd` (TikTok / Insta / FB) — acquisition principale
2. Engagement communautés (Reddit + groupes FB Shopify) — comptes perso F+R
3. Cold outreach scan boutique (DM avec vrais résultats) — levier le plus convertissant

Cycle hebdo : vendredi/samedi brainstorm → dimanche batch JARVIS → lundi-samedi exécution → dimanche repos.

### `objectifs.md`

KPIs business StoreMD (depuis dashboard admin `/dashboard/admin`) : MRR, paid conversions, install completes, funnel 30j. Volumes activité hebdo (vidéos, engagements, cold outreach). Jalons priorisés : acceptation Shopify > MRR > 10 betas. Seuils de pivot pour identifier les canaux qui ne convertissent pas.

### `canaux/` (1 dossier par canal)

Chaque canal est un **dossier** contenant deux fichiers :
- `algo.md` — l'algorithme objectif de la plateforme (données de recherche datées et sourcées)
- `context.md` — la stratégie d'usage : cadence, cold, publication, hooks, formats, métriques

Les 8 canaux :

- **`canaux/tiktok/`** — Canal #1 acquisition. Compte produit `@storemd`. Production via pipeline-video.md.
- **`canaux/instagram/`** — Recyclage TikTok (Reels). Compte produit `@storemd`. Stories pour Couche B beta, carousels pour saves.
- **`canaux/facebook/`** — Double rôle : (1) page produit `@storemd` recyclage Reels + (2) comptes perso F+R engagement dans groupes Shopify. Règle 80/20 stricte dans les groupes.
- **`canaux/reddit/`** — Comptes perso F+R sur r/shopify, r/ecommerce, r/entrepreneur. Karma building avant toute mention StoreMD. Cross-replies F↔R.
- **`canaux/twitter/`** — Façade fondateurs : @FabGangi (F) + @delgado_ro72224 (R). **Format 2-blocs OBLIGATOIRE** (lien dans corps = -1700% reach).
- **`canaux/linkedin/`** — Façade fondateurs : Fabrice Gangitano + Romain Delgado. **Profils perso = SEUL canal** (reach >> page company).
- **`canaux/ih/`** — Indie Hackers. Posts milestones (si milestone réel) + Show IH aux launches.
- **`canaux/ph/`** — Product Hunt. Protocole launch day, **uniquement aux launches**, jamais cadence continue.

### `contenu/pipeline-video.md`

Phase 1 (actuelle) : **JARVIS scripts + Claude Design visuels + Remotion montage**. Phase 2 (en construction par F) : pipeline AI vidéo end-to-end. Si fonctionnel → Wildcard SaaS potentiel.

### `contenu/formats.md`

Référence transverse. **Matrice formats × canaux** (qui utilise quoi). Voix par persona (4 personas : @storemd, F, R, F2). Sources de chiffres autorisées (BIBLE §3). Anti-patterns IA bannis.

### `contenu/batch-semaine/`

Le batch hebdo de contenu. `batch-template.md` = template + règles (horaires fixés §1, recyclage §7). `batch-semaine-S10.md` = batch de la semaine courante. Les batchs passés vont dans `archives/batch-semaine/`.

### `jarvis/reponses-commentaires.md`

Workflow standard de réponse aux commentaires sur NOS posts. Quand répondre / ignorer / block. Cas particuliers (demande démo, critique, troll, langue autre). Timing par plateforme (golden hour).

### `jarvis/engagement-reddit-fb.md`

Engagement ACTIF sur posts d'autres dans communautés (vs réponse passive sur nos posts). Workflow scan New/Rising → JARVIS analyse → variantes commentaire. **Règle 80/20 stricte**. Cold outreach scan boutique (levier 3, le plus convertissant).

### `jarvis/prompts.md`

Cookbook de prompts marketing à utiliser avec JARVIS. Templates : génération batch hebdo, scripts vidéo, posts Twitter/LinkedIn/Reddit, cold outreach, analyse threads, rapport hebdo.

### `saas-app-shopify/`

Distribution Shopify organisée par produit. Contient le cadre du dossier (`context.md`), la banque de hashtags, la recherche de cibles (`recherche/` — Chrome + Grok par plateforme, + engagement), et le dossier produit `storemd/` (cold, contexte produit/cold/publication, pipeline de conversion, batch de publication).

### `archives/`

Archives vivantes des productions marketing hebdo (batchs passés S6, S7, S9). README local = agent du dossier ; charte globale dans `../archives/README.md`.

---

## Concepts clés (glossaire)

### Couche A vs Couche B

Système de **double-couche** parallèle (cf. `strategie.md` §2 + `objectifs.md` §2) :

- **Couche A — Vente directe** : "StoreMD trouve $X de leaks en 60 secondes." Active maintenant intensité moyenne, vitesse maximale dès acceptation Shopify.
- **Couche B — Recrutement beta** : "Beta dispo via lien spécial — install hors store." Active jusqu'à atteindre 10 betas qualifiés, puis ferme.

**Règle priorité** : si Couche B cannibalise Couche A → réduire B. Les payeurs passent avant les betas.

### Façade fondateurs

Sur LinkedIn et Twitter, F (Fabrice) et R (Romain) ont des **rôles publics distincts** :
- F = builder (technique, code, infra)
- R = growth (business, conversion, growth marketing)

**Capacités réelles : F et R ont les mêmes capacités techniques.** La séparation builder/growth est une image publique pour la crédibilité — pas une vraie séparation des rôles. Le compte produit `@storemd` est invisible à F et R (compte produit pur).

### Compte produit vs comptes perso vs F2

| Type | Plateformes | Voix | Personnalisation |
|---|---|---|---|
| Compte produit `@storemd` | TikTok, Insta, FB Page | Neutre, factuel, pas de "I" / "we" | Aucune (ne montre pas F ni R) |
| Comptes perso F+R | Reddit, FB Groupes | Humain first-person | F builder / R growth |
| Comptes façade F+R | Twitter, LinkedIn | Humain personal branding | F builder / R growth |
| FoundryTwo (IH) | IndieHackers | Voix du SaaS promu | — |

### La Toile

Métaphore de la toile d'araignée. **Centre public** = `storemd.vercel.app`. **Centre interne** = dashboard admin StoreMD (`/dashboard/admin`). **33 fils** détaillés (un par chemin de capture) qui mènent tous au centre, chacun avec son UTM tagué. Aucun fil cassé toléré (compte inactif, lien sans UTM, bio orpheline = à corriger). Cf. `../la-toile/la-toile.md`.

### JARVIS

Cockpit cognitif du studio. URL `https://f2-jarvis.vercel.app`. Combine :
- Chat Claude Sonnet avec 9 outils repo
- 35 patterns naturels (logging auto)
- MemPalace (mémoire archive)
- Ouroboros (conscience de fond)
- Graphify (graphe connaissances)
- Générateur de batch hebdo

Manuel complet : `../JARVIS.md`.

### Dashboard admin StoreMD

`https://storemd.vercel.app/dashboard/admin` (visible altidigitech@gmail.com uniquement). KPIs business + funnel 30j + Traffic by Source/Campaign UTM + Recent Merchants + Preview Leads. **Source de vérité conversions** unique.

### Tracking UTM

`../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — fichier officiel, valeurs canoniques figées (`lowercase_snake_case`). **Source de vérité unique** pour tous les liens. Aucune invention de UTM en dehors. Si placement non listé → ajouter d'abord au fichier officiel, puis utiliser.

### Cycle hebdo

```
Vendredi soir + samedi soir : Brainstorm F+R (revue métriques, décisions)
Dimanche : JARVIS génère le batch hebdo (scripts vidéo, posts, cold outreach)
Lundi-samedi : Exécution
Dimanche : Repos
```

---

## Liens externes au dossier marketing/

| Fichier / lieu | Quoi |
|---|---|
| `../la-toile/la-toile.md` | Schéma global de la toile (33 fils + UTM par fil) |
| `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` | **Source de vérité UTM (officielle)** |
| `../produits/MUTATIONS.md` | Specs StoreMD + threads validés terrain (sources chiffres) |
| `../produits/NOUVEAUX.md` | ProfitPilot + ClientPulse + AdAudit + CreatorSuite + LeadQuiz + Wildcard |
| `../asset-brand/storemd/` | Assets visuels StoreMD (logos, carrousels, vidéos). Assets organisés par produit (storemd/, hokuno/, profipilote/). |
| `../JARVIS.md` | Manuel JARVIS complet (35 patterns, outils, Ouroboros, MemPalace) |
| `../BIBLE.md` §3 | Lignes rouges intégrité données |
| `../ANTI-IA.md` | Règles anti-detection IA |
| `../romain/VOIX.md` + `../fabrice/VOIX.md` | Voix par persona (filtre RÈGLE #0) |
| Dashboard admin StoreMD | `https://storemd.vercel.app/dashboard/admin` |
| JARVIS cockpit | `https://f2-jarvis.vercel.app` |

---

## Historique du dossier

- **21/05/2026** : Intégration de `saas-app-shopify/` dans `marketing/` (distribution Shopify). Mise à jour du README : arborescence (canaux en sous-dossiers algo+context, ajout `archives/`, `contenu/batch-semaine/`, `saas-app-shopify/`), correction des chemins archivés/déplacés.
- **29 avril 2026** : Grand nettoyage. ~8 098 lignes archivées. Cf. `../archives/2026/01-virages-strategiques/2026-04-29_grand-nettoyage/` pour le détail.
- **Avant 29 avril** : Structure produite par le comité d'IA Claude × Grok × GPT — usine à gaz inutilisable. Archivée.

---

## Quand mettre à jour ce dossier

| Quand | Action |
|---|---|
| Nouveau canal activé | Créer `canaux/[plateforme]/` (avec `algo.md` + `context.md`) + ajouter à la matrice formats × canaux |
| Nouveau SaaS lancé | Adapter `../la-toile/la-toile.md` + créer/activer le launch day (`canaux/ph/context.md`, `canaux/ih/context.md`) |
| Décision stratégique majeure | Mettre à jour `strategie.md` + reviewer `objectifs.md` |
| Pivot identifié au brainstorm | Mettre à jour le fichier concerné + logger la décision via JARVIS |
| Algo plateforme évolue | Mettre à jour `canaux/[plateforme]/algo.md` |
| Nouveau placement UTM | Ajouter d'abord à `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, puis référencer dans le fichier canal |

**Règle stricte** : 1 source de vérité par sujet. Pas de duplication de contenu entre fichiers — toujours référencer.
