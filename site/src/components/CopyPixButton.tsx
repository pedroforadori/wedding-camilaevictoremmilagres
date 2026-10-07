"use client";

import { useState } from "react";

// `widthClass` deve ser a mesma largura do QR Code acima, para o botão
// acompanhar a imagem.
export function CopyPixButton({
  code,
  widthClass,
}: {
  code: string;
  widthClass: string;
}) {
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
    <button
      type="button"
      onClick={handleCopy}
      className={`mx-auto mt-4 flex items-center justify-center gap-2 rounded-full bg-gold-deep px-4 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90 ${widthClass}`}
    >
      {copied ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? "Código copiado!" : "Copiar código Pix"}
    </button>
  );
}
