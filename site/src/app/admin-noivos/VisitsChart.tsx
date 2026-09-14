import type { VisitStats } from "@/lib/visitStats";

// Paleta categórica validada para leitura em daltonismo (ver skill de
// dataviz) — 3 primeiros slots, que também passam o teste all-pairs.
const DEVICES: {
  key: keyof VisitStats["byDevice"];
  label: string;
  color: string;
}[] = [
  { key: "mobile", label: "Mobile", color: "#2a78d6" },
  { key: "tablet", label: "Tablet", color: "#eb6834" },
  { key: "desktop", label: "Desktop", color: "#1baf7a" },
];

export function VisitsChart({ stats }: { stats: VisitStats | null }) {
  return (
    <div className="rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-display text-2xl italic text-ocean-deep">Visitas</p>
        {stats && (
          <p className="text-right">
            <span className="font-display text-3xl italic text-ocean-deep">
              {stats.count}
            </span>{" "}
            <span className="text-xs uppercase tracking-wide text-ink/60">
              acessos
            </span>
          </p>
        )}
      </div>

      {stats === null ? (
        <p className="mt-4 text-sm text-ink/50">
          Contador indisponível — variáveis do Upstash Redis não configuradas
          neste ambiente.
        </p>
      ) : (
        <>
          <div className="mt-6 space-y-3">
            {DEVICES.map(({ key, label, color }) => {
              const value = stats.byDevice[key];
              const max = Math.max(
                1,
                ...DEVICES.map((device) => stats.byDevice[device.key]),
              );
              const percent = (value / max) * 100;

              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-sm text-ink/70">
                    {label}
                  </span>
                  <div className="h-4 flex-1 overflow-hidden bg-foam">
                    <div
                      className="h-4"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: color,
                        borderRadius: "0 4px 4px 0",
                      }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-sm tabular-nums text-ink/80">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {stats.isMock && (
            <p className="mt-4 text-xs text-ink/40">
              Dados de exemplo — Redis não configurado neste ambiente local.
            </p>
          )}
        </>
      )}
    </div>
  );
}
