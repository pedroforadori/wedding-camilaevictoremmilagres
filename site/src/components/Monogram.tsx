import { couple } from "@/content/wedding";

/**
 * Aproximação tipográfica do monograma "CV" enviado pela Camila (issue #8).
 * Placeholder — trocar pela arte original assim que o PDF estiver disponível.
 */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border border-ocean/40 ${className}`}
      aria-hidden="true"
    >
      <span className="font-script text-3xl text-ocean-deep">
        {couple.initials}
      </span>
    </div>
  );
}
