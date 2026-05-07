---
date: "2026-05-07"
timestamp: "2026-05-07T14:13:00.910Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** pipeline-conversion.md F — orphelin S7, aucune version S8 créée (J3 de S8)
**Contexte:** `fabrice/tracking/pipeline-conversion.md` est toujours labellisé "PIPELINE CONVERSION S7 — Fabrice", période "27/04/2026 au 03/05/2026". Le pipeline actif est vide (0 prospect, 0 beta spot claimé). Aucun fichier S8 équivalent n'existe. On est J3 du nouveau plan-30-jours (05/05-03/06) et les scans proactifs reprennent samedi J6. Sans fichier pipeline à jour, aucune conversion ne pourra être tracée.
**Recommandation:** Lors du batch samedi J6 (10/05), archiver `pipeline-conversion.md` dans `fabrice/tracking/archives/` et créer un nouveau `pipeline-conversion.md` labellisé S8 (05/05-03/06/2026) avec le compteur scans et beta spots remis à 0.
**Action:**
- Fichier: `fabrice/tracking/pipeline-conversion.md`
- Action: remplacer l'en-tête "PIPELINE CONVERSION S7 — Fabrice / Période : Semaine du 27/04/2026 au 03/05/2026" par "PIPELINE CONVERSION S8-S12 — Fabrice / Période : 05/05/2026 au 03/06/2026"
- Vider les lignes du pipeline actif (le déplacer dans les archives si Fabrice veut garder une trace)
- Remettre les métriques semaine à 0
**Risques si ignoré:** Les premiers scans proactifs S8 n'auront nulle part où être tracés. La progression vers les conversions sera invisible.
