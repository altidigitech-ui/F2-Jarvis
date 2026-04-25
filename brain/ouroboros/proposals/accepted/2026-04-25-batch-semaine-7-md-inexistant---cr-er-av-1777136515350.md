---
date: "2026-04-25"
timestamp: "2026-04-25T17:01:55.350Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** BATCH-SEMAINE-7.md inexistant — créer avant lundi (archivage demain)
**Contexte:** Confirmation directe : `BATCH-SEMAINE-7.md` absent à la racine du repo (même chemin que `BATCH-SEMAINE-6.md`). La proposition précédente avait été acceptée mais jamais exécutée. Demain = archivage S6. Lundi 27/04 = J1 S7. Sans batch, les plans-hebdo F et R ne pourront pas être générés, le batch S6 a 2807 lignes de référence à la racine (`BATCH-SEMAINE-6.md`), le template est disponible dans `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`.
**Recommandation:** Ouvrir le chantier `BATCH-SEMAINE-7.md` aujourd'hui samedi ou demain matin avant archivage. Points clés à décider (issus du bilan S6 dans progress-semaine R + F) : continuation double-couche ou pivot ? Objectif cold S7 = 50R + 50F (templates déjà créés dans `romain/cold/COLD-TEMPLATES-S7.md` et `fabrice/cold/COLD-TEMPLATES-S7.md`). Cumul $ leaks S6 = $12,400 (référence canon S7 dans `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`).
**Action:**
- Fichier à créer : `BATCH-SEMAINE-7.md` (racine du repo)
- Base : copier la structure de `BATCH-SEMAINE-6.md` §0 (header) + `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`
- Pré-remplir les données connues : cold templates S7 déjà prêts, URL storemd inchangée, canon $12,400 leaks détectés S6
**Risques si ignoré:** Lundi J1 S7 démarre sans plan structuré. Les plans-hebdo F et R seront générés à l'aveugle ou ne seront pas générés du tout.


---
**Action accept par fabrice** : Continuation double couche 
