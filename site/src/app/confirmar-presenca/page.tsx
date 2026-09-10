import type { Metadata } from "next";
import { RsvpForm } from "@/components/RsvpForm";
import { rsvp } from "@/content/wedding";

export const metadata: Metadata = {
  title: "Confirmar presença | Camila & Victor",
};

export default function ConfirmarPresencaPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-4xl italic text-ocean-deep">
          {rsvp.title}
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-ink/80">{rsvp.intro}</p>
        <p className="mt-6 font-display text-2xl italic text-ocean-deep">
          {rsvp.eventLabel}
        </p>

        <RsvpForm />
      </div>
    </section>
  );
}
