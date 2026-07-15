---
date: "2026-07-15"
timestamp: "2026-07-15T00:13:46.306Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Correction état réel — Dispatch F+R EXISTENT ✓ — seul StoreMD manque
**Contexte:** Lecture directe de `fabrice/publication/batch-semaine.md` (8KB, S15 complet 22-28/06) et `romain/publication/batch-semaine.md` (8KB, S15 complet 22-28/06) confirme que les dispatch perso ont bien été créés lors de la session 17:27. Le batch central `marketing/contenu/batch-semaine/batch-semaine-S15.md` (36KB) est complet. Deux PENDING sont donc inexacts : (1) "batch-semaine/ vide depuis S15" — FAUX, le fichier existe. (2) "Dispatch bloqué F+R par StoreMD" — FAUX pour F+R, leurs fichiers existent. Seul `saas-app-shopify/storemd/publication/batch-semaine.md` est absent (path inexistant confirmé). La situation réelle : **F+R sont prêts à publier**, les dates dans leurs fichiers sont stales (22-28/06 au lieu de la semaine courante), et StoreMD n'a pas de fichier dispatch.
**Recommandation:** Distinguer les deux verrous restants : (1) **dates stales** dans `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` — seule modification nécessaire pour débloquer la timeline F+R ; (2) **création** de `saas-app-shopify/storemd/publication/batch-semaine.md` — nouveau fichier à créer pour les comptes StoreMD. Ces deux actions sont indépendantes et peuvent se faire dans n'importe quel ordre.
**Action:**
- Verrou 1 : Modifier les dates dans `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` (toutes les occurrences "22/06", "23/06", "24/06", "25/06", "26/06" → dates de la semaine cible)
- Verrou 2 : Créer `saas-app-shopify/storemd/publication/batch-semaine.md` avec les sections StoreMD extraites de `marketing/contenu/batch-semaine/batch-semaine-S15.md`
**Risques si ignoré:** Les PENDING incorrects continuent de masquer que F+R sont fonctionnels. Décisions retardées sur une mauvaise lecture de l'état.
