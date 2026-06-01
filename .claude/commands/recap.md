---
name: recap
description: Génère un recap de session durable dans tracking/recap-sessions/YYYY-MM-DD.md selon le README local du dossier, et met à jour l'index. Événementiel (session marathon, décision majeure, refonte, lancement). Distinct de /handoff et /debrief.
---

# /recap

Écrit un **recap de session durable** dans `tracking/recap-sessions/`. Cette commande **orchestre** — elle ne réinvente pas le format. La source de vérité, c'est le **README local du dossier** : `tracking/recap-sessions/README.md` (nommage, quand créer, bascule annuelle). Charte globale : `archives/README.md`.

## Quand l'utiliser

**Événementiel, pas un journal quotidien** (README §3) : fin de session marathon, décision majeure (pivot, virage produit, refonte structurelle), lancement business, ou toute session dont le contenu mérite d'être retrouvé plus tard. Une session banale ne déclenche pas `/recap`.

## Ce que ce n'est PAS (frontière)

- **≠ `/handoff`** — `/handoff` écrit `HANDOFF.md` à la racine, court (< 1500 car.), **éphémère** (écrasé chaque fois), pour reprise rapide. `/recap` est **durable et détaillé**.
- **≠ `/debrief`** — `/debrief` est un post-mortem **SEDA d'un événement** (launch/incident/mois) écrit par `f2-auditor` dans `decisions-log.md`. `/recap` couvre **toute la session**, pas un seul événement.

## Nommage du fichier

Format figé (README §2) : `YYYY-MM-DD.md` (date ISO de la session).
- Plusieurs sessions le même jour → suffixe `_morning` / `_evening`.
- Session marathon sur plusieurs jours → plage `YYYY-MM-DD_DD.md` (ex : `2026-05-18_20.md`).

## Process

1. **Timestamp** : `TZ='Europe/Paris' date '+%A %d %B %Y — %H:%M:%S %Z'`
2. **Lire le README local** `tracking/recap-sessions/README.md` (vérifier nommage + cas particuliers) et déterminer le nom du fichier.
3. **Collecter** la matière de la session : git diff + actions réalisées, décisions prises, points de reprise, fichiers produits.
4. **Écrire** `tracking/recap-sessions/<nom>.md`. Le format **n'est pas figé au titre près** — **regarde les recaps récents du dossier comme modèle** et suis le squelette récurrent (adapte les titres et ajoute des sections selon la session) :
   - Titre : `# RECAP SESSION — <date> — <SUJET>`
   - Contexte de la session
   - Décisions actées (synthèse)
   - Chantiers réalisés (sous-points avec tag d'état : `[FAIT — poussé]`, `[PRÊT]`, `[COMPLETED — vérifié]`…)
   - Points de reprise / à faire (dans l'ordre)
   - Données canon si applicable (**sourcées**, jamais inventées)
   - Règles établies / rappels
   - Fichiers produits (dans `outputs`)
   - Chemins repo critiques
   - Session multi-jours → structurer en `PARTIE 1 / PARTIE 2`. Extras possibles selon la session (totaux, assets, conventions…).
5. **Mettre à jour l'index** : ajouter une ligne dans le tableau `## 5. Index des recaps` du `README.md` local — format `| `<nom>.md` | <sujet de la session> |` (nom de fichier **entre backticks**, comme les entrées existantes). Rafraîchir aussi la date du titre de section (« au JJ/MM/AAAA ») si présente. L'index doit toujours refléter le contenu réel du dossier.
6. **Confirmer** : nom du fichier créé + une ligne de résumé.

## Garde-fous

- **Zéro invention** (BIBLE §3) : un chiffre, une métrique, une donnée non sourcée → `—`, jamais fabriqué.
- **Index toujours à jour** : si `/recap` crée un fichier sans ajouter sa ligne d'index, c'est un bug.
- Ne pas dupliquer `/handoff` (éphémère) ni `/debrief` (post-mortem événement).
- Ne touche qu'au dossier `tracking/recap-sessions/` (le nouveau recap + l'index du README).
