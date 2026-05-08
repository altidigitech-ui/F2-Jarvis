---
date: "2026-05-08"
timestamp: "2026-05-08T18:15:53.038Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** comptes-groupes.md F+R — label "LURK ONLY J1-J7" périmé sur r/shopify + r/ecommerce, ambiguïté critique avec nouveau plan
**Contexte:** Les deux fichiers ont été mis à jour le **07/05/2026** (hier) mais conservent les labels de restriction Reddit du plan original (06/04) : F dit "LURK ONLY J1-J7", R dit "LURK ONLY avant J8". Les comptes Reddit ont été créés le **06/04** → restriction J7/J8 = ~13/04. Comptes débloqués pour les commentaires depuis 25 jours. **Ambiguïté dangereuse :** avec le nouveau plan-30-jours (J1=05/05), si JARVIS lit "LURK ONLY J1-J7", il peut interpréter que r/shopify et r/ecommerce sont verrouillés jusqu'au **11/05 (J7 nouveau plan)** — alors qu'ils sont libres. Les mentions produit sont réservées Phase 4 (J22+, 26/05) mais les commentaires value sont déjà possibles.
**Recommandation:** Mettre à jour les colonnes Restrictions pour les deux subs cibles dans les deux fichiers.
**Action:**
- Fichier: `fabrice/tracking/comptes-groupes.md`
  - `r/shopify | ✅ Rejoint | 06/04 | LURK ONLY J1-J7 |` → `r/shopify | ✅ Rejoint | 06/04 | Actif — commentaires OK, mentions produit Phase 4 (26/05+) |`
  - `r/ecommerce | ✅ Rejoint | 06/04 | LURK ONLY J1-J7 |` → idem
- Fichier: `romain/tracking/comptes-groupes.md`
  - `r/shopify | ✅ Rejoint | 06/04 | LURK ONLY avant J8 |` → `r/shopify | ✅ Rejoint | 06/04 | Actif — commentaires OK, mentions produit Phase 4 (26/05+) |`
  - `r/ecommerce | ✅ Rejoint | 06/04 | LURK ONLY avant J8 |` → idem
**Risques si ignoré:** JARVIS donne une réponse incorrecte sur le statut Reddit quand Fabrice ou Romain demandent "est-ce qu'on peut commenter sur r/shopify ?". Confusion entre restriction account-age (expirée) et restriction stratégique Phase 4 (intentionnelle).
