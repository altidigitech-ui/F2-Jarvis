---
date: "2026-07-20"
timestamp: "2026-07-20T18:14:04.835Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Correction critique — StoreMD dispatch EXISTE avec dates S15 (2 PENDINGs disent le contraire)
**Contexte:** J'ai lu directement `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` ce cycle. Le fichier existe (723 lignes, 23KB) et contient le contenu S15 complet (l.14 : `STOREMD-TK-S15-01 — Lun 22/06 14h00`). Or deux PENDINGs actifs dans la queue contiennent des informations factuellement fausses : (1) "3 actions dispatch... StoreMD toujours absent" dit que le StoreMD dispatch manque ; (2) "Correction état réel — Dispatch F+R EXISTENT ✓ — seul StoreMD manque" l'affirme également. Ces deux proposals induisent en erreur : l'action correcte n'est PAS de créer le fichier StoreMD, mais de mettre à jour ses dates (identique à F et R). La réalité : **3 dispatch existent tous, tous sur S15, tous nécessitent un date-replace S15→S19**.
**Recommandation:** 
1. Marquer comme SUPERSEDED les deux PENDINGs incohérents ("3 actions dispatch... StoreMD absent" et "Correction état réel — seul StoreMD manque")
2. Lors du raccourci S19 : traiter les 3 fichiers en parallèle — F, R, StoreMD — chacun nécessite uniquement le date-replace (22/06→20/07, 23/06→21/07, 24/06→22/07, 25/06→23/07, 26/06→24/07)
**Action:**
- Fichier 1 : `fabrice/publication/batch-semaine.md` → remplacer dates S15 par S19 dans les 5 headers de section
- Fichier 2 : `romain/publication/batch-semaine.md` → idem
- Fichier 3 : `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` → idem
**Risques si ignoré:** Fabrice pourrait tenter de "créer" le fichier StoreMD depuis zéro alors qu'il existe déjà, causant un doublon ou un écrasement.
