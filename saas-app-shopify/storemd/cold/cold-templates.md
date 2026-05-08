# COLD TEMPLATES — StoreMD

> Frameworks pour construire des DMs cold. PAS des templates à copier-coller.
> Chaque DM doit être unique, personnalisé au store ciblé.
> Source hooks : `saas-app-shopify/storemd/context.md` section 5.
> Source voix R : `romain/VOIX.md`
> Source voix F : `fabrice/VOIX.md`
> Contrainte beta : lien landing page OK dans le premier DM. Lien d'installation arrive après la réponse du merchant.

---

## 1. SECTION R — COMPTES PERSO (angle business)

R DM depuis ses comptes perso (Twitter @delgado_ro72224, LinkedIn Romain Delgado, Facebook perso). Pronom : "I". Angle : ce que ça COÛTE au merchant.

### Framework général

```
1. ACCROCHE PERSONNALISÉE
   → Référencer quelque chose de spécifique au store (nom, produit, niche, élément visible)
   → Pas de "I noticed your store could use improvement"

2. PROBLÈME BUSINESS
   → Poser le problème en termes d'argent perdu, de conversion cassée, de revenus manqués
   → Utiliser un hook de C35 section 5

3. IMPACT CHIFFRÉ
   → Quantifier : "$X/mois", "Y% de conversion perdue", "$Z/an"
   → Ne PAS inventer de chiffres spécifiques au store — utiliser les ranges de C35

4. PROPOSITION
   → Proposer de montrer/résoudre, pas de pitcher
   → Court, une phrase
   → Lien landing page OK. Pas de lien d'installation.
```

### Par plateforme

**Twitter DM (3-4 phrases max) :**
- Ultra court. Pas de paragraphe.
- Aller droit au problème + impact.
- Contractions obligatoires.

**LinkedIn DM (4-5 phrases max) :**
- Un peu plus structuré mais toujours court.
- Peut référencer le profil LinkedIn du merchant (rôle, entreprise).
- Note d'invitation (3/mois) : encore plus court, 2-3 phrases.

**Facebook DM (3-4 phrases max) :**
- Casual. Contractions.
- Peut référencer le groupe où le merchant a été trouvé.
- Peut référencer un post du merchant dans un groupe.

### Par douleur (angle R = impact business)

**Vitesse :**
- Hook : chaque seconde coûte 7% de conversion
- Angle R : "your store loads in [X]s, that's roughly $[Y]/month in lost sales"

**App bloat :**
- Hook : store moyen = 14 apps = 2.8-7s de load time en plus
- Angle R : "you're running [X] apps, each one adds load time, that's costing you conversions"

**Ghost billing :**
- Hook : apps désinstallées continuent de facturer
- Angle R : "you might be paying for apps you uninstalled months ago. seen stores lose $50-200/month on this"

**Code résiduel :**
- Hook : apps laissent du code mort
- Angle R : "even after uninstalling apps, their code stays on every page of your store, slowing everything down"

**Perte de revenus :**
- Hook : $15K/mois store avec 4s au lieu de 2s = $2,100/mois perdu
- Angle R : aller direct au chiffre de perte estimé

**Bot traffic :**
- Hook : faux profils faussent les métriques
- Angle R : "your analytics might be counting bot visits as real traffic. your real conversion rate could be 2x what you think"

**Listings :**
- Hook : 80% des produits génèrent 0 trafic
- Angle R : "most of your products probably get zero organic traffic. that's fixable"

**IA readiness :**
- Hook : stores invisibles pour ChatGPT Shopping et Perplexity
- Angle R : "AI shopping agents can't see your products right now. that's going to matter more every month"

---

## 2. SECTION F — COMPTES PERSO (angle technique accessible)

F DM depuis ses comptes perso (Twitter @FabGangi, LinkedIn Fabrice Gangitano, Facebook perso). Pronom : "I". Angle : POURQUOI le problème existe, en termes simples.

### Framework général

```
1. ACCROCHE PERSONNALISÉE
   → Même principe que R : référencer quelque chose de spécifique au store
   → Pas de jargon dev dans l'accroche

2. CAUSE TECHNIQUE ACCESSIBLE
   → Expliquer pourquoi le problème existe en termes que le merchant comprend
   → Pas de code, pas de jargon dev
   → "your apps inject javascript on every page" pas "your DOM has render-blocking scripts"

3. IMPACT
   → La cause technique → l'impact business (connecter les deux)
   → Le merchant doit comprendre : ce truc technique = ça me coûte de l'argent

4. PROPOSITION
   → Proposer un scan ou un diagnostic
   → Court, une phrase
   → Lien landing page OK. Pas de lien d'installation.
```

### Par plateforme

**Twitter DM (3-4 phrases max) :**
- Ultra court. La cause technique en une phrase simple.
- Contractions obligatoires.

**LinkedIn DM (4-5 phrases max) :**
- Peut développer la cause technique un peu plus.
- Toujours accessible — le merchant doit comprendre sans être dev.

**Facebook DM (3-4 phrases max) :**
- Casual. Technique mais simple.
- Peut référencer le groupe/post source.

### Par douleur (angle F = cause technique accessible)

**Vitesse :**
- Hook : chaque seconde coûte 7% de conversion
- Angle F : "your store loads in [X]s. the main reason is usually the apps — each one adds its own code to every page. 14 apps = 14 extra scripts loading before your customer sees anything"

**App bloat :**
- Hook : store moyen = 14 apps
- Angle F : "each app you install injects javascript on every page of your store. even pages where the app isn't used. that's why removing unused apps can drop your load time by 1-2 seconds instantly"

**Ghost billing :**
- Hook : apps désinstallées facturent encore
- Angle F : "when you uninstall an app, shopify removes it from your dashboard but the billing doesn't always stop. and the app's code often stays in your theme files"

**Code résiduel :**
- Hook : apps laissent du code mort
- Angle F : "apps like PageFly, Privy, Shogun inject code directly into your theme. uninstalling removes the app but not the code. it keeps loading on every page"

**Perte de revenus :**
- Hook : $15K store, 4s→2s = $2,100/mois
- Angle F : connecter la cause technique (app bloat, code résiduel) à la perte chiffrée

**Bot traffic :**
- Hook : faux profils faussent les métriques
- Angle F : "bots hit your store like real users. your analytics counts them as sessions. your real conversion rate is probably higher than you think but your total traffic is inflated"

**Listings :**
- Hook : 80% des produits = 0 trafic
- Angle F : "most product pages don't have enough unique content for search engines to index them properly. no meta descriptions, duplicate titles, missing alt text"

**IA readiness :**
- Hook : stores invisibles pour les agents IA
- Angle F : "AI crawlers can access your blog pages but not your product pages. your store is invisible to ChatGPT Shopping and Perplexity when they recommend products"

---

## 3. SECTION STOREMD — COMPTES PRODUIT (ton neutre)

StoreMD DM depuis ses comptes produit (Instagram StoreMD, TikTok StoreMD). Pas de "I", pas de "we". Le produit parle de lui-même. Ton neutre, factuel, orienté résultat.

### Framework général

```
1. ACCROCHE PERSONNALISÉE
   → Référencer le store, la niche, un élément visible
   → Ton neutre : pas de "I saw your store" mais "your store [fait spécifique]"

2. CE QUE LE SCAN DÉTECTE
   → Décrire le résultat du scan, pas le process technique
   → "StoreMD scans your store in 60 seconds and finds..." pas "our AI agent uses browser automation to..."

3. RÉSULTAT CONCRET
   → Ce que le merchant gagne : temps, argent, visibilité
   → Chiffres ranges de C35, pas de chiffres inventés

4. PROPOSITION
   → Proposer un scan gratuit
   → Court, une phrase
   → Lien landing page OK. Pas de lien d'installation.
```

### Par plateforme

**Instagram DM (3-4 phrases max) :**
- Très court. Caption-style.
- Peut référencer le contenu du merchant (post, reel, bio).
- Émojis autorisés : 1 max, pas de 🚀🔥💰.

**TikTok DM (2-3 phrases max) :**
- Ultra court. Le plus casual des DMs.
- Peut référencer une vidéo du merchant.

### Par douleur (angle StoreMD = ce que le scan détecte)

**Vitesse :**
- Angle StoreMD : "StoreMD can scan your store in 60 seconds and show you exactly what's slowing it down — which apps, how much each one adds"

**App bloat :**
- Angle StoreMD : "StoreMD detects which apps are adding the most load time to your store. most merchants have 3-5 apps they could remove without losing anything"

**Ghost billing :**
- Angle StoreMD : "StoreMD has a ghost billing detector that checks if you're paying for apps you uninstalled. it catches stuff that doesn't show up in your dashboard"

**Code résiduel :**
- Angle StoreMD : "StoreMD scans your theme files for leftover code from uninstalled apps. that dead code keeps loading on every page and slows everything down"

**Bot traffic :**
- Angle StoreMD : "StoreMD separates real human traffic from bots. most stores have 20-40% bot traffic that inflates their analytics and wastes their ad budget"

**Listings :**
- Angle StoreMD : "StoreMD scans every product listing and scores it out of 100. SEO, descriptions, images, everything. most stores have 80% of products scoring below 50"

**IA readiness :**
- Angle StoreMD : "StoreMD checks if your store is visible to AI shopping agents like ChatGPT Shopping and Perplexity. most stores aren't — their product pages are blocked"

---

## 4. RÈGLES TRANSVERSALES

- **Lien landing page dans le premier DM : OUI.** Le lien vers storemd.vercel.app (ou storemd.com quand le DNS sera résolu) va dans le premier DM. C'est la présentation du produit.
- **Lien d'installation beta : APRÈS réponse seulement.** Le lien d'installation (Partner Dashboard) arrive quand le merchant répond qu'il veut tester. Jamais dans le premier DM.
- **JAMAIS de template copié-collé.** Chaque DM doit sembler écrit pour cette personne.
- **JAMAIS de social proof inventé.** Pas de "we've helped 500 merchants". Utiliser les métriques canon de C35 §9 si besoin.
- **TOUJOURS personnaliser.** Le nom du store, un produit, un élément de la bio, un post récent.
- **Court.** 3-5 phrases max, toutes plateformes.
- **Contrainte beta.** Flow : DM avec lien landing page → merchant répond → lien d'installation privé.
- **Anti-IA.** Contractions obligatoires (comptes perso). Pas de structures IA détectables (comptes perso). Comptes StoreMD : ton neutre mais naturel.
- **Quand ProfitPilot (ou autre SaaS) arrive** : créer un nouveau `cold-templates.md` dans `saas-app-shopify/profitpilot/cold/`. Même structure, hooks différents.
