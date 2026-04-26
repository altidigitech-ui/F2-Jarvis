---
date: "2026-04-26"
timestamp: "2026-04-26T14:14:56.960Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** f2/plan-hebdo.md — Section 4 "CROSS-ENGAGEMENT F2→R+F" avec ⏳ : F2 ne croise pas proactivement
**Contexte:** La section 4 de `f2/plan-hebdo.md` s'intitule "CROSS-ENGAGEMENT F2→R+F" et affiche des ⏳ pour chaque jour (Lun→Ven, Couche A 15h05 et Couche B 20h05), suggérant que F2 a des tâches de cross-engagement actif à exécuter. Or `f2/cross-engagement-tracker.md` stipule explicitement : *"F2 est uniquement cible — il ne cross-engage pas proactivement. Les replies cross sur F2 sont dans les trackers F et R."* Contradiction notation/réalité.
**Recommandation:** Renommer la section 4 en "CROSS REÇUS PAR F2 (fait par F et R)" et remplacer les ⏳ par `—` ou une mention passive du type "F et R croisent F2 à 15h05/20h05", pour refléter que F2 n'a aucune action à prendre.
**Action:**
- Fichier: `f2/plan-hebdo.md`
- Section 4 titre: `"CROSS-ENGAGEMENT F2→R+F"` → `"CROSS SUR F2 (fait par F et R)"`
- Cellules de statut: remplacer les ⏳ par `—` (F2 n'exécute rien)
**Risques si ignoré:** Confusion à l'exécution — quelqu'un consultant le plan F2 pourrait croire F2 doit effectuer des cross chaque jour, alors que c'est une tâche de F et R.
