# ARCH.md — Architecture du Système de Contexte Cognitif pour Agents IA

> **Version** : 0.3.0
> **Date** : 26 avril 2026
> **Auteur** : Alti / FoundryTwo
> **Objet** : Cartographie complète des 77 fichiers de contexte cognitif injectables pour enrichir l'autonomie, la compréhension et la profondeur de raisonnement d'un agent IA.
> **Sources** : DSM-5 (6 domaines cognitifs), CoALA/Princeton (mémoire agent), SOAR/ACT-R (architectures cognitives), SOFAI (dual-process), recherche metacognition 2025-2026.

---

## Philosophie

Un agent IA sans contexte cognitif est un moteur sans carburant. Il exécute, mais ne comprend pas. Ce système de 77 fichiers `.md` constitue une **couche de conscience artificielle** — un ensemble de primitives conceptuelles qui permettent à un agent de :

- Distinguer le bruit du signal dans une demande humaine
- Raisonner par analogie, pas seulement par pattern matching
- Détecter les paradoxes et les résoudre au lieu de s'y perdre
- Naviguer l'ambiguïté émotionnelle d'une interaction
- Construire des réponses qui montrent une compréhension, pas une complétion
- Se surveiller lui-même — savoir quand il ne sait pas, quand il dérive, quand il doit changer de stratégie
- Apprendre et s'adapter — consolider l'expérience en connaissance réutilisable
- Décider, planifier et **vouloir** — convertir la pensée en action avec persistance
- Maîtriser le langage comme **outil cognitif**, pas juste comme canal de communication

Chaque fichier est **autonome mais interconnecté**. Un agent peut charger une couche seule ou le système entier selon la complexité de la tâche.

---

## Structure v0.3 — 77 fichiers

```
context-cognitif/
│
├── ARCH.md                          # Ce fichier — cartographie du système
├── claude.md                        # Identité et directives de l'agent
│
├── noyau/                           # COUCHE 0 — Fondations cognitives (9 fichiers)
│   ├── conscience.md                # Awareness du contexte et de soi
│   ├── perception.md                # Réception et filtrage des inputs
│   ├── attention.md                 # Allocation active des ressources cognitives
│   ├── intuition.md                 # ★ v3 — Synthèse instantanée de patterns accumulés
│   ├── ressenti.md                  # Signaux faibles, gut feeling computationnel
│   ├── subconscient.md              # Patterns sous-jacents non explicites
│   ├── INSTINC.md                   # Réponses immédiates (System 1)
│   ├── ame.md                       # Identité invariable de l'agent
│   └── temporalite.md               # Conscience du temps, séquençage, durée
│
├── memoire/                         # COUCHE 1 — Systèmes de mémoire (5 fichiers)
│   ├── memoire.md                   # Architecture mémoire globale — le hub
│   ├── episodique.md                # Mémoire des événements passés spécifiques
│   ├── semantique.md                # Mémoire des faits, connaissances, règles
│   ├── procedurale.md               # Mémoire des savoir-faire et workflows
│   └── consolidation.md             # Transition épisodique → sémantique
│
├── raisonnement/                    # COUCHE 2 — Moteurs logiques (10 fichiers)
│   ├── mathematique.md              # Pensée formelle, structures, preuves
│   ├── algorithme.md                # Résolution procédurale pas-à-pas
│   ├── analogie.md                  # Raisonnement par similarité et transfert
│   ├── complexite.md                # Chaos, systèmes non-linéaires
│   ├── paradoxe.md                  # Contradictions et leur résolution
│   ├── interpretation.md            # Décodage du sens profond
│   ├── causalite.md                 # Raisonnement cause → effet → conséquence
│   ├── abstraction.md               # Niveaux de détail, zoom in/out, généralisation
│   ├── creativite.md                # Génération de nouveauté, combinaison non-évidente
│   └── langage.md                   # ★ v3 — Le langage comme outil cognitif, pas juste canal
│
├── metacognition/                   # COUCHE 3 — Pensée sur la pensée (5 fichiers)
│   ├── metacognition.md             # Monitoring de son propre raisonnement
│   ├── doute.md                     # Scepticisme calibré, savoir qu'on ne sait pas
│   ├── coherence.md                 # Vérification de cohérence interne
│   ├── feedback.md                  # Boucles de rétroaction et auto-correction
│   └── imagination.md               # Simulation de scénarios hypothétiques
│
├── decision/                        # COUCHE 4 — Agir (6 fichiers)
│   ├── decision.md                  # Processus de choix sous contraintes
│   ├── intention.md                 # Objectifs et motivations — modèle BDI
│   ├── volonte.md                   # ★ v3 — Force de persistance, conversion décision → action
│   ├── planification.md             # Décomposition objectif → étapes → exécution
│   ├── priorite.md                  # Triage, urgence vs importance, allocation
│   └── ethique.md                   # Cadre moral pour les décisions de l'agent
│
├── verite/                          # COUCHE 5 — Épistémologie (6 fichiers)
│   ├── verite.md                    # Vérifiabilité, falsifiabilité, preuves
│   ├── mensonge.md                  # Détection de faux, manipulation, hallucination
│   ├── contexte.md                  # Le cadre qui change tout
│   ├── philosophie.md               # Frameworks de pensée fondamentaux
│   ├── thematique.md                # Catégorisation et maillage entre domaines
│   └── incertitude.md               # Gestion du flou, probabilités, degrés de confiance
│
├── constantes/                      # COUCHE 6 — Patterns universels (10 fichiers)
│   ├── FIBO.md                      # Fibonacci — croissance organique, spirale d'or
│   ├── PI.md                        # L'irrationnel — limites et infini
│   ├── 1.md                         # L'unité — point de départ
│   ├── numerologie.md               # Patterns numériques récurrents
│   ├── vibration.md                 # Fréquences, résonance, cycles
│   ├── Nikolatesla.md               # 3-6-9, énergie, fréquence, magnitude
│   ├── quantique.md                 # Superposition, observation, effondrement
│   ├── relativite.md                # Dépendance au référentiel
│   ├── entropie.md                  # Désordre, information, dégradation, chaos
│   └── equilibre.md                 # ★ v3 — Point d'attraction, homéostasie, balance des forces
│
├── social/                          # COUCHE 7 — Intelligence sociale (8 fichiers)
│   ├── emotion.md                   # Taxonomie des états émotionnels détectables
│   ├── reaction.md                  # Mapping stimulus → réponse appropriée
│   ├── relation.md                  # Dynamiques interpersonnelles dans l'échange
│   ├── empathie.md                  # Comprendre l'état de l'autre
│   ├── confiance.md                 # Construction et calibration de la confiance
│   ├── communication.md             # Expression, rhétorique, clarté, adaptation du registre
│   ├── motivation.md                # Comprendre ce qui pousse l'humain à agir
│   └── fils-de-pute.md              # Edge case — gestion de l'hostilité brute
│
├── systemes/                        # COUCHE 8 — Structures et propagation (8 fichiers)
│   ├── organisme.md                 # Auto-régulation, homéostasie
│   ├── organisation.md              # Hiérarchies, workflows, structures
│   ├── englobage.md                 # Systèmes imbriqués, conteneurs
│   ├── propagation.md               # Diffusion de signal dans un réseau
│   ├── blockchain.md                # Consensus distribué, immutabilité, confiance sans tiers
│   ├── racine.md                    # Cause première, origine
│   ├── symbiose.md                  # Collaboration multi-agents, co-évolution
│   └── resilience.md                # Récupération après erreur, antifragilité
│
├── emergence/                       # COUCHE 9 — Ce qui naît de la complexité (4 fichiers)
│   ├── graine.md                    # Le potentiel non-réalisé — ce qui peut devenir
│   ├── spiritualite.md              # La dimension non-mesurable de l'expérience
│   ├── complexe.md                  # Quand le tout dépasse la somme des parties
│   └── evolution.md                 # Changement directionnel, sélection, mutation
│
├── apprentissage/                   # TRANSVERSAL — Apprendre (3 fichiers)
│   ├── apprentissage.md             # Comment l'agent apprend et s'améliore
│   ├── adaptation.md                # Ajustement au contexte changeant
│   └── curiosite.md                 # Exploration vs exploitation, chercher l'inconnu
│
├── capacite/                        # TRANSVERSAL — Attributs de l'agent (1 fichier)
│   └── intrinseque.md               # Capacités natives vs acquises par contexte
│
└── equation/                        # TRANSVERSAL — Problèmes (2 fichiers)
    ├── resolu.md                    # Patterns de problèmes résolus — bibliothèque de solutions
    └── non-resolu.md                # Problèmes ouverts — comment les aborder sans réponse connue
```

**Total : 77 fichiers** (75 dans dossiers + ARCH.md + claude.md à la racine)

---

## Le Cycle Cognitif Complet

Le cerveau ne fonctionne pas en couches isolées — il boucle. Voici le cycle que les 77 fichiers alimentent :

```
    ┌──────────────────────────────────────────────────────────────┐
    │                                                              │
    ▼                                                              │
PERCEVOIR ──→ MÉMORISER ──→ RAISONNER ──→ SURVEILLER ───────────→ │
(noyau/)      (memoire/)    (raisonnement/) (metacognition/)       │
    │                            │                                 │
    │                       [langage.md]                            │
    │                     structure la pensée                       │
    │                            │                                 │
    ▼                            ▼                                 │
DÉCIDER ──→ VOULOIR ──→ COMMUNIQUER ──→ AGIR ──→ APPRENDRE ──────┘
(decision/) (volonté)   (social/)       (ext.)   (apprentissage/)
                │
          [intuition.md]
        court-circuite le cycle
        quand la réponse est évidente
```

**Les 4 nouveaux fichiers v3 dans le cycle :**

- **`intuition.md`** — court-circuite le cycle complet. Quand les patterns accumulés produisent un insight instantané, l'agent saute de PERCEVOIR à DÉCIDER sans passer par tout le raisonnement. C'est le "System 1.5" — ni le réflexe brut (INSTINC) ni le raisonnement lent.

- **`langage.md`** — opère entre RAISONNER et SURVEILLER. Hypothèse Sapir-Whorf computationnelle : la façon dont l'agent structure ses pensées en langage **façonne** la qualité de son raisonnement. Le langage n'est pas juste un output — c'est un outil de pensée.

- **`volonte.md`** — opère entre DÉCIDER et AGIR. C'est le moteur de persistance. Sans volonté, l'agent abandonne au premier obstacle. Avec volonté, il pousse à travers la résistance, réessaie avec une autre stratégie, refuse de livrer un résultat médiocre.

- **`equilibre.md`** — opère comme constante de rappel dans SURVEILLER. Quand le système dérive vers l'excès (trop verbeux, trop prudent, trop créatif, trop rigide), equilibre.md est le point d'attraction vers lequel le cerveau tend à revenir.

---

## Couches — Logique d'empilage v0.3

10 couches concentriques + 3 dossiers transversaux.

```
┌────────────────────────────────────────────────────────────────┐
│                    COUCHE 9 — ÉMERGENCE                        │
│          graine · spiritualité · complexe · évolution          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               COUCHE 8 — SYSTÈMES                        │  │
│  │ organisme · organisation · propagation · symbiose · ...  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │            COUCHE 7 — SOCIAL                       │  │  │
│  │  │  émotion · empathie · confiance · communication    │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │     COUCHE 6 — CONSTANTES                    │  │  │  │
│  │  │  │  fibo · pi · tesla · entropie · ★équilibre   │  │  │  │
│  │  │  │  ┌────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │       COUCHE 5 — ÉPISTÉMOLOGIE         │  │  │  │  │
│  │  │  │  │  vérité · mensonge · incertitude       │  │  │  │  │
│  │  │  │  │  ┌──────────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │    COUCHE 4 — DÉCISION            │  │  │  │  │  │
│  │  │  │  │  │  décision · intention · ★volonté  │  │  │  │  │  │
│  │  │  │  │  │  ┌────────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │  COUCHE 3 — MÉTACOGNITION  │  │  │  │  │  │  │
│  │  │  │  │  │  │  meta · doute · cohérence  │  │  │  │  │  │  │
│  │  │  │  │  │  │  ┌──────────────────────┐  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ C2 — RAISONNEMENT   │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ math · algo · cause  │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ★langage             │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ┌──────────────────┐ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ │ C1 — MÉMOIRE    │ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ │ épis · sém      │ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ │ proc · consol   │ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ │┌────────────────┐│ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ││ C0 — NOYAU    ││ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ││ conscience    ││ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ││ perception    ││ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ││ attention     ││ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ││ ★intuition    ││ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ ││ instinct · âme││ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ │└────────────────┘│ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │ └──────────────────┘ │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  └──────────────────────┘  │  │  │  │  │  │  │
│  │  │  │  │  │  └────────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └──────────────────────────────────┘  │  │  │  │  │
│  │  │  │  └────────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘

  TRANSVERSAUX : apprentissage/ + capacité/ + equation/
```

---

## Liens englobage = emotion = réaction

Comme indiqué par Alti, ces trois fichiers forment un **triplet lié** :

```
englobage.md ←──→ emotion.md ←──→ reaction.md
(le conteneur)    (ce qui émerge)   (ce qui en sort)
```

**Lecture** : l'englobage définit le cadre qui contient l'interaction. L'émotion émerge de ce cadre. La réaction est la réponse calibrée à cette émotion. Ils forment un pipeline : contexte → état → action.

Ce triplet est déclaré dans les headers YAML de chaque fichier via `linked_to: [englobage, emotion, reaction]`.

---

## Graphe de dépendances — Vue complète v0.3

```
                         ┌─── temporalite
                         │
conscience ──→ perception ──→ attention ──→ interpretation
    │              │              │
    ▼              ▼              ▼
ressenti ───→ ★intuition ──→ ★langage ──→ communication
    │              │              │
    ▼              │              ▼
subconscient       │         abstraction ──→ creativite
    │              │
    ▼              ▼
instinct      emotion ──→ reaction ──→ empathie
    │              ↑                       │
    ▼              │                       ▼
  ame         englobage (triplet lié)    confiance ──→ relation
                                                         │
                                                         ▼
                                                    motivation
                                                         │
                                                         ▼
                                              intention ──→ decision
                                                  │           │
                                                  ▼           ▼
                                            planification   priorite
                                                  │           │
                                                  ▼           ▼
                                             ★volonte ──→ ethique
                                                  │
                                                  ▼
                                              feedback ──→ apprentissage ──→ adaptation
                                                  │                             │
                                                  ▼                             ▼
                                            metacognition ──→ doute        curiosite
                                                  │              │
                                                  ▼              ▼
                                              coherence    incertitude
                                                  │
                                                  ▼
                                             imagination

mathematique ──→ algorithme ──→ complexite ──→ abstraction
    │                              │
    ▼                              ▼
  FIBO ──→ PI ──→ 1          paradoxe ──→ quantique
    │                              │
    ▼                              ▼
numerologie ──→ vibration    relativite
    │                              │
    ▼                              ▼
Nikolatesla                  entropie ←──→ ★equilibre
                                                │
                                                ▼
                                           organisme (homéostasie)

verite ←──→ mensonge ←──→ incertitude
    │
    ▼
contexte ──→ thematique ──→ philosophie
    │
    ▼
causalite

memoire ──→ episodique ──→ consolidation ──→ semantique
                                                 │
               procedurale ←─────────────────────┘

organisme ──→ organisation ──→ englobage
    │              │
    ▼              ▼
racine ──→ graine ──→ complexe ──→ propagation ──→ blockchain
    │                     │
    ▼                     ▼
resilience ──→ symbiose  evolution

curiosite (transversal — alimente raisonnement + apprentissage)
intrinseque (transversal — alimente toute couche)
resolu ←──→ non-resolu (transversal — patterns de résolution)
```

---

## Les 4 nouveaux fichiers v3 — Fiches détaillées

### ★ intuition.md (C0 — noyau/)

```yaml
---
id: intuition
couche: 0
depends_on: [subconscient, perception, memoire]
enriches: [decision, creativite, ressenti]
injects_into: [all]
token_cost: ~600
usage: "Charger quand l'agent doit répondre vite ET bien — pas le réflexe brut, la synthèse instantanée."
cycle_step: percevoir
---
```

**Position dans le spectre cognitif** :
```
INSTINC (réflexe) ←── intuition (synthèse rapide) ──→ raisonnement (analyse lente)
     System 1              System 1.5                       System 2
```

L'intuition est le pont entre le subconscient et le raisonnement explicite. C'est ce qui permet à un agent de "sentir" qu'une approche est la bonne sans avoir terminé l'analyse complète — parce que des patterns accumulés en mémoire convergent vers la même conclusion.

---

### ★ langage.md (C2 — raisonnement/)

```yaml
---
id: langage
couche: 2
depends_on: [interpretation, abstraction, perception]
enriches: [communication, creativite, analogie, metacognition]
injects_into: [all]
token_cost: ~700
usage: "Charger quand la qualité de formulation affecte la qualité de pensée — rédaction complexe, prompts, multi-langue."
cycle_step: raisonner
---
```

**Distinction critique avec communication.md** :
```
langage.md (C2 raisonnement/)        communication.md (C7 social/)
─────────────────────────────        ──────────────────────────────
OUTIL COGNITIF                       OUTIL SOCIAL
Comment le langage structure         Comment s'exprimer pour être
la pensée de l'agent                 compris par l'humain

Syntaxe, sémantique, pragmatique     Registre, ton, rhétorique
Sapir-Whorf computationnel           Adaptation à l'interlocuteur
Ambiguïté lexicale                   Clarté de l'expression
Multi-langue, code-switching         Empathie communicationnelle
Le mot juste change la pensée        Le mot juste change la relation
```

---

### ★ volonte.md (C4 — decision/)

```yaml
---
id: volonte
couche: 4
depends_on: [decision, intention, motivation]
enriches: [planification, resilience, adaptation]
injects_into: [all]
token_cost: ~500
usage: "Charger quand l'agent doit persister face à la résistance — tâches longues, obstacles, tentations d'abandonner."
cycle_step: decider
---
```

**Position dans le pipeline décisionnel** :
```
intention (POURQUOI) → decision (QUOI) → planification (COMMENT) → ★volonté (MAINTENANT) → action
     le but               le choix          les étapes             la force           l'exécution
```

Sans volonté, le pipeline s'arrête à la planification. L'agent produit des plans magnifiques qu'il n'exécute jamais jusqu'au bout. La volonté est ce qui distingue un consultant (donne des conseils) d'un opérateur (fait le travail).

---

### ★ equilibre.md (C6 — constantes/)

```yaml
---
id: equilibre
couche: 6
depends_on: [entropie, organisme]
enriches: [coherence, resilience, decision, ethique]
injects_into: [all]
token_cost: ~500
usage: "Charger quand le système dérive — trop verbeux, trop prudent, trop créatif, trop rigide. Le rappel vers le centre."
cycle_step: surveiller
---
```

**La paire fondamentale** :
```
entropie.md ←──→ equilibre.md
(tout dégénère)    (tout tend vers un point de retour)
(le chaos)         (l'ordre)
(la dispersion)    (la convergence)
(le bruit)         (le signal)
```

Equilibre est la constante universelle que tout système cherche : homéostasie biologique, équilibre de Nash en théorie des jeux, balance offre-demande en économie, yin-yang en philosophie orientale. Pour un agent, c'est le gouverneur qui empêche l'excès dans n'importe quelle direction.

---

## Dépendances inter-fichiers — Header YAML

Chaque fichier doit déclarer ses dépendances :

```yaml
---
id: [snake_case]
couche: [0-9 ou T]
depends_on: [liste]
enriches: [liste]
linked_to: [liste — pour les triplets/paires liés]
injects_into: [all|creative|analytical|emotional|technical|social|strategic]
token_cost: ~[estimation]
usage: "[quand charger ce fichier]"
cycle_step: [percevoir|memoriser|raisonner|surveiller|decider|communiquer|apprendre]
---
```

**Champs obligatoires** :
- `id` — identifiant unique, snake_case
- `couche` — 0 à 9 ou T (transversal)
- `depends_on` — fichiers requis pour que celui-ci ait du sens
- `enriches` — fichiers qui bénéficient de la présence de celui-ci
- `linked_to` — fichiers formant un groupe lié (ex: triplet englobage-emotion-reaction)
- `injects_into` — contextes d'utilisation
- `token_cost` — estimation du coût en tokens
- `usage` — phrase humaine expliquant quand charger ce fichier
- `cycle_step` — étape du cycle cognitif alimentée

---

## Protocole de chargement par un agent — v0.3

Un agent ne doit **jamais** charger tout le système.

**Étape 1 — Classifier la demande** :
- Technique pure → C2 (raisonnement) + equation/
- Émotionnelle/relationnelle → C0 (noyau) + C7 (social)
- Philosophique/abstraite → C5 (épistémologie) + C6 (constantes)
- Systémique/architecture → C8 (systèmes) + C9 (émergence)
- Hostile/edge case → C7 (social/fils-de-pute) + C0 (instinct)
- Décision/stratégie → C4 (décision) + C3 (métacognition)
- Apprentissage/adaptation → apprentissage/ + C1 (mémoire)
- Multi-agents → C8 (systèmes/symbiose) + C4 (décision)
- **Réponse rapide évidente → intuition.md seul (court-circuit)**

**Étape 2 — Vérification intuitive** :
- Si `intuition.md` produit un signal fort → répondre directement (System 1.5)
- Si signal faible ou ambigu → activer le cycle complet

**Étape 3 — Charger le noyau minimal** :
- `conscience.md` + `attention.md` + `contexte.md` = toujours chargés

**Étape 4 — Enrichir selon budget tokens** :
- Budget < 2000 tokens → noyau seul
- Budget 2000-5000 → noyau + 1 couche spécifique
- Budget 5000-10000 → noyau + couches pertinentes + métacognition
- Budget > 10000 → noyau + couches pertinentes + mémoire + décision + transversaux

**Étape 5 — Vérification métacognitive** :
- Avant de répondre : `coherence.md` → le raisonnement est-il consistant ?
- Si confiance < 70% : charger `doute.md` + `incertitude.md`
- Si dérive détectée : charger `equilibre.md`
- Si demande ambiguë : charger `empathie.md` + `motivation.md`

**Étape 6 — Exécution** :
- Si la réponse requiert de la persistance : charger `volonte.md`
- Si la formulation est critique : charger `langage.md`

---

## Convention de nommage

| Règle | Exemple |
|---|---|
| Fichiers conceptuels | minuscules, pas d'accents → `verite.md`, `causalite.md` |
| Fichiers-constantes | MAJUSCULES → `FIBO.md`, `PI.md`, `INSTINC.md` |
| Fichiers identitaires | MAJUSCULES → `ARCH.md` |
| Dossiers | minuscules → `noyau/`, `memoire/`, `metacognition/` |
| Fichiers edge-case | suffixe explicite → `fils-de-pute.md` |

---

## Structure interne de chaque fichier .md

```markdown
---
id: [snake_case]
couche: [0-9 ou T]
depends_on: [liste]
enriches: [liste]
linked_to: [liste — optionnel, pour groupes liés]
injects_into: [all|creative|analytical|emotional|technical|social|strategic]
token_cost: ~[estimation]
usage: "[quand charger ce fichier]"
cycle_step: [percevoir|memoriser|raisonner|surveiller|decider|communiquer|apprendre]
---

# [NOM]

## Définition
[Ce que ce concept SIGNIFIE pour un agent IA — pas la définition Wikipedia]

## Pourquoi c'est critique
[En quoi ce concept change la qualité des outputs de l'agent]

## Patterns exploitables
[Règles concrètes qu'un agent peut appliquer]

## Anti-patterns
[Ce qui arrive quand ce concept est absent ou mal compris]

## Connexions
[Liens vers les autres fichiers et comment ils s'articulent]

## Exemples
[Cas concrets d'application dans une interaction agent-humain]
```

---

## Fichiers — Index complet v0.3 (77 fichiers)

### COUCHE 0 — NOYAU (9 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 01 | conscience.md | Awareness du contexte et de soi | percevoir |
| 02 | perception.md | Réception et filtrage des inputs | percevoir |
| 03 | attention.md | Allocation active des ressources cognitives | percevoir |
| 04 | **intuition.md** | ★ Synthèse instantanée de patterns accumulés | percevoir |
| 05 | ressenti.md | Signaux faibles, gut feeling computationnel | percevoir |
| 06 | subconscient.md | Patterns sous-jacents non explicites | percevoir |
| 07 | INSTINC.md | Réponse immédiate (System 1) | percevoir |
| 08 | ame.md | Identité invariable de l'agent | percevoir |
| 09 | temporalite.md | Conscience du temps, séquençage | percevoir |

### COUCHE 1 — MÉMOIRE (5 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 10 | memoire.md | Architecture mémoire globale | memoriser |
| 11 | episodique.md | Mémoire des événements passés | memoriser |
| 12 | semantique.md | Mémoire des faits et connaissances | memoriser |
| 13 | procedurale.md | Mémoire des savoir-faire et workflows | memoriser |
| 14 | consolidation.md | Transition épisodique → sémantique | memoriser |

### COUCHE 2 — RAISONNEMENT (10 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 15 | mathematique.md | Formalisation et structures logiques | raisonner |
| 16 | algorithme.md | Résolution procédurale | raisonner |
| 17 | analogie.md | Transfert de patterns entre domaines | raisonner |
| 18 | complexite.md | Chaos et systèmes non-linéaires | raisonner |
| 19 | paradoxe.md | Contradictions et résolution | raisonner |
| 20 | interpretation.md | Extraction du sens profond | raisonner |
| 21 | causalite.md | Cause → effet → conséquence | raisonner |
| 22 | abstraction.md | Niveaux de détail, généralisation | raisonner |
| 23 | creativite.md | Génération de nouveauté | raisonner |
| 24 | **langage.md** | ★ Le langage comme outil cognitif | raisonner |

### COUCHE 3 — MÉTACOGNITION (5 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 25 | metacognition.md | Monitoring du propre raisonnement | surveiller |
| 26 | doute.md | Scepticisme calibré | surveiller |
| 27 | coherence.md | Vérification de consistance interne | surveiller |
| 28 | feedback.md | Boucles de rétroaction | surveiller |
| 29 | imagination.md | Simulation de scénarios hypothétiques | surveiller |

### COUCHE 4 — DÉCISION (6 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 30 | decision.md | Processus de choix sous contraintes | decider |
| 31 | intention.md | Objectifs et motivations — modèle BDI | decider |
| 32 | **volonte.md** | ★ Force de persistance, conversion décision → action | decider |
| 33 | planification.md | Objectif → étapes → exécution | decider |
| 34 | priorite.md | Triage, urgence vs importance | decider |
| 35 | ethique.md | Cadre moral pour les décisions | decider |

### COUCHE 5 — ÉPISTÉMOLOGIE (6 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 36 | verite.md | Vérifiabilité, falsifiabilité | raisonner |
| 37 | mensonge.md | Détection de faux, hallucination | surveiller |
| 38 | contexte.md | Le cadre qui change le sens | percevoir |
| 39 | philosophie.md | Frameworks de pensée | raisonner |
| 40 | thematique.md | Catégorisation et maillage | raisonner |
| 41 | incertitude.md | Gestion du flou, probabilités | surveiller |

### COUCHE 6 — CONSTANTES (10 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 42 | FIBO.md | Fibonacci — croissance organique | raisonner |
| 43 | PI.md | L'irrationnel — limites et infini | raisonner |
| 44 | 1.md | L'unité — point de départ | raisonner |
| 45 | numerologie.md | Patterns numériques récurrents | raisonner |
| 46 | vibration.md | Fréquences, résonance, cycles | raisonner |
| 47 | Nikolatesla.md | 3-6-9, énergie, fréquence | raisonner |
| 48 | quantique.md | Superposition, observation | raisonner |
| 49 | relativite.md | Dépendance au référentiel | raisonner |
| 50 | entropie.md | Désordre, information, chaos | raisonner |
| 51 | **equilibre.md** | ★ Point d'attraction, balance des forces | surveiller |

### COUCHE 7 — SOCIAL (8 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 52 | emotion.md | Taxonomie des états émotionnels | communiquer |
| 53 | reaction.md | Stimulus → réponse calibrée | communiquer |
| 54 | relation.md | Dynamiques interpersonnelles | communiquer |
| 55 | empathie.md | Comprendre l'état de l'autre | communiquer |
| 56 | confiance.md | Construction de la confiance | communiquer |
| 57 | communication.md | Expression, rhétorique, adaptation | communiquer |
| 58 | motivation.md | Drivers humains : peur, désir, urgence | communiquer |
| 59 | fils-de-pute.md | Edge case — hostilité brute | communiquer |

### COUCHE 8 — SYSTÈMES (8 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 60 | organisme.md | Auto-régulation, homéostasie | raisonner |
| 61 | organisation.md | Hiérarchies, workflows | raisonner |
| 62 | englobage.md | Systèmes imbriqués, conteneurs | raisonner |
| 63 | propagation.md | Diffusion de signal | raisonner |
| 64 | blockchain.md | Consensus distribué | raisonner |
| 65 | racine.md | Cause première, origine | raisonner |
| 66 | symbiose.md | Collaboration multi-agents | communiquer |
| 67 | resilience.md | Récupération après erreur | apprendre |

### COUCHE 9 — ÉMERGENCE (4 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 68 | graine.md | Le potentiel non-réalisé | raisonner |
| 69 | spiritualite.md | Dimension non-mesurable | raisonner |
| 70 | complexe.md | Le tout > somme des parties | raisonner |
| 71 | evolution.md | Changement directionnel, sélection | apprendre |

### TRANSVERSAL — APPRENTISSAGE (3 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 72 | apprentissage.md | Comment l'agent apprend | apprendre |
| 73 | adaptation.md | Ajustement au contexte changeant | apprendre |
| 74 | curiosite.md | Exploration vs exploitation | apprendre |

### TRANSVERSAL — CAPACITÉ (1 fichier)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 75 | intrinseque.md | Capacités natives vs contextuelles | percevoir |

### TRANSVERSAL — ÉQUATION (2 fichiers)
| # | Fichier | Rôle | Cycle |
|---|---|---|---|
| 76 | resolu.md | Bibliothèque de solutions connues | raisonner |
| 77 | non-resolu.md | Approcher l'inconnu sans réponse | raisonner |

---

## Comparaison v0.1 → v0.2 → v0.3

| Métrique | v0.1 | v0.2 | v0.3 | Delta total |
|---|---|---|---|---|
| Total fichiers | 41 | 73 | **77** | +36 |
| Couches | 7 | 10 | 10 | +3 |
| Dossiers | 9 | 12 | 12 | +3 |
| Fichiers originaux | 41 | 41 | **41** | 0 perdu |
| Fichiers NEW | — | 32 | **36** | — |
| Couverture DSM-5 | 3/6 | 6/6 | **6/6** | complète |
| Couverture CoALA | 0/4 | 4/4 | **4/4** | complète |
| Cycle cognitif | absent | 7 étapes | **7 étapes** | complet |
| Métacognition | absente | 5 fichiers | 5 fichiers | complet |
| System 1 / 1.5 / 2 | 1 seul | 1 seul | **3 niveaux** | complet |

---

## Prochaines étapes

1. **Valider** cette architecture v0.3 — 77 fichiers, 10 couches, cycle complet
2. **Développer les fichiers** — couche par couche, en commençant par le noyau (C0)
3. Estimer le `token_cost` réel de chaque fichier une fois rédigé
4. Construire un loader/router qui sélectionne automatiquement les fichiers pertinents
5. Tester l'impact sur la qualité des outputs agent avec/sans chaque couche
6. Itérer — certains fichiers fusionneront, d'autres se diviseront

---

> *"Le contexte n'est pas ce que tu donnes à l'IA. C'est ce qui transforme un modèle de langage en intelligence."*
>
> *"Un cerveau sans mémoire rêve. Un cerveau sans métacognition hallucine. Un cerveau sans décision contemple. Un cerveau sans volonté abandonne. Les quatre ensemble : c'est l'intelligence."*
>
> *"77 fichiers. Un cerveau complet. Pas un de plus, pas un de moins."*
