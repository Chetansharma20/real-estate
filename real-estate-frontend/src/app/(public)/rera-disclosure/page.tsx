import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RERA Disclosure | Bricksage Properties Advisory",
  description: "RERA registration details and compliance disclosures for real estate projects marketed by Bricksage Properties Advisory Pvt. Ltd.",
};

export default function ReraDisclosurePage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border border-[#172033]/10 rounded-2xl shadow-sm p-8 sm:p-12 md:p-16">
        
        <div className="mb-12 border-b border-[#172033]/10 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block mb-2">— Compliance</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#172033] font-bold">RERA Disclosure</h1>
          <p className="text-sm text-[#172033]/50 mt-3 font-light">Real Estate (Regulation and Development) Act Compliance</p>
        </div>

        <div className="text-[#172033]/70 text-sm sm:text-base leading-relaxed space-y-4">
          <h2 className="text-2xl mb-4 font-serif font-bold text-[#172033]">Statutory Disclaimer</h2>
          <p>
            Bricksage Properties Advisory Pvt. Ltd. acts as a real estate advisory firm. The information provided on this website is for general informational purposes only and does not constitute a legal offering, an invitation to offer, or an offer for sale. 
          </p>
          <p>
            All imagery, floor plans, configurations, and amenities shown are indicative and subject to change by the respective developers as per the approvals from competent authorities. 
          </p>
          <p>
            In compliance with the Real Estate (Regulation and Development) Act, 2016 (RERA) and rules made thereunder, users are strongly advised to independently verify all project details, including the MahaRERA registration number, before making any purchasing decisions. Bricksage shall not be liable for any discrepancies or damages arising from reliance on the information provided on this portal.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">Project-wise RERA Details</h2>
          <p className="mb-6">
            Below is the list of MahaRERA registration numbers for the projects currently being marketed by Bricksage Properties Advisory Pvt. Ltd.:
          </p>

          {/* Placeholder for RERA Numbers */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-6">
            <h3 className="text-lg font-bold text-yellow-800 m-0 mb-2">Registration Details Pending</h3>
            <p className="text-yellow-700 m-0 text-sm">
              The project-specific MahaRERA registration numbers will be updated here shortly. For immediate verification, please request the MahaRERA certificate from our advisory team during your consultation.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
