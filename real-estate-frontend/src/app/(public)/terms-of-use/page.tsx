import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Bricksage Properties Advisory",
  description: "Terms of Use and conditions for using the Bricksage Properties Advisory Pvt. Ltd. website.",
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border border-[#172033]/10 rounded-2xl shadow-sm p-8 sm:p-12 md:p-16">
        
        <div className="mb-12 border-b border-[#172033]/10 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block mb-2">— Legal</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#172033] font-bold">Terms of Use</h1>
          <p className="text-sm text-[#172033]/50 mt-3 font-light">Last updated: August 2026</p>
        </div>

        <div className="text-[#172033]/70 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            Welcome to Bricksage Properties Advisory Pvt. Ltd. ("Company", "we", "our", "us"). These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Bricksage, concerning your access to and use of the bricksage.in website as well as any other media form related, linked, or otherwise connected thereto (collectively, the "Site").
          </p>
          <p>
            By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">1. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">2. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: 
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">3. Disclaimers & RERA Compliance</h2>
          <p>
            Bricksage acts as a real estate advisory firm. Information provided on the Site regarding properties, pricing, availability, and specifications are for informational purposes only. While we strive to maintain accurate data, we make no representations or warranties of any kind regarding the completeness or accuracy of project details. 
          </p>
          <p>
            Users are advised to independently verify all details, including RERA registration numbers, approvals, and statutory compliances directly with the respective developers before making any purchasing decisions.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">4. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">5. Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and defined following the laws of India. Bricksage Properties Advisory Pvt. Ltd. and yourself irrevocably consent that the courts of Mumbai, Maharashtra shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>
        </div>
      </div>
    </div>
  );
}
