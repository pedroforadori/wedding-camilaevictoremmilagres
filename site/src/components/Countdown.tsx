"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/content/wedding";

function getTimeLeft() {
  const diff = new Date(wedding.ceremonyDateTimeISO).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

type TimeLeft = ReturnType<typeof getTimeLeft>;

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
];

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

// Widget fixo no canto superior direito, visível em todas as páginas a
// partir de `sm:` — em telas menores o header já ocupa esse canto com o
// menu, então o fallback é `CountdownInline` (abaixo).
export function CountdownCorner() {
  const timeLeft = useCountdown();

  return (
    <div
      className="fixed right-4 top-20 z-30 hidden rounded-2xl border border-sand-dark/60 bg-foam/90 px-3 py-2 shadow-sm backdrop-blur sm:right-6 sm:top-24 sm:flex"
      aria-label="Contagem regressiva para o casamento"
    >
      <div className="flex items-center gap-2">
        {units.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center px-1">
            <span className="font-display text-base leading-none text-ocean-deep">
              {timeLeft ? timeLeft[unit.key] : "-"}
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-wide text-ink/50">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Versão compacta para telas pequenas, onde o widget de canto não é exibido
// (colidiria com o botão de menu do header). Usa o mesmo cartão claro do
// CountdownCorner, só que centralizado e em largura total, para manter a
// identidade visual consistente entre mobile e desktop.
export function CountdownInline() {
  const timeLeft = useCountdown();

  return (
    <div className="sm:hidden">
      <p className="mb-2 text-center font-display text-sm uppercase tracking-[0.2em] text-taupe">
        Faltam
      </p>
      <div
        className="mx-auto flex max-w-xs items-center justify-between rounded-2xl border border-sand-dark/60 bg-foam/90 px-4 py-3 shadow-sm backdrop-blur"
        aria-label="Contagem regressiva para o casamento"
      >
        {units.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center px-1">
            <span className="font-display text-xl leading-none text-ocean-deep">
              {timeLeft ? timeLeft[unit.key] : "-"}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-wide text-ink/50">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
