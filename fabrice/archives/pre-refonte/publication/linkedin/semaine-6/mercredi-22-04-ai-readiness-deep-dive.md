# Pro Beta Technical — Recrutement beta builder (REFAIT Couche B)

**Date :** Mercredi 22/04
**Heure :** 21h00 CEST
**Compte :** F
**Plateforme :** LinkedIn
**Couche :** B (REFAIT — remplace Couche A AI-readiness-deep-dive)
**Vidéo :** aucune
**Statut :** ⏳ À publier

## POST (ANGLAIS — À PUBLIER)

**We're opening 10 StoreMD Pro beta spots this week. Here's what's in Pro, how the infrastructure handles it, and what we need from the 10 merchants.**

—

Context: we shipped StoreMD 14/04. The free public tier has been running 60-second scans on live Shopify stores since. No signup required, 43 checks, report in browser.

The Pro tier sits on top of the same infrastructure, with deeper analysis:

**Pro-only checks:**

→ Shopify billing history diff (full subscription record, not just current state — catches ghost billing over 5+ years of store age)
→ Per-LLM AI readiness scoring (separate scores for GPTBot, Claude-Web, PerplexityBot, because their parsing rules differ)
→ Theme code static analysis (AST parsing of theme.liquid, detects dead scripts, injected analytics, LLM-breaking patterns)
→ Metafield parseability testing (runs JSON.parse() against the live /meta.json endpoint, logs edge cases)
→ Competitor benchmarking (compares your scan results against anonymized aggregates of stores in your revenue range)

**Infrastructure side:**

The Pro scan isn't just "free scan + more checks." It runs a different pipeline with longer-running jobs (3-5 min instead of 60s), sandboxed analysis workers, and rate-limiting tuned to avoid Shopify API throttling at depth.

We built the Pro tier before opening the public free tier, because testing the Pro pipeline was the way we validated the free tier's reliability.

**The beta deal:**

→ 30 days full Pro access on your live Shopify store
→ One structured feedback checkpoint at day 14
→ Priority Slack access for direct questions during the 30 days

In exchange, you use Pro on your actual store (not a dev store), and tell us what breaks, what surprises you, what's missing.

**Who qualifies:**

Any Shopify merchant or agency. Live production store. We're not filtering by revenue.

**How to claim:**

DM me your Shopify URL. First 10 I see tonight, we onboard.

→ https://storemd.vercel.app/

---

## Notes

- M1 principal. Approche technique — différencie totalement du post R même jour (R attaque ouvert, F explique l'architecture).
- Voix F : registre builder story + pourquoi technique, transparent sur l'infra.
- Features Pro + "Priority Slack access" à valider produit. Si pas la bande passante, reformuler en "Priority email" ou retirer.
- Traduction française disponible dans BATCH-SEMAINE-6.md pour référence
- Source : BATCH-SEMAINE-6.md §B.7.1
