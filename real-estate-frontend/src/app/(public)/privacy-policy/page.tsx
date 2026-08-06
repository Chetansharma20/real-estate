import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Bricksage Properties Advisory",
  description:
    "How Bricksage Properties Advisory collects, uses, and protects your personal information when you use our website or services.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#172033]/40 font-medium mb-10">
          <Link href="/" className="hover:text-[#172033] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#172033]/70">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">Legal</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold">
            Privacy Policy
          </h1>
          <p className="text-[#172033]/50 text-sm">Last updated: August 2026</p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <p className="text-[#172033]/70 leading-relaxed">
            Bricksage Properties Advisory Pvt. Ltd. (&quot;Bricksage,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            respects your privacy and is committed to protecting the personal information you share with us.
            This Privacy Policy explains what information we collect, how we use it, and the choices you have,
            in accordance with the Digital Personal Data Protection Act, 2023 and other applicable Indian laws.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">1. Information We Collect</h2>
          <ul className="list-disc list-outside ml-5 space-y-3 text-[#172033]/70 leading-relaxed">
            <li><strong>Contact details you provide</strong> — name, phone number, email address, and city/locality — when you fill an inquiry form, WhatsApp us, or request a consultation.</li>
            <li><strong>Property preferences</strong> you share with our advisors, such as budget, location, and project type.</li>
            <li><strong>Technical data</strong> collected automatically, such as IP address, browser type, device information, and pages visited, via cookies and analytics tools (e.g. Google Analytics).</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc list-outside ml-5 space-y-3 text-[#172033]/70 leading-relaxed">
            <li>To respond to enquiries and connect you with the right advisor or project information.</li>
            <li>To send updates about projects, offers, or market insights, where you&apos;ve consented to receive them.</li>
            <li>To improve our website and services based on how visitors use the site.</li>
            <li>To comply with legal and regulatory obligations, including those under RERA.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">3. Sharing of Information</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            We do not sell your personal information. We may share necessary details with project developers/promoters
            solely to facilitate a property inquiry you have initiated, and with service providers who help us operate
            the website (e.g. hosting, analytics, WhatsApp Business), under confidentiality obligations.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">4. Cookies</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            Our website uses cookies and similar technologies (including Google Analytics) to understand site usage
            and improve user experience. You can control cookies through your browser settings.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">5. Data Security</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            We take reasonable technical and organizational measures to protect your information from unauthorized access,
            loss, or misuse.
          </p>
        </div>

        {/* Section 6 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">6. Your Rights</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            You may request access to, correction of, or deletion of your personal information by contacting us
            at the details below.
          </p>
        </div>

        {/* Section 7 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">7. Contact Us</h2>
          <div className="space-y-2 text-[#172033]/70">
            <p><strong>Email:</strong>{" "}
              <a href="mailto:business@bricksage.in" className="text-[#D4AF37] hover:underline">business@bricksage.in</a>
            </p>
            <p><strong>Phone:</strong>{" "}
              <a href="tel:02234125357" className="text-[#D4AF37] hover:underline">022 34125357</a>
            </p>
            <p><strong>Office:</strong> Office No. 415, Avior Corporate Park, LBS Marg, Opposite Johnson &amp; Johnson, Mulund-West, Mumbai</p>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="mt-10 pt-8 border-t border-[#172033]/10 flex flex-wrap gap-6 text-sm text-[#172033]/50">
          <Link href="/terms-of-use" className="hover:text-[#D4AF37] transition-colors">Terms of Use →</Link>
          <Link href="/rera-disclosure" className="hover:text-[#D4AF37] transition-colors">RERA Disclosure →</Link>
          <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us →</Link>
        </div>
      </div>
    </div>
  );
}
