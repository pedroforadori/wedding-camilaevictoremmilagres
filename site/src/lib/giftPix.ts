import QRCode from "qrcode";
import { presentes } from "@/content/wedding";
import { buildPixPayload } from "./pix";

/** Código "Pix Copia e Cola" com a chave dos noivos; sem valor quando omitido. */
export function giftPixCode(amountCents?: number, txid?: string): string {
  return buildPixPayload({ ...presentes.pix, amountCents, txid });
}

export function pixQrDataUrl(code: string): Promise<string> {
  return QRCode.toDataURL(code, { margin: 1, width: 480 });
}
