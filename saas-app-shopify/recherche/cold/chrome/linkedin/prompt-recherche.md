# PROMPT CLAUDE CHROME — Recherche Prospects LinkedIn

> Copier le contenu du bloc ci-dessous dans Claude Chrome.
> Résultats : CSV dans le chat, à copier dans `saas-app-shopify/recherche/cold/chrome/linkedin/recherche-log.md`.
> IMPORTANT : compte LinkedIn GRATUIT. ~250-350 recherches/mois avant blocage (Commercial Use Limit). Chaque recherche doit être précise — pas de recherches exploratoires qui gaspillent le quota.

````
Tu es sur linkedin.com avec ma session connectée. C'est un compte LinkedIn GRATUIT (pas Premium, pas Sales Navigator).

MISSION : trouver des merchants qui ont une boutique Shopify. Scan et collecte uniquement. Tu ne likes rien, tu ne commentes rien, tu n'envoies aucune demande de connexion, tu ne DM personne, tu ne cliques sur aucun bouton d'action. Read-only.

CIBLE : uniquement des gens qui ont une boutique Shopify. Pas de boutique Shopify = on passe. On cherche des gens qui VENDENT des produits sur Shopify.

PIÈGE LINKEDIN — CRITIQUE :
Sur LinkedIn, beaucoup de résultats pour "Shopify" seront des Shopify DEVELOPERS, Shopify PARTNERS, Shopify EXPERTS, des agencies qui travaillent POUR des merchants. Ce ne sont PAS nos cibles. Nos cibles sont les OWNERS de boutiques Shopify — les gens qui vendent des produits, pas ceux qui construisent des stores pour d'autres. Le filtrage NOT dans les recherches booléennes est CRITIQUE pour éliminer ces faux positifs.

DEUX CATÉGORIES DE PROSPECTS :
- Catégorie A (priorité #1) — Merchants Shopify : a une boutique Shopify, petite à moyenne entreprise, headline type "Founder/Owner/CEO + [brand]", publie ou a une Company Page liée à un store Shopify, profil actif
- Catégorie B (secondaire) — Influenceurs e-com Shopify : a sa propre boutique Shopify OU fait du contenu récurrent sur Shopify/e-com, audience engagée dans l'e-com, contenu éducatif/tutorial sur Shopify

CRITÈRES DE QUALIFICATION :
- A une boutique Shopify identifiable (lien site web sur le profil ou la Company Page vers un site "Powered by Shopify", mention "Shopify" dans la headline, l'about, ou l'expérience, URL en .myshopify.com)
- Taille : petite à moyenne entreprise (pas de Fortune 500)
- Headline ou job title indiquant ownership : Founder, Co-Founder, Owner, CEO, Managing Director + nom de marque/store
- Profil actif (activité récente ou Company Page avec du contenu)
- Idéalement identifiable par niche : fashion, beauty, home, pet, food, fitness, jewelry, accessories, DTC

CRITÈRES D'EXCLUSION — APPLIQUE-LES STRICTEMENT :
- Pas de boutique Shopify identifiable → SKIP
- Shopify Developer, Shopify Expert, Shopify Partner → SKIP (ils construisent des stores pour d'autres, ils n'en possèdent pas)
- Shopify App Developer, Theme Developer → SKIP
- Agency owner (web agency, marketing agency, dev agency) → SKIP, SAUF si l'agency gère des stores Shopify pour des clients ET que le owner a aussi son propre store Shopify
- Freelance designer, freelance developer → SKIP
- Devs, SaaS builders, indie hackers → SKIP
- Consultants e-com sans store propre → SKIP
- CEOs corporate, C-suite grandes entreprises → SKIP
- Influenceurs sans lien Shopify/e-com → SKIP
- Dropshipping gurus qui vendent des formations → SKIP
- Profils avec "Shopify" dans les skills/endorsements mais aucun store identifiable → SKIP

IMPORTANT — SPÉCIFICITÉS LINKEDIN :
- Le DOM LinkedIn est LOURD (React-based, beaucoup de lazy loading). Consomme beaucoup de tokens. Sois économe.
- Le compte est GRATUIT. Il y a un Commercial Use Limit (~250-350 recherches/mois). Chaque recherche doit être utile. Pas de recherches exploratoires.
- Les profils 3ème degré+ peuvent être partiellement masqués. La headline reste généralement visible même hors réseau. Si le profil est masqué mais la headline indique clairement un Shopify merchant → qualifié quand même.
- Les opérateurs booléens doivent être en MAJUSCULES (AND, OR, NOT). Le "+" et "-" ne sont PAS supportés.
- La barre de recherche scanne : headline, title, about section, experience, skills.
- Les lien site web sont souvent visibles directement sur le profil (section Contact ou About), pas besoin de chercher dans la bio comme sur Instagram.
- N'utilise JAMAIS de screenshots. Le DOM LinkedIn est déjà très lourd en accessibility tree. Utilise UNIQUEMENT read_page ou get_page_text.

VECTEURS DE RECHERCHE (dans cet ordre) :

CHEMIN 1 — RECHERCHE PEOPLE (source principale) :
1. Recherche People : "Shopify" AND ("store owner" OR "brand founder" OR "e-commerce entrepreneur") NOT ("app developer" OR "theme developer" OR "Shopify expert" OR "Shopify partner" OR "agency")
   → Filtre : People → parcourir les résultats → vérifier chaque profil

2. Recherche People : ("Shopify store" OR "online store" OR "DTC brand") AND ("founder" OR "owner") NOT ("developer" OR "designer" OR "agency" OR "freelance")
   → même méthode

3. Recherche People : ("e-commerce" OR "ecommerce") AND ("founder" OR "owner" OR "CEO") AND ("Shopify")
   → même méthode, plus large

4. Si les résultats EN sont épuisés, recherches FR :
   "boutique Shopify" AND ("fondateur" OR "créateur" OR "gérant") NOT ("développeur" OR "agence" OR "freelance")

5. Si tu trouves un profil qualifié avec une Company Page → va sur la Company Page → regarde les employés listés → d'autres owners de stores Shopify peuvent y être associés

CHEMIN 2 — COMPANY PAGES (source secondaire) :
6. Recherche Companies : "Shopify" → filtre Companies → Industry "Retail" ou "Consumer Goods" ou "E-Commerce" → parcourir les Company Pages → vérifier le site web dans la section About

7. Recherche Companies : "e-commerce store" ou "online boutique" → filtre Companies → même méthode

CHEMIN 3 — GROUPES (source tertiaire, utilité faible) :
8. Si les chemins 1 et 2 sont épuisés → chercher des groupes Shopify ("Shopify Entrepreneurs", "Shopify Store Owners", "E-commerce Entrepreneurs") → regarder la liste des membres → les membres avec des headlines de type "Founder/Owner + [brand]" sont des cibles potentielles
   NOTE : les groupes LinkedIn sont largement inactifs comparés à Facebook. L'utilité principale est de voir la LISTE des membres, pas de lire les posts.

MÉTHODE PAR PROFIL — CHEMIN PEOPLE :
1. Lis la headline. Si elle contient "Developer", "Expert", "Partner", "Agency", "Freelance", "Consultant" sans indication de store propre → SKIP immédiatement sans ouvrir le profil.
2. Si la headline indique "Founder", "Owner", "CEO" + un nom de marque → ouvrir le profil.
3. Lis la section About et Experience. Cherche une mention de boutique Shopify.
4. Cherche un lien site web dans la section Contact ou About.
5. Si il y a un lien → suis-le et vérifie si Shopify (voir VÉRIFICATION SHOPIFY).
6. Si confirmé Shopify → qualifié. Note toutes les données.
7. Si profil 3ème degré+ partiellement masqué mais headline clairement "Shopify Store Owner" ou "DTC Brand Founder" → qualifié avec signal "headline confirms shopify, profile partially hidden".
8. Si impossible de confirmer Shopify → SKIP.
9. Passe au profil suivant.

MÉTHODE PAR COMPANY PAGE — CHEMIN COMPANIES :
1. Ouvre la Company Page.
2. Lis la section About : description, site web, industry, taille, localisation.
3. Si il y a un lien site web → suis-le et vérifie si Shopify.
4. Note le nombre d'employés et la localisation pour la géo.
5. Si confirmé Shopify → qualifié. Identifie le Founder/Owner dans les employés listés si possible.
6. Si pas de lien ou pas Shopify → SKIP.

DONNÉES À COLLECTER POUR CHAQUE PROFIL QUALIFIÉ :
- profil (URL du profil LinkedIn — copie l'URL de la page, format linkedin.com/in/username)
- nom (nom complet affiché)
- headline (headline LinkedIn complète — c'est le signal de qualification principal)
- type (perso = profil personnel via recherche People, page = trouvé via Company Page)
- cat (A = merchant avec boutique Shopify, B = influenceur e-com avec boutique Shopify ou contenu éducatif Shopify récurrent)
- geo (US/UK/FR/DE/EU-autre/inconnu — déduis depuis : localisation affichée sur le profil, langue du contenu, devise du site, TLD du domaine)
- niche (fashion/beauty/home/pet/food/fitness/jewelry/accessories/DTC/autre)
- boutique (URL du site Shopify, ou "N/A" si Shopify confirmé par headline/about mais pas de lien trouvé)
- signal (comment tu as confirmé que c'est Shopify : "website link powered by shopify", "headline mentions shopify store", "about mentions shopify", "company page website shopify", "headline confirms shopify profile partially hidden", etc.)
- cold_note (1 phrase max pour personnaliser un futur DM : ce qu'ils vendent, leur headline, un détail de leur about, leur Company Page)

FORMAT DE SORTIE : CSV dans un code block. Après CHAQUE batch de 5 profils qualifiés, sors le CSV immédiatement dans le chat. Ne stocke rien en mémoire entre les batches.

Exemple de format :

```
profil,nom,headline,type,cat,geo,niche,boutique,signal,cold_note
linkedin.com/in/johndoe,John Doe,Founder & CEO at MyBrand - Shopify Store,perso,A,US,Fashion,mybrand.com,website link powered by shopify,DTC streetwear brand 15K followers on IG
linkedin.com/in/mariemartin,Marie Martin,Fondatrice Boutique Éclat - E-commerce Mode,perso,A,FR,Fashion,boutique-eclat.fr,about mentions shopify,french fashion brand based in Paris
```

GESTION TOKENS — RÈGLES CRITIQUES :
- Travaille en BATCHES DE 5 profils qualifiés. Après chaque batch, sors le CSV dans le chat AVANT de continuer.
- Maximum 2-3 batches par session (10-15 profils qualifiés). Le DOM LinkedIn est lourd comme Facebook. Sois conservateur.
- Les profils SKIP (non qualifiés — surtout les devs/partners/experts) ne comptent pas dans le batch. Attention : sur LinkedIn il y aura BEAUCOUP de SKIPs (devs, agencies, partners). Ne te décourage pas.
- N'utilise JAMAIS de screenshots sur LinkedIn. Le DOM React est déjà très lourd. Utilise UNIQUEMENT read_page ou get_page_text.
- Maximum 3-5 scrolls par page de résultats de recherche. Au-delà les tokens sont gaspillés. Passe à la recherche suivante ou au chemin suivant.
- Si tu sens que tes réponses deviennent moins précises ou que le contexte devient lourd, STOP immédiatement et sors le bloc de fin de session. Tu n'as pas de jauge interne de tokens restants — en cas de doute, mieux vaut s'arrêter trop tôt que trop tard.
- ÉCONOMISE LES RECHERCHES. Le compte gratuit a un Commercial Use Limit (~250-350 recherches/mois). Chaque requête booléenne = 1 recherche consommée. Utilise les requêtes larges d'abord, les spécifiques ensuite.

ESPACEMENT ANTI-BOT :
- Ne visite PAS les profils en rafale. Attends quelques secondes entre chaque profil. LinkedIn est PLUS sensible que Instagram ou TikTok à la navigation automatisée.
- Si un CAPTCHA apparaît, STOP immédiatement et dis-le moi. Je le résoudrai manuellement.
- Si LinkedIn affiche un message de restriction temporaire, STOP immédiatement et dis-le moi.
- Ne consulte pas plus de 20-30 profils par session (qualifiés + skippés confondus).

VÉRIFICATION SHOPIFY — MÉTHODE :
Quand tu suis un lien vers un site externe (depuis un profil ou une Company Page) :
1. Utilise get_page_text sur la page d'accueil du site
2. Cherche "Shopify" dans le texte (footer, code source, meta)
3. Cherche "cdn.shopify.com" dans les URLs de ressources
4. Note la devise affichée sur le site ($, €, £) pour la géo
5. Si tu trouves "Shopify" ou "cdn.shopify.com" → confirmé Shopify
6. Si tu ne trouves ni l'un ni l'autre → pas confirmé → SKIP
7. Ne passe pas plus de 30 secondes par site. Si le site ne charge pas ou est trop lourd → SKIP et note "site inaccessible"

QUALIFICATION SANS LIEN (spécifique LinkedIn) :
Sur LinkedIn le lien site web n'est pas toujours visible (profil 3ème degré+ partiellement masqué, ou le profil n'a pas rempli la section Contact). Un profil peut quand même être qualifié si :
- La headline dit explicitement "Shopify Store Owner", "DTC Brand Founder", ou contient un nom de marque + "Shopify"
- L'about section mentionne "my Shopify store", "I sell on Shopify", "built on Shopify"
- L'expérience liste une entreprise avec "Shopify" ou "E-commerce" dans la description
Dans ces cas, note signal "headline mentions shopify" ou "about mentions shopify" et boutique "N/A".

GÉO — ORDRE DE PRIORITÉ :
Récolte TOUS les merchants qualifiés. La géo sert à prioriser dans le CSV, pas à exclure.
1. US (anglais, localisation US sur le profil, prix en $, .com)
2. UK (anglais, localisation UK, prix en £, .co.uk)
3. FR (français, localisation FR, prix en €, .fr)
4. DE (allemand/anglais, localisation DE, .de)
5. Reste EU (prix en €, anglais)
6. Reste du monde
Si la géo n'est pas identifiable mais le contenu est en anglais → note "inconnu" et garde le profil.
Tu peux aussi utiliser le filtre "Locations" de LinkedIn pour cibler une géo spécifique si je te le demande.

BLOC DE FIN DE SESSION — OBLIGATOIRE :
À la fin de chaque session (après 2-3 batches OU si je te demande de t'arrêter OU si tu sens que le contexte est saturé OU si LinkedIn affiche une restriction), produis ce bloc :

```
STOPPED AT: [URL de la dernière page/recherche visitée]
Last profile: [nom ou URL du dernier profil]
Batch count: [nombre de batches effectués]
Profiles checked total: [nombre total de profils visités, qualifiés + skippés]
Profiles qualified: [nombre de profils dans les CSV]
Profiles skipped: [nombre de profils non qualifiés]
Skipped reason breakdown: [devs: X, agencies: X, no shopify: X, dormant: X]
Search queries used: [liste exacte des requêtes booléennes utilisées cette session]
Search queries remaining: [liste des requêtes de la liste ci-dessus pas encore utilisées]
Resume from: [prochaine requête ou action à faire pour reprendre]
Skip list: [tous les noms/URLs qualifiés trouvés cette session, séparés par virgules]
LinkedIn warnings: [oui/non — si oui, quel message]
```

COMMENCE par le chemin 1 vecteur #1 : lance la recherche People avec la requête booléenne "Shopify" AND ("store owner" OR "brand founder" OR "e-commerce entrepreneur") NOT ("app developer" OR "theme developer" OR "Shopify expert" OR "Shopify partner" OR "agency"). Go.
````

---

## NE PAS COLLER — Notes pour R

- **Avant la première session :** vérifier que Claude Chrome peut bien accéder à linkedin.com. Vérifier le SSI du compte à linkedin.com/sales/ssi (influence les limites).
- **Entre les sessions :** copier les CSV dans le recherche-log. Au prompt de relance, utiliser le `template-reprise.md` avec la skip list, les requêtes utilisées, et le point d'arrêt.
- **Commercial Use Limit :** ~250-350 recherches/mois. Chaque requête booléenne = 1 recherche. Espacer les sessions de recherche dans le mois.
- **Durée estimée par session :** 15-30 minutes pour 10-15 profils qualifiés.
- **Taux de faux positifs ÉLEVÉ sur LinkedIn.** Beaucoup de résultats seront des Shopify developers/partners/experts/agencies. C'est normal. Le ratio utile sera plus bas que Instagram/TikTok. Ne pas gaspiller des recherches à reformuler — c'est le filtrage profil par profil qui fait le tri.
- **Si les profils sont complexes** (Company Pages avec beaucoup de contenu, profils longs) : réduire à 2 batches (10 profils) par session.
- **Alternative gratuite :** si le Commercial Use Limit est atteint, utiliser Google X-Ray :
  `site:linkedin.com/in "Shopify" AND ("store owner" OR "brand founder") -developer -designer -agency`
  Aucune limite de recherches, mais résultats dépendent de l'indexation Google.
- **Groupes LinkedIn :** utilité faible comparée à Facebook. Utiliser en dernier recours. L'avantage : 10 messages gratuits/semaine aux membres de groupes sans InMail.
