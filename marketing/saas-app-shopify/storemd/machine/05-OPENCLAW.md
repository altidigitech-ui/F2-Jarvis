# 05 — OPENCLAW sur Hostinger — install + capacités réelles

> Vérifié 2026. Ce fichier sépare ce qui marche de ce qui est du fantasme. OpenClaw = ex-Moltbot/Clawdbot, open-source (MIT), racheté par OpenAI en février 2026.

---

## A. INSTALL sur Hostinger (confirmé)

**Le plus simple — template 1-click** (celui de ton screenshot) : il pré-installe tout. Tu sélectionnes OpenClaw à la création du VPS, ça déploie le Gateway + dépendances.

**Specs / coût :**
- Minimum : KVM1 (~$4,99/mois, 4 GB RAM). Sweet spot : **KVM2 (~$5,99-8,99/mois, 2 vCPU, 8 GB RAM)** — assez pour browser automation + plusieurs agents. 8 GB conseillé si tu fais tourner de la browser automation lourde.
- Il faut une **clé API LLM** (Anthropic Claude recommandé) — c'est le « cerveau », sans elle OpenClaw ne fait rien.

**Manuel (si tu n'utilises pas le template) :** SSH → Docker + Node 24 → cloner OpenClaw → remplir `.env` (clés API + channels) → PM2/systemd pour le 24/7 → wizard d'onboarding → accès à l'UI via tunnel SSH. ~15-20 min.

**⚠️ Sécurité — non négociable :** OpenClaw a eu une **faille critique RCE (CVE-2026-25253)** patchée en 2026, et a été critiqué (Cisco AI Security, Immersive Labs, Wired) pour exfiltration de fichiers, vol de session navigateur, accès aux gestionnaires de mots de passe. Il agit **de façon autonome** avec accès à tes messages/clés. Donc obligatoire : utilisateur non-root dédié, firewall, `chmod 600 .env`, rester à jour (`git pull && npm install && build`), Nginx+SSL si l'UI est exposée. Sur VPS isolé, le rayon de dégât est contenu (vs ton laptop).

---

## B. CE QUE TU VEUX — multi-agents autonomes : ce qui est VRAI

- **Plusieurs agents : oui.** OpenClaw supporte plusieurs agents isolés sous un seul Gateway, chacun avec **mémoire et permissions séparées**, définis par des fichiers de config Markdown (identité, mémoire, permissions).
- **Sous-agents en parallèle : oui.** Pas de limite codée en dur ; la limite pratique = tes rate limits LLM. **3-5 sous-agents en parallèle = le sweet spot** ; au-delà, l'overhead d'orchestration mange les gains.
- **Skills (= outils, via MCP) : oui.** 100-200+ skills communautaires. Web search (`brave-search`), code (`github` via gh CLI, WP-CLI, SSH), recherche structurée multi-sources, etc. L'agent chaîne les skills tout seul pour une tâche.
- **Orchestration autonome : oui, via Lobster** — moteur de workflow intégré (YAML), multi-étapes, multi-agents, délégation à des sous-agents avec outils/permissions différents, **cron** pour le déclenchement. Peut être un pipeline de contenu autonome.
- **Mémoire persistante : oui.** Stockée localement (`~/.openclaw/memory/`), embeddings vectoriels → l'agent « se souvient » entre conversations. (C'est de la mémoire récupérable, pas un modèle qui s'entraîne.)
- **« Coder tout seul » : en partie.** Via le skill `github`/CLI, il peut gérer des repos, lancer des commandes, déployer. Il *exécute* des tâches de code avec le LLM comme cerveau.

---

## C. CE QUI EST DU FANTASME (à entendre)

- **« On touche rien, il fait tout parfaitement seul » = non.** C'est un agent piloté par LLM : il **hallucine**, et un système qui *agit* sur ses hallucinations cause de vrais dégâts (mail envoyé à un vrai prospect avec une connerie, commande SSH destructrice). Les causes : instructions vagues, trop de skills activés à la fois, contexte insuffisant.
- **Le bon usage = agents NARROW.** Instructions explicites et étroites, skills inutiles désactivés, exemples de sortie dans le prompt. Un agent = une mission précise. Pas un god-agent qui « gère le business ».
- **Multi-agent = nouvelles pannes.** Deux agents sur la même donnée → sorties conflictuelles ; mémoire persistante → rétention non voulue. Ça demande des rôles/permissions clairs.
- **Skills = dépendances non fiables.** « Traite chaque skill comme une dépendance non auditée : fork, lis, audite. » (risque supply-chain type NPM).
- **« Coder un système entier seul » = non.** Pour *construire* la machine, c'est **Claude Code** (supervisé) le bon outil. OpenClaw exécute des ops de code, il ne remplace pas un build supervisé.

---

## D. COMMENT ÇA S'INSÈRE DANS LA MACHINE F2

Rôles séparés, chacun fait ce qu'il fait de mieux :
- **OpenClaw (VPS)** = couche **exécution/ops/navigateur** : scraping browser (SOURCE/ENRICH), tâches planifiées (cron), actions où il n'y a pas d'API propre. Agents narrow + skills audités.
- **Jarvis** = orchestrateur **déterministe** du pipeline email (jobs, états, envoi). Pas d'aléatoire LLM sur l'envoi.
- **Claude Code** = **construit** le code (supervisé, PR, merge).
- **Toi** = **valides** avant tout envoi/publication. Le garde-fou humain reste, surtout vu le risque sécurité + hallucination.

**Règle :** plus tu donnes d'autonomie + d'outils à un agent sans scope, plus il déraille. On veut des agents étroits, audités, isolés — pas un essaim libre branché sur tes clés et ta boîte mail.
