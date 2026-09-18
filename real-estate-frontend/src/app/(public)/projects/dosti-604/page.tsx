import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti 604 Thane West | Prices, Floor Layouts & Bookings",
  description:
    "View Dosti 604 in Thane West. Access real-time price sheets, premium apartment layouts, modern lifestyle specifications, and site tour details.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-604" },
  openGraph: {
    title: "Dosti 604 Thane West | Prices, Floor Layouts & Bookings",
    description:
      "View Dosti 604 in Thane West. Access real-time price sheets, premium apartment layouts, modern lifestyle specifications, and site tour details.",
    url: "https://bricksage.in/projects/dosti-604",
    type: "website",
  },
};

const configurations = [
  {
    type: "Premium 2 BHK Units",
    detail: "Designed with modern layouts, large master bedrooms, smart modular kitchen provisions, and deep living lounges.",
  },
  {
    type: "Luxury 3 BHK Residences",
    detail: "Offering extensive carpet layouts, separate utility rooms, high-quality fittings, and balconies capturing open panoramic views.",
  },
];

const locationAdvantages = [
  {
    title: "Flawless Highway Ingress",
    desc: "Moments away from Ghodbunder Road and the Eastern Express Highway, making business travel exceptionally simple.",
  },
  {
    title: "Rich Local Amenities",
    desc: "Bordered by top-tier international board schools, high-end fine dining strips, retail malls, and specialty clinical hospitals.",
  },
  {
    title: "High Real Estate Return",
    desc: "Thane West's continuous infrastructure expansion keeps your property valuation growing safely every year.",
  },
];

export default function Dosti604Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti 604", item: "https://bricksage.in/projects/dosti-604" },
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
            <span className="text-[#172033]/80">Dosti 604</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Thane West · Under Construction
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti 604 Thane West – Elite Residential Spaces for Modern City Living
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Thane West, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Welcome to <strong className="text-[#172033] font-semibold">Dosti 604</strong>, a specialized premium{" "}
                    <Link href="https://bricksage.in/projects/plots-mumbai-thane" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      residential development
                    </Link>{" "}
                    designed to offer extreme privacy and modern standard living frameworks in Thane West. Built for home seekers who value quiet living inside an active urban neighborhood, Dosti 604 delivers strong design metrics, durable construction quality, and an abundance of recreational spaces. Bricksage Properties Advisory guides you through this landmark project with a 0% brokerage mandate, offering absolute clarity on true developer costs, pricing tiers, and premium unit availability.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti 604 Unit Configurations, Floor Plans &amp; Cost Structures
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  The apartments inside Dosti 604 feature rich engineering standards that turn typical floor space into majestic, highly functional environments:
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
                  <strong className="text-white">Dosti 604 Budget Plans:</strong> Available with structured construction-linked plans to ensure easy payment stages. Get in touch with our team to obtain the official pricing sheet, interest rates, and token discounts.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Thane West Location Perks &amp; Seamless Modern Network Travel
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Living at Dosti 604 gives your family instant connection paths across the entire Mumbai Metropolitan Region:
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
                  Get Your Dosti 604 Digital Presentation &amp; Price Breakdown
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Download verified structural floor maps, pricing lists, and active RERA declaration paperwork.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Request Your Personal Sample Flat Tour with Bricksage Now!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti 604?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Access real-time price sheets &amp; premium layouts</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti 604" />
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
