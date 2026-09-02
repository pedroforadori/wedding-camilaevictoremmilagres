import { SectionHeading } from "./SectionHeading";
import { invitation, wedding } from "@/content/wedding";

function renderParagraph(text: string, key: number) {
  const handle = wedding.instagramHandle;
  if (!text.includes(handle)) {
    return (
      <p key={key} className="text-pretty">
        {text}
      </p>
    );
  }

  const [before, after] = text.split(handle);
  return (
    <p key={key} className="text-pretty">
      {before}
      <a
        href={wedding.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-ocean-deep underline decoration-ocean/40 underline-offset-4 hover:text-ocean"
      >
        {handle}
      </a>
      {after}
    </p>
  );
}

export function Invitation() {
  return (
    <section id="convite" className="bg-foam px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Um recado dos noivos" title="O convite" />

        <div className="mt-10 space-y-5 text-center font-body text-base leading-relaxed text-ink/90 sm:text-lg">
          <p className="font-display text-2xl italic text-ocean-deep">
            {invitation.heading}
          </p>
          {invitation.paragraphs.map((paragraph, index) =>
            renderParagraph(paragraph, index),
          )}
          <p className="whitespace-pre-line pt-4 font-script text-3xl text-ocean-deep">
            {invitation.signature}
          </p>
        </div>
      </div>
    </section>
  );
}
