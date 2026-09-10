"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monogram } from "./Monogram";
import { navigation } from "@/content/wedding";

function NavDropdown({ label, links }: (typeof navigation)[number]) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (links.length === 1) {
    return (
      <Link
        href={links[0].href}
        className={`text-sm tracking-wide transition-colors hover:text-ocean-deep ${
          pathname === links[0].href ? "text-ocean-deep" : "text-ink/80"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm tracking-wide text-ink/80 transition-colors hover:text-ocean-deep"
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 11 6"
          aria-hidden="true"
          className="mt-0.5"
        >
          <path
            fill="currentColor"
            d="M5.95.335l4.717 4.912a.302.302 0 0 1 0 .416.274.274 0 0 1-.4 0L5.75.961 1.234 5.663a.274.274 0 0 1-.4 0 .303.303 0 0 1-.084-.207c0-.074.027-.15.084-.207L5.55.337A.274.274 0 0 1 5.95.335z"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-sand-dark/60 bg-foam py-2 shadow-lg">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-2 text-sm tracking-wide transition-colors hover:bg-sand/50 hover:text-ocean-deep ${
                  pathname === link.href ? "text-ocean-deep" : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-foam sm:hidden">
      <div className="flex items-center justify-between border-b border-sand-dark/60 px-6 py-3">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <Monogram className="h-10 w-10" />
          <span className="font-display text-lg tracking-wide text-ocean-deep">
            Camila &amp; Victor
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="p-2 text-ocean-deep"
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
        {navigation.map((group) => (
          <div key={group.label} className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ocean">
              {group.label}
            </p>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`font-display text-2xl italic transition-colors ${
                      pathname === link.href ? "text-ocean-deep" : "text-ink/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
          <Link href="/" className="flex items-center gap-3">
            <Monogram className="h-10 w-10" />
            <span className="font-display text-lg tracking-wide text-ocean-deep">
              Camila &amp; Victor
            </span>
          </Link>

          <nav className="hidden items-center gap-8 sm:flex">
            {navigation.map((group) => (
              <NavDropdown key={group.label} {...group} />
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className="p-2 text-ocean-deep sm:hidden"
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
