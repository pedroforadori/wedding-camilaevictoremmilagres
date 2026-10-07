import { GuestbookForm } from "./GuestbookForm";
import { guestbook } from "@/content/wedding";
import { listGuestbookEntries } from "@/lib/guestbookStore";

export async function MensagensSection() {
  const entries = (await listGuestbookEntries()).reverse();

  return (
    <section
      id="mensagens"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl text-gold">
          {guestbook.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <div className="mt-10 rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-8 sm:px-10">
          <GuestbookForm />
        </div>

        {entries.length > 0 && (
          <div className="mt-12 space-y-6 text-left">
            {entries.map((entry, index) => (
              <div
                key={`${entry.submittedAt}-${index}`}
                className="rounded-xl border border-sand-dark/60 bg-foam px-6 py-5"
              >
                <p className="text-ink/80">{entry.message}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-gold-deep">
                  {entry.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
