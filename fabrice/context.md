# CONTEXT OPÉRATIONNEL — Fabrice Gangitano (F)

> Cadre opérationnel de F. Focus : acquisition client, cold, publication schedulée.
> Hérite de `BIBLE.md` racine. Pas de duplication.
> Dernière mise à jour : 02 mai 2026

---

## 1. Identité

| Fait | Détail |
|------|--------|
| **Rôle** | Co-fondateur CTO / Builder |
| **Handles perso** | Twitter @FabGangi · LinkedIn Fabrice Gangitano · Reddit [username] · Facebook [profil perso] · PH profil perso |
| **Disponibilité** | Full-time, 7-10h/jour. Acquisition + build en parallèle. Build hors de ce repo. |

---

## 2. Comptes gérés

R et F gèrent ENSEMBLE les comptes StoreMD. Chacun gère ses comptes perso.

| Plateforme | Compte StoreMD | Compte perso F | Géré par |
|-----------|---------------|---------------|----------|
| Instagram | ✅ | ❌ | R + F |
| TikTok | ✅ | ❌ | R + F |
| Twitter | ✅ | ✅ @FabGangi | R + F (StoreMD), F (perso) |
| LinkedIn | ❌ | ✅ Fabrice Gangitano | F (perso) |
| Facebook | ✅ | ✅ profil perso | R + F (StoreMD), F (perso) |
| Reddit | ❌ | ✅ | F (perso) |
| IH | ✅ | ❌ | R + F |
| PH | ❌ | ✅ | F (perso) |

---

## 3. Posture : vendeur de produit, pas influenceur

R et F ont pris ensemble le virage full acquisition. F est sur les réseaux pour la même raison que R : rentrer en contact avec des potentiels clients et vendre le produit actif du studio. L'angle de F est technique accessible, mais l'objectif est identique.

Ce qui compte :
- Trouver des potentiels clients et les contacter (cold)
- Faire vivre les réseaux avec du contenu schedulé pour informer sur le produit (publication)
- Répondre aux commentaires s'il y en a (réponse)

Ce qui ne se fait plus :
- Engagement proactif sur les posts des autres
- Interactions forcées pour l'algo
- Farming de visibilité
- Build in public ("here's how I coded this", "just shipped a feature")
- Passer la journée sur les réseaux

On schedule les posts, on fait du cold, et on répond s'il y a des commentaires.

---

## 4. Ciblage logique par business

Le studio a plusieurs types de business. L'approche change selon le business, mais l'objectif reste le même : trouver des clients.

### SaaS apps Shopify (StoreMD actuel, futurs SaaS)

**Public :** niche. Merchants qui ont une boutique Shopify. Si tu n'as pas de boutique Shopify, StoreMD ne t'intéresse pas. Un dev, un CEO, un marketeur généraliste, un SaaS builder = pas la cible. C'est un produit niché à Shopify.

**Cold = le cœur.** DM Twitter, connexion+DM LinkedIn, DM Facebook. Trouver des merchants Shopify et les contacter. F aborde par la cause technique en termes simples ("your store has 14 apps, 3 inject dead code, that's why it loads in 4.2s"), R aborde par l'impact business ("that costs you $2K/month"). Même cible, angles complémentaires.

**Publication = faire vivre les réseaux.** Posts avec vidéo et carrousels schedulés. Montrer ce que le produit détecte, expliquer pourquoi les problèmes existent en termes accessibles.

**Beta actuel :** StoreMD n'est pas sur le Shopify App Store. Le cold est le seul moyen d'acquisition. Quand l'app sera approuvée, le cold reste prioritaire mais le lien public devient possible.

**Quand un 2ème SaaS app Shopify arrive :** même approche. Même type de cible. Les hooks techniques changent, le process reste identique.

### Boutique (prévue)

**Public :** large. Mode. Plus de niche technique.

**Cold = infaisable.** Le public est trop large, pas de critère de ciblage précis pour du DM.

**Tout repose sur la promo et le volume de visibilité.** Beaucoup d'articles, beaucoup d'animations marketing. Le volume de contenu et la visibilité organique/payante remplacent le cold.

---

## 5. Activités par ordre de priorité

### 1. Cold (priorité #1)

Trouver et contacter des potentiels clients. C'est LA priorité.

- **Twitter :** DM direct aux merchants Shopify trouvés par Grok
- **LinkedIn :** demandes de connexion + DM quand accepté
- **Facebook :** DM direct aux merchants trouvés dans les groupes Shopify
- **Instagram/TikTok :** DM depuis les comptes StoreMD aux merchants trouvés par Apify

### 2. Publication (priorité #2)

Batch samedi, schedule en semaine. Posts avec vidéo et carrousels. On ne rédige pas en semaine.

- **Twitter F :** 1 post/jour (7/semaine)
- **LinkedIn F :** 2 posts/semaine
- **Reddit F :** 2 posts/semaine (quand débloqué, batché et schedulé au minimum)
- **Comptes StoreMD :** Instagram, TikTok, Twitter StoreMD, Facebook, IH (géré avec R)

### 3. Réponse (priorité #3)

Si quelqu'un commente un post ou répond à un DM, F répond. C'est tout. Pas d'engagement proactif.

Exception ultra spécifique : si tous les canaux sont bloqués, F peut engager sur un post pertinent. Mais c'est l'exception.

### 4. PH (maintenance)

6 interactions sur Product Hunt. Karma farming minimal.

---

## 6. Volumes

| Activité | Volume | Fréquence |
|----------|--------|-----------|
| Cold Twitter | 10 DMs | /jour |
| Cold LinkedIn | 10 connexions+DMs | /jour |
| Cold Facebook | 10 DMs | /jour |
| Publication Twitter F | 1 post | /jour |
| Publication LinkedIn F | 2 posts | /semaine |
| Publication Reddit F | 2 posts | /semaine (quand débloqué) |
| PH | 6 interactions | /jour |
| Engagement proactif | 0 | - |

Les publications comptes StoreMD (Instagram, TikTok, Twitter StoreMD, Facebook, IH) sont gérées avec R via `saas-app-shopify/storemd/publication/batch-semaine.md`.

---

## 7. Outils

| Outil | Rôle |
|-------|------|
| **Jarvis** (Claude Code + agents dans le repo) | Production opérationnelle. Batch posts, cold volume, logs, mise à jour structure repo. |
| **Claude** (projet "Fabrice") | War room stratégique. Réflexion, debriefs, rédaction ponctuelle. |
| **Grok** | Détective Twitter. Recherche cibles cold, tendances, comptes. |
| **Apify** | Source de cibles. Instagram, TikTok, Facebook, LinkedIn. Trouver des merchants à contacter. |

Règle : Grok = détective Twitter. Apify = source de cibles autres plateformes. Jarvis = production. Claude projet = réflexion. Ne pas mélanger.

---

## 8. Documents de référence

| Document | Rôle |
|----------|------|
| `VOIX.md` | Voix F, 6 registres techniques accessibles, anti-IA, règles par plateforme |
| `angles-et-templates.md` | Frameworks de contenu par type de post |
| `planning/` | Plan 30 jours, plan hebdo, playbook, daily checklist |
| `tracking/` | Suivi comptes, progress, douleurs observées |
| `cold/` | Cold-logs comptes perso (Twitter, LinkedIn, Facebook) |
| `publication/` | Batch-semaine comptes perso (Twitter F, LinkedIn F, Reddit F) |
| `engagement/` | Engagement-logs perso (Reddit, PH) |
| `../saas-app-shopify/` | Recherche, templates, hashtags, comptes StoreMD |
| `../saas-app-shopify/storemd/context.md` | Produit actif : features, pricing, hooks, cibles |
| `../growth-marketing/` | Algos et context par plateforme |
| `../ANTI-IA.md` | Règle #0 anti-détection |
| `../BIBLE.md` | Principes non-négociables |
