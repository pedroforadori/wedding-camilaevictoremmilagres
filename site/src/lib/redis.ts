import { Redis } from "@upstash/redis";

// Requer a integração "Upstash for Redis" conectada ao projeto na Vercel, que
// injeta KV_REST_API_URL / KV_REST_API_TOKEN. Ausentes localmente até o dev
// rodar `vercel env pull` — nesse caso o cliente fica indisponível e quem
// chamar deve tratar o erro (ver /api/visits).
export function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}
