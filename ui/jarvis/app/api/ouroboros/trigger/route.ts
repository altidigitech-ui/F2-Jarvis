export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function POST(req: Request) {
  if (!BACKEND) return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  const body = await req.json().catch(() => ({}));
  const response = await fetch(`${BACKEND}/ouroboros/trigger`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
