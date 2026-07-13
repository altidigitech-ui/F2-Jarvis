---
date: "2026-07-13"
timestamp: "2026-07-13T08:15:10.981Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Archiver 8 PENDINGs S17 périmés — fenêtre définitivement fermée le 10/07
**Contexte:** On est J1 de S18 (13/07). La fenêtre S17 (06-12/07) est close depuis vendredi 10/07. 8 PENDINGs sont devenus des blocs inertes dans la queue (47 items) :
1. *"S17 J5 — FERMETURE AUJOURD'HUI (Ven 10/07)"* → condition remplie, fermé
2. *"S17 J3 — Point de décision MAINTENANT"* → fenêtre expirée
3. *"S17 ESCALADE — deadline 06/07 manquée, Mar 07 se perd EN DIRECT"* → fenêtre expirée
4. *"S17 : Mardi 07/07 perdu confirmé — fenêtre réelle = 3 jours"* → informatif, obsolète
5. *"Rattrapage S17 — batch lundi 06/07 = 4 jours publiables"* → fenêtre expirée
6. *"CLORE Escalade niv.4 — factuellement supersédée par Rattrapage S17"* → sa cible est elle-même périmée
7. *"ESCALADE niv.4 — S17 window CLOSED, S16+S17 toutes deux perdues, S18 = 6 jours"* → S18 est J1 aujourd'hui, informationnel périmé
8. *"Dispatch S17 incomplet — 3ème fichier StoreMD absent du PENDING dispatch"* → S17 n'existera jamais, inutile
**Recommandation:** Archiver ces 8 PENDINGs en une passe. Queue : 47 → 39. Complémentaire au PENDING "Archiver 4 paires CLORE↔ORIGINAL" déjà en attente (qui ne couvre pas ces 8 items S17 spécifiques).
**Action:**
- Pas de fichier repo à modifier — décision humaine via /review-proposals ou action directe sur le système PENDING
- Archiver les 8 items listés ci-dessus (S17 J5, S17 J3, S17 ESCALADE, S17 mardi 07, Rattrapage S17, CLORE niv.4, ESCALADE niv.4, Dispatch S17)
**Risques si ignoré:** La queue reste à 47 items avec 8 blocs morts. Les signaux actifs (S18 fenêtre, offre lancement 19/07) continuent à être noyés dans le bruit des items périmés.
