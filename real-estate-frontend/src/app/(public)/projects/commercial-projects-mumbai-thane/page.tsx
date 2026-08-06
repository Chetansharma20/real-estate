import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Commercial Projects in Mumbai & Thane | Bricksage",
  description:
    "Find office spaces, retail shops, and premium commercial projects in Mumbai & Thane. Invest in commercial real estate with expert guidance from Bricksage Properties.",
};

export default function CommercialProjectsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Commercial Projects in Mumbai & Thane"
      subheading="— Office & Retail Spaces"
      description="Invest in high-potential commercial real estate across Mumbai and Thane. From office suites and retail shops to large commercial complexes — find the right space for your business or investment portfolio."
      defaultTypeFilter={["COMMERCIAL"]}
    />
  );
}
