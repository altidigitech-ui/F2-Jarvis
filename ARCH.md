# ARCH — Structure du repo FoundryTwo

Arbre ASCII généré le 26 avril 2026 (post-intégration context-cognitif).
Profondeur max : 3. Dossiers ignorés : _ft_original, _cdv_original, .git, node_modules, archives.

## Légende
- `(READ-ONLY)` — fichier de référence, ne pas modifier automatiquement via JARVIS
- `(stub)` — fichier archivé, remplacé par un pointeur vers l'archive
- `(LIVE)` — service en production
- `(⚠️ stale)` — données périmées, régénération requise
- `← S7 actif` — fichier opérationnel de la semaine en cours

```
.
├── ANTI-IA.md
├── ARCH.md
├── AUDIT.md                                   ← (stub) archivé — voir archives/cleanup/
├── BATCH-SEMAINE-6.md                         ← (stub) archivé — voir archives/batches/
├── BATCH-SEMAINE-7.md                         ← BATCH ACTIF (27/04 → 03/05)
├── BIBLE.md
├── CLAUDE.md
├── ENTRYPOINT.md
├── HANDOFF.md
├── JARVIS-ARCHITECTURE-COMPLETE.md
├── JARVIS-UPGRADE-PLAN.md
├── JARVIS.md
├── README.md
├── TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md
├── VISUELS.md
│
├── .claude
│   ├── README.md
│   ├── agents                                 ← 8 agents spécialisés
│   │   ├── f2-architect.md
│   │   ├── f2-auditor.md
│   │   ├── f2-designer.md
│   │   ├── f2-dev.md
│   │   ├── f2-librarian.md
│   │   ├── f2-marketer.md
│   │   ├── f2-accountant.md
│   │   └── f2-thinker.md
│   ├── commands                               ← 11 slash commands
│   │   ├── morning.md
│   │   ├── status.md
│   │   ├── launch.md
│   │   ├── debrief.md
│   │   ├── graphify-all.md
│   │   ├── budget.md
│   │   ├── review-proposals.md
│   │   ├── jarvis.md
│   │   ├── handoff.md
│   │   ├── cognition.md
│   │   └── think.md
│   ├── hooks                                  ← 8 hooks auto
│   │   ├── budget-check.sh
│   │   ├── mempalace-save.sh
│   │   ├── post-commit-graphify.sh
│   │   ├── pre-tool-use-graphify.sh
│   │   ├── precompact-save.sh
│   │   ├── precompact-save-cognitive.sh
│   │   ├── session-stop-handoff.sh
│   │   └── session-stop-cognitive.sh
│   ├── hooks-config.json
│   ├── settings.json
│   └── skills                                 ← 17 skills (3 always-on + 14 on-demand)
│       ├── brain-3d-renderer
│       ├── context-md-generator
│       ├── f2-brand-voice                     ← always-on
│       ├── frontend-design
│       ├── graphify                           ← always-on
│       ├── handoff-writer                     ← always-on
│       ├── jarvis-upgrade
│       ├── marketing-en                       ← voix Fabrice
│       ├── marketing-fr                       ← voix Romain
│       ├── saas-launch-checklist
│       ├── shadcn-ui
│       ├── shopify-gql
│       ├── stripe-integration
│       ├── supabase-rls
│       ├── ui-ux-pro-max
│       ├── web-accessibility
│       └── web-interface-guidelines
│
├── asset-brand
│   ├── FOUNDRYTWO-BRAND-BIBLE.md
│   ├── FOUNDRYTWO-LOGO-GUIDELINES.md
│   └── logo
│       ├── f2
│       ├── leak-detector
│       ├── saas-2
│       └── saas-3
│
├── backend
│   └── jarvis                                 ← (LIVE) Express Railway — Claude Agent SDK
│       ├── README.md
│       └── src
│           ├── lib
│           └── routes
│
├── brain
│   ├── README.md
│   ├── context-cognitif
│   │   ├── ARCH.md
│   │   ├── claude.md
│   │   ├── apprentissage
│   │   ├── capacite
│   │   ├── constantes
│   │   ├── decision
│   │   ├── emergence
│   │   ├── equation
│   │   ├── memoire
│   │   ├── metacognition
│   │   ├── noyau
│   │   ├── raisonnement
│   │   ├── social
│   │   ├── systemes
│   │   └── verite
│   ├── jarvis-workspace
│   ├── mem0
│   ├── mempalace
│   └── ouroboros
│       ├── diary
│       ├── proposals                          ← sandbox Ouroboros (write-only pour lui)
│       ├── state
│       └── triggers
│
├── distribution
│   ├── PLAYBOOK_DISTRI_3_VERTICAL
│   └── README.md
│
├── f2                                         ← Compte studio @foundrytwo (R gère)
│   ├── agencies-onboarded-S6.md              ← (stub)
│   ├── claude-code-prompts.md
│   ├── cold
│   ├── context.md
│   ├── cross-engagement-tracker.md           ← (READ-ONLY) textes cross S7
│   ├── engagement
│   │   ├── chrome
│   │   ├── cross-execution-log.md            ← log dynamique crosses S7
│   │   ├── engagement-log.md                 ← S7 actif
│   │   └── archives
│   ├── ih
│   │   ├── context.md
│   │   └── roadmap.md
│   ├── linkedin
│   │   ├── context.md
│   │   └── roadmap.md
│   ├── ph
│   │   ├── context.md
│   │   └── roadmap.md
│   ├── plan-hebdo.md                         ← S7 actif
│   ├── playbook-semaine.md
│   ├── progress-semaine.md                   ← S7 actif
│   ├── publication
│   │   ├── context.md
│   │   ├── grok
│   │   ├── posts-valides.md                  ← S7 actif
│   │   └── prompt.md
│   ├── roadmap.md
│   ├── system-prompt.md
│   ├── tiktok
│   │   ├── context.md
│   │   └── roadmap.md
│   └── twitter
│       ├── context.md
│       └── roadmap.md
│
├── fabrice                                    ← F — CTO/Builder
│   ├── VOIX.md
│   ├── angles-et-templates.md
│   ├── claude-code-prompts.md
│   ├── cold
│   │   ├── COLD-TEMPLATES-S7.md             ← templates actifs S7
│   │   ├── archives
│   │   ├── chrome
│   │   │   └── linkedin-prompt.md
│   │   ├── claude
│   │   ├── cold-outreach-log.md             ← S7 actif
│   │   ├── grok
│   │   └── templates-semaine-6.md           ← (stub)
│   ├── context.md
│   ├── cross-engagement-tracker.md          ← (READ-ONLY) 20 replies S7
│   ├── daily-checklist.md
│   ├── engagement
│   │   ├── chrome
│   │   ├── claude
│   │   ├── cross-execution-log.md           ← log dynamique crosses S7
│   │   ├── engagement-log.md                ← S7 actif
│   │   └── grok
│   ├── facebook
│   │   ├── cross-replies.md
│   │   └── posts-prets.md
│   ├── linkedin
│   │   ├── context.md
│   │   └── roadmap.md
│   ├── ph
│   ├── plan-30-jours.md
│   ├── plan-hebdo.md                        ← S7 actif
│   ├── playbook-semaine.md
│   ├── posts-valides.md                     ← S7 actif
│   ├── progress-semaine.md                  ← S7 actif
│   ├── publication
│   │   ├── claude
│   │   └── grok
│   ├── reddit
│   │   ├── cross-replies.md
│   │   └── posts-prets.md
│   ├── roadmap.md
│   ├── suivi-comptes.md
│   ├── system-prompt.md
│   ├── tracking
│   │   ├── comptes-groupes.md
│   │   ├── douleurs-observees.md
│   │   └── karma-reddit.md
│   └── twitter
│       ├── context.md
│       └── roadmap.md
│
├── graphify-out
│   ├── GRAPH_REPORT.md                      ← (⚠️ stale 19/04 — 23 fichiers / 71 nodes)
│   └── concepts.json
│
├── growth-marketing
│   ├── README.md
│   ├── context.md
│   ├── ih
│   │   ├── algo.md
│   │   └── context.md
│   ├── linkedin
│   │   ├── algo.md
│   │   └── context.md
│   ├── ph
│   │   ├── algo.md
│   │   └── context.md
│   ├── roadmap.md
│   ├── strategie
│   │   ├── audit-explosion-marketing-v2.md
│   │   ├── recherche-comptes-produit-studio-FR.md
│   │   ├── strategie-expansion-generale.md
│   │   ├── strategie-ih.md
│   │   ├── strategie-linkedin.md
│   │   ├── strategie-ph.md
│   │   └── strategie-twitter.md
│   ├── tiktok
│   │   ├── algo.md
│   │   └── context.md
│   └── twitter
│       ├── algo.md
│       └── context.md
│
├── la-toile                                   ← Architecture réseau (Altistone INVISIBLE en public)
│   ├── LA-TOILE-v3.1-Complete.docx
│   ├── README.md
│   ├── TOILE-ASSOCIÉS.md
│   ├── context.md
│   ├── coordination.md
│   ├── roadmap.md
│   └── toile-schema-v3.1.png
│
├── marketing
│   ├── README.md
│   ├── context.md
│   └── roadmap.md
│
├── ops
│   ├── README.md
│   ├── budget
│   │   ├── history.csv
│   │   └── limits.yaml
│   ├── kill-switches
│   │   ├── global.flag
│   │   ├── graphify.flag
│   │   ├── mempalace.flag
│   │   └── ouroboros.flag
│   └── monitoring
│       ├── cache-policy.md
│       └── model-tier-rules.yaml
│
├── patterns
│   ├── README.md
│   ├── audit-v1-then-correct-v2.md
│   ├── bitwarden-over-shared-passwords.md
│   ├── dual-llm-sonnet-haiku.md
│   ├── no-browser-automation-saas.md
│   ├── shopify-rest-is-dead.md
│   ├── template.md
│   └── tiktok-native-over-capcut.md
│
├── produits
│   ├── MUTATIONS.md
│   ├── NOUVEAUX.md
│   ├── PRINCIPES-ANTI-CONCURRENTS.md
│   └── STATUS.md
│
├── raw
│   ├── README.md
│   └── analytics
│       └── S7                               ← analytics semaine 7 (fichiers uploadés)
│
├── romain                                     ← R — Growth
│   ├── VOIX.md
│   ├── angles-et-templates.md
│   ├── claude-code-prompts.md
│   ├── cold
│   │   ├── COLD-TEMPLATES-S7.md             ← templates actifs S7
│   │   ├── archives
│   │   ├── chrome
│   │   │   └── linkedin-prompt.md
│   │   ├── claude
│   │   ├── cold-outreach-log.md             ← S7 actif
│   │   ├── grok
│   │   └── templates-semaine-6.md           ← (stub)
│   ├── context.md
│   ├── cross-engagement-tracker.md          ← (READ-ONLY) 22 replies S7
│   ├── daily-checklist.md
│   ├── engagement
│   │   ├── chrome
│   │   ├── claude
│   │   ├── cross-execution-log.md           ← log dynamique crosses S7
│   │   ├── engagement-log.md                ← S7 actif
│   │   └── grok
│   ├── facebook
│   │   ├── cross-replies.md
│   │   └── posts-prets.md
│   ├── linkedin
│   │   ├── context.md
│   │   └── roadmap.md
│   ├── ph
│   ├── plan-30-jours.md
│   ├── plan-hebdo.md                        ← S7 actif
│   ├── playbook-semaine.md
│   ├── progress-semaine.md                  ← S7 actif
│   ├── publication
│   │   ├── claude
│   │   ├── grok
│   │   └── posts-valides.md                 ← S7 actif
│   ├── reddit
│   │   ├── cross-replies.md
│   │   └── posts-prets.md
│   ├── roadmap.md
│   ├── suivi-comptes.md
│   ├── system-prompt.md
│   ├── tracking
│   │   ├── comptes-groupes.md
│   │   ├── douleurs-observees.md
│   │   └── karma-reddit.md
│   └── twitter
│       ├── context.md
│       └── roadmap.md
│
├── saas
│   ├── adaudit
│   │   ├── README.md
│   │   ├── context.md
│   │   └── metrics.md
│   ├── clientpulse
│   │   ├── README.md
│   │   ├── context.md
│   │   └── metrics.md
│   ├── context.md
│   ├── creatorsuite
│   │   ├── README.md
│   │   ├── context.md
│   │   └── metrics.md
│   ├── leadquiz
│   │   ├── README.md
│   │   ├── context.md
│   │   └── metrics.md
│   ├── leak-detector
│   │   ├── README.md
│   │   ├── asset-brand
│   │   ├── context.md
│   │   └── metrics.md
│   ├── profitpilot
│   │   ├── README.md
│   │   ├── context.md
│   │   └── metrics.md
│   ├── roadmap.md
│   └── storemd
│       ├── README.md
│       ├── context.md
│       └── metrics.md
│
├── strategie
│   ├── CONTEXT.md
│   ├── PLAYBOOK-DISTRIBUTION.md
│   ├── STRATEGIE-MID-S6-BETA-TESTERS.md
│   ├── WARMING-FARMING.md
│   └── verticals
│       ├── CONTENT-CREATORS.md
│       ├── ECOMMERCE.md
│       ├── MARKETING-FREELANCERS.md
│       └── RECHERCHE-SCORING.md
│
├── supabase-migrations
│   └── 001_jarvis_memory.sql
│
├── tracking
│   ├── FoundryTwo-Growth-Tracker.xlsx
│   ├── README.md
│   ├── context.md
│   ├── dashboard-hebdo.md
│   ├── decisions-log.md
│   └── utm
│       ├── leak-detector
│       ├── saas-2
│       └── saas-3
│
└── ui
    ├── brain-3d
    ├── jarvis                                 ← (LIVE) Next.js Vercel — f2-jarvis.vercel.app
    └── web
```

---

## Conventions de nommage

| Pattern | Exemple | Usage |
|---------|---------|-------|
| `BATCH-SEMAINE-N.md` à la racine | `BATCH-SEMAINE-7.md` | Batch actif — archivé dans `archives/batches/` le dimanche soir |
| `{persona}/archives/semaine-N-{dates}/` | `fabrice/archives/semaine-6-20-26-avril-2026/` | Archives hebdo per-persona |
| `{persona}/cold/COLD-TEMPLATES-S{N}.md` | `fabrice/cold/COLD-TEMPLATES-S7.md` | Templates cold actifs de la semaine |
| `{persona}/cold/templates-semaine-{N}.md` | `templates-semaine-6.md` | Stub des anciens templates (pointeur archive) |
| `cross-engagement-tracker.md` | dans chaque `{persona}/` | Textes replies cross pré-rédigés **(READ-ONLY)** |
| `cross-execution-log.md` | dans `{persona}/engagement/` | Tracking dynamique crosses exécutés (⏳/✅/❌) |
| `progress-semaine.md` | dans chaque `{persona}/` | Mémoire de travail active — reset chaque semaine |
| `posts-valides.md` | `fabrice/` (root) ou `{persona}/publication/` | Checklist posts S7 à publier |

---

## État au 26/04/2026

| Zone | État |
|------|------|
| Batch actif | **BATCH-SEMAINE-7.md** (27/04 → 03/05) — Couche A sales + Couche B beta no-install |
| F Twitter | 29 followers · 855 imp S6 · best post Jeu 23/04 (273 imp) |
| R Twitter | 24 followers · 1 111 imp S6 · best post Ven 24/04 (638 imp) |
| F2 Twitter | 12 followers · 164 imp S6 |
| LinkedIn F | 13 connexions (6 → 13 en S6) |
| LinkedIn R | 135 relations |
| StoreMD | 0€ MRR · pivot no-install beta · 51 starts / 0 completes OAuth |
| Ouroboros | 0 proposals pending · cycle 25/04 |
| Graphify | ⚠️ Stale (19/04, 23 fichiers / 71 nodes) — régénérer avec `/graphify-all` |
| Backend | ✅ Fix timeline context.ts déployé |
