# F2-Jarvis — Backend Railway

**Statut :** En production
**Stack :** Node.js + Express + TypeScript + Claude Agent SDK + GitHub API + Supabase
**Rôle :** vrai cerveau de Jarvis — exécute les agents Claude, commit dans le repo, gère MemPalace et Ouroboros.

---

## Vue d'ensemble

Le backend est un serveur Express déployé sur Railway. C'est lui qui :

1. Fait tourner le Claude Agent SDK avec le system prompt persona (Romain, Fabrice, F2)
2. Expose 9 tools à Claude (`repo_read`, `repo_search`, `timeline_today`, `counters_today`, `propose_action`, `repo_search_voice_examples`, etc.)
3. Écrit dans le repo GitHub via l'API (pattern Propose → Validate → Execute)
4. Gère la mémoire persistante (MemPalace = verbatim, mem0 = facts, Ouroboros = proposals)
5. Génère le knowledge graph du repo (Graphify)

Le frontend Vercel (`ui/jarvis/`) est juste un proxy léger vers ce backend.

---

## Endpoints principaux

### Chat

- `POST /chat` — Stream response du Claude Agent. Body : `{ persona, mode, message, image? }`
- `GET /chat/history` — Historique conversation par persona

### Contexte

- `GET /context?persona=romain&mode=normal` — Timeline + compteurs + alertes + planning F2

### Actions (pattern Propose → Validate → Execute)

- `POST /action/propose` — Crée une action pending (avant validation user)
- `POST /action/execute` — Exécute une action validée (écrit sur GitHub)
- `POST /action/reject` — Rejette une action pending

### Repo exploration

- `GET /file?path=...` — Lit un fichier du repo
- `POST /search` — Recherche full-text
- `GET /graph` — Nœuds du knowledge graph

### Graphify

- `GET /graphify` — Graphe complet
- `GET /graphify/node/:id` — Détail nœud
- `GET /graphify/search?q=...` — Recherche sémantique
- `GET /graphify/related?node=...` — Nœuds reliés

### MemPalace

- `GET /mempalace/wings` — Liste wings (personnes, SaaS, projets)
- `GET /mempalace/wing/:id` — Détail wing
- `GET /mempalace/drawer/:wing/:filename` — Contenu drawer
- `GET /mempalace/stats` — Stats globales

### Ouroboros

- `GET /ouroboros/status` — État (actif / kill-switch / cycle en cours)
- `GET /ouroboros/proposals` — Liste proposals Ouroboros en attente
- `GET /ouroboros/proposal/:id` — Détail proposal
- `POST /ouroboros/action` — Accepte/rejette une proposal
- `POST /ouroboros/trigger` — Déclenche un cycle manuel (normalement nocturne)
- `POST /ouroboros/kill-switch` — Active/désactive le kill-switch
- `GET /ouroboros/diary` — Journal Ouroboros
- `POST /ouroboros/initialize` — Init après premier déploiement

---

## Structure code (`src/`)

```
src/
├── server.ts                   # Express app, routing, auth middleware
├── routes/                     # Handlers par endpoint
│   ├── chat.ts                 # Le plus important — builds system prompt, streams Claude Agent
│   ├── chat-history.ts
│   ├── context.ts              # Agrège timeline + compteurs + alertes depuis le repo
│   ├── action.ts, action-propose.ts, action-execute.ts, action-reject.ts
│   ├── graph.ts, graphify.ts
│   ├── file.ts, search.ts
│   ├── mempalace.ts
│   └── ouroboros.ts
└── lib/
    ├── jarvis-tools.ts         # Les 9 tools exposés à Claude Agent (mcp server)
    ├── jarvis-memory.ts        # Conversation storage (Supabase)
    ├── action-executor.ts      # Logique d'exécution des actions validées
    ├── github.ts               # Wrapper GitHub API (read/write repo)
    ├── markdown.ts             # Parsing .md (frontmatter, sections)
    ├── mempalace.ts            # Logique MemPalace
    ├── cache.ts                # Cache en mémoire
    ├── supabase.ts             # Client Supabase server
    └── context-types.ts        # Types partagés avec le frontend
```

---

## Les 9 tools exposés à Claude Agent

Définis dans `lib/jarvis-tools.ts` et enregistrés comme MCP server à la conf du Claude Agent SDK.

1. `repo_read(path)` — lit un fichier
2. `repo_search(query)` — recherche full-text
3. `repo_search_voice_examples(persona, angle)` — retrouve des extraits de posts passés pour calibrer un output
4. `timeline_today(persona)` — activités du jour
5. `counters_today(persona)` — compteurs vs targets
6. `alerts_today(persona)` — alertes en attente
7. `propose_action(action_type, params, preview)` — propose une modification du repo (avec validation humaine)
8. `recent_history(persona, limit)` — historique conversation récent
9. `mempalace_query(wing, query)` — query sémantique dans MemPalace

Liste complète des `action_type` acceptés : voir `lib/action-executor.ts`.

---

## Les 33 patterns de reconnaissance

Encodés dans le system prompt du chat (`routes/chat.ts`). Exemples :

- "j'ai posté/publié X" → `mark_published`
- "grok m'a sorti liste" → parse + `queue_cold_targets`
- "@X a répondu" → `update_cold_reply`
- Screenshot reply Twitter → génère 2 variants en voix persona
- "résumé / bilan" → synthèse timeline + compteurs + history
- etc.

Liste complète : section "33 PATTERNS DE RECONNAISSANCE" dans le system prompt.

---

## Variables d'environnement (Railway)

```
PORT=3001
ALLOWED_ORIGIN=https://f2-jarvis.vercel.app
BACKEND_SHARED_SECRET=...             # Partagé avec le frontend
ANTHROPIC_API_KEY=...                 # Pour Claude Agent SDK
GITHUB_TOKEN=...                      # PAT avec scope repo
GITHUB_REPO_OWNER=altidigitech-ui
GITHUB_REPO_NAME=F2-Jarvis
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...              # Server-side only
```

## Déploiement

Railway auto-deploy sur push. `railway.toml` à la racine du backend. Dockerfile inclus.

Healthcheck : `GET /health` renvoie `{status: "ok"}`.

---

## Sécurité

- Middleware `X-JARVIS-AUTH` sur toutes les routes sauf `/health` (secret partagé)
- CORS restreint à `ALLOWED_ORIGIN` (le frontend Vercel)
- `X-USER-ID` transmis depuis le frontend après auth Supabase
- GitHub token limité au scope `repo` sur `altidigitech-ui/F2-Jarvis` uniquement

---

## Références cross-repo

- Frontend : `ui/jarvis/`
- Couche mémoire : `brain/`
- Config Claude Code : `.claude/` (utilisée par F dans le terminal, séparée de ce backend)
- Patterns techniques : `patterns/`
- Monitoring & budget : `ops/`

---

**Dernière mise à jour : 21 avril 2026**
