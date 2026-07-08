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
  { name: "Projects", href: "/properties" },
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
      className="fixed top-0 left-0 right-0 z-50 bg-[#172033] shadow-lg shadow-black/30 py-2"
    >
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-opacity duration-300 group-hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Bricksage Properties Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="flex flex-col justify-center transition-colors duration-300 group-hover:text-primary">
            <span className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.1em] text-white">
              BRICKSAGE PROPERTIES
            </span>
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] text-white/70 uppercase font-light">
              Advisory Pvt. Ltd.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+91XXXXXXXXXX"
            className="flex items-center gap-2 text-xs text-white/50 hover:text-primary transition-colors duration-300"
          >
            <Phone size={12} />
            <span className="tracking-wider">+91 XX XXXX XXXX</span>
          </a>
          <Separator orientation="vertical" className="h-4 bg-white/10" />
          <Button className="bg-primary text-[#172033] hover:bg-primary/90 rounded-none px-5 h-9 text-xs uppercase tracking-widest font-semibold">
            Enquire Now
          </Button>
        </div>

        {/* Mobile Menu — Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:text-primary hover:bg-white/10"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </Button>
            }
          />
          <SheetContent
            side="right"
            className="bg-[#0B132B] border-l border-white/10 w-[280px] sm:w-[320px] flex flex-col pt-16 px-8"
          >
            <Link href="/" className="flex flex-col leading-none mb-10" onClick={() => setOpen(false)}>
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">BRICKSAGE</span>
              <span className="text-[9px] tracking-[0.3em] text-primary/70 uppercase font-light mt-1">
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
                      className="text-lg font-serif text-white/70 hover:text-primary transition-colors duration-300 block"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </AnimatePresence>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-6 pb-4 space-y-3">
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors"
              >
                <Phone size={13} className="text-primary" />
                +91 XX XXXX XXXX
              </a>
              <Button
                className="w-full bg-primary text-[#0B132B] hover:bg-primary/90 rounded-none h-11 text-xs uppercase tracking-widest font-semibold"
                onClick={() => setOpen(false)}
              >
                Enquire Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
