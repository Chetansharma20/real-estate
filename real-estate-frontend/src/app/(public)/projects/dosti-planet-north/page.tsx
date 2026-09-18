import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Planet North Shilphata | 1 & 2 BHK Flat Bookings",
  description:
    "Explore Dosti Planet North in Shilphata. Get continuous updates on 1 & 2 BHK flat prices, sample flat tours, carpet area layouts, and project location.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-planet-north" },
  openGraph: {
    title: "Dosti Planet North Shilphata | 1 & 2 BHK Flat Bookings",
    description:
      "Explore Dosti Planet North in Shilphata. Get continuous updates on 1 & 2 BHK flat prices, sample flat tours, carpet area layouts, and project location.",
    url: "https://bricksage.in/projects/dosti-planet-north",
    type: "website",
  },
};

const configurations = [
  {
    type: "1 BHK Smart Flats",
    detail: "Ranging from compact, highly efficient space designs.",
    ideal: "First-time home buyers, working professionals, and smart investors.",
  },
  {
    type: "2 BHK Grand Homes",
    detail: "Designed with multiple bathrooms, spacious master bedrooms, and scenic deck spaces.",
    ideal: "Growing families seeking premium lifestyle infrastructure.",
  },
];

const locationAdvantages = [
  {
    title: "Triple City Connectivity",
    desc: "Positioned at the critical junction connecting Thane, Navi Mumbai, and Kalyan-Dombivli seamlessly via the Kalyan-Shilphata Road.",
  },
  {
    title: "Massive Infrastructure Upgrades",
    desc: "Enjoys strong value gains driven by the upcoming Airoli-Katai Tunnel Road, Multimodal Corridor project, and the new Metro line route.",
  },
  {
    title: "Township Conveniences",
    desc: "Built with direct in-complex access to emergency medical setups, international retail storefronts, and premium standard schools right around the corner.",
  },
];

export default function DostiPlanetNorthPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Planet North", item: "https://bricksage.in/projects/dosti-planet-north" },
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
            <span className="text-[#172033]/80">Dosti Planet North</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Shilphata, Thane · Township Living
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Planet North Shilphata – Affordable Luxury 1 &amp; 2 BHK Flats for Sale
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Shilphata, Thane, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Discover <strong className="text-[#172033] font-semibold">Dosti Planet North</strong>, a massive premium township project strategically situated along the rapidly growing corridor of Shilphata, Thane. If you are looking to secure a beautiful home at an affordable entry price point or seeking a high-yield real estate investment, this development stands out as a prime destination. Dosti Planet North combines vast open green spaces with ultra-modern smart lifestyle amenities. Backed by{" "}
                    <Link href="https://bricksage.in/about" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      Bricksage Properties Advisory’s verified 0% brokerage structure
                    </Link>
                    , we guide you straight to the absolute best deals, direct inventory allocations, and customized payment solutions.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Planet North Price Structure, Floor Plans &amp; Configurations
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Planned with modern planning ethics, the spaces inside Dosti Planet North maximize every square inch of your carpet layout while ensuring absolute privacy and ventilation:
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
                  <strong className="text-white">Dosti Planet North Price List:</strong> Positioned perfectly within the affordable luxury segment of the Thane-Navi Mumbai corridor. Speak with our Bricksage property expert to view the clear budget breakdown sheet, active cash discounts, and bank loan eligibility benefits.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Growth Potential &amp; Hyper-Local Infrastructure in Shilphata
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Shilphata is recognized as one of the fastest-growing real estate markets in the Mumbai Metropolitan Region (MMR), making it a massive hub for appreciation:
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
                  Secure Premium Higher-Floor Inventory Today
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Download the verified Dosti Planet North master layout blueprint, unit carpet area measurements, and active RERA disclosure approvals.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Get the Complete Cost Sheet &amp; Arrange Your Free Site Visit Now!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Planet North?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Get continuous updates on 1 &amp; 2 BHK prices &amp; layouts</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Planet North" />
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
