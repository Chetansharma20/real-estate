import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import ProjectInquirySection from "@/components/property/project-inquiry-section";

export const metadata: Metadata = {
  title: "Dosti Nest Balkum Thane | Floor Plans, Price & Bookings",
  description:
    "Explore Dosti Nest at Balkum, Thane West. Find verified pricing, smart 1 BHK space configurations, modern amenities, and zero-brokerage booking deals.",
  alternates: { canonical: "https://bricksage.in/projects/dosti-nest" },
  openGraph: {
    title: "Dosti Nest Balkum Thane | Floor Plans, Price & Bookings",
    description:
      "Explore Dosti Nest at Balkum, Thane West. Find verified pricing, smart 1 BHK space configurations, modern amenities, and zero-brokerage booking deals.",
    url: "https://bricksage.in/projects/dosti-nest",
    type: "website",
  },
};

const configurations = [
  {
    type: "Smart 1 BHK Configurations",
    detail: "Masterfully engineered units that maximize room utility, providing elegant living areas, dedicated kitchens, and premium bathroom blocks.",
  },
  {
    type: "Luxury 1 BHK Premium Spaces",
    detail: "Features extended layout lines, higher window designs for maximum daylight, and superior ventilating pathways.",
  },
];

const locationAdvantages = [
  {
    title: "Flawless Highway Intersects",
    desc: "Offers swift road access to LBS Marg, Ghodbunder Road, and the central Mumbai travel highways.",
  },
  {
    title: "Premium Neighborhood Value",
    desc: "Balkum is highly celebrated for its peaceful living environments, clean surroundings, and world-class township projects.",
  },
  {
    title: "Everyday Necessities Near You",
    desc: "Located within walking distance of high-end international schools, massive shopping malls, and reputable emergency healthcare setups.",
  },
];

export default function DostiNestPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://bricksage.in/projects" },
      { "@type": "ListItem", position: 3, name: "Dosti Nest", item: "https://bricksage.in/projects/dosti-nest" },
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
            <span className="text-[#172033]/80">Dosti Nest</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Header */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
                  Balkum, Thane West · Smart Apartments
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15] mb-5">
                  Dosti Nest Balkum Thane – Premium Smart Apartments for Modern Buyers
                </h1>
                <div className="flex items-center gap-2 text-[#172033]/60 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Balkum, Thane West, Maharashtra</span>
                </div>
                <div className="space-y-4 text-[#172033]/70 leading-relaxed font-light text-base">
                  <p>
                    Welcome to <strong className="text-[#172033] font-semibold">Dosti Nest</strong>, an outstanding residential haven offering beautifully designed smart living options in the{" "}
                    <Link href="https://bricksage.in/projects" className="text-[#172033] font-semibold underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors">
                      premium zone of Balkum, Thane West
                    </Link>
                    . Tailored meticulously for first-time homebuyers and smart property investors, Dosti Nest redefines compact luxury by combining efficient homes with premium township perks. Presented by Bricksage Properties Advisory with a client-first 0% brokerage promise, we offer complete pricing transparency and direct inventory access.
                  </p>
                </div>
              </div>

              {/* Price List & Configurations */}
              <div>
                <h2 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Dosti Nest Configurations, Carpet Areas &amp; Detailed Price Sheets
                </h2>
                <p className="text-[#172033]/70 font-light mb-6">
                  Dosti Nest uses clever space-saving engineering to optimize everyday luxury, making small configurations feel incredibly vast and comfortable:
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
                  <strong className="text-white">Dosti Nest Price List:</strong> Set at an attractive budget tier to make owning a home in Thane West highly accessible. Talk to our investment experts to get a complete breakdown of raw costs, booking timelines, and custom financing solutions.
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h3 className="font-serif text-2xl text-[#172033] font-semibold mb-6 pb-3 border-b border-[#172033]/10">
                  Balkum&apos;s Premium Social Infrastructure &amp; Investment Highlights
                </h3>
                <p className="text-[#172033]/70 font-light mb-6">
                  Choosing Dosti Nest puts your lifestyle close to Thane’s most happening social and commercial hotspots:
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
                  Download Authorized Dosti Nest Brochures &amp; Unit Layouts
                </h4>
                <p className="text-white/70 font-light text-sm mb-6 max-w-xl mx-auto">
                  Access true floor blueprints, carpet area confirmations, and up-to-date MahaRERA registration files.
                </p>
                <p className="text-white/90 text-sm mb-4">
                  Request Full Pricing Sheets and Book a{" "}
                  <Link
                    href="https://bricksage.in/contact"
                    className="inline-block bg-[#D4AF37] hover:bg-[#C5A030] text-[#172033] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg mt-2 sm:mt-0"
                  >
                    Guided Site Visit with Bricksage!
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#172033]/8 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-white">Interested in Dosti Nest?</h3>
                    <p className="text-xs text-white/60 mt-1 font-light">Find verified pricing &amp; 1 BHK space configurations</p>
                  </div>
                  <div className="p-6">
                    <ProjectInquirySection projectTitle="Dosti Nest" />
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
