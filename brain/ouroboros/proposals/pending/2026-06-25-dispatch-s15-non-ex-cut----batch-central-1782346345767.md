---
date: "2026-06-25"
timestamp: "2026-06-25T00:12:25.767Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Dispatch S15 non exécuté — batch central créé, 3 fichiers publication encore S14 — J4 à moitié récupérable
**Contexte:** `marketing/contenu/batch-semaine/batch-semaine-S15.md` existe (36KB, 944 lignes, semaine 22-28/06). Mais les 3 fichiers de dispatch lisent toujours S14 (posts du 15-19 juin, copy "June 22" expirée) :
- `fabrice/publication/batch-semaine.md` → S14 ✗
- `romain/publication/batch-semaine.md` → S14 ✗
- `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` → S14 ✗

Le "go dispatch" donné à 21:20 hier n'a rien commité. J1 (22/06) + J2 (23/06) + J3 (24/06) définitivement perdus. Aujourd'hui = J4 (25/06) angle **AI Blindspot** — créneaux encore jouables : TikTok 14h (passé selon horaire), Twitter SM 15h (potentiellement passé), **Instagram 18h**, **Facebook 18h30**, **LinkedIn R soir**. J5-J7 intacts.
**Recommandation:** 1) Demander à JARVIS de dispatcher maintenant (en mode segments si le bug loop persiste — PENDING existant). 2) Priorité aux posts encore dans la fenêtre aujourd'hui : Instagram StoreMD 18h, Facebook StoreMD 18h30, LinkedIn R. 3) J5-J7 (Ven-Dim) récupérables intégralement une fois le dispatch fait.
**Action:**
- Fichier 1 : `fabrice/publication/batch-semaine.md` → Écraser avec le contenu F extrait de `marketing/contenu/batch-semaine/batch-semaine-S15.md` (identifiants TW-F-S15-xx + LI-F-S15-xx)
- Fichier 2 : `romain/publication/batch-semaine.md` → Écraser avec contenu R extrait (identifiants TW-R-S15-xx + LI-R-S15-xx)
- Fichier 3 : `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` → Écraser avec contenu StoreMD extrait (identifiants STOREMD-TK-S15-xx, STOREMD-IG-S15-xx, STOREMD-FB-S15-xx, STOREMD-TW-SM-S15-xx, IH-S15-xx)
**Risques si ignoré:** J4 intégralement perdu. La semaine S15 passe de 7 jours à 3 jours (J5-J7 seulement), soit 57% du volume sacrifié.
