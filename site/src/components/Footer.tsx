import { Monogram } from "./Monogram";
import { couple, wedding } from "@/content/wedding";

export function Footer() {
  return (
    <footer className="border-t border-sand-dark/60 bg-ocean-deep px-6 py-12 text-foam">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <Monogram className="h-14 w-14 border-foam/40" />
        <p className="font-display text-2xl italic">{couple.names}</p>
        <p className="text-sm text-foam/80">
          {wedding.city}, {wedding.state}
        </p>
        <a
          href={wedding.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm tracking-wide text-foam underline decoration-foam/40 underline-offset-4 hover:decoration-foam"
        >
          {wedding.instagramHandle}
        </a>
        <p className="mt-4 text-xs text-foam/50">{wedding.domain}</p>
      </div>
    </footer>
  );
}
