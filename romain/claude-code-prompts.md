# PROMPTS CLAUDE CODE R — Mise à jour quotidienne du repo

## Usage : copie-colle ces prompts dans Claude Code pour mettre à jour le repo au fil de la journée et de la semaine. R gère les fichiers romain/ ET f2/ (pour F2, voir f2/claude-code-prompts.md).

---

## 1. AJOUTER UN ÉVÉNEMENT NOTABLE (quotidien, 30 sec)

Prompt :

"Dans romain/progress-semaine.md, ajoute cette ligne dans le tableau ÉVÉNEMENTS NOTABLES :
| [DATE] | [DESCRIPTION] | [PLATEFORME] | [ACTIVITÉ] | [ACTION] |"

Exemple :

"Dans romain/progress-semaine.md, ajoute cette ligne dans le tableau ÉVÉNEMENTS NOTABLES :
| 07/04 | Merchant Shopify a reply au cold outreach — intéressé par les chargebacks | Twitter | cold | Follow-up envoyé |"

---

## 2. AJOUTER UN INSIGHT (quotidien, 30 sec)

Prompt :

"Dans romain/progress-semaine.md, ajoute cet insight dans la section INSIGHTS ET PATTERNS :
- [DESCRIPTION]"

---

## 3. MARQUER UN POST COMME PUBLIÉ (après chaque publication)

Prompt Twitter R :

"Dans romain/plan-hebdo.md, marque le post Twitter de [JOUR] comme ✅ Publié [HEURE]"

Prompt LinkedIn R :

"Dans romain/plan-hebdo.md, marque le post LinkedIn de [JOUR] comme ✅ Publié [HEURE]"

---

## 4. MARQUER UN CROSS-ENGAGEMENT COMME FAIT (après chaque reply)

Prompt :

"Dans romain/cross-engagement-tracker.md, pour [JOUR], marque le cross-engagement sur [Tweet F / Tweet F2 / LinkedIn F] comme ✅ avec heure reply [HEURE]"

---

## 5. LOGGER UN COLD OUTREACH (après chaque envoi)

Prompt :

"Dans romain/cold/cold-outreach-log.md, ajoute cette ligne dans le LOG :
| [#] | [DATE] | [PLATEFORME] | [VERTICAL] | [CIBLE] | [INSIGHT PARTAGÉ] | ✅ | | | [NOTES] |"

Exemple :

"Dans romain/cold/cold-outreach-log.md, ajoute cette ligne dans le LOG :
| 1 | 07/04 | Twitter | e-com | @merchant_shopify | $800/mois chargebacks, 71% friendly fraud | ✅ | | | Premier cold post-pivot |"

---

## 6. REMPLIR LES MÉTRIQUES VENDREDI (revue, 10 min)

Prompt :

"Dans romain/progress-semaine.md, remplis les métriques de la section MÉTRIQUES VENDREDI avec ces données :
Cold outreach : [X] réalisés, [X]% réponse, [X] clicks UTM, [X] signups, [X] clients payants
Par vertical : E-com [X], Agence [X]
Par plateforme : Twitter [X], LinkedIn [X]
Twitter R : [X] impressions, [X] replies reçues, [X] replies organiques (hors cross-engagement), [X]% engagement, [X] profile visits, [X] followers total
LinkedIn R : [X] impressions, [X] commentaires, [X] profile visits, [X] connexions ajoutées
Meilleur post Twitter (lequel + pourquoi) : [DESCRIPTION]
Pire post Twitter (lequel + pourquoi) : [DESCRIPTION]
Meilleur post LinkedIn (lequel + pourquoi) : [DESCRIPTION]
Engagement : [X] interactions total (Twitter + LinkedIn)
Meilleur commentaire (plateforme + post + pourquoi) : [DESCRIPTION]
Tier 1 qui a engagé avec R : [LISTE]
Signups totaux : [X]
MRR : [X]
DMs reçus : [X]
Mentions organiques : [X]
Synthèse : [Bonne/Moyenne/Mauvaise] parce que [RAISON]
Décisions pour la semaine prochaine : [LISTE]"

---

## 7. METTRE À JOUR LES MÉTRIQUES COLD OUTREACH (vendredi)

Prompt :

"Dans romain/cold/cold-outreach-log.md, remplis la section MÉTRIQUES SEMAINE avec ces données :
Total outreachs envoyés : [X]
Par plateforme : Twitter [X] / LinkedIn [X]
Par vertical : E-com [X] / Agence [X]
Taux de réponse : [X]%
Réponses positives : [X]
Réponses négatives : [X]
Pas de réponse : [X]
Suivi DM envoyés : [X]
Meilleur outreach (lequel + pourquoi) : [DESCRIPTION]
Pattern observé : [DESCRIPTION]"

---

## 8. METTRE À JOUR LE SUIVI COMPTES (vendredi)

Prompt :

"Dans romain/suivi-comptes.md, mets à jour les métriques :
Twitter @delgado_ro72224 : Following [X], Followers [X]
Twitter @foundrytwo : Following [X], Followers [X]
LinkedIn Romain : Connexions totales [X]
Page LinkedIn F2 : Abonnés [X]
PH perso R : Karma [X], Produits upvotés [X], Commentaires [X]
PH @foundrytwo : Karma [X]
Date : [DATE]
Ajoute dans l'historique : | [DATE] | [DESCRIPTION DE LA MISE À JOUR] |"

---

## 9. MARQUER LES FOLLOWS COMME FAITS (après audit)

Prompt :

"Dans romain/suivi-comptes.md, marque ces comptes comme ✅ suivis :
[LISTE DES @HANDLES]"

---

## 10. ARCHIVAGE DIMANCHE (15 min)

Prompt :

"1. Copie romain/plan-hebdo.md vers archives/R-plan-hebdo-semaine-[N].md
2. Copie romain/progress-semaine.md vers archives/R-progress-semaine-[N].md
3. Copie romain/cross-engagement-tracker.md vers archives/R-cross-engagement-semaine-[N].md
4. Copie romain/cold/cold-outreach-log.md vers archives/R-cold-outreach-semaine-[N].md
5. Réinitialise romain/plan-hebdo.md avec le template vide et les dates de la nouvelle semaine [DATE DÉBUT] au [DATE FIN]
6. Réinitialise romain/progress-semaine.md avec le template vide et les dates de la nouvelle semaine
7. Réinitialise romain/cross-engagement-tracker.md avec le template vide et les dates de la nouvelle semaine
8. Réinitialise romain/cold/cold-outreach-log.md avec le template vide et les dates de la nouvelle semaine
NE MODIFIE AUCUN AUTRE FICHIER."

---

## NOTES

- Incrémente le numéro de semaine chaque dimanche (semaine-01, semaine-02...)
- Ne jamais modifier playbook-semaine.md, context.md, roadmap.md ni system-prompt.md via ces prompts
- Les prompts 1-5 sont quotidiens (30 sec chacun). Les prompts 6-9 sont vendredi soir. Le prompt 10 est dimanche.
- Pour les fichiers F2, voir f2/claude-code-prompts.md
