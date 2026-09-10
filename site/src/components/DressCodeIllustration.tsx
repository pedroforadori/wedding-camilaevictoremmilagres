import Image from "next/image";

/**
 * Exemplos de traje gerados por IA (mesma linguagem de aquarela + traço fino
 * da referência da Camila, issue #8) para ela aprovar a direção antes de
 * decidir a arte final de cada dia (issue #4).
 */
const days = {
  1: { label: "Roupa branca", src: "/images/traje-dia1.jpg", width: 476, height: 464 },
  2: { label: "Piscina / praia", src: "/images/traje-dia2.jpg", width: 475, height: 465 },
  3: { label: "Social completo", src: "/images/traje-dia3.jpg", width: 481, height: 468 },
} as const;

export function DressCodeIllustration({ day }: { day: 1 | 2 | 3 }) {
  const config = days[day];

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-sand-dark">
      <Image
        src={config.src}
        alt={`Aquarela de exemplo do traje sugerido para "${config.label}"`}
        width={config.width}
        height={config.height}
        sizes="(min-width: 640px) 32rem, 100vw"
        className="block h-auto w-full"
      />
      <p className="border-t border-sand-dark/60 bg-sand/30 px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.2em] text-ink/50">
        Traje sugerido (exemplo) — {config.label}
      </p>
    </div>
  );
}
