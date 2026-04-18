# Mem0 — F2-JARVIS facts extraction layer

> Extrait automatiquement les faits, préférences, relations depuis les conversations et docs.
> Mémoire "de travail" rapide, complémentaire à MemPalace (qui stocke verbatim).

## Rôle

Mem0 extrait et structure. MemPalace archive verbatim. Les deux sont complémentaires.

Exemples de faits stockés :
- `"Fabrice prefers GraphQL over REST for Shopify"`
- `"StoreMD pricing: Solo $49, Duo $99, Studio $199"`
- `"Romain handles LinkedIn FR content"`
- `"F2 MRR April 2026: 420€"`
- `"Launch StoreMD planned week 17"`

## Fichiers

```
mem0/
├── facts.jsonl          # faits extraits (append-only)
├── preferences.jsonl    # préférences users / patterns
├── relations.jsonl      # relations entre entités
└── config.yaml          # config Mem0
```

Les `.jsonl` sont gitignored (runtime), mais le README et la config sont versionnés.

## Installation

```bash
pip install mem0ai
```

Config dans `brain/mem0/config.yaml` :

```yaml
vector_store:
  provider: "chroma"
  config:
    path: "./brain/mem0/chroma"

llm:
  provider: "anthropic"
  config:
    model: "claude-haiku-4-5"  # Haiku suffit pour extraction

embedder:
  provider: "huggingface"
  config:
    model: "BAAI/bge-small-en-v1.5"  # local, 0-cost

custom_fact_extraction_prompt: |
  Extract facts, preferences, and relationships from the conversation.
  Output as structured JSON.
  Ignore: small talk, acknowledgments, meta-commentary.
  Focus on: concrete facts with dates, explicit preferences, 
  role assignments, numerical values.
```

## Usage

### Depuis Python (dans scripts F2-JARVIS)

```python
from mem0 import Memory

m = Memory.from_config_file("brain/mem0/config.yaml")

# Ajouter des faits depuis une conversation
m.add(messages=conversation_messages, user_id="fabrice")

# Rechercher
results = m.search(query="pricing StoreMD", user_id="fabrice")
for r in results:
    print(r["memory"], r["metadata"])

# Lister tous les faits d'un user
all_facts = m.get_all(user_id="fabrice")
```

### Via MCP (depuis Claude Code)

Mem0 a un MCP server optionnel qui expose :
- `mem0_add(messages, user_id)`
- `mem0_search(query, user_id)`
- `mem0_get_all(user_id)`

## Différence avec MemPalace

| Aspect | MemPalace | Mem0 |
|---|---|---|
| Stockage | Verbatim (pas de perte) | Extrait structuré (résume) |
| Retrieval | Semantic search sur textes bruts | Key lookup + semantic sur facts |
| Usage | Retrouver UNE conversation précise | Répondre à "what do we know about X" |
| Taille | Croît vite (tout est stocké) | Compact (seulement les faits) |

## Règles F2

1. **Mem0 extrait, MemPalace archive** : pas de redondance stratégique
2. **Jamais de secrets** dans les faits extraits (Mem0 pas conçu pour ça)
3. **User-id obligatoire** : facts tagués par user (fabrice / romain / f2-jarvis-agent-x)
4. **Validation Fabrice** : avant qu'un fact Mem0 devienne "vérité officielle" dans F2-JARVIS, il passe par Fabrice
5. **Expiration** : certains facts ont une durée de vie (pricing change, roadmap change) — Mem0 ne gère pas ça natively, Fabrice update manuellement quand nécessaire

## Anti-patterns

- **Utiliser Mem0 comme DB de vérité** : c'est une mémoire dérivée, la source reste MemPalace + docs markdown
- **Over-extraction** : ne pas tout extraire, ignorer le small talk
- **Mem0 pour secrets** : interdit, Mem0 n'est pas prévu pour ça
- **Oublier user_id** : facts orphelins inutilisables

## Statut

Mem0 est **optionnel** pour V1 F2-JARVIS. On peut vivre sans au début et s'appuyer uniquement sur MemPalace + Graphify. L'ajouter quand le besoin devient clair (typiquement après 2-3 mois d'usage).
