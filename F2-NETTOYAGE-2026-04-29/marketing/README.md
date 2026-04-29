# Marketing FoundryTwo

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Structure post-nettoyage 29/04/2026
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
   - Tu vas poster sur une plateforme → `canaux/[plateforme].md`
   - Tu produis du contenu → `contenu/pipeline-video.md` + `contenu/formats.md`
   - Tu utilises JARVIS → `jarvis/*.md`

### Si tu cherches une info précise

| Question | Fichier |
|---|---|
| "Quelle cadence sur TikTok ?" | `canaux/tiktok.md` §3 |
| "Quel UTM mettre sur ce post ?" | `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` (officiel) |
| "Comment briefer JARVIS pour un batch ?" | `jarvis/prompts.md` §3 |
| "Quel format pour ce commentaire ?" | `contenu/formats.md` § matrice §2 |
| "Couche A et Couche B c'est quoi ?" | `strategie.md` §5 + `objectifs.md` §2 |
| "Quand activer un launch PH ?" | `canaux/launch-days.md` §1 |
| "Comment répondre à une critique du produit ?" | `jarvis/reponses-commentaires.md` §6.3 |
| "Quelle voix utiliser pour @storemd ?" | `contenu/formats.md` §9 |
| "Liste des objectifs et jalons" | `objectifs.md` §3 |
| "Pipeline produits 2026" | `../la-toile/la-toile.md` §10 |

---

## Arborescence

```
marketing/
├── README.md                           # ← ce fichier
├── strategie.md                        # stratégie globale
├── objectifs.md                        # KPIs, jalons, seuils de pivot
│
├── canaux/                             # détail opérationnel par canal
│   ├── tiktok.md                       # canal #1 acquisition (compte produit @storemd)
│   ├── instagram.md                    # recyclage TikTok (compte produit @storemd)
│   ├── facebook.md                     # page produit @storemd + groupes Shopify perso F+R
│   ├── reddit.md                       # engagement perso F+R sur subreddits Shopify
│   ├── twitter.md                      # façade fondateurs F + R + F2
│   ├── linkedin.md                     # façade fondateurs F + R + page F2 vitrine
│   └── launch-days.md                  # IH + PH + autres (ponctuels uniquement)
│
├── contenu/                            # production de contenu
│   ├── pipeline-video.md               # JARVIS + Claude Design + Remotion
│   └── formats.md                      # référence transverse (matrice formats × canaux + voix par persona)
│
└── jarvis/                             # protocoles d'utilisation JARVIS
    ├── reponses-commentaires.md        # réponses aux commentaires sur NOS posts
    ├── engagement-reddit-fb.md         # engagement actif sur posts d'AUTRES (Reddit + FB groupes)
    └── prompts.md                      # cookbook de prompts marketing
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

### `canaux/tiktok.md`

Canal #1 acquisition. Compte produit `@storemd`. Cadence 6 vidéos/sem (1/jour sauf dimanche). Algo TikTok 2026 (watch time, shares, saves). Format 15-45s. Hooks, captions, sous-titres. Production : pipeline-video.md.

### `canaux/instagram.md`

Recyclage TikTok (Reels). Compte produit `@storemd`. Algo Insta 2026 (4 systèmes : Feed/Reels/Stories/Explore). Stories pour Couche B beta. Carousels pour saves. Anti-watermark TikTok.

### `canaux/facebook.md`

**Double rôle** : (1) page produit `@storemd` recyclage Reels + (2) comptes perso F+R engagement dans groupes Shopify (Shopify Entrepreneurs, Ecommerce Entrepreneurs, Shopify Newbies). Règle 80/20 stricte dans les groupes.

### `canaux/reddit.md`

Comptes perso F+R sur r/shopify (340K+), r/ecommerce, r/entrepreneur. Karma building 4-6 sem avant toute mention StoreMD. Algo Reddit 2026 (engagement velocity, comment depth, account trust). Cross-replies F↔R.

### `canaux/twitter.md`

Façade fondateurs : @FabGangi (F builder) + @delgado_ro72224 (R growth) + @foundrytwo (F2 studio). **Format 2-blocs OBLIGATOIRE** (lien dans corps = -1700% reach). Algo Twitter 2026 (Grok ranking sémantique + table des poids : reply auteur 150× / negative -148×).

### `canaux/linkedin.md`

Façade fondateurs : Fabrice Gangitano + Romain Delgado + page FoundryTwo (vitrine statique). **Profils perso = SEUL canal** (561% reach plus que page company). Algo LinkedIn 2026 (Depth Score, LLM embeddings, golden hour 60 min, threads 5.2× amplification).

### `canaux/launch-days.md`

PH + IH + HN + Shopify Community + Dev.to **uniquement aux launches**, jamais cadence continue. Triggers : acceptation Shopify, premier payeur, milestones. Protocole 24h Product Hunt heure par heure. Show IH simultané. Posts milestones IH (1 tous les 2-4 sem si milestone réel).

### `contenu/pipeline-video.md`

Phase 1 (actuelle) : **JARVIS scripts + Claude Design visuels + Remotion montage**. ~2-3h/jour de production. Phase 2 (en construction par F) : pipeline AI vidéo end-to-end (~30 min/jour). Si fonctionnel → Wildcard SaaS potentiel.

### `contenu/formats.md`

Référence transverse. **Matrice formats × canaux** (qui utilise quoi). Voix par persona (4 personas : @storemd, F, R, F2). Sources de chiffres autorisées (BIBLE §3). Anti-patterns IA bannis.

### `jarvis/reponses-commentaires.md`

Workflow standard 4 étapes. Quand répondre / quand ignorer / quand block. 7 cas particuliers (demande démo, critique, troll, langue autre, etc.). Bonnes pratiques timing par plateforme (golden hour Twitter 30 min / LinkedIn 60 min).

### `jarvis/engagement-reddit-fb.md`

Différent du fichier précédent : engagement ACTIF sur posts d'autres dans communautés (vs réponse passive sur nos posts). Workflow scan New/Rising → JARVIS analyse → 1-2 variantes commentaire. **Règle 80/20 stricte**. Cold outreach scan boutique (levier 3, le plus convertissant).

### `jarvis/prompts.md`

Cookbook de prompts marketing à utiliser avec JARVIS. Templates pour : génération batch hebdo, scripts vidéo, posts Twitter/LinkedIn/Reddit, cold outreach, analyse threads, rapport hebdo vendredi.

---

## Concepts clés (glossaire)

### Couche A vs Couche B

Système de **double-couche** parallèle (cf. `../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`) :

- **Couche A — Vente directe** : "StoreMD trouve $X de leaks en 60 secondes." Active maintenant intensité moyenne, vitesse maximale dès acceptation Shopify.
- **Couche B — Recrutement beta** : "10 places beta, lien spécial install hors store." Active jusqu'à atteindre 10 betas, puis ferme.

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
| Compte studio F2 (`@foundrytwo`) | Twitter, LinkedIn Page, IH, PH | "We" pluriel, neutre | Studio identity |

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

`../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — fichier officiel, 12 sections plateformes, valeurs canoniques figées (`lowercase_snake_case`). **Source de vérité unique** pour tous les liens. Aucune invention de UTM en dehors. Si placement non listé → ajouter d'abord au fichier officiel, puis utiliser.

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
| `../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` | Règles batch + format 2-blocs Twitter |
| `../produits/MUTATIONS.md` | Specs StoreMD + 12 threads validés terrain (sources chiffres) |
| `../produits/NOUVEAUX.md` | ProfitPilot + ClientPulse + AdAudit + CreatorSuite + LeadQuiz + Wildcard |
| `../asset-brand/FOUNDRYTWO-BRAND-BIBLE.md` | Palette + identité visuelle |
| `../asset-brand/FOUNDRYTWO-LOGO-GUIDELINES.md` | Logos |
| `../JARVIS.md` | Manuel JARVIS complet (35 patterns, outils, Ouroboros, MemPalace) |
| `../BIBLE.md` §3 | Lignes rouges intégrité données |
| `../ANTI-IA.md` | Règles anti-detection IA |
| `../romain/VOIX.md` + `../fabrice/VOIX.md` | Voix par persona (filtre RÈGLE #0) |
| `../growth-marketing/{tiktok,linkedin,ih,ph,twitter}/algo.md` | Référence algorithme plateforme (détaillée) |
| Dashboard admin StoreMD | `https://storemd.vercel.app/dashboard/admin` |
| JARVIS cockpit | `https://f2-jarvis.vercel.app` |

---

## Historique du dossier

- **29 avril 2026** : Grand nettoyage. ~8 098 lignes archivées. Cf. `../archives/2026-04-29_grand-nettoyage/README.md` pour le détail.
- **Avant 29 avril** : Structure produite par le comité d'IA Claude × Grok × GPT — usine à gaz inutilisable. Archivée.

---

## Quand mettre à jour ce dossier

| Quand | Action |
|---|---|
| Nouveau canal activé | Créer `canaux/[plateforme].md` + ajouter à la matrice formats × canaux |
| Nouveau SaaS lancé | Adapter `../la-toile/la-toile.md` §10 + créer un launch day (`canaux/launch-days.md`) |
| Décision stratégique majeure | Mettre à jour `strategie.md` + reviewer `objectifs.md` |
| Pivot identifié au brainstorm | Mettre à jour le fichier concerné + logger la décision via JARVIS |
| Algo plateforme évolue | Mettre à jour `canaux/[plateforme].md` ou `growth-marketing/[plateforme]/algo.md` |
| Nouveau placement UTM | Ajouter d'abord à `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`, puis référencer dans le fichier canal |

**Règle stricte** : 1 source de vérité par sujet. Pas de duplication de contenu entre fichiers — toujours référencer.
