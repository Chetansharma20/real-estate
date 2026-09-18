import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Greater Thane Kalwa | Price List, Floor Plan & Booking",
  description:
    "Discover Dosti Greater Thane in Kalwa. Access 1 & 2 BHK flat pricing charts, mega township layouts, modern amenities, and site tour bookings.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-greater-thane" },
  openGraph: {
    title: "Dosti Greater Thane Kalwa | Price List, Floor Plan & Booking",
    description:
      "Discover Dosti Greater Thane in Kalwa. Access 1 & 2 BHK flat pricing charts, mega township layouts, modern amenities, and site tour bookings.",
    url: "https://bricksage.in/projects/dosti-greater-thane",
    type: "website",
  },
};

const configurations = [
  {
    type: "Smart 1 BHK Town Homes",
    detail: "Designed with sharp modern spatial layouts, making them the ultimate option for working couples and smart real estate portfolios.",
  },
  {
    type: "Comfortable 2 BHK Family Flats",
    detail: "Incorporates master suites, double bathrooms, spacious dining zones, and wide windows capturing panoramic hill views.",
  },
];

const locationAdvantages = [
  {
    title: "Direct Highway Linkages",
    desc: "Positioned beautifully to provide quick transit to the Eastern Express Highway, Navi Mumbai lanes, and key central industrial zones.",
  },
  {
    title: "Self-Contained Township Perks",
    desc: "Features grand multi-acre clubhouses, international standard retail shopping walkways, standard fitness arenas, and an in-complex ICSE school.",
  },
  {
    title: "Massive Equity Appreciation",
    desc: "Kalwa's transition into an institutional residential hub guarantees heavy real estate value growth for early investors.",
  },
];

export default function DostiGreaterThanePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Greater Thane", item: "https://bricksage.in/projects/dosti-greater-thane" },
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
            <span className="text-[#172033]/80">Dosti Greater Thane</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Kalwa, Thane · Mega Township
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Greater Thane Kalwa – The Ultimate Mega Township Experience
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Kalwa, Thane, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Step into <strong className="text-[#172033] font-semibold">Dosti Greater Thane</strong>, a revolutionary mega township development located along the highly profitable and rapidly growing belt of Kalwa, Thane. This self-sustained mega project is crafted to provide a true city-within-a-city lifestyle, offering thousands of{" "}
                    <Link href="https://bricksage.in/projects" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      families premium housing
                    </Link>{" "}
                    options surrounded by spectacular natural landscapes and global amenities. Brought to you by Bricksage Properties Advisory under our strict 0% brokerage framework, we connect you directly with premier higher-floor developer inventories and verified project pricing charts.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Greater Thane Configurations, Carpet Matrix &amp; Pricing Options
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Greater Thane features state-of-the-art building techniques that maximize space, stability, and everyday comfort across all layouts:
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
                  <strong className="text-white">Dosti Greater Thane Cost Matrix:</strong> Highly economical entry points with structural step-by-step payment paths. Contact our financial advisors to view the official cost breakdown sheet, bank approval lists, and downpayment sub-plans.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Strategic Location Perks &amp; Industrial Connectivity in Kalwa-Thane
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  The geographic placement of Dosti Greater Thane gives residents unbelievable advantages when it comes to central connectivity:
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
                  Get Your Dosti Greater Thane Master Layout &amp; Cost Analysis
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Download the complete digital project presentation, official unit floor layouts, and verified RERA certificate files.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Plan Your Free Township Inspection Tour with Bricksage Today!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Greater Thane?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Access 1 &amp; 2 BHK flat pricing charts &amp; layouts</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Greater Thane" />
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
