"use client";

import dynamic from "next/dynamic";

// Dynamically import all heavy client-only sections to prevent SSR module crashes
const HeroSection = dynamic(() => import("@/components/layout/hero-section").then(m => ({ default: m.HeroSection })), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/layout/projects-section").then(m => ({ default: m.ProjectsSection })), { ssr: false });
const StatsSection = dynamic(() => import("@/components/layout/stats-section").then(m => ({ default: m.StatsSection })), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/layout/services-section").then(m => ({ default: m.ServicesSection })), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/layout/testimonials-section").then(m => ({ default: m.TestimonialsSection })), { ssr: false });
const CtaSection = dynamic(() => import("@/components/layout/cta-section").then(m => ({ default: m.CtaSection })), { ssr: false });

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
