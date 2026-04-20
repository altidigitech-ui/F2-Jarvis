import { NextResponse } from "next/server";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  if (!BACKEND) {
    return NextResponse.json({ nodes: [], links: [] }, { status: 200 });
  }
  try {
    const res = await fetch(`${BACKEND}/graph`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" }, next: { revalidate: 300 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ nodes: [], links: [] }, { status: 200 });
  }
}
