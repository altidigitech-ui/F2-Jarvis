# Social engine (`lib/social/`)

Phase 6 de `marketing/saas-app-shopify/storemd/machine/plan.md` : PLAN → GENERATE
→ VALIDATE → PUBLISH. Queue BullMQ `social`. Données : `social_posts`
(supabase-migrations/004_social_posts.sql).

## Modules

| Fichier | Rôle |
|---|---|
| `types.ts` | Types (miroir de social_posts) |
| `generate.ts` | GENERATE : caption Claude par plateforme + angles de contenu |
| `publishers/x.ts` | PUBLISH X/Twitter (v2 /2/tweets, texte) — **activé** |
| `publishers/index.ts` | Dispatcher + `enabledPlatforms()` ; IG/FB/TikTok/LinkedIn non activés |
| `jobs.ts` | `social-generate` (brouillons) · `social-publish` (approuvés dus) |

Routes VALIDATE (backend) : `GET /social/pending`, `POST /social/approve`, `POST /social/reject`.

## Flux

```
social-generate (cron 1×/jour)  → 1 brouillon/canal activé → social_posts [pending]
  (humain) GET /social/pending  → relit
  (humain) POST /social/approve → [approved] (+ scheduled_at optionnel, caption éditable)
           POST /social/reject  → [rejected]
social-publish (cron 15m)       → approuvés dus → publish() → [published] | [failed]
```

L'humain valide TOUJOURS avant publication (plan §6 + garde-fou général).

## Plateformes

| Canal | État | Raison |
|---|---|---|
| **X / Twitter** | ✅ activé | API simple, setup rapide. Token `X_ACCESS_TOKEN` (OAuth2 user, tweet.write). Texte uniquement (média = flux v1.1 à ajouter). |
| Instagram / Facebook | ⛔ non activé | Meta app review 2-4 sem, compte Business, `instagram_content_publish`. |
| TikTok | ⛔ non activé | Audit 2-6 sem (sinon posts privés), AI-label obligatoire. |
| LinkedIn | ⛔ non activé | Profil perso `w_member_social` (faisable), page = Partenaire LinkedIn. |

Les publishers non activés lèvent `PublisherNotEnabledError`. Le flux documenté est
en commentaire dans `publishers/index.ts`. **04-RESEAUX-API.md impose de reconfirmer
les endpoints/versions au moment de coder chaque canal** (Meta vXX, header
`LinkedIn-Version`, endpoints TikTok) + d'implémenter le **refresh de tokens** et
l'**AI-labeling** (TikTok/Meta). C'est pourquoi ils ne sont pas codés à l'aveugle ici.

`enabledPlatforms()` = publisher implémenté ET creds présents. La génération et les
crons ne ciblent que les canaux activés. Aujourd'hui : X seulement (= critère
d'acceptation Phase 6 : un post validé publié via API sur ≥1 canal).

## Média

Les visuels (image/vidéo) viennent de Higgsfield/Canva, connectés à Claude, pas au
backend. Un post `kind` image/video sans `media_url` n'est pas publié (marqué
`failed` avec message). X (texte) ne dépend pas de média.

## Variables d'environnement

```
X_ACCESS_TOKEN=                # OAuth2 user-context, scope tweet.write (refresh = TODO)
# À l'activation des autres canaux (après approbation) :
# META_GRAPH_TOKEN= IG_BUSINESS_ID= FB_PAGE_ID= TIKTOK_ACCESS_TOKEN= LINKEDIN_ACCESS_TOKEN= LINKEDIN_MEMBER_URN=
ANTHROPIC_API_KEY=             # GENERATE (Haiku) — déjà utilisé par Jarvis
```

Si aucun canal n'est activé, les crons social ne sont pas planifiés.
