"use client";

import { useState } from "react";
import { CONTACT_INFO } from "@/lib/constants";
import { Send, Phone, MessageSquare, CheckCircle2 } from "lucide-react";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <section id="contact" className="py-32 bg-bg border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column: Info */}
          <div className="reveal">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase mb-4 block">
              [ ALOQA ]
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Gaplashamiz
            </h2>
            <p className="max-w-md text-muted mb-12">
              Loyiha haqida batafsil ma'lumot qoldiring yoki to'g'ridan-to'g'ri bog'laning.
            </p>

            <div className="space-y-6">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 group hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-lg font-mono">{CONTACT_INFO.phone}</span>
              </a>
              <a
                href={CONTACT_INFO.telegram_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                  <MessageSquare size={18} />
                </div>
                <span className="text-lg font-mono">{CONTACT_INFO.telegram}</span>
              </a>
              <a
                href={`https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                  <InstagramIcon size={18} />
                </div>
                <span className="text-lg font-mono">{CONTACT_INFO.instagram}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="reveal">
            {formState === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 border border-accent bg-accent/5 rounded-sm">
                <CheckCircle2 className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">Muvaffaqiyatli yuborildi</h3>
                <p className="text-muted">Tez orada siz bilan bog'lanamiz.</p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-sm font-mono text-accent hover:underline"
                >
                  Yangi xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">Ismingiz</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-surface border border-border px-6 py-4 focus:border-accent focus:outline-none transition-colors"
                    placeholder="Ali Valiyev"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">Telefon raqam</label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-surface border border-border px-6 py-4 focus:border-accent focus:outline-none transition-colors"
                    placeholder="+998 90 000 00 00"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">Kompaniya nomi (ixtiyoriy)</label>
                  <input
                    type="text"
                    className="w-full bg-surface border border-border px-6 py-4 focus:border-accent focus:outline-none transition-colors"
                    placeholder="Brend nomi"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">Xabar / Maqsad</label>
                  <textarea
                    rows={4}
                    className="w-full bg-surface border border-border px-6 py-4 focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="Qanday loyiha ustida ishlaymiz?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all disabled:opacity-50"
                >
                  {formState === "sending" ? "Yuborilmoqda..." : "Yuborish"}
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
