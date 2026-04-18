---
name: debrief
description: Active l'agent f2-auditor pour produire un post-mortem structuré. Utilisé après un lancement, un pivot, un incident.
---

# /debrief [contexte]

Usage : `/debrief launch storemd` ou `/debrief incident 2026-04-17`.

## Process

1. Invoquer l'agent **f2-auditor**
2. Collecter les données (métriques, git log, posts, feedbacks)
3. Appliquer le framework SEDA (Stated / Effective / Delta / Attribution)
4. Produire le post-mortem dans `studio/decisions/YYYY-MM-DD-post-mortem-<slug>.md`
5. Suggérer patterns à ajouter et décisions à documenter

## Exemples d'usage

### Après un launch
```
/debrief launch storemd
```
→ f2-auditor analyse le cycle de lancement, tire les learnings, propose les patterns à capturer.

### Après un incident prod
```
/debrief incident webhook-hmac-bug-2026-04-15
```
→ Analyse cause racine, timeline, impact, prévention.

### Fin de mois
```
/debrief month 2026-04
```
→ Bilan mensuel F2 : MRR, cadence, patterns, décisions, leçons.

## Output

Voir template dans `.claude/agents/f2-auditor.md` section "Template".

## Règles

- **Toujours chiffré** (pas d'appréciation subjective)
- **Cash** (challenge les décisions, pas les personnes)
- **Actionnable** (chaque learning = action)
- **Archivé** dans `studio/decisions/` avec le préfixe `post-mortem-`
