# Pattern — Shopify REST API is dead, use GraphQL

**Capturé le** : 2026-03-03
**Découvert dans** : Leak Detector → migration StoreMD
**Auteur** : Fabrice
**Catégorie** : tech

---

## Problème

Shopify a officiellement deprecated son Admin REST API en avril 2025. Tout nouveau code Shopify F2 doit utiliser **GraphQL Admin API** exclusivement. Les SDK REST legacy continuent de fonctionner mais ne reçoivent plus de nouvelles features.

## Contexte d'apparition

Leak Detector V1 utilisait le SDK Python REST (`ShopifyAPI::Product.find(id)` style). Lors du pivot vers StoreMD, on a voulu ajouter les ShopifyQL analytics → nécessite GraphQL. Décision : migration complète plutôt que stack hybride.

## Solution (le pattern)

### Stack F2 Shopify standard

```python
# pyproject.toml
dependencies = [
    "shopify-python-api>=13.0",    # v13+ = GraphQL first
    "graphql-core>=3.2",
    "gql>=3.5",
]
```

### Query pattern

```python
from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport

transport = AIOHTTPTransport(
    url=f"https://{shop_domain}/admin/api/2025-10/graphql.json",
    headers={"X-Shopify-Access-Token": access_token}
)
client = Client(transport=transport, fetch_schema_from_transport=False)

query = gql("""
    query GetOrders($first: Int!) {
        orders(first: $first) {
            edges {
                cursor
                node {
                    id
                    name
                    totalPriceSet { shopMoney { amount currencyCode } }
                }
            }
            pageInfo { hasNextPage endCursor }
        }
    }
""")

result = await client.execute_async(query, variable_values={"first": 50})
```

### ShopifyQL pour analytics (bonus GraphQL)

```graphql
query {
  shopifyqlQuery(query: "FROM sales SHOW gross_sales, net_sales GROUP BY day SINCE -30d") {
    ... on TableResponse {
      tableData { rowData columns { name dataType } }
    }
  }
}
```

## Pourquoi ça marche

- **Une query, plusieurs ressources** : plus de N+1 queries comme en REST
- **Typage fort** : le schéma GraphQL documente tout, codegen possible
- **ShopifyQL** : analytics en 1 query ce qui prenait 10 en REST
- **Rate limits cost-based** : plus prévisibles que REST requests/sec

## Quand l'utiliser

- Toute nouvelle intégration Shopify F2 (sans exception)
- Migration d'un SaaS existant (prioritaire si >30% des appels REST)

## Quand NE PAS l'utiliser

- **Storefront API** : sur le front côté client, REST reste utilisable (lecture publique)
- **Webhooks** : payloads restent JSON REST-style — pas concerné par la migration

## Anti-patterns liés

- Stack hybride "REST + GraphQL" sur même SaaS → complexité inutile, pick one
- Utiliser `fetch_schema_from_transport=True` en prod → latence, cache le schema en dur

## Rate limits (critique)

```python
# Après chaque query GraphQL, checker extensions.cost
result = await client.execute_async(query)
cost = result.extensions["cost"]
available = cost["throttleStatus"]["currentlyAvailable"]
if available < 100:
    restore_rate = cost["throttleStatus"]["restoreRate"]
    await asyncio.sleep(100 / restore_rate)
```

## Références

- Décision : `studio/decisions/2026-03-03-graphql-mandatory.md`
- Shopify docs : https://shopify.dev/docs/api/admin-graphql
- Annonce deprecation REST (avril 2025) : https://shopify.dev/changelog
- Skill : `.claude/skills/shopify-gql/SKILL.md`
