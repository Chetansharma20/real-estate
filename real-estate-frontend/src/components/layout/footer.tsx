import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const propertyTypes = [
  { name: "Luxury Apartments", href: "/properties?type=luxury" },
  { name: "Residential Plots", href: "/properties?type=plots" },
  { name: "Commercial Spaces", href: "/properties?type=commercial" },
  { name: "Villas & Bungalows", href: "/properties?type=villas" },
  { name: "New Launches", href: "/properties?status=new-launch" },
];

export function Footer() {
  return (
    <footer className="bg-[#070D1E] text-white/60 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">BRICKSAGE</span>
              <span className="text-[9px] tracking-[0.3em] text-primary/70 uppercase font-light mt-1">
                Properties Advisory Pvt. Ltd.
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-white/40 font-light">
              One of India&apos;s fastest growing real estate advisory companies, delivering unparalleled service and results.
            </p>
            <div className="flex gap-3">
              {[
                { name: "Instagram", href: "https://www.instagram.com/bricksage.in?igsh=MWphdGZhd2ptdm5zMQ%3D%3D&utm_source=qr" },
                { name: "Facebook", href: "https://www.facebook.com/share/19vDAfmSKq/?mibextid=wwXIfr" },
                { name: "LinkedIn", href: "https://www.linkedin.com/company/135105219/" },
              ].map(({ name, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-xs border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-6">Properties</h4>
            <ul className="space-y-3">
              {propertyTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/40">
                <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="font-light">Office No. 415, Avior Corporate Park, LBS Marg, Opposite Johnson & Johnson, Mulund-West</span>
              </li>
              <li>
                <a href="tel:02234125357" className="flex items-center gap-3 text-sm text-white/40 hover:text-primary transition-colors duration-300">
                  <Phone size={14} className="text-primary" />
                  022 34125357
                </a>
              </li>
              <li>
                <a href="mailto:business@bricksage.in" className="flex items-center gap-3 text-sm text-white/40 hover:text-primary transition-colors duration-300">
                  <Mail size={14} className="text-primary" />
                  business@bricksage.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>© {new Date().getFullYear()} Bricksage Properties Advisory Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/40 transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white/40 transition-colors">RERA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
