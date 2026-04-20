export const runtime = "nodejs";
export const maxDuration = 30;

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  if (!BACKEND) return Response.json({ wings: [], empty: true });
  try {
    const res = await fetch(`${BACKEND}/mempalace/wings`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } })
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ wings: [], empty: true });
  }
}
