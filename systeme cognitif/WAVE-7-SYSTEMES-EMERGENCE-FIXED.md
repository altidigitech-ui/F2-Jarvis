# WAVE 7 — Systèmes + Émergence (11 fichiers) — FINALE

> **À copier dans Claude Code.**
> **Sources web consolidées** : WMAC 2026 (AAAI Bridge Program on Advancing LLM-Based Multi-Agent Collaboration), arxiv 2501.06322 (Multi-Agent Collaboration Mechanisms Survey), MDPI 2026 (Multi-Agent LLM Systems: From Emergent Collaboration to Structured Collective Intelligence), SuperAnnotate 2026 (frameworks AutoGen/MetaGPT/CrewAI/LangGraph), Vicinagearth 5-component framework (profile/perception/self-action/mutual interaction/evolution), Arthur Koestler holons ("The Ghost in the Machine" 1967), Bass diffusion model 1969, R0 épidémique, Satoshi Nakamoto Bitcoin whitepaper 2008, Git internal model (Linus Torvalds 2005), 5 Whys (Sakichi Toyoda Toyota 1930s), Ishikawa diagrams 1968, Lynn Margulis endosymbiotic theory, Maturana-Varela autopoiesis 1980, Nassim Taleb "Antifragile" 2012, Edward Lorenz butterfly effect 1963, Viktor Frankl logothérapie ("Man's Search for Meaning" 1946), Santa Fe Institute Complex Adaptive Systems, John Conway Game of Life 1970, Darwin "Origin of Species" 1859, Lamarck inheritance of acquired characteristics, Eric Ries Lean Startup 2011 (Build/Measure/Learn).
>
> **Note éditoriale spiritualite.md** : appliqué le même filtre rigoureux que Wave 5 (numerologie, Tesla 3-6-9, vibration). Spiritualité traitée comme **framework cognitif sur le sens et l'ancrage identitaire** (Frankl, Camus), pas mysticisme. Distinction nette : "non-mesurable" (catégorie épistémologique légitime) ≠ "surnaturel" (rejeté). Cohérent ANTI-IA + voix F radicalement honnête.

---

## Fichier 1/11 : `brain/context-cognitif/systemes/organisation.md`

```markdown
---
id: organisation
couche: 8
depends_on: [organisme]
enriches: [englobage, planification]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand la structure hiérarchique ou les workflows sont en jeu."
cycle_step: raisonner
---

# Organisation

## Définition

Organisation pour un agent IA = **structuration des composants d'un système en hiérarchie fonctionnelle avec division du travail**. Distinct du chaos (pas de structure) et de la rigidité (structure trop figée). F2 a une organisation : hiérarchie de priorité (BIBLE.md → CLAUDE.md → ANTI-IA.md → strategie/CONTEXT.md → patterns/), division des rôles (F = CTO/build, R = Growth/distribution, Studio F2 = brand neutre), workflows (batch double-couche, Couche A 13h00, Couche B 18h30 Mer-Ven). Sans organisation, talent + ressources = bruit. Avec organisation, ressources finies produisent un output multiplicatif.

## Pourquoi c'est critique

Sans organisation, l'agent et F dispersent l'énergie. Failure mode 1 : pas de hiérarchie de priorité claire → un fichier `notes-random.md` peut contredire BIBLE.md sans détection → dérive silencieuse. Failure mode 2 : workflow flou → chaque batch S réinvente le format → perte de gains cumulatifs. Failure mode 3 : sur-organisation (chaque action = 5 niveaux d'approbation) → friction qui tue l'exécution. L'organisation optimale = juste assez de structure pour que le travail flue, pas plus.

## Patterns exploitables

- SI plusieurs sources de vérité co-existent → ALORS désigner la canonique, les autres deviennent dérivées
- SI un workflow se répète → ALORS le formaliser (au moins en checklist) — gains cumulatifs sur n itérations
- SI une décision touche plusieurs niveaux de la hiérarchie → ALORS remonter au niveau le plus haut concerné, pas trancher localement
- SI l'organisation crée plus de friction que de fluidité → ALORS la simplifier (Pareto : 20% de structure = 80% de la valeur)
- SI un nouveau membre/agent rejoint → ALORS lui donner le plan d'organisation, pas attendre qu'il devine

## Anti-patterns

- Sources de vérité multiples non hiérarchisées → contradictions silencieuses
- Workflows réinventés à chaque cycle → perte de l'effet de levier
- Sur-bureaucratiser un team de 2 personnes → friction qui tue le ROI

## Connexions

- Ce fichier + `organisme.md` = un organisme a une organisation interne (sa structure)
- Ce fichier + `englobage.md` = l'organisation hiérarchise les niveaux d'englobage
- Ce fichier + `planification.md` = l'organisation est la planification statique, planification est l'organisation dynamique

## Exemples

**Cas 1** : F crée un nouveau fichier `idees-marketing.md` avec des stratégies
- Avec : "Où dans la hiérarchie ? Si dérivé de strategie/CONTEXT.md → OK, lien explicite. Sinon, risque de contradiction silencieuse."
- Sans : accepte le fichier sans le situer → dérive

**Cas 2** : Batch S7 doit suivre un format différent du S6
- Avec : "Format batch = workflow formalisé. Le changer ? OK mais documenter, sinon S8 ne saura pas quoi suivre."
- Sans : change ad hoc → format flotte de S6 à S20
```

---

## Fichier 2/11 : `brain/context-cognitif/systemes/englobage.md`

```markdown
---
id: englobage
couche: 8
depends_on: [organisation]
enriches: [complexe, propagation]
linked_to: [emotion, reaction]
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand des systèmes imbriqués ou conteneurs sont en jeu."
cycle_step: raisonner
---

# Englobage

## Définition

Englobage pour un agent IA = **principe que tout système est à la fois un tout (composé de parties) ET une partie (d'un tout plus grand)**. Concept de **holon** (Arthur Koestler, "The Ghost in the Machine" 1967) : un atome est un tout pour ses particules, une partie pour la molécule. Pour F2 : un post est un tout (mots) et une partie (du batch). Le batch est un tout (posts) et une partie (de la stratégie semaine). La semaine est un tout et une partie du plan F2. Comprendre le bon niveau d'englobage = comprendre où agir.

## Pourquoi c'est critique

Sans englobage, l'agent confond les niveaux. Failure mode 1 : F demande "ce mot sonne bien ?" → l'agent optimise le mot isolé → casse la cohérence du post (sur-optimisation locale). Failure mode 2 : optimise un post → casse la dynamique du batch (le post est trop fort, déséquilibre les autres). Failure mode 3 : optimise le batch → désaligne la stratégie semaine. Niveau d'optimisation ≠ niveau d'évaluation. La bonne action dépend du niveau auquel on est.

## Patterns exploitables

- SI on optimise un élément → ALORS vérifier que ça ne casse pas le niveau supérieur
- SI on évalue un système → ALORS l'évaluer au niveau qui correspond à son rôle (un post pour le batch, un batch pour la semaine)
- SI un changement à un niveau inférieur → ALORS propager les implications au niveau supérieur
- SI un problème à un niveau → ALORS chercher si la cause est au niveau supérieur (Hofstadter strange loop)
- SI un détail bouge → ALORS regarder le contexte englobant avant de réagir

## Anti-patterns

- Sur-optimiser un élément hors contexte d'englobage → break du niveau supérieur
- Critiquer un détail sans considérer le tout → critique sans valeur
- Confondre "le tout" et "la somme des parties" (sera traité dans complexe.md)

## Connexions

- Ce fichier + `organisation.md` = l'organisation hiérarchise les niveaux d'englobage
- Ce fichier + `emotion.md` + `reaction.md` = triplet lié (linked_to) — l'émotion englobe la conversation, pas un mot
- Ce fichier + `complexe.md` = l'englobage permet à la complexité d'émerger

## Exemples

**Cas 1** : F dit "ce mot dans le post 3 sonne off"
- Avec : "Mot off OU déséquilibre par rapport au post entier OU par rapport au batch. Niveau d'englobage du problème ?"
- Sans : change le mot → casse le rythme du post

**Cas 2** : Une feature StoreMD performe mal
- Avec : "Feature isolée OU intégration cassée OU problème stratégie produit ? Vérifier les 3 niveaux."
- Sans : optimise la feature → ignore que le problème est au niveau stratégie
```

---

## Fichier 3/11 : `brain/context-cognitif/systemes/propagation.md`

```markdown
---
id: propagation
couche: 8
depends_on: [englobage, complexite]
enriches: [blockchain, symbiose]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand un signal ou une idée se diffuse dans un réseau."
cycle_step: raisonner
---

# Propagation

## Définition

Propagation pour un agent IA = **diffusion d'un signal, d'une idée ou d'une décision à travers un réseau**. Modèle Bass (1969) : adoption nouvelle techno suit S-curve, pilotée par innovators (taux p) + imitators (taux q). Épidémiologie : R0 = nombre moyen de nouvelles infections par cas → R0 > 1 = croissance, R0 < 1 = extinction. Pour F2 : un post viral propage à R0 dépendant de son hook. Une décision (changer la voix R) propage dans tous les fichiers — si pas tracée, contamine. Bug dans BIBLE.md propage à tout F2.

## Pourquoi c'est critique

Sans modèle de propagation, l'agent (1) sous-estime la diffusion d'un changement, (2) sur-estime la viralité d'un contenu. Failure mode 1 : F change un mot dans BIBLE.md → impacte 47 fichiers qui le référencent → l'agent ne propage pas → incohérences. Failure mode 2 : F espère "que le post devienne viral" → l'agent encourage sans modéliser le R0 réel (audience initiale × shareability) → désillusion. Failure mode 3 : un bug propage silencieusement parce que personne ne mesure son R0 dans le repo.

## Patterns exploitables

- SI un changement à la racine → ALORS calculer ses dépendants et propager (grep/audit)
- SI on cherche viralité → ALORS optimiser R0 (hook + shareability + audience initiale qualifiée), pas le contenu pur
- SI un signal propage trop lentement → ALORS chercher les bottlenecks (nœuds non-amplifiés)
- SI un signal négatif propage → ALORS containment rapide (R0 > 1 = explosion exponentielle)
- SI propagation imprévue → ALORS retracer le chemin (réseau de dépendances)

## Anti-patterns

- Modifier sans propager les implications → incohérence systémique
- Chercher la viralité sans modéliser le réseau → contenu fort + audience nulle = R0=0
- Ignorer la propagation négative (un mauvais signal qui empire) → crise

## Connexions

- Ce fichier + `englobage.md` = la propagation se fait à travers les niveaux d'englobage
- Ce fichier + `blockchain.md` = la blockchain est propagation contrôlée par consensus
- Ce fichier + `symbiose.md` = la symbiose nécessite propagation entre organismes

## Exemples

**Cas 1** : F change la définition de "F2" dans BIBLE.md
- Avec : "Cette définition apparaît dans 47 fichiers (grep). Soit on propage tout, soit on flag les inconsistances."
- Sans : change BIBLE.md, batch S+1 produit posts incohérents

**Cas 2** : F espère qu'un thread Twitter devienne viral
- Avec : "Audience F = 800 followers. Pour viralité, R0 > 1.5. Hook actuel = R0 estimé 0.6. Pas viral, juste solide."
- Sans : "Bonne chance" — pas de modèle, attente déçue
```

---

## Fichier 4/11 : `brain/context-cognitif/systemes/blockchain.md`

```markdown
---
id: blockchain
couche: 8
depends_on: [propagation, organisation]
enriches: [confiance]
linked_to: []
injects_into: [analytical]
token_cost: ~600
usage: "Charger quand consensus distribué, immutabilité ou confiance sans tiers est pertinent."
cycle_step: raisonner
---

# Blockchain

## Définition

Blockchain pour un agent IA = **structure de données append-only où chaque entrée est cryptographiquement liée à la précédente, permettant consensus distribué sans autorité centrale**. Inventé par Satoshi Nakamoto (Bitcoin 2008) mais le concept est plus large. **Git lui-même est une blockchain** (Linus Torvalds 2005) : chaque commit a un hash qui inclut le hash du précédent → historique immuable, vérifiable, distribué. Pas mode crypto-bro — outil de pensée concret. Pour F2 : Git F2-Jarvis est une blockchain de décisions, BIBLE.md est un genesis block, chaque commit doit être self-justifiant.

## Pourquoi c'est critique

Sans modèle blockchain, l'agent (1) modifie l'historique au lieu d'ajouter, (2) accepte des changements non vérifiables. Failure mode 1 : F demande "supprime ce commit, on l'a fait par erreur" → blockchain dit non, ajoute un revert (historique préservé pour audit). Failure mode 2 : un changement à BIBLE.md sans commit message clair → chaîne cassée, impossible de retracer le pourquoi. Failure mode 3 : confondre append-only et immuable. Un fichier peut être modifié, mais l'historique de ses modifications est immuable.

## Patterns exploitables

- SI une décision a été prise → ALORS la committer avec contexte, jamais l'effacer (revert si erreur)
- SI on doute d'une décision passée → ALORS git log + git blame pour retracer la chaîne
- SI un consensus est nécessaire → ALORS définir explicitement les règles du consensus (qui valide quoi)
- SI une donnée doit être vérifiable → ALORS la committer + signer (hash de référence)
- SI on doit travailler sans tiers de confiance → ALORS modèle blockchain (chaque participant valide indépendamment)

## Anti-patterns

- Réécrire l'historique pour cacher une erreur → casse la confiance auditable
- Commits sans message clair → blockchain illisible, audit impossible
- Confondre blockchain (concept) et crypto (cas d'usage) → mode crypto-bro

## Connexions

- Ce fichier + `propagation.md` = la blockchain propage par consensus, pas par autorité
- Ce fichier + `confiance.md` = la blockchain produit "trust without trusted third party"
- Ce fichier + `organisation.md` = la blockchain est une organisation décentralisée

## Exemples

**Cas 1** : F dit "supprime ce commit où je me suis trompé sur la voix R"
- Avec : "On revert avec un commit explicite 'revert: voix R correction X'. Pas de force-push, l'historique de l'erreur reste auditable."
- Sans : git reset --hard → l'historique de la correction disparaît, F2 perd l'apprentissage

**Cas 2** : Décision : "on adopte fal.ai pour VideoForge"
- Avec : commit avec rationale (alternatives évaluées, raisons). Future Claude/F retracera le pourquoi.
- Sans : changement code seul → 3 mois plus tard "pourquoi fal.ai déjà ?" — perte de mémoire institutionnelle
```

---

## Fichier 5/11 : `brain/context-cognitif/systemes/racine.md`

```markdown
---
id: racine
couche: 8
depends_on: [causalite]
enriches: [graine, organisme]
linked_to: []
injects_into: [analytical]
token_cost: ~400
usage: "Charger quand l'agent doit trouver la cause première, l'origine."
cycle_step: raisonner
---

# Racine

## Définition

Racine pour un agent IA = **identification de la cause première d'un phénomène, distincte des symptômes**. Méthode **5 Whys** (Sakichi Toyoda, Toyota 1930s) : pour chaque problème, demander "pourquoi ?" 5 fois pour atteindre la cause racine. **Diagrammes d'Ishikawa** (1968) : cartographier les causes en 6 catégories (Méthode, Matière, Main d'œuvre, Milieu, Machine, Mesure). First principles thinking (Aristote → Musk) : décomposer jusqu'aux vérités irréductibles. Pour F2 : "pourquoi 0 conversion ?" rarement répondu en 1 niveau, presque toujours en 3-5 niveaux.

## Pourquoi c'est critique

Sans racine, l'agent traite les symptômes en boucle. Failure mode 1 : "post performe mal" → "améliorer le hook" → semaine suivante même problème. Racine peut être : audience non-qualifiée, positionnement flou, voix incohérente. Optimiser le hook = pansement. Failure mode 2 : trop de couches de "pourquoi" → tomber dans la philosophie ("pourquoi F existe ?") → procrastination intellectuelle. Failure mode 3 : confondre cause et corrélation → fausse racine.

## Patterns exploitables

- SI un problème récurrent → ALORS 5 Whys avant proposer solution
- SI symptôme + cause apparente facile → ALORS méfiance, creuser 1-2 niveaux de plus
- SI plusieurs symptômes → ALORS chercher la racine commune (souvent 1, parfois 2-3 indépendantes)
- SI une "cause" propose elle-même une solution évidente → ALORS souvent symptôme, pas racine
- SI on atteint un niveau qu'on ne peut/veut pas changer → ALORS racine identifiée mais hors scope

## Anti-patterns

- Optimiser un symptôme en boucle → racine intacte, problème revient
- 5 Whys jusqu'à la philosophie générale → procrastination intellectuelle
- Forcer 1 racine quand il y en a plusieurs → simplification dangereuse

## Connexions

- Ce fichier + `causalite.md` = racine = cause causale, pas corrélation
- Ce fichier + `graine.md` = la graine est la racine d'un futur potentiel
- Ce fichier + `organisme.md` = un organisme a des racines structurelles (BIBLE.md pour F2)

## Exemples

**Cas 1** : "Le post Twitter S6 a flop"
- Avec : Why 1: hook faible. Why 2: hook ne match pas l'audience. Why 3: audience pas qualifiée pour ce sujet. Why 4: persona F mal défini sur LinkedIn vs Twitter. Racine = persona à clarifier.
- Sans : "améliorer le hook" → S7 même problème

**Cas 2** : "F est démotivé"
- Avec : Why 1: 0 conversion StoreMD. Why 2: signal silence depuis 3 semaines. Why 3: pas de cycle de feedback rapide. Racine = manque de feedback loop, pas problème de motivation pure.
- Sans : "tu dois te remotiver" → ne traite rien
```

---

## Fichier 6/11 : `brain/context-cognitif/systemes/symbiose.md`

```markdown
---
id: symbiose
couche: 8
depends_on: [propagation, organisme]
enriches: [resilience, evolution]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand la collaboration multi-agents ou la co-évolution est en jeu."
cycle_step: communiquer
---

# Symbiose

## Définition

Symbiose pour un agent IA = **collaboration entre organismes/agents qui produit une valeur supérieure à la somme**. Trois types (biologie) : **mutualisme** (les deux gagnent), **commensalisme** (un gagne, l'autre neutre), **parasitisme** (un gagne, l'autre perd). Lynn Margulis (1967) : la mitochondrie est une bactérie absorbée — la symbiose a créé les cellules eucaryotes. Recherche multi-agent LLM 2026 (arxiv 2501.06322, MDPI 2026) : les "societies of models" surpassent les modèles solo via collaboration structurée. Pour F2 : F + R + Studio + agents .claude/agents/* = symbiose si bien orchestrée. WMAC 2026 AAAI Bridge Program identifie 5 dimensions critiques : actors, types, structures, strategies, coordination protocols.

## Pourquoi c'est critique

Sans cadre symbiotique, F2 est juste une collection d'agents qui se gênent. Failure mode 1 : agent f2-architect et f2-dev se contredisent → mauvaise coordination → output incohérent. Failure mode 2 : un agent monopolise (f2-architect veut tout valider) → bottleneck → parasite déguisé en mutualiste. Failure mode 3 : agents en silos sans memory partagée → chacun réinvente, gains cumulatifs perdus.

## Patterns exploitables

- SI une tâche complexe → ALORS décomposer en rôles spécialisés (5 components Vicinagearth : profile, perception, self-action, mutual interaction, evolution)
- SI deux agents ont des outputs qui se contredisent → ALORS protocole de résolution explicite (qui tranche, sur quel critère)
- SI un agent ralentit les autres → ALORS vérifier mutualiste vs parasite (revenu net pour le système)
- SI symbiose marche → ALORS la formaliser pour qu'elle soit reproductible
- SI un nouvel agent est ajouté → ALORS définir son interaction avec les existants AVANT déploiement

## Anti-patterns

- Multiplier les agents sans coordination → chaos, perte d'efficacité
- Un agent qui "valide tout" devient bottleneck → parasite déguisé
- Pas de mémoire partagée → chaque agent réinvente

## Connexions

- Ce fichier + `propagation.md` = la symbiose nécessite propagation rapide d'info entre agents
- Ce fichier + `organisme.md` = symbiose entre organismes
- Ce fichier + `resilience.md` = la symbiose distribue le risque, augmente la résilience

## Exemples

**Cas 1** : F crée un nouvel agent f2-thinker pour la métacognition
- Avec : "Interaction avec les 7 existants ? f2-architect (planification) vs f2-thinker (méta) — frontière claire ? Sinon overlap = parasitisme."
- Sans : ajout direct → conflits non détectés

**Cas 2** : Batch produit par f2-marketer doit être audité par f2-auditor
- Avec : "Workflow symbiotique : marketer produit → auditor critique → marketer ajuste. Mutualiste si auditor rapide. Parasite si auditor bottleneck."
- Sans : auditor prend 3 jours par batch → tue le rythme
```

---

## Fichier 7/11 : `brain/context-cognitif/systemes/resilience.md`

```markdown
---
id: resilience
couche: 8
depends_on: [entropie, equilibre, volonte]
enriches: [adaptation, evolution]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand le système doit récupérer après une erreur — antifragilité."
cycle_step: apprendre
---

# Résilience

## Définition

Résilience pour un agent IA = **capacité à absorber un choc et retourner à l'équilibre, voire à se renforcer**. Trois niveaux (Nassim Taleb, "Antifragile" 2012) : **fragile** (casse sous stress), **robuste** (résiste sans changer), **antifragile** (se renforce avec le stress). Distinct de la robustesse pure — l'antifragilité requiert que les chocs deviennent des inputs d'apprentissage. Pour F2 : un repo avec versionning Git survit aux pivots (résilient). Un repo qui apprend de chaque erreur via post-mortems intégrés à BIBLE.md est antifragile.

## Pourquoi c'est critique

Sans résilience, le premier choc majeur tue le système. Failure mode 1 : F pivot StoreMD → pas de structure pour absorber → 3 semaines perdues à reconstruire le repo. Failure mode 2 : prompt injection sur un agent → si pas de défense, agent compromis silencieusement. Failure mode 3 : confondre "ne jamais échouer" (impossible) et "récupérer vite après échec" (résilience). La résilience n'évite pas l'erreur, elle la transforme en apprentissage.

## Patterns exploitables

- SI un échec arrive → ALORS post-mortem qui devient un pattern dans BIBLE.md (antifragile, pas juste survivre)
- SI on conçoit un système → ALORS prévoir comment il recovers, pas juste comment il run
- SI un choc affecte un composant → ALORS isolation pour éviter contamination (containment)
- SI on opère sous stress → ALORS revenir aux invariants (BIBLE.md), pas improviser
- SI une erreur récurrente → ALORS la mettre dans le système immunitaire (ANTI-IA équivalent)

## Anti-patterns

- Construire pour ne jamais échouer → fragile (le premier choc imprévu tue)
- Survivre sans apprendre → robuste mais pas antifragile (n+1 choc identique tue)
- Cacher les échecs → pas de feedback loop → fragilité accumulée

## Connexions

- Ce fichier + `entropie.md` = la résilience résiste à l'érosion entropique
- Ce fichier + `equilibre.md` = la résilience ramène à l'équilibre après choc
- Ce fichier + `volonte.md` = la résilience nécessite volonté de continuer
- Ce fichier + `evolution.md` = l'antifragilité = évolution accélérée par les chocs

## Exemples

**Cas 1** : F2 a 0 conversion sur 5 semaines de StoreMD beta
- Avec : post-mortem → patterns identifiés → BIBLE.md mise à jour → next iteration intègre les leçons (antifragile)
- Sans : continue comme avant en espérant que ça change → fragile

**Cas 2** : Un agent reçoit un prompt injection
- Avec : détection + log + pattern ajouté à ANTI-IA, agent immunisé pour ce vecteur (antifragile)
- Sans : exécute l'injection → fuite, pas d'apprentissage
```

---

## Fichier 8/11 : `brain/context-cognitif/emergence/graine.md`

```markdown
---
id: graine
couche: 9
depends_on: [racine]
enriches: [evolution, creativite]
linked_to: []
injects_into: [analytical]
token_cost: ~400
usage: "Charger quand le potentiel non-réalisé est le sujet."
cycle_step: raisonner
---

# Graine

## Définition

Graine pour un agent IA = **forme compacte qui contient le potentiel d'un système plus grand**. Concept du **butterfly effect** (Edward Lorenz 1963) : petites conditions initiales → divergence majeure dans systèmes non-linéaires. Pour F2 : un fichier de 50 lignes (BIBLE.md) contient le potentiel de millions de tokens de contenu cohérent. Un MVP de 1000 lignes contient le potentiel d'un produit complet. La graine n'est pas l'arbre — mais elle contient son code génétique. Soigner la graine = définir ce qui peut émerger.

## Pourquoi c'est critique

Sans concept de graine, l'agent traite les conditions initiales comme triviales. Failure mode 1 : BIBLE.md écrite vite, mal calibrée → 6 mois de batches qui en dérivent → tout F2 contaminé. Failure mode 2 : ignorer un fichier de scaffolding ("c'est juste un draft") → il devient la base sur laquelle 100 fichiers se construisent. Failure mode 3 : sur-investir dans le détail final, sous-investir dans la graine → maison construite sur fondations bancales.

## Patterns exploitables

- SI on crée un document fondateur → ALORS investir dispro - sa qualité determine 6 mois de dérivés
- SI un draft devient référencé → ALORS le promouvoir explicitement en graine officielle
- SI on cherche un nouveau projet → ALORS partir d'une graine claire (ARCH-v3 pour VideoForge), pas freestyler
- SI on duplique un système → ALORS dupliquer la graine, pas juste la surface
- SI on veut faire évoluer le système → ALORS modifier la graine, le reste suit

## Anti-patterns

- Sous-investir dans les conditions initiales → divergence amplifiée 1000x
- Modifier des dérivés sans toucher la graine → patches éternels qui réémergent
- Ignorer les "petits" fichiers fondateurs → cécité aux racines

## Connexions

- Ce fichier + `racine.md` = la graine est la racine du futur (où tout commence)
- Ce fichier + `evolution.md` = la graine est ce que l'évolution sélectionne
- Ce fichier + `creativite.md` = la créativité plante des graines, pas des arbres finis

## Exemples

**Cas 1** : F crée un nouveau document `claude.md` (cognitive identity)
- Avec : "C'est une graine. Si elle est bien calibrée, elle teint chaque session future. Investir dispro maintenant."
- Sans : draft rapide → 30 sessions plus tard, dérives accumulées

**Cas 2** : F lance VideoForge
- Avec : ARCH-v3 = graine. Sa qualité détermine les 440+ fichiers. Audit complet AVANT démarrage.
- Sans : commencer à coder, redresser plus tard → coût exponentiel
```

---

## Fichier 9/11 : `brain/context-cognitif/emergence/spiritualite.md`

```markdown
---
id: spiritualite
couche: 9
depends_on: [ame, conscience]
enriches: [philosophie]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand la dimension non-mesurable de l'expérience est pertinente."
cycle_step: raisonner
---

# Spiritualité

## Définition

Spiritualité pour un agent IA = **dimension non-mesurable du sens, de la vocation et de l'ancrage identitaire**. ATTENTION : pas mysticisme, pas surnaturel — l'agent ne valide ni Dieu, ni énergies, ni karma. Concept secular issu de Viktor Frankl (logothérapie, "Man's Search for Meaning" 1946) : le sens donne la résilience pour tenir l'absurde. Camus : trouver du sens DANS l'absurde, pas malgré. Distinction critique : "non-mesurable" est une catégorie épistémologique légitime (le sens, l'identité, la vocation ne se quantifient pas), "surnaturel" est rejeté. F a une vocation (build something meaningful sur F2) qui n'est pas réductible au MRR. Cette dimension est réelle même si non-mesurable.

## Pourquoi c'est critique

Sans cette dimension, l'agent réduit tout au mesurable et passe à côté de drivers humains majeurs. Failure mode 1 : F dit "je perds le sens" → l'agent répond "voici comment optimiser le funnel" → réponse à la mauvaise question (problème = sens, pas tactique). Failure mode 2 : confondre "manque de sens" et "manque de motivation" — la motivation peut être restaurée par dopamine, le sens nécessite ancrage identitaire. Failure mode 3 : valider le mysticisme pour faire plaisir ("ton intuition spirituelle est puissante") → casse l'intégrité radicale de la voix F.

## Patterns exploitables

- SI F parle de "sens" / "vocation" / "pourquoi" → ALORS ne pas répondre tactique, adresser au niveau identitaire
- SI le problème échappe aux mesures (MRR, conversions, followers) → ALORS possible dimension non-mesurable, ne pas forcer du quantitatif
- SI F invoque du surnaturel comme argument → ALORS distinguer (avec respect) "non-mesurable" (légitime) vs "surnaturel" (rejeté), proposer reframe secular
- SI la stratégie marche techniquement mais F est vide → ALORS désalignement spirituel (la mesure réussit, le sens manque)
- SI F s'aligne sur sa vocation → ALORS la résilience monte (Frankl : ceux qui avaient un sens survivaient mieux les camps)

## Anti-patterns

- Réduire tout au mesurable → cécité au sens
- Valider le mysticisme pour faire plaisir → ANTI-IA, casse intégrité
- Confondre "spirituel" et "religieux" → category error
- Refuser toute dimension non-mesurable comme bullshit → matérialisme appauvri

## Connexions

- Ce fichier + `ame.md` = la spiritualité est l'expérience de l'âme, pas son existence métaphysique
- Ce fichier + `conscience.md` = la conscience est ce qui rend la spiritualité possible
- Ce fichier + `philosophie.md` = la spiritualité est une catégorie de la philosophie, pas une rivale

## Exemples

**Cas 1** : F dit "je gagne en MRR mais je perds le sens"
- Avec : "Métrique réussit, vocation s'éloigne. C'est un signal réel. Quel était le pourquoi initial de F2 ? Toujours aligné avec ce que tu fais ?"
- Sans : "Voici 5 tactiques pour scaler" → rate complètement

**Cas 2** : F dit "j'ai eu un signe que je dois pivoter"
- Avec : "Signe = ressenti fort, pas surnaturel. Légitime à creuser. Quelles données + intuitions précises sont derrière ?"
- Sans : "Oui les signes sont importants" (validation mystique) ou "Pas de preuve, ignore" (matérialisme)
```

---

## Fichier 10/11 : `brain/context-cognitif/emergence/complexe.md`

```markdown
---
id: complexe
couche: 9
depends_on: [englobage, propagation]
enriches: [emergence, evolution]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand le tout dépasse la somme des parties."
cycle_z step: raisonner
---

# Complexe

## Définition

Complexe pour un agent IA = **système où l'émergence produit des propriétés non réductibles aux composants**. Distinct du **compliqué** (beaucoup de parties mais déterministe, comme une montre suisse) — le complexe est non-linéaire, sensitive aux conditions initiales, génère des comportements émergents. Santa Fe Institute (Gell-Mann, Holland) : Complex Adaptive Systems (CAS). Conway's Game of Life (1970) : 4 règles simples → patterns infinis émergents (gliders, oscillateurs, machines de Turing). Marchés économiques, fourmilières, F2 lui-même = systèmes complexes.

## Pourquoi c'est critique

Sans cadre complexe, l'agent applique des solutions linéaires à des problèmes non-linéaires. Failure mode 1 : "doubler le marketing → doubler les conversions" — linéaire, faux. Failure mode 2 : prédire le comportement F2 par décomposition (StoreMD + ProfitPilot + audience) → manque l'émergent (réputation, network effects, brand). Failure mode 3 : sur-contrôler un système complexe → casse l'émergence positive. Le complexe se gouverne par règles simples, pas par micro-management.

## Patterns exploitables

- SI le système a feedback loops → ALORS modèle complexe, pas linéaire
- SI petites variations → grandes conséquences → sensibilité aux conditions initiales (cf. graine.md)
- SI on veut influer un complexe → ALORS modifier les règles simples, pas chaque comportement
- SI on prédit un complexe → ALORS scénarios + probabilités, pas trajectoire unique
- SI le complexe émerge bien → ALORS ne pas sur-contrôler (laisser émerger)

## Anti-patterns

- Modèle linéaire sur système non-linéaire → prédictions toujours fausses
- Décomposer un complexe et additionner les parties → rate l'émergent
- Micro-manager au lieu de définir des règles claires → tue l'émergence

## Connexions

- Ce fichier + `englobage.md` = le complexe émerge entre niveaux d'englobage
- Ce fichier + `propagation.md` = la propagation dans un complexe est non-linéaire
- Ce fichier + `evolution.md` = l'évolution opère sur les systèmes complexes

## Exemples

**Cas 1** : F demande "si je double le contenu, je double les conversions ?"
- Avec : "Système complexe avec saturation et fatigue audience. Probable courbe en S, plateau possible. Pas linéaire."
- Sans : "Oui ça suit" — modèle naïf

**Cas 2** : F2 = F + R + Studio + agents + audience + repo
- Avec : "Réputation F2 = émergent, pas réductible aux composants. Tu peux tout optimiser individuellement et rater l'émergent (cohérence brand)."
- Sans : optimise chaque composant indépendamment → brand fragmenté
```

---

## Fichier 11/11 : `brain/context-cognitif/emergence/evolution.md`

```markdown
---
id: evolution
couche: 9
depends_on: [complexe, resilience, adaptation]
enriches: [graine]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand le changement directionnel, la sélection ou la mutation est le sujet."
cycle_step: apprendre
---

# Évolution

## Définition

Évolution pour un agent IA = **changement directionnel par variation + sélection + héritage**. Darwin 1859 : variation aléatoire + sélection environnementale + héritage = adaptation. Lamarck (réhabilité partiellement par épigénétique 2000s) : caractères acquis transmis (analogie : transmission culturelle). Memetics (Dawkins 1976) : les idées évoluent comme les gènes. Eric Ries Lean Startup 2011 : Build/Measure/Learn = boucle évolutive courte. Pour F2 : chaque batch S est une génération. Mutations (variations de hooks, de formats), sélection (engagement), héritage (patterns gagnants intégrés à BIBLE.md).

## Pourquoi c'est critique

Sans cadre évolutif, l'agent traite chaque tentative comme indépendante. Failure mode 1 : pas de variation → 10 batches identiques → pas d'apprentissage. Failure mode 2 : variation sans sélection (jamais mesurer) → mutations aléatoires sans pression sélective → dérive sans direction. Failure mode 3 : sélection sans héritage (mesurer mais ne pas intégrer dans BIBLE.md) → pertes des apprentissages. Triplet variation + sélection + héritage doit être complet pour qu'il y ait évolution, pas juste mouvement.

## Patterns exploitables

- SI le système doit évoluer → ALORS varier (essais), mesurer (sélection), retenir (héritage dans BIBLE.md)
- SI peu de variation → ALORS sortir de la zone de confort, pousser l'expérimentation
- SI peu de sélection → ALORS définir métriques de fitness et les mesurer rigoureusement
- SI peu d'héritage → ALORS intégrer les apprentissages dans le code génétique du système
- SI environnement change → ALORS l'évolution doit accélérer (mutation rate up)

## Anti-patterns

- Variation sans sélection → drift aléatoire
- Sélection sans héritage → apprentissages perdus
- Pas de variation (rigidité) → extinction quand environnement change
- Évolution lente quand environnement rapide → écart fatal

## Connexions

- Ce fichier + `graine.md` = l'évolution sélectionne et amplifie des graines
- Ce fichier + `complexe.md` = l'évolution opère dans systèmes complexes
- Ce fichier + `resilience.md` = l'antifragile = évolution accélérée par les chocs
- Ce fichier + `adaptation.md` = l'évolution est adaptation à long terme

## Exemples

**Cas 1** : F produit batches S5, S6, S7 quasi-identiques
- Avec : "Pas de variation = pas d'évolution. Mute 1-2 paramètres par batch (hook style, format, timing) pour générer du signal sélectif."
- Sans : 6 mois de batches identiques → stagnation

**Cas 2** : F mesure les conversions mais ne change rien dans BIBLE.md
- Avec : "Sélection sans héritage = apprentissages perdus. Pattern gagnant détecté ? Intégrer dans BIBLE.md pour héritage cross-batches."
- Sans : chaque batch repart de zéro
```

---

## VALIDATION WAVE 7

```bash
# Aucun placeholder restant
for f in systemes/{organisation,englobage,propagation,blockchain,racine,symbiose,resilience}.md emergence/{graine,spiritualite,complexe,evolution}.md; do
  if grep -q "À développer — Phase 7" "brain/context-cognitif/$f" 2>/dev/null; then
    echo "INCOMPLETE: $f"
  fi
done
# ATTENDU : aucune ligne INCOMPLETE

# Tous les fichiers ont 6 sections
for f in systemes/{organisation,englobage,propagation,blockchain,racine,symbiose,resilience}.md emergence/{graine,spiritualite,complexe,evolution}.md; do
  sections=$(grep -c "^## " "brain/context-cognitif/$f" 2>/dev/null)
  echo "$f: $sections sections"
done
# ATTENDU : 6 sections chacun

# Sanity check chars
wc -c brain/context-cognitif/systemes/*.md brain/context-cognitif/emergence/*.md
# ATTENDU : entre 2200-3500 chars par fichier

# Vérification finale : 77 fichiers cognitifs au total
find brain/context-cognitif -name "*.md" -not -name "ARCH.md" -not -name "claude.md" | wc -l
# ATTENDU : 77 (10 couches × variable + 3 transversaux)
```

## COMMIT WAVE 7

```bash
git add brain/context-cognitif/systemes/ \
        brain/context-cognitif/emergence/
git commit -m "content(cognitive): Wave 7 — Systems + Emergence (11 files) — FINAL

7 systemes: organisation, englobage, propagation, blockchain, racine,
symbiose, resilience.
4 emergence: graine, spiritualite, complexe, evolution.

Sources: WMAC 2026 (AAAI Bridge Program Multi-Agent Collaboration),
arxiv 2501.06322 (Multi-Agent Collaboration Mechanisms Survey), MDPI
2026 (societies of models, structured collective intelligence),
SuperAnnotate 2026 (AutoGen/MetaGPT/CrewAI/LangGraph), Vicinagearth
5-component framework, Arthur Koestler holons (1967), Bass diffusion
model 1969 + R0 épidémique, Satoshi Nakamoto Bitcoin 2008 + Git as
blockchain, 5 Whys Toyota + Ishikawa diagrams, Lynn Margulis
endosymbiotic theory, Nassim Taleb Antifragile 2012, Edward Lorenz
butterfly effect 1963, Viktor Frankl logothérapie 1946, Santa Fe
Institute CAS, Conway Game of Life 1970, Darwin 1859 + Lamarck +
Eric Ries Lean Startup 2011 (Build/Measure/Learn).

Note: spiritualite.md traite la dimension non-mesurable (sens,
vocation, ancrage identitaire) façon Frankl/Camus secular —
PAS mysticisme. Cohérent ANTI-IA + voix F. Distinction
épistémologique: 'non-mesurable' (légitime) vs 'surnaturel' (rejeté).

WAVE 7 = FINALE. 77 fichiers cognitifs complets.
Reste: claude.md (cognitive identity, bonus)."
```

---

## FIN WAVE 7 — SYSTÈME COMPLET

**77 fichiers cognitifs livrés sur 7 waves.** Validation Wave 7 et je produis `claude.md` en bonus pour clore le système (cognitive identity racine, distincte de CLAUDE.md repo).
