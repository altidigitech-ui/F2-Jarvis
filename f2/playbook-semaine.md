# PLAYBOOK SEMAINE F2 — Process fixe

**Dernière mise à jour :** 04 avril 2026
**Hérite de :** `f2/context.md` (cadre opérationnel, cycle hebdomadaire, projet Claude)
**Ce fichier contient :** le process d'exécution semaine par semaine. Écrit une fois, ne change que si le process évolue. Le QUOI faire est ici. Le QUOI publier cette semaine spécifiquement est dans `plan-hebdo.md`.

---

## 1. VENDREDI SOIR — REVUE + DÉBUT BATCH

**Qui :** R + F ensemble
**Durée :** ~45 min-1h
**Quand :** Vendredi soir (horaire flexible)

### 1.1 Revue de la semaine (R + F)

| Action | Détail |
|--------|--------|
| Ouvrir le Growth Tracker | Relever les métriques portfolio de la semaine : signups par SaaS, MRR total, conversion, usage par vertical |
| Relever les UTM | Quels canaux ont généré du trafic cette semaine (Twitter, LinkedIn, IH, PH, Reddit) |
| Analyser les posts F2 de la semaine | Lequel a le mieux performé ? Pourquoi ? Lequel a le moins bien marché ? Pourquoi ? |
| Identifier les patterns | Quels sujets ont déclenché des replies ? Quels formats ont marché ? |
| Données terrain de la semaine | Nouvelles reviews analysées, threads Reddit, données Mastercard, insights terrain par vertical |
| Feedbacks cold outreach | Quelles questions reviennent le plus ? Quels types de problèmes sont mentionnés par vertical ? |
| Décisions | Ajustements pour la semaine prochaine. Rien d'improvisé en semaine. |

### 1.2 Début batch — Collecter les inputs

| Action | Détail |
|--------|--------|
| Préparer les données pour chaque jour du squelette | Lundi metrics : métriques portfolio. Mardi hot take : douleur e-com/agences/creators (données terrain). Mercredi data thread : données terrain agrégées. Jeudi communauté : question pour merchants/freelancers/creators. Vendredi build in public : recap portfolio. |
| Inputs de F | F donne les éléments techniques de la semaine (features shipped, bugs résolus, décisions d'archi, progression des SaaS en dev). R les transformera en contenu F2 samedi. |
| Préparer les données IH | Si le mercredi a un build in public update IH en plus du thread Twitter, collecter les données spécifiques (plus détaillées, ton IH). |

---

## 2. SAMEDI — RÉDACTION BATCH (R seul)

**Qui :** R seul
**Durée :** ~1h30-2h
**Outil :** Projet Claude "FoundryTwo"

R rédige les posts F2 (~1h). F rédige ses propres posts F de son côté.

### 2.1 Rédaction des 5 posts Twitter

R ouvre le projet Claude "FoundryTwo" et travaille post par post :

| Étape | Action |
|-------|--------|
| 1 | Ouvrir une conversation dans le projet Claude F2 |
| 2 | Demander le post du lundi : "Post metrics lundi. Voici les chiffres portfolio : [données]" |
| 3 | Claude génère → R lit, valide ou ajuste |
| 4 | Demander le post du mardi : "Hot take mardi. Données terrain : [angle]" |
| 5 | Continuer pour mercredi, jeudi, vendredi |
| 6 | À la fin : 5 posts prêts à copier-coller |

**Règle :** Post par post, pas en bloc. Chaque post reçoit ses propres données. Ça évite le contenu générique.

### 2.2 Rédaction du post IH (si mercredi)

Dans la même session ou une nouvelle conversation :
- Donner les données de la semaine + le learning central
- Claude génère le post long-form au format IH
- R valide le titre (~51 car.), le ton (pair-à-pair), la structure

### 2.3 Visuels

| Action | Outil | Quand |
|--------|-------|-------|
| Graphiques métriques portfolio (si metrics lundi) | Canva Pro | Samedi |
| Visuels données terrain (si data thread mercredi) | Canva Pro | Samedi |
| Visuels récurrents (template brand) | Canva Pro (templates F2) | Samedi |

### 2.4 Programmation

| Action | Détail |
|--------|--------|
| Programmer les 5 tweets | Scheduler Twitter natif ou outil tiers. 1 post/jour, lun-ven. |
| Horaire de publication | Choisir parmi les créneaux définis : 7h30 / 8h00 / 8h15 / 13h30 / 17h / 18h-19h CET |
| Préparer les replies cross-engagement | R rédige au brouillon ses replies pour chaque post F2 (gain de temps en semaine) |

### 2.5 Remplir le plan-hebdo.md

| Action | Détail |
|--------|--------|
| Copier les 5 posts finaux dans plan-hebdo.md | Chaque jour avec son post prévu |
| Ajouter les objectifs de la semaine | Métriques visées, focus spécifique |
| Ajouter le post IH si prévu | Mercredi |

---

## 3. DIMANCHE — ARCHIVAGE + PRÉPARATION

**Qui :** R
**Durée :** ~15-20 min

| Étape | Action |
|-------|--------|
| 1 | Copier `plan-hebdo.md` de la semaine écoulée dans `archives/` (nommer : `plan-hebdo-semaine-[N].md`) |
| 2 | Copier `progress-semaine.md` de la semaine écoulée dans `archives/` (nommer : `progress-semaine-[N].md`) |
| 3 | Réinitialiser `plan-hebdo.md` avec le contenu batché samedi (déjà rempli) |
| 4 | Réinitialiser `progress-semaine.md` avec les sections vides pour la nouvelle semaine |
| 5 | Vérification : les 5 posts sont programmés, les replies cross-engagement sont au brouillon |

---

## 4. LUNDI → VENDREDI — EXÉCUTION

**Règle absolue :** Zéro rédaction en semaine. Tout est batché. En semaine, R ne fait que publier, cross-engager, et répondre aux replies.

### 4.1 Publication quotidienne (R)

Chaque jour, quand le post F2 est publié, la séquence de cross-engagement se déclenche. Durée totale : 15 minutes max.

| Étape | Quand (après publication du post) | Action | Qui |
|-------|----------------------------------|--------|-----|
| 1 | 0 min — le post sort | Le post F2 du jour est publié (programmé ou R clique "publier") | R |
| 2 | +2 min | R reply depuis @delgado_ro72224 (commentaire de valeur préparé au brouillon) | R |
| 3 | +5 min | F reply depuis @FabGangi (angle technique) | F |
| 4 | +10 min | R se connecte sur @foundrytwo et répond aux replies de R et F (signal 150x) | R via F2 |
| 5 | +15 min | R et F like + RT les replies de l'autre. Cross-engagement terminé. | R + F |
| 6 | Au fil de la journée | Répondre aux replies organiques via le projet Claude F2 si besoin | R via F2 |

L'algo Twitter juge la vélocité dans les 15-60 premières minutes. C'est pour ça que le cross-engagement doit être terminé en 15 min — pas 30, pas 1h.

### 4.2 Réponses aux replies/commentaires (R)

| Règle | Détail |
|-------|--------|
| Répondre à TOUT | Chaque reply reçue = réponse. Pas d'exception. |
| Délai | Twitter : dans les 2h. IH : dans les 24h. |
| Voix | Toujours la voix F2 (we, data-driven, pas défensif, question de suivi) |
| Outil | Si R a besoin d'aide pour formuler : ouvrir le projet Claude F2, donner le commentaire, Claude produit la réponse |

### 4.3 Publication IH mercredi

| Étape | Action |
|-------|--------|
| 1 | Publier le post IH build in public (rédigé au batch samedi) |
| 2 | Répondre à chaque commentaire reçu (obligatoire — commentaires = signal #1 sur IH) |

### 4.4 Mercredi ou jeudi — Post IH bonus (optionnel)

Si un Ask IH ou guide est prévu cette semaine (cf. plan-hebdo.md), le publier jeudi. Pas forcer — uniquement si la matière est là.

### 4.5 Remplir le progress-semaine.md au fil de la semaine

En semaine, R note uniquement ce qui est NOTABLE — pas de tracking quotidien systématique. Les métriques détaillées sont dans les outils (Growth Tracker, Twitter Analytics, IH stats). Le progress-semaine est un carnet de bord, pas un dashboard.

| Quand | Quoi noter (30 secondes) |
|-------|-------------------------|
| Quand quelque chose de notable arrive | Un prospect qui DM, un influenceur qui reply, un commentaire IH de qualité, une mention organique de F2, un post qui performe anormalement bien ou mal. |
| Quand un insight apparaît | Un besoin marché révélé dans un commentaire, un pattern dans les replies, une idée pour un prochain post. |
| Vendredi à la revue | Ouvrir les outils (Growth Tracker, analytics). Croiser les métriques avec les notes de la semaine. Synthèse : semaine bonne/moyenne/mauvaise + pourquoi + décisions pour la semaine suivante. |

**Règle :** Si rien de notable ne s'est passé, le progress-semaine peut avoir 3 lignes. C'est OK. La valeur est dans le croisement notes + métriques le vendredi, pas dans le remplissage quotidien.

---

## 5. SEMAINES DE LANCEMENT (SaaS)

Quand un SaaS lance, la semaine est différente. Le playbook normal est remplacé par le protocole de lancement.

### 5.1 Ce qui change

| Normal | Semaine de lancement |
|--------|---------------------|
| Squelette éditorial 5 jours | Le post de lancement REMPLACE le post du jour (le lundi si lancement lundi) |
| 15 min cross-engagement | Launch day = R disponible toute la journée pour répondre (Twitter + IH + PH) |
| Pas de PH | Launch day PH : protocole 24h complet (cf. ph/context.md §4) |
| 1 post IH/sem | Show IH publié le jour du lancement (cf. ih/f2/roadmap.md §2.2) |

### 5.2 Checklist semaine de lancement

| Jour | Action |
|------|--------|
| **Vendredi (batch)** | Préparer le post de lancement Twitter + Show IH + maker comment PH + emails waitlist + posts LinkedIn |
| **Samedi** | Finaliser les assets. Tout doit être prêt. |
| **Dimanche** | Vérification finale. Archivage normal. |
| **Lundi (launch day)** | Exécution du protocole de lancement (cf. growth-marketing/roadmap.md §2.2 et ph/context.md §4) |
| **Mardi-vendredi** | Retour au squelette éditorial normal. Répondre aux derniers commentaires du lancement. Post-launch (export contacts, retour d'expérience). |

---

## 6. RÉCAP VISUEL — LA SEMAINE TYPE

```
VENDREDI SOIR          SAMEDI               DIMANCHE           LUNDI → VENDREDI
─────────────          ──────               ────────           ────────────────
R + F ensemble         R seul               R seul             R (+ F cross-engagement)
                                                               
Revue semaine          Projet Claude F2     Archiver           Publier post programmé
├── Métriques portf.   ├── Post lundi       ├── plan-hebdo     ├── Cross-engagement 15 min
├── UTM                ├── Post mardi       ├── progress       ├── Répondre aux replies
├── Top/flop posts     ├── Post mercredi    Réinitialiser      ├── IH mercredi
├── Patterns           ├── Post jeudi       ├── plan-hebdo     ├── Remplir progress
├── Données terrain        ├── Post vendredi    └── progress       └── Zéro rédaction
└── Décisions          ├── Post IH                              
                       ├── Visuels                              
Inputs pour batch      └── Programmer                           
├── Données portf.                                              
├── Données terrain                                                 
└── Inputs F                                                    
```

---

## 7. CE QUI NE CHANGE PAS vs CE QUI CHANGE

| Fixe (ce playbook) | Variable (plan-hebdo.md) |
|--------------------|-------------------------|
| Le process vendredi/samedi/dimanche/semaine | Le contenu spécifique de chaque post |
| L'ordre des étapes | Les données de la semaine (portfolio) |
| Le squelette éditorial (quel pilier quel jour) | Les métriques visées cette semaine |
| Le protocole cross-engagement (timing, séquence) | Les objectifs spécifiques |
| Les règles de réponse aux replies | Les replies reçues et les réponses données |
