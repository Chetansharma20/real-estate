"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Building2, TrendingUp, Handshake, FileSearch, Map } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Home,
    title: "Residential Sales",
    desc: "Helping families find their perfect dream home across premium residential projects.",
    href: "/properties?type=FLAT",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    desc: "Strategic advisory for offices, retail, and commercial real estate investments.",
    href: "/properties?type=COMMERCIAL",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    desc: "Expert guidance to maximise returns on your real estate investment portfolio.",
    href: "/contact",
  },
  {
    icon: Handshake,
    title: "Developer Liaison",
    desc: "Exclusive channel partner network with top developers across India.",
    href: "/contact",
  },
  {
    icon: FileSearch,
    title: "Legal & Documentation",
    desc: "End-to-end support with property documentation, RERA compliance and due diligence.",
    href: "/contact",
  },
  {
    icon: Map,
    title: "Site Visits",
    desc: "Curated site visit experiences with expert advisory at every step of the journey.",
    href: "/properties",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F4F6F9] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
              — What We Offer
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0B132B] font-bold mt-3">
              Our Services
            </h2>
          </div>
          <p className="text-[#0B132B]/50 font-light max-w-sm text-sm leading-relaxed">
            Comprehensive real estate solutions tailored to your unique needs — from discovery to possession.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0B132B]/10">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * i }}
              >
                <Link
                  href={service.href}
                  className="block h-full group bg-white hover:bg-[#0B132B] p-10 transition-all duration-500 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-none bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-6 transition-all duration-300">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-[#0B132B] group-hover:text-white font-bold mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#0B132B]/50 group-hover:text-white/50 text-sm leading-relaxed font-light transition-colors duration-300">
                    {service.desc}
                  </p>
                  <div className="w-6 h-px bg-primary mt-6 group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
