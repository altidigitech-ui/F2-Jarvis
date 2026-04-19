# PLAYBOOK SEMAINE R — Process fixe

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `romain/context.md` (cadre opérationnel, planning quotidien, relation Claude/Grok, Build My Community)
**Ce fichier contient :** le process d'exécution semaine par semaine pour les comptes perso de R. Écrit une fois, ne change que si le process évolue. Le QUOI faire est ici. Le QUOI publier cette semaine spécifiquement est dans `plan-hebdo.md`.
**Ce fichier ne couvre PAS :** la gestion du compte F2 (cf. f2/playbook-semaine.md).

---

## 1. VENDREDI SOIR — REVUE + DÉBUT BATCH

**Qui :** R + F ensemble
**Quand :** Vendredi soir (horaire flexible)

### 1.1 Revue de la semaine (R + F)

| Action | Détail |
|--------|--------|
| Ouvrir le Growth Tracker | Relever les métriques de la semaine : signups, MRR, conversion, top produits |
| Relever les UTM | Quels canaux ont généré du trafic cette semaine (Twitter, LinkedIn, IH) |
| Cold outreach bilan | Combien d'outreachs par vertical (e-com / agence), combien de réponses, combien de clics, combien de signups. Taux de réponse. |
| Analyser les posts R de la semaine | Lequel a le mieux performé ? Pourquoi ? Lequel a le moins bien marché ? Pourquoi ? |
| Analyser les posts F2 de la semaine | Même analyse (R gère F2) |
| Engagement bilan | Quels commentaires ont le mieux fonctionné ? Quels Tier ont le plus répondu ? |
| Réévaluer les Tier | Un Tier 2 qui engage régulièrement passe en Tier 1. Un Tier 1 inactif est remplacé. |
| Feedbacks et patterns | Quelles questions reviennent le plus dans le cold outreach et les replies ? Quels patterns terrain ? |
| Décisions | Ajustements pour la semaine prochaine. Rien d'improvisé en semaine. |

### 1.2 Début batch — Collecter les inputs

| Action | Détail |
|--------|--------|
| Donn��es terrain de la semaine | Patterns des conversations, insights par vertical, nouvelles données |
| Cold outreach bilan par vertical | E-com : quels insights ont marché. Agences : quels insights ont marché. |
| Sujets tendance (Grok) | Lancer le prompt `publication/grok/ECOM-prompt.md` pour trouver les sujets qui ont performé cette semaine |
| Inputs de F | F donne les éléments techniques de la semaine. Pour les posts F2 principalement. |
| Choisir les types de posts R pour la semaine | En fonction du mix de la phase actuelle (cf. roadmap.md) et des données disponibles |

---

## 2. SAMEDI — RÉDACTION BATCH

**Qui :** R seul (posts R + posts F2) + F seul (posts F)

### 2.1 Rédaction des posts Twitter R (projet Claude "Romain")

R ouvre le projet Claude "Romain" et travaille post par post :

| Étape | Action |
|-------|--------|
| 1 | Ouvrir une conversation dans le projet Claude R |
| 2 | Demander le premier post : type + données terrain + angle + mots bruts (cf. publication/claude/prompt.md) |
| 3 | Claude génère → R lit, valide ou ajuste |
| 4 | Passer au post suivant avec ses propres données |
| 5 | Continuer jusqu'aux 7 posts Twitter de la semaine |

**Règle :** Post par post, pas en bloc. Chaque post reçoit ses propres données et son propre angle.

### 2.2 Rédaction des posts LinkedIn R (projet Claude "Romain")

| Étape | Action |
|-------|--------|
| 1 | Demander le premier post LinkedIn : sujet + données terrain + angle LinkedIn + mots bruts |
| 2 | OU demander l'adaptation d'un tweet déjà rédigé : "Adapte ce tweet pour LinkedIn" + données supplémentaires |
| 3 | Claude génère le post long (800-1300 car.) → R valide |
| 4 | Continuer jusqu'aux 3-5 posts LinkedIn de la semaine |

### 2.3 Visuels

| Action | Outil | Quand |
|--------|-------|-------|
| Graphiques métriques (si data post LinkedIn) | Canva Pro | Samedi |
| Carousels LinkedIn (Phase 2+) | Canva Pro (structure texte par Claude, visuels par R) | Samedi |

### 2.4 Programmation

| Action | Détail |
|--------|--------|
| Programmer les tweets R | Scheduler Twitter natif. 1 post/jour, créneaux optimaux. |
| Programmer les posts LinkedIn R | Scheduler LinkedIn ou publication manuelle. 3-5 posts/semaine. |
| Préparer les replies cross-engagement | R rédige au brouillon ses replies pour les posts F2 et F de la semaine (gain de temps en semaine). |

### 2.5 Rédaction F2

Après les posts R perso, R switch vers le projet Claude "FoundryTwo" pour le batch F2. Process détaillé dans `f2/playbook-semaine.md §2`.

F rédige ses propres posts F perso dans le projet Claude "Fabrice". ~1h.

### 2.6 Remplir le plan-hebdo.md

| Action | Détail |
|--------|--------|
| Copier les posts Twitter R finaux dans plan-hebdo.md | Chaque jour avec son post prévu et son type |
| Copier les posts LinkedIn R | Jours prévus et sujets |
| Ajouter les objectifs de la semaine | Métriques visées, focus spécifique |

---

## 3. DIMANCHE — ARCHIVAGE + PRÉPARATION

**Qui :** R
**Durée :** ~15-20 min

| Étape | Action |
|-------|--------|
| 1 | Copier `plan-hebdo.md` de la semaine écoulée dans `archives/` |
| 2 | Copier `progress-semaine.md` de la semaine écoulée dans `archives/` |
| 3 | Réinitialiser `plan-hebdo.md` avec le contenu batché samedi |
| 4 | Réinitialiser `progress-semaine.md` avec les sections vides |
| 5 | Vérification : les posts Twitter sont programmés, les posts LinkedIn sont prêts, les replies cross-engagement sont au brouillon |

Engagement à rythme réduit le dimanche.

---

## 4. LUNDI → VENDREDI — EXÉCUTION

**Règle absolue :** Zéro rédaction de posts en semaine. Tout est batché. Les seuls contenus rédigés en live sont les cold outreach replies (pas batchable — dépend des cibles du jour).

R est full-time. La routine quotidienne est dans `daily-checklist.md`. Les horaires sont indicatifs, les volumes sont non négociables.

### 4.1 Résumé des blocs quotidiens

| Bloc | Action | Volume | Priorité |
|------|--------|--------|----------|
| Matin (8h-10h) | Cold outreach + engagement Twitter | 10 outreach + 15 interactions | 🔴 NON NÉGOCIABLE |
| 10h-12h | Publication posts batchés + engagement LinkedIn | Post du jour + 15 interactions | 🟡 IMPORTANT |
| 13h-14h | F2 + cross-engagement sur posts F et F2 | Post F2 + replies | 🟡 IMPORTANT |
| 14h-17h | Gestion, réponses, coordination avec F | Toutes replies < 2h | 🟢 FLEXIBLE |
| Soir | Engagement complémentaire si nécessaire | Compléter les 30/jour | 🟢 FLEXIBLE |

### 4.2 Remplir le progress-semaine.md au fil de la semaine

Le suivi doit rester léger. En semaine, noter uniquement ce qui sort de l'ordinaire.

| Quand | Quoi noter (30 secondes) |
|-------|-------------------------|
| Quand quelque chose de notable arrive | Un prospect qui DM, un influenceur qui reply, un cold outreach qui convertit, un post qui performe anormalement |
| Quand un insight apparaît | Un besoin marché révélé, un pattern dans les réponses, une idée pour un prochain post |
| Vendredi à la revue | Ouvrir les outils (Growth Tracker, Twitter Analytics, LinkedIn Analytics). Croiser les métriques. |

---

## 5. SEMAINES DE LANCEMENT (SaaS)

Quand un SaaS lance, la semaine de R est différente.

| Normal | Semaine de lancement |
|--------|---------------------|
| Cold outreach insights terrain | Launch day = R répond à TOUT en priorité. Cold outreach continue mais les réponses aux commentaires du lancement passent en priorité. |
| 7 posts Twitter R | Le post de lancement REMPLACE le post du jour. |
| Engagement proactif normal | Launch day = engagement intensifié. |

---

## 6. RÉCAP VISUEL — LA SEMAINE TYPE

```
VENDREDI SOIR          SAMEDI               DIMANCHE           LUNDI → VENDREDI
─────────────          ──────               ────────           ────────────────
R + F ensemble         R seul + F seul      R seul             R full-time
                                                               
Revue semaine          Projet Claude R      Archiver           8h-10h COLD + ENGAGEMENT 🔴
├── Métriques          ├── 7 posts Twitter  ├── plan-hebdo     10h-12h PUBLICATION + LINKEDIN 🟡
├── UTM                ├── 3-5 posts LI     ├── progress       13h-14h F2 + CROSS-ENGAGEMENT 🟡
├── Cold par vertical  ├── Visuels          Réinitialiser      14h-17h GESTION 🟢
├── Top/flop posts     ├── Programmer       └── Vérification   Soir COMPLÉMENTAIRE 🟢
├── Engagement bilan   │                                       
├── Rééval. Tier       Projet Claude F2                        FIN DE JOURNÉE
└── Décisions          ├── Posts F2                             └── Logger + progress (30 sec)
                       ├── Programmer                           
Inputs pour batch      │                                       
├── Données terrain    F rédige F seul                          
├── Patterns terrain       (projet Claude F)                        
├── Sujets Grok                                                 
└── Inputs F                                                    
```

---

## 7. CE QUI NE CHANGE PAS vs CE QUI CHANGE

| Fixe (ce playbook) | Variable (plan-hebdo.md) |
|--------------------|-------------------------|
| Le process vendredi/samedi/dimanche/semaine | Le contenu spécifique de chaque post |
| Les volumes (10 cold/jour, 30 interactions/jour) | Les données de la semaine |
| Le protocole cross-engagement (timing, séquence) | Les cibles cold outreach du jour |
| Les règles de réponse aux replies | Les types de posts choisis cette semaine |
| Le flow Grok → Claude → publication | Les angles et sujets spécifiques |
