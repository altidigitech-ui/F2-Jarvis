import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }
  if (!BACKEND) return Response.json({ wings: [], empty: true });
  try {
    const res = await fetch(`${BACKEND}/mempalace/wings`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } })
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ wings: [], empty: true });
  }
}
