# F2-Jarvis — BIBLE

> Principes non-négociables. Fabrice seul l'édite. Claude Code ne la modifie JAMAIS sans demande explicite.
> Lue à chaque session par Claude Code, Ouroboros, et tous les agents spécialisés.
> Si un principe change ici, c'est une décision stratégique qui mérite un DDR dans `strategie/`.

---

## Les 13 principes

### 1. ANTI-IA — règle #0
Aucun contenu publié ne doit échouer un détecteur IA (GPTZero, ZeroGPT, Originality). Voir `ANTI-IA.md`. Ban Reddit/LinkedIn/Facebook = compte grillé = semaines perdues.

### 2. TOILE — Altistone invisible
Altistone et la toile n'existent pas publiquement. Aucune mention dans posts, replies, cold outreach, ou docs publics. Voir `strategie/CONTEXT.md` et `la-toile/`.

### 3. Zéro donnée inventée
Pas de "many users", "great results", "impressive growth". Pas de fake testimonials. Exemples marqués comme tels. Templates avec placeholders.

### 4. Volume × Constance non-négociable
R : 30 interactions/jour + 10 cold outreach/jour + 7 posts/semaine. F : 30 interactions/jour + 10 cold outreach/jour + 5 posts/semaine.

### 5. Cible NON-dev uniquement
Jamais de produit pour codeurs. Le build in public peut exposer le code (angle F), mais le produit lui-même cible un non-dev.

### 6. Validation 48h obligatoire
Aucun build sans validation communauté : 10+ signups en 48h sur landing simple avant de coder.

### 7. Cadence 2 SaaS/mois
Le studio produit 2 SaaS/mois répartis sur 3 verticals (e-commerce, agences/freelancers, content creators).

### 8. Voix séparées R / F / F2
R, F, et F2 ont chacun leur vocabulaire exclusif. Ne jamais mélanger. Détails dans `romain/VOIX.md`, `fabrice/VOIX.md`, `f2/context.md`.

### 9. No-duplication parent-enfant
Chaque fichier hérite de son parent. Ne JAMAIS dupliquer le contenu du parent. En-tête obligatoire : `Hérite de : [parent]/context.md` + `Ce fichier contient : [ajouts uniquement]`.

### 10. Validation explicite pour tout changement opérationnel
Aucun fichier de contenu opérationnel (posts, décisions, plan hebdo, roadmap) créé/modifié/supprimé sans "validé", "go", ou "ok" explicite de Fabrice. L'infra AI (skills, hooks, debug) ne nécessite pas cette validation.

### 11. Budget incrémental plafonné 30 €/mois
Plan Anthropic Max 5x (100 $/mois ≈ 90 €). Budget incrémental hors plan plafonné à 30 €/mois. Détails dans `ops/budget/limits.yaml`.

### 12. Opus uniquement sur demande explicite
Haiku par défaut. Sonnet pour code/archi/créa. Opus uniquement si le prompt contient "opus", "ultrathink", "critical decision", ou `--model opus`. Jamais d'auto-escalade vers Opus.

### 13. Ouroboros reste bridé
Ouroboros lit tout le repo en read-only. Il écrit UNIQUEMENT dans `brain/ouroboros/proposals/`, `brain/ouroboros/diary/`, `brain/ouroboros/state/`. Jamais de commit, jamais de push, jamais d'API externe en write mode. Fabrice valide via `/review-proposals`.

---

*Version 2.0 — 19 avril 2026. Fabrice Gangi, owner.*
