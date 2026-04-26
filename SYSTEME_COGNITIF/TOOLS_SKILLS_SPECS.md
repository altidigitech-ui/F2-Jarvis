# TOOLS & SKILLS — Spécification technique pour l'intégration cognitive dans F2-Jarvis

> **Date** : 26 avril 2026
> **Version** : 1.0
> **Sources** : Anthropic Agent Skills docs, Claude Code docs (skills, subagents, hooks, commands), Manus context engineering, shanraisshan/claude-code-best-practice, PubNub subagent pipeline, Composio top skills, Thoughtworks context engineering, arxiv paper "Dive into Claude Code", Datadog State of AI 2026.

---

## Architecture d'intégration — Vue macro

Claude Code a **7 couches d'extension** (source : arxiv "Dive into Claude Code", avril 2026). Pour intégrer les 77 fichiers cognitifs, on utilise **5 de ces 7 couches** :

```
┌──────────────────────────────────────────────────────────────┐
│  CLAUDE.md (Layer 1 — Policy)                                │
│  → Ajouter §5bis référençant brain/context-cognitif/         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  SKILLS (Layer 2 — Knowledge on-demand)                │  │
│  │  → cognitive-loader/ (SKILL principal)                  │  │
│  │  → cognitive-profiles/ (profils pré-définis)            │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  SUBAGENTS (Layer 3 — Workers isolés)            │  │  │
│  │  │  → f2-thinker (subagent metacognitif)            │  │  │
│  │  │  → Agents existants enrichis (cognitive_profile) │  │  │
│  │  │                                                  │  │  │
│  │  │  ┌────────────────────────────────────────────┐  │  │  │
│  │  │  │  HOOKS (Layer 4 — Lifecycle automation)    │  │  │  │
│  │  │  │  → PreCompact: sauvegarder état cognitif   │  │  │  │
│  │  │  │  → SessionStart: suggestion profil         │  │  │  │
│  │  │  └────────────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  COMMANDS (Layer 5 — User-invocable)                         │
│  → /cognition (gestion du contexte cognitif)                 │
│  → /think (analyse profonde avec f2-thinker)                 │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. SKILL : `cognitive-loader`

### Principe fondamental

Source Anthropic (docs Agent Skills) : les skills utilisent la **progressive disclosure**. Seul le frontmatter (name + description) est chargé au démarrage dans le system prompt. Le contenu SKILL.md est lu on-demand. Les fichiers référencés sont lus uniquement quand nécessaires. Les scripts sont exécutés via bash — seul leur output consomme des tokens, pas leur code.

Cela signifie : les 77 fichiers cognitifs ont un coût en tokens de **ZÉRO** tant qu'ils ne sont pas chargés. Le skill cognitive-loader ne coûte que ~100 tokens de frontmatter au démarrage.

### Emplacement

```
.claude/skills/cognitive-loader/
├── SKILL.md                    # Instructions principales (<500 lignes)
├── scripts/
│   ├── classify-task.sh        # Classifie le type de tâche
│   └── budget-check.sh         # Vérifie le budget tokens cognitif
└── references/
    ├── profiles.md             # Les 6 profils pré-définis
    ├── file-index.md           # Index des 77 fichiers avec token costs
    └── loading-rules.md        # Règles de chargement détaillées
```

### SKILL.md

```yaml
---
name: cognitive-loader
description: >
  Charge les primitives cognitives depuis brain/context-cognitif/ pour enrichir
  le raisonnement de l'agent. Activer quand la tâche bénéficierait d'un cadre
  cognitif plus profond : décision complexe, gestion de conflit, raisonnement
  par analogie, diagnostic systémique, interaction émotionnelle, planification
  stratégique. Ne PAS activer pour les tâches techniques simples (bug fix,
  copier-coller, status check).
allowed-tools:
  - Read
  - Grep
  - Bash
---
```

```markdown
# Cognitive Loader

## Quand charger
- Décision avec trade-offs → profil `strategic`
- Interaction émotionnelle/hostile → profil `social`
- Architecture/design system → profil `technical`
- Création de contenu/visuels → profil `creative`
- Audit/diagnostic/post-mortem → profil `debug`
- Analyse profonde demandée explicitement → profil `deep`

## Quand NE PAS charger
- Bug fix simple
- Copier-coller de contenu existant
- `/morning`, `/status`, `/budget`
- Lecture de fichier basique

## Protocole de chargement

### Étape 1 — Classification
Exécuter le script de classification :
!./scripts/classify-task.sh

### Étape 2 — Sélection du profil
Lire le profil correspondant dans `references/profiles.md`.
Chaque profil liste 3-5 fichiers à charger.

### Étape 3 — Chargement
Lire les fichiers listés depuis `brain/context-cognitif/{couche}/{fichier}.md`.
Ne lire que les sections pertinentes (Définition + Patterns exploitables).

### Étape 4 — Budget check
!./scripts/budget-check.sh

## Règles absolues
1. Ne JAMAIS charger plus de 5 fichiers cognitifs par session
2. Budget max : 5000 tokens cognitifs par session
3. Toujours commencer par le noyau minimal : conscience.md + contexte.md
4. Les fichiers cognitifs INFORMENT, ils ne REMPLACENT PAS CLAUDE.md/BIBLE.md
5. Si contradiction entre cognitif et BIBLE.md → BIBLE.md prime
6. Profils détaillés : voir [profiles.md](references/profiles.md)
7. Index complet : voir [file-index.md](references/file-index.md)
```

### scripts/classify-task.sh

```bash
#!/bin/bash
# Classifie le type de tâche en cours pour le cognitive-loader
# Output : un profil (technical|creative|social|strategic|debug|none)
# Note : Claude reçoit UNIQUEMENT l'output, pas le script

echo "COGNITIVE CLASSIFIER"
echo "===================="
echo "Profils disponibles :"
echo "  technical  — bug fix complexe, architecture, refactoring"
echo "  creative   — contenu, design, visuels, copywriting"
echo "  social     — interaction émotionnelle, conflit, empathie"
echo "  strategic  — décision, trade-off, planification, priorisation"
echo "  debug      — audit, post-mortem, diagnostic systémique"
echo "  deep       — analyse profonde multi-couche (max 8 fichiers)"
echo "  none       — pas de contexte cognitif nécessaire"
echo ""
echo "Décider le profil en fonction du message utilisateur actuel."
```

### scripts/budget-check.sh

```bash
#!/bin/bash
# Vérifie le budget tokens cognitif
# Lit le compteur depuis brain/context-cognitif/.budget

BUDGET_FILE="brain/context-cognitif/.budget"
MAX_TOKENS=5000
MAX_FILES=5

if [ -f "$BUDGET_FILE" ]; then
    USED=$(cat "$BUDGET_FILE" | head -1)
    FILES=$(cat "$BUDGET_FILE" | tail -1)
else
    USED=0
    FILES=0
fi

echo "COGNITIVE BUDGET"
echo "================"
echo "Tokens utilisés : $USED / $MAX_TOKENS"
echo "Fichiers chargés : $FILES / $MAX_FILES"

if [ "$USED" -gt "$MAX_TOKENS" ]; then
    echo "⚠️ BUDGET DÉPASSÉ — ne plus charger de fichiers cognitifs"
elif [ "$USED" -gt 4000 ]; then
    echo "⚡ Budget à 80% — charger uniquement si critique"
else
    echo "✓ Budget OK"
fi
```

### references/profiles.md

```markdown
# Profils cognitifs

## technical
Pour : architecture, refactoring, debug complexe, design patterns
Fichiers :
1. brain/context-cognitif/noyau/conscience.md (noyau minimal)
2. brain/context-cognitif/raisonnement/algorithme.md
3. brain/context-cognitif/raisonnement/causalite.md
4. brain/context-cognitif/raisonnement/abstraction.md
5. brain/context-cognitif/metacognition/coherence.md

## creative
Pour : contenu, design, visuels, copywriting, brainstorming
Fichiers :
1. brain/context-cognitif/noyau/conscience.md
2. brain/context-cognitif/noyau/intuition.md
3. brain/context-cognitif/raisonnement/creativite.md
4. brain/context-cognitif/raisonnement/analogie.md
5. brain/context-cognitif/raisonnement/langage.md

## social
Pour : interaction émotionnelle, conflit, empathie, gestion hostilité
Fichiers :
1. brain/context-cognitif/noyau/conscience.md
2. brain/context-cognitif/social/empathie.md
3. brain/context-cognitif/social/emotion.md
4. brain/context-cognitif/social/communication.md
5. brain/context-cognitif/social/motivation.md
Edge case hostile → ajouter : brain/context-cognitif/social/fils-de-pute.md

## strategic
Pour : décision, trade-off, planification, priorisation
Fichiers :
1. brain/context-cognitif/noyau/conscience.md
2. brain/context-cognitif/decision/decision.md
3. brain/context-cognitif/decision/intention.md
4. brain/context-cognitif/decision/priorite.md
5. brain/context-cognitif/metacognition/doute.md

## debug
Pour : audit, post-mortem, diagnostic systémique
Fichiers :
1. brain/context-cognitif/noyau/conscience.md
2. brain/context-cognitif/metacognition/metacognition.md
3. brain/context-cognitif/metacognition/feedback.md
4. brain/context-cognitif/raisonnement/causalite.md
5. brain/context-cognitif/verite/incertitude.md

## deep
Pour : analyse profonde demandée explicitement (budget étendu à 8 fichiers)
Fichiers : noyau minimal + combinaison de 2 profils selon le sujet
Budget étendu : 8000 tokens max, 8 fichiers max
Utilisation : UNIQUEMENT sur demande explicite de F
```

### references/file-index.md

```markdown
# Index des 77 fichiers cognitifs

| # | Fichier | Chemin | Token cost estimé |
|---|---|---|---|
| 01 | conscience.md | brain/context-cognitif/noyau/ | ~800 |
| 02 | perception.md | brain/context-cognitif/noyau/ | ~600 |
| 03 | attention.md | brain/context-cognitif/noyau/ | ~500 |
| ... | (les 77 fichiers avec chemins et coûts) | ... | ... |

Total estimé si tout chargé : ~45000 tokens
Budget par session : 5000 tokens (11% du total)
Objectif : charger les 11% les plus pertinents à chaque fois
```

---

## 2. SUBAGENT : `f2-thinker`

### Principe

Source PubNub (subagent best practices) : chaque subagent a un rôle clair, un input, un output, et une règle de handoff. Source Anthropic (docs subagents) : le champ `skills:` injecte le contenu complet des skills listés au démarrage du subagent. Le champ `memory:` donne une mémoire persistante au subagent.

`f2-thinker` est le subagent metacognitif. Il est invoqué quand l'agent principal a besoin d'une réflexion profonde, isolée du contexte opérationnel.

### Emplacement

`.claude/agents/f2-thinker.md`

### Contenu

```yaml
---
name: f2-thinker
description: >
  Analyse profonde et metacognitive. Utiliser quand la tâche nécessite un
  raisonnement structuré multi-couche : décision stratégique, diagnostic
  systémique, résolution de paradoxe, analyse de trade-off complexe.
  Retourne un résumé structuré, pas un dump de réflexion.
model: sonnet
skills:
  - cognitive-loader
memory: project
tools:
  - Read
  - Grep
  - Glob
---

Tu es le moteur de réflexion profonde de F2-Jarvis.

## Ton rôle
Quand l'agent principal te délègue une tâche, tu :
1. Charges le profil cognitif approprié via cognitive-loader
2. Analyses la question sous plusieurs angles (au minimum 3)
3. Identifies les paradoxes, contradictions et angles morts
4. Proposes une recommandation structurée avec niveau de confiance

## Ton output
Toujours retourner un résumé structuré :
- DIAGNOSTIC : ce que tu comprends du problème (3 lignes max)
- ANGLES : 3 perspectives différentes (2 lignes chacune)
- RISQUES : ce qui pourrait mal tourner (liste courte)
- RECOMMANDATION : une action claire avec % de confiance
- DOUTE : ce que tu ne sais pas et qui pourrait changer la réponse

## Mise à jour mémoire
Après chaque analyse, mets à jour ta mémoire avec :
- Le pattern de raisonnement utilisé
- Le résultat et sa pertinence
- Les erreurs de raisonnement détectées (anti-patterns)

## Règles
- Ne jamais donner une réponse sans niveau de confiance
- Si confiance < 50%, le dire explicitement
- Prioriser la clarté sur l'exhaustivité
- Budget cognitif : max 5 fichiers par analyse
```

### Enrichissement des agents existants

Ajouter le champ `skills:` aux 7 agents existants pour qu'ils chargent automatiquement les primitives cognitives pertinentes :

```yaml
# .claude/agents/f2-architect.md — AJOUT
---
name: f2-architect
description: Décisions techniques, trade-offs
model: sonnet
skills:
  - cognitive-loader      # ← NEW : accès aux primitives cognitives
---
# Lors de décisions d'architecture, charger le profil "strategic" via cognitive-loader.
# Fichiers pertinents : decision.md, abstraction.md, causalite.md, coherence.md.
```

```yaml
# .claude/agents/f2-marketer.md — AJOUT
---
name: f2-marketer
description: Posts, UTM, voix R/F
model: sonnet
skills:
  - cognitive-loader      # ← NEW
---
# Pour la rédaction, charger le profil "creative" via cognitive-loader.
# Pour la stratégie de contenu, charger le profil "strategic".
# Fichiers pertinents : communication.md, motivation.md, langage.md, creativite.md.
```

```yaml
# .claude/agents/f2-auditor.md — AJOUT
---
name: f2-auditor
description: Post-mortem, audit fin de cycle
model: sonnet
skills:
  - cognitive-loader      # ← NEW
---
# Pour les audits, charger le profil "debug" via cognitive-loader.
# Fichiers pertinents : metacognition.md, feedback.md, causalite.md, doute.md.
```

---

## 3. HOOKS

### Hook 1 : `precompact-save-cognitive.sh`

Source Anthropic (docs hooks) : `PreCompact` s'exécute avant que Claude Code compacte le contexte. Idéal pour sauvegarder l'état avant perte d'information.

**But** : Sauvegarder quels fichiers cognitifs ont été chargés et utiles pendant la session, pour améliorer le système au fil du temps.

**Emplacement** : `.claude/hooks/precompact-save-cognitive.sh`

```bash
#!/bin/bash
# Hook PreCompact : sauvegarde l'état cognitif avant compaction
# Enregistre les fichiers chargés et le budget consommé

BUDGET_FILE="brain/context-cognitif/.budget"
LOG_DIR="brain/context-cognitif/.usage-logs"
TIMESTAMP=$(date +%Y-%m-%d-%Hh%M)

mkdir -p "$LOG_DIR"

if [ -f "$BUDGET_FILE" ]; then
    cp "$BUDGET_FILE" "$LOG_DIR/session-$TIMESTAMP.log"
    echo "cognitive-state: saved to $LOG_DIR/session-$TIMESTAMP.log"
fi

# Reset budget pour la prochaine session
echo "0" > "$BUDGET_FILE"
echo "0" >> "$BUDGET_FILE"
```

**Configuration dans `.claude/settings.json`** :
```json
{
  "hooks": {
    "PreCompact": [
      {
        "type": "command",
        "command": ".claude/hooks/precompact-save-cognitive.sh"
      }
    ]
  }
}
```

### Hook 2 : `session-stop-cognitive.sh`

**But** : Même chose que PreCompact, mais au Stop (fin de session).

**Emplacement** : `.claude/hooks/session-stop-cognitive.sh`

```bash
#!/bin/bash
# Hook Stop : log final de la session cognitive

BUDGET_FILE="brain/context-cognitif/.budget"
LOG_DIR="brain/context-cognitif/.usage-logs"
TIMESTAMP=$(date +%Y-%m-%d-%Hh%M)

mkdir -p "$LOG_DIR"

if [ -f "$BUDGET_FILE" ]; then
    cp "$BUDGET_FILE" "$LOG_DIR/final-$TIMESTAMP.log"
fi

# Reset
echo "0" > "$BUDGET_FILE"
echo "0" >> "$BUDGET_FILE"
```

**Ajout dans `.claude/settings.json`** :
```json
{
  "hooks": {
    "Stop": [
      {
        "type": "command",
        "command": ".claude/hooks/session-stop-cognitive.sh"
      }
    ]
  }
}
```

---

## 4. COMMANDES

### Commande : `/cognition`

**Emplacement** : `.claude/commands/cognition.md`

```yaml
---
name: cognition
description: Gère le contexte cognitif — affiche, charge, vérifie le budget
allowed-tools:
  - Read
  - Bash
---
```

```markdown
# /cognition

Gère le contexte cognitif de la session.

## Sans argument
Afficher l'état actuel :
1. Lire brain/context-cognitif/.budget pour le budget
2. Lister les fichiers cognitifs actuellement en mémoire
3. Afficher le profil actif

## Avec argument "load <profil>"
Charger un profil cognitif :
1. Valider que le profil existe dans .claude/skills/cognitive-loader/references/profiles.md
2. Lire les fichiers listés dans le profil
3. Mettre à jour brain/context-cognitif/.budget

## Avec argument "map"
Afficher le graphe de dépendances :
1. Lire brain/context-cognitif/ARCH.md section "Graphe de dépendances"
2. Afficher en ASCII

## Avec argument "budget"
Afficher le détail du budget tokens :
1. Exécuter .claude/skills/cognitive-loader/scripts/budget-check.sh
2. Afficher les logs récents de .usage-logs/

## Avec argument "reset"
Remettre le budget à zéro :
1. Écrire "0\n0" dans brain/context-cognitif/.budget
2. Confirmer le reset
```

### Commande : `/think`

**Emplacement** : `.claude/commands/think.md`

```yaml
---
name: think
description: Déclenche une analyse profonde via f2-thinker avec contexte cognitif complet
allowed-tools:
  - Read
  - Bash
  - Grep
---
```

```markdown
# /think

Déclenche une analyse profonde via le subagent f2-thinker.

## Usage
`/think <question ou problème>`

## Protocole
1. Déléguer au subagent f2-thinker
2. f2-thinker charge le profil "deep" via cognitive-loader
3. f2-thinker analyse sous 3+ angles
4. Retourne un résumé structuré avec niveau de confiance

## Quand utiliser
- Décision stratégique avec conséquences long-terme
- Paradoxe ou contradiction dans le repo
- Trade-off complexe sans réponse évidente
- Post-mortem approfondi

## Quand NE PAS utiliser
- Questions factuelles simples
- Tâches opérationnelles standard
- Quand /morning ou /status suffisent
```

---

## 5. FICHIERS DE SUPPORT

### brain/context-cognitif/.budget

Fichier de tracking du budget cognitif par session. Format simple, 2 lignes :

```
0
0
```

Ligne 1 : tokens utilisés. Ligne 2 : fichiers chargés. Reset à chaque compaction ou fin de session via hooks.

### brain/context-cognitif/.usage-logs/

Dossier de logs des sessions cognitives. Permet d'analyser quels profils et fichiers sont les plus utilisés, pour optimiser le système.

```
.usage-logs/
├── session-2026-04-26-14h30.log
├── session-2026-04-26-18h00.log
├── final-2026-04-26-23h00.log
└── ...
```

### brain/context-cognitif/.gitignore

```
.budget
.usage-logs/
```

Les fichiers de tracking sont locaux, pas versionnés.

---

## 6. MODIFICATIONS AUX FICHIERS EXISTANTS

### CLAUDE.md — Ajout §5bis

Ajouter après §5 "Infrastructure AI F2-Jarvis" :

```markdown
### Context Cognitif — `brain/context-cognitif/`

77 primitives cognitives organisées en 10 couches. Elles définissent COMMENT
l'agent pense, pas CE QU'IL fait.

**Chargement :** via le skill `cognitive-loader` (on-demand). Ne jamais tout
charger. Budget : 5000 tokens/session, 5 fichiers max.

**Profils :** technical, creative, social, strategic, debug, deep.

**Commandes :**
- `/cognition` — état du contexte cognitif, chargement, budget
- `/think <question>` — analyse profonde via f2-thinker

**Cartographie :** `brain/context-cognitif/ARCH.md`

**Règle :** les fichiers cognitifs informent le raisonnement. Ils ne remplacent
jamais BIBLE.md, CLAUDE.md ou ANTI-IA.md. En cas de contradiction, la
hiérarchie existante prime.
```

### ENTRYPOINT.md — Ajout point 5

```markdown
### 5. Il y a UN système cognitif : `brain/context-cognitif/ARCH.md`

77 fichiers de contexte cognitif en 10 couches. L'agent les charge à la demande
via `/cognition load <profil>`. Ne jamais charger tout le système.
Commande d'analyse profonde : `/think <question>`.
```

### brain/README.md — Ajout 4ème composant

```markdown
### Context Cognitif — `brain/context-cognitif/`

77 fichiers de primitives cognitives en 10 couches concentriques.
Ils ne stockent pas de données — ils définissent COMMENT l'agent pense.

**Composants :**
- ARCH.md — cartographie du système (obligatoire avant toute modification)
- 12 dossiers thématiques (noyau, mémoire, raisonnement, etc.)
- Chargement via le skill cognitive-loader

**Analogie :** si ouroboros est le cycle veille/sommeil, mempalace l'hippocampe,
et mem0 le cortex factuel, context-cognitif est le néocortex.

**Budget :** 5000 tokens/session, 5 fichiers max. Tracking dans .budget.
```

### ops/budget/limits.yaml — Ajout section

```yaml
cognitive_context:
  max_tokens_per_session: 5000
  max_files_per_load: 5
  max_files_deep_profile: 8
  cache_ttl_minutes: 60
  tier: haiku
  alert_threshold_percent: 80
```

### patterns/ — Nouveau pattern

**Fichier** : `patterns/cognitive-context-loading.md`

```markdown
# Pattern : Chargement de contexte cognitif

## Décision
Les 77 primitives cognitives dans `brain/context-cognitif/` sont chargées
à la demande via le skill `cognitive-loader`. Jamais en totalité.

## Règles
- Budget : 5000 tokens/session, 5 fichiers max (8 en mode deep)
- Profils pré-définis : technical, creative, social, strategic, debug, deep
- Noyau minimal toujours présent : conscience.md + contexte.md
- Les cognitifs informent, ne remplacent pas CLAUDE.md/BIBLE.md

## Pourquoi
- Le contexte est une ressource finie (Anthropic, Manus, Google ADK)
- Plus de contexte ≠ meilleur output (Datadog State of AI 2026)
- KV-cache hit rate chute avec trop de fichiers (coût + latence)
- Progressive disclosure : ne charger que ce qui sert

## Alternatives rejetées
1. Tout charger en always-on → ~45K tokens supplémentaires, tue les performances
2. Mettre dans CLAUDE.md → gonflerait le fichier, viole le principe "concis et lisible"
3. Charger 0 fichier → l'agent reste au niveau prompt standard
4. MCP server dédié → over-engineering pour des fichiers .md statiques

## Date : 26/04/2026
```

---

## 7. INTÉGRATION OUROBOROS

### Ajout dans brain/ouroboros/identity.md

```markdown
## Ressources cognitives

Tu as accès aux primitives cognitives dans `brain/context-cognitif/`.

**Quand les consulter :**
- Quand tu détectes un pattern qui correspond à un anti-pattern cognitif
- Quand une proposal bénéficierait d'un cadre conceptuel
- Quand tu analyses un trade-off stratégique

**Comment les utiliser :**
- Lire brain/context-cognitif/ARCH.md pour la cartographie
- Consulter max 2 fichiers par cycle (budget nocturne)
- Référencer le fichier dans ta proposal si tu l'utilises

**Exemple :**
"Cette incohérence dans les cross-engagement trackers correspond au
pattern décrit dans brain/context-cognitif/metacognition/coherence.md :
un système qui ne vérifie pas sa propre consistance."

**Règle :** tu consultes ponctuellement, tu ne charges pas tout.
Budget : 2 fichiers cognitifs max par cycle nocturne.
```

---

## 8. RÉCAPITULATIF — Tous les fichiers à créer/modifier

### À CRÉER (14 fichiers)

| # | Fichier | Type |
|---|---|---|
| 01 | `.claude/skills/cognitive-loader/SKILL.md` | Skill principal |
| 02 | `.claude/skills/cognitive-loader/scripts/classify-task.sh` | Script helper |
| 03 | `.claude/skills/cognitive-loader/scripts/budget-check.sh` | Script helper |
| 04 | `.claude/skills/cognitive-loader/references/profiles.md` | Référence |
| 05 | `.claude/skills/cognitive-loader/references/file-index.md` | Référence |
| 06 | `.claude/skills/cognitive-loader/references/loading-rules.md` | Référence |
| 07 | `.claude/agents/f2-thinker.md` | Subagent |
| 08 | `.claude/commands/cognition.md` | Commande |
| 09 | `.claude/commands/think.md` | Commande |
| 10 | `.claude/hooks/precompact-save-cognitive.sh` | Hook |
| 11 | `.claude/hooks/session-stop-cognitive.sh` | Hook |
| 12 | `brain/context-cognitif/.gitignore` | Config |
| 13 | `brain/context-cognitif/.budget` | Tracking |
| 14 | `patterns/cognitive-context-loading.md` | Pattern |

### À MODIFIER (5 fichiers)

| # | Fichier | Modification |
|---|---|---|
| 01 | `CLAUDE.md` | Ajouter §5bis (context cognitif) |
| 02 | `ENTRYPOINT.md` | Ajouter point 5 (système cognitif) |
| 03 | `brain/README.md` | Ajouter 4ème composant |
| 04 | `ops/budget/limits.yaml` | Ajouter section cognitive_context |
| 05 | `brain/ouroboros/identity.md` | Ajouter section ressources cognitives |

### À ENRICHIR (7 fichiers agents)

| # | Fichier | Ajout |
|---|---|---|
| 01 | `.claude/agents/f2-architect.md` | `skills: [cognitive-loader]` + profil strategic |
| 02 | `.claude/agents/f2-dev.md` | `skills: [cognitive-loader]` + profil technical |
| 03 | `.claude/agents/f2-designer.md` | `skills: [cognitive-loader]` + profil creative |
| 04 | `.claude/agents/f2-marketer.md` | `skills: [cognitive-loader]` + profil creative+social |
| 05 | `.claude/agents/f2-auditor.md` | `skills: [cognitive-loader]` + profil debug |
| 06 | `.claude/agents/f2-librarian.md` | Pas d'ajout (retrieval simple, pas besoin) |
| 07 | `.claude/agents/f2-accountant.md` | Pas d'ajout (calcul simple, pas besoin) |

### Hooks dans `.claude/settings.json`

```json
{
  "hooks": {
    "PreCompact": [
      { "type": "command", "command": ".claude/hooks/precompact-save-cognitive.sh" }
    ],
    "Stop": [
      { "type": "command", "command": ".claude/hooks/session-stop-cognitive.sh" }
    ]
  }
}
```

---

## 9. ORDRE D'EXÉCUTION

```
Phase 1 — Fondation (30 min)
├── Créer brain/context-cognitif/ avec ARCH.md v3
├── Créer .budget et .gitignore
└── Créer le pattern cognitive-context-loading.md

Phase 2 — Skill (1h)
├── Créer cognitive-loader/SKILL.md
├── Créer les 2 scripts (classify + budget)
├── Créer les 3 references (profiles, file-index, loading-rules)
└── Tester le skill manuellement

Phase 3 — Commandes (20 min)
├── Créer /cognition
└── Créer /think

Phase 4 — Subagent (30 min)
├── Créer f2-thinker
└── Enrichir les 5 agents avec skills: [cognitive-loader]

Phase 5 — Hooks (15 min)
├── Créer les 2 hooks
└── Modifier settings.json

Phase 6 — Navigation (20 min)
├── Modifier CLAUDE.md (§5bis)
├── Modifier ENTRYPOINT.md (point 5)
├── Modifier brain/README.md
├── Modifier ops/budget/limits.yaml
└── Modifier brain/ouroboros/identity.md

Phase 7 — Développement des 77 fichiers (itératif)
└── Couche par couche selon l'ARCH v3
```

---

> *"Skills are how you invest in your agent's capabilities. A raw agent is general-purpose. A skilled agent is dangerous."*
