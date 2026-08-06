import { Metadata } from "next";
import ProjectsCategoryPage from "@/components/property/projects-category-page";

export const metadata: Metadata = {
  title: "New Launch Projects in Mumbai & Thane | Bricksage",
  description:
    "Discover the latest new launch residential and commercial projects in Mumbai & Thane. Be the first to invest in pre-launch offers with Bricksage Properties Advisory.",
};

export default function NewLaunchProjectsMumbaiThanePage() {
  return (
    <ProjectsCategoryPage
      heading="New Launch Projects in Mumbai & Thane"
      subheading="— Latest Launches"
      description="Be among the first to explore newly launched residential and commercial projects in Mumbai and Thane. Get pre-launch pricing, exclusive inventory access, and expert advisory from the Bricksage team."
      defaultConstructionStatusFilter="NEW_LAUNCH"
    />
  );
}
