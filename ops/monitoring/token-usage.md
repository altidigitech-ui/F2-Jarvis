# Token Usage Tracking

## Source de vérité

- **Claude Code** : status line affiche tokens current session
- **Anthropic Console** : https://console.anthropic.com/usage (vue globale)
- **`ops/budget/history.csv`** : log local jour par jour

## Comment tracker

### Par session Claude Code

Claude Code affiche dans le statusLine :
- Tokens in session
- Tokens dans la 5h window
- % of cap Max 5x

### Par jour

Append manuel (ou via script) dans `history.csv` :

```csv
2026-04-18,claude-code,sonnet,120000,15000,0.255,"/morning + f2-architect session"
2026-04-18,ouroboros,haiku,8000,2000,0.009,"nightly loop"
```

### Par mois

Consolidation automatique par `f2-accountant` le 1er du mois suivant :
- Somme par service
- Somme par modèle
- Comparaison aux caps
- Rapport dans `ops/budget/reports/YYYY-MM.md`

## Conversion tokens → EUR

### Tarifs API Anthropic (avril 2026)

| Modèle | Input/MTok | Output/MTok | Cache write TTL 5min | Cache read |
|---|---|---|---|---|
| Opus 4.6 | $15 | $75 | $18.75 | $1.50 |
| Sonnet 4.6 | $3 | $15 | $3.75 | $0.30 |
| Haiku 4.5 | $1 | $5 | $1.25 | $0.10 |

### Sur Max 5x

Tokens inclus dans le plan :
- Approx 88k tokens / 5h window (1x Pro rate)
- Max 5x = 88k × 5 = 440k / 5h window
- Sur 30 jours avec 12-14 windows actifs : ~5-6M tokens / mois

**Tout ce qui dépasse → extra_usage facturé aux tarifs standards ci-dessus.**

## Patterns de consommation typiques F2

### Session Claude Code normale (2-3h)
- Haiku retrieval : 50-100k tokens
- Sonnet coding : 150-300k tokens
- Cache hits : 70-90%
- **Coût incrémental estimé** : 0€ (inclus Max 5x)

### Session Claude Code intensive (6h+)
- Probable dépassement 5h window
- Si extra usage activé : 2-5€ par session au-delà

### Ouroboros cycle nocturne
- ~10k tokens Haiku par cycle
- **Coût incrémental** : ~0.01€ par cycle = 0.30€/mois

### Graphify full rebuild
- ~500k-2M tokens Haiku (selon corpus)
- **Coût** : 0.50-2€ par full rebuild (à faire rarement)

## Alertes automatiques

Voir `ops/budget/alerts.md`.

## Optimisations appliquées F2-JARVIS

1. **Model tiering** : Haiku par défaut (voir `model-tier-rules.yaml`)
2. **Prompt caching** : TTL 1h pour contenus stables (voir `cache-policy.md`)
3. **Graphify SHA256 cache** : évite re-indexation des fichiers non changés
4. **MemPalace local** : embeddings 0-cost
5. **Subagents pour exploration** : isolation contexte = pas de pollution session principale
6. **Context compaction** : forced at 85% pour éviter dégradation performance

## Check-list économie

Si usage mensuel > 80% du cap incrémental :
- [ ] Vérifier les services qui consomment (via `/budget --by-service`)
- [ ] Vérifier les modèles (trop de Sonnet là où Haiku suffirait ?)
- [ ] Vérifier cache hit rate (< 70% = problème)
- [ ] Considérer désactiver Ouroboros temporairement
- [ ] Considérer skipper les re-indexations Graphify non nécessaires
