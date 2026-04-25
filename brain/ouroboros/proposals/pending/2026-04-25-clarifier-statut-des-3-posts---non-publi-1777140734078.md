---
date: "2026-04-25"
timestamp: "2026-04-25T18:12:14.079Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Clarifier statut des 3 posts ⏳ non publiés F avant archivage — Mer 22/04 Couche A + Couche B + Jeu 23/04 Couche B
**Contexte:** Le plan-hebdo F contient 3 posts marqués ⏳ qui n'ont jamais été publiés et dont la non-publication n'est pas documentée : (1) `store-md-before-after-billing` — Thread $40k 72h case study (Couche A Mer 22/04), (2) `store-md-beta-10-spots` — M1 Beta builder angle (Couche B Mer 22/04), (3) `store-md-scan-demo-agency` — M2+M3 Scan gratuit (Couche B Jeu 23/04). Le progress-semaine F ne mentionne pas la raison de leur abandon. Demain à l'archivage, ils seront gelés en ⏳ sans contexte.
**Recommandation:** Avant archivage, mettre à jour chaque ligne avec une notation explicite.
**Action:**
- Fichier: `fabrice/plan-hebdo.md`
- Modifier colonne Statut sur 3 lignes :
  - Mer 22/04 Couche A : `⏳` → `⛔ Non publié — angle à recycler S7 (thread $40k)`
  - Mer 22/04 Couche B : `⏳` → `⛔ Non publié — M1 beta non lancé S6`
  - Jeu 23/04 Couche B : `⏳` → `⛔ Non publié — M2+M3 décalé, à réévaluer S7`
**Risques si ignoré:** Au batch S8 ou S9, impossible de savoir si ces angles ont été utilisés ou non. Risque de double-proposition du même contenu.
