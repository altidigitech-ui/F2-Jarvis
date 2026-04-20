# CROSS-ENGAGEMENT TRACKER F — Semaine du 13/04/2026 au 19/04/2026

**Usage :** Tracker quotidien du cross-engagement F sur les posts R et F2. Rempli chaque jour. Archivé le dimanche.
**Règle :** Reply dans les 15 min après publication. OBLIGATOIRE.
**Contexte :** SEMAINE LAUNCH StoreMD. Chaque cross-engagement amplifie le lancement. CRITIQUE.
**Replies complètes : voir section REPLIES en bas de ce fichier.**

-----

## LUNDI 13/04

|Post      |Heure pub|Sujet|F a reply ?|Heure reply F|Angle technique utilisé|
|----------|---------|-----|-----------|-------------|-----------------------|
|Tweet F2 14h|14h|Teaser studio : "43 features, 5 modules, one AI agent"|✅ Batché|Post-pub|Memory system = la partie la plus longue. Faire tourner 43 features ≠ faire en sorte que l'agent se souvienne entre scans.|
|Tweet R 15h|15h|Teaser data : "530+ reviews, 5 problems, tomorrow"|✅ Batché|Post-pub|530+ reviews confirment ce que le code montrait : apps nettoient pas, JS mort encore là des mois après désinstall.|

-----

## MARDI 14/04 — LAUNCH DAY 🔴

|Post      |Heure pub|Sujet|F a reply ?|Heure reply F|Angle technique utilisé|
|----------|---------|-----|-----------|-------------|-----------------------|
|Tweet F2 14h|14h|LAUNCH : 5 modules détaillés, free scan, $0 MRR|✅ Batché|Post-pub|Browser automation : Playwright charge le store en vrai vs API. Le gap entre les deux = où se cachent les vrais problèmes.|
|Tweet R 15h|15h|LAUNCH : 530+ reviews, 5 douleurs, agentic readiness, CTA|✅ Batché|Post-pub|Quick check : metafields vides dans shopify admin = invisible pour ChatGPT/Copilot. Scanner automatise sur tout le catalogue.|
|LinkedIn R 17h30|17h30|LAUNCH storytelling pivot LD → StoreMD|✅ Batché|Post-pub|Même engine LD lancé sur Shopify = 10x plus de problèmes qu'une landing page SaaS. Surface d'attaque massivement plus grande.|

-----

## MERCREDI 15/04

|Post      |Heure pub|Sujet|F a reply ?|Heure reply F|Angle technique utilisé|
|----------|---------|-----|-----------|-------------|-----------------------|
|Tweet F2 14h|14h|4 exclusivités mondiales (Agentic, Visual, Real User, Accessibility)|✅ Batché|Post-pub|Visual store test : screenshots seuls suffisent pas, diff pixel-level entre scans + moteur de comparaison par-dessus Playwright.|
|Tweet R 15h|15h|Provocateur : agentic readiness, invisible ChatGPT|✅ Batché|Post-pub|Score moyen 34/100 sur 3 stores test. Killer = format descriptions. Humains vs bots : "beautiful bag" vs specs structurées.|

-----

## JEUDI 16/04

|Post      |Heure pub|Sujet|F a reply ?|Heure reply F|Angle technique utilisé|
|----------|---------|-----|-----------|-------------|-----------------------|
|Tweet F2 14h|14h|Question communauté : app count, speed score, theme code|✅ Batché|Post-pub|Quick diagnostic : incognito, view source, ctrl+F script. Au-dessus de 8 = app bloat. Scan détaille par app.|
|Tweet R 15h|15h|Storytelling merchant 14 apps → 6.2s → 1.8s, App Impact Scanner|✅ Batché|Post-pub|Attribution technique : 14 apps ≠ "lent". Scanner trace chaque script à son app source. 3 apps = 80% des dégâts.|
|LinkedIn R 17h30|17h30|Storytelling app bloat + 43 features overview|✅ Batché|Post-pub|43 features en 1 app au lieu de 5 = cohérence message anti-app-bloat. L'agent gère la complexité, pas le merchant.|

-----

## VENDREDI 17/04

|Post      |Heure pub|Sujet|F a reply ?|Heure reply F|Angle technique utilisé|
|----------|---------|-----|-----------|-------------|-----------------------|
|Tweet F2 14h|14h|Build in public : honest numbers semaine 1 [X]|✅ Batché|Post-pub|Préfère $0 MRR avec scanner solide que chiffres gonflés. Diff engine + memory layer solides. Résultats loggés.|
|Tweet R 15h|15h|Question qui tue : ghost billing, 6 ans de charges|✅ Batché|Post-pub|Raison architecturale : billing Shopify ≠ app. Uninstall retire l'app mais pas le billing. Webhook fail = charge continue.|

-----

## SCORE SEMAINE

|Métrique                                  |Résultat|
|------------------------------------------|-------:|
|Posts R + F2 publiés cette semaine        |12/12   |
|Cross-engagement F complété               |12/12   |
|Taux de complétion                        |100%    |
|Délai moyen reply F après publication R/F2|Batché  |

-----

## REPLIES F — TEXTES COMPLETS (copier-coller)

### LUNDI 13/04

**→ Sur tweet F2 14h (teaser studio) :**

the memory system was the part that took the longest. getting 43 features to run was one thing. getting the agent to remember what it found last time and only flag what actually changed? completely different problem. spent more time on that than on the scanners themselves

**→ Sur tweet R 15h (teaser data) :**

the 530+ reviews confirmed something I kept seeing in the code. apps don't clean up after themselves. I scraped theme files from stores that had uninstalled apps months ago and the dead javascript was still there, still loading on every page. tomorrow the scanner goes live and merchants can finally see it for themselves

### MARDI 14/04 — LAUNCH DAY

**→ Sur tweet F2 14h (launch 5 modules) :**

the browser automation module is the one I'm most curious to see in the wild. everything else uses API data. but the visual store test and real user simulation actually load the store in playwright and measure what the customer sees. API says your store is fine, playwright says the checkout takes 8 seconds on mobile. that gap is where the real problems hide

**→ Sur tweet R 15h (launch 530+ reviews) :**

if you want to see the agentic readiness score before running the full scan, check your products in shopify admin. click any product, scroll to metafields. if most of them are empty your store is basically invisible to chatgpt and copilot right now. the scanner automates this across your entire catalog in 60 seconds

**→ Sur LinkedIn R 17h30 (launch storytelling pivot) :**

The pivot was hard to accept but the technical proof was impossible to ignore. I ran Leak Detector's scanning engine on a Shopify store instead of a landing page. The amount of issues it found in 60 seconds was 10x what it found on any SaaS landing page. Dead scripts from uninstalled apps, permissions creep, billing mismatches. The engine was the same. The surface area was just massively bigger on Shopify.

### MERCREDI 15/04

**→ Sur tweet F2 14h (4 exclusivités) :**

the visual store test took longer than expected because screenshots alone aren't enough. you need pixel-level diff between two scans to catch what actually changed. an app update shifts a button 3 pixels on mobile and suddenly your checkout flow breaks. catching that programmatically required building a comparison engine on top of playwright, not just taking screenshots

**→ Sur tweet R 15h (provocateur agentic readiness) :**

ran the agentic readiness scanner on 3 test stores yesterday. the average score was 34 out of 100. the main killer was description format. merchants write descriptions for humans browsing a page but AI agents need structured specs they can extract and compare. "beautiful handcrafted leather bag" means nothing to a bot. "material: full-grain leather, dimensions: 38x28x12cm, weight: 890g" is what gets you into chatgpt shopping results

### JEUDI 16/04

**→ Sur tweet F2 14h (question communauté) :**

quick way to check before running the scan: open your store in incognito, right click, view page source, ctrl+F for script. count the results. that's how many scripts load before your page even renders. anything above 8 and you've probably got app bloat. the scan breaks it down by app so you know exactly which ones to look at

**→ Sur tweet R 15h (storytelling merchant 14 apps) :**

the tricky part with that kind of diagnostic is attribution. you can't just say "14 apps = slow." some apps add 50ms, others add 800ms. the scanner traces every script and stylesheet back to its source app and ranks by actual rendering impact. on that store 3 apps out of 14 were causing 80% of the damage. the other 11 were basically harmless

**→ Sur LinkedIn R 17h30 (app bloat + 43 features) :**

The 43 features sound like a lot but they're organized into 5 modules that each solve a different problem. The technical reason we kept them in one app instead of splitting into 5 separate tools is consistency with our own message. We tell merchants they have too many apps slowing their store. Shipping 5 separate apps would have been contradictory. One install, one scan, one dashboard. The agent handles the complexity, not the merchant.

### VENDREDI 17/04

**→ Sur tweet F2 14h (build in public honest numbers) :**

whatever the numbers are this week they're real. I'd rather ship at $0 MRR with a scanner that actually works than inflate numbers with a broken product. the diff engine and the memory layer are solid. if the scans are accurate and useful the conversions will follow. if they're not we'll know exactly what to fix because every scan result is logged

**→ Sur tweet R 15h (ghost billing 6 ans) :**

the reason this happens is architectural. shopify billing is a separate system from the app itself. when you click "uninstall" shopify removes the app but the billing subscription is a different API call that the app developer has to trigger. if their uninstall webhook fails or doesn't exist the charge just keeps going. the ghost billing detector cross-references both systems and catches the mismatch
