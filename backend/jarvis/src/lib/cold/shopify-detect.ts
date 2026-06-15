// Détection Shopify déterministe (sans browser) : signatures HTML/headers +
// endpoint public /products.json. Fait côté Jarvis ; OpenClaw ne sert qu'à
// DÉCOUVRIR des URLs candidates et à enrichir les emails (pages contact).
// Cf. 01-SCRAPING.md.

import type { Country, PlatformData } from "./types.js";

const UA = "Mozilla/5.0 (compatible; StoreMD-Scan/1.0; +https://leakdetector.tech)";
const TIMEOUT_MS = 10000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, headers: { "User-Agent": UA, ...(init?.headers || {}) } });
  } finally {
    clearTimeout(t);
  }
}

export function normalizeDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
  return d;
}

// Détecte Shopify + extrait des signaux de qualif. Ne lève pas : renvoie
// is_shopify=false en cas d'échec réseau.
export async function detectShopify(domain: string): Promise<PlatformData> {
  const base = `https://${domain}`;
  const result: PlatformData = { is_shopify: false };

  // 1) /products.json — confirme Shopify ET donne le catalogue.
  try {
    const res = await fetchWithTimeout(`${base}/products.json?limit=1`);
    if (res.ok) {
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        result.is_shopify = true;
        // Le count exact demande une page complète ; on récupère ce qui est dispo.
        try {
          const data = (await res.json()) as { products?: unknown[] };
          if (Array.isArray(data.products)) result.product_count = data.products.length;
        } catch {
          /* json invalide, on garde is_shopify */
        }
      }
    }
  } catch {
    /* timeout / réseau */
  }

  // 2) HTML — header X-ShopId, cdn.shopify.com, thème, apps (scripts injectés).
  try {
    const res = await fetchWithTimeout(base);
    if (res.headers.get("x-shopid")) result.is_shopify = true;
    if (res.ok) {
      const html = await res.text();
      if (html.includes("cdn.shopify.com") || html.includes("/cdn/shop/") || html.includes("Shopify.theme")) {
        result.is_shopify = true;
      }
      const themeMatch = html.match(/Shopify\.theme\s*=\s*\{[^}]*"name":"([^"]+)"/);
      if (themeMatch) result.theme = themeMatch[1];
      result.apps = detectApps(html);
    }
  } catch {
    /* timeout / réseau */
  }

  return result;
}

// Apps détectables via les scripts/domaines tiers injectés dans le HTML.
const APP_SIGNATURES: Array<{ name: string; needle: string }> = [
  { name: "Klaviyo", needle: "klaviyo" },
  { name: "Judge.me", needle: "judge.me" },
  { name: "Yotpo", needle: "yotpo" },
  { name: "Loox", needle: "loox.io" },
  { name: "ReCharge", needle: "rechargecdn" },
  { name: "Gorgias", needle: "gorgias" },
  { name: "PageFly", needle: "pagefly" },
  { name: "Tidio", needle: "tidio" },
  { name: "Privy", needle: "privy" },
  { name: "Bold", needle: "boldapps" },
];

function detectApps(html: string): string[] {
  const lower = html.toLowerCase();
  return APP_SIGNATURES.filter((a) => lower.includes(a.needle)).map((a) => a.name);
}

// Détection grossière du pays (filtre US/UK/AU). Renvoie null si indéterminé.
const TLD_COUNTRY: Record<string, Country> = {
  ".co.uk": "UK",
  ".uk": "UK",
  ".com.au": "AU",
  ".au": "AU",
};

export function guessCountry(domain: string, html?: string): Country | null {
  for (const [tld, country] of Object.entries(TLD_COUNTRY)) {
    if (domain.endsWith(tld)) return country;
  }
  if (html) {
    if (/\bGBP\b|£/.test(html)) return "UK";
    if (/\bAUD\b/.test(html)) return "AU";
    if (/\bUSD\b|\$/.test(html)) return "US";
  }
  // .com sans signal → on suppose US (marché primaire), à affiner à l'enrichissement.
  if (domain.endsWith(".com")) return "US";
  return null;
}
