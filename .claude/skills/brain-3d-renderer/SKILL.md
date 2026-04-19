---
name: brain-3d-renderer
description: Skill pour maintenir le cerveau 3D de F2-JARVIS. React Three Fiber, cerveau anatomique avec zones thématiques, drag-drop files qui se classifient auto.
trigger: brain 3D, cerveau 3D, ui/brain-3d, visualisation
when: on-demand
---

# Skill brain-3d-renderer

## Projet

`ui/brain-3d/` — app React Three Fiber qui affiche un cerveau 3D anatomique interactif.

## Mapping zones → dossiers F2-JARVIS

| Zone anatomique | Dossier F2-JARVIS | Rôle |
|---|---|---|
| Cortex préfrontal | `tracking/decisions-log.md` | Décisions stratégiques |
| Lobe frontal gauche | `strategie/CONTEXT.md` | Planification |
| Lobe temporal gauche | `marketing/` | Langage, marketing |
| Lobe temporal droit | `marketing/brand/` | Créativité, brand |
| Lobe pariétal | `ops/` | Coordination, ops |
| Lobe occipital | `raw/` | Perception (inputs bruts) |
| Cervelet | `patterns/` | Automatismes appris |
| Hippocampe | `brain/mempalace/` | Mémoire long-terme |
| Tronc cérébral | `saas/` | Fonctions vitales (SaaS en prod) |
| Amygdale | `brain/ouroboros/proposals/` | Signaux d'alerte |

## Stack

- **React Three Fiber** + **drei** helpers
- **Three.js** r158+ (pas r128 à cause CapsuleGeometry)
- **Tailwind** pour UI overlay
- **Zustand** pour state management
- **react-dropzone** pour drag-drop fichiers
- **Lucide** icons

## Composants clés

### `<Brain />` — mesh anatomique
Modèle GLB chargé via `@react-three/drei`'s `useGLTF`. 
Source : modèle anatomique free (BrainGL dataset, CC0) ou Sketchfab CC-BY.

### `<Region name="cortex-prefrontal" />` — zone interactive
- Hitbox 3D
- Hover = highlight
- Click = open side panel avec contenu du dossier mappé
- Pulse animation quand activité (commit récent dans le dossier)

### `<DropZone />` — drop files
- Accept any file
- Classification auto via Haiku (prompt court : "classify this into one of: decisions, marketing, ops, patterns, raw, saas")
- Placement animation du fichier vers la bonne zone
- Confirmation avant copie effective

### `<ActivityPulse />` — heatmap temps réel
- Lit `git log` pour détecter activité récente par dossier
- Régions "chaudes" (commits récents) pulsent
- Régions "froides" (pas touchées depuis > 30j) sont sombres

### `<SidePanel />` — détail d'une zone
- Liste des fichiers de la zone
- Mini-preview markdown
- Link "open in editor"

## Flow de classification d'un drop

1. User drop fichier sur le cerveau
2. Haiku classifie (prompt court, ~200 tokens)
3. Overlay montre "→ zone X ?" avec confirm
4. Si OK : file copié dans `<dossier>/<nom>`
5. Graphify reindex en background (hook post-commit ou manuel)
6. Pulse animation sur la zone

## Budget

Haiku appel ~ 0.001€ par classification. Même 100 drops/jour = 0.10€/jour. Négligeable.

## Page hosting

```bash
cd ui/brain-3d && npm run dev
# → http://localhost:3001
```

Ou build static :
```bash
npm run build
# dist/ déployable sur Vercel free tier
```

## Accessibilité

3D n'est PAS accessible par nature (WCAG). Donc :
- Version 2D alternative en `/flat` route (liste de dossiers cliquable)
- Navigation keyboard (tab → focus zones → enter → open panel)
- Screen reader announces zone names
