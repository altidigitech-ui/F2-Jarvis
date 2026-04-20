export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!BACKEND) return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  const { id } = await params;
  const response = await fetch(`${BACKEND}/ouroboros/proposal/${encodeURIComponent(id)}`);
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
