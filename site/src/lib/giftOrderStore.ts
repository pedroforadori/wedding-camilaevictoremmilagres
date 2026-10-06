import { getRedis } from "./redis";

const ORDERS_KEY = "site:gift-orders";

// Um Pix pendente "segura" a cota por esse tempo, para dois convidados não
// escolherem a última cota ao mesmo tempo. Depois disso, se os noivos não
// confirmaram o recebimento, a cota volta a aparecer como disponível.
const PENDING_PIX_HOLD_MS = 48 * 60 * 60 * 1000;

export type GiftOrder = {
  id: string;
  giftId: string;
  giftTitle: string;
  guestName: string;
  guestMessage: string | null;
  amountCents: number;
  method: "pix" | "card";
  status: "pendente" | "pago";
  createdAt: string;
  paidAt: string | null;
  stripeSessionId: string | null;
};

export async function saveGiftOrder(order: GiftOrder): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  await redis.hset(ORDERS_KEY, { [order.id]: order });
  return true;
}

export async function getGiftOrder(id: string): Promise<GiftOrder | null> {
  const redis = getRedis();
  if (!redis) return null;

  return redis.hget<GiftOrder>(ORDERS_KEY, id);
}

export async function listGiftOrders(): Promise<GiftOrder[]> {
  const redis = getRedis();
  if (!redis) return [];

  const all = await redis.hgetall<Record<string, GiftOrder>>(ORDERS_KEY);
  if (!all) return [];
  return Object.values(all).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Idempotente: um pedido já pago não é reescrito. */
export async function markGiftOrderPaid(id: string): Promise<GiftOrder | null> {
  const order = await getGiftOrder(id);
  if (!order) return null;
  if (order.status === "pago") return order;

  const updated: GiftOrder = {
    ...order,
    status: "pago",
    paidAt: new Date().toISOString(),
  };
  await saveGiftOrder(updated);
  return updated;
}

export async function deleteGiftOrder(id: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  await redis.hdel(ORDERS_KEY, id);
}

function holdsQuota(order: GiftOrder, now: number): boolean {
  if (order.status === "pago") return true;
  return (
    order.method === "pix" &&
    now - new Date(order.createdAt).getTime() < PENDING_PIX_HOLD_MS
  );
}

// Para as páginas públicas: sem Redis (ex.: rodando local sem `vercel env
// pull`), todas as cotas aparecem disponíveis em vez de derrubar a página.
export async function getTakenQuotas(): Promise<Record<string, number>> {
  const orders = await listGiftOrders().catch(() => []);
  return countTakenQuotas(orders);
}

/** Cotas já usadas por presente (pagas + Pix pendentes recentes). */
export function countTakenQuotas(orders: GiftOrder[]): Record<string, number> {
  const now = Date.now();
  const taken: Record<string, number> = {};
  for (const order of orders) {
    if (holdsQuota(order, now)) {
      taken[order.giftId] = (taken[order.giftId] ?? 0) + 1;
    }
  }
  return taken;
}
