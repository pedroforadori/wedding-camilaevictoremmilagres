import { getRedis } from "./redis";

const RSVP_KEY = "site:rsvps";

export type RsvpGuest = { fullName: string; isPlusOne: boolean };
export type RsvpEntry = {
  guests: RsvpGuest[];
  phone: string;
  events: string[];
  submittedAt: string;
};

export async function saveRsvp(entry: RsvpEntry): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  await redis.rpush(RSVP_KEY, JSON.stringify(entry));
  return true;
}

export async function listRsvps(): Promise<RsvpEntry[]> {
  const redis = getRedis();
  if (!redis) return [];

  const raw = await redis.lrange<RsvpEntry | string>(RSVP_KEY, 0, -1);
  return raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item));
}
