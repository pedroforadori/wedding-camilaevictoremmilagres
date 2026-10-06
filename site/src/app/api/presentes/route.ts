import { findGift } from "@/content/giftList";
import {
  countTakenQuotas,
  listGiftOrders,
  saveGiftOrder,
  type GiftOrder,
} from "@/lib/giftOrderStore";
import { getCardMode, getStripe } from "@/lib/stripe";

async function hasQuotaLeft(giftId: string, quantity: number): Promise<boolean> {
  const taken = countTakenQuotas(await listGiftOrders())[giftId] ?? 0;
  return taken < quantity;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const giftId = typeof body?.giftId === "string" ? body.giftId : "";
  const guestName = typeof body?.guestName === "string" ? body.guestName.trim() : "";
  const guestMessage =
    typeof body?.guestMessage === "string" ? body.guestMessage.trim().slice(0, 300) : "";
  const method = body?.method === "card" ? "card" : "pix";

  if (guestName.length < 3 || guestName.length > 120) {
    return Response.json({ error: "Informe seu nome completo." }, { status: 400 });
  }

  // O valor nunca vem do client — é relido do conteúdo no servidor.
  const gift = findGift(giftId);
  if (!gift) {
    return Response.json({ error: "Presente não encontrado." }, { status: 400 });
  }

  if (!(await hasQuotaLeft(gift.id, gift.quantity))) {
    return Response.json(
      { error: "Esse presente acabou de ser escolhido por outra pessoa. Que tal outro?" },
      { status: 409 },
    );
  }

  const order: GiftOrder = {
    id: crypto.randomUUID(),
    giftId: gift.id,
    giftTitle: gift.title,
    guestName,
    guestMessage: guestMessage || null,
    amountCents: gift.priceCents,
    method,
    status: "pendente",
    createdAt: new Date().toISOString(),
    paidAt: null,
    stripeSessionId: null,
  };

  if (method === "card") {
    const cardMode = getCardMode();
    if (cardMode === "off") {
      return Response.json({ error: "Pagamento com cartão em breve." }, { status: 503 });
    }
    const stripe = getStripe();
    if (!stripe) {
      const params = new URLSearchParams({
        presente: gift.title,
        valor: String(gift.priceCents),
        nome: guestName,
      });
      return Response.json({ url: `/presentes/checkout-simulado?${params}` });
    }

    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "pt-BR",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "brl",
            unit_amount: gift.priceCents,
            product_data: {
              name: gift.title,
              images: [`${origin}${gift.image}`],
            },
          },
        },
      ],
      client_reference_id: order.id,
      metadata: { orderId: order.id, giftId: gift.id, guestName },
      success_url: `${origin}/presentes/obrigado?pedido=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/presentes`,
    });

    order.stripeSessionId = session.id;
    if (!session.url || !(await saveGiftOrder(order))) {
      return Response.json({ error: "Pagamento indisponível." }, { status: 503 });
    }
    return Response.json({ url: session.url });
  }

  if (!(await saveGiftOrder(order))) {
    return Response.json({ error: "Pix indisponível no momento." }, { status: 503 });
  }
  return Response.json({ url: `/presentes/pix/${order.id}` });
}
