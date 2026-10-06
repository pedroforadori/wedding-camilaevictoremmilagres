import Image from "next/image";
import type { PublicGift } from "@/content/giftList";
import { formatBRL } from "@/lib/currency";

// Card de um presente, usado no carrossel da home (GiftCarousel) e na lista
// completa de /presentes (GiftList). Só presentes com cota chegam aqui.
export function GiftCard({
  gift,
  onSelect,
  className = "",
}: {
  gift: PublicGift;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-sand-dark/60 bg-foam text-left shadow-sm ${className}`}
    >
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={gift.image}
          alt={gift.title}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 85vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="flex-1 font-display text-lg leading-snug text-gold">{gift.title}</h3>
        <p className="mt-4 text-lg text-ink">{formatBRL(gift.priceCents)}</p>
        <button
          type="button"
          onClick={onSelect}
          className="mt-4 w-full rounded-full bg-gold-deep px-6 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90"
        >
          Presentear
        </button>
      </div>
    </div>
  );
}
