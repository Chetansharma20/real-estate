import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Commercial Property In Thane & Mumbai | Bricksage",
  description:
    "Explore premium commercial office spaces, retail shops & IT parks for sale and lease across Mumbai & Thane. Verified commercial real estate with high ROI.",
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
