import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Plots for Sale in Mumbai & Thane | Bricksage",
  description:
    "Explore residential and investment plots for sale in Mumbai & Thane. Secure your land in prime locations with trusted advisory from Bricksage Properties.",
};

export default function PlotsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Plots for Sale in Mumbai & Thane"
      subheading="— Residential & Investment Plots"
      description="Explore prime land and plot listings across Mumbai and Thane. Whether you are looking to build your dream home or make a long-term land investment, find the right plot with Bricksage."
      defaultTypeFilter={["PLOT"]}
    />
  );
}
