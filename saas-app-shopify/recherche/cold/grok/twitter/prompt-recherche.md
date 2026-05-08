# PROMPT GROK — Recherche Prospects Twitter/X

> Copier le contenu du bloc ci-dessous dans Grok (grok.com ou X intégré).
> Mode : REGULAR (pas Fun mode).
> Tier recommandé : SuperGrok ($30/mois) minimum. Le free tier (10 prompts/2h) est insuffisant.
> Résultats : copier le CSV dans `saas-app-shopify/recherche/cold/grok/twitter/recherche-log.md`.
> ⚠️ HALLUCINATIONS : Grok peut inventer des handles, des bios, des chiffres. CHAQUE résultat doit être vérifié manuellement sur x.com/@handle AVANT d'être utilisé pour le cold.

````
Use DeepSearch. Search X right now.

MISSION : trouver des merchants qui ont une boutique Shopify sur X/Twitter. Recherche uniquement. Je veux des comptes RÉELS avec des données VÉRIFIABLES. Si tu n'es pas sûr qu'un compte existe ou qu'il est bien un merchant Shopify, ne l'inclus pas.

CIBLE : uniquement des gens qui POSSÈDENT et GÈRENT une boutique Shopify. Ils vendent des produits. Ce ne sont PAS des developers, PAS des agencies, PAS des consultants, PAS des coaches, PAS des formateurs. Ce sont des VENDEURS avec un store Shopify actif.

CRITÈRES DE QUALIFICATION :
- Bio ou tweets mentionnent "Shopify", "my store", "my shop", "ma boutique", ou contiennent un lien vers un site Shopify (.myshopify.com ou site custom "Powered by Shopify")
- Follower range : 500 - 50,000 (pas les micro-comptes ni les gros influenceurs)
- Compte actif (a tweeté dans les 30 derniers jours)
- Publie du contenu lié à son activité e-com (produits, packaging, commandes, promotions, behind the scenes)
- Idéalement identifiable par niche : fashion, beauty, home, pet, food, fitness, jewelry, accessories, DTC

EXCLUSIONS STRICTES — NE PAS INCLURE :
- Shopify Developers, Shopify Partners, Shopify Experts (ils construisent des stores pour d'autres, ils n'en possèdent pas)
- App developers, theme developers
- Agencies (web, marketing, dev) — SAUF si le owner a aussi son propre store Shopify
- Coaches, formateurs, "gurus" qui vendent des cours/ebooks ("helping merchants", "6-figure store", "DM for coaching", "how I made $X")
- Consultants e-com sans store propre
- Devs, SaaS builders, indie hackers
- Bots, comptes spam
- Comptes > 50K followers sans store identifiable
- Comptes dormants (pas de tweet depuis > 30 jours)

COMMENT DISTINGUER UN VRAI MERCHANT D'UN GURU :
- VRAI MERCHANT : bio contient un nom de marque spécifique, lien vers un vrai store, tweets sur des problèmes concrets (shipping, conversion, apps), photos de produits, engagement modéré (500-20K followers)
- GURU/COACH : bio contient "helping merchants", "6-figure", "DM for coaching", beaucoup de threads "How I made $X", vend des cours, follower count disproportionné vs engagement, tweets génériques motivation/grind

RECHERCHES À EFFECTUER (lance-les toutes dans cette session) :

Recherche 1 — Bio search :
Find X accounts that have "Shopify" or "e-commerce store" or "online store" or "online shop" or "DTC brand" in their bio. Between 500 and 50,000 followers. Posted in the last 30 days. Exclude accounts with "developer", "agency", "partner", "expert", "coach", "course" in their bio.

Recherche 2 — Tweets "my store" :
Find recent tweets (last 14 days) from people saying "my Shopify store", "my Shopify shop", "launched my store on Shopify", "Shopify sales", "store conversion". Exclude retweets. Only accounts that look like actual store owners.

Recherche 3 — Tweets FR :
Find recent tweets (last 14 days) in French: "ma boutique Shopify", "mon store Shopify", "boutique en ligne Shopify", "j'ai lancé ma boutique". Exclude retweets, formations, tutoriels.

Recherche 4 — Liens Shopify :
Find recent tweets containing url:myshopify.com. Exclude retweets. These are people sharing their actual Shopify store links.

Recherche 5 — Problèmes Shopify (cibles premium) :
Find tweets from people complaining about Shopify store issues: slow speed, ghost apps, app billing, theme problems, checkout issues, conversion problems. These are real merchants with identifiable pain points. Exclude @Shopify support account itself.

Recherche 6 — Interactions @Shopify :
Find accounts that reply to @Shopify or @ShopifySupport with store-related questions or problems. These are confirmed merchants. Last 14 days.

Recherche 7 — Small accounts EN :
Find small X accounts (500-5,000 followers) that mention Shopify in their bio and have a website link. Located in US or UK. These are the merchants that other tools miss because of popularity bias.

Recherche 8 — Small accounts FR :
Find small X accounts (500-5,000 followers) with "Shopify" or "boutique en ligne" in their bio. Located in France. Last active in the last 30 days.

DONNÉES À COLLECTER POUR CHAQUE COMPTE :
- handle (@username)
- nom (display name)
- bio (texte complet de la bio)
- followers (nombre exact)
- geo (US/UK/FR/DE/EU-autre/inconnu — depuis la localisation du profil, la langue, ou le contenu)
- niche (fashion/beauty/home/pet/food/fitness/jewelry/accessories/DTC/autre)
- boutique (URL du site si visible dans la bio, ou "N/A" si pas de lien mais Shopify confirmé par bio/tweets)
- signal (comment tu as confirmé que c'est un merchant Shopify : "bio mentions shopify", "tweet links to myshopify.com", "replies to @ShopifySupport", "bio has shopify store link", etc.)
- cold_note (1 phrase max pour personnaliser un futur DM : ce qu'ils vendent, un problème qu'ils ont mentionné, un détail de leur bio)

FORMAT DE SORTIE : donne-moi les résultats en tableau avec les colonnes ci-dessus. Regroupe tous les résultats des 8 recherches dans UN seul tableau, sans doublons. Si un compte apparaît dans plusieurs recherches, garde-le une seule fois.

ANTI-HALLUCINATION :
- Ne me donne QUE des comptes dont tu es CERTAIN qu'ils existent sur X en ce moment.
- Si tu n'es pas sûr qu'un handle est correct ou qu'un compte existe, NE L'INCLUS PAS.
- Chaque donnée (bio, followers, lien) doit provenir de tes résultats de recherche X en temps réel, PAS de tes données d'entraînement.
- Préfère me donner 10 résultats vérifiés plutôt que 50 résultats douteux.
- À la fin du tableau, indique combien de résultats tu as trouvés au total et combien tu as filtrés/exclus.

GÉO — ORDRE DE PRIORITÉ :
Récolte TOUS les merchants qualifiés. La géo sert à prioriser, pas à exclure.
1. US (anglais, localisation US, prix en $)
2. UK (anglais, localisation UK, prix en £)
3. FR (français, localisation FR, prix en €)
4. DE / reste EU
5. Reste du monde
Si la géo n'est pas identifiable mais le contenu est en anglais → note "inconnu" et garde le compte.

FIN DE SESSION :
Après le tableau, donne-moi :
- Nombre total de comptes trouvés (avant filtrage)
- Nombre de comptes qualifiés (dans le tableau)
- Nombre de comptes exclus et pourquoi (devs, agencies, gurus, dormants, bots)
- Recherches qui ont donné le plus de résultats qualifiés
- Recherches qui ont donné le moins de résultats (pour ne pas les relancer)
- Suggestion de requêtes complémentaires pour la prochaine session
````

---

## NE PAS COLLER — Notes pour R

- **⚠️ VÉRIFICATION OBLIGATOIRE.** Grok peut halluciner des handles, des bios, des follower counts. Après chaque session, vérifier CHAQUE handle sur x.com/@handle. Procédure :
  1. Visiter x.com/@handle → confirmer que le compte existe
  2. Comparer la bio avec ce que Grok a retourné
  3. Vérifier le follower count (Grok peut inventer des chiffres)
  4. Cliquer le lien en bio → confirmer que c'est un store Shopify
  5. Vérifier l'activité récente (dernier tweet < 30 jours)
  Estimer 10-30% de faux positifs (handles mal orthographiés, bios déformées, comptes supprimés).

- **Tier requis :** SuperGrok ($30/mois) minimum. Le free tier (10 prompts/2h) ne permet pas de faire les 8 recherches en une session.

- **Mode :** REGULAR, pas Fun mode. Toggle dans l'interface Grok.

- **Trigger phrase :** "Use DeepSearch. Search X right now." est CRITIQUE. Sans ça, Grok peut répondre depuis ses données d'entraînement (anciennes) au lieu de chercher en temps réel sur X.

- **Volume par session :** 10-20 merchants qualifiés après filtrage. Pour 1000 comptes → environ 50-100 sessions.

- **Cadence :** 1-2 sessions/jour. Pause 30 minutes entre les sessions pour éviter la dégradation contextuelle.

- **Pagination entre sessions :** pour la session suivante, ajouter au prompt : "Exclude these handles I already have: @handle1, @handle2, ..." + "Focus on tweets since:[date de la dernière session]"

- **Biais popularité :** Grok favorise les gros comptes. Les recherches 7 et 8 (small accounts) contrent ce biais. Insister explicitement sur les petits comptes.

- **Workflow Grok → Cold :**
  1. Grok : découverte (8 recherches → tableau)
  2. Vérification manuelle : x.com/@handle pour chaque résultat
  3. Copier les résultats vérifiés dans le recherche-log
  4. Cold DM depuis les comptes perso R/F (templates dans storemd/cold/cold-templates.md)

- **Grok ne remplace PAS Claude Chrome.** Grok est meilleur pour la découverte en volume (20 comptes en une requête). Claude Chrome est meilleur pour la vérification détaillée (lire un profil, scanner un site). Utiliser les deux en complémentaire.
