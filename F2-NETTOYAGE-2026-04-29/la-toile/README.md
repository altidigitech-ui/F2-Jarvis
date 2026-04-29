# La Toile FoundryTwo

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Structure post-nettoyage 29/04/2026

---

## Qu'est-ce que ce dossier

Ce dossier contient **un seul fichier** : `la-toile.md` — le schéma global de l'écosystème FoundryTwo.

C'est le document qui réunit tout : qui poste où, pour quel produit, avec quelle façade, comment les nœuds se renforcent entre eux, et comment tout converge vers les conversions trackées dans le dashboard admin StoreMD.

**Avant le 29 avril 2026** : le dossier contenait 6 fichiers + un schéma png + un docx (~2 054 lignes) avec 3 sources de vérité contradictoires sur la même toile. Tout a été archivé. Cf. `../archives/2026-04-29_grand-nettoyage/README.md`.

---

## Le fichier `la-toile.md` — métaphore de la toile d'araignée

Une toile d'araignée a un centre, des fils qui rayonnent depuis le centre, et une règle : peu importe où l'insecte se pose, **un fil le ramène vers le centre**. Aucun cul-de-sac. Aucun fil orphelin.

La Toile FoundryTwo applique exactement ce principe au marketing StoreMD :

- **Le centre public** : `storemd.vercel.app` — où on veut que tout prospect arrive.
- **Le centre interne** : le dashboard admin StoreMD (`/dashboard/admin`) — où on voit qui est arrivé, par quel fil, et qui a converti.
- **Les nœuds périphériques** : les comptes (TikTok / Insta / FB produit, comptes perso F+R sur Reddit + groupes FB Shopify, comptes façade F+R sur Twitter + LinkedIn, F2/foundrytwo).
- **Les fils** : 33 chemins concrets détaillés (F1 à F33), chacun avec son UTM tagué qui remonte au dashboard admin.

**Règle non-négociable** : aucun fil cassé. Compte inactif, lien sans UTM, bio orpheline = trou dans la toile = prospects perdus.

---

## Quand mettre à jour `la-toile.md`

| Quand | Action |
|---|---|
| Nouveau compte ouvert (ex: `@profitpilot` au lancement ProfitPilot) | Ajouter le nœud + ses fils dans `la-toile.md` §3 et §4 |
| Nouveau placement de lien tagué | Ajouter d'abord la ligne au fichier UTM officiel (`../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`), puis ajouter le fil dans `la-toile.md` §4 |
| Compte fermé / désactivé | Retirer du schéma + commit avec mention dans le message |
| Nouveau SaaS dans le pipeline (ClientPulse, AdAudit, etc.) | Mettre à jour §10 (pipeline produits) |
| Pipeline AI vidéo opérationnel | Mettre à jour §6 (modèle usine) |

**Règle** : ce fichier est la vue d'ensemble. Les détails par canal vont dans `../marketing/canaux/*.md`. Pas de duplication.

---

## Lien direct

[`la-toile.md`](./la-toile.md) — le schéma global (192 lignes).

---

## Documents liés

- `la-toile.md` — le schéma global de l'écosystème
- `../marketing/README.md` — index du dossier marketing
- `../marketing/strategie.md` — la stratégie qui produit le schéma
- `../marketing/objectifs.md` — KPIs, jalons
- `../marketing/canaux/*.md` — détail opérationnel par canal (les fils en pratique)
- `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source de vérité UTM officielle
- `../archives/2026-04-29_grand-nettoyage/README.md` — historique du nettoyage du 29 avril
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
- JARVIS cockpit : `https://f2-jarvis.vercel.app`
