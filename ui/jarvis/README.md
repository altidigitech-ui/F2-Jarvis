# F2-Jarvis — Interface Web (Frontend)

**Statut :** En production
**Stack :** Next.js 14 + TypeScript + Tailwind + Supabase Auth
**Rôle :** cockpit web agentique pour R et F — tableau de bord réseaux + chat Claude personnel.

---

## Vue d'ensemble

F2-Jarvis UI est l'interface web que Romain et Fabrice utilisent au quotidien depuis leur navigateur pour :

1. Tracker leurs publications, cold outreach, engagement, cross-engagement en temps réel
2. Chatter avec un Claude Agent personnalisé (persona Romain ou Fabrice)
3. Visualiser la timeline du jour, les compteurs vs targets, les alertes à résoudre
4. Lancer des actions de commit dans le repo via pattern Propose → Validate → Execute

Le frontend est un **proxy léger** vers le backend Railway. Le vrai cerveau (Claude Agent SDK, tools, écriture GitHub API) est côté `backend/jarvis/`.

---

## Architecture

```
Utilisateur (navigateur) → f2-jarvis.vercel.app (Next.js)
                                  ↓
                          API routes proxy (app/api/*)
                                  ↓
                          Backend Railway (backend/jarvis/)
                                  ↓
                    ┌─────────────┴──────────────┐
                    ↓                            ↓
            Claude Agent SDK            GitHub API (read/write repo)
                    ↓
            9 tools Jarvis
```

### Flux typique

1. User ouvre `/romain` ou `/fabrice`
2. Frontend charge contexte via `/api/context?persona=romain&mode=normal`
3. Backend retourne timeline + compteurs + alertes depuis le repo
4. User tape un message dans le chat (ex: "j'ai posté le post F2 de 14h")
5. Frontend POST vers `/api/chat` → backend → Claude Agent SDK
6. Claude reconnait le pattern (sur 33), propose une action `mark_published`
7. Action encodée dans un marker `[ACTION_PENDING:uuid]` dans la réponse
8. UI affiche un bouton "Valider" sur ce marker
9. User clique → `/api/action/execute` → backend commit sur GitHub
10. Timeline + compteurs mis à jour

---

## Pages

| Route | Rôle |
|-------|------|
| `/` | Écran d'accueil "Qui êtes-vous ? Romain / Fabrice" |
| `/login` | Auth Supabase (email magic link) |
| `/romain` | Dashboard Romain + toggle F2 mode + chat Claude persona Romain |
| `/fabrice` | Dashboard Fabrice + chat Claude persona Fabrice |

---

## Composants clés (`components/`)

| Composant | Rôle |
|-----------|------|
| `PersonaLayout.tsx` | Layout principal dashboard persona (timeline, compteurs, alertes, chat, toggle F2) |
| `Chat.tsx` | Chat Claude Agent streaming + rendering des `[ACTION_PENDING:uuid]` en boutons valider |
| `TimelineColumn.tsx` | Affichage timeline du jour (publications, cold, engagement) |
| `CounterTile.tsx` | Tuile compteur avec progress bar vs target |
| `OuroborosPanel.tsx` | Panneau Ouroboros (diary, proposals, kill-switches) |
| `OuroborosProposalsModal.tsx` | Modale review proposals Ouroboros |
| `MemPalaceView.tsx` | Explorateur wings/drawers/rooms MemPalace |
| `GraphifyView.tsx` + `RepoGraph3D.tsx` | Visualisation knowledge graph du repo |
| `FileViewerModal.tsx` | Modale viewer .md du repo |

---

## API Routes (`app/api/`)

Toutes les routes sont des proxys authentifiés vers le backend Railway avec header `X-JARVIS-AUTH`.

| Route | Méthode | Proxy vers | Rôle |
|-------|---------|-----------|------|
| `/api/chat` | POST | `$BACKEND/chat` | Stream Claude Agent response |
| `/api/chat/history` | GET | `$BACKEND/chat/history` | Historique conversation |
| `/api/context` | GET | `$BACKEND/context` | Timeline + compteurs + alertes |
| `/api/action/propose` | POST | `$BACKEND/action/propose` | Crée action pending |
| `/api/action/execute` | POST | `$BACKEND/action/execute` | Exécute action validée |
| `/api/action/reject` | POST | `$BACKEND/action/reject` | Rejette action pending |
| `/api/graph` | GET | `$BACKEND/graph` | Repo knowledge graph nodes |
| `/api/graphify/*` | GET | `$BACKEND/graphify/*` | Graphify search/related/node |
| `/api/mempalace/*` | GET | `$BACKEND/mempalace/*` | MemPalace wings/drawers/stats |
| `/api/ouroboros/*` | GET/POST | `$BACKEND/ouroboros/*` | Ouroboros status/proposals/diary/kill-switch |
| `/api/file` | GET | `$BACKEND/file` | Lit un fichier du repo |
| `/api/search` | POST | `$BACKEND/search` | Recherche full-text repo |
| `/api/commit-batch` | POST | (direct) | Commit batch fichiers vers GitHub |
| `/api/auth/me` + `/api/auth/logout` | GET/POST | Supabase | Auth |

---

## Variables d'environnement (Vercel)

```
RAILWAY_BACKEND_URL         # URL du backend Express Railway
BACKEND_SHARED_SECRET       # Secret partagé avec backend (header X-JARVIS-AUTH)
NEXT_PUBLIC_SUPABASE_URL    # Projet Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Développement local

```bash
cd ui/jarvis
npm install
npm run dev
# http://localhost:3000
```

## Déploiement

Auto-deploy Vercel sur push `main`. Pas de CI séparée. Logs dans Vercel dashboard.

---

## Pattern Propose → Validate → Execute

C'est le cœur de Jarvis : **Claude ne commit JAMAIS dans le repo tout seul**.

1. Claude détecte un pattern (ex: user dit "j'ai posté X") parmi 33 patterns
2. Claude appelle `propose_action(action_type, params, preview)` via son tool
3. Backend crée une row `pending_action` en DB, retourne un UUID
4. Claude inclut `[ACTION_PENDING:uuid]` dans sa réponse textuelle
5. Frontend parse le marker, affiche un bouton "Valider"
6. User clique Valider → `POST /api/action/execute` avec l'UUID
7. Backend exécute (écrit sur GitHub API via `lib/github.ts`)
8. Timeline/compteurs rafraîchis

Avantage : contrôle humain final, zéro action "magique" non validée, audit trail complet.

---

## Références cross-repo

- Backend : `backend/jarvis/` (Express Railway, vrai cerveau)
- Couche mémoire : `brain/` (MemPalace + Ouroboros + mem0)
- Config Claude Code : `.claude/` (agents, commands, skills pour le terminal F)
- Principes : `BIBLE.md` (racine)
- Parent stratégique : `strategie/CONTEXT.md`

---

**Dernière mise à jour : 21 avril 2026**
