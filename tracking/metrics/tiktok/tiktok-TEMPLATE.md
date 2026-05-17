# TikTok — Template de collecte Analytics

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `tiktok.md` à chaque samedi.
> **Source unique :** TikTok Analytics (Business Account `@storeemd`).
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant de commencer la rédaction du batch de la semaine suivante.
2. **Où :** ouvrir TikTok Business Suite Analytics, période = "Custom" → du **samedi N-7 au samedi N-1** (convention TikTok : semaines décalées d'1 jour vs batch S — TikTok lag d'1 jour, l'agrégation du dimanche n'est dispo que le lundi).
3. **Comment :**
   - Exporter les 4 ZIPs disponibles : `Overview`, `Content`, `Followers`, `Viewers`.
   - Décompresser et reporter les données dans le squelette ci-dessous.
   - **Dater le snapshot** au format `JJ/MM/AAAA` (date de prise, pas date de saisie).
   - Indiquer la plage de la semaine au format `du JJ/MM/AAAA au JJ/MM/AAAA`.
   - Coller le bloc rempli en haut de `tiktok.md`, juste sous le titre principal du fichier (avant les semaines précédentes).
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - Si une section audience est vide à 0 followers (FollowerActivity, FollowerGender, FollowerTopTerritories), mettre `0` dans les cellules, pas de ligne supprimée.
   - **Aucune adaptation des libellés.** Les libellés du fichier sont strictement identiques aux XLSX TikTok officiels.
   - **Aucune francisation.** Les libellés restent en anglais comme dans les exports.
   - **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.
   - Standardiser les dates en `JJ/MM/AAAA` même si l'export TikTok affiche `10 mai`.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Overview (jour par jour) :**

| Date | Video Views | Profile Views | Likes | Comments | Shares |
|------|-------------|---------------|-------|----------|--------|
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |
| **Total** | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |

**Content (posts publiés cette semaine) :**

| Time | Video title | Video link | Post time | Total likes | Total comments | Total shares | Total views |
|------|-------------|------------|-----------|-------------|----------------|--------------|-------------|
| JJ/MM/AAAA | [TITRE] | [URL] | JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] | [VALEUR] |

**FollowerHistory (jour par jour) :**

| Date | Followers | Difference in followers from previous day |
|------|-----------|-------------------------------------------|
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] |

**Viewers (jour par jour) :**

| Date | Total Viewers | New Viewers | Returning Viewers |
|------|---------------|-------------|-------------------|
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| JJ/MM/AAAA | [VALEUR] | [VALEUR] | [VALEUR] |
| **Total** | [VALEUR] | [VALEUR] | [VALEUR] |

**FollowerActivity :**

| Date | Hour | Active followers |
|------|------|------------------|
| 0 | 0 | 0 |

**FollowerGender :**

| Gender | Distribution |
|--------|--------------|
| 0 | 0 |

**FollowerTopTerritories :**

| Top territories | Distribution |
|-----------------|--------------|
| 0 | 0 |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (convention TikTok : samedi → samedi)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Tous les chiffres copiés depuis les XLSX, aucun inventé
- [ ] Chiffres manquants remplacés par `—` (jamais `0` par défaut, sauf pour les 3 sections audience vides à 0 followers)
- [ ] Sections FollowerActivity, FollowerGender, FollowerTopTerritories laissées avec `0` quand pas de data
- [ ] Libellés strictement identiques aux XLSX (anglais, casse exacte)
- [ ] Dates standardisées en `JJ/MM/AAAA` (pas `10 mai`)
- [ ] Bloc collé en haut du fichier `tiktok.md`, sous le titre principal, avant les semaines précédentes

---

*Template figé. Si TikTok change ses libellés ou ajoute des sections, ce template doit être mis à jour en conséquence avant la prochaine collecte.*
