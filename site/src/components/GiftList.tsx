"use client";

import { useState } from "react";
import type { PublicGift } from "@/content/giftList";
import type { CardMode } from "@/lib/stripe";
import { GiftCard } from "./GiftCard";
import { GiftCheckoutDialog, type CheckoutTarget } from "./GiftCheckoutDialog";

export function GiftList({
  gifts,
  cardMode,
}: {
  gifts: PublicGift[];
  cardMode: CardMode;
}) {
  const [target, setTarget] = useState<CheckoutTarget | null>(null);

  if (gifts.length === 0) {
    return (
      <p className="text-center text-ink/70">
        Todos os presentes já foram escolhidos. Muito obrigado pelo carinho!
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map((gift) => (
          <li key={gift.id} className="flex">
            <GiftCard gift={gift} className="w-full" onSelect={() => setTarget(gift)} />
          </li>
        ))}
      </ul>

      <GiftCheckoutDialog
        target={target}
        cardMode={cardMode}
        onClose={() => setTarget(null)}
      />
    </>
  );
}
