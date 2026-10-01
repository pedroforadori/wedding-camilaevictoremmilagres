import { Monogram } from "./Monogram";
import { VisitCounter } from "./VisitCounter";
import { couple, wedding } from "@/content/wedding";

export function Footer() {
  return (
    <footer className="border-t border-sand-dark/60 bg-sand/40 px-6 py-12 text-ink">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <Monogram className="h-14 w-auto" />
        <p className="font-script text-5xl text-gold-deep sm:text-6xl">{couple.names}</p>
        <p className="text-sm text-ink/70">
          {wedding.city}, {wedding.state}
        </p>
        <a
          href={wedding.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm tracking-wide text-gold-deep underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          {wedding.instagramHandle}
        </a>
        <p className="mt-4 text-xs text-ink/50">{wedding.domain}</p>
        <a
          href="https://portfolio-penne.vercel.app/"
          target="_blank"
          rel="noopener"
          className="text-xs text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-gold-deep"
        >
          Desenvolvido por Penne · Faça o site do seu casamento conosco
        </a>
        <VisitCounter />
      </div>
    </footer>
  );
}
