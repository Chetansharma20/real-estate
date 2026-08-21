"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Building, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How do I choose a reliable real estate advisor in Mumbai & Thane?",
    answer:
      "Look for an advisor with a valid MahaRERA agent registration, a transparent advisory fee structure, and an established track record across micro-markets like Thane West, Mulund, BKC, and South Mumbai. A dedicated property advisor compares multiple projects objectively rather than pushing single-developer inventory.",
  },
  {
    question: "What are the best upcoming residential projects in Mumbai and Thane?",
    answer:
      "Top upcoming residential projects and township developments in Mumbai and Thane are concentrated along key growth corridors like Ghodbunder Road, Kolshet Road, Majiwada in Thane, and central suburbs like Mulund West and BKC. These developments feature integrated lifestyle amenities, metro connectivity, and strong capital appreciation potential.",
  },
  {
    question: "Is investing in an under-construction project in Mumbai safe?",
    answer:
      "Yes, provided the project is MahaRERA-registered with an active RERA number, verified escrow account, clear land title, and construction milestones on schedule. Under-construction flats in Mumbai and Thane typically offer flexible construction-linked payment plans and 15-25% price advantages over ready possession units.",
  },
  {
    question: "What is the typical price range for a 1 BHK or 2 BHK flat in Thane and Mulund?",
    answer:
      "In Thane (Ghodbunder Road, Kolshet, Majiwada), 1 BHK flats in new construction generally range from ₹45 Lakhs to ₹75 Lakhs, while 2 BHK apartments range from ₹75 Lakhs to ₹1.65 Cr+. In Mulund (West & East), 1 BHK new construction flats range from ₹70 Lakhs to ₹1.10 Cr, and premium 2 BHK homes range from ₹1.25 Cr to ₹2.40 Cr depending on the developer and connectivity.",
  },
  {
    question: "What commercial real estate opportunities are available in Mumbai & Mulund West?",
    answer:
      "Mumbai offers high-yield commercial spaces including Grade-A office spaces, boutique corporate suites, and retail storefronts across BKC, Andheri, Powai, and Mulund West (LBS Marg corridor). Commercial office spaces in Mulund West and Thane offer attractive 7-9% gross rental yields with long-term corporate leases.",
  },
];

const MICRO_LOCATIONS = [
  {
    name: "Mulund (West & East)",
    tag: "Central Suburb Hub",
    description:
      "Known as the Prince of Suburbs, Mulund offers new residential projects in Mulund West along LBS Marg and under construction projects in Mulund East near the station with excellent road and rail connectivity.",
    popularKeywords: ["new residential projects in mulund west", "under construction projects in mulund east", "mulund 2 bhk new construction"],
    link: "/projects/apartments-mumbai-thane",
  },
  {
    name: "Thane West (Ghodbunder & Kolshet)",
    tag: "High Growth Corridor",
    description:
      "Featuring upcoming real estate projects in Thane, Kolshet Road townships, and new construction in Ghodbunder Road with modern 1 BHK & 2 BHK lifestyle flats and upcoming metro line 4 & 5 access.",
    popularKeywords: ["upcoming residential projects in thane", "property in kolshet road thane", "new construction in ghodbunder road thane"],
    link: "/projects/apartments-mumbai-thane",
  },
  {
    name: "Majiwada & Vartak Nagar",
    tag: "Luxury & Township Living",
    description:
      "A prime junction with landmark township developments, new launch residential projects in Thane, and Lodha new projects in Majiwada with rapid access to the Eastern Express Highway.",
    popularKeywords: ["lodha new project in thane majiwada", "new construction in thane vartak nagar", "2 bhk flat in thane under construction"],
    link: "/projects/new-launch-projects-mumbai-thane",
  },
  {
    name: "BKC & Central Mumbai",
    tag: "Commercial & Premium Living",
    description:
      "Home to top commercial buildings in Mumbai, luxury high-rises in BKC, and new property projects in Mumbai close to business hubs and the Mumbai Coastal Road.",
    popularKeywords: ["new residential projects in bkc mumbai", "upcoming commercial projects in mumbai", "commercial space for sale in mumbai"],
    link: "/projects/commercial-projects-mumbai-thane",
  },
];

export function SeoHomepageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="bg-white text-[#172033] py-20 px-6 sm:px-10 xl:px-16 border-t border-[#172033]/10">
      <div className="max-w-[1300px] mx-auto space-y-20">
        
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Market Insights & Guide
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#172033] font-bold leading-tight">
              Upcoming Residential & Commercial Projects in Mumbai & Thane
            </h2>
            <p className="text-[#172033]/70 text-base leading-relaxed">
              Mumbai and Thane represent India&apos;s most dynamic real estate corridors. Whether you are searching for 
              <strong> upcoming residential projects in Mumbai</strong>, high-yielding <strong>commercial space for sale in Mumbai</strong>, 
              or <strong>township projects in Mumbai & Thane</strong>, Bricksage provides data-driven advisory and verified MahaRERA project access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-[#F4F6F9] border border-[#172033]/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#172033] text-[#D4AF37] flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#172033]">
                New Residential Projects & Townships
              </h3>
              <p className="text-sm text-[#172033]/70 leading-relaxed">
                Discover <strong>best residential projects in Mumbai</strong> and upcoming integrated townships featuring 
                1 BHK, 2 BHK, and luxury 3 BHK flats with clubhouse amenities, open green zones, and metro access.
              </p>
              <Link
                href="/projects/apartments-mumbai-thane"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-[#172033] transition-colors pt-2"
              >
                Explore Residential Flats <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F6F9] border border-[#172033]/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#172033] text-[#D4AF37] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#172033]">
                Under Construction & New Launches
              </h3>
              <p className="text-sm text-[#172033]/70 leading-relaxed">
                Unlock early-bird pricing on <strong>pre launch residential projects in Mumbai</strong> and 
                <strong> mumbai under construction projects</strong> with flexible construction-linked payment plans.
              </p>
              <Link
                href="/projects/new-launch-projects-mumbai-thane"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-[#172033] transition-colors pt-2"
              >
                View Pre-Launch Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F6F9] border border-[#172033]/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#172033] text-[#D4AF37] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#172033]">
                Commercial Spaces & Corporate Offices
              </h3>
              <p className="text-sm text-[#172033]/70 leading-relaxed">
                Strategically invest in <strong>top commercial buildings in Mumbai</strong> and 
                <strong> commercial office space in Mulund West & Thane</strong> tailored for high corporate rental yields.
              </p>
              <Link
                href="/projects/commercial-projects-mumbai-thane"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-[#172033] transition-colors pt-2"
              >
                Browse Commercial Properties <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
              Prime Locality Corridors
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-bold">
              Featured Growth Hubs: Mulund, Thane & Mumbai
            </h2>
            <p className="text-[#172033]/70 text-sm sm:text-base">
              Explore curated developments across key neighborhoods offering the highest infrastructure growth and rental demand:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MICRO_LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#172033]/10 hover:border-[#D4AF37] transition-all bg-white hover:shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#172033]">{loc.name}</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full">
                    {loc.tag}
                  </span>
                </div>
                <p className="text-sm text-[#172033]/70 leading-relaxed">
                  {loc.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {loc.popularKeywords.map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className="text-[11px] bg-[#F4F6F9] text-[#172033]/80 px-2.5 py-1 rounded-md border border-[#172033]/5 font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href={loc.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#172033] hover:text-[#D4AF37] transition-colors"
                  >
                    Explore Properties in {loc.name.split(" ")[0]} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#172033] text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
              Configuration & Budget Guide
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
              1 BHK & 2 BHK Under Construction Flats in Mumbai & Thane
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Looking for <strong>1 BHK flat in Mumbai low budget</strong> or <strong>2 BHK flats in Thane new construction</strong>? 
              Here is how key configurations stack up for first-time buyers and seasoned real estate investors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-serif font-bold text-[#D4AF37]">
                1 BHK Flats & Compact Homes
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Ideal for young professionals and smart investors. Popular clusters include 
                <strong> 1 BHK flat in Thane west new construction</strong>, Ghodbunder Road, and 
                <strong> 1 BHK new construction in Mulund East</strong>. Offers high rental occupancy and strong liquidity.
              </p>
              <div className="text-xs text-white/50 pt-2">
                Typical Carpet Area: 350 – 480 sq.ft. | Ideal for rental yield & first-time buyers.
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-serif font-bold text-[#D4AF37]">
                2 BHK & 3 BHK Family Residences
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Engineered for growing families seeking modern lifestyle amenities. Explore 
                <strong> 2 bhk flats in mumbai under construction</strong> and 
                <strong> new construction in mulund 2 bhk</strong> offering dedicated work-from-home nooks and panoramic city views.
              </p>
              <div className="text-xs text-white/50 pt-2">
                Typical Carpet Area: 600 – 950 sq.ft. | Clubhouse, swimming pool & dedicated parking.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
              Got Questions?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-bold">
              Frequently Asked Real Estate Questions
            </h2>
            <p className="text-[#172033]/70 text-sm sm:text-base">
              Clear answers to the most common queries regarding upcoming real estate projects in Mumbai and Thane:
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-[#172033]/10 rounded-2xl overflow-hidden transition-all bg-[#F4F6F9]"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#172033] hover:text-[#D4AF37] transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#172033]/50 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#D4AF37]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#172033]/70 leading-relaxed border-t border-[#172033]/5 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
