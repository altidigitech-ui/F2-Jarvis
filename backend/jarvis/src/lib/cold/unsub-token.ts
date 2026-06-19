// Token de désinscription one-click (RFC 8058). Signé, pas chiffré : l'adresse
// est une donnée à faible sensibilité, seule l'intégrité compte.
// Format : base64url(email) "." base64url(HMAC-SHA256(secret, base64url(email))).
// Le serveur web décode l'email de la 1ʳᵉ partie et vérifie la signature, sans
// lookup DB et sans exposer l'email en clair brut dans l'URL.

import crypto from "crypto";

function sign(payloadB64: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function makeUnsubToken(email: string, secret: string): string {
  const payload = Buffer.from(email.toLowerCase(), "utf8").toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

// Retourne l'email (lowercase) si le token est valide, sinon null.
export function verifyUnsubToken(token: string, secret: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  if (!payload || !sig) return null;

  const expected = sign(payload, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const email = Buffer.from(payload, "base64url").toString("utf8").toLowerCase();
    // Garde-fou minimal : forme d'email plausible.
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? email : null;
  } catch {
    return null;
  }
}
