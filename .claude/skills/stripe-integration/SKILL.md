---
name: stripe-integration
description: Pattern F2 pour Stripe Billing. Plans Solo $49 / Duo $99 / Studio $199. Checkout Sessions, webhooks, customer portal, metered billing pour usage-based.
trigger: Stripe, billing, paiement, subscription, pricing
when: on-demand
---

# Skill stripe-integration

## Plans F2 standard

| Plan | Prix | Pour |
|---|---|---|
| Solo | $49/mois | 1 user, 1 shop |
| Duo | $99/mois | 3 users, 3 shops |
| Studio | $199/mois | unlimited users, 10 shops |

Pas de free tier sur StoreMD (il y a déjà des free tiers côté Shopify App Store qu'on évite).
Essai gratuit 14 jours avec carte, pas de CB → pas d'essai.

## Stack Stripe F2

- **Billing** : Stripe Billing pour subscriptions récurrentes
- **Checkout** : Stripe Checkout Sessions (hosted) — pas d'Elements custom pour V1
- **Customer Portal** : Stripe-hosted, link direct
- **Webhooks** : FastAPI endpoint dédié
- **Metered billing** : usage-based sur les SaaS où ça fait sens (PayloadDiff par event)

## Pattern Checkout Session

```python
import stripe
stripe.api_key = os.environ['STRIPE_SECRET_KEY']

def create_checkout_session(user_id: str, price_id: str, shop_domain: str):
    session = stripe.checkout.Session.create(
        mode='subscription',
        customer_email=user_email,  # prefill
        line_items=[{'price': price_id, 'quantity': 1}],
        success_url=f'https://{shop_domain}/billing/success?session_id={{CHECKOUT_SESSION_ID}}',
        cancel_url=f'https://{shop_domain}/billing/cancelled',
        client_reference_id=user_id,  # pour retrouver l'user au webhook
        subscription_data={
            'trial_period_days': 14,
            'metadata': {
                'shop_domain': shop_domain,
                'user_id': user_id,
            }
        },
        allow_promotion_codes=True,
    )
    return session.url
```

## Webhooks à traiter

```python
EVENT_HANDLERS = {
    'checkout.session.completed': handle_checkout_completed,
    'customer.subscription.created': handle_subscription_created,
    'customer.subscription.updated': handle_subscription_updated,
    'customer.subscription.deleted': handle_subscription_cancelled,
    'invoice.payment_succeeded': handle_payment_success,
    'invoice.payment_failed': handle_payment_failed,
}

@app.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.environ['STRIPE_WEBHOOK_SECRET']
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        raise HTTPException(status_code=400)
    
    handler = EVENT_HANDLERS.get(event['type'])
    if handler:
        await handler(event['data']['object'])
    
    return {"status": "ok"}
```

## Pattern Customer Portal

```python
def create_portal_session(customer_id: str, return_url: str):
    session = stripe.billing_portal.Session.create(
        customer=customer_id,
        return_url=return_url,
    )
    return session.url
```

Configuration portail dans dashboard Stripe : permettre cancel + update payment method + invoices download. **Pas** de plan switching self-serve en V1 (trop de risque d'abus).

## Metered billing (PayloadDiff)

```python
# À chaque event webhook diffé, envoyer un usage record
stripe.SubscriptionItem.create_usage_record(
    subscription_item_id,
    quantity=1,
    timestamp=int(time.time()),
    action='increment',
)
```

## Règles F2

1. **Toujours** stocker `stripe_customer_id` et `stripe_subscription_id` dans Supabase
2. **Webhooks idempotents** — utiliser `event.id` pour dedup
3. **Ne jamais** donner accès produit sur base de Checkout Session — uniquement après `customer.subscription.created` confirmé
4. **Trial ending reminder** à J-3 automatique (via Brevo transactional)
5. **Dunning** géré par Stripe directement (smart retries activé)
6. **Proration** : Stripe par défaut, on laisse faire

## Test mode workflow

- Clés test : `sk_test_*`, `pk_test_*`, `whsec_*` (différent par endpoint)
- Stripe CLI pour webhooks locaux : `stripe listen --forward-to localhost:8000/webhooks/stripe`
- Cartes test : 4242 4242 4242 4242 (success), 4000 0000 0000 9995 (decline)

## Sécurité

- `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` dans Railway env vars
- Jamais dans le code, jamais committé
- Rotation trimestrielle
- Bitwarden Organizations pour partage équipe
