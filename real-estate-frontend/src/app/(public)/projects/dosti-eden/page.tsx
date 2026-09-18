import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Eden Thane | Price List, Floor Plans & Bookings",
  description:
    "Explore Dosti Eden in Thane. Get verified details on flat price lists, floor plans, configurations, luxury amenities, and current construction status.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-eden" },
  openGraph: {
    title: "Dosti Eden Thane | Price List, Floor Plans & Bookings",
    description:
      "Explore Dosti Eden in Thane. Get verified details on flat price lists, floor plans, configurations, luxury amenities, and current construction status.",
    url: "https://bricksage.in/projects/dosti-eden",
    type: "website",
  },
};

const configurations = [
  {
    type: "1 BHK Luxury Apartments",
    detail: "Ranging from 450 sq. ft. to 480 sq. ft. (Carpet Area).",
    ideal: "Young working professionals and nuclear families.",
  },
  {
    type: "2 BHK Premium Flats",
    detail: "Ranging from 650 sq. ft. to 720 sq. ft. (Carpet Area) with expansive layout options and modern deck spaces.",
    ideal: "Growing families and buyers seeking refined luxury.",
  },
];

const locationAdvantages = [
  {
    title: "Seamless Connectivity",
    desc: "Enjoys direct access to Ghodbunder Road, Eastern Express Highway (EEH), and Pokhran Roads, placing Mumbai Suburbs within effortless driving distance.",
  },
  {
    title: "Upcoming Infrastructure Boost",
    desc: "Located just a brief walk away from the upcoming Metro Line 4 corridor, promising rapid future real estate price appreciation.",
  },
  {
    title: "Social Infrastructure Hub",
    desc: "Situated within a quick 10-to-15-minute radius of elite medical institutions like Jupiter Hospital, top-rated academic facilities like Singhania School, and premium entertainment complexes including Viviana Mall.",
  },
];

export default function DostiEdenPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Eden", item: "https://bricksage.in/projects/dosti-eden" },
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
            <span className="text-[#172033]/80">Dosti Eden</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Thane West · New Launch
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Eden Thane West – Premium New Launch Residential Projects
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Thane West, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Welcome to <strong className="text-[#172033] font-semibold">Dosti Eden</strong>, an ultra-premium{" "}
                    <Link href="https://bricksage.in/projects/new-launch-projects-mumbai-thane" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      upcoming residential development
                    </Link>{" "}
                    strategically positioned in the heart of Thane West. Designed for modern urban families, this high-end project seamlessly blends contemporary architectural styles with absolute structural safety and elite comfort. Whether you are searching for your dream home or looking to make a high-yield real estate investment in the Mumbai Metropolitan Region, Dosti Eden stands out as a top-tier choice. Curated by Bricksage Properties Advisory with a strict 0% brokerage policy, we ensure you secure the absolute best direct-from-developer deals, complete pricing sheets, and smooth inventory booking.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Eden Price List, Floor Plans &amp; Carpet Area Configurations
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Every residential apartment block inside Dosti Eden has been planned meticulously to deliver maximum space optimization, regular cross-ventilation, and natural light entry. Discover the available typologies below:
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
                  <strong className="text-white">Dosti Eden Price Structure:</strong> Base prices start at highly competitive entry levels for the Thane residential zone. Connect with our dedicated advisory desk to access the complete cost breakdown sheets, active token amounts, and special pre-launch payment plans.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Prime Location Advantages &amp; Real Estate Value in Thane West
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Ranking high among the most coveted residential pockets near Mumbai, the micro-market location surrounding Dosti Eden offers unparalleled lifestyle growth:
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
                  Get Exclusive Pre-Launch Offers &amp; Inventory Access
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Download the official Dosti Eden floor plan layouts, full project brochure, and verified RERA disclosure charts.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Request Full Cost Sheet &amp; Schedule Site Visit today!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Eden?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Get verified flat price lists, floor plans &amp; offers</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Eden" />
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
