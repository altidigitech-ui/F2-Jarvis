// Vérification SMTP d'une adresse SANS envoyer : handshake MX → MAIL FROM →
// RCPT TO, puis QUIT. Permet de valider une adresse trouvée par permutation
// sans générer de bounce. Cf. 01-SCRAPING.md ENRICH §3.
//
// Caveats connus : beaucoup de serveurs catch-all renvoient 250 pour tout, et
// certains bloquent la vérif (greylisting, 4xx). On renvoie donc un verdict
// prudent : "valid" seulement sur 250 explicite, "unknown" sur 4xx/catch-all.

import { resolveMx } from "node:dns/promises";
import net from "node:net";

export type VerifyVerdict = "valid" | "invalid" | "unknown";

const PROBE_FROM = process.env.COLD_SMTP_PROBE_FROM || "verify@leakdetector.tech";
const TIMEOUT_MS = 8000;

async function mxHostFor(domain: string): Promise<string | null> {
  try {
    const records = await resolveMx(domain);
    if (!records.length) return null;
    records.sort((a, b) => a.priority - b.priority);
    return records[0].exchange;
  } catch {
    return null;
  }
}

// Dialogue SMTP minimal. Renvoie le code de réponse au RCPT TO.
function probeRcpt(mxHost: string, email: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(25, mxHost);
    socket.setTimeout(TIMEOUT_MS);
    let stage = 0;
    let buffer = "";

    const steps = [
      `HELO leakdetector.tech\r\n`,
      `MAIL FROM:<${PROBE_FROM}>\r\n`,
      `RCPT TO:<${email}>\r\n`,
    ];

    const fail = (err: Error) => {
      socket.destroy();
      reject(err);
    };

    socket.on("data", (chunk) => {
      buffer += chunk.toString();
      if (!buffer.endsWith("\r\n")) return;
      const code = Number(buffer.slice(0, 3));
      buffer = "";

      if (stage < steps.length) {
        // 2xx/3xx attendus pour HELO/MAIL FROM ; sinon on abandonne.
        if (stage > 0 && code >= 400 && stage < steps.length) {
          // refus avant le RCPT → indéterminé
        }
        socket.write(steps[stage]);
        stage++;
      } else {
        // Réponse au RCPT TO (dernière commande envoyée).
        socket.write("QUIT\r\n");
        socket.end();
        resolve(code);
      }
    });

    socket.on("timeout", () => fail(new Error("smtp timeout")));
    socket.on("error", fail);
    socket.on("end", () => {
      if (stage <= steps.length) {
        // Connexion coupée avant verdict clair.
        resolve(0);
      }
    });
  });
}

export async function verifyEmail(email: string): Promise<VerifyVerdict> {
  const domain = email.split("@")[1];
  if (!domain) return "invalid";
  const mx = await mxHostFor(domain);
  if (!mx) return "invalid"; // pas de MX → l'adresse ne peut pas recevoir
  try {
    const code = await probeRcpt(mx, email);
    if (code === 250 || code === 251) return "valid";
    if (code === 550 || code === 551 || code === 553) return "invalid";
    return "unknown"; // 4xx, greylist, catch-all, coupure
  } catch {
    return "unknown";
  }
}

// Adresses role à drop (on veut le décideur). Cf. 01-SCRAPING.md ENRICH.
const ROLE_PREFIXES = ["info", "support", "contact", "hello", "sales", "admin", "team", "help", "service", "orders"];

export function isRoleAddress(email: string): boolean {
  const local = email.split("@")[0]?.toLowerCase() || "";
  return ROLE_PREFIXES.includes(local);
}
