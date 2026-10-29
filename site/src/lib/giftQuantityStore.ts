import { gifts } from "@/content/giftList";
import { getRedis } from "./redis";

// Nº de cotas ajustado pelos noivos no admin. Só existe entrada para os
// presentes que já foram ajustados; os demais seguem o `quantity` de
// content/giftList.ts.
const QUANTITIES_KEY = "site:gift-quantities";

/** Cotas efetivas por presente: ajuste do admin ou, sem ele, o valor da planilha. */
export async function getGiftQuantities(): Promise<Record<string, number>> {
  const overrides = await (async () => {
    const redis = getRedis();
    if (!redis) return null;
    return redis.hgetall<Record<string, number>>(QUANTITIES_KEY);
  })().catch(() => null);

  const quantities: Record<string, number> = {};
  for (const gift of gifts) {
    const override = Number(overrides?.[gift.id]);
    quantities[gift.id] = Number.isInteger(override) && override >= 0 ? override : gift.quantity;
  }
  return quantities;
}

export async function setGiftQuantity(giftId: string, quantity: number): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis indisponível.");

  await redis.hset(QUANTITIES_KEY, { [giftId]: quantity });
}
