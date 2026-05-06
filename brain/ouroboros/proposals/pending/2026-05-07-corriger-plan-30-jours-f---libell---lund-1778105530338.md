---
date: "2026-05-07"
timestamp: "2026-05-06T22:12:10.339Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Corriger plan-30-jours F — libellé "Lundi 05/05/2026" incorrect (05/05 est un mardi)
**Contexte:** `fabrice/planning/plan-30-jours.md` ligne 3 : "J1 = Lundi 05/05/2026 | J30 = Mercredi 03/06/2026". Le 05/05/2026 est un **mardi** (le lundi de cette semaine-là était le 04/05/2026). L'erreur est dans le libellé "Lundi", pas dans la date — la date 05/05 correspond probablement au premier jour effectif de travail disponible (après le week-end du 03-04/05).
**Recommandation:** Corriger le libellé en "J1 = Mardi 05/05/2026" pour éviter toute confusion dans les références temporelles de Jarvis.
**Action:**
- Fichier: `fabrice/planning/plan-30-jours.md`
- Modifier ligne 3 : `J1 = Lundi 05/05/2026` → `J1 = Mardi 05/05/2026`
**Risques si ignoré:** Confusion potentielle de Jarvis sur les calculs de jours (Jx) si le jour de la semaine est utilisé comme ancre. Impact faible mais réel sur la cohérence des logs.
