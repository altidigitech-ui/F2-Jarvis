# F2-Jarvis

Repo unifié du studio **FoundryTwo**. Contient DEUX systèmes partageant la même racine :

1. **F2-Jarvis (infra)** — cockpit web agentique, Claude Code setup, couche mémoire, budget & kill-switches
2. **FoundryTwo (contenu opérationnel)** — stratégie, produits, marketing, distribution, comptes persos et studio

---

## Démarrage rapide

**Vous débarquez à zéro ? Lisez d'abord `ENTRYPOINT.md`.**

Il vous guide en 10 minutes vers une compréhension globale.

---

## Les fichiers source de vérité

| Fichier | Rôle |
|---------|------|
| `ENTRYPOINT.md` | **Porte d'entrée** — lisez ce fichier en premier |
| `BIBLE.md` | Principes non-négociables. Fabrice seul l'édite |
| `ANTI-IA.md` | Règle #0 : anti-détection IA. Prime sur tout contenu généré |
| `strategie/CONTEXT.md` | Source de vérité stratégique parent |
| `produits/STATUS.md` | Source de vérité portfolio produits |
| `CLAUDE.md` | Instructions permanentes pour Claude Code (terminal F) |

---

## Arborescence (vue macro)

```
F2-Jarvis/
│
│  ─── PORTE D'ENTRÉE ───
├── ENTRYPOINT.md          ← LISEZ CE FICHIER EN PREMIER
├── README.md              ← Vous êtes ici
├── CLAUDE.md              ← Instructions Claude Code (terminal)
├── BIBLE.md               ← 13 principes non-négociables
├── ANTI-IA.md             ← Règle #0 anti-détection
├── VISUELS.md             ← Algo visuel
├── ARCH.md                ← Arbre ASCII généré
├── AUDIT.md               ← Checklist résidus merge (archivé après cleanup 21/04)
├── HANDOFF.md             ← Passage de relais entre sessions Claude Code
├── BATCH-SEMAINE-N.md     ← Batch hebdo en cours (archivé dimanche soir)
│
│  ─── F2-JARVIS (AUTOMATISATION / INFRA) ───
├── ui/                    ← Frontends : jarvis/ (app web principale), brain-3d/, web/
│   └── jarvis/            ← App Next.js Vercel (f2-jarvis.vercel.app)
├── backend/               ← Backends Jarvis
│   └── jarvis/            ← Express Railway (vrai cerveau)
├── brain/                 ← Couche cognitive : ouroboros/, mempalace/, mem0/
├── .claude/               ← Config Claude Code : skills/ (16), agents/ (7), commands/ (9), hooks/ (6)
├── ops/                   ← Discipline : budget/, monitoring/, kill-switches/
├── patterns/              ← Décisions techniques durcies
├── tracking/              ← Dashboard hebdo, decisions-log, UTM
├── raw/                   ← Inbox brute (non versionné par défaut)
├── graphify-out/          ← Output Graphify (généré)
├── supabase-migrations/   ← Migrations DB
│
│  ─── FOUNDRYTWO (CONTENU OPÉRATIONNEL) ───
├── strategie/             ← Source de vérité stratégique (CONTEXT, PLAYBOOK, WARMING-FARMING, verticals/)
├── produits/              ← Source de vérité portfolio (STATUS, MUTATIONS, NOUVEAUX, PRINCIPES-ANTI-CONCURRENTS)
├── marketing/             ← Marketing macro (funnel, pipeline)
├── growth-marketing/      ← Algos + context par plateforme (twitter, linkedin, ih, ph, tiktok)
├── distribution/          ← Règles Reddit + Facebook
│
├── f2/                    ← Compte studio @foundrytwo (R gère)
├── romain/                ← R — full-time, angle growth
├── fabrice/               ← F — full-time, angle technique
│
├── saas/                  ← Contexte par SaaS
├── la-toile/              ← Architecture réseau (Altistone INVISIBLE)
├── asset-brand/           ← Identité de marque (brand bible, logo, guidelines)
│
└── archives/              ← Archives globales (batches, vieilles semaines)
```

---

## Chemins de lecture

### Vous êtes une IA qui débarque à zéro

1. `ENTRYPOINT.md` (10 min)
2. `BIBLE.md` (5 min)
3. `strategie/CONTEXT.md` (15 min)
4. `produits/STATUS.md` (2 min)

→ Vous comprenez 90% du système.

### Vous voulez comprendre l'infra F2-Jarvis

1. `ui/jarvis/README.md`
2. `backend/jarvis/README.md`
3. `brain/README.md`
4. `.claude/README.md`
5. `ops/README.md`

### Vous êtes R ou F et ouvrez votre journée

1. `{vous}/plan-hebdo.md`
2. `{vous}/playbook-semaine.md`
3. `{vous}/daily-checklist.md`
4. `{vous}/{canal}/` selon la journée
5. `{vous}/tracking/` pour logger

### Vous gérez @foundrytwo (R)

1. `f2/context.md`
2. `f2/plan-hebdo.md`
3. `f2/{canal}/` pour le canal du jour
4. `BATCH-SEMAINE-N.md` pour le batch en cours

### Vous êtes Claude Code (terminal F)

1. `CLAUDE.md` (lu automatiquement)
2. `BIBLE.md` (lu automatiquement)
3. Skills always-on chargés : graphify, handoff-writer, f2-brand-voice
4. Slash commands disponibles : `/morning`, `/status`, `/launch`, `/debrief`, `/handoff`, etc.

---

## Conventions

- **Héritage strict** : chaque fichier hérite d'un parent. Bannière `> Hérite de : X` obligatoire.
- **Langue** : docs internes en FR, contenu publié en EN (marché US/EU).
- **Validation** : aucune modif opérationnelle sans `validé`, `go`, ou `ok` explicite de F.
- **Voix séparées** : R ≠ F ≠ F2 ≠ Produits. Vocabulaire exclusif par voix.
- **Zéro donnée inventée** : pas de faux MRR, pas de testimonials inventés (BIBLE.md §3).
- **Sales-mode dominant** : build-in-public réservé au format vendredi F2 Studio Update.

---

## État au 21/04/2026

| Dossier | État | Note |
|---------|------|------|
| `strategie/` | Complet, parent | |
| `produits/` | Complet | StoreMD live depuis 14/04 |
| `distribution/` | Minimal | À enrichir |
| `marketing/` | Léger | À enrichir |
| `growth-marketing/` | Complet | Algos + stratégies par plateforme |
| `f2/` | Complet | |
| `romain/` | Complet | |
| `fabrice/` | Complet | |
| `saas/` | Complet | |
| `la-toile/` | Complet | |
| `asset-brand/` | Complet | |
| `ui/jarvis/` | En prod (Vercel) | |
| `backend/jarvis/` | En prod (Railway) | |
| `brain/` | Opérationnel | Ouroboros nocturne, MemPalace actif |
| `.claude/` | Configuré | 16 skills, 7 agents, 9 commands, 6 hooks |
| `archives/` | Propre | Cleanup 21/04 exécuté |
| TikTok (`f2/tiktok/`, `growth-marketing/tiktok/`) | SUSPENDU | Pipeline vidéo en construction |

---

## Phase actuelle

**Semaine 6 (20-26 avril 2026).** StoreMD en scale sales-mode agressif. BATCH hebdo actif : `BATCH-SEMAINE-6.md` (racine).

**Prochain lancement produit :** ProfitPilot (fin avril / mai).

**Objectif août 2026 :** 6 SaaS live, liberté financière atteinte.

---

## Studio

- **Studio :** FoundryTwo
- **Repo :** github.com/altidigitech-ui/F2-Jarvis
- **Fondateurs :** Romain Delgado (R, Growth) + Fabrice Gangi (F, CTO/Builder)

**F2-Jarvis = OS interne. FoundryTwo = identité publique.**
