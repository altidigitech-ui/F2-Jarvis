# F2-JARVIS Web Dashboard

Dashboard interne F2-JARVIS. Next.js 14 + TypeScript + Tailwind + shadcn/ui.

## Setup

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Pages

- `/` — Overview F2 (stats, SaaS, quick actions)
- `/morning` — Output de la slash command `/morning`
- `/status` — État complet F2 (à implémenter)
- `/budget` — Dépenses tokens par service / modèle
- `/proposals` — Review des propositions Ouroboros
- `/graph` — Viz interactive Graphify
- `/timeline` — Timeline Ouroboros diary (à implémenter)
- `/mempalace` — Browser MemPalace wings (à implémenter)
- `/saas/<n>` — Détail par SaaS (à implémenter)

## À câbler

Les pages sont scaffoldées mais la plupart affichent des placeholders. Les API routes Next.js à créer :

- `GET /api/morning` → exécute slash command `/morning` et renvoie markdown
- `GET /api/status` → collecte état F2
- `GET /api/budget` → parse `ops/budget/history.csv` + `limits.yaml`
- `GET /api/proposals` → liste `brain/ouroboros/proposals/*.md`
- `POST /api/proposals/:id/action` → accept / reject / defer / ignore
- `GET /api/graphify/embed` → serve `graphify-out/graph.html`
- `GET /api/mempalace/wings` → liste wings + compte drawers
- `GET /api/saas` → liste submodules + statut

## Stack & design

- **Next.js 14** App Router
- **TypeScript** strict
- **Tailwind CSS** + design tokens F2 (voir `tailwind.config.ts`)
- **shadcn/ui** (à installer via `npx shadcn@latest init`)
- **lucide-react** pour les icônes
- **recharts** pour graphiques métriques
- **Dark mode default** (identité F2)
- **Geist font** (préféré à Inter)

## Accessibilité

- `eslint-plugin-jsx-a11y` actif
- Keyboard nav via focus-visible outline
- Contrast AA min
- Cible Lighthouse a11y > 95

## Ne jamais faire

- localStorage / sessionStorage (ne marche pas dans certains environnements Claude)
- Utiliser des composants custom quand shadcn suffit
- Fake stats dans les placeholders (mettre "—" plutôt)
- Altistone mention

## Build

```bash
npm run build
npm run start
```

Déploiement Vercel :

```bash
vercel link
vercel --prod
```
