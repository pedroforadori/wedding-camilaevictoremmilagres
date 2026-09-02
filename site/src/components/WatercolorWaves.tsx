/**
 * Fundo decorativo que aproxima o estilo da aquarela de praia enviada pela
 * Camila (issue #8, litoral de São Miguel dos Milagres): ondas sobrepostas
 * com uma textura de turbulência SVG para simular o efeito de pincel/aquarela.
 * Placeholder — trocar pela arte original assim que o PDF estiver disponível.
 */
export function WatercolorWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id="watercolor-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={22} />
        </filter>
      </defs>
      <g filter="url(#watercolor-texture)">
        <path
          d="M0,120 C240,180 420,60 720,110 C1020,160 1200,80 1440,130 L1440,400 L0,400 Z"
          fill="var(--color-sand)"
          opacity="0.8"
        />
        <path
          d="M0,200 C260,140 480,240 760,190 C1040,140 1220,220 1440,180 L1440,400 L0,400 Z"
          fill="var(--color-ocean)"
          opacity="0.35"
        />
        <path
          d="M0,260 C300,220 500,300 780,250 C1060,200 1260,280 1440,240 L1440,400 L0,400 Z"
          fill="var(--color-ocean-deep)"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
