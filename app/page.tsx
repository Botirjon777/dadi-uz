"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WorksSection } from "@/components/WorksSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  useScrollReveal();

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ServicesSection />
      <WorksSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
