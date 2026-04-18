# F2 Metrics

> Source de vérité pour les métriques business F2.
> Mis à jour manuellement ou via scripts dans `scripts/metrics-sync/` (à venir).

## Fichiers

### `mrr.csv`
MRR par SaaS et par mois.

```csv
month,saas,mrr_eur,clients_count,churn_count,notes
2026-02,leak-detector,0,0,0,pre-launch
2026-03,leak-detector,180,6,0,
2026-04,leak-detector,420,14,0,
```

### `signups.csv`
Signups par SaaS et par mois.

```csv
month,saas,signups,activated,trial_to_paid_rate,notes
2026-03,leak-detector,12,6,0.5,
2026-04,leak-detector,18,14,0.78,
```

### `launches.md`
Journal de chaque lancement SaaS avec :
- Date de launch
- Canaux utilisés
- Métriques J+7 / J+30
- Learnings clés

## Règles

- **Pas d'estimation** — chiffres réels uniquement
- **Dater** tous les inputs
- **Sourcer** si origine (Stripe dashboard, Plausible, Supabase query)
- **Jamais** arrondir pour "faire beau"
