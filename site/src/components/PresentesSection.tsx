import Link from "next/link";
import { carouselGifts } from "@/content/giftList";
import { presentes } from "@/content/wedding";
import { getTakenQuotas } from "@/lib/giftOrderStore";
import { getCardMode } from "@/lib/stripe";
import { DirectPixBlock } from "./DirectPixBlock";
import { GiftCarousel } from "./GiftCarousel";

// Na home só um carrossel com alguns presentes; a lista completa, com
// filtros por destino, fica em /presentes.
export async function PresentesSection() {
  const takenQuotas = await getTakenQuotas();

  return (
    <section
      id="presentes"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl text-gold">
          {presentes.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-balance text-ink/80">{presentes.intro}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <GiftCarousel gifts={carouselGifts(takenQuotas)} cardMode={getCardMode()} />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/presentes"
          className="inline-block rounded-full border border-gold-deep px-8 py-3 text-sm tracking-wide text-gold-deep transition-colors hover:bg-gold-deep hover:text-foam"
        >
          Ver lista completa
        </Link>
      </div>

      <DirectPixBlock />
    </section>
  );
}
