import Image from "next/image";
import { Monogram } from "./Monogram";
import { WatercolorWaves } from "./WatercolorWaves";
import { wedding } from "@/content/wedding";

// Grão de filme gerado por SVG, para a foto ganhar o ar analógico da capa
// do site antigo (iCasei).
const filmGrain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Composição no formato do save-the-date enviado pelos noivos: foto do casal
// no topo, sangrando para uma seção em papel com o monograma, o nome
// em cursiva e a data/local.
//
// O enquadramento da foto segue a capa do site antigo: altura proporcional à
// largura (76,25vw no celular, 64,06vw a partir do tablet, até a altura da
// tela), foto centralizada em "cover", um véu de luz quente, grão de filme e
// um esfumado cor de papel no topo emendando com o header.
export function Hero() {
  return (
    <section id="topo" className="relative scroll-mt-24">
      <div className="relative h-[76.25vw] max-h-screen overflow-hidden md:h-[64.06vw]">
        <Image
          src="/images/hero-casal.jpg"
          alt="Camila e Victor abraçados de costas, em frente a coqueirais e à capela de São Miguel dos Milagres"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(160deg, #f2a36b 0%, #b8864f 30%, #5a5130 60%, #1f1d16 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: filmGrain, backgroundSize: "300px 300px" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[20vw] bg-gradient-to-b from-foam via-foam/70 to-transparent"
        />
      </div>

      <WatercolorWaves id="hero-waves" className="h-12 w-full sm:h-20" />

      <div className="texture-paper relative bg-foam px-6 py-16 text-center">
        <div className="relative mx-auto flex max-w-md flex-col items-center">
          <Monogram className="h-24 w-auto sm:h-28" />

          <h1 className="mt-6 font-script text-6xl text-gold sm:text-8xl">
            Camila e Victor
          </h1>

          <p className="mt-8 font-display text-lg tracking-wide text-ink/80 [font-variant:small-caps] sm:text-xl">
            {wedding.dateRangeLabel}
          </p>
          <p className="mt-2 font-display text-sm tracking-[0.15em] text-ink/60 [font-variant:small-caps] sm:text-base">
            {wedding.cityStateLabel}
          </p>

          {/* <a
            href="#convite"
            className="mt-10 rounded-full border border-gold-deep/40 px-6 py-2 text-sm tracking-wide text-gold-deep transition-colors hover:bg-gold-deep hover:text-foam"
          >
            Ler o convite
          </a> */}
        </div>
      </div>
    </section>
  );
}
