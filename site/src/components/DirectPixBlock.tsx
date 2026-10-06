import { presentes } from "@/content/wedding";
import { giftPixCode, pixQrDataUrl } from "@/lib/giftPix";
import { CopyPixButton } from "./CopyPixButton";

// QR Code Pix sem valor, para quem prefere presentear direto na conta.
export async function DirectPixBlock() {
  const code = giftPixCode(undefined, "LISTANOIVOS");
  const qr = await pixQrDataUrl(code);

  return (
    <div className="mx-auto mt-20 max-w-sm text-center">
      <p className="text-balance text-ink/80">{presentes.qrIntro}</p>
      {/* eslint-disable-next-line @next/next/no-img-element -- data URL gerada no servidor */}
      <img
        src={qr}
        alt="QR Code Pix da conta dos noivos"
        width={240}
        height={240}
        className="mx-auto mt-6 h-60 w-60 rounded-xl border border-sand-dark bg-white p-3"
      />
      <CopyPixButton code={code} />
    </div>
  );
}
