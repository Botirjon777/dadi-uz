import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center z-10">
        {/* Eyebrow Label */}
        <div className="mb-6 opacity-0 animate-fade-up">
          <span className="text-[11px] font-display font-bold tracking-wider text-muted uppercase border border-border px-3 py-1 bg-surface/50">
            [ MARKETING · VIDEO STUDIO ]
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display font-extrabold leading-[1.1] mb-8 tracking-tight text-white uppercase">
          <span className="block opacity-0 animate-fade-up [animation-delay:150ms]">
            Oddiy reklama emas.
          </span>
          <span className="block opacity-0 animate-fade-up [animation-delay:300ms]">
            Portlovchi ideyalar.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted font-body mb-12 opacity-0 animate-fade-up [animation-delay:450ms]">
          Biz strategiya qurib bermaymiz — biz siz uchun <span className="text-text">ishlaydi degan narsani yaratamiz</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-up [animation-delay:600ms]">
          <a
            href={CONTACT_INFO.telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-accent text-white font-bold text-sm tracking-wide rounded-sm hover:translate-y-[-2px] transition-transform"
          >
            Telegram'da yozing
          </a>
          <Link
            href="#contact"
            className="px-10 py-4 border border-border text-text font-bold text-sm tracking-wide rounded-sm hover:translate-y-[-2px] hover:border-text transition-all"
          >
            Loyiha haqida gaplashamiz
          </Link>
        </div>
      </div>
    </section>
  );
}
