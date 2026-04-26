# StoreMD — Beta Install Config

> Ce fichier centralise les infos d'installation beta de StoreMD.
> Mis à jour manuellement par Fabrice. Référence pour les cold DMs et Couche B S7.

---

## Lien d'installation direct (Partner Dashboard)

```
https://[RAILWAY_BACKEND_URL]/api/v1/auth/install
```

> Remplacer `[RAILWAY_BACKEND_URL]` par l'URL Railway de ton backend StoreMD.
> Ex : `https://storemd-production-xxxx.up.railway.app/api/v1/auth/install`

**Comment trouver l'URL :**
1. Shopify Partner Dashboard → Apps → StoreMD → Distribution → Get installation link
2. OU : Railway dashboard → ton service StoreMD → Settings → Domains

---

## Usage dans les DMs (Couche B S7)

Template de message avec le lien :

```
Here's your scan results for [STORE] — found [X] issues including ghost billing.

If you want the full automated fix engine: install here → [LIEN]
(No credit card needed to install, 10 beta spots total)
```

---

## Beta spots tracking

Suivi dans : `fabrice/pipeline-conversion.md` → section BETA SPOTS

Target S7 : 8/10 spots claimed

---

## À NE PAS faire

- ❌ Mettre le lien direct dans les posts publics Twitter/LinkedIn
- ❌ Blaster le lien à des stores non qualifiés
- ✅ Landing page storemd.vercel.app → CTA → DM → lien personnalisé
- ✅ Couche B : scan proactif → rapport DM → lien en fin de message
