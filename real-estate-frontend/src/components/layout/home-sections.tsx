
import { HeroSection } from "@/components/layout/hero-section";
import { ProjectsSection } from "@/components/layout/projects-section";
import dynamic from "next/dynamic";

// Below-fold sections — code-split to reduce unused JS on initial load
const ServicesSection = dynamic(
  () => import("@/components/layout/services-section").then(m => ({ default: m.ServicesSection })),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/layout/testimonials-section").then(m => ({ default: m.TestimonialsSection })),
  { ssr: true }
);
const StatsSection = dynamic(
  () => import("@/components/layout/stats-section").then(m => ({ default: m.StatsSection })),
  { ssr: true }
);
const CtaSection = dynamic(
  () => import("@/components/layout/cta-section").then(m => ({ default: m.CtaSection })),
  { ssr: true }
);

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

