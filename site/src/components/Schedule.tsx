import { SectionHeading } from "./SectionHeading";
import { ScheduleDayCard } from "./ScheduleDayCard";
import { schedule } from "@/content/wedding";

export function Schedule() {
  return (
    <section
      id="programacao"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="São Miguel dos Milagres"
          title="Programação"
        />

        <p className="mx-auto mt-6 max-w-lg text-center text-ink/80">
          Serão três dias de celebração, cada um pensado com carinho para ser
          especial e inesquecível.
        </p>

        <div className="mt-12 space-y-8">
          {schedule.map((day) => (
            <ScheduleDayCard key={day.day} day={day} />
          ))}
        </div>
      </div>
    </section>
  );
}
