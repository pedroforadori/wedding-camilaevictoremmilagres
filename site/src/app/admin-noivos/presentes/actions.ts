"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/adminAuth";
import { findGift } from "@/content/giftList";
import {
  countTakenQuotas,
  deleteGiftOrder,
  listGiftOrders,
  markGiftOrderPaid,
} from "@/lib/giftOrderStore";
import { getGiftQuantities, setGiftQuantity } from "@/lib/giftQuantityStore";

// Server Actions são alcançáveis por POST direto, então a sessão é revalidada
// aqui mesmo além da proxy (src/proxy.ts).
async function assertAdmin() {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    throw new Error("Não autorizado.");
  }
}

export async function confirmGiftOrder(formData: FormData) {
  await assertAdmin();
  await markGiftOrderPaid(String(formData.get("id") ?? ""));
  revalidatePath("/admin-noivos/presentes");
}

export async function removeGiftOrder(formData: FormData) {
  await assertAdmin();
  await deleteGiftOrder(String(formData.get("id") ?? ""));
  revalidatePath("/admin-noivos/presentes");
}

// +1/−1 cota. Não desce abaixo das cotas já usadas (pagas + Pix pendentes),
// senão um presente já dado ficaria com mais pedidos que cotas.
export async function adjustGiftQuantity(formData: FormData) {
  await assertAdmin();
  const gift = findGift(String(formData.get("id") ?? ""));
  const delta = Number(formData.get("delta")) === -1 ? -1 : 1;
  if (!gift) return;

  const [orders, quantities] = await Promise.all([listGiftOrders(), getGiftQuantities()]);
  const taken = countTakenQuotas(orders)[gift.id] ?? 0;
  const next = Math.max(taken, quantities[gift.id] + delta, 0);
  if (next === quantities[gift.id]) return;

  await setGiftQuantity(gift.id, next);
  revalidatePath("/admin-noivos/presentes");
  revalidatePath("/");
  revalidatePath("/presentes");
}
