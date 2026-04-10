"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
      {/* Video Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay Layer */}
        <div className="absolute inset-0 bg-black/80 z-10" />
      </div>

      {/* Decorative radial gradient (fallback/extra depth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 text-center z-20">
        {/* Headline */}
        <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display font-extrabold leading-[1.1] mb-8 tracking-tight text-white uppercase drop-shadow-2xl">
          <span className="block opacity-0 animate-fade-up [animation-delay:150ms]">
            Ko'p ko'riladigan,
          </span>
          <span className="block opacity-0 animate-fade-up [animation-delay:300ms]">
            brendni tanituvchi videolar kerakmi?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-body mb-12 opacity-0 animate-fade-up [animation-delay:450ms] drop-shadow-md">
          Mijozlarimizning videolari nafaqat ko'p ko'riladi, <br />
          <span className="text-white font-bold">
            ko'rgan odamning yodida ham qoladi
          </span>
          .
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-up [animation-delay:600ms]">
          <Link
            href="#contact"
            className="w-full sm:w-64 h-16 px-6 border border-white/20 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:translate-y-[-2px] hover:border-white transition-all bg-white/5 backdrop-blur-sm flex items-center justify-center text-center whitespace-nowrap"
          >
            So'rovnomani to'ldirish
          </Link>
          <a
            href={CONTACT_INFO.telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-64 h-16 px-6 bg-accent text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:translate-y-[-2px] transition-all flex items-center justify-center text-center whitespace-nowrap"
          >
            Telegramdan yozish
          </a>
        </div>
      </div>
    </section>
  );
}
