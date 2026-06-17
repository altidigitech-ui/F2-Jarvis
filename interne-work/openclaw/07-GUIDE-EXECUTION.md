# 07 — GUIDE D'EXÉCUTION CLIC PAR CLIC (Lot 1 + Lot 2)

> Le **comment**, écran par écran — companion de `03-INFRA-MANUELLE.md` (qui dit le quoi).
> Vérifié sur le web le 15/06/2026. Les interfaces évoluent : si un libellé diffère légèrement, prends l'équivalent le plus proche.
> **À faire à deux.** Secrets (clés, mots de passe) → uniquement dans Railway. Jamais repo / chat / capture d'écran.

---

# 🟢 LOT 1 — COLD EMAIL

## A. Créer le compte Maildoso
1. Va sur **maildoso.ai** (ou getmaildoso.com) → **Sign up / Get started**.
2. Choisis un plan selon le nombre de boîtes (~10). ⚠️ Facturation souvent **trimestrielle, non remboursable** — c'est normal chez eux.
3. Confirme l'email, connecte-toi. Maildoso est **100% web**, rien à installer.

## B. Connecter ton domaine `leakdetector.tech` (déjà chez Porkbun)
1. Dashboard Maildoso → section **Domains** → **Add domain** → choisis **"Connect your own domain"** (PAS "register new domain", tu l'as déjà).
2. Entre `leakdetector.tech`.
3. Maildoso te propose une méthode de connexion. Si l'option **délégation par nameservers** est proposée → prends-la (c'est le choix qu'on a acté : DNS géré par eux, DKIM auto, zéro typo).
4. **Côté Porkbun** : connexion → **Domain Management** → `leakdetector.tech` → section **Authoritative Nameservers (NS)** → remplace les nameservers Porkbun par ceux donnés par Maildoso → **Save**.
   - *Si Maildoso donne des enregistrements DNS à coller à la place (au lieu de NS), tu les ajoutes dans Porkbun → DNS Records. Mais la délégation NS est plus simple.*
5. Retour Maildoso : il vérifie et configure **SPF / DKIM / DMARC automatiquement**. Un domaine existant ajouté prend **jusqu'à 24h** (propagation). Le **statut du domaine** est affiché dans le dashboard — attends qu'il soit "actif/vert".
6. *(Si demandé)* **Redirect URL** : mets l'URL de ton vrai site (ex. `https://storemd.vercel.app`). Étape parfois obligatoire — si quelqu'un visite le domaine cold, il est redirigé vers ton site légitime (ça renforce la légitimité du domaine).

## C. Créer les ~10 boîtes
1. Dashboard → **Domains** → sélectionne `leakdetector.tech` → **Add Mailboxes**.
2. **Type : SMTP** (PAS Google Workspace — on veut les identifiants SMTP/IMAP bruts pour Jarvis).
3. Entre les noms en `prenom.nom` (pro, crédible). Tu peux remplir **plusieurs lignes d'un coup** (auto-fill). Ex. : `john.smith`, `mary.jones`, … jusqu'à ~10.
4. Valide. Une boîte SMTP est prête en **~5 min**. Le **warmup démarre automatiquement**.
5. ⚠️ **CRUCIAL — le warmup** : laisse-le tourner **~2 semaines avant d'envoyer du volume réel**. On peut tout configurer maintenant, mais on n'ouvre pas le robinet à fond le jour 1, sinon les boîtes neuves grillent. Le cap réel se règle côté Jarvis (étape E).

## D. Exporter les identifiants (CSV)
1. Page **Email Accounts / Mailboxes** → coche tes 10 boîtes.
2. Clique **"Export selected to CSV"** → choisis un **format générique** (pas un format sequencer type Instantly/Smartlead — c'est **Jarvis** notre séquenceur, pas eux).
3. Le CSV contient, par boîte : `email`, `SMTP host`, `SMTP port`, `SMTP user`, `SMTP password`, `IMAP host`, `IMAP port`. **Garde ce fichier en sécurité** (il contient les mots de passe).

## E. Coller dans Railway → Jarvis
1. Railway → projet **Jarvis** → onglet **Variables**.
2. Pour **chaque** boîte `N` (1 à 10), depuis la ligne CSV correspondante :
   - `MAILBOX_N_SMTP_HOST` = colonne *SMTP host*
   - `MAILBOX_N_SMTP_PORT` = `587`
   - `MAILBOX_N_SMTP_USER` = *SMTP user* (souvent = l'email)
   - `MAILBOX_N_SMTP_PASS` = *SMTP password*
   - `MAILBOX_N_IMAP_HOST` = colonne *IMAP host*
   - `MAILBOX_N_IMAP_PORT` = `993`
   - `MAILBOX_N_FROM` = l'email de la boîte
3. Ajoute les variables scan / IA / OpenClaw :
   - `STOREMD_PREVIEW_SCAN_URL` = `https://storemd-api-production.up.railway.app/api/v1/internal/preview-scan`
   - `STOREMD_PREVIEW_SCAN_KEY` = ta clé `INTERNAL_SCAN_KEY`
   - `ANTHROPIC_API_KEY` = clé API `sk-ant-…`
   - `OPENCLAW_GATEWAY_URL` + `OPENCLAW_API_KEY`
   - `COLD_DAILY_CAP_PER_INBOX` = `12` (départ prudent)
   - `COLD_SMTP_PROBE_FROM` = une adresse `@leakdetector.tech` (une de tes boîtes)
4. **Save** → Railway redéploie Jarvis automatiquement.

## F. Légal + test
1. Rédige la **LIA** (1 page, B2B US/UK/AU).
2. **Test bout-en-bout sur 1 boutique** → on me prévient, je vérifie dans `cold_targets` que le prospect traverse `sourced → qualified → enriched → scanned → composed` avec un vrai `scan_score` + `scan_findings`.

---

# 🔵 LOT 2 — RÉSEAUX

## A. X / Twitter (le seul activable tout de suite)
⚠️ **2026 : plus de tier gratuit pour les nouveaux comptes.** Tu es en **pay-per-use** (~$0,01 / post). À 1 post/jour ≈ **$0,30/mois**. Négligeable, mais il faut **acheter quelques $ de crédits** avant de pouvoir poster.

1. Va sur **console.x.com** (ou developers.x.com) → connecte le compte X de StoreMD.
2. Crée un **Project**, puis une **App** dedans.
3. **Billing** → achète un petit montant de **crédits** (pay-per-use).
4. App → **User authentication settings** → **Set up** :
   - **App permissions : Read and write** (obligatoire pour poster)
   - **Type of App : Automated App / Bot**
   - **Callback URL + Website URL** : n'importe quelle URL (non vérifiée), ex. `https://storemd.vercel.app`
   - **Save**.
5. ⚠️ **Pour POSTER il faut OAuth 1.0a (user-context)** — le Bearer "app-only" **ne peut pas** publier. Onglet **Keys and Tokens** → génère/copie :
   - **API Key** + **API Secret** (Consumer keys)
   - **Access Token** + **Access Token Secret**
   - 🔴 Après avoir passé les permissions en *Read and write*, **RÉGÉNÈRE l'Access Token & Secret** — sinon il reste en lecture seule et le post échoue.
6. Ces 4 valeurs ne s'affichent **qu'une fois** → copie-les direct dans **Railway Jarvis** (noms exacts à confirmer dans `backend/jarvis/src/lib/social/`, typiquement `X_API_KEY` / `X_API_SECRET` / `X_ACCESS_TOKEN` / `X_ACCESS_SECRET`).

## B. Lancer les demandes longues — en parallèle, dès maintenant (semaines de délai)
*Elles ne bloquent PAS le cold ni X. On les déclenche tôt parce que l'approbation est lente.*

- **Meta (Instagram/Facebook)** : `developers.facebook.com` → crée une **App de type Business** → ajoute le produit **Instagram Graph API** → demande la permission **`instagram_content_publish`** → soumets l'**App Review**. Prérequis : compte **Instagram Pro (Business)** + **Page Facebook liée**. Délai ~**2-4 semaines**. ⚠️ Reels publiables via API **uniquement** en compte Business (pas Creator).
- **TikTok** : `developers.tiktok.com` → crée une app → **Content Posting API** → demande l'**audit** (sans audit, tous les posts restent **privés**). Délai ~**2-6 semaines**. ⚠️ **AI-labeling obligatoire** sur le contenu généré par IA.
- **LinkedIn** : `developer.linkedin.com` → crée une app → produit **"Share on LinkedIn"** (scope `w_member_social`, **profil perso**). La **page entreprise** exige le **Community Management API** = statut **Partenaire LinkedIn** → trop lourd, on **skip** au départ.

## C. Activer le social côté machine (quand X est prêt)
1. Tu me préviens → **j'applique la migration `004_social_posts.sql`** (base Jarvis).
2. Médias (visuels / vidéos) via **Higgsfield / Canva** (hors backend).
3. L'humain **valide toujours** un post avant publication.

---

# À COMPRENDRE ENSEMBLE (pour ne pas être perdus)

- **Warmup = ~2 semaines** avant le volume réel. Tout configurer ≠ tout envoyer le jour 1.
- **DNS délégué à Maildoso** = SPF/DKIM/DMARC auto = on supprime l'erreur n°1 du cold (un DKIM mal collé = spam silencieux).
- **X : le Bearer ne poste pas.** Il faut les **4 clés OAuth 1.0a**, et régénérer l'Access Token après avoir mis les permissions en write.
- **Cap d'envoi bas au départ** (`12/boîte`) → on monte seulement si bounce/plaintes restent verts (garde-fous Jarvis).
- **Le cold ne dépend d'aucune approbation réseau.** Lot 1 peut tourner pendant que les demandes Meta/TikTok/LinkedIn mûrissent.
