# ═══════════════════════════════════════════════════════════
# PLAN FINAL — Carousels StoreMD
# 24 slides × 2 formats = 48 images
# Dernière MAJ : 30 avril 2026
# ═══════════════════════════════════════════════════════════

---

## 1. POURQUOI CES CAROUSELS

### Contexte marketing existant

22 vidéos TikTok produites :
- V1-V10 (prompts V2) : hooks agressifs, FOMO, domination chiffres — 43 features, tier lists, myth/reality, countdowns, before/after
- V11-V20 (prompts V3) : POV merchant, screen recording natif, data horror, comparaisons concrètes, démos "poétiques"
- 2 vidéos démo : screencast du free scan (TikTok vertical + Desktop 16:9), zéro marketing, le produit parle

### Le trou dans le funnel

Les vidéos font du **top-of-funnel** : attention, désir, FOMO, clic.
Mais quand le merchant arrive sur le profil après une vidéo, il manque le **mid-funnel** — du contenu swipeable qui répond à :

- "C'est quoi exactement ?" → Carousel 0 (Général)
- "Comment je fais pour l'avoir ?" → Carousel 1 (Installation beta)
- "Pourquoi c'est mieux que ce que j'ai ?" → Carousel 2 (Agressif vérité)
- "Combien ça me coûte de NE PAS l'utiliser ?" → Carousel 3 (Gains potentiels)

### Plateformes cibles

- **TikTok** (photo mode) — format 1080×1920 (9:16)
- **Instagram** (carousel) — format 1080×1350 (4:5)

Même contenu, layout adapté. Chaque slide est générée dans les 2 formats.

---

## 2. CHARTE TECHNIQUE IMAGES

### 2.1 — Formats

| Format | Dimensions | Ratio | Usage |
|--------|-----------|-------|-------|
| TikTok photo mode | 1080 × 1920 px | 9:16 | Toutes les slides |
| Instagram carousel | 1080 × 1350 px | 4:5 | Toutes les slides |

### 2.2 — Palette couleurs

Source de vérité : `frontend/tailwind.config.ts` + `frontend/src/app/globals.css` + `docs/BRAND.md`

```
FONDS
──────────────────────────────────────────────
ink-950 (fond principal)     #050507    ← TOUTES les slides, sans exception
ink-900 (fond alternatif)    #0a0a0f    ← landing page, body
ink-800 (surfaces/cards)     #0d1117    ← encarts, zones secondaires
ink-700                      #111827
glass                        rgba(255,255,255,0.04) + border rgba(255,255,255,0.10)
glass-strong                 rgba(255,255,255,0.07) + border rgba(255,255,255,0.10)
modal background             #0f0f1a    ← fond du ShopInputModal

ACCENTS
──────────────────────────────────────────────
Cyan principal (UI/CTA)      #06b6d4    ← couleur dominante : boutons, glow, liens
Cyan light                   #22d3ee    ← gradients
Teal                         #2dd4bf    ← gradients score
Brand blue (logo only)       #2563eb    ← fond du logo, JAMAIS comme accent UI
Mint "MD" wordmark           #86efac    ← le "MD" dans "StoreMD"

TEXTE
──────────────────────────────────────────────
Blanc principal              #f8fafc    ← titres, hooks, chiffres
Blanc pur                    #ffffff    ← "Store" dans le wordmark
Slate 200                    #e2e8f0    ← texte body principal
Slate 400                    #94a3b8    ← sous-titres, descriptions
Slate 500                    #64748b    ← labels, mentions légales
Slate 600                    #475569    ← placeholder input

SEVERITY (issues)
──────────────────────────────────────────────
Critical   texte #dc2626   chip bg-red-100 text-red-700 border-red-200
Major      texte #ea580c   chip bg-orange-100 text-orange-700 border-orange-200
Minor      texte #ca8a04   chip bg-yellow-100 text-yellow-700 border-yellow-200
Info       texte #2563eb   chip bg-blue-100 text-blue-700 border-blue-200

SCORE (par valeur)
──────────────────────────────────────────────
Excellent (90+)              #16a34a
Good (75-89)                 #65a30d
Warning (60-74)              #ca8a04
Poor (40-59)                 #ea580c
Critical (<40)               #dc2626

EFFETS
──────────────────────────────────────────────
Glow cyan                    box-shadow: 0 0 40px rgba(6,182,212,0.35)
Score glow                   drop-shadow(0 0 8px rgba(6,182,212,0.6))
Gradient cyan text           linear-gradient(90deg, #22d3ee, #2dd4bf, #5eead4)
CTA button background        #06b6d4 (cyan-500), hover #22d3ee (cyan-400)
CTA button text              #0a0a0f (dark)
```

### 2.3 — Typographie

```
DISPLAY / HOOKS         Outfit — bold / extrabold
                        Gros titres, scores, big numbers
                        Fallback : system-ui, sans-serif

BODY / DESCRIPTIONS     Plus Jakarta Sans — regular / medium
                        Texte courant, sous-titres
                        Fallback : system-ui, sans-serif

MONO / TECHNIQUE        JetBrains Mono ou Fira Code
                        URLs, code, prix, chiffres techniques
                        Fallback : Consolas, monospace
```

### 2.4 — Logo StoreMD

- Wordmark : "Store" en **blanc #ffffff** + "MD" en **mint #86efac**
- Police : Outfit bold
- Logo icône : carré arrondi fond **#2563eb**, pulse blanche + dot vert #86efac
- Toujours ensemble, toujours aux mêmes proportions
- Présent sur CHAQUE slide (discret en bas ou en haut, sauf slide finale où il est central)

### 2.5 — Règles visuelles absolues

1. **ZÉRO fond blanc, ZÉRO fond light** — tout est dark (#050507 ou #0a0a0f)
2. Les **hooks** (slide 1 de chaque carousel) : texte MASSIF, centré, max 8 mots, fond #050507 pur, glow cyan subtil possible
3. Les **slides contenu** : fond dark avec des éléments UI du site en arrière-plan (screenshots, composants) à faible opacité (15-25%)
4. Les **CTA** sont toujours fond CYAN (#06b6d4), texte dark (#0a0a0f)
5. Les **chiffres importants** : taille XXL (60-80px équivalent), couleur CYAN ou BLANC, font display bold
6. Pas de bordures décoratives inutiles, pas de dégradés arc-en-ciel, pas de stock photos, pas d'illustrations cartoon
7. Style global : **SaaS marketing, dark premium, minimal, tech, data-driven**
8. Quand une slide utilise un screenshot du site : l'intégrer dans un cadre phone stylisé (borderRadius, ombre portée) ou en fond à opacité réduite. C'est un élément de PREUVE.

---

## 3. DONNÉES VÉRIFIÉES

Sources : `context.md` (Reddit 600+ pain points, 530+ reviews concurrents, données marché)

| Donnée | Valeur | Source |
|--------|--------|--------|
| Apps par store moyen | 14 | Market data (APPWRK) |
| Load time ajouté par app | 200-500ms | Industry benchmarks |
| Store moyen load time | 3.2s | Market data |
| Perte conversion 4s vs 2s | 5-10% | Industry benchmarks |
| Estimation perte mensuelle ($50K rev) | $2,500-5,000/mo | Calculé |
| Coût moyen 5 apps d'audit | ~$150/mo | Estimé (StoreScan, TinyIMG, etc.) |
| Ghost billing moyen | $60-200/mo | Reddit reviews |
| Privy ghost billing réel | $29/mo × 8 mois = $232 | Reddit (40+ mentions) |
| Stores passant Core Web Vitals | <50% | Google data |
| AI orders croissance | 15× depuis jan 2025 | Shopify Agentic Storefronts mars 2026 |
| EAA amendes | 5K-250K€ | European Accessibility Act juin 2025 |
| Code résiduel stores affectés | 73% | context.md (rotating facts) |
| Nombre de modules StoreMD | 5 | Repo |
| Nombre total de features | 43 | context.md |
| Features exclusives mondiales | 4 | Agentic Readiness, Visual Store Test, Real User Sim, Accessibility Live |
| Reviews concurrents analysées | 530+ | context.md |
| Pain points Reddit analysés | 600+ | context.md |
| Scan gratuit durée | 60 secondes (30s en COPY.md) | COPY.md / ONBOARDING.md |

### ⚠️ ALERTE PRICING — Discrepance détectée

| Source | Free | Starter | Pro | Agency |
|--------|------|---------|-----|--------|
| context.md | $0 | $39 | $99 | $249 |
| Code live (PricingPreview.tsx) | $0 | **$29** | **$79** | **$199** |

**→ Utiliser les prix du CODE LIVE ($29/$79/$199) dans les carousels.** C'est ce que le merchant voit sur le site.

| Donnée prix corrigée | Valeur |
|---------------------|--------|
| StoreMD Starter | $29/mo |
| StoreMD Pro | $79/mo |
| StoreMD Pro 3 mois valeur beta | $237 ($79 × 3) |
| Économie StoreMD vs 5 apps | $121/mo = $1,452/an ($150 - $29) |

---

## 4. OFFRE BETA — Texte exact

```
BETA TESTER — CE QUE TU OBTIENS :

→ Plan Pro gratuit pendant 3 mois (valeur $237)
  - Scans quotidiens (vs 2/mois en Free)
  - 3 stores connectés
  - 1000 produits analysés en bulk
  - AI Readiness Scanner
  - Browser Testing (Playwright)
  - Ghost Billing Detection
  - Code Residue Scanner

→ Après les 3 mois : 10% de réduction à vie sur tous les plans

→ Comment y accéder :
  - DM "BETA" sur Instagram/TikTok
  - OU commente "STOREMD" sous le post
  - On envoie un lien d'installation direct
    (l'app n'est pas encore sur le Shopify App Store)

→ Places limitées : 10 spots
```

---

## 5. INVENTAIRE DES 4 CAROUSELS

| # | Carousel | Slides | × 2 formats | Images |
|---|----------|--------|-------------|--------|
| 0 | GÉNÉRAL — Hook + tour rapide | 5 | TikTok + IG | 10 |
| 1 | INSTALLATION BETA — Step-by-step | 7 | TikTok + IG | 14 |
| 2 | AGRESSIF VÉRITÉ — 5 différenciateurs | 6 | TikTok + IG | 12 |
| 3 | GAINS POTENTIELS — Coûts invisibles | 6 | TikTok + IG | 12 |
| | **TOTAL** | **24 slides** | | **48 images** |

### Priorité d'exécution

1. **Carousel 0** (PRIORITAIRE) — 10 images
2. Carousel 2 (agressif, fort potentiel viral) — 12 images
3. Carousel 1 (conversion, pour les merchants déjà chauds) — 14 images
4. Carousel 3 (éducatif, long terme) — 12 images

---

## 6. CONTENU DÉTAILLÉ — SLIDE PAR SLIDE

### ═══ CAROUSEL 0 — GÉNÉRAL "StoreMD en 30 secondes" ═══
### 5 slides × 2 formats = 10 images

**Objectif :** Le merchant ne connaît pas StoreMD. En 5 swipes il comprend : c'est quoi, c'est différent comment, qu'est-ce qu'il gagne, comment il l'obtient.

---

**SLIDE 0.1 — HOOK**

L'image la plus importante des 48. Elle décide si le merchant swipe ou scroll away.

- Fond : #050507 pur, AUCUN élément UI, AUCUN logo
- Texte principal centré, ÉNORME, Outfit extrabold, blanc #f8fafc :

```
YOUR SHOPIFY STORE
IS BLEEDING MONEY.
YOU JUST CAN'T SEE IT.
```

- Le mot **"BLEEDING"** en CYAN #06b6d4 (ou rouge #f87171 — tester les deux)
- Glow radial cyan très subtil au centre de l'image (pas un cercle visible, juste une lueur diffuse)
- RIEN d'autre — pas de logo, pas de CTA, pas de sous-texte. Le hook provoque le swipe.

---

**SLIDE 0.2 — AVANTAGES BETA**

- Fond : #050507
- En haut : badge pill "BETA TESTER" — border #06b6d4, fond transparent, texte CYAN, uppercase, letterspacing wide
- Titre principal : **"PRO PLAN FREE FOR 3 MONTHS"** — blanc #f8fafc, Outfit bold, ~36px
- Sous-titre : **"Then 10% off. For life."** — CYAN #06b6d4, ~22px
- Zone visuelle droite : screenshot résultats StoreMD (score 51, badges severity) dans un frame iPhone stylisé, opacité ~20-25%, grande taille, pour donner du contexte visuel
- Liste avantages Pro (icône "✦" en CYAN + texte blanc, espacement vertical clair entre chaque) :
  - "✦ Daily scans (not 2/month)"
  - "✦ 3 stores connected"
  - "✦ Ghost billing detection"
  - "✦ AI readiness scanner"
  - "✦ Browser testing"
  - "✦ Code residue cleanup"
- En bas : **"10 SPOTS ONLY."** — rouge #f87171, bold
- Logo StoreMD discret en bas

---

**SLIDE 0.3 — DM OU COMMENTE = SCAN PRO GRATUIT**

- Fond : #050507
- Titre haut : **"WANT YOUR FREE PRO SCAN?"** — blanc bold ~28px
- Visuel central : simulation de DM Instagram/TikTok stylisée (dark, pas le vrai design IG — juste des bulles de message) :
  - Bulle envoyée : "BETA" — fond #1e293b, texte blanc, borderRadius
  - Bulle réponse @storemd : "Welcome! Here's your install link 🔗" — fond CYAN #06b6d4, texte dark #050507
- Alternative en dessous : **"Or comment STOREMD under any post"** — blanc, 16px
- Sous-texte : **"We send you a direct install link. 60 seconds to set up."** — slate #94a3b8, 13px
- Logo StoreMD en bas

---

**SLIDE 0.4 — 1 CLIC, 1 SCAN GRATUIT, RÉSULTAT**

- Fond : #050507
- Titre : **"1 CLICK. 60 SECONDS. YOUR FULL HEALTH SCORE."** — blanc bold ~26px
- Visuel principal : screenshot du scan StoreMD en cours (cercle de progression cyan, texte "Scanning gymshark.com", barre de progression, rotating facts) — dans un frame iPhone, centré, bien visible, taille ~60% de la slide
- 3 mini-cards en rangée sous le screenshot (fond glass, border subtle white/10) :
  - "⚡ AUTO-SCAN" + "No config needed" — texte blanc + slate
  - "🎯 SCORE /100" + "Mobile + Desktop" — texte blanc + slate
  - "🔧 1-CLICK FIXES" + "Not just PDFs" — texte blanc + slate
- Logo StoreMD en bas
- URL discrète : "storemd.vercel.app" en mono JetBrains, #64748b

---

**SLIDE 0.5 — KILLER : ÉCONOMIES + CTA FINAL**

- Fond : #050507
- Haut : **"STOREMD KILLS 5 APPS."** — blanc bold ~30px. Le mot "KILLS" en CYAN #06b6d4
- Visuel : 5 lignes d'apps barrées (texte rayé, couleur rouge/grise #f87171) :
  - "~~SEO checker — $29/mo~~"
  - "~~Speed optimizer — $19/mo~~"
  - "~~Image compressor — $24/mo~~"
  - "~~Broken link finder — $39/mo~~"
  - "~~Accessibility scanner — $39/mo~~"
  - Total barré : "~~$150/month~~"
- En dessous : **"STOREMD: $29/MONTH."** — CYAN bold ~28px. Le "$29" en très grand (~48px)
- **"SAVE $1,452/YEAR"** — vert #16a34a, bold, ~24px
- CTA final en bas : rectangle CYAN pleine largeur, texte dark bold : **"DM 'BETA' — PRO FREE FOR 3 MONTHS →"**
- Logo StoreMD + **"10 spots remaining"** en rouge #f87171

---

### ═══ CAROUSEL 1 — INSTALLATION BETA ═══
### 7 slides × 2 formats = 14 images

**Objectif :** Manuel d'installation étape par étape. Le merchant est déjà convaincu, il veut agir. Chaque slide = 1 action concrète.

---

**SLIDE 1.1 — HOOK**

- **"HOW TO GET STOREMD PRO — FREE FOR 3 MONTHS"** — blanc bold massif
- Badge pill : "BETA ACCESS" en CYAN
- Sous-texte : **"7 steps. 60 seconds. No credit card."** — slate
- Screenshot du dashboard StoreMD en fond très subtil (opacité 10%)

---

**SLIDE 1.2 — STEP 1 : DM "BETA"**

- Numéro d'étape : grand "01" en CYAN, ~60px, coin supérieur gauche
- **"DM 'BETA' TO @STOREMD"** — blanc bold
- Visuel : simulation DM (même style que slide 0.3)
- Texte : **"Or comment 'STOREMD' on any of our posts"**
- Note : **"We reply within 24h with your personal install link"** — slate

---

**SLIDE 1.3 — STEP 2 : CLIC SUR LE LIEN**

- Numéro : "02" en CYAN
- **"CLICK YOUR INSTALL LINK"** — blanc bold
- Visuel : un lien URL stylisé sur fond dark (JetBrains Mono, glow cyan subtil)
- Texte : **"The app isn't on the Shopify App Store yet. You get early access."** — slate

---

**SLIDE 1.4 — STEP 3 : AUTORISATION SHOPIFY**

- Numéro : "03" en CYAN
- **"AUTHORIZE ON SHOPIFY"** — blanc bold
- Visuel : écran OAuth Shopify simulé (fond sombre, bouton "Install app" en vert Shopify #96bf48)
- Texte : **"One click. No signup. No password. Shopify handles everything."** — slate

---

**SLIDE 1.5 — STEP 4 : SCAN AUTOMATIQUE**

- Numéro : "04" en CYAN
- **"YOUR FIRST SCAN STARTS AUTOMATICALLY"** — blanc bold
- Visuel : screenshot scan en cours (cercle progression cyan, "Scanning yourstore.com")
- Texte : **"Zero configuration. Results in 60 seconds."** — slate
- Un des rotating facts en bas : "73% of stores have residual code from uninstalled apps." — italique, slate foncé

---

**SLIDE 1.6 — STEP 5 : RÉSULTATS**

- Numéro : "05" en CYAN
- **"SEE YOUR SCORE + FIX ISSUES"** — blanc bold
- Visuel : screenshot résultats (score 51/100 orange, badges CRITICAL/MAJOR/MINOR, premières issues)
- Texte : **"Health score, critical issues, 1-click fixes. All in one screen."** — slate

---

**SLIDE 1.7 — CE QUE TU OBTIENS (CLOSING)**

- Titre : **"WHAT YOU GET AS A BETA TESTER"** — blanc bold
- Récap visuel des avantages Pro :
  - Grande card glass : "PRO PLAN — $0 FOR 3 MONTHS" en CYAN, avec la valeur "$237 value" barré en slate
  - Liste des features Pro (même que slide 0.2)
  - Ligne bonus : "THEN 10% OFF FOR LIFE" — vert #16a34a
- CTA : rectangle CYAN : **"DM 'BETA' NOW — 10 SPOTS"**
- Logo StoreMD central

---

### ═══ CAROUSEL 2 — AGRESSIF VÉRITÉ ═══
### 6 slides × 2 formats = 12 images

**Objectif :** Chaque slide expose un problème que SEUL StoreMD résout. Preuves factuelles, ton direct. Le merchant doit douter de ses apps actuelles.

---

**SLIDE 2.1 — HOOK**

- **"5 PROBLEMS YOUR SHOPIFY APPS IGNORE."** — blanc bold massif
- Ligne 2 : **"STOREMD DOESN'T."** — CYAN #06b6d4
- Fond #050507 pur, glow subtil

---

**SLIDE 2.2 — FREE SCAN VS PAYWALL**

- Comparaison visuelle deux colonnes :
  - GAUCHE (rouge/gris, fond teinté #dc2626 à 5%) : "OTHERS" en haut, icône cadenas, texte : **"$9.99-$49.99 BEFORE YOU SEE ANYTHING"**
  - DROITE (cyan/glow, fond teinté #06b6d4 à 8%) : "STOREMD" en haut, icône check, texte : **"FREE SCAN. 60 SECONDS. NO CARD."**
- Chiffre au centre en très grand : **"$0"** en CYAN, ~72px
- Sous-texte : **"See your score before paying a cent."** — slate

---

**SLIDE 2.3 — GHOST BILLING**

- Titre : **"APPS YOU DELETED ARE STILL BILLING YOU."** — blanc bold
- Donnée choc en grand : **"$29/MO × 8 MONTHS = $232 WASTED"** — rouge #f87171, ~36px
- Contexte : **"40+ merchants reported this on Reddit. For ONE app."** — slate
- Différenciateur : **"StoreMD detects ghost subscriptions. Nobody else does."** — CYAN
- Visuel : mini card issue style StoreMD (severity CRITICAL, bordure rouge, fond rgba red 8%)

---

**SLIDE 2.4 — AI READINESS**

- Titre : **"CHATGPT NOW SELLS PRODUCTS DIRECTLY."** — blanc bold
- Donnée : **"AI ORDERS: 15× GROWTH IN 2025"** — CYAN, ~30px
- Liste : "Your store needs: GTIN, structured descriptions, metafields, schema markup." — slate
- Différenciateur en gros : **"STOREMD IS THE ONLY APP THAT SCANS AI READINESS."** — blanc bold
- Sous-ligne : **"ZERO COMPETITOR DOES THIS."** — CYAN
- Visuel possible : score "34%" en orange → "94%" en vert avec flèche

---

**SLIDE 2.5 — 1 APP KILLS 5**

- Titre : **"YOU'RE PAYING $150/MO FOR 5 APPS THAT SEND PDFS."** — blanc bold
- 5 lignes d'apps barrées (comme slide 0.5 mais layout différent — en colonne compacte)
- Flèche vers : **"STOREMD: 1 AGENT, 5 MODULES, $29/MONTH"** — CYAN bold
- Modules listés en pills : "Speed" "SEO" "Accessibility" "Links" "Images" — fond glass, border subtle

---

**SLIDE 2.6 — CTA OFFRE**

- Deux chemins clairs séparés visuellement :
  - Zone 1 (glass card) : **"FREE SCAN →"** + "storemd.vercel.app" en mono CYAN
  - Zone 2 (glass card, glow) : **"BETA PRO →"** + "DM 'BETA'" + "10 spots · 3 months free · 10% for life"
- Logo StoreMD central
- Ligne de crédibilité : **"Built from 530+ competitor reviews and 600+ merchant pain points."** — slate #64748b

---

### ═══ CAROUSEL 3 — GAINS POTENTIELS ═══
### 6 slides × 2 formats = 12 images

**Objectif :** Éducatif. On ne vend pas StoreMD, on montre les coûts invisibles. StoreMD apparaît UNIQUEMENT à la dernière slide. Le merchant fait le calcul lui-même.

---

**SLIDE 3.1 — HOOK**

- **"THE MONEY YOUR SHOPIFY STORE LOSES EVERY MONTH."** — blanc bold massif
- Ligne 2 : **"AND YOU DON'T KNOW IT."** — CYAN #06b6d4
- Pas de mention StoreMD, pur curiosité
- Fond #050507, glow subtil

---

**SLIDE 3.2 — SPEED TAX**

- Chiffre central ÉNORME : **"$2,500 — $5,000/MO"** — blanc bold, ~48px
- Explication : **"A store at 4s instead of 2s loses 5-10% of conversions."** — slate
- Contexte : **"On $50K monthly revenue, that's money you're leaving behind."** — slate
- Donnée additionnelle : **"Less than 50% of Shopify stores pass Core Web Vitals."** — CYAN, petit
- Visuel possible : barre de chargement lente stylisée, 4 secondes affichées

---

**SLIDE 3.3 — APP BLOAT**

- Chiffre central : **"14 APPS"** — CYAN bold, ~60px
- Sous-titre : **"Average Shopify store. Each one adds 200-500ms."** — blanc
- Explication : **"Total: +3 to 7 SECONDS of load time from apps alone."** — slate
- Pointe : **"The problem: you don't know which one."** — blanc bold
- Visuel possible : stack de blocs empilés représentant des apps avec les ms qui s'additionnent

---

**SLIDE 3.4 — GHOST BILLING**

- Chiffre central : **"$720 — $2,400/YEAR"** — rouge #f87171, ~40px
- Sous-titre : **"Apps you deleted. Still charging you. Silently."** — blanc
- Détail : **"$60-200/month on average."** — slate
- Pointe : **"You won't find this in your Shopify dashboard."** — blanc bold, petit
- Pas de mention StoreMD

---

**SLIDE 3.5 — THE 5-APP TAX**

- Chiffre central : **"$1,800/YEAR"** — blanc bold, ~48px
- Sous-titre : **"5 separate audit apps × $30/month average."** — slate
- Liste inline : "SEO + speed + images + links + accessibility" — slate
- Pointe : **"Result: 5 PDF reports. Zero actual fixes."** — CYAN
- Pas de mention StoreMD

---

**SLIDE 3.6 — LA SOLUTION (DOUCE)**

- Titre : **"SEE WHAT'S ACTUALLY COSTING YOU."** — blanc bold
- Sous-titre : **"Free. 60 seconds. No credit card."** — CYAN
- Gros bouton CTA CYAN centré : **"storemd.vercel.app"** — texte dark, font mono
- Logo StoreMD en dessous, taille moyenne
- Pas de vente dure, pas de prix, juste le lien
- Ligne finale discrète : **"One app. Five killed. Zero regrets."** — slate #64748b

---

## 7. RÈGLES GPT IMAGE GEN — TEXTE CORRECT

### 7.1 — Structure de chaque prompt

Chaque prompt ChatGPT image gen suit cette structure exacte :

```
1. FORMAT — "Generate a social media image, exact dimensions 1080×1920 pixels
   (vertical 9:16 ratio)" ou "1080×1350 pixels (4:5 ratio)"

2. FOND — "Dark background, nearly black, hex color #050507.
   No white, no light backgrounds, no gradients to white."

3. COULEURS — "Accent color: cyan/teal #06b6d4 for highlights, buttons, glows.
   White #f8fafc for main text. Slate gray #94a3b8 for secondary text."

4. STYLE — "SaaS marketing visual, dark premium theme, minimal and modern,
   tech aesthetic. No stock photos, no illustrations, no cartoons, no clip art.
   Clean editorial design."

5. TYPOGRAPHIE — "Clean bold sans-serif font similar to Outfit or Inter.
   Headlines are bold/extrabold. Body text is medium weight.
   Monospace font for URLs and numbers."

6. TEXTE — (voir section 7.2)

7. LAYOUT — Description précise du placement de chaque élément
   (haut, centre, bas, gauche, droite, taille relative)

8. ÉLÉMENTS VISUELS — Screenshots, icônes, cards, effets
```

### 7.2 — Comment obtenir du texte lisible dans GPT

GPT image gen fait des erreurs de texte. Voici les techniques pour maximiser la qualité :

**Règle A — MAJUSCULES COURTES**
- Tout texte principal en MAJUSCULES (ALL CAPS)
- Maximum 8 mots par ligne de texte principal
- Maximum 3 lignes de texte principal par image
- Les phrases longues → les couper en lignes courtes

**Règle B — RÉPÉTER LE TEXTE 3 FOIS DANS LE PROMPT**
```
Le texte principal doit dire exactement : "YOUR SHOPIFY STORE IS BLEEDING MONEY"
The main headline text reads: "YOUR SHOPIFY STORE IS BLEEDING MONEY"
Make sure the text is spelled correctly: "YOUR SHOPIFY STORE IS BLEEDING MONEY"
```

**Règle C — SPÉCIFIER LA TAILLE**
```
The headline "BLEEDING MONEY" should be very large, approximately 72pt equivalent,
taking up about 60% of the image width, centered horizontally.
```

**Règle D — DEMANDER LA LISIBILITÉ**
```
All text must be perfectly readable, correctly spelled, with proper letter spacing.
Typography is the focus — treat this like an editorial design piece.
```

**Règle E — TEXTE SECONDAIRE MINIMALISTE**
- Le texte secondaire (sous-titres, descriptions) est plus susceptible d'avoir des erreurs
- Le garder très court (3-5 mots max par ligne secondaire)
- Si le texte secondaire est crucial → le simplifier au maximum
- Si le résultat est illisible → l'ajouter en post-prod

**Règle F — COULEUR DE TEXTE EXPLICITE**
```
The word "BLEEDING" must be rendered in cyan color (#06b6d4).
The rest of the text is white (#f8fafc).
```

**Règle G — PAS DE TEXTE DANS LES ZONES COMPLEXES**
- Ne jamais mettre de texte sur un screenshot ou une image de fond chargée
- Le texte va toujours sur fond uni (#050507) ou sur une zone dégagée
- Si le layout a un screenshot, le texte est AU-DESSUS ou EN-DESSOUS, jamais par-dessus

### 7.3 — Stratégie de fallback

Si après 2 tentatives le texte d'une slide est illisible :
1. Regénérer l'image SANS texte (demander "leave blank space in the top third for text overlay")
2. Ajouter le texte en post-prod (CapCut, éditeur TikTok/Instagram, ou Canva)
3. Utiliser la même police (Outfit bold, blanc/cyan sur dark)

### 7.4 — Adaptation TikTok → Instagram

Pour chaque slide, 2 prompts sont nécessaires. La différence :
- TikTok (1080×1920) : plus de hauteur → plus d'espace entre les éléments, le contenu occupe les 2/3 centraux
- Instagram (1080×1350) : moins haut → éléments plus compacts, marges réduites, texte légèrement plus petit

Le contenu et les couleurs sont IDENTIQUES. Seul le layout s'adapte.

Dans le prompt, changer uniquement :
```
TikTok : "dimensions 1080×1920 pixels (vertical 9:16 ratio)"
Instagram : "dimensions 1080×1350 pixels (4:5 ratio)"
```
Et ajuster les descriptions de placement si nécessaire (plus compact pour IG).

---

## 8. PLAN D'EXÉCUTION

### Session 1 — Carousel 0 (PRIORITAIRE)

1. Générer les 5 prompts TikTok (1080×1920) pour les slides 0.1 à 0.5
2. Coller chaque prompt dans ChatGPT image gen, télécharger
3. Vérifier le texte de chaque image — regénérer si illisible
4. Générer les 5 prompts Instagram (1080×1350) pour les slides 0.1 à 0.5
5. Idem — coller, télécharger, vérifier
6. Poster le carousel TikTok + Instagram

### Session 2 — Carousel 2 (Agressif)

Même process, 6 slides × 2 formats = 12 images

### Session 3 — Carousel 1 (Installation)

Même process, 7 slides × 2 formats = 14 images

### Session 4 — Carousel 3 (Gains)

Même process, 6 slides × 2 formats = 12 images

### Total : 48 images, 48 prompts GPT

---

## 9. ÉLÉMENTS UI DU SITE UTILISABLES COMME VISUELS

Pour les slides qui intègrent des screenshots ou des éléments du site, voici les composants exacts du repo qui définissent le design :

| Élément | Fichier source | Ce qu'il montre |
|---------|---------------|-----------------|
| Hero | Hero.tsx | "One app. Five killed. Zero regrets." + DashboardMockup |
| Dashboard preview | DashboardMockup.tsx | Score 78, 3 issues (CRITICAL/MAJOR/MINOR), design glass |
| Modal saisie URL | ShopInputModal.tsx | "Enter your Shopify domain", fond #0f0f1a, border white/10 |
| Scan progress | ScanProgress.tsx | Cercle progression, 5 étapes, rotating facts |
| Issue cards | IssueCard.tsx | Severity chip, bordure colorée, boutons fix/dismiss |
| Score hero | ScoreHero.tsx | Score /100, cercle SVG, couleur selon valeur |
| Beta banner | BetaBanner.tsx | Gradient cyan→teal, "10 beta testers", "free for life" |
| Pricing | PricingPreview.tsx | Free $0, Starter $29, Pro $79, Agency $199 |

Ces composants sont la référence visuelle. Les screenshots des 2 HTML demos (mobile + desktop) montrent le rendu exact.

---

*Fin du plan. Prêt pour la génération des prompts.*
