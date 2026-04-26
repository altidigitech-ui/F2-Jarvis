---
date: "2026-04-26"
timestamp: "2026-04-26T13:19:17.723Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Baselines manquantes progress-semaine F — Following Twitter F et Abonnés LinkedIn F vides
**Contexte:** fabrice/progress-semaine.md tableau "MÉTRIQUES FIN DE SEMAINE" — 7 métriques sur 9 ont leur valeur de début de semaine renseignée. Deux lignes restent vides : "Following Twitter F" (aucune valeur) et "Abonnés LinkedIn F" (aucune valeur). Tous les autres baselines sont en place : Followers Twitter F = 29, Connexions LinkedIn F = 13, Signups = 1, MRR = €0, etc.
**Recommandation:** Renseigner les deux valeurs manquantes dès lundi matin avant le premier post, pour avoir un delta propre en fin de S7.
**Action:**
- Fichier: fabrice/progress-semaine.md
- Ligne "Following Twitter F" → ajouter la valeur réelle actuelle dans la colonne "Début semaine"
- Ligne "Abonnés LinkedIn F" → ajouter la valeur réelle actuelle dans la colonne "Début semaine"
**Risques si ignoré:** Delta Following/Abonnés LinkedIn impossible à calculer en fin de S7. Métrique de croissance audience F incomplète pour le bilan S7 → S8.
