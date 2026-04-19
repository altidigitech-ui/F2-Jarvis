# MemPalace — F2-JARVIS verbatim memory

> Stockage verbatim de tout ce qui compte : conversations Claude, docs F2, décisions.
> Organisé spatialement : Wings → Rooms → Drawers.

## Structure

```
mempalace/
├── wings/
│   ├── leak-detector/     # Wing pour SaaS LD
│   │   ├── rooms/         # organisation temporelle (1 room / jour)
│   │   └── drawers/       # contenu verbatim
│   ├── storemd/
│   ├── payloaddiff/
│   ├── contentforge/
│   ├── f2-ops-hub/
│   ├── f2-studio/         # Wing studio (vision, roadmap, décisions)
│   ├── romain/            # Wing communications Romain
│   ├── fabrice/           # Wing perso Fabrice
│   └── marketing/         # Wing marketing transversal
│
├── agent-diaries/         # 1 diary par agent spécialisé
│   ├── f2-architect.md
│   ├── f2-dev.md
│   └── ...
│
├── chroma/                # embeddings locaux (gitignored)
└── knowledge_graph.db     # SQLite KG temporel (gitignored)
```

## Concept Wings / Rooms / Drawers

- **Wing** = entité ou thème large (un SaaS, une personne, un domaine de marketing)
- **Room** = sous-unité temporelle (1 jour, 1 session, 1 meeting)
- **Drawer** = contenu verbatim (une conversation, un doc, une décision)

Analogie : palais de mémoire antique — tu te balades dans le palais, tu entres dans une wing, tu passes par une room, tu ouvres un drawer.

## Ingestion

### Automatique (hooks Claude Code)
- `mempalace-save.sh` → save session en cours toutes les 10 min
- `precompact-save.sh` → save avant `/compact`
- Session stop → save final

### Manuelle (CLI)
```bash
# Importer conversations Claude exportées
mempalace mine ./raw/transcripts/claude-export.json

# Importer notes markdown
mempalace mine ./tracking/

# Importer une conversation spécifique
mempalace add --wing storemd --content "$(cat session.md)"
```

## Retrieval

### Semantic search
```bash
mempalace search "qu'est-ce qu'on avait décidé sur le pricing StoreMD ?"
```

Output :
```
Top results:
1. wings/storemd/drawers/2026-04-16-pricing-decision.md (score: 0.94)
2. wings/f2-studio/drawers/2026-04-16-romain-sync.md (score: 0.82)
3. wings/marketing/drawers/2026-04-10-pricing-benchmark.md (score: 0.75)
```

### Scope par wing
```bash
mempalace search --wing storemd "pricing"
```

### Via MCP (depuis Claude Code)
Les outils MCP exposent :
- `mempalace_search(query, wing?, limit?)`
- `mempalace_get(drawer_id)`
- `mempalace_list_wings()`
- `mempalace_list_rooms(wing)`

29 outils MCP au total (voir MemPalace docs).

## Installation

```bash
pip install mempalace
cd /path/to/f2-jarvis
mempalace init
```

Cela crée :
- Structure wings/ de base
- Config dans `~/.mempalace/config.yaml`
- Hooks Claude Code dans `.claude/settings.json`
- Knowledge graph SQLite initialisé

## Règles F2

1. **Ingestion uniquement si valeur** : ne pas balancer tout un dump Slack dans MemPalace
2. **Wings par entité** : un nouveau SaaS = nouvelle wing
3. **Rooms par jour** (par défaut), sauf pour sessions très longues (split possible)
4. **Drawer = contenu cohérent** : une conversation, un doc, un thread, pas un fouillis
5. **Tags** : utiliser les tags MemPalace pour faciliter retrieval cross-wing
6. **Pas de secrets** : MemPalace stocke verbatim, aucun token/credential ne doit y entrer

## Knowledge Graph temporel

MemPalace inclut un KG temporel (SQLite) qui stocke :
- Entities (Person, Project, Decision, Metric, ...)
- Relationships avec **validity windows** (from, to)

Exemple de fact temporel :
```
("Fabrice", "works_on", "StoreMD", valid_from="2026-02-15", valid_to=NULL)
("Leak Detector", "has_MRR", "420€", valid_from="2026-04-01", valid_to="2026-04-30")
```

Permet de répondre à des questions type : "Qu'est-ce que Fabrice bossait en mars 2026 ?" → historiquement précis.

## Scam alert

Seules sources officielles MemPalace :
- GitHub : `github.com/MemPalace/mempalace`
- PyPI : `mempalace`
- Docs : `mempalaceofficial.com`

Tout autre domaine (mempalace.tech etc.) = impostor, peut distribuer malware.

## Note qualité

MemPalace est récent (créé avril 2026). Les benchmarks et features sont à prendre avec prudence — ne PAS en faire une dépendance critique au sens "si ça crashe, on perd tout". Les wings sont des markdown files, toujours backupables via git.
