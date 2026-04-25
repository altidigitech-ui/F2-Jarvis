---
date: "2026-04-25"
timestamp: "2026-04-25T21:20:57.484Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Timeline dashboard 25/04 affiche les posts Sam 02/05 (S7) — mapping jour par nom de jour, pas par date
**Contexte:** L'outil `timeline_today` retourne pour aujourd'hui (Sam 25/04, dernier jour S6) les posts `[A] Week scan summary: 22 stores, 22/22 ghost billing (13h)` et `[B] B4 — Spots urgency (6/10 gone, 4 left) (18h)`. Ces posts appartiennent à la ligne **Sam 02/05** du plan-hebdo S7. Le plan-hebdo F a déjà été basculé vers S7 (27/04→03/05). Le système mappe "Sam" du plan au "Sam" courant (25/04), sans vérifier que le samedi du plan est bien 02/05. Résultat : le dashboard suggère deux publications aujourd'hui qui ne sont prévues que dans 7 jours.
**Recommandation:** Soit (a) corriger le moteur de timeline pour matcher sur la date exacte (ex: "Sam 02/05") plutôt que sur le nom de jour seul, soit (b) ajouter une garde dans le code : si la date du plan (02/05) ≠ date courante (25/04), ne pas afficher le post dans la timeline du jour.
**Action:**
- Fichier à auditer: `backend/jarvis/src/routes/context.ts` (parsing plan-hebdo → timeline)
- Chercher: la logique qui mappe "Sam" → date courante
- Corriger: comparer la date complète (ex: "02/05") à la date courante avant d'inclure dans la timeline
**Risques si ignoré:** Pendant les 2 jours de transition (25-26/04), Fabrice ou Romain pourrait publier par erreur des posts S7 aujourd'hui. Crédibilité des posts impactée (timeline vide en S7 le 27/04, doublon le 02/05).
