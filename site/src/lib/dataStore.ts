import fs from "node:fs";
import path from "node:path";

// Mesma convenção do bot de captura do WhatsApp (bot/index.js): grava em
// data/ na raiz do monorepo, um nível acima do cwd do processo do site.
const DATA_DIR = path.join(process.cwd(), "..", "data");

function filePath(fileName: string) {
  return path.join(DATA_DIR, fileName);
}

export function appendJsonLine(fileName: string, entry: unknown) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.appendFileSync(filePath(fileName), `${JSON.stringify(entry)}\n`, "utf8");
}

export function readJsonLines<T>(fileName: string): T[] {
  const target = filePath(fileName);
  if (!fs.existsSync(target)) return [];
  return fs
    .readFileSync(target, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as T);
}
