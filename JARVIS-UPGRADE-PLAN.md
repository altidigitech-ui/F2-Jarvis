# JARVIS-UPGRADE-PLAN.md

> **Date :** 22 avril 2026 — 21h CEST
> **Auteur :** Session audit Claude Opus (3 passes, 30 checks factuels)
> **Destinataire :** Claude Code (Sonnet, 4-5 sessions estimées)
> **Prérequis obligatoire :** Lire `JARVIS-ARCHITECTURE-COMPLETE.md` en entier avant de commencer.
> **5 492 lignes de code impactées sur 14 fichiers existants + 8 fichiers à créer.**

---

## Vue d'ensemble — 6 phases, 27 tickets

| Phase | Nom | Ce qu'elle résout | Sessions CC |
|---|---|---|---|
| **1** | Compteurs dynamiques & labels + cache | Compteurs hardcodés, labels incorrects, plateformes manquantes, cache trop lent | 1 |
| **2** | Chat UX & ContentCard + web search | Reply mal structurées, traduction FR absente, pas de stop, copier dans FileViewer, accès web | 1 |
| **3** | Commits groupés & actions | 1 commit par reply au lieu de 1 commit groupé, suggestions inadaptées | 1 |
| **4** | Ouroboros Worker+Redis & MemPalace | Ouroboros jamais lancé, MemPalace vide, worker BullMQ + Redis | 1.5 |
| **5** | Batch S7 card, mobile, sidebar | Card batch avec jauge, responsive mobile, sidebar Aujourd'hui, Plan semaine dynamique | 1 |
| **6** | JARVIS.md, repo self-org, proactivité | Manuel JARVIS, capacité d'organiser/adapter le repo, mode proactif | 0.5 |

**Règle absolue pour Claude Code :** ne jamais commit sans que le build passe (`npm run build` backend + frontend). Tester chaque phase indépendamment.

---

# PHASE 1 — Compteurs dynamiques & labels

**Problème global :** Les targets (cold 10, twEng 15, cross 2, etc.) et les plateformes actives (IH+PH pour Romain, pas de PH pour Fabrice) sont hardcodés dans `PERSONA_CONFIG` dans `PersonaLayout.tsx` (lignes 29-60). Ils ne reflètent pas le batch de la semaine en cours.

---

## TICKET 1.1 — Route backend `/targets` dynamique depuis le batch

**Fichier à créer :** `backend/jarvis/src/routes/targets.ts`

**Logique :**
1. Calculer le numéro de semaine courant : semaine 1 = 6 avril 2026 (lundi), donc `weekNumber = Math.floor((now - epoch) / 7 days) + 1`
2. Tenter `ghRead("BATCH-SEMAINE-{weekNumber}.md")`, sinon fallback `BATCH-SEMAINE-{weekNumber-1}.md`
3. Parser le batch markdown pour extraire :
   - Section `COLD OUTREACH` → target cold par jour (chercher `/jour` ou `par jour` dans les lignes de table)
   - Sections `POSTS TWITTER`, `POSTS LINKEDIN`, `POSTS REDDIT`, `POSTS FACEBOOK`, `IH`, `PH` → déterminer quelles plateformes sont actives par persona
   - Section `CROSS-ENGAGEMENT` → compter les slots par jour pour déterminer le target cross
   - Section `ENGAGEMENT` → targets par plateforme si spécifiés
4. Retourner un JSON avec targets par persona et liste de plateformes actives
5. Fallback sur des valeurs par défaut raisonnables si le parsing échoue
6. Cache 30 min (le batch change rarement en cours de journée)

**Format de retour :**
```json
{
  "weekNumber": 6,
  "batchFile": "BATCH-SEMAINE-6.md",
  "fabrice": {
    "cold": 14,
    "twEng": 15,
    "liCom": 15,
    "reddit": 8,
    "facebook": 6,
    "cross": 4,
    "ph": 5,
    "ihPh": 0,
    "engTarget": 30,
    "platforms": ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH"],
    "hasIhPh": false,
    "hasPh": true
  },
  "romain": {
    "cold": 14,
    "twEng": 10,
    "liCom": 10,
    "reddit": 8,
    "facebook": 6,
    "cross": 4,
    "ph": 5,
    "ihPh": 5,
    "engTarget": 30,
    "platforms": ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH", "IH"],
    "hasIhPh": true,
    "hasPh": true
  }
}
```

**Fichier à modifier :** `backend/jarvis/src/server.ts`
- Ajouter `import { targetsRoute } from "./routes/targets.js";`
- Ajouter `app.get("/targets", targetsRoute);`

**Fichier à créer :** `ui/jarvis/app/api/config/targets/route.ts`
- Proxy standard vers `${RAILWAY_BACKEND_URL}/targets`

---

## TICKET 1.2 — Frontend : compteurs dynamiques

**Fichier à modifier :** `ui/jarvis/components/PersonaLayout.tsx`

**Changements :**
1. Supprimer l'objet `PERSONA_CONFIG` hardcodé (lignes 29-60)
2. Garder uniquement les infos statiques (label, role, color, colorDim) dans un objet `PERSONA_STATIC`
3. Ajouter un `useState` pour les targets + un `useEffect` qui fetch `/api/config/targets` au mount
4. Remplacer tous les `cfg.coldTarget`, `cfg.twTarget`, etc. par les valeurs dynamiques
5. Rendre les `CounterTile` conditionnels : n'afficher que les plateformes présentes dans `targets.platforms`
6. Le target cross vient de `targets.cross` au lieu du `target={2}` hardcodé (ligne 668 actuelle)

**Point clé :** Si le fetch `/api/config/targets` échoue, utiliser des fallback identiques aux valeurs actuelles pour ne rien casser.

---

## TICKET 1.3 — Renommer "Cold DM" → "Cold"

**Fichier à modifier :** `ui/jarvis/components/PersonaLayout.tsx`
- Ligne contenant `label="Cold DM"` → `label="Cold"`

---

## TICKET 1.4 — Compteur IH/PH adaptatif

**Fichier à modifier :** `ui/jarvis/components/PersonaLayout.tsx`

Le rendu actuel :
```tsx
{cfg.hasIhPh && (
  <CounterTile label="IH + PH" ... />
)}
```

Remplacer par une logique basée sur les plateformes dynamiques :
- Si `targets.platforms` contient `"IH"` ET `"PH"` → afficher "IH + PH"
- Si contient seulement `"PH"` → afficher "PH" (target = targets.ph)
- Si contient seulement `"IH"` → afficher "IH" (target = targets.ih)
- Si ni l'un ni l'autre → ne pas afficher

**Même logique pour le mode F2 :** quand le toggle F2 est actif, charger les targets F2 (si disponibles dans le batch) ou afficher IH + PH uniquement.

---

## TICKET 1.5 — Label "Plan semaine" dynamique

**Fichier à modifier :** `ui/jarvis/components/QuickAccessSidebar.tsx`

Ligne actuelle (ligne 46) :
```tsx
{ id: "plan", label: "Plan semaine 6", icon: ICONS.plan, onClick: onOpenPlanHebdo },
```

Remplacer par un label dynamique. Deux options :
- Option A : passer `weekNumber` comme prop depuis PersonaLayout
- Option B : calculer localement `Math.floor((Date.now() - new Date('2026-04-06').getTime()) / (7*86400000)) + 1`

Option A préférable car PersonaLayout a déjà le fetch des targets (qui retourne weekNumber).

---

## TICKET 1.6 — CounterData backend : ajouter `ph` séparé de `ihPh`

**Fichier à modifier :** `backend/jarvis/src/lib/context-types.ts`
- Ajouter `ph: number` dans `CounterData`

**Fichier à modifier :** `backend/jarvis/src/routes/context.ts`
- Séparer le comptage : `ih` et `ph` calculés indépendamment au lieu du `ihPh` combiné actuel
- Garder `ihPh` pour rétrocompatibilité : `ihPh = ih + ph`

**Fichier à modifier :** `ui/jarvis/lib/context-types.ts`
- Ajouter `ph: number` et `ih: number` dans `CounterData`

---

## TICKET 1.7 — Cache réduit + refresh instantané après commit

**Problème :** Le progress semaine et les compteurs ne se mettent pas à jour en temps réel. Le cache GitHub est à 5 min (`cache.ts` CACHE_TTL = 5 * 60 * 1000) et le refresh context à 60 secondes. Après un commit, l'utilisateur doit attendre jusqu'à 6 minutes pour voir le changement.

**Fichier à modifier :** `backend/jarvis/src/lib/cache.ts`
- Réduire `CACHE_TTL` de 5 min à **1 min** : `const CACHE_TTL = 60 * 1000;`

**Fichier à modifier :** `ui/jarvis/components/PersonaLayout.tsx`
- Réduire l'intervalle de refresh context de 60s à **30s** : `const id = setInterval(fetchContext, 30_000);`
- Dans le handler `onRepoUpdated`, réduire le délai de 1500ms à **500ms** : `setTimeout(() => fetchContext(), 500);`

**Fichier à modifier :** `backend/jarvis/src/routes/action-execute.ts` (et le futur `action-execute-batch.ts`)
- Après un commit réussi, appeler `cacheInvalidateAll()` pour forcer le refresh immédiat du cache GitHub backend

**Fichier à modifier :** `backend/jarvis/src/lib/cache.ts`
- Exporter `cacheInvalidateAll` (déjà implémenté mais pas utilisé après les commits)

**Résultat :** après un commit, les compteurs et le progress se mettent à jour en ~1-2 secondes au lieu de ~6 minutes.

---

# PHASE 2 — Chat UX & ContentCard

---

## TICKET 2.1 — Reply structurées avec identification post/destinataire

**Problème :** Quand JARVIS donne 3 reply Reddit, elles arrivent à la chaîne sans indiquer à qui/quel post chaque reply correspond. L'utilisateur doit deviner.

**Fichier à modifier :** `backend/jarvis/src/routes/chat.ts` — dans le system prompt

**Changement dans le system prompt, section FORMAT :**
Ajouter cette règle après la section format existante :

```
## FORMAT DES REPLY MULTIPLES

Quand tu génères plusieurs reply (Reddit, Twitter, cold, etc.) dans une même réponse :
1. TOUJOURS précéder chaque [CONTENT] par un header clair :
   **Reply N — @handle / u/username** (résumé du post : 10 mots max)
2. Si c'est un reply Reddit, inclure le subreddit : **Reply N — u/username sur r/subreddit** (sujet)
3. Si c'est un reply Twitter, inclure le handle : **Reply N — @handle** (sujet du tweet)
4. Ne JAMAIS enchaîner deux [CONTENT] sans header intermédiaire
5. Le type dans [CONTENT:type] doit inclure le handle : [CONTENT:reply-reddit-u-username]

Exemple correct :
**Reply 1 — u/Fragrant** (ghost billing / Apple Pay)
[CONTENT:reply-reddit-u-fragrant]
texte de la reply
[/CONTENT]

**Reply 2 — u/Xolaris05** (traffic quality / intent signal)
[CONTENT:reply-reddit-u-xolaris05]
texte de la reply
[/CONTENT]
```

---

## TICKET 2.2 — Bouton traduction FR systématique

**Problème :** Le bouton FR dans ContentCard n'apparaît que si un bloc `[CONTENT-FR]` existe dans les 120 chars après le `[CONTENT]`. Le system prompt ne demande pas systématiquement la traduction FR.

**Solution en 2 parties :**

**Partie A — System prompt** (`backend/jarvis/src/routes/chat.ts`)

Modifier la section format pour rendre le bloc FR obligatoire :
```
- Contenu à copier : envelopper dans [CONTENT:type]...[/CONTENT] TOUJOURS suivi de [CONTENT-FR]...[/CONTENT-FR] pour la traduction française. Le bloc FR est OBLIGATOIRE pour tout contenu en anglais.
```

**Partie B — Fallback bouton "Traduire"** (`ui/jarvis/components/jarvis/ContentCard.tsx`)

Quand `contentFr` est `undefined` (pas de bloc FR reçu), afficher un bouton "Traduire" au lieu de rien. Au clic :
1. Envoyer le contenu à l'API `/api/chat` avec un message system "Traduis ce texte en français :" + le contenu
2. Afficher le résultat dans le toggle FR

Alternative plus simple : si `contentFr` est absent, le bouton FR n'apparaît pas, mais c'est le system prompt qui garantit qu'il est toujours là. La partie A suffit dans 95% des cas.

**Fichiers à modifier :**
- `backend/jarvis/src/routes/chat.ts` (system prompt)
- `ui/jarvis/components/jarvis/ContentCard.tsx` (optionnel : fallback "Traduire")

---

## TICKET 2.3 — Bouton stop streaming

**Problème :** Impossible d'arrêter JARVIS quand il génère une réponse longue.

**Fichier à modifier :** `ui/jarvis/components/Chat.tsx`

**Changements :**
1. Ajouter un `useRef<AbortController | null>(null)` en haut du composant
2. Dans la fonction `send()` (ligne 658), avant le `fetch("/api/chat", ...)` (ligne 715) :
   ```tsx
   const controller = new AbortController();
   abortRef.current = controller;
   // ...
   const res = await fetch("/api/chat", { ..., signal: controller.signal });
   ```
3. Dans le `finally` du try/catch du streaming, ajouter `abortRef.current = null;`
4. Ajouter un bouton "Stop" visible pendant le streaming (quand `isLoading === true`) :
   ```tsx
   {isLoading && (
     <button onClick={() => abortRef.current?.abort()} ...>
       ■ Stop
     </button>
   )}
   ```
5. Positionner le bouton Stop à côté du bouton Send dans la zone input

Le `cancelled` variable existante (ligne 485) est pour le chargement d'historique, pas pour le streaming. Le streaming est dans `send()` à la ligne 658.

---

## TICKET 2.4 — Bouton copier dans FileViewerModal

**Problème :** Quand on ouvre un fichier (cross-engagement, posts batchés) depuis la sidebar, le `FileViewerModal` affiche du markdown brut sans bouton copier. Impossible de copier facilement un post batchés ou un texte de cross-engagement.

**Fichier à modifier :** `ui/jarvis/components/FileViewerModal.tsx` (366 lignes)

**Changements :**
1. Ajouter un bouton "Copier tout" en haut du modal (copie l'intégralité du contenu markdown)
2. Parser le markdown pour détecter les blocs de contenu copiables :
   - Blocs entre `## POST` et `---` → bouton copier individuel
   - Blocs entre `## REPLY` et `---` → bouton copier individuel
   - Lignes de table contenant du texte de publication → bouton copier
3. Utiliser `navigator.clipboard.writeText()` comme dans ContentCard

---

## TICKET 2.5 — Bouton "Aujourd'hui" fonctionnel

**Problème :** Le bouton "Aujourd'hui" dans QuickAccessSidebar ne fait rien sauf changer l'état `active` local.

**Fichier à modifier :** `ui/jarvis/components/QuickAccessSidebar.tsx`

Ligne actuelle (ligne 45) :
```tsx
{ id: "today", label: "Aujourd'hui", icon: ICONS.today, onClick: () => setActive("today") },
```

**Solution :** Ajouter un callback `onOpenToday` dans les props et l'appeler. Côté PersonaLayout, `onOpenToday` ouvre le `FileViewerModal` avec le fichier `{persona}/plan-hebdo.md` (même comportement que "Plan semaine" mais scrollé à la section du jour actuel) OU mieux : scrolle la TimelineColumn vers le haut.

Option recommandée : `onOpenToday` scrolle simplement vers le haut de la page (la timeline est déjà visible). Pas besoin d'ouvrir un modal.

---

## TICKET 2.6 — Accès web pour JARVIS

**Problème :** JARVIS n'a pas accès au web. Il ne peut pas chercher des informations actuelles, vérifier des concurrents, trouver des tendances, ou valider des données. Il répète ce qu'il sait sans pouvoir aller chercher du neuf.

**Solution :** Activer le web search dans le Claude Agent SDK. Deux niveaux :

**Niveau 1 — Web search tool dans le chat**

**Fichier à modifier :** `backend/jarvis/src/lib/jarvis-tools.ts`

Ajouter un 10ème outil MCP `web_search` :
```typescript
const webSearch = tool(
  "web_search",
  "Search the web for current information. Use for: competitor analysis, trend research, verifying data, finding recent news about e-commerce/Shopify/SaaS, checking what people say about StoreMD or FoundryTwo, researching cold outreach targets. Always use when the user asks about something that requires current information beyond the repo.",
  {
    query: z.string().describe("Search query in English for best results"),
  },
  async ({ query }) => {
    // Le Claude Agent SDK gère web_search nativement via le binaire Claude
    // On n'a PAS besoin d'implémenter le fetch nous-mêmes
    // Il suffit de l'ajouter dans allowedTools
    return {
      content: [{ type: "text" as const, text: `[web_search delegated to SDK for: ${query}]` }],
    };
  }
);
```

**Alternative plus propre :** Le Claude Agent SDK supporte `web_search` nativement sans MCP wrapper. Dans `chat.ts`, ajouter dans les options de `query()` :
```typescript
for await (const msg of query({
  prompt,
  options: {
    // ... existing options
    tools: [{ type: "web_search_20250305", name: "web_search" }],  // ← ajouter
  },
})) {
```

Vérifier dans la doc du SDK quelle approche est supportée (MCP tool vs native tool). La seconde est préférable car elle utilise le web search natif de Claude sans proxy.

**Fichier à modifier :** `backend/jarvis/src/lib/jarvis-tools.ts`
- Ajouter `"mcp__jarvis__web_search"` dans `JARVIS_ALLOWED_TOOLS` (si approche MCP)

**Fichier à modifier :** `backend/jarvis/src/routes/chat.ts`
- Si approche native : ajouter `tools` dans les options de `query()`

**Niveau 2 — Web search dans le cycle Ouroboros**

Le cycle background (ticket 4.1) doit aussi pouvoir chercher sur le web pour enrichir ses analyses. Même mécanisme : le SDK gère le web search si le tool est activé dans les options de `query()`.

**Fichier à modifier :** `backend/jarvis/src/lib/background-cycle.ts` (créé dans le ticket 4.1)
- Activer web_search dans les options du query() d'Ouroboros

**Résultat :** JARVIS peut chercher sur le web à la demande ("cherche ce que fait [concurrent]", "qu'est-ce qui se dit sur ghost billing Shopify en ce moment") ET Ouroboros peut enrichir ses analyses avec des données web actuelles pendant ses cycles.

---

# PHASE 3 — Commits groupés & actions

---

## TICKET 3.1 — Sélection par reply (✓/✗) + commit groupé

**Problème actuel :** Quand JARVIS propose 3 actions (3 `[ACTION_PENDING:uuid]`), chaque ActionCard a un bouton "Valider" qui commit individuellement. 3 reply = 3 commits GitHub séparés.

**Architecture cible :** 
- Chaque reply/action a un toggle ✓/✗ (pas de commit immédiat)
- Un bouton global "Commit" apparaît quand au moins 1 action est sélectionnée ✓
- Au clic sur "Commit" : toutes les actions ✓ sont exécutées en 1 seul commit GitHub
- Les actions ✗ sont marquées "rejected"

**Fichiers à modifier :**

### A) Backend — nouveau endpoint `POST /action/execute-batch`

**Fichier à créer :** `backend/jarvis/src/routes/action-execute-batch.ts`

```
Body: { action_ids: string[], rejected_ids?: string[] }
```

Logique :
1. Lire toutes les actions en un seul SELECT
2. Vérifier ownership (même user pour toutes)
3. Grouper par fichier cible (ex: 3 engagements Reddit → même `engagement-log.md`)
4. Pour chaque fichier : `ghRead()` une seule fois, appliquer tous les `applyTransform()` séquentiellement, `ghWrite()` une seule fois
5. Commit message : `[JARVIS] 3 Reddit engagements logged` (agrégé, pas 1 message par action)
6. Marquer toutes les actions comme `executed` en un seul UPDATE
7. Si `rejected_ids` fourni, les marquer `rejected` en un seul UPDATE

**Fichier à modifier :** `backend/jarvis/src/server.ts`
- Ajouter la route `app.post("/action/execute-batch", ...)`

**Fichier à créer :** `ui/jarvis/app/api/action/execute-batch/route.ts`
- Proxy standard

### B) Frontend — ActionCard avec toggle + bouton commit global

**Fichier à modifier :** `ui/jarvis/components/jarvis/ActionCard.tsx`

Changements :
1. Remplacer le bouton "Valider" par un toggle ✓/✗ (2 boutons visuels, pas de fetch immédiat)
2. Émettre un event `jarvis:action-toggled` avec `{ actionId, selected: true/false }`
3. Le bouton "Rejeter" (✗) marque l'action comme non-sélectionnée visuellement

**Fichier à modifier :** `ui/jarvis/components/Chat.tsx`

Changements :
1. Collecter l'état de toutes les actions toggles (Map<actionId, boolean>)
2. Afficher un bouton flottant "Commit (N actions)" quand N > 0 actions sélectionnées
3. Au clic : `POST /api/action/execute-batch` avec les IDs sélectionnés et rejetés
4. Après commit : rafraîchir les compteurs via `emitRepoUpdated()`

---

## TICKET 3.2 — Suggestions contextuelles adaptatives

**Problème :** Les suggestions avant le commit ("logger les commentaires" etc.) ne s'adaptent pas à la situation.

**Fichier à modifier :** `backend/jarvis/src/routes/chat.ts` — system prompt

Ajouter dans la section PATTERN PROPOSE/VALIDE/EXECUTE :
```
## SUGGESTIONS CONTEXTUELLES (tags [TAG:...])

Les tags de fin de réponse doivent être contextuels, pas génériques :
- Après des reply Reddit : [TAG:Suite threads Reddit] [TAG:Cold ecom ce soir]
- Après des cold : [TAG:Résumé cold du jour] [TAG:Checker les réponses]
- Après un post publié : [TAG:Cross-engagement pour ce post] [TAG:Thread follow-up]
- En début de session : [TAG:Résumé du jour] [TAG:Qu'est-ce qu'il me reste ?]

Ne JAMAIS mettre de tags génériques comme [TAG:Aide] ou [TAG:Plus d'infos].
```

---

## TICKET 3.3 — Planning du jour enrichi

**Problème :** Le planning du jour (TimelineColumn) n'affiche qu'un seul item au lieu de tous les posts prévus, pas d'heure, pas assez de détail.

**Fichier à modifier :** `backend/jarvis/src/routes/context.ts` — fonction `parseTimeline()`

**Diagnostic :** La fonction `parseTimeline` matche les items par `dayCell` qui doit contenir soit la date `today` (format dd/mm) soit le `dayName` (ex: "mercredi"). Si le format du plan-hebdo est différent (ex: "**Mercredi**" avec bold, ou "Mer 22/04"), le regex rate.

**Changements :**
1. Rendre le matching plus tolérant : strip `**`, normaliser les accents, comparer en lowercase
2. Extraire l'heure depuis les cellules de table (chercher `\d{1,2}h\d{0,2}` ou `\d{1,2}:\d{2}`)
3. Retourner plus de contexte dans chaque `TimelineItem` : le sujet complet (pas tronqué), la plateforme, le type (post/thread/reply)

**Fichier à modifier :** `ui/jarvis/components/TimelineColumn.tsx` (165 lignes)
- Afficher l'heure si disponible (actuellement `item.time` existe mais est souvent vide)
- Afficher le sujet complet
- Améliorer le rendu visuel pour différencier posts/threads/objectifs/cross

---

# PHASE 4 — Ouroboros, cycles & MemPalace

---

## TICKET 4.1 — Worker BullMQ + Redis sur Railway

**Problème :** Le server Express actuel n'a pas de job runner. Ouroboros n'a jamais tourné (0 cycles). Les crons Vercel appellent `/api/commit-batch` (un simple log), pas Ouroboros.

**Solution :** Architecture Worker séparé avec BullMQ + Redis sur Railway.

### Architecture infra

```
Railway :
├── jarvis-backend (Express, web)     ← déjà existant
│   Port 3001, reçoit les requêtes du frontend
│   Enqueue les jobs dans Redis quand nécessaire
│
├── jarvis-worker (Node.js, worker)   ← NOUVEAU
│   Consomme les jobs BullMQ depuis Redis
│   Exécute les cycles Ouroboros
│   Pas de port HTTP, pas de requêtes entrantes
│
└── Redis (addon Railway)             ← NOUVEAU
    BullMQ queue + rate limiting
```

### Étape 1 — Ajouter Redis sur Railway

Guide pour Fabrice :
1. Dashboard Railway → projet jarvis-backend
2. "New" → "Database" → "Redis"
3. Copier `REDIS_URL` (format `redis://default:password@host:port`)
4. Ajouter `REDIS_URL` comme variable d'env dans jarvis-backend ET jarvis-worker

### Étape 2 — Installer BullMQ

**Fichier à modifier :** `backend/jarvis/package.json`
- Ajouter `"bullmq": "^5.0.0"` dans dependencies
- Ajouter `"ioredis": "^5.0.0"` dans dependencies

### Étape 3 — Créer la connexion Redis partagée

**Fichier à créer :** `backend/jarvis/src/lib/redis.ts`

```typescript
import IORedis from "ioredis";

let _connection: IORedis | null = null;

export function getRedis(): IORedis {
  if (_connection) return _connection;
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL not set");
  _connection = new IORedis(url, { maxRetriesPerRequest: null });
  return _connection;
}
```

### Étape 4 — Créer les queues

**Fichier à créer :** `backend/jarvis/src/lib/queues.ts`

```typescript
import { Queue } from "bullmq";
import { getRedis } from "./redis.js";

// Queue Ouroboros : cycles toutes les 2h
export const ouroborosQueue = new Queue("ouroboros-cycle", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 20,
    attempts: 1, // pas de retry sur un cycle Ouroboros
  },
});

// Queue MemPalace : ingestion conversations
export const mempalaceQueue = new Queue("mempalace-ingest", {
  connection: getRedis(),
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 20,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
});
```

### Étape 5 — Créer le worker

**Fichier à créer :** `backend/jarvis/src/worker.ts`

```typescript
// Point d'entrée du worker Railway (process séparé du web server)
import { Worker } from "bullmq";
import { getRedis } from "./lib/redis.js";
import { runOuroborosCycle } from "./lib/ouroboros-cycle.js";
import { ingestToMemPalace } from "./lib/mempalace-ingest.js";

// Worker Ouroboros
new Worker("ouroboros-cycle", async (job) => {
  console.log(`[worker] ouroboros cycle ${job.id} started`);
  await runOuroborosCycle();
  console.log(`[worker] ouroboros cycle ${job.id} done`);
}, { connection: getRedis(), concurrency: 1 });

// Worker MemPalace ingestion
new Worker("mempalace-ingest", async (job) => {
  const { persona, userMessage, assistantResponse } = job.data;
  await ingestToMemPalace(persona, userMessage, assistantResponse);
}, { connection: getRedis(), concurrency: 2 });

console.log("[worker] JARVIS worker started, waiting for jobs...");
```

### Étape 6 — Créer le cycle Ouroboros en TS

**Fichier à créer :** `backend/jarvis/src/lib/ouroboros-cycle.ts`

**Architecture clé :** Utilise `@anthropic-ai/claude-agent-sdk` avec `query()` — exactement comme `chat.ts`. Tout passe par le plan Max 5x/20x (fenêtres de 5h). Le binaire Claude Code est embarqué dans le Docker et le SDK l'utilise directement.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";
// Réutiliser resolveClaudeBinary() (extraire de chat.ts en lib partagée)

export async function runOuroborosCycle(): Promise<void> {
  // 1. Check kill-switches via ghRead("ops/kill-switches/ouroboros.flag")
  // 2. Si actif → skip silencieusement
  // 3. ghRead("brain/ouroboros/state.json") → check budget
  // 4. gather_signals() :
  //    - git log récent (via GitHub API commits endpoint)
  //    - proposals pending count
  //    - recent decisions
  //    - counters du jour
  //    - timeline du jour
  // 5. Appeler query() du Claude Agent SDK
  //    system prompt = identity.md content
  //    user prompt = signals JSON + instructions
  //    maxTurns: 15, Sonnet
  //    MCP tools : repo_read, repo_search, repo_list_publications,
  //                timeline_today, counters_today, recent_history,
  //                mempalace_search, web_search
  // 6. Parser la réponse pour extraire des proposals
  // 7. ghCreate("brain/ouroboros/proposals/pending/{id}.md", content)
  // 8. ghCreate("brain/ouroboros/diary/{date}.md", diary)
  // 9. Update state.json via ghWrite (lastCycle, totalCycles)
}
```

**Ouroboros a accès à tous les outils de lecture** pour explorer le repo en profondeur + web_search pour enrichir ses analyses. Il écrit ses proposals directement via ghCreate dans `brain/ouroboros/proposals/pending/` et son diary dans `brain/ouroboros/diary/` (son sandbox d'écriture, conformément à BIBLE §13). Ses proposals apparaissent dans l'OuroborosPanel côté UI → Fabrice/Romain valident ou rejettent.

### Étape 7 — Programmer le cycle répétitif

**Fichier à modifier :** `backend/jarvis/src/server.ts`

Après `app.listen()`, ajouter le scheduling BullMQ :
```typescript
import { ouroborosQueue } from "./lib/queues.js";

// Programmer le cycle Ouroboros toutes les 2h
await ouroborosQueue.upsertJobScheduler(
  "ouroboros-repeat",
  { every: 7_200_000 }, // 2h
  { name: "ouroboros-cycle" }
);
```

Le scheduling est déclaratif — si le server redémarre, BullMQ reprend là où il en était grâce à Redis.

### Étape 8 — Enqueue depuis le chat (MemPalace)

**Fichier à modifier :** `backend/jarvis/src/routes/chat.ts`

Remplacer l'appel direct d'ingestion MemPalace par un enqueue :
```typescript
import { mempalaceQueue } from "../lib/queues.js";

// Après saveMessage assistant, enqueue pour ingestion MemPalace
await mempalaceQueue.add("ingest", {
  persona,
  userMessage: message,
  assistantResponse: fullAssistantText,
});
```

### Étape 9 — Extraire resolveClaudeBinary() en lib partagée

**Fichier à créer :** `backend/jarvis/src/lib/claude-binary.ts`
- Déplacer `resolveClaudeBinary()` depuis `chat.ts`
- Exporter pour usage dans `chat.ts` et `ouroboros-cycle.ts`

**Fichier à modifier :** `backend/jarvis/src/routes/chat.ts`
- Importer `resolveClaudeBinary` depuis `../lib/claude-binary.js`

### Étape 10 — Dockerfile et Railway config pour le worker

**Fichier à modifier :** `backend/jarvis/Dockerfile`
- Le build reste identique (même image pour web et worker)
- Le CMD change selon le service Railway :
  - Web : `CMD ["npm", "start"]` (inchangé, lance `node dist/server.js`)
  - Worker : override dans Railway avec `node dist/worker.js`

**Fichier à modifier :** `backend/jarvis/package.json`
- Ajouter script : `"worker": "node dist/worker.js"`

**Config Railway pour le worker :**
1. Dashboard Railway → "New Service" → même repo GitHub
2. Settings → Start Command : `npm run worker`
3. Settings → pas de port (worker, pas de HTTP)
4. Variables : copier toutes les env vars du backend + `REDIS_URL`

### Variables d'environnement

| Variable | Où | Valeur |
|---|---|---|
| `REDIS_URL` | backend + worker | `redis://...` (fourni par Railway Redis addon) |
| `OUROBOROS_ENABLED` | worker | `true` (flag pour activer/désactiver) |

**Important :** Le trigger manuel (POST /ouroboros/trigger) enqueue un job dans `ouroborosQueue` au lieu de créer un fichier .trigger. Le worker le traite comme un cycle normal.

---

## TICKET 4.2 — MemPalace : ingestion automatique des conversations

**Problème :** MemPalace est vide ("pas encore peuplé" — screenshot 2). Les hooks Claude Code (`mempalace-save.sh`, `precompact-save.sh`) ne tournent que dans Claude Code terminal, pas dans l'app web JARVIS.

**Solution :** Ingérer automatiquement les conversations JARVIS dans MemPalace.

**Fichier à modifier :** `backend/jarvis/src/routes/chat.ts`

Après `saveMessage(conversationId, "assistant", fullAssistantText, ...)` (vers la fin de la route), ajouter un appel asynchrone (fire-and-forget, non bloquant) :

```typescript
// Fire-and-forget: save conversation turn to MemPalace
ingestToMemPalace(persona, message, fullAssistantText).catch(err => 
  console.warn("[chat] mempalace ingest failed:", err)
);
```

**Fichier à créer :** `backend/jarvis/src/lib/mempalace-ingest.ts`

Logique :
1. Construire le contenu markdown du drawer :
   ```markdown
   ---
   tags: [{persona}, conversation, {date}]
   date: "{ISO date}"
   source: "jarvis-web"
   ---
   # Conversation {persona} — {date} {heure}
   
   **User:** {message}
   
   **JARVIS:** {response (tronqué à 5000 chars)}
   ```
2. Déterminer le wing : `persona` (fabrice ou romain)
3. Déterminer le filename : `{date}-{heure}-{hash4chars}.md`
4. `ghCreate("brain/mempalace/wings/{wing}/drawers/{filename}.md", content, "[MEMPALACE] ingest conversation")`
5. Ne PAS créer de drawer si le message est court (< 50 chars) ou si la réponse est une erreur

**Fichier à modifier :** `backend/jarvis/src/lib/mempalace.ts`
- Invalider le cache Fuse.js après un ingest (pour que la recherche retrouve immédiatement le nouveau drawer)
- Ajouter une fonction `invalidateCache()` exportée

---

## TICKET 4.3 — OuroborosPanel : affichage temps réel amélioré

**Problème :** Le panel Ouroboros à droite affiche "Dernier cycle: jamais" et ne reflète pas l'état réel.

**Fichier à modifier :** `ui/jarvis/components/OuroborosPanel.tsx`

Changements :
1. Réduire l'intervalle de refresh de 120s à 60s
2. Afficher un indicateur visuel quand un cycle est en cours (si `state.lastCycle` a changé dans les 30 dernières minutes)
3. Afficher le nombre de diary entries (pas seulement proposals)
4. Ajouter un lien "Voir le dernier diary" qui ouvre le modal diary

**Fichier à modifier :** `backend/jarvis/src/routes/ouroboros.ts` — endpoint `GET /ouroboros/status`

Ajouter dans la réponse :
- `diaryCount` : nombre d'entrées dans `brain/ouroboros/diary/`
- `lastDiaryDate` : date de la dernière entrée
- `cycleRunning` : true si un cycle a été triggé dans les 30 dernières minutes

---

# PHASE 5 — Batch S7 card, mobile, sidebar

---

## TICKET 5.1 — Card Batch avec jauge et upload

**Problème :** Pas de moyen visuel de savoir où en est la préparation du batch de la semaine prochaine. Pas de moyen d'uploader les fichiers analytics (xlsx, csv) nécessaires.

**Fichier à créer :** `ui/jarvis/components/BatchCard.tsx`

**Design :**
- Card compacte dans la sidebar droite (entre les alertes et Ouroboros)
- Affiche : "Batch S{N+1}" avec une jauge de complétude
- La jauge se calcule sur les critères :
  - ✓ Batch S{N} existant (template de référence) 
  - ✓ plan-hebdo R/F/F2 de la semaine en cours à jour
  - ✓ progress-semaine R/F rempli
  - ✓ Analytics Twitter fournis (fichier uploadé)
  - ✓ Analytics LinkedIn fournis (fichier uploadé)
  - ✗ Metrics Stripe (si applicable)
- Au clic : expand la card pour montrer le détail de chaque critère (✓/✗)
- Bouton "Uploader analytics" : input file accept=".xlsx,.csv,.md"
- Les fichiers uploadés sont envoyés via `POST /api/batch/upload` et stockés dans `raw/analytics/S{N+1}/`
- Bouton "Générer batch S{N+1}" (disabled tant que la jauge < 60%)
- Le bouton génère un message JARVIS : "Génère le batch S{N+1}" qui déclenche le pattern 34 du system prompt

**Fichier à créer :** `backend/jarvis/src/routes/batch.ts`

Endpoints :
- `GET /batch/status` : retourne les critères de complétude pour le batch S{N+1}
- `POST /batch/upload` : reçoit un fichier, le stocke dans le repo via `ghCreate("raw/analytics/...")`

**Fichiers à modifier :**
- `backend/jarvis/src/server.ts` (ajouter les routes)
- `ui/jarvis/components/PersonaLayout.tsx` (intégrer BatchCard dans la sidebar droite)
- `ui/jarvis/app/api/batch/status/route.ts` (proxy, à créer)
- `ui/jarvis/app/api/batch/upload/route.ts` (proxy, à créer)

---

## TICKET 5.2 — Layout responsive mobile

**Problème :** Le layout 4 colonnes (200px + flex + flex-1 + 290px) ne fonctionne pas sur mobile.

**Fichier à modifier :** `ui/jarvis/components/PersonaLayout.tsx`

**Approche :**
1. Sous `md:` (768px) : passer en layout 1 colonne
   - Masquer sidebar gauche et droite
   - Chat occupe 100% de la largeur
   - Ajouter une bottom navigation bar avec 4 icônes : Chat, Timeline, Compteurs, Menu
   - "Menu" ouvre un drawer avec : QuickAccess, Ouroboros, Graphify, MemPalace, BatchCard
2. Le chat reste le composant central sur mobile
3. La timeline s'ouvre en overlay quand on clique sur l'icône Timeline
4. Les compteurs s'ouvrent en overlay quand on clique sur l'icône Compteurs
5. Ajouter dans `app/layout.tsx` la meta viewport si absente : `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />`
6. Ajouter dans `next.config.js` ou `vercel.json` le manifest pour PWA (add to homescreen)

**Fichier à créer :** `ui/jarvis/components/MobileNav.tsx`
- Bottom bar fixe avec 4 icônes (lucide-react)
- Gestion des overlays/drawers pour les panneaux latéraux

**Fichier à créer :** `ui/jarvis/public/manifest.json`
```json
{
  "name": "F2-JARVIS",
  "short_name": "JARVIS",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020612",
  "theme_color": "#00ffb4"
}
```

---

## TICKET 5.3 — Sidebar "Mémoire" différenciée de MemPalace

**Problème :** Le bouton "Mémoire" dans QuickAccessSidebar ouvre MemPalaceView, exactement comme le bouton "MemPalace" au-dessus. Redondant.

**Fichier à modifier :** `ui/jarvis/components/QuickAccessSidebar.tsx`

**Solution :** Remplacer "Mémoire" par "Résumé JARVIS" qui ouvre un résumé compact de l'état de JARVIS :
- Dernières conversations résumées
- Dernières actions commitées
- État Ouroboros en 1 ligne
- Différent de MemPalace (qui est l'archive verbatim navigable)

Alternativement, simplement supprimer le bouton "Mémoire" puisque MemPalace est déjà accessible juste au-dessus dans la sidebar.

**Recommandation :** Supprimer "Mémoire", c'est la solution la plus propre.

---

# PHASE 6 — JARVIS.md, repo self-org, proactivité

---

## TICKET 6.1 — JARVIS.md : manuel d'utilisation

**Fichier à créer :** `JARVIS.md` (racine du repo)

**Contenu :**
- Ce que JARVIS est (assistant agentique FoundryTwo)
- Comment parler à JARVIS (patterns reconnus, commandes)
- Ce que JARVIS peut faire (lire, chercher, proposer des actions, logger, générer du contenu, préparer des batches)
- Ce que JARVIS ne peut PAS faire (modifier du code sans validation, accéder aux APIs externes en write, bypass les kill-switches)
- Comment valider/rejeter les actions
- Comment uploader des images/fichiers
- Comment utiliser le mode F2
- Les raccourcis clavier
- Les commandes spéciales (/search, /wing)
- Troubleshooting (si les compteurs ne se mettent pas à jour, si Ouroboros est bloqué, etc.)

Ce fichier sera aussi injecté dans le system prompt comme contexte pour que JARVIS "sache" ce qu'il peut faire.

---

## TICKET 6.2 — JARVIS peut organiser et adapter le repo

**Problème :** JARVIS ne peut actuellement écrire que dans les dossiers de contenu marketing (via create_file dans action-executor.ts). Il doit pouvoir aussi :
- Organiser son propre espace de travail
- Adapter les fichiers de contenu réseaux (créer, modifier des fichiers de publication, de cold, d'engagement)
- Créer des agents ou fichiers de configuration pour des tâches spécifiques
- S'adapter au mieux pour aider Fabrice et Romain

**JARVIS ne touche PAS à son propre code** (`backend/`, `ui/`, `server.ts`, etc.) sauf pour créer des agents dans `.claude/agents/`.

**Fichier à modifier :** `backend/jarvis/src/lib/action-executor.ts`

**Changements :**
1. Ajouter `brain/jarvis-workspace/` dans `CREATE_FILE_ALLOWED_PREFIXES`
2. Ajouter `.claude/agents/` dans `CREATE_FILE_ALLOWED_PREFIXES` (pour que JARVIS puisse créer des agents spécialisés pour des tâches spécifiques)
3. Créer le dossier `brain/jarvis-workspace/` dans le repo (via un commit initial)
4. JARVIS peut y créer des fichiers .md, .json, .yaml pour :
   - Ses notes d'analyse du repo
   - Ses résumés de conversations
   - Ses plans de travail internes
   - Ses observations sur les patterns qu'il détecte
5. JARVIS peut aussi modifier/créer des fichiers dans les dossiers déjà autorisés (fabrice/, romain/, f2/, etc.) pour adapter le contenu réseaux, créer des templates, des fichiers de publication, des logs — tout ce qui aide au travail quotidien
6. Ce dossier workspace n'est PAS dans le deny-list d'Ouroboros (Ouroboros ne peut PAS écrire dedans — c'est l'espace de JARVIS, pas d'Ouroboros)

**Fichier à créer :** `brain/jarvis-workspace/README.md`
```markdown
# JARVIS Workspace

Espace de travail interne de JARVIS. Il peut y créer des fichiers pour organiser sa compréhension du repo et préparer son travail.

Contenu typique :
- Notes d'analyse
- Résumés de conversations importantes
- Plans de travail internes
- Observations et patterns détectés
- Agents spécialisés créés pour des tâches spécifiques

Règles :
- JARVIS écrit ici via propose_action(create_file)
- Fabrice valide avant commit (comme toute action)
- Ouroboros ne peut PAS écrire ici
```

---

## TICKET 6.3 — Mode proactif : JARVIS propose des actions

**Problème :** JARVIS est purement réactif. Il attend qu'on lui parle. Tu veux qu'il prenne des initiatives (comme un chef d'orchestre).

**Solution :** Intégrer la proactivité dans le cycle Ouroboros (ticket 4.1). Quand Ouroboros détecte quelque chose d'actionnable, il crée une proposal qui apparaît dans l'OuroborosPanel.

**Fichier à modifier :** `backend/jarvis/src/lib/background-cycle.ts` (créé dans le ticket 4.1)

Ajouter dans le prompt envoyé à Haiku pendant le cycle :
```
En plus de détecter des incohérences et risques, propose des ACTIONS concrètes :
- "Le cross-engagement de Romain n'est pas fait pour aujourd'hui — proposer un rappel"
- "Le batch S7 n'est pas commencé et on est vendredi — proposer de commencer"
- "3 cold outreach ont reçu des réponses non traitées — proposer un follow-up"
- "Les compteurs Twitter sont à 2/15 à 18h — proposer un sprint engagement"

Formatte chaque action comme une proposal standard avec priorité, contexte, et recommandation.
```

Les proposals apparaissent dans l'OuroborosPanel avec le bouton "Voir propositions". L'utilisateur accepte ou rejette. C'est le pattern validate-first, jamais d'action directe.

---

# Récapitulatif des fichiers

## Fichiers à créer (13)

| Fichier | Phase | Rôle |
|---|---|---|
| `backend/jarvis/src/routes/targets.ts` | 1 | Targets dynamiques depuis le batch |
| `backend/jarvis/src/routes/action-execute-batch.ts` | 3 | Commit groupé |
| `backend/jarvis/src/routes/batch.ts` | 5 | Status et upload batch |
| `backend/jarvis/src/lib/redis.ts` | 4 | Connexion Redis partagée |
| `backend/jarvis/src/lib/queues.ts` | 4 | Queues BullMQ (ouroboros + mempalace) |
| `backend/jarvis/src/lib/ouroboros-cycle.ts` | 4 | Logique du cycle Ouroboros en TS |
| `backend/jarvis/src/lib/mempalace-ingest.ts` | 4 | Ingestion conversations dans MemPalace |
| `backend/jarvis/src/lib/claude-binary.ts` | 4 | resolveClaudeBinary() partagé (extrait de chat.ts) |
| `backend/jarvis/src/worker.ts` | 4 | Point d'entrée worker Railway (process séparé) |
| `ui/jarvis/components/BatchCard.tsx` | 5 | Card batch avec jauge |
| `ui/jarvis/components/MobileNav.tsx` | 5 | Navigation mobile |
| `ui/jarvis/public/manifest.json` | 5 | PWA manifest pour mobile |
| `brain/jarvis-workspace/README.md` | 6 | Espace de travail JARVIS |

## Fichiers à modifier (18)

| Fichier | Phases | Lignes actuelles |
|---|---|---|
| `backend/jarvis/src/server.ts` | 1, 3, 4, 5 | 94 |
| `backend/jarvis/src/routes/chat.ts` | 2, 4 | 478 |
| `backend/jarvis/src/routes/context.ts` | 1, 3 | 334 |
| `backend/jarvis/src/routes/ouroboros.ts` | 4 | 392 |
| `backend/jarvis/src/routes/action-execute.ts` | 1 | ~50 |
| `backend/jarvis/src/lib/action-executor.ts` | 6 | 357 |
| `backend/jarvis/src/lib/context-types.ts` | 1 | ~20 |
| `backend/jarvis/src/lib/cache.ts` | 1 | ~30 |
| `backend/jarvis/src/lib/mempalace.ts` | 4 | 290 |
| `backend/jarvis/src/lib/jarvis-tools.ts` | 2 | 608 |
| `backend/jarvis/package.json` | 4 | — |
| `backend/jarvis/Dockerfile` | 4 | — |
| `ui/jarvis/components/PersonaLayout.tsx` | 1, 5 | 733 |
| `ui/jarvis/components/Chat.tsx` | 2, 3 | 1313 |
| `ui/jarvis/components/QuickAccessSidebar.tsx` | 1, 5 | 84 |
| `ui/jarvis/components/FileViewerModal.tsx` | 2 | 366 |
| `ui/jarvis/components/OuroborosPanel.tsx` | 4 | 377 |
| `ui/jarvis/components/jarvis/ActionCard.tsx` | 3 | 157 |
| `ui/jarvis/components/jarvis/ContentCard.tsx` | 2 | 120 |

## Proxy routes frontend à créer (4)

| Route | Backend target |
|---|---|
| `ui/jarvis/app/api/config/targets/route.ts` | `GET /targets` |
| `ui/jarvis/app/api/action/execute-batch/route.ts` | `POST /action/execute-batch` |
| `ui/jarvis/app/api/batch/status/route.ts` | `GET /batch/status` |
| `ui/jarvis/app/api/batch/upload/route.ts` | `POST /batch/upload` |

## Fichiers supplémentaires

| Fichier | Rôle |
|---|---|
| `JARVIS.md` | Manuel d'utilisation (ticket 6.1) — déjà livré |
| `ui/jarvis/lib/context-types.ts` | Ajouter `ph` et `ih` séparés (ticket 1.6) |

## Infra Railway à configurer manuellement (Phase 4)

| Service | Type | Config |
|---|---|---|
| Redis | Addon Railway | Dashboard → "New" → "Database" → "Redis". Copier `REDIS_URL`. |
| jarvis-worker | Nouveau service Railway | Même repo GitHub. Start Command: `npm run worker`. Pas de port HTTP. Copier toutes les env vars du backend + `REDIS_URL` + `OUROBOROS_ENABLED=true`. |

---

# Ordre d'exécution recommandé pour Claude Code

```
Session 1 : Phase 1 (compteurs + cache) + Phase 2 (chat UX + web search)
  → npm run build backend ✓
  → npm run build frontend ✓
  → Test : compteurs adaptés au batch, reply structurées, stop fonctionne, web search actif

Session 2 : Phase 3 (commits groupés)
  → npm run build backend ✓
  → npm run build frontend ✓
  → Test : sélection ✓/✗ par reply, commit groupé, suggestions contextuelles

Session 3 : Phase 4 (Redis + Worker + Ouroboros + MemPalace)
  → npm run build backend ✓
  → npm install bullmq ioredis ✓
  ⚠️ Fabrice : créer Redis addon + worker service sur Railway (voir section infra ci-dessus)
  → Test : Ouroboros fait son premier cycle, MemPalace se peuple, proposals apparaissent

Session 4 : Phase 5 (batch card + mobile)
  → npm run build frontend ✓
  → Test : card batch visible avec jauge, upload fichiers, mobile responsive, PWA installable

Session 5 : Phase 6 (repo self-org + proactivité)
  → Test : JARVIS peut créer/adapter des fichiers dans son workspace et le contenu réseaux
  → Ouroboros propose des actions proactives
  → Commit JARVIS.md à la racine
```

---

*Document généré le 22 avril 2026, mis à jour le 23 avril 2026 — 27 tickets, 6 phases, 13 fichiers à créer, 18 à modifier, Redis + Worker infra.*
