import { NextResponse } from "next/server";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") ?? "";
  const depth = searchParams.get("depth") ?? "2";
  if (!BACKEND) return NextResponse.json({ nodes: [], edges: [] });
  try {
    const res = await fetch(
      `${BACKEND}/graphify/related?from=${encodeURIComponent(from)}&depth=${depth}`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ nodes: [], edges: [] });
  }
}
