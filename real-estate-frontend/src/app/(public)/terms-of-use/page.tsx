import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Bricksage Properties Advisory",
  description:
    "Terms and conditions governing your use of the Bricksage Properties Advisory website and services.",
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#172033]/40 font-medium mb-10">
          <Link href="/" className="hover:text-[#172033] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#172033]/70">Terms of Use</span>
        </nav>

        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">Legal</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold">
            Terms of Use
          </h1>
          <p className="text-[#172033]/50 text-sm">Last updated: August 2026</p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <p className="text-[#172033]/70 leading-relaxed">
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Bricksage Properties
            Advisory website (bricksage.in). By using this website, you agree to these Terms.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">1. Nature of Services</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            Bricksage currently acts as a real estate project advisory — we help buyers evaluate and connect with
            residential and commercial projects across Mumbai and Thane. As of the date of these Terms, we do not
            develop, construct, or sell property directly; property transactions are between the buyer and the
            respective project developer/promoter, subject to that project&apos;s own terms and RERA registration.
            Should Bricksage&apos;s role change (for example, becoming a channel partner, promoter, or developer
            for a project), this section will be updated accordingly.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">2. Website Content</h2>
          <ul className="list-disc list-outside ml-5 space-y-3 text-[#172033]/70 leading-relaxed">
            <li>
              Project information, images, pricing, and availability shown on this website are indicative and
              subject to change without notice; please confirm current details with our advisory team before
              making any decision.
            </li>
            <li>
              All content, logos, and design on this website are the property of Bricksage Properties Advisory
              Pvt. Ltd. and may not be copied or reused without permission.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">3. No Investment or Legal Advice</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            Information on this website is for general guidance only and does not constitute legal, financial, or
            investment advice. Buyers are encouraged to independently verify project RERA registration, legal
            documentation, and pricing before making a purchase decision.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">4. Limitation of Liability</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            Bricksage makes reasonable efforts to ensure information on this site is accurate but is not liable
            for any loss arising from reliance on website content, technical errors, or third-party links.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">5. Governing Law</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            These Terms are governed by the laws of India, subject to applicable laws and regulations.
          </p>
        </div>

        {/* Section 6 */}
        <div className="bg-white rounded-2xl border border-[#172033]/8 p-8 mb-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#172033] mb-4">6. Changes to These Terms</h2>
          <p className="text-[#172033]/70 leading-relaxed">
            We may update these Terms from time to time; continued use of the website constitutes acceptance
            of the updated Terms.
          </p>
        </div>

        {/* Bottom Nav */}
        <div className="mt-10 pt-8 border-t border-[#172033]/10 flex flex-wrap gap-6 text-sm text-[#172033]/50">
          <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy →</Link>
          <Link href="/rera-disclosure" className="hover:text-[#D4AF37] transition-colors">RERA Disclosure →</Link>
          <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us →</Link>
        </div>
      </div>
    </div>
  );
}
