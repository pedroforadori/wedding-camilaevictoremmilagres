"use client";

import { useState } from "react";
import {
  freeGift,
  giftDestinations,
  gifts,
  type GiftDestination,
} from "@/content/giftList";
import { formatBRL } from "@/lib/currency";
import type { CardMode } from "@/lib/stripe";
import { GiftCard } from "./GiftCard";
import { GiftCheckoutDialog, type CheckoutTarget } from "./GiftCheckoutDialog";

const filters: { key: GiftDestination | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  ...(Object.entries(giftDestinations) as [GiftDestination, string][]).map(
    ([key, label]) => ({ key, label }),
  ),
];

export function GiftList({
  takenQuotas,
  cardMode,
}: {
  takenQuotas: Record<string, number>;
  cardMode: CardMode;
}) {
  const [filter, setFilter] = useState<GiftDestination | "todos">("todos");
  const [target, setTarget] = useState<CheckoutTarget | null>(null);

  const visibleGifts =
    filter === "todos" ? gifts : gifts.filter((gift) => gift.destination === filter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setFilter(option.key)}
            aria-pressed={filter === option.key}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition-colors ${
              filter === option.key
                ? "border-gold-deep bg-gold-deep text-foam"
                : "border-sand-dark/60 text-gold-deep hover:bg-sand/40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGifts.map((gift) => (
          <li key={gift.id} className="flex">
            <GiftCard
              gift={gift}
              taken={takenQuotas[gift.id] ?? 0}
              className="w-full"
              onSelect={() =>
                setTarget({ id: gift.id, title: gift.title, amountCents: gift.priceCents, image: gift.image })
              }
            />
          </li>
        ))}

        <li className="flex flex-col justify-center rounded-2xl border border-dashed border-gold/50 bg-sand/30 px-6 py-8 text-center">
          <p className="font-display text-2xl text-gold">{freeGift.title}</p>
          <span aria-hidden="true" className="mx-auto mt-3 block h-px w-12 bg-sand-dark" />
          <p className="mt-4 text-sm text-ink/70">{freeGift.description}</p>
          <p className="mt-2 text-xs text-ink/50">
            De {formatBRL(freeGift.minCents)} a {formatBRL(freeGift.maxCents)}
          </p>
          <button
            type="button"
            onClick={() =>
              setTarget({ id: freeGift.id, title: freeGift.title, amountCents: null })
            }
            className="mt-6 w-full rounded-full border border-gold-deep px-6 py-3 text-sm tracking-wide text-gold-deep transition-colors hover:bg-gold-deep hover:text-foam"
          >
            Escolher valor
          </button>
        </li>
      </ul>

      <GiftCheckoutDialog
        target={target}
        cardMode={cardMode}
        onClose={() => setTarget(null)}
      />
    </>
  );
}
