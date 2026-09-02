import Link from "next/link";
import { Monogram } from "./Monogram";
import { wedding } from "@/content/wedding";

const navLinks = [
  { href: "#convite", label: "Convite" },
  { href: "#programacao", label: "Programação" },
  { href: "#o-que-vestir", label: "O que vestir" },
  { href: "#galeria", label: "Galeria" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-dark/60 bg-foam/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="#topo" className="flex items-center gap-3">
          <Monogram className="h-10 w-10" />
          <span className="font-display text-lg tracking-wide text-ocean-deep">
            Camila &amp; Victor
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm tracking-wide text-ink/80 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ocean-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={wedding.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-ocean-deep transition-colors hover:text-ocean"
        >
          Instagram
        </a>
      </div>
    </header>
  );
}
