# Facebook — Template de collecte Insights

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `facebook.md` à chaque samedi.
> **Source unique :** Facebook Business Suite → Tableau de bord professionnel → Statistiques (Page StoreMD).
> **URL :** `facebook.com/professional_dashboard/profile_insights/views/`
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant le batch de la semaine suivante.
2. **Où :** ouvrir Facebook Business Suite, Tableau de bord professionnel, sélectionner la Page StoreMD, naviguer dans Statistiques → Vues, Audience, Interactions.
3. **Comment :**
   - Sélectionner période = "7 derniers jours" (Facebook fonctionne en LAST_7D glissant, plage lun→dim quand le snapshot est pris le lundi matin).
   - Capturer chaque section visible (Vues, Vues par type, Vues par followers, Visites, Trafic, Audience âge/genre).
   - Reporter les valeurs dans le squelette ci-dessous (pas d'export XLSX/CSV natif depuis Insights — collecte manuelle).
   - **Dater le snapshot** au format `JJ/MM/AAAA`.
   - Indiquer la plage de la semaine au format `du JJ/MM/AAAA au JJ/MM/AAAA` (celle affichée par Facebook en haut du dashboard).
   - Coller le bloc rempli en haut de `facebook.md`, sous le titre principal, avant les semaines précédentes.
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - Sections audience vides à 0 followers : mettre `0` dans les cellules, garder la structure.
   - **Libellés strictement identiques à Facebook Business Suite** (français, casse exacte). Si Facebook change ses libellés, mettre à jour ce template avant la prochaine collecte.
   - Si Facebook n'expose pas un breakdown jour par jour (axes du graphique mal échelonnés ou non extractibles), reporter le total semaine et noter `total semaine` dans la cellule Date.
   - Convention période Facebook : **LAST_7D glissant** (pas samedi → samedi comme TikTok), généralement lundi → dimanche quand le snapshot est pris le lundi.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Vues (totaux semaine) :**

| Métrique | Valeur | Évolution vs 7 jours précédents |
|----------|--------|----------------------------------|
| Vues | [VALEUR] | [+/-X%] |
| Vues de 3 secondes | [VALEUR] | [+/-X%] |
| Vues de 1 minute | [VALEUR] | [+/-X%] |

**Vues par type de contenu :**

| Type | Distribution |
|------|--------------|
| Autre | [VALEUR]% |
| Reel | [VALEUR]% |
| Photo | [VALEUR]% |
| Plusieurs photos | [VALEUR]% |

**Vues par followers vs non-followers :**

| Catégorie | Distribution |
|-----------|--------------|
| Followers | [VALEUR]% |
| Non-followers | [VALEUR]% |

**Visites (totaux semaine) :**

| Métrique | Valeur | Évolution vs 7 jours précédents |
|----------|--------|----------------------------------|
| Visites | [VALEUR] | [+/-X%] |

**Visites (jour par jour) :**

| Date | Visites |
|------|---------|
| JJ/MM/AAAA | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] |
| **Total** | [VALEUR] |

**Comment les personnes trouvent votre contenu (Trafic) :**

| Source | Distribution |
|--------|--------------|
| Indisponible | [VALEUR]% |
| Reels | [VALEUR]% |
| [AUTRE SOURCE] | [VALEUR]% |

**Audience — Âge et genre :**

| Tranche d'âge | Hommes | Femmes |
|---------------|--------|--------|
| 0 | 0 | 0 |

**Audience — Top territoires :**

| Territoire | Distribution |
|------------|--------------|
| 0 | 0 |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (telle qu'affichée par Facebook)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Tous les chiffres copiés depuis Facebook Business Suite, aucun inventé
- [ ] Chiffres manquants remplacés par `—` (jamais `0` par défaut, sauf pour les sections audience vides)
- [ ] Sections audience laissées avec `0` quand pas de data
- [ ] Libellés strictement identiques à Facebook Business Suite (français, casse exacte)
- [ ] Évolution % vs 7 jours précédents reportée quand visible
- [ ] Si breakdown jour par jour non extractible, noter `total semaine` dans la cellule Date
- [ ] Bloc collé en haut du fichier `facebook.md`, sous le titre principal, avant les semaines précédentes

---

*Template figé. Si Facebook change ses libellés ou ajoute des sections, ce template doit être mis à jour en conséquence avant la prochaine collecte.*
