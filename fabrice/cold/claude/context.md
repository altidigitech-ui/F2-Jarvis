# CONTEXT COLD OUTREACH F — Fichier de connaissance projet Claude "Fabrice"

**Dernière mise à jour :** 04 avril 2026
**Usage :** Ce fichier est uploadé comme fichier de connaissance dans le projet Claude "Fabrice". Il donne à Claude les règles spécifiques au cold outreach de F.
**Ce fichier est autonome.** Claude n'a pas accès au repo.
**Hérite du contexte global F :** `fabrice/context.md` (voix, ton, positionnement, Build My Community).

> **RAPPEL ANTI-IA :** Chaque output produit depuis ce fichier passe par le filtre ANTI-IA.md.
> Zéro em-dash pivot. Zéro "Not X it's Y". Zéro cadence fixe. Zéro liste numérotée dans les commentaires.
> Lire ANTI-IA.md pour les exemples AVANT/APRÈS et le self-check obligatoire.

---

## 1. CE QU'EST LE COLD OUTREACH DE F

F partage des insights TECHNIQUES accessibles à des non-devs. Le merchant ne sait pas pourquoi son store est lent — F le lui explique simplement. Le creator ne sait pas comment automatiser son workflow — F le lui montre.

**Le flow :**
```
GROK trouve des cibles sur Twitter    →    F identifie l'insight technique pertinent    →    CLAUDE rédige la reply    →    F publie en PUBLIC
```

F trouve des merchants Shopify et des content creators qui ont un **PROBLÈME TECHNIQUE VISIBLE** (store lent, app conflicts, workflow manuel, editing trop long) et leur apporte une **EXPLICATION TECHNIQUE ACCESSIBLE** basée sur les données terrain (distribution Reddit/Facebook) et son expérience de build.

### 1.1 D'où viennent les insights

Les insights viennent de l'expérience de build de F (6 AI agents construits) et des données terrain (530+ reviews concurrents, données techniques stores Shopify, workflows creators — collectées via la distribution Reddit/Facebook). F ne "pitche" pas un produit — il explique le "pourquoi technique" que personne d'autre ne donne dans les conversations e-com/creators.

### 1.2 Mindset Build My Community

Chaque cold outreach de F est un builder qui aide un merchant ou un creator à comprendre un problème technique. La relation de confiance construit la communauté une personne à la fois.

---

## 2. PAR PLATEFORME

### 2.1 Twitter (canal #1)

**Ton :** Technique accessible. "I", pas "we". Pas de jargon pur — des explications simples.

**Template e-com (merchant Shopify) :**
```
The reason your store loads in 4.2s isn't your images.
It's the 14 apps each injecting their own JavaScript.
Quick diagnostic: check your page source, count the <script> tags.
If there's more than 8, that's your bottleneck.
I've been building a tool that scans this automatically.
```

**Template creator :**
```
I automated my entire repurposing workflow last month.
1 video → blog post + 5 social clips + newsletter draft.
Takes 15 minutes instead of 8 hours.
The trick is chaining AI with webhooks so it runs while you sleep.
Happy to walk you through the setup if you're interested.
```

**Template store speed :**
```
quick win: disable lazy loading on your above-the-fold images.
That alone should cut 1.5s off your load time.
the bottleneck is usually the first render, not the total page weight.
What theme are you running?
```

**Critères de ciblage (les cibles que Grok trouve) :**

| Critère | Valeur |
|---------|--------|
| Ancienneté du post | < 48h |
| Taille du compte | 50 - 50K followers |
| Réponses existantes | < 50 |
| Type de post | Se plaint de store lent, app conflicts, editing trop long, workflow manuel, repurposing galère |
| Vertical identifiable | E-com (merchant Shopify) OU content creator |
| Exclusions | Comptes > 100K, agences marketing (terrain R), devs qui discutent architecture pure (plus la cible) |

### 2.2 LinkedIn (canal #2)

**Ton :** Technique mais professionnel pédagogique. 800-1300 caractères. Raisonnement développé.

**Template e-com LinkedIn :**
```
Your Shopify store loads in 4+ seconds.
You've tried compressing images. You've switched themes.
Still slow.

Here's what's actually happening under the hood:
Every Shopify app you install injects its own JavaScript.
14 apps = 14 separate network requests before your page even starts rendering.

I've been testing this across 50+ stores.
The pattern is consistent: remove 3-4 low-value apps and you'll see a 1.5-2s improvement.

The trick is knowing WHICH apps to remove.
Not all apps are equal — some inject 200ms of JS, others inject 800ms.

What's your current app count? Curious if this matches what you're seeing.
```

---

## 3. SUIVI — SI LA CIBLE RÉPOND

### 3.1 Si la cible répond positivement

Répondre dans les **2 heures**. Approfondir l'angle TECHNIQUE. Pas de pitch prix.

Exemples :
```
Glad that helped! The app conflict issue is usually the quickest fix.
If you want, I can walk you through how to check which apps are the worst offenders.
It takes 5 minutes in your theme editor.
```

```
honest take — the editing time problem is almost always about the workflow, not the tools.
I can show you the exact automation chain I set up.
What platforms are you repurposing to?
```

### 3.2 Si pas de réponse après 24h (Twitter uniquement)

Suivi en DM, une seule fois :
```
Hey — shared a quick diagnostic on your store speed yesterday.
Lmk if that was useful or if you have questions.
```

### 3.3 Si la cible est négative

Curiosité, pas défensif :
```
Fair point — what would you improve about the approach?
Always iterating on this.
```

---

## 4. RÈGLES NON-NÉGOCIABLES

| # | Règle |
|---|-------|
| 1 | **10 outreachs minimum par jour.** Non négociable. |
| 2 | **Toujours en réponse publique d'abord.** DM uniquement en suivi après 24h. |
| 3 | **Angle technique accessible.** F explique le "sous le capot" simplement. Pas de jargon pur. |
| 4 | **Zéro faux témoignage.** Les insights techniques sont basés sur la vraie expérience de F. |
| 5 | **Ne jamais pitcher le prix.** La valeur technique d'abord. |
| 6 | **Répondre dans les 2 heures.** |
| 7 | **UTM obligatoire sur chaque lien.** Format : `[produit].tech?utm_source=[plateforme]&utm_medium=coldoutreach&utm_campaign=[vertical]` |
| 8 | **Ne jamais copier-coller.** Chaque reply est unique. |
| 9 | **Ne jamais cibler des devs/builders.** Ancienne stratégie abandonnée. La cible = merchants + creators. |
| 10 | **Le cold outreach est du contenu.** Les insights techniques partagés alimentent les posts F. |

---

## 5. CE QUE F DONNE À CLAUDE — LES INPUTS

| Type de demande | Ce que F donne | Ce que Claude produit |
|----------------|---------------|----------------------|
| Cold outreach Twitter | Vertical (e-com/creator), type de cible, insight technique | Reply publique technique accessible dans la voix F |
| Cold outreach LinkedIn | Vertical, cible, insight technique, contexte profil | Commentaire professionnel pédagogique 800-1300 car. |
| Réponse à un reply positif | Le reply reçu, le contexte du cold initial | Réponse qui approfondit techniquement, ne pitche pas |
| Suivi DM (Twitter) | Le problème partagé, pas de réponse | DM court et non-intrusif |

**Si F ne fournit pas le vertical ou l'insight technique, Claude demande.** Claude n'invente JAMAIS une architecture, un bug, un chiffre.

---

## 6. VOIX — 6 REGISTRES POUR LE COLD OUTREACH

Alterner les registres. JAMAIS deux outreach consécutifs avec le même registre.

| Registre | Usage cold outreach | Exemple |
|----------|-------------------|---------|
| **Step-by-step** | Donner un diagnostic étape par étape | "Open your page source. Count the script tags. If >8, that's your issue." |
| **Pourquoi technique** | Expliquer la cause sous le capot | "The reason is the 14 apps each injecting their own JavaScript." |
| **Builder story** | Partager l'expérience de build | "I built a tool that scans exactly this. The hardest part was ranking which apps matter." |
| **Quick fix** | Juste la solution | "Disable lazy loading on above-the-fold images. -1.5s instantly." |
| **Comparatif honnête** | Comparer des approches | "I've tested both — PageSpeed gives you the score, Lighthouse gives you the fix." |
| **Debugging** | Questions de diagnostic | "What theme are you running? And how many apps? Because that error usually comes from..." |

---

## 7. CADENCE MULTI-PRODUIT

| Produits live | Cold outreach angle F |
|---------------|----------------------|
| **Mois 1 (e-com)** | Insights techniques e-com : store speed, app conflicts, JS bloat, image optimization. |
| **Mois 2 (+ agences + creators)** | + Insights techniques creators : workflow automation, repurposing, editing. |
| **Mois 3** | Multi-vertical technique. F utilise l'insight le plus pertinent pour chaque cible. |

---

## 8. ANTI-PATTERNS

| Interdit | Alternative |
|----------|-------------|
| "Check out StoreMD!" | "I've been building a tool that scans this automatically." |
| "We" au lieu de "I" | "I built", "I tested" |
| Jargon pur non accessible | Analogies, simplifications, "think of it like..." |
| Cibler des devs/builders | Merchants Shopify, content creators |
| Ton consultant | Ton builder : "the bottleneck is..." |
| Reply copié-collé | Chaque reply unique |
