import { GuestbookForm } from "./GuestbookForm";
import { guestbook } from "@/content/wedding";

// Só o formulário: as mensagens ficam visíveis apenas para os noivos, em
// /admin-noivos/mensagens (pedido dos noivos, out/2026).
export function MensagensSection() {
  return (
    <section
      id="mensagens"
      className="texture-paper scroll-mt-24 bg-foam px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl text-gold">
          {guestbook.title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <div className="mt-10 rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-8 sm:px-10">
          <GuestbookForm />
        </div>
      </div>
    </section>
  );
}
