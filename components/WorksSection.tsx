import Image from "next/image";
import { WORKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WorksSection() {
  return (
    <section id="works" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-[10px] font-display font-bold tracking-wider text-accent uppercase mb-4 block reveal">
            [ TANLANGAN LOYIHALAR ]
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold reveal">Ishlarimiz</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKS.map((work, i) => (
            <div
              key={work.id}
              className={cn(
                "group relative aspect-video md:aspect-square overflow-hidden bg-bg border border-border reveal",
                work.size === "large" ? "md:col-span-2" : "md:col-span-1"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Project Image */}
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-[10px] font-display font-bold text-accent uppercase mb-2">
                  {work.category}
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
