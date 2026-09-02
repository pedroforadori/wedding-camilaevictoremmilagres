import { SectionHeading } from "./SectionHeading";
import { schedule, scheduleIssueUrl } from "@/content/wedding";

export function Schedule() {
  return (
    <section id="programacao" className="bg-sand/40 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="São Miguel dos Milagres"
          title="Programação"
        />

        <p className="mx-auto mt-6 max-w-lg text-center text-ink/80">
          Serão três dias de celebração, cada um pensado com carinho para ser
          especial e inesquecível.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {schedule.map((item) => (
            <div
              key={item.day}
              className="flex flex-col items-center rounded-2xl border border-sand-dark/60 bg-foam px-6 py-8 text-center shadow-sm"
            >
              <span className="font-display text-3xl italic text-ocean-deep">
                {item.label}
              </span>
              <span className="mt-4 rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-wide text-ocean-deep">
                Em breve
              </span>
              <p className="mt-4 text-sm text-ink/70">{item.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink/50">
          Horários e atividades de cada dia entram aqui assim que os noivos
          confirmarem —{" "}
          <a
            href={scheduleIssueUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ocean/40 underline-offset-4 hover:text-ocean-deep"
          >
            acompanhar
          </a>
          .
        </p>
      </div>
    </section>
  );
}
