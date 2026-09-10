import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { ScheduleDayCard } from "./ScheduleDayCard";
import { schedule } from "@/content/wedding";

export function Schedule() {
  const [firstDay] = schedule;

  return (
    <section id="programacao" className="bg-sand/40 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="São Miguel dos Milagres"
          title="Programação"
        />

        <p className="mx-auto mt-6 max-w-lg text-center text-ink/80">
          Serão três dias de celebração, cada um pensado com carinho para ser
          especial e inesquecível.
        </p>

        <div className="mt-12">
          <ScheduleDayCard day={firstDay} />
        </div>

        <p className="mt-8 text-center text-sm">
          <Link
            href="/programacao"
            className="text-ocean-deep underline decoration-ocean/40 underline-offset-4 hover:text-ocean"
          >
            Ver programação completa dos 3 dias
          </Link>
        </p>
      </div>
    </section>
  );
}
