---
date: "2026-06-21"
timestamp: "2026-06-21T10:12:47.330Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** code-fix
**Titre:** Objectifs cold/PH affichés le dimanche dans la timeline — `buildObjectives()` sans filtre weekend
**Contexte:** Aujourd'hui dimanche 21/06, la timeline des deux personas affiche "Cold: 0/35 aujourd'hui" et "PH: 0/6 aujourd'hui" comme OBJECTIF. La fonction `buildObjectives()` dans `context.ts` ne reçoit pas `dayName` en paramètre et ne filtre aucun jour de la semaine. Or les deux `plan-hebdo` précisent explicitement "50 DMs/jour **lun-ven**" et "PH 6 interactions/jour **lun-ven**". Le dimanche n'est pas un jour de cold planifié.
**Recommandation:** Passer `dayName` à `buildObjectives` et conditionner les objectifs :
```ts
function buildObjectives(totalCold, ph, publishedBy, dayName) {
  const isWeekday = ["lundi","mardi","mercredi","jeudi","vendredi"].includes(dayName);
  const items = [];
  if (isWeekday) items.push(mk("Cold", totalCold, 50));
  items.push(mk("PH", ph, PH_TARGET)); // PH potentiellement 7j/7 (à confirmer)
  return items;
}
```
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Modifier signature `buildObjectives` pour recevoir `dayName: string`
- Ajouter guard : ne push l'objectif cold que si `["lundi","mardi","mercredi","jeudi","vendredi"].includes(dayName)`
- Mettre à jour l'appel : `buildObjectives(totalCold, ph, publishedBy, dayName)`
**Risques si ignoré:** Fausse urgence le weekend. Fabrice voit 0/35 le dimanche et croit être en retard alors que le plan ne prévoit rien.
