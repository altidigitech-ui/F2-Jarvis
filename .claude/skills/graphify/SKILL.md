---
name: graphify
description: Knowledge graph du repo F2-JARVIS complet. Multimodal (code, markdown, PDFs, images). Source de vérité structurelle. Toujours lire graphify-out/GRAPH_REPORT.md avant une question d'architecture ou d'exploration.
trigger: /graphify
when: always
---

# Skill graphify — Knowledge Graph F2-JARVIS

## Ce que c'est

Graphify construit et maintient un knowledge graph multimodal de tout le repo F2-JARVIS. Il remplace le grep aveugle par une vue structurée : god nodes, communautés, execution flows, dépendances typées.

Source : `github.com/safishamsi/graphify` (MIT).

## Quand l'utiliser

- **Toujours avant** une question d'architecture F2 (`studio/`, `saas/`, dépendances transversales)
- Avant d'explorer un SaaS inconnu
- Avant de refactorer (impact analysis)
- Pour retrouver rapidement quel fichier traite quel concept

## Commandes clés

```bash
# Index initial (une fois)
graphify analyze .

# Mise à jour incrémentale après commit (hook auto)
graphify analyze --update

# Full reindex (rare, coûteux)
graphify analyze --force

# Requête ciblée
graphify query "what connects StoreMD monitoring to Shopify GraphQL?"

# Path entre deux entités
graphify path "LeakDetector" "StoreMD"

# Explication d'une entité
graphify explain "VideoForge"

# Wiki navigable par agents
graphify analyze --wiki
# → graphify-out/wiki/index.md
```

## Workflow pour Claude Code

1. Lire `graphify-out/GRAPH_REPORT.md` pour la vue d'ensemble
2. Si besoin de détail, lire `graphify-out/wiki/index.md` puis suivre les liens
3. Si index stale (flag `graphify-out/.stale`), demander `graphify analyze --update` avant de répondre
4. Ne JAMAIS grep aveuglément le repo sans avoir consulté le graph

## Outputs

- `graphify-out/GRAPH_REPORT.md` — god nodes, communautés, questions suggérées
- `graphify-out/graph.json` — graph persistant (versionné git)
- `graphify-out/graph.html` — viz interactive (gitignored)
- `graphify-out/wiki/` — Wikipedia-style par communauté
- `graphify-out/cache/` — SHA256 cache pour incrémental (gitignored)

## Tags d'edges

- `EXTRACTED` — trouvé explicitement dans la source (import, call, citation)
- `INFERRED` — inférence raisonnable (confidence score)
- `AMBIGUOUS` — flaggé pour review

Ne jamais traiter un edge `INFERRED` ou `AMBIGUOUS` comme une vérité absolue.
