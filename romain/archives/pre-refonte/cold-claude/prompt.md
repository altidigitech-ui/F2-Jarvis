# GUIDE COLD OUTREACH — Comment demander à Claude

**Usage :** Ce fichier est un guide pour R. Il explique comment formuler les demandes au projet Claude "Romain" pour obtenir des cold outreach de qualité. Ce n'est PAS un system prompt — le system prompt est dans `romain/system-prompt.md`.

---

## 1. LE FLOW

```
1. GROK trouve les cibles sur Twitter (prompts dans cold/grok/)
2. R identifie le vertical et l'insight terrain pertinent
3. R ouvre le projet Claude "Romain" et donne les inputs ci-dessous
4. Claude rédige la reply
5. R valide, ajuste si nécessaire, et publie en PUBLIC
```

---

## 2. DONNÉES À DONNER À CLAUDE PAR TYPE DE DEMANDE

Le projet Claude "Romain" est pré-configuré. R lui parle naturellement — Claude sait quoi produire grâce au system prompt et aux fichiers de connaissance. R doit juste lui donner les bonnes données.

### 2.1 Cold outreach Twitter

```
Cold outreach Twitter.
Vertical : [e-com / agence]
Cible : [description — ex: "merchant Shopify qui se plaint de chargebacks sur Twitter, 2K followers"]
Insight à partager : [données terrain — ex: "$800/mois de perte moyenne, 71% friendly fraud"]
Registre : [diagnostic / framework / data-drop / etc. — ou laisser Claude choisir]
```

Claude produit la reply publique dans la voix R. Pas de nom de produit dans le premier tweet.

### 2.2 Cold outreach LinkedIn

```
Cold outreach LinkedIn.
Vertical : [e-com / agence]
Cible : [description — ex: "freelancer marketing avec 500 connexions, posts sur le reporting client"]
Insight à partager : [données terrain — ex: "15h/mois perdues en reporting manuel selon 50+ agency owners"]
Ton : professionnel, data-driven, 800-1300 caractères
```

Claude produit le commentaire professionnel avec insight détaillé et question de suivi.

---

## 3. DEMANDES DE SUIVI

### 3.1 Si la cible a répondu positivement

```
La cible a répondu à mon cold outreach.
Plateforme : [Twitter/LinkedIn]
Mon cold outreach initial : [copier le texte]
Sa réponse : [copier le texte]
Réponds dans mon ton, approfondi l'insight, ne pitche pas le prix.
```

### 3.2 DM de suivi Twitter (pas de réponse après 24h)

```
DM de suivi Twitter.
Problème partagé : [ex: "chargebacks"]
Pas de réponse depuis 24h.
```

Claude produit le DM court et non-intrusif.

### 3.3 Réponse à une critique

```
La cible a répondu négativement.
Plateforme : [Twitter/LinkedIn]
Sa réponse : [copier le texte]
Réponds avec curiosité, pas défensivement.
```

---

## 4. RACCOURCIS

Quand R est en rythme de croisière et que Claude connaît bien le contexte, les demandes peuvent être raccourcies :

```
Cold Twitter. E-com. Merchant qui perd des ventes à cause de la vitesse du store. Insight : +2.3s load time par 5 apps installées.
```

```
Cold LinkedIn. Agence. Agency owner qui galère avec le reporting client. Insight : 15h/mois en rapports manuels.
```

```
Suivi DM. Chargebacks. Pas de réponse.
```

Claude comprend et produit dans le bon format car le contexte est dans les fichiers de connaissance.

---

## 5. CE QUE R NE DOIT JAMAIS OUBLIER DE DONNER

| Input | Pourquoi c'est obligatoire |
|-------|--------------------------|
| La plateforme | Le ton et le format changent entre Twitter (concis) et LinkedIn (professionnel long-form) |
| Le vertical | E-com ou agence — l'insight et l'angle changent |
| L'insight terrain | Claude n'invente jamais une donnée. Les insights viennent des données terrain. |

**Le registre est optionnel.** Si R ne précise pas, Claude choisit automatiquement un registre différent du précédent.

**Si R oublie un de ces 3 inputs, Claude doit demander avant de rédiger.**
