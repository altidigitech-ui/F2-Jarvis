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
  const from = searchParams.get("from") ?? "";
  const depth = searchParams.get("depth") ?? "2";
  if (!BACKEND) return NextResponse.json({ nodes: [], edges: [] });
  try {
    const res = await fetch(
      `${BACKEND}/graphify/related?from=${encodeURIComponent(from)}&depth=${depth}`
    ,
      { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ nodes: [], edges: [] });
  }
}
