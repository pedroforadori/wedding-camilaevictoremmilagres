import Link from "next/link";

export function AdminSubpageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <Link
          href="/admin-noivos"
          className="text-sm text-ocean-deep underline decoration-ocean/40 underline-offset-4 hover:text-ocean"
        >
          ← Área dos noivos
        </Link>
        <h1 className="mt-4 font-display text-4xl italic text-ocean-deep">
          {title}
        </h1>
        <span
          aria-hidden="true"
          className="mt-4 block h-px w-16 bg-sand-dark"
        />
      </div>
    </div>
  );
}
