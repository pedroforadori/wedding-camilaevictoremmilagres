import { appendJsonLine } from "@/lib/dataStore";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!name || !message) {
    return Response.json(
      { error: "Nome e mensagem são obrigatórios." },
      { status: 400 },
    );
  }
  if (message.length > 4000) {
    return Response.json({ error: "Mensagem muito longa." }, { status: 400 });
  }

  appendJsonLine("guestbook.jsonl", {
    name,
    message,
    email: email || null,
    submittedAt: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
