# StoreMD — 10 TikTok Videos (Prompts Claude Design) v3

> **Suite logique de la v2 (V11 → V20).** Visuellement et narrativement orthogonal à la v2 : zéro répétition de la formule "hook texte + liste features + CTA". Ici : POV merchant, screen recording natif de l'app, datavisualization brutale, comparaisons concrètes, démos poétiques.
>
> **Mode d'emploi :** Copie chaque prompt dans une conversation Claude.ai séparée. Claude génère un artifact React animé (auto-play + loop) que tu screen-records (QuickTime/OBS/iPhone). Importe dans CapCut, ajoute musique trending TikTok, publie.
>
> **Compte :** @foundrytwo
> **Langue :** Anglais — international Shopify merchants
> **URL CTA principal :** storemd.vercel.app
> **URL UTM :** `storemd.vercel.app?utm_source=tiktok&utm_medium=organic&utm_campaign=v3_oct26`
> **Beta offer (sur 5 des 10) :** DM "BETA" → @StoreMD → CODE: TIKTOK10
>
> **Format :** Vertical 9:16, ratio 390x844px. Auto-play, loop infinie.

---

## PALETTE & TYPOGRAPHIE — IMPORTÉES DU REPO STOREMD

À utiliser STRICTEMENT pour cohérence avec le produit live :

```
COULEURS REPO (frontend/tailwind.config.ts + globals.css) :

Brand
- storemd-primary   : #2563eb  (bleu logo, rare en vidéo)
- accent cyan       : #06b6d4  (CTA, glow — couleur dominante en vidéo)
- accent cyan light : #22d3ee  (gradient score)
- accent teal       : #2dd4bf  (gradient score)
- mint MD wordmark  : #86efac  (le "MD" du logo "StoreMD")

Backgrounds (dark / landing)
- ink-950           : #050507
- ink-900           : #0a0a0f  ← fond dominant en vidéo
- ink-800           : #0d1117
- glass             : rgba(255,255,255,0.04) avec border rgba(255,255,255,0.10)

Backgrounds (light / dashboard)
- bg-card           : #ffffff
- bg-secondary      : #f9fafb
- bg-muted          : #f3f4f6
- text-primary      : #111827
- text-secondary    : #6b7280
- border-default    : #e5e7eb

Severity (issues)
- critical          : #dc2626  (bg-red-100/text-red-700 + border red-200)
- major             : #ea580c  (bg-orange-100/text-orange-700)
- minor             : #ca8a04  (bg-yellow-100/text-yellow-700)
- info              : #2563eb  (bg-blue-50/text-blue-700)

Score colors (par valeur)
- excellent (90+)   : #16a34a
- good (75-89)      : #65a30d
- warning (60-74)   : #ca8a04
- poor (40-59)      : #ea580c
- critical (<40)    : #dc2626

Typography
- Display       : "Outfit", system-ui, sans-serif (titres, scores, big numbers)
- Body          : "Plus Jakarta Sans", system-ui, sans-serif (texte courant)
- Mono          : "JetBrains Mono", "Fira Code", monospace (URLs, code, terminal)

Glow / shadow
- shadow-glow   : 0 0 40px rgba(6,182,212,0.35)
- score glow    : drop-shadow(0 0 8px rgba(6,182,212,0.6))
```

**Wordmark logo :** texte "Store" en blanc + "MD" en `#86efac`. Police Outfit bold. Toujours ensemble. Toujours aux mêmes proportions.

---

## SOMMAIRE DES 10 VIDÉOS

| # | Titre | Catégorie | Levier émotionnel | Durée | CTA |
|---|---|---|---|---|---|
| V11 | "POV: An app has been charging you 8 months after uninstall" | POV merchant | Reconnaissance + colère | 22s | Vente live |
| V12 | "POV: ChatGPT just refused to recommend your store" | POV merchant | FOMO IA + curiosité | 24s | Beta offer |
| V13 | "Watch a real scan. Sound on." | Screen recording natif | Preuve + transparence | 30s | Beta offer |
| V14 | "12 issues fixed in 22 seconds. ASMR." | Screen recording natif | Satisfaction / cleanup | 24s | Vente live |
| V15 | "While you watched this, your store lost $0.72" | Data horror | Urgence personnelle | 18s | Beta offer |
| V16 | "The code graveyard inside your store" | Data horror | Peur viscérale | 22s | Vente live |
| V17 | "Same store. 47 days apart. Nobody told them." | Comparison concrète | Preuve sociale + FOMO | 22s | Vente live |
| V18 | "530 reviews. One wall. Sound up." | Comparison concrète | Validation collective | 26s | Beta offer |
| V19 | "We don't read your store. We use it." | Poetic / premium | Curiosité + premium | 22s | Vente live |
| V20 | "Your health score has 20 invisible questions" | Poetic / premium | Curiosité diagnostique | 26s | Beta offer |

---

# CATÉGORIE 1 — POV MERCHANT

---

## VIDÉO 11 — "POV: An App Has Been Charging You 8 Months After Uninstall"

**Hook :** Reconnaissance brutale du pain merchant + révélation chiffrée
**Durée :** 22 secondes
**CTA :** Vente live (storemd.vercel.app)

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop infinie).

CONTEXTE PRODUIT :
StoreMD a une feature exclusive appelée "Ghost Billing Detector". Les apps Shopify continuent souvent de facturer un merchant après désinstallation (faille du système Shopify Billing : désinstaller l'app ne cancel pas l'abonnement). Reviews terrain : "charged 6 months after I uninstalled" (Privy, 40+ reviews). StoreMD scanne les abonnements actifs vs apps installées et alerte. Un merchant moyen perd 60-200$/mois en facturation fantôme silencieuse.

STYLE VISUEL :
- Format : POV — caméra à la première personne du merchant. Comme si le viewer ouvrait son propre Shopify admin.
- Première moitié : reproduction stylisée d'un écran "Shopify Billing" (light theme, blanc/gris #f9fafb, texte #111827, font Plus Jakarta Sans).
- Deuxième moitié : transition vers l'app StoreMD (dark theme #0a0a0f, accent cyan #06b6d4).
- Curseur visible qui scrolle/clique (style macOS).

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK SILENT
- Plein écran noir #0a0a0f
- Texte centré bold blanc, font Outfit, taille 48px :
  "POV:"
- Cut rapide (200ms) :
  "you check your billing"

SCÈNE 2 (2-12s) — SHOPIFY BILLING SIMULÉ (light theme)
- Transition wipe vers un écran fond #f9fafb
- Header en haut : un faux header type Shopify (ne PAS utiliser le vrai logo Shopify ; juste "Store admin" en texte mono gris clair, et 3 dots de fenêtre rose/amber/emerald comme dans DashboardMockup.tsx du repo)
- Titre de page (font Outfit, 20px, #111827) : "Subscriptions"
- Liste verticale d'abonnements (chaque ligne = bordure border-default #e5e7eb, padding 16px, fond blanc) :

  Ligne 1 : "Theme Shopify Plus" — "$39/mo" — date "Active since Jan 2024"
  Ligne 2 : "Klaviyo Email" — "$45/mo" — "Active since Mar 2024"
  Ligne 3 : "Privy Popup" — "$29/mo" — "Active since 2023"  ← curseur s'arrête ici
  Ligne 4 : "Reviews+" — "$15/mo" — "Active since Jan 2025"
  Ligne 5 : "Plug In SEO" — "$10/mo" — "Active since Feb 2024"

- Le curseur scrolle doucement, s'arrête sur ligne 3 (Privy)
- Ligne 3 se highlight (background passe à #fef3c7 jaune clair, bordure orange #ea580c, scale 1.02)
- Pop-up tooltip qui apparaît au-dessus, fond rouge #dc2626, texte blanc :
  "Privy was uninstalled 8 months ago"
- Counter rouge en bas qui s'incrémente en temps réel : "$0 wasted" → "$232 wasted" en 2 secondes
- Sub-texte petit : "$29 × 8 months = $232"

SCÈNE 3 (12-13s) — TRANSITION
- Cut net (pas de fade)
- Plein noir 200ms
- Texte centré blanc 36px : "How would you know?"

SCÈNE 4 (13-19s) — STOREMD DETECTS IT (dark theme — reproduction repo)
- Fond #0a0a0f
- En haut, en mono 11px gris #6b7280 : "storemd.app / health"
- À côté à droite, badge cyan glassmorphism (border rgba(255,255,255,0.10), bg rgba(255,255,255,0.05), text #67e8f9, padding 4px 10px, rounded-full, font 10px) :
  "✦ Live scan"
- Card fond glass (bg rgba(255,255,255,0.04), border rgba(255,255,255,0.10), rounded-xl, padding 16px) qui slide-in depuis la droite :
  - Severity chip rouge en haut (bg #fee2e2, text #b91c1c, padding 2px 8px, rounded-full, text 10px bold uppercase) : "CRITICAL"
  - Auto-fix chip cyan à côté (bg #cffafe, text #0e7490, icône Zap) : "AUTO-FIX"
  - Titre (font Outfit 14px bold blanc) : "Ghost subscription: Privy"
  - Sub (text-slate-400 11px) : "Uninstalled 8 months ago. $232 wasted."
  - Bouton "Cancel guide →" (bg cyan #06b6d4, text noir, font Outfit bold 12px, rounded-lg, padding 6px 12px)
- Animation : la card a un glow cyan léger qui pulse (box-shadow 0 0 30px rgba(6,182,212,0.3))

SCÈNE 5 (19-22s) — KILL SHOT + CTA
- La card fade
- Texte centré blanc font Outfit 32px bold :
  "We find them. We cancel them."
  "Average merchant: $1,800/year saved."
- Logo StoreMD en bas (texte "Store" blanc + "MD" #86efac, font Outfit 24px bold)
- Sous-texte petit : "storemd.vercel.app"

ANIMATION GÉNÉRALE :
- Curseur macOS visible (image SVG d'un pointer noir avec contour blanc), animé en CSS avec easing ease-out
- La transition Shopify→StoreMD est un cut sec, pas un fade (rythme TikTok)
- Le counter $232 wasted utilise requestAnimationFrame pour incrémenter en 2 secondes
- La card StoreMD entre avec spring (Framer Motion : initial x:300, animate x:0, type:"spring", stiffness:200, damping:25)
- Loop : retour à scène 1 après scène 5
- Pas de musique embed — l'utilisateur ajoute en post-prod (suggéré : son satisfying type "ka-ching" sur le moment du highlight)

LIBRAIRIES :
- React + Framer Motion pour les animations (déjà disponible dans Claude.ai)
- Lucide-react pour les icônes (Zap, AlertTriangle)
- Police : Inter par défaut OK si Outfit/Plus Jakarta Sans pas dispo
```

---

## VIDÉO 12 — "POV: ChatGPT Just Refused to Recommend Your Store"

**Hook :** FOMO IA + révélation visuelle + résolution
**Durée :** 24 secondes
**CTA :** Beta offer

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
Depuis mars 2026, Shopify a lancé les Agentic Storefronts. Les clients achètent via ChatGPT, Copilot, Gemini, Perplexity. Mais un store sans GTIN, descriptions structurées, metafields remplis, et schema markup est INVISIBLE pour ces agents. StoreMD est la seule app Shopify qui scanne ça (Agentic Readiness Score /100, page /dashboard/agentic du repo) et qui FIXE les problèmes automatiquement (GTIN, HS codes, metafields, LLMs.txt).

STYLE VISUEL :
- Format : POV merchant qui voit le résultat sur une interface chat IA générique (PAS le logo OpenAI/ChatGPT — juste un design "AI chat" générique : bulles rondes, background gris foncé #1f2937, avatar IA simple).
- Reproduction de la page /dashboard/agentic du repo (light theme, fond blanc, score circle).
- Palette : noir #0a0a0f, blanc, accent cyan #06b6d4, vert #16a34a pour les checks pass, rouge #dc2626 pour les fails.

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK
- Plein écran noir
- Texte font Outfit 56px blanc bold : "POV:"
- Cut → "ChatGPT just bought yoga mats."
- 200ms → "Not from your store."

SCÈNE 2 (2-9s) — SIMULATION CHAT IA
- Fond #1f2937 (style ChatGPT-like dark mais générique)
- Bulle utilisateur en haut à droite (background bleu-gris #374151, rounded-2xl, max-width 80%, font 14px) :
  "Find me a premium yoga mat under $80"
- Effet de typing dots (3 points qui sautent) pendant 600ms
- Bulle IA à gauche (background #2d3748, avatar petit cercle gris à gauche) qui se remplit lettre par lettre :
  "Sure! Top picks:"
- Puis 3 cartes produit qui slide-in (card fond plus clair #4a5568, rounded-xl, padding 12px, bordure subtile) :
  Card 1 : "1. ZenMat Pro — $75 — ★★★★★" + faux thumbnail rectangulaire
  Card 2 : "2. EcoFlow Mat — $68 — ★★★★☆"
  Card 3 : "3. BodyAlign Premium — $72 — ★★★★★"
- Cut sec → texte rouge #ef4444 qui apparaît en bas de la chat, taille 18px bold :
  "Your store? Not here."
- Le mot "Not" pulse 2 fois (scale 1 → 1.1 → 1)

SCÈNE 3 (9-12s) — POURQUOI (transition)
- Wipe vertical vers fond noir #0a0a0f
- Texte centré font Outfit 32px blanc :
  "AI shopping orders grew 15× in 2025."
  "Your store has to be readable."

SCÈNE 4 (12-19s) — REPRO PAGE /dashboard/agentic (LIGHT THEME)
- Transition wipe vers fond blanc #ffffff (style dashboard StoreMD light)
- Header de page : "AI Ready" en font Outfit 24px bold #111827, à gauche
- Card centrale (rounded-2xl, border #e5e7eb, padding 24px) :
  - Sub-texte gris : "Your store is"
  - Score : "34%" en font Outfit 56px bold, couleur #ea580c (poor)
  - Sous-texte : "ready for AI shopping agents"
  - Petit texte : "Shopify now sells through ChatGPT, Copilot, Gemini."
- Liste de 6 readiness checks dessous (chacun ligne séparée par border-bottom #f3f4f6, padding 12px) :

  ✗ rouge : "GTIN/Barcode present" — "Fail"
  ✗ rouge : "Key metafields filled (material, dimensions)" — "Fail"
  ✗ rouge : "Structured product descriptions" — "Fail"
  ⚠ orange : "Schema markup on product pages" — "Partial"
  ✗ rouge : "Google product categories assigned" — "Fail"
  ✓ vert : "Published to Shopify Catalog" — "Pass"

- Animation : un scan cyan horizontal traverse la liste (gradient cyan transparent, opacity 0.3, height 4px, balaye en 1.5s)
- Après le scan, les ✗ se transforment en ✓ verts (animation séquentielle, 200ms d'écart entre chaque)
- Le score "34%" morphe en "94%" avec animation (couleur change de #ea580c → #16a34a en sync)

SCÈNE 5 (19-22s) — RETOUR CHAT IA
- Cut vers la même interface chat
- Même question : "Find me a premium yoga mat under $80"
- Réponse IA :
  "Sure! Top picks:"
  Card 1 (highlight cyan border, glow) : "1. YOUR STORE — $79 — ★★★★★"  ← featured, "Your Store" en cyan #06b6d4
  Card 2 : "2. ZenMat Pro — $75"
  Card 3 : "3. EcoFlow Mat — $68"
- Texte qui apparaît en bas en cyan : "Now you're #1."

SCÈNE 6 (22-24s) — CTA BETA OFFER
- Fond noir
- Texte centré font Outfit :
  "FREE Agentic Readiness Scan"  (32px blanc bold)
  "ONLY 10 SPOTS"  (24px rouge #ef4444, pulse animation)
  "DM 'BETA' to @StoreMD"  (18px blanc)
  "Code: TIKTOK10"  (16px cyan #06b6d4 mono font JetBrains Mono)
- Logo StoreMD en bas (Store blanc + MD #86efac)

ANIMATION GÉNÉRALE :
- La frappe de la question chat est réaliste (delays variables 50-120ms par char, pas linéaire)
- Le scan cyan utilise un keyframe CSS qui glisse de top:0 → top:100% en 1.5s
- Le morph 34% → 94% utilise un counter useState avec setInterval (incrémenté de 1 par frame)
- L'apparition "YOUR STORE" en featured a un effet de glow qui pulse (box-shadow 0 0 30px rgba(6,182,212,0.5))
- "ONLY 10 SPOTS" pulse à 1Hz (scale 1 → 1.05)
- Loop auto

LIBRAIRIES :
- React + useState + useEffect pour les counters et les morphs
- Framer Motion pour les transitions inter-scènes
- Lucide-react : Check, X, AlertTriangle pour les icônes des readiness checks
```

---

# CATÉGORIE 2 — SCREEN RECORDING NATIF

> Reproduction pixel-perfect de l'app StoreMD du repo. Aucun texte marketing pendant la durée principale. Le produit fait la pub.

---

## VIDÉO 13 — "Watch a Real Scan. Sound On."

**Hook :** Honnêteté radicale — on filme l'app, point.
**Durée :** 30 secondes
**CTA :** Beta offer

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
StoreMD est une app Shopify avec une UI dashboard light theme. Le flow utilisateur est : merchant clique "Scan now" → ScanProgress component apparaît avec barre + 5 steps + facts qui rotent → à 100% le résultat s'affiche : ScoreHero (cercle SVG avec score) + IssuesList (cards de problèmes détectés). On reproduit ce flow EXACTEMENT comme dans le repo (composants ScanProgress.tsx, ScoreHero.tsx, IssueCard.tsx).

STYLE VISUEL :
- LIGHT THEME (différent des autres vidéos qui sont dark) — c'est la VRAIE UI dashboard
- Fond #f9fafb (bg-secondary du repo)
- Cards : fond blanc #ffffff, border #e5e7eb, rounded-lg, shadow-sm
- Police : Plus Jakarta Sans (body), Outfit (numbers/titres)
- Accent : bleu storemd-primary #2563eb (pas cyan ici — c'est la couleur dashboard, pas landing)
- Texte primaire : #111827, secondaire : #6b7280

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — TITLE CARD MINIMAL
- Fond noir #0a0a0f
- Texte centré font Outfit 36px blanc :
  "A real StoreMD scan."
  "30 seconds. No edits."

SCÈNE 2 (2-22s) — SCAN PROGRESS (REPRO EXACTE ScanProgress.tsx)
- Cut vers fond #f9fafb
- Card centrée (max-width 320px, fond blanc, border #e5e7eb, rounded-lg, shadow-sm, padding 32px) :

  Header :
  - Icône Loader2 spin bleu #2563eb (h-5 w-5)
  - À côté : "Scanning your store..." (font Outfit 18px bold #111827)
  - En dessous : "Detecting residual code..." (text-xs #6b7280)

  Barre de progression :
  - Rail : h-2 bg-gray-100 #f3f4f6 rounded-full
  - Fill : bg #2563eb, width animée de 5% à 100% en 18 secondes (ease-in-out)
  - Counter à droite : "5%" → "100%" en sync (font 12px #6b7280)

  Liste de 5 steps (chacun avec icône + label, font 14px) :
    Step 1 (à 0-3.6s, marqué "done" à 20%) : "Theme analyzed" — icône CheckCircle2 vert #16a34a quand done, sinon Loader2 spin gris
    Step 2 (3.6-7.2s, done à 40%) : "Apps detected"
    Step 3 (7.2-10.8s, done à 60%) : "Products scanned"
    Step 4 (10.8-14.4s, done à 80%) : "Checking app impact on speed"
    Step 5 (14.4-18s, done à 95%) : "Detecting residual code"

  Quand un step passe done : text passe de #9ca3af à #111827, icône morph de Loader2 (gris) → CheckCircle2 (vert), avec un léger scale bounce (1 → 1.15 → 1 en 200ms)

  Card "Did you know?" en dessous (bg #eff6ff bleu très clair, padding 12px, rounded-md, icône Lightbulb à gauche bleue) :
    Le texte change toutes les 3 secondes parmi :
    - "The average Shopify store has 14 apps, each adding 200-500ms to load time."
    - "73% of Shopify stores have residual code from uninstalled apps."
    - "AI shopping agents (ChatGPT, Copilot) can now buy directly from Shopify stores."
    - "Stores under 2s convert 2x better than stores at 4s."
    - "EU Accessibility Act fines start at €10,000."
    Transition fade 300ms entre chaque fact.

SCÈNE 3 (22-28s) — RÉSULTAT (REPRO ScoreHero.tsx + 3 IssueCards)
- Quand la barre atteint 100%, transition fade 400ms vers l'écran résultat
- Card ScoreHero (max-width 360px, fond blanc, border #e5e7eb, rounded-2xl, padding 24px, shadow-sm) :
  - À gauche : ScoreCircle SVG (h-40 w-40, viewBox 0 0 128 128, rotate -90)
    - Background circle : cx 64, cy 64, r 56, stroke #f3f4f6, strokeWidth 10
    - Foreground circle : même params, stroke=#ea580c (couleur poor car score 62), strokeDasharray = circumference, strokeDashoffset animé de circumference vers (circumference - (62/100) × circumference) en 1.2s ease-out
    - Au centre du cercle : nombre "62" en font Outfit 36px bold, couleur #ea580c (animé de 0 à 62 en sync)
    - Sous le nombre : "/ 100" en text-xs #6b7280
  - À droite :
    - "Store Health Score" (font Outfit 16px bold #111827)
    - Trend pill : "↓ -8 since last week" (bg #fee2e2, text #b91c1c, rounded-full, padding 2px 8px, font 11px bold)
    - 2 lignes : "📱 Mobile 58" + "🖥️ Desktop 67" avec couleurs score
    - "Last scan: just now" (#6b7280 11px)

- En dessous, 3 IssueCards qui slide-in depuis la droite avec stagger 250ms (animation Framer Motion, initial x:50 opacity:0, animate x:0 opacity:1) :

  IssueCard 1 (border-left 4px #dc2626) :
    Icône AlertTriangle rouge à gauche
    Severity chip "CRITICAL" (bg #fee2e2 text #b91c1c)
    Auto-fix chip "AUTO-FIX" (bg #cffafe text #0e7490, icône Zap)
    Titre : "18 apps installed — 3 unused"
    Impact : "Est. +1.2s mobile load time"
    Fix description : "Remove unused apps to gain 1.2s of mobile speed."
    Bouton "Fix →" à droite (bg #2563eb text white)

  IssueCard 2 (border-left 4px #ea580c) :
    Icône AlertCircle orange
    Chip "MAJOR"
    Titre : "Privy still billing $29/mo"
    Impact : "Uninstalled 8 months ago. $232 wasted."
    Bouton "Cancel guide →"

  IssueCard 3 (border-left 4px #ca8a04) :
    Icône Info jaune
    Chip "MINOR" + "AUTO-FIX"
    Titre : "Alt text missing on 42 product images"
    Impact : "SEO + accessibility regression"
    Fix : "Generate alt text with AI."
    Bouton "Fix →"

SCÈNE 4 (28-30s) — END CARD BETA OFFER
- Fade vers fond noir
- Texte centré font Outfit :
  "WE'LL SCAN YOUR STORE — FREE"  (28px blanc bold)
  "ONLY 10 SPOTS"  (22px rouge #ef4444, pulse 1Hz)
  "DM 'BETA' to @StoreMD"  (16px blanc)
  "Code: TIKTOK10"  (14px cyan mono)
- Logo StoreMD bottom (Store blanc + MD #86efac)

ANIMATION GÉNÉRALE :
- TOUTE la scène 2 doit ressembler à une VRAIE capture d'écran de l'app — zéro stylisation marketing, zéro overlay
- La barre de progression utilise window.requestAnimationFrame pour animer linéairement (avec des micro-pauses aux paliers de step pour réalisme)
- Les facts rotent avec setInterval(3000) + opacity transition
- Le ScoreCircle utilise framer-motion pour le strokeDashoffset
- Les IssueCards utilisent stagger via framer-motion (variants + initial/animate)
- Loop auto

NOTE IMPORTANTE :
Cette vidéo doit ressembler à un VRAI screen-record d'une vraie app. PAS du marketing. PAS de glow excessif. Light theme propre. Le produit vend lui-même.

LIBRAIRIES :
- React + framer-motion + lucide-react
- Icons : Loader2, CheckCircle2, Lightbulb, AlertTriangle, AlertCircle, Info, Zap, ArrowDown, Smartphone, Monitor
```

---

## VIDÉO 14 — "12 Issues Fixed in 22 Seconds. ASMR."

**Hook :** Satisfaction visuelle pure (cleanup video pattern)
**Durée :** 24 secondes
**CTA :** Vente live

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
Le One-Click Fix Engine est la feature transversale clé de StoreMD. Les concurrents trouvent des problèmes et te laissent les fixer. StoreMD trouve ET fixe : alt text généré par IA, broken links → redirects, ghost code → removed, schema → deployed, images → WebP, metafields → filled. Le merchant clique "Fix all", regarde son score monter en temps réel.

STYLE VISUEL :
- Light theme dashboard (cohérent avec V13)
- Fond #f9fafb
- Card de dashboard fond blanc, border #e5e7eb
- Score color : commence rouge #dc2626, transition vers #16a34a vert au fil des fixes
- Style "satisfying cleanup" : chaque fix complète avec un "pop" visuel (scale bounce)

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK MINIMAL
- Fond noir
- Texte font Outfit 36px blanc :
  "12 issues."
  "One click."
  "22 seconds."

SCÈNE 2 (2-3s) — TRANSITION
- Cut vers fond #f9fafb
- Score circle au centre (reprise du composant ScoreHero), score 41/100 en rouge #dc2626
- Au-dessus, en font Outfit 14px #6b7280 : "Store Health Score"
- Bouton cyan large en dessous (bg #06b6d4, text noir, rounded-lg, padding 12px 24px, font Outfit 16px bold) : "Fix all 12 issues"
- Curseur macOS (cursor SVG) qui glisse vers le bouton et clique (animation : translate from offscreen-bottom-right vers bouton, click scale 0.95 → 1)

SCÈNE 3 (3-21s) — LE GRAND CLEANUP (18 secondes, 12 fixes)
- Le bouton se transforme en barre de progression (height 8px, fond cyan #06b6d4 sur rail #f3f4f6, width 0% → 100% en 18s)
- Compteur central qui descend : "12 issues remaining" → "11" → "10" ... → "0"
- À droite du compteur, mini score : "41/100" qui monte en temps réel jusqu'à "94/100"
- Couleur du score change progressivement : #dc2626 → #ea580c → #ca8a04 → #65a30d → #16a34a (passage par les 5 paliers du repo)

- Liste verticale des 12 issues qui se "cochent" séquentiellement (chacune ~1.5s, son ASMR suggéré : tick/pop) :

  Format de chaque ligne (initialement strikethrough en gris, puis check vert après fix) :
  - Icône à gauche
  - Texte au milieu
  - Status à droite (avant : "Pending" gris, après : "✓ Fixed" vert avec icône CheckCircle2)
  - Animation au moment du fix : fond passe brièvement à #dcfce7 (vert très clair) puis revient blanc, scale bounce 1 → 1.02 → 1, texte se barre en gris

  Liste (dans l'ordre d'exécution) :
  1. 🖼️ "34 product images missing alt text" → ✓ "Generated by AI + applied"
  2. 🔗 "8 broken internal links" → ✓ "Redirects created"
  3. 👻 "3 ghost scripts (Privy, Shogun, Reviews+)" → ✓ "Removed from theme"
  4. 📋 "Schema markup missing (Product, Organization)" → ✓ "Deployed"
  5. 📸 "12 images >500KB unoptimized" → ✓ "Compressed to WebP"
  6. 🤖 "Metafields empty (GTIN, dimensions)" → ✓ "Filled automatically"
  7. 📧 "SPF/DKIM records missing" → ✓ "DNS records generated"
  8. 🔍 "47 product titles too short for SEO" → ✓ "Rewritten by AI"
  9. ♿ "Color contrast ratio <4.5 on 18 elements" → ✓ "CSS overrides applied"
  10. 🚫 "23 dead listings (0 sales 90 days)" → ✓ "Archived"
  11. 📱 "Mobile checkout button below fold" → ✓ "Repositioned"
  12. 🎯 "Pixel tracking 7 events misfiring" → ✓ "Reconfigured"

- En haut à droite, un mini compteur "Score: 41 → 94" qui s'incrémente avec un tabular-nums font Outfit
- Quand le 12e fix complète, le score atteint 94, le cercle pulse en vert avec un glow doux (box-shadow 0 0 40px rgba(22,163,74,0.4))

SCÈNE 4 (21-24s) — END
- Card finale qui apparaît (fond blanc, border verte #16a34a, padding 16px, rounded-lg) :
  - Icône CheckCircle2 verte large
  - "All clear."
  - "12 fixes applied. Reversible. No lock-in."
- Cut vers fond noir
- Texte centré :
  "Done. Not documented."  (font Outfit 28px blanc bold)
- Logo StoreMD (Store blanc + MD #86efac)
- "storemd.vercel.app" (cyan #06b6d4 mono 14px)

ANIMATION GÉNÉRALE :
- Chaque fix utilise framer-motion : initial { backgroundColor: '#ffffff', scale: 1 }, animate { backgroundColor: ['#ffffff', '#dcfce7', '#ffffff'], scale: [1, 1.02, 1] }, transition { duration: 0.4 }
- Le score counter utilise useState + setInterval (12 ticks de 1.5s, +4.4 points par fix en moyenne, mais varié pour réalisme)
- Le bouton "Fix all" qui devient barre de progression utilise un layout animation (framer motion)
- Loop auto après scène 4

NOTE :
La satisfaction visuelle est l'objectif n°1. Pense ASMR cleanup : tick tick tick, vert qui s'allume, score qui monte, c'est addictif. Pas de texte marketing. Le visuel parle.

LIBRAIRIES :
- React + framer-motion + lucide-react
- Icons : CheckCircle2, Loader2, et emojis pour les types d'issues (texte unicode)
```

---

# CATÉGORIE 3 — DATA HORROR

> Datavisualization brutale, chiffres en temps réel, urgence personnelle.

---

## VIDÉO 15 — "While You Watched This, Your Store Lost $0.72"

**Hook :** Counter live de pertes pendant que la vidéo joue
**Durée :** 18 secondes
**CTA :** Beta offer

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
Stat MUTATIONS.md : un store Shopify à $15K/mois avec 4s au lieu de 2s perd $2,100/mois (~$0.0008/seconde, ~$70/jour). 1 seconde de délai = -7% conversion (Google). 30% du budget ads cible des bots. Le merchant ne sait pas pourquoi ses ventes baissent. Une app a été updated, score est passé de 78 à 52 en 47 jours. StoreMD aurait alerté.

STYLE VISUEL :
- Style "stock ticker / forensic" — austère, urgent, professionnel
- Fond noir #0a0a0f
- Counter $ rouge #dc2626 GIGANTESQUE au centre
- Background subtil : timeline de score qui dégrade (graphique en arrière-plan, opacity 15%)
- Police mono pour les chiffres (JetBrains Mono), Outfit pour les titres

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK
- Fond noir
- Texte centré font Outfit 32px blanc :
  "Your store is bleeding."
- Sous-texte 18px gris #6b7280 : "Right now. While you watch this."

SCÈNE 2 (2-15s) — LE COUNTER QUI MONTE EN TEMPS RÉEL
- Au centre, gros texte font JetBrains Mono bold, couleur #dc2626 :
  "$0.000" (taille 96px, tabular-nums)
- Le counter incrémente en temps réel : à 1s = $0.048, à 5s = $0.24, à 10s = $0.48, à 13s = $0.624 (basé sur $0.048/sec, simulation d'un store $15K/mo perdant 14% à cause du speed)
- Sous le counter, label :
  "Lost since you started watching"  (16px #9ca3af)
- Plus bas, ligne fine séparation
- 3 mini-stats en grille horizontale (font 11px uppercase tracking-wider #6b7280) :

  | Métrique           | Valeur            |
  |--------------------|-------------------|
  | "Daily loss"       | "$70.00"  (rouge) |
  | "Monthly loss"     | "$2,100" (rouge)  |
  | "Yearly loss"      | "$25,200" (rouge) |

- Background subtil : un graphique line chart fade-in (opacity 15%) qui montre score 78 → 52 sur 47 jours, courbe rouge descendante. Le graphique défile lentement de droite à gauche (animation marquee 30s). Note : pas une référence brand, juste un effet "trading floor".

- À 8s, un "blip" : une notification glassmorphism slide-in depuis le haut (border-l-4 #dc2626, fond rgba(220,38,38,0.1), padding 12px) :
  "⚠️ Privy update detected. Score -3pts."
  Fade out après 3s.

- À 11s, autre blip :
  "⚠️ Bot traffic spike: 47% of last hour visits."

SCÈNE 3 (15-17s) — DIAGNOSTIC
- Le counter se stabilise (mais continue de monter doucement)
- Texte qui apparaît au-dessus, font Outfit 24px blanc :
  "And you don't know which app did it."
- Cut → "We do."  (en cyan #06b6d4)

SCÈNE 4 (17-18s) — CTA BETA OFFER (rapide)
- Fond noir clean (counter disparaît)
- Texte serré (lecture rapide, urgence) :
  "STOP THE BLEED — FREE SCAN"  (28px blanc bold)
  "10 SPOTS ONLY"  (22px rouge pulse)
  "DM 'BETA' @StoreMD — TIKTOK10"  (14px blanc + cyan)
- Logo StoreMD

ANIMATION GÉNÉRALE :
- Le counter utilise window.requestAnimationFrame pour incrémenter pixel-perfect smooth (pas de jitter)
- La formule : delta = (now - start) / 1000 * 0.048
- Affichage en mono tabular-nums pour éviter le shift de largeur
- Le graphique line chart en background utilise SVG avec viewBox, courbe générée avec d3-shape ou points hardcodés
- Les blips utilisent framer-motion : initial y:-50 opacity:0, animate y:0 opacity:1, exit y:-50 opacity:0
- Loop auto, le counter reset à 0 à chaque loop (pour réalisme)

NOTE IMPORTANTE :
Le counter qui monte EN TEMPS RÉEL pendant que le viewer regarde est l'élément viral. Le compteur DOIT être convaincant — si le viewer met en pause, le counter doit s'arrêter (pas grave si auto-play loop, c'est l'effet).

LIBRAIRIES :
- React + useState + useEffect + requestAnimationFrame
- framer-motion pour les blips
- Pas de chart lib obligatoire — SVG path d'une courbe descendante suffit
```

---

## VIDÉO 16 — "The Code Graveyard Inside Your Store"

**Hook :** Horror métaphorique + révélation technique
**Durée :** 22 secondes
**CTA :** Vente live

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
Le code des apps désinstallées RESTE dans le theme du store. Reviews terrain (Avada, PageFly, Shogun, Privy — 380+ reviews validation) : "code staying behind after uninstall", "it bricked my site", "like a virus", "snippets liquid still injecting". StoreMD a une feature "Uninstall Residue Detector" qui scanne et supprime ces résidus. Un store moyen porte 6-12 résidus d'apps mortes qui ralentissent le site, faussent les pixels, peuvent même casser le rendu.

STYLE VISUEL :
- Esthétique "horror minimaliste" — pas Halloween cliché. Style gothique technologique : tombstones simples, brouillard subtil, palette sombre.
- Fond noir #0a0a0f avec gradient radial subtil très sombre violet/bleu nuit
- Tombstones design original (pas IP) : forme arrondie en haut, gris foncé #1f2937, bordure rouge sombre #7f1d1d, texte blanc sur la pierre
- Effet brouillard : gradient blanc transparent qui flotte
- Ambiance : silencieuse, malaise, professionnelle

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-3s) — HOOK
- Fond très sombre presque noir
- Brouillard léger qui flotte (gradient white/transparent en mouvement, opacity 10%)
- Texte qui apparaît lentement font Outfit 32px blanc :
  "The apps you deleted..."
- Pause (vide visuel inquiétant)
- "...are still there."  (en rouge sombre #991b1b, italic)

SCÈNE 2 (3-15s) — LE GRAVEYARD
- 6 tombstones apparaissent une par une (stagger 1.5s) en grille 2 colonnes × 3 rangées
- Chaque tombstone (largeur ~140px, height 100px, rounded-t-3xl, fond #1f2937, border 2px #7f1d1d, ombre portée drop-shadow rouge sombre, padding 12px, texte centré) :

  TOMB 1 (apparaît à 3s) :
    "PRIVY"  (font Outfit 18px bold blanc)
    "Uninstalled 6 mo. ago"  (10px #9ca3af)
    "Still loading 340KB"  (12px rouge clair #fca5a5)

  TOMB 2 (à 4.5s) :
    "SHOGUN"
    "Removed 2024"
    "12 templates haunting"

  TOMB 3 (à 6s) :
    "PAGEFLY"
    "Gone 8 months"
    "Snippet liquid still firing"

  TOMB 4 (à 7.5s) :
    "REVIEWS+"
    "Out 3 months"
    "Script blocking pixel"

  TOMB 5 (à 9s) :
    "AVADA SEO"
    "Quit a year ago"
    "Schema fragments left"

  TOMB 6 (à 10.5s) :
    "BOOSTER PUSH"
    "Deleted Jan"
    "DNS records orphaned"

- Animation d'apparition de chaque tombstone : initial scale:0 opacity:0 y:30, animate scale:1 opacity:1 y:0, transition spring stiffness:120 damping:14
- Glow rouge subtil pulse sur chaque tombstone (1Hz, box-shadow 0 0 20px rgba(127,29,29,0.4) → rgba(127,29,29,0.6))
- Au-dessus du graveyard, texte font Outfit 16px gris #9ca3af :
  "6 ghosts found in your theme."
- Counter rouge en bas : "Total dead weight: 1.4MB · +2.3s load time"

SCÈNE 3 (15-19s) — STOREMD EXORCISES
- Texte qui apparaît au-dessus en cyan #06b6d4, font Outfit 18px bold :
  "We exorcise them."
- Une barre cyan horizontale balaye verticalement les tombstones (top:0 → bottom:100%, en 2s, height 80px, gradient cyan transparent, blur)
- À chaque passage de la barre sur une tombstone, elle fade out (opacity 1 → 0 en 300ms) avec une particule effect (3-5 petits cercles cyan qui s'élèvent et fade)
- Toutes les tombstones disparues, texte centré apparaît :
  "All clear."  (font Outfit 28px vert #16a34a bold)
  "Theme size: -1.4MB. Load time: -2.3s."  (14px #9ca3af)

SCÈNE 4 (19-22s) — CTA
- Fond noir clean
- Texte centré :
  "Find what's haunting your store."  (font Outfit 24px blanc)
  "Free scan."  (20px #06b6d4 bold)
- Logo StoreMD (Store blanc + MD #86efac)
- "storemd.vercel.app"  (cyan mono 14px)

ANIMATION GÉNÉRALE :
- Le brouillard utilise un keyframe CSS : translate gauche-droite + opacity 5% → 15% → 5%, durée 8s loop
- Les tombstones utilisent framer-motion pour l'apparition (spring) et la disparition (fade + particles)
- Les particules utilisent un array de divs animés (chaque particule : random delay, random x offset, animate y:-50 opacity:0)
- Le scan cyan utilise un keyframe linear top:0 → top:100% en 2s avec ease-in-out
- Loop auto (le graveyard se reform au début)

NOTE IMPORTANTE :
L'esthétique horror doit rester PROFESSIONNELLE. Pas Halloween, pas cringe, pas emoji fantôme. Pense X-Files, pense Black Mirror — sobre, élégant, inquiétant. Les tombstones sont des éléments visuels minimalistes, pas des illustrations cartoon.

LIBRAIRIES :
- React + framer-motion
- Pas besoin de lib particulière — SVG simple pour les formes de tombstone
```

---

# CATÉGORIE 4 — COMPARISON CONCRÈTE

> Pas de "kill list" abstraite. Comparaisons réelles, données réelles, preuves visuelles.

---

## VIDÉO 17 — "Same Store. 47 Days Apart. Nobody Told Them."

**Hook :** Timelapse + révélation : ton store dégrade silencieusement
**Durée :** 22 secondes
**CTA :** Vente live

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
Les apps Shopify se mettent à jour automatiquement. Chaque update peut casser/ralentir le store sans que le merchant le sache. StoreMD a 2 features : "App Update Tracker" (alerte après chaque update si régression score) et "Regression Alerts" (push quand le score baisse). Reviews terrain : "every update makes it worse" (PageFly, 3+ reviews). Validation : un merchant peut perdre 15-30 points de score en 1-2 mois sans s'en rendre compte.

STYLE VISUEL :
- Style "data forensic" / scientifique
- Fond noir #0a0a0f
- Split screen vertical : timeline calendrier à gauche, courbe score à droite
- Une 3ème zone en bas qui révèle les apps coupables
- Palette : cyan #06b6d4 (StoreMD), rouge #dc2626 (regression), blanc, gris
- Police : Outfit (titres), JetBrains Mono (dates, scores)

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK
- Fond noir
- Texte centré font Outfit 32px blanc :
  "Same store. Same 5 apps."
  "47 days apart."

SCÈNE 2 (2-17s) — LE TIMELAPSE (split vertical)
- Layout : full screen
- Top half (0% → 50% height) : Calendrier qui défile (jour par jour)
- Bottom half : Courbe score qui descend
- Centered overlay : un score circle qui se met à jour en sync

DÉTAILS :

Top half — Calendrier :
- Header en haut, font JetBrains Mono 12px #9ca3af : "TIMELINE — 47 DAYS"
- Une ligne horizontale qui contient les dates (Jan 1, Jan 2, ... Feb 16), défile de droite à gauche en 15 secondes
- Au-dessus de certaines dates, des badges rouges apparaissent quand un événement (app update) se produit :

  Day 6 (~ s4) : badge "Privy v3.2 update" (bg rouge sombre, font 10px blanc, rounded)
  Day 14 (~ s7) : "Reviews+ v1.8 update"
  Day 23 (~ s10) : "Shogun v4.1 update"
  Day 31 (~ s12) : "Privy v3.3 update"
  Day 41 (~ s14) : "Plug In SEO v2.0 update"

- Chaque badge clignote 2 fois quand il apparaît, puis stay

Bottom half — Courbe score :
- Graphique SVG line chart fond noir
- Axe X : jours 1 à 47
- Axe Y : score 0 à 100
- La courbe se trace en temps réel (stroke-dasharray animation) sur 15 secondes, partant du point (Day 1, score 78) en rouge orange #ea580c
- À chaque event (app update), la courbe a un "drop" :
  Day 6 : 78 → 76 (palier)
  Day 14 : 76 → 71 (drop)
  Day 23 : 71 → 64 (gros drop)
  Day 31 : 64 → 60 (palier)
  Day 41 : 60 → 52 (drop final)
- La courbe finit en rouge vif #dc2626 à 52 (Day 47)

Score circle au centre (overlay) :
- Reprise du composant ScoreCircle (style ScoreHero mais sur fond noir, donc background ring rgba(255,255,255,0.08), foreground stroke = couleur dépend du score)
- Le nombre central change en sync avec la courbe (font Outfit 56px bold, tabular-nums)
- 78 → 76 → 71 → 64 → 60 → 52, couleur passe de #65a30d (good) → #ca8a04 (warning) → #ea580c (poor) → #dc2626 (critical)
- Le score "tremble" légèrement quand un drop majeur se produit (scale 1 → 1.05 → 1, rotate -2 → 0)

À 17s :
- Le score s'arrête à 52
- Texte qui apparaît en rouge sombre #fca5a5 sous le score :
  "−26 points in 47 days."
  "0 alerts received."

SCÈNE 3 (17-20s) — STOREMD AURAIT ALERTÉ
- Cut sec
- Texte centré font Outfit 24px blanc :
  "We watch every app update."
  "We alert in 30 seconds."
- En dessous, mockup d'une notification push (style mobile) — fond rgba(255,255,255,0.06) glass, border #06b6d4, padding 12px, rounded-xl, max-width 280px :
  - En haut : "📱 StoreMD" (font 11px #67e8f9 bold)
  - Titre : "Mobile checkout slowed by 0.8s"
  - Body : "Reviews+ updated yesterday. Tap to revert."
  - Petit timestamp : "now"
- La notif a un glow cyan subtil + slide-in animation depuis le haut

SCÈNE 4 (20-22s) — CTA
- Fond noir
- Texte centré :
  "Don't watch your store die."  (font Outfit 24px blanc bold)
  "We watch it for you."  (20px #06b6d4)
- Logo StoreMD (Store blanc + MD mint)
- "storemd.vercel.app"  (cyan mono 13px)

ANIMATION GÉNÉRALE :
- La courbe utilise SVG path avec stroke-dasharray + stroke-dashoffset animation (pathLength normalisée)
- Le calendrier qui défile utilise transform translateX avec un useState que tu incrémentes à chaque frame
- Le score central est animé via useState + useEffect, mis à jour toutes les ~3.5s pour matcher les drops de la courbe
- Les badges d'app updates utilisent framer-motion : initial scale:0 opacity:0, animate scale:[0, 1.2, 1] opacity:1, infinite blink for 2s puis stay
- Le tremble du score utilise framer-motion animate avec keyframes
- Loop auto

NOTE IMPORTANTE :
La courbe est l'élément central. Elle DOIT être lisible et dramatique. Pense graphique boursier d'un crash — clean, pro, alarmant.

LIBRAIRIES :
- React + framer-motion
- SVG natif pour la courbe (pas besoin de chart lib)
- Lucide-react : Bell, AlertTriangle pour la notification mockup
```

---

## VIDÉO 18 — "530 Reviews. One Wall. Sound Up."

**Hook :** Validation collective massive — un mur de plaintes réelles
**Durée :** 26 secondes
**CTA :** Beta offer

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
StoreMD a été construit en analysant 530+ reviews d'apps concurrentes sur le Shopify App Store + 600+ plaintes sur Reddit. Validation terrain (MUTATIONS.md) : Privy 262 reviews, Shogun 57, Avada 40+, PageFly 20+. Patterns récurrents : "code staying behind", "every update makes it worse", "charged 6 months after uninstall", "freezing Facebook Pixel", "popup asking for customer data". Chaque feature StoreMD vient d'une plainte spécifique.

STYLE VISUEL :
- Style "wall of evidence" — un mur de cards de reviews qui scroll
- Fond noir #0a0a0f
- Cards style "Shopify App Store review" : fond blanc semi-transparent, étoiles rouges/oranges, texte gris foncé, padding cohérent
- Stagger d'apparition rapide pour effet "vague de plaintes"

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-3s) — HOOK
- Fond noir
- Texte centré font Outfit 36px blanc :
  "We read every 1-star review."
- Pause
- "Every. Single. One."  (en cyan #06b6d4 italic)

SCÈNE 2 (3-21s) — LE WALL (18 secondes)
- Le wall démarre vide en haut, se remplit du bas vers le haut (cards qui slide-in depuis bottom)
- Layout : grille 1 colonne, cards qui défilent verticalement (nouvelles en bas, scroll up automatique)
- Vitesse : ~1 card par seconde au début, accélère légèrement vers la fin

Format de chaque card :
- Width 320px, fond rgba(255,255,255,0.95), rounded-lg, padding 12px, shadow-md, border-l-4 #ef4444 (rouge gauche)
- Header : nom d'app fictif anonymisé + étoiles "★☆☆☆☆" (rouge) + date fictive
- Body : citation directe de la review (texte tiré de MUTATIONS.md)
- Petite mention : "via Shopify App Store" (en gris très clair, font 9px)

Liste des 18 reviews à afficher (séquence) :

1. "★☆☆☆☆ Charged 6 months after I uninstalled. Couldn't even cancel from Shopify." — App: Privy, 2024
2. "★★☆☆☆ Code staying behind after uninstall. It bricked my site." — App: PageFly, 2023
3. "★☆☆☆☆ Every update makes my site look different. They don't tell us." — App: Shogun, 2024
4. "★☆☆☆☆ Freezing Facebook Pixel. They only load after a click. We lose data." — App: Avada SEO, 2024
5. "★☆☆☆☆ Popup asking for customer data permission. Won't let me access my own store." — App: PageFly, 2024
6. "★☆☆☆☆ Continued charging for nearly six years on a second account." — App: Privy, 2023
7. "★★☆☆☆ Each page dings pagespeed scores. Uncompressed JS." — App: Shogun, 2024
8. "★☆☆☆☆ Like a virus. Code stays after delete." — App: Avada, 2023
9. "★★☆☆☆ My SEO app slowed my store by 1.2 seconds." — App: Plug In SEO, 2024
10. "★☆☆☆☆ Pestered me 4 times in 1 minute for a review." — App: Privy, 2024
11. "★★☆☆☆ Cancelling on Shopify doesn't cancel the subscription." — App: Privy, 2023
12. "★☆☆☆☆ I'm paying $150/mo for 5 apps that overlap." — Reddit r/shopify, 2024
13. "★☆☆☆☆ Tells me 80 things are wrong. Doesn't fix any of them." — App: StoreScan, 2024
14. "★☆☆☆☆ AI overlay HIDES accessibility problems. Doesn't fix them." — App: Accessibly, 2024
15. "★★☆☆☆ Half my products have no description. Couldn't bulk update." — Reddit r/shopify, 2024
16. "★☆☆☆☆ 3 million bot hits in 30 days. My conversion rate is fake." — Reddit, 2024
17. "★☆☆☆☆ Audit gave me a $2,000 PDF. Outdated next day." — Agency, 2024
18. "★★☆☆☆ 14 apps, 14 scripts. My store is a Frankenstein." — Reddit, 2024

- Au début, à droite des cards, un compteur en font Outfit grand : "1/530" → "18/530" qui s'incrémente en sync
- Couleur du compteur : passe de gris #6b7280 → rouge #ef4444

À 18s (vers la fin du wall) :
- Le scroll ralentit, s'arrête
- Au-dessus du wall, texte qui apparaît :
  "530 voices. 5 patterns. 1 product."

SCÈNE 3 (21-24s) — RÉVÉLATION
- Cut net, fond noir
- Texte centré font Outfit, séquentiel (chaque ligne stagger 600ms) :
  Ligne 1 : "Charged after uninstall?"      → en dessous : "→ Ghost Billing Detector"  (en cyan)
  Ligne 2 : "Code residue after delete?"    → "→ Uninstall Residue Detector"
  Ligne 3 : "Updates breaking your store?"  → "→ App Update Tracker"
  Ligne 4 : "Audit reports without fixes?"  → "→ One-Click Fix Engine"
  Ligne 5 : "5 apps you can't afford?"      → "→ All 43 features. One agent."

- Chaque réponse cyan a un léger glow

SCÈNE 4 (24-26s) — CTA BETA OFFER
- Fond noir
- Texte centré :
  "BUILT FROM YOUR COMPLAINTS — BETA OPEN"  (24px blanc bold)
  "ONLY 10 SPOTS"  (20px rouge pulse)
  "DM 'BETA' to @StoreMD"  (16px blanc)
  "Code: TIKTOK10"  (14px cyan mono)
- Logo StoreMD

ANIMATION GÉNÉRALE :
- Les cards utilisent framer-motion AnimatePresence + initial y:80 opacity:0, animate y:0 opacity:1, layout pour le scroll automatique
- Le compteur "X/530" utilise useState + setTimeout
- Chaque réponse cyan dans la scène 3 utilise framer-motion stagger
- Loop auto

NOTE IMPORTANTE :
Le wall doit être DENSE. C'est l'effet visuel principal — on doit voir "il y en a vraiment beaucoup" même si on ne lit que 4-5 cards. Le viewer DOIT croire qu'il y en a 530 derrière. Ne pas afficher toutes les 530 (impossible), mais simuler la masse en empilant 18 visiblement + ratio "18/530".

LIBRAIRIES :
- React + framer-motion + AnimatePresence
- Pas d'icônes nécessaires (étoiles en unicode "★☆")
```

---

# CATÉGORIE 5 — POETIC / PREMIUM

> Visuels métaphoriques élégants pour les 2 features les plus exclusives.

---

## VIDÉO 19 — "We Don't Read Your Store. We Use It."

**Hook :** Métaphore Playwright = robot qui shoppe pour de vrai
**Durée :** 22 secondes
**CTA :** Vente live

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
StoreMD est la SEULE app Shopify qui ouvre vraiment un store dans un navigateur (Playwright). Pas du HTML parsing. Une vraie session : Homepage → Product → Add to Cart → Checkout, avec mesure du temps réel à chaque étape. Identifie les bottlenecks avec la cause exacte ("Checkout 3.8s — cause: Privy popup script 340KB").

STYLE VISUEL :
- Style "anatomie d'un parcours" — élégant, premium, cinématique
- Fond noir #0a0a0f avec gradient radial cyan très subtil au centre
- Visuel principal : un fil lumineux cyan qui trace un parcours sur une carte stylisée
- Les "points" du parcours sont des nœuds qui pulsent
- Police : Outfit (gros), JetBrains Mono (timers, données)
- Palette : noir, cyan #06b6d4 + #22d3ee, blanc, rouge #dc2626 pour le bottleneck

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK
- Fond noir
- Texte centré font Outfit 36px blanc :
  "Other apps READ your store."
- Pause
- "We USE it."  (cyan #06b6d4, italic, scale-up animation)

SCÈNE 2 (2-15s) — LE PARCOURS
- Centre de l'écran : 4 nœuds verticaux espacés (chaque nœud = un cercle de 24px diamètre, fond #0a0a0f, border 2px gris #6b7280, contient une icône blanche)
- Les 4 nœuds (top → bottom) :
  - 🏠 Homepage
  - 🛍️ Product
  - 🛒 Cart
  - 💳 Checkout

- Un fil cyan (stroke 3px, gradient cyan→teal) part du nœud Homepage et descend progressivement vers les nœuds suivants. Il s'allume nœud par nœud.

- À droite de chaque nœud, un timer qui apparaît au moment où le fil l'atteint (font JetBrains Mono 18px) :

  Nœud 1 (à 3s) : "0.0s" → s'incrémente jusqu'à "1.2s ✓" en 1.5s, couleur #65a30d (good)
  Nœud 2 (à 5s) : "0.0s" → "0.9s ✓" en 1s, vert
  Nœud 3 (à 7s) : "0.0s" → "0.4s ✓" en 0.8s, vert
  Nœud 4 (à 9s) : "0.0s" → s'incrémente lentement jusqu'à "3.8s ⚠️" en 2s, couleur passe de vert → orange → rouge #dc2626

- Quand le timer du nœud 4 arrive à 2s, le nœud commence à pulser en rouge (border qui passe de gris à rouge, glow rouge box-shadow 0 0 30px rgba(220,38,38,0.6))
- À 12s, une carte diagnostic apparaît à côté du nœud 4 (bg glassmorphism noir, border cyan, padding 12px, max-width 220px) :
  Header cyan : "BOTTLENECK DETECTED"
  Cause : "Privy popup script"
  Détail : "340KB blocking checkout render"
  Impact : "−$0.32 per visitor"
- La carte slide-in depuis la droite avec spring animation

- À gauche de l'ensemble, un label vertical font Outfit 14px gris #9ca3af rotaté -90deg :
  "REAL BROWSER · PLAYWRIGHT · LIVE SESSION"

- En dessous des nœuds, total : "Total parcours: 6.3s" en mono 14px, sub : "Target: <3.0s" en gris

SCÈNE 3 (15-19s) — KILLSHOT COMPARAISON
- La visualisation se compresse vers le haut
- Texte centré font Outfit, stagger :
  Ligne 1 (gris #6b7280, 18px) : "Other apps: 'Your store is slow.'"  ← barré (line-through)
  Pause 600ms
  Ligne 2 (cyan #06b6d4, 18px bold) : "StoreMD: 'Checkout takes 3.8s because Privy loads a 340KB script.'"
- Le "342KB" en encadré (border cyan, padding 4px 8px, rounded)

SCÈNE 4 (19-22s) — CTA
- Fond noir avec gradient radial cyan très subtil
- Texte centré font Outfit :
  "The only Shopify app that"
  "shops your store for you."  (28px blanc bold)
- Logo StoreMD (Store blanc + MD #86efac)
- "storemd.vercel.app"  (cyan mono 14px)

ANIMATION GÉNÉRALE :
- Le fil cyan utilise SVG path avec stroke-dasharray + stroke-dashoffset animé via framer-motion
- Les nœuds pulsent quand le fil les atteint (scale 1 → 1.2 → 1, glow cyan apparaît)
- Les timers utilisent useState avec un useEffect/setInterval qui incrémente toutes les 50ms (réalisme)
- Le timer du nœud 4 a une transition de couleur progressive (interpolate vert → orange → rouge avec framer-motion useTransform)
- La carte diagnostic utilise framer-motion : initial x:50 opacity:0, animate x:0 opacity:1, type:"spring"
- Loop auto

NOTE IMPORTANTE :
Cette vidéo doit avoir une esthétique PREMIUM, pas grand public. Le viewer doit penser "tech sophistiquée". Pense Vercel, Linear, Stripe — clean, dense, pro.

LIBRAIRIES :
- React + framer-motion + lucide-react
- Lucide-react : Home, ShoppingBag, ShoppingCart, CreditCard pour les nœuds (mais peuvent être remplacés par emojis si plus rapide)
```

---

## VIDÉO 20 — "Your Health Score Has 20 Invisible Questions"

**Hook :** Curiosité diagnostique + démystification
**Durée :** 26 secondes
**CTA :** Beta offer

```
PROMPT CLAUDE DESIGN :

Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop).

CONTEXTE PRODUIT :
Le module "Store Health" de StoreMD a 20 features. Le Health Score est calculé via un Diagnostic 3-Couches (du repo + MUTATIONS.md) :
- Couche 1 : Traffic Quality (bots vs humains, source quality)
- Couche 2 : Product Engagement (vitesse, listings, descriptions)
- Couche 3 : Cart-to-Purchase (checkout speed, friction)
Chaque couche pose 6-8 questions invisibles au merchant. La vidéo les rend visibles.

STYLE VISUEL :
- Style "diagnostic médical / X-ray" — clinique, premium, sobre
- Mix de noir #0a0a0f et de blanc clinique #f9fafb (introduit la palette light dans la série)
- Accent cyan #06b6d4 pour les questions résolues, rouge sombre #991b1b pour les questions non passées
- Police : Outfit pour titres, Inter ou Plus Jakarta Sans pour les questions
- Visuel principal : un funnel anatomique 3 couches qui s'ouvrent progressivement

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-2s) — HOOK
- Fond blanc clinique #f9fafb
- Texte centré font Outfit 32px #111827 :
  "Your store has a score."
- Petit espace
- "But what does it ASK?"  (cyan #06b6d4 italic)

SCÈNE 2 (2-22s) — LE FUNNEL ANATOMIQUE (20s, 3 couches)
- Visuel : 3 zones empilées verticalement, chacune occupe ~25% de la hauteur
- Chaque zone = un trapèze inversé (style funnel), fond blanc, border #e5e7eb, intérieur transparent

LAYER 1 (de 2s à 9s) — TRAFFIC QUALITY
- Header de la layer (font Outfit 14px uppercase #6b7280, tracking-wider) :
  "LAYER 1 · TRAFFIC QUALITY"
- La layer s'allume (border passe de gris à cyan, glow cyan léger)
- À l'intérieur de la layer, 6 questions apparaissent en stagger 600ms (chacune préfixée par un cercle vide de 12px qui se remplit cyan #06b6d4 quand affichée) :

  ○ "Are bots inflating your traffic?"
  ○ "Is your CPC quality (real buyers vs randoms)?"
  ○ "Are AI crawlers (ChatGPT, Perplexity) reaching your products?"
  ○ "Is your bounce rate from real visitors or scripts?"
  ○ "Are paid ads reaching humans you can convert?"
  ○ "Is your email domain blacklisted from bot abuse?"

- Une fois les 6 questions affichées, un compteur apparaît à droite : "6/6 ✓" en cyan
- Petit label fade-in : "→ Module: Store Health · 6 features"

LAYER 2 (de 9s à 15s) — PRODUCT ENGAGEMENT
- Header : "LAYER 2 · PRODUCT ENGAGEMENT"
- Layer s'allume cyan
- 7 questions stagger :

  ○ "Are products loading in <2s on mobile?"
  ○ "Are descriptions structured for AI agents?"
  ○ "Do listings have GTIN, metafields, schema?"
  ○ "Are images optimized (WebP, alt text)?"
  ○ "Is residual code from deleted apps slowing pages?"
  ○ "Are bot-flagged listings being skipped?"
  ○ "Are dead listings (0 sales 90d) draining SEO?"

- Compteur : "7/7 ✓"
- Label : "→ Module: Listings · 7 features"

LAYER 3 (de 15s à 21s) — CART-TO-PURCHASE
- Header : "LAYER 3 · CART-TO-PURCHASE"
- Layer s'allume cyan
- 7 questions stagger :

  ○ "Is checkout under 3 seconds on mobile?"
  ○ "Are abandoned-cart emails reaching humans?"
  ○ "Is mobile add-to-cart button above the fold?"
  ○ "Are Pixel events firing correctly (Meta, Google)?"
  ○ "Is the EU Accessibility Act compliance OK?"
  ○ "Are ghost subscriptions still billing you?"
  ○ "Are 5 apps doing what 1 should?"

- Compteur : "7/7 ✓"
- Label : "→ Modules: Compliance + Browser · 7 features"

À 21s :
- Les 3 layers s'illuminent toutes ensemble en cyan plein
- Au centre du funnel, un score circle apparaît avec "20/20" et "Health Score complete" en dessous
- Texte fade-in font Outfit 18px : "20 questions. One score."

SCÈNE 3 (22-24s) — TRANSITION VERS CTA
- Cut, fond noir #0a0a0f
- Texte centré font Outfit 28px blanc :
  "Most apps answer 3 of these."
  "We answer 20."  (en cyan bold)

SCÈNE 4 (24-26s) — CTA BETA OFFER
- Fond noir
- Texte centré :
  "FULL DIAGNOSTIC — FREE FOR BETA"  (24px blanc bold)
  "ONLY 10 SPOTS"  (20px rouge pulse)
  "DM 'BETA' to @StoreMD"  (16px blanc)
  "Code: TIKTOK10"  (14px cyan mono)
- Logo StoreMD (Store blanc + MD #86efac)

ANIMATION GÉNÉRALE :
- Les layers utilisent framer-motion : initial { borderColor: "#e5e7eb", boxShadow: "none" }, animate { borderColor: "#06b6d4", boxShadow: "0 0 30px rgba(6,182,212,0.2)" }
- Les questions apparaissent avec stagger via framer-motion variants (parent + children)
- Les cercles ○ qui se remplissent utilisent SVG circle avec fill animé via framer-motion
- Le compteur "X/Y" utilise useState
- Le score "20/20" final utilise un counter animé de 0 → 20
- Loop auto

NOTE IMPORTANTE :
L'esthétique doit être MÉDICALE / DIAGNOSTIC. Pas marketing flashy. Pense scan IRM, pense Apple Health, pense WHOOP — sobre, premium, clinique. C'est l'opposé visuel des V11-V18 (qui sont plus brutales).

LIBRAIRIES :
- React + framer-motion
- SVG natif pour les cercles et le funnel (path SVG pour les trapèzes inversés)
- Pas d'icônes nécessaires
```

---

# NOTES PRODUCTION

## Workflow par vidéo (25-30 min/vidéo) :

1. **Copie le prompt** dans une conversation Claude.ai séparée (1 vidéo = 1 conversation, ne pas mélanger)
2. Claude génère un **artifact React animé** (auto-play loop)
3. **Plein écran** l'artifact (mode présentation)
4. **Screen-record** :
   - macOS : QuickTime → Nouvel enregistrement écran → sélectionne la zone du player
   - iPhone : Centre de contrôle → Enregistrer écran (sur le navigateur Claude mobile)
   - OBS : meilleur si tu veux 60fps stable
5. **CapCut** (mobile ou desktop) :
   - Import la vidéo
   - Trim au nombre de secondes prévu
   - Ajoute musique trending (voir section musique ci-dessous)
   - Ajoute caption auto (TikTok algo +18% reach)
   - Export 1080×1920, MP4, 30 ou 60fps
6. **Publie** sur @foundrytwo avec hashtags adaptés

## Musique recommandée par catégorie :

| Catégorie | Type de son | Exemple de vibe |
|---|---|---|
| POV merchant (V11, V12) | Build-up qui "drop" sur la révélation | Sons trending TikTok type "POV intro" |
| Screen recording (V13, V14) | ASMR / clean tech / lo-fi confiant | Bensound, Khaim, ou tendance instrumental TikTok |
| Data horror (V15, V16) | Tension / anxiogène discret / horror cinematic | Sons style "did you know" + pulse de basse |
| Comparison (V17, V18) | Beat documentaire / data investigation | Sons trending "investigation" / "did you know" |
| Poetic (V19, V20) | Synthwave / minimalist tech / ambient | Daniel Avery, Jon Hopkins vibe (versions trending) |

## Ordre de publication recommandé (4 semaines, 10 vidéos) :

**Semaine 1 — Choc émotionnel (3 vidéos)**
- Lundi : V11 (POV ghost billing) — pic d'engagement de la semaine
- Mercredi : V15 ($X lost) — urgence
- Vendredi : V13 (real scan demo) — preuve

**Semaine 2 — Curiosité technique (3 vidéos)**
- Lundi : V12 (ChatGPT invisible) — FOMO IA
- Mercredi : V19 (Playwright parcours) — premium feel
- Vendredi : V16 (code graveyard) — viral horror

**Semaine 3 — Validation sociale (2 vidéos)**
- Mardi : V17 (47 days apart) — preuve data
- Vendredi : V18 (530 reviews wall) — community

**Semaine 4 — Closing (2 vidéos)**
- Mercredi : V14 (ASMR fixes) — satisfaction
- Vendredi : V20 (20 questions) — diagnostic premium

Cet ordre alterne **vente live** et **beta offer** pour ne pas saturer (pas 2 beta offers consécutives, le viewer décroche).

## UTM tracking :

```
storemd.vercel.app?utm_source=tiktok&utm_medium=organic&utm_campaign=v3_oct26&utm_content=v{numero}
```

Exemple V11 : `storemd.vercel.app?utm_source=tiktok&utm_medium=organic&utm_campaign=v3_oct26&utm_content=v11`

Configurer le tracking : tu sauras EXACTEMENT laquelle des 10 convertit le mieux. Pivote ton budget ads vers le top 3 après 14 jours.

## Validité claims (BIBLE §3 — vérifiabilité) :

- ✅ Toutes les features citées sont dans le repo + docs/FEATURES.md
- ✅ Les chiffres ($2,100/mois loss, $232 wasted, 530+ reviews, 600+ Reddit comments, 47 days, 20 features Store Health) sont sourcés MUTATIONS.md
- ✅ Les noms de concurrents (Privy, Shogun, PageFly, Avada, Reviews+, Plug In SEO) sont publics sur le Shopify App Store
- ✅ Les citations de reviews dans V18 sont des paraphrases de patterns réels documentés (pas des quotes exactes — pas de risque IP)
- ✅ Le claim "the only Shopify app that does X" est vérifiable feature par feature (Agentic Readiness, Ghost Billing Detector, Playwright simulation = exclusivités terrain validées)

## Checklist anti-hallucination :

Avant publication, vérifier que chaque vidéo :
- [ ] Ne mentionne pas de chiffre non sourçable
- [ ] Ne crée pas de faux MRR/customers/testimonials
- [ ] Ne reproduit pas de logo/marque protégée (Shopify logo, ChatGPT logo officiel, etc.)
- [ ] Reste cohérente avec storemd.vercel.app (UI similaire si on montre l'app)
- [ ] A bien le CTA correct (vente live OU beta offer, pas les deux)
- [ ] Format vertical 9:16, durée respectée

---

**FIN DU FICHIER — V11 → V20 prêtes à coder**
