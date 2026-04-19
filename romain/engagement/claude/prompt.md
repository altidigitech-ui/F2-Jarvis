# GUIDE ENGAGEMENT — Comment demander à Claude

**Usage :** Ce fichier est un guide pour R. Il explique comment formuler les demandes au projet Claude "Romain" pour obtenir des commentaires d'engagement de qualité. Ce n'est PAS un system prompt — le system prompt est dans `romain/system-prompt.md`.

---

## 1. LE FLOW

```
1. GROK trouve des posts pertinents à engager sur Twitter (prompts dans engagement/grok/)
2. R identifie les posts où il peut ajouter de la valeur
3. R ouvre le projet Claude "Romain" et donne les inputs ci-dessous
4. Claude rédige le commentaire dans la voix R adaptée à la plateforme
5. R valide, ajuste si nécessaire, et publie
```

Pour LinkedIn et IH : pas de Grok. R trouve les posts manuellement (feed, recherche).

---

## 2. TEMPLATES PAR TYPE DE DEMANDE

### 2.1 Reply d'engagement Twitter

```
Engagement Twitter.
Post original : [copier le tweet ou résumer en 1-2 lignes]
Nombre de likes : [X]
Mon angle : [optionnel — ex: "angle chargebacks", "angle store speed", "angle ROI client", "je veux challenger son point"]
Registre : [diagnostic / framework / data-drop / etc. — ou laisser Claude choisir]
```

Claude produit une reply courte et percutante dans la voix R avec un insight + un angle non couvert + une question optionnelle.

### 2.2 Quote tweet

```
Quote tweet.
Post original : [copier le tweet]
Mon angle : [comment R veut amplifier — ex: "relier ça au pattern chargebacks", "challenger l'hypothèse"]
```

Claude produit le tweet de R qui amplifie le post original avec un angle e-com/marketing.

### 2.3 Commentaire engagement LinkedIn

```
Engagement LinkedIn.
Post original : [copier le post ou résumer les points clés]
Auteur : [nom + contexte — ex: "Justin Welsh, growth marketer, 500K followers"]
Mon angle : [optionnel — ex: "angle reporting client", "angle conversion e-com"]
```

Claude produit un commentaire de 15+ mots, professionnel, avec insight concret et question de suivi. Zéro lien, zéro pitch, zéro mention de produit.

### 2.4 Commentaire engagement IH

```
Engagement IH.
Post original : [copier le post ou résumer]
Section : [Ask IH / post classique / commentaire sous un Show IH]
Mon angle : [optionnel]
```

Claude produit un commentaire pair-à-pair, détaillé, honnête, avec vocabulaire builder.

### 2.5 Réponse à un reply sur un commentaire de R

```
Quelqu'un a répondu à mon commentaire.
Plateforme : [Twitter/LinkedIn/IH]
Mon commentaire initial : [copier]
Sa réponse : [copier]
```

Claude produit la réponse dans la voix R qui approfondit et maintient la conversation.

---

## 3. RACCOURCIS

Quand R est en rythme de croisière :

```
Engagement Twitter. "My Shopify store loses money every month to chargebacks." Angle : partager le chiffre 71% friendly fraud.
```

```
Engagement LinkedIn. Agency owner qui se plaint de perdre des clients. Angle : prouver le ROI avec des données, pas des promesses.
```

```
Reply sur mon commentaire. Twitter. Le merchant me demande comment réduire les chargebacks.
```

Claude comprend et produit dans le bon format car le contexte est dans les fichiers de connaissance.

---

## 4. CE QUE R NE DOIT JAMAIS OUBLIER DE DONNER

| Input | Pourquoi c'est obligatoire |
|-------|--------------------------|
| La plateforme | Le ton, la longueur et les règles changent entre Twitter (court), LinkedIn (15+ mots, zéro lien), IH (pair-à-pair) |
| Le post original (ou un résumé) | Claude doit connaître le contenu pour produire un commentaire SPÉCIFIQUE, pas générique |

**L'angle et le registre sont optionnels.** Si R ne précise pas, Claude choisit l'angle le plus pertinent basé sur le contenu du post et l'expertise growth e-com & marketing de R.

**Si R oublie la plateforme, Claude demande avant de rédiger.**
