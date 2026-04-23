import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await context.params;
  const res = await fetch(`${BACKEND}/action/${encodeURIComponent(id)}`, {
    headers: {
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
      "X-USER-ID": user?.id || "",
    },
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
