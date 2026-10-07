import { saveRsvp } from "@/lib/rsvpStore";

type GuestInput = { fullName: string; isPlusOne: boolean };

function parseGuests(value: unknown): GuestInput[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => ({
      fullName:
        typeof entry?.fullName === "string" ? entry.fullName.trim() : "",
      isPlusOne: Boolean(entry?.isPlusOne),
    }))
    .filter((guest) => guest.fullName.length > 0)
    .slice(0, 10);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const guests = parseGuests(body?.guests);
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const events = Array.isArray(body?.events)
    ? body.events.filter((event: unknown) => typeof event === "string")
    : [];

  if (guests.length === 0 || !phone) {
    return Response.json(
      { error: "Nome completo e telefone são obrigatórios." },
      { status: 400 },
    );
  }

  const result = await saveRsvp({
    guests,
    phone,
    events,
    submittedAt: new Date().toISOString(),
  });

  if (result === "duplicate-phone") {
    return Response.json(
      {
        error:
          "Este telefone já confirmou presença. Para alterar a confirmação, fale com a nossa assessora.",
      },
      { status: 409 },
    );
  }

  if (result === "unavailable") {
    return Response.json(
      { error: "Confirmação indisponível." },
      { status: 503 },
    );
  }

  return Response.json({ ok: true });
}
