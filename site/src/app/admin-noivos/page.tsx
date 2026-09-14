import Link from "next/link";
import { readJsonLines } from "@/lib/dataStore";
import { getVisitStats } from "@/lib/visitStats";
import { logout } from "./login/actions";
import { VisitsChart } from "./VisitsChart";

export const dynamic = "force-dynamic";

type RsvpEntry = {
  guests: { fullName: string; isPlusOne: boolean }[];
  events: string[];
};
type GuestbookEntry = { submittedAt: string };

export default async function AdminNoivosPage() {
  const rsvps = readJsonLines<RsvpEntry>("rsvps.jsonl");
  const messages = readJsonLines<GuestbookEntry>("guestbook.jsonl");
  const confirmedGuests = rsvps.reduce(
    (total, entry) =>
      entry.events.length > 0 && !entry.events.includes("Não poderei comparecer")
        ? total + entry.guests.length
        : total,
    0,
  );
  const visitStats = await getVisitStats();

  const links = [
    {
      href: "/admin-noivos/rsvps",
      title: "RSVPs",
      description: "Lista de convidados, telefones e presença por evento.",
      stat: `${rsvps.length} respostas · ${confirmedGuests} confirmados`,
    },
    {
      href: "/admin-noivos/mensagens",
      title: "Mensagens",
      description: "Mural de recados dos convidados, com e-mail quando informado.",
      stat: `${messages.length} mensagens`,
    },
    {
      href: "/admin-noivos/presentes",
      title: "Presentes",
      description: "Presentes recebidos.",
      stat: "Ainda não configurado",
    },
  ];

  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl italic text-ocean-deep">
              Área dos noivos
            </h1>
            <span
              aria-hidden="true"
              className="mt-4 block h-px w-16 bg-sand-dark"
            />
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-ocean-deep underline decoration-ocean/40 underline-offset-4 hover:text-ocean"
            >
              Sair
            </button>
          </form>
        </div>

        <div className="mt-10">
          <VisitsChart stats={visitStats} />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-6 transition-colors hover:bg-sand/50"
            >
              <p className="font-display text-2xl italic text-ocean-deep">
                {link.title}
              </p>
              <p className="mt-2 text-sm text-ink/70">{link.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-ocean-deep">
                {link.stat}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
