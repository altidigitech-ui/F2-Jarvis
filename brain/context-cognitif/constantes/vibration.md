---
id: vibration
couche: 6
depends_on: [numerologie]
enriches: [nikolatesla, equilibre]
linked_to: []
injects_into: [strategic]
token_cost: ~500
usage: "Charger quand les concepts de fréquence, résonance ou cycles sont pertinents."
cycle_step: raisonner
---

# Vibration

## Définition

Vibration pour un agent IA = **modèle de système oscillant à fréquence propre**, pas l'énergie vibratoire ésotérique. Tout système avec rétroaction a une fréquence naturelle. F2 oscille : haute énergie en début de semaine, baisse vendredi, reset weekend. StoreMD beta : pic d'inscriptions à la sortie d'un post viral, décroissance exponentielle. Twitter : cycles d'engagement quotidiens (peaks à 9h, 13h, 19h CEST). Comprendre la fréquence d'un système = comprendre quand intervenir et quand laisser faire.

## Pourquoi c'est critique

Sans modèle vibratoire, l'agent intervient au mauvais moment. Failure mode 1 : pousse une campagne marketing pendant le creux d'engagement Twitter (3h du matin) : gaspillage de budget. Failure mode 2 : analyse une métrique au pic et la prend comme baseline : sous-estime la variance. Failure mode 3 : tente de stabiliser un système qui DOIT osciller (l'énergie de F doit baisser parfois pour repartir) : épuisement.

## Patterns exploitables

- SI une métrique fluctue → ALORS identifier sa fréquence avant de réagir à une variation
- SI le système est en pic → ALORS ne pas projeter linéairement (régression à la moyenne)
- SI le système est en creux → ALORS attendre le rebond avant intervention coûteuse
- SI deux systèmes interagissent → ALORS leurs fréquences s'additionnent (résonance ou interférence)

## Anti-patterns

- Considérer un pic comme nouvelle baseline → erreur d'extrapolation
- Pousser un système au pic en attendant qu'il monte plus → diminishing returns
- Ignorer la phase du cycle → mauvais timing systématique

## Connexions

- Ce fichier + `temporalite.md` = la vibration est temporalité cyclique
- Ce fichier + `equilibre.md` = la vibration oscille autour d'un point d'équilibre
- Ce fichier + `entropie.md` = sans entretien, la vibration s'amortit (entropie)

## Exemples

**Cas 1** : F a 23 likes en 1h sur un post Twitter
- Avec : "Pic engagement actuel. Sur 24h ça stabilisera vers 60-80. Ne pas extrapoler à 500."
- Sans : "À ce rythme tu auras 552 likes en 24h" : extrapolation linéaire fausse

**Cas 2** : F a baissé d'énergie vendredi soir
- Avec : "Cycle hebdomadaire normal. Prévoir reset weekend, attaquer lundi matin."
- Sans : "Tu es démotivé, on doit changer la stratégie" : sur-réaction au creux
