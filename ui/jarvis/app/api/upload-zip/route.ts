import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;
export const maxBodySize = "50mb";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function POST(req: Request) {
  if (!BACKEND) {
    return new Response(JSON.stringify({ error: "RAILWAY_BACKEND_URL non configuré" }), { status: 500 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await req.json();
  const response = await fetch(`${BACKEND}/upload-zip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
      "X-USER-ID": user?.id || "",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
