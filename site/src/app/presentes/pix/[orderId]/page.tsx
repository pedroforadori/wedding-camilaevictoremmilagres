import type { Metadata } from "next";
import { CopyPixButton } from "@/components/CopyPixButton";
import { GiftResultCard, GiftSummary } from "@/components/GiftResultCard";
import { formatBRL } from "@/lib/currency";
import { getGiftOrder } from "@/lib/giftOrderStore";
import { giftPixCode, pixQrDataUrl } from "@/lib/giftPix";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pagamento via Pix",
  robots: { index: false, follow: false },
};

export default async function PresentePixPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getGiftOrder(orderId).catch(() => null);

  if (!order || order.method !== "pix") {
    return (
      <GiftResultCard eyebrow="Pix" title="Pedido não encontrado">
        <p className="mt-6 text-sm text-ink/70">
          Não encontramos esse pedido. O link pode estar incorreto ou o pedido
          foi removido.
        </p>
      </GiftResultCard>
    );
  }

  // O txid identifica o presente no extrato dos noivos.
  const code = giftPixCode(order.amountCents, order.id);
  const qr = await pixQrDataUrl(code);

  return (
    <GiftResultCard eyebrow="Pagamento via Pix" title="Quase lá!">
      <p className="mt-6 text-sm text-ink/70">
        Escaneie o QR Code no app do seu banco ou copie o código abaixo. O
        valor já vem preenchido.
      </p>
      <GiftSummary
        title={order.giftTitle}
        amount={formatBRL(order.amountCents)}
        guestName={order.guestName}
        guestMessage={order.guestMessage}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- data URL gerada no servidor */}
      <img
        src={qr}
        alt="QR Code Pix do presente"
        width={256}
        height={256}
        className="mx-auto mt-6 h-64 w-64 rounded-xl border border-sand-dark bg-white p-3"
      />
      <CopyPixButton code={code} />
      <p className="mt-6 text-xs text-ink/50">
        {order.status === "pago"
          ? "Presente confirmado pelos noivos. Muito obrigado pelo carinho!"
          : "Assim que o Pix cair na conta, os noivos confirmam o seu presente. Muito obrigado pelo carinho!"}
      </p>
    </GiftResultCard>
  );
}
