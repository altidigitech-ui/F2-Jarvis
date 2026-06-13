# 01 — SPEC SCRAPING (SOURCE + ENRICH) — le maillon faible

> En mode ultra-lean, OpenClaw remplace StoreCensus/Hunter : il doit trouver les boutiques **et** les emails seul. C'est la partie la plus fragile → elle a sa propre spec.
> **Prototyper sur 5 boutiques avant d'industrialiser.**

---

## CONTEXTE

Shopify ne publie aucun annuaire de propriétaires (confidentialité). Donc on ne "scrape pas Shopify", on **détecte** des boutiques Shopify dans la nature, on les qualifie, puis on cherche le décideur.

Deux étages : **SOURCE** (trouver des boutiques) → **ENRICH** (trouver l'email).

---

## SOURCE — trouver des boutiques Shopify ciblées

**Détecter que c'est Shopify (signatures) :**
- HTML/headers : `cdn.shopify.com`, `/cdn/shop/`, header `X-ShopId`, `Shopify.theme`.
- Endpoint public `/products.json` (ouvert sur la plupart des boutiques) : confirme Shopify **et** donne le catalogue → signal de qualif (nombre de produits, activité).

**Sources de boutiques (OpenClaw browser) :**
- annuaires/listes publiques de boutiques Shopify, marketplaces de niche.
- bios/liens sur réseaux (Insta/TikTok/FB) de comptes e-commerce.
- résultats de recherche par niche + signature Shopify.

**Filtres de qualif (avant d'enrichir) :**
- Pays ∈ **US / UK / AU** (TLD, devise affichée, langue, adresse mentions légales).
- Signaux : plusieurs apps installées (détectables dans les scripts du HTML), thème payant (pas Dawn), activité produit.
- Dédup vs `cold_targets`, `pipeline-conversion`, clients StoreMD existants.

**Sortie SOURCE :** row `cold_targets` (`store_url`, `store_domain`, `country`, `platform_data` = {apps, thème, nb produits, trafic estimé}) en statut `sourced`.

---

## ENRICH — trouver l'email du décideur

Ordre de recherche (du plus fiable au moins) :
1. Pages **contact / about / mentions légales / policies / footer** de la boutique.
2. **Réseaux liés** au store (bio Insta/FB) via OpenClaw.
3. **Pattern/permutation** (`prenom@domaine`, `prenom.nom@domaine`) **+ vérification SMTP** (handshake MX → RCPT TO, **sans envoyer**) pour valider sans bounce.

**Règles :**
- **Drop** les adresses role (`info@`, `support@`, `contact@`, `hello@`) → on veut le décideur. En dernier recours, garder une role marquée basse priorité.
- Marquer `email_verified = true` seulement après vérif SMTP réussie.

**Sortie ENRICH :** `decision_maker_email` + `decision_maker_name` + `email_verified`, statut `enriched` (ou `unreachable` si rien de valide).

---

## ROBUSTESSE & ANTI-DÉTECTION

- OpenClaw : profils anti-detect + proxies **seulement si nécessaire** (coût). Démarrer sans, ajouter si blocages.
- Rate-limit + retries + backoff. Respecter les robots/charge.
- **Le scraper casse quand les sites changent** : monitoring du yield + alertes. Sélecteurs isolés et faciles à patcher.

---

## LÉGAL

Collecte **loyale** (sources publiques uniquement), ciblage **US/UK/AU** seulement, **pas d'EU/FR**. Détail → fichier conformité (à intégrer au repo).

---

## CRITÈRE DE VALIDATION (avant d'industrialiser)

Prototype sur **5 boutiques connues** :
- % de boutiques correctement détectées Shopify + qualifiées,
- **% où on trouve un email décideur valide = le YIELD.**

Si yield **< 30%** → revoir la méthode d'enrichissement **avant** de scaler. C'est ce yield qui détermine combien de boutiques sourcer/jour pour atteindre 50 emails (ex. yield 40% → sourcer ~125/jour).
