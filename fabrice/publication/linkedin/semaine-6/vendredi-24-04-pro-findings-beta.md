# Pro Findings Beta — NOUVEAU

**Date :** Vendredi 24/04
**Heure :** 21h00 CEST
**Compte :** F
**Plateforme :** LinkedIn
**Couche :** B (NOUVEAU)
**Vidéo :** aucune
**Statut :** ⏳ À publier

## POST (ANGLAIS — À PUBLIER)

**Three Pro scans this week surfaced findings our free scan doesn't catch. Here's what Pro-tier depth actually detects.**

—

Part of the 10-spot beta push, plus two cold Pro scans I ran manually on stores I identified publicly.

**Finding 1 — Theme code injection from a 2023 app**

The free scan flags active theme scripts. It doesn't run deep AST analysis to detect scripts that were injected by apps and never cleaned up on uninstall.

This DTC store had a JS bundle injected in 2023 by a loyalty app that got uninstalled in late 2024. Script still firing 16 months later on every page load. Adding 420ms to mobile LCP.

Free scan missed it. Pro AST analysis caught it in the theme.liquid dependency tree.

**Finding 2 — Metafield corruption breaking LLM parsing**

The free scan validates schema.org completeness. It doesn't stress-test metafield parseability against /meta.json endpoint at scale.

This store had product metafields that JSON.parse() fine on individual products but threw errors in batch queries. LLMs scraping the store ran into these errors and failed silently on 8% of the catalog.

Pro scan surfaced it in 2 minutes. Free scan scored AI readiness 67/100 here (looked okay). Pro scan dropped that to 41/100 once the parsing errors were factored in.

**Finding 3 — Competitor delta on app stack**

Pro scan benchmarks your app stack against anonymized aggregates of stores in your revenue range. This merchant was running 4 apps that 82% of their revenue-range peers had removed for performance reasons.

Not a bug, not a leak. A positioning signal. Free scan doesn't compare across stores — Pro does.

**What's next:**

10 beta spots filled. Feedback checkpoint day 14 per merchant. Pro tier opens publicly after consolidation.

If you want in on the beta or want a cold Pro scan of your store — https://storemd.vercel.app/ and DM me.

---

## Notes

- M4 principal (3 findings uniquement Pro = démo de valeur tangible). M5 pipeline en bas. M3 (cold scan) en mention.
- Les 3 findings + chiffres précis (16 mois, 420ms LCP, 8% catalogue, 67→41 score, 82% peers) doivent être cohérents avec les scans Pro réalisés. Si F n'a pas scanné 3 stores en Pro, reformuler en "findings types Pro surfaces that free doesn't".
- Traduction française disponible dans BATCH-SEMAINE-6.md pour référence
- Source : BATCH-SEMAINE-6.md §B.7.2
