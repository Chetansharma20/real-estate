
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/layout/hero-section";

const ProjectsSection = dynamic(() => import("@/components/layout/projects-section").then(mod => mod.ProjectsSection));
const ServicesSection = dynamic(() => import("@/components/layout/services-section").then(mod => mod.ServicesSection));
const TestimonialsSection = dynamic(() => import("@/components/layout/testimonials-section").then(mod => mod.TestimonialsSection));
const StatsSection = dynamic(() => import("@/components/layout/stats-section").then(mod => mod.StatsSection));
const CtaSection = dynamic(() => import("@/components/layout/cta-section").then(mod => mod.CtaSection));

export function HomeSections({
  initialProjects = [],
  initialStatsCount = 17,
}: {
  initialProjects?: any[];
  initialStatsCount?: number;
}) {
  return (
    <>
      <HeroSection />
      <ProjectsSection initialProjects={initialProjects} />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection initialCount={initialStatsCount} />
      <CtaSection />
    </>
  );
}

