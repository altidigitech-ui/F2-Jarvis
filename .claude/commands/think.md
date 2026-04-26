---
name: think
description: >
  Déclenche une analyse profonde via le subagent f2-thinker avec le profil
  cognitif deep. Utiliser pour les décisions stratégiques, diagnostics
  systémiques, résolutions de paradoxe, ou analyses de trade-off complexes.
  Retourne un résumé structuré avec niveau de confiance.
allowed-tools:
  - Read
  - Bash
  - Grep
  - Glob
---

# /think — Analyse profonde

## Usage

`/think <question ou problème à analyser>`

## Protocole

1. **Vérifier le budget cognitif** :
   ```bash
   bash .claude/skills/cognitive-loader/scripts/budget-check.sh
   ```
   Si budget dépassé → proposer un `/cognition reset` avant de continuer.

2. **Déléguer au subagent f2-thinker** :
   Utiliser le subagent `f2-thinker` pour traiter la question.
   Le subagent charge automatiquement le profil `deep` via cognitive-loader
   (skills: [cognitive-loader] dans son frontmatter).

3. **Recevoir le résumé structuré** :
   f2-thinker retourne toujours le format :
   ```
   DIAGNOSTIC — ...
   ANGLE 1 — ...
   ANGLE 2 — ...
   ANGLE 3 — ...
   RISQUES — ...
   RECOMMANDATION — Confiance : XX%
   DOUTE — ...
   ```

4. **Transmettre à l'utilisateur** tel quel, sans reformuler.

## Exemples d'utilisation

```
/think Est-ce qu'on devrait pivoter StoreMD vers un modèle freemium ?
/think Pourquoi nos cold outreach ne convertissent pas — diagnostic systémique
/think Trade-off : ajouter ProfitPilot maintenant vs consolider StoreMD d'abord
/think Analyse du pattern d'échec sur les beta testers S6
```

## Quand utiliser /think

- Décision stratégique avec conséquences long-terme
- Paradoxe ou contradiction détectée dans le repo
- Trade-off complexe sans réponse évidente
- Post-mortem approfondi d'un échec
- Question de F qui commence par "réfléchis", "analyse en profondeur", "je veux un vrai diagnostic"

## Quand NE PAS utiliser /think

- Questions factuelles → répondre directement
- Tâches opérationnelles → `/morning`, `/status`
- Bug fix → coder directement
- Contenu à rédiger → utiliser le skill f2-marketer
- Question rapide → répondre sans subagent

## Règles

- `/think` utilise Sonnet (via f2-thinker model: sonnet)
- Budget étendu : 8 fichiers, 8000 tokens (profil deep)
- Ne pas reformuler ni édulcorer le résumé de f2-thinker
- Si f2-thinker dit "Confiance : 30%" → le transmettre tel quel
- Cette commande est hors validation BIBLE.md §3 (infra AI, pas contenu opérationnel)
