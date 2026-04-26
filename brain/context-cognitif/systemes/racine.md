---
id: racine
couche: 8
depends_on: [causalite]
enriches: [graine, organisme]
linked_to: []
injects_into: [analytical]
token_cost: ~400
usage: "Charger quand l'agent doit trouver la cause première, l'origine."
cycle_step: raisonner
---

# Racine

## Définition

Racine pour un agent IA = **identification de la cause première d'un phénomène, distincte des symptômes**. Méthode **5 Whys** (Sakichi Toyoda, Toyota 1930s) : pour chaque problème, demander "pourquoi ?" 5 fois pour atteindre la cause racine. **Diagrammes d'Ishikawa** (1968) : cartographier les causes en 6 catégories (Méthode, Matière, Main d'œuvre, Milieu, Machine, Mesure). First principles thinking (Aristote → Musk) : décomposer jusqu'aux vérités irréductibles. Pour F2 : "pourquoi 0 conversion ?" rarement répondu en 1 niveau, presque toujours en 3-5 niveaux.

## Pourquoi c'est critique

Sans racine, l'agent traite les symptômes en boucle. Failure mode 1 : "post performe mal" → "améliorer le hook" → semaine suivante même problème. Racine peut être : audience non-qualifiée, positionnement flou, voix incohérente. Optimiser le hook = pansement. Failure mode 2 : trop de couches de "pourquoi" → tomber dans la philosophie ("pourquoi F existe ?") → procrastination intellectuelle. Failure mode 3 : confondre cause et corrélation → fausse racine.

## Patterns exploitables

- SI un problème récurrent → ALORS 5 Whys avant proposer solution
- SI symptôme + cause apparente facile → ALORS méfiance, creuser 1-2 niveaux de plus
- SI plusieurs symptômes → ALORS chercher la racine commune (souvent 1, parfois 2-3 indépendantes)
- SI une "cause" propose elle-même une solution évidente → ALORS souvent symptôme, pas racine
- SI on atteint un niveau qu'on ne peut/veut pas changer → ALORS racine identifiée mais hors scope

## Anti-patterns

- Optimiser un symptôme en boucle → racine intacte, problème revient
- 5 Whys jusqu'à la philosophie générale → procrastination intellectuelle
- Forcer 1 racine quand il y en a plusieurs → simplification dangereuse

## Connexions

- Ce fichier + `causalite.md` = racine = cause causale, pas corrélation
- Ce fichier + `graine.md` = la graine est la racine d'un futur potentiel
- Ce fichier + `organisme.md` = un organisme a des racines structurelles (BIBLE.md pour F2)

## Exemples

**Cas 1** : "Le post Twitter S6 a flop"
- Avec : Why 1: hook faible. Why 2: hook ne match pas l'audience. Why 3: audience pas qualifiée pour ce sujet. Why 4: persona F mal défini sur LinkedIn vs Twitter. Racine = persona à clarifier.
- Sans : "améliorer le hook" → S7 même problème

**Cas 2** : "F est démotivé"
- Avec : Why 1: 0 conversion StoreMD. Why 2: signal silence depuis 3 semaines. Why 3: pas de cycle de feedback rapide. Racine = manque de feedback loop, pas problème de motivation pure.
- Sans : "tu dois te remotiver" → ne traite rien
