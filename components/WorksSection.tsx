"use client";

import { useState, useRef, useEffect } from "react";

import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { WORKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface WorkItemProps {
  work: (typeof WORKS)[0];
  index: number;
  activeVideoId: number | null;
  setActiveVideoId: (id: number | null) => void;
}

function WorkItem({
  work,
  index,
  activeVideoId,
  setActiveVideoId,
}: WorkItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause if another video starts playing
  useEffect(() => {
    if (activeVideoId !== work.id && isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [activeVideoId, work.id, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setActiveVideoId(null);
      } else {
        videoRef.current.play();
        setActiveVideoId(work.id);
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <div
      className={cn(
        "group relative w-full aspect-9/16 overflow-hidden bg-bg border border-border reveal transition-all duration-500 hover:border-accent/50",
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
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onPlay={() => {
              setIsPlaying(true);
              setActiveVideoId(work.id);
            }}
            onPause={() => setIsPlaying(false)}

          />
          {/* Custom Play/Pause Overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 md:bg-black/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/90 flex items-center justify-center text-white backdrop-blur-sm transform transition-transform duration-300 hover:scale-110">
              {isPlaying ? (
                <Pause size={26} fill="white" />
              ) : (
                <Play size={26} className="ml-1" fill="white" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorksSection() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);


  return (
    <section
      id="works"
      className="py-24 md:py-32 bg-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-display font-bold tracking-[0.3em] text-accent uppercase mb-4 block reveal">
              [ VIDEO REELS ]
            </span>
            <h2 className="text-3xl md:text-6xl font-display font-bold reveal leading-tight md:leading-none">
              Ayrim <span className="text-muted">namunalar</span>
            </h2>
          </div>
          <div className="text-muted max-w-sm text-xs uppercase tracking-[0.2em] reveal leading-relaxed">
            Har bir kadrda - yangi hikoya, har bir soniyada - yuqori sifat.
          </div>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative px-6 md:px-[10%]">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 3.5,
              spaceBetween: 40,
              centeredSlides: false,
            },
          }}
          className="overflow-visible!"
        >
          {WORKS.map((work, i) => (
            <SwiperSlide key={work.id}>
              <WorkItem
                work={work}
                index={i}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />
            </SwiperSlide>
          ))}

        </Swiper>

        {/* Subtle Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-bg to-transparent pointer-events-none z-20 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-bg to-transparent pointer-events-none z-20 hidden md:block" />
      </div>

      <div className="container mx-auto px-6">
        {/* Swiper Controls */}
        <div className="flex justify-center gap-4 mt-8 reveal">
          <button
            onClick={() => swiper?.slidePrev()}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110 active:scale-95 group"
            aria-label="Previous videos"
          >
            <ChevronLeft
              size={20}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110 active:scale-95 group"
            aria-label="Next videos"
          >
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
