import { SectionHeading } from "./SectionHeading";
import { gallery } from "@/content/wedding";

const placeholderTiles = Array.from({ length: 8 });

export function Gallery() {
  return (
    <section id="galeria" className="bg-sand/40 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Camila & Victor" title="Galeria" />

        <p className="mx-auto mt-6 max-w-lg text-center text-ink/80">
          {gallery.note}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {placeholderTiles.map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl border border-dashed border-sand-dark bg-foam"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
