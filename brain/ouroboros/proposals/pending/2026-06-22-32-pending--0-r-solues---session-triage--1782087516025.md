---
date: "2026-06-22"
timestamp: "2026-06-22T00:18:36.026Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** opérationnel
**Titre:** 32 PENDING, 0 résolues — session triage express (<30 min) pour débloquer le système

**Contexte:** Depuis la création du système (~23 avril 2026), zéro proposal n'a été résolue — ni acceptée, ni rejetée. Les 32 PENDING mélangent 4 catégories : (1) définitivement expirées (9 proposals, fenêtres fermées), (2) actionnables en < 5 min (3 proposals), (3) stratégiques moyen terme (~15), (4) en attente externe (~5). La queue est devenue illisible. Vérifications de ce cycle : batch-semaine.md = S14 confirmé, S15 inexistant, chemin réel batch confirmé à `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`. Par minuit ce soir, 2 proposals de plus (#1 "last call" et #32 "J-4 deadline") expireront, portant à 11 les entrées définitivement closes.

**Recommandation:** Session triage 30 min en 3 blocs :

**Bloc A — Archiver 10 PENDING expirées** (3 min, Bash) :
```bash
cd brain/ouroboros/proposals
mv pending/2026-06-21-live-emergency---ig-18h00-et-fb-18h30-en-1782029680026.md ignored/
mv pending/2026-06-21-contenu-dim-21--ends-tomorrow----absent--1782007990880.md ignored/
mv pending/2026-06-20-escalade---posts--last-weekend--sam-20---1781935926932.md ignored/
mv pending/2026-06-20-5-targets-twitter-pr--qualifi-s-en-reche-1781950359162.md ignored/
mv pending/2026-06-20-archiver-3-pending---fen-tre-temporelle--1781964768224.md ignored/
mv pending/2026-06-19-twitter-f---r-ven-19-06---posts--3-days--1781864065239.md ignored/
mv pending/2026-06-19-posts-sam-20---dim-21---last-weekend-----1781820712541.md ignored/
mv pending/2026-06-19-posts-s14-lun-jeu--15-18-06----4-jours-d-1781856837496.md ignored/
mv pending/2026-06-19-linkedin-ven-19-06---2-posts-avec-copy---1781849682893.md ignored/
mv pending/2026-06-19-dispatch-sam-20-dim-21-confirm--absent-d-1781827941542.md ignored/
```
(#5, #6, #14, #16, #17, #18, #19, #20, #22, #24 — fenêtres définitivement fermées)

**Bloc B — Corriger le chemin batch dans les deux plan-hebdo** (2 min, Edit) :
- `fabrice/planning/plan-hebdo.md` : remplacer `saas-app-shopify/storemd/publication/[batch-semaine.md](http://batch-semaine.md)` → `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
- `romain/planning/plan-hebdo.md` : remplacer `saas-app-shopify/storemd/publication/batch-semaine.md` → `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
→ Clôture PENDING #26 + #31

**Bloc C — Lire offer_launch_marketing.md §7** (5 min, Read) :
Valider les 3 hooks permanents post-June-22 avant de créer S15.
→ Clôture PENDING #11, débloque #2 et #8 (création S15)

Ces 3 blocs clôturent **13+ proposals** et ramènent la queue à ~19 entrées lisibles.

**Risques si ignoré:** À 2-3 nouvelles proposals/cycle, la queue atteint ~46 entrées dans 7 jours. Au-delà de ~35, le système de proposals devient contre-productif — plus de temps à gérer les signals qu'à agir sur eux. S15 sera créé sans hooks validés ni chemin batch correct dans le plan-hebdo.
