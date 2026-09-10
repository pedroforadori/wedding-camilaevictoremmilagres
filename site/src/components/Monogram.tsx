import Image from "next/image";

/**
 * Monograma "CV" enviado pela Camila (issue #8): letras em aquarela cinza
 * com duas palmeiras, recortado do PDF original enviado por ela.
 */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/monogram-cv.png"
      alt="Monograma CV"
      width={920}
      height={812}
      className={`object-contain ${className}`}
    />
  );
}
