# PIPELINE CONVERSION S7 — Fabrice

**Usage :** Suivi des prospects actifs de l'étape "scan envoyé" à l'étape "payant". Séparé du `cold-outreach-log.md` (qui logge le volume). Ce fichier logge les conversations qui avancent vers la conversion.
**Période :** Semaine du 27/04/2026 au 03/05/2026
**Couche B S7 :** F scanne proactivement — pas d'OAuth requis côté merchant.

---

## STATUTS

| Statut | Définition |
|--------|------------|
| 📤 SCAN ENVOYÉ | Rapport envoyé en DM, pas encore de réponse |
| 💬 EN CONVERSATION | Merchant a répondu, échange en cours |
| 🎯 BETA CLAIMED | Merchant a demandé un accès Pro beta |
| 🔄 FOLLOW-UP | Follow-up J7 ou J14 envoyé |
| 💰 PAYANT | Conversion en client payant ✅ |
| ❌ COLD | Plus de réponse / pas intéressé |

---

## PIPELINE ACTIF

| # | Date | Plateforme | Handle / Profil | Store URL | Vertical | Résultats scan (résumé) | Statut | Dernière action | Prochaine action |
|---|------|-----------|----------------|-----------|----------|------------------------|--------|----------------|------------------|
|   |      |           |                |           |          |                        |        |                |                  |

---

## BETA SPOTS — 10 ACCÈS PRO

| Spot | Handle | Store | Date claim | Accès Pro activé | J7 | J14 | J28 | Conversion |
|------|--------|-------|-----------|------------------|----|-----|-----|------------|
| 1/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 2/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 3/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 4/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 5/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 6/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 7/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 8/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 9/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |
| 10/10 | — | — | — | ⏳ | ⏳ | ⏳ | ⏳ | Disponible |

---

## SÉQUENCE FOLLOW-UP BETA

Une fois le merchant en beta :

- **J0** — Accès Pro activé + premier scan complet envoyé + message d'accueil
- **J7** — "How's it going? Any questions on what the scan found?"
- **J14** — "Want to hop on a 15-min call? I can walk you through the fix list."
- **J28** — "Your 30-day beta wraps up in 2 days — here's the Pro pricing + early-adopter offer."
- **J30** — Transition payante ou sortie propre

---

## LOG SCANS PROACTIFS

**Target S7 : 30 scans envoyés sur la semaine (6/jour lun-sam)**

| # | Date | Store scanné | Store URL | Résultats (ghost billing / perf / AI) | DM envoyé à | Plateforme | Réponse |
|---|------|-------------|-----------|--------------------------------------|------------|-----------|--------|
|   |      |             |           |                                      |            |           |        |

---

## MÉTRIQUES SEMAINE

| Métrique | Cible S7 | Lun | Mar | Mer | Jeu | Ven | Sam | Total |
|----------|----------|-----|-----|-----|-----|-----|-----|-------|
| Scans proactifs envoyés | 30 (6/j) | | | | | | | 0 |
| URLs reçues inbound (posts) | 10+ | | | | | | | 0 |
| Réponses reçues (>20% target) | 6+ | | | | | | | 0 |
| Conversations actives | 10+ | | | | | | | 0 |
| Beta spots claimed | 8/10 | | | | | | | 0 |
| Follow-ups J7 envoyés | 100% betas | | | | | | | — |
| Conversions payantes | 2-3 | | | | | | | 0 |

---

## NOTES TERRAIN

- Critère sélection store proactif : store actif, produits visibles, Shopify identifiable (.myshopify.com ou Powered by Shopify), merchant avec présence Twitter ou LinkedIn
- Si scan remonte "0 ghost billing" → l'écrire tel quel dans le DM. Pas d'inflation. (BIBLE §3)
- Un scan Pro sur 3 boutiques/sem max (merchant $50k+/mo ou agency) — rapport plus profond = contenu case study potentiel S8 avec accord
- Ne jamais relancer un merchant qui n'a pas répondu à un scan proactif. Un seul envoi, zéro harcèlement.
