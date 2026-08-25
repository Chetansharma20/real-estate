import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Upcoming Real Estate Projects in Thane West – New Launches",
  description:
    "Discover upcoming real estate projects in Thane West with Bricksage. Explore new projects and future opportunities in the area.",
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
