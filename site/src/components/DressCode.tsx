import { SectionHeading } from "./SectionHeading";
import { dressCode, schedule } from "@/content/wedding";

export function DressCode() {
  return (
    <section id="o-que-vestir" className="bg-foam px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Para cada evento" title="O que vestir" />

        <p className="mx-auto mt-6 max-w-lg text-center text-ink/80">
          {dressCode.note}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {schedule.map((item) => (
            <div
              key={item.day}
              className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-sand-dark bg-sand/30 px-6 text-center"
            >
              <span className="font-display text-2xl italic text-ocean-deep">
                {item.label}
              </span>
              <span className="text-xs uppercase tracking-wide text-ink/50">
                Ilustração em breve
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink/50">
          <a
            href={dressCode.issueUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ocean/40 underline-offset-4 hover:text-ocean-deep"
          >
            acompanhar
          </a>
        </p>
      </div>
    </section>
  );
}
