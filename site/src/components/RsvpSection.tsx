import { RsvpForm } from "./RsvpForm";
import { rsvp } from "@/content/wedding";

export function RsvpSection() {
  return (
    <section
      id="rsvp"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-display text-4xl text-gold">
          {rsvp.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />

        <RsvpForm />

        <div className="mt-10 space-y-2 text-sm text-ink/80">
          <p className="font-semibold text-ink">{rsvp.assistance.text}</p>
          <p className="font-semibold text-ink">{rsvp.assistance.name}</p>
          <a
            href={rsvp.assistance.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:text-gold-deep"
          >
            {rsvp.assistance.phoneLabel} (WhatsApp)
          </a>
        </div>
      </div>
    </section>
  );
}
