---
date: "2026-04-29"
timestamp: "2026-04-29T12:16:54.014Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Fix fabrice/progress-semaine.md — LinkedIn post 28/04 mislabeled "Twitter" + entrée F2 parasite
**Contexte:** Le plan-hebdo F prévoit un post **LinkedIn** Couche A à 17h30 le Mar 28/04 ("40+ stores scanned — ghost billing builder story"). Le cross-execution-log R confirme l'exécution : A5 = "F LinkedIn 17h30 — 40+ builder story" ✅ Fait ~17:55. Mais dans `fabrice/progress-semaine.md`, le post est loggé ainsi : (1) "Twitter post publié — '[A] 40+ stores scanned — ghost billing builder sto' — Post publié 18:36" → plateforme erronée (Twitter au lieu de LinkedIn) et heure décalée (18:36 au lieu de ~17:30). (2) Une seconde entrée identique "40+ stores scanned — ghost billing builder story — Post publié 20:21" — probablement le post F2 (FoundryTwo) loggé dans le fichier F par erreur.
**Recommandation:** (1) Corriger la ligne 18:36 : plateforme Twitter → LinkedIn, heure → ~17:30. (2) Supprimer ou déplacer la ligne 20:21 si elle correspond au post F2 (à vérifier avant suppression).
**Action:**
- Fichier: fabrice/progress-semaine.md
- Ligne 28/04 18:36 : `| Twitter | Post publié 18:36 |` → `| LinkedIn | Post publié ~17:30 |`
- Ligne 28/04 20:21 "40+ stores scanned — ghost billing builder story" : investiguer si c'est un post F2 → si oui, supprimer de ce fichier (appartient à foundrytwo/progress-semaine.md)
**Risques si ignoré:** Les compteurs de posts Twitter F sont gonflés (+1 faux), les posts LinkedIn F sont sous-comptés (-1). Le bilan S7 fin de semaine sera inexact.
