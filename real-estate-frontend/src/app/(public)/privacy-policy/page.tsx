import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bricksage Properties Advisory",
  description: "Privacy Policy and data collection terms for Bricksage Properties Advisory Pvt. Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border border-[#172033]/10 rounded-2xl shadow-sm p-8 sm:p-12 md:p-16">
        
        <div className="mb-12 border-b border-[#172033]/10 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block mb-2">— Legal</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#172033] font-bold">Privacy Policy</h1>
          <p className="text-sm text-[#172033]/50 mt-3 font-light">Last updated: August 2026</p>
        </div>

        <div className="text-[#172033]/70 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            At Bricksage Properties Advisory Pvt. Ltd. ("Bricksage", "we", "us", or "our"), we are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our website and engaging with our real estate advisory services.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about our projects, request a consultation, or contact us. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>Contact Information:</strong> Full name, phone number, email address, and residential address.</li>
            <li><strong>Requirement Details:</strong> Property preferences, budget constraints, and consultation requests.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device identifiers, and website usage statistics collected automatically through cookies.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">2. How We Use Your Information</h2>
          <p>
            We use the personal information collected via our website for various business purposes, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>To respond to your inquiries and fulfill your consultation requests.</li>
            <li>To send you administrative information, project updates, and marketing communications (you can opt-out at any time).</li>
            <li>To improve our website functionality, user experience, and service offerings.</li>
            <li>To comply with legal obligations, including RERA guidelines and real estate regulations in India.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">3. Data Sharing and Disclosure</h2>
          <p>
            We respect your privacy and do not sell or rent your personal information to third parties. We may share your information only in the following situations:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>With Trusted Partners:</strong> We may share data with partnered real estate developers solely to facilitate your property purchase or site visits.</li>
            <li><strong>For Legal Reasons:</strong> If required by law, subpoena, or regulatory bodies (e.g., MahaRERA).</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">4. Data Security</h2>
          <p>
            We implement reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h2 className="text-2xl mt-10 mb-4 font-serif font-bold text-[#172033]">5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at <strong className="text-[#172033]">business@bricksage.in</strong> or by post to:
          </p>
          <p className="mt-4 font-medium text-[#172033]">
            Bricksage Properties Advisory Pvt. Ltd.<br />
            Office No. 415, Avior Corporate Park<br />
            LBS Marg, Opposite Johnson & Johnson<br />
            Mulund-West, Mumbai
          </p>
        </div>
      </div>
    </div>
  );
}
