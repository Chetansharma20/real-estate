"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Building2, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    image: "/images/hero-slide-1.png",
    eyebrow: "Residential Collection",
    title1: "Your Personal",
    titleHighlight: "Real Estate",
    title2: "Advisor",
    desc: "Discover unparalleled luxury real estate opportunities across India's most coveted locations.",
    accent: "#C9A84C",
  },
  {
    image: "/images/hero-slide-2.png",
    eyebrow: "Commercial Advisory",
    title1: "Premium",
    titleHighlight: "Commercial",
    title2: "& Investments",
    desc: "Strategic advisory for offices, retail, and commercial real estate investments with high ROI.",
    accent: "#60A5FA",
  },
  {
    image: "/images/hero-slide-3.png",
    eyebrow: "Curated Portfolio",
    title1: "Exclusive",
    titleHighlight: "Luxury",
    title2: "Properties",
    desc: "Curated collection of the most prestigious properties matching your unique lifestyle.",
    accent: "#A78BFA",
  },
];

const STATS = [
  { icon: Award,     value: "35+",   label: "Years of Experience", sub: "Trusted since 1989" },
  { icon: TrendingUp,value: "₹1500Cr+", label: "Deals Closed",  sub: "Total transaction value" },
  { icon: Building2, value: "15000+",  label: "Units Sold",   sub: "Across all projects" },
  { icon: Users,     value: "98%",  label: "Client Satisfaction", sub: "Rated by our clients" },
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 hidden md:block">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-white/10"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
          animate={{ y: [0, -28, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const { scrollYProgress: globalScroll } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = setInterval(() => setActiveIndex((i) => (i + 1) % SLIDES.length), 12000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const goNext = () => setActiveIndex((i) => (i + 1) % SLIDES.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  // Touch/swipe support for mobile
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
  };

  const slide = SLIDES[activeIndex];

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  };
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#172033] flex flex-col"
      style={{ height: "100svh", minHeight: 650 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Background Image Slider ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${activeIndex}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={isMobile ? undefined : { scale: bgScale }}
        >
          <Image
            src={slide.image}
            alt={`Hero slide ${activeIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay gradient - keep blue feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#172033]/75 via-[#172033]/60 to-[#172033]/90" />
          {/* Side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#172033]/40 via-transparent to-[#172033]/40" />
        </motion.div>
      </AnimatePresence>

      {/* ── Particles ── */}
      <Particles />

      {/* ── Corner accents ── */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-amber-400/20 pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-amber-400/20 pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-amber-400/20 pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-amber-400/20 pointer-events-none z-20" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none z-20" />

      {/* ── Slide Navigation Arrows — desktop only ── */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={16} className="text-white/70 group-hover:text-white" />
      </button>
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight size={16} className="text-white/70 group-hover:text-white" />
      </button>

      {/* ── Slide dots ── */}
      <div className="flex absolute bottom-[68px] md:bottom-[80px] left-1/2 -translate-x-1/2 z-30 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-8 h-[3px] bg-amber-400"
                : "w-3 h-[3px] bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* ── Slide number indicator ── */}
      <div className="absolute right-8 md:right-16 bottom-[130px] z-30 hidden md:flex items-center gap-2">
        <span className="font-serif text-2xl text-white/80 tabular-nums">{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="w-8 h-px bg-white/20" />
        <span className="font-serif text-sm text-white/30 tabular-nums">{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 flex-1 flex items-center justify-center pt-28 sm:pt-32 pb-32 md:pb-20 min-h-0">
        <motion.div
          style={isMobile ? undefined : { y: textY, opacity: textOpacity }}
          className="w-full max-w-5xl mx-auto px-6 text-center"
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
                <span className="inline-flex items-center gap-2 text-amber-400 text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase font-medium mb-2 sm:mb-3 drop-shadow-[0_0_8px_rgba(201,168,76,0.6)]">
                  <span className="w-5 sm:w-8 h-px bg-amber-400/40" />
                  Bricksage Properties Advisory
                  <span className="w-5 sm:w-8 h-px bg-amber-400/40" />
                </span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div variants={itemVariants}>
                <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-light mb-4 block">
                  {slide.eyebrow}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-serif font-extrabold leading-[0.92] text-white text-[2rem] sm:text-5xl md:text-7xl lg:text-[6.5rem] drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)]"
              >
                {slide.title1}
              </motion.h1>
              <motion.h1
                variants={itemVariants}
                className="font-serif italic font-extrabold leading-[0.92] text-amber-400 text-[2rem] sm:text-5xl md:text-7xl lg:text-[6.5rem] drop-shadow-[0_0_40px_rgba(201,168,76,0.6)]"
              >
                {slide.titleHighlight}
              </motion.h1>
              <motion.h1
                variants={itemVariants}
                className="font-serif font-bold leading-[0.92] text-white/70 mb-4 text-[1.1rem] sm:text-3xl md:text-5xl lg:text-[3.8rem]"
              >
                {slide.title2}
              </motion.h1>

              {/* Gold rule */}
              <motion.div variants={itemVariants} className="w-full mb-5">
                <div className="relative w-full max-w-xs mx-auto h-px overflow-hidden">
                  <div className="absolute inset-0 bg-white/5" />
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full"
                    style={{ background: "linear-gradient(90deg, transparent 0%, #C9A84C 40%, #F5D78E 60%, #C9A84C 80%, transparent 100%)" }}
                    initial={{ width: "0%", opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-white/60 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8 font-light leading-relaxed tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              >
                {slide.desc}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="w-full px-4 sm:px-0">
                {/* Mobile: stacked full width | Desktop: side by side */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/projects" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="bg-amber-400 text-[#172033] hover:bg-amber-300 rounded-none px-9 h-12 text-[11px] uppercase tracking-[0.25em] font-semibold group transition-all duration-300 shadow-[0_0_30px_rgba(201,168,76,0.35)] w-full"
                    >
                      Explore Projects
                      <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#172033] rounded-none px-9 h-12 text-[11px] uppercase tracking-[0.25em] font-light transition-all duration-300 w-full"
                    >
                      Schedule a Visit
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Stats bar ── pinned to bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <div className="w-full border-t border-white/10 bg-[#172033]/80 backdrop-blur-md">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-5 md:px-8 py-2.5 sm:py-4"
                >
                  <Icon size={13} className="text-amber-400/70 shrink-0 hidden sm:block" strokeWidth={1.5} />
                  <Icon size={11} className="text-amber-400/70 shrink-0 sm:hidden" strokeWidth={1.5} />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white font-semibold leading-tight truncate">
                      {stat.value}
                    </span>
                    <span className="text-[7px] sm:text-[9px] text-white/50 leading-tight truncate">
                      {stat.label}
                    </span>
                    <span className="hidden md:block text-[9px] text-white/30 mt-0.5 truncate">
                      {stat.sub}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Global Scroll Progress Bar ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-amber-400 to-[#F5D78E] origin-left z-50 shadow-[0_0_15px_rgba(201,168,76,0.5)]"
        style={{ scaleX: globalScroll }}
      />
    </section>
  );
}
