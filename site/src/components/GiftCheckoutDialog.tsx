"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { PublicGift } from "@/content/giftList";
import { formatBRL } from "@/lib/currency";
import type { CardMode } from "@/lib/stripe";

export type CheckoutTarget = PublicGift;

type Method = "pix" | "card";

const inputClass =
  "mt-1 w-full rounded-lg border border-sand-dark/60 bg-white/60 px-4 py-2.5 text-ink outline-none focus:border-gold";

// No mobile abre como "bottom sheet" (preso embaixo, largura total); a partir
// de sm vira um modal centralizado. Em vez de um seletor Pix/Cartão + botão
// de confirmar, a forma de pagamento é o próprio botão de envio — um clique a
// menos e sem dois botões "ativos" da mesma cor competindo.
export function GiftCheckoutDialog({
  target,
  cardMode,
  onClose,
}: {
  target: CheckoutTarget | null;
  cardMode: CardMode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [loadingMethod, setLoadingMethod] = useState<Method | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (target && !dialog.open) {
      setLoadingMethod(null);
      setErrorMessage("");
      dialog.showModal();
    } else if (!target && dialog.open) {
      dialog.close();
    }
  }, [target]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!target) return;

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const method: Method = submitter?.value === "card" ? "card" : "pix";

    setLoadingMethod(method);
    setErrorMessage("");

    const res = await fetch("/api/presentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        giftId: target.id,
        guestName,
        guestMessage,
        method,
      }),
    }).catch(() => null);
    const body = await res?.json().catch(() => null);

    if (res?.ok && body?.url) {
      window.location.href = body.url;
      return;
    }
    setErrorMessage(body?.error ?? "Não foi possível continuar. Tente novamente.");
    setLoadingMethod(null);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      className="mx-0 mb-0 mt-auto max-h-[92dvh] w-full max-w-none rounded-t-2xl border border-sand-dark/60 bg-foam p-0 text-ink shadow-xl backdrop:bg-ink/50 sm:m-auto sm:max-w-md sm:rounded-2xl"
    >
      {target && (
        <form onSubmit={handleSubmit} className="texture-paper px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image src={target.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-deep">
                Presentear
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug text-gold">
                {target.title}
              </h3>
              <p className="mt-0.5 text-ink">{formatBRL(target.priceCents)}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Fechar"
              className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gold-deep hover:bg-sand/40"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="gift-guest-name" className="text-sm text-ink/70">
                Seu nome *
              </label>
              <input
                id="gift-guest-name"
                type="text"
                required
                minLength={3}
                maxLength={120}
                autoComplete="name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="gift-guest-message" className="text-sm text-ink/70">
                Mensagem para os noivos (opcional)
              </label>
              <textarea
                id="gift-guest-message"
                rows={2}
                maxLength={300}
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

          <div className="mt-6 space-y-3">
            <button
              type="submit"
              name="method"
              value="pix"
              disabled={loadingMethod !== null}
              className="w-full rounded-full bg-gold-deep px-6 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loadingMethod === "pix" ? "Gerando Pix…" : "Pagar com Pix"}
            </button>
            <button
              type="submit"
              name="method"
              value="card"
              disabled={loadingMethod !== null || cardMode === "off"}
              className="w-full rounded-full border border-gold-deep px-6 py-3 text-sm tracking-wide text-gold-deep transition-colors hover:bg-sand/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cardMode === "off"
                ? "Cartão de crédito (em breve)"
                : loadingMethod === "card"
                  ? "Redirecionando…"
                  : "Pagar com cartão de crédito"}
            </button>
            {cardMode === "simulado" && (
              <p className="text-center text-xs text-ink/50">
                Stripe ainda não configurado: o cartão abre um checkout de demonstração.
              </p>
            )}
          </div>
        </form>
      )}
    </dialog>
  );
}
