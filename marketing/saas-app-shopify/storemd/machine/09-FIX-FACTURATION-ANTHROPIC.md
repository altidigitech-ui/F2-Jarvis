# 09 — FIX FACTURATION ANTHROPIC (Jarvis 100 % Agent SDK / abonnement)

> Objet : Jarvis a brûlé le crédit API (≈6€) et a mis OpenClaw à zéro (même compte). Cause : `ANTHROPIC_API_KEY` présent dans l'environnement Railway → le binaire Claude Code l'utilise et facture l'Agent SDK **au token** au lieu de l'abonnement.
> **Décision actée : Jarvis tourne 100 % sur l'Agent SDK / abonnement. AUCUNE clé API nulle part dans Jarvis.** Seul le compose du cold utilise une clé séparée.
> Tout ici est vérifié dans le code (`backend/jarvis/src/...`) et la doc Anthropic. Rien d'inventé.

---

## RÈGLE NON-NÉGOCIABLE
**`ANTHROPIC_API_KEY` ne doit JAMAIS exister dans l'environnement Railway de Jarvis**, et **aucun fichier de Jarvis ne doit la lire**.
Raison (doc officielle) : si `ANTHROPIC_API_KEY` est défini, Claude Code / l'Agent SDK l'utilise au lieu de l'abonnement → facturation API au token, silencieuse pour un backend.
Sources : https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan · https://code.claude.com/docs/en/authentication

---

## ÉTAT VÉRIFIÉ DU CODE

**Déjà sur l'Agent SDK (à garder tel quel) :**
- `src/routes/chat.ts` (chat) et `src/lib/ouroboros-cycle.ts` (cycle auto) → appellent l'Agent SDK via `query()` + le binaire Claude Code. Pattern de référence : `src/routes/chat.ts:446` (`for await (const msg of query({ prompt, options:{ systemPrompt, maxTurns, ... pathToClaudeCodeExecutable } }))`).

**3 appels en API directe qui lisent `ANTHROPIC_API_KEY` (tous en `claude-haiku-4-5`) — à corriger :**
1. `src/lib/jarvis-memory.ts:158` — compression/mémoire de Jarvis → **migrer vers le SDK**.
2. `src/lib/jarvis-tools.ts:1233` — outil MCP de Jarvis → **migrer vers le SDK**.
3. `src/lib/cold/jobs.ts:111` — compose du cold → **garder l'API directe, mais clé séparée** (`COLD_ANTHROPIC_API_KEY`).

---

## PARTIE 1 — ACTIONS RAILWAY / CONSOLE (toi, PAS Claude Code)

> ⚠️ ORDRE IMPÉRATIF. Le point 1 AVANT le point 2, sinon Jarvis perd toute auth et ne répond plus.

1. **Auth abonnement headless.** Sur une machine connectée à ton abonnement (Pro/Max) : `claude setup-token`. Mets la valeur dans Railway (Jarvis) sous **`CLAUDE_CODE_OAUTH_TOKEN`**. Vérifie qu'il est bien présent.
2. **Supprimer `ANTHROPIC_API_KEY`** des variables Railway de Jarvis → l'Agent SDK repasse sur l'abonnement, le burn s'arrête.
3. **Ajouter `COLD_ANTHROPIC_API_KEY`** (la clé API dédiée au compose cold).
4. **Console Anthropic** : fixer un **spend limit mensuel** (garde-fou). Recharger le crédit → OpenClaw, qui n'a rien consommé, répond de nouveau.
5. **Séparer les comptes/clés** OpenClaw vs Jarvis-cold (idéalement comptes distincts) pour qu'aucun ne vide l'autre.

---

## PARTIE 2 — TÂCHE CLAUDE CODE (code, repo Jarvis)

> Prompt à coller à Claude Code :

> Repo Jarvis. Objectif : **Jarvis 100 % Agent SDK / abonnement, zéro clé API côté Jarvis**. Qu'aucun code de Jarvis ne lise `process.env.ANTHROPIC_API_KEY`. Sur une nouvelle branche, sans merger :
>
> 1. **`src/lib/jarvis-memory.ts` (~ligne 158)** : remplace l'appel HTTP direct à `https://api.anthropic.com/v1/messages` (qui lit `ANTHROPIC_API_KEY`) par un appel via l'**Agent SDK** (`query()` de `@anthropic-ai/claude-agent-sdk`), en suivant le pattern de `src/routes/chat.ts:446` : passe le prompt existant, récupère le texte des blocs `assistant`, et garde la même signature/retour de la fonction. Utilise `resolveClaudeBinary()` + `pathToClaudeCodeExecutable` comme ailleurs. `maxTurns: 1` suffit (pas d'outils nécessaires pour une compression).
> 2. **`src/lib/jarvis-tools.ts` (~ligne 1233)** : idem — remplace l'appel HTTP direct par un appel Agent SDK `query()` (même pattern), même comportement de sortie. Pas de clé API.
> 3. **`src/lib/cold/jobs.ts` (~ligne 111)** : garde l'appel HTTP direct (compose cold en Haiku) mais lis **`process.env.COLD_ANTHROPIC_API_KEY`** au lieu de `ANTHROPIC_API_KEY`. Si absente, lève une erreur claire (`[cold/jobs] COLD_ANTHROPIC_API_KEY manquante`).
> 4. **NE TOUCHE PAS** `src/routes/chat.ts`, `src/lib/ouroboros-cycle.ts`, `src/lib/claude-binary.ts`.
> 5. Contrôle final : `grep -rn "ANTHROPIC_API_KEY" backend/jarvis/src` ne doit renvoyer **plus aucune** occurrence (seul `COLD_ANTHROPIC_API_KEY` est autorisé, qui est une autre chaîne).
> 6. typecheck, branche + PR, ne merge pas. Donne le lien.
>
> Si un détail du pattern SDK n'est pas clair dans `chat.ts`, arrête-toi et demande — n'invente pas l'API du SDK.

---

## VARIABLES RAILWAY (Jarvis) — AVANT / APRÈS

**AVANT (le problème) :**
- `ANTHROPIC_API_KEY = sk-ant-...`  ← capté par le SDK → burn au token

**APRÈS (cible) :**
- `CLAUDE_CODE_OAUTH_TOKEN = ...`        ← abonnement, headless (tout Jarvis : chat, ouroboros, mémoire, outils)
- `COLD_ANTHROPIC_API_KEY = sk-ant-...`  ← UNIQUEMENT le compose cold
- **PAS de `ANTHROPIC_API_KEY`** (absente = règle non-négociable)

---

## VÉRIFICATION (après déploiement)
- Parler à Jarvis (chat) **ne fait pas monter** l'usage API dans la console Anthropic → il est sur l'abonnement.
- Déclencher la mémoire / l'outil migré **ne fait pas monter** l'usage API non plus.
- `grep -rn "ANTHROPIC_API_KEY" backend/jarvis/src` → **0** (hors `COLD_ANTHROPIC_API_KEY`).
- Le compose cold fonctionne via `COLD_ANTHROPIC_API_KEY` (test 1 prospect).
- OpenClaw répond de nouveau (crédit rechargé).

## GARDE-FOUS PERMANENTS
- Spend limit mensuel dans la console Anthropic.
- Comptes/clés séparés OpenClaw vs Jarvis-cold.
- Si l'ouroboros tourne en automatique sur l'abonnement : surveiller la fréquence (un cycle agentique répété peut épuiser l'allocation abonnement). Le passer en déclenchement manuel si ce n'est pas indispensable.
