# 03 — INFRA MANUELLE (checklist branchements)

> **Le seul fichier que TU exécutes à la main.** Tout ce que Claude Code / OpenClaw ne peuvent pas faire : achats, comptes, DNS, approbations. Coche au fur et à mesure et **note tes identifiants ici** (puis déplace-les dans l'env du VPS, jamais dans le code commité).
> Ordre = par délai : ce qui est lent d'abord.

---

## ⏳ J0 — À LANCER EN PREMIER (délais longs)

Ces demandes prennent des jours/semaines. À envoyer **tout de suite**, en parallèle du reste. Bloquent uniquement le moteur réseaux (Phase 6), pas l'email.

- [ ] **Meta (Instagram/Facebook)** — créer une app sur developers.facebook.com → vérification business → demander la permission *content publishing*. _(semaines)_
- [ ] **TikTok** — compte dev → app → demander l'accès *Content Posting API*. _(jours-semaines)_
- [ ] **LinkedIn** — créer une app → demander l'accès *Posts/Marketing API*. _(jours-semaines)_
- [ ] **X/Twitter** — compte dev, free tier (écriture). _(rapide)_

Statut demandes : ______________________

---

## 🖥️ ÉTAPE 1 — VPS

- [ ] Commander un VPS (Hostinger ou Hetzner), **Ubuntu 22.04, 4 GB RAM min** (8 GB conseillé).
- [ ] Récupérer : IP du VPS, accès SSH.
- [ ] _(Le reste — Docker, Node, Redis, déploiement Jarvis + OpenClaw — c'est Claude Code qui le fait via SSH. Toi tu fournis juste l'accès.)_

IP VPS : ____________  •  Accès SSH : ____________

---

## 📧 ÉTAPE 2 — Boîtes d'envoi (fournisseur d'infra cold)

> **Pas de boîte mail grand public** (cold interdit → suspension, vérifié). On prend un fournisseur dédié cold qui configure DNS + warmup tout seul.

- [ ] Souscrire **Maildoso** (ou Mailforge / Zapmail) — ~2-3$/boîte, ~10 boîtes.
- [ ] Créer ~10 boîtes avec des **prénoms réels** sur `leakdetector.tech` (+ domaines du provider). Jamais `noreply@`.
- [ ] Laisser le provider poser **SPF/DKIM/DMARC + warmup** (auto). Si le domaine reste sur Porkbun, coller les records qu'il fournit.
- [ ] Récupérer les **creds SMTP + IMAP** de chaque boîte → les mettre dans l'env du VPS.

| Fournisseur choisi | Nb boîtes | Domaine(s) |
|---|---|---|
| ____________ | ____________ | ____________ |

---

## 🔑 ÉTAPE 3 — Clés à rassembler

- [ ] **Anthropic API key** (pour le compose, modèle Haiku) : ____________
- [ ] **URL endpoint preview-scan StoreMD** (confirmée en Phase Reco) : ____________
- [ ] Tokens réseaux (quand les approbations de J0 tombent) : Meta __  TikTok __  X __  LinkedIn __

> Toutes ces clés → dans l'**env du VPS**. Jamais dans un fichier commité sur GitHub.

---

## 📄 ÉTAPE 4 — Légal

- [ ] Rédiger la **LIA** (Legitimate Interest Assessment), 1 page. Couvre le ciblage B2B US/UK/AU.

---

## ✅ QUAND C'EST FAIT

Tout coché = l'infra est prête. Tu redonnes la main à Claude Code pour le build (`plan.md`), qui n'a plus qu'à brancher le code sur ces accès.

**Récap de ce qui est manuel (toi) vs auto (Claude Code) :**
- **Toi :** commander VPS, souscrire le fournisseur cold + créer les boîtes, lancer les demandes d'API réseaux, fournir les clés, écrire la LIA.
- **Claude Code / OpenClaw :** tout le reste (installer le VPS, déployer, coder Jarvis, le scraper, le séquenceur, les jobs).
