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
    <footer className="py-12 bg-bg border-t border-border">
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        {/* Left: Logo & Copyright */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="relative w-20 h-6 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logos/logo-green.webp"
              alt="Dadi.uz"
              fill
              className="object-contain"
              sizes="100px"
            />
          </Link>
          <div className="text-xs font-body text-text/50 uppercase tracking-wider">
            © {currentYear} · Barcha huquqlar himoyalangan
          </div>
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-display font-bold text-text/50 hover:text-text transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-6">
          <a
            href={CONTACT_INFO.telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text/50 hover:text-accent transition-colors"
          >
            <Send size={18} />
          </a>
          <a
            href={`https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text/50 hover:text-accent transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
