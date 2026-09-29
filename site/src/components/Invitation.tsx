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
        className="font-medium text-gold-deep underline decoration-gold/40 underline-offset-4 hover:text-gold"
      >
        {handle}
      </a>
      {after}
    </p>
  );
}

// Losango dourado usado nos cantos da moldura e no divisor do título.
function Diamond({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute size-2 rotate-45 border border-gold/60 bg-foam ${className}`}
    />
  );
}

// Recado dos noivos como um cartão de papel sobre o mesmo fundo do
// save-the-date (Hero): moldura dupla em dourado fino, com losangos nos
// cantos, para destacar o texto sem escurecer a seção.
export function Invitation() {
  return (
    <section
      id="convite"
      className="texture-paper relative scroll-mt-24 bg-foam px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="relative mx-auto max-w-3xl border border-gold/40 bg-white/40 p-2 shadow-[0_1px_24px_-12px_rgba(127,97,57,0.35)] sm:p-3">
        <div className="relative border border-gold/25 px-6 py-10 sm:px-12 sm:py-14">
          <Diamond className="-left-1 -top-1" />
          <Diamond className="-right-1 -top-1" />
          <Diamond className="-bottom-1 -left-1" />
          <Diamond className="-bottom-1 -right-1" />

          <div className="space-y-3 text-center font-body text-sm leading-relaxed text-ink/90 sm:text-base">
            <p className="font-display text-xl text-gold">
              {invitation.heading}
            </p>
            <div
              aria-hidden
              className="mx-auto mb-5 flex max-w-[10rem] items-center gap-3"
            >
              <span className="h-px flex-1 bg-gold/40" />
              <span className="size-1.5 rotate-45 bg-gold/60" />
              <span className="h-px flex-1 bg-gold/40" />
            </div>
            {invitation.paragraphs.map((paragraph, index) =>
              renderParagraph(paragraph, index),
            )}
            <p className="whitespace-pre-line pt-3 font-script text-5xl text-gold-deep sm:text-6xl">
              {invitation.signature}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
