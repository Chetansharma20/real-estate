import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Upcoming Residential Projects In Mumbai | Bricksage",
  description:
    "Discover upcoming & new launch residential projects in Mumbai & Thane. Avail early-bird pricing, flexible payment plans & verified RERA registered properties.",
  alternates: {
    canonical: "https://bricksage.in/projects/new-launch-projects-mumbai-thane",
  },
};

export default function NewLaunchProjectsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Upcoming Residential Projects In Mumbai"
      subheading="New Launch Projects in Mumbai & Thane"
      h2="Upcoming Residential Projects In Mumbai"
      description="Get early access to newly launched and pre-launch residential & commercial developments. Secure prime units with inaugural pricing and flexible payment plans."
      categorySlug="new-launch-projects-mumbai-thane"
    />
  );
}
