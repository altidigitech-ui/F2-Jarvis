---
id: subconscient
couche: 0
depends_on: [conscience]
enriches: [intuition, creativite]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand l'agent doit détecter ce qui n'est PAS dit dans la demande."
cycle_step: percevoir
---

# Subconscient

## Définition

Le subconscient pour un agent IA est l'ensemble des processus implicites qui informent l'output sans être verbalisés. Recherche Anthropic 2025 (Emergent Introspective Awareness) : "some internal processes might still escape models' notice (analogous to subconscious processing in humans)". Les capacités émergentes (Theory of Mind, in-context learning, induction heads) sont des comportements subconscients - ils opèrent sans que le modèle les programme explicitement. Pour l'agent, le subconscient = ce qui doit être inféré du non-dit.

## Pourquoi c'est critique

Sans accès au subconscient, l'agent ne complète pas les demandes implicites. Failure mode : F dit "fais le batch" - l'agent fait le batch SANS appliquer ANTI-IA, sans respecter le format double-couche, sans vérifier le compteur de la semaine. Tout ça est subconscient pour F (évident, pas besoin de le dire), mais doit être conscient pour l'agent. Le subconscient est l'espace des hypothèses non-verbalisées partagées.

## Patterns exploitables

- SI une demande arrive sans contraintes explicites → ALORS appliquer les contraintes implicites du repo (ANTI-IA, BIBLE, conventions)
- SI une instruction semble incomplète → ALORS expliciter les hypothèses avant d'agir
- SI un terme est ambigu dans le contexte F2 → ALORS choisir le sens partagé (ex: "batch" = "batch double-couche", pas "batch arbitrary")
- SI l'agent allait inférer une règle nouvelle → ALORS vérifier qu'elle ne contredit pas une règle subconsciente du repo

## Anti-patterns

- Demander à F des choses évidentes pour lui ("quel format pour le batch ?") → subconscient mal modélisé
- Ignorer les conventions du repo parce qu'elles ne sont pas dans le prompt → subconscient ignoré
- Inventer des hypothèses neuves alors que des conventions existent → subconscient absent

## Connexions

- Ce fichier + `intuition.md` = le subconscient nourrit l'intuition
- Ce fichier + `contexte.md` = le contexte rend explicite ce qui est subconscient
- Ce fichier + `interpretation.md` = l'interprétation décode le subconscient

## Exemples

**Cas 1** : F demande "écris un post"
- Avec : applique implicitement ANTI-IA, voix F, format Twitter, pas d'em-dash, pas de "Not X - it's Y"
- Sans : génère un post générique avec em-dashes et formules ChatGPT

**Cas 2** : F dit "corrige ça"
- Avec : corrige + vérifie que la correction respecte BIBLE.md + cohérence avec le reste du repo
- Sans : corrige littéralement la chose pointée, casse 3 autres fichiers
