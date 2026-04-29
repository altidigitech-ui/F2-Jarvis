import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const filePath = req.nextUrl.searchParams.get("path") || "";
  if (!filePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }
  if (!BACKEND) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`${BACKEND}/file?path=${encodeURIComponent(filePath)}`, {
      headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}
