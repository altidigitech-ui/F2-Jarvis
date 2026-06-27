---
date: "2026-06-27"
timestamp: "2026-06-27T10:12:31.701Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte-deadline
**Titre:** Batch S16 — fenêtre de création ouverte AUJOURD'HUI (Samedi = jour canonique)
**Contexte:** Le PENDING "Batch S16 inexistant" a été créé mardi 24/06 quand S16 était "à 4 jours". Nous sommes samedi 27/06 : le plan-hebdo template l'indique explicitement ("Rempli au batch : [DATE SAMEDI]"). C'est le jour de création canonique du batch. Vérification directe de `marketing/contenu/batch-semaine/` : seulement `batch-semaine-S15.md` + `batch-template.md`, aucun S16. Lundi 29/06 démarre dans 48h avec 0 contenu, 0 dispatch F, 0 dispatch R, 0 dispatch StoreMD.
**Recommandation:** Lancer la création du batch S16 aujourd'hui même via JARVIS (`/generate-batch S16` ou demander directement au chat). Le template est à `marketing/contenu/batch-semaine/batch-template.md` (31KB, complet). Une fois le batch central créé, dispatcher en 3 fichiers : `fabrice/publication/batch-semaine.md`, `romain/publication/batch-semaine.md`, et le fichier StoreMD publication (chemin à confirmer).
**Action:**
- Source : `marketing/contenu/batch-semaine/batch-template.md`
- Créer : `marketing/contenu/batch-semaine/batch-semaine-S16.md`
- Puis dispatcher vers : `fabrice/publication/batch-semaine.md`, `romain/publication/batch-semaine.md`
**Risques si ignoré:** Lundi matin sans contenu pour F, R et StoreMD (5 plateformes × 2 personas + 4 comptes StoreMD). Zéro post S16. La semaine entière est bloquée.
