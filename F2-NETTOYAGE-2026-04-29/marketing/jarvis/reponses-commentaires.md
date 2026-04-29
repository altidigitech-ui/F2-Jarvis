# Réponses aux commentaires — protocole JARVIS

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Workflow opérationnel
> Hérite de : `../strategie.md` + `../canaux/*.md` + `../contenu/formats.md`

---

## 1. Pourquoi ce fichier

Sur tous les canaux, **les commentaires/replies entrants génèrent les signaux algorithmiques les plus forts** :
- Twitter : reply engagée par l'auteur = **150× le poids d'un like**
- LinkedIn : commentaire substantif (15+ mots) = signal #1, **threads de conversation = 5.2× amplification**
- Reddit : engagement velocity = #1 — répondre dans la première heure
- TikTok / Insta / FB : commentaires longs > likes pour le ranking 2026

Donc on RÉPOND à chaque commentaire qui mérite. Mais répondre vite + bien à 50 commentaires/semaine = charge cognitive énorme. **JARVIS aide à drafter pour qu'on garde la qualité même quand le volume monte.**

Ce fichier décrit le workflow opérationnel pour répondre via JARVIS sur tous les canaux.

---

## 2. Le workflow standard — 4 étapes

```
[1] Notification reçue (commentaire / reply / DM)
        ↓
[2] Screenshot envoyé à JARVIS (Ctrl+V ou drag&drop)
        + message court : "reply à ça" (ou contexte)
        ↓
[3] JARVIS génère 2 variantes de réponse dans la voix de la persona active
        + log automatique de l'interaction
        ↓
[4] F ou R choisit une variante, ajuste si besoin, publie
```

**Temps estimé par commentaire** : 1-3 minutes en moyenne (vs 5-10 min sans aide). Permet de tenir la cadence quand le volume monte.

**Pattern JARVIS à utiliser** : envoyer un screenshot + message comme "reply à ça" / "comment répondre à ça" / "réponse pour ce thread r/shopify". JARVIS reconnaît automatiquement (un des 35 patterns auto-log).

---

## 3. Quand répondre vs quand ignorer

Tous les commentaires ne méritent pas une réponse. Critères :

### 3.1 RÉPONDRE quand

| Type de commentaire | Pourquoi répondre |
|---|---|
| Question pertinente sur le produit | Le merchant montre intérêt — opportunité conversion |
| Critique constructive | Apprentissage produit + crédibilité honnête |
| Désaccord argumenté | Conversation engagée = signal algo fort |
| Témoignage / observation terrain | Validation sociale + opportunité de creuser |
| Demande de démo / scan | Bascule sur scan boutique (levier 3) |
| Mention d'un problème StoreMD résout | Opportunité de fournir de la valeur (puis mention contextuelle si très pertinent) |
| Reply de quelqu'un d'établi dans la niche | Engagement d'experts = 5-7× signal LinkedIn |

### 3.2 IGNORER quand

| Type de commentaire | Pourquoi ignorer |
|---|---|
| "Great post 🔥" / "💯" / "this resonates" | Pas substantif. Réponse coûte plus que valeur. |
| Spam / bot évident | Ne pas alimenter, ne pas signaler (laisser mourir) |
| Trolling agressif sans argument | Ne pas escalader. Sentiment négatif down-rankés (Twitter, LinkedIn). |
| Commentaire random hors sujet | Pas de valeur, pas de signal |
| Pitch d'autre produit dans nos commentaires | Ignorer (les autres voient) |

### 3.3 BLOCK quand

- Spam répétitif du même compte
- Insultes / harcèlement
- Tentatives de phishing dans les DM

**Block ne pénalise pas notre compte** (ni Twitter, ni LinkedIn, ni Reddit). Mais il réduit l'engagement négatif futur (action négative = -148× sur Twitter).

---

## 4. Voix par plateforme et persona

JARVIS doit savoir QUI répond pour générer la bonne voix. Référence détaillée : `../contenu/formats.md` §9.

### 4.1 Tableau de décision

| Plateforme | Compte qui répond | Voix |
|---|---|---|
| TikTok `@storemd` | Compte produit | Neutre, factuel, axé résultats |
| Instagram `@storemd` | Compte produit | Neutre, factuel |
| Facebook page `@storemd` | Compte produit | Neutre, factuel |
| Facebook groupes Shopify | F ou R perso | Voix humaine builder (F) ou growth (R) |
| Reddit r/shopify, r/ecommerce, r/entrepreneur | F ou R perso | First-person, expertise, observations |
| Twitter @FabGangi | F façade builder | Technique, analytique, builder |
| Twitter @delgado_ro72224 | R façade growth | Business, growth, conversion |
| Twitter @foundrytwo | F2 studio | "We", studio, neutre |
| LinkedIn Fabrice Gangitano | F façade builder | Technique, analytique, builder |
| LinkedIn Romain Delgado | R façade growth | Business, growth, conversion |
| LinkedIn page FoundryTwo | F2 studio | "We", studio (rare, repost essentiellement) |

### 4.2 Comment indiquer la voix à JARVIS

Deux options :

**Option A — Persona JARVIS active** : si tu es loggé en tant que persona Romain (vert) ou Fabrice (violet) sur le cockpit JARVIS, la voix par défaut est celle de la persona. Pas besoin de préciser.

**Option B — Préciser dans le message** : si tu réponds depuis un autre compte (ex: F utilise sa persona JARVIS pour répondre depuis @storemd), préciser "voix @storemd" ou "voix F2" dans le message.

### 4.3 Voix `@storemd` — règles spécifiques

Compte produit `@storemd` n'a pas de manuel VOIX.md formalisé pour l'instant. Règles à appliquer :

- **Pas de "I", pas de "we"**. Le compte parle au nom du produit.
- **Factuel** : "StoreMD detects X" plutôt que "we found X"
- **Concis** : 2-3 phrases max par réponse en général
- **Axé résultats** : chiffres + impact
- **Anti-pitch** : pas "buy now" / "subscribe now" — neutre + lien UTM si pertinent

**Exemple voix @storemd** :
```
Commentaire : "Does this work for stores using Shopify Plus too?"
Réponse @storemd : "Yes, scans all Shopify plans (Basic to Plus). The Plus-specific apps (Launchpad, Scripts, Flow) are detected and analyzed. Free scan : [lien UTM bio]"
```

**Mauvais exemple (trop personnel)** :
```
Réponse FAUSSE : "Yes! We built it to support all Shopify plans, including Plus. Try it out, we'd love your feedback!"
```

---

## 5. Les 2 variantes proposées par JARVIS

Pour chaque commentaire, JARVIS propose **2 variantes** de réponse :

| Variante | Caractéristique |
|---|---|
| **Variante 1 — Substantielle** | Plus longue, apporte data/observation/exemple, pousse pour engager une conversation thread (signal 5.2× LinkedIn, 150× Twitter si reply auteur) |
| **Variante 2 — Concise** | Plus courte, factuelle, va à l'essentiel. Pour quand tu veux répondre vite ou que le commenter ne mérite pas un développement |

F ou R choisit selon le contexte :
- Commentaire d'expert reconnu → Variante 1 (potentiel thread amplification)
- Commentaire random mais OK → Variante 2 (économie de temps)
- Réponse à un troll calme → Variante 2 (pas s'étendre)

---

## 6. Cas particuliers

### 6.1 Demande de démo / scan / "DM me"

**Workflow** : on bascule en DM avec scan boutique réel.

```
[Commentaire public sur Insta]
"Looks interesting, can you scan my store? domain.myshopify.com"

[Action]
1. Scanner immédiatement domain.myshopify.com
2. Réponse publique courte : "Just scanned it. Sending findings in DM."
3. DM avec les findings concrets (cf. format DM cf. ../contenu/formats.md §7.1)
```

**JARVIS aide** :
- Pattern : "scan + DM à @merchant"
- JARVIS log la conversation, propose le format DM avec les findings (F ou R doit fournir les findings du scan)

### 6.2 Question technique pointue (Reddit, Twitter, LinkedIn)

**Workflow** : F répond en priorité (voix builder) avec précision technique. Si la question est business → R.

JARVIS aide à structurer la réponse autour des findings réels (`../../produits/MUTATIONS.md`) et des scans existants.

### 6.3 Critique du produit

**Règle** : honnêteté + remerciement + action.

```
[Commentaire critique]
"I tried StoreMD but the report was too vague, I expected more detail."

[Réponse à donner — voix @storemd]
"Thanks for the feedback. Which section felt vague? The findings are detailed per category but we're working on adding more actionable next-steps. Happy to take a deeper look at your report : [lien UTM]"
```

**JARVIS aide** : reconnaît le pattern critique, propose une réponse dans la voix qui :
- Remercie sincèrement
- Demande de la précision
- Propose un follow-up concret

**Anti-pattern** : ne JAMAIS être défensif. Ne jamais dire "you're wrong" ou "actually we do X". Reconnaître + creuser + agir.

### 6.4 Reply provocatrice / négative non-argumentée

**Workflow** : répondre calmement, factuellement, **une seule fois**. Si la personne escalade, ne pas re-répondre.

```
[Commentaire négatif sans argument]
"This is just another scan tool, nothing new."

[Réponse calme, factuelle]
"Most scans focus on speed only. StoreMD adds chargeback detection, app sub audit, ghost billing. If you've used a tool that does all that, curious which one : [lien UTM]"
```

**JARVIS aide** : pas escalader, pas être ironique, factuel.

### 6.5 Trolling pur

**Action** : ignorer ou block. Pas répondre. Sentiment négatif down-rankés (Twitter, LinkedIn). Engager avec un troll = signal négatif pour notre post entier.

### 6.6 Commentaire dans un thread où on a déjà répondu

**Action** : continuer la conversation (signal thread = 5.2× amplification LinkedIn, signal reply auteur Twitter). Premier-heure critique.

JARVIS log automatiquement : pattern "engagement fait sur [post]".

### 6.7 Commentaire en langue autre qu'anglais

**Action** : répondre dans la langue du commenter si possible (français, espagnol). Sinon répondre en anglais avec gentillesse.

JARVIS peut traduire et adapter à la voix de la persona.

---

## 7. Logging automatique JARVIS

Tout ce qui se passe est logué automatiquement (un des 35 patterns natifs).

| Pattern | Action |
|---|---|
| Screenshot envoyé + "reply à ça" | Log de la réception du commentaire |
| F ou R copie la réponse | Log de l'envoi de la réponse |
| "merchant a répondu" / "@user a répondu" | Log de la réponse du merchant |
| "scan + DM à @merchant" | Log du cold outreach |
| "thread continue avec @user" | Log de l'amplification |

Les logs alimentent le rapport hebdo vendredi (cf. `../objectifs.md` §7).

---

## 8. Bonnes pratiques timing

### 8.1 Twitter

- Reply auteur sur ton propre tweet < 30 min (golden hour Twitter)
- Reply de cross-engage F↔R sur posts F+R+F2 < 30 min
- Reply à une mention/conversation : ASAP, idéalement < 1h

### 8.2 LinkedIn

- Reply auteur sur ton propre post < 60 min (golden hour LinkedIn)
- Cross-engage F↔R < 60 min
- Reply à un commenter important : continuer la conversation = thread 5.2× amplification

### 8.3 Reddit

- Premier-heure : répondre à TOUS les commentaires < 1h (engagement velocity = #1 signal)
- Long tail : continuer à reply 24-48h après le post (boost long terme)

### 8.4 TikTok / Insta / FB Page

- Reply rapide < 6h post-publication (algo favorise les vidéos engagées rapidement)
- Long tail : continuer à reply pendant 1 semaine après publication

### 8.5 Reddit / Facebook groupes / DM cold outreach

- DM réponse < 24h
- Si pas de réponse au DM après J+3 → on lâche, pas de relance (cf. `../canaux/reddit.md` §7.3)

---

## 9. Patterns à utiliser dans la rédaction

### 9.1 Universels (toutes plateformes, toutes personas)

- **Reformuler la question avant de répondre** (montre qu'on a lu)
- **Donner un chiffre concret** (depuis MUTATIONS.md ou scans réels)
- **Apporter une nuance** (pas la même réponse pour tous les cas)
- **Question ouverte en fin** (pour relancer la conversation = signal thread)
- **Lien UTM uniquement si très pertinent** (pas systématique)

### 9.2 Spécifiques par persona

**Voix F (technique)** :
- Mentionner du code, des stack, des patterns techniques
- "I scanned X stores and saw..."
- "The way this typically breaks is..."

**Voix R (growth)** :
- Mentionner des chiffres business (conversion rate, MRR, ROI)
- "Most merchants don't realize..."
- "The data shows..."

**Voix @storemd (compte produit)** :
- "StoreMD detects/scans/finds..."
- Pas de "I", pas de "we"
- 2-3 phrases max par réponse

**Voix @foundrytwo (studio)** :
- "We built X because..."
- "Our experience shows..."
- Pluriel "we" approprié

---

## 10. Patterns à éviter

### 10.1 Patterns IA détectables (filtre obligatoire)

Cf. `../../ANTI-IA.md`. À bannir dans toutes les réponses :

- Em-dash "—" comme pivot de phrase
- Structure "Not X, it's Y"
- "Here's the thing"
- "At the end of the day"
- "Which means"
- "However,"
- "Furthermore,"
- "It's worth noting"
- Phrases trop "balancées" / parfaites
- Ponctuation parfaite (laisser quelques typos humaines, virgules manquantes)

### 10.2 Patterns voix incohérents

- Compte `@storemd` qui parle en "I"
- F qui pivote vers du growth (Knowledge Graph LinkedIn pénalise)
- R qui pivote vers du tech profond (idem)
- Voix off vidéo identifiable F ou R

### 10.3 Patterns ton

- Ne jamais être défensif
- Ne jamais escalader avec un troll
- Ne jamais être condescendant ("actually...")
- Ne jamais utiliser des emojis sauf si le commenter en a utilisé d'abord (et même là, parcimonie)
- Ne jamais reproduire des claims non vérifiables (BIBLE §3)

### 10.4 Patterns volume

- Ne pas répondre à 100% des commentaires (même les "🔥" → ignorer)
- Ne pas faire des réponses de 200 mots à un commentaire random
- Ne pas spammer plusieurs commentaires consécutifs sur le même post

---

## 11. Briefer JARVIS efficacement

### 11.1 Information minimale à fournir

Pour que JARVIS génère une bonne réponse :
1. **Screenshot du commentaire** (Ctrl+V ou drag&drop)
2. **Plateforme** (TikTok, LinkedIn, Reddit, etc.) — JARVIS détecte souvent depuis le screenshot mais préciser aide
3. **Compte qui répond** (si ambigu) — voix @storemd, F, R, F2

### 11.2 Information utile à ajouter

Si pertinent :
- **Contexte du post original** ("ce commentaire est sur ma vidéo TikTok #VID-S6-04 sur les chargebacks")
- **Tone visé** ("réponse courte" / "réponse détaillée" / "réponse calme")
- **CTA visé** ("avec lien" / "sans lien")
- **Action complémentaire** ("scan boutique en parallèle" / "logger comme conversation à suivre")

### 11.3 Exemple de bon briefing JARVIS

```
[Screenshot collé : commentaire LinkedIn d'un merchant qui demande
"Does this scan also detect customer service inefficiencies?"]

Message : "Reply à ça depuis Fabrice Gangitano. Réponse détaillée car
c'est un commenter qualifié (founder agency). Lien si pertinent."
```

JARVIS génère 2 variantes dans la voix F, technique, avec mention du module customer service de StoreMD si applicable + lien UTM linkedin organique.

### 11.4 Exemple de mauvais briefing

```
"reply"
[Pas de screenshot, pas de contexte]
```

JARVIS ne peut pas générer de réponse pertinente sans le commentaire original.

---

## 12. Métriques de pilotage

JARVIS sort chaque vendredi (rapport hebdo) :

| Métrique | Source |
|---|---|
| Nombre de commentaires reçus par plateforme | Logs JARVIS |
| Nombre de réponses publiées par plateforme | Logs JARVIS |
| Temps moyen de réponse (premier commentaire → reply publiée) | Logs JARVIS (timestamps) |
| Conversations qui ont déclenché des DM entrants | Logs JARVIS (pattern "@user a DM") |
| Conversations qui ont déclenché des installs | Croisement logs JARVIS + dashboard admin StoreMD UTM |
| Threads de conversation déclenchés (signal 5.2× LinkedIn) | Logs JARVIS |
| Top 3 conversations les plus engageantes (par profondeur de thread) | Logs JARVIS |

**À piloter** :
- Si temps moyen réponse > 6h → on rate la golden hour. Travailler la disponibilité.
- Si volume commentaires baisse → contenu peut-être moins engageant. À analyser.
- Si threads de conversation rares → réponses pas assez provocantes pour relancer.

---

## 13. Documents liés

- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons, rapport hebdo
- `../contenu/formats.md` — formats de réponse + voix par persona
- `engagement-reddit-fb.md` — protocole engagement Reddit + FB groupes (cas spécifique)
- `prompts.md` — prompts JARVIS pour génération
- `../canaux/twitter.md` §12 — réponses Twitter (signal 150×)
- `../canaux/linkedin.md` §12 — réponses LinkedIn (signal thread 5.2×)
- `../canaux/reddit.md` §10 — réponses Reddit (premier-heure)
- `../canaux/tiktok.md` §7 — réponses TikTok
- `../canaux/instagram.md` §9 — réponses Instagram
- `../canaux/facebook.md` §7 — réponses Facebook (page + groupes)
- `../../JARVIS.md` — manuel d'utilisation JARVIS complet (35 patterns)
- `../../romain/VOIX.md` + `../../fabrice/VOIX.md` — voix par persona (filtre anti-IA RÈGLE #0)
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- `../../produits/MUTATIONS.md` — sources chiffrées StoreMD pour réponses
- JARVIS : `https://f2-jarvis.vercel.app`
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
