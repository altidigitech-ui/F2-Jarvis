# BLOC 3 — Docs & contenu : remap / cleanup / identité Jarvis — PLAN

> **Baseline :** repo26 (Bloc 2 clos). **Date plan :** 04/06/2026.
> **Méthode (inchangée Bloc 1/2) :** ce fichier = cartographie + découpage. Ensuite, pour CHAQUE sous-étape : audit ciblé (lignes exactes) → recap → **validation R** → 1 prompt Claude Code chirurgical → R pousse → vérif ZIP (diff + greps) → maj trackers.
> **Principe directeur :** découpage **PAR FICHIER** (toucher chaque doc une seule fois en traitant tous ses sujets), pas par chantier.

---

## 0. Périmètre

**3 chantiers, fusionnés par fichier :**
1. **Repoint `marketing-fr`/`marketing-en` → `marketing/{romain,fabrice,storemd}`** (skills voix refondus en B2.3b).
2. **Mort persona `@foundrytwo` "we"** sur Twitter/LinkedIn/PH + sections « gestion compte studio / dossier `f2/` ». Canon B2.X : **FoundryTwo = IH uniquement** (+ marque/hub/branding, qui restent légitimes).
3. **Ajout `/batch` `/archivage` `/recap`** à la liste de commandes de `CLAUDE.md`.
+ **Archivage** des 2 `system-prompt.md` obsolètes (anciens projets Claude séparés).
+ **Docs identité Jarvis** : définir le system-prompt Jarvis canonique.

**Fait découvert :** le dossier **`f2/` n'existe plus** dans le repo → toutes les refs « `f2/` = Compte studio @foundrytwo » et « voir `f2/system-prompt.md` » sont **100% mortes** (pointent dans le vide).

---

## 1. NE PAS TOUCHER (zones interdites / hors Bloc 3)

- **`brain/mempalace/`, `brain/ouroboros/`** (mémoire verbatim, Option A) · **`asset-brand/storemd/videos/`** (assets).
- **`backend/`** = Bloc 1 clos + plomberie Option-A f2 tolérée (`chat.ts:383` etc.). Ne pas toucher.
- **`ui/`** (8 fichiers : PersonaLayout, FileViewerModal, "MODE F2 ACTIF"…) = **Bloc 4**.
- **Refs « Mode F2 / toggle F2 » dans les docs = déplacées en Bloc 4** (cf. RECAP §8) : `JARVIS.md` (§"Mode F2" + l.31 toggle + l.317 dossier f2/), `JARVIS-ARCHITECTURE-COMPLETE.md`, `JARVIS-UPGRADE-PLAN.md`, `.claude/skills/jarvis-upgrade/SKILL.md:494`. *(`marketing/jarvis/prompts.md:42` finalement traité en B3.6 — décidé 04/06.)*
- **« FoundryTwo » comme nom de studio / marque / IH / hub / branding** = **LÉGITIME**, garder : titres `README.md`/`ARCH.md`, `la-toile/README.md`, `fabrice/VOIX.md:228` (IH), `VISUELS.md:169` (IH), `formats.md` §10 (BRAND-BIBLE, LOGO, palette), refs `asset-brand/FOUNDRYTWO-*`.
- **`F2-Jarvis`** (nom système, D5), **agents `f2-*`**, **skills `marketing/*`** = légitimes.
- **`BIBLE.md`** = audité, **aucune ref morte** → pas de modif.

---

## 2. Cartographie par fichier (lignes vérifiées repo26)

### Docs racine

**`README.md`** — sections mortes `f2/`/@foundrytwo (dossier `f2/` absent) :
- l.70 — arbre `├── f2/ ← Compte studio @foundrytwo (R gère)`
- l.111-115 — section `### Vous gérez @foundrytwo (R)` + `f2/context.md`, `f2/plan-hebdo.md`, `f2/{canal}/`
- l.147 — tableau `| f2/ | Complet |`

**`ARCH.md`** :
- l.73-74 — `marketing-en` (voix Fabrice) / `marketing-fr` (voix Romain) → repoint
- l.131 — arbre `├── f2 ← Compte studio @foundrytwo (R gère)`

**`CLAUDE.md`** :
- l.67 — `Compte studio @foundrytwo (publication F2)`
- l.76+ — section `### Compte studio @foundrytwo (F2)` (section entière)
- l.112 — arbre `├── f2/ ← Compte studio @foundrytwo (R le gère)`
- l.135 — `f2/context.md` dans tableau identité/voix
- l.163 — `Marketing : marketing-fr (voix Romain), marketing-en (voix Fabrice)` → repoint
- l.240 — `f2/context.md` dans principe "Voix séparées"
- **+ AJOUT** `/batch` `/archivage` `/recap` à la liste commandes (entre l.187 `/launch` et l.189 `/graphify-all`)

**`CLAUDE-JARVIS.md`** :
- l.46 — `Compte studio @foundrytwo (publication F2)`
- l.55+ — section `### Compte studio @foundrytwo (F2)`
- **+ doc identité Jarvis → sous-bloc B3.10**

### Marketing / Toile

**`marketing/contenu/formats.md`** (NE PAS toucher §10 branding) :
- l.133 — `Compte prioritaire : @foundrytwo (vitrine studio) > @FabGangi > @delgado_ro72224`
- l.328 — ligne tableau `@foundrytwo (F2) | Twitter, LinkedIn Page, IH, PH | "We" pluriel studio…`
- l.334 — `F2 : voix studio dans ../../f2/system-prompt.md` (chemin mort)

**`marketing/README.md`** :
- l.139 — `canaux/twitter/ — …@foundrytwo (F2)`
- l.140 — `canaux/linkedin/ — …page FoundryTwo (vitrine)`
- l.204 — ligne tableau `Compte studio F2 (@foundrytwo) | Twitter, LinkedIn Page, IH, PH | "We" pluriel`

**`marketing/jarvis/prompts.md`** :
- l.29 — `Compte qui poste : …F2 (foundrytwo)`
- l.65 — `5 posts Twitter @foundrytwo`
- l.161 — `Génère un tweet [@FabGangi / @delgado_ro72224 / @foundrytwo]`
- l.42 — `toggle ROMAIN/F2 … Mode F2` → **traité en B3.6** (tout le fichier d'un coup — décidé 04/06)

**`la-toile/la-toile.md`** :
- l.75-77 — `### 3.4 Compte F2 / FoundryTwo — vitrine minimale` + `@foundrytwo (Twitter EN, LinkedIn Company, IH, PH)`
- l.166 — `Bio Twitter F → mention de @foundrytwo`
- l.170 — `Comment perso F … mentionne discrètement Romain ou foundrytwo`
- (l.168 `Bio TikTok @storemd → mention F2` — à arbitrer : garder référence studio neutre ou retirer)

**`la-toile/README.md`** :
- l.26 — nœud périphérique `…F2/foundrytwo`

### Repoint marketing-fr/en (résiduels non-racine)

**`patterns/dual-llm-sonnet-haiku.md`** : l.119 — `Skill : .claude/skills/marketing-fr/SKILL.md`
**`.claude/skills/brand-voice/SKILL.md`** : l.29-30 — `marketing-fr` (Romain LinkedIn FR) / `marketing-en` (Fabrice Twitter/LinkedIn EN)

### Archivage

**`romain/system-prompt.md`** + **`fabrice/system-prompt.md`** — system prompts des anciens projets Claude séparés (cross-engagement + mode écosystème + @foundrytwo). Obsolètes → **archiver** (pas de cleanup ligne par ligne, on jette).

---

## 3. Découpage (par fichier — toucher une fois) + ordre proposé

| Sous-étape | Fichier(s) | Concern(s) | Type |
|---|---|---|---|
| **B3.1** | `README.md` | sections `f2/`/@foundrytwo mortes (l.70, 111-115, 147) | cleanup |
| **B3.2** | `ARCH.md` | marketing-fr/en (l.73-74) + arbre f2 (l.131) | cleanup |
| **B3.3** | `CLAUDE.md` | @foundrytwo/f2 (l.67, 76+, 112, 135, 240) + marketing-fr/en (l.163) + **ajout 3 commandes** | cleanup |
| **B3.4** | `marketing/contenu/formats.md` | @foundrytwo persona (l.133, 328, 334) — pas §10 | cleanup |
| **B3.5** | `marketing/README.md` | @foundrytwo (l.139, 140, 204) | cleanup |
| **B3.6** | `marketing/jarvis/prompts.md` | @foundrytwo (l.29, 65, 161) **+ toggle Mode F2 (l.42)** — tout le fichier | cleanup |
| **B3.7** | `la-toile/la-toile.md` + `la-toile/README.md` | @foundrytwo persona (§3.4, l.166, 170, 26) | cleanup |
| **B3.8** | `patterns/dual-llm-sonnet-haiku.md` + `.claude/skills/brand-voice/SKILL.md` | repoint marketing-fr/en | cleanup |
| **B3.9** | `romain/system-prompt.md` + `fabrice/system-prompt.md` | archivage (git mv → `archives/`) | archive |
| **B3.10** | `CLAUDE-JARVIS.md` (+ audit `chat.ts` buildSystemPrompt + `CLAUDE.md`) | **docs identité Jarvis** : system-prompt canonique | audit + **décision** |

**Ordre :** cleanups mécaniques d'abord (B3.1→B3.8), archivage (B3.9), puis le bloc identité/design en dernier (B3.10) car il demande une décision d'architecture.

---

## 4. Points à trancher AVANT exécution

**Edge-case `marketing/jarvis/prompts.md` (B3.6) — TRANCHÉ 04/06** : on traite TOUT le fichier en B3.6, l.42 (toggle Mode F2) comprise. Une seule passe. (Retiré de la liste Bloc 4.)

**B3.10 — docs identité Jarvis (le vrai morceau)** : il existe déjà 3 artefacts qui jouent ce rôle en partie — `backend/jarvis/src/routes/chat.ts` `buildSystemPrompt` (le system-prompt **live** injecté par l'app, nettoyé en B1.7), `CLAUDE.md` (lu par Claude Code), `CLAUDE-JARVIS.md` (doc identité). Avant d'écrire quoi que ce soit : **audit des 3** (qui dit quoi, qui lit quoi) → **décision d'architecture** (quel doc est canonique, comment les autres s'y rattachent) → écriture. **Ne pas créer un 4e doc qui chevauche les autres.** `BIBLE.md` = référence, pas de modif.

---

## 5. Avancement

- ⏳ **B3.1→B3.8** : cleanups — pas commencés.
- ⏳ **B3.9** : archivage — pas commencé.
- ⏳ **B3.10** : identité Jarvis — audit + décision à faire.

*Source de vérité : repo26 + ce plan + RECAP §8.*
