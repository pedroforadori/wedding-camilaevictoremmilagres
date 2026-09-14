import { RsvpForm } from "./RsvpForm";
import { rsvp } from "@/content/wedding";

export function RsvpSection() {
  return (
    <section
      id="rsvp"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-display text-4xl italic text-ocean-deep">
          {rsvp.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-ink/80">{rsvp.intro}</p>

        <RsvpForm />
      </div>
    </section>
  );
}
