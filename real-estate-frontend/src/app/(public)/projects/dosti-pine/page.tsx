import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Pine Shilphata Thane | Price List & Floor Layouts",
  description:
    "Check Dosti Pine at Shilphata, Thane. View affordable 1 & 2 BHK residential apartment options, layout plans, pricing charts, and site visit schedules.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-pine" },
  openGraph: {
    title: "Dosti Pine Shilphata Thane | Price List & Floor Layouts",
    description:
      "Check Dosti Pine at Shilphata, Thane. View affordable 1 & 2 BHK residential apartment options, layout plans, pricing charts, and site visit schedules.",
    url: "https://bricksage.in/projects/dosti-pine",
    type: "website",
  },
};

const configurations = [
  {
    type: "Smart 1 BHK Layouts",
    detail: "Optimized for single professionals and couples, featuring an integrated living-dining space, cozy bedroom, and modular bathroom space.",
  },
  {
    type: "Functional 2 BHK Residences",
    detail: "Created for nuclear family demands, incorporating secondary bedrooms, double bathroom configurations, and space-saving kitchen counters.",
  },
];

const locationAdvantages = [
  {
    title: "Rapid Employment Commutes",
    desc: "Located close to the Mahape IT hubs, Dhirubhai Ambani Knowledge City (DAKC), and key industrial corridors of Taloja and Navi Mumbai.",
  },
  {
    title: "Upcoming Road Projects",
    desc: "Benefiting from highway widening initiatives and upcoming local tunnel systems that cut highway travel times in half.",
  },
  {
    title: "Self-Sustained Ecosystem",
    desc: "Residents enjoy immediate access to clubhouse facilities, dedicated children's play gardens, and convenient local markets.",
  },
];

export default function DostiPinePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Pine", item: "https://bricksage.in/projects/dosti-pine" },
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
            <span className="text-[#172033]/80">Dosti Pine</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Shilphata, Thane · Township Phase
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Pine Shilphata – Modern Budget-Friendly Living Spaces
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Shilphata, Thane, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Welcome to <strong className="text-[#172033] font-semibold">Dosti Pine</strong>, an exclusive residential phase situated within the grand township landscape of Shilphata, Thane. Designed explicitly for buyers who seek a modern community lifestyle at an accessible investment point, Dosti Pine delivers smart apartments without compromising on architectural durability or security. Bricksage Properties Advisory brings this asset to you with our trusted{" "}
                    <Link href="https://bricksage.in/" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      0% brokerage assistance
                    </Link>
                    , delivering direct developer pricing, transparent structural charts, and hassle-free booking pathways.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Pine Apartment Typologies, Carpet Area &amp; Pricing Breakdown
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Pine utilizes highly practical spatial engineering concepts, transforming regular apartment footprints into highly functional living environments:
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
                  <strong className="text-white">Dosti Pine Price &amp; Payment Calendars:</strong> Known for offering some of the most competitive price tags in the local Thane district. Reach out to our asset managers to receive full downpayment metrics, banking partners, and structural floor files.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Industrial Hub Proximity &amp; Shilphata Regional Transit Advantages
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Choosing a residence at Dosti Pine grants residents vast strategic transit perks across the regional industrial sectors:
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
                  Get Your Copy of Dosti Pine Floor Plans &amp; Cost Structures
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Download verified project data files,{" "}
                  <Link href="https://bricksage.in/rera-disclosure" className="text-white underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                    RERA clearance documentation
                  </Link>
                  , and active layout pricing templates.
                </p>
                <Link
                  href="https://bricksage.in/contact"
                  className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Schedule Your Personal Site Evaluation Tour with Bricksage Today!
                </Link>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Pine?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">View affordable 1 &amp; 2 BHK apartment options</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Pine" />
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
