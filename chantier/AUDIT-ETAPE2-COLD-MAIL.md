# AUDIT ÉTAPE 2 — CHAÎNE COLD MAIL

**Timestamp:** Tuesday 30 June 2026 — 20:30:06 CEST

Audit en LECTURE SEULE du pipeline cold mail complet. Aucune modification apportée. But : cartographie factuelle précise pour l'étape 2 (intégration offres + ajustements sourcing/séquence).

---

## A. RECHERCHE / SCAN (cible étape 2 : 20 boutiques/jour en 2 passages de 10, fenêtres horaires US/UK/AU)

### Planification des crons

| Cron | Fréquence | Activation | Fichier:ligne | Note |
|------|-----------|-----------|---|---|
| `cold-source-repeat` | 1x/jour (86_400_000 ms) | `COLD_SOURCE_CRON_ENABLED=true` | server.ts:155 | Sourcé quotidien Apify |
| `cold-sequence-tick` | 15m (900_000 ms) | Boîtes MAILBOX_* configurées | server.ts:170 | Relances dues J3/J7/J15 |
| `imap-poll` | 10m (600_000 ms) | Boîtes MAILBOX_* configurées | server.ts:172 | Poll réponses humaines |

**Constat A1 :** Le cron SOURCE est unique quotidien à 1 appel/jour. Il n'existe AUCUNE logique actuelle de 2 passages (10+10) ni de fenêtre horaire US/UK/AU.

### Volume par passage

| Variable | Défaut | Contrôle | Fichier:ligne | Note |
|----------|--------|---------|---|---|
| Nombre de boutiques/SOURCE | 25 (cible `count`) | `POST /cold/source { count }` | cold.ts:115 | Clamped [1,200], défaut 25 |
| `count*2` sur-demande Apify | 50 (x2 pour filtre pays) | Automatique | scraper.ts:79 | Apify renvoie plus, on filtre US/UK/AU |
| Actuellement par `source-tick` | 25 | Fixé en ENV ou via route | — | Un seul appel/jour, pas 2x10 |

**Constat A2 :** Le cap par passage est configurable via API (`POST /cold/source { count }`), mais il n'existe AUCUNE routine d'orchestration pour 2 passages quotidiens.

### Filtre pays US/UK/AU

| Étape | Filtre | Fichier:ligne | Détail |
|-------|--------|---|---|
| Apify (SOURCE) | `normalizeCountry()` + `ALLOWED` | apify.ts:21,95-106,146 | Filtre dur `["US", "UK", "AU"]` appliqué à chaque lead |
| Extraction pays | `item.address?.country` mappé | apify.ts:145 | Apify renvoie pays brut, on le normalise en US/UK/AU |
| Dédup par domaine | `alreadyKnown(domain)` | scraper.ts:18,87 | Évite doublon, pas de filtre pays seconde fois |

**Constat A3 :** Le filtre pays est appliqué UNE FOIS à la SOURCE (Apify). Il n'existe AUCUNE logique de fenêtre horaire (timezone US/UK/AU) pour les 2 passages.

### Point d'injection pour 2 passages + créneaux

**Constat A4 :** Pour configurer 2 passages de 10 + fenêtres horaires US/UK/AU, le point d'injection le plus propre est :

**Option 1 (patch léger):** Dans `scheduleColdCrons()` (server.ts:151-174), ajouter 2 crons au lieu d'un `cold-source-repeat`. Chaque cron aurait un `every` qui mappe à une fenêtre horaire CEST (Paris) → décalé en UTC.

**Option 2 (patch structuré):** Dans `jobSourceTick()` (jobs.ts:208), ajouter une logique d'orchestration : déterminer l'heure CEST actuelle, appeler `sourceStores(10)` seulement si dans la fenêtre US/UK/AU correspondante.

**Actuellement:** La fonction `jobSourceTick(count)` (jobs.ts:208-219) accepte `count` en paramètre, appelle `sourceStores(count)`, puis enfile `qualify` pour tous les targets en statut `sourced`. Aucune logique de fenêtre ou d'orchestration multi-passages.

---

## B. CAPTURE DES DONNÉES (cible : email + site + réseaux depuis Apify)

### Champs du lead (type ColdTarget)

```typescript
// backend/jarvis/src/lib/cold/types.ts:42-65

interface ColdTarget {
  id: string;
  created_at: string;
  updated_at: string;
  store_url: string;
  store_domain: string;
  country: Country | null;  // US | UK | AU
  platform_data: PlatformData | null;  // Shopify + apps + thème + trafic estimé
  qualify_score: number | null;
  decision_maker_name: string | null;  // du lead Apify
  decision_maker_email: string | null;  // du lead Apify (vérifiée après ENRICH)
  email_verified: boolean;
  scan_score: number | null;  // StoreMD
  scan_findings: ScanFinding[] | null;  // 3 findings du scan
  email_subject: string | null;  // templaté JO
  email_body: string | null;  // généré Haiku
  sending_inbox: string | null;  // adresse expéditrice
  resend_message_id: string | null;  // Resend ID
  next_touch_at: string | null;
  touch_count: number;
  status: ColdStatus;
  reply_category: ReplyCategory | null;
  error: string | null;
}
```

**Constat B1 :** Les champs actuels NE contiennent QUE : site + email + nom + pays. **Zéro champ pour réseaux sociaux** (Facebook, Instagram, TikTok, LinkedIn).

### Réponse Apify — structure contacts[]

```typescript
// backend/jarvis/src/lib/cold/apify.ts:55-64

interface ApifyLeadItem {
  myshopifyDomain?: string | null;
  domain?: string | null;
  url?: string | null;
  name?: string | null;
  // L'actor renvoie chaque contact sous forme { method, target }
  contacts?: Array<{ method?: string | null; target?: string | null } | null> | null;
  address?: { country?: string | null } | null;
}

// Extraction de l'email (ligne 84-92) :
function extractEmail(item: ApifyLeadItem): string | null {
  if (!Array.isArray(item.contacts)) return null;
  for (const c of item.contacts) {
    if (c?.method !== "email") continue;
    const t = c.target;
    if (t && typeof t === "string" && t.includes("@")) return t.trim().toLowerCase();
  }
  return null;
}
```

**Constat B2 :** Apify renvoie `contacts[]` où chaque contact a `{ method, target }`. Les **méthodes possibles incluent au minimum** : `email`, `facebook`, `instagram`, `linkedin`. Le code **lis UNIQUEMENT `method === "email"`** (apify.ts:87). Les autres handles réseau **SONT présents dans la réponse mais IGNORÉS COMPLÈTEMENT**.

**Preuve:** Aucune boucle ou extraction pour méthode ≠ "email". Cf. apify.ts:84-92 : seul le code qui itère sur `contacts` existe, et il teste `c?.method !== "email"`.

### HTML shopify-detect — liens réseau dans footer

```typescript
// backend/jarvis/src/lib/cold/shopify-detect.ts:29-71

export async function detectShopify(domain: string): Promise<PlatformData> {
  const base = `https://${domain}`;
  const result: PlatformData = { is_shopify: false };

  // 1) /products.json — confirme Shopify ET donne le catalogue.
  try {
    const res = await fetchWithTimeout(`${base}/products.json?limit=1`);
    // ...
  } catch { }

  // 2) HTML — header X-ShopId, cdn.shopify.com, thème, apps (scripts injectés).
  try {
    const res = await fetchWithTimeout(base);
    if (res.headers.get("x-shopid")) result.is_shopify = true;
    if (res.ok) {
      const html = await res.text();  // ← HTML COMPLET, footers inclus
      if (html.includes("cdn.shopify.com") || html.includes("/cdn/shop/") || html.includes("Shopify.theme")) {
        result.is_shopify = true;
      }
      const themeMatch = html.match(/Shopify\.theme\s*=\s*\{[^}]*"name":"([^"]+)"/);
      if (themeMatch) result.theme = themeMatch[1];
      result.apps = detectApps(html);  // ← apps détectées
    }
  } catch { }

  return result;
}
```

**Constat B3 :** `shopify-detect.ts` récupère bien l'HTML complet de la boutique (ligne 58 : `const html = await res.text()`). Cet HTML contient normalement les footers avec liens vers réseaux sociaux. **MAIS le code n'extrait que : apps (via `detectApps`), thème, X-ShopId. ZÉRO extraction de liens footer / réseaux sociaux.** (Cf. ligne 64 : `result.apps = detectApps(html)`, rien d'autre.)

### Persistance des données

| Quoi | Où | Fichier:ligne |
|-----|---|---|
| Lead sourcé initial (site + email + pays + nom) | `cold_targets` insert | scraper.ts:95-103 |
| `platform_data` (Shopify + apps + thème) | `cold_targets.platform_data` (JSON) | scraper.ts:91,99 |
| Vérif SMTP + drop role | `cold_targets.decision_maker_email`, `email_verified` | scraper.ts:155-163 |
| Scan StoreMD (score + 3 findings) | `cold_targets.scan_score`, `scan_findings` (JSON) | jobs.ts:69-74 |

**Constat B4 :** Aucun champ ne prévoit les données réseau. Pour ajouter site + réseaux (Facebook, Instagram, LinkedIn, TikTok), il faudrait :

1. Élargir `ColdTarget` (types.ts) avec champs e.g. `social_handles: { facebook?, instagram?, linkedin?, tiktok? }`.
2. Modifier `ApifyLead` (apify.ts:25-30) pour inclure ces handles.
3. Modifier `extractEmail()` et suivants pour extraire aussi `contacts[]` avec `method !== "email"`.
4. Modifier `shopify-detect.ts` pour parser le footer HTML et extraire les liens (`href` → domaines sociaux).
5. Modifier le INSERT dans `sourceStores()` (scraper.ts:95-103) pour persister les handles.

---

## C. SÉQUENCE + POINTS D'INJECTION DES OFFRES (cible : template + offre par étape J0/J3/J7/J15)

### Offsets de séquence et MAX_TOUCHES

```typescript
// backend/jarvis/src/lib/cold/sequence.ts:5-23

const DAY_MS = 24 * 60 * 60 * 1000;

// Jours cumulés depuis la 1ère touche : [0, 3, 7, 15] → 4 touches au total.
export const SEQUENCE_OFFSETS_DAYS = [0, 3, 7, 15];
export const MAX_TOUCHES = SEQUENCE_OFFSETS_DAYS.length;  // 4

// Après avoir envoyé la touche `touchCount` (1-indexée), renvoie la date ISO de
// la prochaine touche, ou null si la séquence est terminée.
export function nextTouchAfter(touchCount: number, now: number = Date.now()): string | null {
  if (touchCount >= MAX_TOUCHES) return null;
  const gapDays = SEQUENCE_OFFSETS_DAYS[touchCount] - SEQUENCE_OFFSETS_DAYS[touchCount - 1];
  return new Date(now + gapDays * DAY_MS).toISOString();
}
```

**Constat C1 :** La séquence est figée à **4 touches : J0, J3, J7, J15**, puis STOP. `MAX_TOUCHES = 4`.

### Composition du mail J0

```typescript
// backend/jarvis/src/lib/cold/jobs.ts:102-111

export async function jobCompose(id: string): Promise<void> {
  const t = await getTarget(id);
  if (t.scan_score == null || !t.scan_findings || t.scan_findings.length === 0) {
    throw new Error(`[cold/jobs] compose ${id}: pas de scan_score/scan_findings (scan pas fait)`);
  }
  const findings = t.scan_findings.slice(0, 3);
  const subject = `${t.store_domain}: ${t.scan_score}/100`;  // ← Sujet templaté (ANTI-IA)
  const body = await composeBody(t.store_domain, t.scan_score, findings, t.decision_maker_name);
  await patch(id, { email_subject: subject, email_body: body, status: "composed" });
}

async function composeBody(
  domain: string,
  score: number,
  findings: ScanFinding[],
  name: string | null
): Promise<string> {
  const findingsText = findings
    .map((f, i) => `${i + 1}. ${f.title}${f.metric ? ` (${f.metric})` : ""}: ${f.detail}`)
    .join("\n");

  // Contraintes ANTI-IA.md (§0) injectées dans le prompt.
  const prompt = `You write a short cold email to a Shopify store owner. The store ${domain} scored ${score}/100 on a free health scan. Use these three real findings:

${findingsText}

Rules (strict):
- English. Plain text only, no markdown, no bullet symbols, no numbered list formatting.
- Do NOT use the em-dash character. Do NOT use the "not X, it's Y" structure.
- Vary sentence length and openings. Sound like a person, not a template.
- Mention the score and weave in the findings naturally (do not just paste them).
- One clear, low-friction call to action (offer the full breakdown).
- End with a single short opt-out line.
- No invented metrics or fake praise. Keep it under 120 words.
${name ? `- Address the owner as ${name}.` : ""}

Return only the email body text.`;
```

**Constat C2 :** Le sujet J0 est **templaté fixe** : `${domain}: ${score}/100`. Le corps est généré par Haiku (Agent SDK) à partir du prompt injecté, avec contraintes ANTI-IA.md strictes. **Aucun placeholder pour offre/promo.**

### Relances J3/J7/J15 — texte hardcodé

```typescript
// backend/jarvis/src/lib/cold/jobs.ts:221-262 (jobSequenceTick)

export async function jobSequenceTick(): Promise<{ sent: number }> {
  const sb = getSupabase();
  const nowIso = new Date().toISOString();
  const { data, error } = await sb
    .from(TABLE)
    .select("*")
    .eq("status", "in_sequence")
    .lte("next_touch_at", nowIso)
    .lt("touch_count", MAX_TOUCHES)
    .limit(200);
  
  const targets = (data || []) as ColdTarget[];
  let sent = 0;
  for (const t of targets) {
    if (!t.decision_maker_email || !t.email_subject) continue;
    if (await isSuppressed(t.decision_maker_email)) {
      await patch(t.id, { status: "unsubscribed", next_touch_at: null });
      continue;
    }
    try {
      // Relance : court bump, on ne régénère pas tout le corps.
      const followUp = `Following up on my note about ${t.store_domain}. Happy to send the full breakdown whenever it's useful.\n\nIf you'd rather not hear from me, reply "stop".`;  // ← HARDCODÉ, IDENTIQUE pour J3/J7/J15
      const r = await sendColdEmail({ to: t.decision_maker_email, subject: `Re: ${t.email_subject}`, body: followUp });
      const nextCount = t.touch_count + 1;
      await patch(t.id, {
        sending_inbox: r.inbox,
        resend_message_id: r.messageId,
        touch_count: nextCount,
        next_touch_at: nextTouchAfter(nextCount),
      });
      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[cold/jobs] relance ${t.store_domain}:`, msg);
      await patch(t.id, { error: msg.slice(0, 500) });
    }
  }
  return { sent };
}
```

**Constat C3 :** Le texte de relance (J3/J7/J15) est **identique et hardcodé** ligne 244 :
```
Following up on my note about ${t.store_domain}. Happy to send the full breakdown whenever it's useful.

If you'd rather not hear from me, reply "stop".
```

**Aucune différenciation par étape.** Aucun placeholder pour offre.

### Cartographie des points d'injection pour offres

| Étape | Fichier:ligne | Lieu exacte | Actuellement |
|-------|---|---|---|
| **J0 sujet** | jobs.ts:108 | `const subject = ...` | Templaté `${domain}: ${score}/100` |
| **J0 corps** | jobs.ts:113-169 | Dans `composeBody()` et le prompt Haiku | Généré Haiku, pas de placeholder offre |
| **J3 sujet** | jobs.ts:245 | `const r = await sendColdEmail({ ... subject: ... })` | Automatique `Re: ${t.email_subject}` (reprend J0) |
| **J3 corps** | jobs.ts:244 | Hardcodé dans la fonction | Texte fixe "Following up..." |
| **J7 sujet** | jobs.ts:245 | Même que J3 | Reprend J0 |
| **J7 corps** | jobs.ts:244 | Même que J3 | Texte fixe, identique |
| **J15 sujet** | jobs.ts:245 | Même que J3 | Reprend J0 |
| **J15 corps** | jobs.ts:244 | Même que J3 | Texte fixe, identique |

**Constat C4 :** Pour injecter des **offres par étape**, les points d'injection sont :

- **J0 :** Modifier le prompt Haiku (jobs.ts:124-138) pour ajouter une section "offre" paramétrée. Puis passer cette offre à `composeBody()`.
- **J3/J7/J15 :** Modifier le hardcoding (jobs.ts:244) : au lieu d'une chaîne fixe, récupérer `t.touch_count` et injecter un texte/offre différent selon le numéro de touche.

### Existence de notion "offre" / "promo" / "discount"

**Recherche:** Grep dans `backend/jarvis/src/lib/cold/` pour `offr|promo|discount|deal|offer`.

**Constat C5 :** **Aucune notion d'offre/promo/discount n'existe dans le code cold.** Zero hit sur ces termes. Le mail J0 parle du scan, les relances parlent du scan. **Aucun placeholder, variable ou texte réservé pour offre.**

---

## D. CRONS & FLUX

### Tous les crons cold (nom, fréquence, activation)

```typescript
// backend/jarvis/src/server.ts:151-174

// CRON 1 : SOURCE quotidien
if (process.env.COLD_SOURCE_CRON_ENABLED === "true") {
  await coldQueue.upsertJobScheduler(
    "cold-source-repeat",
    { every: 86_400_000 },  // 24h
    { name: "source-tick" }
  );
}

// CRON 2 : Relances dues (si boîtes MAILBOX_* configurées)
await coldQueue.upsertJobScheduler(
  "cold-sequence-tick",
  { every: 900_000 },  // 15m
  { name: "sequence-tick" }
);

// CRON 3 : Poll IMAP (si boîtes MAILBOX_* configurées)
await coldQueue.upsertJobScheduler(
  "cold-imap-poll",
  { every: 600_000 },  // 10m
  { name: "imap-poll" }
);
```

| Cron | Fréquence | Condition | Activation | Fichier:ligne |
|------|-----------|-----------|---|---|
| `cold-source-repeat` | 24h (86_400_000 ms) | `COLD_SOURCE_CRON_ENABLED=true` | Optionnel | server.ts:155 |
| `cold-sequence-tick` | 15m (900_000 ms) | ≥1 boîte MAILBOX_* | Automatique si boîtes | server.ts:170 |
| `cold-imap-poll` | 10m (600_000 ms) | ≥1 boîte MAILBOX_* | Automatique si boîtes | server.ts:172 |

**Constat D1 :** Trois crons planifiés. SOURCE est unique quotidien. Pas de cron manuel pour scan/compose/push (automatiquement enfilés après qualify).

### Flux complet en une ligne par étape

```
1. SOURCE (source-tick)
   → sourceStores(count) : Apify + détection + dédup + insérer en [sourced]

2. QUALIFY (auto-enqueueCold)
   → jobQualify : score sur platform_data → [qualified] | [rejected]

3. ENRICH (auto-enqueueCold)
   → jobEnrich : vérif SMTP, drop role → [enriched] | [unreachable]

4. SCAN (auto-enqueueCold)
   → jobScan : StoreMD preview-scan sérializé, top-3 findings → [scanned]
   → Retry différé si saturé (stub 68)

5. COMPOSE (auto-enqueueCold)
   → jobCompose : Haiku generates subject + body avec findings → [composed]

6. PUSH (auto-enqueueCold)
   → jobPush : Resend SMTP, J0 sending + schedule J3 → [in_sequence], touch_count=1, next_touch_at=J+3

7. SEQUENCE-TICK (15m cron)
   → jobSequenceTick : relances dues (J3/J7/J15) → sendColdEmail + update touch_count + schedule next → [in_sequence]
   → Stop si touch_count >= 4 (MAX_TOUCHES)

8. IMAP-POLL (10m cron)
   → jobImapPoll : fetch boîtes, matcher, classer → [replied] | [unsubscribed] | [bounced]
   → Log row dans cold-log-email.md
   → evaluateGuardrails (bounce%/complaint% → pause auto si seuil)

9. WEBHOOK Resend (on-demand)
   → Bounce/plainte → Supabase + Redis + evaluateGuardrails
```

**Constat D2 :** Pipeline linéaire qualifié → enrich → scan → compose → push → relances → poll. Aucune boucle de retry (sauf stub 68). Auto-enqueueing dans la chaîne.

---

## E. LOGS (cible étape 6/10 : date+heure partout)

### Format actuel des logs

```typescript
// backend/jarvis/src/lib/cold/cold-log.ts:14-17

export function cestDate(): string {
  return new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
  // Output : "30/06/2026"
}

// Utilisation :
// const date = cestDate();
// const tableRows = rows.map(
//   (r) => `| ${date} | ${r.storeUrl} | ${r.score ?? ""} | ${r.status} | ... |`
// );
```

**Constat E1 :** La fonction `cestDate()` ne retourne que la **DATE SEULE** (DD/MM/YYYY), pas l'heure. Cf. ligne 15 : `toLocaleDateString()`.

### Route cycle-log — date+heure

```typescript
// backend/jarvis/src/routes/cold.ts:26-38

function cestStamp(now: Date): string {
  return now
    .toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "");
  // Output : "30/06/2026 20:30:06" (CEST)
}
```

**Constat E2 :** Dans `cold.ts:coldCycleLogRoute()`, il existe une fonction séparée `cestStamp()` (ligne 26) qui retourne **date + heure + secondes** (format "DD/MM/YYYY HH:MM:SS"). Cette fonction est utilisée UNIQUEMENT pour le cycle-log (tracking/batch-log.md).

### Discordance

| Fichier | Fonction | Format | Détail |
|---------|----------|--------|--------|
| cold-log.ts | `cestDate()` | DD/MM/YYYY | Date seule, pas d'heure |
| cold.ts | `cestStamp()` | DD/MM/YYYY HH:MM:SS | Date+heure+sec, CEST |

**Constat E3 :** Il existe une **discordance** : `cestDate()` (utilisée par `appendEmailLog()` pour cold-log-email.md et decisions-log.md) NE CONTIENT PAS L'HEURE. `cestStamp()` (utilisée par cycle-log) CONTIENT l'heure complète.

**Actuellement en production :**
- `cold-log-email.md` : date seule ("30/06/2026")
- `decisions-log.md` : date seule ("30/06/2026")
- `tracking/batch-log.md` : date + heure ("30/06/2026 20:30:06 CEST")

---

## RÉSUMÉ DES CONSTATS

### A. Recherche/sourcing

- ✅ Filtre US/UK/AU implémenté et fonctionnel à la SOURCE (Apify).
- ❌ Pas de cron SOURCE multi-passages (2x10).
- ❌ Pas de fenêtre horaire US/UK/AU (timezone-aware).
- ✅ Point d'injection le plus propre : `scheduleColdCrons()` (server.ts) ou logique dans `jobSourceTick()` (jobs.ts).

### B. Capture données

- ✅ Email + domaine + pays + nom capturés depuis Apify.
- ✅ Platform_data (Shopify, apps, thème) capturés via shopify-detect.
- ❌ Réseaux sociaux (Facebook, Instagram, LinkedIn, TikTok) : présents dans Apify (contacts[] non-email) mais IGNORÉS complètement.
- ❌ Footer HTML : téléchargé (shopify-detect) mais JAMAIS parsé pour liens réseaux.
- ❌ Aucun champ ColdTarget ni ApifyLead pour stocker les handles.

### C. Séquence + offres

- ✅ Séquence J0/J3/J7/J15 implémentée et fonctionnelle.
- ✅ Sujet J0 templaté (anti-détection ANTI-IA).
- ✅ Corps J0 généré Haiku avec constraints.
- ❌ Relances J3/J7/J15 : texte identique hardcodé, aucune différenciation par étape.
- ❌ ZÉRO notion d'offre/promo/discount dans tout le pipeline.
- ✅ Points d'injection clairs : prompt Haiku (J0) et hardcoding (J3+).

### D. Crons & flux

- ✅ 3 crons planifiés : SOURCE 1x/jour, sequence-tick 15m, imap-poll 10m.
- ✅ Flux linéaire qualifié → enrich → scan → compose → push → relances → poll.
- ✅ Auto-enqueueing fonctionne (la chaîne progresse sans intervention).

### E. Logs

- ✅ Deux fonctions de date CEST (cestDate, cestStamp).
- ❌ cestDate (utilisée par cold-log-email.md, decisions-log.md) ne contient que la date, pas l'heure.
- ⚠️ Discordance : batch-log.md a l'heure (cestStamp), cold-log-email.md n'a que la date (cestDate).

---

## FICHIERS IMPACTÉS POUR L'ÉTAPE 2

| Composant | Fichier | Raison |
|-----------|---------|--------|
| Séquence offres | `backend/jarvis/src/lib/cold/jobs.ts` | J0 prompt + J3-15 hardcoding |
| Sourcing 2 passages | `backend/jarvis/src/server.ts` | Planification crons |
| Sourcing 2 passages | `backend/jarvis/src/lib/cold/jobs.ts` | logique jobSourceTick |
| Réseaux sociaux | `backend/jarvis/src/lib/cold/types.ts` | Ajouter champs |
| Réseaux sociaux | `backend/jarvis/src/lib/cold/apify.ts` | Extraire contacts[] |
| Réseaux sociaux | `backend/jarvis/src/lib/cold/shopify-detect.ts` | Parser footer HTML |
| Réseaux sociaux | `backend/jarvis/src/lib/cold/scraper.ts` | Persister handles |
| Logs horodatage | `backend/jarvis/src/lib/cold/cold-log.ts` | Ajouter heure à cestDate() |

