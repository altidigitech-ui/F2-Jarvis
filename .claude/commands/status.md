---
name: status
description: État complet et détaillé de F2. Tous les SaaS, métriques, roadmap, décisions récentes. Plus long que /morning.
---

# /status

Rapport exhaustif de l'état F2. Utilisé hebdomadairement ou avant une réunion Romain.

## Sections

1. **Timestamp**
2. **Vision F2** — rappel 1 ligne depuis `studio/vision.md`
3. **Roadmap actuelle** — prochains 30/60/90j depuis `studio/roadmap.md`
4. **État détaillé par SaaS** — 5-10 lignes par SaaS
5. **Métriques** — MRR, signups, churn (depuis `studio/metrics/`)
6. **Décisions 7 derniers jours** — listées avec statut
7. **Patterns ajoutés 7 derniers jours**
8. **Santé opérationnelle** — kill-switches, budget, alerts
9. **Rappels humains** — Romain, clients, deadlines

## Template

```markdown
# F2-JARVIS — Status au Vendredi 18 avril 2026

## Vision
Studio SaaS indie, 1 SaaS/mois, indépendance financière août 2026.

## Roadmap

### 30 jours
- StoreMD V2 shipping (semaine 17)
- PayloadDiff V1 dev start (semaine 18)
- Romain onboarding F2-JARVIS

### 60 jours
- ContentForge concept → V1
- 50 clients StoreMD

### 90 jours
- F2 Ops Hub internal live
- MRR cumulé F2 > 5 000 €

## SaaS

### Leak Detector ✅ live
- MRR : 420 €
- 14 clients
- Statut : maintenance mode, en transition vers StoreMD
- Dernière décision : migration GraphQL complétée (2026-03-15)

### StoreMD 🔧 transformation
- Statut : V2 phase 3/4 (execution Claude Code)
- Launch prévu : semaine 17 (fin avril)
- Blocker : finir migration Shopify GraphQL
- 43 features planifiées, 28 shippées

### PayloadDiff ⏸️ queue
- Statut : design-phase
- Dependencies : StoreMD shipped

### ContentForge 📝 concept
- Statut : waiting for bandwidth

### F2 Ops Hub 🛠️ docs-ready
- Stack : FastAPI/Railway + Next.js/Vercel + Supabase
- Architecture validée dans decisions/2026-03-20

## Métriques (source: studio/metrics/mrr.csv)
- MRR total F2 : 420 € (avril)
- Signups total avril : 8
- Churn : 0 (2 mois consécutifs)

## Décisions récentes (7j)
- 2026-04-16 ✅ Pricing StoreMD confirmé (Solo/Duo/Studio)
- 2026-04-15 ⏳ ContentForge scope V1 (en attente Fabrice)
- 2026-04-12 ✅ Ouroboros bridle mode (proposals only)

## Patterns ajoutés (7j)
- shopify-rest-is-dead.md (2026-04-14)
- dual-llm-sonnet-haiku.md (2026-04-16)

## Santé ops
- Kill-switches : tous off ✅
- Budget mensuel : 4.20 € / 30 € (14%)
- Projection fin de mois : ~9 €
- Ouroboros : active, last cycle 04:30 CEST (3 proposals générées)
- Graphify : indexé, index frais (dernière MAJ: 20 min)
- MemPalace : 2 847 drawers, 12 wings

## Rappels
- 📅 Romain mercredi 14h (sync hebdo)
- 📧 Client Early Access StoreMD (3 en pending)
- 🚨 Deadline launch StoreMD : vendredi 25 avril
```

## Règles

- **Sonnet** (pas Haiku) — synthèse plus complexe
- **Si métrique non dispo** : "—" au lieu d'inventer
- **Dates précises** partout
- **Pas plus de 100 lignes** — sinon c'est plus un status c'est un mémoire
