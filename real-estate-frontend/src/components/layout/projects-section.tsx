"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "framer-motion";
import { api } from "@/lib/api";

const getStatusClass = (status: string): string => {
  if (status === "READY_TO_MOVE") return "bg-green-500/10 text-green-700 border-green-500/30";
  if (status === "UNDER_CONSTRUCTION") return "bg-blue-500/10 text-blue-700 border-blue-500/30";
  return "bg-amber-500/10 text-amber-700 border-amber-500/30";
};

const getStatusLabel = (status: string): string => {
  if (status === "READY_TO_MOVE") return "Ready to Move";
  if (status === "UNDER_CONSTRUCTION") return "Under Construction";
  return "Available";
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const imageUrl =
    project.media?.find((m: any) => m.isCover)?.url ||
    project.media?.[0]?.url ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";

  const bhks = project.configurations?.map((c: any) => c.bhk) || [];
  const uniqueBhks = [...new Set(bhks)].sort();
  const bhkLabel = uniqueBhks.length > 0
    ? uniqueBhks.join(" / ") + " BHK"
    : project.propertyType?.replace(/_/g, " ") || "";

  const minPrice = project.configurations?.reduce((min: number, c: any) => {
    const p = Number(c.totalPrice);
    return p > 0 && p < min ? p : min;
  }, Infinity);
  const displayPrice = minPrice && minPrice !== Infinity ? minPrice : null;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <div
          className="relative overflow-hidden bg-[#172033] rounded-none shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={50}
              className={`object-cover transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/85 via-[#172033]/20 to-transparent" />

            {/* Type badge — top left */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#C9A84C] text-[#172033] text-[9px] uppercase tracking-widest font-bold px-2.5 py-1">
                {project.propertyType?.replace(/_/g, " ")}
              </span>
            </div>

            {/* Construction status badge — top right */}
            {project.constructionStatus && project.constructionStatus !== "NONE" && (
              <div className="absolute top-4 right-4 z-10">
                <span className={`text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 border backdrop-blur-sm ${getStatusClass(project.constructionStatus)}`}>
                  {getStatusLabel(project.constructionStatus)}
                </span>
              </div>
            )}

            {/* Price — bottom left on image */}
            <div className="absolute bottom-4 left-4 z-10">
              {displayPrice ? (
                <>
                  <p className="text-[9px] uppercase tracking-widest text-white/50 mb-0.5">Starting From</p>
                  <p className="text-xl font-semibold text-[#C9A84C] font-serif">
                    ₹{displayPrice.toLocaleString("en-IN")}
                  </p>
                </>
              ) : null}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-5 py-4 border-t-2 border-[#C9A84C]/0 group-hover:border-[#C9A84C] transition-all duration-500">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold text-[#172033] line-clamp-1 group-hover:text-[#C9A84C] transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-[#172033]/50 text-xs mt-1">
                  <MapPin className="w-3 h-3 text-[#C9A84C] shrink-0" />
                  <span className="truncate">
                    {project.township?.locality || project.locality || ""}{project.township?.city || project.city ? `, ${project.township?.city || project.city}` : ""}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[9px] uppercase tracking-widest text-[#172033]/40">Config</p>
                <p className="text-sm font-semibold text-[#172033] mt-0.5">{bhkLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#172033]/5">
              <span className="text-[10px] uppercase tracking-widest text-[#172033]/40">
                {project.constructionStatus && project.constructionStatus !== "NONE" ? project.constructionStatus.replace(/_/g, " ") : project.propertyType?.replace(/_/g, " ") || "Project"}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#172033] group-hover:text-[#C9A84C] uppercase tracking-widest transition-colors duration-300">
                View Details
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection({ initialProjects = [] }: { initialProjects?: any[] }) {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  return (
    <section ref={ref} className="bg-[#F4F6F9] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#172033] font-semibold">
              — Featured Collection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#172033] font-bold mt-3">
              Ongoing Projects
            </h2>
            <p className="text-[#172033]/50 font-light max-w-xl text-sm sm:text-base mt-3">
              Exquisite Residences and Bespoke Commercial Spaces
            </p>
          </div>
          <Link href="/projects" className="shrink-0">
            <Button className="bg-[#172033] border border-[#172033] text-white hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#172033] rounded-none px-8 h-11 text-xs uppercase tracking-widest transition-all duration-300">
              See All Projects
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* 2×2 Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-[#172033]/50">
            <p>No featured projects available</p>
          </div>
        )}
      </div>
    </section>
  );
}
