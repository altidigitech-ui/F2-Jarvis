# Product Hunt — Template de collecte profil

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `romain.md` ou `fabrice.md` (un seul template commun aux 2 profils) à chaque samedi.
> **Source unique :** `producthunt.com/@[handle]` → onglet Activity + onglet Upvotes.
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant le batch de la semaine suivante.
2. **Où :** ouvrir le profil PH du compte concerné (R = `producthunt.com/@romain_delgado`, F = `producthunt.com/@fabrice`), naviguer dans :
   - **About** → header profil (followers, following, streak, KP, rank)
   - **Activity** → liste chronologique des commentaires et actions
   - **Upvotes** → liste cumulée des produits upvotés (pas de timestamp par upvote dans PH, snapshot du cumul)
3. **Comment :**
   - Pas d'export XLSX/CSV natif. Copier-coller manuellement le contenu des onglets.
   - **Dater le snapshot** au format `JJ/MM/AAAA`.
   - Convention période : **samedi → samedi** (S9 = du samedi N-7 au vendredi N-1, snapshot pris le samedi N).
   - Pour les commentaires : extraire ceux qui tombent dans la plage de la semaine (les indications "Xd ago" / "Xmo ago" sur PH sont relatives à la date du snapshot, faire la conversion manuellement).
   - Pour les upvotes : reporter le total cumulé all-time. La delta vs semaine précédente (= upvotes donnés cette semaine) se calcule de tête : `upvotes_cumulé_semaine_N - upvotes_cumulé_semaine_N-1`.
   - Coller le bloc rempli en haut du fichier du compte concerné (`romain.md` ou `fabrice.md`), sous le titre principal.
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - **Libellés strictement identiques à PH** (anglais, casse exacte).
   - **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.
   - Si aucune activité dans la semaine (0 commentaire, 0 upvote, 0 produit lancé), garder les sections avec valeurs à 0 ou `—`. Ne pas supprimer.

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Profil (snapshot fin de semaine) :**

| Champ | Valeur |
|-------|--------|
| Handle | [HANDLE] |
| ID PH | [ID] |
| Bio | [BIO COMPLÈTE] |
| Followers | [VALEUR] |
| Following | [VALEUR] |
| Day streak | [VALEUR] |
| Rank Last month | [RANK] ([KP] KP) |
| Rank All time | [RANK] ([KP] KP) |

**Activity (commentaires dans la semaine) :**

| Date | Product | Comment (extrait 200 caractères max) |
|------|---------|--------------------------------------|
| JJ/MM/AAAA | [PRODUCT] | [EXTRAIT] |
| JJ/MM/AAAA | [PRODUCT] | [EXTRAIT] |

Si aucun commentaire dans la semaine, laisser une seule ligne vide :
| — | — | — |

**Upvotes (cumulé all-time) :**

| Champ | Valeur |
|-------|--------|
| Total upvotes all-time | [VALEUR] |
| Delta vs semaine précédente | [VALEUR ou —] |

**Produits lancés cette semaine :**

| Date | Produit | Statut |
|------|---------|--------|
| — | — | — |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (convention samedi → samedi)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Profil complètement reporté (handle, ID, bio, followers, following, streak, ranks)
- [ ] Commentaires de la semaine extraits avec date convertie (Xd ago → date réelle)
- [ ] Extraits commentaires limités à ~200 caractères pour lisibilité
- [ ] Total upvotes cumulé all-time reporté
- [ ] Delta upvotes vs semaine précédente calculée si possible (sinon `—`)
- [ ] Section "Produits lancés" remplie si lancement effectif, sinon ligne `—`
- [ ] Libellés strictement identiques à PH (anglais, casse exacte)
- [ ] Bloc collé en haut du fichier du compte concerné, sous le titre principal

---

*Template commun aux profils R (`romain.md`) et F (`fabrice.md`). Si PH change ses libellés ou ajoute des sections (Reviews, Collections, Stacks), ce template doit être mis à jour en conséquence avant la prochaine collecte.*

---

*Template commun aux profils R (`romain.md`) et F (`fabrice.md`). Si PH change ses libellés ou ajoute des sections (Reviews, Collections, Stacks), ce template doit être mis à jour en conséquence avant la prochaine collecte.*
