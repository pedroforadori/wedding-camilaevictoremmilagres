"use client";

import { useRef, useState } from "react";
import type { PublicGift } from "@/content/giftList";
import type { CardMode } from "@/lib/stripe";
import { GiftCard } from "./GiftCard";
import { GiftCheckoutDialog, type CheckoutTarget } from "./GiftCheckoutDialog";

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Presentes anteriores" : "Próximos presentes"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand-dark/60 bg-foam text-gold-deep transition-colors hover:bg-sand/40 disabled:opacity-30 sm:flex"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path
          d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// Uma linha só, com rolagem horizontal (scroll-snap) entre os presentes em
// destaque (ver carouselGifts) — a lista completa fica em /presentes.
export function GiftCarousel({
  gifts,
  cardMode,
}: {
  gifts: PublicGift[];
  cardMode: CardMode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState<CheckoutTarget | null>(null);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  }

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.clientWidth + 24), behavior: "smooth" });
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <ArrowButton direction="prev" disabled={progress <= 0.01} onClick={() => scrollByCard(-1)} />
        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="-mx-6 flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {gifts.map((gift) => (
            <li key={gift.id} className="flex w-[80%] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)]">
              <GiftCard gift={gift} className="w-full" onSelect={() => setTarget(gift)} />
            </li>
          ))}
        </ul>
        <ArrowButton direction="next" disabled={progress >= 0.99} onClick={() => scrollByCard(1)} />
      </div>

      <div className="mx-auto mt-6 h-px w-40 bg-sand-dark/40" aria-hidden="true">
        <div
          className="h-px bg-gold-deep transition-[width] duration-150"
          style={{ width: `${Math.max(progress, 0.08) * 100}%` }}
        />
      </div>

      <GiftCheckoutDialog
        target={target}
        cardMode={cardMode}
        onClose={() => setTarget(null)}
      />
    </>
  );
}
