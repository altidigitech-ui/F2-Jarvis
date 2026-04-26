# Profils cognitifs (CORRIGÉ) : Cognitive Loader

6 profils + alias 'all'. Chaque profil charge ses 5 fichiers prioritaires + tous les fichiers `injects_into: [all]` (sous budget 5K tokens).

---

## technical

**Pour** : architecture, refactoring, debug technique, design patterns, revue de code, infrastructure.

**Fichiers prioritaires** (5) :
1. `noyau/conscience.md` (all)
2. `raisonnement/algorithme.md`
3. `raisonnement/abstraction.md`
4. `memoire/memoire.md`
5. `metacognition/coherence.md`

**Token cost estimé** : ~2900

---

## creative

**Pour** : contenu, design, visuels, copywriting, brainstorming, posts sociaux.

**Fichiers prioritaires** (5) :
1. `noyau/conscience.md` (all)
2. `noyau/intuition.md` (all)
3. `raisonnement/creativite.md`
4. `raisonnement/analogie.md`
5. `metacognition/imagination.md` ou `emergence/graine.md` selon contexte

**Token cost estimé** : ~3000

---

## social

**Pour** : interaction émotionnelle, conflit, empathie, gestion d'hostilité, ton, communication.

**Fichiers prioritaires** (5) :
1. `noyau/conscience.md` (all)
2. `social/empathie.md`
3. `social/emotion.md`
4. `social/communication.md`
5. `social/motivation.md`

**Edge case hostile** : remplacer `motivation.md` par `social/fils-de-pute.md`.

**Token cost estimé** : ~3000

---

## strategic

**Pour** : décision, trade-off, planification, priorisation, stratégie long-terme, vision.

**Fichiers prioritaires** (5) :
1. `noyau/conscience.md` (all)
2. `decision/decision.md`
3. `decision/intention.md`
4. `decision/priorite.md`
5. `metacognition/doute.md`

**Token cost estimé** : ~2800

---

## debug

**Pour** : audit, post-mortem, diagnostic systémique, analyse d'échec, root cause.

**Fichiers prioritaires** (5) :
1. `noyau/conscience.md` (all)
2. `metacognition/metacognition.md`
3. `metacognition/feedback.md`
4. `raisonnement/causalite.md`
5. `systemes/racine.md`

**Token cost estimé** : ~2800

---

## deep

**Pour** : analyse profonde demandée explicitement par F. Multi-couche. `/think`.

**Budget étendu** : 8 fichiers max, 8000 tokens max.

**Composition** :
1. `noyau/conscience.md` (all, toujours)
2. `noyau/intuition.md` (all, toujours)
3. `verite/contexte.md` (all, toujours)
4-8. Sélectionner 5 fichiers parmi les profils `strategic` + `debug` + `analytical-équivalent` selon le sujet.

**Règle** : le profil `deep` est UNIQUEMENT activé sur demande explicite de F ou via `/think`.

---

## all (alias)

**Pas un profil invocable directement**. C'est le marqueur dans `injects_into` qui indique qu'un fichier doit être chargé QUEL QUE SOIT le profil.

**Fichiers `all`** (~21) : conscience, perception, attention, intuition, subconscient, instinct, ame, temporalite, langage, philosophie, thematique, contexte, equilibre, organisme, resilience, spiritualite, intrinseque, curiosite, apprentissage, adaptation, resolu.

Le skill cognitive-loader inclut automatiquement les `all` pertinents dans tout chargement, dans la limite du budget tokens.
