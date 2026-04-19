---
name: morning
description: Brief du jour F2. État de chaque SaaS, décisions en attente, posts à publier, ce qui a bougé depuis hier, 3 priorités recommandées.
---

# /morning

Génère un brief quotidien pour Fabrice. Orienté action, pas narratif.

## Process

1. **Timestamp** : `TZ='Europe/Paris' date '+%A %d %B %Y — %H:%M:%S %Z'`
2. **Activité git** depuis hier 00:00 :
   - `git log --since="yesterday 00:00" --oneline --all`
   - `git submodule foreach 'git log --since="yesterday 00:00" --oneline'`
3. **État des SaaS** :
   - Lire chaque `saas/*/CONTEXT.md` → extraire "Statut"
   - Lire `strategie/CONTEXT.md` → extraire milestones
4. **Ouroboros proposals** non-triées :
   - `ls brain/ouroboros/proposals/*.md` (hors `archive/`)
   - Compter + lister titres
5. **Posts** en draft :
   - `ls marketing/posts/draft/*.md`
6. **Décisions en attente** :
   - Grep "Statut: Proposée" dans `tracking/decisions-log.md`
7. **Synthèse 3 priorités** — basé sur tout ce qui précède, proposer 3 actions du jour.

## Template de sortie

```markdown
# F2-JARVIS — Brief du Vendredi 18 avril 2026 — 08:15 CEST

## Git activité (depuis hier)
- f2-jarvis: 4 commits
- saas/storemd: 2 commits (migration GraphQL terminée)
- saas/leak-detector: 1 commit (hotfix webhook HMAC)

## État des SaaS
- ✅ Leak Detector — live, MRR à jour
- 🔧 StoreMD — transformation V2 phase 3/4
- ⏸️ PayloadDiff — en attente (after StoreMD)
- 📝 ContentForge — concept
- 🛠️ F2 Ops Hub — docs prêts

## À arbitrer aujourd'hui
### 3 propositions Ouroboros en attente
1. `2026-04-17-storemd-cac-inconsistency.md` — incohérence CAC rapport marketing vs plan
2. `2026-04-17-graphql-rate-limit.md` — risque hit rate limit sur StoreMD
3. `2026-04-17-romain-post-draft-revision.md` — suggestion révision post Romain

### 2 décisions proposées non validées
- `2026-04-15-contentforge-scope.md` — scope V1 à trancher
- `2026-04-16-pricing-storemd.md` — pricing à confirmer

### 3 posts en draft
- `2026-04-18-storemd-launch-fr-romain.md`
- `2026-04-18-graphql-migration-thread-fabrice.md`
- `2026-04-20-mrr-april-fabrice.md`

## 3 priorités du jour (recommandation)
1. **StoreMD phase 3** — finir la migration Shopify GraphQL (blocker pour launch)
2. **Review Ouroboros #1** — incohérence CAC, impact direct sur le plan budget
3. **Valider draft Romain** — post LinkedIn launch StoreMD à publier mardi

## Rappels
- Réunion Romain mercredi 14h (check agenda)
- Budget F2-JARVIS : 4.20€ / 30€ (projection fin de mois : ~9€) ✅
- Kill-switches : tous off ✅
```

## Règles

- **Si rien de neuf** : le dire. "Aucun commit depuis hier, aucune proposition Ouroboros."
- **Toujours dater**
- **Jamais plus de 3 priorités** — sinon c'est pas des priorités
- **Utiliser Haiku** pour générer le brief (tâche de retrieval + synthèse courte)
