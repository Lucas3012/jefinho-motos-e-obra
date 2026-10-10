import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: `${SITE.name} — Conserto de Motos, Peças e Material de Construção`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "conserto de moto",
    "oficina de motos",
    "mecânico de moto",
    "peças para moto",
    "material de construção",
    "cimento",
    "brita",
    "areia",
    "revisão de moto",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.siteUrl,
    siteName: SITE.name,
    title: `${SITE.name} — Conserto de Motos, Peças e Material de Construção`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlow.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
        >
          Pular para o conteúdo
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
