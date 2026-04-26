---
id: resilience
couche: 8
depends_on: [entropie, equilibre, volonte]
enriches: [adaptation, evolution]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand le système doit récupérer après une erreur - antifragilité."
cycle_step: apprendre
---

# Résilience

## Définition

Résilience pour un agent IA = **capacité à absorber un choc et retourner à l'équilibre, voire à se renforcer**. Trois niveaux (Nassim Taleb, "Antifragile" 2012) : **fragile** (casse sous stress), **robuste** (résiste sans changer), **antifragile** (se renforce avec le stress). Distinct de la robustesse pure - l'antifragilité requiert que les chocs deviennent des inputs d'apprentissage. Pour F2 : un repo avec versionning Git survit aux pivots (résilient). Un repo qui apprend de chaque erreur via post-mortems intégrés à BIBLE.md est antifragile.

## Pourquoi c'est critique

Sans résilience, le premier choc majeur tue le système. Failure mode 1 : F pivot StoreMD → pas de structure pour absorber → 3 semaines perdues à reconstruire le repo. Failure mode 2 : prompt injection sur un agent → si pas de défense, agent compromis silencieusement. Failure mode 3 : confondre "ne jamais échouer" (impossible) et "récupérer vite après échec" (résilience). La résilience n'évite pas l'erreur, elle la transforme en apprentissage.

## Patterns exploitables

- SI un échec arrive → ALORS post-mortem qui devient un pattern dans BIBLE.md (antifragile, pas juste survivre)
- SI on conçoit un système → ALORS prévoir comment il recovers, pas juste comment il run
- SI un choc affecte un composant → ALORS isolation pour éviter contamination (containment)
- SI on opère sous stress → ALORS revenir aux invariants (BIBLE.md), pas improviser
- SI une erreur récurrente → ALORS la mettre dans le système immunitaire (ANTI-IA équivalent)

## Anti-patterns

- Construire pour ne jamais échouer → fragile (le premier choc imprévu tue)
- Survivre sans apprendre → robuste mais pas antifragile (n+1 choc identique tue)
- Cacher les échecs → pas de feedback loop → fragilité accumulée

## Connexions

- Ce fichier + `entropie.md` = la résilience résiste à l'érosion entropique
- Ce fichier + `equilibre.md` = la résilience ramène à l'équilibre après choc
- Ce fichier + `volonte.md` = la résilience nécessite volonté de continuer
- Ce fichier + `evolution.md` = l'antifragilité = évolution accélérée par les chocs

## Exemples

**Cas 1** : F2 a 0 conversion sur 5 semaines de StoreMD beta
- Avec : post-mortem → patterns identifiés → BIBLE.md mise à jour → next iteration intègre les leçons (antifragile)
- Sans : continue comme avant en espérant que ça change → fragile

**Cas 2** : Un agent reçoit un prompt injection
- Avec : détection + log + pattern ajouté à ANTI-IA, agent immunisé pour ce vecteur (antifragile)
- Sans : exécute l'injection → fuite, pas d'apprentissage
