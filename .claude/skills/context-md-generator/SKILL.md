---
name: context-md-generator
description: Génère/met à jour CONTEXT.md pour un SaaS F2. Lit le repo du SaaS, extrait archi, stack, décisions, et produit un CONTEXT.md standardisé.
trigger: /generate-context, update CONTEXT.md
when: on-demand
---

# Skill context-md-generator

## Pour quoi

Chaque SaaS F2 (submodule dans `saas/`) a un CONTEXT.md à la racine. Ce fichier est lu par Claude Code quand on travaille dans ce SaaS. Il doit rester synchro avec la réalité du code.

## Template CONTEXT.md standard F2

```markdown
# CONTEXT — <SAAS-NAME>

## Une phrase
<ce que fait le SaaS, pour qui>

## Statut
<live / beta / en développement / archivé>
<dernière MAJ : date>

## Stack
- Backend : <ex: FastAPI + Celery + Redis>
- Frontend : <ex: Next.js 14 + Tailwind + shadcn>
- DB : Supabase
- Deploy : Railway (backend) + Vercel (frontend)
- 3rd party : <liste>

## Architecture
<diagramme ASCII ou mermaid + 5-10 lignes>

## Features (liste complète)
1. <feature> — statut
2. ...

## URLs
- Prod : https://...
- Staging : https://...
- Repo : github.com/foundrytwo-xx/<n>
- Supabase project : <id>
- Railway project : <id>
- Vercel project : <id>

## Intégrations
- Shopify : <quels scopes, GraphQL only>
- Stripe : <quel plan, metered ?>
- Webhooks reçus : <liste>
- Webhooks émis : <liste>

## Décisions clés
<liens vers studio/decisions/*.md>

## Patterns utilisés
<liens vers patterns/*.md>

## Métriques actuelles
<MRR, signups, churn — datés>

## Pièges connus
<liste des traps éviter>

## Contacts
- Product owner : Fabrice
- Growth : Romain
- Support : support@<saas>.com
```

## Workflow

1. Le skill scan le repo du SaaS (submodule)
2. Détecte la stack (package.json, pyproject.toml, requirements.txt)
3. Lit les migrations Supabase pour comprendre le modèle
4. Lit les routes pour lister les features
5. Cross-ref avec `studio/decisions/` et `patterns/`
6. Génère ou met à jour CONTEXT.md

## Fréquence recommandée

- À chaque refacto majeur
- Avant chaque session Claude Code longue sur ce SaaS
- Après chaque décision structurante

## Règle critique

Le CONTEXT.md est **descriptif**, pas prescriptif. Il reflète l'état actuel, pas les intentions. Les intentions vont dans `studio/roadmap.md`.
