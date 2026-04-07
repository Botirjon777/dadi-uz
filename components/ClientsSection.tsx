import { CLIENTS } from "@/lib/constants";

export function ClientsSection() {
  return (
    <section className="py-24 bg-bg overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-center text-muted font-display font-bold text-[10px] uppercase tracking-wider reveal">
          [ BIZ BILAN ISHLAYDIGANLAR ]
        </h2>
      </div>

      <div className="relative group flex overflow-hidden select-none py-8">
        {/* First Marquee Row */}
        <div className="flex animate-marquee gap-24 md:gap-40 min-w-full items-center justify-around whitespace-nowrap px-12 will-change-transform group-hover:[animation-play-state:paused] shrink-0">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="relative w-28 h-12 md:w-40 md:h-20 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
        {/* Duplicated for smooth loop */}
        <div className="flex animate-marquee gap-24 md:gap-40 min-w-full items-center justify-around whitespace-nowrap px-12 will-change-transform group-hover:[animation-play-state:paused] shrink-0">
          {CLIENTS.map((client) => (
            <div
              key={`${client.name}-clone`}
              className="relative w-28 h-12 md:w-40 md:h-20 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
