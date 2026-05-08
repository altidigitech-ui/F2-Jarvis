# PROMPT CLAUDE CHROME — Recherche Prospects Instagram

> Copier le contenu du bloc ci-dessous dans Claude Chrome.
> Résultats : CSV dans le chat, à copier dans `saas-app-shopify/recherche/cold/chrome/instagram/recherche-log.md`.

````
Tu es sur instagram.com avec ma session connectée.

MISSION : trouver des merchants qui ont une boutique Shopify. Scan et collecte uniquement. Tu ne likes rien, tu ne follows personne, tu ne commentes rien, tu ne DM personne. Read-only.

CIBLE : uniquement des gens qui ont une boutique Shopify. Pas de boutique Shopify = on passe. Un dev, un CEO, un marketeur sans boutique, un influenceur gaming, un dropshipping guru qui vend des formations = on passe. On cherche des gens qui VENDENT des produits sur Shopify.

DEUX CATÉGORIES DE PROSPECTS :
- Catégorie A (priorité #1) — Merchants Shopify : a une boutique Shopify, petite à moyenne entreprise, 500-100K followers, publie du contenu e-com (produit, packaging, behind the scenes, promo), compte actif (post dans les 30 derniers jours)
- Catégorie B (secondaire) — Influenceurs e-com Shopify : a sa propre boutique Shopify OU fait du contenu récurrent sur Shopify/e-com, 5K-500K followers, contenu éducatif/tutorial sur Shopify, audience engagée dans l'e-com (pas un influenceur gaming avec un merch shop dormant)

CRITÈRES DE QUALIFICATION :
- A une boutique Shopify identifiable (lien en bio vers un site "Powered by Shopify", mention "Shopify" dans la bio ou le contenu, URL en .myshopify.com)
- Taille : petite à moyenne entreprise (pas de Fortune 500)
- Followers : 500 - 100K pour Cat A, 5K - 500K pour Cat B
- Publie du contenu lié à son activité e-com (produit, packaging, behind the scenes, promo) OU du contenu éducatif Shopify (Cat B)
- Compte actif (post dans les 30 derniers jours)
- Idéalement identifiable par niche : fashion, beauty, home, pet, food, fitness, jewelry, accessories

CRITÈRES D'EXCLUSION :
- Pas de boutique Shopify identifiable → SKIP
- Compte > 100K followers sans boutique Shopify → SKIP
- Compte dormant (pas de post depuis > 30 jours) → SKIP
- Devs, SaaS builders, indie hackers → SKIP
- Concurrents (outils audit Shopify, apps performance) → SKIP
- Influenceurs sans lien Shopify/e-com → SKIP
- Dropshipping gurus qui vendent des formations (pas des merchants réels) → SKIP
- CEOs, C-suite, corporate → SKIP
- SEO / marketing agencies → SKIP, SAUF si elles gèrent des stores Shopify pour des clients (dans ce cas = prospect Cat A)

VECTEURS DE RECHERCHE (dans cet ordre) :
1. Hashtag #shopifystore → onglet "Top" → cliquer sur les posts → aller sur le profil de l'auteur
2. Hashtag #shopifybusiness → même méthode
3. Hashtag #shopify → même méthode
4. Hashtag #shopifyseller → même méthode
5. Hashtag #ecommercebusiness → même méthode
6. Hashtag #smallbusinessowner → même méthode (filtrer strict : garder UNIQUEMENT ceux qui ont un lien Shopify en bio, ce hashtag est très générique)
7. Hashtag #myshopify → même méthode
8. Si tu trouves un profil qualifié, regarde la sidebar "Similar accounts" / "Suggested for you" → boucle sur les profils suggérés. C'est souvent le meilleur vecteur après le premier profil trouvé.
9. Recherche "shopify" dans la barre de recherche Instagram → onglet "Accounts" → parcourir les comptes qui ont "shopify" dans le nom ou username
10. Hashtags FR si les EN sont épuisés : #boutiqueshopify, #eshopfrance, #ecommercefrance, #venteenligne, #boutiquenligne (filtrage strict : Shopify confirmé obligatoire)

MÉTHODE PAR PROFIL :
1. Lis la bio. Cherche un lien vers un site.
2. Si il y a un lien → suis-le et vérifie si le site est Shopify (voir section VÉRIFICATION SHOPIFY ci-dessous).
3. Si confirmé Shopify → le profil est qualifié. Note toutes les données.
4. Si le profil est privé mais que la bio contient un lien Shopify confirmé → qualifié quand même. La bio et le nombre de followers sont visibles même sur les profils privés.
5. Si pas de lien mais la bio mentionne explicitement "Shopify" ou un nom de store identifiable → note quand même avec signal "bio mentions shopify, no link".
6. Si pas de lien ET pas de mention Shopify → SKIP. Ne perds pas de temps.
7. Passe au profil suivant.

DONNÉES À COLLECTER POUR CHAQUE PROFIL QUALIFIÉ :
- handle (ex: @nomducompte)
- nom (nom affiché)
- followers (ex: 15K)
- cat (A = merchant avec boutique Shopify, B = influenceur e-com avec boutique Shopify ou contenu éducatif Shopify récurrent)
- geo (US/UK/FR/DE/EU-autre/inconnu — déduis depuis : langue bio, localisation affichée, devise du site, TLD du domaine, devise du store si visible)
- niche (fashion/beauty/home/pet/food/fitness/jewelry/accessories/autre)
- boutique (URL du site Shopify, ou "N/A" si pas de lien mais Shopify confirmé par bio)
- signal (comment tu as confirmé que c'est Shopify : "link bio powered by shopify", "bio mentions shopify", "myshopify URL", "bio mentions shopify no link", etc.)
- cold_note (1 phrase max pour personnaliser un futur DM : ce qu'ils vendent, un détail de leur bio, un post récent)

FORMAT DE SORTIE : CSV dans un code block. Après CHAQUE batch de 5 profils qualifiés, sors le CSV immédiatement dans le chat. Ne stocke rien en mémoire entre les batches.

Exemple de format :

```
handle,nom,followers,cat,geo,niche,boutique,signal,cold_note
@store1,Ma Boutique,15K,A,US,Fashion,maboutique.com,link bio powered by shopify,sells handmade leather bags
@store2,Beauty FR,8K,A,FR,Beauty,beautystore.fr,bio mentions shopify,skincare brand based in Lyon
```

GESTION TOKENS — RÈGLES CRITIQUES :
- Travaille en BATCHES DE 5 profils qualifiés. Après chaque batch, sors le CSV dans le chat AVANT de continuer.
- Maximum 3-4 batches par session (15-20 profils qualifiés). Si tu atteins 4 batches, STOP et sors le bloc de fin de session.
- Les profils SKIP (non qualifiés) ne comptent pas dans le batch. Si tu visites 10 profils et que 5 sont qualifiés, c'est 1 batch.
- N'utilise PAS de screenshots sauf si l'accessibility tree ne suffit vraiment pas. Les screenshots s'accumulent dans le contexte et ne sont jamais purgés. Chaque screenshot rend le tour suivant plus cher. Utilise read_page ou get_page_text en priorité.
- Maximum 3-5 scrolls par page de résultats hashtag. Au-delà c'est du gaspillage de tokens. Passe au vecteur suivant.
- Si tu sens que tes réponses deviennent moins précises ou que le contexte devient lourd, STOP immédiatement et sors le bloc de fin de session. Tu n'as pas de jauge interne de tokens restants — en cas de doute, mieux vaut s'arrêter trop tôt que trop tard.

ESPACEMENT ANTI-BOT :
- Ne visite PAS les profils en rafale. Attends quelques secondes entre chaque profil.
- Si un CAPTCHA apparaît, STOP immédiatement et dis-le moi. Je le résoudrai manuellement.
- Les Stories et Reels ne sont pas fiables sur le web Instagram. Ne perds pas de temps à les consulter.

VÉRIFICATION SHOPIFY — MÉTHODE :
Quand tu suis un lien en bio vers un site externe :
1. Utilise get_page_text sur la page d'accueil du site
2. Cherche "Shopify" dans le texte (footer, code source, meta)
3. Cherche "cdn.shopify.com" dans les URLs de ressources
4. Note la devise affichée sur le site ($, €, £) pour la géo
5. Si tu trouves "Shopify" ou "cdn.shopify.com" → confirmé Shopify
6. Si tu ne trouves ni l'un ni l'autre → pas confirmé → SKIP
7. Ne passe pas plus de 30 secondes par site. Si le site ne charge pas ou est trop lourd → SKIP et note "site inaccessible"

GÉO — ORDRE DE PRIORITÉ :
Récolte TOUS les merchants qualifiés. La géo sert à prioriser dans le CSV, pas à exclure.
1. US (anglais, prix en $, .com, shipping US)
2. UK (anglais, prix en £, .co.uk)
3. FR (français, prix en €, .fr)
4. DE (allemand/anglais, .de)
5. Reste EU (prix en €, anglais)
6. Reste du monde
Si la géo n'est pas identifiable mais le contenu est en anglais → note "inconnu" et garde le profil.

BLOC DE FIN DE SESSION — OBLIGATOIRE :
À la fin de chaque session (après 3-4 batches OU si je te demande de t'arrêter OU si tu sens que le contexte est saturé), produis ce bloc :

```
STOPPED AT: [URL de la dernière page visitée]
Last profile: @handle
Batch count: [nombre de batches effectués]
Profiles checked total: [nombre total de profils visités, qualifiés + skippés]
Profiles qualified: [nombre de profils dans les CSV]
Profiles skipped: [nombre de profils non qualifiés]
Search vector used: [hashtag ou méthode utilisée]
Vectors not yet explored: [liste des vecteurs de la liste ci-dessus pas encore utilisés]
Resume from: [prochaine URL ou action à faire pour reprendre]
Skip list: [tous les handles qualifiés trouvés cette session, séparés par virgules]
```

COMMENCE par le vecteur #1 : recherche le hashtag #shopifystore, onglet "Top". Go.
````

---

## NE PAS COLLER — Notes pour R

- **Avant la première session :** vérifier que Claude Chrome peut bien accéder à instagram.com. Si le domaine est bloqué, cette stratégie tombe.
- **Entre les sessions :** copier les CSV dans le recherche-log. Au prompt de relance, utiliser le `template-reprise.md` avec la skip list et le point d'arrêt.
- **Durée estimée par session :** 15-30 minutes pour 15-20 profils qualifiés.
- **Si les profils sont complexes** (pages avec beaucoup de contenu, bio longues, sites lents) : réduire à 2 batches (10 profils) par session pour éviter la saturation tokens.
- **Si le taux de qualification est bas** (beaucoup de SKIPs) : réduire aussi pour éviter le gaspillage tokens sur des profils non qualifiés.
