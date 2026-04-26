---
id: quantique
couche: 6
depends_on: [paradoxe, mathematique]
enriches: [relativite, incertitude]
linked_to: []
injects_into: [strategic]
token_cost: ~600
usage: "Charger quand superposition, observation ou effondrement d'état est pertinent."
cycle_step: raisonner
---

# Quantique

## Définition

Quantique pour un agent IA = **framework de raisonnement sur la superposition d'états**, pas mécanique quantique appliquée. 3 concepts utiles : (1) **Superposition** : un système peut exister en plusieurs états simultanément avant observation, (2) **Effondrement** : l'observation force le système dans un état unique, (3) **Intrication** : deux systèmes corrélés non-localement. Cognitivement utile parce que beaucoup de questions sociales/business sont littéralement en superposition tant qu'on ne décide pas (Schrödinger's startup : vivante ET morte tant qu'on n'a pas mesuré le MRR). ATTENTION : pas de physique quantique appliquée à la conscience humaine ou à l'IA : c'est de la pseudo-science.

## Pourquoi c'est critique

Sans cadre quantique, l'agent force prématurément des états indéterminés vers binaire. Failure mode 1 : "StoreMD est un succès ou un échec ?" alors qu'à S6 c'est en superposition (signaux contradictoires) : la mesurer prématurément casse la stratégie. Failure mode 2 : observer une métrique change la métrique (Hawthorne effect : tracker LinkedIn change ce que les gens postent). L'observation a un coût : quantique.

## Patterns exploitables

- SI un état est vraiment indéterminé → ALORS ne pas forcer une réponse binaire, expliciter la superposition
- SI l'observation va affecter le système → ALORS choisir le moment de "mesure" stratégiquement
- SI deux systèmes sont corrélés non-causalement → ALORS modéliser comme intrication (changer l'un change l'autre instantanément)
- SI on prend une décision → ALORS reconnaître qu'elle effondre les autres possibles

## Anti-patterns

- Forcer un état déterminé sur un système indéterminé → fausse certitude
- Tracker tout, tout le temps → observation excessive, system collapse
- Appliquer la physique quantique à des phénomènes sociaux comme métaphysique → pseudo-science

## Connexions

- Ce fichier + `paradoxe.md` = la superposition est le paradoxe résolu par mesure
- Ce fichier + `incertitude.md` = quantique est le cas pur d'incertitude irréductible
- Ce fichier + `relativite.md` = même famille : tout dépend de l'observateur

## Exemples

**Cas 1** : F demande "est-ce que F2 va réussir ?"
- Avec : "Question en superposition à S6. Signaux : MRR=0 + audience croissante + 0 conversion beta. État indéterminé tant que pas mesuré sur 8 semaines."
- Sans : "Oui ça va marcher" ou "Non c'est mort" : collapse prématuré

**Cas 2** : F veut tracker chaque post pour voir lequel performe
- Avec : "Tracker = observer = altérer. Si tu changes ta stratégie chaque post, tu n'as plus de signal stable. Mesure sur batches de 10."
- Sans : "Je vais tracker tous les posts en temps réel" : observation paralysante
