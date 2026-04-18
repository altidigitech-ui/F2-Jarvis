# Pattern — Ship V1, audit cash, ship V2 corrected

**Capturé le** : 2026-01-15
**Découvert dans** : méthode de travail F2 récurrente
**Auteur** : Fabrice
**Catégorie** : process / dev

---

## Problème

Essayer d'écrire du code "parfait" du premier coup = paralysie, perfectionnisme, time-to-market détruit. À l'inverse, shipper du code n'importe comment = dette technique qui tue le SaaS.

F2 a besoin d'un **process reproductible** qui balance vitesse et qualité.

## Solution (le pattern)

### Cycle en 3 temps

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│  V1     │  →   │ AUDIT   │  →   │   V2    │
│  ship   │      │ cash    │      │  ship   │
└─────────┘      └─────────┘      └─────────┘
     ↓                ↓                ↓
  workable         errors          production
   code           identified         ready
```

### Étape 1 — V1 : shippable, pas parfaite

Objectifs V1 :
- ✅ Tous les happy paths fonctionnent
- ✅ Error handling basique (try/catch, log, don't crash)
- ✅ Tests happy path + 1-2 edge cases
- ✅ Code structurellement propre (pas besoin d'être optimisé)

Ce qu'on accepte en V1 :
- ⚠️ Edge cases non traités (documentés avec TODO)
- ⚠️ Performance non optimisée
- ⚠️ UI avec rough edges (mais accessible)
- ⚠️ Docs minimales

### Étape 2 — AUDIT : cash, exhaustif

Invoquer agent **f2-auditor** avec contexte "audit V1 avant V2".

Le review couvre :
- **Sécurité** : leaks credentials, RLS manquante, XSS/CSRF, input validation
- **Edge cases** : null, empty, overflow, race conditions
- **Performance** : N+1 queries, unoptimized loops, missing indexes
- **UX** : loading states, error states, empty states
- **Code quality** : duplication, fonctions trop longues, naming
- **Tests** : couverture insuffisante, cas limites manquants
- **Docs** : CONTEXT.md à jour, commentaires utiles
- **Monitoring** : logs structurés, Sentry, alerts
- **A11y** : WCAG min, keyboard nav, focus states

Output : liste de corrections priorisée (P0 bloquant / P1 important / P2 nice-to-have).

### Étape 3 — V2 : corrections + robustesse

Traiter tous les P0 et P1. Les P2 sont parkés dans un backlog.

V2 est **production-ready** au sens StoreMD du terme.

## Pourquoi ça marche

- **Anti-paralysis** : tu ships V1 rapidement, mouvement maintenu
- **Learning loop court** : l'audit catche les vrais problèmes, pas les imaginés
- **Dual-author effect** : V1 est écrite par "moi", V2 par "moi + auditor" → 2 paires d'yeux sans coût humain additionnel
- **Prod-ready** : V2 respecte le niveau de qualité F2 non-négociable

## Quand l'utiliser

- Nouveau SaaS complet
- Nouvelle feature majeure d'un SaaS existant
- Refactor structurel
- Migration (ex: Shopify REST → GraphQL)

## Quand NE PAS l'utiliser

- **Hotfix** : pas le temps pour V1/V2 → fix direct + tests ciblés
- **POC à jeter** : pas besoin de V2 si c'est pour valider puis kill
- **Scripts internes one-shot** : overkill

## Temps typique (observé F2)

Sur une feature standard F2 (ex: intégration Stripe basique) :

| Phase | Temps |
|---|---|
| V1 build | 40% du total |
| Audit | 10% |
| V2 corrections | 30% |
| Tests / polish | 20% |

**Total** : ~2x le temps d'un "ship directement propre". MAIS le résultat est mesurable, la qualité est garantie, et le process est reproductible.

## Anti-patterns liés

- **Infinite refinement** : V3, V4, V5... → signal d'over-engineering, stopper à V2
- **Skipping audit** : V1 direct en prod "parce que ça marche" → dette tech garantie
- **Audit par soi-même sans recul** : biais cognitif, on voit son code comme OK
- **Audit cosmétique** : "ah y a des TODOs" sans vraie critique structurelle

## Références

- Agent : `.claude/agents/f2-auditor.md`
- Benchmark qualité : StoreMD (12 730 lignes de docs, 43 features, 16 fichiers doc)
- Inspiration : "working skeleton" pattern (Growing Object-Oriented Software)
