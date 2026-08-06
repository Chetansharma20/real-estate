import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "RERA Disclosure | Bricksage Properties Advisory",
  description:
    "RERA registration details for Bricksage Properties Advisory and the residential & commercial projects listed on our website.",
  robots: { index: true, follow: true },
};

async function getProjects() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/projects?limit=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.projects || [];
  } catch (err) {
    console.error("Failed to fetch projects for RERA page", err);
    return [];
  }
}

async function getSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/settings`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Failed to fetch settings for RERA page", err);
    return null;
  }
}

export default async function ReraDisclosurePage() {
  const [allProjects, settings] = await Promise.all([
    getProjects(),
    getSettings()
  ]);
  
  // Only show projects that actually have RERA info added
  const reraProjects = allProjects.filter((p: any) => p.reraId || p.reraQrCode);

  const agentReraNumber = settings?.agentReraNumber || "[Not Available]";
  const agentReraValidUpTo = settings?.agentReraValidUpTo || "[Not Available]";

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#172033]/40 font-medium mb-10">
          <Link href="/" className="hover:text-[#172033] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#172033]/70">RERA Disclosure</span>
        </nav>

        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">Compliance</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold">
            RERA Disclosure
          </h1>
          <p className="text-[#172033]/50 text-sm">
            Real Estate (Regulation and Development) Act, 2016 — Maharashtra (MahaRERA)
          </p>
        </div>

        {/* Section 1 — Agent Registration */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">
            1. Real Estate Agent Registration
          </h2>
          <p className="text-[#172033]/70 leading-relaxed mb-6">
            Bricksage Properties Advisory Pvt. Ltd. is a registered real estate agent under the
            Real Estate (Regulation and Development) Act, 2016.
          </p>
          <div className="bg-[#172033]/3 rounded-xl p-5 space-y-3 border border-[#172033]/8">
            <div className="flex items-start gap-3">
              <span className="text-[#172033]/50 text-sm font-semibold w-52 shrink-0">MahaRERA Agent Reg. No.:</span>
              <span className="text-[#172033] font-bold text-sm">{agentReraNumber}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#172033]/50 text-sm font-semibold w-52 shrink-0">Valid up to:</span>
              <span className="text-[#172033] font-bold text-sm">{agentReraValidUpTo}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#172033]/50 text-sm font-semibold w-52 shrink-0">Verify at:</span>
              <a
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline text-sm flex items-center gap-1 font-medium"
              >
                maharera.maharashtra.gov.in
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Section 2 — Project-wise RERA */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-2">
            2. Project-wise RERA Registration
          </h2>
          <p className="text-[#172033]/60 text-sm mb-6 leading-relaxed">
            The table below lists all projects currently featured on this website, along with their
            MahaRERA registration numbers.
          </p>

          {reraProjects.length === 0 ? (
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
              <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-amber-800 text-sm leading-relaxed">
                Project-specific MahaRERA registration numbers will be displayed here once confirmed.
                For immediate verification, please request the MahaRERA certificate from our advisory
                team during your consultation.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#172033]/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#172033] text-white">
                    <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">Project Name</th>
                    <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">Location</th>
                    <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">RERA Details</th>
                  </tr>
                </thead>
                <tbody>
                  {reraProjects.map((project: any) => (
                    <tr key={project.id} className="border-t border-[#172033]/8 hover:bg-[#172033]/5 transition-colors">
                      <td className="px-5 py-4 align-top">
                        <Link href={`/projects/${project.id}`} className="font-bold text-[#172033] hover:text-[#D4AF37] transition-colors">
                          {project.title}
                        </Link>
                        {project.township && (
                          <div className="text-xs text-[#172033]/50 mt-1">
                            Part of {project.township.name}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 align-top text-[#172033]/70">
                        {project.locality || project.township?.locality || "Mumbai"}, {project.city || project.township?.city || "Maharashtra"}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          {project.reraQrCode && (
                            <div className="relative w-16 h-16 shrink-0 border border-[#172033]/10 rounded bg-white p-1">
                              <Image 
                                src={project.reraQrCode.startsWith('http') ? project.reraQrCode : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${project.reraQrCode}`} 
                                alt={`RERA QR Code for ${project.title}`} 
                                fill 
                                className="object-contain" 
                              />
                            </div>
                          )}
                          <div className="flex flex-col justify-center">
                            {project.reraId ? (
                              <span className="font-bold text-[#172033] text-sm tracking-wide bg-[#D4AF37]/10 px-2 py-1 rounded inline-block w-fit">
                                {project.reraId}
                              </span>
                            ) : (
                              <span className="text-[#172033]/40 text-xs italic">ID pending</span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 3 — Mandatory Disclaimer */}
        <div className="bg-[#172033] rounded-2xl p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-white mb-4">
            3. Mandatory Disclaimer
          </h2>
          <p className="text-white/70 leading-relaxed text-sm">
            This website is only for the purpose of information and Bricksage Properties Advisory Pvt. Ltd.
            is not responsible for any inaccuracy or discrepancy in respect of the information contained herein.
            All images, plans, and specifications are indicative and subject to change by the respective project
            developer/promoter. This is not an offer, invitation, or advertisement addressed to any specific
            person under RERA. Buyers are advised to verify all project details, including RERA registration, on
            the official MahaRERA website before making any booking or payment.
          </p>
          <a
            href="https://maharera.maharashtra.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-[#D4AF37] hover:underline text-sm font-medium"
          >
            Verify on MahaRERA Official Website
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Bottom Nav */}
        <div className="mt-10 pt-8 border-t border-[#172033]/10 flex flex-wrap gap-6 text-sm text-[#172033]/50">
          <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy →</Link>
          <Link href="/terms-of-use" className="hover:text-[#D4AF37] transition-colors">Terms of Use →</Link>
          <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us →</Link>
        </div>
      </div>
    </div>
  );
}
