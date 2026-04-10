export function ManifestoSection() {
  return (
    <section
      id="about"
      className="relative py-32 bg-surface overflow-hidden border-y border-border"
    >
      {/* Decorative Ghost Text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.02] font-display font-black text-[20vw] leading-none">
        DADI
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-medium max-w-4xl mx-auto leading-tight reveal">
          Hammasi{" "}
          <span className="text-accent underline decoration-accent/30 underline-offset-8 transition-colors hover:decoration-accent">
            kuchli go'yadan
          </span>{" "}
          boshlanadi.
          <br className="hidden md:block" />
          Keyin professional syomka va montaj.
          <br className="hidden md:block" />
          <span className="text-text/60">
            Natija: Ko'p ko'rishlar yig'adigan va yodda qoladigan kontent
          </span>
        </h2>
      </div>
    </section>
  );
}
