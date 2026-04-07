import type { Metadata } from "next";
import { Space_Mono, Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pjs = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dadi.uz — Kuchli Ideya. Professional Video.",
  description:
    "Marketing agentligi va video studio. Oddiy reklama emas — portlovchi ideyalar va professional syomka.",
  openGraph: {
    title: "Dadi.uz",
    description: "Kuchli Ideya. Professional Video.",
    url: "https://dadi.uz",
    siteName: "Dadi.uz",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${spaceMono.variable} ${syne.variable} ${pjs.variable} scroll-smooth`}>
      <body className="bg-bg text-text selection:bg-accent selection:text-white">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
