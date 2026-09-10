import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ScheduleDayCard } from "@/components/ScheduleDayCard";
import { PendingNote } from "@/components/PendingNote";
import { schedule, dressCodeArt } from "@/content/wedding";

export const metadata: Metadata = { title: "Programação | Camila & Victor" };

export default function ProgramacaoPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="São Miguel dos Milagres" title="Programação" />

        <p className="mx-auto mt-6 max-w-lg text-center text-ink/80">
          Serão três dias de celebração, cada um pensado com carinho para ser
          especial e inesquecível.
        </p>

        <div className="mt-12 space-y-8">
          {schedule.map((day) => (
            <ScheduleDayCard key={day.day} day={day} />
          ))}
        </div>

        <PendingNote note={dressCodeArt.note} issueUrl={dressCodeArt.issueUrl} />
      </div>
    </section>
  );
}
