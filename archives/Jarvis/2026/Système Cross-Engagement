# ARCHIVE — Système Cross-Engagement (Jarvis)

> **Archivé le :** 23/05/2026 · **Destination repo :** `archives/jarvis/cross-engagement-ARCHIVE.md`
> **Raison :** obsolète. Pivot vers 0 engagement proactif (réponses aux commentaires sur nos posts uniquement). Le cross-engagement R↔F↔F2 n'a plus lieu d'être.
> **Réactivation :** conserver pour le jour où l'outillage type open-claw permet d'automatiser ce workflow. Tout le code décrit ci-dessous est récupérable.
> **Statut :** retiré du code actif (voir prompt B1.1). Rien n'est perdu — ce document documente le système pour réimplantation.

---

## CE QUE FAISAIT LE SYSTÈME

Le cross-engagement automatisait l'amplification croisée entre les comptes : quand un compte publiait un post, les autres personas allaient y répondre/interagir selon un planning pré-établi, identifié par des IDs (`A1`–`A14` pour une série, `B1`–`B8` pour l'autre).

Jarvis pouvait, sur instruction ("cross fait sur B6"), marquer une action cross comme exécutée via l'action `mark_cross_published` (avec un `cross_id` obligatoire), ce qui :
- cochait la ligne correspondante (matching par ID, par contenu, ou par mots-clés) dans le log d'exécution cross,
- consignait un événement dans le suivi de progression.

Les compteurs affichaient le nombre de cross faits dans la journée vs l'objectif.

---

## EMPLACEMENTS DU CODE (retirés en B1.1)

| Fichier | Élément retiré |
|---------|----------------|
| `backend/jarvis/src/routes/chat.ts` | Mentions des fichiers cross dans `contextPaths` ; réflexe "mark_cross_published → cross-execution-log" ; réflexe "cross fait sur B6 → propose_action(mark_cross_published)" ; segment "que le cross" ; segment `Cross:` de la ligne compteur. **(Ne PAS toucher** "cross-persona" ligne 181 = sens différent.) |
| `backend/jarvis/src/lib/markdown.ts` | Fonction `markCrossPublished()` (déjà `@deprecated`, jamais appelée). |
| `backend/jarvis/src/lib/action-executor.ts` | `resolveFilePath` case `mark_cross_published` ; `applyTransform` case `mark_cross_published` (logique de matching IDs) ; `applySideEffects` case `mark_cross_published`. |
| `backend/jarvis/src/routes/context.ts` | Fonctions `countCrossFromExecutionLog`, `countCrossToday`, `countTotalCrossFromExecutionLog`, `parseCrossItemsFromLog`, `parseCrossItemsToday` ; reads `cross-engagement-tracker.md` + `cross-execution-log.md` ; variables `cross`/`crossTarget`/`crossItems` ; champs cross de l'objet compteurs. |
| `backend/jarvis/src/lib/context-types.ts` | Champs `cross` et `crossTarget` du type `CounterData`. |
| `backend/jarvis/src/lib/jarvis-tools.ts` | Déclaration du tool/action `mark_cross_published` + sa doc. |
| `backend/jarvis/src/routes/action.ts` | Membre `mark_cross_published` du type union + son handler dédié. |

## DONNÉES ASSOCIÉES (côté contenu)

- `{persona}/engagement/cross-execution-log.md` — log d'exécution (IDs A/B, statuts ⏳/✅/❌). N'existe plus dans la nouvelle arbo.
- `{persona}/cross-engagement-tracker.md` — textes pré-rédigés (READ-ONLY). N'existe plus dans la nouvelle arbo.

## POUR RÉACTIVER (futur)

Réimplanter les 7 emplacements ci-dessus + recréer les 2 fichiers de données, ou — mieux — reconcevoir le workflow autour de l'outillage d'automatisation disponible à ce moment-là (open-claw). Le modèle d'IDs A/B et la logique de matching (ID > contenu > mots-clés) sont décrits ci-dessus et restent valides comme point de départ.

---

*Archive documentaire. Aucune invention : décrit le code tel qu'il existait au 23/05/2026.*
