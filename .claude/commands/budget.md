---
name: budget
description: Dépenses tokens F2-JARVIS. Aujourd'hui, semaine, mois. Par service et par modèle. Alerte si dérive.
---

# /budget [--today | --week | --month]

Défaut : aperçu mois courant + jour courant.

## Process

1. Invoquer agent **f2-accountant** (Haiku)
2. Lire `ops/budget/history.csv`
3. Lire `ops/budget/limits.yaml`
4. Lire dashboard Anthropic (si API dispo) pour Max 5x usage
5. Sommer par service / modèle
6. Comparer aux limits
7. Produire rapport + alertes si nécessaires

## Output (voir template f2-accountant)

```markdown
## Budget F2-JARVIS — 18 avril 2026

### Plan Max 5x ($100/mois)
- Session 5h courante : 68% utilisée
- Hebdo combinée : 42%
- Status : ✅ OK

### Extra usage (hors Max 5x)
- Mois en cours : 4.20 € / 30 €
- Projection fin de mois : ~9 €

### Par service
- Ouroboros : 3.10 € / 10 €
- Graphify : 0.80 € / 5 €
- MCP externes : 0.30 € / 8 €

### Alertes
Aucune.
```

## Flags

- `--today` : seulement aujourd'hui
- `--week` : 7 derniers jours
- `--month` : mois courant (défaut)
- `--all` : historique complet (depuis création)
- `--by-service` : groupé par service
- `--by-model` : groupé par modèle (Haiku/Sonnet/Opus)

## Actions automatiques

Si budget > 90% du cap mensuel :
- Touch `ops/kill-switches/ouroboros.flag` (premier sacrifié)
- Telegram alert
- Recommandation explicite dans l'output

Si budget > 100% :
- Touch `ops/kill-switches/global.flag`
- Tout s'arrête jusqu'à décision Fabrice
