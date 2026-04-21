# AUDIT — Merge FoundryTwo + Co-do-va-bu-di

> Résidus merge initial (03/04/2026). Le cleanup complet du 21/04/2026 (8 commits) a traité ces points. Conservé pour historique.
> Généré le 19 avril 2026 après fusion des deux repos, mis à jour après batch de nettoyage.

---

## Décisions appliquées (19/04/2026)

| Décision stratégique | Valeur finale | Remplacements |
|---------------------|---------------|---------------|
| Volume interactions/jour | R : 30 · F : 30 (aligné) | 3 lignes (CLAUDE.md §3, CLAUDE.md §6.4, strategie/CONTEXT.md §3 table) |
| Cadence SaaS | 2/mois | 23 remplacements dans 20 fichiers |
| Références inter-repo nettoyées | 0 résiduelle | ~110 remplacements dans ~50 fichiers (via 4 passes sed contextualisées) |
| Fichiers temporaires supprimés | 5 | `romain/CLAUDE-from-CDV.md`, `fabrice/CLAUDE-from-CDV.md`, `romain/context-from-FT.md`, `fabrice/context-from-FT.md`, `context.md` (racine) |
| Fichiers fusionnés créés | 2 | `romain/context.md`, `fabrice/context.md` (unifiés brand + distribution) |
| Fichiers réécrits | 1 | `distribution/README.md` |

---

## 1. Références obsolètes inter-repo ✅

**Statut : résolu.** Les 34 occurrences + 38 chemins `CDV/...` initialement recensés ont été traités.

| Pattern | Avant | Après |
|---------|-------|-------|
| `repo CDV`, `repo FT`, `repo compagnon`, `fonctionne en tandem`, `l'autre repo` | 34+ occurrences | 0 (hors CLAUDE.md §8 interdiction + CLAUDE.md §1 note historique de fusion) |
| `CDV/produits/...`, `CDV/romain/...`, `CDV/fabrice/...`, `CDV/tracking/...` | 38 occurrences | Remplacé par chemins relatifs (`produits/`, `../romain/reddit/`, etc.) |
| `Source : CDV (repo compagnon)` (6 × saas/) | 6 occurrences | Remplacé par `Source : produits/NOUVEAUX.md` ou `Source : produits/MUTATIONS.md` |
| `(CDV)` parenthétiques, `CDV data`, `CDV cadence`, `terrain CDV`, `pivot CDV`, etc. | ~60 occurrences | Renommés en "terrain", "distribution", "distribution-first" selon contexte |

Unique mention restante (LÉGITIME) : `CLAUDE.md:3` — note historique qui contextualise la fusion ("Fusion des anciens repos FT et CDV en un repo unique"). `CLAUDE.md:127` — règle d'interdiction qui cite les termes bannis.

---

## 2. Liens markdown cassés ✅

**Statut : rien à résoudre.** Aucun lien `[texte](chemin)` dans les fichiers .md du repo. Les références se font par chaînes en backticks. Les 38 chemins inline `CDV/...` ont été corrigés en étape 6.

---

## 3. Duplications potentielles ✅

### 3.1 Fichiers temporaires → supprimés

| Fichier | Statut |
|---------|--------|
| `romain/context-from-FT.md` | ✅ Supprimé. Contenu utile intégré dans `romain/context.md` unifié. |
| `fabrice/context-from-FT.md` | ✅ Supprimé. Contenu utile intégré dans `fabrice/context.md` unifié. |
| `romain/CLAUDE-from-CDV.md` | ✅ Supprimé. Contenu opérationnel (phases mois, outils F5Bot/Feedly, volumes par canal) intégré dans `romain/context.md`. |
| `fabrice/CLAUDE-from-CDV.md` | ✅ Supprimé. Idem pour F. |
| `context.md` (racine) | ✅ Supprimé. Structure corporate Altistone déjà présente dans `la-toile/context.md`. Toutes les autres sections étaient redondantes avec CLAUDE.md, strategie/CONTEXT.md, README.md. |

### 3.2 Filenames partagés — OK (héritage)

Les 40 `context.md`, 16 `roadmap.md`, 12 `plan-hebdo.md`, etc. sont normaux (un par scope dans l'arbre d'héritage).

### 3.3 distribution/README.md → réécrit ✅

Le fichier commençait par "# Co-do-va-bu-di — Repo distribution-first FoundryTwo" (README original de l'ancien repo). Réécrit intégralement en "# Distribution terrain — Reddit + Facebook".

---

## 4. Fichiers orphelins

**Non bloquant.** Candidats à vérifier manuellement par F lors d'une revue ultérieure :

- `growth-marketing/strategie/strategie-expansion-generale.md` — probablement orphelin du repo, pas référencé depuis README.md racine.
- `la-toile/LA-TOILE-v3.1-Complete.docx` — fichier binaire, non documenté dans CLAUDE.md/README.md.
- `la-toile/toile-schema-v3.1.png` — image, non liée dans les .md.

---

## 5. Dossiers vides ✅

| Dossier | État | Intentionnel ? |
|---------|------|----------------|
| `archives/` | vide | ✅ Oui — se remplira à chaque archivage dimanche. |
| `romain/ph/` | vide | ✅ Oui — canal PH à documenter (prévu). |
| `fabrice/ph/` | vide | ✅ Oui — idem. |

Aucun autre dossier vide détecté.

---

## 6. Contradictions de règles ✅

### 6.1 Volume interactions F ✅ résolu

Décision F = 30 interactions/jour appliquée dans les 3 fichiers qui le traitaient comme un TOTAL (CLAUDE.md x2, strategie/CONTEXT.md x1). Les mentions "15 interactions Twitter" et "15 interactions LinkedIn" en tant que SPLIT per-canal sont préservées (15+15=30 cohérent).

### 6.2 Cadence SaaS ✅ résolu

Décision 2 SaaS/mois appliquée dans 20 fichiers (~23 remplacements). Le tableau §7 de `strategie/CONTEXT.md` (M1: StoreMD+ProfitPilot, M2: ClientPulse+AdAudit, M3: CreatorSuite+LeadQuiz) était déjà cohérent avec 2/mois — **intact après correction**.

Les 2 mentions restantes "1 SaaS/mois" dans `strategie/CONTEXT.md:202, 265` sont des références **historiques** (ancienne contrainte retirée, comparaison "remplacée par 2 SaaS/mois"). Légitimes.

### 6.3 "Ce repo" ambigu ✅ résolu

Toutes les formulations "ce repo" qui suggéraient deux repos distincts ont été reformulées pour refléter l'unification. Les références à "ce repo" dans un contexte cohérent (ex : "ce dossier") ont été préservées.

---

## 7. Décisions appliquées (emplacements)

| Fichier | Décision |
|---------|----------|
| `context.md` racine | ✅ Supprimé. Contenu fusionné dans CLAUDE.md, strategie/CONTEXT.md, la-toile/context.md. |
| `romain/context-from-FT.md` / `fabrice/context-from-FT.md` | ✅ Supprimés. |
| `romain/CLAUDE-from-CDV.md` / `fabrice/CLAUDE-from-CDV.md` | ✅ Supprimés. |
| `growth-marketing/strategie/` | ⏳ Conservé tel quel. À évaluer avec F si fusion avec `strategie/` racine pertinente. |
| `distribution/README.md` | ✅ Réécrit. |
| `saas/*/context.md` et `saas/*/README.md` avec "Source : CDV" | ✅ Pointent maintenant vers `produits/NOUVEAUX.md` ou `produits/MUTATIONS.md`. |

---

## 8. Reste à traiter (non-bloquant, pour F)

1. Vérifier si `growth-marketing/strategie/` doit être fusionné avec `strategie/` racine ou rester distinct (scope plateforme vs stratégie globale).
2. Valider les nouveaux `romain/context.md` et `fabrice/context.md` (120 lignes chacun) — est-ce que le niveau de détail convient, ou faut-il ajouter/retirer des sections ?
3. Supprimer ce fichier AUDIT.md après validation finale.
