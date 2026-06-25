---
date: "2026-06-25"
timestamp: "2026-06-25T18:13:08.917Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Fermer PENDING "Dispatch S15 non exécuté" — F et R confirmés dispatché, doublon avec PENDING #50
**Contexte:** Vérification directe des fichiers aujourd'hui (25/06) : `fabrice/publication/batch-semaine.md` (8KB, contenu S15 complet Lun 22→Ven 26/06) et `romain/publication/batch-semaine.md` (8KB, idem) existent et sont remplis. Le PENDING "Dispatch S15 non exécuté — batch central créé, 3 fichiers publication encore S14 — J4 à moitié récupérable" est devenu factuellement inexact : 2/3 du dispatch est fait. Le gap StoreMD est déjà documenté de façon plus précise dans PENDING #50 ("Dossier saas-app-shopify/storemd/publication/ absent").
**Recommandation:** Archiver le PENDING "Dispatch S15 non exécuté" via /review-proposals. Le laisser actif crée de la confusion : on croit le dispatch entier en attente alors que les fichiers F et R sont à jour.
**Risques si ignoré:** Sur 50 PENDING, ce doublon inexact bruite le triage. Une proposition mal libellée peut induire une re-exécution inutile du dispatch F/R.
