import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "New Projects in Thane Under 40 Lakhs – Explore Now",
  description:
    "Discover new projects in Thane priced under ₹40 lakhs with Bricksage. Find the right real estate options and information on upcoming projects in Thane.",
  alternates: {
    canonical: "https://bricksage.in/projects/commercial-projects-mumbai-thane",
  },
};

export default function CommercialProjectsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Commercial Property In Thane"
      subheading="Commercial Properties in Mumbai & Thane"
      h2="Commercial Property In Thane"
      description="Explore state-of-the-art office spaces, retail units, and commercial hubs designed for modern businesses, startups, and high-yield investors across Mumbai & Thane."
      defaultTypeFilter={["COMMERCIAL"]}
      categorySlug="commercial-projects-mumbai-thane"
    />
  );
}
