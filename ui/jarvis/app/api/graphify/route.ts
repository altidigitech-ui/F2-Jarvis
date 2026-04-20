import { NextResponse } from "next/server";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  if (!BACKEND) {
    return NextResponse.json({ initialized: false }, { status: 200 });
  }
  try {
    const res = await fetch(`${BACKEND}/graphify`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" }, next: { revalidate: 600 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ initialized: false }, { status: 200 });
  }
}
