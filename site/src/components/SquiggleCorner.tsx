/**
 * Rabisco decorativo (squiggle) que emoldura o canto superior direito dos
 * cards de Dicas no site de referência (Wix, ver issue #11) — reproduzido
 * como SVG em vez de imagem para escalar sem perda.
 */
export function SquiggleCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 190 220"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4,14 q14,-14 28,0 q14,14 28,0 q14,-14 28,0 q14,14 28,0 q14,-14 28,0 q14,14 28,28 q-14,14 0,28 q14,14 0,28 q-14,14 0,28 q14,14 0,28 q-14,14 0,28 q14,14 0,28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
