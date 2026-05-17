# IndieHackers — Template de collecte profil

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `foundrytwo.md` à chaque samedi.
> **Source unique :** `indiehackers.com/@foundrytwo` → profil + posts + comments.
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant le batch de la semaine suivante.
2. **Où :** ouvrir le profil IH FoundryTwo (`indiehackers.com/@foundrytwo`), naviguer dans :
   - **Profil** → header (followers, following, products, bio)
   - **Posts** → liste des posts publiés (avec stats : views, upvotes, comments)
   - **Comments** → activité de commentaires hors posts
3. **Comment :**
   - Pas d'export XLSX/CSV natif. Copier-coller manuellement le contenu du profil.
   - **Dater le snapshot** au format `JJ/MM/AAAA`.
   - Convention période : **samedi → samedi**.
   - Pour les posts/comments dans la semaine : extraire ceux qui tombent dans la plage.
   - Coller le bloc rempli en haut du fichier `foundrytwo.md`, sous le titre principal.
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - **Libellés strictement identiques à IH** (anglais, casse exacte).
   - **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.
   - Si aucune activité dans la semaine, garder les sections avec valeurs à `—`. Ne pas supprimer.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Profil (snapshot fin de semaine) :**

| Champ | Valeur |
|-------|--------|
| Handle | [HANDLE] |
| Bio | [BIO] |
| Followers | [VALEUR] |
| Following | [VALEUR] |
| Products | [VALEUR] |

**Posts publiés cette semaine :**

| Date | Titre | URL | Views | Upvotes | Comments |
|------|-------|-----|-------|---------|----------|
| JJ/MM/AAAA | [TITRE] | [URL] | [VALEUR] | [VALEUR] | [VALEUR] |

**Comments laissés cette semaine :**

| Date | Sur quel post | Comment (extrait 200 caractères max) |
|------|---------------|--------------------------------------|
| JJ/MM/AAAA | [TITRE / URL] | [EXTRAIT] |

**Activité produit StoreMD (si déclaré comme product sur IH) :**

| Champ | Valeur |
|-------|--------|
| Page views (semaine) | [VALEUR] |
| Followers product | [VALEUR] |
| Upvotes cumulés | [VALEUR] |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (convention samedi → samedi)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Profil complètement reporté (handle, bio, followers, following, products)
- [ ] Posts de la semaine extraits avec stats (views, upvotes, comments)
- [ ] Comments de la semaine extraits avec post de référence
- [ ] Activité produit StoreMD reportée si déclarée sur IH
- [ ] Libellés strictement identiques à IH (anglais, casse exacte)
- [ ] Si aucune activité, sections avec `—` (pas supprimées)
- [ ] Bloc collé en haut du fichier `foundrytwo.md`, sous le titre principal

---

*Template figé. Si IH change ses libellés ou ajoute des sections, ce template doit être mis à jour en conséquence avant la prochaine collecte.*
