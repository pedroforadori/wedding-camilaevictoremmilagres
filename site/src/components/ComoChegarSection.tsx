import Image from "next/image";
import Link from "next/link";
import { comoChegar } from "@/content/wedding";
import { renderTextWithContactLinks } from "@/lib/contact-links";

export function ComoChegarSection() {
  return (
    <section
      id="como-chegar"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl italic text-ocean-deep">
          {comoChegar.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-ink/80">{comoChegar.intro}</p>

        <div className="mt-8 space-y-4 text-left text-ink/80">
          {comoChegar.paragraphs.map((paragraph) => (
            <p key={paragraph}>{renderTextWithContactLinks(paragraph)}</p>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl shadow-md">
          <Image
            src="/images/mapa-como-chegar.jpg"
            alt="Mapa ilustrado da região de São Miguel dos Milagres, com a Casa Marceneiro (local do casamento), a Casa Orla Milagres (casa dos noivos), pousadas, restaurante e praias próximas"
            width={1690}
            height={1120}
            className="h-auto w-full"
          />
        </div>
        <Link
          href="/como-chegar/transporte"
          className="mt-4 inline-block text-sm text-ocean-deep underline decoration-ocean/40 underline-offset-2 hover:text-ocean"
        >
          Ver motoristas, transfer e farmácia
        </Link>
      </div>
    </section>
  );
}
