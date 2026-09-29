import Image from "next/image";
import { PendingNote } from "./PendingNote";
import { presentes } from "@/content/wedding";

export function PresentesSection() {
  return (
    <section
      id="presentes"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl text-gold">
          {presentes.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-balance text-ink/80">{presentes.intro}</p>

        {presentes.listUrl ? (
          <a
            href={presentes.listUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-gold-deep px-8 py-3 text-sm tracking-wide text-foam transition-opacity hover:opacity-90"
          >
            {presentes.listLabel}
          </a>
        ) : (
          <PendingNote note={presentes.listNote} />
        )}

        <p className="mt-12 text-balance text-ink/80">{presentes.qrIntro}</p>

        {presentes.qrCodeSrc ? (
          <Image
            src={presentes.qrCodeSrc}
            alt="QR Code da conta bancária dos noivos"
            width={240}
            height={240}
            className="mx-auto mt-6 rounded-xl border border-sand-dark bg-white p-3"
          />
        ) : (
          <PendingNote note={presentes.qrNote} />
        )}
      </div>
    </section>
  );
}
