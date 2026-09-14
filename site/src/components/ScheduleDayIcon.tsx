import Image from "next/image";

/**
 * Aquarelas decorativas exibidas ao lado do título de cada dia na Programação.
 */
const icons = {
  1: { src: "/images/welcome-drinks.png", width: 190, height: 190 },
  2: { src: "/images/dayoff.png", width: 220, height: 220 },
  3: { src: "/images/casamento.png", width: 197, height: 179 },
} as const;

export function ScheduleDayIcon({ day }: { day: 1 | 2 | 3 }) {
  const config = icons[day];

  return (
    <Image
      src={config.src}
      alt=""
      width={config.width}
      height={config.height}
      unoptimized
      className="h-10 w-auto shrink-0"
    />
  );
}
