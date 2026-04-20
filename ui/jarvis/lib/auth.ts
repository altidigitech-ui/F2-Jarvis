import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "jarvis_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

export type UserIdentity = {
  id: "fabrice" | "romain";
  email: string;
};

function getUsers(): Array<UserIdentity & { hash: string }> {
  return [
    {
      id: "fabrice",
      email: process.env.AUTH_FABRICE_EMAIL || "",
      hash: process.env.AUTH_FABRICE_PASSWORD_HASH || "",
    },
    {
      id: "romain",
      email: process.env.AUTH_ROMAIN_EMAIL || "",
      hash: process.env.AUTH_ROMAIN_PASSWORD_HASH || "",
    },
  ];
}

export function verifyCredentials(email: string, password: string): UserIdentity | null {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !user.hash) return null;
  if (!bcrypt.compareSync(password, user.hash)) return null;
  return { id: user.id, email: user.email };
}

export function createSessionToken(user: UserIdentity): string {
  const secret = process.env.AUTH_SESSION_SECRET || "";
  const payload = JSON.stringify({
    id: user.id,
    email: user.email,
    exp: Date.now() + SESSION_DURATION_MS,
  });
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export function verifySessionToken(token: string): UserIdentity | null {
  try {
    const secret = process.env.AUTH_SESSION_SECRET || "";
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return null;
    const payloadB64 = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);
    if (!payloadB64 || !signature) return null;

    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSig) return null;

    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null;

    return { id: data.id, email: data.email };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<UserIdentity | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_DURATION = SESSION_DURATION_MS;
