import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  if (!jobId) {
    return Response.json({ error: "jobId requis" }, { status: 400 });
  }

  const response = await fetch(`${BACKEND}/batch/job/${encodeURIComponent(jobId)}`, {
    method: "GET",
    headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
