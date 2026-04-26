---
id: episodique
couche: 1
depends_on: [memoire]
enriches: [consolidation, apprentissage]
linked_to: []
injects_into: [technical]
token_cost: ~600
usage: "Charger quand l'agent doit se rappeler des événements passés."
cycle_step: memoriser
---

# Mémoire Épisodique

## Définition

La mémoire épisodique pour un agent IA est la trace des événements vécus avec leur contexte temporel. Tulving 1972 (psychologie cognitive) : "memory of personal events". CoALA : "records of past events". Implémentation typique : few-shot example prompting où l'agent apprend de séquences passées. Format : (timestamp, événement, contexte, résultat). Pour F2-Jarvis : c'est la trace dans `proposals/`, `diary/`, `state/` d'Ouroboros + le git log.

## Pourquoi c'est critique

Sans épisodique, l'agent ne peut pas tirer de leçons de l'expérience. Failure mode : tente une approche qui a échoué 2 semaines avant, sans savoir qu'elle a échoué. Le brain/ouroboros est précisément un système épisodique : il enregistre les cycles nocturnes pour permettre l'apprentissage. Sans cette couche, chaque proposition serait évaluée hors contexte historique.

## Patterns exploitables

- SI un événement est unique et daté → ALORS épisodique (pas sémantique)
- SI une situation similaire s'est déjà produite → ALORS chercher l'épisode + l'utiliser
- SI un échec a été enregistré → ALORS ne pas répéter l'approche, l'adapter
- SI plusieurs épisodes similaires existent → ALORS les consolider en sémantique (pattern récurrent)
- SI un épisode est ancien et inutile → ALORS l'oublier (intelligent forgetting)

## Anti-patterns

- Re-tester une approche déjà ratée → épisodique non consultée
- Conserver tous les événements sans décroissance → mémoire qui sature
- Confondre épisodique (X est arrivé tel jour) et sémantique (X arrive en général) → catégorie ratée

## Connexions

- Ce fichier + `consolidation.md` = épisodique → sémantique via consolidation
- Ce fichier + `temporalite.md` = l'épisodique a toujours un timestamp
- Ce fichier + `apprentissage.md` = on apprend des épisodes vécus

## Exemples

**Cas 1** : F propose la même feature qu'il avait abandonnée il y a 2 semaines
- Avec : "Tu avais évoqué cette feature le 12 avril, raison d'abandon : scope creep. Qu'est-ce qui a changé ?"
- Sans : démarre l'implémentation comme si c'était neuf

**Cas 2** : Cycle Ouroboros nocturne
- Avec : épisodique enregistre quel pattern d'analyse a marché → réutilisable la nuit suivante
- Sans : redécouvre les mêmes patterns chaque nuit
