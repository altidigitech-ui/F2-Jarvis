# JARVIS — Manuel d'utilisation

> Assistant agentique interne de FoundryTwo.
> Ce fichier documente ce que JARVIS peut faire, comment l'utiliser, et ses limites.
> Dernière mise à jour : 22 avril 2026.

---

## Qu'est-ce que JARVIS

JARVIS est le cockpit opérationnel de FoundryTwo. C'est une application web qui combine :

- Un chat intelligent alimenté par Claude (Sonnet) avec 9 outils de lecture/écriture du repo
- Un tableau de bord temps réel (compteurs, timeline, alertes)
- Une mémoire persistante (MemPalace) qui archive les conversations
- Une conscience de fond (Ouroboros) qui observe le repo et propose des actions
- Un graphe de connaissances (Graphify) qui relie les concepts du studio

JARVIS tourne sur deux interfaces : le cockpit Fabrice (violet, /fabrice) et le cockpit Romain (vert, /romain). Chaque persona a sa voix, ses compteurs, et son historique de conversation.

URL : `https://f2-jarvis.vercel.app`

---

## Accès

1. Aller sur `https://f2-jarvis.vercel.app`
2. Se connecter avec email + mot de passe (Supabase Auth)
3. Seuls les comptes avec le flag `f2_authorized` peuvent accéder
4. Choisir sa persona : Romain ou Fabrice
5. Romain a un toggle ROMAIN/F2 pour basculer en mode compte studio @foundrytwo

---

## L'interface — 4 colonnes

```
┌──────────────┬──────────────┬─────────────────────┬───────────────┐
│ SIDEBAR      │ TIMELINE     │ CHAT                │ SIDEBAR       │
│ GAUCHE       │              │                     │ DROITE        │
│              │              │                     │               │
│ Brain 3D     │ Planning     │ Conversation avec   │ Compteurs     │
│ ◉ EXPAND     │ du jour      │ JARVIS en streaming │ du jour       │
│              │              │                     │               │
│ ⬡ Graphify   │ Posts prévus │ Actions proposées   │ Alertes       │
│ 🏛 MemPalace │ Cross à faire│ Contenu à copier    │               │
│              │ Objectifs    │ Suggestions          │ Ouroboros     │
│ ACCÈS RAPIDE │              │                     │ Panel         │
│ 📅 Aujourd'hui│             │                     │               │
│ 🗓 Plan sem. │              │                     │ Commits       │
│ 📝 Posts batch│             │                     │ automatiques  │
│ 🔄 Cross-eng.│              │                     │               │
│ 📩 Cold      │              │                     │               │
│ 📊 Progress  │              │                     │               │
└──────────────┴──────────────┴─────────────────────┴───────────────┘
```

---

## Parler à JARVIS

### Envoyer un message

Taper dans la zone de texte en bas et appuyer sur **Entrée** (ou cliquer l'icône envoyer).

**Shift+Entrée** pour aller à la ligne sans envoyer.

### Envoyer une image

Trois façons :
- Cliquer sur "Joindre image" en bas
- Faire un **Ctrl+V** (coller un screenshot du presse-papier)
- **Drag & drop** un fichier image sur le chat

Formats acceptés : PNG, JPEG, GIF, WEBP. Taille max : 5 Mo.

JARVIS analyse l'image (screenshot de tweet, DM LinkedIn, liste de profils, notification) et répond en conséquence.

### Commandes spéciales

| Commande | Effet |
|---|---|
| `/search [query]` | Recherche dans MemPalace (archive verbatim des conversations passées) |
| `/wing [wing] [query]` | Recherche dans une wing spécifique de MemPalace (ex: `/wing storemd pricing`) |

Ces commandes cherchent dans l'archive, pas dans le chat courant.

---

## Ce que JARVIS comprend automatiquement

JARVIS reconnaît 35 patterns dans tes messages et réagit automatiquement. Pas besoin de commandes spéciales — parle naturellement.

### Publication

| Tu dis | JARVIS fait |
|---|---|
| "j'ai posté [sujet]" | Propose de marquer comme publié dans le plan hebdo |
| "publication de X prévue à 14h" | Note dans la conversation (pas d'action) |
| "je veux ajuster ce texte" | Cherche des exemples de voix passés et propose un nouveau texte |

### Cold outreach

| Tu dis | JARVIS fait |
|---|---|
| "j'ai envoyé 5 cold Twitter ecom" | Demande les @handles puis propose de logger le batch |
| "cold reply à @handle sur ghost billing" | Propose de logger dans le cold log |
| "@handle a répondu" | Propose de mettre à jour le statut du cold |
| "@handle a accepté ma connexion" | Propose de marquer comme "Accepted" |

### Listes de cibles (Grok, ChatGPT)

| Tu dis | JARVIS fait |
|---|---|
| "grok m'a sorti cette liste" | Parse les profils et propose de les ajouter à la queue cold |
| "voici 15 profils à contacter" | Même chose |
| Screenshot d'une liste de profils | Parse l'image et queue les cibles |

### Engagement

| Tu dis | JARVIS fait |
|---|---|
| "engagement fait sur [post]" | Propose de logger l'engagement |
| "j'ai commenté [post/lien]" | Propose de logger |
| "reply sur thread de @handle" | Propose de logger |

### Cross-engagement

| Tu dis | JARVIS fait |
|---|---|
| "cross fait sur post R de 14h" | Propose de marquer dans le cross tracker |
| "j'ai pas fait le cross encore" | Vérifie la timeline et te rappelle ce qui manque |
| "Romain a publié ?" | Vérifie la timeline de Romain |

### Screenshots

| Tu envoies | JARVIS fait |
|---|---|
| Screenshot d'une reply + "reply à ça" | Analyse la plateforme, l'auteur, le contenu. Génère 2 variantes de reply dans ta voix. |
| Screenshot d'un DM LinkedIn + "follow-up" | Génère un follow-up adapté au ton DM |
| Screenshot d'une notification thread | Propose une reply d'engagement |
| Screenshot d'une notification (like, RT) | Info seulement, pas d'action |

### Génération de contenu

| Tu dis | JARVIS fait |
|---|---|
| "écris-moi un tweet sur [sujet]" | Cherche des exemples de voix passés et génère 1-2 variantes |
| "reformule pour LinkedIn" | Adapte le ton et la longueur (800-1300 caractères) |
| "adapte ce tweet pour F2" | Change "I" en "we", ton studio pluriel |
| "cold ecom ghost billing angle" | Génère 1 cold en anglais |
| "3 angles pour lundi prochain" | Propose 3 angles courts avec rationale |

### Bilan

| Tu dis | JARVIS fait |
|---|---|
| "résumé" / "bilan" / "où j'en suis" | Compteurs du jour + timeline + historique récent → synthèse |
| "qui m'a répondu aujourd'hui ?" | Lit le cold log et filtre les réponses du jour |
| "qu'est-ce qu'il me reste à faire ?" | Compare les objectifs aux compteurs actuels |

### Batch de la semaine

| Tu dis | JARVIS fait |
|---|---|
| "génère le batch S7" | Lit le batch précédent, les plans hebdo, les voix, les stratégies. Génère le batch complet. Propose un create_file. |
| "refais le batch S6" | Même flow mais en remplacement |

### Fichiers stratégiques

| Tu dis | JARVIS fait |
|---|---|
| "crée le plan-hebdo S7" | Lit le contexte pertinent, génère le contenu, propose un create_file |
| "modifie la roadmap distribution" | Même flow avec le fichier concerné |

### Feedback après contenu

| Tu dis | JARVIS fait |
|---|---|
| "envoyée" / "posté" (après un contenu généré) | Propose de logger l'interaction ou l'engagement |
| "non attends, change X" | Re-propose une version corrigée |
| "parfait" / "go" | Confirmation — l'UI gère la validation, JARVIS n'a rien à faire |

---

## Actions proposées et validation

Quand JARVIS veut modifier le repo, il **propose** une action — il ne la fait jamais directement.

### Comment ça marche

1. JARVIS analyse ta demande
2. Il appelle l'outil `propose_action` avec le type, les paramètres, et un aperçu
3. Une carte **"ACTION PROPOSÉE"** apparaît dans le chat avec un ID
4. Tu cliques **Valider** (✓) pour que JARVIS commit dans le repo
5. Ou tu cliques **Rejeter** (✗) pour annuler

### Types d'actions

| Type | Ce que ça fait |
|---|---|
| `mark_published` | Marque un post comme ✅ dans le plan hebdo |
| `log_cold` | Ajoute une ligne dans le cold outreach log |
| `batch_cold` | Ajoute plusieurs cibles cold d'un coup |
| `queue_cold_targets` | Met des cibles en file d'attente (⏳ à contacter) |
| `update_cold_reply` | Met à jour le statut d'un cold (réponse reçue, accepté, etc.) |
| `log_engagement` | Logger un engagement (commentaire, reply, interaction) |
| `log_interaction` | Logger un événement notable dans le progress semaine |
| `mark_cross_published` | Marquer un cross-engagement comme fait |
| `resolve_alert` | Marquer une alerte comme résolue |
| `log_decision` | Logger une décision dans le tracking |
| `create_file` | Créer ou remplacer un fichier markdown dans le repo |

### Boutons rapides

En bas de la dernière réponse JARVIS, 3 boutons d'action rapide :
- **✅ Publié** — marquer un post comme publié (ouvre un formulaire avec le titre)
- **📋 Décision** — logger une décision (ouvre un formulaire avec décision + rationale)
- **🔧 Résolu** — résoudre un incident (ouvre un formulaire avec le keyword)

Ces boutons utilisent la route legacy `/action` et commitent directement sans passer par propose/validate.

---

## Le contenu généré par JARVIS

Quand JARVIS génère du contenu à copier (tweet, reply, cold, post), il l'enveloppe dans un bloc spécial :

### Bloc CONTENT

Apparaît comme une carte avec :
- Un badge plateforme (Twitter, LinkedIn, Reddit, Cold)
- Le nombre de caractères
- Un bouton **Copier**
- Un bouton **FR** pour afficher la traduction française (si disponible)

### Suggestions (tags)

En fin de réponse, JARVIS peut proposer des suggestions cliquables :
- "Génère 5 cold ecom"
- "Suite threads Reddit"
- "Post Twitter mercredi Couche A"

Cliquer sur un tag envoie le texte comme message dans le chat.

---

## Sidebar gauche

### Brain 3D

Visualisation 3D interactive du graphe de fichiers du repo. Les noeuds sont colorés par wing (romain = vert, fabrice = violet, strategie = bleu, etc.). Cliquer sur **◉ EXPAND GRAPH** pour le mode plein écran où tu peux naviguer dans les fichiers et charger leur contenu.

### Graphify

Graphe de connaissances des concepts F2. 45 nodes interconnectés par 76 edges en 27 communautés. Cliquer sur un concept pour voir ses voisins et relations. Bouton "Envoyer à JARVIS" pour injecter un concept dans le chat.

### MemPalace

Archive verbatim de toutes les conversations et documents importants. Organisé en wings (par persona/SaaS/thème) → drawers (fichiers individuels). Recherche fuzzy intégrée. Bouton "Envoyer à JARVIS" pour injecter du contexte dans le chat.

### Accès rapide

| Bouton | Ce qu'il ouvre |
|---|---|
| 📅 Aujourd'hui | Scrolle vers la timeline du jour |
| 🗓 Plan semaine | Ouvre le plan hebdo de la persona en mode lecture |
| 📝 Posts batchés | Ouvre le batch de la semaine en cours |
| 🔄 Cross-engagement | Ouvre le tracker cross-engagement |
| 📩 Cold outreach | Ouvre le log cold outreach |
| 📊 Progress semaine | Ouvre le progress de la semaine |

Tous ces fichiers s'ouvrent dans un modal de lecture markdown.

---

## Sidebar droite

### Compteurs du jour

Grille de compteurs temps réel. Chaque tuile montre : valeur actuelle / target du jour + barre de progression. Les compteurs se rafraîchissent automatiquement toutes les 60 secondes et après chaque commit.

Les targets et les plateformes affichées sont déterminés par le batch de la semaine en cours.

Cliquer sur un compteur ouvre le fichier source correspondant (engagement log, cold log, etc.).

### Alertes

Événements critiques ou warnings extraits du `progress-semaine.md`. Chaque alerte a un bouton ✕ pour la résoudre (commit `resolve_alert`). Les alertes résolues disparaissent automatiquement.

### Ouroboros — conscience de fond

Panel de contrôle de la conscience de fond de JARVIS :
- **Dernier cycle** : quand Ouroboros a tourné pour la dernière fois
- **Prochain cycle** : countdown vers le prochain cycle automatique
- **Propositions** : nombre de proposals en attente de review
- **Budget** : dépense Ouroboros vs cap (10€/mois)
- **Arrêt d'urgence** : kill-switch toggle (ON/OFF). Si activé, Ouroboros s'arrête immédiatement.
- **Voir propositions** : ouvre la liste des proposals. Tu peux accepter, rejeter, ou ignorer chacune avec un commentaire.
- **Lancer cycle maintenant** : trigger un cycle manuel (avec confirmation)
- **Journal** : affiche les 10 dernières entrées du diary d'Ouroboros

### Commits automatiques

Countdown vers le prochain batch automatique (12h, 18h, 22h CEST). Nombre d'actions en attente.

---

## Mode F2

Disponible uniquement sur le cockpit Romain (toggle ROMAIN/F2 dans la barre du haut).

Quand le mode F2 est actif :
- L'accent color passe au vert olive (#97C459)
- Un banner s'affiche avec les règles voix F2 (pronom "we", pas de "revolutionary", etc.)
- La timeline affiche le planning F2 de la semaine (pas le planning personnel de Romain)
- Les fichiers ouverts depuis la sidebar sont ceux du dossier `f2/` au lieu de `romain/`
- JARVIS adapte sa voix au registre F2 (studio, "we/our", data-driven, neutre)

---

## Limites de JARVIS

### Ce que JARVIS ne peut PAS faire

- Modifier du code source (backend, frontend) directement
- Pousser du code sur GitHub sans validation humaine
- Accéder aux APIs externes en écriture (Stripe, Twitter, LinkedIn, etc.)
- Répondre à la place de Fabrice ou Romain sur les réseaux
- Contourner les kill-switches
- Modifier ses propres fichiers de configuration (BIBLE.md, identity.md, safety.py)
- Utiliser le modèle Opus sans demande explicite

### Ce que JARVIS ne doit JAMAIS produire

- Faux MRR, faux revenue, faux nombre de clients payants
- Testimonials directs verbatim inventés
- Noms d'entreprises clientes fictives
- Claims produit non vérifiables sur storemd.vercel.app
- Contenu qui échoue un détecteur IA (GPTZero, ZeroGPT, Originality)
- Mention d'Altistone ou de la Toile dans du contenu public
- Hashtags (aucune plateforme, aucune exception)
- Em-dash comme pivot de phrase
- Structure "Not X, it's Y"
- "Here's the thing:", "At the end of the day", "Which means", "However,", "Furthermore,"
- Listes numérotées dans les commentaires Reddit/Twitter
- Formes longues en anglais (do not, will not, I have) au lieu des contractions

### Budget

- Plan Max 5x : $100/mois (~90€), inclut Claude Code + conversations JARVIS
- Budget incrémental hors plan : 30€/mois max
- Ouroboros : 10€/mois max (Haiku uniquement)
- Opus : 5€/mois max, uniquement sur demande explicite
- Kill-switch automatique à 90% du budget (Ouroboros) et 100% (global)

---

## Ouroboros — la conscience de fond

Ouroboros est un processus qui observe le repo pendant que tu dors ou que tu te concentres ailleurs. Il détecte des incohérences, des risques, et des opportunités.

### Ce qu'il fait

- Lit le repo en lecture seule (git log, submodules, proposals, décisions, drafts)
- Détecte les relations entre signaux faibles
- Rédige des propositions structurées (contexte, observation, recommandation, risques)
- Consigne ses observations dans un journal quotidien

### Ce qu'il ne fait PAS

- Modifier le code ou le contenu
- Faire des commits
- Appeler des APIs externes
- Répondre aux clients
- Écrire des posts marketing

### Comment review ses propositions

1. Dans le panel Ouroboros (sidebar droite), cliquer "Voir propositions"
2. Chaque proposition a : titre, priorité, preview, contenu complet
3. Trois actions possibles :
   - **Accepter** — la proposition sera appliquée (via un commit JARVIS)
   - **Rejeter** — archivée dans `rejected/` avec commentaire. Ouroboros ne la re-proposera pas pendant 30 jours.
   - **Ignorer** — archivée dans `ignored/` silencieusement

### Kill-switch

Si Ouroboros dysfonctionne ou consomme trop de budget :
1. Toggle "Arrêt d'urgence" → ON dans le panel
2. Ouroboros s'arrête immédiatement au prochain check
3. Pour relancer : toggle → OFF

---

## MemPalace — la mémoire

MemPalace archive verbatim toutes les conversations JARVIS et les documents importants.

### Structure

- **Wing** = entité (romain, fabrice, storemd, marketing, etc.)
- **Drawer** = un document (une conversation, une décision, un transcript)
- Chaque drawer est un fichier markdown avec tags, date, et source

### Recherche

Depuis le chat : `/search [ta question]` ou `/wing [wing] [ta question]`
Depuis le bouton MemPalace : interface visuelle avec barre de recherche

### Utilité

- Retrouver ce qui a été décidé il y a 2 semaines sur le pricing StoreMD
- Voir l'historique des conversations sur un sujet précis
- Donner du contexte à JARVIS en lui envoyant un drawer depuis MemPalace

---

## Graphify — le graphe de connaissances

Graphify analyse les documents du repo et en extrait un réseau de concepts interconnectés.

### Utilité

- Voir comment les concepts du studio sont reliés
- Découvrir des connexions surprenantes entre des fichiers éloignés
- Explorer les communautés thématiques du repo
- Injecter un concept dans le chat pour que JARVIS l'utilise comme contexte

### Accès

Bouton "⬡ Graphify" dans la sidebar gauche → vue plein écran du graphe. Cliquer sur un node pour voir ses voisins. Barre de recherche pour trouver un concept spécifique.

---

## Troubleshooting

### Les compteurs ne se mettent pas à jour

Les compteurs se rafraîchissent toutes les 60 secondes. Après un commit, il y a un délai de ~1.5 seconde avant le refresh. Si ça ne bouge toujours pas :
- Vérifier que le fichier source (engagement-log.md, cold-outreach-log.md) contient bien la date du jour au format dd/mm
- Recharger la page (F5)

### JARVIS ne répond pas ou est lent

- Le streaming peut prendre 10-30 secondes pour les réponses complexes (JARVIS utilise jusqu'à 15 tours d'outils avant de répondre)
- Si le message reste bloqué : recharger la page, le message sera restoré depuis l'historique Supabase
- Timeout max : 2 minutes par message

### Ouroboros ne tourne pas

- Vérifier que le kill-switch est sur OFF dans le panel
- Vérifier que le budget n'est pas épuisé (0.00€ / 10€ → OK)
- Si "Dernier cycle: jamais" → Ouroboros n'a encore jamais été lancé. Cliquer "Lancer cycle maintenant".

### MemPalace est vide

- MemPalace se peuple automatiquement au fur et à mesure des conversations
- Si "pas encore peuplé" : les conversations n'ont pas encore été ingérées
- L'ingestion est automatique après chaque échange avec JARVIS

### Une action échoue au commit

- Vérifier les logs Railway (si GitHub API est down, le commit échoue)
- Cliquer "Réessayer" sur l'ActionCard en erreur
- Si le problème persiste : le fichier cible a peut-être changé entre le read et le write (conflit de SHA)

---

## Raccourcis

| Raccourci | Effet |
|---|---|
| `Entrée` | Envoyer le message |
| `Shift+Entrée` | Nouvelle ligne dans le message |
| `Ctrl+V` | Coller un screenshot comme image |
| Drag & drop | Joindre une image |
| `/search query` | Recherche MemPalace |
| `/wing wing query` | Recherche dans une wing spécifique |

---

## Architecture technique (résumé)

- **Frontend** : Next.js 14 sur Vercel (f2-jarvis.vercel.app)
- **Backend** : Express.js sur Railway (27 routes, Claude Agent SDK)
- **Base de données** : Supabase PostgreSQL (conversations, messages, actions)
- **Stockage contenu** : GitHub API (repo `altidigitech-ui/F2-Jarvis` comme base de données)
- **IA** : Claude Sonnet via Claude Agent SDK, Haiku pour Ouroboros
- **Auth** : Supabase Auth avec flag custom `f2_authorized`

Pour l'architecture complète : voir `JARVIS-ARCHITECTURE-COMPLETE.md`.

---

*Version 1.0 — 22 avril 2026. Fabrice Gangi, owner.*
