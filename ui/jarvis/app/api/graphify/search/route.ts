import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  if (!BACKEND) return NextResponse.json({ results: [] });
  try {
    const res = await fetch(`${BACKEND}/graphify/search?q=${encodeURIComponent(q)}`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } })
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ results: [] });
  }
}
