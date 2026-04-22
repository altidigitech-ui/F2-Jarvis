# F2-JARVIS — Architecture complète

> Document pilier. Source de vérité architecturale pour tout humain ou IA qui doit comprendre, modifier, ou étendre JARVIS.
> Généré le 22 avril 2026 après audit exhaustif du repo (100% du code lu, 10 500+ lignes).

---

## Vue d'ensemble

F2-JARVIS est le système nerveux central du studio FoundryTwo. C'est une application web agentique qui combine :

- Un **cockpit temps réel** pour piloter la distribution marketing (posts, cold outreach, engagement, cross-engagement) de deux personas (Romain/Growth, Fabrice/Builder) et du compte studio F2
- Un **assistant conversationnel** alimenté par Claude via le Claude Agent SDK, doté de 9 outils MCP pour lire, chercher, et proposer des modifications au repo
- Une **couche cognitive** (Ouroboros, MemPalace, Mem0, Graphify) qui donne à JARVIS de la mémoire persistante, une conscience de fond, et un graphe de connaissances
- Un **système d'actions validées** (propose → validate → commit) qui garantit que JARVIS ne modifie jamais le repo sans approbation humaine

Le repo sert simultanément de codebase et de base de données de contenu — toutes les modifications opérationnelles (logs, plans, publications) sont des commits GitHub.

---

## Stack technique

| Composant | Technologie | Déploiement |
|---|---|---|
| Backend | Express.js + TypeScript + Claude Agent SDK | Railway (Dockerfile, node:20-bookworm-slim) |
| Frontend | Next.js 14 + TypeScript + Tailwind + React Three Fiber | Vercel |
| Base de données | Supabase PostgreSQL (conversations, messages, actions) | Supabase Cloud |
| Stockage contenu | GitHub API REST (repo comme DB, commits comme transactions) | GitHub |
| Auth | Supabase Auth (email/password) + flag custom `f2_authorized` | Supabase |
| IA conversationnelle | Claude Agent SDK (`query()` streaming + MCP server inline) | Inclus plan Max 5x |
| Visualisation 3D | react-force-graph-3d + Three.js + React Three Fiber | Client-side |
| Recherche | Fuse.js (fuzzy search en mémoire, côté backend) | In-process |

### Dépendances backend (package.json)

`@anthropic-ai/claude-agent-sdk`, `@supabase/supabase-js`, `cors`, `express`, `fuse.js`, `zod`

### Dépendances frontend (package.json)

`next`, `react`, `react-dom`, `@supabase/ssr`, `@supabase/supabase-js`, `@react-three/fiber`, `@react-three/drei`, `react-force-graph-3d`, `three`, `three-spritetext`, `lucide-react`, `react-markdown`, `remark-gfm`, `tailwind-merge`, `class-variance-authority`, `clsx`

---

## Architecture en 4 couches

```
┌─────────────────────────────────────────────────────────────────┐
│  COUCHE 1 — BRAIN                                               │
│  Ouroboros · MemPalace · Mem0 (optionnel) · Graphify            │
│  Mémoire persistante + conscience de fond + knowledge graph     │
├─────────────────────────────────────────────────────────────────┤
│  COUCHE 2 — BACKEND (Express, Railway, port 3001)               │
│  server.ts → 27 routes                                          │
│  chat.ts (cerveau) → Claude Agent SDK + 9 outils MCP            │
│  action-executor.ts → commit GitHub via propose/validate/exec   │
│  github.ts · mempalace.ts · jarvis-memory.ts · markdown.ts      │
├─────────────────────────────────────────────────────────────────┤
│  COUCHE 3 — FRONTEND (Next.js 14, Vercel)                       │
│  PersonaLayout (cockpit 4 colonnes)                             │
│  Chat.tsx (streaming JSONL + markers)                           │
│  OuroborosPanel · MemPalaceView · GraphifyView · Brain3D        │
│  29 proxy API routes → Backend Railway                          │
├─────────────────────────────────────────────────────────────────┤
│  COUCHE 4 — DATA                                                │
│  Supabase (3 tables + RLS) · GitHub API (repo comme DB)         │
│  Claude Agent SDK (bridge MCP)                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Couche 1 — Brain

Dossier : `brain/`

La couche cognitive de JARVIS. Quatre sous-systèmes complémentaires, tous en lecture seule sur le repo (sauf Ouroboros qui écrit dans son sandbox).

### 1.1 Ouroboros — conscience de fond bridée

Dossier : `brain/ouroboros/`

Ouroboros est un processus nocturne qui observe le repo F2-JARVIS pendant que les humains dorment. Il détecte des incohérences, des risques, et des opportunités, puis rédige des propositions que Fabrice valide ou rejette.

#### Fichiers

| Fichier | Rôle | Lignes |
|---|---|---|
| `identity.md` | Identité et mission d'Ouroboros. Immuable (Fabrice seul l'édite). | ~80 |
| `bible.md` | 10 principes non-négociables. Constitution d'Ouroboros. | ~90 |
| `consciousness.py` | Boucle de conscience principale. Exécute le cycle nocturne. | 259 |
| `safety.py` | Gardes de sécurité centralisés. Toute écriture passe par ici. | 166 |
| `state.json` | État runtime : version, dernier cycle, budget, compteur cycles. | ~10 |
| `proposals/_template.md` | Template standard pour les propositions. | ~40 |
| `proposals/pending/` | Propositions en attente de review Fabrice. | Variable |
| `proposals/accepted/` | Propositions acceptées (historique). | Variable |
| `proposals/rejected/` | Propositions rejetées (historique). | Variable |
| `proposals/ignored/` | Propositions ignorées (historique). | Variable |
| `diary/_template.md` | Template pour les entrées du journal quotidien. | ~25 |
| `triggers/` | Fichiers `.trigger` créés pour déclencher un cycle manuel. | Variable |

#### Cycle de conscience (`consciousness.py`)

Structure d'un cycle (10-30 min, Haiku, ~0.30€) :

1. **Safety checks** — vérifie kill-switches (`ouroboros.flag`, `global.flag`) et budget
2. **Orient** — lit state.json, proposals existantes, diary
3. **Observe** — scanne git log (commits du jour), submodules, drafts marketing, décisions récentes
4. **Connect** — détecte les relations entre signaux (via appel LLM Haiku)
5. **Judge** — évalue pertinence, risque, urgence
6. **Write** — produit 0 à 3 propositions + 1 diary entry
7. **Archive** — met à jour state.json

Rythme : 1 cycle par nuit entre 2h et 5h CEST (heures creuses).

Appel LLM : via le Claude Agent SDK (`query()` du package `@anthropic-ai/claude-agent-sdk`), le même que `chat.ts`. Tout est couvert par le plan Max 5x/20x (fenêtres de 5h). Le binaire Claude Code est embarqué dans le Docker. Pas de clé API séparée. Note : `consciousness.py` contient un fallback `ANTHROPIC_API_KEY` hérité mais non utilisé — le chemin principal est le SDK.

#### Sécurité (`safety.py`)

Modèle de sécurité en whitelist stricte :

**Écriture autorisée** (3 dossiers uniquement) :
- `brain/ouroboros/proposals/`
- `brain/ouroboros/diary/`
- `brain/ouroboros/state/`

**Écriture interdite** (deny-list explicite) :
- `saas/`, `.claude/`, `.git/`
- `BIBLE.md`, `CLAUDE.md`, `README.md`, `ARCH.md`, `ANTI-IA.md`, `VISUELS.md`, `AUDIT.md`
- `strategie/`, `produits/`, `marketing/`, `growth-marketing/`, `distribution/`
- `f2/`, `romain/`, `fabrice/`, `la-toile/`, `asset-brand/`, `tracking/`, `archives/`

**Opérations git bloquées** : add, commit, push, pull, fetch, merge, rebase, reset, checkout, branch, tag, stash, cherry-pick, revert, clean, rm, mv, submodule

**Commandes shell bloquées** : rm, mkfs, dd, curl, wget, sudo, chmod, chown, systemctl, kill

**HTTP** : seul GET autorisé. Tout POST/PUT/DELETE/PATCH bloqué.

Écriture atomique : tmp + rename pour éviter les fichiers partiels.

#### Kill-switches

| Fichier | Effet |
|---|---|
| `ops/kill-switches/ouroboros.flag` | Arrêt immédiat d'Ouroboros. Pas de dernière action. |
| `ops/kill-switches/global.flag` | Arrêt de tous les systèmes brain. |

Auto-activés par le système budget : 90% → kill ouroboros, 100% → kill global.

#### État actuel

Initialisé le 20 avril 2026. **0 cycles exécutés** à ce jour. 0€ de budget utilisé sur 10€ de cap.

#### Template de proposition

Champs obligatoires : date, auteur (Ouroboros), priorité (faible/moyenne/haute), statut, contexte, observation, recommandation, risques (si accepté / si rejeté / si ignoré), action attendue, sources, effort estimé, niveau de confiance.

### 1.2 MemPalace — archive verbatim

Dossier : `brain/mempalace/`

MemPalace stocke le contenu verbatim de toutes les conversations et documents importants. Organisé comme un palais de mémoire antique.

#### Structure spatiale

```
mempalace/
├── wings/                    # Entités ou thèmes larges
│   ├── romain/               # Conversations/docs Romain
│   ├── fabrice/               # Conversations/docs Fabrice
│   ├── storemd/               # Tout sur StoreMD
│   ├── leak-detector/         # Historique Leak Detector
│   ├── payloaddiff/           # PayloadDiff
│   ├── contentforge/          # ContentForge
│   ├── f2-ops-hub/            # Ops Hub interne
│   ├── f2-studio/             # Vision, roadmap, décisions studio
│   └── marketing/             # Marketing transversal
│
├── agent-diaries/             # 1 diary par agent spécialisé
├── chroma/                    # Embeddings locaux (gitignored)
└── knowledge_graph.db         # SQLite KG temporel (gitignored)
```

- **Wing** = entité ou thème large (un SaaS, une personne, un domaine)
- **Room** = sous-unité temporelle (1 jour, 1 session, 1 meeting)
- **Drawer** = contenu verbatim (une conversation, un doc, une décision)

#### Ingestion

Automatique via hooks Claude Code :
- `mempalace-save.sh` : save session en cours toutes les 10 min
- `precompact-save.sh` : save avant `/compact`
- Session stop : save final

Manuelle via CLI :
- `mempalace mine ./raw/transcripts/claude-export.json`
- `mempalace add --wing storemd --content "$(cat session.md)"`

#### Recherche (backend)

Implémentée dans `backend/jarvis/src/lib/mempalace.ts` (290 lignes).

Mécanisme : Fuse.js fuzzy search en mémoire.
- Poids : content 0.6, filename 0.2, tags 0.15, wing 0.05
- Threshold : 0.5
- Cache TTL : 10 minutes
- Source : GitHub tree API (recursive) → fetch batch (concurrency 10) → parse frontmatter YAML → build Fuse index

Exposé via :
- Tool MCP `mempalace_search(query, limit)` (via chat.ts)
- Route REST `POST /search` (via search.ts)
- Route REST `GET /mempalace/wings`, `GET /mempalace/wing/:id`, `GET /mempalace/drawer/:wing/:filename`, `GET /mempalace/stats`

#### Knowledge graph temporel

SQLite local (gitignored) avec entités et relations datées :
```
("Fabrice", "works_on", "StoreMD", valid_from="2026-02-15", valid_to=NULL)
("Leak Detector", "has_MRR", "420€", valid_from="2026-04-01", valid_to="2026-04-30")
```

Permet des requêtes historiquement précises ("Qu'est-ce que Fabrice bossait en mars 2026 ?").

#### Drawers format

Fichiers markdown avec frontmatter YAML :
```yaml
---
tags: [storemd, pricing, decision]
date: "2026-04-16"
source: "claude-code-session"
---
# Contenu verbatim ici
```

### 1.3 Mem0 — extraction de faits structurés

Dossier : `brain/mem0/`

**Statut : OPTIONNEL pour V1. Documenté mais non implémenté.**

Mem0 extrait des faits structurés (triplets sujet/prédicat/objet) depuis les conversations. Complémentaire à MemPalace : Mem0 résume, MemPalace archive verbatim.

Config prévue :
- Vector store : ChromaDB local
- LLM extraction : Haiku (suffisant)
- Embedder : HuggingFace `BAAI/bge-small-en-v1.5` (local, 0-cost)
- Stockage : fichiers JSONL (facts.jsonl, preferences.jsonl, relations.jsonl) — gitignored

Différence clé avec MemPalace :
- MemPalace = "retrouver UNE conversation précise" (verbatim)
- Mem0 = "répondre à 'what do we know about X'" (faits extraits)

### 1.4 Graphify — knowledge graph des concepts

Dossier : `graphify-out/`

Graphify analyse le corpus de documents F2 et en extrait un graphe de concepts interconnectés.

#### Données

Fichier : `graphify-out/concepts.json`
- 45 nodes, 76 edges, 27 communities
- Note : GRAPH_REPORT.md indique 71 nodes / 61 edges, mais concepts.json (source de vérité chargée par le backend) contient 45 nodes et 76 edges
- Corpus : 23 fichiers, ~735 497 mots
- God nodes : SafetyViolation (7 edges), main() (7 edges), call_llm() (5 edges)

#### Backend (`graphify.ts`)

Fuse.js search sur les nodes (label, description, type, wing). Threshold 0.4.

Fonctions :
- `graphifyRoute()` : retourne tous les nodes et edges
- `graphifyNodeRoute()` : retourne un node + ses voisins directs + edges
- `graphifySearchRoute()` : recherche fuzzy dans les concepts
- `graphifyRelatedRoute()` : traversée de graphe avec profondeur configurable (max 3)
- `buildGraphifyContext()` : injecte les 4 concepts les plus pertinents dans le system prompt du chat, avec instruction de citer via `[G:concept-id]`

Cache TTL : 10 minutes.

---

## Couche 2 — Backend

Dossier : `backend/jarvis/`

Express.js sur Railway, port 3001. Auth via header `X-JARVIS-AUTH` (shared secret). CORS vers `f2-jarvis.vercel.app`. Body limit 10 MB.

### 2.1 Routes (server.ts — 27 endpoints)

#### Santé
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| GET | `/health` | `server.ts` (inline) | Health check Railway. Pas d'auth requise. |

#### Chat et historique
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| POST | `/chat` | `chat.ts` | Cerveau principal. Streaming JSONL. |
| GET | `/chat/history` | `chat-history.ts` | 50 derniers messages d'une conversation. |

#### Contexte et recherche
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| GET | `/context` | `context.ts` | Timeline + compteurs + alertes du jour. |
| POST | `/search` | `search.ts` | Recherche MemPalace (Fuse.js). |
| GET | `/file` | `file.ts` | Lecture d'un fichier .md du repo. |
| GET | `/graph` | `graph.ts` | Graphe de fichiers .md pour visualisation 3D. |

#### Actions
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| POST | `/action` | `action.ts` | **Legacy.** Exécution directe (sans propose/validate). |
| POST | `/action/propose` | `action-propose.ts` | Proposition manuelle (testing). |
| POST | `/action/execute` | `action-execute.ts` | Exécution d'une action validée. |
| POST | `/action/reject` | `action-reject.ts` | Rejet d'une action proposée. |

#### Graphify
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| GET | `/graphify` | `graphify.ts` | Tous les nodes et edges du knowledge graph. |
| GET | `/graphify/search` | `graphify.ts` | Recherche fuzzy dans les concepts. |
| GET | `/graphify/related` | `graphify.ts` | Voisins d'un concept (depth configurable). |
| GET | `/graphify/node/:id` | `graphify.ts` | Détail d'un node + voisins + edges. |

#### MemPalace
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| GET | `/mempalace/wings` | `mempalace.ts` | Liste des wings. |
| GET | `/mempalace/stats` | `mempalace.ts` | Stats globales. |
| GET | `/mempalace/wing/:id` | `mempalace.ts` | Drawers d'une wing. |
| GET | `/mempalace/drawer/:wing/:filename` | `mempalace.ts` | Contenu complet d'un drawer. |

#### Ouroboros
| Méthode | Route | Fichier | Rôle |
|---|---|---|---|
| GET | `/ouroboros/status` | `ouroboros.ts` | État (dernier cycle, budget, kill-switch, proposals pending). |
| GET | `/ouroboros/proposals` | `ouroboros.ts` | Liste des propositions pending triées par priorité. |
| GET | `/ouroboros/proposal/:id` | `ouroboros.ts` | Détail d'une proposition. |
| POST | `/ouroboros/action` | `ouroboros.ts` | Accept/reject/ignore une proposition. |
| POST | `/ouroboros/trigger` | `ouroboros.ts` | Déclencher un cycle manuel. |
| POST | `/ouroboros/kill-switch` | `ouroboros.ts` | Activer/désactiver le kill-switch. |
| GET | `/ouroboros/diary` | `ouroboros.ts` | 10 dernières entrées du journal. |
| POST | `/ouroboros/initialize` | `ouroboros.ts` | Initialiser Ouroboros (state.json + dossiers). |

### 2.2 Cerveau — chat.ts (490 lignes)

Le fichier le plus critique du système. Il orchestre chaque échange entre l'utilisateur et JARVIS.

#### Flux d'une requête `/chat`

1. **Validation** — persona (romain/fabrice) + message ou image obligatoires. Images : png/jpeg/gif/webp, max 5 MB.
2. **Mémoire** — charge/crée la conversation Supabase (par userId + persona + mode). Charge les 20 derniers messages + summary compressé.
3. **Contexte** — charge 5 fichiers légers via GitHub API : CLAUDE.md, BIBLE.md, ANTI-IA.md, {persona}/VOIX.md, {persona}/plan-hebdo.md
4. **System prompt** — construit dynamiquement (~500 lignes) avec :
   - Identité JARVIS + date du jour en français
   - Règle #0 ANTI-IA (7 filtres)
   - Pattern PROPOSE/VALIDE/EXECUTE
   - Voix persona (3 profils distincts : Romain CRO, Fabrice Builder, F2 Studio)
   - 35 patterns de reconnaissance conversationnelle
   - Format de réponse avec markers [CONTENT], [ACTION_PENDING], [TAG]
   - Documentation des 9 outils MCP
   - Contexte fichiers + summary + historique tronqué
5. **Claude Agent SDK** — `query()` avec streaming, MCP server inline, maxTurns 15, permissionMode "dontAsk"
6. **Streaming JSONL** — chaque chunk est un objet JSON suivi d'un newline. Types : `text`, `tool_use`, `tool_result`, `end`, `error`
7. **Persistence** — sauvegarde le message user (avant) et assistant (après) dans Supabase

#### Résolution du binaire Claude

6 chemins candidats testés en séquence :
1. `CLAUDE_CODE_EXECUTABLE` (env var)
2. `/app/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude`
3. `/app/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64-musl/claude`
4. `/usr/local/bin/claude`
5. `{cwd}/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude`

Si aucun trouvé : `pathToClaudeCodeExecutable` non passé (le SDK tente son propre fallback).

### 2.3 Outils MCP — jarvis-tools.ts (450 lignes)

9 outils exposés via `createSdkMcpServer()`, liés à la conversation en cours :

| Outil | Description | Source de données |
|---|---|---|
| `repo_read(path)` | Lit un fichier du repo (truncate 20K chars). | GitHub API |
| `repo_search(query, scope)` | Recherche fulltext dans le repo (top 10). | GitHub Code Search API |
| `repo_list_publications(persona, platform)` | Liste les posts récents d'une persona. | GitHub API (listing dossiers) |
| `repo_search_voice_examples(persona, angle)` | Trouve des exemples de voix passés pour calibrer le ton. | GitHub Code Search API |
| `timeline_today(persona, mode)` | Planning live du jour (posts + objectifs + cross). | Backend /context |
| `counters_today(persona, mode)` | Compteurs live du jour. | Backend /context |
| `propose_action(action_type, params, preview)` | Propose une modification au repo. Retourne un UUID. | Supabase insert |
| `recent_history(persona, days)` | Synthèse des derniers N jours (progress + cold + engagement). | GitHub API |
| `mempalace_search(query, limit)` | Recherche dans l'archive MemPalace. | Fuse.js in-memory |

#### Instruction critique pour `propose_action`

L'outil retourne un `action_id` (UUID). Le system prompt ordonne à Claude d'inclure `[ACTION_PENDING:uuid]` dans sa réponse finale. Sans ce marker, l'UI ne rend pas le bouton "Valider" — l'action reste pending indéfiniment.

11 types d'actions supportés : mark_published, log_cold, batch_cold, queue_cold_targets, update_cold_reply, log_engagement, log_interaction, mark_cross_published, resolve_alert, log_decision, create_file.

### 2.4 Action executor — action-executor.ts (280 lignes)

Exécute les actions validées par l'utilisateur. Deux chemins d'écriture :

**Chemin standard** (10 types sauf create_file) :
1. Lire le fichier cible via `ghRead()`
2. Appliquer une transformation markdown (`applyTransform()`)
3. Écrire le résultat via `ghWrite()` avec le SHA original
4. Mettre à jour le status dans Supabase : `executed` ou `failed`

**Chemin create_file** :
1. Valider le path (whitelist de préfixes + extensions + patterns root)
2. Valider le contenu (max 500 KB, non vide)
3. Si le fichier existe : overwrite avec SHA. Sinon : create.
4. Commit avec message `[JARVIS] {commit_message}`

#### Sécurité create_file

Préfixes autorisés : `f2/`, `fabrice/`, `romain/`, `strategie/`, `patterns/`, `tracking/`, `archives/`, `distribution/`, `growth-marketing/`, `saas/`, `produits/`, `ops/`, `marketing/`

Patterns root autorisés : `BATCH-SEMAINE-\d+.md`, `PLAN-*.md`, `HANDOFF*.md`, `CHANGELOG*.md`, `REVUE-*.md`

Extensions autorisées : `.md`, `.txt`, `.json`, `.yml`, `.yaml`, `.csv`

Interdit : traversal (`..`), chemins absolus, backslash, fichiers sans extension.

### 2.5 Route legacy — action.ts

Endpoint `POST /action` qui exécute directement 5 types d'actions sans passer par le workflow propose/validate. Utilisé potentiellement par des scripts ou des chemins UI hérités. Types : mark_published, log_decision, incident_resolved, log_cold, log_interaction.

### 2.6 Contexte live — context.ts (300+ lignes)

Parse les fichiers markdown du repo pour construire le tableau de bord en temps réel :

**Timeline** : extrait les items du jour depuis `plan-hebdo.md` (sections POSTS par plateforme), filtre par date/jour de la semaine, calcule le status (✅/⊘/⏳).

**Compteurs** : compte les lignes de table dans `cold-outreach-log.md`, `engagement-log.md`, `cross-engagement-tracker.md` qui correspondent à la date du jour. Par plateforme : cold, twEng, liCom, reddit, facebook, ihPh, cross, total.

**Alertes** : parse les événements notables dans `progress-semaine.md`, filtre ceux de la semaine en cours, classifie en critical (SUSPENDU, INCIDENT, BLOQUÉ) ou warning (En attente, ⏳). Ignore les événements marqués RÉSOLU. Max 5 alertes.

**Objectifs** : compare les compteurs aux targets quotidiens (cold 10/jour, engagement 30/jour) pour afficher la progression.

**Cross items** : parse `cross-engagement-tracker.md` pour le jour en cours (section weekday + date), extrait post, heure, sujet, status.

### 2.7 GitHub — github.ts + cache.ts

CRUD complet sur le repo `altidigitech-ui/F2-Jarvis`, branche `main`.

| Fonction | Rôle |
|---|---|
| `ghRead(path)` | Lit un fichier, retourne contenu + SHA. Cache 5 min. |
| `ghWrite(path, content, sha, msg)` | Écrit un fichier (nécessite le SHA pour optimistic locking). |
| `ghUpdate(path, modifyFn, msg)` | Read-modify-write atomique. |
| `ghCreate(path, content, msg)` | Crée un nouveau fichier. |
| `ghDelete(path, sha, msg)` | Supprime un fichier. |
| `ghList(dirPath)` | Liste le contenu d'un dossier. |

Cache in-memory (Map), TTL 5 minutes, invalidation manuelle sur chaque write. Process-local (reset au restart Railway).

### 2.8 Mémoire conversationnelle — jarvis-memory.ts

Persistence des conversations dans Supabase.

| Fonction | Rôle |
|---|---|
| `loadOrCreateConversation(userId, persona, mode)` | 1 conversation par (user, persona, mode). Crée si inexistante. |
| `loadMessages(conversationId, limit)` | Derniers N messages, oldest-first. |
| `saveMessage(conversationId, role, content, options)` | Persiste un turn (user/assistant/system). Supporte images base64, tool_calls JSON, pending_action_id. |

Estimation tokens : `Math.ceil(text.length / 4)` (approximation naive).

### 2.9 Markdown transforms — markdown.ts

Fonctions utilitaires pour modifier chirurgicalement des fichiers markdown tabulaires :

| Fonction | Effet |
|---|---|
| `markPlanPublished(md, title)` | Remplace ⏳ par ✅ + heure dans la ligne matchée. |
| `appendColdLog(md, platform, ...)` | Ajoute une ligne dans la section TWITTER ou LINKEDIN. |
| `appendEngagementLog(md, platform, ...)` | Ajoute une ligne d'engagement par plateforme. |
| `markCrossPublished(md, post, reply)` | Marque ✅ dans le cross-engagement tracker. |
| `appendDecision(md, decision, ...)` | Ajoute une décision dans le log. |
| `updateColdReply(md, target, status)` | Met à jour le status d'un cold outreach (⏳ → ✅). |
| `appendColdQueue(md, platform, targets)` | Queue des cibles cold sans outreach effectué. |
| `resolveProgressEvent(md, keyword)` | Marque un événement comme RÉSOLU. |

Toutes les dates/heures en CEST (Europe/Paris).

### 2.10 Graph de fichiers — graph.ts

Route `GET /graph` qui construit un graphe de tous les fichiers .md du repo pour la visualisation 3D (RepoGraph3D).

Chaque fichier = 1 node avec : id (path), name, wing (via WING_MAP), size, val (log scale). Liens = folder-chain (fichiers du même dossier liés séquentiellement). Pas de wikilinks parsés.

Cache 5 minutes.

WING_MAP : f2→f2-core, strategie→strategie, romain→romain, fabrice→fabrice, saas→saas, brain→f2-core, ops→f2-core, etc.

---

## Couche 3 — Frontend

Dossier : `ui/jarvis/`

Next.js 14 sur Vercel. 3 pages principales + 29 proxy API routes.

### 3.1 Pages

| Route | Composant | Rôle |
|---|---|---|
| `/` | `page.tsx` | Accueil "Bonjour" — choix persona (Romain ou Fabrice) |
| `/login` | `login/page.tsx` | Authentification Supabase (email/password) |
| `/romain` | `romain/page.tsx` | `<PersonaLayout persona="romain" showF2Toggle={true} />` |
| `/fabrice` | `fabrice/page.tsx` | `<PersonaLayout persona="fabrice" />` |

Seul Romain a le toggle F2/personnel (`showF2Toggle`).

### 3.2 Auth et middleware

**Middleware** (`middleware.ts`) : intercepte toutes les requêtes sauf `_next/static`, `favicon`. Appelle `updateSession()` pour refresh le cookie Supabase.

**Auth flow** :
1. Supabase `getUser()` côté serveur
2. Si pas de user → redirect `/login` (ou 401 pour les API)
3. Si user mais `user.user_metadata.f2_authorized !== true` → redirect `/login?error=unauthorized` (ou 403)
4. Seuls Fabrice et Romain sont autorisés (flag custom dans Supabase)

**Paths publics** : `/login`, `/auth/callback`, `/api/commit-batch`

### 3.3 Proxy API routes

Toutes les routes `ui/jarvis/app/api/*` sont des proxies Next.js qui :
1. Vérifient l'auth Supabase
2. Ajoutent les headers `X-JARVIS-AUTH` (shared secret) et `X-USER-ID`
3. Relayent la requête vers `RAILWAY_BACKEND_URL`

Le endpoint `/api/chat` a `maxDuration: 120` (timeout 2 min pour le streaming).

### 3.4 Vercel crons

`vercel.json` configure 3 crons quotidiens :
- `0 10 * * *` (10h UTC = 12h CEST)
- `0 16 * * *` (16h UTC = 18h CEST)
- `0 20 * * *` (20h UTC = 22h CEST)

Tous appellent `POST /api/commit-batch`. C'est le mécanisme de batch auto-commit que le cockpit affiche dans le countdown.

### 3.5 PersonaLayout.tsx (733 lignes)

Cockpit principal en 4 colonnes :

```
┌──────────┬───────────┬─────────────────┬─────────────┐
│ Sidebar  │ Timeline  │     Chat        │  Sidebar    │
│ gauche   │           │                 │  droite     │
│ 200px    │           │   flex-1        │  290px      │
│          │           │                 │             │
│ Brain3D  │ Items du  │  Streaming      │ Compteurs   │
│ Graphify │ jour      │  JSONL          │ 2×4 grid    │
│ MemPal.  │ (posts,   │  + markers      │             │
│ QuickAcc │  cross,   │  + images       │ Alertes     │
│          │  objectifs│                 │ (dismiss.)  │
│          │  )        │                 │             │
│          │           │                 │ Ouroboros   │
│          │           │                 │ Panel       │
│          │           │                 │             │
│          │           │                 │ Auto-commit │
│          │           │                 │ countdown   │
└──────────┴───────────┴─────────────────┴─────────────┘
```

**Couleurs persona** : Romain = #00ffb4 (vert), Fabrice = #9b8fff (violet), F2 = #97C459 (vert olive)

**Mode F2** : change l'accent color, affiche le banner F2 avec les règles voix, switch la timeline sur weekPlanningF2.

**Refresh** : context reloadé toutes les 60 secondes + après chaque `jarvis:repo-updated` event (avec 1.5s de délai).

**Batch countdown** : calcule le temps restant avant le prochain batch (12h, 18h, 22h CEST).

### 3.6 Chat.tsx (1313 lignes)

Composant central de conversation.

**Streaming** : lit le JSONL du backend ligne par ligne. Chaque chunk est parsé et dispatché :
- `type: "text"` → ajouté au contenu du message assistant en cours
- `type: "tool_use"` → affiché comme ToolEvent (nom + input) avec status "running"
- `type: "tool_result"` → preview du résultat, status "done" ou "error"
- `type: "end"` → fin du streaming

**Images** : support paste et drag-drop. Max 5 MB. Types : png, jpeg, gif, webp. Envoyées en base64 dans le body.

**Markers** : le texte du message assistant est parsé par `parseJarvisMarkers()` qui extrait :
- `[ACTION_PENDING:uuid]` → composant `ActionCard` (boutons Valider/Rejeter)
- `[CONTENT:type]...[/CONTENT]` → composant `ContentCard` (badge plateforme, compteur caractères, bouton Copier)
- `[CONTENT-FR]...[/CONTENT-FR]` → rattaché au CONTENT précédent si dans les 120 chars, toggle FR dans ContentCard
- `[TAG:text]` → composant `TagLine` (pills cliquables qui injectent dans le chat)

**Citations** : extraction automatique de `[wing/filename]` (→ sources MemPalace) et `[G:concept-id]` (→ sources Graphify).

**Historique** : chargé au mount via `GET /api/chat/history`. Messages affichés avec timestamp CEST.

**File context** : quand l'utilisateur clique sur un fichier dans la sidebar, le contenu est injecté comme contexte dans le prochain message.

**Graphify prefill** : quand l'utilisateur "Send to Jarvis" depuis Graphify ou MemPalace, le texte est pré-rempli dans l'input.

### 3.7 Composants spécialisés

| Composant | Lignes | Rôle |
|---|---|---|
| `OuroborosPanel.tsx` | 377 | Status, proposals, kill-switch toggle, trigger cycle, diary. Refresh 2 min. |
| `OuroborosProposalsModal.tsx` | 467 | Modal fullscreen pour review proposals ou afficher le diary. Accept/reject/ignore avec commentaire. |
| `MemPalaceView.tsx` | 806 | Exploration wings → drawers, search, send to Jarvis. |
| `GraphifyView.tsx` | 428 | Visualisation knowledge graph, search, click explore, send to Jarvis. |
| `GraphifyFullscreen.tsx` | 50 | Wrapper fullscreen pour GraphifyView. |
| `FileViewerModal.tsx` | 366 | Modal lecture fichier .md du repo. |
| `TimelineColumn.tsx` | 165 | Colonne timeline du jour (items colorés par status). |
| `QuickAccessSidebar.tsx` | 84 | Raccourcis : plan hebdo, batch, cross, cold, progress, memory. |
| `CounterTile.tsx` | 43 | Tuile compteur individuelle (valeur/target, barre de progression). |
| `ActionCard.tsx` | 130 | Boutons Valider/Rejeter une action proposée. Émet `jarvis:repo-updated`. |
| `ContentCard.tsx` | 120 | Bloc contenu copiable avec badge plateforme, compteur chars, toggle FR. |
| `TagLine.tsx` | 30 | Pills de suggestions cliquables. |
| `Brain3D.tsx` | 275 | Visualisation 3D du brain (React Three Fiber). |
| `Brain3DFullscreen.tsx` | 205 | Version fullscreen avec chargement de fichiers. |
| `RepoGraph3D.tsx` | 146 | Graphe 3D des fichiers du repo (react-force-graph-3d). |
| `RepoGraph3DFullscreen.tsx` | 386 | Version fullscreen avec interaction fichiers. |
| `BrainSVG.tsx` | 81 | Fallback SVG statique du brain. |
| `ErrorBoundary.tsx` | 39 | Boundary React pour les composants 3D (crash gracieux). |

### 3.8 Système d'événements — jarvisEvents.ts

Bus de communication inter-composants via `CustomEvent` :

| Événement | Émis par | Écouté par | Payload |
|---|---|---|---|
| `jarvis:repo-updated` | `ActionCard` (après commit) | `PersonaLayout` (refresh context) | `{ actionType?, paths? }` |
| `jarvis:send-to-chat` | `MemPalaceView`, `GraphifyView` | `Chat` (prefill input) | `{ text }` |

### 3.9 ui/brain-3d/ — app Vite standalone

App séparée (Vite + React + Tailwind + React Three Fiber + Zustand) pour une visualisation 3D immersive du brain. Composants : Brain.tsx, Region.tsx, DropZone.tsx, SidePanel.tsx. Store Zustand avec zones configurables.

### 3.10 ui/web/ — app secondaire

App Next.js légère avec pages :
- `/morning` : briefing matinal
- `/proposals` : review proposals Ouroboros
- `/budget` : suivi budget
- `/graph` : visualisation graphe

---

## Couche 4 — Data

### 4.1 Supabase — 3 tables

**`jarvis_conversations`**
- PK : uuid (gen_random_uuid)
- Unique : (user_id, persona, mode)
- Champs : summary (text), summary_tokens (int), summary_updated_at
- Trigger : `jarvis_touch_conversation` met à jour `updated_at` à chaque insert dans messages

**`jarvis_messages`**
- FK : conversation_id → jarvis_conversations
- Champs : role (user/assistant/system), content (text), image_media_type, image_data (base64), tool_calls (jsonb, default []), pending_action_id (uuid nullable)
- Index : (conversation_id, created_at)

**`jarvis_pending_actions`**
- FK : conversation_id → jarvis_conversations, message_id → jarvis_messages (nullable)
- Champs : action_type (text), params (jsonb), preview (text), status (enum: pending/validated/rejected/executed/failed), commit_sha, error
- Index : (conversation_id, status, created_at)

**RLS** : activé sur les 3 tables. Policies user-scoped (select where user_id = auth.uid()). Le backend utilise `SUPABASE_SERVICE_ROLE_KEY` qui bypass RLS — les writes sont autorisés côté application.

### 4.2 GitHub comme DB

Le repo `altidigitech-ui/F2-Jarvis` sert de base de données de contenu. Avantages : versionning natif (git history), audit trail complet, diff visuel, rollback trivial. Inconvénient : latence API (~200-500ms par requête), rate limits GitHub.

Toutes les modifications sont des commits sur la branche `main` avec préfixe `[JARVIS]`.

### 4.3 Variables d'environnement

#### Backend (Railway)
- `GITHUB_TOKEN` : accès au repo (read + write)
- `SUPABASE_URL` : URL du projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : clé service-role (bypass RLS)
- `BACKEND_SHARED_SECRET` : secret partagé avec le frontend
- `OUROBOROS_ENABLED` : flag pour activer le cycle background Ouroboros
- `OUROBOROS_INTERVAL_MS` : intervalle entre cycles (défaut 7200000 = 2h)
- `PORT` : 3001 par défaut
- `ALLOWED_ORIGIN` : URL du frontend Vercel
- `CLAUDE_CODE_EXECUTABLE` : chemin optionnel vers le binaire Claude

#### Frontend (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL` : URL publique Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : clé anon Supabase
- `RAILWAY_BACKEND_URL` : URL du backend Railway
- `BACKEND_SHARED_SECRET` : secret partagé avec le backend

---

## Ops et budget

Dossier : `ops/`

### Budget (ops/budget/)

Plan Anthropic Max 5x : $100/mois (~90€). Inclut Claude Code, conversations, Graphify, background agents.

Budget incrémental (hors plan) : 30€/mois max.

| Service | Cap mensuel | Rationale |
|---|---|---|
| Ouroboros | 10€ | 1 cycle/nuit, Haiku only |
| Graphify | 5€ | Re-indexation occasionnelle |
| MemPalace | 2€ | Local-first, embeddings locaux |
| MCP externe | 8€ | Brevo, Stripe, etc. |
| Buffer | 5€ | Marge imprévus |

Caps par modèle : Opus 5€ (manual only), Sonnet 15€, Haiku 10€.

Alertes : daily 2€ (Telegram), weekly 10€, monthly 80% (24€ → kill ouroboros), monthly 100% (30€ → kill global).

### Model tiers (ops/monitoring/model-tier-rules.yaml)

Haiku par défaut pour : retrieval, summarization, classification, tagging, formatting, translation, simple QA.

Sonnet pour : code generation, code review, architecture decisions, creative writing, complex reasoning, multi-step agents.

Opus : **uniquement** sur demande explicite de Fabrice (prompt contient "opus", "ultrathink", "critical decision", ou flag `--model opus`). Jamais d'auto-escalade.

### Cache policy (ops/monitoring/cache-policy.md)

Prompt caching Claude API :
- TTL 1h (cache write 2x, cache read 10%) : CLAUDE.md, BIBLE.md, skills always-on, GRAPH_REPORT.md, strategie/CONTEXT.md
- TTL 5min (cache write 1.25x) : skills on-demand, fichiers context de session
- Jamais caché : messages utilisateur, outputs tool calls, HANDOFF.md

Objectif : cache hit rate > 70% par session. Si < 70% → investiguer.

### Kill-switches (ops/kill-switches/)

| Fichier | Créé par | Effet |
|---|---|---|
| `ouroboros.flag` | Budget auto (90%) ou UI JARVIS | Arrête Ouroboros |
| `mempalace.flag` | Budget auto (optionnel) | Arrête MemPalace |
| `global.flag` | Budget auto (100%) ou UI JARVIS | Arrête tout |

Aucun kill-switch actif au 22 avril 2026.

---

## 35 patterns de reconnaissance conversationnelle

Le system prompt de chat.ts inclut 35 patterns qui permettent à JARVIS de réagir automatiquement aux phrases de l'utilisateur. Classés par catégorie :

1-3 : **Publication** — "j'ai posté X" → mark_published, "publication prévue à Yh" → note, "ajuste X à Y" → re-propose
4-7 : **Cold outreach** — "j'ai envoyé N cold" → batch_cold, "cold DM à @X" → log_cold, "X a répondu" → update_cold_reply, "X a accepté ma connexion" → update_cold_reply
8-10 : **Listes Grok/ChatGPT** — parser des profils → queue_cold_targets
11-13 : **Engagement** — "engagement fait sur X" / "j'ai commenté" / "reply sur thread" → log_engagement
14-16 : **Cross-engagement** — "cross fait" → mark_cross_published, "j'ai pas fait le cross" → rappel, "Romain a publié ?" → timeline_today
17-21 : **Screenshots** — analyse image (plateforme, auteur, contenu), génère reply en voix persona
22-26 : **Génération** — "écris-moi un tweet" → voice examples + generate, "reformule pour LinkedIn" → adapt, "3 angles pour lundi" → propose
27-29 : **Bilan** — "résumé / bilan" → counters + timeline + history, "qui m'a répondu ?" → cold-log, "qu'est-ce qu'il me reste ?" → objectifs vs compteurs
30-32 : **Feedback** — "envoyée" → log_interaction, "change X" → re-propose, "parfait/go" → confirmation (UI gère)
33 : **Ambiguïté** — conversation normale, clarification si besoin
34-35 : **Création fichiers stratégiques** — "génère le batch S7" → lit context complet, génère, propose_action(create_file)

---

## Flux de données critiques

### Flux 1 : Message utilisateur → Réponse JARVIS

```
User (frontend) 
  → POST /api/chat (proxy Vercel, auth + userId)
    → POST /chat (backend Railway, auth shared secret)
      → loadOrCreateConversation (Supabase)
      → loadMessages (Supabase, 20 derniers)
      → loadFile × 5 (GitHub API)
      → buildSystemPrompt (~500 lignes)
      → saveMessage(user) (Supabase)
      → query() (Claude Agent SDK, streaming)
        ↔ MCP tools (repo_read, repo_search, propose_action, etc.)
      → stream JSONL → frontend
      → saveMessage(assistant) (Supabase)
```

### Flux 2 : Action proposée → Commit GitHub

```
Claude (via propose_action tool)
  → INSERT jarvis_pending_actions (Supabase, status: pending)
  → retourne [ACTION_PENDING:uuid] dans la réponse

User clique "Valider" (ActionCard)
  → POST /api/action/execute (proxy Vercel)
    → POST /action/execute (backend Railway)
      → SELECT jarvis_pending_actions (vérif ownership)
      → executeAction(actionId)
        → ghRead (GitHub, get current content + SHA)
        → applyTransform (markdown modification)
        → ghWrite (GitHub, commit sur main)
        → UPDATE status = 'executed' (Supabase)
      → emitRepoUpdated() (frontend, refresh context)
```

### Flux 3 : Ouroboros cycle nocturne

```
Cron (2h-5h CEST) ou trigger manuel
  → python consciousness.py
    → check_kill_switches()
    → check_budget()
    → gather_signals() (git log, submodules, proposals, decisions, drafts)
    → call_llm(Haiku) → analyse
    → write_diary() → brain/ouroboros/diary/YYYY-MM-DD.md
    → (optionnel) write proposals → brain/ouroboros/proposals/pending/*.md
    → update_last_cycle() → brain/ouroboros/state/last-cycle.json

Fabrice review (via UI OuroborosPanel ou Claude Code /review-proposals)
  → POST /ouroboros/action (accept/reject/ignore)
    → ghCreate (move file to accepted/rejected/ignored)
    → ghDelete (remove from pending)
```

---

## Inventaire complet des fichiers de code

### Backend (backend/jarvis/src/) — 14 fichiers, ~3 200 lignes

```
src/
├── server.ts                    # Entrypoint Express, 27 routes
├── routes/
│   ├── chat.ts                  # Cerveau principal (490 lignes)
│   ├── chat-history.ts          # Historique messages
│   ├── context.ts               # Timeline + compteurs + alertes (300+ lignes)
│   ├── action.ts                # Actions legacy (exécution directe)
│   ├── action-propose.ts        # Proposition manuelle
│   ├── action-execute.ts        # Exécution validée
│   ├── action-reject.ts         # Rejet
│   ├── graphify.ts              # Knowledge graph (4 endpoints)
│   ├── mempalace.ts             # Archive verbatim (4 endpoints)
│   ├── ouroboros.ts              # Conscience bridée (8 endpoints, 380 lignes)
│   ├── file.ts                  # Lecture fichier .md
│   ├── graph.ts                 # Graphe de fichiers pour 3D
│   └── search.ts                # Recherche MemPalace
├── lib/
│   ├── jarvis-tools.ts          # 9 outils MCP (450 lignes)
│   ├── jarvis-memory.ts         # Persistence Supabase
│   ├── action-executor.ts       # Exécution + sécurité create_file (280 lignes)
│   ├── github.ts                # CRUD GitHub API
│   ├── mempalace.ts             # Fuse.js search + index (290 lignes)
│   ├── markdown.ts              # Transforms markdown chirurgicaux
│   ├── cache.ts                 # Cache in-memory 5min
│   ├── context-types.ts         # Types partagés
│   └── supabase.ts              # Client Supabase service-role
```

### Brain (brain/) — 2 fichiers Python, ~425 lignes

```
brain/
├── ouroboros/
│   ├── consciousness.py         # Boucle de conscience (259 lignes)
│   ├── safety.py                # Gardes de sécurité (166 lignes)
│   ├── identity.md              # Identité (immuable)
│   ├── bible.md                 # Constitution (10 principes)
│   ├── state.json               # État runtime
│   ├── proposals/_template.md   # Template propositions
│   └── diary/_template.md       # Template journal
├── mem0/README.md               # Docs Mem0 (optionnel V1)
└── mempalace/README.md          # Docs MemPalace
```

### Frontend (ui/jarvis/) — 35+ fichiers, ~7 000+ lignes

```
ui/jarvis/
├── app/
│   ├── page.tsx                 # Accueil
│   ├── layout.tsx               # Layout root (Inter, fr)
│   ├── login/page.tsx           # Auth Supabase
│   ├── romain/page.tsx          # Cockpit Romain
│   ├── fabrice/page.tsx         # Cockpit Fabrice
│   ├── globals.css              # Styles globaux
│   └── api/                     # 29 proxy routes
├── components/
│   ├── PersonaLayout.tsx        # Cockpit 4 colonnes (733 lignes)
│   ├── Chat.tsx                 # Chat streaming (1313 lignes)
│   ├── OuroborosPanel.tsx       # Panel Ouroboros (377 lignes)
│   ├── OuroborosProposalsModal.tsx # Modal proposals (467 lignes)
│   ├── MemPalaceView.tsx        # Explorer MemPalace (806 lignes)
│   ├── GraphifyView.tsx         # Explorer Graphify (428 lignes)
│   ├── GraphifyFullscreen.tsx   # Fullscreen Graphify
│   ├── FileViewerModal.tsx      # Viewer fichier .md (366 lignes)
│   ├── TimelineColumn.tsx       # Timeline du jour
│   ├── QuickAccessSidebar.tsx   # Raccourcis sidebar
│   ├── CounterTile.tsx          # Tuile compteur
│   ├── Brain3D.tsx              # Visu 3D brain
│   ├── Brain3DFullscreen.tsx    # Visu 3D fullscreen
│   ├── RepoGraph3D.tsx          # Graphe fichiers 3D
│   ├── RepoGraph3DFullscreen.tsx # Graphe 3D fullscreen
│   ├── BrainSVG.tsx             # Fallback SVG
│   ├── ErrorBoundary.tsx        # Error boundary
│   └── jarvis/
│       ├── ActionCard.tsx       # Boutons Valider/Rejeter
│       ├── ContentCard.tsx      # Contenu copiable
│       └── TagLine.tsx          # Suggestions cliquables
├── lib/
│   ├── parseJarvisMarkers.ts    # Parser [ACTION_PENDING], [CONTENT], [TAG]
│   ├── jarvisEvents.ts          # Bus d'événements CustomEvent
│   ├── context-types.ts         # Types partagés
│   └── supabase/
│       ├── client.ts            # Client browser
│       ├── server.ts            # Client server
│       └── middleware.ts        # Auth + f2_authorized check
└── middleware.ts                # Middleware Next.js (auth guard)
```

---

*Document généré le 22 avril 2026 — audit complet, 100% du code source lu.*
*Toute modification architecturale future doit être reflétée dans ce fichier.*
