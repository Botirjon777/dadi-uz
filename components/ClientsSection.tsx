"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { CLIENTS } from "@/lib/constants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export function ClientsSection() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="py-24 bg-bg overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-center text-muted font-display font-bold text-xl uppercase tracking-wider reveal">
          [ MIJOZLARIMIZ ]
        </h2>
      </div>

      <div className="relative py-8">
        <Swiper
          modules={[Autoplay, FreeMode]}
          onSwiper={setSwiper}
          slidesPerView={2}
          spaceBetween={12}
          loop={true}
          speed={5000}
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 5,
              spaceBetween: 32,
            },
          }}
          className="marquee-swiper ease-linear!"
        >
          {CLIENTS.map((client) => (
            <SwiperSlide key={client.name}>
              <div className="relative w-full h-20 md:h-32 flex items-center justify-center grayscale-0 opacity-100 md:grayscale md:opacity-60 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-700 md:hover:scale-110 cursor-pointer">
                <img
                  src={client.logo}
                  alt={client.name}
                  draggable={false}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .marquee-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
