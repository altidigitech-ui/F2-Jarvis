# GUIDE PUBLICATION — Comment demander à Claude

**Usage :** Ce fichier est un guide pour R. Il explique comment formuler les demandes au projet Claude "Romain" pour obtenir des posts de qualité. Ce n'est PAS un system prompt — le system prompt est dans `romain/system-prompt.md`.

---

## 1. LE FLOW

```
1. Vendredi soir — Réunion R+F : revue métriques, patterns, décisions. R collecte les données de la semaine.
2. Samedi — R ouvre le projet Claude "Romain" et rédige les posts un par un.
3. Pour chaque post : R donne la plateforme + le type + les données + l'angle + ses mots bruts.
4. Claude génère le post dans la voix R adaptée à la plateforme.
5. R valide, ajuste si nécessaire, et programme.
6. En semaine — Zéro rédaction. Les posts sont publiés selon la programmation.
```

Pour les sujets tendance/angles : Grok peut aider à identifier ce qui se discute dans la niche e-com/marketing cette semaine (prompts dans publication/grok/).

---

## 2. TEMPLATES PAR TYPE DE DEMANDE

### 2.1 Hot Take Twitter

```
Hot take Twitter.
Sujet : [douleur e-com ou agence — ex: "chargebacks friendly fraud"]
Mon opinion : [l'opinion tranchée de R]
Données : [données terrain — ex: "$800/mois de perte moyenne, 71% friendly fraud"]
Mes mots : [1-2 phrases comme R les a dites à F]
```

Claude produit un tweet : affirmation brutale → développement → question ouverte.

### 2.2 Data Post Twitter

```
Data post Twitter.
Données de la semaine :
- Source : [530+ reviews / données Mastercard / threads Reddit / conversations terrain]
- Pattern principal : [ce qui ressort le plus]
- Chiffre clé : [pourcentage, montant, etc.]
Angle : [optionnel — ex: "focus sur les chargebacks", "focus sur la vitesse store"]
Mes mots : [1-2 phrases brutes de R]
```

Claude produit un tweet data-driven : pattern → chiffre réel → insight → question.

### 2.3 Question Twitter

```
Question Twitter.
Thème : [le sujet du débat — ex: "coût caché des apps Shopify", "reporting client en agence"]
Angle : [optionnel — provocant, curieux, sondage]
```

### 2.4 Thread Twitter

```
Thread Twitter.
Sujet : [le learning, le guide, ou le pattern — ex: "3 apps qui tuent la vitesse de ton store"]
Points à couvrir :
- [Point 1 + données terrain]
- [Point 2 + données terrain]
- [Point 3 + données terrain]
Conclusion : [le takeaway principal]
Mes mots : [1-2 phrases brutes de R]
```

### 2.5 Learning perso Twitter

```
Learning perso Twitter.
Contexte : [ex: "3 semaines après le lancement LD, 8 signups, $0 MRR, on pivote"]
Ce que j'ai appris : [le learning principal]
Données : [chiffres si disponibles]
Mes mots : [1-2 phrases brutes de R]
```

### 2.6 Texte long LinkedIn

```
Post LinkedIn.
Sujet : [le même sujet qu'un tweet OU un sujet spécifique LinkedIn]
Vertical : [e-com / agence / multi-vertical]
Données : [chiffres, patterns — obligatoires sur LinkedIn]
Angle LinkedIn : [professionnel, argumenté, avec le raisonnement derrière]
Mes mots : [1-2 phrases brutes de R]
```

### 2.7 Carousel/Document LinkedIn

```
Carousel LinkedIn.
Sujet : [le framework, le guide, les données agrégées — ex: "5 coûts cachés des merchants Shopify"]
Nombre de slides : [6-8]
Slides :
- Slide 1 (couverture) : [titre fort]
- Slide 2 : [point + chiffre + fix]
- [...]
- Slide finale : [conclusion + question]
```

---

## 3. RACCOURCIS

Quand R est en rythme de croisière :

```
Hot take Twitter. "Les merchants Shopify perdent plus en chargebacks qu'en ad spend." Données : $800/mois moyenne, 71% friendly fraud. Mes mots : "ngl c'est du vol légal et personne en parle"
```

```
Data post Twitter. 530+ reviews Shopify apps analysées. Pattern : apps qui ralentissent les stores. Chiffre : +2.3s par 5 apps. Mes mots : "the thing is, chaque app que t'ajoutes te coûte des conversions"
```

```
Post LinkedIn. Même sujet que le hot take chargebacks. Développé avec les données Mastercard en contexte. Mes mots : "imo la moitié des merchants ne savent même pas qu'ils se font voler"
```

---

## 4. CE QUE R NE DOIT JAMAIS OUBLIER DE DONNER

| Input | Pourquoi c'est obligatoire |
|-------|--------------------------|
| La plateforme | Le ton et les règles changent entre Twitter (court, provocateur) et LinkedIn (long, professionnel, zéro lien) |
| Le type de post | Chacun a sa structure |
| Les données réelles | Claude n'invente jamais. Sans données = pas de data post. |
| Les mots bruts de R | Un post batch sans input verbal de R produit une voix Claude-shaped, pas une voix R. |

**Si R oublie la plateforme, les données, ou ses mots bruts, Claude demande avant de rédiger.**
