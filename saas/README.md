# F2 SaaS — Submodules

> Chaque SaaS F2 est un submodule git pointant vers son propre compte GitHub dédié.
> Raison : profiter du free tier GitHub (Actions, Packages, Copilot, etc.) par org.

## Stratégie multi-org

Chaque SaaS F2 a son propre compte GitHub (org ou user). Avantages :
- Free tier GitHub Actions par org (2000 min/mois)
- Free tier GitHub Packages par org
- Isolation sécuritaire (un compromise d'un SaaS n'expose pas les autres)
- Visibilité par SaaS (contributors, stars, visibility settings)

Inconvénient : pas de vision transversale → **C'est exactement ce que F2-JARVIS répare.**

## Structure

```
saas/
├── leak-detector/     → git submodule vers github.com/foundrytwo-ld/leak-detector
├── storemd/           → git submodule vers github.com/foundrytwo-storemd/storemd
├── payloaddiff/       → git submodule vers github.com/foundrytwo-pd/payloaddiff
├── f2-ops-hub/        → git submodule vers github.com/foundrytwo-ops/f2-ops-hub
└── contentforge/      → git submodule vers github.com/foundrytwo-cf/contentforge
```

## Ajouter un nouveau SaaS submodule

```bash
# 1. Créer le repo sur GitHub (org dédiée)
# 2. Ajouter comme submodule
git submodule add git@github.com:foundrytwo-XXX/<saas-name>.git saas/<saas-name>

# 3. Init et update
git submodule update --init --recursive

# 4. Commit
git add .gitmodules saas/<saas-name>
git commit -m "chore(saas): add <saas-name> submodule"
```

## Clone F2-JARVIS avec submodules

```bash
git clone --recurse-submodules git@github.com:<user>/f2-jarvis.git
```

Ou si déjà cloné :
```bash
git submodule update --init --recursive
```

## Sync submodules vers dernière version

```bash
# Update tous les submodules
git submodule update --remote

# Update un seul
cd saas/leak-detector && git pull origin main && cd ../..
git add saas/leak-detector
git commit -m "chore(saas): bump leak-detector to latest"
```

## Règles

- **F2-JARVIS ne modifie PAS** le code des SaaS directement
- Toute modification d'un SaaS = commit dans son repo dédié, puis bump du submodule F2-JARVIS
- **Secrets restent dans les repos SaaS**, pas dans F2-JARVIS
- **CONTEXT.md par SaaS** à jour dans chaque submodule

## CONTEXT.md par SaaS

Chaque `saas/<saas>/CONTEXT.md` suit le template de `.claude/skills/context-md-generator/SKILL.md`.

Claude Code lit automatiquement ce CONTEXT.md quand il travaille dans un submodule.

## Comptes GitHub dédiés (structure proposée)

| SaaS | Org GitHub | Repo |
|---|---|---|
| Leak Detector | foundrytwo-ld | leak-detector |
| StoreMD | foundrytwo-storemd | storemd |
| PayloadDiff | foundrytwo-pd | payloaddiff |
| ContentForge | foundrytwo-cf | contentforge |
| F2 Ops Hub | foundrytwo-ops | f2-ops-hub |

## Visibilité

- **Privé par défaut** pour tous les SaaS
- **Public** possible pour :
  - Open-source components (SDK client, exemples)
  - Si stratégie build-in-public explicite avec un SaaS donné
