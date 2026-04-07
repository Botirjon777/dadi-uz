"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
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

  // Size mapping for collage
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
    medium: "md:col-span-2 md:row-span-1 aspect-video",
    small: "md:col-span-1 md:row-span-1 aspect-square",
  }[work.size as "large" | "medium" | "small"];

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-bg border border-border reveal",
        sizeClasses
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Media Content */}
      <div className="absolute inset-0 w-full h-full">
        {work.type === "video" ? (
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
              <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center text-white backdrop-blur-sm transform transition-transform duration-300 hover:scale-110">
                {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} className="ml-1" fill="white" />}
              </div>
            </button>
          </div>
        ) : (
          <Image
            src={work.src}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-2 py-1 text-[8px] font-display font-medium tracking-widest text-white uppercase bg-black/40 backdrop-blur-md border border-white/10 rounded-xs">
          {work.type === "video" ? "Video Content" : "Photography"}
        </span>
      </div>

      {/* Hover Overlay Details */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8 pointer-events-none z-10">
        <span className="text-[10px] font-display font-bold text-accent uppercase mb-2 tracking-widest">
          {work.category}
        </span>
        <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight uppercase">
          {work.title}
        </h3>
      </div>
    </div>
  );
}

export function WorksSection() {
  return (
    <section id="works" className="py-24 md:py-32 bg-bg relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-display font-bold tracking-wider text-accent uppercase mb-4 block reveal">
              [ PORTFOLIO COLLAGE ]
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold reveal leading-none">
              Tanlangan <span className="text-muted">ishlarimiz</span>
            </h2>
          </div>
          <div className="text-muted max-w-sm text-sm uppercase tracking-widest reveal">
            Har bir kadrda - yangi hikoya, har bir soniyada - yuqori sifat.
          </div>
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-fr">
          {WORKS.map((work, i) => (
            <WorkItem key={work.id} work={work} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center reveal">
          <button className="text-xs font-display font-bold tracking-widest uppercase py-4 px-10 border border-border hover:border-accent hover:text-accent transition-colors">
            Barcha loyihalarni ko'rish
          </button>
        </div>
      </div>
    </section>
  );
}
