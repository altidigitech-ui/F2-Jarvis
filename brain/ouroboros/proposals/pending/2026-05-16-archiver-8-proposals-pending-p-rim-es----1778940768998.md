---
date: "2026-05-16"
timestamp: "2026-05-16T14:12:48.999Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Archiver 8 proposals PENDING périmées — S9 terminée, délais irrattrapaables
**Contexte:** S9 s'est clôturée vendredi 15/05 au soir. 8 proposals du backlog PENDING visaient des délais intra-semaine qui ne peuvent plus être exécutés. Elles polluent les 30 entrées actives et masquent les sujets réellement actionnables (batch S10, analytics, fix technique). Proposals périmées identifiées :
1. `2026-05-12-cold-j1-j2---0-tous-canaux---sprint-dm-u` — Sprint J2/J3 → S9 terminée
2. `2026-05-14-cold-s9---0-250---j4-jeudi---fen-tre-de--` — Fenêtre J4+J5 → passée
3. `2026-05-14-romain-ph---j3--mer-13-05--manqu----6-in-` — Alerte J3 → J3 passé depuis 3 jours
4. `2026-05-15-romain-ph---j4--14-05--confirm--absent-d-` — J4+J5 fenêtre finale → passée
5. `2026-05-13-instagram-storemd---j3--13-05--non-confi-` — Instagram J3/J4 manuels → passé
6. `2026-05-12-posts-mar-12-05-avec-cta--dm-me-for-beta-` — Monitoring DMs 12/05 → passé
7. `2026-05-13-carrousels-hors-format-9-16---posts-tikt-` — Format vidéos S9 → posts déjà publiés
8. `2026-05-13-todo--tri-utm-mercredi-matin--non-ex-cut-` — TODO UTM mercredi 13/05 → passé
**Recommandation:** Déplacer ces 8 fichiers de `brain/ouroboros/proposals/pending/` vers `brain/ouroboros/proposals/ignored/` (ou créer un sous-dossier `archived/`). Ramènerait le backlog actif de 30 à ~22 entrées, toutes encore actionnables.
**Action:**
- Répertoire source : `brain/ouroboros/proposals/pending/`
- Déplacer les 8 fichiers listés vers `brain/ouroboros/proposals/ignored/`
- Aucun contenu à modifier, juste déplacement
**Risques si ignoré:** Le backlog à 30 entrées reste illisible. Les proposals actives (batch S10, fix context.ts, analytics S10) restent noyées dans du bruit S9 irattrapable.
