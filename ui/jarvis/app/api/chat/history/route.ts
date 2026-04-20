import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request) {
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = new URL(req.url);
  const backendUrl = new URL(`${BACKEND}/chat/history`);
  backendUrl.search = url.search;

  const response = await fetch(backendUrl.toString(), {
    headers: {
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
      "X-USER-ID": user?.id || "",
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
