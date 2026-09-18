import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Willow Balkum Thane | Price, Floor Plans & Booking",
  description:
    "Explore Dosti Willow in Balkum, Thane West. Get verified floor plans, 2 & 3 BHK configuration price sheets, lifestyle amenities, and site visit bookings.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-willow" },
  openGraph: {
    title: "Dosti Willow Balkum Thane | Price, Floor Plans & Booking",
    description:
      "Explore Dosti Willow in Balkum, Thane West. Get verified floor plans, 2 & 3 BHK configuration price sheets, lifestyle amenities, and site visit bookings.",
    url: "https://bricksage.in/projects/dosti-willow",
    type: "website",
  },
};

const configurations = [
  {
    type: "Premium 2 BHK Apartments",
    link: "https://bricksage.in/projects/dosti-mezzo-22",
    detail: "Masterfully crafted space profiles that feature modern kitchen layouts, elegant living lounges, and attached balconies overlooking city views.",
  },
  {
    type: "Spacious 3 BHK Homes",
    detail: "Sprawling carpet area structures built with premium bathroom fittings, dedicated dining alcoves, and privacy-focused bedroom layouts.",
  },
];

const locationAdvantages = [
  {
    title: "Excellent Road Links",
    desc: "Positioned with instant bypass routes linking to the Mumbai-Nashik Highway, Ghodbunder Road, and the Eastern Express Highway.",
  },
  {
    title: "Proximity to Commercial Spaces",
    desc: "Located very close to corporate business parks, reducing commuting times to key working hubs across Thane and Navi Mumbai.",
  },
  {
    title: "Lifestyle Conveniences",
    desc: "Surrounded by premier institutional infrastructure including CP Goenka International School, Viviana Mall, and trusted multi-specialty medical emergency setups.",
  },
];

export default function DostiWillowPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Willow", item: "https://bricksage.in/projects/dosti-willow" },
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
            <span className="text-[#172033]/80">Dosti Willow</span>
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
                  Dosti Willow Balkum Thane – Elegant Homes at Prime Real Estate Hubs
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Balkum, Thane West, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Introducing <strong className="text-[#172033] font-semibold">Dosti Willow</strong>, a pristine cluster of luxury residential towers tucked inside the highly sought-after neighborhood of Balkum, Thane West. This under-construction marvel is engineered to fulfill your desires for an opulent lifestyle, combining global design standards with world-class residential amenities. At{" "}
                    <Link href="https://bricksage.in/" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      Bricksage Properties Advisory
                    </Link>
                    , we feature Dosti Willow with our signature 0% brokerage offer, allowing home seekers to connect directly with inventory selections, structural breakdowns, and verified financial packages without hidden consultation overheads.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Willow Unit Configurations, Layout Blueprints &amp; Pricing
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Willow focuses deeply on space efficiency and expansive layout architecture, giving growing families plenty of breathing room. The unit configurations include:
                </p>
                <div className="space-y-4">
                  {configurations.map((c) => (
                    <div key={c.type} className="bg-white rounded-xl border border-[#172033]/8 p-5 shadow-sm">
                      <h3 className="font-serif text-lg font-semibold text-[#172033] mb-1">
                        {c.link ? (
                          <Link href={c.link} className="underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                            {c.type}
                          </Link>
                        ) : (
                          c.type
                        )}
                      </h3>
                      <p className="text-sm text-[#172033]/65 font-light leading-relaxed">{c.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-[#172033] rounded-xl p-5 text-white/80 text-sm font-light leading-relaxed">
                  <strong className="text-white">Dosti Willow Pricing &amp; Cost Sheets:</strong> Strategically priced to cater to upper-middle-class luxury demands in Thane West. Reach out to our customer advisory executives to request tailored home loan assistance, step-by-step cost sheet segmentations, and booking day discounts.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Balkum Infrastructure Advantages &amp; Rapid Connectivity
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Balkum has evolved into a premier residential micro-market within Thane West, offering spectacular public infrastructure benefits:
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
                  Download Dosti Willow Brochure &amp; Allocation Charts
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Get instant access to genuine floor layouts, inventory booking status reports, and verified MahaRERA compliance disclosures.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Connect with Bricksage Today to Plan Your Exclusive Site Tour!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Willow?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Get verified pricing, floor plans &amp; booking offers</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Willow" />
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
