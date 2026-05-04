---
date: "2026-05-05"
timestamp: "2026-05-04T22:12:48.720Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** opportunity
**Titre:** S8 contenu vidéo J2 — 3 scans proactifs S7 = V5-V6-V7 prêts à filmer, zéro nouveau store nécessaire
**Contexte:** Le fichier `fabrice/pipeline-conversion.md` contient 3 stores scannés avec données réelles complètes (28/04) :
- **0foxShop** : 69/100 — robots.txt bloquant + 15 images sans alt text (DM envoyé @0foxShop)
- **the7letter** : 64/100 — robots.txt bloquant + HTML 791KB + server 1.5s (DM envoyé @the7letter_)
- **thelunarjeweler** : 72/100 — robots.txt bloquant + mixed content HTTP/HTTPS + 2 alt text (DM envoyé @moudoka1)

De plus, `fabrice/publication/BATCH-VIDEO-SOCIAL-S7.md` contient déjà la caption V3 complète (thelunarjeweler, zéro placeholder) — elle n'a pas été publiée le 01/05 et peut être postée telle quelle. V4 a un seul placeholder `[X_STORES]` à remplacer par "4" (stores scannés cette semaine).

S8 démarre avec V5-V12 à préparer mais 0 nouveaux scans disponibles. Les 3 scans S7 résolvent les 3 premiers slots sans aucune action de scanning supplémentaire.
**Recommandation:** Intégrer les 3 stores dans le BATCH-VIDEO-SOCIAL-S8 à créer :
- V5 → 0foxShop (angle : robots.txt bloquant + ghost billing, données 69/100)
- V6 → the7letter (angle : app bloat + JS fantôme, 791KB HTML, données 64/100)
- V7 → thelunarjeweler (caption déjà rédigée dans BATCH-VIDEO-SOCIAL-S7.md ligne 95-130, copier-coller direct)

Crée 3 jours de contenu S8 immédiatement disponibles dès que le plan-hebdo S8 est établi.
**Risques si ignoré:** Les 3 scans S7 restent des données dormantes. Quand le batch S8 sera créé, le réflexe sera de scanner de nouveaux stores alors que 3 contenus sont déjà prêts, ce qui ralentit le démarrage de la série vidéo.
