# StoreMD — Métriques Admin Dashboard

> Source : `storemd.vercel.app/dashboard/admin`
> Mise à jour : chaque samedi par R, avant le batch de la semaine suivante.
> Template de collecte : voir `storemd-admin-TEMPLATE.md` (même dossier).
> Format date : JJ/MM/AAAA strict, partout.

---

## Semaine 11 — du 25/05/2026 au 31/05/2026

*Snapshot pris le 31/05/2026 (rattrapage). Listes d'événements : uniquement les nouvelles entrées de S11 ; les agrégats current-state sont loggés pleins (état au 31/05).*

**Produit :**

| Métrique | Valeur |
|----------|--------|
| Total Merchants | 3 |
| Total Scans | 46 |
| Scans this week | 13 |
| Active Subs | 1 |
| Avg score | 90.4 |
| MRR (€) | 199 |
| Visits Today | 1 |
| Unique Visitors | 1 |
| Installs Today | 0 |
| Conversion Rate | 0% |
| Email Leads | 0 |
| Free Scans | 2 |

*Note dashboard : Visits aussi affiché en 21/wk · 169/mo. MRR 199 = sub agency interne (altidigitech), pas du revenu externe réel.*

**Funnel (last 30 days) :**

| Stage | Count |
|-------|-------|
| Landing visits | 169 |
| CTA clicks | 24 |
| Install starts | 3 |
| Install completes | 33 |
| Paid conversions | 1 |

*Note incohérence dashboard : Install completes (33) > Install starts (3) — logiquement impossible, anomalie côté dashboard. Chiffres loggés bruts, non corrigés.*

**Traffic by Source (30d) :**

| Source | Visits | Installs |
|--------|--------|----------|
| (direct) | 120 | 2 |
| foundrytwo | 15 | 0 |
| linkedin | 12 | 0 |
| twitter | 7 | 0 |
| facebook | 5 | 0 |
| tiktok | 4 | 0 |
| instagram | 3 | 0 |
| hackernews | 2 | 0 |
| reddit | 1 | 0 |

**Traffic by Campaign (30d) :**

| Campaign | Visits | Installs |
|----------|--------|----------|
| storemd | 15 | 0 |
| profile | 13 | 0 |
| post | 12 | 0 |
| page | 5 | 0 |
| comment | 2 | 0 |
| video | 2 | 0 |

**Recent Merchants (nouveaux cette semaine) :**

| Email | Plan | UTM Source | Domain | Last Score | Created |
|-------|------|------------|--------|------------|---------|
| — | — | — | — | — | Aucun nouveau merchant en S11 (dernier : 20/05/2026) |

**Recent Scans (nouveaux cette semaine, 25-31/05) :**

| Domain | Score | Status | Duration (s) | Created |
|--------|-------|--------|--------------|---------|
| s6btxa-q0.myshopify.com | 86 | completed | — | 31/05/2026 05:15:02 |
| s6btxa-q0.myshopify.com | 87 | completed | — | 30/05/2026 05:15:02 |
| s6btxa-q0.myshopify.com | 87 | completed | — | 29/05/2026 05:15:02 |
| s6btxa-q0.myshopify.com | 88 | completed | — | 28/05/2026 05:15:02 |
| s6btxa-q0.myshopify.com | 80 | completed | — | 27/05/2026 05:15:02 |
| s6btxa-q0.myshopify.com | 87 | completed | — | 26/05/2026 05:15:02 |
| s6btxa-q0.myshopify.com | 88 | completed | — | 25/05/2026 05:15:01 |
| storemdtesttt.myshopify.com | 99 | completed | — | 25/05/2026 00:09:31 |

*Tous internes/test.*

**Free Scans (preview) (nouveaux cette semaine) :**

| Domain | Score | Issues | Duration | Created |
|--------|-------|--------|----------|---------|
| — | — | — | — | Aucun nouveau free scan en S11 (derniers : 07 et 09/05) |

**Preview Leads (email captured) :**

| Email | Domain | Score | Issues | Created |
|-------|--------|-------|--------|---------|
| — | — | — | — | — |

**Errors (webhook events) :**

| Topic | Source | Shop | Error | Created |
|-------|--------|------|-------|---------|
| — | — | — | — | — |

---

## Semaine 10 — du 18/05/2026 au 24/05/2026

*Snapshot rattrapage (saisi le 31/05/2026 depuis les listes datées du dashboard). Agrégats current-state NON capturés : le dashboard admin n'a pas été relevé le 24/05, l'état instantané de fin S10 n'est pas reconstituable (zéro invention). Seules les listes d'événements datées 18-24/05 sont loggées.*

**Produit / Funnel (30d) / Traffic (30d) :** — non capturés (voir note ci-dessus).

**Recent Merchants (nouveaux cette semaine) :**

| Email | Plan | UTM Source | Domain | Last Score | Created |
|-------|------|------------|--------|------------|---------|
| s6btxa-q0@storemd.app | agency | — | s6btxa-q0.myshopify.com | 86 | 20/05/2026 17:03:40 |

**Recent Scans (nouveaux cette semaine, 18-24/05) :**

27 scans, tous internes/test — stores `storemdtesttt.myshopify.com`, `s6btxa-q0.myshopify.com`, `nh1yvq-86.myshopify.com`. Scores 75-100, tous `completed` (majorité = scans automatiques internes du 21/05, sans valeur analytique externe). Détail non listé.

**Free Scans (preview) (nouveaux cette semaine) :**

| Domain | Score | Issues | Duration | Created |
|--------|-------|--------|----------|---------|
| — | — | — | — | Aucun nouveau free scan en S10 |

**Preview Leads (email captured) :**

| Email | Domain | Score | Issues | Created |
|-------|--------|-------|--------|---------|
| — | — | — | — | — |

**Errors (webhook events) :**

| Topic | Source | Shop | Error | Created |
|-------|--------|------|-------|---------|
| — | — | — | — | — |

---

## Semaine 9 — du 11/05/2026 au 17/05/2026

*Snapshot pris le 17/05/2026.*

**Produit :**

| Métrique | Valeur |
|----------|--------|
| Total Merchants | 7 |
| Total Scans | 15 |
| Scans this week | 5 |
| Active Subs | 1 |
| Avg score | 72.7 |
| MRR (€) | 199 |
| Visits Today | 1 |
| Unique Visitors | 1 |
| Installs Today | 0 |
| Conversion Rate | 0% |
| Email Leads | 0 |
| Free Scans | 2 |

**Funnel (last 30 days) :**

| Stage | Count |
|-------|-------|
| Landing visits | 289 |
| CTA clicks | 171 |
| Install starts | 98 |
| Install completes | 9 |
| Paid conversions | 0 |

**Traffic by Source (30d) :**

| Source | Visits | Installs |
|--------|--------|----------|
| (direct) | 193 | 4 |
| twitter | 38 | 0 |
| test | 18 | 0 |
| linkedin | 13 | 0 |
| hackernews | 7 | 0 |
| tiktok | 6 | 0 |
| facebook | 5 | 0 |
| foundrytwo | 5 | 0 |
| instagram | 3 | 0 |
| reddit | 1 | 0 |

**Traffic by Campaign (30d) :**

| Campaign | Visits | Installs |
|----------|--------|----------|
| profile | 25 | 0 |
| audit | 18 | 0 |
| postlaunch | 13 | 0 |
| post | 9 | 0 |
| comment | 7 | 0 |
| page | 5 | 0 |
| storemd | 5 | 0 |
| video | 4 | 0 |
| reply | 1 | 0 |
| feature_launch | 1 | 0 |

**Recent Merchants :**

| Email | Plan | Domain | Last Score | Created |
|-------|------|--------|------------|---------|
| 1qndqh-7d@storemd.app | free | 1qndqh-7d.myshopify.com | 100 | 15/05/2026 |
| nh1yvq-86@storemd.app | free | nh1yvq-86.myshopify.com | — | 15/05/2026 |
| 91b065-2@storemd.app | free | 91b065-2.myshopify.com | 50 | 06/05/2026 |
| saints-test@storemd.app | free | saints-test.myshopify.com | 50 | 06/05/2026 |
| test_qa@test.com | free | — | — | 14/04/2026 |
| altidigitech@gmail.com | agency | — | — | 14/04/2026 |
| storemdtesttt@storemd.app | free | storemdtesttt.myshopify.com | 100 | 13/04/2026 |

**Recent Scans :**

| Domain | Score | Status | Duration (s) | Created |
|--------|-------|--------|--------------|---------|
| 1qndqh-7d.myshopify.com | 100 | completed | — | 15/05/2026 |
| storemdtesttt.myshopify.com | 100 | completed | — | 11/05/2026 |
| storemdtesttt.myshopify.com | 100 | completed | — | 11/05/2026 |
| storemdtesttt.myshopify.com | — | failed | — | 11/05/2026 |
| storemdtesttt.myshopify.com | — | failed | — | 10/05/2026 |
| storemdtesttt.myshopify.com | — | failed | — | 09/05/2026 |
| storemdtesttt.myshopify.com | — | failed | — | 08/05/2026 |
| 91b065-2.myshopify.com | 50 | completed | — | 06/05/2026 |
| saints-test.myshopify.com | 50 | completed | — | 06/05/2026 |
| saints-test.myshopify.com | 50 | completed | — | 06/05/2026 |
| storemdtesttt.myshopify.com | 50 | completed | — | 23/04/2026 |
| storemdtesttt.myshopify.com | 50 | completed | — | 16/04/2026 |
| storemdtesttt.myshopify.com | 50 | completed | — | 16/04/2026 |
| storemdtesttt.myshopify.com | 100 | completed | — | 13/04/2026 |
| storemdtesttt.myshopify.com | 100 | completed | — | 13/04/2026 |

**Free Scans (preview) :**

| Domain | Score | Issues | Duration | Created |
|--------|-------|--------|----------|---------|
| s6btxa-q0.myshopify.com | 69 | 1C 3M 3m | 3.0s | 09/05/2026 |
| gymshark.com | 51 | 3C 3M 2m | 1.0s | 07/05/2026 |

**Preview Leads (email captured) :**

| Email | Domain | Score | Issues | Created |
|-------|--------|-------|--------|---------|
| — | — | — | — | — |

**Errors (webhook events) :**

| Topic | Source | Shop | Error | Created |
|-------|--------|------|-------|---------|
| — | — | — | — | — |

---

## Semaine 8 — du 04/05/2026 au 10/05/2026

*Snapshot pris le 11/05/2026.*

**Produit :**

| Métrique | Valeur |
|----------|--------|
| Total Merchants | 7 |
| Total Scans | 18 |
| Scans this week | 13 |
| Active Subs | 1 |
| Avg score | 64.3 |
| MRR (€) | 199 |
| Visits Today | 11 |
| Unique Visitors | 6 |
| Installs Today | 0 |
| Conversion Rate | 0% |
| Email Leads | 0 |
| Free Scans | 2 |

**Funnel (last 30 days) :**

| Stage | Count |
|-------|-------|
| Landing visits | 315 |
| CTA clicks | 186 |
| Install starts | 113 |
| Install completes | 7 |
| Paid conversions | 1 |

**Traffic by Source (30d) :**

| Source | Visits | Installs |
|--------|--------|----------|
| direct | 227 | 7 |
| twitter | 41 | 0 |
| test | 32 | 0 |
| linkedin | 7 | 0 |
| hackernews | 6 | 0 |
| tiktok | 2 | 0 |

**Traffic by Campaign (30d) :**

| Campaign | Visits | Installs |
|----------|--------|----------|
| audit | 32 | 0 |
| profile | 19 | 0 |
| postlaunch | 13 | 0 |
| comment | 6 | 0 |
| reply | 4 | 0 |
| post | 3 | 0 |
| video | 2 | 0 |
| feature_launch | 1 | 0 |

**Free Scans (preview) :**

| Domain | Score | Issues | Duration | Created |
|--------|-------|--------|----------|---------|
| s6btxa-q0.myshopify.com | 69 | 1C 3M 3m | 3.0s | 09/05/2026 |
| gymshark.com | 51 | 3C 3M 2m | 1.0s | 07/05/2026 |

**Recent Merchants :**

| Email | Plan | Domain | Last Score | Created |
|-------|------|--------|------------|---------|
| 0s8r75-7f@storemd.app | free | 0s8r75-7f.myshopify.com | 50 | 08/05/2026 |
| 7c386a-2@storemd.app | free | 7c386a-2.myshopify.com | 50 | 08/05/2026 |
| 91b065-2@storemd.app | free | 91b065-2.myshopify.com | 50 | 06/05/2026 |
| saints-test@storemd.app | free | saints-test.myshopify.com | 50 | 06/05/2026 |
| test_qa@test.com | free | — | — | 14/04/2026 |
| altidigtech@gmail.com | agency | — | — | 14/04/2026 |
| storemdtesttt@storemd.app | free | storemdtesttt.myshopify.com | 100 | 13/04/2026 |
