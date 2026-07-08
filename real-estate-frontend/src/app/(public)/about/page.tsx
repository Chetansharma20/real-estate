"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";

export default function AboutPage() {
  const VALUES = [
    {
      title: "Excellence",
      description: "We set the highest benchmarks in property advisory, ensuring a premium service experience for commercial and luxury residential clients.",
      icon: Trophy,
    },
    {
      title: "Transparency",
      description: "Honest evaluations, transparent legal routing, and clear base price structures without hidden advisory charges.",
      icon: ShieldCheck,
    },
    {
      title: "Bespoke Curation",
      description: "Tailor-made properties matches aligned to your exact location, budget, and tag criteria (sea view, city view, ready-to-move).",
      icon: Sparkles,
    },
  ];

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">— Our Agency</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0B132B] font-bold">About Bricksage</h1>
          <p className="text-[#0B132B]/50 font-light text-sm sm:text-base">
            Bricksage Properties Advisory Pvt. Ltd. is one of India's fastest-growing luxury real estate consulting companies.
          </p>
        </div>

        {/* Brand Mission Card */}
        <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-sm overflow-hidden p-8 sm:p-12 relative">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B132B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="space-y-6 relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B]">Our Advisory Philosophy</h2>
            <p className="text-[#0B132B]/70 leading-relaxed font-light text-sm sm:text-base">
              We offer comprehensive real estate solutions to some of the biggest names in the industry and boast an enviable track record of retaining clients by delivering exceptional results, time and again.
            </p>
            <p className="text-[#0B132B]/70 leading-relaxed font-light text-sm sm:text-base">
              Whether you are an investor looking for premium IT Office Space in Bandra-Kurla Complex, or a family seeking a luxury Sea-View Apartment in Mumbai, our certified advisors provide strategic market insights, legal diligence routing, and structured deal closures to maximize your portfolio value.
            </p>
          </div>
        </Card>

        {/* Company Core Values */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B]">Core Values</h2>
            <p className="text-[#0B132B]/50 text-xs sm:text-sm mt-1">The principles that guide our advisory consultants daily</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <Card key={i} className="border border-[#0B132B]/10 rounded-2xl bg-white p-6 shadow-sm hover:border-[#D4AF37]/50 hover:shadow-md transition-all space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base text-[#0B132B]">{val.title}</h3>
                    <p className="text-xs text-[#0B132B]/60 leading-relaxed font-light">{val.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
