---
name: graphify
description: Knowledge graph du repo F2-JARVIS. Extraction code-first (tree-sitter, no-LLM) avec queries BFS/path/explain sur graph.json. Toujours lire graphify-out/GRAPH_REPORT.md avant une question d'architecture.
trigger: /graphify
when: always
---

# Skill graphify — Knowledge Graph F2-JARVIS

## Ce que c'est

Graphify construit un knowledge graph du repo F2-JARVIS. Il remplace le grep aveugle par une vue structurée : god nodes, communautés, dépendances typées.

Version CLI : **graphifyy 0.4.23**
Source : `github.com/safishamsi/graphify` (MIT).

## Quand l'utiliser

- **Toujours avant** une question d'architecture F2 (`studio/`, `saas/`, dépendances transversales)
- Avant d'explorer un SaaS inconnu
- Avant de refactorer (impact analysis)
- Pour retrouver rapidement quel fichier traite quel concept

## Commandes CLI réelles (v0.4.23)

```bash
# Bootstrap + mise à jour (extraction code, no-LLM, rapide)
graphify update .

# Watch : rebuild le graph à chaque changement code
graphify watch .

# Re-clusterer uniquement sans re-extraction
graphify cluster-only .

# Requête en langage naturel (BFS sur graph.json)
graphify query "what connects StoreMD monitoring to Shopify GraphQL?"
graphify query "..." --dfs --budget 2000

# Path entre deux entités
graphify path "LeakDetector" "StoreMD"

# Explication d'une entité
graphify explain "VideoForge"

# Benchmark : gain en tokens vs grep plein corpus
graphify benchmark graphify-out/graph.json

# Ajouter un document externe (URL) au corpus
graphify add https://example.com/article --author "Name"

# Sauvegarder une réponse Q&A pour feedback loop
graphify save-result --question "..." --answer "..." --nodes Node1 Node2

# Git hooks (post-commit / post-checkout) pour auto-update
graphify hook install
graphify hook status
graphify hook uninstall
```

### Ce que le CLI NE fait PAS (malgré la doc historique)

- Pas de sous-commande `graphify analyze`
- Pas de flag `--update`, `--force`, ou `--wiki`
- Pas d'extraction LLM-based de `.md`/`.pdf`/images en mode code-only (`update`)
- Pas de génération automatique de `graphify-out/wiki/`

Pour ré-indexer : re-run `graphify update .` — l'extraction est déterministe et rapide (tree-sitter, no-LLM).

## Workflow pour Claude Code

1. Lire `graphify-out/GRAPH_REPORT.md` pour la vue d'ensemble
2. Pour une question ciblée : `graphify query "..."` ou `graphify explain "NodeName"`
3. Pour une trace de dépendance : `graphify path "A" "B"`
4. Si les fichiers code ont changé depuis le dernier index (ou hook pas installé) : re-run `graphify update .` avant de répondre
5. Ne JAMAIS grep aveuglément le repo sans avoir consulté le graph

## Outputs

- `graphify-out/graph.json` — graph persistant (versionné git)
- `graphify-out/GRAPH_REPORT.md` — god nodes, communautés, surprising connections
- `graphify-out/graph.html` — viz interactive (gitignored)
- `graphify-out/cache/` — SHA256 cache pour incrémental (gitignored)
- `graphify-out/memory/` — Q&A sauvegardés via `save-result` (feedback loop)

## Tags d'edges

- `EXTRACTED` — trouvé explicitement dans la source (import, call)
- `INFERRED` — inférence raisonnable (confidence score)
- `AMBIGUOUS` — flaggé pour review

Ne jamais traiter un edge `INFERRED` ou `AMBIGUOUS` comme une vérité absolue.

## Limites connues

- `update` est code-first (tree-sitter) : les `.md`, PDFs, images ne peuplent pas le graph
- Pour intégrer un doc externe, utiliser `graphify add <url>` (place dans `./raw/`)
- Corpus F2-JARVIS actuel majoritairement `.md` → graph actuel reflète surtout `brain/ouroboros/*.py`
