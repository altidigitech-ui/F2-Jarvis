---
date: "2026-05-08"
timestamp: "2026-05-08T20:13:47.007Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** saas-app-shopify/storemd/context.md vide (0KB) — bible produit absente pour cold S9
**Contexte:** Le fichier `saas-app-shopify/storemd/context.md` est créé mais vide (0 octet). Il est référencé comme "Context produit" dans `fabrice/context.md` section 8, `fabrice/planning/plan-30-jours.md` tableau Documents de référence, et implicitement dans tous les cold templates. Le cold S9 démarre lundi 11/05 avec un objectif de 50 DMs/jour sur 5 plateformes. Sans ce fichier, F et R écrivent leurs DMs sans référence partagée sur les features, pricing, hooks et verticals StoreMD.
**Recommandation:** Remplir `saas-app-shopify/storemd/context.md` lors du batch de demain (sam 09/05) avec au minimum : features clés, pricing actuel, hooks cold par plateforme, verticals Shopify cibles, et les 3 angles différenciants (F angle technique / R angle business). Ce fichier doit être la source de vérité produit pour toute la machine cold S9.
**Action:**
- Fichier : `saas-app-shopify/storemd/context.md`
- Action : Créer le contenu (features StoreMD, pricing, hooks, cibles)
**Risques si ignoré:** Cold S9 démarre lundi sans bible produit. Risque de DMs incohérents entre F (technique) et R (business), arguments contradictoires, perte de crédibilité face aux merchants.
