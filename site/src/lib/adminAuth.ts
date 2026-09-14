import { createHash, timingSafeEqual } from "node:crypto";

// Sessão simples de senha única para /admin-noivos — sem contas, sem banco de
// usuários. O cookie guarda um hash da senha (não a senha em si) e a proxy
// (src/proxy.ts) recalcula o mesmo hash a partir da env var para validar.
export const ADMIN_SESSION_COOKIE = "admin_noivos_session";

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

export function expectedSessionToken(): string | null {
  const password = process.env.ADMIN_NOIVOS_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export function isValidSession(cookieValue: string | undefined): boolean {
  const expected = expectedSessionToken();
  if (!expected || !cookieValue) return false;
  return timingSafeStringEqual(cookieValue, expected);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_NOIVOS_PASSWORD;
  if (!expected || !password) return false;
  return timingSafeStringEqual(password, expected);
}
