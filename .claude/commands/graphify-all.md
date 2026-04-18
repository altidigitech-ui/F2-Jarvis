---
name: graphify-all
description: Réindexe tout F2-JARVIS avec Graphify. Incrémental par défaut (rapide). --force pour full rebuild.
---

# /graphify-all [--force]

Usage :
- `/graphify-all` → incrémental (recommandé, rapide)
- `/graphify-all --force` → full rebuild (rare, coûteux, seulement si corruption)

## Process

1. Vérifier kill-switch : `ops/kill-switches/graphify.flag`
2. Check budget (f2-accountant)
3. Scanner les submodules — re-sync si demandé
4. Run `graphify analyze .` (ou `--force` selon flag)
5. Mettre à jour `graphify-out/`
6. Générer le wiki : `graphify --wiki`
7. Nettoyer `graphify-out/.stale` si présent
8. Reporter : temps pris, fichiers ajoutés/modifiés/supprimés, god nodes

## Exemples

### Incrémental après une grosse session
```
/graphify-all
```
→ 30-60 secondes typiquement. Seuls les fichiers changés depuis le dernier index sont re-parsés.

### Full après corruption ou schema change
```
/graphify-all --force
```
→ 3-10 minutes selon la taille du corpus (inclus les submodules SaaS).

## Output type

```markdown
## Graphify indexation complète — 18 avril 2026 — 09:23 CEST

### Mode : incrémental
### Durée : 47 secondes

### Changements
- 12 fichiers ajoutés
- 34 fichiers modifiés
- 3 fichiers supprimés
- 0 fichiers ambigus

### God nodes top 5
1. `StoreMD` (47 connexions)
2. `Shopify GraphQL` (38 connexions)
3. `Fabrice` (29 connexions)
4. `Claude Code` (24 connexions)
5. `MemPalace` (18 connexions)

### Communautés
- F2-core (studio/, marketing/, patterns/)
- StoreMD (saas/storemd/)
- Leak Detector (saas/leak-detector/)
- Infra (ops/, .claude/)
- Brain (brain/)

### Wiki généré
`graphify-out/wiki/index.md` — 47 articles mis à jour
```

## Règles

- Ne PAS run `--force` sans raison documentée
- Budget par run incrémental : ~0.05 €
- Budget par run full : ~0.30-1.50 € (dépend corpus size)
- Si index stale depuis > 24h, Claude doit recommander `/graphify-all` avant de répondre aux questions d'archi
