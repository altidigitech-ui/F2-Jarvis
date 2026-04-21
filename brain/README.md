# brain/ — Couche cognitive F2-Jarvis

**Rôle :** mémoire persistante et système de proposition autonome de Jarvis.

---

## 3 composants

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

---

## Kill-switches

Chaque système a son kill-switch dans `ops/kill-switches/` :
- `ouroboros.flag`
- `mempalace.flag`
- `global.flag` (cut tout)

Auto-activés par `f2-accountant` si budget dérive (90% → ouroboros, 100% → global).

---

## Références

- Backend qui gère tout : `backend/jarvis/`
- Frontend qui explore : `ui/jarvis/components/MemPalaceView.tsx`, `OuroborosPanel.tsx`
- Config budget : `ops/budget/limits.yaml`

---

**Dernière mise à jour : 21 avril 2026**
