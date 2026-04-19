# Cache Policy F2-JARVIS

## Objectif

Minimiser les tokens facturés en mettant en cache tout ce qui est stable entre sessions.

## Prompt caching Claude

Claude API supporte le prompt caching :
- **Cache write** : 1.25x (TTL 5min) ou 2x (TTL 1h) le prix input
- **Cache read** : 10% du prix input (90% d'économie)

### Seuil de cache

Le caching est rentable dès que le même prompt est lu 2x minimum.

### Ce qu'on met en cache (TTL 1h)

- `CLAUDE.md` (brief maître, lu à chaque session)
- `BIBLE.md` (principes non-négociables)
- Skills always-on :
  - `.claude/skills/graphify/SKILL.md`
  - `.claude/skills/f2-brand-voice/SKILL.md`
  - `.claude/skills/handoff-writer/SKILL.md`
- `graphify-out/GRAPH_REPORT.md` (si > 1 session en cours par jour)
- `strategie/CONTEXT.md`

### Ce qu'on met en cache (TTL 5min)

- Skills on-demand chargés en cours de session
- Fichiers context spécifiques à une tâche (CONTEXT.md du SaaS en cours)
- Fichiers markdown de plus de 5k tokens consultés en session

### Ce qu'on NE met PAS en cache

- Messages utilisateur (variables par nature)
- Outputs de tool calls (résultats dynamiques)
- Fichiers qui changent à chaque commit (HANDOFF.md)

## Graphify cache

Graphify a son propre cache SHA256 dans `graphify-out/cache/`. Ne jamais supprimer ce dossier sauf full rebuild voulu.

Règles :
- **Incremental update** (`--update`) par défaut → cache hit pour fichiers non changés
- **Full rebuild** (`--force`) uniquement si corruption ou schema change
- Cache gitignored (pas versionné), re-généré au besoin

## MemPalace cache

MemPalace utilise ChromaDB en local. Les embeddings sont cachés dans `brain/mempalace/chroma/`.

Règles :
- Embeddings générés localement (modèle local, pas API)
- Pas de coût API par embedding
- Cache persistant entre sessions

## Claude Code prompt caching

Activé par défaut via `settings.json` → `cache_control` blocks dans les prompts système.

Vérification :
```bash
# Inspecter l'usage cache sur la session courante
/usage
```

Output attendu :
```
Tokens: 120k (cache hits: 95%, cache writes: 3%, non-cached: 2%)
```

Si `non-cached > 20%`, c'est qu'on répète du contexte non-caché. Investiguer.

## Cache invalidation

Le cache est invalidé automatiquement :
- Quand le contenu d'un fichier caché change
- Après TTL (5min ou 1h selon config)
- Sur commande explicite `/cache invalidate` (si on ajoute cette command V2)

## Métriques à tracker

Dans `ops/budget/history.csv`, colonne `notes` peut inclure :
- `cache_hit_rate=0.95` pour sessions à high cache hit
- Sessions avec `cache_hit_rate < 0.7` → investiguer

## Anti-patterns

- Caching des messages utilisateur (inutile, variables)
- Caching des outputs d'outils (dynamiques)
- TTL 1h sur fichiers qui changent toutes les 10min (gâche le write 2x)
- Oublier d'invalider quand on modifie un skill
