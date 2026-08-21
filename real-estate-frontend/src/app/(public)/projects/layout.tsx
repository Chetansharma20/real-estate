import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects in Mumbai & Thane | Bricksage Properties Advisory",
  description: "Browse premium residential flats, apartments, luxury villas, and commercial spaces for sale across Mumbai, Thane, and Mulund.",
  alternates: {
    canonical: "https://bricksage.in/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
