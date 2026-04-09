"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { Send, X } from "lucide-react";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-bg/90 backdrop-blur-xl border-b border-border py-4"
            : "bg-bg/40 backdrop-blur-md py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-24 h-8 transition-all duration-300 hover:scale-105">
            <Image
              src="/images/logos/logo-white.webp"
              alt="Dadi.uz"
              fill
              className="object-contain"
              sizes="100px"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] font-display font-bold text-muted hover:text-text transition-colors uppercase tracking-[0.2em]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT_INFO.telegram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white transition-all text-[10px] font-display font-bold uppercase tracking-[0.2em] rounded-sm"
            >
              Gaplashamiz
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-60 flex flex-col items-end gap-1.5 p-2 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className={`h-0.5 bg-text transition-all duration-500 ${isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
            <div className={`h-0.5 bg-text transition-all duration-500 ${isMenuOpen ? "w-0 opacity-0" : "w-4 group-hover:w-6"}`} />
            <div className={`h-0.5 bg-text transition-all duration-500 ${isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar System */}
      <div className={`fixed inset-0 z-100 md:hidden transition-all duration-500 ${isMenuOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Sidebar Panel */}
        <div className={`absolute top-0 right-0 w-[85%] h-full bg-bg border-l border-border transition-transform duration-500 ease-out flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* Sidebar Header */}
          <div className="p-8 border-b border-border flex items-center justify-between">
             <Link href="/" onClick={() => setIsMenuOpen(false)} className="relative w-20 h-6">
                <Image src="/images/logos/logo-white.webp" alt="Dadi" fill className="object-contain" sizes="80px" />
             </Link>
             <button onClick={() => setIsMenuOpen(false)} className="text-muted hover:text-text p-2">
                <X size={20} />
             </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 px-8 py-12 flex flex-col gap-6">
            <span className="text-[10px] font-display font-bold text-accent tracking-[0.3em] uppercase mb-4">
              [ MENYU ]
            </span>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-display font-bold uppercase transition-all duration-700 hover:text-accent tracking-tighter ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-8 bg-surface/50 border-t border-border space-y-8">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-display font-bold text-muted uppercase tracking-[0.2em]">Bog'lanish</span>
               <a href={CONTACT_INFO.telegram_link} className="text-lg font-display font-bold hover:text-accent transition-colors">
                  {CONTACT_INFO.telegram}
               </a>
            </div>
            
            <div className="flex items-center gap-6">
               <a 
                href={CONTACT_INFO.telegram_link} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text/50 hover:border-accent hover:text-accent transition-all duration-300"
               >
                  <Send size={20} />
               </a>
               <a 
                href={`https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text/50 hover:border-accent hover:text-accent transition-all duration-300"
               >
                  <InstagramIcon size={20} />
               </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

