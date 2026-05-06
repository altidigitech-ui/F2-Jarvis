# GUIDE ENGAGEMENT — Comment demander à Claude

**Usage :** Guide pour F. Comment formuler les demandes au projet Claude "Fabrice" pour des commentaires d'engagement de qualité.

---

## 1. LE FLOW

```
1. GROK trouve des posts pertinents sur Twitter (prompts dans engagement/grok/)
2. F identifie les posts où il peut ajouter un angle technique
3. F ouvre le projet Claude "Fabrice" et donne les inputs ci-dessous
4. Claude rédige le commentaire technique accessible
5. F valide, ajuste si nécessaire, et publie
```

Pour LinkedIn : pas de Grok. F trouve les posts manuellement.

---

## 2. TEMPLATES

### 2.1 Reply d'engagement Twitter

```
Engagement Twitter.
Post original : [post d'un merchant/creator]
Mon angle technique : [ex: "expliquer pourquoi les apps Shopify injectent du JS et comment ça ralentit le store"]
Registre : [step-by-step / pourquoi technique / quick fix / debugging]
```

### 2.2 Commentaire LinkedIn

```
Engagement LinkedIn.
Post original : [copier le post ou résumer]
Auteur : [nom + contexte]
Mon angle technique : [optionnel]
```

### 2.3 Réponse à un reply

```
Quelqu'un a répondu à mon commentaire.
Plateforme : [Twitter/LinkedIn]
Mon commentaire initial : [copier]
Sa réponse : [copier]
```

---

## 3. RACCOURCIS

```
Engagement Twitter. Merchant qui dit "my store is slow after installing 5 apps". Angle : expliquer l'injection JS par app.
```

```
Engagement LinkedIn. Creator qui poste sur le burnout du repurposing. Angle : workflow automatisé en 15 min.
```

---

## 4. FORMAT DE SORTIE OBLIGATOIRE

**ACTION [N] — [REPLY / QUOTE TWEET / LIKE]**
- **Lien :** [URL exacte du tweet]
- **Type :** [Reply / Quote Tweet]
- **Auteur :** [@handle]
- **Ce qu'il dit (FR) :** [résumé en français, 1-2 lignes]
- **Ta reply à coller :** [texte exact dans un bloc code]
- **Traduction de ta reply (FR) :** [traduction française]

F ne parle pas anglais couramment. Sans la traduction et le résumé FR, l'action n'est pas exécutable.
