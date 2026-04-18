---
name: shopify-gql
description: Pattern F2 pour intégration Shopify via GraphQL Admin API. REST est legacy depuis avril 2025. Inclut read_reports + ShopifyQL SDK, rate limits cost-based, webhooks, custom distribution app.
trigger: Shopify, StoreMD, Leak Detector, intégration marchand
when: on-demand
---

# Skill shopify-gql

## Règle 1 — GraphQL obligatoire

Shopify REST Admin API is legacy depuis avril 2025. Tout nouveau code Shopify F2 = GraphQL Admin API. Aucune exception.

## Règle 2 — Custom Distribution App

StoreMD est distribué en **Custom Distribution App**, pas sur l'App Store. Raison : évite la commission 20% de Shopify.

Conséquence : les marchands installent via un lien direct, scope validé manuellement. Pas de review Shopify.

## Scopes F2 types

```
read_orders
read_products
read_customers
read_inventory
read_reports          # Essentiel pour ShopifyQL
read_analytics
read_shopify_payments_payouts
read_shopify_payments_disputes
```

## Pattern : ShopifyQL pour analytics

Au lieu de :
```graphql
# ❌ Mauvais : N+1 queries pour stats
orders(first: 100) { ... }
# puis boucle côté client
```

Faire :
```graphql
# ✅ Bon : ShopifyQL en une query
shopifyqlQuery(query: "FROM sales SHOW gross_sales, net_sales GROUP BY day SINCE -30d") {
  ... on TableResponse {
    tableData { rowData columns { name dataType } }
  }
}
```

## Pattern : Rate limits cost-based

GraphQL Shopify = 1000 points/seconde (Plus), 500 (standard). Chaque query a un coût.

```typescript
// Toujours checker extensions.cost après chaque query
const result = await shopifyClient.query(QUERY)
const cost = result.extensions.cost
if (cost.throttleStatus.currentlyAvailable < 100) {
  await sleep(cost.throttleStatus.restoreRate * 1000)
}
```

## Pattern : Pagination cursor-based

```graphql
orders(first: 50, after: $cursor) {
  edges {
    cursor
    node { id, name, totalPriceSet { shopMoney { amount, currencyCode } } }
  }
  pageInfo { hasNextPage, endCursor }
}
```

Jamais de `page` + `limit` — ça n'existe pas en GraphQL Shopify.

## Pattern : Webhook verification

```python
import hmac, hashlib, base64

def verify_shopify_webhook(data: bytes, hmac_header: str, secret: str) -> bool:
    digest = hmac.new(
        secret.encode('utf-8'),
        data,
        hashlib.sha256
    ).digest()
    computed_hmac = base64.b64encode(digest).decode()
    return hmac.compare_digest(computed_hmac, hmac_header)
```

## Stack F2 pour Shopify

- **Python** : `shopify-python-api` v13+ (GraphQL support)
- **Webhooks** : FastAPI endpoints, verification HMAC obligatoire
- **Background jobs** : Celery pour sync async
- **Cache** : Redis, TTL cohérent avec webhook updates

## Librairies recommandées

- [`shopify-python-api`](https://github.com/Shopify/shopify_python_api) (officiel)
- [`graphql-core`](https://pypi.org/project/graphql-core/) pour parser schema
- [`python-graphql-client`](https://pypi.org/project/python-graphql-client/) pour requests

## Pièges connus F2

1. **Legacy REST** : si tu vois du `ShopifyAPI::Product.find(id)`, c'est REST. À migrer.
2. **Metafields** : changement de schema fréquent, toujours query les types d'abord
3. **Bulk operations** : pour >250 records, utiliser `bulkOperationRunQuery` (async, webhook completion)
4. **Shop currency vs presentment currency** : toujours utiliser `presentmentMoney` pour affichage client

## Pattern F2 : app detection

StoreMD détecte les apps installées via `currentAppInstallation` + inventory sources :
```graphql
currentAppInstallation {
  id
  app { handle }
}
shop {
  features {
    # list capabilities
  }
}
```
