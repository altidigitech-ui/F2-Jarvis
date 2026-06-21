---
date: "2026-06-22"
timestamp: "2026-06-21T22:14:08.529Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** batch-template.md — vérifier l'absence de "June 22" hardcodé avant création S15
**Contexte:** Le batch central S15 sera créé depuis `marketing/contenu/batch-semaine/batch-template.md` (31KB). Ce fichier est la référence pour tous les futurs batches. La charte offre S14 (batch-semaine-S14.md §43-53) était spécifique à la période "Pro free through June 22". Si le batch-template.md contient des références hardcodées à "June 22" ou à la copy promotionnelle spécifique (ex: "lock your price for life by June 22", "Pro's free through June 22"), elles contamineront S15 dès la création. Le batch-template.md n'a pas été lu durant ce cycle (budget préservé) — ce risque est non confirmé mais plausible vu la taille du fichier (31KB).
**Recommandation:** Avant de créer le batch S15 (décision pending), ouvrir `marketing/contenu/batch-semaine/batch-template.md` et faire un Ctrl+F sur "June 22" / "lock your price" / "free through". Si présent → remplacer par les hooks permanents de `offer_launch_marketing.md §7` : "See everything Pro finds. Free for 14 days. No card." / "Lock your price for life — in your first 30 days." / "Pay yearly, get 2 months free." Si absent → template propre, utiliser directement.
**Action:**
- Fichier à lire : `marketing/contenu/batch-semaine/batch-template.md`
- Rechercher : "June 22", "through June", "lock your price by"
- Si trouvé : remplacer par les 4 accroches permanentes de `offer_launch_marketing.md §7`
**Risques si ignoré:** Le batch S15 est créé avec une copy expirée hardcodée. Les posts de la semaine 22-28 juin portent une offre qui a pris fin le 22/06 à minuit. Découverte uniquement à la relecture du draft S15 — perte de temps.
