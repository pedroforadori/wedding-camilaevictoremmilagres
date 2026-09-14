import Link from "next/link";
import type { ScheduleDay } from "@/content/wedding";
import { DressCodeIllustration } from "@/components/DressCodeIllustration";

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
        className="underline decoration-ocean/40 underline-offset-4 hover:text-ocean"
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
      <p className="font-body text-xs uppercase tracking-[0.3em] text-ocean">
        {day.date}
      </p>
      <h3 className="mt-2 font-display text-3xl italic text-ocean-deep">
        {day.title}
      </h3>

      {day.description ? (
        <div className="mt-6 space-y-3 text-sm text-ink/80">
          {day.description.map((paragraph) => (
            <p key={paragraph}>{renderDescriptionParagraph(paragraph)}</p>
          ))}
        </div>
      ) : (
        <dl className="mt-6 grid gap-3 text-sm text-ink/80 sm:grid-cols-2">
          {day.time && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Horário
              </dt>
              <dd className="mt-1">{day.time}</dd>
            </div>
          )}
          {day.venue && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Local
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
          {day.dressCode && (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Traje
              </dt>
              <dd className="mt-1">{day.dressCode}</dd>
              {day.dressNotes?.map((note) => (
                <p key={note} className="mt-1 text-ink/60">
                  {note}
                </p>
              ))}
            </div>
          )}
        </dl>
      )}

      {day.day !== 2 && (
        <DressCodeIllustration day={day.day as 1 | 3} />
      )}
    </div>
  );
}
