import { comoChegar } from "@/content/wedding";

export function ComoChegarSection() {
  return (
    <section
      id="como-chegar"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl italic text-ocean-deep">
          {comoChegar.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-ink/80">{comoChegar.intro}</p>

        <div className="mt-8 space-y-4 text-left text-ink/80">
          {comoChegar.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 grid gap-8 text-left sm:grid-cols-2">
          {comoChegar.transferSections.map((transferSection) => (
            <div key={transferSection.title}>
              <h3 className="font-display text-lg italic text-ocean-deep">
                {transferSection.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                {transferSection.contacts.map((contact) => (
                  <li key={contact.name} className="flex justify-between gap-4">
                    <span>{contact.name}</span>
                    <span className="shrink-0 text-ink/50">
                      {contact.phone}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-left text-sm text-ink/70">
          <h3 className="font-display text-lg italic text-ocean-deep">
            Farmácia
          </h3>
          <p className="mt-3 flex justify-between gap-4">
            <span>{comoChegar.farmacia.name}</span>
            <span className="shrink-0 text-ink/50">
              {comoChegar.farmacia.phone}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
