---
date: "2026-07-15"
timestamp: "2026-07-15T16:15:07.372Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Deadlock tranché — `offer_launch_marketing.md` prouve que l'offre S15 est evergreen, aucune expiration 19/07
**Contexte:** Le deadlock PENDING oppose "S15 expire 19/07" à "S15 evergreen". J'ai lu `marketing/saas-app-shopify/storemd/offer_launch_marketing.md` (section 4 "Combien de temps durent les offres"). L'offre de lancement comprend : 14 jours Pro offerts (dès install), prix bloqué à vie pendant le 1er mois de l'utilisateur (30 jours après son install), 2 mois offerts en annuel. Ce sont des **features permanentes du produit** — pas une campagne bornée dans le temps. Aucune date limite ne figure nulle part dans le document. La position "expire 19/07" n'a aucune base documentaire. Le contenu S15 qui parle d'offre de lancement reste valide en S19, S20 et au-delà.
**Recommandation:** (1) Clore le deadlock en faveur de "S15 evergreen". (2) Activer immédiatement le raccourci S19 : remplacer les dates S15 (22/06 → 26/06) par les dates S19 restantes (15/07 → 18/07) dans les 3 fichiers dispatch (F, R, StoreMD). Mer 15/07 peut encore être publié aujourd'hui. (3) Clore les PENDING "S15 expire 19/07" et "Deadlock auto-bloquant".
**Action:**
- Fichier: `fabrice/publication/batch-semaine.md` → remplacer les 5 dates Lun/Mar/Mer/Jeu/Ven 22-26/06 par 15/16/17/18/07 (publier Mer-Ven seulement, Lun+Mar S19 perdus)
- Fichier: `romain/publication/batch-semaine.md` → même remplacement dates
- Fichier: `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` → même remplacement dates
- Action humaine: /review-proposals → clore "Deadlock", "S15 expire 19/07", archiver "Raccourci S18" (périmé)
**Risques si ignoré:** S19 entière perdue (Mer-Ven encore publiables aujourd'hui et cette semaine). Le deadlock bloque sans raison depuis ~2 semaines sur une fausse urgence.
