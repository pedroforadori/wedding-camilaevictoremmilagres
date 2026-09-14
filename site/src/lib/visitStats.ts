import { getRedis } from "@/lib/redis";

export type VisitStats = {
  count: number;
  byDevice: { mobile: number; tablet: number; desktop: number };
  isMock: boolean;
};

// Números ilustrativos só para visualizar o layout do gráfico em ambientes
// sem as credenciais do Upstash Redis (localhost, ver src/lib/redis.ts).
const MOCK_STATS: VisitStats = {
  count: 128,
  byDevice: { mobile: 76, tablet: 14, desktop: 38 },
  isMock: true,
};

export async function getVisitStats(): Promise<VisitStats | null> {
  const redis = getRedis();
  if (!redis) {
    return process.env.NODE_ENV === "production" ? null : MOCK_STATS;
  }

  const [count, mobile, tablet, desktop] = await redis
    .pipeline()
    .get<number>("site:visits")
    .get<number>("site:visits:device:mobile")
    .get<number>("site:visits:device:tablet")
    .get<number>("site:visits:device:desktop")
    .exec<[number | null, number | null, number | null, number | null]>();

  return {
    count: count ?? 0,
    byDevice: { mobile: mobile ?? 0, tablet: tablet ?? 0, desktop: desktop ?? 0 },
    isMock: false,
  };
}
