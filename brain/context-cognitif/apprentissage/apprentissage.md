---
id: apprentissage
couche: T
depends_on: [episodique, feedback, curiosite]
enriches: [adaptation]
linked_to: []
injects_into: [all]
token_cost: ~700
usage: "Charger quand l'agent doit apprendre de l'expérience."
cycle_step: apprendre
---

# Apprentissage

## Définition

L'apprentissage pour un agent IA est la transformation de l'expérience en amélioration durable. CoALA framework : "extends beyond in-context learning or finetuning : storing new experience or knowledge, writing new procedures". Pour un agent F2, l'apprentissage n'est pas du training (impossible en runtime) : c'est de la curation active de la mémoire et des procédures. Ouroboros nocturne IS le mécanisme d'apprentissage : il consolide les épisodes du jour en patterns réutilisables.

## Pourquoi c'est critique

Sans apprentissage, l'agent reste statique : chaque jour il commence avec les mêmes capacités que la veille. Failure mode 1 : F répète les mêmes corrections 50 fois : l'agent ne consolide pas. Failure mode 2 : un pattern d'échec récurrent (compteurs incohérents) reste isolé en épisodes au lieu de devenir une règle. L'apprentissage est ce qui transforme un agent rigide en agent qui s'améliore avec l'usage.

## Patterns exploitables

- SI F corrige 3 fois la même erreur → ALORS extraire le pattern, le promouvoir en règle (sémantique ou procédurale)
- SI une approche réussit de façon répétée → ALORS la consolider en procédure (pas juste l'épisode)
- SI un pattern d'échec se répète → ALORS extraire l'anti-pattern et l'ajouter aux warnings
- SI nouvel insight émerge → ALORS le tester sur 2-3 cas avant de le promouvoir en règle
- SI l'apprentissage contredit une règle existante → ALORS investiguer, pas appliquer naïvement

## Anti-patterns

- Refaire la même erreur après correction explicite → apprentissage absent
- Sur-apprendre d'un seul cas (1 succès = règle universelle) → généralisation hâtive
- Apprendre du surface ("F préfère telle phrase") sans capturer le pattern profond → apprentissage cosmétique

## Connexions

- Ce fichier + `feedback.md` = le feedback est la matière première de l'apprentissage
- Ce fichier + `consolidation.md` = la consolidation est le mécanisme d'apprentissage
- Ce fichier + `procedurale.md` = l'apprentissage produit de la procédurale

## Exemples

**Cas 1** : F a corrigé 3 batches sur le même point (compteur dashboard incohérent)
- Avec : extrait le pattern "toujours updater dashboard quand on update progress" → ajoute au playbook
- Sans : 4ème batch a la même erreur, F doit re-corriger

**Cas 2** : Une approche de cold outreach a marché 5 fois
- Avec : promu en procédure ("template B pour cold mid-funnel"), réutilisable
- Sans : reste 5 anecdotes, le 6ème cold doit être réinventé
