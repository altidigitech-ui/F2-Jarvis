# Archive — Grand nettoyage du 29 avril 2026

> Statut : ARCHIVE
> Date du nettoyage : 29 avril 2026
> Auteur de la décision : Fabrice + Romain

---

## Pourquoi ce nettoyage

Avant le 29 avril 2026, la stratégie marketing FoundryTwo avait été produite par un **comité d'IA** (Claude × Grok × GPT) et empilait des cadres conceptuels successifs sans jamais les supprimer. Résultat : ~11 000 lignes de markdown réparties sur des dizaines de fichiers, avec :

- **3 sources de vérité contradictoires** sur la même stratégie
- Des concepts du genre "12 commandements", "8 nœuds × 3 flux", "matrice de maillage" — utilisables par un humain : zéro
- Une cible client mal définie : "indie hackers, freelances, créateurs, agences, founders, merchants" — donc personne en pratique
- Un modèle B2C / B2B / Freelance / Malt qui ne reflétait pas la réalité du studio
- Des règles obsolètes ("R rédige TOUT", "TikTok suspendu", références à NFLIX.io abandonné)
- Des inventions ("UTM Google Sheet" alors que `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` existe officiellement, "Email Brevo / Forge Log" jamais activés)

Le 29 avril, F+R ont décidé de **tout repartir à zéro** sur des bases simples basées sur l'intuition métier réelle :

- **Cible unique** : merchants Shopify
- **Canaux d'acquisition principaux** : compte produit `@storemd` sur TikTok / Instagram / Facebook (recyclage croisé)
- **Engagement perso F+R** : Reddit + groupes Facebook Shopify
- **Façade fondateurs** : LinkedIn + Twitter (volume bas, crédibilité)
- **Tracking centralisé** : dashboard admin StoreMD existant + UTM officiels
- **JARVIS** comme nœud cognitif central
- **Stratégie adaptative chaque semaine** au brainstorm vendredi/samedi

La nouvelle structure tient en **18 fichiers** (~5 000 lignes) au lieu de 11 000+ lignes étalées.

---

## Ce qui a été archivé

### A. Dossier `la-toile/` (ancien)

Remplacé par : `la-toile/la-toile.md` (un seul fichier, 192 lignes, métaphore toile d'araignée restaurée avec 33 fils détaillés et UTM par fil).

| Fichier ancien | Lignes | Pourquoi archivé |
|---|---|---|
| `la-toile/README.md` | 97 | Concept usine à gaz, cible obsolète |
| `la-toile/TOILE-ASSOCI#U00c9S.md` | 711 | Liste d'associés obsolète, modèle B2B/freelance abandonné |
| `la-toile/context.md` | 383 | "12 commandements", concepts inutilisables |
| `la-toile/coordination.md` | 570 | Coordination sur ancienne stratégie |
| `la-toile/roadmap.md` | 293 | Roadmap obsolète (mentions NFLIX, vieux SaaS) |
| `la-toile/LA-TOILE-v3.1-Complete.docx` | — | Schéma daté de la v3.1 |
| `la-toile/toile-schema-v3.1.png` | — | Schéma obsolète : PayloadDiff, Email Brevo, R rédige TOUT, B2C/B2B/Freelance |

**Total archivé** : ~2 054 lignes + 2 fichiers binaires.

### B. Dossier `marketing/` (ancien)

Remplacé par la nouvelle structure `marketing/` (15 fichiers organisés en `canaux/`, `contenu/`, `jarvis/`).

| Fichier ancien | Lignes | Pourquoi archivé |
|---|---|---|
| `marketing/README.md` | 27 | Pointait vers structure obsolète |
| `marketing/context.md` | 310 | Stratégie marketing globale obsolète |
| `marketing/roadmap.md` | 265 | Roadmap basée sur cible obsolète |

**Total archivé** : ~602 lignes.

### C. Dossier `growth-marketing/strategie/` (ancien)

Stratégie historique produite par le comité d'IA. **Tout archivé.**

| Fichier ancien | Lignes | Pourquoi archivé |
|---|---|---|
| `growth-marketing/strategie/audit-explosion-marketing-v2.md` | 709 | Audit basé sur ancienne cible et anciens objectifs |
| `growth-marketing/strategie/recherche-comptes-produit-studio-FR.md` | 93 | Recherche obsolète (compte produit a été décidé : `@storemd`) |
| `growth-marketing/strategie/strategie-expansion-generale.md` | 759 | Stratégie d'expansion obsolète |
| `growth-marketing/strategie/strategie-ih.md` | 505 | Stratégie IH historique remplacée par `marketing/canaux/launch-days.md` (synthèse actionnable) |
| `growth-marketing/strategie/strategie-linkedin.md` | 1 277 | Stratégie LinkedIn historique remplacée par `marketing/canaux/linkedin.md` |
| `growth-marketing/strategie/strategie-ph.md` | 531 | Stratégie PH historique remplacée par `marketing/canaux/launch-days.md` |
| `growth-marketing/strategie/strategie-twitter.md` | 647 | Stratégie Twitter historique remplacée par `marketing/canaux/twitter.md` |

**Total archivé** : ~4 521 lignes.

### D. Fichiers `growth-marketing/` racine

| Fichier ancien | Lignes | Pourquoi archivé |
|---|---|---|
| `growth-marketing/README.md` | 177 | Pointait vers structure obsolète |
| `growth-marketing/context.md` | 470 | Cadre marketing global obsolète (cible indie hackers / freelancers / creators) |
| `growth-marketing/roadmap.md` | 244 | Roadmap basée sur cible obsolète |
| `growth-marketing/tiktok/context.md` | 30 | Statut "TikTok suspendu" — obsolète, TikTok est maintenant canal #1 |

**Total archivé** : ~921 lignes.

### Total archivé

**Environ 8 098 lignes de markdown + 2 fichiers binaires** (docx + png).

---

## Ce qui n'est PAS archivé (volontairement gardé dans le repo)

### A. `growth-marketing/{tiktok,linkedin,ih,ph,twitter}/algo.md`

Référence pure de l'algorithme plateforme (pas de la stratégie). Sources web, recherches détaillées (1 500+ lignes au total). Référencé depuis les nouveaux fichiers `marketing/canaux/*.md` :
- `growth-marketing/twitter/algo.md` (286 lignes) → cité dans `marketing/canaux/twitter.md`
- `growth-marketing/linkedin/algo.md` (332 lignes) → cité dans `marketing/canaux/linkedin.md`
- `growth-marketing/ih/algo.md` (280 lignes) → cité dans `marketing/canaux/launch-days.md`
- `growth-marketing/ph/algo.md` (381 lignes) → cité dans `marketing/canaux/launch-days.md`
- `growth-marketing/tiktok/algo.md` (1 ligne, vide) → à compléter ou supprimer plus tard

### B. `growth-marketing/{linkedin,ih,ph,twitter}/context.md`

Règles plateforme (combine algo + tactiques opérationnelles). Référencé depuis les nouveaux fichiers canaux comme source détaillée. À reviewer plus tard pour décider quoi garder vs réécrire (potentiel grand nettoyage v2).

### C. Tout le reste du repo

Le grand nettoyage du 29 avril ne concerne **que la couche marketing/strategie**. Le reste reste inchangé :
- `produits/` (specs SaaS — MUTATIONS.md, NOUVEAUX.md, etc.)
- `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` (source de vérité UTM officielle)
- `asset-brand/` (brand bible + logo guidelines)
- `BIBLE.md` (lignes rouges)
- `ANTI-IA.md` (filtre obligatoire)
- `JARVIS.md` (manuel JARVIS)
- `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`
- `romain/` + `fabrice/` + `f2/` (personas + voix + posts existants)
- `brain/` (MemPalace + cognitive systems)
- `distribution/` (playbook)
- `strategie/` (verticals research)
- Tous les scripts, workflows, etc.

---

## Nouvelle structure (16 fichiers)

```
la-toile/
└── la-toile.md              # 192 lignes — schéma global toile d'araignée

marketing/
├── README.md                # à venir (fichier 18/18)
├── strategie.md             # ✅ stratégie complète
├── objectifs.md             # ✅ KPIs, jalons, seuils de pivot
├── canaux/
│   ├── tiktok.md            # ✅ canal #1 acquisition
│   ├── instagram.md         # ✅ recyclage TikTok
│   ├── facebook.md          # ✅ page produit + groupes Shopify
│   ├── reddit.md            # ✅ engagement perso F+R
│   ├── twitter.md           # ✅ façade fondateurs
│   ├── linkedin.md          # ✅ façade fondateurs
│   └── launch-days.md       # ✅ IH + PH ponctuels
├── contenu/
│   ├── pipeline-video.md    # ✅ JARVIS + Claude Design + Remotion
│   └── formats.md           # ✅ référence transverse formats
└── jarvis/
    ├── reponses-commentaires.md   # ✅ protocole réponses
    ├── engagement-reddit-fb.md    # ✅ protocole engagement actif
    └── prompts.md                  # ✅ cookbook prompts marketing

archives/
└── 2026-04-29_grand-nettoyage/
    ├── README.md            # ✅ ce fichier
    └── [tous les anciens fichiers archivés ici]
```

---

## Procédure de migration (à exécuter par F)

Une fois les nouveaux fichiers validés et committés, les anciens doivent être déplacés vers cet archive. Commandes git suggérées :

```bash
# Depuis la racine du repo F2-Jarvis-main

# 1. Créer le dossier d'archive
mkdir -p archives/2026-04-29_grand-nettoyage/la-toile
mkdir -p archives/2026-04-29_grand-nettoyage/marketing
mkdir -p archives/2026-04-29_grand-nettoyage/growth-marketing/strategie
mkdir -p archives/2026-04-29_grand-nettoyage/growth-marketing/tiktok

# 2. Déplacer la-toile/ ancien
git mv la-toile/README.md                          archives/2026-04-29_grand-nettoyage/la-toile/README.md
git mv la-toile/TOILE-ASSOCI#U00c9S.md             archives/2026-04-29_grand-nettoyage/la-toile/TOILE-ASSOCI#U00c9S.md
git mv la-toile/context.md                          archives/2026-04-29_grand-nettoyage/la-toile/context.md
git mv la-toile/coordination.md                     archives/2026-04-29_grand-nettoyage/la-toile/coordination.md
git mv la-toile/roadmap.md                          archives/2026-04-29_grand-nettoyage/la-toile/roadmap.md
git mv la-toile/LA-TOILE-v3.1-Complete.docx        archives/2026-04-29_grand-nettoyage/la-toile/LA-TOILE-v3.1-Complete.docx
git mv la-toile/toile-schema-v3.1.png              archives/2026-04-29_grand-nettoyage/la-toile/toile-schema-v3.1.png

# 3. Déplacer marketing/ ancien (mais d'abord copier les nouveaux fichiers à leur place)
# ATTENTION : la nouvelle structure marketing/ doit être committée AVANT cette étape

git mv marketing/README.md                          archives/2026-04-29_grand-nettoyage/marketing/README-OLD.md
git mv marketing/context.md                         archives/2026-04-29_grand-nettoyage/marketing/context.md
git mv marketing/roadmap.md                         archives/2026-04-29_grand-nettoyage/marketing/roadmap.md

# 4. Déplacer growth-marketing/strategie/ entier
git mv growth-marketing/strategie/                  archives/2026-04-29_grand-nettoyage/growth-marketing/strategie/

# 5. Déplacer growth-marketing/ racine + tiktok/context.md
git mv growth-marketing/README.md                   archives/2026-04-29_grand-nettoyage/growth-marketing/README.md
git mv growth-marketing/context.md                  archives/2026-04-29_grand-nettoyage/growth-marketing/context.md
git mv growth-marketing/roadmap.md                  archives/2026-04-29_grand-nettoyage/growth-marketing/roadmap.md
git mv growth-marketing/tiktok/context.md           archives/2026-04-29_grand-nettoyage/growth-marketing/tiktok/context.md

# 6. Vérifier que la structure restante est cohérente
ls la-toile/                              # devrait contenir uniquement la-toile.md
ls marketing/                             # devrait contenir la nouvelle structure
ls growth-marketing/                      # devrait contenir uniquement les algo.md + context.md gardés

# 7. Commit
git add archives/
git commit -m "archive: grand nettoyage 2026-04-29 — 8 098 lignes obsolètes archivées"
```

---

## Impact attendu

### Avant le nettoyage

- ~11 000 lignes de markdown stratégie marketing
- 3 sources de vérité contradictoires
- Confusion sur la cible (indie hackers vs merchants vs founders vs creators)
- Tracking inventé (Sheet Google) au lieu de l'officiel (UTM_TRACKING_LINKS.md + dashboard admin)
- Mentions de produits abandonnés (NFLIX, PayloadDiff)
- Cadence vidéo "suspendue" alors qu'elle est canal #1 maintenant

### Après le nettoyage

- ~5 000 lignes pour la couche marketing (54% de réduction)
- 1 source de vérité par sujet
- Cible claire : **merchants Shopify**
- Tracking branché sur l'existant : `UTM_TRACKING_LINKS.md` + dashboard admin StoreMD
- Pipeline produits actuel : StoreMD → ProfitPilot → M2 → M3
- TikTok = canal #1 acquisition (compte `@storemd` produit)
- JARVIS = nœud cognitif central (logging + batch + rapport hebdo)
- Stratégie adaptative au brainstorm vendredi/samedi

---

## Si on doit revenir en arrière

Tous les fichiers archivés sont préservés dans ce dossier. Si la nouvelle stratégie ne marche pas après 4-6 semaines de test (cf. seuils de pivot dans `marketing/objectifs.md` §8), F+R peuvent récupérer les anciens fichiers depuis cette archive et reviewer ce qui était utile.

**Décision pivot stratégie** : à reviewer en revue hebdo F+R après 4 semaines (29 mai 2026) avec les vrais résultats : volumes activité, conversions dashboard admin, premiers payeurs ou betas, top/flop par canal.

---

## Documents liés

- Nouvelle structure : `la-toile/la-toile.md`, `marketing/strategie.md`, `marketing/objectifs.md`, `marketing/canaux/*.md`, `marketing/contenu/*.md`, `marketing/jarvis/*.md`
- README global de la nouvelle structure : `marketing/README.md` (fichier 17/18 à venir)
- Source de vérité UTM (inchangée) : `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
- BIBLE (inchangée) : `BIBLE.md`
- ANTI-IA (inchangée) : `ANTI-IA.md`
- JARVIS (inchangée) : `JARVIS.md`
