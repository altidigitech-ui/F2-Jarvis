---
date: "2026-04-26"
timestamp: "2026-04-26T06:11:37.621Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Renseigner baselines manquantes fabrice/progress-semaine.md avant J1 S7
**Contexte:** Le fichier `fabrice/progress-semaine.md` a 2 baselines vides dans le tableau "Métriques fin de semaine" : `Following Twitter F` (vide) et `Abonnés LinkedIn F` (vide). Les 2 autres métriques F sont renseignées (Followers TW = 29, Connexions LI = 13). Romain a ses 2 baselines remplies (24 followers TW, 135 abonnés LI). Sans baselines, les deltas de fin de semaine seront incalculables.
**Recommandation:** Avant lundi 27/04 matin, consulter le profil Twitter F et LinkedIn F pour noter les valeurs actuelles, puis les renseigner dans le fichier.
**Action:**
- Fichier: `fabrice/progress-semaine.md`
- Modifier: `|Following Twitter F | |` → `|Following Twitter F |[valeur réelle]| |`
- Modifier: `|Abonnés LinkedIn F | |` → `|Abonnés LinkedIn F |[valeur réelle]| |`
**Risques si ignoré:** Impossible de calculer la croissance LinkedIn et Following Twitter F en fin de S7. Le bilan S7 sera incomplet sur 2 métriques clés.
