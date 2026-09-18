import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Commercial Space & Offices for Sale in Mumbai & Mulund",
  description:
    "Explore high commercial space for sale in Mumbai, Thane, and office spaces in Mulund West. Perfect options for corporate offices and retail shops.",
  alternates: {
    canonical: "https://bricksage.in/projects/commercial-projects-mumbai-thane",
  },
};

export default function CommercialProjectsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Premium Commercial Projects & Office Spaces in Mumbai & Thane"
      subheading="Commercial Properties in Mumbai & Thane"
      h2="Commercial Property In Thane"
      description="Explore state-of-the-art office spaces, retail units, and commercial hubs designed for modern businesses, startups, and high-yield investors across Mumbai & Thane."
      defaultTypeFilter={["COMMERCIAL"]}
      categorySlug="commercial-projects-mumbai-thane"
    />
  );
}
