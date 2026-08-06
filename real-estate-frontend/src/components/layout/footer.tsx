import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const SocialIcon = ({ name, size = 18, className = "" }: { name: string, size?: number, className?: string }) => {
  switch (name) {
    case "instagram":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      );
    case "facebook":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      );
    default:
      return null;
  }
};

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const propertyTypes = [
  { name: "Apartments & Flats", href: "/projects?propertyType=APARTMENT" },
  { name: "Commercial Spaces", href: "/projects?propertyType=COMMERCIAL" },
  { name: "Plots & Land", href: "/projects?propertyType=PLOT" },
  { name: "New Launches", href: "/projects?constructionStatus=NEW_LAUNCH" },
];

export function Footer() {
  return (
    <footer className="bg-[#172033] text-white/60 pt-32 pb-12 px-8 sm:px-12 font-sans">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-24">
          
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col">
            <Link href="/" className="flex flex-col leading-none mb-8">
              <span className="font-serif text-3xl font-bold tracking-[0.2em] text-white">BRICKSAGE</span>
              <span className="text-[10px] tracking-[0.3em] text-[#C9A84C]/90 uppercase font-light mt-2">
                Properties
              </span>
            </Link>
            <p className="text-[15px] leading-loose mb-10 text-white/50 font-light pr-4">
              One of India&apos;s fastest growing real estate companies, delivering unparalleled service and results.
            </p>
            <div className="flex gap-4">
              {[
                { name: "instagram", href: "https://www.instagram.com/bricksage.in?igsh=MWphdGZhd2ptdm5zMQ%3D%3D&utm_source=qr" },
                { name: "facebook", href: "https://www.facebook.com/share/19vDAfmSKq/?mibextid=wwXIfr" },
                { name: "linkedin", href: "https://www.linkedin.com/company/135105219/" },
              ].map(({ name, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 hover:bg-white/5"
                >
                  <SocialIcon name={name} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-[13px] uppercase tracking-[0.3em] font-semibold mb-8">Quick Links</h4>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/50 hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-0 h-px bg-[#C9A84C] group-hover:w-6 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white text-[13px] uppercase tracking-[0.3em] font-semibold mb-8">Properties</h4>
            <ul className="space-y-5">
              {propertyTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/50 hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-0 h-px bg-[#C9A84C] group-hover:w-6 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[13px] uppercase tracking-[0.3em] font-semibold mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-[15px] text-white/50 leading-relaxed">
                <MapPin size={18} className="text-[#C9A84C] mt-1 shrink-0" />
                <span className="font-light">Office No. 415, Avior Corporate Park, LBS Marg, Opposite Johnson & Johnson, Mulund-West</span>
              </li>
              <li>
                <a href="tel:02234125357" className="flex items-center gap-4 text-[15px] text-white/50 hover:text-[#C9A84C] transition-colors duration-300">
                  <Phone size={18} className="text-[#C9A84C]" />
                  022 34125357
                </a>
              </li>
              <li>
                <a href="mailto:business@bricksage.in" className="flex items-center gap-4 text-[15px] text-white/50 hover:text-[#C9A84C] transition-colors duration-300">
                  <Mail size={18} className="text-[#C9A84C]" />
                  business@bricksage.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* MahaRERA Mandatory Disclaimer */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <p className="text-[11px] text-white/30 leading-relaxed max-w-4xl">
            This website is only for the purpose of information and Bricksage Properties Advisory Pvt. Ltd. is not responsible for any inaccuracy or discrepancy in respect of the information contained herein. All images, plans, and specifications are indicative and subject to change by the respective project developer/promoter. This is not an offer, invitation, or advertisement addressed to any specific person under RERA. Buyers are advised to verify all project details, including RERA registration, on the official MahaRERA website{" "}
            <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9A84C] transition-colors underline">maharera.maharashtra.gov.in</a>
            {" "}before making any booking or payment.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-white/40">
          <p>© {new Date().getFullYear()} Bricksage Properties. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-[#C9A84C] transition-colors">Terms of Use</Link>
            <Link href="/rera-disclosure" className="hover:text-[#C9A84C] transition-colors">RERA Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
