"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    location: "Mumbai",
    review: "Bricksage made our home-buying journey completely stress-free. Their team's knowledge of the market and hand-holding at every step is commendable. Highly recommended!",
    rating: 5,
    property: "Skyline Residences, Thane",
  },
  {
    name: "Priya Nair",
    location: "Pune",
    review: "I was looking for a commercial space in Pune for over a year. Bricksage understood exactly what I needed and closed the deal in 3 weeks. Exceptional service.",
    rating: 5,
    property: "Commercial Hub, Hinjewadi",
  },
  {
    name: "Amit & Sunita Shah",
    location: "Navi Mumbai",
    review: "From shortlisting to possession, the Bricksage team was with us every step of the way. Transparent, professional, and genuinely caring about our needs.",
    rating: 5,
    property: "Harbour View Towers",
  },
  {
    name: "Karan Desai",
    location: "South Mumbai",
    review: "Their portfolio of luxury properties is unmatched. We found our dream sea-facing apartment within days. The negotiation process was handled with utmost professionalism.",
    rating: 5,
    property: "Oceanfront Premium",
  },
  {
    name: "Neha Sharma",
    location: "Bengaluru",
    review: "As an NRI investor, trust is everything. Bricksage provides detailed analytics and ROI projections that actually make sense. They manage my properties flawlessly.",
    rating: 5,
    property: "Tech Park Villas",
  },
  {
    name: "Vikram Singh",
    location: "Gurugram",
    review: "The level of transparency they maintain during a transaction is rare in this industry. Everything was documented and clear from day one. Great experience overall.",
    rating: 5,
    property: "Golf Course Extension",
  },
  {
    name: "Anjali Gupta",
    location: "Hyderabad",
    review: "We wanted a villa in a gated community but had a strict budget. Bricksage negotiated a fantastic deal for us. We couldn't be happier with our new home.",
    rating: 5,
    property: "Jubilee Hills Enclave",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-[#F4F6F9]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-left"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-[#172033] font-semibold">
              — Client Stories
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#172033] font-bold mt-3">
              What Our Clients Say
            </h2>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-3"
          >
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#172033]/20 flex items-center justify-center text-[#172033]/70 hover:bg-[#172033] hover:text-white transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[#172033]/20 flex items-center justify-center text-[#172033]/70 hover:bg-[#172033] hover:text-white transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="relative bg-[#172033] border border-white/10 hover:border-[#C9A84C]/60 p-8 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] group flex-none w-[85vw] sm:w-[400px] snap-start"
            >
              <Quote size={32} className="text-white/20 group-hover:text-[#C9A84C]/50 mb-4 transition-colors duration-300" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-white/60 text-white/60 group-hover:fill-[#C9A84C] group-hover:text-[#C9A84C] transition-colors duration-300" />
                ))}
              </div>
              <p className="text-white/70 group-hover:text-white/90 text-sm leading-relaxed font-light mb-6 italic transition-colors duration-300">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="border-t border-white/10 group-hover:border-[#C9A84C]/20 pt-5 mt-auto transition-colors duration-300">
                <p className="font-serif text-white font-semibold group-hover:text-[#C9A84C] transition-colors duration-300">{t.name}</p>
                <p className="text-white/40 group-hover:text-white/60 text-xs mt-1 transition-colors duration-300">{t.location}</p>
                <p className="text-[#C9A84C]/70 group-hover:text-[#C9A84C] font-medium text-xs mt-1 tracking-wider transition-colors duration-300">{t.property}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
