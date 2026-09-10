import { couple } from "@/content/wedding";

/**
 * Aproximação tipográfica do monograma "CV" enviado pela Camila (issue #8).
 * Placeholder — trocar pela arte original assim que o PDF estiver disponível.
 */
export function Monogram({
  className = "",
  tone = "text-ocean-deep",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border border-ocean/40 ${tone} ${className}`}
      aria-hidden="true"
    >
      <span className="font-script text-3xl text-current">
        {couple.initials}
      </span>
    </div>
  );
}
