import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BUSINESS } from "@/lib/business";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: `${BUSINESS.name} — Fresh Beef, Pork & Boerewors in Ravensmead`,
  description:
    "Order fresh beef, pork, boerewors, biltong and house spice blends online from The Butchery in Ravensmead, Cape Town. Pickup or delivery, confirmed on WhatsApp.",
  keywords: [
    "butchery Cape Town",
    "Ravensmead butchery",
    "boerewors online",
    "biltong Cape Town",
    "beef mince delivery",
    "braai box",
  ],
  openGraph: {
    title: `${BUSINESS.name} — Fresh Beef, Pork & Boerewors`,
    description: BUSINESS.tagline,
    locale: "en_ZA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1210",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className={`${body.variable} ${display.variable}`}>
      <body className="font-body bg-char text-smoke antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
