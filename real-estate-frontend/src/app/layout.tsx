import type { Metadata } from "next";
import { DM_Sans, Cormorant } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/ui/page-loader";
import { GoogleAnalytics } from "@/components/ui/google-analytics";

// Cormorant Normal — preloaded (LCP headings, navbar, footer use bold/regular)
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],   // 300 unused in normal, 500 unused
  style: ["normal"],
  display: "swap",
  preload: true,
});

// Cormorant Italic — NOT preloaded (only CTA + about page use it, not LCP-critical)
const cormorantItalic = Cormorant({
  variable: "--font-cormorant-italic",
  subsets: ["latin"],
  weight: ["300", "400"],          // cta uses font-light italic, about uses italic
  style: ["italic"],
  display: "swap",
  preload: false,
});

// DM Sans — all 5 weights kept (font-light/normal/medium/semibold/bold all used site-wide)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bricksage Properties Advisory Pvt. Ltd.",
  description:
    "One of India's fastest growing real estate advisory companies. Discover exquisite residences and bespoke commercial spaces.",
  verification: {
    google: "Wyp0i-clPerynaT_ZKfDsoBWVYwI_Kz73yLy8QKdW9w",
  },
  icons: {
    icon: [
      // Light mode: dark navy logo on white background
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-light.webp",
        href: "/favicon-light.webp",
        type: "image/webp",
      },
      // Dark mode: white logo on dark navy background
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.webp",
        href: "/favicon-dark.webp",
        type: "image/webp",
      },
    ],
    // Fallback shortcut icon for browsers that don't support media queries
    shortcut: "/favicon-light.webp",
    // Apple touch icon — use dark version (solid background looks best on iOS home screen)
    apple: "/favicon-dark.webp",
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${cormorantItalic.variable} h-full antialiased`}>
      <head>
        {/* Preconnect to Cloudinary to load Hero Image faster (Improves LCP) */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Google Analytics Tag (Lazy loaded on interaction to boost performance) */}
        <GoogleAnalytics gaId="G-DRVPKEMSXX" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Bricksage Properties Advisory Pvt. Ltd.",
              "url": "https://bricksage.in",
              "logo": "https://bricksage.in/logo.webp",
              "image": "https://bricksage.in/logo.webp",
              "telephone": "+91-99875-10672",
              "email": "business@bricksage.in",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Office No. 415, Avior Corporate Park, LBS Marg, Opposite Johnson & Johnson",
                "addressLocality": "Mulund West, Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400080",
                "addressCountry": "IN"
              },
              "areaServed": ["Mumbai", "Thane", "Mulund"],
              "openingHours": "Mo-Sa 10:00-19:00",
              "priceRange": "₹₹₹",
              "sameAs": [
                "https://www.instagram.com/bricksage.in",
                "https://www.facebook.com/share/19vDAfmSKq/",
                "https://www.linkedin.com/company/135105219/"
              ],
              "description": "Bricksage Properties Advisory offers end-to-end real estate project advisory across Mumbai & Thane, covering residential and commercial developments."
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        {/* <PageLoader /> - Removed to fix Lighthouse FCP/LCP */}
        {children}
      </body>
    </html>
  );
}
