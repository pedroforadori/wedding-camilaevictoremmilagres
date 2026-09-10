"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "mt-1 w-full rounded-lg border border-sand-dark/60 bg-foam px-4 py-3 text-ink outline-none focus:border-ocean";

export function GuestbookForm() {
  const router = useRouter();
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

    const res = await fetch("/api/mensagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      }),
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
      router.refresh();
    } else {
      const body = await res.json().catch(() => null);
      setErrorMessage(body?.error ?? "Não foi possível enviar. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="gb-name" className="text-sm text-ink/70">
          Nome completo
        </label>
        <input id="gb-name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="gb-email" className="text-sm text-ink/70">
          E-mail
        </label>
        <input id="gb-email" name="email" type="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="gb-message" className="text-sm text-ink/70">
          Mensagem
        </label>
        <textarea
          id="gb-message"
          name="message"
          required
          rows={4}
          maxLength={4000}
          className={inputClass}
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      {status === "success" && (
        <p className="text-sm text-ocean-deep">Mensagem enviada, obrigado!</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-ocean-deep px-6 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
