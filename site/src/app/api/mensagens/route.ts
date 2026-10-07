import { saveGuestbookEntry } from "@/lib/guestbookStore";

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

  const saved = await saveGuestbookEntry({
    name,
    message,
    email: email || null,
    submittedAt: new Date().toISOString(),
  });

  if (!saved) {
    return Response.json({ error: "Mural indisponível." }, { status: 503 });
  }

  return Response.json({ ok: true });
}
