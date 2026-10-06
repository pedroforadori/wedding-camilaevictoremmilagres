import type { Metadata } from "next";
import Link from "next/link";
import { DirectPixBlock } from "@/components/DirectPixBlock";
import { GiftList } from "@/components/GiftList";
import { presentes } from "@/content/wedding";
import { getTakenQuotas } from "@/lib/giftOrderStore";
import { getCardMode } from "@/lib/stripe";

// Lista completa de presentes. A home (#presentes) mostra só um carrossel
// com alguns deles e linka para cá. As cotas restantes vêm do Redis a cada
// request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lista de Presentes",
};

export default async function PresentesPage() {
  const takenQuotas = await getTakenQuotas();

  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Link
          href="/#presentes"
          className="text-sm text-gold-deep underline decoration-gold/40 underline-offset-4 hover:text-gold"
        >
          ← Voltar ao início
        </Link>
        <h1 className="mt-6 font-display text-4xl text-gold">
          {presentes.title}
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-balance text-ink/80">{presentes.intro}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <GiftList takenQuotas={takenQuotas} cardMode={getCardMode()} />
      </div>

      <DirectPixBlock />
    </section>
  );
}
