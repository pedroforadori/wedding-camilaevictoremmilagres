import Image from "next/image";
import { Monogram } from "./Monogram";
import { WatercolorWaves } from "./WatercolorWaves";
import { wedding } from "@/content/wedding";

// Composição no formato do save-the-date enviado pelos noivos: aquarela da
// praia no topo, sangrando para uma seção em papel com o monograma, o nome
// em cursiva e a data/local.
export function Hero() {
  return (
    <section id="topo" className="relative scroll-mt-24">
      <div className="relative h-[48vh] min-h-[320px] sm:h-[60vh]">
        <Image
          src="/images/aquarela-praia.jpg"
          alt="Aquarela do litoral de São Miguel dos Milagres, com coqueiros e mar azul"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <WatercolorWaves id="hero-waves" className="h-12 w-full sm:h-20" />

      <div className="texture-paper relative bg-foam px-6 py-16 text-center">
        <div className="relative mx-auto flex max-w-md flex-col items-center">
          <Monogram className="h-24 w-auto sm:h-28" />

          <h1 className="mt-6 font-script text-5xl text-ocean-deep sm:text-7xl">
            Camila e Victor
          </h1>

          <p className="mt-8 font-display text-lg tracking-wide text-ink/80 [font-variant:small-caps] sm:text-xl">
            {wedding.dateRangeLabel}
          </p>
          <p className="mt-2 font-display text-sm tracking-[0.15em] text-ink/60 [font-variant:small-caps] sm:text-base">
            {wedding.cityStateLabel}
          </p>

          <a
            href="#convite"
            className="mt-10 rounded-full border border-ocean-deep/40 px-6 py-2 text-sm tracking-wide text-ocean-deep transition-colors hover:bg-ocean-deep hover:text-foam"
          >
            Ler o convite
          </a>
        </div>
      </div>
    </section>
  );
}
