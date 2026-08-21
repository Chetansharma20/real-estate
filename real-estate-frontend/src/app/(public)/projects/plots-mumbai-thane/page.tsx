import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Plots For Sale In Thane & Mumbai | Bricksage",
  description:
    "Buy residential and commercial NA plots in Thane, Mumbai & peripheral growth corridors. Clear titles, gated communities & high appreciation potential.",
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
