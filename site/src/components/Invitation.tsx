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
    <section
      id="convite"
      className="texture-linen relative scroll-mt-24 bg-foam px-6 py-16"
    >
      <div className="relative mx-auto max-w-2xl">
        <div className="space-y-3 text-center font-body text-sm leading-relaxed text-ink/90 sm:text-base">
          <p className="font-display text-xl italic text-ocean-deep">
            {invitation.heading}
          </p>
          {invitation.paragraphs.map((paragraph, index) =>
            renderParagraph(paragraph, index),
          )}
          <p className="whitespace-pre-line pt-3 font-script text-2xl text-ocean-deep">
            {invitation.signature}
          </p>
        </div>
      </div>
    </section>
  );
}
