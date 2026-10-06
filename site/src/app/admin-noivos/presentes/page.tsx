import { gifts } from "@/content/giftList";
import { formatBRL } from "@/lib/currency";
import { countTakenQuotas, listGiftOrders } from "@/lib/giftOrderStore";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { confirmGiftOrder, removeGiftOrder } from "./actions";
import { RemoveOrderButton } from "./RemoveOrderButton";

export const dynamic = "force-dynamic";

export default async function AdminNoivosPresentesPage() {
  const orders = await listGiftOrders();
  const paid = orders.filter((order) => order.status === "pago");
  const pendingPix = orders.filter(
    (order) => order.status === "pendente" && order.method === "pix",
  );
  const paidTotal = paid.reduce((sum, order) => sum + order.amountCents, 0);
  const listTotal = gifts.reduce((sum, gift) => sum + gift.priceCents * gift.quantity, 0);
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
          {gifts.map((gift) => (
            <li key={gift.id} className="flex items-baseline justify-between gap-4 py-2">
              <span className="text-ink/80">{gift.title}</span>
              <span className="shrink-0 text-ink/50">
                {takenQuotas[gift.id] ?? 0}/{gift.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
