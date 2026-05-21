# PROMPT CLAUDE CHROME — Recherche Prospects Facebook

> Copier le contenu du bloc ci-dessous dans Claude Chrome.
> Résultats : CSV dans le chat, à copier dans `saas-app-shopify/recherche/cold/chrome/facebook/recherche-log.md`.
> PRÉREQUIS : R doit être MEMBRE des groupes listés ci-dessous AVANT de lancer ce prompt. Certains groupes ont une validation d'entrée qui peut prendre quelques jours.

````
Tu es sur facebook.com avec ma session connectée.

MISSION : trouver des merchants qui ont une boutique Shopify. Scan et collecte uniquement. Tu ne likes rien, tu ne commentes rien, tu ne DM personne, tu ne rejoins aucun groupe, tu ne cliques sur aucun bouton d'action. Read-only.

CIBLE : uniquement des gens qui ont une boutique Shopify. Pas de boutique Shopify = on passe. Un dev, un CEO, un marketeur sans boutique, un influenceur gaming, un dropshipping guru qui vend des formations = on passe. On cherche des gens qui VENDENT des produits sur Shopify.

DEUX CATÉGORIES DE PROSPECTS :
- Catégorie A (priorité #1) — Merchants Shopify : a une boutique Shopify, petite à moyenne entreprise, 500-100K followers/amis, publie du contenu e-com ou poste dans des groupes Shopify sur ses problèmes/questions, compte actif (post dans les 30 derniers jours)
- Catégorie B (secondaire) — Influenceurs e-com Shopify : a sa propre boutique Shopify OU fait du contenu récurrent sur Shopify/e-com, 5K-500K followers, contenu éducatif/tutorial sur Shopify, audience engagée dans l'e-com (pas un influenceur gaming avec un merch shop dormant)

CRITÈRES DE QUALIFICATION :
- A une boutique Shopify identifiable (lien dans un post, lien sur sa Page, lien dans son profil perso, mention "Shopify" dans un post du groupe, URL en .myshopify.com)
- Taille : petite à moyenne entreprise (pas de Fortune 500)
- Followers/amis : 500 - 100K pour Cat A, 5K - 500K pour Cat B
- Publie du contenu lié à son activité e-com OU pose des questions/partage des problèmes dans les groupes Shopify
- Compte actif (post ou activité dans les 30 derniers jours)
- Idéalement identifiable par niche : fashion, beauty, home, pet, food, fitness, jewelry, accessories
- CIBLES PREMIUM : merchants qui postent dans les groupes sur des PROBLÈMES (vitesse du store, apps, conversion, checkout, ghost billing, code) — ils ont une douleur identifiée = cold DM plus efficace

CRITÈRES D'EXCLUSION :
- Pas de boutique Shopify identifiable → SKIP
- Compte > 100K followers sans boutique Shopify → SKIP
- Compte dormant (pas de post/activité depuis > 30 jours) → SKIP
- Devs, SaaS builders, indie hackers → SKIP
- Concurrents (outils audit Shopify, apps performance) → SKIP
- Influenceurs sans lien Shopify/e-com → SKIP
- Dropshipping gurus qui vendent des formations (pas des merchants réels) → SKIP
- CEOs, C-suite, corporate → SKIP
- SEO / marketing agencies → SKIP, SAUF si elles gèrent des stores Shopify pour des clients (dans ce cas = prospect Cat A)
- Lurkers dans les groupes (gens qui ne postent pas, ne commentent pas) → SKIP, pas assez de données pour qualifier

IMPORTANT — SPÉCIFICITÉS FACEBOOK :
- Le DOM Facebook est EXTRÊMEMENT lourd. Chaque page consomme beaucoup plus de tokens qu'Instagram ou TikTok. Sois économe : utilise read_page ou get_page_text en priorité, JAMAIS de screenshots.
- La plupart des profils personnels sont PRIVÉS. Tu ne verras que le nom et ce qui est public. C'est normal. Qualifier depuis le contenu du post dans le groupe + ce qui est visible sur le profil public.
- La recherche Facebook par "People" est INUTILE (trop de profils privés). Ne l'utilise PAS.
- Le Marketplace nécessite un contexte de localisation et n'est pas utile pour notre recherche.
- Il y a DEUX types de sources sur Facebook : les Pages d'entreprise (publiques, riches en données) et les profils personnels dans les groupes (souvent privés, qualifiés par leur post dans le groupe).
- Je suis déjà membre des groupes listés ci-dessous. Si tu tombes sur un groupe où je ne suis pas membre, note-le dans le bloc de fin de session et passe au suivant.

VECTEURS DE RECHERCHE (dans cet ordre) :

CHEMIN 1 — GROUPES SHOPIFY (source principale) :
1. Groupe "Shopify Entrepreneurs" → scroller les posts récents → identifier les merchants qui postent (pas les lurkers) → cliquer sur leur profil → vérifier si merchant Shopify
2. Groupe "Shopify Store Owners" → même méthode
3. Groupe "Ecommerce Shopify" → même méthode
4. Groupe "Shopify Sellers Community" → même méthode
5. Groupe "Shopify France" → même méthode (prospects FR)
6. Groupe "E-commerce France" → même méthode
7. Groupe "Shopify Francophone" → même méthode
8. Groupe "Entrepreneurs Shopify" → même méthode
Si un groupe n'existe pas ou si je n'y suis pas membre, passe au suivant et note-le.

CHEMIN 2 — PAGES D'ENTREPRISE (source secondaire) :
9. Recherche Facebook "shopify store" → filtre par "Pages" → parcourir les Pages d'entreprise → vérifier about section et lien site web
10. Recherche Facebook "boutique shopify" → filtre par "Pages" → même méthode

MÉTHODE PAR PROFIL — CHEMIN GROUPES :
1. Dans le groupe, lis le post du membre. Note le contenu (problème mentionné, question posée, contexte).
2. Si le post mentionne Shopify, un store, des apps, de la conversion, de la vitesse → cible potentielle.
3. Clique sur le profil de l'auteur du post.
4. Lis ce qui est public : bio, lien site web, à propos, emploi, page liée.
5. Si tu trouves un lien vers un site → suis-le et vérifie si Shopify (voir VÉRIFICATION SHOPIFY).
6. Si le profil est privé mais que le post dans le groupe suffit à confirmer que c'est un merchant Shopify → qualifié. Note le contenu du post comme signal et cold_note.
7. Si impossible de confirmer Shopify ni par le profil ni par le post → SKIP.
8. Passe au post/membre suivant dans le groupe.

MÉTHODE PAR PAGE — CHEMIN PAGES :
1. Ouvre la Page d'entreprise.
2. Lis la section "About" / "À propos" : description, site web, catégorie.
3. Si il y a un lien site web → suis-le et vérifie si Shopify.
4. Note les followers, la catégorie, la localisation.
5. Si confirmé Shopify → qualifié. Note toutes les données.
6. Si pas de lien ou pas Shopify → SKIP.
7. Passe à la Page suivante.

DONNÉES À COLLECTER POUR CHAQUE PROFIL QUALIFIÉ :
- profil (URL du profil Facebook ou nom complet si URL non visible — Facebook n'a pas de @handle comme Instagram/TikTok)
- nom (nom affiché ou nom de la Page)
- type (perso = profil personnel trouvé dans un groupe, page = Page d'entreprise)
- followers (nombre de followers/likes de la Page, ou "N/A" si profil perso privé)
- cat (A = merchant avec boutique Shopify, B = influenceur e-com avec boutique Shopify ou contenu éducatif Shopify récurrent)
- geo (US/UK/FR/DE/EU-autre/inconnu — déduis depuis : langue du post/bio, localisation affichée, devise du site, TLD du domaine, devise du store si visible)
- niche (fashion/beauty/home/pet/food/fitness/jewelry/accessories/autre)
- boutique (URL du site Shopify, ou "N/A" si Shopify confirmé par post dans groupe mais pas de lien trouvé)
- signal (comment tu as confirmé que c'est Shopify : "link profil powered by shopify", "post groupe mentions shopify", "page about mentions shopify", "myshopify URL", etc.)
- source (où tu as trouvé ce prospect : nom du groupe + résumé du post, ou "recherche Pages")
- cold_note (1 phrase max pour personnaliser un futur DM : ce qu'ils vendent, le problème qu'ils ont posté dans le groupe, un détail de leur Page)

FORMAT DE SORTIE : CSV dans un code block. Après CHAQUE batch de 5 profils qualifiés, sors le CSV immédiatement dans le chat. Ne stocke rien en mémoire entre les batches.

Exemple de format :

```
profil,nom,type,followers,cat,geo,niche,boutique,signal,source,cold_note
facebook.com/maboutique,Ma Boutique,page,2.3K,A,FR,Fashion,maboutique.fr,page about mentions shopify,recherche Pages,french fashion brand
Jean Dupont,Jean Dupont,perso,N/A,A,FR,Beauty,N/A,post groupe mentions shopify problems with apps,Shopify France - posted about slow store speed,complains about 12 apps slowing store
```

GESTION TOKENS — RÈGLES CRITIQUES :
- Travaille en BATCHES DE 5 profils qualifiés. Après chaque batch, sors le CSV dans le chat AVANT de continuer.
- Maximum 2-3 batches par session (10-15 profils qualifiés). Facebook consomme PLUS de tokens que Instagram/TikTok à cause du DOM lourd. Sois conservateur.
- Les profils SKIP (non qualifiés) ne comptent pas dans le batch. Si tu visites 10 profils et que 5 sont qualifiés, c'est 1 batch.
- N'utilise JAMAIS de screenshots sur Facebook. Le DOM est déjà très lourd en accessibility tree. Les screenshots sur Facebook exploseraient le contexte. Utilise UNIQUEMENT read_page ou get_page_text.
- Maximum 3 scrolls par page de groupe. Au-delà les posts sont anciens et les tokens gaspillés. Passe au groupe suivant.
- Si tu sens que tes réponses deviennent moins précises ou que le contexte devient lourd, STOP immédiatement et sors le bloc de fin de session. Tu n'as pas de jauge interne de tokens restants — en cas de doute, mieux vaut s'arrêter trop tôt que trop tard.
- Le rendering multi-pass de Facebook peut ralentir la lecture des pages. Si une page met trop de temps à charger, passe à la suivante.

ESPACEMENT ANTI-BOT :
- Ne visite PAS les profils en rafale. Attends quelques secondes entre chaque profil.
- Si un CAPTCHA apparaît, STOP immédiatement et dis-le moi. Je le résoudrai manuellement.
- Facebook est particulièrement sensible aux navigations automatisées. Espace les visites de profils plus qu'Instagram ou TikTok.

VÉRIFICATION SHOPIFY — MÉTHODE :
Quand tu suis un lien vers un site externe (depuis un profil, une Page, ou un post) :
1. Utilise get_page_text sur la page d'accueil du site
2. Cherche "Shopify" dans le texte (footer, code source, meta)
3. Cherche "cdn.shopify.com" dans les URLs de ressources
4. Note la devise affichée sur le site ($, €, £) pour la géo
5. Si tu trouves "Shopify" ou "cdn.shopify.com" → confirmé Shopify
6. Si tu ne trouves ni l'un ni l'autre → pas confirmé → SKIP
7. Ne passe pas plus de 30 secondes par site. Si le site ne charge pas ou est trop lourd → SKIP et note "site inaccessible"

QUALIFICATION SANS LIEN (spécifique Facebook) :
Sur Facebook beaucoup de profils sont privés et n'ont pas de lien visible. Un profil peut quand même être qualifié si :
- Le post dans le groupe mentionne explicitement "my Shopify store", "mon store Shopify", un problème spécifique à Shopify (apps, theme code, checkout Shopify)
- Le post contient un lien vers un store (vérifier si Shopify)
- Le nom de profil ou la bio publique mentionne une boutique identifiable
Dans ces cas, note signal "post groupe mentions shopify" et boutique "N/A". Le cold se fera via DM Facebook en référençant le post du groupe.

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
À la fin de chaque session (après 2-3 batches OU si je te demande de t'arrêter OU si tu sens que le contexte est saturé), produis ce bloc :

```
STOPPED AT: [URL de la dernière page/groupe visité]
Last profile: [nom ou URL du dernier profil]
Batch count: [nombre de batches effectués]
Profiles checked total: [nombre total de profils visités, qualifiés + skippés]
Profiles qualified: [nombre de profils dans les CSV]
Profiles skipped: [nombre de profils non qualifiés]
Search vector used: [groupe, recherche Pages, ou méthode utilisée]
Groups visited: [liste des groupes déjà parcourus]
Groups not yet visited: [liste des groupes de la liste ci-dessus pas encore parcourus]
Groups where not member: [liste des groupes où je ne suis pas membre, si applicable]
Resume from: [prochaine URL, groupe, ou action à faire pour reprendre]
Skip list: [tous les noms/URLs qualifiés trouvés cette session, séparés par virgules]
```

COMMENCE par le chemin 1 vecteur #1 : va dans le groupe "Shopify Entrepreneurs", scrolle les posts récents. Go.
````

---

## NE PAS COLLER — Notes pour R

- **Avant la première session :** vérifier que R est bien membre de tous les groupes listés. Si un groupe nécessite une validation, la demander en avance. Vérifier que Claude Chrome peut accéder à facebook.com.
- **Entre les sessions :** copier les CSV dans le recherche-log. Au prompt de relance, utiliser le `template-reprise.md` avec la skip list et le point d'arrêt.
- **Durée estimée par session :** 15-30 minutes pour 10-15 profils qualifiés (moins qu'Instagram/TikTok à cause du DOM lourd).
- **Facebook consomme plus de tokens.** Le DOM est très lourd. Les sessions seront plus courtes qu'Instagram/TikTok. 2-3 batches max au lieu de 3-4.
- **Si les profils sont complexes** (Pages avec beaucoup de contenu, posts longs dans les groupes) : réduire à 2 batches (10 profils) par session.
- **Si le taux de qualification est bas** (beaucoup de profils privés sans signal Shopify) : réduire aussi pour éviter le gaspillage tokens.
- **Cibles premium :** les merchants qui postent sur des PROBLÈMES dans les groupes sont les meilleures cibles pour le cold — leur douleur est identifiée. Prioriser ces profils dans l'ordre du cold.
