# CONTEXT OPÉRATIONNEL F2 — @foundrytwo

**Dernière mise à jour :** 21 avril 2026
**Géré par :** R (100% — rédaction, publication, réponses, gestion)
**Ce fichier contient :** le cadre opérationnel du compte studio @foundrytwo — qui fait quoi, cycle hebdomadaire, relation avec le projet Claude "FoundryTwo".
**Ce fichier ne contient PAS :** la stratégie par plateforme (growth-marketing/), les algorithmes (algo.md), ni le contenu lui-même (produit par le projet Claude F2).

---

## 1. RÔLE DE F2

@foundrytwo est le **hub central** du studio. C'est la vitrine publique de FoundryTwo sur tous les réseaux.

| Ce que F2 fait | Ce que F2 ne fait JAMAIS |
|----------------|------------------------|
| Publier le contenu studio (build in public, data, milestones) | Cold outreach |
| Présenter le portfolio 6 SaaS et la progression par vertical | Engagement proactif (commenter/reply sur les posts d'autres comptes) |
| Partager les données terrain par vertical (e-com, agences, creators) | Prospecter |
| Recevoir le cross-engagement de R et F | Publier du contenu perso (c'est R et F) |
| Répondre aux replies et commentaires reçus sur ses propres posts | |
| Lancer les SaaS sur PH et IH | |

Le cold outreach et l'engagement proactif sont le rôle de R et F depuis leurs comptes personnels. F2 publie et reçoit. Le transfert organique vers F2 se fait via les mentions naturelles de R et F (2-3x/semaine).

---

## 2. F2 SUR CHAQUE PLATEFORME

R gère @foundrytwo sur toutes les plateformes. Les détails stratégiques et opérationnels de chaque plateforme sont dans les fichiers growth-marketing/ — ce tableau est un résumé de navigation.

| Plateforme | Handle | Ce que F2 y fait | Volume | Référence |
|-----------|--------|-----------------|--------|-----------|
| **Twitter** | @foundrytwo | Squelette éditorial 5j/sem. Contenu portfolio multi-vertical. Cross-engagement protocol R→F→F2. | 1 post/jour (lun-ven) | growth-marketing/twitter/f2/context.md |
| **LinkedIn** | /company/foundrytwo | Vitrine crédibilité. 0 contenu original. 0-1 repost/sem. | < 15 min/mois | growth-marketing/linkedin/f2/context.md |
| **IH** | @foundrytwo | Show IH à chaque lancement SaaS. Build in public portfolio. Update 1/sem (mercredi). | 1 post/sem + 15 min/jour | growth-marketing/ih/f2/context.md |
| **PH** | @foundrytwo | Lancement de chaque SaaS. Karma farming R+F en parallèle. | 1 lancement/mois + 15-20 min/sem karma | growth-marketing/ph/f2/context.md |

---

## 3. CYCLE HEBDOMADAIRE

### 3.1 Le process fixe

| Jour | Action F2 | Qui |
|------|----------|-----|
| **Vendredi soir** (horaire flexible) | Réunion R+F : revue de la semaine (métriques, top posts, learnings). Début du batch. R collecte les données pour les posts de la semaine suivante. | R + F |
| **Samedi** | R ouvre le projet Claude "FoundryTwo" et génère les 5 posts Twitter de la semaine (post par post avec les données réelles). Visuels si nécessaire (Canva Pro). Post IH mercredi préparé. | R |
| **Dimanche** | Archivage : copier plan-hebdo.md et progress-semaine.md dans archives/. Réinitialiser les deux fichiers pour la semaine suivante. | R |
| **Lundi → Vendredi** | Publication du contenu batché aux horaires prévus. Zéro rédaction en semaine. Répondre aux replies et commentaires via le projet Claude F2. | R |

**Rédaction :** R rédige les posts F2 + ses propres posts R. F rédige ses propres posts F. Chacun utilise son projet Claude.

### 3.2 Horaires de publication (CET)

Créneaux définis dans marketing/roadmap.md : 7h30 / 8h00 / 8h15 / 13h30 / 17h / 18h-19h.

R publie le contenu F2 aux créneaux adaptés à chaque plateforme (golden window Twitter, timing LinkedIn, etc. — définis dans les algo.md respectifs).

### 3.3 Dimanche = rythme réduit

Publication et engagement maintenus mais à rythme allégé. Le dimanche est dédié à l'archivage et à la préparation mentale de la semaine, pas à la production.

---

## 4. PROJET CLAUDE "FOUNDRYTWO" — ASSISTANT RÉDACTION

### 4.1 Ce que c'est

Un projet Claude pré-configuré qui gère TOUTE la rédaction du compte @foundrytwo. R ouvre une conversation dans le projet et parle naturellement — Claude produit avec la bonne voix, le bon format, les bonnes règles sans que R ait à re-expliquer le contexte.

### 4.2 Ce que le projet Claude F2 gère

| Activité | Exemple d'input de R | Output de Claude |
|----------|---------------------|-----------------|
| **Publication batch** (samedi) | "Post metrics lundi. Voici les chiffres : MRR total $X, 3 SaaS en dev, 200+ merchants contactés." | Tweet formaté avec la voix F2 et le bon format metrics portfolio. |
| **Post IH** (mercredi) | "Update build in public cette semaine. Voici les données portfolio : [X]. Learning : [Y]." | Post IH formaté selon le template (cf. ih/context.md §8.3). |
| **Réponse à un reply** (en semaine) | "Quelqu'un a répondu ça à notre post : [reply]. Réponds dans le ton F2." | Réponse adaptée à la voix studio F2. |
| **Réponse commentaire IH/PH** | "Commentaire reçu sur notre Show IH : [commentaire]. Réponds." | Réponse dans le ton IH (peer-to-peer, authentique). |

### 4.3 Configuration du projet Claude

| Élément | Fichier | Rôle |
|---------|---------|------|
| **System prompt** | f2/publication/prompt.md | Instructions permanentes : qui est F2, quelle voix, quelles règles, quels formats, quels anti-patterns. Actif dans chaque conversation. |
| **Fichiers de connaissance** | f2/publication/context.md + pipeline 6 SaaS (référence produits/) + fichiers growth-marketing/ pertinents | Le contexte complet que Claude doit connaître. Uploadés une fois dans le projet. |

Le détail du system prompt et des fichiers de connaissance est dans f2/publication/.

**Chaque nouveau SaaS actif → uploader son context.md dans le projet Claude F2** pour que Claude ait les détails produit à jour.

---

## 5. CADENCE MULTI-PRODUIT

FoundryTwo est un studio SaaS avec une cadence cible de 2 SaaS/mois. Le portfolio comprend 6 AI agents répartis sur 3 verticals (e-com Shopify, agences/freelancers, content creators). Chaque nouveau produit impacte F2 :

| Événement | Impact sur F2 |
|-----------|--------------|
| **Nouveau SaaS lancé** | Posts de lancement sur toutes les plateformes. Maker comment PH. Show IH. Bio/profils mis à jour ("X AI agents shipped"). |
| **Données multi-produit disponibles** | Les updates passent de mono-produit à portefeuille. Dashboard multi-produit dans les posts metrics et build in public. |
| **3+ produits live** | Positionnement "AI agent studio". Guides cross-produit sur IH. La cadence de production EST le contenu. |

Le contenu F2 ne parle JAMAIS d'un seul produit indéfiniment. Chaque produit enrichit le contenu. @foundrytwo = le studio, pas un SaaS individuel.

---

## 6. COMPTES PRODUITS (à créer au fur et à mesure)

Les comptes produits sont des **vitrines statiques** — pas des canaux de publication réguliers. Créés au fur et à mesure des lancements.

| Quand | Ce qui se passe |
|-------|----------------|
| **Launch day** | 2-3 tweets préparés au batch, copie-collés par F. |
| **Post-launch** | 1 tweet/semaine max (repost d'un thread F2 ou data post R). Optionnel. |
| **Pas de projet Claude dédié** | Les tweets produit sont rédigés dans le projet Claude F2. |
| **Si un produit décolle** (1000+ utilisateurs, communauté propre) | À ce moment-là, on réévalue et potentiellement on crée un projet Claude dédié. Pas avant. |

---

## 7. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Rôle |
|----------|-------------|------|
| marketing/context.md | marketing/ | Funnel, rôles par compte, inventaire comptes |
| marketing/roadmap.md | marketing/ | Squelette éditorial, batch, horaires, cadence |
| growth-marketing/context.md | growth-marketing/ | Build My Community, 4 piliers, matrice cross-plateforme |
| growth-marketing/roadmap.md | growth-marketing/ | Coordination cross-plateforme, allocation temps |
| growth-marketing/twitter/f2/context.md | growth-marketing/twitter/f2/ | Stratégie Twitter F2 |
| growth-marketing/linkedin/f2/context.md | growth-marketing/linkedin/f2/ | Stratégie LinkedIn F2 |
| growth-marketing/ih/f2/context.md | growth-marketing/ih/f2/ | Stratégie IH F2 |
| growth-marketing/ph/f2/context.md | growth-marketing/ph/f2/ | Stratégie PH F2 |
| f2/publication/context.md | f2/publication/ | Contexte pour le projet Claude F2 |
| f2/publication/prompt.md | f2/publication/ | System prompt du projet Claude F2 |
| f2/playbook-semaine.md | f2/ | Process semaine type |
| f2/plan-hebdo.md | f2/ | Plan de cette semaine |
| f2/progress-semaine.md | f2/ | Suivi de cette semaine |
| f2/roadmap.md | f2/ | Progression long terme |
