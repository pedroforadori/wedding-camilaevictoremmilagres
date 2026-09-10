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
      <p className="text-center font-display text-2xl uppercase tracking-[0.15em] text-taupe sm:text-3xl">
        Contagem regressiva para o grande dia
      </p>
      <div className="mx-auto mt-8 grid max-w-xl grid-cols-4 gap-3 sm:gap-6">
        {units.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center">
            <div className="flex aspect-[6/5] w-full items-center justify-center rounded-md bg-taupe">
              <span className="font-display text-2xl text-foam sm:text-4xl">
                {timeLeft ? timeLeft[unit.key] : "-"}
              </span>
            </div>
            <span className="mt-3 font-display text-sm text-ink/70 sm:text-lg">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
