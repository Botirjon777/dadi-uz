import { SERVICES } from "@/lib/constants";
import { Sparkles, Camera, Megaphone } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "spark": return <Sparkles className="w-8 h-8 text-accent" />;
    case "camera": return <Camera className="w-8 h-8 text-accent" />;
    case "megaphone": return <Megaphone className="w-8 h-8 text-accent" />;
    default: return <Sparkles className="w-8 h-8 text-accent" />;
  }
};

export function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-bg">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center md:text-left">
          <span className="text-[10px] font-display font-bold tracking-wider text-accent uppercase mb-4 block reveal">
            [ NIMALAR QILAMIZ ]
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold reveal">Bizning Xizmatlar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`group p-10 border border-border bg-surface/30 hover:border-accent hover:translate-y-[-4px] transition-all duration-300 reveal [animation-delay:${i * 100}ms]`}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-sm font-mono text-accent">{service.id}</span>
                {getIcon(service.icon)}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
              <p className="text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
