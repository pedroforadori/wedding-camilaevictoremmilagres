// Gerador do payload EMV "Pix Copia e Cola" (BR Code), seguindo o manual de
// padrões para iniciação do Pix do Banco Central — sem gateway e sem
// dependências: o código é montado a partir da chave Pix dos noivos.
//
// O CRC-16/CCITT-FALSE foi validado contra os dois QR Codes reais enviados
// pelos noivos (out/2026): o algoritmo reproduz exatamente os CRCs "3DC7"
// (chave aleatória) e "BAEE" (chave e-mail) dos payloads originais.

function tlv(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

// O padrão exige ASCII simples em caixa alta para nome e cidade do recebedor.
function sanitizePixText(input: string, maxLength: number): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .toUpperCase()
    .trim()
    .slice(0, maxLength);
}

function sanitizeTxid(input: string): string {
  const cleaned = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return (cleaned || "***").slice(0, 25);
}

export function crc16ccitt(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export type PixPayloadInput = {
  key: string;
  merchantName: string;
  merchantCity: string;
  /** Centavos. Sem valor, quem paga digita o valor no app do banco. */
  amountCents?: number;
  /** Identificador exibido no extrato dos noivos (até 25 caracteres). */
  txid?: string;
};

export function buildPixPayload(input: PixPayloadInput): string {
  const merchantAccount = tlv("00", "br.gov.bcb.pix") + tlv("01", input.key);
  const amount =
    input.amountCents && input.amountCents > 0
      ? tlv("54", (input.amountCents / 100).toFixed(2))
      : "";

  const payloadNoCrc =
    tlv("00", "01") +
    tlv("26", merchantAccount) +
    tlv("52", "0000") +
    tlv("53", "986") +
    amount +
    tlv("58", "BR") +
    tlv("59", sanitizePixText(input.merchantName, 25)) +
    tlv("60", sanitizePixText(input.merchantCity, 15)) +
    tlv("62", tlv("05", sanitizeTxid(input.txid ?? ""))) +
    "6304";

  return payloadNoCrc + crc16ccitt(payloadNoCrc);
}
