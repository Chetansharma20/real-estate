"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";
import { api } from "@/lib/api";

function CountUp({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target <= 0) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span className="text-5xl md:text-6xl font-medium bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
      {count.toLocaleString()}<span className="text-[#C9A84C] font-semibold">{suffix}</span>
    </span>
  );
}

export function StatsSection({ initialCount = 17 }: { initialCount?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [listingsCount, setListingsCount] = useState(initialCount);



  const statsList = [
    { value: 35, suffix: "+", label: "Years of Experience" },
    { value: 1500, suffix: "Cr+", label: "Deals Closed" },
    { value: 15000, suffix: "+", label: "Units Sold" },
    { value: listingsCount, suffix: "+", label: "Properties Sold" },
  ];

  return (
    <>
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 px-6 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 50%, #152243 0%, #172033 100%)",
      }}
    >
      {/* ── Background texture & Glows ── */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H17.5v-2.5H20V13h2.5v2.5H25V18h-2.5v2.5H20z' fill='%23FFFFFF' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: "30px 30px"
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-8 h-[1px] bg-[#C9A84C]/50" />
            <span className="text-xs uppercase tracking-[0.5em] text-[#C9A84C] font-medium">
              Our Track Record
            </span>
            <span className="w-8 h-[1px] bg-[#C9A84C]/50" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold drop-shadow-md">
            Numbers That Speak
          </h2>
        </motion.div>

        {/* ── Glassmorphism Stats Grid ── */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl">
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
            {statsList.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="flex flex-col items-center justify-center py-8 sm:py-14 px-4 sm:px-6 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="w-8 h-[2px] bg-[#C9A84C]/40 mb-6 group-hover:w-16 group-hover:bg-[#C9A84C] transition-all duration-500" />
                <CountUp target={stat.value} suffix={stat.suffix} isInView={isInView} />
                <p className="text-white/50 text-[11px] uppercase tracking-[0.3em] mt-5 text-center font-medium group-hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>

    {/* ── About Text Section ── */}
    <section className="bg-white py-16 sm:py-24 lg:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#172033] font-bold mb-4 sm:mb-6 tracking-wide">
            Bricksage Properties Advisory in India
          </h3>
          <p className="text-[#172033]/60 leading-[1.8] font-light text-sm md:text-[15px]">
            Bricksage Properties Advisory is one of the fastest growing real estate consulting companies in India.
            We offer comprehensive real estate solutions to some of the biggest names in the industry and boast
            an enviable track record of retaining clients by delivering unbelievable results, time and again.
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
}
