import type { Metadata } from "next";
import Link from "next/link";
import { comoChegar } from "@/content/wedding";
import { renderPhone } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Motoristas, Transfer e Farmácia | Camila & Victor",
};

export default function TransporteFarmaciaPage() {
  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#como-chegar"
          className="text-sm text-ocean-deep underline underline-offset-4"
        >
          ← Voltar para Como Chegar
        </Link>

        <h1 className="mt-6 font-display text-3xl italic text-ocean-deep">
          Motoristas, Transfer e Farmácia
        </h1>
        <span
          aria-hidden="true"
          className="mt-4 block h-px w-16 bg-sand-dark"
        />

        <div className="mt-10 grid gap-8 text-left sm:grid-cols-2">
          {comoChegar.transferSections.map((transferSection) => (
            <div key={transferSection.title}>
              <h2 className="font-display text-lg italic text-ocean-deep">
                {transferSection.title}
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                {transferSection.contacts.map((contact) => (
                  <li
                    key={contact.name}
                    className="flex justify-between gap-4"
                  >
                    <span>{contact.name}</span>
                    <span className="shrink-0 text-ink/50">
                      {renderPhone(contact.phone)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-left text-sm text-ink/70">
          <h2 className="font-display text-lg italic text-ocean-deep">
            Farmácia
          </h2>
          <p className="mt-3 flex justify-between gap-4">
            <span>{comoChegar.farmacia.name}</span>
            <span className="shrink-0 text-ink/50">
              {renderPhone(comoChegar.farmacia.phone)}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
