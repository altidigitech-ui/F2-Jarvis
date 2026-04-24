export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(req: Request) {
  if (!BACKEND) return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  const url = new URL(req.url);
  const persona = url.searchParams.get("persona") || "fabrice";
  const response = await fetch(`${BACKEND}/prompts?persona=${persona}`, {
    headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" },
  });
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
