import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Tulip Thane West | Floor Plan, Pricing & Location",
  description:
    "View Dosti Tulip at Balkum, Thane West. Access real-time price lists, smart 2 BHK floor layouts, construction updates, and zero-brokerage deals.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-tulip" },
  openGraph: {
    title: "Dosti Tulip Thane West | Floor Plan, Pricing & Location",
    description:
      "View Dosti Tulip at Balkum, Thane West. Access real-time price lists, smart 2 BHK floor layouts, construction updates, and zero-brokerage deals.",
    url: "https://bricksage.in/projects/dosti-tulip",
    type: "website",
  },
};

const configurations = [
  {
    type: "Smart 2 BHK Flats",
    detail: "Highly optimized configurations that use continuous space integration to make living areas look larger and elegant.",
  },
  {
    type: "Luxury 2 BHK Premium Units",
    detail: "Features extended bedroom dimensions, dynamic balcony orientations, and world-class ventilation properties.",
  },
];

const locationAdvantages = [
  {
    title: "Strategic Transit Junctions",
    desc: "Seamlessly links commuters to central transport systems, providing smooth travel routes into Mumbai and Navi Mumbai.",
  },
  {
    title: "Educational & Retail Density",
    desc: "Steps away from top-tier primary schools, major retail high streets, hypermarkets, and fine-dining spaces.",
  },
  {
    title: "High Value Appreciation",
    desc: "Balkum’s real estate price trajectory continues to scale upwards, making Dosti Tulip an excellent option for long-term equity growth.",
  },
];

export default function DostiTulipPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Tulip", item: "https://bricksage.in/projects/dosti-tulip" },
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
            <span className="text-[#172033]/80">Dosti Tulip</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Balkum, Thane West · Under Construction
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Tulip Thane West – Smartly Designed Residential Apartments
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Balkum, Thane West, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Welcome to <strong className="text-[#172033] font-semibold">Dosti Tulip</strong>, a master-planned community structure delivering premium yet highly practical residential options in Balkum, Thane West. Designed for families who refuse to compromise on lifestyle and accessibility, Dosti Tulip matches beautiful architecture with extensive health and fitness amenities. Presented through{" "}
                    <Link href="https://bricksage.in/" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      Bricksage Properties Advisory
                    </Link>
                    , this high-potential project comes with complete client transparency and a 0% brokerage charge, protecting your hard-earned investments and granting direct developer deals.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Tulip Floor Layouts, Carpet Measurements &amp; Price Sheets
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Tulip offers a brilliant selection of space arrangements tailored to maximize usable carpet areas while ensuring standard privacy guidelines.
                </p>
                <div className="space-y-4">
                  {configurations.map((c) => (
                    <div key={c.type} className="bg-white rounded-xl border border-[#172033]/8 p-5 shadow-sm">
                      <h3 className="font-serif text-lg font-semibold text-[#172033] mb-1">{c.type}</h3>
                      <p className="text-sm text-[#172033]/65 font-light leading-relaxed">{c.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-[#172033] rounded-xl p-5 text-white/80 text-sm font-light leading-relaxed">
                  <strong className="text-white">Dosti Tulip Cost Breakdown:</strong> Competitive pricing frameworks designed to match young working professionals&apos; budgets. Connect with our real estate specialists to receive downpayment options, official price lists, and early bird token parameters.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Local Connectivity &amp; Investment Viability in Balkum, Thane
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Purchasing a home at Dosti Tulip provides immediate access to{" "}
                  <Link href="https://bricksage.in/projects/apartments-mumbai-thane" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                    Thane West&apos;s robust public infrastructure
                  </Link>
                  :
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
                  Request Dosti Tulip Floor Plans &amp; Cost Structures
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Obtain the official e-brochure, structural layouts, and RERA certificate guidelines directly from our database.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Schedule a Guided Sample Flat Visit with Bricksage Today!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Tulip?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Get pricing, floor plans &amp; 0% brokerage</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Tulip" />
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
