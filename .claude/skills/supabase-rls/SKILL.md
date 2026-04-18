---
name: supabase-rls
description: Pattern F2 pour Supabase Row Level Security. Multi-tenant SaaS, RLS strict, auth via Supabase Auth, types générés via supabase-js + codegen.
trigger: Supabase, RLS, auth, multi-tenant, base de données
when: on-demand
---

# Skill supabase-rls

## Stack F2 Supabase

- **Postgres** managé Supabase
- **Auth** : Supabase Auth (email + magic link, OAuth Google pour SaaS clients)
- **Storage** : Supabase Storage pour assets produits
- **Realtime** : utilisé parcimonieusement (coût)
- **Edge Functions** : pour webhooks rapides
- **Types** : générés via `supabase gen types typescript`

## Règle 1 — RLS activé partout

Aucune table F2 sans RLS. Par défaut Supabase met RLS off, on l'active systématiquement :

```sql
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
```

## Pattern multi-tenant F2

Toutes les tables SaaS F2 ont une colonne `tenant_id` (= `shop_id` pour Shopify apps, `workspace_id` sinon).

### Policy type SELECT
```sql
CREATE POLICY "tenants_can_read_own_data"
ON public.orders
FOR SELECT
TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenants WHERE user_id = auth.uid()
  )
);
```

### Policy type INSERT
```sql
CREATE POLICY "tenants_insert_own_data"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id FROM user_tenants WHERE user_id = auth.uid()
  )
);
```

### Table de jointure `user_tenants`
```sql
CREATE TABLE user_tenants (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, tenant_id)
);

CREATE INDEX idx_user_tenants_user ON user_tenants(user_id);
CREATE INDEX idx_user_tenants_tenant ON user_tenants(tenant_id);
```

## Pattern service role (backend)

Le backend Python (FastAPI) utilise la **service_role key** qui bypass RLS. Utilisation stricte :
- Webhooks Shopify/Stripe (pas d'utilisateur authentifié)
- Jobs Celery background
- Admin ops

**Jamais** exposer la service_role key côté client. Elle vit uniquement dans Railway env vars.

## Pattern migrations

F2 utilise `supabase CLI` pour migrations versionnées :

```bash
supabase migration new add_orders_table
# édite supabase/migrations/YYYYMMDDHHMMSS_add_orders_table.sql
supabase db push --linked
```

Toutes les migrations committées dans le repo du SaaS.

## Types TypeScript

```bash
# Régénérer après chaque migration
supabase gen types typescript --linked > src/types/supabase.ts
```

Utilisation :
```typescript
import { Database } from '@/types/supabase'
type Order = Database['public']['Tables']['orders']['Row']
```

## Pièges connus F2

1. **`auth.uid()` dans policies** : retourne NULL si pas authentifié. Toujours checker.
2. **Recursion RLS** : une policy qui SELECT d'une autre table avec RLS peut boucler. Utiliser `SECURITY DEFINER` functions.
3. **`tenant_id` nullable** : tue la RLS. Toujours `NOT NULL`.
4. **Realtime + RLS** : realtime respecte RLS seulement si `ALTER PUBLICATION supabase_realtime ADD TABLE ...` configuré.
5. **Storage RLS** : policies séparées sur `storage.objects`, pas dans `public`.

## Edge Functions pattern

```typescript
// supabase/functions/shopify-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const signature = req.headers.get('x-shopify-hmac-sha256')
  // verify HMAC
  // parse body
  // insert via service_role client
  return new Response('ok', { status: 200 })
})
```

## Monitoring

- Activer `log_statement = 'all'` en dev seulement
- Sentry capture les erreurs `supabase-js`
- Dashboard Supabase pour slow queries
