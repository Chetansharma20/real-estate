import type { Metadata } from "next";
import { DM_Sans, Cormorant } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/ui/page-loader";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bricksage Properties Advisory Pvt. Ltd.",
  description:
    "One of India's fastest growing real estate advisory companies. Discover exquisite residences and bespoke commercial spaces.",
  verification: {
    google: "Wyp0i-clPerynaT_ZKfDsoBWVYwI_Kz73yLy8QKdW9w",
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-DRVPKEMSXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DRVPKEMSXX');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Bricksage Properties Advisory Pvt. Ltd.",
              "url": "https://bricksage.in",
              "logo": "https://bricksage.in/logo.png",
              "telephone": "+919987510672",
              "email": "business@bricksage.in",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Office No. 415, Avior Corporate Park, LBS Marg, Opposite Johnson & Johnson",
                "addressLocality": "Mulund West",
                "addressCity": "Mumbai",
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
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
