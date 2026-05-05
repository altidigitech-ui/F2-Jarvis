---
date: "2026-05-05"
timestamp: "2026-05-05T10:12:56.884Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Créer S8 progress-semaine.md F+R — pollution imminente des données S7 si absent
**Contexte:** Aujourd'hui est S8 J1 (05/05/2026). Les deux fichiers `fabrice/progress-semaine.md` et `romain/progress-semaine.md` sont encore les fichiers S7 (en-tête "Semaine du 27/04 au 03/05/2026"). Si JARVIS logue un cold, un scan, ou un engagement aujourd'hui, l'événement sera inscrit dans les fichiers S7 — données d'archive contaminées. Les archives S7 elles-mêmes n'existent pas encore (PENDING séparé), mais même sans archivage, créer les fichiers S8 maintenant isole proprement les données.
**Recommandation:** Créer deux nouveaux fichiers progress-semaine.md pour S8 :
- `fabrice/progress-semaine.md` → remplacer par template S8 (semaine 05/05-11/05/2026)
- `romain/progress-semaine.md` → remplacer par template S8 (semaine 05/05-11/05/2026)

Pré-condition : archiver d'abord les fichiers S7 actuels dans `fabrice/archives/semaine-7-27-03-mai-2026/` et `romain/archives/semaine-7-27-03-mai-2026/` (sinon les données S7 sont écrasées).
**Action:**
- Fichier: `fabrice/progress-semaine.md` — remplacer l'en-tête S7 → S8 (Semaine du 05/05/2026 au 11/05/2026) + vider la table événements + réinitialiser les compteurs à 0
- Fichier: `romain/progress-semaine.md` — idem
- Pré-requis: copier les deux fichiers actuels dans leurs dossiers archives S7 respectifs avant toute modification
**Risques si ignoré:** Premier cold ou scan logué aujourd'hui atterrit dans le fichier S7. Quand l'archive S7 sera faite, les données S8 iront avec. Les compteurs S7 seront faussés. S8 démarre sans base propre.
