import Link from "next/link";
import type { ReactNode } from "react";

// Moldura comum das páginas de retorno da lista de presentes (Pix, obrigado,
// checkout simulado).
export function GiftResultCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-sand-dark/60 bg-foam px-6 py-10 text-center shadow-sm sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl text-gold">{title}</h1>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-16 bg-sand-dark" />
        {children}
        <Link
          href="/presentes"
          className="mt-8 inline-block text-sm text-gold-deep underline decoration-gold/40 underline-offset-4 hover:text-gold"
        >
          ← Voltar para a lista de presentes
        </Link>
      </div>
    </section>
  );
}

export function GiftSummary({
  title,
  amount,
  guestName,
  guestMessage,
}: {
  title: string;
  amount: string;
  guestName?: string;
  guestMessage?: string | null;
}) {
  return (
    <div className="mt-6 rounded-xl border border-sand-dark/60 bg-sand/30 px-5 py-4 text-left">
      <p className="text-ink">{title}</p>
      <p className="text-sm text-gold-deep">{amount}</p>
      {guestName && <p className="mt-3 text-sm text-ink/70">De: {guestName}</p>}
      {guestMessage && (
        <p className="mt-1 text-sm italic text-ink/60">&ldquo;{guestMessage}&rdquo;</p>
      )}
    </div>
  );
}
