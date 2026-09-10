import { appendJsonLine } from "@/lib/dataStore";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const attending = body?.attending === "nao" ? "nao" : "sim";
  const guests = Number.isFinite(body?.guests)
    ? Math.max(0, Math.min(20, Math.trunc(body.guests)))
    : 0;

  if (!name || !phone) {
    return Response.json(
      { error: "Nome e telefone são obrigatórios." },
      { status: 400 },
    );
  }

  appendJsonLine("rsvps.jsonl", {
    name,
    phone,
    email: email || null,
    attending,
    guests,
    submittedAt: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
