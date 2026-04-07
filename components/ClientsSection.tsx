import { CLIENTS } from "@/lib/constants";

export function ClientsSection() {
  return (
    <section className="py-20 bg-bg overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-center text-muted font-display font-bold text-[10px] uppercase tracking-wider reveal">
          [ BIZ BILAN ISHLAYDIGANLAR ]
        </h2>
      </div>

      <div className="relative group flex overflow-hidden select-none">
        {/* First Marquee Row */}
        <div className="flex animate-marquee gap-20 min-w-full items-center justify-around whitespace-nowrap">
          {CLIENTS.map((client) => (
            <span
              key={client.name}
              className="text-2xl md:text-4xl font-display font-bold text-muted/20 hover:text-text transition-colors cursor-default uppercase"
            >
              {client.name}
            </span>
          ))}
        </div>
        {/* Duplicated for smooth loop */}
        <div className="flex animate-marquee gap-20 min-w-full items-center justify-around whitespace-nowrap">
          {CLIENTS.map((client) => (
            <span
              key={client.name}
              className="text-2xl md:text-4xl font-display font-bold text-muted/20 hover:text-text transition-colors cursor-default uppercase"
            >
              {client.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
