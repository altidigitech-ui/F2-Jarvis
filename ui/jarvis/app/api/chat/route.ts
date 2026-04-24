import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 300;
export const maxBodySize = "25mb";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function POST(req: Request) {
  if (!BACKEND) {
    return new Response("[Erreur: RAILWAY_BACKEND_URL non configuré]", { status: 500 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await req.json();
  const response = await fetch(`${BACKEND}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
      "X-USER-ID": user?.id || "",
    },
    body: JSON.stringify(body),
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") || "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
