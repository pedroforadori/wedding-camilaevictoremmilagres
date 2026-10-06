"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/adminAuth";
import { deleteGiftOrder, markGiftOrderPaid } from "@/lib/giftOrderStore";

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
