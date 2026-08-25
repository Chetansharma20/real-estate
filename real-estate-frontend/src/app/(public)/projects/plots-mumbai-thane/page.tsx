import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "New Projects in Thane Under 30 Lakhs – Latest Projects",
  description:
    "Explore new projects in Thane priced under ₹30 lakhs with Bricksage. Learn about upcoming real estate developments and suitable property options in Thane.",
  alternates: {
    canonical: "https://bricksage.in/projects/plots-mumbai-thane",
  },
};

export default function PlotsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Plots & Land For Sale"
      subheading="Plots & Land in Thane & Mumbai"
      h2="Plots & Land in Thane & Mumbai"
      description="Invest in clear-title NA plots, villa land, and strategic commercial land parcels in emerging growth corridors across Thane and Mumbai MMR."
      defaultTypeFilter={["PLOT"]}
      categorySlug="plots-mumbai-thane"
    />
  );
}
