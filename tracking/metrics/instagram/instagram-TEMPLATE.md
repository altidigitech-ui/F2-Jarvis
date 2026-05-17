# Instagram — Template de collecte Insights

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `instagram.md` à chaque samedi.
> **Source unique :** Instagram Insights (Business Account StoreMD).
> **Format date :** JJ/MM/AAAA strict, partout.
>
> ⚠️ **Note S9 :** Instagram ne propose pas d'export XLSX/CSV natif. Pour la première collecte réelle (S10 ou ultérieure), les libellés ci-dessous seront ajustés en fonction de ce que l'interface Instagram Insights affiche réellement à ce moment-là. Toute différence = priorité aux libellés natifs Instagram.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant de commencer la rédaction du batch de la semaine suivante.
2. **Où :** ouvrir l'application Instagram (Business Account StoreMD) → Insights → période = 7 derniers jours (convention : samedi → samedi).
3. **Comment :**
   - Capturer chaque section Insights (Account Overview, Content, Audience).
   - Reporter manuellement les valeurs dans le squelette ci-dessous (pas d'export XLSX dispo).
   - **Dater le snapshot** au format `JJ/MM/AAAA` (date de prise, pas date de saisie).
   - Indiquer la plage de la semaine au format `du JJ/MM/AAAA au JJ/MM/AAAA`.
   - Coller le bloc rempli en haut de `instagram.md`, sous le titre principal, avant les semaines précédentes.
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - Si une section audience est vide à 0 followers (Top locations, Age range, Gender), mettre `0` dans les cellules, ne pas supprimer la section.
   - **Libellés strictement identiques à Instagram Insights** (anglais, casse exacte). Si Instagram change ses libellés, mettre à jour ce template avant la prochaine collecte.
   - Si Instagram n'expose pas un breakdown jour par jour pour une métrique (ex : Reach, Impressions affichés en total semaine seulement), reporter le total semaine et noter `total semaine` dans la cellule Date.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Account Overview (semaine) :**

| Métrique | Valeur |
|----------|--------|
| Accounts reached | [VALEUR] |
| Accounts engaged | [VALEUR] |
| Total followers | [VALEUR] |
| Profile visits | [VALEUR] |
| External link taps | [VALEUR] |

**Content (posts publiés cette semaine) :**

| Post date | Format | Caption (extrait) | Reach | Likes | Comments | Shares | Saves |
|-----------|--------|-------------------|-------|-------|----------|--------|-------|
| JJ/MM/AAAA | [Reel/Post/Story] | [EXTRAIT] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |

**Followers (évolution semaine) :**

| Métrique | Valeur |
|----------|--------|
| Total followers (début semaine) | [VALEUR] |
| Total followers (fin semaine) | [VALEUR] |
| New followers | [VALEUR] |
| Unfollows | [VALEUR] |

**Top locations :**

| Location | Distribution |
|----------|--------------|
| 0 | 0 |

**Age range :**

| Range | Distribution |
|-------|--------------|
| 0 | 0 |

**Gender :**

| Gender | Distribution |
|--------|--------------|
| 0 | 0 |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (convention samedi → samedi)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Tous les chiffres copiés depuis Instagram Insights, aucun inventé
- [ ] Chiffres manquants remplacés par `—` (jamais `0` par défaut, sauf pour les 3 sections audience vides à 0 followers)
- [ ] Sections Top locations, Age range, Gender laissées avec `0` quand pas de data
- [ ] Libellés strictement identiques à Instagram Insights (anglais, casse exacte)
- [ ] Si métrique en total semaine uniquement (pas de breakdown jour), noter `total semaine` dans la cellule Date
- [ ] Bloc collé en haut du fichier `instagram.md`, sous le titre principal, avant les semaines précédentes

---

*Template provisoire. À finaliser et ajuster à la première collecte réelle (libellés Instagram natifs, présence ou non d'un breakdown jour par jour, formats de date dans l'app).*
