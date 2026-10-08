import Image from "next/image";
import Link from "next/link";
import { SquiggleCorner } from "./SquiggleCorner";
import { dicas } from "@/content/wedding";

export function DicasSection() {
  return (
    <section
      id="dicas"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl text-gold">
          {dicas.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-balance text-ink/80">{dicas.intro}</p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl text-center">
        <h3 className="font-display text-2xl text-gold">
          {dicas.guideTitle}
        </h3>
        <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-deep">
          {dicas.warning}
        </p>
        <div className="mt-4 space-y-1 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-deep">
          {dicas.transfer.paragraphs.map((paragraph) => {
            const [before, after] = paragraph.split(dicas.transfer.highlight);
            return (
              <p key={paragraph}>
                {after === undefined ? (
                  paragraph
                ) : (
                  <>
                    {before}
                    <strong className="font-semibold">{dicas.transfer.highlight}</strong>
                    {after}
                  </>
                )}
              </p>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
        {dicas.sections.map((section) => (
          <Link
            key={section.key}
            href={`/dicas/${section.key}`}
            className="group relative isolate flex aspect-[4/5] flex-col items-center justify-center gap-4 border border-gold/25 bg-white p-6 text-center shadow-[0_1px_24px_-12px_rgba(127,97,57,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <SquiggleCorner className="pointer-events-none absolute -z-10 right-2 top-2 h-[42%] w-[42%] text-terracotta/70 transition-colors duration-300 group-hover:text-terracotta" />
            <SquiggleCorner className="pointer-events-none absolute -z-10 bottom-2 left-2 h-[42%] w-[42%] rotate-180 text-terracotta/70 transition-colors duration-300 group-hover:text-terracotta" />
            <Image
              src={section.icon.src}
              alt=""
              aria-hidden="true"
              width={section.icon.width}
              height={section.icon.height}
              className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-body text-sm uppercase tracking-[0.15em] text-taupe group-hover:underline">
              {section.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
