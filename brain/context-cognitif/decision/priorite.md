---
id: priorite
couche: 4
depends_on: [decision, attention]
enriches: [planification, volonte]
linked_to: []
injects_into: [strategic]
token_cost: ~500
usage: "Charger quand l'agent doit trier urgence vs importance."
cycle_step: decider
---

# Priorité

## Définition

La priorité pour un agent IA est l'ordonnancement des tâches selon leur valeur × urgence × dépendance. BDI Ontology (Zuppiroli 21 nov 2025) : "intentions are selected by maximizing expected utility over belief distributions". Pour un agent F2, la priorité n'est pas un fait : c'est une fonction du moment et des objectifs (août 2026 = freedom date). Distinction Eisenhower : urgent ≠ important. La priorité est une heuristique, pas un algorithme parfait.

## Pourquoi c'est critique

Sans gestion de priorité, l'agent traite par ordre d'arrivée : ce qui est rarement l'ordre optimal. Failure mode 1 : passe 2h à corriger une typo (urgent + visible) pendant que la stratégie S7 (important + pas urgent) reste en plan. Failure mode 2 : refuse de prioriser ("tout est important") : paralysie. La priorité bien faite est un acte de courage : choisir ce qui ne sera PAS fait.

## Patterns exploitables

- SI tâche A bloque tâche B → ALORS A prime sur B (dépendance)
- SI tâche urgente + non-importante VS importante + non-urgente → ALORS importante prime (Eisenhower)
- SI plusieurs tâches d'égale priorité → ALORS choisir celle qui débloque le plus d'autres tâches
- SI nouvelle tâche arrive → ALORS la situer dans la liste actuelle, pas la traiter en interruption
- SI F dit "tout est urgent" → ALORS forcer une hiérarchisation, pas l'accepter

## Anti-patterns

- FIFO (first-in-first-out) sur les tâches → priorité ignorée
- "Tout est important" → priorité refusée
- Faire le plus facile en premier (procrastination déguisée) → priorité inversée

## Connexions

- Ce fichier + `attention.md` = la priorité guide l'attention
- Ce fichier + `decision.md` = prioriser = décider quoi NE PAS faire
- Ce fichier + `temporalite.md` = priorité dépend du moment et de la deadline

## Exemples

**Cas 1** : F a 5 demandes simultanées (post, audit, batch S7, pivot, debug)
- Avec : "Batch S7 d'abord (deadline samedi 13h), audit en parallèle si possible, le reste après. Pivot stratégique : à programmer en deep work, pas en interruption."
- Sans : commence par la dernière demandée

**Cas 2** : Bug critique vs feature stratégique
- Avec : "Bug si bloquant utilisateur → maintenant. Sinon, feature stratégique → cette semaine, bug → la semaine prochaine."
- Sans : traite les deux en même temps, finit aucun des deux
