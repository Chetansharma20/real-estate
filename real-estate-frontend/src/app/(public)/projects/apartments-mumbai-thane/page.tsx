import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "New Projects in Thane Under 50 Lakhs – Latest Options",
  description:
    "Explore new projects in Thane priced under ₹50 lakhs with Bricksage. Learn about apartments and upcoming real estate developments in Thane and its surrounding areas.",
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
