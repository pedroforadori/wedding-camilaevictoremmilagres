import { getRedis } from "./redis";

const RSVP_KEY = "site:rsvps";
// Telefones (só dígitos) que já confirmaram — um telefone vale por um RSVP,
// que já inclui os acompanhantes. O SADD garante isso mesmo com dois envios
// simultâneos.
const RSVP_PHONES_KEY = "site:rsvp-phones";

export type RsvpGuest = { fullName: string; isPlusOne: boolean };
export type RsvpEntry = {
  guests: RsvpGuest[];
  phone: string;
  events: string[];
  submittedAt: string;
};

/** "(11) 98102-4517", "11981024517" e "+55 11 98102-4517" viram o mesmo número. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length > 11 && digits.startsWith("55") ? digits.slice(2) : digits;
}

export type SaveRsvpResult = "ok" | "duplicate-phone" | "unavailable";

export async function saveRsvp(entry: RsvpEntry): Promise<SaveRsvpResult> {
  const redis = getRedis();
  if (!redis) return "unavailable";

  const phone = normalizePhone(entry.phone);
  const added = await redis.sadd(RSVP_PHONES_KEY, phone);
  if (added === 0) return "duplicate-phone";

  // RSVPs gravados antes do controle por telefone não estão no set.
  const existing = await listRsvps();
  if (existing.some((rsvp) => normalizePhone(rsvp.phone) === phone)) {
    return "duplicate-phone";
  }

  await redis.rpush(RSVP_KEY, JSON.stringify(entry));
  return "ok";
}

export async function listRsvps(): Promise<RsvpEntry[]> {
  const redis = getRedis();
  if (!redis) return [];

  const raw = await redis.lrange<RsvpEntry | string>(RSVP_KEY, 0, -1);
  return raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item));
}
