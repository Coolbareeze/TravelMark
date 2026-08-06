import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/constants";
import { SITE_URL, travelAgencyJsonLd } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Travel Mark Ltd | Premium UK Travel Agency — Flights, Holidays & Umrah",
    template: "%s | Travel Mark Ltd",
  },
  description:
    "ATOL-protected UK travel agency offering flights, luxury holidays, Umrah & Hajj packages, city breaks and business travel. Personal consultants, best price guarantee, 24/7 support.",
  keywords: [
    "UK travel agency",
    "cheap flights",
    "holiday packages",
    "Umrah packages",
    "Hajj packages",
    "luxury holidays",
    "Birmingham travel agent",
  ],
  authors: [{ name: COMPANY.name }],
  icons: {
    icon: "/images/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#071B33" },
    { media: "(prefers-color-scheme: dark)", color: "#071B33" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent dark-mode flash of unstyled content before React hydrates */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('travelmark-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <JsonLd data={travelAgencyJsonLd()} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
