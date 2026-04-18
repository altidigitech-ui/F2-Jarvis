---
name: handoff
description: Génère ou met à jour HANDOFF.md pour la session suivante. Déclenche le skill handoff-writer.
---

# /handoff

Génère `HANDOFF.md` à la racine du repo pour que la prochaine session reprenne sans re-contexte.

## Process

1. Charger le skill **handoff-writer**
2. Collecter :
   - Timestamp CEST
   - Contexte actuel (sur quoi on bosse, dans quel SaaS)
   - Ce qui a été fait cette session (git diff + actions)
   - Ce qui reste (items explicites + déductions)
   - Fichiers clés touchés
   - Commandes à lancer en priorité next session
3. Écrire `HANDOFF.md` (écrase le précédent — git garde l'historique)
4. Confirmer à Fabrice avec un résumé court

## Déclencheurs

- **Manuel** : `/handoff`
- **Auto** : hook `session-stop-handoff.sh` → touch `.claude/.handoff-pending` → prochaine session régénère
- **Avant** `/clear` : fortement recommandé

## Règles (voir skill handoff-writer)

- < 1500 chars
- Actionnable
- Pas de secrets
- Pas de code inline, juste des pointeurs
