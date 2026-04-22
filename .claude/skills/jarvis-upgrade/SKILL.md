---
name: jarvis-upgrade
description: Skill de référence pour coder les modifications JARVIS (cockpit web + backend Railway). Contient les conventions TypeScript, patterns de code, structure des fichiers, et contraintes à respecter. OBLIGATOIRE avant toute modification de ui/jarvis/ ou backend/jarvis/.
trigger: jarvis, cockpit, backend jarvis, frontend jarvis, PersonaLayout, Chat.tsx, compteurs, actions, ouroboros panel
when: on-demand
---

# Skill jarvis-upgrade — Conventions de code F2-JARVIS

## Quand activer ce skill

**TOUJOURS** avant de modifier un fichier dans `backend/jarvis/` ou `ui/jarvis/`. Ce skill contient les conventions exactes du codebase, vérifiées le 22 avril 2026 sur le code en production.

## Documents de référence

Lire dans cet ordre avant de coder :
1. `JARVIS-ARCHITECTURE-COMPLETE.md` — architecture complète (4 couches, 27 routes, 9 MCP tools)
2. `JARVIS-UPGRADE-PLAN.md` — plan d'exécution (6 phases, 23 tickets)
3. `JARVIS.md` — manuel utilisateur (ce que JARVIS peut faire)
4. Ce SKILL.md — conventions de code

---

## Stack exacte

### Backend (`backend/jarvis/`)

| Aspect | Valeur |
|---|---|
| Runtime | Node.js 20 (bookworm-slim) |
| Framework | Express.js |
| Langage | TypeScript strict |
| Module system | **ESM** (`"type": "module"` dans package.json) |
| tsconfig target | ES2022 |
| tsconfig module | **NodeNext** |
| Import extensions | **`.js` obligatoire** (même pour les fichiers .ts) |
| Build | `tsc` → `dist/` |
| Dev | `tsx watch src/server.ts` |
| Deploy | Railway (Dockerfile) |
| Port | 3001 (ou `process.env.PORT`) |
| Dépendances | `@anthropic-ai/claude-agent-sdk`, `@supabase/supabase-js`, `cors`, `express`, `fuse.js`, `zod` |

### Frontend (`ui/jarvis/`)

| Aspect | Valeur |
|---|---|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript strict |
| Module system | ESM (bundler resolution) |
| Path aliases | `@/*` → `./*` (ex: `@/components/Chat`, `@/lib/jarvisEvents`) |
| CSS | Tailwind CSS (inline classes) |
| UI components | lucide-react (icônes), custom components (pas de shadcn dans le cockpit JARVIS) |
| 3D | react-force-graph-3d, @react-three/fiber, @react-three/drei, three |
| State | React hooks (useState, useEffect, useCallback, useRef). Pas de store global. |
| Deploy | Vercel |
| Auth | Supabase SSR (`@supabase/ssr`) |

---

## Conventions d'import backend

```typescript
// ✅ CORRECT — extension .js obligatoire (NodeNext)
import { ghRead } from "../lib/github.js";
import { getSupabase } from "./supabase.js";
import { searchDrawers } from "../lib/mempalace.js";

// ❌ FAUX — pas d'extension = erreur au runtime
import { ghRead } from "../lib/github";
```

Tous les imports relatifs dans `backend/jarvis/src/` DOIVENT avoir `.js` même si le fichier source est `.ts`. C'est une contrainte NodeNext.

---

## Pattern : nouvelle route backend

Fichier : `backend/jarvis/src/routes/{name}.ts`

```typescript
import { Request, Response } from "express";
// imports nécessaires avec .js

export async function {name}Route(req: Request, res: Response): Promise<void> {
  try {
    // logique
    res.json({ /* result */ });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[/{name}]`, err);
    res.status(500).json({ error: msg });
  }
}
```

Enregistrement dans `server.ts` :
```typescript
import { {name}Route } from "./routes/{name}.js";
// ...
app.get("/{name}", {name}Route);  // ou app.post
```

**Convention de nommage :** export nommé `{name}Route` (pas de default export).

---

## Pattern : nouvelle proxy route frontend

Fichier : `ui/jarvis/app/api/{path}/route.ts`

### GET proxy

```typescript
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request) {
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }

  const url = new URL(req.url);
  const backendUrl = new URL(`${BACKEND}/{endpoint}`);
  backendUrl.search = url.search;

  const response = await fetch(backendUrl.toString(), {
    headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" },
  });
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
```

### POST proxy

```typescript
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function POST(req: Request) {
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const body = await req.json();
  const response = await fetch(`${BACKEND}/{endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
      "X-USER-ID": user?.id || "",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
```

**Convention :** toujours inclure `runtime = "nodejs"` et `dynamic = "force-dynamic"` pour les GET.

---

## Pattern : composant React frontend

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";

type Props = {
  accentColor: string;
  persona: "romain" | "fabrice";
  // ... autres props
};

export function ComponentName({ accentColor, persona }: Props) {
  // hooks en premier
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch pattern
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/{endpoint}?persona=${persona}`);
      if (res.ok) {
        const json: DataType = await res.json();
        setData(json);
      }
    } catch {
      // silently keep previous data
    } finally {
      setLoading(false);
    }
  }, [persona]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ /* inline styles pour les couleurs dynamiques */ }}>
      {/* contenu */}
    </div>
  );
}
```

**Conventions UI :**
- `"use client"` en première ligne pour tous les composants interactifs
- Couleurs dynamiques via `style={{ color: accentColor }}` (pas de classes Tailwind pour les couleurs accent)
- Tailwind pour le layout et le spacing : `className="flex items-center gap-2 px-3 py-2"`
- Font sizes : `text-[10px]` pour les labels, `text-[11px]` pour le mono, `text-[12px]` pour le texte normal, `text-sm` pour le contenu principal
- Font mono : `font-mono` pour les données, IDs, compteurs, timestamps
- Arrondis : `rounded` (4px), `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px)
- Borders : `border` avec `style={{ borderColor: "rgba(255,255,255,0.05)" }}` ou `${accentColor}20`
- Backgrounds : `"rgba(255,255,255,0.03)"` pour les cards sur dark, `${accentColor}15` pour les éléments accentués
- Pas d'emoji dans le code UI, utiliser lucide-react pour les icônes

---

## Auth et sécurité

### Backend

L'auth backend est via header `X-JARVIS-AUTH` (shared secret). Toutes les routes sauf `/health` passent par le middleware auth dans `server.ts`.

Pour les routes qui modifient des données utilisateur, vérifier `X-USER-ID` :
```typescript
const userId = (req.headers["x-user-id"] as string | undefined) || "";
if (!userId) {
  res.status(401).json({ error: "X-USER-ID required" });
  return;
}
```

### Frontend

Le middleware Next.js (`middleware.ts`) vérifie :
1. Supabase auth (cookie)
2. `user.user_metadata.f2_authorized === true`

Les proxy routes ajoutent automatiquement les headers auth vers le backend.

---

## GitHub API — fonctions disponibles

Toutes dans `backend/jarvis/src/lib/github.ts` :

```typescript
import { ghRead, ghWrite, ghUpdate, ghCreate, ghDelete, ghList } from "../lib/github.js";

// Lire un fichier (retourne { content, sha } ou null)
const file = await ghRead("path/to/file.md");

// Écrire (nécessite SHA pour optimistic locking)
await ghWrite("path/to/file.md", newContent, file.sha, "[JARVIS] commit message");

// Read-modify-write atomique
await ghUpdate("path/to/file.md", (md) => {
  // transformer le markdown
  return modifiedMd;
}, "[JARVIS] commit message");

// Créer un nouveau fichier
await ghCreate("path/to/new.md", content, "[JARVIS] create new file");

// Supprimer
await ghDelete("path/to/file.md", file.sha, "[JARVIS] delete file");

// Lister un dossier
const entries = await ghList("path/to/dir");
```

**Convention commits :** tous les messages commencent par `[JARVIS]`.

**Cache :** `ghRead` a un cache in-memory de 5 minutes. Invalidé automatiquement après chaque write. Ne PAS implémenter de cache supplémentaire.

---

## Supabase — client disponible

```typescript
import { getSupabase } from "../lib/supabase.js";

const sb = getSupabase(); // service-role client, bypass RLS
const { data, error } = await sb
  .from("jarvis_pending_actions")
  .select("*")
  .eq("id", actionId)
  .single();
```

**Tables disponibles :**
- `jarvis_conversations` (id, user_id, persona, mode, summary, summary_tokens)
- `jarvis_messages` (id, conversation_id, role, content, image_media_type, image_data, tool_calls, pending_action_id)
- `jarvis_pending_actions` (id, conversation_id, action_type, params, preview, status, commit_sha, error)

---

## Markdown transforms

Toutes dans `backend/jarvis/src/lib/markdown.ts` :

```typescript
import {
  cestNow, cestDate,
  markPlanPublished, appendColdLog, appendEngagementLog,
  markCrossPublished, appendDecision, updateColdReply,
  appendColdQueue, appendProgressEvent, resolveProgressEvent,
} from "../lib/markdown.js";
```

Ces fonctions prennent un markdown string en entrée et retournent le markdown modifié. Elles sont pures (pas d'effets de bord).

**Convention :** toutes les dates/heures en CEST (Europe/Paris).

---

## Événements frontend

```typescript
import { emitRepoUpdated, onRepoUpdated } from "@/lib/jarvisEvents";
import { emitSendToChat, onSendToChat } from "@/lib/jarvisEvents";

// Émettre après un commit réussi
emitRepoUpdated({ actionType: "log_engagement" });

// Écouter les mises à jour repo
useEffect(() => {
  const unsub = onRepoUpdated((detail) => {
    // refresh context, compteurs, etc.
  });
  return unsub;
}, []);

// Injecter du texte dans le chat depuis un autre composant
emitSendToChat("Recherche sur le pricing StoreMD");
```

---

## Markers JARVIS (réponses chat)

Le texte des réponses JARVIS contient des markers parsés par `parseJarvisMarkers.ts` :

| Marker | Rendu UI | Usage |
|---|---|---|
| `[ACTION_PENDING:uuid]` | `ActionCard` avec boutons Valider/Rejeter | Après chaque `propose_action` |
| `[CONTENT:type]...[/CONTENT]` | `ContentCard` avec bouton Copier | Contenu à copier (post, reply, cold) |
| `[CONTENT-FR]...[/CONTENT-FR]` | Toggle FR dans ContentCard | Traduction française |
| `[TAG:texte]` | `TagLine` pill cliquable | Suggestions contextuelles |

**Règle critique :** si `[ACTION_PENDING:uuid]` n'est pas dans la réponse, l'UI ne rend PAS le bouton Valider. L'action reste pending indéfiniment.

---

## Action executor — sécurité create_file

Chemins autorisés pour `create_file` (dans `action-executor.ts`) :

**Préfixes :** `f2/`, `fabrice/`, `romain/`, `strategie/`, `patterns/`, `tracking/`, `archives/`, `distribution/`, `growth-marketing/`, `saas/`, `produits/`, `ops/`, `marketing/`

**Patterns root :** `BATCH-SEMAINE-\d+.md`, `PLAN-*.md`, `HANDOFF*.md`, `CHANGELOG*.md`, `REVUE-*.md`

**Extensions :** `.md`, `.txt`, `.json`, `.yml`, `.yaml`, `.csv`

**Interdit :** traversal (`..`), chemins absolus, backslash, contenu > 500 KB, contenu vide.

Pour ajouter un nouveau préfixe autorisé, modifier `CREATE_FILE_ALLOWED_PREFIXES` dans `action-executor.ts`.

---

## MCP Tools — les 9 outils disponibles dans le chat

Définis dans `jarvis-tools.ts` via `createSdkMcpServer()`. Chaque tool est créé avec `tool()` du Claude Agent SDK :

```typescript
import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const myTool = tool(
  "tool_name",
  "Description for Claude",
  { param: z.string().describe("Description") },
  async ({ param }) => {
    // implementation
    return {
      content: [{ type: "text" as const, text: "result" }],
    };
  }
);
```

Les outils sont enregistrés dans `JARVIS_ALLOWED_TOOLS` avec le préfixe `mcp__jarvis__`.

---

## Context types partagés

`backend/jarvis/src/lib/context-types.ts` ET `ui/jarvis/lib/context-types.ts` doivent rester synchronisés :

```typescript
export interface TimelineItem {
  time: string;
  title: string;
  platform: string;
  status: "done" | "blocked" | "todo";
  publishedBy: string;
}

export interface CounterData {
  cold: number;
  repliesIn: number;
  twEng: number;
  liCom: number;
  reddit: number;
  facebook: number;
  cross: number;
  ihPh: number;
  total: number;
}

export interface AlertItem {
  level: "critical" | "warning";
  title: string;
  description: string;
}
```

Le frontend ajoute `ContextData` qui encapsule le tout :
```typescript
export interface ContextData {
  timeline: TimelineItem[];
  counters: CounterData;
  alerts: AlertItem[];
  weekPlanningF2: TimelineItem[];
}
```

---

## Checklist pré-commit

Avant chaque commit dans le repo F2-Jarvis :

### Backend
```bash
cd backend/jarvis
npm run build          # tsc doit passer sans erreur
# Vérifier que dist/ contient les nouveaux fichiers
```

### Frontend
```bash
cd ui/jarvis
npx next build         # Next.js build doit passer sans erreur
# Vérifier les pages : /, /login, /romain, /fabrice
```

### Vérifications manuelles
- [ ] Imports avec `.js` extension dans le backend
- [ ] `"use client"` sur les composants interactifs
- [ ] Types exportés synchronisés entre backend et frontend (context-types)
- [ ] Pas de `console.log` oublié (utiliser `console.warn` ou `console.error`)
- [ ] Messages de commit préfixés `[JARVIS]` pour les modifications opérationnelles
- [ ] Pas de secrets/credentials dans le code
- [ ] Pas de modification de BIBLE.md, identity.md, ou safety.py sans demande explicite de Fabrice

---

## Persona colors

| Persona | Primary | Dim | Usage |
|---|---|---|---|
| Romain | `#00ffb4` | `#00b890` | Cockpit /romain |
| Fabrice | `#9b8fff` | `#6d5fe0` | Cockpit /fabrice |
| F2 | `#97C459` | — | Mode F2 (toggle Romain) |

Ces couleurs sont utilisées via `accentColor` prop passé à tous les sous-composants.

---

## Anti-patterns à éviter

1. **Ne PAS hardcoder des valeurs** qui peuvent changer (targets, labels, semaine). Lire depuis le repo ou les config.
2. **Ne PAS créer de state store global** (Redux, Zustand). Le codebase utilise React state local + événements CustomEvent.
3. **Ne PAS ajouter de dépendances npm** sans nécessité absolue. Le bundle est déjà conséquent.
4. **Ne PAS modifier `CLAUDE.md`, `BIBLE.md`** sans demande explicite de Fabrice.
5. **Ne PAS toucher aux fichiers `brain/ouroboros/identity.md` ou `bible.md`** — constitution immuable.
6. **Ne PAS utiliser `localStorage`** pour des données critiques — le middleware Supabase gère la session.
7. **Ne PAS appeler l'API GitHub directement depuis le frontend** — toujours passer par le backend Railway via les proxy routes.
8. **Ne PAS mettre de timeout < 30s** sur les fetch chat — le streaming peut prendre 2 minutes.
9. **Ne PAS oublier d'invalider les caches** (GitHub 5min, MemPalace 10min, Graphify 10min) après un write.
10. **Ne PAS créer de fichiers dans des dossiers hors whitelist** via create_file — l'action-executor les rejettera.

---

## Pair avec

- **ui-ux-pro-max** → si refonte design d'un composant
- **shadcn-ui** → PAS utilisé dans le cockpit JARVIS (custom components), mais utilisé dans les SaaS
- **supabase-rls** → si ajout de tables
- **web-interface-guidelines** → pour audit a11y avant shipping
- **handoff-writer** → en fin de session
- **f2-brand-voice** → si le system prompt est modifié (voix Romain/Fabrice/F2)

---

*Version 1.0 — 22 avril 2026. Vérifié contre le code source en production.*
