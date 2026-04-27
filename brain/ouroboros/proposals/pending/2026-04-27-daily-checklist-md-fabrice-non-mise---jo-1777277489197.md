---
date: "2026-04-27"
timestamp: "2026-04-27T08:11:29.198Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** daily-checklist.md Fabrice non mise à jour depuis 04/04 — Couche B absente du workflow
**Contexte:** Le fichier `fabrice/daily-checklist.md` porte la date de dernière mise à jour "04 avril 2026" (3 semaines de retard). Il ne mentionne nulle part : la publication Couche B à 18h, les scans proactifs 6/jour, le cross B ≤5 min après R et F2, ni la publication LinkedIn Couche B à 21h. La section "BLOC 14h-17h" est marquée flexible et s'arrête là — le créneau 18h-21h (mer-sam) est complètement absent.
**Recommandation:** Ajouter un bloc "BLOC 18h-21h — COUCHE B (mer-sam uniquement)" dans fabrice/daily-checklist.md.
**Action:**
- Fichier : `fabrice/daily-checklist.md`
- Ajouter après le bloc "BLOC 14h-17h — BUILD + GESTION" :
  ```
  ## BLOC 18h-21h — COUCHE B (mer-sam uniquement) 🔴 NON NÉGOCIABLE

  - [ ] Publier post Couche B Twitter F (18h00)
  - [ ] Lancer scan proactif #1-#6 (6 scans/jour, URLs depuis comptes ecom/agency)
  - [ ] Cross-engagement B sur post R (19h05) et F2 (20h05) — dans les 5 min
  - [ ] Publier post Couche B LinkedIn F (21h00 si prévu ce jour)
  - [ ] Logger scans dans fabrice/pipeline-conversion.md
  ```
- Mettre à jour la date en en-tête : "Dernière mise à jour : 27/04/2026"
**Risques si ignoré:** Routine S7 incomplète dans le document de référence quotidien → risque d'oubli sur les créneaux Couche B en milieu de semaine quand la charge mentale est haute.
