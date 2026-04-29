import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ wing: string; filename: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { wing, filename } = await params;
  if (!BACKEND) return Response.json({ error: "Backend not configured" }, { status: 503 });
  try {
    const res = await fetch(
      `${BACKEND}/mempalace/drawer/${encodeURIComponent(wing)}/${encodeURIComponent(filename)}`
    ,
      { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } }
    );
    if (res.status === 404) return Response.json({ error: "Not found" }, { status: 404 });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
