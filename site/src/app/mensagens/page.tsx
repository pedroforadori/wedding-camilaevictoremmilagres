import type { Metadata } from "next";
import { GuestbookForm } from "@/components/GuestbookForm";
import { guestbook } from "@/content/wedding";
import { readJsonLines } from "@/lib/dataStore";

export const metadata: Metadata = { title: "Mensagens | Camila & Victor" };
export const dynamic = "force-dynamic";

type GuestbookEntry = {
  name: string;
  message: string;
  submittedAt: string;
};

export default function MensagensPage() {
  const entries = readJsonLines<GuestbookEntry>("guestbook.jsonl").reverse();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl italic text-ocean-deep">
          {guestbook.title}
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-ink/80">{guestbook.intro}</p>

        <div className="mt-10 rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-8 sm:px-10">
          <GuestbookForm />
        </div>

        <div className="mt-12 space-y-6 text-left">
          {entries.length === 0 ? (
            <p className="text-center text-sm text-ink/50">
              Nenhuma mensagem recebida. Deixe a primeira!
            </p>
          ) : (
            entries.map((entry, index) => (
              <div
                key={`${entry.submittedAt}-${index}`}
                className="rounded-xl border border-sand-dark/60 bg-foam px-6 py-5"
              >
                <p className="text-ink/80">{entry.message}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-ocean-deep">
                  {entry.name}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
