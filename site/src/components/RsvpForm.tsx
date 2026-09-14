"use client";

import { useState, type FormEvent } from "react";
import { rsvp } from "@/content/wedding";

const inputClass =
  "mt-1 w-full rounded-lg border border-sand-dark/60 bg-foam px-4 py-3 text-ink outline-none focus:border-ocean";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function RsvpForm() {
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [phone, setPhone] = useState("");
  const [events, setEvents] = useState<string[]>([]);
  const [declined, setDeclined] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function updateGuestName(index: number, value: string) {
    setGuestNames((names) => names.map((name, i) => (i === index ? value : name)));
  }

  function addGuest() {
    setGuestNames((names) => (names.length < 10 ? [...names, ""] : names));
  }

  function removeGuest(index: number) {
    setGuestNames((names) => names.filter((_, i) => i !== index));
  }

  function toggleEvent(option: string) {
    setDeclined(false);
    setEvents((current) =>
      current.includes(option)
        ? current.filter((event) => event !== option)
        : [...current, option],
    );
  }

  function toggleDecline() {
    setDeclined((current) => !current);
    setEvents([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const guests = guestNames
      .map((name) => name.trim())
      .filter(Boolean)
      .map((fullName, index) => ({ fullName, isPlusOne: index !== 0 }));

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guests,
        phone,
        events: declined ? [rsvp.declineOption] : events,
      }),
    });

    if (res.ok) {
      setStatus("success");
      setGuestNames([""]);
      setPhone("");
      setEvents([]);
      setDeclined(false);
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
    <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
      <div className="space-y-3">
        {guestNames.map((name, index) => (
          <div key={index}>
            <label htmlFor={`guest-${index}`} className="text-sm text-ink/70">
              {index === 0 ? "Nome completo *" : "Nome acompanhante"}
            </label>
            <div className="flex items-center gap-2">
              <input
                id={`guest-${index}`}
                type="text"
                required={index === 0}
                value={name}
                onChange={(e) => updateGuestName(index, e.target.value)}
                className={inputClass}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeGuest(index)}
                  aria-label="Remover acompanhante"
                  className="mt-1 h-9 w-9 shrink-0 rounded-full border border-sand-dark/60 text-ocean-deep"
                >
                  −
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addGuest}
          className="text-sm text-ocean-deep underline decoration-ocean/40 underline-offset-4 hover:text-ocean"
        >
          + Adicionar acompanhante
        </button>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm text-ink/70">
          Telefone *
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          required
          placeholder="(00) 00000-0000"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          maxLength={15}
          className={inputClass}
        />
      </div>

      <div>
        <span className="text-sm text-ink/70">Confirmo presença:</span>
        <div className="mt-2 space-y-2">
          {rsvp.eventOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-ink/80"
            >
              <input
                type="checkbox"
                checked={events.includes(option)}
                onChange={() => toggleEvent(option)}
              />
              {option}
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-ink/80">
            <input type="checkbox" checked={declined} onChange={toggleDecline} />
            {rsvp.declineOption}
          </label>
        </div>
      </div>

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
