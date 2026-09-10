import Image from "next/image";
import { couple, wedding } from "@/content/wedding";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-16 text-center"
    >
      <Image
        src="/images/hero-casal.jpg"
        alt="Camila e Victor abraçados de costas, em frente a coqueirais e à capela de São Miguel dos Milagres"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink/60" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-foam/90">
          Nós vamos nos casar
        </p>

        <h1 className="mt-4 font-display text-5xl font-medium italic text-foam sm:text-7xl">
          {couple.names}
        </h1>

        <p className="mt-6 max-w-md text-balance font-body text-base text-foam/90">
          Três dias de celebração à beira-mar em {wedding.city}, {wedding.state}.
        </p>

        <a
          href="#convite"
          className="mt-10 rounded-full border border-foam/60 px-6 py-2 text-sm tracking-wide text-foam transition-colors hover:bg-foam hover:text-ocean-deep"
        >
          Ler o convite
        </a>
      </div>
    </section>
  );
}
