import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "Under Construction Flats & Apartments in Mumbai & Thane",
  description:
    "Find residential apartments and under-construction flats for sale in Mumbai, Thane, and Mulund West. Filter by configurations and premium amenities.",
  alternates: {
    canonical: "https://bricksage.in/projects/apartments-mumbai-thane",
  },
};

export default function ApartmentsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="Residential Apartments & Flats for Sale in Mumbai & Thane"
      subheading="— Residential Apartments"
      description="Discover curated residential apartments across Mumbai and Thane — from compact 1 BHK homes to spacious 4 BHK luxury flats, in the city's most sought-after neighbourhoods."
      defaultTypeFilter={["FLAT"]}
    />
  );
}
