# LinkedIn — Template de collecte Analytics

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `romain.md` ou `fabrice.md` (un seul template commun aux 2 profils) à chaque samedi.
> **Source unique :** LinkedIn Analytics → export XLSX `AggregateAnalytics_[Nom]_YYYY-MM-DD_YYYY-MM-DD.xlsx`.
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant le batch de la semaine suivante.
2. **Où :** ouvrir LinkedIn → profil → "Voir toutes les analyses" → exporter XLSX pour la période 7 derniers jours.
3. **Comment :**
   - Décompresser/ouvrir le XLSX. 5 feuilles à reporter : `DÉCOUVERTE`, `ENGAGEMENT`, `MEILLEURS POSTS`, `ABONNÉS`, `DONNÉES DÉMOGRAPHIQUES`.
   - **Dater le snapshot** au format `JJ/MM/AAAA`.
   - **Convention période LinkedIn :** telle qu'apparaît dans le nom du fichier XLSX (typiquement lundi → dimanche).
   - Coller le bloc rempli en haut du fichier du compte concerné, sous le titre principal.
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - **Libellés strictement identiques au XLSX LinkedIn** (français, casse exacte : "Impressions", "Interactions", "Membres touchés", "Abonnés", "Niveau hiérarchique", etc.).
   - **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.
   - Pour la feuille `MEILLEURS POSTS` : ne reporter que les posts qui tombent dans la plage de la semaine (les autres sont historiques et déjà reportés dans des snapshots précédents).
   - Pour les pourcentages démographiques : remplacer l'espace insécable `\xa0%` du XLSX par un simple ` %`.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Performance globale (DÉCOUVERTE) :**

| Métrique | Valeur |
|----------|--------|
| Impressions | [VALEUR] |
| Membres touchés | [VALEUR] |

**Engagement (jour par jour) :**

| Date | Impressions | Interactions |
|------|-------------|--------------|
| JJ/MM/AAAA | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] |
| **Total** | [V] | [V] |

**Meilleurs posts — Impressions (dans la semaine) :**

| URL du post | Date de publication du post | Impressions |
|-------------|------------------------------|-------------|
| [URL] | JJ/MM/AAAA | [V] |

**Meilleurs posts — Interactions (dans la semaine) :**

| URL du post | Date de publication du post | Interactions |
|-------------|------------------------------|--------------|
| [URL] | JJ/MM/AAAA | [V] |

**Abonnés :**

| Champ | Valeur |
|-------|--------|
| Nombre total d'abonnés (fin de semaine) | [VALEUR] |

| Date | Nouveaux abonnés |
|------|------------------|
| JJ/MM/AAAA | [V] |
| JJ/MM/AAAA | [V] |
| JJ/MM/AAAA | [V] |
| JJ/MM/AAAA | [V] |
| JJ/MM/AAAA | [V] |
| JJ/MM/AAAA | [V] |
| JJ/MM/AAAA | [V] |
| **Total** | [V] |

**Données démographiques (snapshot fin de semaine) :**

| Catégorie | Valeur | Pourcentage |
|-----------|--------|-------------|
| Lieu | [VALEUR] | [V] % |
| Taille de l'entreprise | [VALEUR] | [V] % |
| Niveau hiérarchique | [VALEUR] | [V] % |
| Poste | [VALEUR] | [V] % |
| Secteur | [VALEUR] | [V] % |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (telle qu'affichée dans le nom du fichier XLSX)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Performance globale (DÉCOUVERTE) reportée (Impressions + Membres touchés)
- [ ] Engagement jour par jour reporté (7 jours)
- [ ] Meilleurs posts filtrés sur la semaine (2 tableaux : Impressions + Interactions)
- [ ] Abonnés : total fin de semaine + nouveaux par jour
- [ ] Données démographiques reportées avec catégories distinctes
- [ ] Espaces insécables `\xa0%` remplacés par ` %` simple
- [ ] Libellés strictement identiques au XLSX LinkedIn (français, casse exacte)
- [ ] Aucune invention de chiffre
- [ ] Bloc collé en haut du fichier du compte concerné, sous le titre principal

---

*Template commun aux profils R (`romain.md`) et F (`fabrice.md`). Si LinkedIn change ses libellés ou ajoute des feuilles, ce template doit être mis à jour en conséquence avant la prochaine collecte.*
