import Image from "next/image";
import { GALLERY } from "@/lib/constants";

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-muted font-display font-bold text-[10px] uppercase tracking-wider mb-4 reveal">
              [ GALLERIYA ]
            </h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight reveal">
              Bizning <span className="text-primary italic">ijodiy</span> dunyomiz
            </h3>
          </div>
          <div className="reveal">
            <p className="text-muted max-w-xs text-sm leading-relaxed">
              Har bir kadr ortida katta jamoa mehnati va o'ziga xos yondashuv yotadi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[1200px]">
          {/* Main Large Image */}
          <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-2xl reveal">
            <Image
              src={GALLERY[0].image}
              alt={GALLERY[0].alt}
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Side Images */}
          <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-2xl reveal">
            <Image
              src={GALLERY[1].image}
              alt={GALLERY[1].alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-2xl reveal">
            <Image
              src={GALLERY[2].image}
              alt={GALLERY[2].alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Bottom Images */}
          <div className="md:col-span-6 md:row-span-1 group relative overflow-hidden rounded-2xl reveal">
            <Image
              src={GALLERY[3].image}
              alt={GALLERY[3].alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="md:col-span-6 md:row-span-1 group relative overflow-hidden rounded-2xl reveal">
            <Image
              src={GALLERY[4].image}
              alt={GALLERY[4].alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
