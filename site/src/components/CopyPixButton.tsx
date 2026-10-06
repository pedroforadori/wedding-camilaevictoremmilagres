"use client";

import { useState } from "react";

export function CopyPixButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard indisponível (contexto não-seguro) — sem ação; o QR Code
      // continua disponível para leitura no app do banco.
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleCopy}
        className="w-full rounded-full bg-gold-deep px-6 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90"
      >
        {copied ? "Código copiado!" : "Copiar código Pix"}
      </button>
    </div>
  );
}
