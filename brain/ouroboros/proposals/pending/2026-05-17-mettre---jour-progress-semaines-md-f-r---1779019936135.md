---
date: "2026-05-17"
timestamp: "2026-05-17T12:12:16.135Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Mettre à jour progress-semaines.md F+R — header S10 (18/05-24/05) avant J1 lundi
**Contexte:** Les deux fichiers `fabrice/tracking/progress-semaines.md` et `romain/tracking/progress-semaines.md` affichent encore `# PROGRESS SEMAINE — Semaine du 11/05/2026 au 17/05/2026` (S9) avec le contexte "SEMAINE 9". J1 S10 démarre demain 18/05. Si les headers ne sont pas mis à jour, tous les événements de S10 seront loggés dans des fichiers labellisés S9 — les compteurs seront incohérents, les bilans par semaine impossibles. Ce n'est pas couvert par les PENDING existants : "Clôturer S9 R" couvre les événements manquants J5+sam, "Batch S10" couvre la production de contenu, mais aucun ne couvre la rotation du header de tracking.
**Recommandation:** Avant fin de journée aujourd'hui (ou au plus tard au démarrage de J1 lundi matin) :
1. Mettre à jour le header des deux fichiers → `Semaine du 18/05/2026 au 24/05/2026`
2. Remplacer `SEMAINE 9` par `SEMAINE 10` dans le champ Contexte
3. Vider les tableaux d'événements et remettre tous les compteurs à 0
**Action:**
- Fichier: `fabrice/tracking/progress-semaines.md`
  - Modifier ligne 1 : `# PROGRESS SEMAINE F — Semaine du 11/05/2026 au 17/05/2026` → `# PROGRESS SEMAINE F — Semaine du 18/05/2026 au 24/05/2026`
  - Modifier `**Contexte :** SEMAINE 9` → `SEMAINE 10` (mettre à jour le texte de contexte)
  - Vider le tableau ÉVÉNEMENTS NOTABLES + ANALYTICS
  - Remettre tous les compteurs COURANTS à 0
- Fichier: `romain/tracking/progress-semaines.md`
  - Même opération (header, contexte, événements, analytics, compteurs)
**Risques si ignoré:** Les logs S10 s'accumulent dans un fichier S9. Bilan semaine impossible à distinguer. Si la correction est faite en milieu de semaine, les premières entrées S10 seront perdues dans S9.
