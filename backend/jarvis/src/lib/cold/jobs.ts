// Phase 4 — JOBS COLD (BullMQ). qualify · enrich · scan (STUB) · compose · push.
// Plus les ticks cron : sequence-tick (relances dues) et imap-poll (réponses).
// Convention Claude : REST direct Haiku (cf. jarvis-memory.ts), service-role Supabase.

import { getSupabase } from "../supabase.js";
import { enrichTarget } from "./scraper.js";
import { sendColdEmail } from "./mailer.js";
import { pollAllReplies } from "./imap.js";
import { nextTouchAfter, MAX_TOUCHES } from "./sequence.js";
import type { ColdTarget, ScanFinding } from "./types.js";

const TABLE = "cold_targets";

async function getTarget(id: string): Promise<ColdTarget> {
  const { data, error } = await getSupabase().from(TABLE).select("*").eq("id", id).single();
  if (error || !data) throw new Error(`[cold/jobs] target ${id} introuvable: ${error?.message}`);
  return data as ColdTarget;
}

async function patch(id: string, fields: Partial<ColdTarget>): Promise<void> {
  const { error } = await getSupabase().from(TABLE).update(fields).eq("id", id);
  if (error) throw new Error(`[cold/jobs] update ${id}: ${error.message}`);
}

// --- qualify : sourced → qualified|rejected ---------------------------------
// Score sur platform_data (apps installées, thème payant, catalogue actif).
export async function jobQualify(id: string): Promise<void> {
  const t = await getTarget(id);
  const pd = t.platform_data;
  let score = 0;
  if (pd) {
    if (pd.is_shopify) score += 30;
    score += Math.min((pd.apps?.length || 0) * 10, 30); // app bloat = douleur StoreMD
    if (pd.theme && pd.theme.toLowerCase() !== "dawn") score += 20; // thème payant
    if ((pd.product_count || 0) > 0) score += 20; // boutique active
  }
  const qualified = score >= 50;
  await patch(id, { qualify_score: score, status: qualified ? "qualified" : "rejected" });
}

// --- enrich : qualified → enriched|unreachable ------------------------------
// Délègue au scraper (OpenClaw + vérif SMTP + drop role).
export async function jobEnrich(id: string): Promise<void> {
  const t = await getTarget(id);
  await enrichTarget(t);
}

// --- scan : enriched → scanned  [STUB] --------------------------------------
// Volontairement non implémenté : l'endpoint interne StoreMD qui renvoie les
// findings détaillés n'est pas prêt (cf. reco-findings.md Tâche B). Quand il le
// sera : POST {STOREMD_PREVIEW_SCAN_URL} { store_url } -> { score, findings[] },
// puis patch({ scan_score, scan_findings, status: "scanned" }).
export class ColdScanNotReadyError extends Error {
  constructor() {
    super("[cold/jobs] job scan en STUB — endpoint interne StoreMD pas encore livré");
    this.name = "ColdScanNotReadyError";
  }
}
export async function jobScan(_id: string): Promise<void> {
  throw new ColdScanNotReadyError();
}

// --- compose : scanned → composed -------------------------------------------
// Gère les findings DÉTAILLÉS (réponse de l'endpoint interne StoreMD).
// Sujet templaté (garantit le format + conformité ANTI-IA, pas d'em-dash) ;
// corps généré par Haiku sous contraintes anti-détection.
export async function jobCompose(id: string): Promise<void> {
  const t = await getTarget(id);
  if (t.scan_score == null || !t.scan_findings || t.scan_findings.length === 0) {
    throw new Error(`[cold/jobs] compose ${id}: pas de scan_score/scan_findings (scan pas fait)`);
  }
  const findings = t.scan_findings.slice(0, 3);
  const subject = `${t.store_domain}: ${t.scan_score}/100`;
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

  // Contraintes ANTI-IA.md (§0, prime sur tout) injectées dans le prompt.
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

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    throw new Error(`[cold/jobs] compose Haiku HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
  let body = (data.content || []).filter((b) => b.type === "text" && b.text).map((b) => b.text!).join("\n").trim();

  // Garde-fou : em-dash neutralisé si le modèle en glisse un (ANTI-IA prime).
  body = body.replace(/—/g, ", ");
  // Garde-fou opt-out toujours présent.
  if (!/unsubscrib|reply .*stop|opt out|opt-out/i.test(body)) {
    body += `\n\nIf this isn't useful, reply "stop" and I won't email again.`;
  }
  return body;
}

// --- push : composed → in_sequence (1ère touche J0 + planif relances) -------
export async function jobPush(id: string): Promise<void> {
  const t = await getTarget(id);
  if (!t.decision_maker_email) throw new Error(`[cold/jobs] push ${id}: pas d'email`);
  if (!t.email_subject || !t.email_body) throw new Error(`[cold/jobs] push ${id}: email non composé`);

  // Garde-fou suppression : jamais recontacter une adresse supprimée.
  if (await isSuppressed(t.decision_maker_email)) {
    await patch(id, { status: "unsubscribed", error: "suppressed before send" });
    return;
  }

  const sent = await sendColdEmail({ to: t.decision_maker_email, subject: t.email_subject, body: t.email_body });
  await patch(id, {
    sending_inbox: sent.inbox,
    status: "in_sequence",
    touch_count: 1,
    next_touch_at: nextTouchAfter(1),
  });
}

async function isSuppressed(email: string): Promise<boolean> {
  const { data } = await getSupabase().from("cold_suppression").select("email").eq("email", email.toLowerCase()).maybeSingle();
  return Boolean(data);
}

// --- sequence-tick (cron) : envoie les relances dues -------------------------
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
  if (error) throw new Error(`[cold/jobs] sequence-tick query: ${error.message}`);

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
      const followUp = `Following up on my note about ${t.store_domain}. Happy to send the full breakdown whenever it's useful.\n\nIf you'd rather not hear from me, reply "stop".`;
      const r = await sendColdEmail({ to: t.decision_maker_email, subject: `Re: ${t.email_subject}`, body: followUp });
      const nextCount = t.touch_count + 1;
      await patch(t.id, {
        sending_inbox: r.inbox,
        touch_count: nextCount,
        next_touch_at: nextTouchAfter(nextCount),
      });
      sent++;
    } catch (err) {
      console.error(`[cold/jobs] relance ${t.store_domain}:`, err instanceof Error ? err.message : err);
    }
  }
  return { sent };
}

// --- imap-poll (cron) : détecte les réponses, matche au lead ----------------
// Phase 2 = détecter + router le minimum (réponse / désinscription). La
// classification fine (interested/objection/not_now) est Phase 5.
export async function jobImapPoll(): Promise<{ matched: number }> {
  const sb = getSupabase();
  const replies = await pollAllReplies();
  let matched = 0;
  for (const r of replies) {
    const { data } = await sb
      .from(TABLE)
      .select("id, status")
      .eq("decision_maker_email", r.fromEmail)
      .in("status", ["in_sequence", "replied"])
      .maybeSingle();
    if (!data) continue;

    const isUnsub = /unsubscrib|^\s*stop\b|remove me|opt[\s-]?out/i.test(r.text) || /unsubscrib|stop/i.test(r.subject);
    if (isUnsub) {
      await sb.from("cold_suppression").upsert({ email: r.fromEmail, reason: "reply opt-out" });
      await patch((data as { id: string }).id, { status: "unsubscribed", reply_category: "unsubscribe", next_touch_at: null });
    } else {
      // Réponse positive/neutre : on stoppe la séquence, classification = Phase 5.
      await patch((data as { id: string }).id, { status: "replied", next_touch_at: null });
    }
    matched++;
  }
  return { matched };
}
