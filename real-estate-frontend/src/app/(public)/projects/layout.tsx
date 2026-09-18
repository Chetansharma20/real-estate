import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Residential Projects in Mumbai & Thane West | Bricksage",
  description:
    "Browse new residential projects in Mumbai and Thane West. Find verified RERA registered flats, ready to move apartments, and under-construction options.",
  alternates: {
    canonical: "https://bricksage.in/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
