import Image from "next/image";
import { giftDestinations, type Gift } from "@/content/giftList";
import { formatBRL } from "@/lib/currency";

// Card de um presente, usado no carrossel da home (GiftCarousel) e na lista
// completa de /presentes (GiftList).
export function GiftCard({
  gift,
  taken,
  onSelect,
  className = "",
}: {
  gift: Gift;
  taken: number;
  onSelect: () => void;
  className?: string;
}) {
  const left = Math.max(gift.quantity - taken, 0);
  const soldOut = left === 0;

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
          className={`object-cover ${soldOut ? "grayscale" : ""}`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-foam/90 px-3 py-1 text-[0.65rem] uppercase tracking-wide text-gold-deep">
          {giftDestinations[gift.destination]}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="font-display text-lg leading-snug text-gold">{gift.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink/70">{gift.description}</p>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <p className="text-lg text-ink">{formatBRL(gift.priceCents)}</p>
          <p className="text-xs text-ink/50">
            {soldOut
              ? "Esgotado"
              : `${left} de ${gift.quantity} ${gift.quantity === 1 ? "cota" : "cotas"}`}
          </p>
        </div>
        <button
          type="button"
          disabled={soldOut}
          onClick={onSelect}
          className="mt-4 w-full rounded-full bg-gold-deep px-6 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {soldOut ? "Presenteado com carinho" : "Presentear"}
        </button>
      </div>
    </div>
  );
}
