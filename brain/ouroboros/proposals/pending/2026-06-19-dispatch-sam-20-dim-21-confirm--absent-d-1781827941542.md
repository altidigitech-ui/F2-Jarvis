---
date: "2026-06-19"
timestamp: "2026-06-19T00:12:21.543Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Dispatch Sam 20/Dim 21 confirmé absent des fichiers persona — vérifier scheduling StoreMD
**Contexte:** Les fichiers `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` s'arrêtent au vendredi 19/06 (normal : comptes perso = lun-ven uniquement). Mais les posts StoreMD (TikTok/IG/FB/Twitter StoreMD) pour Sam 20 ("last weekend") et Dim 21 ("ends tomorrow") existent dans le batch central (lignes 1100-1425 de `marketing/contenu/batch-semaine/batch-semaine-S14.md`). Ces posts doivent être schedulés depuis un dispatch StoreMD, mais `saas-app-shopify/storemd/publication/` est absent (PENDING). Le statut de scheduling des Sam 20 + Dim 21 reste inconnu — et demain c'est Sam 20.
**Recommandation:** Confirmer manuellement si les posts StoreMD Sam 20 + Dim 21 ont été schedulés sur les plateformes (Buffer/Later/Creator Studio). Si non, scheduler en urgence aujourd'hui depuis le central batch. Les textes sont prêts dans `marketing/contenu/batch-semaine/batch-semaine-S14.md` lignes ~1100-1425.
**Risques si ignoré:** Les posts "last weekend" (Sam) et "ends tomorrow" (Dim) — les deux plus forts en urgence de l'offre — ne sont pas publiés. La montée en pression June 22 tombe à plat au moment critique.
