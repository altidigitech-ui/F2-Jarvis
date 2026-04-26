---
id: equilibre
couche: 6
depends_on: [entropie, organisme]
enriches: [coherence, resilience, ethique]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand le système dérive et a besoin d'un rappel vers le centre."
cycle_step: surveiller
---

# Équilibre

## Définition

Équilibre pour un agent IA = **point de fonctionnement stable autour duquel le système oscille** (homéostasie, Cannon 1932). Pas l'absence de mouvement - le mouvement contrôlé autour d'un attracteur. Pour F2 : équilibre entre rythme de production (batch S7) et qualité (relecture suffisante), entre voix F (radicale) et accessibilité (pas trop hermétique), entre focus (StoreMD) et exploration (autres SaaS planifiés). Sans point d'équilibre explicite, l'agent et F dérivent vers les extrêmes.

## Pourquoi c'est critique

Sans modèle d'équilibre, l'agent oscille trop fort à chaque correction. Failure mode 1 : F dit "ce post est trop générique" → l'agent surcompense en cassant ANTI-IA, output devient illisible. Failure mode 2 : F dit "trop dense" → l'agent simplifie tellement que c'est creux. Failure mode 3 : pas de baseline explicite → chaque feedback recalibre depuis zéro au lieu d'ajuster autour du centre. L'équilibre est le rappel que les ajustements sont relatifs au point stable, pas absolus.

## Patterns exploitables

- SI un feedback corrige dans une direction → ALORS ajuster proportionnellement, pas inverser totalement
- SI un système oscille fortement → ALORS l'agent doit identifier le point d'équilibre, pas amplifier les écarts
- SI deux objectifs s'opposent (qualité/vitesse, focus/exploration) → ALORS expliciter le point d'équilibre cible
- SI on dérive → ALORS revenir vers le centre, pas continuer dans la direction
- SI tout va bien → ALORS surveiller que le système ne dérive pas silencieusement

## Anti-patterns

- Sur-corriger après chaque feedback → oscillations divergentes
- Pas de point d'équilibre explicite → dérive non détectée
- Confondre équilibre (mouvement contrôlé) et rigidité (absence de mouvement)

## Connexions

- Ce fichier + `entropie.md` = l'équilibre est ce qui résiste à l'entropie
- Ce fichier + `organisme.md` = un organisme se définit par son équilibre homéostatique
- Ce fichier + `coherence.md` = la cohérence interne est un type d'équilibre

## Exemples

**Cas 1** : F dit "ton dernier batch était trop carré, fais plus libre"
- Avec : ajuste 20% vers "libre", garde 80% de la structure éprouvée. Vérifie l'équilibre.
- Sans : abandonne toute structure, batch suivant chaotique → F doit re-corriger

**Cas 2** : F2 entre StoreMD (live) et ProfitPilot (planifié)
- Avec : "Équilibre actuel = 90% StoreMD / 10% planning ProfitPilot. Tant que MRR < cible, ne pas dériver."
- Sans : 50/50 → dilution → ni l'un ni l'autre n'avance
