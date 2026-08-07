"use client";

import { HeroSection } from "@/components/layout/hero-section";

import { ProjectsSection } from "@/components/layout/projects-section";
import { ServicesSection } from "@/components/layout/services-section";
import { TestimonialsSection } from "@/components/layout/testimonials-section";
import { StatsSection } from "@/components/layout/stats-section";
import { CtaSection } from "@/components/layout/cta-section";

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

