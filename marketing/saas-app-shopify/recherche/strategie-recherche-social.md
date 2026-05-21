# STRATÉGIE DE RECHERCHE PROSPECTS — Instagram / TikTok / Facebook

**Date :** 30 avril 2026
**Auteur :** R (Romain Delgado) — FoundryTwo
**Outil principal :** Claude in Chrome (agent de navigation)
**Produit ciblé :** StoreMD — AI agent santé Shopify stores
**Statut :** Opérationnel

---

## 1. OBJECTIF

Constituer une base de prospects qualifiés pour cold outreach StoreMD sur 3 plateformes :

- **Instagram** — 1000 comptes cibles
- **TikTok** — 1000 comptes cibles
- **Facebook** — 1000 comptes cibles

Chaque compte récolté = un prospect prêt à recevoir un cold DM personnalisé.

---

## 2. QUI ON CHERCHE (critères d'inclusion)

### Catégorie A — Merchants Shopify (priorité #1)

- A une boutique Shopify identifiable (lien en bio, mention "Shopify" dans le contenu, .myshopify visible, ou "powered by Shopify" sur le site)
- Taille : petite à moyenne entreprise (pas de Fortune 500)
- Follower range : 500 - 100K (sweet spot pour engagement DM)
- Publie du contenu lié à son activité e-com (produit, behind the scenes, packaging, shipping, promo)
- Idéalement identifiable par niche : fashion, beauty, home, pet, food, fitness, jewelry, accessories
- **Géographie : US et EU (France incluse) en priorité.** Signaux géo : langue du contenu (anglais ou français), localisation dans la bio, devise du store (.com, .fr, .de, .co.uk), timezone des posts. Shopify est mondial — on récolte tous les merchants qualifiés, la géo sert à prioriser l'ordre du cold (US d'abord, EU ensuite, reste du monde en dernier).

### Catégorie B — Influenceurs e-com Shopify (secondaire)

- A sa propre boutique Shopify OU fait du contenu récurrent sur Shopify/e-commerce
- Audience engagée dans l'e-com (pas un influenceur gaming qui a un merch shop dormant)
- Susceptible d'adopter StoreMD pour sa propre boutique ET de le recommander
- Follower range : 5K - 500K
- Crée du contenu éducatif/tutorial sur Shopify, dropshipping, e-com
- **Géographie : US et EU (France incluse) en priorité.** Même signaux géo que catégorie A. Récolte mondiale, priorisation cold US > EU > reste.

---

## 3. QUI ON EXCLUT (critères d'exclusion)

- CEOs, C-suite, corporate
- SEO / marketing agencies (sauf si ils gèrent des stores Shopify pour clients — dans ce cas = catégorie prospect)
- Devs / SaaS builders / indie hackers (BIBLE §5 — cible non-dev)
- Comptes > 100K followers sans boutique Shopify identifiable
- Comptes dormants (pas de post depuis > 30 jours)
- Concurrents directs (outils audit Shopify, apps de performance)
- Influenceurs sans lien avec Shopify/e-com (lifestyle pur, gaming, politique)
- Dropshipping gurus qui vendent des formations (pas des merchants réels)

---

## 4. DONNÉES À COLLECTER PAR COMPTE

Pour chaque prospect qualifié, on collecte :

| Champ | Exemple |
|-------|---------|
| **Plateforme** | Instagram |
| **Handle** | @nomducompte |
| **Nom affiché** | Brand Name |
| **Followers** | ~15K |
| **Catégorie** | A (merchant) ou B (influenceur e-com) |
| **Géo** | US / FR / UK / DE / EU-autre |
| **Niche** | Fashion / Beauty / Home / etc. |
| **Boutique Shopify** | lien.myshopify.com ou domaine custom |
| **Signal** | Comment on sait que c'est Shopify (lien bio, mention post, site vérifié) |
| **Note cold** | 1 phrase max pour personnaliser le DM |

**Format de sortie Claude Chrome : CSV dans code block.** Plus compact en tokens qu'un tableau markdown, directement collable dans les fichiers de suivi. Exemple :

```
handle,nom,followers,cat,geo,niche,boutique,signal,cold_note
@store1,Ma Boutique,15K,A,US,Fashion,maboutique.com,link bio powered by shopify,sells handmade bags
@store2,Beauty FR,8K,A,FR,Beauty,beautystore.fr,bio mentions shopify,skincare brand Lyon
```

---

## 5. OUTIL : CLAUDE IN CHROME — FONCTIONNEMENT

### Ce que Claude Chrome PEUT faire

- Naviguer sur Instagram/TikTok/Facebook en utilisant la session connectée de R
- Chercher par hashtag, mot-clé, explorer des profils
- Lire les bios, les posts, les descriptions
- Scroller (avec limites)
- Extraire et formater les données visibles à l'écran
- Suivre des liens dans les bios pour vérifier si un site est Shopify

### Ce que Claude Chrome NE PEUT PAS faire

- Scraper en masse (il navigue comme un humain)
- Gérer un contexte infini (après ~15-25 profils détaillés, saturation tokens)
- Se connecter à des comptes (il utilise la session active de R)
- Exporter en CSV natif (il produit du texte structuré)
- Contourner les restrictions de plateforme (rate limiting, blocage scroll)

### Contrainte critique : gestion des tokens

Claude Chrome a une fenêtre de contexte limitée. Chaque page visitée consomme des tokens. Si il visite trop de pages sans s'arrêter, il ne peut plus produire de réponse complète.

**Règle intégrée dans chaque prompt :**
- Claude Chrome travaille en **batches de 5 profils**. Après chaque batch, il sort les données collectées en CSV dans le chat avant de continuer. Ça externalise la mémoire et évite la perte de données.
- Max **3-4 batches par session** (15-20 profils). Au-delà, le phénomène "lost-in-the-middle" dégrade la fiabilité des données du début de session.
- Il doit indiquer précisément où il s'est arrêté pour permettre la relance
- Format de sortie : CSV dans code block (voir section 4)

### Warning anti-bot

Instagram, TikTok et Facebook détectent les navigations rapides automatisées. Si Claude Chrome visite trop de profils en rafale, la plateforme peut sortir un CAPTCHA ou rate-limiter le compte de R. Les prompts doivent inclure une instruction d'espacement entre les visites de profils.

### Risque domaines bloqués

Claude Chrome interroge une API Anthropic pour classifier les domaines visités. Certaines catégories de sites sont bloquées. Instagram, TikTok et Facebook ne sont probablement pas bloqués (Claude Chrome confirme pouvoir y accéder), mais cela n'a pas été testé en live lors de l'audit. À valider lors de la première session de recherche réelle. Si un domaine est bloqué, le plan de recherche pour cette plateforme tombe à l'eau.

---

## 6. ARCHITECTURE DES PROMPTS

### Prompt 0 — Découverte capacités Claude Chrome
Objectif : comprendre les limites exactes de Claude Chrome sur chaque plateforme avant de lancer les recherches. Ce prompt est exécuté UNE SEULE FOIS. Les résultats calibrent tous les prompts suivants.

### Prompt 1/2/3 — Recherche par plateforme (Instagram / TikTok / Facebook)
Chaque prompt est autonome, conçu pour une session. Inclut :
- Critères de qualification intégrés
- Format de sortie standardisé
- Instruction d'arrêt avant saturation tokens
- Point de reprise pour le prompt de relance

### Prompt R — Relance (template générique)
Reprend là où le prompt précédent s'est arrêté. Chaque prompt de relance inclut un extrait du `recherche-log` de la plateforme : liste des handles déjà trouvés + dernier point d'arrêt + vecteurs déjà explorés. Claude Chrome utilise ces infos pour ne pas chercher en double.

---

## 7. GÉOGRAPHIE — ORDRE DE PRIORITÉ COLD

Shopify est mondial. Claude Chrome récolte TOUS les merchants qualifiés quelle que soit la géo. La géographie sert uniquement à prioriser l'ordre de traitement dans l'engagement-log au moment du cold.

**Ordre de priorité :**

| Marché | Langue cold | Priorité | Signaux de détection |
|--------|------------|----------|---------------------|
| US | Anglais | #1 | Bio en anglais, prix en $, .com, shipping US mentionné |
| UK | Anglais | #2 | Localisation UK en bio, prix en £, .co.uk |
| France | Français | #3 | Bio/contenu en français, prix en €, .fr |
| Allemagne | Anglais | #4 | Localisation DE, .de, contenu mixte DE/EN |
| Reste EU | Anglais | #5 | Localisation EU, prix en €, contenu en anglais |
| Reste du monde | Anglais | #6 | Tout merchant Shopify qualifié hors US/EU |

**Règle :** si la géo n'est pas identifiable (pas de localisation, pas d'indice devise/langue), on garde le prospect si le contenu est en anglais — forte probabilité US/UK/EU.

**Implications pour les prompts Claude Chrome :**
- Ajouter des termes de recherche localisés (ex: "boutique shopify" pour le marché FR)
- Vérifier la devise du store quand le lien est accessible
- Pour les groupes Facebook : cibler les groupes anglophones ET francophones Shopify

---

## 8. STRATÉGIE DE RECHERCHE PAR PLATEFORME

### Instagram

**Vecteurs de recherche :**
1. Hashtags EN : #shopify, #shopifystore, #shopifybusiness, #shopifyseller, #ecommercebusiness, #smallbusinessowner, #myshopify
2. Hashtags FR : #boutiqueshopify, #eshopfrance, #ecommercefrance, #venteenligne, #boutiquenligne
3. Explore page : comptes similaires à partir d'un premier merchant Shopify trouvé
4. "Suggested for you" : chaîne de profils similaires depuis un profil qualifié
5. Bio search : profils avec "shopify" dans la bio

**Méthode :** Hashtag → onglet "Top" (plus fiable que "Recent") → profil → vérifier bio/lien → si Shopify confirmé → noter (avec géo identifiée) → "comptes similaires" (sidebar "Similar accounts") → boucle

**Spécificités confirmées :** Les Stories et Reels ne sont pas fiables sur web. Le rate limiting peut se déclencher si trop de profils sont visités en rafale — espacer les visites.

### TikTok

**Vecteurs de recherche :**
1. Recherche EN : "shopify store", "my shopify", "shopify business", "ecommerce store"
2. Recherche FR : "boutique shopify", "ma boutique en ligne", "ecommerce france"
3. Hashtags TikTok : #shopify, #shopifytips, #ecommerce, #smallbusiness, #packingorders
4. Créateurs dans "Suggested" depuis un profil qualifié
5. Commentaires sous vidéos populaires Shopify (identifier les merchants qui commentent)

**Méthode :** Recherche keyword → **filtrer par onglet "Users"** (pas vidéos) → profil créateur → vérifier bio/lien → si Shopify → noter (avec géo identifiée) → suivants

**Spécificités confirmées :** Le web TikTok est intentionnellement dégradé par rapport à l'app. Certains profils ont des données incomplètes sur web. Quand une donnée n'est pas disponible, noter "N/A" plutôt que laisser vide. Le For You feed est inutile pour la recherche — utiliser exclusivement la recherche ciblée.

### Facebook

**Vecteurs de recherche :**
1. Groupes EN : "Shopify Entrepreneurs", "Shopify Store Owners", "Ecommerce Shopify", "Shopify Sellers Community"
2. Groupes FR : "Shopify France", "E-commerce France", "Shopify Francophone", "Entrepreneurs Shopify"
3. Membres actifs de ces groupes qui postent (pas les lurkers)
4. Pages d'entreprises liées à des stores Shopify
5. Posts dans les groupes mentionnant des problèmes (vitesse, apps, conversion) = cibles premium

**Méthode :** Rejoindre/scroller groupe → posts récents → profil auteur → vérifier si merchant → noter (avec géo identifiée) → suivants

**Spécificités confirmées :** Deux sources complémentaires sur Facebook :
- **Pages d'entreprise** — publiques par défaut, accessibles via la recherche Facebook filtrée par "Pages". Bio, followers, about section toujours visibles.
- **Profils personnels via les groupes** — les merchants qui postent dans les groupes Shopify ont leur nom et contenu de post visibles dans le groupe. Cliquer sur leur profil donne accès à ce qui est public (bio, lien boutique). Les profils verrouillés ne montrent que le nom, mais le post dans le groupe suffit souvent à qualifier.
- La recherche Facebook globale par "People" est peu productive (trop de profils privés). Passer par les groupes et les Pages.
- R doit être membre des groupes AVANT de lancer les prompts (certains groupes ont une validation).

---

## 9. VOLUME ET SESSIONS

### Par session Claude Chrome

- **Baseline : 15 comptes qualifiés par session** (3 batches de 5 avec checkpoint intermédiaire)
- Maximum : 20 comptes si les profils sont simples (bio + followers uniquement)
- Réduire à 10 si les profils sont complexes (pages Facebook avec posts, about, groupes)
- Durée estimée : 15-30 minutes par session
- Nombre de sessions pour 1000 comptes : ~50-65 sessions par plateforme

### Planning proposé

| Semaine | Plateforme | Sessions | Comptes cumulés estimés |
|---------|------------|----------|------------------------|
| S1 | Instagram | 5-7/jour | ~100-175 |
| S2 | Instagram + TikTok | 5-7/jour split | ~200-350 total |
| S3 | TikTok + Facebook | 5-7/jour split | ~300-525 total |
| S4+ | Rotation 3 plateformes | 5-7/jour | Scale vers 1000/plateforme |

**Note :** Ces estimations seront recalibrées après le Prompt 0 (découverte capacités).

---

## 10. FICHIERS DE SUIVI

2 fichiers par plateforme = 6 fichiers au total. Chaque fichier a un rôle distinct.

### `recherche-log-[plateforme].md` (× 3 : instagram, tiktok, facebook)

**Owner :** Claude Chrome (via R)
**Rôle :** Suivi des recherches effectuées par Claude Chrome. Sert à construire les prompts de relance pour ne pas chercher en double.
**Contenu :**
- Liste des handles déjà trouvés (avec toutes les données collectées : nom, followers, niche, géo, boutique, signal, note cold)
- Vecteurs de recherche explorés (hashtags, groupes, keywords)
- Point d'arrêt de chaque session
- Numéro de session et date

**Workflow :** Claude Chrome sort ses résultats → R copie dans le recherche-log → au prompt de relance suivant, R colle un extrait du recherche-log (handles + point d'arrêt) dans le prompt pour que Claude Chrome ne refasse pas le travail.

**Template de fin de session (Claude Chrome doit produire ce bloc à chaque arrêt) :**
```
STOPPED AT: [URL de la dernière page]
Last profile: @handle
Batch count: [nombre de batches effectués]
Profiles checked total: [nombre]
Profiles skipped (not qualified): [nombre]
Search vector used: [hashtag/groupe/keyword]
Vectors not yet explored: [liste]
Resume from: [prochaine URL ou action]
Skip list: [tous les handles déjà trouvés, séparés par virgules]
```

### `engagement-log-[plateforme].md` (× 3 : instagram, tiktok, facebook)

**Owner :** R
**Rôle :** Tracker de ce qu'on fait sur les réseaux. Se nourrit des données du recherche-log.
**Contenu :**
- Infos complètes du compte (copiées depuis le recherche-log)
- Statut engagement : ajouté / coldé / répondu / converti
- Date de chaque action
- Notes de suivi

**Workflow :** R pioche dans le recherche-log → copie les comptes à traiter dans l'engagement-log → met à jour le statut au fur et à mesure du cold.

---

## 11. PIPELINE POST-RÉCOLTE

```
Récolte (Claude Chrome)
    ↓
recherche-log-[plateforme].md (résultats bruts + suivi recherche)
    ↓
engagement-log-[plateforme].md (comptes sélectionnés pour cold)
    ↓
Cold outreach personnalisé (Jarvis / Claude Code — batch mode)
    ↓
Suivi réponses (dans engagement-log)
```

Le cold outreach lui-même est produit par Jarvis dans le repo F2-Jarvis (pas ici). La note cold dans le recherche-log fournit le hook de personnalisation.

---

*Ce fichier est le guide maître. Les prompts détaillés sont dans les fichiers séparés.*
