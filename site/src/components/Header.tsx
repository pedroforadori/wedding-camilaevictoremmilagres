"use client";

import { useState } from "react";
import Link from "next/link";
import { Monogram } from "./Monogram";
import { primaryNav } from "@/content/wedding";

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-foam lg:hidden">
      <div className="flex items-center justify-between border-b border-sand-dark/60 px-6 py-3">
        <Link href="/#topo" onClick={onClose} className="flex items-center gap-3">
          <Monogram className="h-10 w-auto" />
          <span className="translate-y-[0.15em] font-script text-4xl leading-none text-gold-deep sm:text-5xl">
            Camila e Victor
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="p-2 text-gold-deep"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-6 py-6">
        <ul className="space-y-3">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-display text-2xl text-ink/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-dark/60 bg-foam/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/#topo" className="flex items-center gap-3">
            <Monogram className="h-10 w-auto" />
            <span className="translate-y-[0.15em] font-script text-4xl leading-none text-gold-deep sm:text-5xl">
              Camila e Victor
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm tracking-wide text-ink/80 transition-colors hover:text-gold-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className="p-2 text-gold-deep lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
