import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Olive Shilphata | Apartment Prices & Floor Plans",
  description:
    "View Dosti Olive at Shilphata, Thane. Access detailed cost sheets, 1 & 2 BHK configurations, contemporary lifestyle features, and booking updates.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-olive" },
  openGraph: {
    title: "Dosti Olive Shilphata | Apartment Prices & Floor Plans",
    description:
      "View Dosti Olive at Shilphata, Thane. Access detailed cost sheets, 1 & 2 BHK configurations, contemporary lifestyle features, and booking updates.",
    url: "https://bricksage.in/projects/dosti-olive",
    type: "website",
  },
};

const configurations = [
  {
    type: "Efficient 1 BHK Units",
    detail: "Carefully structured layouts that deliver high-efficiency storage capability and comfortable living spaces.",
  },
  {
    type: "Comfortable 2 BHK Apartments",
    detail: "Spaciously cut floor patterns designed with dedicated utility alcoves, multiple bathrooms, and elegant living lounges.",
  },
];

const locationAdvantages = [
  {
    title: "Strategic Centrality",
    desc: "Positions you perfectly between Thane West, Navi Mumbai, and the industrial manufacturing landscapes of Kalyan.",
  },
  {
    title: "Infrastructure Growth",
    desc: "Heavily supported by upcoming transport infrastructure upgrades that promise excellent equity growth over the next few years.",
  },
  {
    title: "Modern Lifestyle Facilities",
    desc: "Enjoys direct access to extensive clubhouse arenas, swimming pools, fitness centers, and green landscaped walking zones.",
  },
];

export default function DostiOlivePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Olive", item: "https://bricksage.in/projects/dosti-olive" },
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
            <span className="text-[#172033]/80">Dosti Olive</span>
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
                  Dosti Olive Shilphata – Contemporary Living in an Integrated Township
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Shilphata, Thane, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Discover <strong className="text-[#172033] font-semibold">Dosti Olive</strong>, a premium residential phase located inside the thriving master-township at Shilphata, Thane. Engineered to provide home buyers with a serene lifestyle away from core city pollution while keeping urban luxuries close, Dosti Olive offers an unmatched value proposition. Handled by the{" "}
                    <Link href="https://bricksage.in/about" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      professional advisory team
                    </Link>{" "}
                    at Bricksage Properties Advisory with a strict 0% brokerage policy, we ensure you navigate your property acquisition journey smoothly, accessing priority pricing slots and prime unit allocations.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Olive Pricing Matrix, Unit Floor Layouts &amp; Configurations
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Olive features state-of-the-art construction designs, focused on creating bright, cross-ventilated, and highly practical residential units:
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
                  <strong className="text-white">Dosti Olive Price Sheets:</strong> Available with highly flexible construction-linked payment structures. Contact our property advisory panel to receive full price sheets, custom banking loan eligibility reviews, and token day specials.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Economic Corridors &amp; Seamless Connectivity from Shilphata Junction
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Olive puts residents right at the center of massive logistical and industrial growth zones:
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
                  Grab Your Dosti Olive E-Brochure &amp; Pricing Details
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Access genuine project floor plans, unit configuration tables, and official RERA validation summaries.
                </p>
                <p className="text-white/90 text-sm mb-4">
                  Book Your Complimentary Site{" "}
                  <Link
                    href="https://bricksage.in/contact"
                    className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg mt-2 sm:mt-0"
                  >
                    Consultation with Bricksage Today!
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Olive?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Access detailed cost sheets &amp; 1 &amp; 2 BHK plans</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Olive" />
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
