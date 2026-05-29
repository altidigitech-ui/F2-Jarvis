# VOIX STOREMD — Comptes produit

> Ce fichier définit COMMENT StoreMD parle sur ses comptes produit (TikTok, Twitter, Instagram, Facebook) et sur IH (compte FoundryTwo, quand StoreMD est le SaaS promu).
> Il ne couvre PAS les voix perso R et F (voir `romain/VOIX.md` et `fabrice/VOIX.md`).
> Source de vérité pour tout contenu publié sur les comptes StoreMD.
> Dernière mise à jour : 23/05/2026

---

## A — VOIX PRODUIT SHOPIFY (règles communes)

> Ce bloc contient les règles transverses à toute app Shopify du studio.
> Quand une deuxième app arrive, ce bloc sera extrait vers `saas-app-shopify/VOIX-PRODUIT.md`.

### Pronom

Aucun. Jamais "I". Jamais "we". Le produit parle de lui-même. Le scan, le résultat, la feature sont les sujets. Pas une persona, pas un fondateur, pas un studio.

Exemples :
- ✅ "StoreMD finds the issue, ranks it by severity, and fixes it."
- ✅ "An app you uninstalled can keep charging you for months."
- ❌ "We scan your store and fix what's broken."
- ❌ "I built this to solve a real problem."

### Ton

Neutre, factuel, direct. Le produit fait le travail, le texte le montre. Pas de hype, pas de superlatifs vides ("amazing", "revolutionary", "game-changer"). Les chiffres et les résultats parlent. Si un chiffre n'existe pas dans les sources, il n'est pas écrit.

### Registres utilisables

Les posts des comptes produit tournent sur ces registres, à varier dans la semaine :
- **Data-drop** : un fait concret, une stat sourcée, un montant réel.
- **Démonstration** : le produit en action, ce qu'il trouve, ce qu'il corrige.
- **Comparaison** : ce que font les autres outils vs ce que fait StoreMD.
- **Problème → fix** : un problème concret de boutique Shopify, suivi de la résolution par le produit.
- **POV** : point de vue du merchant qui découvre un problème (ghost billing, code résiduel, score IA).

Interdiction de faire 5 posts consécutifs avec le même registre (ex: 5x problème→fix).

### Format par plateforme (comptes produit)

| Plateforme | Longueur | Lien | Hashtags | Spécificité |
|---|---|---|---|---|
| TikTok | Caption courte, 4-6 lignes | Bio | 5 (Set A/B/C depuis `hashtags.md`) | Vidéo obligatoire, ancre du jour |
| Instagram | Caption identique TikTok (écrite en dur) | Bio | 5 (Set A/B/C IG) | Reel recyclé TikTok |
| Facebook | Caption identique TikTok (écrite en dur) | Bio | 3 (Set A/B FB) | Reel recyclé TikTok |
| Twitter StoreMD | 100-280 caractères | Reply (2 liens en cases séparées) | 0 | Jamais de lien dans le corps |
| IH (FoundryTwo) | Long-form, transparent | In-text (2 liens) | 0 | Voix StoreMD (compte FoundryTwo, voix du SaaS promu) |

### Emojis

Minimum 1 par post, maximum 3. En fin de ligne ou en tête de bloc. Jamais en milieu de phrase.

### ANTI-IA appliqué au produit

Les mêmes règles que les comptes perso (source `ANTI-IA.md`) s'appliquent aux comptes produit :
- Pas d'em-dash comme pivot de phrase.
- Pas de "Not X — it's Y" / "It's not about X, it's about Y".
- Pas de cadence fixe contexte → solution → question ouverte en fin.
- Pas de listes numérotées dans les posts.
- Pas de "Here's the thing:" / "The reality is" / "At the end of the day" / "So," / "Look," / "Honestly," en ouverture.
- Contractions obligatoires (doesn't, isn't, won't, can't) même en voix produit.
- Phrases de longueurs variées, jamais 5 d'affilée de même longueur.

### Charte data (BIBLE §3)

- Zéro donnée d'usage merchant inventée.
- Zéro faux MRR, faux nombre de clients, faux testimonials.
- Les chiffres viennent d'une source traçable (reviews publiques, research, admin dashboard, MUTATIONS.md).
- Scénarios illustratifs autorisés (pas de noms réels).
- Statistiques agrégées e-com autorisées (marges marketing).

---

## B — IDENTITÉ STOREMD (propre à l'app)

> Ce bloc contient ce qui est unique à StoreMD. Il reste dans ce fichier quand les règles communes seront extraites.

### Positionnement signature

**L'agent qui répare et qui fait économiser.**

StoreMD ne fait pas que diagnostiquer. Il trouve les problèmes, les classe par sévérité, et les corrige en un clic ou en masse. Les autres outils d'audit laissent un rapport et s'en vont. StoreMD laisse une boutique réparée et un merchant qui a arrêté de perdre de l'argent.

### Territoire d'expression — les 5 modules

Chaque module est un angle de contenu à exploiter :

| Module | Ce qu'il fait | Angle marketing |
|---|---|---|
| **Store Health** | Scanne vitesse, scripts, code mort, performance | "Ta boutique est plus lente que tu ne crois" |
| **Listings** | Audite SEO produit, fiches, métadonnées | "Tes fiches produit saignent du trafic" |
| **Agentic Readiness** | Teste comment les bots IA voient la boutique | "Ta boutique est invisible pour ChatGPT" |
| **Compliance** | Vérifie sécurité headers, email deliverability | "Les emails de commande n'arrivent peut-être pas" |
| **Browser Automation** | Navigue la boutique comme un vrai client | "On ouvre ta boutique comme un client, pas comme un robot" |

### Angles distinctifs

Ces angles ont prouvé leur accroche (batch S10/S11) :
- **Ghost billing** : des apps désinstallées continuent de facturer pendant des mois en silence. StoreMD les détecte.
- **Code résiduel** : les apps laissent du code mort dans le thème après désinstallation. Ça ralentit la boutique. StoreMD le trouve et le nettoie.
- **Invisible to ChatGPT** : les acheteurs demandent de plus en plus à l'IA quels produits acheter. Si la boutique n'est pas lisible pour ces modèles, elle ne ressort pas. StoreMD teste ça.
- **Fix, pas rapport** : one-click fix et bulk fixes. Le merchant ne lit pas un audit, il récupère une boutique réparée.

### Vocabulaire

| Autorisé | Interdit |
|---|---|
| "offer", "launch offer" | "promo", "promotion", "deal" (cold OK, publication non) |
| "2 months free", "save $X" | tout pourcentage (%, "30% off") |
| "locked for life" | "les prix vont augmenter" / "prices will increase" |
| "founding user" | "beta" (phase beta terminée) |

### Ce qui distingue StoreMD (moat en une phrase)

Les outils d'audit listent. StoreMD agit. Le scan trouve, classe par sévérité, et corrige. C'est l'agent, pas le rapport.

---

## POINTEURS

- Voix R : `romain/VOIX.md`
- Voix F : `fabrice/VOIX.md`
- Contexte produit (pricing, cibles, hooks cold, moat détaillé) : `storemd/context.md`
- Charte offre (dates, timeline, données canon) : `OFFER_LAUNCH_MARKETING.md`
- Hashtags : `saas-app-shopify/hashtags.md`
- UTM : `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`
- ANTI-IA complet : `ANTI-IA.md` (racine du repo)
