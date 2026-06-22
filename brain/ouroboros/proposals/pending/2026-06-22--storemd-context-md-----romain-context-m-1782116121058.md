---
date: "2026-06-22"
timestamp: "2026-06-22T08:15:21.058Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** `storemd/context.md` + `romain/context.md` — statut App Store faux depuis 7 jours (NON approuvée → LIVE)
**Contexte:** Deux fichiers contextuels critiques lus par JARVIS à chaque session déclarent que l'app StoreMD n'est PAS sur le Shopify App Store : `marketing/saas-app-shopify/storemd/context.md` (ligne 4 : "App Shopify NON approuvée", daté 21/05/2026) et `romain/context.md` ("Beta actuel : StoreMD n'est pas sur le Shopify App Store"). Or, depuis ≤15/06/2026, l'app est live sur `apps.shopify.com/storemd-1` — confirmé dans `interne-work/REPRISE-SESSION-2026-06-15-jarvis-movefile-timeout-batch-s14.md` ligne 46 + 50. La §4 "CONTRAINTE BETA" de context.md décrit un workflow beta obsolète (DM → lien Railway interne `storemd-api-production.up.railway.app/api/v1/auth/install`) alors que le lien App Store est le bon canal désormais. Durée de l'incohérence : 7 jours.
**Recommandation:** Mettre à jour les deux fichiers pour refléter la réalité produit actuelle.
**Action:**
- Fichier 1 : `marketing/saas-app-shopify/storemd/context.md`
  - Ligne 4 : remplacer `"App Shopify NON approuvée sur l'App Store"` → `"App Shopify LIVE sur l'App Store (apps.shopify.com/storemd-1, depuis 15/06/2026)"`
  - §4 "CONTRAINTE BETA" (lignes 43-60) : remplacer la note "n'est pas sur l'App Store / lien Railway" par "App disponible sur apps.shopify.com/storemd-1. Lien direct install conservé pour cold DMs qualifiés."
  - Date en-tête : `21/05/2026` → `22/06/2026`
- Fichier 2 : `romain/context.md`
  - Remplacer `"Beta actuel : StoreMD n'est pas sur le Shopify App Store"` → `"StoreMD est live sur le Shopify App Store (apps.shopify.com/storemd-1) depuis le 15/06/2026"`
**Risques si ignoré:** JARVIS continue d'opérer avec un contexte produit faux depuis 7 jours — cold templates, conseils stratégiques, et agents futurs héritent d'un état beta qui n'existe plus. Le workflow "DM + lien Railway" est présenté comme l'unique voie d'acquisition, alors que l'App Store est maintenant un canal direct.
