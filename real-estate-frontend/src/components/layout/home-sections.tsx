"use client";

import { HeroSection } from "@/components/layout/hero-section";
import { ProjectsSection } from "@/components/layout/projects-section";
import { StatsSection } from "@/components/layout/stats-section";
import { ServicesSection } from "@/components/layout/services-section";
import { TestimonialsSection } from "@/components/layout/testimonials-section";
import { CtaSection } from "@/components/layout/cta-section";

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}
