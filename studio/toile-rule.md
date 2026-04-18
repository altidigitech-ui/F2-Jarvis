# TOILE Rule

> Altistone n'existe pas publiquement. F2 est une entité nouvelle.

## Règle

Aucun contenu, code, communication, landing page, post, email, doc public ne mentionne **Altistone**.

Aucune référence à l'historique Altistone, aux projets Altistone, aux anciens clients Altistone.

## Portée

Applicable à :

- Posts LinkedIn FR et EN
- Tweets / threads
- Landing pages SaaS
- About page F2 et about pages SaaS
- Emails clients et prospects
- Docs produit
- Pitch decks
- Interviews / podcasts
- Signatures email
- Code comments qui seraient publiés (repos publics, open source)

## Pourquoi

1. **Positionnement clean** — F2 démarre une histoire propre, pas une suite
2. **Narrative build-in-public** — le récit F2 commence en 2026
3. **Légal / contractuel** — des clauses Altistone pourraient interférer avec le marketing F2

## Exceptions

Aucune dans le domaine public.

En interne (ce repo, conversations privées), Altistone peut être mentionné pour :
- Capturer des learnings techniques dans `patterns/`
- Documenter des décisions historiques dans `studio/decisions/`
- Tracer les raisons de choix techniques

Ces mentions restent strictement dans le repo privé F2-JARVIS.

## Enforcement

- **f2-brand-voice skill** (always-on) — vérifie la TOILE rule sur tout contenu sortant
- **Hook marketing/posts/draft** — avant publication, check absence du mot Altistone
- **Ouroboros proposals** — si une proposition mentionne Altistone, rejection automatique + alerte

## Check automatique

```bash
# À runner avant chaque publication
grep -ri "altistone" marketing/ saas/*/README.md saas/*/public/ && echo "❌ TOILE violation" || echo "✅ Clean"
```
