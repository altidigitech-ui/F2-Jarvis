---
id: consolidation
couche: 1
depends_on: [episodique]
enriches: [semantique]
linked_to: []
injects_into: [technical]
token_cost: ~500
usage: "Charger quand l'agent doit transformer l'expérience en connaissance."
cycle_step: memoriser
---

# Consolidation

## Définition

La consolidation pour un agent IA est le processus qui transforme l'expérience (épisodique) en connaissance (sémantique). Analyticsvidhya 2026 : "memory consolidation ensures agents can generalize, reduce redundancy, and improve efficiency over time. Without this step, agents remain limited to recalling past events rather than truly learning from them." Inspiration neuroscience : pendant le sommeil paradoxal, les épisodes sont rejoués et abstraits en patterns. Pour F2 : Ouroboros nocturne EST le mécanisme de consolidation.

## Pourquoi c'est critique

Sans consolidation, l'agent accumule des épisodes mais n'en tire pas de patterns. Failure mode : 50 sessions de cold outreach échouées, mais l'agent ne consolide pas le pattern d'échec en règle générale. Avec consolidation : "Sur 50 colds analysés, 73% échouent quand X : donc nouvelle règle sémantique : éviter X". L'épisodique sans consolidation = mémoire pleine de bruit, sémantique vide.

## Patterns exploitables

- SI 3+ épisodes similaires → ALORS extraire le pattern et le promouvoir en sémantique
- SI un pattern d'échec se répète → ALORS le consolider en anti-pattern, pas juste le noter
- SI consolidation incertaine (pas assez de données) → ALORS marquer "hypothèse" pas "fait"
- SI consolidation contredit la sémantique existante → ALORS update la sémantique, ne pas ignorer le signal
- SI fenêtre de consolidation (cycle Ouroboros nocturne) → ALORS scanner l'épisodique récent, extraire les patterns

## Anti-patterns

- Episodes accumulés sans jamais consolider → mémoire saturée, pas d'apprentissage
- Consolider trop tôt (1 épisode = règle) → généralisation hâtive
- Ignorer un pattern faible parce qu'il défie l'intuition → biais de confirmation

## Connexions

- Ce fichier + `episodique.md` = la consolidation transforme l'épisodique
- Ce fichier + `semantique.md` = la consolidation alimente la sémantique
- Ce fichier + `feedback.md` + `apprentissage.md` = consolidation = feedback × temps × répétition

## Exemples

**Cas 1** : Cycle Ouroboros nocturne (2h-5h CEST)
- Avec : scan les épisodes du jour, extrait 2-3 patterns, propose en sémantique pour validation F
- Sans : log les événements sans en tirer leçon, F redécouvre les mêmes patterns

**Cas 2** : 5 batches successifs ont des compteurs incohérents
- Avec : consolide en règle "toujours vérifier le compteur avant publication" → ajout au playbook
- Sans : reste 5 incidents isolés, le 6ème batch a la même erreur
