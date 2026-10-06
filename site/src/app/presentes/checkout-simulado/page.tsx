import type { Metadata } from "next";
import { GiftResultCard, GiftSummary } from "@/components/GiftResultCard";
import { formatBRL } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Checkout simulado",
  robots: { index: false, follow: false },
};

// Usado enquanto a conta do Stripe dos noivos não existe (ver lib/stripe.ts).
// Nenhum pedido é gravado e nenhuma cobrança é feita.
export default async function CheckoutSimuladoPage({
  searchParams,
}: {
  searchParams: Promise<{ presente?: string; valor?: string; nome?: string }>;
}) {
  const { presente, valor, nome } = await searchParams;

  return (
    <GiftResultCard eyebrow="Modo de demonstração" title="Pagamento simulado">
      <p className="mt-6 text-sm text-ink/70">
        As chaves do Stripe ainda não foram configuradas, então este é um
        checkout de demonstração: nenhuma cobrança foi feita.
      </p>
      {presente && (
        <GiftSummary
          title={presente}
          amount={formatBRL(Number(valor) || 0)}
          guestName={nome}
        />
      )}
    </GiftResultCard>
  );
}
