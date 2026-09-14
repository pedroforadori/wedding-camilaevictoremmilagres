"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  checkPassword,
  expectedSessionToken,
} from "@/lib/adminAuth";

export type LoginState = { error: string };

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    return { error: "Senha incorreta." };
  }

  const token = expectedSessionToken();
  if (!token) {
    return { error: "Senha de administrador não configurada no servidor." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin-noivos",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin-noivos");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin-noivos/login");
}
