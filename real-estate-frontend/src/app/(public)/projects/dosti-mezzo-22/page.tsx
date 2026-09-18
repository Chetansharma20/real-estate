import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Mezzo 22 Sion Thane | Price, Layout & Offers",
  description:
    "Check pricing and layouts for Dosti Mezzo 22 in Sion/Thane. Find premium 2 & 3 BHK flats for sale with exclusive spot booking discounts through Bricksage.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-mezzo-22" },
  openGraph: {
    title: "Dosti Mezzo 22 Sion Thane | Price, Layout & Offers",
    description:
      "Check pricing and layouts for Dosti Mezzo 22 in Sion/Thane. Find premium 2 & 3 BHK flats for sale with exclusive spot booking discounts through Bricksage.",
    url: "https://bricksage.in/projects/dosti-mezzo-22",
    type: "website",
  },
};

const configurations = [
  {
    type: "2 BHK Luxury Residences",
    detail: "Ranging from premium space layouts designed with smart storage zones and open decks.",
    ideal: "Urban professionals and mid-sized nuclear families.",
  },
  {
    type: "3 BHK Elite Apartments",
    detail: "Offering sprawling carpet areas, large master suites, and unmatched high-floor city views.",
    ideal: "Grand family living and buyers seeking absolute luxury.",
  },
];

const locationAdvantages = [
  {
    title: "Central Transit Access",
    desc: "Enjoys immediate road access to the Eastern Express Highway (EEH), Eastern Freeway, and the Santacruz-Chembur Link Road (SCLR), linking South Mumbai and BKC in minutes.",
  },
  {
    title: "Rapid Public Commute",
    desc: "Positioned within close walking distance of major local railway stations and upcoming metro corridors, ensuring seamless suburban travel.",
  },
  {
    title: "Premium Social Infrastructure",
    desc: "Situated just minutes away from top-tier educational institutions, premium dining clusters, major healthcare systems like Sion Hospital, and high-street shopping hubs.",
  },
];

export default function DostiMezzo22Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Mezzo 22", item: "https://bricksage.in/projects/dosti-mezzo-22" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#172033]/50 font-medium mb-10">
            <Link href="/" className="hover:text-[#172033] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/projects" className="hover:text-[#172033] transition-colors">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#172033]/80">Dosti Mezzo 22</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Sion, Mumbai · Under Construction
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Mezzo 22 Sion Mumbai – Premium Residential Project &amp; Investment Deals
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Sion, Central Mumbai, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Welcome to <strong className="text-[#172033] font-semibold">Dosti Mezzo 22</strong>, an iconic under-construction residential landmark located in the strategic, highly connected hub of Sion, Mumbai. Built for modern lifestyle buyers, this architectural masterpiece brings together premium execution, exceptional high-rise views, and unparalleled comfort. Whether you are looking to purchase a beautiful family home or seeking a high-growth real estate asset in Mumbai, Dosti Mezzo 22 delivers massive potential. Partnering with{" "}
                    <Link href="https://bricksage.in/" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      Bricksage Properties Advisory
                    </Link>{" "}
                    gives you exclusive benefits under our strict 0% brokerage policy, assuring you get competitive price cuts, official payment flexibility, and direct-from-developer inventory booking.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Mezzo 22 Price List, Layouts &amp; Apartment Configurations
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Every single residence inside Dosti Mezzo 22 features efficient planning to optimize square footage, provide ample cross-ventilation, and welcome rich natural sunlight. Review the available residential typologies below:
                </p>
                <div className="space-y-4">
                  {configurations.map((c) => (
                    <div key={c.type} className="bg-white rounded-xl border border-[#172033]/8 p-5 shadow-sm">
                      <h3 className="font-serif text-lg font-semibold text-[#172033] mb-1">{c.type}</h3>
                      <p className="text-sm text-[#172033]/65 font-light leading-relaxed">{c.detail}</p>
                      <p className="mt-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Ideal for: {c.ideal}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-[#172033] rounded-xl p-5 text-white/80 text-sm font-light leading-relaxed">
                  <strong className="text-white">Dosti Mezzo 22 Price Structure:</strong> Base prices match the premier standards of South-Central Mumbai&apos;s residential space. Connect directly with our Bricksage advisory desk to download the verified cost breakdown sheets, construction milestone payment plans, and special token booking discounts.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Location Advantages &amp; Transit Connectivity in Central Mumbai
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Living at Dosti Mezzo 22 places you right at the geographical crossroads of Mumbai, cutting down your daily travel times significantly:
                </p>
                <div className="space-y-4">
                  {locationAdvantages.map((item) => (
                    <div key={item.title} className="flex gap-4 bg-white rounded-xl border border-[#172033]/8 p-5 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#172033] text-sm">{item.title}</p>
                        <p className="text-sm text-[#172033]/65 font-light mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-Launch CTA Banner */}
              <div className="bg-[#172033] rounded-2xl p-8 text-center">
                <h4 className="font-serif text-xl text-white font-semibold mb-3">
                  Unlock Pre-Launch Inventory &amp; Sample Flat Tours
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Access the authorized Dosti Mezzo 22 floor layout plans, digital project brochures, and up-to-date RERA registration filings.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Request Complete Pricing &amp; Book a Free Site Visit Today!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Mezzo 22?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Get exclusive pricing, floor plans &amp; booking offers</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Mezzo 22" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
