import { readJsonLines } from "@/lib/dataStore";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const dynamic = "force-dynamic";

type GuestbookEntry = {
  name: string;
  message: string;
  email: string | null;
  submittedAt: string;
};

export default function AdminNoivosMensagensPage() {
  const messages = readJsonLines<GuestbookEntry>("guestbook.jsonl").reverse();

  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <AdminSubpageHeader title="Mensagens" />

        <div className="mt-10 space-y-4">
          {messages.length === 0 ? (
            <p className="text-sm text-ink/50">Nenhuma mensagem recebida ainda.</p>
          ) : (
            messages.map((entry, index) => (
              <div
                key={`${entry.submittedAt}-${index}`}
                className="rounded-xl border border-sand-dark/60 bg-sand/30 px-6 py-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-xs uppercase tracking-wide text-ocean-deep">
                    {entry.name}
                    {entry.email ? ` · ${entry.email}` : ""}
                  </p>
                  <p className="text-xs text-ink/50">
                    {new Date(entry.submittedAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <p className="mt-2 text-ink/80">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
