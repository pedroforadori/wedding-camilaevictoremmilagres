import { getRedis } from "./redis";

// Mural de recados no Redis, como RSVP e presentes — antes gravava em
// data/guestbook.jsonl, o que falhava na Vercel (sistema de arquivos só leitura).
const GUESTBOOK_KEY = "site:guestbook";

export type GuestbookEntry = {
  name: string;
  message: string;
  email: string | null;
  submittedAt: string;
};

export async function saveGuestbookEntry(entry: GuestbookEntry): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  await redis.rpush(GUESTBOOK_KEY, JSON.stringify(entry));
  return true;
}

export async function listGuestbookEntries(): Promise<GuestbookEntry[]> {
  const redis = getRedis();
  if (!redis) return [];

  const raw = await redis.lrange<GuestbookEntry | string>(GUESTBOOK_KEY, 0, -1);
  return raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item));
}
