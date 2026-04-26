---
name: cognitive-loader
description: Charge sélectivement les fichiers cognitifs depuis brain/context-cognitif/ selon le profil de la tâche en cours. À utiliser proactivement quand la tâche nécessite plus que de la complétion de pattern (décision, créativité complexe, gestion émotionnelle, audit, analyse multi-couche).
---

# Cognitive Loader

Ce skill charge des fichiers cognitifs depuis `brain/context-cognitif/` pour enrichir le contexte de l'agent avant de répondre.

## Quand utiliser ce skill

Utiliser quand la tâche dépasse l'auto-complétion de pattern :

- Décision avec trade-offs : profil **strategic**
- Interaction émotionnelle ou hostile : profil **social**
- Architecture, design system, refactoring : profil **technical**
- Création de contenu, visuels, copywriting : profil **creative**
- Audit, diagnostic, post-mortem : profil **debug**
- Analyse profonde demandée explicitement : profil **deep**

Si pas évident, déduire du vocabulaire de la requête :

| Vocabulaire | Profil |
|---|---|
| "architecture", "refactor", "debug technique", "design pattern" | technical |
| "contenu", "post", "visuel", "copywriting", "brainstorm" | creative |
| "conflit", "frustration", "ton", "empathie", "hostilité" | social |
| "décision", "trade-off", "stratégie", "prioriser", "planifier" | strategic |
| "audit", "post-mortem", "diagnostic", "pourquoi ça a échoué" | debug |
| "analyse profonde", "réfléchis", "/think" | deep |

## Protocole de chargement

1. Identifier le profil de la tâche (voir tableau ci-dessus)
2. Lire le profil dans `references/profiles.md`
3. Lire les fichiers listés du profil + tous les fichiers `injects_into: [all]` pertinents
4. Respecter le budget : 5 fichiers max par session (8 en mode deep)
5. Respecter le budget tokens : 5000 par session (8000 en mode deep)
6. Logger l'usage dans `brain/context-cognitif/.usage-logs/`

## Règles dures

1. **JAMAIS plus de 5 fichiers** cognitifs par session (8 en mode deep)
2. **Budget max : 5000 tokens** cognitifs par session (8000 en deep)
3. **Toujours commencer par `noyau/conscience.md`** : c'est le hub
4. **Le profil deep est explicite** : F demande "/think" ou "analyse profonde"
5. **Tracker chaque chargement** dans `.usage-logs/<date>.md`
6. **L'alias `all`** : ces fichiers sont chargés en priorité avant les fichiers spécifiques au profil

## Files

- `references/file-index.md` : index des 77 fichiers (path, token cost, profils)
- `references/profiles.md` : 6 profils avec leur composition

## Exemple

User : "Help me decide between Railway and Render for backend hosting"

Agent (interne) :
1. Profil = strategic (décision avec trade-offs)
2. Charger : conscience.md (all), decision.md, intention.md, priorite.md, doute.md
3. Total : 5 fichiers, ~2800 tokens
4. Logger dans `.usage-logs/2026-04-26.md`
5. Répondre avec contexte cognitif chargé
