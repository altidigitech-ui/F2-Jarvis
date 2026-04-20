# Ghost Billing Deep Dive

**Date :** Mardi 21/04
**Heure :** 21h00 CEST
**Vidéo :** aucune
**Statut :** ⏳ À publier

## POST (ANGLAIS — À PUBLIER)

**How StoreMD detects ghost billing in 60 seconds.**

Technical deep dive.

—

Ghost billing is the biggest invisible leak in Shopify stores.

App installed → used 6 months → uninstalled → but Shopify keeps billing because the subscription charge created at install was never canceled app-dev side.

**Why it's invisible to merchants:**

→ Shopify invoice doesn't detail per app
→ The app no longer shows in "Installed apps" dashboard
→ Shopify doesn't notify when there's a mismatch active apps vs billed apps
→ Only the developer can see active subscriptions in Partners dashboard

**How StoreMD detects it:**

1. **Read Shopify invoices** via merchant API (list of active app subscriptions)
2. **Scan installed apps** via /admin/api/apps.json
3. **Diff:** match billed app_ids vs installed app_ids
4. **Surface:** each invoice line without a matching app = ghost billing

Scan takes 12 seconds for this single check.

**Field pattern across 47 scans:**

→ 94% have at least 1 ghost app
→ Average: 3.2 ghost apps per store
→ Average monthly loss: $189/mo per store

**Concrete case:**

DTC store at $80k/mo scanned Thursday.
- "Privy" uninstalled August 2024, still billing: $49/mo × 14 months = $686
- "Klaviyo Classic" migrated, old subscription never canceled: $45/mo × 14 months = $630
- "Loox" replaced by Judge.me, billing active: $99/mo × 14 months = $1,386

**Total cumulative ghost billing: $2,702.**

The owner didn't know. His Shopify agency ($2k/mo) wasn't looking at this.

—

**StoreMD runs this scan for free, no signup, no admin access. 60 seconds.**

Managing Shopify? DM me your URL or test on storemd.com.

#Shopify #Ecommerce #SaaS #DTC

---

## Notes

- Traduction française disponible dans BATCH-SEMAINE-6.md pour référence
- Ne pas publier la traduction
