import type { ReactNode } from "react";

export function SimplePageLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl italic text-ocean-deep">
          {title}
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-balance text-ink/80">{intro}</p>
        {children}
      </div>
    </section>
  );
}
