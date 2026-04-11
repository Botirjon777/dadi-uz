import type { Metadata } from "next";
import { Space_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";


const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="uz" className={`${spaceMono.variable} ${outfit.variable} ${pjs.variable} scroll-smooth`}>

      <body className="bg-bg text-text selection:bg-accent selection:text-white">
        <FacebookPixel />
        <div className="noise-overlay" />
        {children}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>

    </html>
  );
}
