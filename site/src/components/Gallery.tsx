import { GalleryGrid } from "./GalleryGrid";
import { gallery } from "@/content/wedding";

const placeholderTiles = Array.from({ length: 8 });

export function Gallery() {
  const hasPhotos = gallery.photos.length > 0;

  return (
    <section id="galeria" className="texture-paper bg-foam px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <p className="font-script text-4xl leading-none text-gold-deep sm:text-5xl">
            Camila e Victor
          </p>
          <h1 className="mt-3 font-display text-4xl text-gold">Galeria</h1>
          <span aria-hidden="true" className="mt-4 h-px w-16 bg-sand-dark" />
        </div>

        {hasPhotos ? (
          <GalleryGrid photos={gallery.photos} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}
