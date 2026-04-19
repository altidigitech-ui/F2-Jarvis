# POSTS VALIDÉS F — Semaine du 06/04/2026 au 12/04/2026

**Usage :** Textes finaux prêts à copier-coller dans le scheduler. Archivé le dimanche.
**Statut :** Tous schedulés.

-----

## TWITTER

### LUNDI 06/04 — 13h — Behind the build (post-mortem LD → StoreMD)

leak detector got ~8 signups in 3 weeks. 0 revenue. the tool worked fine. the target was wrong.

I was pitching landing page audits to devs and indie hackers. turns out they don't pay for that.

so I'm rebuilding it. same scanning engine, completely different product. shopify merchants this time. new name, new domain, shipping next monday.

sometimes the best code you write is the code you point at a different audience

### MARDI 07/04 — 13h — Pourquoi technique (apps Shopify)

a shopify store with 14 apps installed loads 2.8 to 7 seconds slower than it should.

every app injects its own javascript. most of them don't clean up when you uninstall them either. I scraped 380+ reviews of popular shopify apps and the same complaints show up everywhere. code left behind, broken theme files, apps charging you months after you removed them.

nobody tells the merchant this is happening. that's what I'm building the scanner for

### MERCREDI 08/04 — 13h — Quick fix (script tags)

if your shopify store loads in 4+ seconds, open your page source and ctrl+F for <script

count them. if there's more than 8 you found your problem. each one is an app injecting javascript that runs before your page even shows up.

I tested this on a store last week, 14 scripts, 3+ seconds just from app bloat

### JEUDI 09/04 — 13h — Behind the build (stateless → stateful)

turning a landing page auditor into a shopify store health agent. here's what actually changes under the hood:

the old version took a URL, scraped it, ran 1 claude call across 8 categories, returned a score. one shot.

the new version connects to the shopify API, runs nightly scans, compares scores over time, and sends push notifications when something breaks.

biggest technical shift: going from stateless (scan once, forget) to stateful (track everything, alert on regression). completely different data model

### VENDREDI 10/04 — 13h — Builder story (PWA)

building this as a PWA and not a native app. merchants don't want another app to download. they want something that works on their phone without thinking about it.

service worker handles the offline mode. push notifications work on android, ios is still weird about it but getting better.

the whole point is the merchant installs it once and forgets about it until something goes wrong with their store. then it pings them

-----

## LINKEDIN

### LUNDI 06/04 — 21h — Post-mortem LD

I launched a product 3 weeks ago.
8 signups. Zero revenue.

The tool worked. The scanning engine analyzed 8 categories in 60 seconds and returned a score with actionable fixes.

The problem was the target. I was pitching landing page audits to developers and indie hackers. They looked at the report, said "cool" and moved on. None of them paid.

So I went back to the data. 50+ Reddit threads. 500+ comments from Shopify merchants. 380+ app reviews scraped from 4 popular Shopify apps.

The same patterns showed up everywhere. Apps injecting JavaScript that slows stores down. Apps leaving broken code behind after uninstall. Apps charging monthly fees months after removal. Merchants losing thousands in revenue from problems they can't even see.

That's a real problem with real money attached to it.

I'm keeping the scanning engine and rebuilding everything else around Shopify merchants. New name, new domain, new target. Shipping next Monday.

The hardest part of building isn't the code. It's admitting your first version pointed at the wrong audience.

### JEUDI 09/04 — 21h — Deep dive impact apps Shopify

Every Shopify app you install injects its own JavaScript into your store.

14 apps is the average. That's 14 separate network requests before your page even starts rendering. Each one adds 200 to 500 milliseconds.

But the real issue isn't install. It's uninstall.

I scraped 380+ reviews from Avada, PageFly, Shogun, and Privy. The same complaint appears in all four. "Code staying behind after uninstall." "It bricked my site." "Like a virus."

One merchant lost 8 years of SEO because an email app deleted their collections overnight. Another got charged for 6 years after uninstalling.

Nobody monitors this. There's no dashboard that tells you "this app updated 2 hours ago and your mobile score dropped from 78 to 64."

That's what I'm building. An agent that scans nightly, compares scores over time, and alerts you before you notice the revenue drop.

The data model is the hard part. Going from a stateless one-shot audit to a stateful system that tracks history and detects regressions across every app, every theme change, every update.
