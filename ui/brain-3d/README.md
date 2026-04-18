# F2-JARVIS — Brain 3D

> Cerveau anatomique 3D interactif pour naviguer le knowledge base F2-JARVIS.

## Setup

```bash
npm install
npm run dev
# → http://localhost:3001
```

## Concept

Visualisation 3D du cerveau F2-JARVIS. Les régions anatomiques correspondent aux dossiers du repo :

| Zone | Dossier F2-JARVIS | Rôle |
|---|---|---|
| Cortex préfrontal | `studio/decisions/` | Décisions stratégiques |
| Lobe frontal gauche | `studio/` | Vision, roadmap |
| Lobe temporal gauche | `marketing/` | Langage, content |
| Lobe temporal droit | `marketing/brand/` | Créativité, branding |
| Lobe pariétal | `ops/` | Coordination, ops |
| Lobe occipital | `raw/` | Perception, inbox |
| Cervelet | `patterns/` | Learnings capturés |
| Hippocampe | `brain/mempalace/` | Mémoire long-terme |
| Tronc cérébral | `saas/` | SaaS en production |
| Amygdale | `brain/ouroboros/proposals/` | Signaux d'alerte |

Voir `src/lib/zones.ts` pour le mapping complet.

## Interactions

- **Rotate** : clic + drag
- **Zoom** : scroll / pinch
- **Hover une région** : highlight + label
- **Click une région** : SidePanel avec contenu du dossier
- **Drag-drop un fichier** : Haiku classifie, confirmation avant copie

## Stack

- **React** + **Vite** + **TypeScript**
- **@react-three/fiber** (R3F)
- **@react-three/drei** (helpers)
- **three.js** r164+
- **Zustand** (state)
- **react-dropzone** (drag-drop)
- **Tailwind** (UI overlay)
- **lucide-react** (icons)

## À câbler

V1 = frontend scaffold avec interactions locales. V2 = wiring backend.

API routes à créer (Next.js ou serveur Python FastAPI) :

- `POST /api/classify` — Haiku classifie un fichier drop → `{regionId, confidence, suggestedFilename}`
- `POST /api/place-file` — copie le fichier dans `<folder>/<filename>`
- `GET /api/list?folder=<path>` — liste les fichiers d'un dossier
- `GET /api/activity` — heatmap activité par zone (git log 7j)

## Modèle 3D

V1 utilise des sphères pour les régions — simple, fonctionnel, pas moche.

V2 optionnelle : charger un vrai modèle GLB anatomique via `useGLTF`. Sources CC0 :
- BrainGL dataset
- Sketchfab CC-BY models
- Modèle généré via Blender + anatomie free

## Accessibilité

La 3D n'est **pas accessible** par nature (WCAG). Parade :

- Route `/flat` affiche une version 2D (liste de dossiers)
- Navigation keyboard entre régions (à implémenter)
- Screen reader annonce les noms de régions (à implémenter)

## Budget

- Drop classification Haiku : ~200 tokens par fichier = **~0.001€ par drop**
- 100 drops/jour = 0.10€/jour — négligeable sur plan Max 5x

## Build

```bash
npm run build
npm run preview
```

Déploiement : Vercel free tier (static SPA).

## Ne pas faire

- Pas d'animations excessives (motion sickness)
- Pas de preset camera "dramatic" (garde sobre)
- Pas de loading fancy sur R3F (préfère rendering direct)
- Pas de CapsuleGeometry (introduite en r142, vérifier compat)
