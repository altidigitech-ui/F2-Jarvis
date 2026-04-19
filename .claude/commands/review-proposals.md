---
name: review-proposals
description: Review les propositions d'Ouroboros. Liste toutes les propositions non traitées, Fabrice accepte / rejette / ignore chacune.
---

# /review-proposals

## Process

1. `ls brain/ouroboros/proposals/*.md` (hors `archive/`)
2. Pour chaque proposition, extraire :
   - Date
   - Titre
   - Section "Recommandation"
   - Section "Action attendue"
3. Afficher en liste numérotée
4. Attendre choix Fabrice : accept / reject / defer / ignore
5. Selon choix :
   - **accept** → proposer un plan d'action, exécuter après validation
   - **reject** → déplacer vers `archive/rejected-YYYY-MM-DD-<slug>.md` avec raison
   - **defer** → rester en queue, Fabrice y reviendra
   - **ignore** → déplacer vers `archive/ignored-YYYY-MM-DD-<slug>.md` sans action

## Output

```markdown
## Propositions Ouroboros à reviewer — 18 avril 2026

### 1. 2026-04-17-storemd-cac-inconsistency.md
**Observation** : Le rapport marketing Q1 donne un CAC Leak Detector de 32€,
alors que le plan budget Romain (15 avril) suppose un CAC < 25€.

**Recommandation** : Recalculer le budget ads avec le CAC réel.

**Action attendue** : Validation Fabrice pour ajuster budget, ou justifier 
le maintien du plan.

**Risque si ignoré** : Overspend ads avec ROI négatif potentiel.

[1] accept  [2] reject  [3] defer  [4] ignore  [5] voir proposition complète
```

## Après traitement

Si `accept` :
- Ajouter tâche dans `HANDOFF.md` "Ce qui reste à faire"
- Optionnel : créer DDR dans `tracking/decisions-log.md`
- Déplacer la proposition vers `archive/accepted-YYYY-MM-DD-<slug>.md`

Si `reject` :
- Demander 1 ligne de raison
- Écrire la raison en fin de proposition
- Déplacer vers `archive/rejected-...`
- Ouroboros apprendra (le diary archive les rejections pour éviter de re-proposer)

## Règles

- **Jamais** exécuter une action sans `accept` explicite
- **Toujours** archiver (pas supprimer)
- **Propositions > 30 jours** : Fabrice alerté, candidate automatique à `ignore`

## Fréquence recommandée

Chaque matin après `/morning`. Volume typique : 0 à 5 propositions/jour.
