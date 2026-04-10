import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { Send } from "lucide-react";

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-24 bg-bg border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Top: Nav links */}
          <nav className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] md:text-xs font-display font-bold text-text/50 hover:text-accent transition-all duration-300 uppercase tracking-[0.2em]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center: Logo */}
          <Link
            href="/"
            className="relative w-28 h-8 md:w-36 md:h-10 transition-all duration-500 hover:scale-110 active:scale-95"
          >
            <Image
              src="/images/logos/logo-green.webp"
              alt="Dadi.uz"
              fill
              className="object-contain"
              sizes="200px"
            />
          </Link>

          {/* Below Logo: Social icons */}
          <div className="flex items-center gap-8">
            <a
              href={CONTACT_INFO.telegram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text/50 hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Telegram"
            >
              <Send size={18} />
            </a>
            <a
              href={`https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text/50 hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>

          {/* Bottom: All rights reserved */}
          <div className="pt-8 w-full border-t border-border/50 text-center">
            <div className="text-[9px] md:text-[10px] font-display font-medium text-text/30 uppercase tracking-[0.3em]">
              © {currentYear} · DADI MEDIA · BARCHA HUQUQLAR HIMOYALANGAN
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
