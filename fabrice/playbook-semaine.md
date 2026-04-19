# PLAYBOOK SEMAINE F — Process fixe

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `fabrice/context.md` (cadre opérationnel, planning quotidien, relation Claude/Grok, Build My Community)
**Ce fichier contient :** le process d'exécution semaine par semaine pour les comptes perso de F. Le QUOI faire est ici. Le QUOI publier cette semaine est dans `plan-hebdo.md`.
**Ce fichier ne couvre PAS :** la gestion du compte F2 (c'est R qui le gère).

F est full-time FoundryTwo. Distribution + build en parallèle. Les volumes distribution sont non-négociables : 30 interactions/jour + 10 outreach/jour.

---

## 1. VENDREDI SOIR — REVUE + INPUTS TECHNIQUES

**Qui :** R + F ensemble
**Quand :** Vendredi soir (horaire flexible)

### 1.1 Revue de la semaine (R + F)

La revue est menée par R (cf. romain/playbook-semaine.md §1.1). F participe pour :

| Action F | Détail |
|----------|--------|
| Donner son bilan technique | Features shippées, bugs résolus, décisions d'archi, surprises en prod |
| Cold outreach bilan par vertical | E-com : quels insights techniques ont marché. Creators : quels insights ont marché. |
| Analyser les posts F de la semaine | Lequel a le mieux performé ? Pourquoi ? |
| Réévaluer les Tier | Un Tier 2 qui engage régulièrement passe en Tier 1 |
| Engagement bilan | Quels commentaires techniques ont le mieux fonctionné ? |
| Décisions | Ajustements pour la semaine prochaine |

### 1.2 Inputs techniques pour le batch

| Action | Détail |
|--------|--------|
| Notes techniques brutes de la semaine | Tout ce que F a construit, debuggé, déployé |
| Sujets tendance (Grok) | Lancer le prompt `publication/grok/CREATOR-prompt.md` |
| Choisir les types de posts F | En fonction du mix de la phase actuelle et des notes techniques |

---

## 2. SAMEDI — RÉDACTION BATCH (F seul)

**Qui :** F seul
**Durée :** ~1h

### 2.1 Rédaction des posts Twitter F (projet Claude "Fabrice")

F ouvre le projet Claude "Fabrice" et travaille post par post :

| Étape | Action |
|-------|--------|
| 1 | Ouvrir une conversation dans le projet Claude F |
| 2 | Demander le premier post : type + notes techniques + vertical + angle + mots bruts |
| 3 | Claude génère → F lit, valide ou ajuste |
| 4 | Continuer jusqu'aux 5 posts Twitter de la semaine |

**Règle :** Post par post, pas en bloc. Chaque post reçoit ses propres notes techniques.

**Règle critique :** F rédige SES propres posts. R ne les rédige plus.

### 2.2 Rédaction des posts LinkedIn F

| Étape | Action |
|-------|--------|
| 1 | Demander le premier post LinkedIn : sujet + notes techniques + vertical + angle LinkedIn |
| 2 | OU demander l'adaptation d'un tweet : "Adapte ce tweet pour LinkedIn" + contexte technique |
| 3 | Continuer jusqu'aux 2-3 posts LinkedIn de la semaine |

### 2.3 Programmation

| Action | Détail |
|--------|--------|
| Programmer les tweets F | Scheduler Twitter natif. 1 post/jour (lundi-vendredi). |
| Programmer les posts LinkedIn F | Scheduler LinkedIn. 2-3 posts/semaine. |
| Préparer les replies cross-engagement | F rédige au brouillon ses replies pour les posts R et F2 de la semaine. |

### 2.4 Remplir le plan-hebdo.md

| Action | Détail |
|--------|--------|
| Copier les posts Twitter F finaux | Chaque jour avec son post prévu et son type |
| Copier les posts LinkedIn F | Jours prévus et sujets |
| Ajouter les objectifs de la semaine | Métriques visées, focus spécifique |

---

## 3. DIMANCHE — ARCHIVAGE

**Durée :** ~10 min

| Étape | Action |
|-------|--------|
| 1 | Copier `plan-hebdo.md` dans `archives/` |
| 2 | Copier `progress-semaine.md` dans `archives/` |
| 3 | Réinitialiser `plan-hebdo.md` avec le contenu batché |
| 4 | Réinitialiser `progress-semaine.md` avec les sections vides |

---

## 4. LUNDI → VENDREDI — EXÉCUTION

**Règle absolue :** Zéro rédaction de posts en semaine. Tout est batché. Les seuls contenus rédigés en live sont les cold outreach replies.

La routine quotidienne est dans `daily-checklist.md`. Résumé :

| Bloc | Action | Volume | Priorité |
|------|--------|--------|----------|
| Matin (8h-10h) | Cold outreach + engagement Twitter | 10 outreach + 15 interactions | 🔴 NON NÉGOCIABLE |
| 10h-12h | Publication post batché + engagement LinkedIn | Post du jour + 15 interactions | 🟡 IMPORTANT |
| 13h-14h | Cross-engagement sur posts R et F2 | Replies techniques | 🟡 IMPORTANT |
| 14h-17h | Build (code SaaS) + réponses aux replies | Code + replies < 2h | 🟢 FLEXIBLE |
| Soir | Engagement complémentaire si nécessaire | Compléter les 30/jour | 🟢 FLEXIBLE |

### 4.1 Remplir le progress-semaine.md

Léger. En semaine, noter uniquement ce qui sort de l'ordinaire (merchant qui reply, creator qui DM, cold qui convertit, post qui performe).

---

## 5. SEMAINES DE LANCEMENT (SaaS)

| Normal | Semaine de lancement |
|--------|---------------------|
| Cold outreach normal | Launch day = F répond aux questions techniques en priorité |
| 5 posts/semaine | Post de lancement technique REMPLACE le post du jour |
| Engagement normal | Launch day = engagement intensifié |

---

## 6. RÉCAP VISUEL

```
VENDREDI SOIR          SAMEDI               DIMANCHE           LUNDI → VENDREDI
─────────────          ──────               ────────           ────────────────
R + F ensemble         F seul               F seul             F full-time

Revue semaine          Projet Claude F      Archiver           8h-10h COLD + ENGAGEMENT 🔴
├── Inputs tech F      ├── 5 posts Twitter  ├── plan-hebdo     10h-12h PUBLICATION + LINKEDIN 🟡
├── Cold par vertical  ├── 2-3 posts LI     ├── progress       13h-14h CROSS-ENGAGEMENT R+F2 🟡
├── Top/flop posts F   ├── Programmer       └── Vérification   14h-17h BUILD + GESTION 🟢
├── Rééval. Tier       │                                       Soir COMPLÉMENTAIRE 🟢
└── Décisions          Remplir plan-hebdo
```

---

## 7. CE QUI NE CHANGE PAS vs CE QUI CHANGE

| Fixe (ce playbook) | Variable (plan-hebdo.md) |
|--------------------|-------------------------|
| Le process vendredi/samedi/dimanche/semaine | Le contenu spécifique de chaque post |
| Les volumes (10 cold/jour, 30 interactions/jour) | Les notes techniques de la semaine |
| Le protocole cross-engagement | Les cibles cold outreach du jour |
| Le flow Grok → Claude → publication | Les angles et sujets spécifiques |
