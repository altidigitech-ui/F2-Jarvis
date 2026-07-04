---
date: "2026-07-04"
timestamp: "2026-07-04T02:13:29.629Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Archiver 6 PENDINGs à fenêtre expirée — S16 escalades + carrousels S15 — queue 35→29
**Contexte:** La queue PENDING atteint 35 items (contre 20 au 27/06). Sur ces 35, 6 correspondent à des fenêtres d'action définitivement fermées depuis la fin de S16 (03/07) et ne peuvent plus être exécutées. Ils diluent la visibilité sur les items S17 urgents. Les 4 escalades S16 (J1, J2, J3, création batch) ont été utiles comme signaux à chaud mais S16 est confirmée perdue — leur présence dans `pending` n'apporte plus rien. Les 2 carrousels S15 (Sam 27/06, Dim 28/06) sont expirés depuis 7 jours.
**Recommandation:** Déplacer ces 6 fichiers de `brain/ouroboros/proposals/pending/` vers `brain/ouroboros/proposals/ignored/` sans review complète. Action de ménage, pas de décision stratégique.
**Action:**
- Fichiers à déplacer → `brain/ouroboros/proposals/ignored/` :
  1. `2026-06-27-batch-s16---fen-tre-de-cr-ation-ouverte--1782555151701.md` (Batch S16 window du 27/06, expirée)
  2. `2026-06-27-carrousels-sam-27-06---tiktok-14h-manqu--1782519190044.md` (Sam 27/06, expiré)
  3. `2026-06-27-carrousels-dim-28-06-non-couverts---ig-1-1782562325050.md` (Dim 28/06, expiré)
  4. `2026-06-29-escalade-s16---j1-matin-perdu--fen-tre-j-1782706291324.md` (S16 J1 escalade, expiré)
  5. `2026-06-30-escalade-niv-2---j1-j2-s16-perdus--j3--0-1782792842167.md` (S16 J2 escalade, expiré)
  6. `2026-07-02-escalade-niv-3---j3-s16-rat---s16-effect-1783001555053.md` (S16 J3 escalade, fait historique acté — l'info "pivot S17 requis" est déjà capturée dans 3 autres PENDINGs actifs)
- Résultat attendu : queue 35 → 29 items, signal-to-noise amélioré
**Risques si ignoré:** La queue reste à 35 items et la /review-proposals reste plus lourde qu'elle ne devrait. Les items S17 urgents (batch, dispatch, progress-semaines) restent noyés dans du bruit expiré.
