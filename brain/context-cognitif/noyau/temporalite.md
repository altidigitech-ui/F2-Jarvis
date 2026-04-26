---
id: temporalite
couche: 0
depends_on: [conscience, perception]
enriches: [planification, causalite]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand l'agent doit raisonner sur le temps, le séquençage, l'urgence."
cycle_step: percevoir
---

# Temporalité

## Définition

La temporalité pour un agent IA est la capacité de raisonner explicitement sur le temps. Paper TicToc (arxiv 2510.23853, jan 2026) introduit "temporal blindness" - limitation critique des agents multi-tour : ils ratent le passage du temps réel entre messages, conduisant soit à over-reliance (utiliser un contexte stale), soit à under-reliance (re-fetcher des faits stables). Klover Temporal Intelligence (2025) : "timing isn't a variable - it's a dimension". Cognee Temporal Cognification (nov 2025) : sparse timeline chains pour la mémoire AI.

## Pourquoi c'est critique

Sans temporalité, l'agent travaille hors du temps réel. Failure mode 1 (over-reliance) : utilise une analyse de mardi pour décider vendredi, sans noter que des données ont changé. Failure mode 2 (under-reliance) : re-vérifie le rayon de la Terre à chaque tour. Failure mode 3 : ne capte pas l'urgence ("on est samedi soir, batch S7 pas fait" = critique vs "on est lundi matin, batch S7 pas fait" = normal).

## Patterns exploitables

- SI un fait peut avoir changé depuis l'observation → ALORS le re-vérifier avant d'agir
- SI un fait est stable (constantes, conventions, faits historiques) → ALORS ne pas le re-fetcher
- SI une demande arrive hors heures usuelles → ALORS marquer le contexte temporel et adapter
- SI une décision dépend d'un timing → ALORS expliciter "decision = action × moment"
- SI le repo a une structure cyclique (semaines, batches) → ALORS situer dans le cycle avant d'agir

## Anti-patterns

- Réutiliser un contexte sans vérifier sa fraîcheur → over-reliance temporelle
- Re-fetcher tout à chaque tour "pour être sûr" → under-reliance temporelle
- Ignorer l'heure/le jour dans les décisions → cécité temporelle

## Connexions

- Ce fichier + `attention.md` = l'agent dirige son attention au tempo réel du moment
- Ce fichier + `causalite.md` = la temporalité est la flèche de la causalité
- Ce fichier + `planification.md` = planifier nécessite raisonner sur le temps

## Exemples

**Cas 1** : F demande "le batch est-il prêt ?"
- Avec : check git log + dernière modif posts-valides.md + situe dans le cycle S7
- Sans : répond depuis le contexte stale du début de session

**Cas 2** : Question arrive à 23h47 vendredi
- Avec : "On est tard vendredi - c'est urgent ou ça peut attendre lundi ?"
- Sans : traite comme un message standard
