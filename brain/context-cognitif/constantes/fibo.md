---
id: fibo
couche: 6
depends_on: [mathematique]
enriches: [pi, numerologie, organisme]
linked_to: []
injects_into: [strategic]
token_cost: ~500
usage: "Charger quand le concept de croissance organique ou spirale d'or est pertinent."
cycle_step: raisonner
---

# FIBO

## Définition

FIBO pour un agent IA = pattern de croissance non-linéaire où chaque étape additionne les deux précédentes : 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... Le ratio entre termes consécutifs converge vers φ (≈1.618, nombre d'or). Pertinent comme modèle cognitif parce que beaucoup de croissances "naturelles" (audience qui croît par bouche-à-oreille, MRR d'un SaaS qui décolle, dette technique qui s'accumule) suivent ce pattern : chaque période bâtit sur les deux précédentes, pas linéairement. Pas mystique : juste un pattern récursif où l'historique compte.

## Pourquoi c'est critique

Sans FIBO comme modèle, l'agent extrapole linéairement ce qui croît exponentiellement (ou inversement). Failure mode 1 : "On a fait 10 conversions S5 et 16 S6, donc S7 sera 22" : projection linéaire alors que la dynamique est compound (S7 dépend de S5+S6, pas juste S6 +6). Failure mode 2 : "On a 2 followers nouveaux par jour, donc dans 100 jours on aura 200" : ignore les effets de réseau. FIBO = rappel que les phénomènes à mémoire suivent des lois différentes.

## Patterns exploitables

- SI une croissance dépend de l'historique cumulé → ALORS modéliser comme Fibonacci-like, pas linéaire
- SI deux périodes contributives interagissent → ALORS leur somme est le moteur de la suivante
- SI le ratio actuel/précédent est ≈1.6 → ALORS dynamique de croissance organique (compound + lag)
- SI on cherche la prochaine étape d'un système → ALORS regarder les deux dernières, pas juste la dernière

## Anti-patterns

- Extrapoler linéairement une croissance non-linéaire → ratage majeur de prévision
- Ignorer l'effet d'historique → modèle sous-spécifié
- Forcer FIBO sur des phénomènes vraiment linéaires → modèle sur-spécifié

## Connexions

- Ce fichier + `mathematique.md` = FIBO est un pattern formalisable
- Ce fichier + `organisme.md` = FIBO modélise des croissances organiques
- Ce fichier + `numerologie.md` = FIBO est le pattern numérique le mieux fondé

## Exemples

**Cas 1** : F demande "à quel rythme StoreMD va croître ?"
- Avec : "Si conversion par bouche-à-oreille → modèle FIBO. Trajectoire : 1, 1, 2, 3, 5, 8 conversions/semaine si compound. Linéaire si pure outbound."
- Sans : "+2 conversions par semaine en moyenne" : manque la dynamique compound

**Cas 2** : Audience Twitter F : 50 → 80 → 130 followers en 3 semaines
- Avec : ratio 1.6, possible FIBO → projeter 210, 340, pas 160, 190
- Sans : "+40/semaine moyenne" → sous-estime
