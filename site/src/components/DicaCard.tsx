import Image from "next/image";
import type { DicaSection } from "@/content/wedding";

export function DicaCard({ section }: { section: DicaSection }) {
  const isCompact = section.items.every(
    (item) => !item.address && !item.contacts,
  );

  return (
    <div className="rounded-2xl border border-sand-dark/60 bg-foam px-6 py-8 text-left shadow-sm sm:px-8">
      <Image
        src={section.icon.src}
        alt=""
        aria-hidden="true"
        width={section.icon.width}
        height={section.icon.height}
        className="mx-auto h-16 w-auto object-contain"
      />
      <h2 className="mt-2 text-center font-display text-2xl italic text-ocean-deep">
        {section.title}
      </h2>
      <span
        aria-hidden="true"
        className="mx-auto mt-3 block h-px w-12 bg-sand-dark"
      />
      {section.intro && (
        <p className="mt-4 text-center text-sm text-ink/70">
          {section.intro}
        </p>
      )}

      {isCompact ? (
        <ul className="mt-6 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {section.items.map((item) => (
            <li
              key={item.name}
              className="flex items-baseline justify-between gap-4 border-b border-sand-dark/20 py-1.5 text-sm"
            >
              <span className="text-ink">{item.name}</span>
              {item.detail && (
                <span className="shrink-0 text-ink/50">{item.detail}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-6 space-y-5">
          {section.items.map((item) => (
            <li
              key={item.name}
              className="border-t border-sand-dark/30 pt-5 first:border-t-0 first:pt-0"
            >
              <p className="font-medium text-ink">{item.name}</p>
              {item.detail && (
                <p className="mt-1 text-sm text-ink/70">{item.detail}</p>
              )}
              {item.address && (
                <p className="mt-1 text-sm text-ink/50">{item.address}</p>
              )}
              {item.contacts && item.contacts.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-ink/60">
                  {item.contacts.map((contact, index) => (
                    <li key={index}>
                      {contact.name && (
                        <span className="font-medium text-ink/80">
                          {contact.name}:{" "}
                        </span>
                      )}
                      {[contact.phone, contact.instagram]
                        .filter(Boolean)
                        .join(" · ")}
                      {contact.note && (
                        <span className="block text-xs text-ink/50">
                          {contact.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
