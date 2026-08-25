import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top 10 Residential Projects in Thane – Projects to Explore",
  description: "Check out the top 10 residential projects in Thane with Bricksage. Get information on upcoming real estate developments and new projects in the area.",
  alternates: {
    canonical: "https://bricksage.in/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
