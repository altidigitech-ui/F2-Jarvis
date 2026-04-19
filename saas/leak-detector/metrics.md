# METRICS — Leak Detector

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `saas/leak-detector/context.md` (cibles, unit economics, North Star)
**Rempli par :** R à la revue vendredi (données produit) + suivi automatique (dashboard)
**Ce fichier contient :** les objectifs métriques LD par phase et l'historique des données réelles.

> **⚠️ PIVOT 03/04/2026** — Les projections §2 étaient basées sur une cible dev et se sont révélées irréalistes (~8 signups, 0€ MRR après 3 semaines). La North Star est transférée à StoreMD. LD reste actif en attendant la mutation.

---

## 1. NORTH STAR

**Nombre d'analyses complétées par semaine.**

Tout le reste en découle : plus d'analyses = plus de valeur perçue = plus de conversions Free→Pro = plus de MRR.

---

## 2. OBJECTIFS PAR PHASE

### 2.1 Projections

| Métrique | M1 | M3 | M6 | M12 |
|----------|----|----|----|----|
| Signups (cumulés) | 100 | 500 | 2 000 | 5 000 |
| Users Free | 95 | 470 | 1 900 | 4 700 |
| Users Pro | 5 | 30 | 100 | 300 |
| Analyses/semaine | 50 | 375 | — | — |
| Conversion Free→Pro | 5% | 8% | — | — |
| MRR | €145 | €870 | €2 900 | €8 700 |
| NPS | >30 | >50 | — | — |

### 2.2 Seuils de décision

| Seuil | Délai | Action si pas atteint |
|-------|-------|----------------------|
| 1er client payant | J+14 | Si aucun client Pro après 2 semaines de cold outreach → revoir le pricing, le gating, ou le messaging |
| 5 clients Pro | M1 | Si < 5 → le produit délivre-t-il assez de valeur pour justifier €29/mois ? Vérifier les rapports, le NPS. |
| Conversion > 3% | M2 | Si < 3% → le rapport gaté ne donne pas assez envie d'upgrader. Tester le level de gating. |
| MRR > €500 | M3 | Si < €500 → le canal d'acquisition ne scale pas. Diversifier (SEO, contenu, IH, Reddit). |

---

## 3. MÉTRIQUES HEBDOMADAIRES (rempli chaque vendredi)

### Semaine du [DATE] au [DATE]

**Produit**

| Métrique | Valeur | Semaine précédente | Tendance |
|----------|--------|--------------------|----------|
| Signups (semaine) | | | |
| Signups (cumulés) | | | |
| Analyses complétées (semaine) | | | |
| Analyses complétées (cumulées) | | | |
| Users Free actifs | | | |
| Users Pro actifs | | | |
| Users Agency actifs | | | |
| Conversion Free→Pro (mois en cours) | | | |
| Churn Pro (mois en cours) | | | |

**Revenue**

| Métrique | Valeur | Semaine précédente | Tendance |
|----------|--------|--------------------|----------|
| MRR | | | |
| Nouveaux clients payants (semaine) | | | |
| Clients payants (cumulés) | | | |
| Revenue/client moyen | | | |

**Acquisition**

| Métrique | Valeur | Semaine précédente | Tendance |
|----------|--------|--------------------|----------|
| Signups via cold outreach (UTM) | | | |
| Signups via contenu organique (UTM) | | | |
| Signups via PH | | | |
| Signups via IH | | | |
| Signups directs (pas d'UTM) | | | |
| Canal #1 cette semaine | | | |

**Qualité**

| Métrique | Valeur |
|----------|--------|
| Score moyen des analyses (semaine) | |
| Leak la plus fréquente (semaine) | |
| Erreurs/timeouts d'analyse (semaine) | |
| Coût LLM total (semaine) | |
| Coût LLM/analyse moyen | |

---

## 4. HISTORIQUE MENSUEL

| Mois | Signups | Users Pro | MRR | Analyses | Conv. F→P | NPS | Coût LLM | Marge |
|------|---------|-----------|-----|----------|-----------|-----|----------|-------|
| Mars 2026 | | | | | | | | |
| Avril 2026 | | | | | | | | |
| Mai 2026 | | | | | | | | |
| Juin 2026 | | | | | | | | |
| Juillet 2026 | | | | | | | | |
| Août 2026 | | | | | | | | |

---

## 5. NOTES

_Espace libre pour les observations produit : patterns dans les analyses, feedbacks users notables, features demandées, bugs récurrents, décisions produit prises._
