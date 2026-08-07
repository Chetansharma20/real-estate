"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Home, Building2, TrendingUp, Handshake, FileSearch, Map, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    icon: Home,
    title: "Residential Sales",
    desc: "Helping families find their perfect dream home across premium residential projects.",
    href: "/projects?propertyType=APARTMENT",
    image: "/images/hero-slide-3.webp",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    desc: "Strategic advisory for offices, retail, and commercial real estate investments.",
    href: "/projects?propertyType=COMMERCIAL",
    image: "/images/hero-slide-2.webp",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    desc: "Expert guidance to maximise returns on your real estate investment portfolio.",
    href: "/contact",
    image: "/images/service-investment.webp",
  },
  {
    icon: Handshake,
    title: "Developer Liaison",
    desc: "Exclusive channel partner network with top developers across India.",
    href: "/contact",
    image: "/images/hero-slide-1.webp",
  },
  {
    icon: FileSearch,
    title: "Legal & Documentation",
    desc: "End-to-end support with property documentation, RERA compliance and due diligence.",
    href: "/contact",
    image: "/images/service-legal.webp",
  },
  {
    icon: Map,
    title: "Site Visits",
    desc: "Curated site visit experiences with expert advisory at every step of the journey.",
    href: "/projects",
    image: "/images/service-site-visit.webp",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#172033] py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#172033]/50 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-[1px] bg-[#C9A84C]/50" />
            <span className="text-xs uppercase tracking-[0.5em] text-[#C9A84C] font-medium">
              What We Offer
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold max-w-2xl leading-tight">
            Comprehensive Real Estate Solutions
          </h2>
        </motion.div>

        {/* ── DESKTOP layout: list + image panel ── */}
        <div className="hidden md:flex flex-col lg:flex-row gap-12 xl:gap-20 min-h-[600px]">
          {/* Left Side: Services List */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <div className="space-y-2">
              {SERVICES.map((service, idx) => {
                const isActive = activeIndex === idx;
                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="relative cursor-pointer group"
                  >
                    <Link href={service.href} className="block py-5 pr-8">
                      <motion.div
                        className="absolute inset-0 bg-white/[0.03] rounded-lg -z-10"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="flex items-start gap-6 px-4">
                        <div className={`mt-1 transition-colors duration-500 ${isActive ? 'text-[#C9A84C]' : 'text-white/20 group-hover:text-white/40'}`}>
                          <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-serif text-2xl transition-all duration-500 mb-2 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                            {service.title}
                          </h3>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="overflow-hidden"
                              >
                                <p className="text-white/50 text-sm leading-relaxed font-light mb-4">
                                  {service.desc}
                                </p>
                                <div className="flex items-center text-[#C9A84C] text-xs uppercase tracking-widest font-semibold gap-2">
                                  Explore <ArrowRight size={14} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </Link>
                    {idx !== SERVICES.length - 1 && (
                      <div className="h-px w-full bg-white/5 ml-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Image Display */}
          <div className="w-full lg:w-7/12 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#172033]/50 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={SERVICES[activeIndex].image}
                  alt={SERVICES[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/90 via-transparent to-transparent" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-8 left-8 right-8 backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-xl"
                >
                  <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2 font-medium">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                  </p>
                  <h4 className="text-white font-serif text-3xl">
                    {SERVICES[activeIndex].title}
                  </h4>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── MOBILE layout: image cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link href={service.href} className="block group">
                  <div className="relative h-44 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-active:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/90 via-[#172033]/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className="text-[#C9A84C]" strokeWidth={1.5} />
                        <span className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-medium">
                          {service.title}
                        </span>
                      </div>
                      <p className="text-white/60 text-[11px] leading-relaxed line-clamp-2">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

  );
}
