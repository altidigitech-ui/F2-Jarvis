# ANGLES & TEMPLATES — Fabrice

> RÈGLE #0 ACTIVE : Ces templates donnent l'ANGLE et les POINTS CLÉS uniquement. Claude DOIT les réécrire dans un style humain imparfait (voir VOIX.md §1). Un template copié proprement = détection IA = ban. Réécrire comme si F tapait vite depuis son téléphone.

Quand Claude génère du contenu pour F, il utilise le framework adapté au contexte.

**Ce fichier couvre 2 cas :**
1. Répondre aux commentaires sur les posts de F
2. Poster sur Reddit/Facebook après J22

**Ce fichier NE couvre PAS :**
- Les DM cold → voir `saas-app-shopify/storemd/cold/cold-templates.md`
- Les posts batch Twitter/LinkedIn → voir `publication/batch-semaine.md`
- La voix et les registres → voir `VOIX.md`

---

## 1. RÉPONDRE AUX COMMENTAIRES SUR NOS POSTS

Quand quelqu'un commente un post de F (Twitter, LinkedIn, Reddit, Facebook), F répond. Le but : convertir l'intérêt en beta tester ou client. F répond avec l'angle technique accessible — expliquer le POURQUOI en termes simples.

### Par type de commentaire

**"Comment ça marche ?" / "C'est quoi exactement ?"**
FRAMEWORK : Expliquer ce que le scan détecte en termes simples. Pas de jargon dev. Ce que le merchant COMPREND : "it checks every app on your store and measures exactly how much each one slows you down. takes 60 seconds."
Finir par une proposition de DM pour montrer un scan.

**"Intéressé" / "Comment tester ?" / "Where can I try this?"**
FRAMEWORK : Identique à R. Réponse immédiate. DM direct avec le lien.
"DMing you the link right now"

**"Combien ça coûte ?" / "What's the pricing?"**
FRAMEWORK : Identique à R. Free = 1 audit. Starter = $39/mois. Pro = $99/mois. Agency = $249/mois. Proposer un scan gratuit avant de décider.

**Question sur une feature spécifique**
FRAMEWORK : Répondre avec ce que le produit détecte et COMMENT ça aide le merchant. Pas le code derrière. "the ghost billing detector checks your billing page against your installed apps. if there's a mismatch you're paying for something you don't use."

**Scepticisme / "Another tool that does nothing"**
FRAMEWORK : Répondre avec un résultat technique concret mais accessible. "scanned a store last week. 14 apps installed, 6 injecting javascript on every page. each one adding 200-500ms. total load time was 4.2s. removed 3 of them, dropped to 2.3s." Laisser les chiffres parler.

**Critique technique / "This can't work because..."**
FRAMEWORK : F peut répondre techniquement mais en restant accessible. Pas de jargon. Expliquer en 2-3 phrases pourquoi ça fonctionne. Si la critique est valide, l'admettre. "you're right that not all apps inject the same way. that's why the scanner checks both the theme code and the network requests separately."

**"I have X problem with my store"**
FRAMEWORK : Diagnostic technique accessible. Identifier la cause probable en termes simples. "that sounds like app bloat. when you have 14+ apps each one adds its own code to every page. check your page source, ctrl+F for '<script', if you see more than 8 results that's your bottleneck." Si dans le scope de StoreMD, proposer un scan.

**Commentaire positif / "This is great"**
FRAMEWORK : Identique à R. Court. "appreciate it. want me to run a scan on your store?"

---

## 2. POSTS REDDIT / FACEBOOK APRÈS J22

Quand F poste ou commente sur r/shopify, r/ecommerce, groupes Facebook Shopify. Angle technique accessible — expliquer le pourquoi derrière les problèmes en termes que le merchant comprend.

### Par type de thread

**"Mon store ne convertit pas" / "Low conversion rate"**
FRAMEWORK : Diagnostic technique accessible. Identifier la cause probable (vitesse, app bloat, code mort). Expliquer pourquoi ça affecte la conversion en termes simples. "every second of load time kills about 7% of your conversions. if your store loads in 4s instead of 2s that's 14% of buyers gone." Si J22+, mentionner le scan.

**"Quel outil pour X ?" / "Best tool for..."**
FRAMEWORK : Comparaison sur ce que chaque outil fait TECHNIQUEMENT mais expliqué simplement. "TinyIMG compresses images. that helps but images are usually only 10-20% of the problem. the rest is app javascript." Si pertinent, mentionner le scan en dernier.

**"J'ai fait X et ça ne marche pas"**
FRAMEWORK : Expliquer POURQUOI ça n'a pas marché d'un point de vue technique accessible. "compressing images won't fix load time if you have 14 apps each injecting their own javascript. the images load fast but the scripts block everything else."

**"Comment avoir plus de trafic ?"**
FRAMEWORK : Recentrer sur le vrai problème technique. Si le store est lent, plus de trafic = plus de gens qui partent. Expliquer la cause technique en termes simples.

**"Store lent / Speed issues"**
FRAMEWORK : Terrain de F. Expliquer la cause en 2-3 phrases accessibles. "99% of the time it's not your images. it's the apps. every app you install adds javascript to every page. 14 apps = 14 extra scripts loading before your customer sees anything." Quick fix vérifiable. Si J22+, mentionner le scan.

**"Ghost billing / Chargebacks / Apps problems"**
FRAMEWORK : Expliquer le mécanisme technique en termes simples. "when you uninstall an app, shopify removes the billing but the app's code often stays in your theme files. and sometimes the billing doesn't stop either." Chiffre concret. Si J22+, mentionner le scan.

**Question technique (code, theme, API)**
FRAMEWORK : F peut répondre en profondeur mais toujours en termes accessibles. Pas de jargon dev. Si c'est très technique (API, webhooks), répondre avec l'impact pour le merchant, pas le détail d'implémentation.

---

## 3. RÈGLES TRANSVERSALES

- JAMAIS pitcher en premier. Le problème technique d'abord, toujours.
- JAMAIS utiliser du jargon dev sans explication immédiate.
- JAMAIS mentionner le produit si le problème du merchant n'est pas dans le scope du produit.
- JAMAIS copier-coller une réponse. Chaque réponse est unique.
- Sur Reddit/Facebook : prose, contractions, anti-IA max.
- Sur Twitter/LinkedIn : plus court, plus direct, proposer DM rapidement.
- Si le commentaire mérite juste "thanks" ou "noted", ne pas forcer une réponse longue.
- Chaque réponse qui mentionne le produit doit apporter de la valeur technique AVANT la mention.
- F explique le POURQUOI, R explique le COMBIEN. Complémentaires, pas redondants.
