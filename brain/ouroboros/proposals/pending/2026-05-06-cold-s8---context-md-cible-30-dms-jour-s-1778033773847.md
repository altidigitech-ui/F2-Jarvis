---
date: "2026-05-06"
timestamp: "2026-05-06T02:16:13.849Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Cold S8 — context.md cible 30 DMs/jour sur 3 plateformes (Facebook nouveau canal) — zéro infrastructure créée
**Contexte:** `fabrice/context.md` (mis à jour le 02/05/2026) définit le cold à **30 DMs/jour : Twitter 10 + LinkedIn 10 + Facebook 10**. Le Facebook DM cold est un ajout S8 (absent en S7, où seul Twitter était couvert par `COLD-TEMPLATES-S7.md`). Les répertoires `fabrice/cold/` et `romain/cold/` ne contiennent **que `archives/`** — zéro template S8, zéro log de départ. Aujourd'hui : J3 S8, cold F = 0, cold R = 0. Sans fichiers templates, JARVIS ne peut pas assister les sessions cold ni logger les envois pour l'un ou l'autre des personas.
**Recommandation:** Créer a minima `fabrice/cold/COLD-TEMPLATES-S8.md` et `romain/cold/COLD-TEMPLATES-S8.md`. Les templates Twitter S7 archivés servent de base. La section Facebook DM est à créer ex nihilo (angle : DM aux merchants trouvés dans les groupes Shopify rejoints, pitch scan StoreMD).
**Action:**
- Créer : `fabrice/cold/COLD-TEMPLATES-S8.md` — adapter depuis `fabrice/cold/archives/` section Twitter + ajouter sections LinkedIn + Facebook DM
- Créer : `romain/cold/COLD-TEMPLATES-S8.md` — même structure
- Créer : log cold S8 minimal (ex: `fabrice/cold/cold-log-s8.md`) pour tracker les envois dès J3
**Risques si ignoré:** Cold reste à 0 malgré la priorité #1 définie dans context.md. Jeudi 07/05 (meilleur jour historique) arrive sans aucune infrastructure cold. La montée à 30/jour (×3 vs S7) ne peut pas démarrer sans templates pour les nouveaux canaux.
