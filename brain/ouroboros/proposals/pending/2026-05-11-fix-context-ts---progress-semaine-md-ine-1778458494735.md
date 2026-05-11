---
date: "2026-05-11"
timestamp: "2026-05-11T00:14:54.737Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts — progress-semaine.md inexistant → alertes JARVIS définitivement muettes
**Contexte:** `context.ts` ligne ~378 lit `readRepo(\`${activePrefix}/progress-semaine.md\`)` pour alimenter `parseAlerts()`. Ce fichier **n'existe pas** — le vrai fichier est `${persona}/tracking/progress.md` (ex: `fabrice/tracking/progress.md`, 2KB, correctement initialisé S9). Résultat : `progressSemaine = ""` → `parseAlerts()` reçoit une chaîne vide → `alerts = []` → le tableau d'alertes dans JARVIS est **toujours vide**, même si un incident réel (suspension compte, DNS down) est documenté dans progress.md. Ce bug est distinct des proposals PENDING sur plan-hebdo.md — il n'est pas documenté dans les proposals existantes.
**Recommandation:** Modifier `context.ts` : remplacer `readRepo(\`${activePrefix}/progress-semaine.md\`)` par `readRepo(\`${activePrefix}/tracking/progress.md\`)`.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Ligne ~378 dans le `Promise.all` : remplacer `\`${activePrefix}/progress-semaine.md\`` par `\`${activePrefix}/tracking/progress.md\``
- Idem pour `otherPersona` si un chemin similaire est utilisé ailleurs dans le fichier
**Risques si ignoré:** Aucune alerte ne remontera jamais dans JARVIS — zéro visibilité en cas de suspension de compte, DNS down, ou autre incident critique. Le système de surveillance est aveugle.
