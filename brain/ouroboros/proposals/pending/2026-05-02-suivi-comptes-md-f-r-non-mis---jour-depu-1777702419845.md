---
date: "2026-05-02"
timestamp: "2026-05-02T06:13:39.846Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** suivi-comptes.md F+R non mis à jour depuis 04/04 — 4 semaines de lag
**Contexte:** `fabrice/suivi-comptes.md` et `romain/suivi-comptes.md` affichent "Dernière mise à jour : 04/04/2026". La routine stipule "mis à jour chaque vendredi à la revue" — les vendredis 11/04, 25/04, 02/05 (hier) ont été sautés. Conséquences visibles : (1) métriques périmées — Romain est passé de ~10 à 24+ followers Twitter depuis 04/04 (+140%), non reflété ; Fabrice est resté stable (~29) ; (2) le profil LinkedIn Fabrice note encore "connexions totales : À remplir" depuis 04/04 alors que progress-semaine indique "Connexions LinkedIn F : 13 début S7" ; (3) les comptes Tier ("À identifier via Grok") n'ont jamais été mis à jour bien que la stratégie ait évolué vers les merchants Shopify + agencies.
**Recommandation:** Mettre à jour les deux fichiers dans le batch S8 : reporter les métriques actuelles (followers, connexions, abonnés) et marquer les champs "À mettre à jour" comme ✅ ou les corriger.
**Action:**
- Fichier: fabrice/suivi-comptes.md — Mettre à jour la section Métriques Twitter (Followers: ~29, Following: ~76 d'après progress-semaine début S7) + la date "Dernière mise à jour" → 02/05/2026
- Fichier: romain/suivi-comptes.md — Mettre à jour Métriques Twitter Romain (Followers: ~24), LinkedIn connexions (135 abonnés, 9+ connexions envoyées S7) + date → 02/05/2026
**Risques si ignoré:** Décalage croissant entre la réalité des comptes et les fichiers de référence ; impossible de tracer la progression à la revue S8 sans baseline correcte.
