"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-sand-dark/60 bg-foam px-4 py-3 text-ink outline-none focus:border-ocean";

export function RsvpForm() {
  const [attending, setAttending] = useState<"sim" | "nao">("sim");
  const [guests, setGuests] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        phone: data.get("phone"),
        email: data.get("email"),
        attending,
        guests,
      }),
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
      setAttending("sim");
      setGuests(0);
    } else {
      const body = await res.json().catch(() => null);
      setErrorMessage(body?.error ?? "Não foi possível enviar. Tente novamente.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 rounded-2xl border border-sand-dark/60 bg-sand/30 px-8 py-10 text-center">
        <p className="font-display text-2xl italic text-ocean-deep">
          Presença confirmada!
        </p>
        <p className="mt-2 text-sm text-ink/70">
          Obrigado por fazer parte dessa história com a gente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5 text-left">
      <div>
        <label htmlFor="name" className="text-sm text-ink/70">
          Nome completo *
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>

      <div>
        <span className="text-sm text-ink/70">Você irá ao evento?</span>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-sm text-ink/80">
            <input
              type="radio"
              name="attending"
              checked={attending === "sim"}
              onChange={() => setAttending("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-sm text-ink/80">
            <input
              type="radio"
              name="attending"
              checked={attending === "nao"}
              onChange={() => setAttending("nao")}
            />
            Não
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm text-ink/70">
          Telefone *
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-ink/70">
          E-mail
        </label>
        <input id="email" name="email" type="email" className={inputClass} />
      </div>

      {attending === "sim" && (
        <div>
          <span className="text-sm text-ink/70">Quantos acompanhantes?</span>
          <div className="mt-2 flex items-center gap-4">
            <span className="text-sm text-ink/60">Adultos</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(0, g - 1))}
                aria-label="Diminuir"
                className="h-8 w-8 rounded-full border border-sand-dark/60 text-ocean-deep"
              >
                −
              </button>
              <span className="w-6 text-center">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                aria-label="Aumentar"
                className="h-8 w-8 rounded-full border border-sand-dark/60 text-ocean-deep"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-ocean-deep px-6 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Responder"}
      </button>
    </form>
  );
}
