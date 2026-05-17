# StoreMD — Template de collecte Admin Dashboard

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `storemd-admin.md` (juste sous le titre du fichier) à chaque samedi.
> **Source unique :** `storemd.vercel.app/dashboard/admin`
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant de commencer la rédaction du batch de la semaine suivante.
2. **Où :** ouvrir `storemd.vercel.app/dashboard/admin` en étant connecté avec `altidigitech@gmail.com`.
3. **Comment :**
   - Prendre un screenshot du dashboard complet (référence visuelle).
   - Copier les chiffres bruts dans le squelette ci-dessous.
   - **Dater le snapshot** au format `JJ/MM/AAAA` (date de prise, pas date de saisie).
   - Indiquer la plage de la semaine au format `du JJ/MM/AAAA au JJ/MM/AAAA`.
   - Coller le bloc rempli en haut de `storemd-admin.md`, juste sous le titre principal du fichier (avant les semaines précédentes).
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - **Aucune adaptation des libellés.** Les libellés du fichier sont strictement identiques au dashboard.
   - **Aucune francisation.** Les libellés restent en anglais comme dans le dashboard.
   - **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Produit :**

| Métrique | Valeur |
|----------|--------|
| Total Merchants | [VALEUR] |
| Total Scans | [VALEUR] |
| Scans this week | [VALEUR] |
| Active Subs | [VALEUR] |
| Avg score | [VALEUR] |
| MRR (€) | [VALEUR] |
| Visits Today | [VALEUR] |
| Unique Visitors | [VALEUR] |
| Installs Today | [VALEUR] |
| Conversion Rate | [VALEUR] |
| Email Leads | [VALEUR] |
| Free Scans | [VALEUR] |

**Funnel (last 30 days) :**

| Stage | Count |
|-------|-------|
| Landing visits | [VALEUR] |
| CTA clicks | [VALEUR] |
| Install starts | [VALEUR] |
| Install completes | [VALEUR] |
| Paid conversions | [VALEUR] |

**Traffic by Source (30d) :**

| Source | Visits | Installs |
|--------|--------|----------|
| [SOURCE] | [VALEUR] | [VALEUR] |
| [SOURCE] | [VALEUR] | [VALEUR] |
| [SOURCE] | [VALEUR] | [VALEUR] |

**Traffic by Campaign (30d) :**

| Campaign | Visits | Installs |
|----------|--------|----------|
| [CAMPAIGN] | [VALEUR] | [VALEUR] |
| [CAMPAIGN] | [VALEUR] | [VALEUR] |
| [CAMPAIGN] | [VALEUR] | [VALEUR] |

**Recent Merchants :**

| Email | Plan | Domain | Last Score | Created |
|-------|------|--------|------------|---------|
| [EMAIL] | [PLAN] | [DOMAIN] | [SCORE] | JJ/MM/AAAA |
| [EMAIL] | [PLAN] | [DOMAIN] | [SCORE] | JJ/MM/AAAA |

**Recent Scans :**

| Domain | Score | Status | Duration (s) | Created |
|--------|-------|--------|--------------|---------|
| [DOMAIN] | [SCORE] | [STATUS] | [DURÉE] | JJ/MM/AAAA |
| [DOMAIN] | [SCORE] | [STATUS] | [DURÉE] | JJ/MM/AAAA |

**Free Scans (preview) :**

| Domain | Score | Issues | Duration | Created |
|--------|-------|--------|----------|---------|
| [DOMAIN] | [SCORE] | [ISSUES] | [DURÉE] | JJ/MM/AAAA |
| [DOMAIN] | [SCORE] | [ISSUES] | [DURÉE] | JJ/MM/AAAA |

**Preview Leads (email captured) :**

| Email | Domain | Score | Issues | Created |
|-------|--------|-------|--------|---------|
| — | — | — | — | — |

**Errors (webhook events) :**

| Topic | Source | Shop | Error | Created |
|-------|--------|------|-------|---------|
| — | — | — | — | — |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte (lundi → dimanche, format `JJ/MM/AAAA`)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Tous les chiffres copiés depuis le dashboard, aucun inventé
- [ ] Chiffres manquants remplacés par `—` (jamais `0` par défaut)
- [ ] Sections "Preview Leads" et "Errors" laissées vides si pas de données (lignes `—`)
- [ ] Libellés strictement identiques au dashboard (anglais, casse exacte)
- [ ] Bloc collé en haut du fichier `storemd-admin.md`, sous le titre principal, avant les semaines précédentes

---

*Template figé. Si le dashboard change ses libellés ou ajoute des sections, ce template doit être mis à jour en conséquence avant la prochaine collecte.*
