import { PendingNote } from "./PendingNote";
import { presentes } from "@/content/wedding";

export function PresentesSection() {
  return (
    <section
      id="presentes"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl italic text-ocean-deep">
          {presentes.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-balance text-ink/80">{presentes.intro}</p>

        <PendingNote note={presentes.note} />
      </div>
    </section>
  );
}
