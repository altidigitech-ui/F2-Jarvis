# PIPELINE CONVERSION — StoreMD

**Usage :** Suivi des prospects actifs de l'étape "scan envoyé" à l'étape "payant". Les cold-logs (romain/cold/, fabrice/cold/) loggent le volume. Ce fichier logge les conversations qui avancent vers la conversion.
**Business :** StoreMD

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

| # | Date | Source | Plateforme | Handle / Profil | Store URL | Vertical | Résultats scan (résumé) | Statut | Dernière action | Prochaine action |
|---|------|--------|-----------|----------------|-----------|----------|------------------------|--------|----------------|-----------------|
|   |      |        |           |                |           |          |                        |        |                |                 |

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

| # | Date | Source | Store scanné | Store URL | Résultats (résumé) | DM envoyé à | Plateforme | Réponse |
|---|------|--------|-------------|-----------|-------------------|------------|-----------|--------|
| 1 | 28/04 | F | awesomegnarlyworld | awesomegnarlyworld.myshopify.com | 66/100 — robots.txt bloque tout, missing meta desc, missing OG, 5 img alt text | @MsPrincessNash | Twitter | 📤 envoyé |
| 2 | 28/04 | F | the7letter | the7letter.com | 64/100 — robots.txt bloque tout, HTML 791KB (app bloat), server 1.5s, 5 img alt text | @the7letter_ | Twitter | 📤 envoyé |
| 3 | 28/04 | F | thelunarjeweler | thelunarjeweler.com | 72/100 — robots.txt bloque tout, 2 img alt text, 1 link no text, mixed content HTTP/HTTPS, HTML 290KB | @moudoka1 | Twitter | 📤 envoyé |

---

## MÉTRIQUES SEMAINE

| Métrique | Cible | Lun | Mar | Mer | Jeu | Ven | Sam | Total |
|----------|-------|-----|-----|-----|-----|-----|-----|-------|
| Cold DMs envoyés (total) | 80/jour | | | | | | | |
| Scans proactifs envoyés | | | | | | | | |
| Réponses reçues | | | | | | | | |
| Conversations actives | | | | | | | | |
| Beta spots claimed | /10 | | | | | | | |
| Follow-ups envoyés | | | | | | | | |
| Conversions payantes | | | | | | | | |

---

## NOTES TERRAIN

- Critère sélection store proactif : store actif, produits visibles, Shopify identifiable (.myshopify.com ou Powered by Shopify), merchant avec présence sur les réseaux
- Si scan remonte "0 ghost billing" → l'écrire tel quel dans le DM. Pas d'inflation. (BIBLE §3)
- Un scan Pro sur 3 boutiques/sem max (merchant $50k+/mo ou agency) — rapport plus profond = contenu case study potentiel avec accord
- Ne jamais relancer un merchant qui n'a pas répondu à un scan proactif. Un seul envoi, zéro harcèlement.
