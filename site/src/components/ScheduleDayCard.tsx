import type { ScheduleDay } from "@/content/wedding";
import { DressCodeIllustration } from "@/components/DressCodeIllustration";

export function ScheduleDayCard({ day }: { day: ScheduleDay }) {
  return (
    <div className="rounded-2xl border border-sand-dark/60 bg-foam px-8 py-8 shadow-sm">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-ocean">
        {day.date}
      </p>
      <h3 className="mt-2 font-display text-3xl italic text-ocean-deep">
        {day.title}
      </h3>

      <dl className="mt-6 grid gap-3 text-sm text-ink/80 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-ink/50">Horário</dt>
          <dd className="mt-1">{day.time}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-ink/50">Local</dt>
          <dd className="mt-1">
            {day.venue}
            <br />
            {day.location}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wide text-ink/50">Traje</dt>
          <dd className="mt-1">{day.dressCode}</dd>
          {day.dressNotes.map((note) => (
            <p key={note} className="mt-1 text-ink/60">
              {note}
            </p>
          ))}
        </div>
      </dl>

      <DressCodeIllustration day={day.day as 1 | 2 | 3} />
    </div>
  );
}
