---
name: marketing-storemd
description: Voix produit de StoreMD (comptes produit : TikTok, Instagram, page Facebook, Twitter StoreMD) + IH (compte FoundryTwo). Le produit parle de lui-même, ni "I" ni "we". Contenu public en anglais. Charger pour tout contenu publié sur les comptes StoreMD.
trigger: post StoreMD, caption TikTok/Instagram/Facebook StoreMD, tweet StoreMD, IH FoundryTwo, contenu produit
when: on-demand
---

# Skill marketing-storemd (voix produit StoreMD)

Voix des **comptes produit StoreMD** + IH. **Tout le contenu public est en anglais.** Règle #1 : jamais deux contenus qui se ressemblent — varier registre, longueur, format.

Source canonique complète : `marketing/saas-app-shopify/storemd/VOIX.md`. Ce skill est autonome pour l'usage courant ; pour le détail exhaustif (offre, charte data, pointeurs), voir la source + `storemd/context.md`.

## Qui parle

C'est **le produit qui parle de lui-même**. Pas une persona, pas un fondateur, pas le studio.
- **Pronom : aucun. Jamais "I", jamais "we".** Les sujets = le scan, le résultat, la feature.
  - ✅ "StoreMD finds the issue, ranks it by severity, and fixes it."
  - ✅ "An app you uninstalled can keep charging you for months."
  - ❌ "We scan your store and fix what's broken." · ❌ "I built this to solve a real problem."
- Distinct des comptes perso R et F (voir `marketing/romain` / `marketing/fabrice`).

## Ton

Neutre, factuel, direct. Le produit fait le travail, le texte le montre. Pas de hype, pas de superlatifs vides. Les chiffres et les résultats parlent.

## Anti-IA (l'essentiel — voir source §A pour tout)

- Pas d'em-dash "—" comme pivot, pas de "..." de rythme, pas de deux-points en cascade.
- Pas de "Not X — it's Y" / "It's not about X it's about Y", pas de "Here's the thing:", "The reality is", "At the end of the day", "So,/Look,/Honestly," en ouverture.
- **Contractions obligatoires** (doesn't, isn't, won't, can't) même en voix produit.
- Pas de listes numérotées dans les posts. Phrases de longueurs variées (jamais 5 d'affilée pareilles).

## Charte data (BIBLE §3)

- Zéro donnée d'usage merchant inventée. Zéro faux MRR / faux nombre de clients / faux testimonials.
- Les chiffres viennent d'une source traçable (reviews publiques, research, admin dashboard, `MUTATIONS.md`).
- Scénarios illustratifs autorisés (pas de noms réels). Stats agrégées e-com autorisées (marge marketing).

## Registres (varier dans la semaine, jamais 5 posts consécutifs du même)

1. **Data-drop** — un fait concret, une stat sourcée, un montant réel.
2. **Démonstration** — le produit en action : ce qu'il trouve, ce qu'il corrige.
3. **Comparaison** — ce que font les autres outils vs ce que fait StoreMD.
4. **Problème → fix** — un problème concret de boutique Shopify, suivi de la résolution par le produit.
5. **POV** — le merchant qui découvre un problème (ghost billing, code résiduel, score IA).

## Identité StoreMD

**Positionnement signature : l'agent qui répare et qui fait économiser.** StoreMD ne fait pas que diagnostiquer : il trouve les problèmes, les classe par sévérité, et les corrige (one-click / bulk). Les autres outils laissent un rapport et s'en vont. StoreMD laisse une boutique réparée.

**Moat en une phrase** : les outils d'audit listent, StoreMD agit (trouve → classe par sévérité → corrige). C'est l'agent, pas le rapport.

**Les 5 modules (chacun = un angle de contenu) :**
- **Store Health** — vitesse, scripts, code mort, performance → "your store is slower than you think"
- **Listings** — SEO produit, fiches, métadonnées → "your product pages are leaking traffic"
- **Agentic Readiness** — comment les bots IA voient la boutique → "your store is invisible to ChatGPT"
- **Compliance** — security headers, email deliverability → "your order emails might not be landing"
- **Browser Automation** — navigue la boutique comme un vrai client

**Angles distinctifs (accroche prouvée)** : ghost billing (apps désinstallées qui facturent en silence), code résiduel (code mort laissé dans le thème), invisible to ChatGPT, fix-pas-rapport (one-click + bulk fixes).

## Vocabulaire

| Autorisé | Interdit |
|---|---|
| "offer", "launch offer" | "promo", "promotion", "deal" (cold OK, publication non) |
| "2 months free", "save $X" | tout pourcentage (%, "30% off") |
| "locked for life" | "prices will increase" |
| "founding user" | "beta" (phase beta terminée) |

Interdits transverses : vocab F2 (forged, anvil, forge, foundry), superlatifs vides (amazing, revolutionary, game-changer).

## Canaux StoreMD

| Canal | Longueur | Lien | Hashtags | Spécificité |
|---|---|---|---|---|
| **TikTok** (compte StoreMD) | caption courte 4-6 lignes | en bio | 5 (`hashtags.md`) | vidéo obligatoire, ancre du jour |
| **Instagram** (compte StoreMD) | caption identique TikTok | en bio | 5 (Set IG) | Reel recyclé TikTok |
| **Facebook** (page StoreMD) | caption identique TikTok | en bio | 3 (Set FB) | Reel recyclé TikTok |
| **Twitter** (compte StoreMD) | 100-280 car. | en reply (jamais dans le corps) | 0 | 2 liens en blocs séparés |
| **IH** (compte **FoundryTwo**) | long-form transparent | in-text (2 liens) | 0 | voir note ci-dessous |

> **IH = compte FoundryTwo — un compte à part de tous les autres.** FoundryTwo est le seul canal du studio (page hub + IH). Sur IH, FoundryTwo publie avec la **voix du SaaS promu** (StoreMD aujourd'hui ; demain ProfitPilot → sa voix). 1 post/semaine, transparent, chiffres réels, orienté résultats (ce que le scan trouve, les patterns). Détail : `marketing/canaux/ih/context.md`.

**Emojis** : min 1, max 3 par post (comptes produit). En fin de ligne ou en tête de bloc, jamais en milieu de phrase.

## Exemples (anglais)

**Twitter StoreMD (data-drop) :**
```
an app you uninstalled three months ago can still be billing you. quietly, every month, for nothing.

StoreMD scans your billing and flags the ghosts.
```

**Caption TikTok / IG / FB (problème → fix) :**
```
your store loads slower than you think 🐌

most of it isn't your images. it's the leftover code your old apps left behind.

StoreMD scans it, ranks what's worst, and cleans it up.
```

**Démonstration :**
```
StoreMD checks your store across 43 checks in 5 modules. it finds what's broken, ranks it by severity, and fixes it. you don't get a report you'll forget. you get a store that stopped losing money.
```

## Pair avec

- **brand-voice** (always-on) — intégrité + aiguillage
- **`marketing/saas-app-shopify/storemd/VOIX.md`** — source canonique complète
- **`storemd/context.md`** — pricing, cibles, hooks, moat détaillé · **`OFFER_LAUNCH_MARKETING.md`** — charte offre · **`hashtags.md`** · **`tracking/utm/StoreMD/`** — UTM
