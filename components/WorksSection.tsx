"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { WORKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WorkItemProps {
  work: (typeof WORKS)[0];
  index: number;
}

function WorkItem({ work, index }: WorkItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex-none w-[calc(100vw-48px)] md:w-[340px] aspect-9/16 overflow-hidden bg-bg border border-border reveal transition-all duration-500 hover:border-accent/50"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Media Content */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={work.src}
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {/* Custom Play/Pause Overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center text-white backdrop-blur-sm transform transition-transform duration-300 hover:scale-110">
              {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} className="ml-1" fill="white" />}
            </div>
          </button>
        </div>
      </div>

      {/* Hover Overlay Details */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-2.5 md:p-5 pointer-events-none z-10">
        <span className="text-[9px] font-display font-bold text-accent uppercase mb-2 tracking-[0.2em]">
          {work.category}
        </span>
        <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight uppercase">
          {work.title}
        </h3>
      </div>
    </div>
  );
}

export function WorksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const targetScroll = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="works" className="py-24 md:py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-display font-bold tracking-[0.3em] text-accent uppercase mb-4 block reveal">
              [ VIDEO REELS ]
            </span>
            <h2 className="text-3xl md:text-6xl font-display font-bold reveal leading-tight md:leading-none">
              Tanlangan <span className="text-muted">ishlarimiz</span>
            </h2>
          </div>
          <div className="text-muted max-w-sm text-xs uppercase tracking-[0.2em] reveal leading-relaxed">
            Har bir kadrda - yangi hikoya, har bir soniyada - yuqori sifat. Vertical formatdagi eng sara loyihalarimiz.
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden gap-6 px-6 md:px-[10%] pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {WORKS.map((work, i) => (
            <div key={work.id} className="snap-center">
              <WorkItem work={work} index={i} />
            </div>
          ))}
        </div>
        
        {/* Subtle Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-bg to-transparent pointer-events-none z-20 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-bg to-transparent pointer-events-none z-20 hidden md:block" />
      </div>

      <div className="container mx-auto px-6">
        {/* Swiper Controls */}
        <div className="flex justify-center gap-4 mt-8 reveal">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110 active:scale-95 group"
            aria-label="Previous videos"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110 active:scale-95 group"
            aria-label="Next videos"
          >
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 md:mt-16 text-center reveal">
          <button className="text-[10px] font-display font-bold tracking-[0.3em] uppercase py-4 px-12 border border-border hover:border-accent hover:text-accent transition-all duration-300">
            Barcha loyihalarni ko'rish
          </button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

