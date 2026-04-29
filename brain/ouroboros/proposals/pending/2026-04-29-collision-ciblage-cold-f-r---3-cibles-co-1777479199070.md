---
date: "2026-04-29"
timestamp: "2026-04-29T16:13:19.072Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Collision ciblage cold F+R — 3 cibles contactées deux fois le même jour (J1)
**Contexte:** En croisant `fabrice/cold/cold-outreach-log.md` et `romain/cold/cold-outreach-log.md`, trois cibles ont été contactées par F ET R le 27/04 :
- **@Philo01** : R DM 18h35 + F reply-cold 23h08
- **@stan_peev** : R DM 18h41 + F cold-reply 23h01 et 23h08 (deux fois)
- **@JustenEcom** : R DM 22h26 + F cold-reply 23h01 et 23h08

Deux comptes qui pitchent le même produit au même prospect le même jour = signal de spam ou impression de manque de coordination. @stan_peev (agency Shopify Plus Partner) est particulièrement risqué : double contact par deux inconnus avec le même angle le même soir.
**Recommandation:** Créer un fichier partagé `shared/cold-exclusion-list.md` (ou une section dans chaque cold log "Ne pas cibler — déjà touché par l'autre persona") et l'alimenter en début de chaque session. Règle opérationnelle : avant chaque session cold, consulter le cold log de l'autre persona pour la même semaine.
**Action:**
- Créer : `shared/cold-exclusion-list.md` (ou `ops/cold-exclusion-list.md`) avec les 3 cibles déjà en double
- Ajouter dans les deux `COLD-TEMPLATES-S7.md` une note "Vérifier cold log F/R avant session"
**Risques si ignoré:** Réputation de spam pour StoreMD auprès d'agences Shopify (verticale à fort potentiel de bouche-à-oreille négatif). Le problème va se reproduire à chaque cycle cold si aucun mécanisme de déduplication n'existe.
