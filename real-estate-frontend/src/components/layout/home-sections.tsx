"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/layout/hero-section";

/**
 * DRY helper — encapsulates the repeated dynamic() import pattern.
 * Only unique values per section: module path, export name, skeleton height & bg.
 */
function createLazySection<T extends Record<string, unknown>>(
  importFn: () => Promise<{ [key: string]: React.ComponentType<T> }>,
  exportName: string,
  skeletonHeight: string,
  skeletonBg = ""
) {
  return dynamic<T>(
    () => importFn().then((m) => m[exportName] as React.ComponentType<T>),
    {
      ssr: false,
      loading: () => (
        <div className={`${skeletonHeight}${skeletonBg ? ` ${skeletonBg}` : ""}`} />
      ),
    }
  );
}

// ── Below-fold sections (DRY — each is one line) ──────────────────────────────
const ProjectsSection     = createLazySection(() => import("@/components/layout/projects-section"),     "ProjectsSection",     "h-[500px]");
const ServicesSection     = createLazySection(() => import("@/components/layout/services-section"),     "ServicesSection",     "h-[600px]", "bg-[#172033]");
const TestimonialsSection = createLazySection(() => import("@/components/layout/testimonials-section"), "TestimonialsSection", "h-[400px]");
const StatsSection        = createLazySection(() => import("@/components/layout/stats-section"),        "StatsSection",        "h-[300px]");
const CtaSection          = createLazySection(() => import("@/components/layout/cta-section"),          "CtaSection",          "h-[200px]");
// ──────────────────────────────────────────────────────────────────────────────

export function HomeSections({
  initialProjects = [],
  initialStatsCount = 17,
}: {
  initialProjects?: any[];
  initialStatsCount?: number;
}) {
  return (
    <>
      {/* HeroSection is LCP — loads eagerly, no dynamic() */}
      <HeroSection />
      {/* All below-fold sections: code-split via createLazySection */}
      <ProjectsSection initialProjects={initialProjects} />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection initialCount={initialStatsCount} />
      <CtaSection />
    </>
  );
}

