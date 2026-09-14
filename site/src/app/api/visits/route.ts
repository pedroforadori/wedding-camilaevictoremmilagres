import { getRedis } from "@/lib/redis";

const COUNTER_KEY = "site:visits";
type DeviceType = "mobile" | "tablet" | "desktop";

function deviceKey(device: DeviceType) {
  return `site:visits:device:${device}`;
}

// Guardado só para consulta futura (ver /api/visits GET) — não exibido no
// rodapé ainda.
function classifyDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) {
    return Response.json({ error: "Contador indisponível." }, { status: 503 });
  }

  const device = classifyDevice(request.headers.get("user-agent") ?? "");
  const [count] = await redis
    .pipeline()
    .incr(COUNTER_KEY)
    .incr(deviceKey(device))
    .exec<[number, number]>();

  return Response.json({ count });
}

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return Response.json({ error: "Contador indisponível." }, { status: 503 });
  }

  const [count, mobile, tablet, desktop] = await redis
    .pipeline()
    .get<number>(COUNTER_KEY)
    .get<number>(deviceKey("mobile"))
    .get<number>(deviceKey("tablet"))
    .get<number>(deviceKey("desktop"))
    .exec<[number | null, number | null, number | null, number | null]>();

  return Response.json({
    count: count ?? 0,
    byDevice: { mobile: mobile ?? 0, tablet: tablet ?? 0, desktop: desktop ?? 0 },
  });
}
