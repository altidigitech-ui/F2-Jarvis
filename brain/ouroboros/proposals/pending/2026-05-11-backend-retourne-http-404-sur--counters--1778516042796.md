---
date: "2026-05-11"
timestamp: "2026-05-11T16:14:02.796Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte technique
**Titre:** Backend retourne HTTP 404 sur /counters + /timeline — backend potentiellement down
**Contexte:** Ce cycle, les appels MCP `counters_today` et `timeline_today` (fabrice et romain) retournent "fetch error 404". Ce symptôme est **distinct** des bugs de paths (ceux-ci retourneraient du JSON avec des compteurs à 0, pas un 404 HTTP). Un 404 signifie soit : (a) Railway backend non running, (b) route `contextRoute` non montée dans app.ts/server.ts, (c) URL utilisée par les MCP tools ne correspond plus à l'URL déployée après un refactor. La fonction `contextRoute` dans context.ts ne retourne jamais de 404 explicitement — le 404 vient d'en amont.
**Recommandation:** Vérifier dans cet ordre : (1) logs Railway — est-ce que le backend tourne ? (2) vérifier dans `backend/jarvis/src/app.ts` ou `server.ts` que `contextRoute` est bien montée sur `/api/context` ou l'endpoint attendu. (3) si refactor récent → mettre à jour l'URL dans la config MCP.
**Risques si ignoré:** JARVIS est aveugle (counters, timeline, alertes tous à zéro) même après fix des paths. Phase 2 démarre aujourd'hui sans aucune visibilité dashboard.
