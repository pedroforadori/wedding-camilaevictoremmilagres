import type Stripe from "stripe";
import { markGiftOrderPaid } from "@/lib/giftOrderStore";
import { getStripe } from "@/lib/stripe";

// Confirma o presente no Redis quando o Stripe avisa que o pagamento caiu.
// A página /presentes/obrigado também confirma ao voltar do checkout; o
// webhook cobre quem fecha a aba antes do redirect e pagamentos assíncronos.
// Configurar no painel do Stripe: endpoint /api/stripe/webhook com os eventos
// checkout.session.completed e checkout.session.async_payment_succeeded.
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return Response.json({ error: "Stripe não configurado." }, { status: 503 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      request.headers.get("stripe-signature") ?? "",
      secret,
    );
  } catch {
    return Response.json({ error: "Assinatura inválida." }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (orderId && session.payment_status === "paid") {
      await markGiftOrderPaid(orderId);
    }
  }

  return Response.json({ received: true });
}
