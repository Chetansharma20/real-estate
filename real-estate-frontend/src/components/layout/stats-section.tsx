"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    <span className="font-serif text-5xl md:text-6xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [listingsCount, setListingsCount] = useState(17); // Fallback to 17

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/properties?limit=1");
        if (res.data.success) {
          const responseData = res.data.data.data || res.data.data;
          const total = responseData.pagination?.totalItems || responseData.length || 17;
          setListingsCount(total);
        }
      } catch (error) {
        console.error("Failed to fetch listings count for stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statsList = [
    { value: 500, suffix: "+", label: "Happy Families" },
    { value: listingsCount, suffix: "+", label: "Active Listings" },
    { value: 12, suffix: "", label: "Years of Excellence" },
    { value: 25, suffix: "+", label: "Cities Covered" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #0B132B 100%)",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary/70 font-light">
            — Our Track Record
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mt-3">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {statsList.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="flex flex-col items-center justify-center py-12 px-6 bg-white/[0.02] hover:bg-white/[0.06] transition-colors duration-300 group"
            >
              <div className="w-8 h-px bg-primary/40 mb-6 group-hover:w-12 transition-all duration-300" />
              <CountUp target={stat.value} suffix={stat.suffix} isInView={isInView} />
              <p className="text-white/40 text-xs uppercase tracking-[0.25em] mt-3 text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
            Bricksage Properties Advisory in India
          </h3>
          <p className="text-white/40 leading-relaxed font-light text-sm md:text-base">
            Bricksage Properties Advisory is one of the fastest growing real estate consulting companies in India.
            We offer comprehensive real estate solutions to some of the biggest names in the industry and boast
            an enviable track record of retaining clients by delivering unbelievable results, time and again.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
