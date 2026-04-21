# /brain — La Mémoire de F2-JARVIS

> Trois composants qui forment la mémoire persistante de F2-JARVIS.

## Structure

```
brain/
├── ouroboros/       # Conscience de fond (bridée)
├── mempalace/       # Mémoire verbatim structurée (wings/rooms/drawers)
└── mem0/            # Faits extraits, préférences, relations
```

## Rôles distincts

### Ouroboros — La conscience
Tourne en boucle (1 cycle/nuit). Lit le repo. Détecte incohérences, risques, opportunités. Écrit des propositions et un diary. **Ne touche à rien automatiquement.** Fabrice review via `/review-proposals`.

Voir `ouroboros/identity.md` et `ouroboros/bible.md`.

### MemPalace — La mémoire verbatim
Stocke tes conversations Claude, tes docs, tes décisions **verbatim** (pas de résumé qui déforme). Organisé spatialement : Wings (entités) → Rooms (sous-topics) → Drawers (contenu brut).

Retrieval par semantic search local (ChromaDB). Zéro appel API par query. 96.6% R@5 sur LongMemEval.

Source : `github.com/MemPalace/mempalace` (MIT).

### Mem0 — Les faits structurés
Extrait les faits, préférences, relations de tes conversations et docs. Forme la "mémoire de travail" queryable rapidement.

Exemples de facts stockés :
- "CAC StoreMD = 32€ (avril 2026)"
- "Fabrice préfère GraphQL sur Shopify"
- "Romain gère LinkedIn FR"
- "StoreMD launch prévu semaine 17"

## Différence entre les trois

| Dimension | Ouroboros | MemPalace | Mem0 |
|---|---|---|---|
| Rôle | Conscience active | Archive verbatim | Faits extraits |
| Active / passif | Active (loop) | Passif (stocke et récupère) | Passif |
| Stockage | Proposals + diary | Wings/Rooms/Drawers | JSONL facts |
| Retrieval | N/A (écrit) | Semantic search | Key lookup + tags |
| Coût API | Haiku /nuit | 0 (local) | 0 (local) |

## Complémentarité

Exemple concret :
1. Tu as une conversation avec Claude sur le pricing StoreMD
2. **MemPalace** archive la conversation verbatim dans `wings/storemd/drawers/`
3. **Mem0** extrait les facts : `{"pricing_storemd": {"solo": 49, "duo": 99, "studio": 199, "confirmed_date": "2026-04-16"}}`
4. **Ouroboros** peut lire les deux la nuit suivante et détecter : "Le fact pricing contredit le post marketing draft de Romain" → proposition

## Installation (à faire en post-setup)

```bash
# MemPalace (Python)
pip install mempalace
mempalace init  # crée brain/mempalace/ avec structure standard

# Mem0 (Python)
pip install mem0ai
# Config dans brain/mem0/config.yaml
```

## Règles

- **brain/ est privé** — jamais exposé publiquement
- **MemPalace stocke verbatim** — ne pas résumer ou paraphraser à l'ingestion
- **Mem0 extrait** — les facts sont dérivés, la source reste MemPalace
- **Ouroboros écrit uniquement dans son dossier** — pas dans mempalace/ ou mem0/
