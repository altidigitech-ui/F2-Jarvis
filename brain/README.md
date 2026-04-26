# brain/ — Couche cognitive F2-Jarvis

**Rôle :** mémoire persistante et système de proposition autonome de Jarvis.

---

## 4 composants

### Ouroboros — `brain/ouroboros/`

Conscience de fond BRIDÉE. Lit le repo en read-only. Écrit UNIQUEMENT dans son sandbox.

**Ce qu'il fait :**
- 1 cycle par nuit (2h-5h CEST, Haiku, 10-30 min, ~0,30€/cycle)
- Analyse le repo, détecte patterns, génère des proposals dans `proposals/`
- Fabrice valide/rejette via `/review-proposals` en Claude Code terminal

**Ce qu'il ne fait pas :**
- Jamais de commit, push, API externe en write
- Jamais d'action hors de `brain/ouroboros/{proposals,diary,state}/`
- Kill-switch disponible : `ops/kill-switches/ouroboros.flag`

Constitution : `brain/ouroboros/identity.md` + `brain/ouroboros/bible.md`.

### MemPalace — `brain/mempalace/`

Archive verbatim. Organisée en wings (personnes, SaaS, projets) → rooms (jour/session) → drawers (contenu).

**Ce qu'il fait :**
- Sauvegarde chaque conversation Jarvis en contenu verbatim
- Semantic search local via ChromaDB (zéro API par query)
- Explorable depuis l'UI (`/romain` ou `/fabrice` → bouton MemPalace)

**Structure :**

```
mempalace/
├── wings/            # Personnes, SaaS, projets
│   ├── romain/
│   ├── fabrice/
│   ├── storemd/
│   └── ...
├── drawers/          # Contenus détaillés
└── rooms/            # Sessions datées
```

### mem0 — `brain/mem0/`

Extraction de faits structurés (JSONL). Optionnel V1.

Permet d'extraire des triplets (sujet, prédicat, objet) des conversations pour queries rapides.

### Context Cognitif — `brain/context-cognitif/`

77 fichiers de primitives cognitives en 10 couches concentriques. Ils ne stockent pas de données — ils définissent COMMENT l'agent pense.

**Ce que c'est :**
- 10 couches : noyau, mémoire, raisonnement, métacognition, décision, constantes, social, systèmes, émergence, vérité
- 3 transversaux : apprentissage, capacité, équation
- Chaque fichier a un header YAML avec dépendances, token cost, et usage

**Chargement :**
- Via le skill `cognitive-loader` (on-demand, jamais always-on)
- 6 profils pré-définis : technical, creative, social, strategic, debug, deep
- Budget : 5000 tokens/session, 5 fichiers max

**Commandes :**
- `/cognition` — gestion du contexte cognitif
- `/think` — analyse profonde via f2-thinker

**Cartographie :** `brain/context-cognitif/ARCH.md` (lire avant toute modification).

**Analogie cerveau :** si ouroboros est le cycle veille/sommeil, mempalace l'hippocampe, et mem0 le cortex factuel, context-cognitif est le **néocortex** — la couche de raisonnement abstrait.

---

## Kill-switches

Chaque système a son kill-switch dans `ops/kill-switches/` :
- `ouroboros.flag`
- `mempalace.flag`
- `global.flag` (cut tout)
- Note : context-cognitif n'a pas de kill-switch (fichiers statiques, coût zéro au repos).

Auto-activés par `f2-accountant` si budget dérive (90% → ouroboros, 100% → global).

---

## Références

- Backend qui gère tout : `backend/jarvis/`
- Frontend qui explore : `ui/jarvis/components/MemPalaceView.tsx`, `OuroborosPanel.tsx`
- Config budget : `ops/budget/limits.yaml`

---

**Dernière mise à jour : 21 avril 2026**
