import { readJsonLines } from "@/lib/dataStore";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const dynamic = "force-dynamic";

type RsvpEntry = {
  guests: { fullName: string; isPlusOne: boolean }[];
  phone: string;
  events: string[];
  submittedAt: string;
};

export default function AdminNoivosRsvpsPage() {
  const rsvps = readJsonLines<RsvpEntry>("rsvps.jsonl").reverse();

  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AdminSubpageHeader title="RSVPs" />

        <div className="mt-10 space-y-4">
          {rsvps.length === 0 ? (
            <p className="text-sm text-ink/50">Nenhuma resposta recebida ainda.</p>
          ) : (
            rsvps.map((entry, index) => (
              <div
                key={`${entry.submittedAt}-${index}`}
                className="rounded-xl border border-sand-dark/60 bg-sand/30 px-6 py-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-ink/80">
                    {entry.guests
                      .map(
                        (guest) =>
                          guest.fullName + (guest.isPlusOne ? " (acompanhante)" : ""),
                      )
                      .join(", ")}
                  </p>
                  <p className="text-xs text-ink/50">
                    {new Date(entry.submittedAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <p className="mt-2 text-sm text-ink/70">Telefone: {entry.phone}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ocean-deep">
                  {entry.events.length > 0 ? entry.events.join(" · ") : "Sem eventos selecionados"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
