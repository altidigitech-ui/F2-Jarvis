import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!BACKEND) {
    return NextResponse.json({ nodes: [], links: [] }, { status: 200 });
  }
  try {
    const res = await fetch(`${BACKEND}/graph`, {
      headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" },
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ nodes: [], links: [] }, { status: 200 });
  }
}
