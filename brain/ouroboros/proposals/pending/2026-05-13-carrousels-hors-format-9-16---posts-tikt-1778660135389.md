---
date: "2026-05-13"
timestamp: "2026-05-13T08:15:35.390Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Carrousels hors format 9:16 — posts TikTok StoreMD S9 publient aujourd'hui sans validation format
**Contexte:** Le TODO créé le 12/05 à 23:45 dans `romain/tracking/progress-semaines.md` liste explicitement "carrousels hors 9:16" comme problème ouvert (red flag). Le batch S9 (`marketing/contenu/batch-semaine/batch-semaine-S9.md` ligne 252) contient un post TikTok carousel `STOREMD-TK-S9-02` référençant `PROMPT_CAROUSSEL_1.md` (7 slides) sans dimension 9:16 spécifiée. Les posts Instagram carrousels (même contenu) sont en 1080×1350 (4:5). TikTok exige 9:16 (1080×1920) pour les carousels. Or la publication démarre aujourd'hui (13/05) — premier jour live selon Romain progress 12/05 23:50.
**Recommandation:** Avant publication des posts carousel TikTok cette semaine : vérifier si les 7 slides de `caroussel-installation-beta` ont été exportées en 1080×1920 (9:16). Si non, re-exporter depuis le template source avant que le post parte en live. Les posts Instagram (1080×1350) sont OK.
**Action:**
- Vérifier : slides `caroussel-installation-beta` — dimensions actuelles vs 1080×1920 requis TikTok
- Si hors format : re-exporter les 7 slides en 9:16 avant le créneau TikTok schedulé
- Confirmer dans `romain/tracking/progress-semaines.md` : ajouter entrée J3 "TODO carousel 9:16 → ✅ résolu" ou "⏳ à traiter"
**Risques si ignoré:** Post TikTok S9-02 publié avec slides en mauvais ratio → recadrage automatique TikTok = texte coupé, visuel dégradé, performance réduite. Contenu de recrutement beta (7 étapes d'install) illisible sur mobile.
