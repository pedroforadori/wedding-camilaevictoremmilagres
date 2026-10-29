import { gifts } from "@/content/giftList";
import { formatBRL } from "@/lib/currency";
import { countTakenQuotas, listGiftOrders } from "@/lib/giftOrderStore";
import { getGiftQuantities } from "@/lib/giftQuantityStore";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { adjustGiftQuantity, confirmGiftOrder, removeGiftOrder } from "./actions";
import { RemoveOrderButton } from "./RemoveOrderButton";

export const dynamic = "force-dynamic";

export default async function AdminNoivosPresentesPage() {
  const [orders, quantities] = await Promise.all([listGiftOrders(), getGiftQuantities()]);
  const paid = orders.filter((order) => order.status === "pago");
  const pendingPix = orders.filter(
    (order) => order.status === "pendente" && order.method === "pix",
  );
  const paidTotal = paid.reduce((sum, order) => sum + order.amountCents, 0);
  const listTotal = gifts.reduce((sum, gift) => sum + gift.priceCents * quantities[gift.id], 0);
  const takenQuotas = countTakenQuotas(paid);
  // Pedidos de cartão que nunca voltaram pagos são checkouts abandonados.
  const visibleOrders = orders.filter(
    (order) => order.method === "pix" || order.status === "pago",
  );

  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AdminSubpageHeader title="Presentes" />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Recebido", value: formatBRL(paidTotal) },
            { label: "Presentes pagos", value: String(paid.length) },
            { label: "Pix aguardando", value: String(pendingPix.length) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-5"
            >
              <p className="text-xs uppercase tracking-wide text-gold-deep">{stat.label}</p>
              <p className="mt-2 font-display text-2xl text-gold">{stat.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink/50">
          Total da lista: {formatBRL(listTotal)}
        </p>

        <p className="mt-10 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-deep">
          Pix não confirma sozinho: confira o extrato e marque como recebido.
          Um Pix pendente segura a cota por 48h.
        </p>

        <div className="mt-6 space-y-4">
          {visibleOrders.length === 0 ? (
            <p className="text-sm text-ink/50">Nenhum presente recebido ainda.</p>
          ) : (
            visibleOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-sand-dark/60 bg-sand/30 px-6 py-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-ink/80">
                    {order.giftTitle} · <span className="text-gold-deep">{formatBRL(order.amountCents)}</span>
                  </p>
                  <p className="text-xs text-ink/50">
                    {new Date(order.createdAt).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                    })}
                  </p>
                </div>
                <p className="mt-2 text-sm text-ink/70">De: {order.guestName}</p>
                {order.guestMessage && (
                  <p className="mt-1 text-sm italic text-ink/60">&ldquo;{order.guestMessage}&rdquo;</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`text-xs uppercase tracking-wide ${
                      order.status === "pago" ? "text-taupe" : "text-terracotta"
                    }`}
                  >
                    {order.method === "pix" ? "Pix" : "Cartão"} ·{" "}
                    {order.status === "pago" ? "Pago" : "Aguardando"}
                  </span>
                  {order.status === "pendente" && (
                    <form action={confirmGiftOrder}>
                      <input type="hidden" name="id" value={order.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-gold-deep px-4 py-1.5 text-xs tracking-wide text-foam hover:opacity-90"
                      >
                        Marcar como recebido
                      </button>
                    </form>
                  )}
                  {order.method === "pix" && (
                    <RemoveOrderButton id={order.id} action={removeGiftOrder} />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <h2 className="mt-14 font-display text-2xl text-gold">Cotas por presente</h2>
        <ul className="mt-4 divide-y divide-sand-dark/30 text-sm">
          {gifts.map((gift) => {
            const taken = takenQuotas[gift.id] ?? 0;
            const quantity = quantities[gift.id];
            return (
              <li key={gift.id} className="flex items-center justify-between gap-4 py-2">
                <span className="text-ink/80">
                  {gift.title}
                  {quantity !== gift.quantity && (
                    <span className="ml-2 text-xs text-ink/40">(padrão: {gift.quantity})</span>
                  )}
                </span>
                <span className="flex shrink-0 items-center gap-2 text-ink/50">
                  <QuantityButton giftId={gift.id} delta={-1} disabled={quantity <= taken} />
                  <span className="min-w-12 text-center tabular-nums">
                    {taken}/{quantity}
                  </span>
                  <QuantityButton giftId={gift.id} delta={1} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function QuantityButton({
  giftId,
  delta,
  disabled = false,
}: {
  giftId: string;
  delta: 1 | -1;
  disabled?: boolean;
}) {
  return (
    <form action={adjustGiftQuantity}>
      <input type="hidden" name="id" value={giftId} />
      <input type="hidden" name="delta" value={delta} />
      <button
        type="submit"
        disabled={disabled}
        aria-label={delta === 1 ? "Adicionar uma cota" : "Remover uma cota"}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-deep text-gold-deep hover:bg-gold-deep hover:text-foam disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold-deep"
      >
        {delta === 1 ? "+" : "−"}
      </button>
    </form>
  );
}
