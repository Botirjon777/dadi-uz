"use client";

import { useState } from "react";
import { CONTACT_INFO } from "@/lib/constants";
import { Send, Phone, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactFormAction } from "@/app/actions";
import { cn } from "@/lib/utils";


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
  const [formState, setFormState] = useState<"idle" | "sending" | "success">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const ism = formData.get("ism") as string;
    const telefon = formData.get("telefon") as string;
    const xabar = formData.get("xabar") as string;

    const newErrors: Record<string, string> = {};

    if (!ism.trim()) {
      newErrors.ism = "Iltimos, ismingizni kiriting";
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!telefon.trim()) {
      newErrors.telefon = "Iltimos, telefon raqamingizni kiriting";
    } else if (!phoneRegex.test(telefon)) {
      newErrors.telefon = "Iltimos, raqamni to'g'ri kiriting (+998XXXXXXXXX)";
    }

    if (!xabar.trim()) {
      newErrors.xabar = "Iltimos, xabar qoldiring";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState("sending");

    const result = await sendContactFormAction(formData);

    if (result.success) {
      setFormState("success");
    } else {
      setErrors((prev) => ({
        ...prev,
        form:
          result.message ||
          "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
      }));
      setFormState("idle");
    }
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
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8">
              Biz bilan bog'laning
            </h2>
            <p className="max-w-md text-muted mb-12">
              Loyiha haqida batafsil ma'lumot qoldiring yoki to'g'ridan-to'g'ri
              bog'laning.
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
                <span className="text-lg font-mono">
                  {CONTACT_INFO.telegram}
                </span>
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
                <span className="text-lg font-mono">
                  {CONTACT_INFO.instagram}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="reveal lg:border-l lg:border-border lg:pl-20">
            <h2 className="text-xl md:text-3xl font-display font-bold mb-2.5 md:mb-5">
              Biz siz bilan bog'lanamiz
            </h2>
            {formState === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 border border-accent bg-accent/5 rounded-sm">
                <CheckCircle2 className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">
                  Muvaffaqiyatli yuborildi
                </h3>
                <p className="text-muted">Tez orada siz bilan bog'lanamiz.</p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-sm font-mono text-accent hover:underline"
                >
                  Yangi xabar yuborish
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >

                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">
                    Ismingiz
                  </label>
                  <input
                    required
                    name="ism"
                    type="text"
                    maxLength={100}
                    className={cn(
                      "w-full bg-surface border p-2.5 md:p-5 focus:outline-none transition-colors placeholder:text-muted/50",
                      errors.ism
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-border focus:border-accent",
                    )}
                    placeholder="Ali Valiyev"
                  />
                  {errors.ism && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.ism}
                    </p>
                  )}


                </div>
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">
                    Telefon raqam
                  </label>
                  <input
                    required
                    name="telefon"
                    type="tel"
                    pattern="^\+998\d{9}$"
                    title="Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak"
                    className={cn(
                      "w-full bg-surface border p-2.5 md:p-5 focus:outline-none transition-colors placeholder:text-muted/50",
                      errors.telefon
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-border focus:border-accent",
                    )}
                    placeholder="+998900000000"
                  />
                  {errors.telefon ? (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.telefon}
                    </p>
                  ) : (
                    <span className="text-[9px] text-muted/60 mt-1 block">
                      Format: +998XXXXXXXXX
                    </span>
                  )}


                </div>
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">
                    Kompaniya nomi (ixtiyoriy)
                  </label>
                  <input
                    name="kompaniya"
                    type="text"
                    maxLength={100}
                    className={cn(
                      "w-full bg-surface border p-2.5 md:p-5 focus:outline-none transition-colors placeholder:text-muted/50",
                      errors.kompaniya
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-border focus:border-accent",
                    )}
                    placeholder="Brend nomi"
                  />
                  {errors.kompaniya && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.kompaniya}
                    </p>
                  )}


                </div>
                <div>
                  <label className="text-[10px] font-display font-bold uppercase text-muted mb-2 block tracking-wider">
                    Xabar / Maqsad
                  </label>
                  <textarea
                    required
                    name="xabar"
                    rows={4}
                    maxLength={500}
                    className={cn(
                      "w-full bg-surface border p-2.5 md:p-5 focus:outline-none transition-colors resize-none placeholder:text-muted/50",
                      errors.xabar
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-border focus:border-accent",
                    )}
                    placeholder="Qanday loyiha ustida ishlaymiz?"
                  />
                  {errors.xabar && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.xabar}
                    </p>
                  )}


                </div>
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-2.5 md:py-4 bg-accent text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all disabled:opacity-50"
                >
                  {formState === "sending" ? "Yuborilmoqda..." : "Yuborish"}
                  <Send size={18} />
                </button>
                {errors.form && (
                  <p className="text-xs text-red-500 text-center flex items-center justify-center gap-2 mt-4 bg-red-500/5 py-2 border border-red-500/10">
                    <AlertCircle size={14} /> {errors.form}
                  </p>
                )}
              </form>

            )}
          </div>
        </div>
      </div>
    </section>
  );
}
