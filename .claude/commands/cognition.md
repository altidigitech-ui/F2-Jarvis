---
name: cognition
description: >
  Gère le contexte cognitif de la session. Affiche l'état, charge un profil,
  vérifie le budget tokens, ou affiche la cartographie. Utiliser pour contrôler
  quelles primitives cognitives sont actives.
allowed-tools:
  - Read
  - Bash
  - Grep
---

# /cognition : Gestion du contexte cognitif

## Usage

- `/cognition` : affiche l'état actuel (fichiers chargés + budget)
- `/cognition load <profil>` : charge un profil cognitif
- `/cognition budget` : détail du budget tokens
- `/cognition map` : affiche le graphe de dépendances
- `/cognition reset` : remet le budget à zéro

## Comportement par sous-commande

### `/cognition` (sans argument)

1. Exécuter le script de budget :
   ```bash
   bash .claude/skills/cognitive-loader/scripts/budget-check.sh
   ```
2. Lister les fichiers cognitifs qui ont été lus pendant cette session
3. Afficher le profil actif (ou "aucun" si pas de profil chargé)
4. Format de sortie :
   ```
   🧠 ÉTAT COGNITIF
   Profil actif : [nom ou "aucun"]
   Fichiers chargés : [liste]
   Budget : [X]/5000 tokens, [Y]/5 fichiers
   ```

### `/cognition load <profil>`

1. Valider que `<profil>` est un des 6 profils valides :
   `technical`, `creative`, `social`, `strategic`, `debug`, `deep`
2. Si profil invalide → afficher les 6 profils disponibles et demander de choisir
3. Si profil valide → lire la section correspondante dans
   `.claude/skills/cognitive-loader/references/profiles.md`
4. Charger les fichiers listés dans le profil depuis `brain/context-cognitif/`
5. Mettre à jour `brain/context-cognitif/.budget` :
   - Ligne 1 : ajouter les token costs des fichiers chargés
   - Ligne 2 : ajouter le nombre de fichiers chargés
6. Confirmer :
   ```
   🧠 Profil [nom] chargé
   Fichiers : [liste]
   Budget : [X]/5000 tokens, [Y]/5 fichiers
   ```

### `/cognition budget`

1. Exécuter :
   ```bash
   bash .claude/skills/cognitive-loader/scripts/budget-check.sh
   ```
2. Lister les logs récents :
   ```bash
   ls -la brain/context-cognitif/.usage-logs/ 2>/dev/null | tail -5
   ```
3. Si des logs existent, afficher un résumé des dernières sessions

### `/cognition map`

1. Lire la section "Graphe de dépendances" dans `brain/context-cognitif/ARCH.md`
2. Afficher le graphe ASCII tel quel
3. Indiquer quels fichiers du graphe sont actuellement chargés (si applicable)

### `/cognition reset`

1. Écrire dans `brain/context-cognitif/.budget` :
   ```
   0
   0
   ```
2. Confirmer :
   ```
   🧠 Budget cognitif réinitialisé.
   Tokens : 0/5000 | Fichiers : 0/5
   ```

## Règles

- Ne jamais charger un profil si le budget est dépassé (sauf reset d'abord)
- Le profil `deep` ne peut être chargé que sur demande explicite de F
- Si un profil est déjà chargé et qu'on en charge un autre, les tokens s'additionnent
- Cette commande ne modifie aucun fichier opérationnel, hors validation BIBLE.md §3
