import { findGift, freeGift } from "@/content/giftList";
import {
  countTakenQuotas,
  listGiftOrders,
  saveGiftOrder,
  type GiftOrder,
} from "@/lib/giftOrderStore";
import { getCardMode, getStripe } from "@/lib/stripe";

type ResolvedGift = { id: string; title: string; amountCents: number; image?: string };

// O valor nunca vem do client para os presentes da lista — é relido do
// conteúdo no servidor. Só a cota livre aceita valor, dentro da faixa da
// planilha (R$ 200 a R$ 2.000).
function resolveGift(giftId: string, amountCents: unknown): ResolvedGift | string {
  if (giftId === freeGift.id) {
    const amount = Number(amountCents);
    if (
      !Number.isInteger(amount) ||
      amount < freeGift.minCents ||
      amount > freeGift.maxCents
    ) {
      return "Escolha um valor entre R$ 200 e R$ 2.000.";
    }
    return { id: freeGift.id, title: freeGift.title, amountCents: amount };
  }

  const gift = findGift(giftId);
  if (!gift) return "Presente não encontrado.";
  return {
    id: gift.id,
    title: gift.title,
    amountCents: gift.priceCents,
    image: gift.image,
  };
}

async function hasQuotaLeft(giftId: string): Promise<boolean> {
  const gift = findGift(giftId);
  if (!gift) return true;
  const taken = countTakenQuotas(await listGiftOrders())[giftId] ?? 0;
  return taken < gift.quantity;
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

  const gift = resolveGift(giftId, body?.amountCents);
  if (typeof gift === "string") {
    return Response.json({ error: gift }, { status: 400 });
  }

  if (!(await hasQuotaLeft(gift.id))) {
    return Response.json(
      { error: "Todas as cotas desse presente já foram escolhidas. Que tal outro?" },
      { status: 409 },
    );
  }

  const order: GiftOrder = {
    id: crypto.randomUUID(),
    giftId: gift.id,
    giftTitle: gift.title,
    guestName,
    guestMessage: guestMessage || null,
    amountCents: gift.amountCents,
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
        valor: String(gift.amountCents),
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
            unit_amount: gift.amountCents,
            product_data: {
              name: gift.title,
              images: gift.image ? [`${origin}${gift.image}`] : undefined,
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
