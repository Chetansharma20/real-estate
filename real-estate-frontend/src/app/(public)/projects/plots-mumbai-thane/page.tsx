import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Plots & Residential Land for Sale in Mumbai & Thane",
  description:
    "Invest in premium residential land and plots for sale in Mumbai Suburbs and Thane regions. Explore verified clear-title land options with Bricksage.",
  alternates: {
    canonical: "https://bricksage.in/projects/plots-mumbai-thane",
  },
};

export default function PlotsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Verified Residential Plots & Land in Mumbai & Thane"
      subheading="Plots & Land in Thane & Mumbai"
      h2="Plots & Land in Thane & Mumbai"
      description="Invest in clear-title NA plots, villa land, and strategic commercial land parcels in emerging growth corridors across Thane and Mumbai MMR."
      defaultTypeFilter={["PLOT"]}
      categorySlug="plots-mumbai-thane"
    />
  );
}
