export const runtime = "nodejs";
export const maxDuration = 30;

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!BACKEND) return Response.json({ wing: id, drawers: [] });
  try {
    const res = await fetch(`${BACKEND}/mempalace/wing/${encodeURIComponent(id)}`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } })
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ wing: id, drawers: [] });
  }
}
