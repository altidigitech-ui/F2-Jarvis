---
date: "2026-06-26"
timestamp: "2026-06-26T08:15:10.893Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** `saas-app-shopify/storemd/publication/` inexistant — dispatch StoreMD S15 perdu, carrousels Sam 27 / Dim 28 à risque dès demain
**Contexte:** Vérification 26/06 directe. `fabrice/publication/batch-semaine.md` ✅ (8KB S15) et `romain/publication/batch-semaine.md` ✅ (8KB S15) existent. En revanche, `saas-app-shopify/storemd/publication/` n'existe pas du tout — ni le répertoire, ni le fichier. Le batch central `marketing/contenu/batch-semaine/batch-semaine-S15.md` (944 lignes) contient 30+ posts StoreMD : STOREMD-TK/IG/FB/TW-SM-S15-01 à 07, + IH Mer 24/06, + **carrousels Sam 27 "Gains Potentiels" et Dim 28 "Agressif"**. La proposal PENDING "Fermer PENDING 'Dispatch S15 non exécuté'" référence un "PENDING #50 (Dossier absent)" introuvable dans les 4 dossiers proposals — le tracking de ce gap a perdu sa trace.
**Recommandation:** Créer via JARVIS le fichier `saas-app-shopify/storemd/publication/batch-semaine.md` avant ce soir. Les carrousels Sam 27 sont pour demain — c'est la dernière fenêtre d'action.
**Action:**
- Fichier à créer : `saas-app-shopify/storemd/publication/batch-semaine.md`
- Source : extraire de `marketing/contenu/batch-semaine/batch-semaine-S15.md` toutes les sections `STOREMD-TK`, `STOREMD-IG`, `STOREMD-FB`, `STOREMD-TW-SM` + l'IH Mer 24/06 + les carrousels Sam 27 / Dim 28
- Répertoire à créer au passage : `saas-app-shopify/storemd/publication/`
**Risques si ignoré:** 30+ posts StoreMD sans trace repo. Carrousels weekend (Sam 27 "Gains Potentiels", Dim 28 "Agressif") oubliés faute de dispatch visible. La symétrie F/R/StoreMD est cassée — JARVIS ne peut pas lire les statuts StoreMD. La S15 aura été une semaine sans tracking StoreMD.
