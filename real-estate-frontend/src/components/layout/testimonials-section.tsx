"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    location: "Mumbai",
    review:
      "Bricksage made our home-buying journey completely stress-free. Their team's knowledge of the market and hand-holding at every step is commendable. Highly recommended!",
    rating: 5,
    property: "Skyline Residences, Thane",
  },
  {
    name: "Priya Nair",
    location: "Pune",
    review:
      "I was looking for a commercial space in Pune for over a year. Bricksage understood exactly what I needed and closed the deal in 3 weeks. Exceptional service.",
    rating: 5,
    property: "Commercial Hub, Hinjewadi",
  },
  {
    name: "Amit & Sunita Shah",
    location: "Navi Mumbai",
    review:
      "From shortlisting to possession, the Bricksage team was with us every step of the way. Transparent, professional, and genuinely caring about our needs.",
    rating: 5,
    property: "Harbour View Towers",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0B132B 0%, #1C2541 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-primary/70 font-light">
            — Client Stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mt-3">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="relative bg-white/[0.04] border border-white/10 hover:border-primary/30 p-8 transition-all duration-300 hover:bg-white/[0.07] group"
            >
              <Quote size={32} className="text-primary/20 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed font-light mb-6 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-5">
                <p className="font-serif text-white font-semibold">{t.name}</p>
                <p className="text-white/40 text-xs mt-1">{t.location}</p>
                <p className="text-primary/60 text-xs mt-1 tracking-wider">{t.property}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
