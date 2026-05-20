# StoreMD — Beta Install Config

> Ce fichier centralise les infos d'installation beta de StoreMD.
> Mis à jour le 26/04/2026 — URL Railway confirmée.

---

## Lien d'installation direct (Partner Dashboard)

```
https://storemd-api-production.up.railway.app/api/v1/auth/install
```

**URL Railway backend :** `storemd-api-production.up.railway.app`

---

## Usage dans les DMs (Couche B S7)

Template de message avec le lien :

```
Here's your scan results for [STORE] — found [X] issues including ghost billing.

If you want the full automated fix engine: install here →
https://storemd-api-production.up.railway.app/api/v1/auth/install
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
