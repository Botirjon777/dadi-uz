"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CLIENTS } from "@/lib/constants";

export function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Auto-scroll speed (pixels per frame)
  const speed = 0.8;

  const handleInfiniteScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const halfWidth = container.scrollWidth / 2;

    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfWidth;
    }
  }, []);

  const [pauseAuto, setPauseAuto] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;

    const animate = () => {
      if (!isDragging && !pauseAuto) {
        container.scrollLeft += speed;
        handleInfiniteScroll();
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, pauseAuto, handleInfiniteScroll]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    if (!scrollRef.current) return;
    setStartX(clientX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for sensitivity
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    handleInfiniteScroll();
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-24 bg-bg overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-center text-muted font-display font-bold text-[10px] uppercase tracking-wider reveal">
          [ BIZ BILAN ISHLAYDIGANLAR ]
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="relative group flex overflow-x-hidden select-none py-8 scrollbar-hide active:cursor-grabbing cursor-grab touch-pan-y scroll-auto"
        onMouseDown={(e) => handleStart(e.pageX)}
        onMouseMove={(e) => handleMove(e.pageX)}
        onMouseUp={handleEnd}
        onMouseLeave={() => {
          handleEnd();
          setPauseAuto(false);
        }}
        onMouseEnter={() => setPauseAuto(true)}
        onTouchStart={(e) => handleStart(e.touches[0].pageX)}
        onTouchMove={(e) => handleMove(e.touches[0].pageX)}
        onTouchEnd={handleEnd}
      >
        <div className="flex gap-24 md:gap-40 items-center whitespace-nowrap px-12 md:px-20 shrink-0">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="relative w-28 h-12 md:w-40 md:h-20 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110 cursor-pointer"
            >
              <img
                src={client.logo}
                alt={client.name}
                draggable={false}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
        {/* Duplicated for seamless loop */}
        <div className="flex gap-24 md:gap-40 items-center whitespace-nowrap px-12 md:px-20 shrink-0">
          {CLIENTS.map((client) => (
            <div
              key={`${client.name}-clone`}
              className="relative w-28 h-12 md:w-40 md:h-20 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110 cursor-pointer"
            >
              <img
                src={client.logo}
                alt={client.name}
                draggable={false}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
