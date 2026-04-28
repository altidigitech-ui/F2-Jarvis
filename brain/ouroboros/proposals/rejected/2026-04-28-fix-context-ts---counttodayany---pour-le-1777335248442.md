---
date: "2026-04-28"
timestamp: "2026-04-28T00:14:08.442Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts — countTodayAny() pour le cold compte les lignes (17) au lieu des cibles uniques (10)
**Contexte:** Dans `backend/jarvis/src/routes/context.ts` ligne ~316 : `const cold = countTodayAny(coldLog, today)`. La fonction `countTodayAny` retourne `tableRows(content).filter(r => r[0]?.includes(today)).length` — elle compte **toutes les lignes** ayant la date du jour, sans déduplication. Sur le log Fabrice J1 S7 : 6 cibles sont présentes à la fois à 23h01 (cold-reply) et 23h08 (reply/scan_result) = multi-touches légitimes mais même personne → 15 rows Twitter + 2 LinkedIn = **17 affiché vs 10 réel** (confirmé par Fabrice hier soir). Overcounting de 70%.
**Recommandation:** Remplacer `countTodayAny` pour le cold par une fonction qui déduplique sur la colonne Cible (r[2] dans les sections Twitter et LinkedIn du cold-outreach-log).
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Ajouter une nouvelle fonction :
```ts
function countTodayUniqueCibles(content: string, today: string): number {
  if (!content) return 0;
  const seen = new Set<string>();
  for (const r of tableRows(content)) {
    if (!r[0]?.includes(today)) continue;
    const cible = (r[2] || "").trim().toLowerCase();
    if (cible && !/^cible/.test(cible)) seen.add(cible);
  }
  return seen.size;
}
```
- Remplacer ligne ~316 : `const cold = countTodayAny(coldLog, today);` → `const cold = countTodayUniqueCibles(coldLog, today);`
**Impact:** Compteur cold interface aligné avec COMPTEURS COURANTS (10 au lieu de 17). Zéro changement sur les logs.
**Risques si ignoré:** Interface surrépond le cold en permanence. Fabrice croit avoir fait 17 colds à 10h du matin alors qu'il en a fait 10. Biais sur les décisions de volume journalier.


---
**Action reject par romain** : Non le compteur reste comme sa si on n'en fait plus c'est pas grave.
