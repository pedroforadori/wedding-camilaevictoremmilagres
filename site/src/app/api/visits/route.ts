import { getRedis } from "@/lib/redis";

const COUNTER_KEY = "site:visits";

export async function POST() {
  const redis = getRedis();
  if (!redis) {
    return Response.json({ error: "Contador indisponível." }, { status: 503 });
  }

  const count = await redis.incr(COUNTER_KEY);
  return Response.json({ count });
}

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return Response.json({ error: "Contador indisponível." }, { status: 503 });
  }

  const count = (await redis.get<number>(COUNTER_KEY)) ?? 0;
  return Response.json({ count });
}
