import Image from "next/image";

/**
 * Aquarelas de traje por dia (issue #4). O dia 2 (Day Off) não tem traje
 * sugerido, então não entra aqui.
 */
const days = {
  1: {
    label: "Roupa branca",
    src: "/images/traje-dia1.png",
    width: 950,
    height: 1254,
  },
  3: {
    label: "Social",
    src: "/images/traje-dia3.png",
    width: 972,
    height: 1316,
  },
} as const;

export function DressCodeIllustration({ day }: { day: 1 | 3 }) {
  const config = days[day];

  return (
    <div className="mx-auto mt-6 w-40 sm:w-48">
      <Image
        src={config.src}
        alt={`Aquarela do traje sugerido para "${config.label}"`}
        width={config.width}
        height={config.height}
        sizes="12rem"
        className="block h-auto w-full"
      />
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-ink/50">
        Traje sugerido — {config.label}
      </p>
    </div>
  );
}
