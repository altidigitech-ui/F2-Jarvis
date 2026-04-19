# LEAK DETECTOR — Contexte produit

**Dernière mise à jour :** 04 avril 2026
**Source :** Adapté de `marketing/PRODUCT-CONTEXT.md` dans le repo leak-detector
**Rôle :** Fichier de connaissance uploadé dans les projets Claude R et F. Contient tout ce que Claude a besoin pour parler de Leak Detector avec précision.

---

> **⚠️ PIVOT 03/04/2026 — MUTATION VERS STOREMD**
>
> Leak Detector est LIVE depuis le 16/03/2026 mais les résultats sont faibles (~8 signups, 0€ MRR).
> **Diagnostic :** la cible dev (indie hackers, SaaS founders) ne paie pas pour des audits de landing page.
> **Décision :** LD mute vers **StoreMD** — un agent IA qui diagnostique et optimise les stores Shopify (cible : merchants Shopify, NON-devs).
> Les features LD (audit 8 catégories, score /100) sont intégrées dans StoreMD comme module d'audit.
> **Les personas §3 ci-dessous sont historiques** (cible dev). Les nouveaux personas StoreMD sont dans `../../produits/MUTATIONS.md`.
> LD reste actif en attendant la mutation complète. Le contenu brand building peut continuer à mentionner LD mais doit orienter vers StoreMD.

---

## 1. POSITIONNEMENT

### Ce que c'est

Leak Detector est un outil IA qui audite les landing pages et identifie les problèmes de conversion. L'utilisateur colle une URL, l'IA scanne **8 catégories** en **~60 secondes**, et retourne un **score /100** avec des recommandations actionnables.

### Ce que ce n'est pas

| Ce que LD n'est PAS | Pourquoi c'est important |
|---------------------|-------------------------|
| Un A/B testing tool | LD diagnostique. Il ne teste pas de variantes. |
| Un heatmap / analytics tool | LD n'installe pas de tracking sur la page. Il ne track pas les visiteurs. |
| Un page builder | LD ne crée pas de pages. Il analyse les pages existantes. |
| Un audit CRO humain | LD automatise le diagnostic initial. Il ne remplace pas un consultant pour les cas complexes. |
| Un SEO tool | Les 8 catégories sont orientées conversion, pas ranking. |

### Différenciateur principal

**Audit IA en 60 secondes vs audits CRO manuels qui coûtent €500+ et prennent des jours.**

Le marché offre soit des outils techniques partiels (PageSpeed = vitesse uniquement, Lighthouse = technique uniquement) soit des audits humains coûteux et lents. Leak Detector couvre 8 dimensions de conversion en une seule analyse automatisée.

### URL

`leakdetector.tech`

---

## 2. LES 8 CATÉGORIES D'ANALYSE

| # | Catégorie | Ce qu'elle évalue |
|---|-----------|------------------|
| 1 | **Headline** | Clarté et proposition de valeur du titre principal |
| 2 | **Call-to-Action** | Visibilité, formulation et placement du CTA |
| 3 | **Social Proof** | Témoignages, signaux de confiance, preuves sociales |
| 4 | **Forms** | Friction, nombre de champs, complexité des formulaires |
| 5 | **Visual Hierarchy** | Layout, lisibilité, hiérarchie visuelle |
| 6 | **Trust** | Sécurité, crédibilité, signaux de confiance institutionnels |
| 7 | **Mobile** | Responsive design, expérience mobile |
| 8 | **Speed** | Temps de chargement, performance |

Chaque catégorie retourne un score individuel + des issues spécifiques + des recommandations actionnables. Le score global /100 est la moyenne pondérée des 8 catégories.

---

## 3. PERSONAS CIBLES

### Persona 1 — Indie Hacker / SaaS Founder (primaire)

| Attribut | Détail |
|----------|--------|
| **Qui** | Fondateur solo ou petite équipe (<5 personnes) qui lance un produit |
| **Douleur** | Pas le budget pour un audit CRO (€500-2000), ne sait pas pourquoi sa LP ne convertit pas |
| **Comportement** | Twitter, r/SaaS, IndieHackers. Cherche des quick wins. Budget serré. |
| **Message clé** | "Get a CRO audit in 60s, not 60 days" |
| **Use case** | Lance son SaaS, 500 visiteurs/mois mais 1% de conversion. Veut savoir quoi fixer en priorité. |
| **Plan probable** | Free → Pro si le premier rapport est utile |

### Persona 2 — Growth Marketer

| Attribut | Détail |
|----------|--------|
| **Qui** | Marketer in-house dans une startup/scaleup (Série A-B) |
| **Douleur** | Doit optimiser les conversions rapidement et prouver le ROI à son manager |
| **Comportement** | Utilise déjà Hotjar, GA4, Mixpanel. Cherche des insights actionnables, pas des dashboards. |
| **Message clé** | "Find conversion leaks your analytics can't see" |
| **Use case** | 15 landing pages à optimiser. Diagnostic rapide pour prioriser les chantiers. |
| **Plan probable** | Pro (50 analyses = couvre son portefeuille) |

### Persona 3 — CRO Professional / Agence

| Attribut | Détail |
|----------|--------|
| **Qui** | Consultant CRO freelance ou agence spécialisée conversion |
| **Douleur** | Le diagnostic initial de chaque client prend des heures. Veut un screening rapide. |
| **Comportement** | Expert, exigeant sur la qualité. Compare avec ses propres audits. |
| **Message clé** | "Screen 50 client pages in an afternoon" |
| **Use case** | Nouveau prospect envoie 20 URLs. Premier diagnostic en 30 minutes, pas en 3 jours. |
| **Plan probable** | Agency (200 analyses = volume client) |

### Persona 4 — Freelance Web Designer

| Attribut | Détail |
|----------|--------|
| **Qui** | Designer qui crée des landing pages pour des clients |
| **Douleur** | Veut valider que son design convertit, justifier ses recommandations avec des données |
| **Comportement** | Figma/Webflow/Framer. Livre des pages mais ne sait pas si elles performent. |
| **Message clé** | "Prove your design works — or fix it before delivery" |
| **Use case** | Livre une LP, lance LD, obtient 82/100, joint le rapport à sa livraison. |
| **Plan probable** | Pro (analyse chaque livraison + itérations) |

---

## 4. USP & MESSAGING

### Tagline Product Hunt (validée)

```
Find what makes visitors leave your landing page in 60 seconds
```

### Elevator pitch (30 secondes)

```
Leak Detector is an AI tool that audits landing pages in 60 seconds.
Paste any URL, get a score out of 100 across 8 conversion categories,
with specific issues and actionable fixes.
It's like having a CRO consultant on demand — for €29/month instead of €500/audit.
```

### Messages par persona

| Persona | Hook principal | Angle secondaire |
|---------|---------------|-----------------|
| Indie Hacker | "Your landing page is leaking visitors. Find out where in 60 seconds." | Gratuit pour commencer, pas besoin d'expert |
| Growth Marketer | "Stop guessing what's wrong with your conversion rate." | Données structurées, 8 catégories, actionnable |
| CRO Pro / Agence | "Screen 50 client pages in an afternoon." | Volume, rapidité, diagnostic initial automatisé |
| Web Designer | "Ship landing pages with confidence." | Preuve de qualité, rapport à joindre au livrable |

### Vocabulaire

**À utiliser :** "Conversion leaks" (pas "bugs"), "actionable fixes" (pas juste des scores), "60 seconds" (vitesse), "8 categories" (couverture), "score /100" (tangible, comparable, shareable).

**À éviter :** "Revolutionary" / "game-changing" (creux), "AI-powered" comme seul argument (tout est IA en 2026), "the best" / "the only" (indémontrable), "guaranteed results" (on diagnostique, on ne garantit pas).

---

## 5. PRICING

### Grille

| Plan | Prix | Analyses/mois | Features clés |
|------|------|---------------|---------------|
| **Free** | €0 | 3 | Score + résumé des issues principales. Rapport gaté (détails verrouillés). |
| **Pro** | €29/mois | 50 | Rapport complet déverrouillé + recommandations détaillées + export PDF |
| **Agency** | €99/mois | 200 | Idem Pro + volume pour gérer des clients multiples |

### Logique derrière chaque palier

| Plan | Rôle | Ancrage prix |
|------|------|-------------|
| **Free** | Acquisition. Faire goûter la valeur. Le rapport gaté montre qu'il y a plus à voir → incite à upgrader. 3 analyses = tester sur sa page + 1-2 concurrents. | Gratuit |
| **Pro** | Conversion individuelle. Sweet spot founder/marketer solo. 50 analyses = portefeuille de pages + re-tests après modifications. | €29 < 30 min de consulting CRO. Un audit humain = €500-2000. |
| **Agency** | Conversion volume. Agences et consultants multi-clients. 200 analyses = screening prospects, audits clients, suivi mensuel. | €99 = le coût d'un seul audit CRO partiel. |

### Mécanisme de gating

Le rapport Free affiche le score global et un résumé des issues. Les recommandations détaillées, les fixes spécifiques et l'export PDF sont verrouillés avec un prompt d'upgrade. L'utilisateur voit assez pour comprendre la valeur, pas assez pour s'en passer.

### Unit Economics (plan Pro)

| Métrique | Valeur |
|----------|--------|
| Prix | €29/mois (€348/an) |
| Coût LLM/analyse | ~€0.15 (Claude Sonnet, ~4k tokens) |
| Analyses/user/mois estimées | ~10 |
| Coût LLM/user/mois | ~€1.50 |
| Coût infra/user/mois | ~€0.50 |
| **Marge brute** | **~93%** |
| CAC cible | <€50 (organic + content) |
| LTV (12 mois, 20% churn) | ~€180 |
| LTV/CAC | >3.5x |

---

## 6. PAYSAGE CONCURRENTIEL

### Alternatives directes

| Concurrent | Ce qu'il fait | Prix | Faiblesse vs LD |
|------------|--------------|------|----------------|
| Audits CRO humains | Audit manuel complet, recommandations personnalisées | €500-2000/audit, 3-10 jours | Lent, cher, pas scalable |
| Unbounce Smart Traffic | A/B testing + optimisation IA sur pages Unbounce | Inclus dans Unbounce ($99+/mois) | Verrouillé écosystème Unbounce. Pas un audit — c'est du testing. |
| Landing Page Grader (divers) | Outils gratuits basiques, checklist | Gratuit | Superficiel, pas d'IA, pas de recommandations actionnables |

### Alternatives indirectes

| Outil | Couverture | Ce qui manque vs LD |
|-------|-----------|-------------------|
| Google PageSpeed Insights | Vitesse + Core Web Vitals | 1 catégorie sur 8. Rien sur headline, CTA, social proof, trust. |
| Lighthouse | Performance, accessibilité, SEO technique | Technique uniquement. Zéro conversion/copywriting. |
| Hotjar / Microsoft Clarity | Heatmaps, session recordings | Montre LE QUOI (où les gens cliquent) pas LE POURQUOI (pourquoi ils partent). Nécessite du trafic existant. |
| Mixpanel / Amplitude | Analytics comportementales | Post-visite. Ne diagnostique pas la page elle-même. |
| SEMrush / Ahrefs | SEO, backlinks, keywords | SEO ≠ CRO. Rien sur la conversion de la page. |

### Positionnement dans le paysage

LD occupe la case **diagnostic de conversion** — l'analyse de la page elle-même en tant qu'outil de persuasion. C'est le seul outil qui couvre les 8 dimensions de conversion en une seule analyse automatisée.

### Moat (honnêteté)

Faible à ce stade. Le moat technique est limité (Playwright + LLM = reproductible). Le moat se construit via : la data (chaque analyse enrichit la compréhension des patterns), la vitesse d'exécution (premier avec une UX propre et un pricing accessible), la brand (FoundryTwo build in public), et la distribution (contenu, SEO, cold outreach = avantage d'acquisition organique).

---

## 7. STACK TECHNIQUE

### Ce qu'on peut dire publiquement

| Composant | Technologie | Mentionnable dans |
|-----------|------------|-------------------|
| Scraping | Playwright | PH maker comment, posts techniques F, blog |
| Analyse IA | Claude API (Sonnet) | PH maker comment, posts techniques F, blog |
| Backend | FastAPI (Python 3.12) | PH maker comment, posts techniques F |
| Frontend | Next.js 14 + TypeScript | PH maker comment, posts techniques F |
| Database/Auth | Supabase PostgreSQL | Posts techniques F |
| Paiement | Stripe | Implicite |

### Ce qui reste INTERNE (ne jamais partager)

| Composant | Raison |
|-----------|--------|
| Prompts IA (structure et contenu des prompts Claude) | Propriétaire |
| Logique de scoring (comment le score /100 est calculé) | Propriétaire |
| Hébergement backend (Railway) | Pas de valeur marketing |
| Hébergement frontend (Vercel) | Pas de valeur marketing |
| Worker queue (Celery + Redis) | Détail d'implémentation |
| Admin dashboard | Outil interne |

---

## 8. LIEN AVEC LE STUDIO

### Hiérarchie de communication

| Situation | Qui parle | Exemple |
|-----------|-----------|---------|
| Lancement produit | LD + F2 | PH = Leak Detector. Twitter recap = F2 ("We just shipped...") |
| Contenu CRO / données | R (angle CRO) | "After analyzing 50 SaaS landing pages..." |
| Contenu technique / stack | F (angle builder) | "Here's how the scoring pipeline works under the hood" |
| Build in public / learnings | F2 (angle studio) | "Week 1 stats from our first SaaS..." |
| Bug fix / feature update | F2 ou F | "Just shipped PDF export for Pro users" |
| Milestone business | F2 | "First paying customer on our first product" |

### Ce que LD hérite du studio

| Règle | Source |
|-------|--------|
| Zéro faux témoignage, zéro stat inventée | Règle absolue FoundryTwo |
| Toute communication en anglais | marketing/context.md §9.1 |
| Ton pro, honnête, data-driven, jamais arrogant | marketing/context.md §2.1 |

### Ce que LD a en propre

| Élément | Détail |
|---------|--------|
| Domaine | `leakdetector.tech` |
| Identité produit | Logo LD, couleurs produit |
| Messaging | Orienté CRO. Vocabulaire CRO standard. PAS de vocabulaire forge (forged, anvil = F2 uniquement). |
| Emails transactionnels | `noreply@leakdetector.tech` via Brevo |

### Vocabulaire forge vs CRO

Le vocabulaire forge de FoundryTwo (shipped, forged, anvil, from the forge) s'utilise **uniquement** sur le compte @foundrytwo et dans le contenu studio. Les communications Leak Detector (landing page, emails, PH, rapports, cold outreach) utilisent un vocabulaire CRO standard. Pas de mélange.

### Cross-sell (quand StoreMD et les SaaS e-com sont live)

| Action | Détail |
|--------|--------|
| Mutation LD → StoreMD | Les users LD sont migrés vers StoreMD. L'audit de page devient un module de StoreMD. |
| Mention "Also from FoundryTwo" sur chaque site | Cross-sell vertical e-com : StoreMD + ProfitPilot (ex-ListingLab → module Listings StoreMD, ex-ChargebackShield → module Anti-Fraude ProfitPilot) |
| Emails Brevo | Mention des nouveaux produits dans la séquence existante |
| Posts sociaux | Contenu portfolio vertical — "We build AI agents for Shopify merchants" |

---

## 9. POUR LE COLD OUTREACH

Ce que R et F donnent à Claude quand ils demandent un cold outreach basé sur LD :

| Input | Exemple |
|-------|---------|
| URL analysée | `https://example.com` |
| Score | 52/100 |
| Top 2-3 leaks | "Headline doesn't state the outcome. No social proof above the fold. CTA says 'Submit' instead of finishing the sentence 'I want to...'" |
| Plateforme | Twitter / Reddit / IH |

Claude rédige la reply en utilisant ces données réelles. Les templates sont dans les fichiers activité (`romain/cold/claude/context.md` pour R, `fabrice/cold/claude/context.md` pour F). Ce fichier fournit le contexte produit pour que Claude comprenne CE QUE fait LD et COMMENT en parler.

---

## 10. POUR LA PUBLICATION

Ce que R et F donnent à Claude quand ils rédigent un post basé sur les données LD :

| Type de donnée | Exemple d'utilisation |
|---------------|----------------------|
| Score moyen des audits de la semaine | "68% of pages I audited this week scored below 60/100" |
| Leak la plus fréquente | "The #1 conversion killer I see every week: unclear headlines" |
| Pattern cross-audits | "Pages with social proof above the fold score 23 points higher on average" |
| Nombre d'audits cumulés | "After analyzing 200+ landing pages..." |
| Anecdote d'un audit notable | "Audited a page yesterday: 38/100. The headline was about the product, not the visitor." |

Claude transforme ces données en posts dans la voix de R (provocateur, CRO, "I") ou F (technique, builder, "I") ou F2 (studio, build in public, "we"). Les règles de voix sont dans les system prompts respectifs. Ce fichier fournit les données produit.
