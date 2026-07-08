"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { api } from "@/lib/api";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
    opacity: 0,
  }),
};

const statusVariant: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
  READY_TO_MOVE: "default",
  UNDER_CONSTRUCTION: "secondary",
  NONE: "outline",
};

const getStatusLabel = (tag: string, status: string): string => {
  if (tag === "READY_TO_MOVE") return "Ready to Move";
  if (tag === "UNDER_CONSTRUCTION") return "Under Construction";
  return status === "ACTIVE" ? "Available" : status;
};

const getStatusVariant = (tag: string) => {
  if (tag === "READY_TO_MOVE") return "default";
  if (tag === "UNDER_CONSTRUCTION") return "secondary";
  return "outline";
};

const getStatusClass = (tag: string): string => {
  if (tag === "READY_TO_MOVE") return "bg-green-500/10 text-green-700 border-green-500/30";
  if (tag === "UNDER_CONSTRUCTION") return "bg-blue-500/10 text-blue-700 border-blue-500/30";
  return "bg-amber-500/10 text-amber-700 border-amber-500/30";
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/properties?limit=5");
        if (res.data.success) {
          const responseData = res.data.data.data || res.data.data;
          const items = responseData.properties || responseData || [];
          setProjects(items);
        }
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((i) => (i + 1) % projects.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, [activeIndex, projects.length]);

  const active = projects[activeIndex];

  const prev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  };
  const next = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % projects.length);
  };

  const handleDotClick = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  return (
    <section ref={ref} className="bg-[#F4F6F9] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Header aligned with grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
            — Featured Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0B132B] font-bold mt-3">
            Ongoing Projects
          </h2>
          <p className="text-[#0B132B]/50 font-light max-w-xl text-sm sm:text-base mt-3">
            Exquisite Residences and Bespoke Commercial Spaces
          </p>
        </motion.div>
      </div>

      {/* Main Showcase - Full Width Edge to Edge */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#0B132B]/50">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-[#0B132B]/50 border border-dashed border-[#0B132B]/10 max-w-7xl mx-auto px-4">
            No active projects found.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] shadow-2xl rounded-none overflow-hidden w-full"
          >
            {/* Image Panel */}
            <div className="relative h-72 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[660px] overflow-hidden bg-[#0B132B]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", ease: "easeInOut", duration: 1.0 },
                    opacity: { duration: 0.6 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"}
                    alt={active.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase tracking-wider px-2.5 py-1 font-medium">
                Artist&apos;s Impression
              </div>

              {/* Nav Arrows */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-primary w-6" : "bg-white/40 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Detail Panel — shadcn Card */}
            <Card className="rounded-none border-0 shadow-none bg-white flex flex-col justify-center ring-0 px-6 sm:px-12 py-10 lg:py-0 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col h-full justify-center w-full"
                >
                  <CardHeader className="pb-2 pt-4 px-0">
                    <div className="flex items-center gap-2 flex-wrap w-full">
                      {active.constructionStatus && active.constructionStatus !== "NONE" && (
                        <Badge
                          variant="default"
                          className={`rounded-none text-[10px] tracking-wider px-3 py-1 font-medium border ${
                            active.constructionStatus === "READY_TO_MOVE"
                              ? "bg-green-500/10 text-green-700 border-green-500/30"
                              : "bg-blue-500/10 text-blue-700 border-blue-500/30"
                          }`}
                        >
                          {active.constructionStatus === "READY_TO_MOVE" ? "Ready to Move" : "Under Construction"}
                        </Badge>
                      )}
                      {active.tag && active.tag !== "NONE" && (
                        <Badge
                          variant="outline"
                          className="rounded-none text-[10px] tracking-wider px-3 py-1 font-medium border bg-[#172033]/5 text-[#172033] border-[#172033]/20"
                        >
                          {active.tag.replace("_", " ")}
                        </Badge>
                      )}
                      <div className="flex-grow" />
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#0B132B]/40 shrink-0">
                        {active.type}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl xl:text-4xl text-[#0B132B] font-bold mt-4 leading-tight">
                      {active.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#0B132B]/50 mt-1">
                      <MapPin size={13} className="text-primary shrink-0" />
                      <span className="text-sm">{active.locality}, {active.city}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="px-0 py-6">
                    <Separator className="mb-6 bg-[#0B132B]/8" />
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#0B132B]/40 mb-1">
                          Configuration
                        </p>
                        <p className="text-sm sm:text-base text-[#0B132B] font-medium">{active.bhk} BHK</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#0B132B]/40 mb-1">
                          Starting From
                        </p>
                        <p className="text-2xl sm:text-3xl text-[#0B132B] font-semibold">
                          ₹{Number(active.basePrice).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-0 pb-4 pt-2 bg-transparent border-0 rounded-none">
                    <Link href={`/properties/${active.id}`} className="w-full">
                      <Button className="w-full bg-[#0B132B] text-white hover:bg-primary hover:text-[#0B132B] rounded-none h-12 text-xs uppercase tracking-widest group transition-all duration-300">
                        View Details
                        <ArrowRight
                          size={14}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </Button>
                    </Link>
                  </CardFooter>
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </div>

      {/* See All CTA aligned with grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link href="/properties">
            <Button
              variant="outline"
              className="bg-transparent border-[#0B132B]/20 text-[#0B132B] hover:bg-[#0B132B] hover:text-white rounded-none px-8 sm:px-10 h-11 sm:h-12 text-xs uppercase tracking-widest transition-all duration-300"
            >
              See All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
