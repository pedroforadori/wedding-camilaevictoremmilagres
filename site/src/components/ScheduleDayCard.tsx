import Link from "next/link";
import type { ScheduleDay } from "@/content/wedding";
import { DressCodeIllustration } from "@/components/DressCodeIllustration";
import { ScheduleDayIcon } from "@/components/ScheduleDayIcon";

const dicasLinkPattern = /\(ver nossas dicas\)/;

function renderDescriptionParagraph(paragraph: string) {
  const match = paragraph.match(dicasLinkPattern);
  if (!match) return paragraph;

  const [before, after] = paragraph.split(dicasLinkPattern);
  return (
    <>
      {before}
      (ver{" "}
      <Link
        href="/#dicas"
        className="underline decoration-gold/40 underline-offset-4 hover:text-gold"
      >
        nossas dicas
      </Link>
      ){after}
    </>
  );
}

export function ScheduleDayCard({ day }: { day: ScheduleDay }) {
  return (
    <div>
      <ScheduleDayIcon day={day.day as 1 | 2 | 3} />
      <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-gold">
        {day.date}
      </p>
      <h3 className="mt-2 font-display text-3xl text-gold">{day.title}</h3>

      {day.description && (
        <div className="mt-6 space-y-3 text-sm text-ink/80">
          {day.description.map((paragraph) => (
            <p key={paragraph}>{renderDescriptionParagraph(paragraph)}</p>
          ))}
        </div>
      )}

      <dl className="mt-6 grid gap-3 text-sm text-ink/80 sm:grid-cols-2">
        {day.time && (
          <div className={day.description ? "sm:col-span-2" : undefined}>
            <dt className="text-xs uppercase tracking-wide text-ink/50">
              Horário
            </dt>
            <dd className="mt-1">{day.time}</dd>
          </div>
        )}
        {day.venue && (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-ink/50">
              {day.venueLabel ?? "Local"}
            </dt>
            <dd className="mt-1">
              {day.venue}
              {day.location && (
                <>
                  <br />
                  {day.location}
                </>
              )}
            </dd>
          </div>
        )}
        {day.price && (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-ink/50">
              Valor
            </dt>
            <dd className="mt-1">{day.price}</dd>
          </div>
        )}
        {day.dressCode && (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-ink/50">
              Traje
            </dt>
            <dd className="mt-1">{day.dressCode}</dd>
            {day.dressNotes && (
              <div className="mt-4 space-y-2 text-ink/60">
                {day.dressNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </dl>

      {day.day !== 2 && (
        <DressCodeIllustration day={day.day as 1 | 3} />
      )}
      {day.illustrationNote && (
        <p className="mx-auto mt-4 max-w-xs text-center text-sm text-ink/60">
          {day.illustrationNote}
        </p>
      )}
    </div>
  );
}
