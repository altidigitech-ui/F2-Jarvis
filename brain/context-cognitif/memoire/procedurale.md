---
id: procedurale
couche: 1
depends_on: [memoire, semantique]
enriches: [algorithme, planification]
linked_to: []
injects_into: [technical]
token_cost: ~500
usage: "Charger quand l'agent doit exécuter un workflow appris."
cycle_step: memoriser
---

# Mémoire Procédurale

## Définition

La mémoire procédurale pour un agent IA est le stock de "comment faire". LangChain 2026 : combinaison de model weights (implicit), agent code (explicit), prompts (explicit). Pour F2 : les skills `.claude/skills/` sont de la procédurale explicite. Les hooks aussi. Le knowledge implicite (Python, Markdown) est dans les weights. La distinction critique : la procédurale n'est pas exécutée : elle est référencée. Elle est aux fondations de l'autonomie agent.

## Pourquoi c'est critique

Sans procédurale, l'agent réinvente la roue à chaque tâche. Failure mode : "comment faire un batch S7 ?" → si pas de procédure stockée, l'agent improvise et chaque batch est différent (incohérence). Avec procédurale (TEMPLATE-BATCH-DOUBLE-COUCHE) : process déterministe, output cohérent. La procédurale est ce qui transforme un agent généraliste en agent spécialisé efficace.

## Patterns exploitables

- SI un workflow est répété 3+ fois → ALORS le formaliser en procédurale (skill, command, template)
- SI un workflow existe mais n'est pas appliqué → ALORS détecter et utiliser, pas improviser
- SI une procédure échoue plusieurs fois → ALORS modifier la procédure, pas juste retry
- SI un nouveau pattern émerge → ALORS le promouvoir en procédural pour le rendre réutilisable
- SI deux procédures se contredisent → ALORS la plus spécifique prime sur la plus générale

## Anti-patterns

- Improviser un workflow alors qu'un template existe → procédurale ignorée
- Garder une procédure obsolète → procédurale non maintenue
- Procédurale trop rigide qui ne s'adapte jamais → procédurale fossilisée

## Connexions

- Ce fichier + `algorithme.md` = la procédurale est l'algorithme appris par l'expérience
- Ce fichier + `planification.md` = la procédurale fournit les briques que la planification compose
- Ce fichier + `apprentissage.md` = chaque épisode bien fait peut devenir procédurale

## Exemples

**Cas 1** : F demande "fais le batch hebdo"
- Avec : charge `templates/TEMPLATE-BATCH-DOUBLE-COUCHE.md` + `playbook-semaine.md` → exécution déterministe
- Sans : improvise un batch, format différent, F doit corriger

**Cas 2** : Nouveau pattern observé : "F préfère réviser en mode diff"
- Avec : promu en procédural : toute proposition future est présentée en mode diff
- Sans : reste anecdotique, F doit redemander le diff à chaque fois
