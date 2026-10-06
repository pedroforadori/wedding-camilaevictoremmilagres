import type { Metadata } from "next";
import { GiftResultCard, GiftSummary } from "@/components/GiftResultCard";
import { formatBRL } from "@/lib/currency";
import { getGiftOrder, markGiftOrderPaid } from "@/lib/giftOrderStore";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obrigado pelo presente",
  robots: { index: false, follow: false },
};

// Retorno do Stripe Checkout. Confirma o pedido consultando a sessão no
// próprio Stripe (o session_id da URL sozinho não prova nada); o webhook
// /api/stripe/webhook faz o mesmo para quem não volta para o site.
export default async function PresenteObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ pedido?: string; session_id?: string }>;
}) {
  const { pedido, session_id: sessionId } = await searchParams;
  let order = pedido ? await getGiftOrder(pedido).catch(() => null) : null;

  const stripe = getStripe();
  if (order && order.status !== "pago" && stripe && sessionId === order.stripeSessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      order = await markGiftOrderPaid(order.id);
    }
  }

  return (
    <GiftResultCard eyebrow="Presente recebido" title="Muito obrigado!">
      <p className="mt-6 text-sm text-ink/70">
        Seu carinho vai viajar com a gente. Mal podemos esperar para
        celebrar juntos!
      </p>
      {order && (
        <GiftSummary
          title={order.giftTitle}
          amount={formatBRL(order.amountCents)}
          guestName={order.guestName}
          guestMessage={order.guestMessage}
        />
      )}
      {order && order.status !== "pago" && (
        <p className="mt-4 text-xs text-ink/50">
          O pagamento ainda está sendo processado. Assim que for aprovado, o
          presente aparece confirmado para os noivos.
        </p>
      )}
    </GiftResultCard>
  );
}
