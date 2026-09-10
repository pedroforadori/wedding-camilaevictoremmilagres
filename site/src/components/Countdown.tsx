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

const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-ocean-deep">
        Contagem regressiva para o grande dia
      </p>
      <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-6">
        {units.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-sand-dark/70 font-display text-2xl text-ink sm:h-20 sm:w-20 sm:text-3xl">
              {timeLeft
                ? String(timeLeft[unit.key]).padStart(2, "0")
                : "--"}
            </div>
            <span className="mt-2 text-xs uppercase tracking-wide text-ink/60">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
