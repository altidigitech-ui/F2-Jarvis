export const runtime = "nodejs";

const BACKEND = process.env.RAILWAY_BACKEND_URL;

export async function GET() {
  if (!BACKEND) {
    return Response.json({ error: "RAILWAY_BACKEND_URL non configuré" }, { status: 500 });
  }
  const response = await fetch(`${BACKEND}/batch/status`, {
    headers: {
      "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "",
    },
  });
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
