import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await params;
  if (!BACKEND) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`${BACKEND}/graphify/node/${encodeURIComponent(id)}`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" }, next: { revalidate: 600 },
    });
    if (!res.ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Backend error" }, { status: 503 });
  }
}
