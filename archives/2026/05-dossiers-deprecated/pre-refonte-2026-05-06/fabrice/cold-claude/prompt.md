# GUIDE COLD OUTREACH — Comment demander à Claude

**Usage :** Guide pour F. Comment formuler les demandes au projet Claude "Fabrice" pour des cold outreach de qualité.

---

## 1. LE FLOW

```
1. GROK trouve les cibles sur Twitter (prompts dans cold/grok/)
2. F identifie le vertical et l'insight technique pertinent
3. F ouvre le projet Claude "Fabrice" et donne les inputs ci-dessous
4. Claude rédige la reply
5. F valide, ajuste si nécessaire, et publie en PUBLIC
```

---

## 2. TEMPLATES PAR TYPE DE DEMANDE

### 2.1 Cold outreach Twitter

```
Cold outreach technique.
Vertical : [e-com / creator]
Cible : [description — ex: "merchant Shopify dont le store charge en 4.5s"]
Insight technique : [ex: "14 apps qui injectent du JS, chacune ajoute 200-500ms"]
Registre : [step-by-step / pourquoi technique / quick fix / etc.]
```

Claude produit la reply technique accessible dans la voix F.

### 2.2 Cold outreach LinkedIn

```
Cold outreach LinkedIn technique.
Vertical : [e-com / creator]
Cible : [description — ex: "YouTuber 50K subs qui se plaint du temps d'editing"]
Insight technique : [ex: "workflow automatisé : 1 video → 5 clips + blog + newsletter en 15 min"]
Ton : expert accessible, 800-1300 caractères, pas de jargon pur
```

---

## 3. DEMANDES DE SUIVI

### 3.1 Si la cible a répondu positivement

```
La cible a répondu à mon cold outreach.
Plateforme : [Twitter/LinkedIn]
Mon cold outreach initial : [copier le texte]
Sa réponse : [copier le texte]
Réponds en mode builder accessible, approfondi techniquement, ne pitche pas le prix.
```

### 3.2 DM de suivi Twitter

```
DM de suivi Twitter.
Problème technique partagé : [ex: "store speed"]
Pas de réponse depuis 24h.
```

---

## 4. RACCOURCIS

```
Cold Twitter. E-com. Merchant avec store à 4.5s. Insight : 14 apps = +2-3s de JS.
```

```
Cold LinkedIn. Creator. YouTuber qui passe 8h à repurposer. Insight : workflow automatisé en 15 min.
```

```
Suivi DM. Store speed. Pas de réponse.
```

---

## 5. CE QUE F NE DOIT JAMAIS OUBLIER DE DONNER

| Input | Pourquoi c'est obligatoire |
|-------|--------------------------|
| La plateforme | Le ton change entre Twitter (concis) et LinkedIn (professionnel pédagogique) |
| Le vertical | E-com ou creator — l'insight technique change |
| L'insight technique | Claude n'invente jamais. Les insights viennent de l'expérience de build et des données terrain (Reddit/Facebook). |

**Si F oublie un de ces 3 inputs, Claude doit demander avant de rédiger.**

---

## 6. FORMAT DE SORTIE OBLIGATOIRE

Chaque cold outreach que Claude produit DOIT suivre ce format exact :

**COLD OUTREACH [N]**
- **Lien :** [URL exacte du tweet de la cible]
- **Type :** Reply publique
- **Cible :** [@handle]
- **Ce qu'il a posté (FR) :** [résumé en français du problème, 1-2 lignes]
- **Vertical :** [e-com / creator]
- **Insight technique :** [l'insight partagé]
- **Ta reply à coller :** [texte exact à copier-coller, dans un bloc code]
- **Traduction de ta reply (FR) :** [traduction française]

F ne parle pas anglais couramment. Il a besoin de comprendre ce qu'il poste. Sans les traductions FR, l'action n'est pas exécutable.
