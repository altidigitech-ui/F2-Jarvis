# FoundryTwo

Studio SaaS indie. Distribution-first. 3–4 SaaS/mois.
R (Growth) + F (CTO). Build in public, no fake stats.
Repo opérationnel unifié — documentation .md, pas de code.

---

## Fichiers racine

| Fichier | Rôle |
|---------|------|
| `CLAUDE.md` | Instructions permanentes pour Claude Code. À lire avant toute action. |
| `README.md` | Ce fichier — navigation. |
| `ARCH.md` | Arbre ASCII généré. Profondeur 3. |
| `ANTI-IA.md` | Règle #0 : anti-détection IA. Prime sur tout. |
| `VISUELS.md` | Algo visuel (brand + posts). |

---

## Chemins de lecture

**Je découvre le repo**
1. `CLAUDE.md` §1 à §3
2. `strategie/CONTEXT.md`
3. `produits/STATUS.md`
4. `ARCH.md`

**Je veux comprendre la stratégie**
1. `strategie/CONTEXT.md`
2. `strategie/PLAYBOOK-DISTRIBUTION.md`
3. `strategie/WARMING-FARMING.md`
4. `strategie/verticals/`

**Je veux exécuter ma journée R**
1. `romain/plan-30-jours.md`
2. `romain/VOIX.md`
3. `romain/{canal}/` selon la journée (twitter, linkedin, reddit, facebook, ph)
4. `romain/tracking/` pour logger

**Je veux exécuter ma journée F**
1. `fabrice/plan-30-jours.md`
2. `fabrice/VOIX.md`
3. `fabrice/{canal}/` selon la journée
4. `fabrice/tracking/` pour logger

**Je veux exécuter la publication @foundrytwo**
1. `f2/context.md`
2. `f2/publication/` (prompt + context universel)
3. `f2/{canal}/` pour le canal visé

---

## Index par dossier

| Dossier | Rôle |
|---------|------|
| `strategie/` | Source de vérité stratégique (CONTEXT, PLAYBOOK-DISTRIBUTION, WARMING-FARMING, verticals/). |
| `produits/` | Source de vérité produits (STATUS, MUTATIONS, NOUVEAUX, PRINCIPES-ANTI-CONCURRENTS). |
| `distribution/` | Règles communes distribution terrain + PLAYBOOK_DISTRI_3_VERTICAL. |
| `marketing/` | Marketing macro (funnel, pipeline, comptes). |
| `growth-marketing/` | Algos et context partagés par plateforme. Aucun sous-dossier par compte. |
| `f2/` | Compte studio @foundrytwo. Géré par R. Sous-dossiers par canal + engagement/publication/archives. |
| `romain/` | Opérations R (full-time, angle growth). Sous-dossiers par canal brand (twitter, linkedin, ph) et distribution (reddit, facebook). |
| `fabrice/` | Opérations F (full-time, angle technique). Même structure que romain/. |
| `saas/` | Contexte produit par SaaS. Référence `produits/` pour les détails. |
| `la-toile/` | Architecture de visibilité. Altistone INVISIBLE en public. |
| `asset-brand/` | Identité de marque (bible, logo, guidelines). |
| `tracking/` | Dashboard hebdo, decisions-log, UTM, Growth-Tracker.xlsx. |
| `archives/` | Plan-hebdo et progress-semaine archivés (vide à l'init du repo). |

---

## Conventions

Toutes les règles d'écriture, nommage, héritage, voix, volume sont dans `CLAUDE.md` §6. Résumé :

- Héritage strict : pas de duplication parent-enfant.
- Doc interne en français, rédaction publique en anglais.
- Validation explicite avant toute modification de fichier.
- Voix R ≠ F ≠ F2 ≠ Produits. Vocabulaire exclusif par voix.
- Zéro donnée inventée.
- Règle #0 ANTI-IA prime sur tout.

---

## Statut

| Dossier | État | Note |
|---------|------|------|
| `strategie/` | ✅ complet | 7 fichiers, (issu de lancien repo distribution) |
| `produits/` | ✅ complet | 4 fichiers, (issu de lancien repo distribution) |
| `distribution/` | 🔨 minimal | README + PLAYBOOK — à enrichir |
| `marketing/` | 🔨 léger | 3 fichiers — à enrichir |
| `growth-marketing/` | ✅ complet | 20 fichiers (algo + context par plateforme) |
| `f2/` | ✅ complet | 32 fichiers |
| `romain/` | ✅ complet | 66 fichiers — `ph/` vide (intentionnel) |
| `fabrice/` | ✅ complet | 73 fichiers — `ph/` vide (intentionnel) |
| `saas/` | ✅ complet | 24 fichiers |
| `la-toile/` | ✅ complet | 7 fichiers |
| `asset-brand/` | ✅ complet | 16 fichiers |
| `tracking/` | ✅ complet | 7 fichiers (fusion FoundryTwo) |
| `archives/` | ⏳ vide | Se remplira à chaque archivage dimanche |

Dossiers vides intentionnels : `archives/`, `romain/ph/`, `fabrice/ph/` (canal PH à documenter).

---

## Phase suivante

Après merge initial : nettoyer les références obsolètes inter-repo (voir `AUDIT.md` temporaire) avant ouverture de la semaine de travail.
