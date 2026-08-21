import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, MapPin, TrendingUp, Layers, CheckCircle } from "lucide-react";

interface CategorySeoGuidesProps {
  categorySlug?: string;
}

export function CategorySeoGuides({ categorySlug }: CategorySeoGuidesProps) {
  if (categorySlug === "commercial-projects-mumbai-thane") {
    return (
      <div className="mt-16 space-y-12 bg-white rounded-3xl p-8 sm:p-12 border border-[#172033]/10">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Commercial Investment Guide
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-bold">
            Commercial Real Estate & Office Spaces in Mumbai & Thane
          </h2>
          <p className="text-[#172033]/70 text-sm sm:text-base leading-relaxed">
            The demand for Grade-A <strong>commercial space for sale in Mumbai</strong> and high-yielding 
            <strong> commercial office space in Mulund West</strong> and Thane has grown exponentially. 
            Corporate occupiers, IT firms, and medical/retail businesses are actively acquiring premium spaces across 
            <strong> top commercial buildings in Mumbai</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#F4F6F9] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#172033] text-[#D4AF37] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#172033]">
              Commercial Office Space in Mulund West
            </h3>
            <p className="text-xs text-[#172033]/70 leading-relaxed">
              Mulund West along the LBS Marg corridor has emerged as a premier boutique corporate hub, offering 
              modern office suites with double-height lobbies, EV charging, and direct connectivity to Thane and Eastern Freeway.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F4F6F9] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#172033] text-[#D4AF37] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#172033]">
              Commercial Real Estate Mumbai Yields
            </h3>
            <p className="text-xs text-[#172033]/70 leading-relaxed">
              Prime <strong>commercial places in Mumbai</strong> offer institutional-grade rental yields between 7.5% and 9.5%, 
              significantly outpacing residential rental returns with 5 to 9-year corporate lease locks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F4F6F9] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#172033] text-[#D4AF37] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#172033]">
              Upcoming Commercial Projects in Mumbai
            </h3>
            <p className="text-xs text-[#172033]/70 leading-relaxed">
              From flagship <strong>commercial building Mumbai</strong> developments in BKC to tech hubs in Navi Mumbai & Thane, 
              Bricksage assists with pre-leased assets, self-use offices, and high-street retail storefronts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (categorySlug === "new-launch-projects-mumbai-thane") {
    return (
      <div className="mt-16 space-y-12 bg-white rounded-3xl p-8 sm:p-12 border border-[#172033]/10">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Pre-Launch & Early Investor Advantage
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-bold">
            New Project Launch in Mumbai & Pre-Launch Projects in Thane
          </h2>
          <p className="text-[#172033]/70 text-sm sm:text-base leading-relaxed">
            Booking during a <strong>mumbai new project launch</strong> or investing in verified 
            <strong> pre launch residential projects in Mumbai & Thane</strong> unlocks early-stage pricing, 
            exclusive floor selections, and high appreciation as the project progresses from excavation to structural completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#172033]">
              Upcoming Township Projects in Mumbai & Thane
            </h3>
            <p className="text-sm text-[#172033]/70 leading-relaxed">
              Modern buyers increasingly prefer <strong>upcoming township projects in Mumbai</strong> that integrate 
              schools, retail promenades, sports complexes, and acres of open greens. From <strong>new residential projects in BKC Mumbai</strong> 
              to mega-townships in Thane Majiwada & Kolshet, our advisory team brings first-access allocation.
            </p>
            <ul className="space-y-2 text-xs text-[#172033]/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                Zero brokerage on developer direct new launches
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                100% MahaRERA title verification & milestone auditing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                Custom payment schedule assistance (10:90 / 20:80 CLP schemes)
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#F4F6F9] space-y-4 border border-[#172033]/5">
            <h3 className="font-serif text-lg font-bold text-[#172033]">
              Key Corridors for New Launches
            </h3>
            <div className="space-y-3 text-xs text-[#172033]/70">
              <p>
                <strong>Thane Corridors:</strong> Explore <strong>new launch residential projects in Thane</strong> along Ghodbunder Road, Pokhran Road, and Kolshet Road.
              </p>
              <p>
                <strong>Central Mumbai Suburbs:</strong> High-growth <strong>new launch projects Mulund</strong> and Vikhroli connecting Eastern Express Highway.
              </p>
              <p>
                <strong>Mumbai Metro Corridors:</strong> <strong>Upcoming flats in Mumbai</strong> situated within 500m of operational and upcoming Metro lines 2, 4, and 7.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (categorySlug === "plots-mumbai-thane") {
    return (
      <div className="mt-16 space-y-12 bg-white rounded-3xl p-8 sm:p-12 border border-[#172033]/10">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Land & Villa Investment
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-bold">
            Residential Plot Near Mumbai & Villa Land Developments
          </h2>
          <p className="text-[#172033]/70 text-sm sm:text-base leading-relaxed">
            Investing in a <strong>residential plot near Mumbai</strong> offers complete ownership freedom, rapid capital appreciation, 
            and bespoke villa living. From branded plotted developments like <strong>Lodha villa plots Thane</strong> to gated layout schemes 
            near Kalyan, Shahapur, and Karjat, land remains the highest-growth asset class.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-12 bg-white rounded-3xl p-8 sm:p-12 border border-[#172033]/10">
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
          Buyer Guide & Market Insights
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-bold">
          Apartments & Flats for Sale in Mumbai, Thane & Mulund
        </h2>
        <p className="text-[#172033]/70 text-sm sm:text-base leading-relaxed">
          Whether you are searching for a <strong>1 BHK flat in Mumbai low budget</strong>, looking at 
          <strong> 2 BHK flats in Mumbai under construction</strong>, or exploring <strong>apartments for sale in Thane</strong>, 
          finding the right balance of location, developer reputation, and pricing is paramount.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-[#F4F6F9] space-y-4 border border-[#172033]/5">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl font-bold text-[#172033]">
              Mulund West & East Developments
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#172033]/70 leading-relaxed">
            Mulund continues to be one of the most sought-after residential destinations with a strong mix of 
            <strong> new residential projects in Mulund West</strong> along LBS Marg and 
            <strong> under construction projects in Mulund East</strong> near Mithagar and the railway station.
          </p>
          <div className="space-y-2 text-xs text-[#172033]/80">
            <p>
              • <strong>Configurations:</strong> <strong>1 BHK flat in Mulund East under construction</strong> and 
              spacious <strong>mulund 2 bhk new construction</strong> units with lifestyle clubhouses.
            </p>
            <p>
              • <strong>Key Keywords:</strong> <em>best residential projects in mulund west, new construction in mulund 1 bhk & 2 bhk, residential projects for sale mulund</em>.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#F4F6F9] space-y-4 border border-[#172033]/5">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl font-bold text-[#172033]">
              Thane West, Ghodbunder & Kolshet Corridors
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#172033]/70 leading-relaxed">
            Thane features exceptional residential variety, from <strong>new construction in Ghodbunder Road Thane</strong> (including compact 1 RK & 1 BHK flats) 
            to luxury high-rises along <strong>property in Kolshet Road Thane</strong> and <strong>Lodha new project in Thane Majiwada</strong>.
          </p>
          <div className="space-y-2 text-xs text-[#172033]/80">
            <p>
              • <strong>Budget & Configurations:</strong> <strong>1 BHK flat in Thane under construction</strong> (₹48L - ₹75L) and 
              <strong> 2 BHK flats in Thane new construction</strong> (₹80L - ₹1.75 Cr).
            </p>
            <p>
              • <strong>Key Localities:</strong> <em>new construction in thane vartak nagar, under construction projects in thane near station, new ready possession flats in thane west</em>.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#172033]/10 pt-8 space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#172033]">
          Under Construction vs Ready Possession Flats in Mumbai & Thane
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-[#172033]/70">
          <div className="space-y-2 bg-[#F4F6F9] p-5 rounded-xl">
            <h4 className="font-bold text-[#172033]">Under Construction Flats</h4>
            <p>
              Opt for <strong>mumbai under construction projects</strong> or <strong>under construction flats in Thane</strong> to enjoy staggered 
              construction-linked payments, lower entry prices, and capital appreciation before hand-over.
            </p>
          </div>
          <div className="space-y-2 bg-[#F4F6F9] p-5 rounded-xl">
            <h4 className="font-bold text-[#172033]">New Ready Possession Flats</h4>
            <p>
              Choose <strong>new ready possession flats in Thane West</strong> and Mumbai if you want immediate tax benefits on home loans, 
              zero GST charges, and immediate rental income or move-in capability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
