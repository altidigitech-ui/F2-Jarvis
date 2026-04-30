---
date: "2026-04-30"
timestamp: "2026-04-30T18:15:43.886Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Plan-hebdo F section 3B — V1+V2 TikTok/Instagram publiées le 30/04, table encore entièrement à 📅
**Contexte:** Progress-semaine du 30/04 12:33-12:34 logue 4 entrées : "Instagram — V1 StoreMD (Mer 29/04)" ✅, "TikTok — V1 StoreMD (Mer 29/04)" ✅, "Instagram — V2 StoreMD (Jeu 30/04)" ✅, "TikTok — V2 StoreMD (Jeu 30/04)" ✅. Les deux vidéos ont été batchées le **même matin** (30/04), pas en deux jours séparés. La table plan-hebdo affiche toujours Mer 29/04 📅|📅|📅 et Jeu 30/04 📅|📅|📅. Conséquence : la cadence réelle est V1+V2 → Jeu 30/04 (fait), V3 → Ven 01/05, V4 → Sam 02/05 (conforme à l'esprit d'Option A mais V2 avancée d'un jour). Note : colonne Facebook absente du batch entier — aucune publication loguée (voir proposal PENDING "Canal Facebook F").
**Recommandation:** Mettre à jour fabrice/plan-hebdo.md section 3B pour refléter l'état réel. Supprimer la ligne Mer 29/04 (date passée sans Facebook) et inscrire V1+V2 comme ✅ Publié 12:33 sur Jeu 30/04. Décaler V3 → Ven 01/05, V4 → Sam 02/05. Colonnes Facebook : laisser 📅 en attente de décision PENDING.
**Action:**
- Fichier : `fabrice/plan-hebdo.md`
- Section : `## 3B. SÉRIE VIDÉO — TIKTOK + INSTAGRAM + FACEBOOK`
- Remplacer la ligne `|Mer 29/04|V1 — scan live (awesomegnarlyworld ou nouvelle cible)|📅|📅|📅|` → `|Jeu 30/04|V1 — scan live|✅ Publié 12:33|✅ Publié 12:33|📅|`
- Remplacer la ligne `|Jeu 30/04|V2 — scan live|📅|📅|📅|` → `|Jeu 30/04|V2 — scan live|✅ Publié 12:34|✅ Publié 12:33|📅|`
- Remplacer la ligne `|Ven 01/05|V3 — scan live|📅|📅|📅|` → inchangé (V3 → Ven 01/05 ✓)
- Remplacer la ligne `|Sam 02/05|V4 — scan live|📅|📅|📅|` → inchangé (V4 → Sam 02/05 ✓)
**Risques si ignoré:** Le dashboard montre 0/12 vidéos publiées alors que 4 sont faites. Impossible de savoir où en est la série en cours de semaine.
