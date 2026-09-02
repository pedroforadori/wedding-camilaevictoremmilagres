import { Monogram } from "./Monogram";
import { WatercolorWaves } from "./WatercolorWaves";
import { couple, wedding } from "@/content/wedding";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-16 text-center"
    >
      <WatercolorWaves className="pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full" />

      <div className="relative z-10 flex flex-col items-center">
        <Monogram className="mb-8 h-20 w-20" />

        <p className="font-body text-sm uppercase tracking-[0.3em] text-ocean-deep">
          Nós vamos nos casar
        </p>

        <h1 className="mt-4 font-display text-5xl font-medium italic text-ink sm:text-7xl">
          {couple.names}
        </h1>

        <p className="mt-6 max-w-md text-balance font-body text-base text-ink/80">
          Três dias de celebração à beira-mar em {wedding.city}, {wedding.state}.
        </p>

        <a
          href="#convite"
          className="mt-10 rounded-full border border-ocean-deep/40 px-6 py-2 text-sm tracking-wide text-ocean-deep transition-colors hover:bg-ocean-deep hover:text-foam"
        >
          Ler o convite
        </a>
      </div>
    </section>
  );
}
