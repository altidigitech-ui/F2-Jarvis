# POSTS VALIDÉS F — Semaine du 13/04/2026 au 19/04/2026

**Usage :** Textes finaux prêts à copier-coller dans le scheduler. Archivé le dimanche.
**Contexte :** SEMAINE DE LANCEMENT StoreMD. Mardi 14/04 = launch day.
**Statut :** À scheduler.

-----

## TWITTER

### LUNDI 13/04 — 13h — Teaser technique (builder story)

been building storemd for the last 3 weeks. ships tomorrow.

the scanning part was straightforward. connect to shopify API, pull the data, run it through claude, score it. took a few days.

the part that ate most of my time was the memory. I wanted the agent to remember what your store looked like last week so it can tell you what actually changed. not just "your score is 72" but "your score dropped 8 points since tuesday because this app updated."

most audit tools forget you exist between scans. that felt broken to me

### MARDI 14/04 — 13h — LAUNCH DAY (behind the build)

storemd is live.

FastAPI backend, Next.js 14 frontend, Supabase for data, Celery workers running scans in the background, Claude API for the analysis, and Mem0 for memory that persists between scans.

what makes it different from a one-shot audit is the memory layer. every scan stores context. when the agent runs again next week it knows what your baseline looked like, what moved, and whether that change matters. a new app added 400ms? you get a push notification. seasonal traffic spike? the agent learned that pattern last month and stays quiet.

free scan. 60 seconds. no credit card

### MERCREDI 15/04 — 13h — Exclusivité technique Agentic Readiness (pourquoi technique)

the agentic readiness scanner checks every product in your catalog against what AI shopping agents actually need to find you.

four things: structured metafields that GPTBot can parse (most merchants have them filled but in a format bots can't read). valid GTIN codes. descriptions written for purchase-intent queries instead of generic marketing. and schema markup that renders as a rich result.

the hardest part was the description scoring. you can write 200 words about a product and still be useless to an AI agent if the specs are buried in promotional language. had to build a separate classification layer just for that

### JEUDI 16/04 — 13h — App Impact Scanner (behind the build)

the app impact scanner was the feature I spent the most time on. isolating which app causes the slowdown is harder than it sounds.

you can't just measure total load time before and after. apps interact with each other. one loads async, the next injects a 340KB script in the header, another one rewrites your liquid templates directly during install.

so the scanner traces every JS file, CSS file, and liquid snippet back to the app that put it there. then ranks by actual milliseconds added to your page load.

tested this on a store with 14 apps. 3 of them caused 80% of the bloat. the other 11 barely registered

### VENDREDI 17/04 — 13h — Ghost Billing Detector (builder story)

this feature made me angry when I was researching it.

shopify apps can keep charging you after you uninstall them. the subscription lives in shopify billing, separate from the app itself. so removing the app doesn't touch the charge. found a case where a merchant paid for 6 years without knowing.

the ghost billing detector pulls your active billing subscriptions and compares them against your installed apps list. mismatch = alert with the exact amount and a direct link to cancel.

took 2 days to build. probably the best ROI of any feature in the whole product

-----

## LINKEDIN

### MARDI 14/04 — 21h — Launch technique (deep dive architecture)

StoreMD is live. Here's what I actually built.

Shopify merchants lose money from things they can't see. Slow stores from app bloat. Dead code from uninstalled apps. Ghost billing. Listings that search engines can't read. And stores completely invisible to AI shopping agents.

I built an agent with 4 layers that run on every scan.

First layer picks up changes through Shopify webhooks, scheduled cron jobs, and Playwright browser automation. That last part matters because API data doesn't tell you what the customer actually sees. The agent loads your store in a real browser and measures the experience.

Second layer runs the analysis. Claude API interprets the scan data, but it also pulls context from Mem0, a persistent memory system. The agent knows your store's baseline, your seasonal patterns, which recommendations you've accepted before. Every scan builds on the previous one instead of starting from zero.

Third layer sends the recommendation. Push notification or email, plain language. "Your mobile checkout slowed down 0.8 seconds. Reviews+ updated yesterday. Here's how to fix it."

Fourth layer closes the loop. You accept or reject the recommendation. That feedback goes back into Mem0. Over time the agent learns what you care about and stops flagging noise.

The technical challenge that consumed the most time was the diff engine. Comparing scans over time sounds simple until you need to attribute a score change to a specific cause. Was it the app update? The theme change? The 200 new products added? Isolating causation without false positives took most of the 3 weeks.

The stack: FastAPI, Next.js 14, Supabase PostgreSQL, Celery + Redis for background processing, Claude API, Mem0 for memory, Playwright for browser automation. Built as a PWA so the merchant installs it once from the browser and forgets about it.

Free scan. 60 seconds. No credit card.

### JEUDI 16/04 — 21h — Deep dive App Impact Scanner

Every Shopify app injects code into your store. JavaScript, CSS, Liquid snippets. The average store runs 14 of them.

The problem is that no tool tells the merchant which app is doing what. You know your store is slow. You don't know why.

That's what the App Impact Scanner solves. It traces every script, stylesheet, and liquid snippet back to the app that injected it, then measures the actual weight in bytes and rendering impact in milliseconds.

The technical challenge was attribution. Apps inject code in three completely different ways and each one needs a different detection method.

The straightforward case is apps that use Shopify's ScriptTag API. Those are registered and traceable. You can map them instantly.

Then you have apps that modify theme files during install. They add liquid snippets, CSS blocks, JavaScript directly into your theme.liquid or other template files. After install those look like native theme code. The only way to catch them is to compare against a clean baseline snapshot of the theme before the app was installed.

The third type is inline scripts with no source file. No ScriptTag registration, no theme file modification. Just raw JavaScript dumped into the page at render time. For those I built a fingerprinting system that matches inline script patterns against known app signatures.

I tested this on a store running 14 apps. Three of them were responsible for 80% of the total code weight. One page builder alone was injecting 340KB of unminified JavaScript on every page, including pages where the builder wasn't even used.

The merchant gets a ranked list with app name, code weight, rendering impact, and a recommendation. One tap to see exactly which files each app added to the theme.

-----

## NOTES

Batch réalisé dimanche 12/04. Semaine de lancement StoreMD. Launch day = mardi 14/04.
Posts alignés avec R (15h, angle business/data) et F2 (14h, angle studio/produit).
F publie à 13h (technique/builder), 1h avant F2, 2h avant R.
LinkedIn F à 21h, séparé de R LinkedIn à 17h30.
[LINK] = URL StoreMD à insérer en reply, pas dans le corps du tweet.
