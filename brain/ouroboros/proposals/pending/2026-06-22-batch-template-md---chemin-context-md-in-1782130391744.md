---
date: "2026-06-22"
timestamp: "2026-06-22T12:13:11.744Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** batch-template.md — chemin context.md incorrect, bloquera JARVIS à la production S15
**Contexte:** `marketing/contenu/batch-semaine/batch-template.md` ligne 110 référence : `saas-app-shopify/storemd/context.md`. Ce chemin retourne "File not found". Le fichier réel est à `marketing/saas-app-shopify/storemd/context.md` (18KB, vérifié). Le PENDING #33 avait audité l'absence de "June 22" hardcodé — pas les chemins. Si JARVIS suit le template à la lettre pour S15, il échouera à lire le contexte produit (features, pricing, hooks sourcés) — risque de batch sans données réelles ou avec hallucinations.
**Recommandation:** Corriger le chemin dans le template avant la prochaine session de production batch.
**Action:**
- Fichier: `marketing/contenu/batch-semaine/batch-template.md`
- Modifier ligne 110: `| Context StoreMD | \`saas-app-shopify/storemd/context.md\`` → `| Context StoreMD | \`marketing/saas-app-shopify/storemd/context.md\``
**Risques si ignoré:** JARVIS produit S15 sans lire le contexte produit → copy générique ou chiffres inventés, violation RED LINES du template.
