import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Apartments for Sale in Mumbai & Thane | Bricksage",
  description:
    "Browse premium residential apartments for sale across Mumbai & Thane. Find 1, 2, 3 & 4 BHK flats from top developers. Expert advisory by Bricksage Properties.",
};

export default function ApartmentsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Apartments for Sale in Mumbai & Thane"
      subheading="— Residential Apartments"
      description="Discover curated residential apartments across Mumbai and Thane — from compact 1 BHK homes to spacious 4 BHK luxury flats, in the city's most sought-after neighbourhoods."
      defaultTypeFilter={["FLAT"]}
    />
  );
}
