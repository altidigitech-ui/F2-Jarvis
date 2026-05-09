---
date: "2026-05-10"
timestamp: "2026-05-09T22:13:43.939Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** code-fix
**Titre:** Fix parseObjectiveItems : cold target affiche 10 au lieu de 50 (section title mismatch)
**Contexte:** Lu dans `backend/jarvis/src/routes/context.ts` (~ligne 258) : `const coldSection = section(planHebdo, "COLD OUTREACH")`. La fonction `section()` cherche un titre contenant "COLD OUTREACH" mais dans `fabrice/planning/plan-hebdo.md` la section s'appelle `## 3. COLD — 50 DMs/jour lun-ven`. Aucune correspondance → `coldRows` vide → fallback hardcodé `return 10`. Résultat : une fois le bug de path résolu (PENDING), le widget cold affichera "X/10" au lieu de "X/50", et passera en "✅" après seulement 10 DMs au lieu de 50. Sur 250 DMs/semaine prévus, l'objectif sera atteint dès 50 (sous-comptage de 80%).
**Recommandation:** Modifier `context.ts` ligne ~258 : remplacer `section(planHebdo, "COLD OUTREACH")` par `section(planHebdo, "COLD")` pour matcher la section actuelle. Vérifier que le parser lit ensuite le total `50 DMs/jour` depuis le tableau de la section.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Modifier ligne ~258 : `const coldSection = section(planHebdo, "COLD OUTREACH")` → `const coldSection = section(planHebdo, "COLD")`
- Vérifier que le parser extrait la valeur 50 depuis les lignes `| 50 DMs/jour |` ou similaire dans la section
**Risques si ignoré:** Dashboard cold montre "✅ 10/10" dès les 10 premiers DMs. Fabrice et Romain ont l'illusion d'avoir atteint leur objectif journalier après seulement 20% du travail.
