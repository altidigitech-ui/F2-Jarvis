---
date: "2026-07-15"
timestamp: "2026-07-15T04:13:23.714Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** `parseTimeline` en dead code — regex ne matche aucun fichier du repo, timeline structurellement vide depuis l'origine
**Contexte:** Audit `context.ts` ligne ~90. La fonction `parseTimeline` utilise le regex `^##\s+\d+[A-Za-z]?\.\s*(POSTS\s+\w+.*)` qui attendrait des sections comme `## 1. POSTS TWITTER 13h00`. Ce format n'existe dans aucun fichier du repo : `plan-hebdo.md` a `### Twitter F (@FabGangi)` (pas de numéro, pas de mot POSTS), et `batch-semaine.md` a `#### TW-F-S15-01 — F — Twitter — Lun 22/06 13h00`. Résultat : `parseTimeline` retourne systématiquement `[]` quel que soit le fichier fourni. Les PENDINGs existants "Fix context.ts" identifiaient le mauvais chemin et les dates stales comme causes — c'est vrai, mais même après correction de ces deux points, la timeline resterait vide à cause du format. C'est un troisième blocage en série, non documenté.
**Recommandation:** Réécrire `parseTimeline` (lignes ~90-130 de `backend/jarvis/src/routes/context.ts`) pour parser le format réel de `{persona}/publication/batch-semaine.md`. Le nouveau parser doit :
1. Lire `{persona}/publication/batch-semaine.md` (pas `plan-hebdo.md`)
2. Matcher les headers `#### ID — PERSONA — Platform — Jour DD/MM HH:MM`
3. Extraire : plateforme (ex : "Twitter"), date (ex : "22/06"), heure (ex : "13h00")
4. Filtrer par `date === today`
5. Extraire le titre depuis le premier bloc `**TEXTE :**` sous le header
6. Statut = "todo" par défaut (batch-semaine.md n'a pas de colonne statut)
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Modifier: fonction `parseTimeline` (lignes ~90 à ~130) — remplacer le regex `sectionRegex` par un parser adapté au format `#### TW-F-S15-01 — F (@FabGangi) — Twitter — Lun 22/06 13h00`
- Regex suggéré pour les headers : `/^####\s+[\w-]+\s+—[^—]+—\s+(Twitter|LinkedIn|Reddit|IH)\s+—\s+\w+\s+(\d{2}\/\d{2})\s+(\d{1,2})h(\d{2})/gm`
- Également corriger le `readRepo` dans `contextRoute` : remplacer `${persona}/planning/plan-hebdo.md` (1er élément du Promise.all) par `${persona}/publication/batch-semaine.md`
**Risques si ignoré:** La timeline reste vide même après résolution des PENDINGs "dates stales" et "mauvais chemin". Fix incomplet = effort gaspillé. La UI continuera de n'afficher que les objectifs cold/PH, jamais les posts planifiés.
