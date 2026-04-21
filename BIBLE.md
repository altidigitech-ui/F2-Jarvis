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

### 3. Intégrité des données — lignes rouges et marges marketing

Règle révisée le 21/04/2026 (S6) après virage build-in-public → sales mode agressif.

**Lignes rouges — interdites dans tous les contenus (posts, replies, cold outreach, docs publics), sans exception :**

- **Faux MRR, faux revenue, faux nombre de clients payants.** Aucun chiffre business studio (MRR StoreMD, revenue FoundryTwo, installs payantes, ARR) ne doit être inventé ou gonflé. Ces métriques sont vérifiables par des tiers (Shopify App Store publicly listed revenue ranges, Twitter investigations, "where's the traction?" challenges). Mentir ici = compte grillé + crédibilité studio détruite + review Shopify refusée.
- **Testimonials directs verbatim inventés.** Aucune citation entre guillemets attribuée à un client, une agency, un merchant, qui n'aurait pas été reçue verbatim. "Agency owner told me..." OK si c'est reformulé. "Agency owner DM: 'Scanned 8 stores overnight, found $14,200 in leaks'" — INTERDIT sans le DM réel verbatim.
- **Noms d'entreprises clientes fictives.** Jamais de "Nike uses StoreMD", "Gymshark is our client", même en hypothèse. Zéro tolérance.
- **Faux process / faux produit.** Claim produit = vérifiable sur storemd.vercel.app. Si le post dit "43 checks in 60s across 5 modules", le produit doit effectivement faire ça. Pas d'inflation features.

**Marge marketing — acceptable dans les posts sales/marketing produit (StoreMD, ProfitPilot, SaaS futurs) :**

- **Statistiques agrégées e-com génériques.** "94% of Shopify stores have ghost billing", "average store loses $189/mo to zombie apps", "78% score below 60/100 on AI readiness" — cadence habituelle du marketing SaaS e-com. Ces chiffres servent de pattern de douleur, pas de métrique studio.
- **Scenarios illustratifs.** "A $40k/mo DTC brand with these exact issues", "An agency charging $1,800/mo for vanity audits" — pattern de merchant plausible, pas case study avec nom réel.
- **Volumes de scans présentés narratively.** "I scanned 47 stores this month" reste acceptable comme push marketing tant que la lecture moyenne du post n'induit pas un claim business studio vérifiable.

**Distinction stricte :** build-in-public (updates studio, plan hebdo public, MRR transparent, recap semaine) ≠ sales-mode produit. Les marges marketing du sales-mode ne s'appliquent JAMAIS au build-in-public. Si le post dit "nous avons X clients" ou "notre MRR est Y", c'est build-in-public, la règle stricte s'applique.

**Règle générale — pas de fake testimonial direct, pas de faux MRR, pas de nom client fictif. Le reste est tolérance marketing.**

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

*Version 2.1 — 21 avril 2026. Fabrice Gangi, owner.*
*Changelog : §3 révisé pour clarifier la distinction build-in-public (règle stricte) vs sales-mode produit (marges marketing tolérées). Lignes rouges formalisées : faux MRR, testimonials verbatim inventés, noms clients fictifs, faux claims produit.*
