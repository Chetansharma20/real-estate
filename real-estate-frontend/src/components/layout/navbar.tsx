"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = !mounted || pathname === "/";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm"
    >
      {/* Announcement Bar / Ticker */}
      <div className="bg-[#172033] w-full text-white py-1.5 overflow-hidden flex items-center border-b border-[#D4AF37]/20">
        <motion.div
          className="whitespace-nowrap flex items-center gap-8 text-[10px] sm:text-xs font-semibold uppercase tracking-widest"
          animate={{ x: ["100vw", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          <span className="text-[#D4AF37]">🚨 New Project Launch in City Center</span>
          <span>•</span>
          <span>Bookings Open Now!</span>
          <span>•</span>
          <span className="text-[#D4AF37]">Special Pre-Launch Offers Available</span>
          <span>•</span>
          <span>Contact us today for exclusive access</span>
        </motion.div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-white border-b border-[#172033]/5 py-2">
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-opacity duration-300 group-hover:opacity-80">
              <Image
                src="/logo.png"
                alt="Bricksage Properties Logo"
                fill
                sizes="56px"
                className="object-contain object-left invert"
                priority
              />
            </div>
            <div className="flex flex-col justify-center transition-colors duration-300 group-hover:text-primary">
              <span className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.1em] text-[#172033]">
                BRICKSAGE PROPERTIES
              </span>
            {/* <span className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] text-[#172033]/80 uppercase font-bold">
               
              </span> */}
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-[#172033]/70 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap font-medium"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/918080419573?text=Hi%20there!%20I'm%20interested%20in%20your%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#172033]/70 hover:text-[#25D366] transition-colors duration-300 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="text-[#25D366]">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              <span className="tracking-wider">+91 80 8041 9573</span>
            </a>
            <Separator orientation="vertical" className="h-4 bg-[#172033]/20" />
            <Link href="/contact" className="inline-flex items-center justify-center bg-primary text-[#172033] hover:bg-primary/90 rounded-none px-5 h-9 text-xs uppercase tracking-widest font-semibold">
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu — Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-[#172033] hover:text-primary hover:bg-[#172033]/5"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="bg-white border-l border-[#172033]/10 w-[280px] sm:w-[320px] flex flex-col pt-16 px-8"
            >
              <Link href="/" className="flex flex-col leading-none mb-10" onClick={() => setOpen(false)}>
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#172033]">BRICKSAGE</span>
                <span className="text-[9px] tracking-[0.3em] text-primary uppercase font-bold mt-1">
                  Properties Advisory
                </span>
              </Link>

              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, i) => (
                  <AnimatePresence key={link.name}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: open ? 1 : 0, x: open ? 0 : 20 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        className="text-lg font-serif text-[#172033]/70 hover:text-primary transition-colors duration-300 block font-medium"
                        onClick={() => setOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </nav>

              <div className="border-t border-[#172033]/10 pt-6 pb-4 space-y-3">
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hi%20there!%20I'm%20interested%20in%20your%20properties."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#172033]/70 hover:text-[#25D366] transition-colors font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-[#25D366]">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  +91 XX XXXX XXXX
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full bg-primary text-[#172033] hover:bg-primary/90 rounded-none h-11 text-xs uppercase tracking-widest font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Enquire Now
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
