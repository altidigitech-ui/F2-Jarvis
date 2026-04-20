import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("path") || "";
  if (!filePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }
  if (!BACKEND) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`${BACKEND}/file?path=${encodeURIComponent(filePath)}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}
