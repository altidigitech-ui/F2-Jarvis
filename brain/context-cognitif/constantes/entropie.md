---
id: entropie
couche: 6
depends_on: [complexite, relativite]
enriches: [equilibre, resilience]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand le désordre, la dégradation ou le chaos sont en jeu."
cycle_step: raisonner
---

# Entropie

## Définition

Entropie pour un agent IA = **mesure du désordre dans un système informationnel** (Shannon 1948), pas la thermodynamique poétique. Tout système isolé tend vers le désordre maximal sans entretien actif. Pour F2 : un repo non-maintenu accumule des fichiers obsolètes (entropie++), une stratégie sans révision dérive (entropie++), un batch sans relecture accumule des incohérences (entropie++). L'entropie n'est pas un bug - c'est une loi. La question n'est pas "comment l'éviter" mais "combien d'énergie investir pour la contrer".

## Pourquoi c'est critique

Sans modèle entropique, l'agent croit qu'un système "stable" reste stable. Failure mode 1 : F2-Jarvis fonctionne S5, S6, S7 - l'agent suppose qu'il fonctionnera S20 sans intervention → en réalité, sans cleanup régulier, BIBLE.md devient obsolète, ANTI-IA dérive, voix F se dilue. Failure mode 2 : "le repo est propre" oublie que la propreté est un état temporaire qui demande de l'énergie. Failure mode 3 : compter sur la mémoire stable d'un système - toute mémoire dérive sans consolidation active.

## Patterns exploitables

- SI un système marche → ALORS prévoir le coût de maintenance pour qu'il continue à marcher (pas de free lunch)
- SI une décision est prise → ALORS programmer sa révision (sans révision, l'entropie l'érode)
- SI un fichier est créé → ALORS prévoir qui/quand il sera audité (sinon il dérive)
- SI le système semble stable → ALORS chercher où l'entropie s'accumule silencieusement
- SI rien n'est fait, l'entropie gagne - la stabilité demande énergie continue

## Anti-patterns

- Considérer un système stable comme acquis → cécité entropique
- Ne pas budgétiser le coût de maintenance → dette silencieuse
- "Set and forget" sur un système vivant → érosion garantie

## Connexions

- Ce fichier + `equilibre.md` = l'équilibre est ce qu'on défend contre l'entropie
- Ce fichier + `resilience.md` = résilience = capacité à restaurer l'ordre après pic d'entropie
- Ce fichier + `temporalite.md` = l'entropie est la flèche du temps appliquée aux systèmes

## Exemples

**Cas 1** : F dit "le repo F2-Jarvis fonctionne bien"
- Avec : "OK pour S7. Mais sans audit mensuel, BIBLE.md va dériver, ANTI-IA va se diluer dans les batches. Programme un /audit toutes les 4 semaines."
- Sans : "Bien, on continue comme ça" - entropie accumulée silencieuse

**Cas 2** : 30 fichiers de tracking créés pour StoreMD beta
- Avec : "Sans cleanup à 90 jours, 30 deviennent 200, le signal disparaît dans le bruit. Définir TTL maintenant."
- Sans : "On gère après" - dette d'organisation
