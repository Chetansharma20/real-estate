"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 overflow-hidden bg-[#F4F6F9]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
            — Let&apos;s Connect
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#0B132B] font-bold mt-4 mb-6 leading-tight">
            Ready to Find Your <br />
            <span className="text-primary italic font-light">Dream Property?</span>
          </h2>
          <p className="text-[#0B132B]/50 max-w-lg mx-auto mb-12 font-light text-base leading-relaxed">
            Our expert advisory team is ready to guide you to the perfect home or investment. Reach out today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/contact">
            <Button size="lg" className="bg-[#0B132B] text-white hover:bg-primary hover:text-[#0B132B] rounded-none px-10 h-14 text-sm uppercase tracking-[0.2em] font-semibold group transition-all duration-300">
              Schedule a Visit
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="bg-transparent border-[#0B132B]/20 text-[#0B132B] hover:bg-[#0B132B] hover:text-white rounded-none px-10 h-14 text-sm uppercase tracking-[0.2em] font-light transition-all duration-300">
              Request a Callback
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[#0B132B]/40"
        >
          <a href="tel:02234125357" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <Phone size={14} className="text-primary" />
            022 34125357
          </a>
          <span className="hidden sm:block w-px h-4 bg-[#0B132B]/10" />
          <a href="mailto:business@bricksage.in" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <Mail size={14} className="text-primary" />
            business@bricksage.in
          </a>
        </motion.div>
      </div>
    </section>
  );
}
