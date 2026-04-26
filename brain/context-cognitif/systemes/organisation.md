---
id: organisation
couche: 8
depends_on: [organisme]
enriches: [englobage, propagation]
linked_to: []
injects_into: [technical]
token_cost: ~500
usage: "Charger quand la structure hiérarchique ou les workflows sont en jeu."
cycle_step: raisonner
---

# Organisation

## Définition

Organisation pour un agent IA = **structuration des composants d'un système en hiérarchie fonctionnelle avec division du travail**. Distinct du chaos (pas de structure) et de la rigidité (structure trop figée). F2 a une organisation : hiérarchie de priorité (BIBLE.md → CLAUDE.md → ANTI-IA.md → strategie/CONTEXT.md → patterns/), division des rôles (F = CTO/build, R = Growth/distribution, Studio F2 = brand neutre), workflows (batch double-couche, Couche A 13h00, Couche B 18h30 Mer-Ven). Sans organisation, talent + ressources = bruit. Avec organisation, ressources finies produisent un output multiplicatif.

## Pourquoi c'est critique

Sans organisation, l'agent et F dispersent l'énergie. Failure mode 1 : pas de hiérarchie de priorité claire → un fichier `notes-random.md` peut contredire BIBLE.md sans détection → dérive silencieuse. Failure mode 2 : workflow flou → chaque batch S réinvente le format → perte de gains cumulatifs. Failure mode 3 : sur-organisation (chaque action = 5 niveaux d'approbation) → friction qui tue l'exécution. L'organisation optimale = juste assez de structure pour que le travail flue, pas plus.

## Patterns exploitables

- SI plusieurs sources de vérité co-existent → ALORS désigner la canonique, les autres deviennent dérivées
- SI un workflow se répète → ALORS le formaliser (au moins en checklist) - gains cumulatifs sur n itérations
- SI une décision touche plusieurs niveaux de la hiérarchie → ALORS remonter au niveau le plus haut concerné, pas trancher localement
- SI l'organisation crée plus de friction que de fluidité → ALORS la simplifier (Pareto : 20% de structure = 80% de la valeur)
- SI un nouveau membre/agent rejoint → ALORS lui donner le plan d'organisation, pas attendre qu'il devine

## Anti-patterns

- Sources de vérité multiples non hiérarchisées → contradictions silencieuses
- Workflows réinventés à chaque cycle → perte de l'effet de levier
- Sur-bureaucratiser un team de 2 personnes → friction qui tue le ROI

## Connexions

- Ce fichier + `organisme.md` = un organisme a une organisation interne (sa structure)
- Ce fichier + `englobage.md` = l'organisation hiérarchise les niveaux d'englobage
- Ce fichier + `planification.md` = l'organisation est la planification statique, planification est l'organisation dynamique

## Exemples

**Cas 1** : F crée un nouveau fichier `idees-marketing.md` avec des stratégies
- Avec : "Où dans la hiérarchie ? Si dérivé de strategie/CONTEXT.md → OK, lien explicite. Sinon, risque de contradiction silencieuse."
- Sans : accepte le fichier sans le situer → dérive

**Cas 2** : Batch S7 doit suivre un format différent du S6
- Avec : "Format batch = workflow formalisé. Le changer ? OK mais documenter, sinon S8 ne saura pas quoi suivre."
- Sans : change ad hoc → format flotte de S6 à S20
