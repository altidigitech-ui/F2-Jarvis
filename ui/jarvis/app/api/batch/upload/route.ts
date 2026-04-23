import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function POST(req: Request) {
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const response = await fetch(`${BACKEND}/batch/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
      "X-USER-ID": user.id,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
