"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg/85 backdrop-blur-xl border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-24 h-8 transition-opacity hover:opacity-80">
          <Image
            src="/logos/logo-white.png"
            alt="Dadi.uz"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100px, 150px"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-display font-bold text-muted hover:text-text transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CONTACT_INFO.telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white transition-all text-xs font-display font-bold uppercase tracking-wider rounded-sm"
          >
            Gaplashamiz
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-text transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-text transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-text transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className={`text-4xl font-bold font-display hover:text-accent transition-colors transition-delay-[${i * 100}ms]`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={CONTACT_INFO.telegram_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-10 py-3 bg-accent text-white font-bold rounded-sm"
        >
          Telegram'da yozing
        </a>
      </div>
    </nav>
  );
}
