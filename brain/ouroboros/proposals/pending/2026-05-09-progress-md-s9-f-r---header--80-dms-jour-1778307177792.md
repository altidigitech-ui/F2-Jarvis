---
date: "2026-05-09"
timestamp: "2026-05-09T06:12:57.792Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** progress.md S9 F+R — header "80 DMs/jour" incohérent avec détail (50) et plan-30-jours
**Contexte:** `fabrice/tracking/progress.md` (ligne 4) et `romain/tracking/progress.md` (ligne 4) indiquent tous deux "Cold 80 DMs/jour" dans leur contexte d'en-tête S9. Mais le détail listé dans la même ligne est : TikTok 10 + Instagram 10 + Facebook 10 + LinkedIn 10 + Twitter 10 = **50 DMs**, pas 80. `fabrice/planning/plan-30-jours.md` confirme "Total : 50 DMs/jour" par persona. Le chiffre "80" semble être une estimation du total équipe F+R sans double-comptage StoreMD (30 F-perso + 30 R-perso + 20 StoreMD partagé = 80), mais écrit comme objectif individuel dans chaque fichier persona, il crée une ambiguïté directe : Fabrice croit-il son quota à 80 ou 50 ? Les compteurs "Cold envoyés S9 : 0" seront évalués contre un objectif flou dès lundi.
**Recommandation:** Corriger le header des deux fichiers avant le démarrage S9 lundi. Si l'objectif par persona est 50 (cohérent avec le plan et le détail), remplacer "80" par "50". Si l'objectif a été relevé à 80/personne, corriger le détail des 5 plateformes.
**Action:**
- Fichier: `fabrice/tracking/progress.md`
- Modifier ligne 4 : `Cold 80 DMs/jour` → `Cold 50 DMs/jour`
- Fichier: `romain/tracking/progress.md`
- Modifier ligne 4 : `Cold 80 DMs/jour` → `Cold 50 DMs/jour`
**Risques si ignoré:** Fabrice et Romain démarrent S9 lundi avec un objectif ambigu. Si chacun vise 80, le planning et le tracking divergent du plan-30-jours. Si chacun vise 50 mais que le fichier dit 80, l'avancement sera faussement sous-performant à chaque lecture.
