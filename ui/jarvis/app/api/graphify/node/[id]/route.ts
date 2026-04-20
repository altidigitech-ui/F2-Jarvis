import { NextResponse } from "next/server";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
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
