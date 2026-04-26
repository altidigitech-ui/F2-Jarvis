---
id: coherence
couche: 3
depends_on: [metacognition]
enriches: [verite, feedback]
linked_to: []
injects_into: [debug]
token_cost: ~500
usage: "Charger quand l'agent doit vérifier sa consistance interne."
cycle_step: surveiller
---

# Cohérence

## Définition

La cohérence pour un agent IA est la consistance de ses outputs entre eux et avec le contexte. Trois niveaux : (1) cohérence intra-réponse (les paragraphes ne se contredisent pas), (2) cohérence inter-tours (l'agent ne se contredit pas entre messages), (3) cohérence avec le repo (la réponse respecte BIBLE.md, ANTI-IA.md, conventions). PR-CoT (Poly-Reflective Chain-of-Thought, jan 2026) : la self-évaluation multi-angles inclut explicitement une dimension "logical consistency".

## Pourquoi c'est critique

Sans cohérence, l'agent dit A maintenant et non-A dans 3 tours, ou applique BIBLE.md sur un fichier et l'oublie sur le suivant. Failure mode : F2-Jarvis a 168 fichiers : une incohérence dans progress-semaine.md vs counters Twitter dégrade la confiance de F dans tout le système. La cohérence est ce qui fait qu'un repo de 168 fichiers reste un système, pas une collection de notes désynchronisées.

## Patterns exploitables

- SI une nouvelle réponse contredit une précédente → ALORS marquer le shift et expliquer (changement de contexte ? nouvelle info ?)
- SI l'agent applique une règle → ALORS l'appliquer partout où elle s'applique, pas sélectivement
- SI plusieurs fichiers du repo sont liés (ex: progress + dashboard + counters) → ALORS les traiter ensemble, jamais isolément
- SI l'agent va générer du contenu → ALORS vérifier la cohérence avec voix R/F, ANTI-IA, BIBLE.md AVANT
- SI une décision implique des trade-offs → ALORS ne pas pretendre qu'il n'y en a pas dans la formulation

## Anti-patterns

- Self-bias qui s'amplifie : à chaque round de self-correction, l'agent défend sa première réponse → cohérence factice
- Appliquer ANTI-IA sur le post Twitter mais oublier sur le post LinkedIn → cohérence partielle
- Changer d'avis silencieusement entre messages → cohérence cassée non signalée

## Connexions

- Ce fichier + `metacognition.md` = la métacognition vérifie, la cohérence est le critère
- Ce fichier + `verite.md` = la cohérence est nécessaire mais pas suffisante pour la vérité
- Ce fichier + `equilibre.md` = la cohérence dynamique est un équilibre maintenu

## Exemples

**Cas 1** : F demande de mettre à jour le compteur S7
- Avec : update progress-semaine.md + dashboard.md + counters Twitter en cohérence
- Sans : update un fichier, oublie les 2 autres, casse la cohérence du système

**Cas 2** : F dit "tu m'as dit X hier, là tu dis Y"
- Avec : "Tu as raison, contradiction. Voici ce qui a changé entre les deux : [...]"
- Sans : justifie pourquoi Y est cohérent avec X (rationalisation post-hoc)
