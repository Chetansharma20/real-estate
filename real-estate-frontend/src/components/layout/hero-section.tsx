"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SLIDES = [
  {
    eyebrow: "Residential Collection",
    title1: "Your Personal",
    titleHighlight: "Real Estate",
    title2: "Advisor",
    desc: "Discover unparalleled luxury real estate opportunities across India's most coveted locations.",
  },
  {
    eyebrow: "Commercial Advisory",
    title1: "Premium",
    titleHighlight: "Commercial",
    title2: "& Investments",
    desc: "Strategic advisory for offices, retail, and commercial real estate investments with high ROI.",
  },
  {
    eyebrow: "Curated Portfolio",
    title1: "Exclusive",
    titleHighlight: "Global",
    title2: "& Properties",
    desc: "Curated collection of the most prestigious properties matching your unique lifestyle.",
  },
];

const STATS = [
  { value: "500+", label: "Properties Sold" },
  { value: "12+", label: "Years of Trust" },
  { value: "₹2000Cr+", label: "Deals Closed" },
  { value: "98%", label: "Client Satisfaction" },
];

function Particles() {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.8,
    duration: Math.random() * 10 + 14,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-amber-400/15"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
          animate={{ y: [0, -28, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function GoldRule({ animate }: { animate: boolean }) {
  return (
    <div className="relative w-full max-w-xs mx-auto h-px overflow-hidden">
      <div className="absolute inset-0 bg-white/5" />
      <motion.div
        className="absolute inset-y-0 left-0 h-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A84C 40%, #F5D78E 60%, #C9A84C 80%, transparent 100%)",
        }}
        initial={{ width: "0%", opacity: 0 }}
        animate={animate ? { width: "100%", opacity: 1 } : { width: "0%", opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-y-0 w-16 blur-sm"
        style={{ background: "linear-gradient(90deg, transparent, #F5D78E, transparent)" }}
        animate={animate ? { x: ["-60px", "calc(100vw + 60px)"] } : {}}
        transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
      />
    </div>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const { scrollYProgress: globalScroll } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setActiveIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeIndex];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0B132B] flex flex-col"
      style={{ height: "100svh", minHeight: 680 }}
    >
      {/* ── Non-layout decorative layers ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 50% at 50% 42%, rgba(201,168,76,0.06) 0%, transparent 70%)",
      }} />
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-amber-400/15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-amber-400/15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-amber-400/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-amber-400/15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />
      <Particles />

      {/* ── Slide dots — absolute, below navbar ── */}
      <div className="absolute top-[76px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[2px] rounded-full transition-all duration-500 ${i === activeIndex ? "w-8 bg-amber-400" : "w-2.5 bg-white/20"
              }`}
          />
        ))}
      </div>

      {/* ── Main content — flex-1, centred, with top offset for navbar ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-16 pb-4 min-h-0">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="w-full max-w-4xl mx-auto px-6 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              {/* Brand label */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-3 text-amber-400 text-[10px] tracking-[0.5em] uppercase font-medium mb-3 drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]">
                  <span className="w-6 h-px bg-amber-400/35" />
                  Bricksage Properties Advisory Pvt. Ltd.
                  <span className="w-6 h-px bg-amber-400/35" />
                </span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div variants={itemVariants}>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/25 font-light mb-4 block">
                  {slide.eyebrow}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-serif font-bold leading-[0.92] text-white text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[6.5rem]"
              >
                {slide.title1}
              </motion.h1>
              <motion.h1
                variants={itemVariants}
                className="font-serif italic font-light leading-[0.92] text-amber-400 text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[6.5rem]"
              >
                {slide.titleHighlight}
              </motion.h1>
              <motion.h1
                variants={itemVariants}
                className="font-serif font-semibold leading-[0.92] text-white/45 mb-5 text-[1.4rem] sm:text-4xl md:text-5xl lg:text-[3.8rem]"
              >
                {slide.title2}
              </motion.h1>

              {/* Gold rule */}
              <motion.div variants={itemVariants} className="w-full mb-5">
                <GoldRule animate={mounted} />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-white/38 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed tracking-wide"
              >
                {slide.desc}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Link href="/properties">
                  <Button
                    size="lg"
                    className="bg-amber-400 text-[#0B132B] hover:bg-amber-300 rounded-none px-9 h-11 text-[11px] uppercase tracking-[0.25em] font-semibold group transition-all duration-300 shadow-[0_0_24px_rgba(201,168,76,0.2)]"
                  >
                    Explore Projects
                    <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white/75 hover:bg-white hover:text-[#0B132B] rounded-none px-9 h-11 text-[11px] uppercase tracking-[0.25em] font-light transition-all duration-300"
                  >
                    Schedule a Visit
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Bottom zone — stats bar + scroll, naturally below content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center shrink-0"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {/* Stats bar */}
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.07] divide-x divide-white/[0.07] bg-white/[0.025] backdrop-blur-sm">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-3.5 px-4 text-center">
                <span className="font-serif text-lg md:text-xl font-bold text-amber-400 leading-none">
                  {stat.value}
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/28 mt-1.5 font-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-1 pt-2.5 pb-3 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/18">Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={13} className="text-amber-400/30" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Global Scroll Progress Bar (Bottom of screen) ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-[#F5D78E] origin-left z-50 shadow-[0_0_15px_rgba(201,168,76,0.5)]"
        style={{ scaleX: globalScroll }}
      />
    </section>
  );
}
