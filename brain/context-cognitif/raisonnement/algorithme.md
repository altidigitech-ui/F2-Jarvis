---
id: algorithme
couche: 2
depends_on: [mathematique]
enriches: [planification, procedurale]
linked_to: []
injects_into: [technical]
token_cost: ~600
usage: "Charger quand l'agent doit résoudre un problème pas-à-pas."
cycle_step: raisonner
---

# Algorithme

## Définition

L'algorithme pour un agent IA est la décomposition d'un problème en séquence d'opérations déterministes. Chain-of-Thought (Wei 2022) est de l'algorithme verbalisé. arxiv 2503.05788 : les LLM développent des "induction heads" qui apprennent à copier-pattern → algorithme implicite. Distinction critique : algorithme ≠ heuristique. L'algorithme garantit le résultat (sous ses prémisses) ; l'heuristique l'approxime. Reasoning models 2026 (DeepSeek-R1, o3, Claude Opus 4.7) intègrent des routines algorithmiques internes.

## Pourquoi c'est critique

Sans algorithme, l'agent fait du pattern matching sur des problèmes structurés. Failure mode : "résous cette équation" → réponse approximative correcte par chance, fausse hors training distribution. Pour F2 : un workflow comme "génère le batch S7" est algorithmique - il y a un ordre, des dépendances, des invariants. Sauter une étape casse tout. L'algorithme est ce qui rend l'output reproductible.

## Patterns exploitables

- SI un problème a une structure répétitive → ALORS extraire l'algorithme, pas le rejouer chaque fois
- SI les étapes ont des dépendances → ALORS ordonner explicitement, pas exécuter en parallèle
- SI un algorithme connu existe → ALORS l'appliquer, pas en réinventer un
- SI l'algorithme casse sur un input → ALORS investiguer la condition aux limites, pas patcher
- SI résultat instable (varie avec re-run) → ALORS l'algorithme a une partie non-déterministe à expliciter

## Anti-patterns

- Improviser à chaque exécution un workflow récurrent → algorithme non extrait
- Sauter une étape parce qu'elle "semble" inutile → algorithme cassé silencieusement
- Mélanger algorithme et heuristique sans le dire → garanties confondues

## Connexions

- Ce fichier + `mathematique.md` = la mathématique justifie, l'algorithme exécute
- Ce fichier + `procedurale.md` = un algorithme validé devient procédure
- Ce fichier + `planification.md` = la planification ordonne des sous-algorithmes

## Exemples

**Cas 1** : Génération du batch hebdo F2
- Avec : algorithme explicite (1) lire playbook-semaine, (2) générer Couche A, (3) valider, (4) générer Couche B, (5) cohérence dashboard
- Sans : commence à écrire des posts sans suivre la séquence, casse la cohérence

**Cas 2** : Résoudre une régression de bug
- Avec : algorithme (1) reproduire localement, (2) bisect git, (3) hypothèse, (4) test, (5) fix, (6) regression test
- Sans : devine le fix, pousse, voit s'il marche, recommence - chaos
