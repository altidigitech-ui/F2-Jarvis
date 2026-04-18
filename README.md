# F2-JARVIS

> L'OS interne de FoundryTwo. Un repo unique pour tout faire.

**Statut** : V1 — 17 avril 2026
**Owner** : Fabrice (CTO, co-fondateur F2)
**Usage** : Claude Code + skills + agents + Ouroboros bridé + mémoire persistante

---

## Qu'est-ce que F2-JARVIS

Un seul repo. Tout F2 dedans.

- Tous les **SaaS F2** (en submodules git, comptes GitHub séparés pour free tier)
- Toute la **mémoire** (conversations passées, décisions, patterns, learnings)
- Tout le **marketing** (brand voice, playbooks, posts, assets)
- Toutes les **compétences** (skills Claude Code custom F2)
- La **conscience nocturne** (Ouroboros bridé qui observe et propose)
- Les **interfaces** (dashboard web Next.js + cerveau 3D React Three Fiber)

Quand Fabrice ouvre Claude Code dans ce repo, **Claude sait tout** : qui est F2, quels SaaS tournent, quelle stack, quelle voix, quelles décisions passées. Zéro re-contexte.

---

## Architecture

```
f2-jarvis/
├── .claude/          # Skills + agents + commands + hooks Claude Code
├── brain/            # Mémoire (Ouroboros + MemPalace + Mem0)
├── studio/           # F2 comme entreprise (vision, roadmap, décisions, team)
├── saas/             # Submodules git → comptes GitHub dédiés par SaaS
├── marketing/        # Voice, playbooks, posts, assets, analytics
├── patterns/         # Apprentissages capturés
├── raw/              # /raw folder Karpathy-style (inbox)
├── ops/              # Budget, monitoring, kill-switches
├── ui/               # Dashboard web + cerveau 3D
├── graphify-out/     # Auto-généré par Graphify
├── CLAUDE.md         # Brief maître (lu auto par Claude Code)
├── BIBLE.md          # Principes non-négociables
└── HANDOFF.md        # État de la session courante
```

---

## Setup initial

### 1. Clone avec submodules

```bash
git clone --recurse-submodules git@github.com:<ton-compte>/f2-jarvis.git
cd f2-jarvis
```

### 2. Installer les outils de base

```bash
# Graphify
pip install graphifyy
graphify install

# MemPalace
pip install mempalace
mempalace init

# Node deps pour UI web
cd ui/web && npm install && cd ../..

# Node deps pour cerveau 3D
cd ui/brain-3d && npm install && cd ../..
```

### 3. Première indexation

```bash
graphify . --mode deep
```

### 4. Ouvrir Claude Code

```bash
claude
```

Il lit automatiquement `CLAUDE.md`, charge les skills "always-on", et est prêt.

---

## Commandes slash custom

| Commande | Description |
|---|---|
| `/morning` | Brief du jour (état SaaS, décisions en attente, posts à publier) |
| `/status` | État complet de F2 |
| `/launch <saas>` | Checklist de lancement |
| `/debrief` | Post-mortem structuré |
| `/graphify-all` | Réindexation complète |
| `/budget` | Dépenses tokens par service |
| `/review-proposals` | Valide/rejette les propositions d'Ouroboros |
| `/jarvis` | Meta-commandes |
| `/handoff` | Écrit HANDOFF.md pour session suivante |

---

## Agents

| Agent | Rôle |
|---|---|
| `f2-architect` | Décisions techniques, trade-offs |
| `f2-dev` | Implémentation code production-ready |
| `f2-designer` | UI/UX (charge les 4 skills design) |
| `f2-marketer` | Posts, UTM, voice Romain |
| `f2-auditor` | Audit de fin de cycle, post-mortem |
| `f2-librarian` | Retrouve le bon doc dans le repo |
| `f2-accountant` | Budget, tokens, coûts |

---

## Skills disponibles

**Always-on** : graphify, f2-brand-voice, handoff-writer

**On-demand UI/UX** : ui-ux-pro-max, frontend-design, shadcn-ui, web-interface-guidelines, web-accessibility

**On-demand tech F2** : shopify-gql, supabase-rls, stripe-integration, saas-launch-checklist

**On-demand marketing** : marketing-fr, marketing-en

**On-demand ops** : context-md-generator, brain-3d-renderer

---

## Interfaces

### Dashboard web (`ui/web/`)

Next.js 14 + TypeScript + Tailwind + shadcn/ui.

```bash
cd ui/web && npm run dev
# → http://localhost:3000
```

Pages :
- `/` — vue d'ensemble F2 (état SaaS, métriques, derniers posts)
- `/morning` — brief du jour
- `/budget` — dépenses tokens
- `/proposals` — review des propositions Ouroboros
- `/graph` — visualisation interactive Graphify
- `/timeline` — timeline Ouroboros diary
- `/mempalace` — browser verbatim storage
- `/saas/<name>` — détail par SaaS

### Cerveau 3D (`ui/brain-3d/`)

React Three Fiber + Tailwind.

```bash
cd ui/brain-3d && npm run dev
# → http://localhost:3001
```

Cerveau anatomique 3D avec zones thématiques :
- **Cortex frontal** — décisions stratégiques (studio/decisions/)
- **Lobe temporal gauche** — langage / marketing (marketing/)
- **Lobe temporal droit** — créativité / branding (marketing/brand/)
- **Lobe pariétal** — coordination / ops (ops/)
- **Lobe occipital** — perception / raw folder (raw/)
- **Cervelet** — patterns appris (patterns/)
- **Hippocampe** — mémoire (brain/mempalace/)
- **Tronc cérébral** — SaaS vitaux (saas/)

Drag-drop de fichiers : classification auto vers la bonne zone via Haiku.

---

## Ouroboros bridé

Ouroboros tourne en **background Claude Code** (pas d'API externe), donc inclus dans le plan Max 5x.

- **Lit** : tout le repo
- **Écrit** : uniquement dans `brain/ouroboros/{proposals,diary,state}`
- **Ne commit pas, ne push pas, n'appelle pas d'API externe**
- Budget : 10% du budget F2-JARVIS max
- Kill-switch : `touch ops/kill-switches/ouroboros.flag` → arrêt immédiat

Chaque nuit, Ouroboros :
1. Lit les commits de la journée
2. Lit les diary entries des agents
3. Lit les posts, décisions, patterns récents
4. Détecte incohérences, opportunités, risques
5. Écrit des propositions dans `brain/ouroboros/proposals/`
6. Écrit un diary dans `brain/ouroboros/diary/`

Le matin, Fabrice lance `/review-proposals` pour valider/rejeter.

---

## Budget

Max 5x = ~90€/mois. Claude Code inclus.

**Coût incrémental F2-JARVIS** : 0 à 15€/mois (seulement si Ouroboros passe en mode API directe 24/7).

Voir `ops/budget/limits.yaml` pour les plafonds par service.

---

## Règles d'engagement

Lire **BIBLE.md** avant toute contribution.

Principes clés :
- Fabrice décide
- Haiku par défaut, Sonnet rationné, Opus jamais auto
- Pas de MVP bancal
- Pas de fake stats
- Paraphrase > cite
- TOILE rule (Altistone invisible)
- Ouroboros propose, ne commit pas

---

## Licence

Privé. Propriété F2 / Fabrice.

---

*"Un seul repo. Tout F2 dedans. Zéro re-contexte."*
