export const runtime = "nodejs";
export const maxDuration = 30;

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  if (!BACKEND) return Response.json({ totalDrawers: 0, totalWings: 0, byWing: {}, lastUpdate: "", oldestDrawer: "", newestDrawer: "" });
  try {
    const res = await fetch(`${BACKEND}/mempalace/stats`, { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } })
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ totalDrawers: 0, totalWings: 0, byWing: {}, lastUpdate: "", oldestDrawer: "", newestDrawer: "" });
  }
}
