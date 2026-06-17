# 00 — PHASE RECO (à faire AVANT tout build)

> **Objectif :** dérisquer avant d'écrire une ligne. Claude Code lit les repos, confirme les inconnues, et remplit `reco-findings.md`. **Aucun build (plan.md Phases 1+) tant que ce fichier n'est pas rempli ET validé par toi.**
> Cette phase ne code rien — elle audite et confirme.

---

## TÂCHE A — Auditer les conventions de Jarvis

Lire `backend/jarvis/src/` et documenter **comment Jarvis fait déjà les choses**, pour que le nouveau code colle au lieu d'inventer :
- Jobs/queues : pattern dans `lib/queues.ts`, `worker.ts` (comment on déclare une queue, on enqueue, on chaîne).
- Routes : structure de `routes/` (comment on ajoute un endpoint — pour le webhook/IMAP listener).
- Supabase : `lib/supabase.ts` (client, service-role, comment on lit/écrit).
- Migrations : format dans `supabase-migrations/` (comment elles sont nommées/appliquées).
- Claude : client existant (`lib/claude-binary.ts`, `jarvis-tools.ts`) — réutiliser pour le compose.
- Pattern action-executor : si pertinent pour les jobs.

**Sortie :** une section "Conventions Jarvis à suivre" dans `reco-findings.md`.

---

## TÂCHE B — Confirmer le contrat du scan StoreMD (mur potentiel)

Lire `STOREMD/backend/` (route du free scan + `app/agent/preview/` + migration `007_preview_leads.sql`). Répondre précisément :
1. La route preview-scan est-elle **appelable de l'extérieur** par Jarvis, pour une **URL de boutique arbitraire** ?
2. **Auth** requise ? Liée à une **session Shopify / un shop installé** ?
3. **Sync ou async** (Celery) ? Si async : comment récupérer le résultat (polling `preview_scans` ? endpoint de statut ?).
4. Le résultat renvoie-t-il **score + findings** exploitables pour l'email ?

**Si la réponse à (1) est "non" → flag rouge :** la phase SCAN du plan ne tient pas. Proposer le minimum à ajouter côté StoreMD (un endpoint interne `POST /internal/preview-scan` protégé par clé) **avant** de continuer.

**Sortie :** section "Contrat scan StoreMD" + verdict GO/à-modifier.

---

## TÂCHE C — Valider le fournisseur d'envoi cold

Choisir un fournisseur d'infra cold (Maildoso / Mailforge / Zapmail) et confirmer : creds **SMTP + IMAP** utilisables par du code custom (pas seulement via Smartlead/Instantly), **warmup + DNS inclus**, prix/boîte, **cap d'envoi/jour** par boîte. NE PAS utiliser de boîte mail grand public (cold interdit → suspension, vérifié).

**Sortie :** fournisseur choisi + creds confirmés utilisables + cap/jour par boîte.

---

## TÂCHE D — Dépendances externes à lead-time long

Lister ce qui doit être **demandé maintenant** car l'approbation prend du temps (détail dans `02-SETUP-DEPS.md`) : API Meta (IG/FB), TikTok, LinkedIn. Identifier ce qui bloquerait le moteur réseaux.

**Sortie :** liste "À lancer en parallèle dès J0".

---

## RÈGLE DE SORTIE

`reco-findings.md` rempli (A→D) + validé par Alti = condition pour démarrer `plan.md`. Sinon on code sur des suppositions, et c'est exactement ce qu'on veut éviter.
